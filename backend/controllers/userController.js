const asyncHandler = require('express-async-handler')
// Importa el módulo express-async-handler, que se usa para manejar funciones asincrónicas en Express.

const jwt = require('jsonwebtoken')
// Importa el módulo jsonwebtoken, que se usa para generar y verificar JSON Web Tokens.

const bcrypt = require('bcryptjs')
// Importa el módulo bcryptjs, que se usa para encriptar y comparar contraseñas.

const User = require('../models/userModels')
// Importa el modelo de usuario desde el archivo userModels en la carpeta models.

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    // Desestructura el nombre, correo electrónico y contraseña del cuerpo de la solicitud.

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Todos los campos son obligatorios')
        // Verifica que todos los campos estén presentes. Si falta alguno, lanza un error.
    }

    const userExist = await User.findOne({ email })
    // Busca si ya existe un usuario con el correo electrónico proporcionado.

    if (userExist) {
        res.status(400)
        throw new Error('Usuario existente, registre un nuevo usuario')
        // Si ya existe un usuario con ese correo electrónico, lanza un error.
    }

    const salt = await bcrypt.genSalt(10)
    // Genera una sal (salt) para la encriptación de la contraseña.

    const hashedPassword = await bcrypt.hash(password, salt)
    // Encripta la contraseña con la sal generada.

    const user = await User.create({ name, email, password: hashedPassword })
    // Crea un nuevo usuario en la base de datos con la contraseña encriptada.

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateJWTtoken(user._id)
        })
        // Si el usuario se crea exitosamente, responde con los datos del usuario y un token JWT.
    } else {
        res.status(400)
        throw new Error('Datos invalidos del usuario')
        // Si no se puede crear el usuario, lanza un error.
    }
    res.json({ message: 'Usuario registrado satisfactoriamente' })
    // (Esta línea realmente no se ejecutará porque la respuesta ya se ha enviado arriba en el if)
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    // Desestructura el correo electrónico y la contraseña del cuerpo de la solicitud.

    const user = await User.findOne({ email })
    // Busca un usuario con el correo electrónico proporcionado.

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateJWTtoken(user._id)
        })
        // Si el usuario existe y la contraseña es correcta, responde con los datos del usuario y un token JWT.
    } else {
        res.status(400)
        throw new Error('Datos invalidos')
        // Si las credenciales son incorrectas, lanza un error.
    }
})

const getCurrentUser = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id)
    // Busca al usuario actual por su ID, que se asume que está en req.user.id.

    res.status(200).json({ id: _id, name, email })
    // Responde con los datos del usuario actual.
})

const generateJWTtoken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '5d' })
// Función para generar un token JWT con el ID del usuario y una clave secreta,
// el token expirará en 5 días.

module.exports = { registerUser, loginUser, getCurrentUser }
// Exporta las funciones registerUser, loginUser y getCurrentUser para usarlas en otras partes de la aplicación.

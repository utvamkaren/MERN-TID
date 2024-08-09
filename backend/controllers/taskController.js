const asyncHandler=require('express-async-handler')
const Task=require('../models/taskModels')
const User=require('../models/userModels')

const getTasks = asyncHandler(async(req, res) => {
    const tasks=await Task.find({user:req.user.id})
    res.status(200).json( tasks );
});

const setTasks = asyncHandler(async(req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Por favor ingrese una tarea');
    }
    const  task=await Task.create({text:req.body.text,user:req.user.id})
    res.status(200).json(task);
});

const updateTasks =asyncHandler (async(req, res) => {
    const task = await Task.findById(req.params.id)
    if(!task){
        res.status(400)
        throw new Error('Tarea no encontrada')
    }
    const updateTasks=await Task.findByIdAndUpdate(req.params.id, req.body,{new:true})
    if(!updateTasks){
        res.status(500)
        throw new Error('Error al actualizar')
    }
    res.status(200).json(updateTasks);
});

const deleteTasks = asyncHandler(async(req,res)=>{
    const task=await Task.findById(req.params.id);
    if(!task){
        res.status(400);
        throw new Err 
        ("Tarea no encontrada")
    }
    if(!task.user){
        res.status(400);
        throw new Error("La tarea no teiene un usuario asignado")
    }
    if(!req.user || !req.user.id){
        res.status(401);
        throw new Error("No se encontro al usuario");
    }
    const user =await User.findById(req.user.id);
    if(!user){
        res.status(401);
        throw new Error("No se encontro al usuario");
    }

    if(task.user && task.user.toString()!==user.id){
        res.status(401);
        throw new Error("Usuario no autorizado para la actualizacion ");
    }
    //eliminar la tarea
    const deleteTasks=await Task.findByIdAndDelete(req.params.id);
    if(!deleteTasks){
        res.status(401);
        throw new Error("error al eliminar la tarea");
    }
    //enviar la respueta exitosa
    res.status(200).json({id:req.params.id})
})


module.exports = { getTasks, setTasks, updateTasks, deleteTasks };
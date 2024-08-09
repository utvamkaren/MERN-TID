
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import Spinner from "./Spinner";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { email, password } = formData;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

    useEffect(() => {
        if (isError) toast.error(message);
        if (isSuccess || user) navigate("/");
        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = e => {
        e.preventDefault();
        const userData = { email, password };
        dispatch(login(userData));
    };

    return (
        isLoading ? <Spinner /> : (
            <>
                <section className='heading'>
                   
                <p>Iniciar sesión</p>
                </section>
                <div className="additional-options">
                    <a href="/login" id="login-link">Login</a>
                    <a href="/register" id="register-link">Register</a>
                </div>
                <section className='form'>
                    <form onSubmit={onSubmit}>
                        <div className='form-group'>
                            <div className='input-container'>
                                <FaUser className='input-icon' />
                                <input
                                    type="email"
                                    className='form-control'
                                    id="email"
                                    name="email"
                                    value={email}
                                    placeholder='Ingresa tu correo electrónico'
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                        <div className='form-group'>
                            <div className='input-container'>
                                <FaLock className='input-icon' />
                                <input
                                    type="password"
                                    className='form-control'
                                    id="password"
                                    name="password"
                                    value={password}
                                    placeholder='Ingresa tu contraseña'
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit" className='btn btn-block'>Enviar</button>
                        </div>
                    </form>
                </section>
            </>
        )
    );
}

export default Login;

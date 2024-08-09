
import { useEffect, useState } from "react";

import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register,reset } from "../features/auth/authSlice";
import Spinner from "./Spinner.js";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", password2: "" });
  const { name, email, password, password2 } = formData;
  const navigate =useNavigate()
  const dispatch=useDispatch()
  const {use,isLoading,isError,isSuccess,mesage}=useSelector(state=>state.auth)

  useEffect(()=>{
    if(isError)toast.error(mesage)
      if(isSuccess || use) navigate('/')
        dispatch(reset()) 
  },[use,isError,isSuccess,mesage,navigate,dispatch])

  const onChange = e => {
    setFormData(prevState=>({
        ...prevState,
        [e.target.name]: e.target.value
    }))
  };

  const onSubmit = e => {
    e.preventDefault();
    if(password!==password2){
      toast.error('Password distinto')
    }else{
      const  userData={name,email,password}
      dispatch(register(userData))
    }
  
    
  };

  return (
    isLoading ? <Spinner />:(
    <>
      <section className="heading">
     
        <p>Registrarse</p>
      </section>
      <div className="additional-options">
                    <a href="/login" id="login-link">Login</a>
                    <a href="/register" id="register-link">Register</a>
                </div>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Introduce tu nombre"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Introduce tu email"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Introduce tu password"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirma tu password"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </section>
    </>
    )
  );
};

export default Register;

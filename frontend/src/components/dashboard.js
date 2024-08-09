import React from 'react'
import {useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import TaskForm from './TaskForm';

const Dashboard=()=>{
    const navigate = useNavigate()
    const {user}= useSelector (state=> state.auth)
    useEffect(()=>{
        if(!user) navigate ("/login")
    }, [user, navigate])

    return(
        <>
        <section className='heading'>
            <h1>Bienvenido {user && user.name}</h1>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button className='btn' onClick={()=> navigate ('alltasks')}>Revisar Tarea</button>
            </div>
        </section>
        <TaskForm></TaskForm>
        </>
      
    )
}
export default Dashboard
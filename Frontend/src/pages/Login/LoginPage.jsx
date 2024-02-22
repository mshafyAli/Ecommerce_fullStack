import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react'
import Login from '../../components/Login/Login.jsx'
import { useSelector } from 'react-redux';

const LoginPage = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();


  useEffect(() => {
    if(isAuthenticated === true){
      navigate('/')
    }

  },[])

  return (
    <div>
    <Login/>
      </div>
  )
}

export default LoginPage
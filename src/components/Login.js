import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterAndLogin from './RegisterAndLogin'
import Home from './Home'
import ForgotPassword from './ForgotPassword'

const Login = () => {
  return (
    <BrowserRouter>
        <div>
            <Routes>
                <Route path = "/" element = {<RegisterAndLogin/>}/>
                <Route path = "/home" element = {<Home/>}/>
                <Route path = "/reset" element = {<ForgotPassword/>}/>
            </Routes>
        </div>
    </BrowserRouter> 
  )
}

export default Login
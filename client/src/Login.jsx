import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import "./App.css"

function Login() {
    const [values, setValues] = useState({
        username: '',
        password: '',
    })
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:8081/login', values)
            .then(res => {
                if (res.data.Status === "Success") {
                    alert("Login Successful")
                    navigate('/')
                } else {
                    alert(res.data.Error)
                }
            })
            .then(err => console.log(err))
    }

    return (
        <div>
       <div className="bgimage">
      <div className="menu">
        <div className="leftmenu">
          <h4> muse. </h4>
        </div>
      </div>
    </div>
  
        <div className="container">

          <div className="center">
                
        
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <div className="txt_field">
                    <label htmlFor="username"><strong>Username</strong></label>
                    <input type="text" placeholder='Enter Username' name='username' id='username' onChange={e => setValues({ ...values, username: e.target.value })} required />
                </div>
                <div className="txt_field" type="password">
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="password" placeholder='Enter Password' name="password" id="password" onChange={e => setValues({ ...values, password: e.target.value })} />
                </div>
                <div>
                    <button type="submit">Sign In</button>
                    <div className="signup_link">Don't have an account yet? 
                      <Link to="/register">Sign Up</Link>
                    </div>
                </div>
            </form>
          </div>
        </div>
            
        </div>
    )
}

export default Login
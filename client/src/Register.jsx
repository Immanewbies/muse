import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
  import "./App.css"

function Register() {
  const [values, setValues] = useState({
    username: '',
    password: '',
    profile_name: ''
  })
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post('http://localhost:8081/register', values)
      .then(res => {
        if (res.data.Status === "Success") {
          navigate('/login')
        } else {
          alert("Error")
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
        
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
        <div className="txt_field">
          <label htmlFor="username"><strong>Username</strong></label>
          <input type="text" placeholder='Enter Username' name="username" id="username" onChange={e => setValues({ ...values, username: e.target.value })} />
        </div>
        <div className="txt_field">
          <label htmlFor="password"><strong>Password</strong></label>
          <input type="password" placeholder='Enter Password' name="password" id="password" onChange={e => setValues({ ...values, password: e.target.value })} />
        </div>
        <div className="txt_field">
          <label htmlFor="profile_name"><strong>Profile Name</strong></label>
          <input type="text" placeholder='Enter Profile Name' name='profile_name' id='profile_name' onChange={e => setValues({ ...values, profile_name: e.target.value })} />
        </div>
        <div>
          <button type="submit">Sign Up</button>
          <div className="signup_link">
            Have an Account? <Link to="/login">Sign In</Link>
          </div>
          
        </div>
      </form>
      </div>
    </div>
      
    </div>
  )
}

export default Register

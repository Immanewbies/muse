import { React, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
// import "./App.css"

function Register() {
  const serverUrl = process.env.REACT_APP_EC2_API || 'http://localhost:8081';
  const [values, setValues] = useState({
    username: '',
    password: '',
    profile_name: ''
  })
  const [rePassword, setRePassword] = useState('')
  const [passwordMatch, setPasswordMatch] = useState(true) // State to track password match
  const navigate = useNavigate()
  let timer = null // Timer variable

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setPasswordMatch(true)
    if (name === 're-password') {
      setRePassword(value)
      clearTimeout(timer) // Clear previous timer
      timer = setTimeout(() => {
        setPasswordMatch(values.password === value && value !== '')
      }, 3000) // Check after 3 seconds
    } else {
      setValues({ ...values, [name]: value })
    }
  }

  useEffect(() => {
    return () => {
      clearTimeout(timer) // Clear timer on component unmount or re-render
    }
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post(`${serverUrl}/register`, values)
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
          <input type="text" name='profile_name' id='profile_name' onChange={handleInputChange} required/>
          <label htmlFor="profile_name">Profile Name</label>
        </div>

        <div className="txt_field">
          <input type="text" name="username" id="username" onChange={handleInputChange} required />
          <label htmlFor="username">Username</label>
          <span></span>
        </div>


        <div className="txt_field">
          
          <input type="password" name="password" id="password" onChange={handleInputChange}  required/>
          <label htmlFor="password">Password</label>
        </div>
        {!passwordMatch && rePassword !== '' && <p className="error-message">Passwords do not match</p>}
        <div className="txt_field">
          
          <input type="password" name="re-password" id="re-password" onChange={handleInputChange} required/>
          <label htmlFor="re-password">Confirm Password</label>
        </div>
       

    
        <input name="submit" type="Submit" value="Sign Up" />
          <div className="signup_link">
            Have an Account? <Link to="/login">Login</Link>
          
        </div>
      </form>
      </div>
    </div>
      
    </div>
  )
}

export default Register

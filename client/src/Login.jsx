import { React, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import "./App.css"

function Login() {
  const serverUrl = process.env.REACT_APP_EC2_API || 'http://localhost:8081';
    const [values, setValues] = useState({
        username: '',
        password: '',
    })
    const navigate = useNavigate()
    const location = useLocation()
    const [previousLocation, setPreviousLocation] = useState(null)
    axios.defaults.withCredentials = true

    useEffect(() => {
        if (location.state && location.state.from) {
          setPreviousLocation(location.state.from)
        }
      }, [location.state])

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post(`${serverUrl}/login`, values)
            .then(res => {
                if (res.data.Status === "Success") {
                    alert("Login Successful")
                    if (previousLocation) {
                        navigate(previousLocation)
                      } else {
                        navigate('/')
                      }
                } else {
                    alert(res.data.Error)
                }
            })
            .then(err => console.log(err))
    }

    return (
        <div>
        <div className="menu">
          <div className="leftmenu">
            <h4> muse. </h4>\
          </div>
      </div>
      
          <div className="container">
          <div className="center">
                  
          
              <h1>Login</h1>
  
              <form onSubmit={handleSubmit} action="" method="POST" >
                  <div className="txt_field">
                      <input type="text"name='username' id='username' onChange={e => setValues({ ...values, username: e.target.value })} required />
                      <span></span>
                      <label htmlFor="username">Username</label>
                  </div>
  
                  <div className="txt_field" >
                      <input type="password"  name='password' id='password' onChange={e => setValues({ ...values, password: e.target.value })} required/>
                      <span></span>
                      <label htmlFor="password">Password</label>
                  </div>
                 
                  <div className="pass">Forget Password?</div>
  
                  <input name="submit" type="Submit" value="Login" />
                <div className="signup_link">
                  Don't have an account yet? <Link to="/register">Sign up</Link>
                </div>
              </form>
            </div>
          </div>
          </div>
    )
}

export default Login
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

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
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username"><strong>Username</strong></label>
                    <input type="text" placeholder='Enter Username' name='username' id='username' onChange={e => setValues({ ...values, username: e.target.value })} />
                </div>
                <div>
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="password" placeholder='Enter Password' name="password" id="password" onChange={e => setValues({ ...values, password: e.target.value })} />
                </div>
                <div>
                    <button type="submit">Sign In</button>
                    <Link to="/register">Sign Up</Link>
                </div>
            </form>
        </div>
    )
}

export default Login
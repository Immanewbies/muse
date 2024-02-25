import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Home() {
    const [auth, setAuth] = useState(false)
    const [message, setMessage] = useState('')
    const [profile_name, setProfile_name] = useState('')
    axios.defaults.withCredentials = true

    useEffect(() => {
        axios.get('http://localhost:8081')
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true)
                    setProfile_name(res.data.profile_name)
                } else {
                    setAuth(false)
                    setMessage(res.data.Error)
                }
            })
            .then(err => console.log(err))
    }, [])

    const handleLogout = () => {
        axios.get('http://localhost:8081/logout')
        .then(res => {
            window.location.reload(true);
        }).catch(err => console.log(err))
    }

    return (
        <div>
            {
                auth ?
                    <div>
                        <h3>Ur Authorized --- {profile_name}</h3>
                        <button onClick={handleLogout}> Logout </button>
                    </div>
                    :
                    <div>
                        <h3>{message}</h3>
                        <h3>Sign In Now</h3>
                        <Link to="/login"> Login </Link>
                    </div>
            }
        </div>
    )
}

export default Home
import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Quiz from './components/Quiz'

function QuizPage() {
    const serverUrl = process.env.REACT_APP_EC2_API || 'http://localhost:8081';
    const [auth, setAuth] = useState(false)
    const [profile_name, setProfile_name] = useState('')
    const navigate = useNavigate()
    axios.defaults.withCredentials = true

    useEffect(() => {
        axios.get(`${serverUrl}`)
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true)
                    setProfile_name(res.data.profile_name)
                } else {
                    setAuth(false)
                    navigate("/login")
                }
            })
    }, [])

    return (
        <div>
            <Quiz />
        </div>
    )
}

export default QuizPage
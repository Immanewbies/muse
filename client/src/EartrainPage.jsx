import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Eartrain from './components/Eartrain'
import * as Tone from 'tone'
import { serverUrl } from './global/constants.js';

function EartrainPage() {
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
            <Eartrain/>
        </div>
    )
}

export default EartrainPage
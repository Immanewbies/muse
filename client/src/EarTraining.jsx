import { React, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import "./Home.css"
import './components/Quizhome.css'
import { serverUrl } from './global/constants.js';

function EarTraining() {
    const [auth, setAuth] = useState(false)
    const [profile_name, setProfile_name] = useState('')
    axios.defaults.withCredentials = true
    const [values, setValues] = useState({
        difficulty_name: '',
        category_name: '',
    })
    const navigate = useNavigate()

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

    const handleLogout = () => {
        axios.get(`${serverUrl}/logout`)
            .then(res => {
                window.location.reload(true);
            }).catch(err => console.log(err))
    }

    return (
        <div className="bgimage">
            <div className="menu">
                <div className="leftmenu">
                    <h4> muse. </h4>
                </div>
                <div className="rightmenu">
                <ul>
            <Link to="/" ><li>Home</li></Link>
            <Link to="/chordpiano" ><li >Chords & Scale</li></Link>
            <Link to='/eartrain'><li id='firstlist'>Ear Training</li></Link>
            <Link to="/quiz" ><li >Quiz</li></Link>

            {
              auth ? (
                <>
                  <Link to="/profile"><li>Profile: {profile_name}</li></Link>
                  <a onClick={handleLogout}><li>Logout</li></a>
                </>
              ) : (
                <Link to="/login"><li>Login</li></Link>
              )
            }


          </ul>
                </div>

            </div>

            <div className="text">
                <h1>Ear Training</h1>
                <h2>Please select Note/Chord to training</h2>
            </div>

            <div className='qh'>
                <div className='container'>

                    <button onClick={() => window.location.href = 'eartrainnote'}>Note</button>
                    <button onClick={() => window.location.href = 'eartrainchord'}>Chord</button>

                </div>
            </div>

        </div>
    )
}

export default EarTraining
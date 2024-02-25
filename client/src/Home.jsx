import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Home.css'

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

    const rectangle1Style = {
        width: '20%', 
        height: '40%', 
        left: '10%', 
        top: '45%', 
        position: 'absolute',
        background: 'linear-gradient(159deg, #000000 0%, #4D2DB7 100%)',
        borderRadius: 25,
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center'
      };
    
      const rectangle2Style = {
        width: '20%', 
        height: '40%',
        left: '40%' ,
        top: '45%', 
        position: 'absolute',
        background: 'linear-gradient(159deg, #000000 0%, #4D2DB7 100%)',
        borderRadius: 25,
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center'
      };
    
      const rectangle3Style = {
        width: '20%', 
        height: '40%', 
        right: '10%', 
        top: '45%', 
        position: 'absolute',
        background: 'linear-gradient(159deg, #000000 0%, #4D2DB7 100%)',
        borderRadius: 25,
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center'
      };
    
    return (
        <div className="bgimage">
      <div className="menu">
        <div className="leftmenu">
          <h4> muse. </h4>
        </div>
        <div className="rightmenu">
          <ul>
            <li id="firstlist">Home</li>
            <li>Chords & Scale</li>
            <li>Ear Training</li>
            <li>Quiz</li>
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
         
          </ul>
        </div>
      </div>

      <div class="text">
            <h1>Deep In Musician</h1>
        </div>

    <div className="Rectangle4" style={rectangle1Style} >
        <a href="#" style={{ color: 'white', fontSize: '18px', textDecoration: 'none' }}>Chords & Scale</a> </div>

    <div className="Rectangle5" style={rectangle2Style} >
      <a href="#" style={{ color: 'white', fontSize: '18px', textDecoration: 'none' }}>Ear Training</a>      </div>

     <div className="Rectangle6" style={rectangle3Style} >
      <a href="#" style={{ color: 'white', fontSize: '18px', textDecoration: 'none' }}>Quiz</a>      </div>
       
    </div>
    )
}

export default Home

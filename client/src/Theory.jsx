import { React, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import './components/Sidebar.css'
import Metronome from './Metronome-main/Metronome';
import ReactPlayer from 'react-player';
import './Theory.css'

function Theory() {
  const serverUrl = process.env.REACT_APP_EC2_API || 'http://localhost:8081';
  const [auth, setAuth] = useState(false)
  // const [message, setMessage] = useState('')
  const [profile_name, setProfile_name] = useState('')
  axios.defaults.withCredentials = true

  useEffect(() => {
    axios.get(`${serverUrl}`)
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true)
          setProfile_name(res.data.profile_name)
        } else {
          setAuth(false)
          // setMessage(res.data.Error)
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


    <div className="side">

      <div className="wrapper">

        <input type="checkbox" id="btn" hidden />
        <label htmlFor="btn" className="menu-btn">
          <i className="fas fa-bars"></i>
          <i className="fas fa-times"></i>

        </label>

        <nav id="sidebar">
          <div className="title" >
            muse.
          </div>
          <ul className="list-items">

            <li><Link to="/Home"><i ></i>Home</Link></li>
            <li><Link to="/chordpiano"><i ></i>Piano Chords</Link></li>
            <li><Link to="/chordguitar"><i ></i>Guitar Chords</Link></li>
            <li><Link to="/allscale"><i ></i>All Scales</Link></li>
            <li><Link to="/theory"><i ></i>Music Theory</Link></li>
            <li><Link to="/eartrain"><i ></i>Ear Trainning</Link></li>
            <li><Link to="/quiz"><i ></i>Quiz</Link></li>

            <div>
              <Metronome />
            </div>




            <div className="icons">
              <a href="Profile"><i className="profile"></i></a>


            </div>

          </ul>
        </nav>
      </div>



      <div className="bgimage">
        <div className="menu">

          <div className="rightmenu">
            <ul>



           
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
          <h1>Music Theory</h1>
        </div>

        <div className="center-content">
          <ReactPlayer url="https://www.youtube.com/watch?v=mWpXy57-mvc&t=84s" control={true} />
        </div>

      <div className='t'>
      <div className="center-content">
        <button onClick={() => window.location.href = 'theoryinfo'}>Deep in theory</button>
        </div>
        </div>
      </div>
    </div>


  )
}

export default Theory

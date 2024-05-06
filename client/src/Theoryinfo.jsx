import { React, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import './components/Sidebar.css'
import Metronome from './Metronome-main/Metronome';
import { serverUrl } from './global/constants.js';
import './Theory.css'

function Theoryinfo() {

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
          <h1>Deep In Theory</h1>
          <br></br>
          <h2>Notes :
          </h2>
          <br></br>
          <h3> In Western music notation, there are 12 unique notes in an octave, represented 
            by the letters A, B, C, D, E, F, and G,<br></br> each with a corresponding sharp (#) or flat (b) version.
             <br></br> These notes repeat in higher and lower octaves. The distance between two notes is called an interval,         
             <br></br>and each interval has a specific quality, such as major, minor, perfect, augmented, or diminished.
          </h3>
          <br></br>
          <h2>Chords :
          </h2>
          <br></br>
          <h3>  A chord is a group of three or more notes played simultaneously. The most basic type of chord is a triad, 
            <br></br>consisting of a root note, a third above the root, and a fifth above the root. 
            <br></br>Triads can be major, minor, augmented, or diminished, 
            <br></br>depending on the intervals between their constituent notes.
            <br></br>Chords can also be extended to include seventh, ninth, eleventh, and thirteenth intervals, 
            <br></br>creating richer and more complex harmonies.
          </h3>

          <br></br>
          <h2>Scales :
          </h2>
          <br></br>
          <h3>  A scale is a series of notes arranged in ascending or descending order according to pitch.    
              <br></br> Scales provide the basic material for melody and harmony in music. Besides the major scale,
              <br></br> there are many other types of scales,  including minor scales     
              <br></br> (such as natural, harmonic, and melodic minor), pentatonic scales, blues scales, and modes 
                <br></br> (such as the Dorian, Phrygian, Lydian, Mixolydian, Aeolian, and Locrian modes).    
                <br></br> Each scale has its own unique sound and character, which influences the mood and emotional impact of the music.
          </h3>


        </div>

 
        </div>
    </div>


  )
}

export default Theoryinfo

import { React, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import './components/Sidebar.css'
import { Piano } from './piano/Piano.js';
import Metronome from './Metronome-main/Metronome';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import * as Tone from 'tone'
import { Scale } from 'tonal'

function AllScale() {
  const serverUrl = process.env.REACT_APP_EC2_API || 'http://localhost:8081';
  const synth = new Tone.PolySynth({
    oscillator: {
      type: 'amtriangle',
    },
    envelope: {
      attack: 0.02,
      decay: 0.1,
      sustain: 0.3,
      release: 1,
    },
  }).toDestination()
  const [auth, setAuth] = useState(false)
  // const [message, setMessage] = useState('')
  const [profile_name, setProfile_name] = useState('')
  axios.defaults.withCredentials = true
  const [scale, setScale] = useState([])
  const [filterValues, setFilterValues] = useState({
    scale_note: '',
    scale_tension: '',
  })

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${serverUrl}/scale/findscale`, filterValues);
        setScale(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filterValues])

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterValues(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleLogout = () => {
    axios.get(`${serverUrl}/logout`)
      .then(res => {
        window.location.reload(true);
      }).catch(err => console.log(err))
  }

  const playSound = async (scale_name) => {
    try {
      // Correct the condition to check if the context is not running
      if (Tone.context.state !== 'running') {
        await Tone.start();
        console.log("Audio context started");
      }
      console.log("Audio context is already running");
      const scaleValue = scale_name;
      const tonic = Scale.get(scaleValue).tonic;
      const aliases = Scale.get(scaleValue).aliases[0];
      const tonic_oct = tonic + '3';
      const scaleName = tonic_oct+" "+aliases
      const scale = Scale.get(scaleName);
      const notes = scale.notes
      console.log(notes)
      let noteIndex = 0;
      Tone.Transport.scheduleRepeat(time => {
        if (noteIndex < notes.length) {
          synth.triggerAttackRelease(notes[noteIndex], '8n', time);
          noteIndex++;
        }
         else {
          Tone.Transport.cancel()
          // Stop the Transport to prevent infinite loop
          Tone.Transport.stop();
          noteIndex = 0
        }
      }, '8n');
      // Start the Transport to begin the sequence
      Tone.Transport.start();
    } catch (error) {
      console.error('Failed to start audio:', error);
    }
  }; 
 

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

          <li><a href="Home"><i ></i>Home</a></li>
            <li><a href="ChordPiano"><i ></i>Piano Chords</a></li>
            <li><a href="ChordGuitar"><i ></i>Guitar Chords</a></li>
            <li><a href="allscale"><i ></i>All Scales</a></li>
            <li><a href="theory"><i ></i>Music Theory</a></li>
            <li><a href="eartrain"><i ></i>Ear Trainning</a></li>
            <li><a href="Quiz"><i ></i>Quiz</a></li>
            <div>
              <Metronome />
            </div>

          </ul>
        </nav>
      </div>



      <div className="bgimage">
        <div className="menu">

          <div className="rightmenu">
            <ul>



              <a><li>
                <select id="scaleNote" name="scale_note" onChange={handleFilterChange} value={filterValues.scale_note}>
                  <option value="">Note</option>
                  <option value="C">C</option>
                  <option value="C#">C# / Db</option>
                  <option value="D">D</option>
                  <option value="Eb">Eb</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                  <option value="F#">F# / Gb</option>
                  <option value="G">G</option>
                  <option value="G#">G# / Ab</option>
                  <option value="A">A</option>
                  <option value="Bb">Bb</option>
                  <option value="B">B</option>

                </select>
              </li></a>
              <a><li>
                <select id="scaleTension" name="scale_tension" onChange={handleFilterChange} value={filterValues.scale_tension}>
                  <option value="">Tension</option>
                  <option value="Major">Major</option>
                  <option value="Minor">Minor</option>
                  <option value="Major 7">Major 7</option>
                  <option value="Minor 7">Minor 7</option>
                  <option value="7">7</option>
                  <option value="Dim">Dim</option>
                  <option value="9">9</option>
                </select>

              </li></a>

              {
                auth ? (
                  <>
                    <a href="profile"><li>Profile: {profile_name}</li></a>
                    <a onClick={handleLogout}><li>Logout</li></a>
                  </>
                ) : (
                  <a href="login"><li>Login</li></a>
                )
              }


            </ul>
          </div>
        </div>

        <div className="text">
          <h1>All Scale</h1>
        </div>

        <div className="center-content">
          <Piano />
        </div>




        <div className="center-content">
          <ImageList sx={{ width: 850, maxHeight: 370}} cols={3} rowHeight={80}>
            {scale.map((scale, index) => (
              <ImageListItem key={index}>
                <div key={index}>
                  <img src={`/img/${scale.scale_src}`} onClick={() => playSound(scale.scale_name)} style={{ maxWidth: '100%', maxHeight: '150%' ,cursor: 'pointer'}} />
                </div>
              </ImageListItem>
            ))}
          </ImageList>
        </div>

      </div>
    </div>
  )
}

export default AllScale;

import { React, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import './components/Sidebar.css'
import { Piano } from './piano/Piano.js';
import Metronome from './Metronome-main/Metronome';
import { serverUrl } from './global/constants.js';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import * as Tone from 'tone'
import { Chord } from 'tonal'

function ChordPiano() {
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
  const [chord_piano, setChordPiano] = useState([])
  const [filterValues, setFilterValues] = useState({
    chord_note: '',
    chord_tension: '',
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
        const response = await axios.post(`${serverUrl}/chord/findchord`, filterValues);
        setChordPiano(response.data);
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

  const playSound = async (chord_name) => {
    try {
      // Correct the condition to check if the context is not running
      if (Tone.context.state !== 'running') {
        await Tone.start();
        console.log("Audio context started");
      }
      console.log("Audio context is already running");
  
      const chordValue = chord_name;
      const tonic = Chord.get(chordValue).tonic;
      const aliases = Chord.get(chordValue).aliases[0];
      const tonic_oct = tonic + '3'; 
      const chordNotes = Chord.notes(aliases, tonic_oct);
      synth.triggerAttackRelease(chordNotes, '2n');
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


          </ul>
        </nav>
      </div>



      <div className="bgimage">
        <div className="menu">

          <div className="rightmenu">
            <ul>



              <a><li>
                <select id="chordNote" name="chord_note" onChange={handleFilterChange} value={filterValues.chord_note}>
                  <option value="">Note</option>
                  <option value="C">C</option>
                  <option value="C#">C#</option>
                  <option value="D">D</option>
                  <option value="Eb">Eb</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                  <option value="F#">F#</option>
                  <option value="A">A</option>
                  <option value="Bb">Bb</option>
                  <option value="B">B</option>

                </select>
              </li></a>
              <a><li>
                <select id="chordTension" name="chord_tension" onChange={handleFilterChange} value={filterValues.chord_tension}>
                  <option value="">Tension</option>
                  <option value="Major">Major</option>
                  <option value="Minor">Minor</option>
                  <option value="Major 7">Major 7</option>
                  <option value="Minor 7">Minor 7</option>
                  <option value="7">7</option>
                  <option value="Dim">Dim</option>
                  <option value="9">add2</option>
                </select>

              </li></a>

            
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
          <h1>Piano Chord</h1>
        </div>

        <div className="center-content">
          <Piano />
        </div>




        <div className="center-content">
          <ImageList sx={{ width: 900, maxHeight: 370}} cols={6} rowHeight={90}>
            {chord_piano.map((chord, index) => (
              <ImageListItem key={index}>
                <div key={index}>
                  <img src={`/img/${chord.piano_src}`} onClick={() => playSound(chord.chord_name)} style={{ maxWidth: '100%', maxHeight: '100%' ,cursor: 'pointer'}} />
                </div>
              </ImageListItem>
            ))}
          </ImageList>
        </div>

      </div>
    </div>
  )
}

export default ChordPiano

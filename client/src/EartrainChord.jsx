import { React, useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import * as Tone from 'tone'
import './components/Quizhome.css'
import './Home.css'
import { serverUrl } from './global/constants.js';

function EartrainChord() {
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

  const handleDifficultyChange = (difficulty, category) => {
    setValues({ ...values, difficulty_name: difficulty, category_name: category })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(`${serverUrl}/eartrain/question`, values)
      const response2 = values.category_name === 'Note' ? await axios.get(`${serverUrl}/eartrain/note`) : await axios.get(`${serverUrl}/eartrain/chord`)
      navigate('/eartrain/question', { state: { data: response.data, data2: response2.data, difficulty_name: values.difficulty_name, category_name: values.category_name, profile_name: profile_name} })
      await Tone.start()
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

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
        <h1>Chord training</h1>
        <h2>Please select difficulty to training</h2>
      </div>

      <div className='qh'>
        <div className='container'>
          <form onSubmit={handleSubmit}>
            <div className='Chord'>
              <button type="submit" onClick={() => handleDifficultyChange('Easy', 'Chord')}>Easy</button>
              <button type="submit" onClick={() => handleDifficultyChange('Normal', 'Chord')}>Normal</button>
              <button type="submit" onClick={() => handleDifficultyChange('Hard', 'Chord')}>Hard</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default EartrainChord
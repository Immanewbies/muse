import { React, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Home.css'

function Home() {
  const serverUrl = process.env.REACT_APP_EC2_API || 'http://localhost:8081';
  const [auth, setAuth] = useState(false);
  const [profile_name, setProfile_name] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${serverUrl}`, { withCredentials: true });
        if (response.data.Status === "Success") {
          setAuth(true);
          setProfile_name(response.data.profile_name);
        } else {
          setAuth(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
          <Link to="/"><li id="firstlist" >Home</li></Link>
            <Link to="/chordpiano">    <li > Chords & Scale</li> </Link>
            <Link to="/eartrain"> <li>Ear Training</li></Link>
            <Link to="/quiz"><li>Quiz</li></Link>
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
        <h1>Deep In Musician</h1>
      </div>

      <div className='qh'>
        <div className='container'>
                    <button onClick={() => window.location.href = 'chordpiano'}>Chord & Scale</button>
                    <button onClick={() => window.location.href = 'eartrain'}>Ear Training</button>
                    <button onClick={() => window.location.href = 'quiz'}>Quiz</button>

      </div></div>
    </div>
  )
}

export default Home

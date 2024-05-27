import { React, useEffect, useState } from 'react'
import axios from 'axios'
import './Profile.css'
import './Sidebar.css'
import { serverUrl } from '../global/constants.js';

function Profile({ profile_name }) {
    const [userScore, setUserScore] = useState([])
    const [profilename, setProfileName] = useState(null)
    const [bestScores, setBestScores] = useState([])
    const [totalScore, setTotalScore] = useState(0)
    const [percent, setPercent] = useState(0)
    const [level, setLevel] = useState(1)
    const [progressLevel, setProgressLevel] = useState('Beginner')


    useEffect(() => {
        if (profile_name && !profilename) {
            setProfileName(profile_name)
        }
    }, [profile_name, profilename])

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (profilename) {
                    const response = await axios.post(`${serverUrl}/user/getscore`, { profile_name: profilename })
                    setUserScore(response.data)
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [profilename])

    useEffect(() => {
        const calculateBestScores = () => {
            const bestScoresMap = new Map() // Use a map to store best scores for each quiz_set_id

            userScore.forEach(score => {
                const existingScore = bestScoresMap.get(score.quiz_set_id)
                if (!existingScore || score.score > existingScore.score) {
                    bestScoresMap.set(score.quiz_set_id, score)
                }
            })

            const updatedBestScores = Array.from(bestScoresMap.values()) // Convert map values to array
            setBestScores(updatedBestScores)

            // Calculate total score and percentage
            const total = updatedBestScores.reduce((acc, curr) => acc + curr.score, 0)
            const percentage = (total / 90) * 100
            setTotalScore(total)
            setPercent(percentage)

            // Calculate level and progress level
            let newLevel = 1
            let newProgressLevel = 'Beginner'
            if (percentage >= 50) {
                newLevel = 2
                newProgressLevel = 'Basic'
            }
            if (percentage >= 90) {
                newLevel = 3
                newProgressLevel = 'Standard'
            }
            setLevel(newLevel)
            setProgressLevel(newProgressLevel)
        }

        if (userScore.length > 0) {
            calculateBestScores()
        }
    }, [userScore])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return date.toLocaleString('en-GB', options);
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

                        <li><a href="Home"><i ></i>Home</a></li>
                        <li><a href="ChordPiano"><i ></i>Piano Chords</a></li>
                        <li><a href="ChordGuitar"><i ></i>Guitar Chords</a></li>
                        <li><a href="allscale"><i ></i>All Scales</a></li>
                        <li><a href="theory"><i ></i>Music Theory</a></li>
                        <li><a href="eartrain"><i ></i>Ear Trainning</a></li>
                        <li><a href="Quiz"><i ></i>Quiz</a></li>


                    </ul>
                </nav>
            </div>


            <div className="menu">
                <div className="leftmenu">
                </div>
            </div>



            <div className='p'>
                <div className="center-content">
                    <h1>Progress Level: {progressLevel}</h1>
                </div>

                <div className='center-content'>
                    <div className="container">
                        <div className="ui-widgets">
                            <div className="ui-values">{totalScore}/90</div>
                            <div className="ui-labels">Score</div>
                        </div>
                        <div className="ui-widgets">
                            <div className="ui-values">{percent.toFixed(2)}%</div>
                            <div className="ui-labels">Total</div>
                        </div>
                        <div className="ui-widgets">
                            <div className="ui-values">{level}</div>
                            <div className="ui-labels">Level</div>
                        </div>



                    </div>
                </div>


            </div>
            <div className="center-container">

                <div className="table-container">

                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Difficulty</th>
                                <th>Score</th>
                                <th>Submit Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userScore.map((score, index) => (
                                <tr key={index}>
                                    <td>{score.category_name}</td>
                                    <td>{score.difficulty_name}</td>
                                    <td>{score.score}</td>
                                    <td>{formatDate(score.submit_date)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


    )
}

export default Profile

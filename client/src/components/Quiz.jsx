import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './Quiz.css'
import '../Home.css'
import axios from 'axios'
import { serverUrl } from '../global/constants.js';

function Quiz() {

  const location = useLocation()
  const [data, setData] = useState(null)
  const [index, setIndex] = useState(0)
  const [question, setQuestion] = useState([])
  const [lock, setLock] = useState(false)
  const [score, setScore] = useState(0)
  const [result, setResult] = useState(false)
  const [values, setValues] = useState({
    profile_name: '',
    category_name: '',
    difficulty_name: '',
    score: '',
  })
  const navigate = useNavigate()
  const [questionL, setQuestionL] = useState(0)

  let Option1 = useRef(null)
  let Option2 = useRef(null)
  let Option3 = useRef(null)
  let Option4 = useRef(null)
  let option_arr = [Option1, Option2, Option3, Option4]

  useEffect(() => {
    if (location.state && location.state.data && location.state.category_name && location.state.difficulty_name && location.state.profile_name) {
      const { data, category_name, difficulty_name, profile_name } = location.state
      setData(data)
      setValues({ difficulty_name: difficulty_name, category_name: category_name, profile_name: profile_name })
    }
    else {
      navigate("/quiz")
    }
  }, [location.state]);

  useEffect(() => {
    if (data) {
      if (data.length > 10) {
        const randomIndices = [];
        while (randomIndices.length < 10) {
          const randomIndex = Math.floor(Math.random() * data.length);
          if (!randomIndices.includes(randomIndex)) {
            randomIndices.push(randomIndex);
            setQuestionL(prevQuestionL => prevQuestionL + 1);
          }
        }
        const selectedQuestion = randomIndices.map(index => data[index]);
        setQuestion(selectedQuestion);
      } else {
        setQuestion(data);
      }
    }
  }, [data]);

  useEffect(() => {
    if (question.length > 0) {
      setQuestion(question[index]);
    }
  }, [question, index]);

  useEffect(() => {
    if (score > 0) {
      setValues({ ...values, score: score })
    }
  }, [score])

  if (!data || !question || !data.length) {
    return <div>Loading...</div>
  }

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct")
        setLock(true)
        setScore(prev => prev + 1)
      } else {
        e.target.classList.add("wrong")
        setLock(true)
        option_arr[question.ans - 1].current.classList.add("correct")
      }
    }
  }

  const next = () => {
    if (lock === true) {
      if (index === questionL - 1) {
        const write_score = async () => {
          try {
            await axios.post(`${serverUrl}/user/score`, values)
          } catch (error) {
            console.error('Error fetching data:', error)
          }
        }

        write_score()
        setResult(true)
        return 0
      }
      setIndex(prevIndex => prevIndex + 1)
      setQuestion(data[index + 1])
      setLock(false)
      option_arr.map((option) => {
        option.current.classList.remove("wrong")
        option.current.classList.remove("correct")
        return null
      })
    }
  }

  const back = () => {
    navigate("/quiz")
  }

  return (
    <div className='q'>
      <div className='container'>
        <h1>Music Quiz</h1>
        <hr />
        {
          result ? (
            <>
              <h2>You Scored {score} out of {questionL}</h2>
              <button onClick={back}>Back</button>
            </>
          ) :
            <>
              <h2>{index + 1}. {question.question_text}</h2>
              <ul>
                <li ref={Option1} onClick={(e) => { checkAns(e, 1) }}>{question.option1}</li>
                <li ref={Option2} onClick={(e) => { checkAns(e, 2) }}>{question.option2}</li>
                <li ref={Option3} onClick={(e) => { checkAns(e, 3) }}>{question.option3}</li>
                <li ref={Option4} onClick={(e) => { checkAns(e, 4) }}>{question.option4}</li>
              </ul>
              <button onClick={next}>Next</button>
              <div>{index + 1} of {questionL} question</div>
            </>
        }

      </div>
    </div>
  )
}

export default Quiz
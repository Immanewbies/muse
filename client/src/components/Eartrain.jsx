import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as Tone from 'tone'
import { Chord } from 'tonal'
import axios from 'axios'
import './Eartrain.css'

function Eartrain() {
    const serverUrl = process.env.REACT_APP_EC2_API || 'http://localhost:8081';
    const location = useLocation()
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
    const [octave, setOctave] = useState([])
    const [quiz_length, setQuizLength] = useState(0)
    const [answers, setAnswers] = useState([])
    const [pattern, setPattern] = useState([])
    const [data, setData] = useState(null)
    const [category_name, setCategory] = useState(null)
    const [difficulty_name, setDifficulty] = useState(null)
    const [index, setIndex] = useState(0)
    const [question, setQuestion] = useState([])
    const [lock, setLock] = useState(false)
    const [score, setScore] = useState(0)
    const [result, setResult] = useState(false)
    const [answered, setAnswered] = useState([])
    const [num, setNum] = useState(1)
    const [quiz_sound, setQuizSound] = useState([])
    const [quizLengthGenerated, setQuizLengthGenerated] = useState(false)
    const [octaveGenerated, setOctaveGenerated] = useState(false)
    const [patternGenerated, setPatternGenerated] = useState(false)
    const [quizSoundGenerated, setQuizSoundGenerated] = useState(false)
    const [isSound, setIsSound] = useState(null)
    const [sortedIndices, setSortedIndices] = useState([])
    const [sortedIndicesIndex, setSortedIndicesIndex] = useState([])
    const [answerCorrect, setAnswerCorrect] = useState(false)
    const [values, setValues] = useState({
        profile_name: '',
        category_name: '',
        difficulty_name: '',
        score: '',
    })
    const navigate = useNavigate()
    const [questionL, setQuestionL] = useState(0)

    useEffect(() => {
        if (location.state && location.state.data && location.state.data2 && location.state.category_name && location.state.difficulty_name && location.state.profile_name) {
            const { data, data2, category_name, difficulty_name, profile_name } = location.state
            setData(data)
            setAnswers(data2)
            setCategory(category_name)
            setDifficulty(difficulty_name)
            setQuizLengthGenerated(false)
            setOctaveGenerated(false)
            setPatternGenerated(false)
            setQuizSoundGenerated(false)
            setValues({ difficulty_name: difficulty_name, category_name: category_name, profile_name: profile_name })
            Tone.start()
        } else {
            navigate("/eartrain")
        }
    }, [location.state])

    useEffect(() => {
        if (!quizLengthGenerated && data && category_name && difficulty_name) {
            const generateQuizLength = () => {
                let quizLengthValue
                if (difficulty_name === 'Hard') {
                    quizLengthValue = 5
                } else if (difficulty_name === 'Normal') {
                    quizLengthValue = 4
                } else {
                    quizLengthValue = 3
                }
                setQuizLength(quizLengthValue)
            }

            generateQuizLength();
            setQuizLengthGenerated(true);
        }
    }, [data, category_name, difficulty_name, quizLengthGenerated]);

    useEffect(() => {
        if (!octaveGenerated && quizLengthGenerated) {
            const generateOctave = () => {
                let octaveValue
                if (difficulty_name === 'Hard') {
                    octaveValue = { min: 2, max: 4 }
                } else if (difficulty_name === 'Normal') {
                    octaveValue = { min: 3, max: 4 }
                } else {
                    octaveValue = { min: 3, max: 3 }
                }
                setOctave(octaveValue)
            }

            generateOctave();
            setOctaveGenerated(true);
        }
    }, [quizLengthGenerated, octaveGenerated]);

    useEffect(() => {
        if (!patternGenerated && octaveGenerated) {
            const generatePattern = () => {
                const newPattern = []
                for (let i = 0; i < quiz_length; i++) {
                    const randomPattern = Math.floor(Math.random() * (octave.max - octave.min + 1)) + octave.min
                    newPattern.push(randomPattern)
                }
                setPattern(newPattern)
            }

            generatePattern();
            setPatternGenerated(true);
        }
    }, [octaveGenerated, patternGenerated]);

    useEffect(() => {
        if (!quizSoundGenerated && patternGenerated) {
            const generateQuizSound = () => {
                const quizSounds = []
                const currentQuestion = { ...question }
                let typeSound

                for (let i = 1; i <= quiz_length; i++) {
                    const answerIndex = currentQuestion[`quiz${i}`] - 1
                    const answer = answers[answerIndex]

                    if (answer && currentQuestion && answer.note_name) {
                        const noteText = answer.note_name
                        quizSounds.push(noteText + pattern[i - 1])
                        typeSound = "Note"
                    } else if (answer && currentQuestion && answer.chord_name) {
                        const chordValue = answer.chord_name
                        const octave = parseInt(pattern[i - 1])
                        const tonic = Chord.get(chordValue).tonic
                        const aliases = Chord.get(chordValue).aliases[0]
                        const tonic_oct = tonic + octave
                        const chordNotes = Chord.notes(aliases, tonic_oct)
                        const chordObject = {
                            time: i - 1,
                            note: chordNotes,
                            duration: '2n'
                        };

                        quizSounds.push(chordObject)
                        typeSound = "Chord"
                    }
                }
                setQuizSound(quizSounds)
                setIsSound(typeSound)
            }

            generateQuizSound();
            setQuizSoundGenerated(true);
        }
    }, [patternGenerated, quizSoundGenerated]);

    useEffect(() => {
        if (data) {
            if (data.length > 10) {
                const randomIndices = []
                while (randomIndices.length < 10) {
                    const randomIndex = Math.floor(Math.random() * data.length)
                    if (!randomIndices.includes(randomIndex)) {
                        randomIndices.push(randomIndex)
                        setQuestionL(prevQuestionL => prevQuestionL + 1);
                    }
                }
                const selectedQuestion = randomIndices.map(index => data[index])
                setQuestion(selectedQuestion)
            } else {
                setQuestion(data)
            }
        }
    }, [data])

    useEffect(() => {
        if (question.length > 0) {
            setQuestion(question[index])
        }
    }, [question, index])

    useEffect(() => {
        if (question && answers) {
            let quizValues = []
            for (let num = 1; num <= 5; num++) {
                if (question[`quiz${num}`] !== null) {
                    quizValues.push({ value: question[`quiz${num}`], index: num - 1 })
                }
            }
            quizValues.sort((a, b) => a.value - b.value)
            const sortedValues = quizValues.map(item => item.value)
            const sortedIndex = quizValues.map(item => item.index)
            setSortedIndices(sortedValues)
            setSortedIndicesIndex(sortedIndex)
        }
    }, [question])

    useEffect(() => {
        const playQuizSound = async () => {
            try {
                if (!Tone.context.state === 'running') {
                    await Tone.start()
                }

                if (quiz_sound) {
                    if (isSound === 'Chord') {
                        let startTime = Tone.now();
                        quiz_sound.forEach((event, index) => {
                            Tone.Transport.schedule(time => {
                                synth.triggerAttackRelease(event.note, event.duration, time);
                            }, startTime + index * Tone.Time("1s").toSeconds());
                        });
                        Tone.Transport.start();
                    } else if (isSound === 'Note') {
                        for (const note of quiz_sound) {
                            synth.triggerAttackRelease(note, '8n')
                            await new Promise((resolve) => setTimeout(resolve, 500))
                        }
                    }
                }
            } catch (error) {
                console.error('Failed to start audio:', error)
            }
        }

        playQuizSound()
    }, [quiz_sound])

    useEffect(() => {
        if (score > 0) {
            setValues({ ...values, score: score })
        }
    }, [score])

    if (!data || !question || !data.length) {
        return <div>Loading...</div>
    }

    const handleAnswer = (selectedNote) => {
        if (lock === false) {
            const currentQuestion = { ...question }
            const element = document.getElementById(num)
            let answerIndex
            if (isSound === 'Note') {
                answerIndex = answers.findIndex(answer => answer.note_name === selectedNote)
            } else if (isSound === 'Chord') {
                answerIndex = answers.findIndex(answer => answer.chord_name === selectedNote)
            }

            if (currentQuestion[`quiz${num}`] != null) {
                if (currentQuestion[`quiz${num}`] === answerIndex + 1) {
                    if (!answerCorrect) {
                        if (num === 1) {
                            setAnswerCorrect(true)
                        }
                        else {
                            setAnswerCorrect(false)
                        }
                    }
                    element.classList.add("correct")
                } else {
                    setAnswerCorrect(false)
                    element.classList.add("wrong")
                }
                if (category_name === 'Note') {
                    setAnswered([...answered, { quizNumber: num, quiz: answers[currentQuestion[`quiz${num}`] - 1].note_name }])
                } else {
                    setAnswered([...answered, { quizNumber: num, quiz: answers[currentQuestion[`quiz${num}`] - 1].chord_name }])
                }
                setNum(prevNum => prevNum + 1)
                if (currentQuestion[`quiz${num + 1}`] == null) {
                    setLock(true)
                }
            }
        }
    }

    const next = () => {
        if (lock === true) {
            if (answerCorrect) {
                setScore(prevScore => prevScore + 1)
            }
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
            setAnswerCorrect(false)
            setIndex(prevIndex => prevIndex + 1)
            setQuestion(data[index + 1])
            setLock(false)
            setNum(1)
            setAnswered([])
            setQuizLength(0)
            setOctave([])
            setPattern([])
            setQuizSound([])
            setQuizLengthGenerated(false)
            setOctaveGenerated(false)
            setPatternGenerated(false)
            setQuizSoundGenerated(false)
            const circleElements = document.getElementsByClassName('txt_circle')
            Array.from(circleElements).forEach(element => {
                element.classList.remove('correct')
                element.classList.remove('wrong')
            })
        }
    }

    const playQuiz = async (index) => {
        try {
            if (!Tone.context.state === 'running') {
                await Tone.start()
            }
            if (isSound === 'Chord') {
                synth.triggerAttackRelease(quiz_sound[index].note, '2n');
            } else if (isSound === 'Note') {
                console.log(quiz_sound[index])
                synth.triggerAttackRelease(quiz_sound[index], '8n');
            }
        } catch (error) {
            console.error('Failed to start audio:', error)
        }
    }

    const back = () => {
        navigate("/eartrain")
    }

    return (
        <div className='e'>
            <div className='container'>
                <h1>Ear Training Quiz: </h1>
                <hr />
                {result ?
                    <>
                        <h2>You Scored {score} out of {questionL}</h2>
                        <button onClick={back}>Back</button>
                    </>
                    :
                    <>
                        <h2>{index + 1}. {question.eartrain_text}</h2>
                        <div className='quiz' style={{ display: 'flex', justifyContent: 'center' }}>
                            {[1, 2, 3, 4, 5].map((quizNumber, idx) => (
                                (question[`quiz${quizNumber}`] !== null) && (
                                    <div key={idx} className='circle'>
                                        <div id={idx + 1} className='txt_circle' onClick={() => playQuiz(idx)}>
                                            {answered.find(quiz => quiz.quizNumber === quizNumber) ? answered.find(quiz => quiz.quizNumber === quizNumber).quiz : "?"}
                                        </div>
                                    </div>
                                )))}
                        </div>
                        <div className='choice' style={{ display: 'flex', justifyContent: 'center' }}>
                            {sortedIndices.map((value, index) => (
                                (isSound === 'Chord') ? (
                                    <button key={index} id={index + 1} onClick={() => { playQuiz(sortedIndicesIndex[index]); handleAnswer(answers[value - 1]?.chord_name) }}>{answers[value - 1]?.chord_name}</button>
                                ) : (
                                    <button key={index} id={index + 1} onClick={() => { playQuiz(sortedIndicesIndex[index]); handleAnswer(answers[value - 1]?.note_name) }}>{answers[value - 1]?.note_name}</button>
                                )
                            ))}
                        </div>
                        <button onClick={next}>Next</button>
                        <div>{index + 1} of {questionL} question</div>
                    </>
                }
            </div>
        </div>
    )
}

export default Eartrain


import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import ChordPiano from './ChordPiano'
import ChordGuitar from './ChordGuitar'
import QuizHome from './QuizHome'
import QuizPage from './QuizPage'
import EartrainNote from './EartrainNote'
import EartrainPage from './EartrainPage'
import ProfilePage from './ProfilePage'
import EarTraining from './EarTraining'
import EartrainChord from './EartrainChord'
import Metronome from './Metronome-main/Metronome'
import Theory from './Theory'
import AllScale from './AllScale'
import Theoryinfo from './Theoryinfo'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/chordPiano' element={<ChordPiano/>}></Route>
        <Route path='/chordguitar' element={<ChordGuitar/>}></Route>
        <Route path='/home' element={<Home/>}> </Route> 
        <Route path='/quiz' element={<QuizHome/>}> </Route> 
        <Route path='/quiz/question' element={<QuizPage/>}> </Route> 
        <Route path='/eartrainnote' element={<EartrainNote/>}> </Route> 
        <Route path='/eartrain/question' element={<EartrainPage/>}> </Route> 
        <Route path='/profile' element={<ProfilePage/>}></Route>
        <Route path='/eartrain' element={<EarTraining/>}></Route>
        <Route path='/eartrainChord' element={<EartrainChord/>}></Route>
        <Route path='/metronome' element={<Metronome/>}></Route>
        <Route path='/theory' element={<Theory/>}></Route>
        <Route path='/allscale' element={<AllScale/>}></Route>
        <Route path='/theoryinfo' element={<Theoryinfo/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
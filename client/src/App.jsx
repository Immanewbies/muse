import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import ChordPiano from './ChordPiano'
import Home from './Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/chordPiano' element={<ChordPiano/>}></Route>
        <Route path='/home' element={<Home/>}> </Route> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
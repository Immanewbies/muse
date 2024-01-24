import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './Register'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
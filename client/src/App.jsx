import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Login from './Login'
import Register from './Register'
import Home from './Home'

function App() {
  return (
    <BrowserRouter> 
      <Routes>   
       
        <Route path='/login' element={<Login/>}> </Route> 
        <Route path='/register' element={<Register/>}> </Route> 
        <Route path='/home' element={<Home/>}> </Route> 
     

      </Routes>    
    </BrowserRouter>   
  )
}

export default App
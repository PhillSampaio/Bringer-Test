import React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'

import { Login } from './pages/Login'
import { Tracking } from './pages/Tracking'

function App() {
  return (
    <>      
      <Routes>        
        <Route path='/Login' element={<Login />}  />
        <Route path='/Tracking' element={<Tracking />} />
        <Route path='/' element={<Navigate replace to="/Login" />} />
      </Routes>
    </>
  )
}

export default App
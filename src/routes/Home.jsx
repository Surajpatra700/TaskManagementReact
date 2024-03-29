import React from 'react'
import { Routes,Route } from 'react-router-dom'
import LandingPage from '../pages/LandingPage/LandingPage'


const Home = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
      </Routes>
    </div>
  )
}

export default Home

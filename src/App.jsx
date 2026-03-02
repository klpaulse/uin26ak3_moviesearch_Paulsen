import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import Movie from './pages/Movie'
import {Route, Routes} from 'react-router-dom'

function App() {
  

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path=":movie" element={<Movie />} />
    </Routes>
  )
}

export default App


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

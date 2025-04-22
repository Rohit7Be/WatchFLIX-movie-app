import { useState } from 'react'
import "./css/App.css"
import Favorite from './pages/Favorite';
import MovieCard from './components/MovieCard'
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { MovieProvider } from './contexts/MovieContext';
import MovieDetails from './components/MovieDetails';
function App() {
  


  return (
    <MovieProvider>
      <Navbar/>
      <main className='main-content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Favorite' element={<Favorite />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>

      </main>
    </MovieProvider>
  )
}


export default App

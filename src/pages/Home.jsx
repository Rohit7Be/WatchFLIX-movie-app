import React from 'react'
import MovieCard from '../components/MovieCard'
import { useState, useEffect } from 'react'
import { searchMovies, getPopularMovies } from '../services/api'
import '../css/Home.css'
const Home = () => {
  const [searchquery, setSearchquery] = useState("")
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  const API_KEY = "1df11ee012b8d9ca36a307ce5342c448";

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setGenres(data.genres));
  }, []);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);


  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchquery.trim()) return
    if (loading) return

    setLoading(true)
    try {
      const searchResults = await searchMovies(searchquery)
      setMovies(searchResults)
      setError(null)
    } catch (err) {
      console.log(err)
      setError("Failed to search movies...")
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
    if (selectedGenre) {
      url += `&with_genres=${selectedGenre}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }, [selectedGenre]);



  return (
    <div className='home'>
      <form onSubmit={handleSearch} className='search-form'>
        <input type="text" placeholder='Search for movies...' className='search-input' value={searchquery} onChange={(e) => setSearchquery(e.target.value)} />
        <button type='submit' className='search-btn'>Search</button>
      </form>
      {error && <div className="error-message">{error}</div>}

      
      <div className="genre-filter">
        <select onChange={(e) => setSelectedGenre(e.target.value)} value={selectedGenre}>
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>

      {/* using loading state to show loading msg when the data is being fetched otherwise show the movies div  */}
      {loading ? (<div>Loading...</div>) : (<div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>)}


    </div>
  )
}

export default Home

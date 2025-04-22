import React, { useState } from 'react'
import '../css/MovieCard.css'
import { useMovieContext } from '../contexts/MovieContext'
import MovieTrailer from "./MovieTrailer"; 
import { Link } from 'react-router-dom';
const MovieCard = ({ movie }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  const favclick = () => {
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const handleWatchNow = () => {
    const watchUrl = `https://vidsrc.to/embed/movie/${movie.id}`;
    window.open(watchUrl, '_blank');
  };

  const truncateByWords = (str, wordLimit) => {
    const words = str.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : str;
  };

  return (
    
    <div className='movie-card'>
      <div className='movie-poster'>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <div className='movie-overlay'>
          <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={favclick}>
            ♥
          </button>
        </div>
      </div>
      
      <div className='movie-info'>
        <h3>{movie.title}</h3>
        <p>{truncateByWords(movie.overview, 20)}</p>
        <p>Release Year: {movie.release_date.split("-")[0]}</p>

        <button className='trailer-btn' onClick={() => setShowTrailer(!showTrailer)}>
          {showTrailer ? "Hide Trailer" : "Watch Trailer"}
        </button>

        {showTrailer && <MovieTrailer movieId={movie.id} />}

        <Link to={`/movie/${movie.id}`}>
  <button className="watch-now-btn">🎬 Watch Movie</button>
</Link>
      </div>
    </div>
  );
}

export default MovieCard

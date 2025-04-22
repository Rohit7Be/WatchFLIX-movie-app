import React from 'react'
import { useMovieContext } from '../contexts/MovieContext'
import MovieCard from '../components/MovieCard';
import '../css/Favorites.css'
const Favorite = () => {
  const { favorites } = useMovieContext();

  console.log("favorites:", favorites);

  if (!Array.isArray(favorites)) {
    return <p>Favorites data is invalid.</p>;
  }
  if (favorites.length > 0) {
    return (
      <div className='favorites'>
        <h2>Your Favorites</h2>
        <div className="movies-grid favorites-grid">
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <h2>No Favorite Movies Yet</h2>
      <p>Start adding movies to your favorites and they will appear here!</p>
    </div>
  );
}


export default Favorite;

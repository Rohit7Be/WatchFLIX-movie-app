// src/pages/MovieDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/MovieDetails.css'
import { Link } from 'react-router-dom';
const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [cast, setCast] = useState([]);

  
  const API_KEY = "1df11ee012b8d9ca36a307ce5342c448";
  

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));

      const fetchSimilarMovies = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`);
        const data = await response.json();
        setSimilarMovies(data.results.slice(0, 5));
      };

      fetchSimilarMovies();
      const fetchCast = async () => {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`);
          const data = await response.json();
          setCast(data.cast.slice(0, 8)); // Only 5
        } catch (error) {
          console.error("Error fetching cast:", error);
        }
      };
      window.scrollTo(0, 0);
    
      fetchCast();
  }, [id]);


  if (!movie) return <div>Loading...</div>;
  
  

  

  return (
    <div className="movie-details">
  <img
    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
    alt={movie.title}
  />
  <h1>{movie.title}</h1>

  {movie.tagline && <h3 className="tagline">"{movie.tagline}"</h3>}

  <div className="movie-info-box">
    <p><strong>Overview:</strong> {movie.overview}</p>
    <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}</p>
    <div className="cast-section">
  <h2>Cast</h2>
  <div className="cast-grid">
    {cast.map((member) => (
      <div className="cast-card" key={member.id}>
        <p><strong><a
              href={`https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(member.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="wiki-link"
            >
              {member.name}
            </a></strong></p>
        <p>{member.character}</p>
      </div>
    ))}
  </div>
</div>


    <p><strong>Release Date:</strong> {movie.release_date}</p>
    <p><strong>Runtime:</strong> {Math.floor(movie.runtime / 60)}hr - {movie.runtime % 60}mins</p>

    <p><strong>Rating:</strong> ⭐ {movie.vote_average}</p>

    <a
        href={`https://vidsrc.xyz/embed/movie/${id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="play-btn">▶ Play Now</button>
      </a>
  </div>

  
      <div className="similar-movies">
  <h2>Similar Movies</h2>
  <div className="similar-movie-list">
    {similarMovies.map((movie) => (
      <Link to={`/movie/${movie.id}`} key={movie.id} className="similar-movie-card">
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
        />
        <p>{movie.title}</p>
      </Link>
    ))}
  </div>
</div>


</div>


  );
};

export default MovieDetails;

const API_KEY = "1df11ee012b8d9ca36a307ce5342c448";
const BASE_URL = "https://api.themoviedb.org/3"

// example url is https://www.omdbapi.com/?apikey=d84ad2ae&s=batman

// example url for tmdb api below 
// https://api.themoviedb.org/3/movie/popular?api_key=1df11ee012b8d9ca36a307ce5342c448

// https://api.themoviedb.org/3/search/movie?api_key=1df11ee012b8d9ca36a307ce5342c448&query=batman 

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    console.log(data)
    

    return data.results;
  };
  
  export const searchMovies = async (query) => {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}`
    );
    const data = await response.json();
    return data.results;
  };


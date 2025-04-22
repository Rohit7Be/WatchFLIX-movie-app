import { useEffect, useState } from "react";
const apikey = "1df11ee012b8d9ca36a307ce5342c448";

const MovieTrailer = ({ movieId }) => {
  const [trailerUrl, setTrailerUrl] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apikey}`
      );
      const data = await res.json();
      console.log(apikey);

      const trailer = data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );

      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
      }
    };

    fetchTrailer();
  }, [movieId]);

  if (!trailerUrl) return <p>No trailer available... 😕</p>;

  return (
    <div className="trailer-wrapper" style={{ marginTop: "1rem" }}>
      <iframe
        width="100%"
        height="400"
        src={trailerUrl}
        title="Movie Trailer"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default MovieTrailer;

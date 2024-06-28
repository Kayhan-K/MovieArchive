import { useState } from "react";
import Heart from "react-heart";

function MovieCard({ movies, toggleSave }) {
  const [movieInfo, setMovieInfo] = useState(null);
  const [hovered, setHovered] = useState(false);

  const apiKEY = import.meta.env.VITE_API_KEY;

  async function fetchMovieInfo(imdbID) {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKEY}&i=${imdbID}&plot=short`
      );

      const result = await response.json();
      setMovieInfo(result);
    } catch (error) {
      console.error("Error fetching movie info:", error);
    }
  }

  const onMouseHover = (imdbID) => {
    fetchMovieInfo(imdbID);
    setHovered(true);
  };

  const onMouseLeave = () => {
    setMovieInfo(null);
    setHovered(false);
  };

  return (
    <div className="flex flex-wrap gap-x-10 gap-y-10 justify-center items-center flex-start max-w-8xl cursor-pointer h-4/5 sm:px-12 lg:px-36 ">
      {Array.isArray(movies) &&
        movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="h-80 w-60 relative"
            onMouseEnter={() => onMouseHover(movie.imdbID)}
            onMouseLeave={onMouseLeave}
          >
            <img
              src={movie.Poster}
              className="w-full h-72 rounded-xl "
              alt={movie.Title}
            />
            {hovered && movieInfo && movie.imdbID === movieInfo.imdbID && (
              <div className="absolute top-0 flex flex-col gap-y-3 w-full h-72 text-white justify-center p-3 pt-6 bg-gray-700 bg-opacity-80 backdrop-blur-lg rounded-md">
                <h2 className="text-sm text-left font-normal">
                  {movieInfo.Plot}
                </h2>
                <p>Released: {movieInfo.Released}</p>
                <p>Runtime: {movieInfo.Runtime}</p>
                <p>Rated: {movieInfo.Rated}</p>
              </div>
            )}

            <div className="flex justify-between mt-2 items-center">
              <h3>{movie.Title}</h3>
              <Heart
                className="min-w-6 mx-4 "
                isActive={movie.isActive}
                onClick={() => toggleSave(movie.imdbID)}
              />
            </div>
          </div>
        ))}
    </div>
  );
}

export default MovieCard;

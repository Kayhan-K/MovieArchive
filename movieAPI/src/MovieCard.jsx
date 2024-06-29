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
    <div className="flex flex-wrap gap-x-6 gap-y-24 sm:gap-x-10 sm:gap-y-20 justify-center items-center flex-start max-w-8xl cursor-pointer h-4/5 sm:px-12 lg:px-36 ">
      {Array.isArray(movies) &&
        movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="w-32 h-48 relative min-[420px]:min-h-56 min-[420px]:min-w-44 md:h-64 md:w-52"
            onMouseEnter={() => onMouseHover(movie.imdbID)}
            onMouseLeave={onMouseLeave}
          >
            <img
              src={movie.Poster}
              className="w-full h-full rounded-xl "
              alt={movie.Title}
            />
            {hovered && movieInfo && movie.imdbID === movieInfo.imdbID && (
              <div className="absolute text-[10px] md:text-sm overflow-auto top-0 flex flex-col gap-y-1 w-full h-48 min-[420px]:min-h-56 md:h-64 text-white justify-center p-3 pt-6 bg-gray-700 bg-opacity-80 backdrop-blur-lg rounded-md">
                <h2 className=" text-left font-normal">{movieInfo.Plot}</h2>
                <p className="font-bold">Released: {movieInfo.Released}</p>
                <p className="font-bold">Runtime: {movieInfo.Runtime}</p>
                <p className="font-bold">Rated: {movieInfo.Rated}</p>
              </div>
            )}

            <div className="flex justify-between mt-2 items-center">
              <h3 className="text-xs md:text-sm">{movie.Title}</h3>
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

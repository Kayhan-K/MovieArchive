import { useState } from "react";
import Heart from "react-heart";

function MovieCard({ movies, toggleSave }) {
  const [hover, isHovered] = useState(false);
  console.log(movies);

  const onMouseHover = () => {
    isHovered(!hover);
    console.log(hover);
  };

  return (
    <div className="flex flex-wrap gap-x-10 justify-center items-center flex-start max-w-7xl cursor-pointer">
      {Array.isArray(movies) &&
        movies.map((movie) => (
          <div key={movie.imdbID} className="w-56">
            <img
              src={movie.Poster}
              onMouseEnter={onMouseHover}
              onMouseLeave={onMouseHover}
              className={`h-72 w-full rounded-xl hover:blur-sm`}
            />

            <div className="flex justify-between mt-2 items-center">
              <h3>{movie.Title}</h3>
              <Heart
                className={"w-6 mx-4"}
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

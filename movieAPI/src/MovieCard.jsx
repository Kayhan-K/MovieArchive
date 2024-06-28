import Heart from "react-heart";

function MovieCard({ movies, toggleSave }) {
  return (
    <div className="flex flex-wrap gap-x-10 justify-center flex-start max-w-7xl cursor-pointer">
      {Array.isArray(movies) &&
        movies.map((movie) => (
          <div key={movie.imdbID} className="w-56">
            <img src={movie.Poster} className="h-72 w-full rounded-xl" />
            <div className="flex justify-between mt-2">
              <h3>{movie.Title}</h3>
              <Heart
                className={"w-6 mx-4"}
                isActive={movie.isActive}
                onClick={() => toggleSave(movie.imdbID)}
              />
            </div>
            <p>{movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)}</p>
          </div>
        ))}
    </div>
  );
}

export default MovieCard;

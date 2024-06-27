import MovieCard from "./MovieCard.jsx";

function MyList({ savedMovies, toggleSave }) {
  return <MovieCard movies={savedMovies} toggleSave={toggleSave} />;
}

export default MyList;

import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard"; // Make sure to import the MovieCard component

function MyList({ savedMovies, toggleSave }) {
  let navigate = useNavigate();

  const toHome = () => {
    navigate("/");
  };

  console.log(savedMovies);

  return (
    <>
      <div className="navbar bg-base-100">
        <a className="btn btn-ghost text-2xl ml-10" onClick={toHome}>
          MovieArchive
        </a>
      </div>
      {savedMovies.length > 0 ? (
        <MovieCard movies={savedMovies} toggleSave={toggleSave} />
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <h1 className="font-4xl">You have no movies.</h1>
        </div>
      )}
    </>
  );
}

export default MyList;

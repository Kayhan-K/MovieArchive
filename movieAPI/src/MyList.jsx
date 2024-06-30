import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

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
        <a className="btn btn-ghost text-2xl ml-10 mt-4" onClick={toHome}>
          <BsArrowLeft />
          MovieArchive
        </a>
      </div>
      {savedMovies.length > 0 ? (
        <MovieCard movies={savedMovies} toggleSave={toggleSave} />
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <h1 className="md:text-4xl font-thin text-gray-400">
            You have no saved movies or series.
          </h1>
        </div>
      )}
    </>
  );
}

export default MyList;

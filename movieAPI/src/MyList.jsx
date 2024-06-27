import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard.jsx";

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
      <MovieCard movies={savedMovies} toggleSave={toggleSave} />
    </>
  );
}

export default MyList;

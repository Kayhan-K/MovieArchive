import { BsBookmarkFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function Navbar({
  changeUserInput,
  clickMovieBtn,
  clickSeriesBtn,
  savedMovies,
}) {
  let navigate = useNavigate();

  const toMyList = () => {
    navigate("/My-list");
    console.log("working");
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">MovieArchive</a>
        </div>
        <div className="navbar-center gap-4">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              id="userSearch"
              className="input input-bordered w-24 md:w-auto"
              onChange={(e) => changeUserInput(e.target.value)}
            />
          </div>

          <a className="btn" onClick={clickMovieBtn}>
            Movie
          </a>
          <a className="btn" onClick={clickSeriesBtn}>
            Series
          </a>
        </div>
        <div className="navbar-end">
          <BsBookmarkFill
            size={32}
            color={`${savedMovies.length > 0 ? "orange" : "grey"}`}
            className="mr-6 cursor-pointer"
            onClick={toMyList}
          />
        </div>
      </div>
    </>
  );
}

export default Navbar;

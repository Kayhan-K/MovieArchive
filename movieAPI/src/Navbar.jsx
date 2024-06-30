import { BsBookmarkFill } from "react-icons/bs";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar({
  changeUserInput,
  clickMovieBtn,
  clickSeriesBtn,
  savedMovies,
}) {
  let navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 500);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toMyList = () => {
    navigate("/My-list");
    console.log("working");
  };

  return (
    <>
      <div className="navbar bg-base-100 sm:pt-6 flex flex-col gap-y-2 sm:gap-y-0 min-[500px]:flex-row w-full">
        <div className="navbar-start flex items-center">
          <a className="btn btn-ghost text-xl relative">MovieArchive</a>
          {isSmallScreen && (
            <BsBookmarkFill
              size={32}
              color={`${savedMovies.length > 0 ? "orange" : "grey"}`}
              className="ml-4 cursor-pointer absolute top-3 right-10"
              onClick={toMyList}
            />
          )}
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
          {!isSmallScreen && (
            <BsBookmarkFill
              size={32}
              color={`${savedMovies.length > 0 ? "orange" : "grey"}`}
              className="mr-6 cursor-pointer"
              onClick={toMyList}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;

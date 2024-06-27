import { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./HomePage.jsx";
import MyList from "./MyList.jsx";

function App() {
  const [movies, setMovies] = useState(() => {
    const storedMovies = localStorage.getItem("movies");

    return storedMovies ? JSON.parse(storedMovies) : [];
  });

  const [savedMovies, setSavedMovies] = useState(() => {
    const storedSavedMovies = localStorage.getItem("savedMovies");

    return storedSavedMovies ? JSON.parse(storedSavedMovies) : [];
  });

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  useEffect(() => {
    localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
  }, [savedMovies]);

  function handleSaveMovie(movieIndex) {
    toggleSaveIcon(movieIndex);

    const clickedMovie = movies[movieIndex];

    setSavedMovies((prevSavedMovies) => {
      if (!clickedMovie.isActive) {
        // Adding the movie to savedMovies if it's not active or saved to the saved movie array
        if (
          !prevSavedMovies.some(
            (prevMovie) => prevMovie.imdbID === clickedMovie.imdbID
          )
        ) {
          return [...prevSavedMovies, clickedMovie];
        }
      } else if (clickedMovie.isActive) {
        // Removing the movie from savedMovies if it's not active anymore.
        return prevSavedMovies.filter(
          (prevMovie) => prevMovie.imdbID !== clickedMovie.imdbID
        );
      }
      return prevSavedMovies;
    });
  }

  function toggleSaveIcon(movieIndex) {
    //toggling movies isActive property for save feature
    setMovies((prevMovies) => {
      const updatedMovies = prevMovies.map((movie, index) => {
        if (index === movieIndex) {
          return { ...movie, isActive: !movie.isActive };
        }
        return movie;
      });

      return updatedMovies; // Return the updated movies array
    });
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              savedMovies={savedMovies}
              setSavedMovies={setSavedMovies}
              movies={movies}
              setMovies={setMovies}
              handleSaveMovie={handleSaveMovie}
            />
          }
        />
        <Route
          path="/My-List"
          element={
            <MyList savedMovies={savedMovies} toggleSave={handleSaveMovie} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

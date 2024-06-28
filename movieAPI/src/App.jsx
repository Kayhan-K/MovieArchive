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

  useEffect(() => {
    console.log("savedMovies updated:", savedMovies);
    console.log("Movies updated:", movies);
  }, [savedMovies, movies]);

  function handleSaveMovie(imdbID) {
    setMovies((prevMovies) => {
      // Toggle isActive in movies array
      const updatedMovies = prevMovies.map((movie) => {
        if (movie.imdbID === imdbID) {
          return { ...movie, isActive: !movie.isActive };
        }
        return movie;
      });

      console.log(updatedMovies);

      //check movie within all movies array
      let clickedMovie = updatedMovies.find((movie) => movie.imdbID === imdbID);

      //check movie within savedMovies array if not found in all movies and toggle active state.
      if (!clickedMovie) {
        clickedMovie = savedMovies.find((movie) => movie.imdbID === imdbID);
        clickedMovie = { ...clickedMovie, isActive: !clickedMovie.isActive };
      }

      // Update savedMovies based on the new isActive state
      setSavedMovies((prevSavedMovies) => {
        if (clickedMovie.isActive) {
          // Add the movie to savedMovies if it's activated
          if (
            !prevSavedMovies.some(
              (prevMovie) => prevMovie.imdbID === clickedMovie.imdbID
            )
          ) {
            return [...prevSavedMovies, clickedMovie];
          }
        } else {
          // Remove the movie from savedMovies if it's not active
          return prevSavedMovies.filter(
            (prevMovie) => prevMovie.imdbID !== clickedMovie.imdbID
          );
        }
        return prevSavedMovies;
      });

      return updatedMovies;
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

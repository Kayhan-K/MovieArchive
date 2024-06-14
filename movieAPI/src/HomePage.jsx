import { useState } from "react";
import MovieCard from "./MovieCard.jsx";
import Navbar from "./Navbar.jsx";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [contentType, setContentType] = useState("");

  const apiKEY = import.meta.env.VITE_API_KEY;

  async function fetchData() {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${apiKEY}&type=${contentType}&s=${userInput}`
    );

    const data = await response.json();
    const result = data.Search;

    // If the data is an array and is received then process it, preventing promise rejection
    if (result && Array.isArray(result)) {
      const newArray = result.map((movie) => ({
        ...movie,
        isActive: false,
      }));

      // First set the movies with the new array
      setMovies(newArray);

      // Then update the isActive property based on savedMovies
      setMovies((prevMovies) => {
        return prevMovies.map((movie) => {
          const likedMovie = savedMovies.find((savedMovie) => {
            return savedMovie.imdbID === movie.imdbID;
          });

          if (likedMovie) {
            return { ...movie, isActive: true };
          } else {
            return movie;
          }
        });
      });
    }
  }

  function handleUserInput(input) {
    setUserInput(input);
  }

  function handleMovieBtn() {
    setContentType("Movie");
    fetchData();
  }

  function handleSeriesBtn() {
    setContentType("Series");
    fetchData();
  }

  function handleSaveMovie(movieIndex) {
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

  return (
    <div className="px-10 py-8 flex w-full flex-col items-center">
      <Navbar
        changeUserInput={handleUserInput}
        clickMovieBtn={handleMovieBtn}
        clickSeriesBtn={handleSeriesBtn}
      />
      <MovieCard movies={movies || []} toggleSave={handleSaveMovie} />
    </div>
  );
}

export default HomePage;

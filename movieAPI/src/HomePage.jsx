import { useState } from "react";
import MovieCard from "./MovieCard.jsx";
import Navbar from "./Navbar.jsx";

function HomePage({ handleSaveMovie, savedMovies, setMovies, movies }) {
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

  return (
    <div className="gap-y-12 flex w-full flex-col items-center">
      <Navbar
        changeUserInput={handleUserInput}
        clickMovieBtn={handleMovieBtn}
        clickSeriesBtn={handleSeriesBtn}
        savedMovies={savedMovies}
      />
      <MovieCard movies={movies || []} toggleSave={handleSaveMovie} />
    </div>
  );
}

export default HomePage;

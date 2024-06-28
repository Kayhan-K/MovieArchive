import { useState } from "react";
import MovieCard from "./MovieCard.jsx";
import Navbar from "./Navbar.jsx";

function HomePage({ handleSaveMovie, savedMovies, setMovies, movies }) {
  const [userInput, setUserInput] = useState("");
  const [contentType, setContentType] = useState("");

  const apiKEY = import.meta.env.VITE_API_KEY;

  async function fetchData() {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${apiKEY}&type=${contentType}&s=${userInput}&page=1`
    );

    const data = await response.json();
    const result = data.Search;

    // If the data is an array and is received then process it, preventing promise rejection
    if (result && Array.isArray(result)) {
      const newArray = result.map((movie) => ({
        ...movie,
        isActive: false,
      }));

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
    <div className="flex w-full flex-col items-center h-screen gap-y-6">
      <Navbar
        changeUserInput={handleUserInput}
        clickMovieBtn={handleMovieBtn}
        clickSeriesBtn={handleSeriesBtn}
        savedMovies={savedMovies}
      />
      {movies.length > 0 ? (
        <MovieCard movies={movies || []} toggleSave={handleSaveMovie} />
      ) : (
        <h1 className="text-4xl font-thin text-gray-400 w-full h-screen flex justify-center items-center">
          Please search for a Movie or Series
        </h1>
      )}
    </div>
  );
}

export default HomePage;

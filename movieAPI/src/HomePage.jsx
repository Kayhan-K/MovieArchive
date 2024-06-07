import { useState } from "react";
import MovieCard from "./MovieCard.jsx";
import Navbar from "./Navbar.jsx";

function HomePage({ handleStateToParentApp }) {
  const [movies, setMovies] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [contentType, setContentType] = useState("");
  const [savedMovies, setSavedMovies] = useState([]);

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

  const handleChildStateSavedMovies = (data) => {
    setSavedMovies(data);
    handleStateToParentApp(data);
  };

  return (
    <div className="px-10 py-8 flex w-full flex-col items-center">
      <Navbar
        changeUserInput={handleUserInput}
        clickMovieBtn={handleMovieBtn}
        clickSeriesBtn={handleSeriesBtn}
      />
      <MovieCard
        movies={movies || []}
        setMovies={setMovies}
        stateToParentHome={handleChildStateSavedMovies}
      />
    </div>
  );
}

export default HomePage;

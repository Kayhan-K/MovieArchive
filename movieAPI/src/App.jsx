import { useState } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./HomePage.jsx";
import MyList from "./MyList.jsx";

function App() {
  const [savedMovies, setSavedMovies] = useState([]);

  const handleStateToParentApp = (data) => setSavedMovies(data);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home handleStateToParentApp={handleStateToParentApp} />}
        />
        <Route path="/My-List" element={<MyList savedMovies={savedMovies} />} />
      </Routes>
    </Router>
  );
}

export default App;

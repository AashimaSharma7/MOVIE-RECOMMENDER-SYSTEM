import React, { useState } from "react";
import MovieSelection from "./MovieSelection";
import NavBar from "./Navbar";
import MovieList from "./MovieCard";
import Footer from "./Footer";
import { HashRouter, Route, Routes } from "react-router-dom";

const App = () => {
  const [recommendedTitles, setRecommendedTitles] = useState([]);
  const [recommendedPosters, setRecommendedPosters] = useState([]);
  const [recommendedMoviesID, setRecommendedMoviesID] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");

  const updateRecommendedTitles = (newRecommendedTitles) => {
    setRecommendedTitles(newRecommendedTitles);
  };

  const updateRecommendedPosters = (newRecommendedPosters) => {
    setRecommendedPosters(newRecommendedPosters);
  };

  const updateSelectedMovie = (newSelectedMovie) => {
    setSelectedMovie(newSelectedMovie);
  };

  const updateRecommendedMoviesID = (newRecommendedMoviesID) => {
    setRecommendedMoviesID(newRecommendedMoviesID);
  }

  return (
    <HashRouter>
      <div id="main">
        <NavBar
          updateRecommendations={updateRecommendedTitles}
          updateRecommendedPosters={updateRecommendedPosters}
          updateSelectedMovie={updateSelectedMovie}
          updateRecommendedMoviesID={updateRecommendedMoviesID}
        />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <MovieSelection
                updateRecommendations={updateRecommendedTitles}
                updateRecommendedPosters={updateRecommendedPosters}
                updateSelectedMovie={updateSelectedMovie}
                updateRecommendedMoviesID={updateRecommendedMoviesID}
              />
              <Footer />
            </>
          }
        />
        <Route
          path="/recommendations"
          element={
            <>
              <MovieList
                recommendations={recommendedTitles}
                recommendedPosters={recommendedPosters}
                selectedMovie={selectedMovie}
                recommendedMoviesID={recommendedMoviesID}
              />
              <Footer />
            </>
          }
        />
        <Route
          path="*"
          element={
            <>
              <MovieSelection
                updateRecommendations={updateRecommendedTitles}
                updateRecommendedPosters={updateRecommendedPosters}
                updateSelectedMovie={updateSelectedMovie}
                updateRecommendedMoviesID={updateRecommendedMoviesID}
              />
              <Footer />
            </>
          }
        />
      </Routes>
    </HashRouter>
  );
};

export default App;
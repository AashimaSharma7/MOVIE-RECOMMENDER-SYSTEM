import React from "react";
import MovieIcon from "@mui/icons-material/Movie";
import Typography from "@mui/material/Typography";
import Search from "./Search";

const MovieSelection = ({
  updateRecommendations,
  updateRecommendedPosters,
  updateSelectedMovie,
  updateRecommendedMoviesID
}) => {
  return (
    <div className="movie-selection">
      <Typography
        variant="h3"
        sx={{
          marginTop: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#176B87",
          fontWeight: "bold",
          fontSize: "3.5rem",
        }}
      >
        M<MovieIcon sx={{ fontSize: "3.5rem" }} />
        VIE RECOMMENDER
      </Typography>
      <Typography sx={{ marginBottom: "5rem" }}>
        Get Recommendations of Your Movies!
      </Typography>
      <Search
        updateRecommendations={updateRecommendations}
        updateRecommendedPosters={updateRecommendedPosters}
        updateSelectedMovie={updateSelectedMovie}
        updateRecommendedMoviesID={updateRecommendedMoviesID}
      />
    </div>
  );
};

export default MovieSelection;
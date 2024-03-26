import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Typography from "@mui/material/Typography";
import MovieIcon from "@mui/icons-material/Movie";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import CreditDialog from "./CreditDialog";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

export default function MovieList({
  recommendations,
  recommendedPosters,
  selectedMovie,
  recommendedMoviesID,
}) {
  const [showSkeleton, setShowSkeleton] = React.useState(true);
  const [showList, setShowList] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedMovieIndex, setSelectedMovieIndex] = React.useState(0);
  const [selectedRecommendedMovieTitle, setSelectedRecommendedMovieTitle] =
    React.useState("");
  const [selectedRecommendedMoviePoster, setSelectedRecommendedMoviePoster] =
    React.useState("");

  React.useEffect(() => {
    // Simulate a delay before showing the actual posters and titles
    const delay = setTimeout(() => {
      setShowSkeleton(false);
      setShowList(true);
    }, 3000); // Adjust the delay time as needed

    return () => clearTimeout(delay);
  }, []);

  const handleDialog = (index, title, poster) => {
    setSelectedMovieIndex(parseInt(index));
    setSelectedRecommendedMovieTitle(title);
    setSelectedRecommendedMoviePoster(poster);
    setOpenDialog(true);
  };

  if (recommendations && recommendations.length > 0) {
    return (
      <div>
        <Typography
          variant="h3"
          color="error"
          sx={{
            marginTop: "5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "3.5rem",
          }}
        >
          RECOMMENDED{"  "}
          <Typography
            // variant="h3"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#176B87",
              fontWeight: "bold",
              fontSize: "3.5rem",
            }}
          >
            M<MovieIcon sx={{ fontSize: "3.5rem" }} />
            VIES
          </Typography>
        </Typography>
        <Typography
          sx={{
            marginBottom: "5rem",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.3rem",
          }}
        >
          According To Your Selected Movie: {selectedMovie}
        </Typography>
        {showSkeleton && (
          <Stack
            sx={{
              width: "90%",
              height: "auto",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "5rem",
              margin: "auto",
              marginBottom: "5rem",
              flexWrap: "wrap",
            }}
          >
            {recommendations.map((skeleton, index) => (
              <div key={index}>
                <Skeleton
                  sx={{ backgroundColor: "grey", borderRadius: "15px" }}
                  variant="rounded"
                  width={210}
                  height={300}
                />
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: "3rem",
                    backgroundColor: "grey",
                    width: 210,
                    marginTop: "-2.8rem",
                    borderRadius: "0 0 20px 20px",
                  }}
                />
              </div>
            ))}
          </Stack>
        )}
        {showList && (
          <ImageList
            sx={{
              width: "90%",
              height: "auto",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "5rem",
              margin: "auto",
              marginBottom: "5rem",
              flexWrap: "wrap",
            }}
          >
            {recommendations.map((title, index) => (
              <ImageListItem
                sx={{
                  maxWidth: 345,
                  margin: "0.5rem",
                  borderRadius: "15px",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.1)", // Scale factor on hover
                    transition: "transform 0.3s ease-in-out", // Smooth transition
                  },
                  transition: "transform 0.3s ease-in-out",
                }}
                key={index}
                onClick={() =>
                  handleDialog(
                    recommendedMoviesID[index],
                    recommendations[index],
                    recommendedPosters[index]
                  )
                }
              >
                <img
                  srcSet={`${recommendedPosters[index]}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${recommendedPosters[index]}?w=248&fit=crop&auto=format`}
                  alt={title}
                  loading="lazy"
                  style={{ borderRadius: "15px" }}
                />
                <ImageListItemBar
                  sx={{
                    textAlign: "center",
                    whiteSpace: "normal",
                    fontWeight: "bold",
                  }}
                  title={title}
                  actionIcon={
                    <IconButton
                      sx={{ color: "#F4CE14" }}
                      aria-label={`info about ${title}`}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
        {openDialog && (
          <CreditDialog
            openDialog={openDialog}
            onClose={() => {
              setOpenDialog(false);
              setSelectedMovieIndex(null);
            }}
            movieIndex={selectedMovieIndex}
            selectedRecommendedMovieTitle={selectedRecommendedMovieTitle}
            selectedRecommendedMoviePoster={selectedRecommendedMoviePoster}
          />
        )}
      </div>
    );
  } else {
    return (
      <Typography
        variant="h3"
        sx={{
          fontSize: "3.5rem",
          fontWeight: "bold",
          textAlign: "center",
          display: "flex",
          color: "#176B87",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          fontFamily: "Noto sans",
        }}
      >
        Please Select a{" "}
        <span
          style={{
            display: "flex",
            color: "red",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          M
          <MovieIcon color="error" fontSize="3.5rem" sx={{ color: "#fff" }} />
          VIE
        </span>{" "}
        First!
      </Typography>
    );
  }
}
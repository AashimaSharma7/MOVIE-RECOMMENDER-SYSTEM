import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import axios from "axios";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import AdjustIcon from "@mui/icons-material/Adjust";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        color={props.value >= 50 ? "success" : "error"}
        variant="determinate"
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ fontWeight: "bold", color: "#fff" }}
          color="text.secondary"
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

function reformatDate(dateStr) {
  var dArr = dateStr.split("-"); // ex input: "2010-01-18"
  return dArr[2] + "/" + dArr[1] + "/" + dArr[0]; //ex output: "18/01/10"
}

function reformYear(dateStr) {
  var dArr = dateStr.split("-");
  return dArr[0];
}

export default function CreditMovie({
  selectedRecommendedMovieTitle,
  selectedRecommendedMoviePoster,
  movieIndex,
  crewDetails,
}) {
  const [genres, setGenres] = React.useState([]);
  const [overview, setOverview] = React.useState("");
  const [tagline, setTagline] = React.useState("");
  const [userScore, setUserScore] = React.useState("");
  const [releaseDate, setReleaseDate] = React.useState("");
  const [runtime, setRunTime] = React.useState(0);
  const [isAdult, setIsAdult] = React.useState(false);
  const [directerDetails, setDirecterDetails] = React.useState({});
  const [directorWorks, setDirectorWorks] = React.useState([]);
  const [backdropPath, setBackdropPath] = React.useState("");
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/get_movie_details/${movieIndex}`
        );
        setGenres(response.data.genres);
        setOverview(response.data.overview);
        setTagline(response.data.tagline);
        setUserScore(response.data.vote_average * 10);
        setReleaseDate(response.data.release_date);
        setRunTime(response.data.runtime);
        setIsAdult(response.data.adult);
        setBackdropPath(response.data.backdrop_path);
      } catch (error) {
        console.error("Failed to fetch the API: ", error.message);
      } finally {
        setLoading(false);
      }
    };

    // eslint-disable-next-line array-callback-return
    const director = crewDetails.find(
      (crew) => crew && crew.job === "Director"
    );
    if (director) {
      setDirecterDetails(director);

      // Match the director's name to the remaining crew and get their jobs
      const directorWorks = crewDetails
        .filter((crew) => crew.original_name === director.original_name)
        .map((work) => work.job);

      setDirectorWorks(directorWorks);
    }
    getMovieDetails();
  }, [crewDetails, directerDetails, movieIndex]);

  function toHoursAndMinutes(totalMinutes) {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    return `${padTo2Digits(hours)}h ${padTo2Digits(minutes)}m`;
  }

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundImage: `url(${backdropPath})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        // backdropFilter: "blur(15px)",
        overflow: "hidden", // Ensure the blur effect doesn't overflow
        // borderRadius: "25px",
      }}
    >
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: "100%",
          flexGrow: 1,
          backgroundColor: "transparent", // Make the Paper background transparent
          backdropFilter: "blur(5px)",
          color: "#fff",
          // borderRadius: "25px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 400, height: 400 }}>
              <Img
                alt={selectedRecommendedMovieTitle}
                src={selectedRecommendedMoviePoster}
              />
            </ButtonBase>
          </Grid>
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress sx={{ color: "#fff" }} />
            </Box>
          ) : (
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid
                  item
                  xs
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "start",
                    gap: "1rem",
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    component="div"
                    sx={{
                      fontFamily: "Josefin Sans, sans-serif",
                      fontWeight: "bold",
                      fontSize: "3rem",
                    }}
                  >
                    {selectedRecommendedMovieTitle}{" "}
                    <span
                      style={{
                        fontFamily: "Josefin Sans, sans-serif",
                        fontWeight: "lighter",
                      }}
                    >
                      ({reformYear(releaseDate)})
                    </span>
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "left",
                      alignItems: "center",
                      gap: "1rem",
                      marginTop: "-1.5rem",
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                      sx={{
                        fontFamily: "Josefin Sans, sans-serif",
                        border: "0.5px solid #A9A9A9",
                        padding: "1px 4px",
                        borderRadius: "5px",
                        fontWeight: "bold",
                        color: "#A9A9A9",
                      }}
                    >
                      {isAdult ? "R" : "UA"}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                      sx={{
                        fontFamily: "Josefin Sans, sans-serif",
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "0.2rem",
                      }}
                    >
                      <CalendarTodayIcon
                        sx={{ color: "#A9A9A9" }}
                        fontSize="small"
                      />
                      {reformatDate(releaseDate)}
                    </Typography>
                    <Typography
                      variant="body2"
                      gutterBottom
                      sx={{
                        fontFamily: "Josefin Sans, sans-serif",
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "0.2rem",
                      }}
                    >
                      <AdjustIcon sx={{ color: "#A9A9A9" }} fontSize="small" />
                      {genres.map((genre, index) =>
                        index === genres.length - 1
                          ? genre.name
                          : `${genre.name}, `
                      )}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                      sx={{
                        fontFamily: "Josefin Sans, sans-serif",
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "0.2rem",
                      }}
                    >
                      <AccessTimeFilledIcon
                        sx={{ color: "#A9A9A9" }}
                        fontSize="small"
                      />
                      {toHoursAndMinutes(runtime)}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    <CircularProgressWithLabel value={userScore} /> User Score
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontFamily: "Josefin Sans, sans-serif",
                      fontStyle: "italic",
                      fontWeight: "bold",
                      fontSize: "1rem",
                      color: "#45474B",
                    }}
                  >
                    {tagline}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Josefin Sans, sans-serif",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "left",
                      alignItems: "start",
                      gap: "0.5rem",
                      fontWeight: "500",
                      fontSize: "0.9rem",
                    }}
                  >
                    <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>
                      Overview
                    </span>
                    {overview}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "start",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "Josefin Sans, sans-serif",
                        fontWeight: "600",
                        fontSize: "1.1rem",
                      }}
                    >
                      {directerDetails.original_name}
                    </Typography>
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "left",
                        width: "max-content",
                        gap: "0.2rem",
                      }}
                    >
                      {directorWorks.map((works, index) => (
                        <Typography
                          key={index}
                          variant="body2"
                          sx={{
                            fontFamily: "Josefin Sans, sans-serif",
                            fontWeight: "500",
                            fontSize: "0.9rem",
                          }}
                        >
                          {index === works.length - 1 ? works : `${works}, `}
                        </Typography>
                      ))}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Paper>
    </div>
  );
}
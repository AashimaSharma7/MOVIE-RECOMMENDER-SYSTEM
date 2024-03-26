import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const customTheme = createTheme({
  palette: {
    action: {
      disabledBackground: "#850000", // Change this color value
    },
  },
});

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export default function NavBarSearch({
  updateRecommendations,
  updateRecommendedPosters,
  updateSelectedMovie,
  updateRecommendedMoviesID,
}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [movieNames, setMovieNames] = React.useState([]);
  const [selectedMovie, setSelectedMovie] = React.useState("");
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [isLoaderHidden, setLoaderHidden] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(200);

      if (active) {
        setOptions([...movieNames.map((title) => ({ title }))]);
      }
    })();
    const fetchMovieNames = async () => {
      try {
        const response = await axios.get("http://localhost:5000/movie_names");
        const namesArray = Object.values(response.data);
        setMovieNames(namesArray);
      } catch (error) {
        console.error("Error fetching movie names:", error);
      }
    };

    fetchMovieNames();

    return () => {
      active = false;
    };
  }, [loading, movieNames, setMovieNames]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleRecommendation = async (e) => {
    e.preventDefault();

    updateSelectedMovie(selectedMovie);
    if (!selectedMovie) {
      setOpenAlert(true);
      return;
    }
    setLoaderHidden(false);
    setButtonDisabled(true);
    setProgress(0);
    await sleep(500);

    try {
      setProgress(25);
      const response = await axios.post("http://localhost:5000/recommend", {
        selected_movie: selectedMovie,
      });

      setProgress(50);
      await sleep(1000);
      updateRecommendations(response.data.names || []);
      setProgress(95);
      await sleep(1000);
      updateRecommendedPosters(response.data.posters || []);
      updateRecommendedMoviesID(response.data.id || []);
      setProgress(100);
      navigate("/recommendations");
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setOpenAlert(true);
    } finally {
      setLoaderHidden(true);
      setButtonDisabled(false);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          display: isLoaderHidden ? "none" : "block",
        }}
      >
        <LinearProgress variant="determinate" value={progress} />
      </Box>
      <form
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "10px",
        }}
        onSubmit={handleRecommendation}
      >
        <Autocomplete
          required
          id="asynchronous-demo"
          sx={{
            "& fieldset": {
              border: "none", // Remove the default fieldset border
            },
            "& .MuiInputBase-input": {
              padding: "12px", // Adjust the padding for the input text
            },
            "& .MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root']": {
              padding: 0,
              paddingLeft: "8px",
            },
            "& .MuiAutocomplete-endAdornment": {
              marginLeft: -20, // Adjust the value as needed
            },
            "& label": {
              marginTop: "-0.5rem", // Adjust the margin-bottom for the label
              color: (theme) =>
                theme.palette.mode === "dark" ? "white" : "white", // Change color when focused
            },
            "& label.Mui-focused": {
              marginTop: "0rem",
              color: (theme) =>
                theme.palette.mode === "dark" ? "white" : "white", // Change color when focused
            },
          }}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          isOptionEqualToValue={(option, value) => option.title === value.title}
          getOptionLabel={(option) => option.title}
          options={options}
          loading={loading}
          onChange={(event, value) => setSelectedMovie(value?.title || "")}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Movies..."
              sx={{
                backgroundColor: "#434242",
                borderRadius: "25px",
                width: 250,
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress
                        sx={{ marginRight: "3rem" }}
                        color="inherit"
                        size={20}
                      />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
        <ThemeProvider theme={customTheme}>
          <IconButton
            type="submit"
            size="medium"
            sx={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1rem",
              backgroundColor: "#000",
              marginLeft: "-0.5rem",
            }}
            aria-label="search"
            variant="extended"
            disabled={buttonDisabled}
          >
            <SearchIcon sx={{ color: "#fff" }} />
          </IconButton>
        </ThemeProvider>
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Please Select a Movie or Try Again Later!
          </Alert>
        </Snackbar>
      </form>
    </div>
  );
}





import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import axios from "axios";
import CreditMovie from "./CreditMovie";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import MovieIcon from "@mui/icons-material/Movie";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreditDialog({
  openDialog,
  onClose,
  movieIndex,
  selectedRecommendedMovieTitle,
  selectedRecommendedMoviePoster,
}) {
  const [castDetails, setCastDetails] = React.useState([]);
  const [crewDetails, setCrewDeatils] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchCredits = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/get_credits/${movieIndex}`
        );
        const cast = response.data.cast;
        const crew = response.data.crew;

        setCastDetails(cast);
        setCrewDeatils(crew);
        setLoading(false);
      } catch (error) {
        console.error("Failed: ", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCredits();
  }, [movieIndex]);

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <React.Fragment>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={openDialog}
          TransitionComponent={Transition}
          maxWidth="lg"
          scroll="paper"
          sx={{
            overflowX: "hidden",
          }}
        >
          <DialogTitle
            sx={{
              m: 0,
              p: 2,
              backgroundColor: "#0F0F0F",
              color: "#fff",
              fontFamily: "Josefin Sans, sans-serif",
              fontSize: "1.5rem",
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              gap: "1rem",
            }}
            id="customized-dialog-title"
          >
            <MovieIcon fontSize="large" />
            {selectedRecommendedMovieTitle}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>

          <DialogContent dividers sx={{ backgroundColor: "#45474B" }}>
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
              <>
                <CreditMovie
                  selectedRecommendedMovieTitle={selectedRecommendedMovieTitle}
                  selectedRecommendedMoviePoster={
                    selectedRecommendedMoviePoster
                  }
                  movieIndex={movieIndex}
                  crewDetails={crewDetails}
                />
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    margin: "1rem",
                    fontSize: "1.5rem",
                    fontFamily: "Josefin Sans, sans-serif",
                    color: "#fff",
                  }}
                >
                  CAST
                </Typography>
                <ImageList
                  className="cast-details"
                  sx={{
                    overflowX: "auto",
                    width: "100%",
                    height: "auto",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "left",
                    alignItems: "center",
                    gap: "10rem",
                    margin: "auto",
                    marginBottom: "0rem",
                    textAlign: "center",
                  }}
                >
                  {castDetails.map((cast, index) => {
                    const castImage =
                      "https://image.tmdb.org/t/p/w500/" + cast.profile_path;
                    return (
                      <ImageListItem
                        key={index}
                        sx={{
                          width: "150px",
                          wordWrap: "break-word",
                          margin: "0.2rem",
                          color: "#fff",
                        }}
                      >
                        <img
                          srcSet={`${castImage}?w=248&fit=crop&auto=format&dpr=2 2x`}
                          src={`${castImage}?w=248&fit=crop&auto=format`}
                          alt={cast.original_name}
                          loading="lazy"
                          style={{
                            width: "100px",
                            height: "150px",
                            borderRadius: "10px",
                            textAlign: "center",
                            display: "flex",
                            alignSelf: "center",
                          }}
                        />
                        <ImageListItemBar
                          title={cast.original_name}
                          subtitle={cast.character}
                          position="below"
                        />
                      </ImageListItem>
                    );
                  })}
                </ImageList>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    margin: "1rem",
                    fontSize: "1.5rem",
                    fontFamily: "Josefin Sans, sans-serif",
                    color: "#fff",
                  }}
                >
                  CREW
                </Typography>
                <ImageList
                  className="crew cast-details"
                  sx={{
                    overflowX: "auto",
                    width: "100%",
                    height: "auto",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "left",
                    alignItems: "center",
                    gap: "10rem",
                    margin: "auto",
                    marginBottom: "0rem",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  {crewDetails.map((crew, index) => {
                    const crewImage =
                      "https://image.tmdb.org/t/p/w500/" + crew.profile_path;
                    return (
                      <ImageListItem
                        key={index}
                        sx={{
                          width: "150px",
                          wordWrap: "break-word",
                          margin: "0.2rem",
                        }}
                      >
                        <img
                          srcSet={`${crewImage}?w=248&fit=crop&auto=format&dpr=2 2x`}
                          src={`${crewImage}?w=248&fit=crop&auto=format`}
                          alt={crew.original_name}
                          loading="lazy"
                          style={{
                            width: "100px",
                            height: "150px",
                            borderRadius: "10px",
                            textAlign: "center",
                            display: "flex",
                            alignSelf: "center",
                          }}
                        />
                        <ImageListItemBar
                          title={crew.original_name}
                          subtitle={crew.job}
                          position="below"
                        />
                      </ImageListItem>
                    );
                  })}
                </ImageList>
              </>
            )}
          </DialogContent>
        </BootstrapDialog>
      </React.Fragment>
    </>
  );
}
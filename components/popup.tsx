import { modalState, movieState } from "@/modalAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { Modal } from "@mui/material";
import { IoIosClose, IoIosPause } from "react-icons/io";
import { useEffect, useState } from "react";
import { Movie, Element, Genre } from "@/types";
import ReactPlayer from "react-player";
import { FaPlay, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const popup = () => {
  // create a state hook to set state of the modal to be open/closed.
  const [open, setOpen] = useRecoilState(modalState);
  // function to close modal when close button is click. the setter function is false when close button clicked
  const handleClose = () => setOpen(false);
  const [movies, setMovies] = useRecoilState<Movie | null>(movieState); //on typescript, we have to define the data type (Movie is a custom data type) to pass info from the fetchUpcoming
  const API_KEY = "2e35a53539dbf630d62b85e6989dd36f";
  const [trailerClip, setTrailerClip] = useState(""); // set a state for trailers as a string input. Not an array this time.
  const [genre, setGenre] = useState<Genre[]>(); // genre type is set as an array because one movie/show can be classified under multiple genre
  const [mute, setMute] = useState(false); // default state is sound on, thus mute is false
  const [play, setPlay] = useState(true); // click on the media, play the clip so initial state is false

  useEffect(() => {
    if (!movies) return;
    // we use the tmdb api base link to find movie or tv show trailer
    async function getMovie() {
      const movieDetails = await fetch(
        `https://api.themoviedb.org/3/${
          movies?.media_type === "tv" ? "tv" : "movie"
        }/${
          movies?.id
        }?api_key=${API_KEY}&language=en-US&append_to_response=videos`
      )
        .then((res) => res.json())
        .catch((err) => console.log(err.message));

      // always use optional chaining (?) in case object is undefined
      // if there is a response from the api with the specified condition above, run the code below
      if (movieDetails?.videos) {
        const index = movieDetails.videos.results.findIndex(
          (element: Element) => element.type === "Trailer" // we specify the video type to fetch which in our case is a trailer. If you want to add a new one e.g behind the scenes, start by declaring it on the types.ts
        );
        setTrailerClip(movieDetails.videos?.results[index]?.key); // use state setter function to get the movie index/id on the api that has the same id as the one we selected
      }
      if (movieDetails?.genres) {
        setGenre(movieDetails.genres);
      }
    }

    // call function outside use state block to execute it
    getMovie();
  }, [movies]);

  /// if muted button is clicked, change the state to false
  const isMuted = () => {
    setMute(!mute);
  };

  const isPaused = () => {
    setPlay(!play);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="fixed !top-7 md:w-auto left-0 right-0 z-50 mx-auto w-full max-w-4xl overflow-hidden scrollbar-none overflow-y-scroll rounded-md scrollbar-hide"
    >
      {/** the modal component does not work without the children. In this case, we used fragments to sorta ignore this required */}
      <>
        <button className="absolute right-5 top-5 z-40 h-5 w-5 md:h-9 md:w-9 border-none bg-[#181818] rounded-full">
          <IoIosClose className="h-5 w-5 md:h-9 md:w-9" onClick={handleClose} />
        </button>
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailerClip}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing={play}
            muted={mute}
          />
          <div className="absolute bottom-6 right-4 md:bottom-10 flex items-center justify-between w-full px-10">
            <div className="absolute flex gap-2">
              <button className="modalButton" onClick={isPaused}>
                {play ? <IoIosPause className="h-3 w-3 md:h-7 md:w-7" /> : <FaPlay className="h-3 w-3 md:h-5 md:w-5" />}{" "}
                {/** if paused is false (I set false as the initial state), then display the pause icon otherwise, display the play icon */}
              </button>
              <button className="modalButton" onClick={isMuted}>
                {mute ? (
                  <FaVolumeMute className="h-3 w-3 md:h-7 md:w-7" />
                ) : (
                  <FaVolumeUp className="h-3 w-3 md:h-7 md:w-7" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-500">
                {Math.floor(movies!.vote_average * 10)}%
              </p>
              <p className="font-light">
                {movies?.release_date || movies?.first_air_date}
              </p>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 text-light md:flex-row">
              <p className="w-6/6">{movies?.overview}</p>
              <div>
                <span className="text-[gray]">Original language: </span>
                {movies?.original_language}
              </div>

              <div>
                <span className="text-[gray]">Total votes: </span>
                {movies?.vote_count}
              </div>
            </div>
          </div>
        </div>
      </>
    </Modal>
  );
};

export default popup;

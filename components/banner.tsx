import { modalState, movieState } from "@/modalAtom";
import { Movie } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useRecoilState } from "recoil";

const baseURL = "https://image.tmdb.org/t/p/original/";
// create interface prop to pass data to this component.
interface Props {
  fetchUpcoming: Movie[];
}

const banner = ({ fetchUpcoming }: Props) => {
  const [movies, setMovies] = useState<Movie | null>(null); //on typescript, we have to define the data type (Movie is a custom data type) to pass info from the fetchUpcoming
  const [open, setOpen] = useRecoilState(modalState); // set a new state for button click and send that state value to the other components
  const [selectedMovie, setSelectedMovie] = useRecoilState(movieState); // create recoil state variable so we can pass the selected movie data to the other components

  useEffect(() => {
    // get movie by id of the random number generated by the javascript function
    setMovies(fetchUpcoming[Math.floor(Math.random() * fetchUpcoming.length)]);
  }, [fetchUpcoming]);

  return (
    <>
    {/** I replaced py-16 with mt-44 to prevent banner title from overlapping the header */}
      <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
        <div className="absolute top-0 left-0 h-[95vh] w-screen -z-10">
          <Image
            src={`${baseURL}${movies?.backdrop_path || movies?.poster_path}`}
            alt="Poster"
            objectFit="cover"
            layout="fill"
          />
        </div>
        <div className="justify-between items-center">
          {/** test shadow to be re-worked */}
          <h2 className="text-4xl font-bold md:text-7xl lg:text-8xl pb-1">
            {movies?.original_name || movies?.name || movies?.title}
          </h2>
          <p className="max-w-xs text-shadow-[1.2] text-md md:max-w-lg md:text-2xl lg:max-w-4xl lg:text-2xl">
            {movies?.overview}
          </p>
        </div>
        <div className="flex">
          <button
            className="bannerBtn bg-white text-black"
            onClick={() => {
              setOpen(true), setSelectedMovie(movies);
            }}
          >
            <FaPlay className="h-4 w-4 mr-2" />
            Play
          </button>
          <button
            className="bannerBtn bg-[gray]/60"
            onClick={() => {
              setOpen(true), setSelectedMovie(movies);
            }}
          >
            More Info
          </button>
        </div>
      </div>
      <div className="absolute py-64 -z-10 bottom-0 left-0 m-auto w-full h-16 bg-gradient-to-t from-gray-900 via-rgba-37-37-37-70 to-transparent"></div>
    </>
  );
};

export default banner;

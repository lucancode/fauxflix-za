import Image from "next/image";
import { Movie } from "../types";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "@/modalAtom";

interface Props {
  title: string;
  media: Movie[];
}

const parent_url = "https://image.tmdb.org/t/p/original/";

const row = ({ title, media }: Props) => {
  // the HTMLDivElement will show us different var
  const arrowRef = useRef<HTMLDivElement>(null);
  // set a state for arrow clicks
  const [click, setClick] = useState(false);
  const [open, setOpen] = useRecoilState(modalState); // set a new recoil state for modal button click and send that state value to the other components
  const [selectedMovie, setSelectedMovie] = useRecoilState(movieState); // create recoil state variable so we can pass the selected movie data to the other components

  // the function does not expect any arguments, so to fix this we add one and it's type is a string
  const isClicked = (way: string) => {
    setClick(true);

    if (arrowRef.current) {
      // the curly braces tells typescript we import pre-existing variables. In this case, from the current ref type which is HTMLDivElement
      const { scrollLeft, clientWidth } = arrowRef.current;

      // if left arrow is click, scroll to the left and decrease the client width. Otherwise, increase the width. The width value is determined by screen size of the client
      const scrollTo =
        way === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;

      arrowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className={`relative h-40 mb-24 pt-1 space-y-0.5 md:space-y-2 md:mb-64`}>
      <h2 className="cursor-default mt-4 mb-3 md:mt-14 font-semibold md:text-2xl text-[#cccccc] transition duration-200 hover:text-white">
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        <IoIosArrowBack
          onClick={() => {
            isClicked("left");
          }}
          className={`${
            !click && "hidden"
          } absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100`}
        />
        <div
          ref={arrowRef}
          className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-none md:space-x-2.5 md:p-2"
        >
          {media.map((movie) => (
            <div
              onClick={() => {
                setOpen(true), setSelectedMovie(movie);
              }}
              className={`relative h-48 min-w-[150px] cursor-pointer transition duration-200 ease-out md:h-80 md:min-w-[230px] md:hover:scale-105`}
            >
              <Image
                src={`${parent_url}${movie?.poster_path || movie?.backdrop_path}`}
                alt="Poster"
                layout="fill"
                objectFit="cover"
                key={movie.id}
              />
              <div className="absolute top-0 left-0 bottom-0 right-0 opacity-0 transition-opacity duration-500 ease-in-out bg-black bg-opacity-50 hover:opacity-100 flex justify-center items-center">
                <div className="relative">
                  <h4 className="font-bold text-center text-sm">
                    {movie?.original_name || movie?.title || movie?.name}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
        <IoIosArrowForward
          onClick={() => isClicked("right")}
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
        />
      </div>
    </div>
  );
};

export default row;

import { HiMagnifyingGlass } from "react-icons/hi2";
import Link from "next/link";
import { useEffect, useState } from "react";

const GlobalNav = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
    setSearchQuery('');
  };

  const handleSearch = () => {
    // Perform search action with the searchQuery
    console.log('Search query:', searchQuery);
  };
  
  // a state hook to store a boolean value if the window scrolled or not
  const [scrolled, setScrolled] = useState(false);

  // an effect hook to execute the conditional operator within the block of code
  useEffect(() => {
    const readScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    // an event listener that checks for scrolling (Y or X) and runs our function
    window.addEventListener("scroll", readScroll);

    // the return statement should run an arrow function if it is inside the effect hook.
    return () => {
      // Cleanup function to remove event listener when components unmount
      window.removeEventListener("scroll", readScroll);
    };
  }, []);

  // ffor the hamburger menu, we have to create a new block/div because we want a background color on it.
  return (
    <header
      className={`${scrolled && "bg-[#101720] transition duration-400 z-50"}`}
    >
      <div className="flex items-center space-x-3 md:space-x-10">
        <Link href="./">
          <img
            src="https://rb.gy/fbgo66"
            width={100}
            height={100}
            className="cursor-pointer object-contain"
            alt=""
          />
        </Link>
        <ul className="hidden space-x-3 lg:flex">
          <Link href="./">
            <li className="nav-link">Home</li>
          </Link>
          <Link href="./shows">
            <li className="nav-link">TV Shows</li>
          </Link>
          <Link href="./movies">
            <li className="nav-link">Movies</li>
          </Link>
            <li className="nav-link">My List</li>
        </ul>
      </div>

      <div className="flex items-center space-x-3 py-9">
        <button className="inline relative right-0 top-0 mr-3 text-gray-600 focus:outline-none" onClick={toggleSearch}>
        <HiMagnifyingGlass className=" text-white h-4 w-4" />
        </button>
        {isExpanded && (
        <div className="flex transition-width duration-700">
          <input
            type="text"
            className="border text-black border-gray-300 rounded-l-md pl-5 pr-4 outline-none focus:border-black"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="bg-[#101720] text-white px-4 py-0.5 rounded-r-md hover:bg-gray-700"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      )}
        {/** the link component to navigate between pages */}
        <Link href="./accounts">
          <img src="https://rb.gy/1izu4o" width={25} height={25} alt="" />
        </Link>
      </div>
    </header>
  );
};

export default GlobalNav;

const API_KEY = "2e35a53539dbf630d62b85e6989dd36f";

// API requests by category
const requests = {
    // The URLs are constructed using string interpolation to insert the value of the API_KEY variable into the query parameters
    pullUpcoming:`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
    pullPopular:`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
    pullRated:`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
    pullTrending: `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&language=en-US`,
    // tv shows
    pullPopularTV: `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
    pullAiringToday: `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`,
    pullRatedTV: `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
    // movies by cat
    pullActionMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
    pullComedyMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
    pullHorrorMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
    pullRomanceMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
    pullDocumentaries: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
}
// Export the object so that we can fetch the API content throughout our project.
// This modular approach allows for easy access to these API endpoints from different parts of our application

export default requests;
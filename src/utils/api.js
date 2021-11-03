const axios = require('axios').default;

const db = axios.create({
  baseURL: 'https://localhost:3000/',
});

// should be in private file but whatever lol
const TMDB_API_KEY = '872e0299c2559afe6d78340fd2a80cc6';
const tmdb = axios.create({
  baseURL: `https://api.themoviedb.org/3/`,
})

export const getMovieDetailsBySearch = (movieName) =>
  tmdb.get(`/search/movie/?api_key=${TMDB_API_KEY}&query=${movieName.split(" ").join("+")}`).then(
    (res) => res,
    (err) => {
      console.error(err);
      return null;
    },
  );

export const getMovieImageById = (id) =>
  tmdb.get(`/movie/${id}/images?api_key=${TMDB_API_KEY}`).then(
    (res) => res,
    (err) => {
      console.error(err);
      return null;
    },
  );
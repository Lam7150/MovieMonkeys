const axios = require('axios').default;

const db = axios.create({
  baseURL: 'http://localhost:9000',
});

// should be in private file but whatever lol
const TMDB_API_KEY = '872e0299c2559afe6d78340fd2a80cc6';
const tmdb = axios.create({
  baseURL: `https://api.themoviedb.org/3`,
})

// movie
export const getMovies = () =>
  db.get(`/movie`).then(
    (res) => res,
    (err) => {
      console.error(err);
      return null;
    },
  );

export const getMovieById = (id) =>
  db.get(`/movie/${id}`).then(
    (res) => res,
    (err) => {
      console.error(err);
      return null;
    },
  );

export const getTopMoviesByCountry = (country) =>
  db.get(`/movie/country/${country}`).then(
    (res) => res,
    (err) => {
      console.error(err);
      return null;
    },
  );

export const getTopMoviesByGenre = (genre) =>
  db.get(`/movie/genre/${genre}`).then(
    (res) => res,
    (err) => {
      console.error(err);
      return null;
    },
  );

// user
export const getUser = (username) =>
  db.get(`/user/${username}`).then(
    (res) => res,
    (err) => {
      console.error(err);
      return null;
    },
  );

export const createUser = (newUser) =>
  db.post(`/user`, newUser).then(
    (res) => res,
    (err) => {
      console.error(err);
      return null;
    },
  );

export const deleteUser = (username) =>
  db.delete(`/user/${username}`).then(
    (res) => res,
    (err) => {
      console.error(err);
      return null;
    },
  );

// user
export const getUserRatings = (username) =>
  db.get(`/user_ratings/${username}`).then(
    (res) => res,
    (err) => {
      console.error(err);
      return null;
    },
  );

export const getUserRatingByMovieId = (username, movie_ID) =>
  db.get(`/user_ratings/${username}/${movie_ID}`).then(
    (res) => res,
    (err) => {
      console.error(err);
      return null;
    },
  );

export const createUserRating = (newRating) =>
  db.post(`/user_ratings/`, newRating).then(
    (res) => res,
    (err) => {
      console.error(err);
      return null;
    },
  );

export const updateUserRating = (username, movieId, rating) =>
  db.put(`/user_ratings/${username}/${movieId}/${rating}`).then(
    (res) => res,
    (err) => {
      console.error(err);
      return null;
    },
  );

export const deleteUserRating = (username, movieId) =>
  db.delete(`/user_ratings/${username}/${movieId}`).then(
    (res) => res,
    (err) => {
      console.error(err);
      return null;
    },
  );

// Movie Images
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
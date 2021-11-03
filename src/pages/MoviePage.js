import React, { useState, useEffect } from 'react';
import { getMovieDetailsBySearch, getMovieImageById } from '../utils/api';

import '../css/MoviePage.css';

const movies = [
  'Alice in Wonderland',
  'Footloose',
  'Avengers: Infinity War'
]

const imageBaseUrl = 'https://image.tmdb.org/t/p/w500/';

function MoviePage() {
  const [movieImages, setMovieImages] = useState([]);

  useEffect(() => {
    getMovieImages(movies);
  }, []);

  function getMovieImages(movies) {
    const movieDetailsPromises = movies.map((movie) => {
      return getMovieDetailsBySearch(movie).then((res) => {
        if (res !== null) {
          if (res.status === 200) {
            return res.data;
          }
        }
      });
    });

    Promise.all(movieDetailsPromises).then(function (results) {
      // get first movie IDs of returned movies
      const movieIds = results.map(result => result?.results[0]?.id);
      const movieImagePromises = movieIds.map((id) => {
        return getMovieImageById(id).then((res) => {
          if (res !== null) {
            if (res.status === 200) {
              return res.data;
            }
          }
        });
      });

      Promise.all(movieImagePromises).then(function (results) {
        const movieImageUrls = results.map(result => result.posters[0].file_path);
        setMovieImages(movieImageUrls);
      });
    });
  }

  return (
    <div className="movie-page">
      Movie Page
      {movieImages.map(imageUrl => (
        <img src={`${imageBaseUrl}${imageUrl}`} alt="movie-poster" />
      ))}
    </div>
  );
}

export default MoviePage;

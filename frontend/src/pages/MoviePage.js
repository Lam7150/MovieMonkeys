import React, { useState, useEffect } from 'react';
import { getMovies, getMovieDetailsBySearch, getMovieImageById, getMoviesByTitle } from '../utils/api';
import Filters from '../components/Filters';
import Gallery from '../components/Gallery';

import '../css/MoviePage.css';

const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

function MoviePage() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [searchedMovies, setSearchedMovies] = useState(null);
  const [name, setName] = useState(null);
  const [genre, setGenre] = useState(null);
  const [country, setCountry] = useState(null);
  const [rating, setRating] = useState(null);
  const [year, setYear] = useState(null);

  useEffect(() => {
    let filteredMovies = movies.filter(movie => {
      const genres = movie.Genre.split(", ");
      const countries = movie.Country.split(", ");

      return (genre ? genres.includes(genre) : true)
        && (country ? countries.includes(country) : true)
        && (rating ? movie.Avg_vote >= rating : true)
        && (year ? movie.Year == year : true)
    })

    setFilteredMovies(filteredMovies);
  }, [movies, genre, country, rating, year]);

  useEffect(() => {
    if (name) {
      getMoviesByTitle(name).then((res) => {
        if (res !== null) {
          if (res.status === 200) {
            setSearchedMovies(res.data);
            getMovieImages(false, res.data);
          }
        }
      });
    } else {
      setSearchedMovies(null);
    }
  }, [name]);

  useEffect(() => {
    getMovies().then((res) => {
      if (res !== null) {
        if (res.status === 200) {
          setMovies(res.data);
          getMovieImages(true, res.data);
        }
      }
    });
  }, []);

  function getMovieImages(isFilter, movies) {
    const movieDetailsPromises = movies.map((movie) => {
      return getMovieDetailsBySearch(movie.Original_title).then((res) => {
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
        const movieImageUrls = results.map(result => result?.posters[0]?.file_path ? `${imageBaseUrl}${result.posters[0].file_path}` : '../assets/default-movie-poster.png');
        let newMovies = movies.map((movie, index) => ({ ...movie, imageUrl: movieImageUrls[index] }));
        if (isFilter) {
          setMovies(newMovies);
        } else {
          setSearchedMovies(newMovies);
        }
      });
    });
  }

  return (
    <div className="movie-page">
      <Filters
        setName={setName}
        setGenre={setGenre}
        setYear={setYear}
        setRating={setRating}
        setCountry={setCountry}
      />
      <Gallery movies={(searchedMovies || filteredMovies)} />
    </div>
  );
}

export default MoviePage;

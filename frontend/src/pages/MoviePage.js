import React, { useState, useEffect } from 'react';
import { getMovies, getMovieDetailsBySearch, getMovieImageById } from '../utils/api';
import Filters from '../components/Filters';
import Gallery from '../components/Gallery';

import '../css/MoviePage.css';

const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

function MoviePage() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [name, setName] = useState(null);
  const [genre, setGenre] = useState(null);
  const [country, setCountry] = useState(null);
  const [rating, setRating] = useState(null);
  const [year, setYear] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    let filteredMovies = movies.filter(movie => {
      const genres = movie.Genre.split(", ");
      const countries = movie.Country.split(", ");

      return (name ? movie.Title.startsWith(name) : true)
        && (genre ? genres.includes(genre) : true)
        && (country ? countries.includes(country) : true)
        && (rating ? movie.Avg_vote >= rating : true)
        && (year ? movie.Year == year : true)
    })

    setFilteredMovies(filteredMovies);
  }, [movies, name, genre, country, rating, year]);

  useEffect(() => {
    getMovies().then((res) => {
      if (res !== null) {
        if (res.status === 200) {
          setMovies(res.data);
          getMovieImages(res.data);
        }
      }
    });
  }, []);

  function getMovieImages(movies) {
    const movieDetailsPromises = movies.map((movie) => {
      return getMovieDetailsBySearch(movie.Title).then((res) => {
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
        setMovies(newMovies);
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
      <Gallery movies={filteredMovies} toggleModal={setModalVisible} />
    </div>
  );
}

export default MoviePage;

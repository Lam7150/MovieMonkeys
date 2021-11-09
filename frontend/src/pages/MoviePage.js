import React, { useState, useEffect } from 'react';
import { getMovieDetailsBySearch, getMovieImageById } from '../utils/api';
import Filters from '../components/Filters';
import Gallery from '../components/Gallery';

import '../css/MoviePage.css';

const testMovies = [
  { title: 'Alice in Wonderland' },
  { title: 'Footloose' },
  { title: 'Avengers: Infinity War' },
  { title: 'Avengers: Infinity War' },
  { title: 'Avengers: Infinity War' },
  { title: 'Avengers: Infinity War' },
  { title: 'Avengers: Infinity War' },
  { title: 'Avengers: Infinity War' },
]

const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

function MoviePage() {
  const [movies, setMovies] = useState(testMovies);
  const [movieImages, setMovieImages] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [name, setName] = useState(null);
  const [genre, setGenre] = useState(null);
  const [country, setCountry] = useState(null);
  const [rating, setRating] = useState(null);
  const [year, setYear] = useState(2021);
  const [modalVisible, setModalVisible] = useState(false);

  // useEffect(() => {
  //   let sortedMovies = movies.sort((a, b) => a.id > b.id ? 1 : -1)
  //   setMovies(sortedMovies);
  // }, [movies]);

  useEffect(() => {
    // let sortedPokemon = pokemon.sort((a, b) => a.id > b.id ? 1 : -1)
    // let filteredPokemon = sortedPokemon.filter(poke => {
    //   const types = poke.types.map(p => p.type.name);
    //   const stats = poke.stats.map(p => p.base_stat);

    //   return (name ? poke.name.startsWith(name) : true) && (type ? types.includes(type) : true) && poke.height >= height && poke.weight >= weight
    //     && stats[0] >= hp && stats[1] >= attack
    //     && stats[2] >= defense && stats[3] >= spAtk
    //     && stats[4] >= spDef && stats[5] >= speed
    // })
    // setFilteredPokemon(filteredPokemon);
  }, [name]);

  useEffect(() => {
    getMovieImages(movies);
  }, []);

  function getMovieImages(movies) {
    const movieDetailsPromises = movies.map((movie) => {
      return getMovieDetailsBySearch(movie.title).then((res) => {
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
        let newMovies = movies.map((movie, index) => ({ ...movie, imageUrl: `${imageBaseUrl}${movieImageUrls[index]}` }));
        console.log(newMovies);
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
      <Gallery movies={movies} toggleModal={setModalVisible} />
    </div>
  );
}

export default MoviePage;

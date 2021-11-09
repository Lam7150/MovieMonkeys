import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { getTopMoviesByCountry, getTopMoviesByGenre, getMovieDetailsBySearch, getMovieImageById } from '../utils/api';
import { GENRES, COUNTRIES } from "../utils/constants";
import Gallery from '../components/Gallery';

import '../css/TopMoviesPage.css';
import '../css/Filters.css';

const { Option } = Select;

const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

function TopMoviesPage() {
  const [movies, setMovies] = useState([]);
  const [type, setType] = useState('Country');
  const [country, setCountry] = useState('USA');
  const [genre, setGenre] = useState('Animation');
  const [modalVisible, setModalVisible] = useState(false);

  function handleTypeChange(value) {
    setType(value);
  }

  function handleCountryChange(value) {
    setCountry(value);
  }

  function handleGenreChange(value) {
    setGenre(value);
  }

  useEffect(() => {
    if (type === 'Country') {
      getTopMoviesByCountry(country).then((res) => {
        if (res !== null) {
          if (res.status === 200) {
            console.log(res.data);
            setMovies(res.data);
            getMovieImages(res.data);
          }
        }
      });
    } else {
      getTopMoviesByGenre(genre).then((res) => {
        if (res !== null) {
          if (res.status === 200) {
            setMovies(res.data);
            getMovieImages(res.data);
          }
        }
      });
    }
  }, [type, country, genre]);

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
    <div className="top-movie-page">
      <div className="top-movie-header">
        <div className="top-movie-title"> Top 100 Rated Movies By </div>
        <Select className="filter-select" size={'large'} defaultValue="Country" style={{ width: 120 }} onChange={handleTypeChange}>
          <Option value={'Country'}>Country</Option>
          <Option value={'Genre'}>Genre</Option>
        </Select>
        {type === 'Country' ?
          (<Select className="filter-select" showSearch defaultValue="USA" style={{ width: 120 }} allowClear onChange={handleCountryChange}>
            {COUNTRIES.map(country => (
              <Option value={country}>{country}</Option>
            ))}
          </Select>) :
          (<Select className="filter-select" showSearch defaultValue="Animated" style={{ width: 120 }} allowClear onChange={handleGenreChange}>
            {GENRES.map(genre => (
              <Option value={genre}>{genre}</Option>
            ))}
          </Select>)
        }
      </div>
      <Gallery movies={movies} toggleModal={setModalVisible} />
    </div>
  );
}

export default TopMoviesPage;

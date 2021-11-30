import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { getMovies, getUserPreferences, updateUserPreferences, getMovieDetailsBySearch, getMovieImageById } from '../utils/api';
import { Button } from 'antd';
import Card from "../components/Card";

import '../css/RecommendationPage.css';

const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

function RecommendationPage() {
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(0);
  const [moviePrefs, setMoviePrefs] = useState();
  const [prefsUpdated, setPrefs] = useState(false);
  const { username, setUsername } = useContext(AuthContext);

  function handleFindMovie() {
    setIndex((index + 1) % movies.length);
  }

  useEffect(() => {
    if (username) {
      if (!prefsUpdated) {
        updateUserPreferences(username).then((res) => {
          if (res !== null) {
            if (res.status === 200) {
              setPrefs(true);
            }
          }
        });
      }

      getUserPreferences(username).then((res) => {
        if (res !== null) {
          if (res.status === 200) {
            const moviePrefs = {
              genre: res.data.Genre.split(', ')[0],
              country: res.data.Country.split(', ')[0],
              language: res.data.Language.split(', ')[0]
            }

            setMoviePrefs(moviePrefs);
          }
        }
      });

      getMovies().then((res) => {
        if (res !== null) {
          if (res.status === 200) {
            setMovies(res.data);
            getMovieImages(res.data);
          }
        }
      });
    }
  }, [username]);

  function getMovieImages(movies) {
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
        setMovies(newMovies);
      });
    });
  }

  return (
    <div className="recommendation-page">
      <Button type="primary" onClick={handleFindMovie}>Find Me a Movie!</Button>
      <Card movie={movies[index]} />
    </div>
  );
}

export default RecommendationPage;

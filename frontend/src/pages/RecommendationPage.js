import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { getTopMoviesByPreferences, getUserPreferences, updateUserPreferences, getMovieDetailsBySearch, getMovieImageById } from '../utils/api';
import { Button } from 'antd';
import { StarFilled } from '@ant-design/icons';

import '../css/RecommendationPage.css';

const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

const MovieInfoLine = (props) => {
  const { title, value } = props;
  const text = value.split(', ').join(' • ');

  return (
    <div className='recommendation-info-container'>
      <div className='recommendation-info-title'>{`${title}: `}</div>
      <div className='recommendation-info-text'>{text}</div>
    </div>
  )
};

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

            getTopMoviesByPreferences(moviePrefs).then((res) => {
              if (res !== null) {
                if (res.status === 200) {
                  setMovies(res.data);
                  getMovieImages(res.data);
                }
              }
            });
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
      {movies[index] ? (
        <div className="recommendation-movie-container">
          <div className="recommendation-movie-header">
            {`${movies[index].Original_title} • ${movies[index].Country} • ${movies[index].Year}`}
          </div>
          <div className="recommendation-movie-body">
            <div className="recommendation-movie-poster-container">
              <img src={movies[index].imageUrl} className="recommendation-movie-poster" alt="" />
              <div className="recommendation-movie-rating">
                <StarFilled style={{ color: 'gold' }} />
                {` ${parseFloat(movies[index].Avg_vote).toFixed(1)}`}
              </div>
            </div>
            <div className="recommendation-movie-info-container">
              <div className="recommendation-movie-desc-title"> Description </div>
              <div className="recommendation-movie-description">{movies[index].Description}</div>
              <MovieInfoLine title="Genre" value={movies[index].Genre} />
              <MovieInfoLine title="Directors" value={movies[index].Director} />
              <MovieInfoLine title="Actors" value={movies[index].Actors} />
              <MovieInfoLine title="Writers" value={movies[index].Writer} />
              <MovieInfoLine title="Studio" value={movies[index].Production_company} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default RecommendationPage;

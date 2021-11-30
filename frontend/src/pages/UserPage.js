import React, { useState, useEffect, useContext } from 'react';
import { Input, Button, Table, Modal, Rate } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { AuthContext } from '../contexts/authContext';
import { getMovieDetailsBySearch, getMovieImageById, getMovieById } from '../utils/api';
import { getUser, createUser, getUserPreferences, getUserRatings, updateUserRating, deleteUserRating } from '../utils/api';
import '../css/UserPage.css';
import '../css/Card.css';

const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

const TopInfoContainer = (props) => {
  const { title, value } = props;

  return (
    <div className='top-info-container'>
      <div className='top-info-title'>{`Top ${title}`}</div>
      <div className='top-info-text'>{value}</div>
    </div>
  )
};

function UserPage() {
  const [movies, setMovies] = useState([]);
  const [moviePrefs, setMoviePrefs] = useState();
  const [tentName, setTentname] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [signup, toggleSignup] = useState(false);
  const [rating, setRating] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState();
  const { username, setUsername } = useContext(AuthContext);

  function openRatingModal(value) {
    setModalVisible(true);
    setSelectedMovie(value);
    setRating(value.movieRating);
  }

  function handleRatingChange(value) {
    setRating(value)
  }

  function handleUsernameChange(e) {
    setTentname(e.target.value);
  }

  function handleFirstnameChange(e) {
    setFirstname(e.target.value);
  }

  function handleLastnameChange(e) {
    setLastname(e.target.value);
  }

  function handleLogin() {
    if (tentName) {
      getUser(tentName).then((res) => {
        if (res !== null) {
          if (res.status === 200) {
            const { userName, firstName, lastName } = res.data;

            setUsername(userName);
            setFirstname(firstName);
            setLastname(lastName);
          }
        } else {
          window.alert('Username not found. Try signing up!');
        }
      });
    }
  }

  function signupUser() {
    if (tentName && firstname && lastname) {
      const newUser = {
        userName: tentName,
        firstName: firstname,
        lastName: lastname
      }

      createUser(newUser).then((res) => {
        if (res !== null) {
          if (res.status === 200) {
            setUsername(tentName);
          }
        } else {
          window.alert('Unable to sign up. Try a different username.');
        }
      });
    }
  }

  function handleSignup() {
    if (!signup) {
      toggleSignup(true);
    } else {
      signupUser();
    }
  }

  function updateMovieRating() {
    let allMoviesButSelected = movies.filter((movie) => movie.Imdb_title_id != selectedMovie.Imdb_title_id);
    let updatedMovies = [...allMoviesButSelected, { ...selectedMovie, movieRating: rating }];
    setMovies(updatedMovies);
  }

  function deleteMovieRating() {
    let allMoviesButSelected = movies.filter((movie) => movie.Imdb_title_id != selectedMovie.Imdb_title_id);
    setMovies(allMoviesButSelected);
  }

  function onSubmit() {
    updateUserRating(username, selectedMovie.Imdb_title_id, rating).then((res) => {
      if (res !== null) {
        if (res.status === 200) {
          updateMovieRating();
          setModalVisible(false);
        }
      } else {
        window.alert('Could not update rating!');
      }
    });
  }

  function onDelete() {
    deleteUserRating(username, selectedMovie.Imdb_title_id).then((res) => {
      if (res !== null) {
        if (res.status === 200) {
          deleteMovieRating();
          setModalVisible(false);
        }
      } else {
        window.alert('Could not delete rating!');
      }
    });
  }

  useEffect(() => {
    if (username) {
      getUserRatings(username).then((res) => {
        if (res !== null) {
          if (res.status === 200) {
            getMovieData(res.data);
          }
        }
      });

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
    }
  }, [username]);

  function getMovieData(ratings) {
    const moviePromises = ratings.map((rating) => {
      return getMovieById(rating.Imdb_title_id).then((res) => {
        if (res !== null) {
          if (res.status === 200) {
            return res.data;
          }
        }
      })
    })

    Promise.all(moviePromises).then(function (results) {
      let movies = results.map(result => result[0]);
      movies = movies.map((movie, index) => ({ ...movie, ...ratings[index] }));

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
    })
  }

  const columns = [
    {
      title: 'Poster',
      dataIndex: 'poster',
      render: (text, data) => {
        return (<img className="user-loggedin-table-poster" alt={'movie-poster'} src={data.imageUrl} />);
      }
    },
    {
      title: 'Title',
      dataIndex: 'Title',
      sorter: (a, b) => a.Title < b.Title ? 1 : -1,
    },
    {
      title: 'Year',
      dataIndex: 'Year',
      sorter: (a, b) => a.Year < b.Year ? 1 : -1,
    },
    {
      title: 'Genre',
      dataIndex: 'Genre',
      sorter: (a, b) => a.Genre < b.Genre ? 1 : -1,
    },
    {
      title: 'Country',
      dataIndex: 'Country',
      sorter: (a, b) => a.Country < b.Country ? 1 : -1,
    },
    {
      title: 'Worldwide Rating',
      dataIndex: 'Avg_vote',
      sorter: (a, b) => a.Avg_vote < b.Avg_vote ? 1 : -1,
    },
    {
      title: 'My Rating',
      dataIndex: 'movieRating',
      sorter: (a, b) => a.movieRating < b.movieRating ? 1 : -1,
    },
    {
      title: 'Edit',
      render: (_, data) => {
        return (
          <Button type="link" shape="circle" icon={<EditOutlined />} onClick={() => openRatingModal(data)} />
        )
      }
    }
  ]

  return (
    <div className={!username ? "user-login-page" : "user-loggedin-page"}>
      {!username ? (<div className="user-login-container">
        <div className="user-login-title">{signup ? "Sign Up" : "Log In"}</div>
        <Input placeholder="Enter username" allowClear style={{ width: 250, marginBottom: 10 }} onChange={handleUsernameChange} />
        {signup ? (
          <Input placeholder="Enter first name" allowClear style={{ width: 250, marginBottom: 10 }} onChange={handleFirstnameChange} />
        ) : null}
        {signup ? (
          <Input placeholder="Enter last name" allowClear style={{ width: 250, marginBottom: 10 }} onChange={handleLastnameChange} />
        ) : null}
        <div className="user-login-buttons">
          {signup ? null : <Button type="primary" style={{ width: 120 }} onClick={handleLogin}>Log In</Button>}
          <Button type={signup ? "primary" : "default"} style={{ width: (signup ? 250 : 120) }} onClick={handleSignup}>Sign Up</Button>
        </div>
      </div>) :
        (<>
          <div className='user-loggedin-header'>{`Welcome, ${username}`}</div>
          <div className='user-loggedin-movies-title'>All About You</div>
          <div className='user-loggedin-top-wrapper'>
            <TopInfoContainer title="Genre" value={moviePrefs?.genre} />
            <TopInfoContainer title="Country" value={moviePrefs?.country} />
            <TopInfoContainer title="Language" value={moviePrefs?.language} />
          </div>
          <div className='user-loggedin-movies-title'>Movies Watched</div>
          <Table
            columns={columns}
            dataSource={movies}
          />
          <Modal
            title={
              <div className="flex-row">
                <div>Rate</div>
                <div className="card-modal-title-blue">{selectedMovie?.Title}</div>
              </div>}
            closable
            centered
            visible={modalVisible}
            footer={[
              <Button key="delete" onClick={onDelete}>
                Delete
              </Button>,
              <Button key="submit" type="primary" onClick={onSubmit}>
                Submit
              </Button>
            ]}
            onCancel={() => setModalVisible(false)}
            width={600}
          >
            <div className="card-modal-container">
              <Rate count={10} value={rating} onChange={handleRatingChange} />
            </div>
          </Modal>
        </>)}
    </div>
  );
}

export default UserPage;

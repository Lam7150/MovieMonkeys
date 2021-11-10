import React, { useState, useEffect } from 'react';
import { Input, Button, Table } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { getTopMoviesByCountry, getMovieDetailsBySearch, getMovieImageById } from '../utils/api';
import { getUser, createUser, deleteUser } from '../utils/api';
import '../css/UserPage.css';

const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

function UserPage() {
  const [movies, setMovies] = useState([]);
  const [username, setUsername] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [signup, toggleSignup] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handleFirstnameChange(e) {
    setFirstname(e.target.value);
  }

  function handleLastnameChange(e) {
    setLastname(e.target.value);
  }

  function handleLogin() {
    if (username) {
      getUser(username).then((res) => {
        if (res !== null) {
          if (res.status === 200) {
            const { userName, firstName, lastName } = res.data;

            setLoggedIn(true);
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
    if (username && firstname && lastname) {
      const newUser = {
        userName: username,
        firstName: firstname,
        lastName: lastname
      }

      createUser(newUser).then((res) => {
        if (res !== null) {
          if (res.status === 200) {
            setLoggedIn(true);
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

  useEffect(() => {
    getTopMoviesByCountry('USA').then((res) => {
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
      title: 'Rating',
      dataIndex: 'Avg_vote',
      sorter: (a, b) => a.Avg_vote < b.Avg_vote ? 1 : -1,
    },
    {
      title: 'Edit',
      render: (_, data) => {
        return (
          <Button type="link" shape="circle" icon={<EditOutlined />} />
        )
      }
    }
  ]

  return (
    <div className={!loggedIn ? "user-login-page" : "user-loggedin-page"}>
      {!loggedIn ? (<div className="user-login-container">
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
        (<div>
          <div className='user-loggedin-header'>{`Welcome, ${firstname}`}</div>
          <div className='user-loggedin-movies-title'>Movies Watched</div>
          <div className="user-loggedin-table-wrapper">
            <Table
              onRow={(record, rowIndex) => {
                return {
                  onClick: () => {
                    console.log('clicked');
                  }
                };
              }}
              columns={columns}
              dataSource={movies}
            />
          </div>
        </div>)}
    </div>
  );
}

export default UserPage;

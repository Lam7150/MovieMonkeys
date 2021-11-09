import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import { getUser, createUser, deleteUser } from '../utils/api';
import '../css/UserPage.css';

function UserPage() {
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
      console.log(username);
      getUser(username).then((res) => {
        if (res !== null) {
          if (res.status === 200) {
            setLoggedIn(true);
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

  return (
    <div className="user-page">
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
          I'm logged in
        </div>)}
    </div>
  );
}

export default UserPage;

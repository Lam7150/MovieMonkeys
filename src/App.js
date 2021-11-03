import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import NavHeader from "./components/NavHeader";
import UserPage from "./pages/UserPage";
import MoviePage from "./pages/MoviePage";

import './css/App.css';

function App() {
  return (
    <Router>
      <div>
        <NavHeader />
        <Switch>
          <Route path="/profile">
            <UserPage />
          </Route>
          <Route path="/">
            <MoviePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

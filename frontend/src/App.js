import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { AuthContext } from './contexts/authContext';
import NavHeader from "./components/NavHeader";
import UserPage from "./pages/UserPage";
import MoviePage from "./pages/MoviePage";
import TopMoviesPage from './pages/TopMoviesPage';
import RecommendationPage from './pages/RecommendationPage';

import './css/App.css';

function App() {
  const [username, setUsername] = useState(null);
  const value = { username, setUsername }

  return (
    <AuthContext.Provider value={value}>
      <Router>
        <div>
          <NavHeader />
          <Switch>
            <Route path="/profile">
              <UserPage />
            </Route>
            <Route path="/top-movies">
              <TopMoviesPage />
            </Route>
            <Route path="/recommend-movie">
              <RecommendationPage />
            </Route>
            <Route path="/">
              <MoviePage />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

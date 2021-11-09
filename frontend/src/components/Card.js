import React from 'react';
import '../css/Card.css';
import { capitalize } from "../utils/utils";

function Card(props) {
  const { movie, toggleModal } = props;

  const displayMovieModal = () => {
    toggleModal(true);
  }

  return (
    <div className="card-wrapper" onClick={displayMovieModal}>
      <img src={movie.imageUrl} className="card-image" alt="movie-poster" />
      <div className="card-name">{capitalize(movie.title)}</div>
    </div>
  );
}

export default Card;

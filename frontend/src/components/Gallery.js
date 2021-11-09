import React from 'react';
import '../css/Gallery.css';
import Card from "./Card";

function Gallery(props) {
  const { movies, toggleModal } = props;

  return (
    <div className="gallery-wrapper">
      {movies.map((movie) => (
        <Card movie={movie} toggleModal={toggleModal} />
      ))}
    </div>
  );
}

export default Gallery;

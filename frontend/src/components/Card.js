import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal, Rate } from 'antd';
import { PlusOutlined, CheckOutlined } from '@ant-design/icons';
import { AuthContext } from '../contexts/authContext';
import { createUserRating } from '../utils/api';

import '../css/Card.css';
import { capitalize } from "../utils/utils";

function Card(props) {
  const { movie } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(null);
  const [rated, setRated] = useState(false);
  const { username, setUsername } = useContext(AuthContext);

  if (!movie) {
    return null;
  }

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  }

  function handleRatingChange(value) {
    setRating(value)
  }

  function onSubmit() {
    if (username) {
      const newRating = {
        userName: username,
        Imdb_title_id: movie.Imdb_title_id,
        movieName: movie.Original_title.substring(0, 45),
        movieRating: rating
      }

      createUserRating(newRating).then((res) => {
        if (res !== null) {
          if (res.status === 200) {
            setRated(true);
            setModalVisible(false);
          }
        } else {
          window.alert('Unable to make rating.');
        }
      });
    } else {
      window.alert('Log in to save your movie ratings!');
    }
  }

  return (
    <div className="card-wrapper" onClick={() => { }}>
      <img src={movie.imageUrl} className="card-image" alt="" />
      <div className="card-name">{capitalize(movie.Original_title)}</div>
      <Button
        className="card-add-rating"
        onClick={toggleModal}
        type={rated ? "ghost" : "primary"}
        icon={(rated ? <CheckOutlined /> : <PlusOutlined />)}
        disabled={rated}
        shape="circle"
      />
      <Modal
        title={
          <div className="flex-row">
            <div>Rate</div>
            <div className="card-modal-title-blue">{movie.Original_title}</div>
          </div>}
        centered
        visible={modalVisible}
        okText={'Submit'}
        onOk={onSubmit}
        onCancel={toggleModal}
        width={600}
      >
        <div className="card-modal-container">
          <Rate count={10} onChange={handleRatingChange} />
        </div>
      </Modal>
    </div>
  );
}

export default Card;

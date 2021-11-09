import React from 'react';
import { Link } from "react-router-dom";
import { Layout, Menu } from 'antd';
import '../css/NavHeader.css';

const { Header } = Layout;

function NavHeader() {
  return (
    <Header className="nav-desktop">
      <div className="flex-row">
        <Link to="/">
          <div className="nav-desktop-logo" />
        </Link>
        <div className="nav-title">
          Movie Monkeys
        </div>
      </div>
      <Menu mode="horizontal">
        <Menu.Item key="movies">
          <Link to="/">
            Find a Movie
          </Link>
        </Menu.Item>
        <Menu.Item key="top-movies">
          <Link to="/top-movies">
            Top Movies
          </Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link to="/profile">
            Your Profile
          </Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

export default NavHeader;
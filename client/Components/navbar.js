import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../store';
import AppBar from '@material-ui/core/AppBar';
import { Grid, FormHelperText } from '@material-ui/core';

process.env.PUBLIC_URL = process.env.PUBLIC_URL || '';

const stylesheet = {
  container: {
    width: '100%',
    height: '10vh',
    backgroundColor: '#EEE5BF',
  },
  navelements: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  logo: {
    maxHeight: '5vh',
    maxWidth: '100%',
    display: 'block',
  },
  navCell: {
    display: 'flex',
    maxHeight: '10vh',
    width: 'auto',
  },
  cellImage: {
    maxHeight: '3vh',
    maxWidth: '100%',
    display: 'block',
  },
};

const greeting = email => {
  let emailGreeting = email.split('@')[0];
  let firstLetter = email[0].toUpperCase();
  return firstLetter.concat(emailGreeting.slice(1));
};
const Navbar = ({ handleClick, isLoggedIn, email }) => (
  <AppBar>
    <nav style={stylesheet.container}>
      {isLoggedIn ? (
        <div style={stylesheet.navelements}>
          {/* The navbar will show these links after you log in */}
          <NavLink to="/home">
            <img
              src={process.env.PUBLIC_URL + '/assets/logos/purplesmall.png'}
              alt="polly pocket logo"
              style={stylesheet.logo}
            />
          </NavLink>
          <div>
            <a className="nav-welcome" href="/home">
              <div style={stylesheet.navCell}>
                {`Welcome, 
                ${greeting(email)}!  `}
                <i className="material-icons">local_library</i>
              </div>
            </a>
            <a href="#" onClick={handleClick}>
              <div style={stylesheet.navCell}>
                {`Logout `}
                <i className="material-icons">label_important</i>
              </div>
            </a>
          </div>
        </div>
      ) : (
        <div style={stylesheet.navelements}>
          {/* The navbar will show these links before you log in */}
          <NavLink to="/">
            <img
              src="https://i.imgur.com/uFNnZAt.png"
              alt="polly pocket logo"
              style={stylesheet.logo}
            />
          </NavLink>
          <div>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </div>
        </div>
      )}
    </nav>
  </AppBar>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    email: state.user.email,
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(
  mapState,
  mapDispatch
)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  email: PropTypes.string,
};

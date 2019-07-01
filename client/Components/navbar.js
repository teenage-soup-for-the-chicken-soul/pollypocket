import React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';

const Navbar = () => {
  return (
    <div>
      <AppBar position="static" color="default">
        <nav>
          <NavLink to="/">HomeLogo</NavLink>
          <NavLink to="/">Sign In</NavLink>
          <NavLink to="/">Sign Up</NavLink>
        </nav>
      </AppBar>
    </div>
  );
};
export default Navbar;

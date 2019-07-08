import React, { Component } from 'react';
import Footer from './footer';
process.env.PUBLIC_URL = process.env.PUBLIC_URL || '';

export default class Home extends Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          paddingTop: '6vh',
        }}
      >
        <img
          src={process.env.PUBLIC_URL + '/assets/images/homepageDesktop.png'}
          style={{ maxWidth: '100%', maxHeight: '80vh', display: 'block' }}
        />
        <Footer />
      </div>
    );
  }
}

import React, { Component } from 'react';
import Footer from './footer';

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
          src="https://i.imgur.com/u1TQZV9.png"
          style={{ maxWidth: '100%', maxHeight: '80vh', display: 'block' }}
        />
        <Footer />
      </div>
    );
  }
}

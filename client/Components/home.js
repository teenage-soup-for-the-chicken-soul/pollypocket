import React, { Component } from 'react';
import SignIn from './signInView';

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1>Homepage for Polly Pocket</h1>
        <div display="flex">
          <img src="https://hottopic.scene7.com/is/image/HotTopic/11431375_hi?$pdp_hero_standard$" />
          <SignIn />
        </div>
      </div>
    );
  }
}

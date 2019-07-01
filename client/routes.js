import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Components/home';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    );
  }
}

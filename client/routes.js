import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import Home from './Components/home';
import LoginDialogBox from './Components/LoginDialogBox';
import IndArticle from './Components/indArticle';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/article" component={IndArticle} />
        <Route exact path="/login" component={LoginDialogBox} />
      </Switch>
    );
  }
}

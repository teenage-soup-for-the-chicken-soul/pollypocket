import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();

// import store from './store';
import App from './app';
import './index.css';

ReactDOM.render(
  <BrowserRouter history={customHistory}>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

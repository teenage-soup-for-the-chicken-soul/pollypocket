import React from 'react'
import ReactDOM from 'react-dom'
<<<<<<< HEAD
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)
=======
import App from './components/App'

import './index.css';


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
>>>>>>> proofOfConcept/master

import React from 'react'
import ReactDOM from 'react-dom'
<<<<<<< HEAD
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
=======
>>>>>>> proofOfConcept/master
import App from './components/App'

import './index.css';


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
<<<<<<< HEAD
>>>>>>> proofOfConcept/master
=======
>>>>>>> proofOfConcept/master

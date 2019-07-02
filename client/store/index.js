import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './reducers/users'
import articles from './reducers/articles'

import { persistentStore } from 'redux-pouchdb';
// const PouchDB = require('pouchdb');
// const db = new PouchDB('articles');


const reducer = combineReducers({user,articles})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './reducers/users'


/*
What is going on here?
It is very simple:
The PouchDB database persists the state of chosen parts of the Redux store every time it changes.
Your reducers will be passed the state from PouchDB when your app loads and every time a change arrives (if you are syncing with a remote db).

*/

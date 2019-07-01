import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import user from './reducers/users';

const reducer = combineReducers({});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store =
  process.env.NODE_ENV === 'production'
    ? createStore(reducer, applyMiddleware(thunkMiddleware))
    : createStore(reducer, middleware);

export default store;
// export * from './user';

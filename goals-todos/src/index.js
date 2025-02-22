import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App.js';
import reducer from './reducers/index.js';
import middleware from './middleware/index.js';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(reducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

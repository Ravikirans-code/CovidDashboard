import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomePage from './Component/homePage/HomePage'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import Reducers from './reducers';

const store = createStore(Reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <HomePage />
  </Provider>,
  document.getElementById('root')
);

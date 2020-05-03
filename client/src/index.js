import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './components/Roots';
import configureStore from './app/store';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Root store={store} />
  </React.StrictMode>,
  document.getElementById('root')
);
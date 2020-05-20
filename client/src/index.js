import React from 'react';
import ReactDOM from 'react-dom';
import Root from './app/roots';
import configureStore from './app/store';
import './index.scss';

const store = configureStore();

ReactDOM.render(
    <React.StrictMode>
        <Root store={store} />
    </React.StrictMode>,
    document.getElementById('root')
);
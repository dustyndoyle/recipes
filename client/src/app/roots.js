import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from '../components/header/';
import App from './app';
import Recipe from '../components/singleRecipe/';
import AddRecipe from '../components/addRecipe/';
import NoMatch from '../components/404/';

const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <Header />
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/recipes/add" component={AddRecipe} />
                <Route path="/recipes/:id" component={Recipe} />
                <Redirect from="/recipes" to="/" />
                <Route component={NoMatch} />
            </Switch>
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired
}

export default Root;
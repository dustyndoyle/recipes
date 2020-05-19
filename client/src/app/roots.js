import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import App from './app';
import Recipe from '../components/singleRecipe/';
import AddRecipe from '../components/addRecipe/';
import NoMatch from '../components/404/';

const Root = ({ store }) => (
    <Provider store={store}>
      <Router>
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/recipes/:id" component={Recipe} />
            <Route path="/add-recipe" component={AddRecipe} />
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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    fetchRecipesIfNeeded
} from '../actions/recipes/getRecipes';
import Recipes from '../components/recipeDisplay/';

class App extends Component {
    
    // constructor(props) {
    //     super(props);   
    // }

    componentDidMount() {
        const { dispatch, userId } = this.props;
        dispatch( fetchRecipesIfNeeded( userId ) );
    }

    render() {
        const { recipeData, isFetching } = this.props;

        return(
            <div className="site-inner content-wrap">
                <h1 className="recipes__title">All Recipes</h1>
                {isFetching && recipeData.length === 0 && <h2>Loading...</h2>}
                {!isFetching && recipeData.length === 0 && <h2>No Recipes</h2>}
                {recipeData.length > 0 && (
                    <Recipes recipes={recipeData} />
                )}
            </div>
        )
    }
}

function mapStateToProps( state ) {
    const { allRecipes } = state;
    const { isFetching, lastUpdated, recipeData } = allRecipes || { isFetching: true, data: [] };

    return {
        recipeData,
        isFetching,
        lastUpdated
    }
}

App.propTypes = {
    recipeData: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    userId: PropTypes.number
}

export default connect( mapStateToProps )( App );
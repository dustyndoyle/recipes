import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    fetchSingleRecipeIfNeeded
} from '../../app/actions';
import { recipeDisplay } from '../recipeDisplay/recipeDisplaySlice';

class Recipe extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch, recipe_id, user_id } = this.props;
        dispatch( fetchSingleRecipeIfNeeded(recipe_id, user_id ) );
    }

    render() {
        const { recipe_id, recipeData, isFetching } = this.props;
        return (
            <div className="recipe-container">
                {isFetching && recipeData.length === 0 && <h2>Loading Recipe...</h2>}
                {!isFetching && recipeData.length === 0 && <h2>Recipe not found</h2>}
                {recipeData.length > 0 && (
                    <h1>{recipeData[0].name}</h1>
                )}
            </div>
        )
    }
}

function mapStateToProps( state, ownProps ) {
    const { match } = ownProps;
    const recipeId = match.params.id;
    const { singleRecipe } = state;

    const { isFetching, recipeData, user_id, recipe_id, lastUpdated } = singleRecipe[recipeId] || { isFetching: true, recipeData: [], recipe_id: recipeId, lastUpdated: 0, user_id: 1 };

    return {
        recipe_id,
        recipeData,
        isFetching,
        lastUpdated,
        user_id
    }
}

Recipe.propTypes = {
    recipeData: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    recipe_id: PropTypes.string,
    user_id: PropTypes.number
}

export default connect( mapStateToProps )( Recipe );
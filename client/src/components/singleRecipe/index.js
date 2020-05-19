import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
    fetchSingleRecipeIfNeeded
} from '../../actions/recipes/singleRecipe';

class Recipe extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch, recipe_id, user_id } = this.props;
        dispatch( fetchSingleRecipeIfNeeded(recipe_id, user_id ) );
    }

    render() {
        const { recipeData, isFetching } = this.props;
        return (
            <div className="recipe-container">
                <div className="recipe-back-to-home">
                    <NavLink to="/">Go back</NavLink>
                </div>
                {isFetching && recipeData.length === 0 && <h2>Loading Recipe...</h2>}
                {!isFetching && recipeData.length === 0 && <h2>Recipe not found</h2>}
                {recipeData.length > 0 && (
                    <div>
                        <div className="single-recipe-header">
                            <h1>{recipeData[0].name}</h1>
                            <div className="single-recipe-description">{recipeData[0].description}</div>
                        </div>
                        { recipeData[0].ingredients.length > 0 && (
                            <div className="single-recipe-ingredients">
                            {recipeData[0].ingredients.map( ( ingredient, i ) => {
                                return (
                                    <div key={i} className="single-recipe-ingredient">
                                        <div className="single-recipe-ingredient-amount">{ingredient.ingredient_amount}</div>
                                        <div className="single-recipe-ingredient-name">{ingredient.ingredient_name}</div>
                                    </div>
                                )
                            })}
                            </div>
                        )}
                        <div className="single-recipe-instructions" dangerouslySetInnerHTML={{ __html: recipeData[0].instructions.content }} />
                    </div>
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
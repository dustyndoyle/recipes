import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import {
    fetchSingleRecipeIfNeeded
} from '../../actions/recipes/singleRecipe';
import './recipe.scss';

class Recipe extends Component {

    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        const { dispatch, recipe_id, user_id } = this.props;
        dispatch( fetchSingleRecipeIfNeeded(recipe_id, user_id ) );
    }

    render() {
        const { recipeData, isFetching } = this.props;
        return (
            <div className="site-inner content-wrap">
                {isFetching && recipeData.length === 0 && <h2>Loading Recipe...</h2>}
                {!isFetching && recipeData.length === 0 && <h2>Recipe not found</h2>}
                {recipeData.length > 0 && (
                    <div className="single-recipe__container single-recipe">
                        <div className="single-recipe__header">
                            <h1 className="single-recipe__title">{recipeData[0].name}</h1>
                            <div className="single-recipe__description">{recipeData[0].description}</div>
                        </div>
                        { recipeData[0].ingredients.length > 0 && (
                            <div className="single-recipe__ingredients">
                            {recipeData[0].ingredients.map( ( ingredient, i ) => {
                                return (
                                    <div key={i} className="single-recipe__ingredients__ingredient">
                                        <div className="single-recipe__ingredients__amount">{ingredient.ingredient_amount}</div>
                                        <div className="single-recipe__ingredients__name">{ingredient.ingredient_name}</div>
                                    </div>
                                )
                            })}
                            </div>
                        )}
                        <div className="single-recipe__instructions" dangerouslySetInnerHTML={{ __html: recipeData[0].instructions.content }} />
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
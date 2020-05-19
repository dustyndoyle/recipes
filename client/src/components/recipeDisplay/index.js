import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
    removeRecipe
} from '../../actions/recipes/deleteRecipe'
// import PropTypes from 'prop-types';

class Recipes extends Component {

    constructor(props) {
        super(props);

        this.onDeleteRecipe = this.onDeleteRecipe.bind(this);
    }

    onDeleteRecipe(e) {
        const recipeId = e.target.value;
        this.props.deleteRecipe( recipeId );
        e.preventDefault();
    }

    render() {
        return (
            <div className="recipes-container">
                {this.props.recipes.map( ( recipe, i ) => {
                    return(
                    <div className="recipes-single" key={recipe.id}>
                        <h2 className="recipes-title">
                            <NavLink to={`/recipes/${recipe.id}`}>{recipe.name}</NavLink>
                        </h2>
                        <div className="recipes-description">{recipe.description}</div>
                        <button onClick={this.onDeleteRecipe} value={recipe.id} type="button">Delete Recipe</button>
                    </div>
                    )
                })}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteRecipe: recipeId => dispatch( removeRecipe( recipeId ) )
    }
}

export default connect( null, mapDispatchToProps )( Recipes );
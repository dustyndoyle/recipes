import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types';

export default class Recipes extends Component {

    constructor(props) {
        super(props);

        this.onDeleteRecipe = this.onDeleteRecipe.bind(this);
    }

    onDeleteRecipe(e) {
        const recipeId = e.target.value;
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
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types';

export default class Recipes extends Component {

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
                    </div>
                    )
                })}
            </div>
        )
    }
}
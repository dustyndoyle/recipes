import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { removeRecipe } from '../../actions/recipes/deleteRecipe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import './recipes.scss';
// import PropTypes from 'prop-types';

class Recipes extends Component {

    constructor(props) {
        super(props);

        this.onDeleteRecipe = this.onDeleteRecipe.bind(this);
    }

    onDeleteRecipe(e) {
        const recipeId = e.currentTarget.value;
        this.props.deleteRecipe( recipeId );
        e.preventDefault();
    }

    render() {
        return (
            <div className="recipes__container">
                {this.props.recipes.map( ( recipe, i ) => {
                    return(
                    <div className="recipes__recipe" key={recipe.id}>
                        <h2 className="recipes__recipe__title">
                            <NavLink to={`/recipes/${recipe.id}`}>{recipe.name}</NavLink>
                        </h2>
                        <div className="recipes__recipe__description">{recipe.description}</div>
                        <div className="recipes__recipe__view">
                            <NavLink to={`/recipes/${recipe.id}`}>View Recipe</NavLink>
                        </div>
                        <button className="recipes__recipe__delete" onClick={this.onDeleteRecipe} value={recipe.id} type="button">
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
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
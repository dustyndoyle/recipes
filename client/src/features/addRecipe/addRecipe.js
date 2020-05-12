import React, { Component } from 'react';
// import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
// import { NavLink } from 'react-router-dom';
import {
    addNewRecipe
} from '../../app/actions';
import AddRecipeIngredient from './addRecipeInput';
import EditRecipeInput from './editRecipeInput';

class AddRecipe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recipe_name: '',
            recipe_description: '',
            recipe_ingredients: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleAddIngredient = this.handleAddIngredient.bind(this);
        this.handleEditIngredient = this.handleEditIngredient.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const currentInput = e.target;
        const inputName = currentInput.name;
        const inputValue = currentInput.value;
        
        this.setState({
            [inputName]: inputValue
        });
    }

    handleAddIngredient(ingredientAdded) {
        const currentIngredients = this.state.recipe_ingredients;
        this.setState({
            recipe_ingredients: [...currentIngredients, ingredientAdded]
        })
    }

    handleEditIngredient(type, value, index) {
        let currentIngredients = this.state.recipe_ingredients;
        currentIngredients[index][type] = value;
        
        this.setState({
            recipe_ingredients: currentIngredients
        })
    }

    handleReset(e) {
        this.setState({
            recipe_name: '',
            recipe_description: '',
            recipe_ingredients: [],
        });
        e.preventDefault();
    }

    handleSubmit(e) {
        const recipeData = this.state;
        this.props.newRecipe( recipeData );
        e.preventDefault();
    }

    render() {
        return (
            <div className="recipe-container">
                <form onSubmit={this.handleSubmit} className="add-recipe-form">
                    <div className="add-recipe-row">
                        <label htmlFor="recipeName" className="add-recipe-label">Recipe Name</label>
                        <input name="recipe_name" id="recipeName" className="add-recipe-input" type="text" onChange={this.handleChange} value={this.state.recipe_name} required />
                    </div>
                    <div className="add-recipe-row">
                        <label htmlFor="recipeDescription" className="add-recipe-label">Description of recipe</label>
                        <textarea name="recipe_description" id="recipeDescription" className="add-recipe-input" onChange={this.handleChange} value={this.state.recipe_description} />
                    </div>
                    <div className="add-recipe-row">
                        <h3>Ingredients</h3>
                        <div className="add-recipe-ingredients-list">
                            {this.state.recipe_ingredients.map( (ingredient, i) => {
                                return(
                                    <div key={i} className="add-recipe-ingredients-item">
                                        <EditRecipeInput onIngredientChanged={this.handleEditIngredient} ingredientIndex={i} ingredientAmount={ingredient.ingredient_amount} ingredientName={ingredient.ingredient_name} />
                                    </div>
                                )
                            })}
                        </div>
                        <div className="add-recipe-ingredients">
                            <AddRecipeIngredient onIngredientAdded={this.handleAddIngredient} />
                        </div>
                    </div>
                    <button id="addRecipeSubmit" className="add-recipe-submit" type="submit">Add Recipe</button>
                    <button id="addRecipeReset" onClick={this.handleReset} className="add-recipe-reset" type="reset">Clear Recipe</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        newRecipe: recipeData => dispatch( addNewRecipe( recipeData ) )
    }
}

export default connect( null, mapDispatchToProps )( AddRecipe );
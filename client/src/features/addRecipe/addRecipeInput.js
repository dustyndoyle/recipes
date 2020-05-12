import React, { Component } from 'react';

class AddRecipeIngredient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredient_amount: '',
            ingredient_name: '',
        }
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAddIngredient = this.handleAddIngredient.bind(this);
    }

    handleAmountChange(e) {
        const amountInput = e.target;
        const amountValue = amountInput.value;

        this.setState({
            ingredient_amount: amountValue
        });
    }

    handleNameChange(e) {
        const nameInput = e.target;
        const nameValue = nameInput.value;

        this.setState({
            ingredient_name: nameValue
        });
    }

    handleAddIngredient(e) {
        const addedIngredient = this.state;
        this.props.onIngredientAdded(addedIngredient);
        this.setState({
            ingredient_amount: '',
            ingredient_name: '',
        })
    }

    render() {
        return (
            <div className="add-single-ingredient">
                <input className="add-single-ingredient-amount" type="text" name="ingredient_amount" onChange={this.handleAmountChange} placeholder="Ingredient amount" value={this.state.ingredient_amount} />
                <input className="add-single-ingredient-name" type="text" name="ingredient_name" onChange={this.handleNameChange} placeholder="Ingredient name" value={this.state.ingredient_name} />
                <button id="addRecipeIngredient" className="add-recipe-ingredient" onClick={this.handleAddIngredient} type="button">Add Ingredient</button>
            </div>
        )
    }
}


export default AddRecipeIngredient;
import React, { Component } from 'react';

class EditRecipeIngredient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredient_amount: this.props.ingredientAmount,
            ingredient_name: this.props.ingredientName,
        }
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        // this.handleEditIngredient = this.handleEditIngredient.bind(this);
    }

    handleAmountChange(e) {
        const index = this.props.ingredientIndex;
        const amountInput = e.target;
        const inputName = amountInput.name;
        const amountValue = amountInput.value;

        this.props.onIngredientChanged( inputName, amountValue, index );

        this.setState({
            ingredient_amount: amountValue
        });
    }

    handleNameChange(e) {
        const index = this.props.ingredientIndex;
        const nameInput = e.target;
        const inputName = nameInput.name;
        const nameValue = nameInput.value;

        this.props.onIngredientChanged( inputName, nameValue, index );

        this.setState({
            ingredient_name: nameValue
        });
    }

    render() {
        return (
            <div className="edit-single-ingredient">
                <input className="edit-single-ingredient-amount" type="text" name="ingredient_amount" onChange={this.handleAmountChange} placeholder="Ingredient amount" value={this.state.ingredient_amount} />
                <input className="edit-single-ingredient-name" type="text" name="ingredient_name" onChange={this.handleNameChange} placeholder="Ingredient name" value={this.state.ingredient_name} />
            </div>
        )
    }
}


export default EditRecipeIngredient;
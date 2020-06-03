import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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
        e.preventDefault();
        e.stopPropagation();
    }

    render() {
        return (
            <div className="add-recipe__ingredients__add__row">
                <input className="add-recipe__ingredients__add__amount" type="text" name="ingredient_amount" onChange={this.handleAmountChange} placeholder="Ingredient amount" value={this.state.ingredient_amount} />
                <input className="add-recipe__ingredients__add__name" type="text" name="ingredient_name" onChange={this.handleNameChange} placeholder="Ingredient name" value={this.state.ingredient_name} />
                <button id="addRecipeIngredient" className="add-recipe__ingredients__add__button" onClick={this.handleAddIngredient} type="button">
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        )
    }
}


export default AddRecipeIngredient;
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

class EditRecipeIngredient extends Component {

    constructor(props) {
        super(props);

        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleRemoveIngredient = this.handleRemoveIngredient.bind(this);
    }

    handleAmountChange(e) {
        const index = this.props.ingredientIndex;
        const amountInput = e.target;
        const inputName = amountInput.name;
        const amountValue = amountInput.value;

        this.props.onIngredientChanged( inputName, amountValue, index );
    }

    handleNameChange(e) {
        const index = this.props.ingredientIndex;
        const nameInput = e.target;
        const inputName = nameInput.name;
        const nameValue = nameInput.value;

        this.props.onIngredientChanged( inputName, nameValue, index );
    }

    handleRemoveIngredient(e) {
        const index = this.props.ingredientIndex;
        
        this.props.onIngredientRemoved( index );
    }

    render() {
        return (
            <div className="add-recipe__ingredients__edit">
                <input className="add-recipe__ingredients__edit__amount" type="text" name="ingredient_amount" onChange={this.handleAmountChange} placeholder="Ingredient amount" value={this.props.ingredientAmount} />
                <input className="add-recipe__ingredients__edit__name" type="text" name="ingredient_name" onChange={this.handleNameChange} placeholder="Ingredient name" value={this.props.ingredientName} />
                <button id="addRecipeIngredient" className="add-recipe__ingredients__edit__button" onClick={this.handleRemoveIngredient} type="button">
                    <FontAwesomeIcon icon={faMinus} />
                </button>
            </div>
        )
    }
}


export default EditRecipeIngredient;
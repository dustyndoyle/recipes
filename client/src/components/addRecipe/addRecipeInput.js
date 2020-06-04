import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class AddRecipeIngredient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredient_amount: {
                content: '',
                isValid: false
            },
            ingredient_name: {
                content: '',
                isValid: false
            }
        }
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.isValidIngredient = this.isValidIngredient.bind(this);
        this.handleAddIngredient = this.handleAddIngredient.bind(this);
    }

    handleAmountChange(e) {
        e.persist();
        const amountInput = e.target;
        const amountValue = amountInput.value;

        this.setState({
            ingredient_amount: {
                content: amountValue,
                isValid: this.state.ingredient_amount.isValid
            }
        }, () => this.isValidIngredient(e));
    }

    handleNameChange(e) {
        e.persist();
        const nameInput = e.target;
        const nameValue = nameInput.value;

        this.setState({
            ingredient_name: {
                content: nameValue,
                isValid: this.state.ingredient_amount.isValid
            }
        }, () => this.isValidIngredient(e));
    }

    isValidIngredient(e) {
        const input = e.target;
        const inputName = input.name;
        const inputValue = input.value;
        let inputIsValid = false;

        if( !!inputValue.trim() ) {
            inputIsValid = true
        }

        this.setState({
            [inputName]: {
                content: this.state[inputName].content,
                isValid: inputIsValid
            }
        })
    }

    handleAddIngredient(e) {
        const addedIngredient = this.state;
        let canAddIngredient = true;
        
        for( let [key] of Object.entries( addedIngredient ) ) {

            if( !addedIngredient[key].isValid ) {
                canAddIngredient = false;
            }
        }

        if( canAddIngredient ) {

            this.props.onIngredientAdded(addedIngredient);
            this.setState({
                ingredient_amount: {
                    content: '',
                    isValid: false
                },
                ingredient_name: {
                    content: '',
                    isValid: false
                }
            })
        }

        e.preventDefault();
        e.stopPropagation();
    }

    render() {
        return (
            <div className="add-recipe__ingredients__add__row">
                <input className="add-recipe__ingredients__add__amount" type="text" name="ingredient_amount" onChange={this.handleAmountChange} placeholder="Ingredient amount" value={this.state.ingredient_amount.content} />
                <input className="add-recipe__ingredients__add__name" type="text" name="ingredient_name" onChange={this.handleNameChange} placeholder="Ingredient name" value={this.state.ingredient_name.content} />
                <button id="addRecipeIngredient" className="add-recipe__ingredients__add__button" onClick={this.handleAddIngredient} type="button">
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        )
    }
}


export default AddRecipeIngredient;
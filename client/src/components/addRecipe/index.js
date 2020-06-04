import React, { Component } from 'react';
// import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { addNewRecipe } from '../../actions/recipes/addRecipe';
import AddRecipeIngredient from './addRecipeInput';
import EditRecipeInput from './editRecipeInput';
import './addRecipe.scss'

class AddRecipe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recipe_name: {
                content: '',
                isValid: false
            },
            recipe_description: {
                content: '',
                isValid: false
            },
            recipe_ingredients: {
                ingredients: [],
                isValid: false
            },
            recipe_instructions: {
                content: '',
                isValid: false
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.validateTextInput = this.validateTextInput.bind(this);
        this.handleAddIngredient = this.handleAddIngredient.bind(this);
        this.handleEditIngredient = this.handleEditIngredient.bind(this);
        this.handleRemoveIngredient = this.handleRemoveIngredient.bind(this);
        this.ingredientsAreValid = this.ingredientsAreValid.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.validateEditorContent = this.validateEditorContent.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        e.persist();
        const currentInput = e.target;
        const inputName = currentInput.name;
        const inputValue = currentInput.value;
        
        this.setState({
            [inputName]: {
                content: inputValue,
                isValid: this.state[inputName].isValid
            }
        }, () => this.validateTextInput(e) );
    }

    validateTextInput(e) {
        const currentInput = e.target;
        const inputName = currentInput.name;
        const inputValue = currentInput.value;
        let inputIsValid = false;
        
        if( !!inputValue.trim() ) {
            inputIsValid = true;
        }

        this.setState({
            [inputName]: {
                content: this.state[inputName].content,
                isValid: inputIsValid
            }
        })
    }

    handleAddIngredient(ingredientAdded) {
        const currentIngredients = this.state.recipe_ingredients.ingredients;

        this.setState({
            recipe_ingredients: {
                ingredients: [...currentIngredients, ingredientAdded],
                isValid: this.state.recipe_ingredients.isValid
            }
        }, this.ingredientsAreValid)
    }

    handleEditIngredient(type, value, isValid, index) {
        let currentIngredients = this.state.recipe_ingredients.ingredients;
        currentIngredients[index][type].content = value;
        currentIngredients[index][type].isValid = isValid;
        
        this.setState({
            recipe_ingredients: {
                ingredients: currentIngredients,
                isValid: this.state.recipe_ingredients.isValid
            }
        }, this.ingredientsAreValid)
    }

    handleRemoveIngredient( ingredientIndex ) {
        const currentIngredients = this.state.recipe_ingredients.ingredients.filter( (el, i) => ingredientIndex !== i );

        this.setState({
            recipe_ingredients: {
                ingredients: currentIngredients,
                isValid: this.state.recipe_ingredients.isValid
            }
        }, this.ingredientsAreValid)
    }

    ingredientsAreValid() {
        const currentIngredients = this.state.recipe_ingredients.ingredients;
        let ingredientsValid = true;

        if( currentIngredients.length === 0 ) {
            ingredientsValid = false;
        } else {
            currentIngredients.map( val => {
                const ingredientAmountValid = val.ingredient_amount.isValid;
                const ingredientNameValid = val.ingredient_name.isValid;
                
                if( !ingredientAmountValid || !ingredientNameValid ) {
                    ingredientsValid = false;
                }
            })
        }

        this.setState({
            recipe_ingredients: {
                ingredients: currentIngredients,
                isValid: ingredientsValid
            }
        })
    }

    handleEditorChange( content, editor ) {
        const editorContent = {
            content,
            isValid: this.state.recipe_instructions.isValid
        };

        this.setState({
            recipe_instructions: editorContent
        }, this.validateEditorContent)
    }

    validateEditorContent() {
        const editorContent = this.state.recipe_instructions.content
        let contentIsValid = false;
        
        if( !!editorContent.trim() ) {
            contentIsValid = true;
        }

        this.setState({
            recipe_instructions: {
                content: this.state.recipe_instructions.content,
                isValid: contentIsValid
            }
        })
    }

    validateForm() {
        const recipeData = this.state;

        for( let [key, val] of Object.entries(recipeData) ) {
            
            if( !val.isValid ) {
                return false;
            }
        }

        return true;
    }

    handleReset(e) {
        e.preventDefault();

        this.setState({
            recipe_name: {
                content: '',
                isValid: false
            },
            recipe_description: {
                content: '',
                isValid: false
            },
            recipe_ingredients: {
                ingredients: [],
                isValid: false
            },
            recipe_instructions: {
                content: '',
                isValid: false
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        const recipeData = this.state;
        const isFormValid = this.validateForm();

        // if( isFormValid ) {
        //     this.props.newRecipe( recipeData, this.props.history );
        // }
    }

    render() {
        return (
            <div className="site-inner content-wrap">
                <div className="add-recipe add-recipe__container">
                    <div className="add-recipe__header">
                        <h1 className="add-recipe__header__title">Add New Recipe</h1>
                    </div>
                    <form onSubmit={this.handleSubmit} className="add-recipe__form">
                        <div className="add-recipe__row">
                            <label htmlFor="recipeName" className="add-recipe__row__label">Recipe Name</label>
                            <input name="recipe_name" id="recipeName" className="add-recipe__row__input" type="text" onChange={this.handleChange} value={this.state.recipe_name.content} />
                        </div>
                        <div className="add-recipe__row">
                            <label htmlFor="recipeDescription" className="add-recipe__row__label">Description of recipe</label>
                            <textarea name="recipe_description" id="recipeDescription" maxLength="300" className="add-recipe__row__input" onChange={this.handleChange} value={this.state.recipe_description.content} />
                        </div>
                        <div className="add-recipe__row">
                            <h3 className="add-recipe__row__title">Ingredients</h3>
                            <div className="add-recipe__ingredients">
                                {this.state.recipe_ingredients.ingredients.map( (ingredient, i) => {
                                    return(
                                        <div key={i} className="add-recipe__ingredients__ingredient">
                                            <EditRecipeInput onIngredientChanged={this.handleEditIngredient} onIngredientRemoved={this.handleRemoveIngredient} ingredientIndex={i} ingredientAmount={ingredient.ingredient_amount.content} ingredientName={ingredient.ingredient_name.content} />
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="add-recipe__ingredients__add">
                                <AddRecipeIngredient onIngredientAdded={this.handleAddIngredient} />
                            </div>
                        </div>
                        <div className="add-recipe__row">
                            <h3 className="add-recipe__row__title">Instructions</h3>
                            <Editor
                                initialValue={this.state.recipe_instructions.content}
                                apiKey='ieayaz4molmnxjn9gr9msf2d8mnpql66nuzj47kjmagbvoti'
                                init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount'
                                    ],
                                    toolbar: 'undo redo | formatselect | bold italic | bullist numlist | removeformat | help'
                                }}
                                onEditorChange={this.handleEditorChange}
                            />
                        </div>
                        <div className="add-recipe__footer">
                            <button id="addRecipeReset" onClick={this.handleReset} className="add-recipe__reset" type="reset">Clear Recipe</button>
                            <button id="addRecipeSubmit" className="add-recipe__submit" type="submit">Add Recipe</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        newRecipe: ( recipeData, history ) => dispatch( addNewRecipe( recipeData, history ) )
    }
}

export default connect( null, mapDispatchToProps )( withRouter( AddRecipe ) );
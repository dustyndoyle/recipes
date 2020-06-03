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
            recipe_ingredients: [],
            recipe_instructions: { content: '' },
            form_valid: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.validateTextInput = this.validateTextInput.bind(this);
        this.handleAddIngredient = this.handleAddIngredient.bind(this);
        this.handleEditIngredient = this.handleEditIngredient.bind(this);
        this.handleRemoveIngredient = this.handleRemoveIngredient.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
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
        
        if( !!inputValue.trim() ) {
            this.setState({
                [inputName]: {
                    content: this.state[inputName].content,
                    isValid: true
                }
            })
        } else {
            this.setState({
                [inputName]: {
                    content: this.state[inputName].content,
                    isValid: false
                }
            })
        }
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

    handleRemoveIngredient( ingredientIndex ) {
        const currentIngredients = this.state.recipe_ingredients.filter( (el, i) => ingredientIndex !== i );

        this.setState({
            recipe_ingredients: currentIngredients
        })
    }

    handleEditorChange( content, editor ) {
        const editorContent = {content};

        this.setState({
            recipe_instructions: editorContent
        })
    }

    handleReset(e) {
        this.setState({
            recipe_name: {
                content: '',
                isValid: false
            },
            recipe_description: '',
            recipe_ingredients: [],
            recipe_instructions: { content: '' }
        });
        e.preventDefault();
    }

    handleSubmit(e) {
        const recipeData = this.state;

        if( this.state.form_valid ) {
            this.props.newRecipe( recipeData, this.props.history );
        }
        e.preventDefault();
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
                            <input name="recipe_name" id="recipeName" className="add-recipe__row__input" type="text" onChange={this.handleChange} value={this.state.recipe_name.content} required />
                        </div>
                        <div className="add-recipe__row">
                            <label htmlFor="recipeDescription" className="add-recipe__row__label">Description of recipe</label>
                            <textarea name="recipe_description" id="recipeDescription" maxLength="300" className="add-recipe__row__input" onChange={this.handleChange} value={this.state.recipe_description.content} />
                        </div>
                        <div className="add-recipe__row">
                            <h3 className="add-recipe__row__title">Ingredients</h3>
                            <div className="add-recipe__ingredients">
                                {this.state.recipe_ingredients.map( (ingredient, i) => {
                                    return(
                                        <div key={i} className="add-recipe__ingredients__ingredient">
                                            <EditRecipeInput onIngredientChanged={this.handleEditIngredient} onIngredientRemoved={this.handleRemoveIngredient} ingredientIndex={i} ingredientAmount={ingredient.ingredient_amount} ingredientName={ingredient.ingredient_name} />
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
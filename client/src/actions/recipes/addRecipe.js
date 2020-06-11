import fetch from 'cross-fetch';
import {
    BEGIN_ADD_NEW_RECIPE,
    END_ADD_NEW_RECIPE,
} from '../../constants/recipes';

function beginAddingRecipe( recipeData, userId = 1 ) {
    return {
        type: BEGIN_ADD_NEW_RECIPE,
        recipe_name: recipeData.recipe_name,
        recipe_description: recipeData.recipe_description,
        recipe_ingredients: recipeData.recipe_ingredients,
        recipe_instructions: recipeData.recipe_instructions,
        userId: ( userId ? userId : 1 ),
    }
}

function recipeAdded( recipeData, userId = 1 ) {
    return {
        type: END_ADD_NEW_RECIPE,
        recipe_name: recipeData.name,
        recipe_description: recipeData.description,
        recipe_ingredients: recipeData.ingredients,
        recipe_instructions: recipeData.instructions,
        userId: ( recipeData.user_id ? recipeData.user_id : 1 ),
    }
}

function sanitizeRecipeData( recipeData ) {
    let recipeIngredients = recipeData.recipe_ingredients.ingredients;

    recipeIngredients.map( ( val, i ) => {
        recipeData.recipe_ingredients.ingredients[i].ingredient_amount = val.ingredient_amount.content;
        recipeData.recipe_ingredients.ingredients[i].ingredient_name = val.ingredient_name.content;
    });

    return {
        ...recipeData,
        recipe_name: recipeData.recipe_name.content,
        recipe_description: recipeData.recipe_description.content,
        recipe_ingredients: recipeData.recipe_ingredients.ingredients,
        recipe_instructions: {
            content: recipeData.recipe_instructions.content
        }
    }
}

function postNewRecipe( recipeData, history ) {
    return dispatch => {
        dispatch( beginAddingRecipe( recipeData ) )
        return fetch( `http://localhost:8080/recipes`, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify( recipeData )
        })
        .then( response => {
            return response.json()
        })
        .then( json => {
            dispatch( recipeAdded( json ) );
            history.push( '/recipes/' + json.recipe_id )
        })
        .catch( err => {
            console.error( 'Error: ', err );
        })
    }
}

function shouldAddNewRecipe( state ) {
    
    if( state.addRecipe.isAdding ) {
        return false;
    }

    return true;
}

export function addNewRecipe( recipeData, history ) {
    return( dispatch, getState ) => {
        if( shouldAddNewRecipe( getState() ) ) {
            const updatedRecipeData = sanitizeRecipeData( recipeData );
            return dispatch( postNewRecipe( updatedRecipeData, history ) );
        }
    }
}
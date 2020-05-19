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
        userId: ( userId ? userId : 1 ),
    }
}

function recipeAdded( recipeData, userId = 1 ) {
    return {
        type: END_ADD_NEW_RECIPE,
        recipe_name: recipeData.name,
        recipe_description: recipeData.description,
        userId: ( recipeData.user_id ? recipeData.user_id : 1 ),
    }
}


function postNewRecipe( recipeData ) {
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
            return dispatch( recipeAdded( json ) )
        })
        .catch( err => {
            console.error( 'Error: ', err );
        })
    }
}

function shouldAddNewRecipe( state, recipeData ) {
    
    if( state.addRecipe.isAdding ) {
        return false;
    }

    return true;
}

export function addNewRecipe( recipeData ) {
    return( dispatch, getState ) => {
        if( shouldAddNewRecipe( getState(), recipeData ) ) {
            return dispatch( postNewRecipe( recipeData ) );
        }
    }
}
import fetch from 'cross-fetch';
import { shouldFetchRecipes } from './getRecipes';
import {
    BEGIN_DELETE_RECIPE,
    END_DELETE_RECIPE
} from '../../constants/recipes';

function beginDeleteRecipe( recipeId ) {
    return {
        type: BEGIN_DELETE_RECIPE,
        recipe_id: recipeId
    }
}

function recipeDeleted( recipeId ) {
    return {
        type: END_DELETE_RECIPE,
        recipe_id: recipeId,
    }
}

function deleteRecipe( recipeId ) {
    return dispatch => {
        dispatch( beginDeleteRecipe( recipeId ) )
        return fetch( `http://localhost:8080/recipes/${recipeId}`, {
            method: 'DELETE',
            cache: 'no-cache',
        })
        .then( response => {
            dispatch( recipeDeleted( recipeId ) )
        })
        .catch( err => {
            console.error( 'Error: ', err );
        })
    }
}

export function removeRecipe( recipeId ) {
    return( dispatch, getState ) => {
        if( shouldFetchRecipes( getState(), 1 ) ) {
            return dispatch( deleteRecipe( recipeId ) );
        }
    }
}
import fetch from 'cross-fetch';
import {
    REQUEST_SINGLE_RECIPE,
    RECEIVE_SINGLE_RECIPE
} from '../../constants/recipes';

function requestSingleRecipe( recipeId, userId ) {
    return {
        type: REQUEST_SINGLE_RECIPE,
        recipe_id: recipeId,
        user_id: ( userId ? userId : 1 ),
    }
}

function receiveSingleRecipe( recipeId, userId, json ) {
    return {
        type: RECEIVE_SINGLE_RECIPE,
        recipe_id: recipeId,
        user_id: ( userId ? userId : 1 ),
        recipe: json,
        receivedAt: Date.now()
    }
}

function fetchSingleRecipe( recipeId, userId ) {
    return dispatch => {
        dispatch( requestSingleRecipe( recipeId, userId ) )
        return fetch( `http://localhost:8080/recipes/${recipeId}` )
            .then( response => response.json() )
            .then( json => dispatch( receiveSingleRecipe( recipeId, userId, json ) ) )
    }
}

function shouldFetchSingleRecipe( state, recipeId,  userId ) {
    const recipe = state.singleRecipe[recipeId];

    if( !recipe ) {
        return true;
    } else if( recipe.isFetching ) {
        return false;
    } else {
        return false;
    }
}

export function fetchSingleRecipeIfNeeded( recipeId, userId ) {
    return ( dispatch, getState ) => {
        if( shouldFetchSingleRecipe( getState(), recipeId, userId ) ) {
            return dispatch( fetchSingleRecipe( recipeId, userId ) );
        }
    }
}
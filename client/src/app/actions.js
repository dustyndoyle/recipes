import fetch from 'cross-fetch';

export const REQUEST_RECIPES = 'REQUEST_RECIPES';
export const RECEIVE_RECIPES = 'RECEIVE_RECIPES';

function requestRecipes( userId ) {
    return {
        type: REQUEST_RECIPES,
        user_id: ( userId ? userId : 1 ),
    }
}

function receiveRecipes( userId, json ) {
    return {
        type: RECEIVE_RECIPES,
        user_id: ( userId ? userId : 1 ),
        recipes: json,
        receivedAt: Date.now()
    }
}

function fetchRecipes( userId ) {
    return dispatch => {
        dispatch( requestRecipes( userId ) )
        return fetch( `http://localhost:8080/recipes` )
            .then( response => response.json() )
            .then( json => dispatch( receiveRecipes( userId, json ) ) )
    }
}

function shouldFetchRecipes( state, userId ) {
    const recipes = state.recipes;

    if( recipes.isFetching ) {
        return false;
    } else {
        return true;
    }
}

export function fetchRecipesIfNeeded( userId ) {
    return ( dispatch, getState ) => {
        if( shouldFetchRecipes( getState(), userId ) ) {
            return dispatch( fetchRecipes( userId ) );
        }
    }
}
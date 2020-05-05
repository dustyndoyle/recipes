import fetch from 'cross-fetch';

export const REQUEST_RECIPES = 'REQUEST_RECIPES';
export const RECEIVE_RECIPES = 'RECEIVE_RECIPES';
export const REQUEST_SINGLE_RECIPE = 'REQUEST_SINGLE_RECIPE';
export const RECEIVE_SINGLE_RECIPE = 'RECEIVE_SINGLE_RECIPE';

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

function fetchRecipes( userId ) {
    return dispatch => {
        dispatch( requestRecipes( userId ) )
        return fetch( `http://localhost:8080/recipes` )
            .then( response => response.json() )
            .then( json => dispatch( receiveRecipes( userId, json ) ) )
    }
}

function shouldFetchRecipes( state, userId ) {
    const recipes = state.allRecipes;

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

function fetchSingleRecipe( recipeId, userId ) {
    return dispatch => {
        dispatch( requestSingleRecipe( recipeId, userId ) )
        return fetch( `http://localhost:8080/recipes/${recipeId}` )
            .then( response => response.json() )
            .then( json => dispatch( receiveSingleRecipe( recipeId, userId, json ) ) )
    }
}

function shouldFetchSingleRecipe( state, recipeId,  userId ) {
    const recipe = state.singleRecipe;

    if( recipe.isFetching ) {
        return false;
    } else {
        return true;
    }
}

export function fetchSingleRecipeIfNeeded( recipeId, userId ) {
    return ( dispatch, getState ) => {
        if( shouldFetchSingleRecipe( getState(), recipeId, userId ) ) {
            return dispatch( fetchSingleRecipe( recipeId, userId ) );
        }
    }
}
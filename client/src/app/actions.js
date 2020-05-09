import fetch from 'cross-fetch';

export const REQUEST_RECIPES = 'REQUEST_RECIPES';
export const RECEIVE_RECIPES = 'RECEIVE_RECIPES';
export const REQUEST_SINGLE_RECIPE = 'REQUEST_SINGLE_RECIPE';
export const RECEIVE_SINGLE_RECIPE = 'RECEIVE_SINGLE_RECIPE';
export const BEGIN_ADD_NEW_RECIPE = 'BEGIN_ADD_NEW_RECIPE';
export const END_ADD_NEW_RECIPE = 'END_ADD_NEW_RECIPE';
export const BEGIN_DELETE_RECIPE = 'BEGIN_DELETE_RECIPE';
export const END_DELETE_RECIPE = 'END_DELETE_RECIPE';

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
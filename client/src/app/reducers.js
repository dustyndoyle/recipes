import { combineReducers } from 'redux';

import {
    REQUEST_RECIPES,
    RECEIVE_RECIPES,
    REQUEST_SINGLE_RECIPE,
    RECEIVE_SINGLE_RECIPE,
    BEGIN_ADD_NEW_RECIPE,
    END_ADD_NEW_RECIPE,
    BEGIN_DELETE_RECIPE,
    END_DELETE_RECIPE
} from './actions';

function addRecipe( state = {}, action ) {

    const initialState = {
        isAdding: true,
        recipe_name: action.recipe_name,
        recipe_description: action.recipe_description,
        user_id: action.userId,
    }

    switch( action.type ) {
        case END_ADD_NEW_RECIPE:
            return Object.assign( {}, initialState, {
                    isAdding: false
                });
        case BEGIN_ADD_NEW_RECIPE:
            return initialState;
        default:
            return state;
    }
}

function singleRecipe( state = {}, action ) {
    switch( action.type ) {
        case RECEIVE_SINGLE_RECIPE:
            return Object.assign( {}, state, {
                [action.recipe_id]: {
                    isFetching: false,
                    recipe_id: action.recipe_id,
                    user_id: action.user_id,
                    recipeData: action.recipe,
                    lastUpdated: action.receivedAt
                }
            });
        case REQUEST_SINGLE_RECIPE:
            return Object.assign( {}, state, {
                [action.recipe_id]: {
                    isFetching: true,
                    recipeData: [],
                    recipe_id: action.recipe_id,
                    user_id: action.user_id,
                    recipeData: [],
                }
            });
        default:
            return state;
    }
}

function allRecipes( state = {
        isFetching: false,
        recipeData: [],
        user_id: 1,
    }, action ) {
    switch( action.type ) {
        case BEGIN_DELETE_RECIPE:
        case END_DELETE_RECIPE:
        case RECEIVE_RECIPES:
        case REQUEST_RECIPES:
            return Object.assign( {}, state, recipes( state, action ));
        default:
            return state;
    }
}

function recipes(
    state = {
        isFetching: false,
        recipeData: [],
        user_id: 1,
    },
    action
) {
    switch( action.type ) {
        case BEGIN_DELETE_RECIPE:
        case REQUEST_RECIPES:
            return Object.assign( {}, state, {
                isFetching: true,
            });
        case RECEIVE_RECIPES:
            return Object.assign( {}, state, {
                isFetching: false,
                recipeData: action.recipes,
                lastUpdated: action.receivedAt
            });
        case END_DELETE_RECIPE:
            return Object.assign( {}, state, {
                isFetching: false,
                recipeData: [ ...state.recipeData.filter( recipe => recipe.id != action.recipe_id ) ]
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    singleRecipe,
    allRecipes,
    addRecipe,
});

export default rootReducer;
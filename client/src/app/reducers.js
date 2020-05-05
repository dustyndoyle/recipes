import { combineReducers } from 'redux';

import {
    REQUEST_RECIPES,
    RECEIVE_RECIPES,
    REQUEST_SINGLE_RECIPE,
    RECEIVE_SINGLE_RECIPE
} from './actions';

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
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    singleRecipe,
    allRecipes,
});

export default rootReducer;
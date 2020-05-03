import { combineReducers } from 'redux';

import {
    REQUEST_RECIPES,
    RECEIVE_RECIPES
} from './actions';

// function selectedUser( state = 1, action ) {
//     switch( action.type ) {
//         case REQUEST_RECIPES:
//             return action.userId;
//         default:
//             return state;
//     }
// }

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
    recipes,
});

export default rootReducer;
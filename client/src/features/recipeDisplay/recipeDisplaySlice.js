import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const recipeDisplay = createSlice({
    name: 'recipeDisplay',
    initialState: {
        filter: 'all',
        userId: 1,
        isFetching: false,
        recipes: []
    },
    reducers: {
        displayRecipes( state, action ) {
            const { filter, userId } = action.payload;
            state.filter = filter;
            state.userId = userId;
            state.isFetching = false;
        },
        requestRecipes( state, action ) {
            state.filter = action.payload;
            state.isFetching = true;
        },
        setCurrentUser( state, action ) {
            state.userId = action.payload;
        },
        setCurrentFilter( state, action ) {
            state.filter = action.payload;
        },
    },
});

export const { displayRecipes, setCurrentUser, setCurrentFilter } = recipeDisplay.actions;

export default recipeDisplay.reducer;
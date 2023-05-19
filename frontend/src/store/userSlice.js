import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {},
        isAuthenticated: false,
        loading: false
    },
    reducers: {
        signUp: (state, action) => {
            state.error = action.payload.error;
            state.user = action.payload.user;
            state.isAuthenticated = action.payload.isAuthenticated;

        },
        login: (state, action) => {
            state.error = action.payload.error;

            state.user = action.payload.user;
            state.isAuthenticated = action.payload.isAuthenticated;

        },
        clearError: (state, action) => {
            state.error = null;
            state.user = null;
            state.isAuthenticated = false;
        },
        logginOut: (state, action) => {
            state.error = null;
            state.user = null;
            state.isAuthenticated = false;
        }
    },
});



// Action creators are generated for each case reducer function
export const { signUp, login, clearError, logginOut } = userSlice.actions;

export default userSlice.reducer;
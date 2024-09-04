// src/Redux/AuthSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
};

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem('jwtToken', action.payload.token); // Store token in localStorage
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('jwtToken'); // Remove token from localStorage
        },
    },
});

export const { addUser, logout } = AuthSlice.actions;
export default AuthSlice.reducer;

import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    loading: false,
    user: null,
    error: null,
};

// export const userReducer = createReducer(initialState, (builder) => {
//     builder
//         .addCase('LoadUserRequest', (state) => {
//             state.loading = true;
//         })
//         .addCase('LoadUserSuccess', (state, action) => {
//             state.isAuthenticated = true;
//             state.loading = false;
//             state.user = action.payload;
//         })
//         .addCase('LoadUserFailure', (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//             state.isAuthenticated = false;
//         })
//         .addCase('clearErrors', (state) => {
//             state.error = null;
//         });
// });



export const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('LoadUserRequest', (state) => {
            state.loading = true;
            state.error = null; // Clear any previous errors
        })
        .addCase('LoadUserSuccess', (state, action) => {
            state.isAuthenticated = true;
            state.loading = false;
            state.user = action.payload;
            state.error = null; // Clear any previous errors
        })
        .addCase('LoadUserFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
            state.user = null; // Reset user data
        })


        // update user Information
        .addCase('updateUserInfoRequest', (state) => {
            state.loading = true;

        })
        .addCase('updateUserInfoSuccess', (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase('updateUserInfoFailed', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })



        .addCase('clearErrors', (state) => {
            state.error = null;
        });
});






// export default userReducer;

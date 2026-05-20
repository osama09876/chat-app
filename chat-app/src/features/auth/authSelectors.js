export const selectAuth = (state) => state.auth;

export const selectUser = (state) => state.auth.user;

export const selectAuthLoading = (state) => state.auth.loading;

export const selectAuthError = (state) => state.auth.error;

//users

export const selectAllUsers = (state) => state.users;

export const selectUsers = (state) => state.users.users;

export const selectUsersLoading = (state) => state.users.loading;

export const selectUsersError = (state) => state.users.error;

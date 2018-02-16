import { createSelector } from 'reselect';
// selector
const getUser = (state) => state.entities.user;
// reselect function

export const getCurrentUserInfoState = createSelector(
    [getUser],
    (user) => user.info
);

export const getUserIsSignInState = createSelector(
    [ getUser ],
    (user) => user.isSignIn
);

export const getUserIsLoadingState = createSelector(
    [ getUser ],
    (user) => user.isLoading
);

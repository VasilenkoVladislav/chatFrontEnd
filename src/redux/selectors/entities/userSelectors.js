import { createSelector } from 'reselect';
// selector
const getUser = (state) => state.entities.user;
// reselect function

export const getCurrentUserInfoState = createSelector(
    getUser,
    (user) => user.info
);

export const getCurrentUserNameState = createSelector(
    getCurrentUserInfoState,
    (info) => info.name
);

export const getCurrentUserIdState = createSelector(
    getCurrentUserInfoState,
    (info) => info.id
);

export const getCurrentUserSmallAvatarState = createSelector(
    getCurrentUserInfoState,
    (info) => info.image_small || '/static/images/default-avatar.png'
);

export const getCurrentUserMediumAvatarState = createSelector(
    getCurrentUserInfoState,
    (info) => info.image_medium || '/static/images/default-avatar.png'
);

export const getCurrentUserBigAvatarState = createSelector(
    getCurrentUserInfoState,
    (info) => info.image || '/static/images/default-avatar.png'
);

export const getUserIsSignInState = createSelector(
    getUser,
    (user) => user.isSignIn
);

export const getUserIsLoadingState = createSelector(
    getUser,
    (user) => user.isLoading
);

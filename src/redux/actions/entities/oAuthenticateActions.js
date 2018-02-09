import { OAUTHENTICATE_REQUEST, VALIDATE_TOKEN_REQUEST } from 'redux/constansActions';

export function oAuthSignInRequest (provider) {
    return { type: OAUTHENTICATE_REQUEST, payload: provider };
}

export function validateTokenRequest (headers) {
    return { type: VALIDATE_TOKEN_REQUEST, payload: headers };
}

import api from 'configApi/apiAuth';
import { authTokenFormat } from 'default/tokenFormat';
import { signInSuccess } from 'redux/actions/entities/authenticateActions';
import { updateHeaders } from 'redux/actions/entities/headersActions';

export function validateToken (requestHeaders, res, store) {
    return new Promise(async (resolve) => {
        let responseHeaders = requestHeaders;
        const { data, headers } = await api.authentications.validateToken(requestHeaders);
        if (data && headers && res) {
            if (headers['access-token'] && headers['client'] && headers['uid']) {
                responseHeaders = authTokenFormat(headers);
            }
            res.cookie('authHeaders', JSON.stringify(responseHeaders), {maxAge: (Date.now() / 1000) + 14 * 24 * 3600});
            store.dispatch(updateHeaders(responseHeaders));
            store.dispatch(signInSuccess(data));
        }
        return resolve();
    });
}

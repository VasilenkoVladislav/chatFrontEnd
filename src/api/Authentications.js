import Base from './Base';
import config from 'configApi/config';
import Cookies from 'js-cookie';

export default class Authentications extends Base {
    signIn = ({ email, password }) => {
        return this.apiClient.post(config.authentication.signIn, {email, password});
    };
    validateToken = (headers) => {
        return this.apiClient.get(config.authentication.validateToken, {}, headers);
    };
    signOut = (headers) => {
        Cookies.remove('authHeaders');
        return this.apiClient.delete(config.authentication.signOut, headers);
    };
}

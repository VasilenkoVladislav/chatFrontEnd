import Base from './Base';
import config from 'configApi/config';

export default class Search extends Base {
    searchUsers = (params, headers) => {
        return this.apiClient.get(config.users.searchUsers, params, headers);
    };
}

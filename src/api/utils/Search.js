import ApiClient from 'api/ApiClient';
import config from 'configApi/config';
import { getHeadersState } from 'redux/selectors/entities/headersSelectors';
import { updateHeaders } from 'redux/actions/entities/headersActions';

// #Todo подумать как убрать эту костыляку
export default class Search {
    constructor () {
        this.apiClient = new ApiClient({ prefix: config[process.env.NODE_ENV].apiPrefix + config.versionApi});
    }
    initialize ({getState, dispatch}) {
        this.getState = getState;
        this.dispatch = dispatch;
    }
    searchUsers = async (params) => {
        if (this.dispatch && this.getState) {
            const requestHeaders = getHeadersState(this.getState());
            const { data, headers } = await this.apiClient.get(config.users.searchUsers, params, requestHeaders);
            this.dispatch(updateHeaders(headers));
            return data.users;
        } else {
            throw new Error('Please initialize getState and dispatch');
        }
    };
}

export const search = new Search();

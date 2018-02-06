import axios from 'axios';

export default class ApiClient {
    constructor ({prefix = 'localhost:3000/api/v1'} = {}) {
        this.prefix = prefix;
    }
    get (requestUrl, payload = {}, params, headers) {
        return this.request({
            url: `${this.prefix}${requestUrl}`,
            method: 'get',
            data: payload,
            params,
            headers
        });
    }
    put (requestUrl, payload = {}, headers) {
        return this.request({
            url: `${this.prefix}${requestUrl}`,
            method: 'put',
            data: payload,
            headers
        });
    }
    post (requestUrl, payload = {}, headers) {
        return this.request({
            url: `${this.prefix}${requestUrl}`,
            method: 'post',
            data: payload,
            headers
        });
    }
    delete (requestUrl, headers) {
        return this.request({
            url: `${this.prefix}${requestUrl}`,
            method: 'delete',
            headers
        });
    }
    request ({url, method, params = {}, data, headers = {}}) {
        return axios({method, url, params, data, headers})
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    if (response.data && response.data.data) {
                        response.data = response.data.data;
                    }
                    return response;
                }
            }, xhr => {
                const response = { error: {} };
                response.error.statusCode = (xhr && xhr.response && xhr.response.status) || 500;
                response.error.status = 'error';
                response.error.toString = () => {
                    let result = 'Bad response from server';
                    if (xhr && xhr.response && xhr.response.data) {
                        result = xhr.response.data.errors;
                    } else {
                        result = xhr.message;
                    }
                    return result;
                };
                return response;
            });
    }
}

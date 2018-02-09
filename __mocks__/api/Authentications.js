import { headers } from 'data/headersData';
import { user } from 'data/userData';

const userSingInData = {email: user.info.email, password: 'aa123456'};

export default class Authentications {
    signIn = (email, password) => {
        return new Promise((resolve) => {
            process.nextTick(() => {
                if (userSingInData.email === email && userSingInData.password === password) {
                    resolve({data: user.info, headers});
                } else {
                    resolve({error: 'Error'});
                }
            });
        });
    };
    validateToken = (requestHeaders) => {
        return new Promise((resolve) => {
            process.nextTick(() => {
                if (requestHeaders && requestHeaders['access-token'] === headers['access-token'] && requestHeaders['client'] === headers['client']) {
                    resolve({data: user.info, headers});
                } else {
                    resolve({error: 'Error'});
                }
            });
        });
    };
    signOut = (headers) => {
        return new Promise((resolve) => {
            process.nextTick(() => {
                if (headers) {
                    resolve({});
                } else {
                    resolve({error: 'Error'});
                }
            });
        });
    };
}

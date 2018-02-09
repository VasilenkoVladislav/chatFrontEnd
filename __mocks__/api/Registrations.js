import { headers } from 'data/headersData';
import { user } from 'data/userData';

export default class Registrations {
    registration = (data) => {
        return new Promise((resolve) => {
            process.nextTick(() => {
                if (data) {
                    resolve({data: user.info, headers});
                } else {
                    resolve({error: 'Error'});
                }
            });
        });
    };
}

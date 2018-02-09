import ApiClient from './ApiClient';
import Authentications from './Authentications';
import Registrations from './Registrations';

export default function ({ apiPrefix } = {}) {
    const api = new ApiClient({ prefix: apiPrefix});
    return {
        authentications: new Authentications({apiClient: api}),
        registrations: new Registrations({apiClient: api})
    };
}

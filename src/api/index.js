import ApiClient from './ApiClient';
import Authentications from './Authentications';
import Conversations from './Conversations';
import Messages from './Messages';
import Registrations from './Registrations';

export default function ({ apiPrefix } = {}) {
    const api = new ApiClient({ prefix: apiPrefix});
    return {
        authentications: new Authentications({apiClient: api}),
        conversations: new Conversations({apiClient: api}),
        messages: new Messages({apiClient: api}),
        registrations: new Registrations({apiClient: api})
    };
}

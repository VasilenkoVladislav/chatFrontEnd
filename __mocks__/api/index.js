import Authentications from './Authentications';
import Registrations from './Registrations';

export default function () {
    return {
        authentications: new Authentications(),
        registrations: new Registrations()
    };
}

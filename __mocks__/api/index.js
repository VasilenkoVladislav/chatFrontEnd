import Authentications from './authentications/Authentications';
import Registrations from './authentications/Registrations';

export default function () {
    return {
        authentications: new Authentications(),
        registrations: new Registrations()
    };
}
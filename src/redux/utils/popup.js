import config from 'configApi/config';
import oAuthPath from 'default/oAuthPath';

const settings = 'scrollbars=no,toolbar=no,location=no,titlebar=no,directories=no,status=no,menubar=no';
export function getPopupOffset ({ width, height }) {
    const wLeft = window.screenLeft || window.screenX;
    const wTop = window.screenTop || window.screenY;
    const left = wLeft + (window.innerWidth / 2) - (width / 2);
    const top = wTop + (window.innerHeight / 2) - (height / 2);
    return { top, left };
}

export function getPopupSize (provider) {
    switch (provider) {
    case 'facebook':
        return { width: 1020, height: 620 };
    case 'google':
        return { width: 452, height: 633 };
    case 'twitter':
        return { width: 620, height: 370 };
    default:
        return { width: 1020, height: 620 };
    }
}

export function getPopupDimensions (provider) {
    const { width, height } = getPopupSize(provider);
    const { top, left } = getPopupOffset({ width, height });
    return `width=${width},height=${height},top=${top},left=${left}`;
}

export function openPopupOAuthSignIn (provider) {
    const name = oAuthPath[provider];
    const url = `${config[process.env.NODE_ENV].apiPrefix}${config.authentication.authScope}${name}?auth_origin_url=${encodeURIComponent(window.location.href)}`;
    return window.open(url, name, `${settings},${getPopupDimensions(provider)}`);
}

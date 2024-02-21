import umbrella from 'umbrella-storage';
import Cookies from 'js-cookie';

type requestType = 'long-term' | 'session';

const localeCookieKey = [];

export const saveLocaleData = (
    requestType: requestType,
    key: string,
    value: any
) =>
    new Promise((resolve) => {
        try {
            if (requestType === 'long-term') {
                umbrella.setLocalStorage(key, value);
            } else if (requestType === 'session') {
                umbrella.setSessionStorage(key, value);
            }
        } catch (e) {
            console.error('not support save storage', e);
            const cookieKey =
                (requestType === 'long-term' ? '_locale_' : '_session_') + key;

            localeCookieKey.push(cookieKey);

            Cookies.set(cookieKey, JSON.stringify(value));
        }

        resolve(true);
    });

export const getLocaleData = (requestType: requestType, key: string) => {
    try {
        if (requestType === 'long-term') {
            return umbrella.getLocalStorage(key);
        } else if (requestType === 'session') {
            return umbrella.getSessionStorage(key);
        }
    } catch (e) {
        console.error('not support get storage', e);

        const cookieKey =
            (requestType === 'long-term' ? '_locale_' : '_session_') + key;

        return Cookies.get(cookieKey);
    }
};

export const deleteLocaleData = (requestType: requestType, key: string) => {
    try {
        if (requestType === 'long-term') {
            return umbrella.removeLocalStorage(key);
        } else if (requestType === 'session') {
            return umbrella.removeSessionStorage(key);
        }
    } catch (e) {
        console.error('not support get storage', e);

        const cookieKey =
            (requestType === 'long-term' ? '_locale_' : '_session_') + key;

        return Cookies.remove(cookieKey);
    }
};
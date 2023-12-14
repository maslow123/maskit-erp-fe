import Cookies from 'js-cookie';
const token = Cookies.get('token') || '';

export const headers = (contentType = 'application/json') => {
    let headers = {
        'Authorization': `Bearer ${token}`
    }

    if (contentType == 'application/json') {
        headers['Content-Type'] = 'application/json'
    }

    return {
        headers
    }
};
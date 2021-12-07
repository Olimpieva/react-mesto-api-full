
import { apiAuthOptions as options } from "./constants";

class ApiAuth {
    constructor(options) {
        this._url = options.baseUrl;
    }

    _sendRequest(path, requestOptions) {
        return fetch(`${this._url}/${path}`, { ...requestOptions, credentials: 'include' })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Произошла ошибка: ${res.status}`)
            })
    }

    register({ email, password }) {
        return this._sendRequest(`signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password: password,
                email: email,
            })
        })
    }

    login({ email, password }) {
        return this._sendRequest(`signin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                password: password,
                email: email,
            })
        })
    }

    logout() {
        return this._sendRequest(`signout`, {})
    }

    checkToken(token) {
        return this._sendRequest(`users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        })
    }


}

const auth = new ApiAuth(options);

export default auth;
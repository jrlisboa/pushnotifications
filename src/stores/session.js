import {observable, action, runInAction, computed} from 'mobx';
import fetch from 'isomorphic-fetch';
import md5 from 'md5';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const API = process.env.REACT_APP_API_URL;

class SessionStore {
    @observable token;
    @observable tokenError;

    constructor() {
        const oauth = JSON.parse(localStorage.getItem('oauth'));

        if (oauth && new Date(oauth.expires_at) > new Date()) {
            this.token = oauth.access_token;
            this.expiresAt = oauth.expires_at;
            this.refreshToken = oauth.refresh_token;
        }
    }

    @action async signin({email, password}, cb) {
        const response = await fetch(`${API}/token`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                username: email,
                client_id: CLIENT_ID,
                grant_type: 'password',
                password: md5(password),
            }),
        });

        const payload = await response.json();

        runInAction('signin', () => {
            if (response.status <= 299) {
                this.token = payload.access_token;
                this.expiresAt = payload.expires_at;
                this.refreshToken = payload.refresh_token;
                localStorage.setItem('oauth', JSON.stringify(payload));
            } else {
                this.tokenError = payload.message;
            }

            if (cb) {
                cb(null, {response, token: payload.access_token});
            }
        });
    }

    @action async refresh(cb) {
        const response = await fetch(`${API}/token`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                client_id: CLIENT_ID,
                grant_type: 'refresh_token',
                refresh_token: this.refreshToken,
            }),
        });

        const payload = await response.json();

        runInAction('refresh', () => {
            if (response.status <= 299) {
                this.token = payload.access_token;
                this.expiresAt = payload.expires_at;
                this.refreshToken = payload.refresh_token;
                localStorage.setItem('oauth', JSON.stringify(payload));
            } else {
                this.tokenError = payload.message;
            }

            if (cb) {
                cb(null, {response, token: payload.access_token});
            }
        });
    }

    @computed get isLogged() {
        return !!this.token;
    }

    @computed get errorMessage() {
        switch (this.tokenError) {
            case 'invalid credentials':
                return 'Usuário ou senha incorretos';
            case 'invalid_request':
                return 'Ocorreu um erro durante a requisição';
            default:
                return this.tokenError;
        }
    }

    getToken(cb) {
        return new Promise((resolve, reject) => {
            if (new Date(this.expiresAt) > new Date()) {
                return resolve(this.token);
            }

            this.refreshToken((err, {token}) => {
                return resolve(token);
            });
        });
    }
}

export default new SessionStore();

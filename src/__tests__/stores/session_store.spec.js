import nock from 'nock';
import md5 from 'md5';

const URL = 'https://porto-faz-mais.appspot.com';
const CLIENTE_ID = '5988c60cc062ac1893619c21';

it('should return a valid token if request is valid', () => {
    nock(URL)
        .post('/token', {
            username: 'test@gmail.com',
            client_id: CLIENTE_ID,
            grant_type: 'password',
            password: md5('password')
        })
        .reply(200, {
          access_token: 'access_token'
        });

    global.localStorage = {
        setItem: () => {},
        getItem: () => {
            return null;
        }
    };

    const store = require('../../stores/session').default;

    return store.signin({
        email: 'test@gmail.com',
        password: 'password'
    }, (err, res) => {
        expect(res.token).toBe('access_token');
        expect(store.token).toBe('access_token');
        expect(store.isLogged).toBe(true);
    });
});

it('should return access_token if request is invalid', () => {
    nock(URL)
        .post('/token', {
            username: 'test@gmail.com',
            client_id: CLIENTE_ID,
            grant_type: 'password',
            password: md5('password')
        })
        .reply(401, {
          message: 'error message'
        });

    global.localStorage = {
        setItem: () => {},
        getItem: () => {
            return null;
        }
    };

    const store = require('../../stores/session').default;

    return store.signin({
        email: 'test@gmail.com',
        password: 'password'
    }, (err, res) => {
        expect(store.tokenError).toBe('error message');
    });
});

it('should return a valid token if refresh_token is valid', () => {
    nock(URL)
        .post('/token', {
            client_id: CLIENTE_ID,
            grant_type: 'refresh_token',
            refresh_token: 'refresh_token',
        })
        .reply(200, {
          access_token: 'access_token'
        });

    global.localStorage = {
        setItem: () => {},
        getItem: () => {
            return null;
        }
    };

    const store = require('../../stores/session').default;
    store.refreshToken = 'refresh_token';

    return store.refresh((err, res) => {
        expect(res.token).toBe('access_token');
        expect(store.token).toBe('access_token');
        expect(store.isLogged).toBe(true);
    });
});

it('should return a error if refresh refresh_token is invalid', () => {
    nock(URL)
        .post('/token', {
            client_id: CLIENTE_ID,
            grant_type: 'refresh_token',
            refresh_token: 'refresh_token',
        })
        .reply(400, {
          message: 'error message'
        });

    global.localStorage = {
        setItem: () => {},
        getItem: () => {
            return null;
        }
    };

    const store = require('../../stores/session').default;
    store.refreshToken = 'refresh_token';

    return store.refresh((err, res) => {
        expect(store.tokenError).toBe('error message');
    });
});


it('should return isLogged = true if token is not empty', () => {
    global.localStorage = {
        setItem: () => {},
        getItem: () => {
            return null;
        }
    };

    const store = require('../../stores/session').default;
    store.token = undefined;
    expect(store.isLogged).toBe(false);
    store.token = 'refresh_token';
    expect(store.isLogged).toBe(true);
});

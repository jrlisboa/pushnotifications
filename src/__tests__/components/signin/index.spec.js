import React from 'react';
import { mount } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Signin from '../../../components/signin';

it('renders without crashing', () => {
    const sessionStore = {
        items: [],
    };

    const wrapper = mount((
        <MuiThemeProvider>
            <Signin session={sessionStore} />
        </MuiThemeProvider>
    ));

    expect(
        wrapper.find('.card-signin__form__input')
    ).toHaveLength(2);

    expect(
        wrapper.find('.card-signin__submit')
    ).toHaveLength(1);

    expect(
        wrapper.find('.card-signin__form__error')
    ).toHaveLength(1);
});

it('should call signin function from session store', () => {
    const sessionStore = {
        signin: jest.fn()
    };

    const wrapper = mount((
        <MuiThemeProvider>
            <Signin session={sessionStore} />
        </MuiThemeProvider>
    ));

    wrapper.find('input[name="email"]')
        .simulate('change', { target: { value: 'teste@porto.com.br' } });

    wrapper.find('input[name="password"]')
        .simulate('change', { target: { value: 'password' } });

    wrapper.find('.card-signin__submit').simulate('submit');
    expect(sessionStore.signin.mock.calls[0][0].email).toBe('teste@porto.com.br')
    expect(sessionStore.signin.mock.calls[0][0].password).toBe('password')
});

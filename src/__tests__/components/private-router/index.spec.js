import React from 'react';
import { mount, shallow } from 'enzyme';
import { Base } from '../../../components/private-router';
import { Route, Redirect, BrowserRouter as Router, } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


it('render Base component without crashing', () => {
    const sessionStore = {
        isLogged: true,
    };
    const wrapper = mount(<MuiThemeProvider><Base session={sessionStore} /></MuiThemeProvider>);

    expect(
        wrapper.find('.private-router')
    ).toHaveLength(1);
});


it('should render redirect element when click on menuItem', () => {
    const sessionStore = {
        isLogged: true,
    };

    const wrapper = mount(
        <MuiThemeProvider>
            <Router>
                <Base session={sessionStore} />
            </Router>
        </MuiThemeProvider>
    );

    wrapper.find('.menu [role="menuitem"]')
        .at(0)
        .simulate('change', { target: { value: '/visao-geral' } });

    expect(
        wrapper.find(Redirect)
    ).toHaveLength(1);
});

it('should render redirect element when store state "isLogged" is false', () => {
    const sessionStore = {
        isLogged: false,
    };

    const wrapper = mount(
        <MuiThemeProvider>
            <Router>
                <Base session={sessionStore} />
            </Router>
        </MuiThemeProvider>
    );

    expect(
        wrapper.find(Redirect)
    ).toHaveLength(1);
});

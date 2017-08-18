import React, {Component} from 'react';
import autobind from 'autobind-decorator';
import {Redirect} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import Card from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import CircularProgress from 'material-ui/CircularProgress';

import './index.css';

@inject('session')
@observer
class Signin extends Component {

    constructor(props) {
        super(props);

        this.state = {
          email: '',
          password: '',
          isLoading: false,
        };
    }

    @autobind
    handleChangeEmail(event) {
        const email = event.target.value;
        this.setState({email: email});
    }

    @autobind
    handleChangePassword(event) {
        const password = event.target.value;
        this.setState({password: password});
    }

    @autobind
    handleSign(e) {
        e.preventDefault();
        this.setState({isLoading: true});
        this.props.session.signin(this.state, () => {
            this.setState({isLoading: false});
        });
    }

    render() {
        if (this.props.session.isLogged) {
            return (
                <Redirect to={{pathname: '/visao-geral'}}/>
            );
        }

        return (
            <div>
              <Card className="card-signin">

                <div className="card-signin__header">
                  <h1 className="card-signin__header__title">Bem vindo ao</h1>
                  <div className="card-signin__header__logo"></div>
                </div>

                <div className="card-signin__form">
                    <ValidatorForm
                        ref="form"
                        onSubmit={this.handleSign}>
                        <div className="card-signin__form__title">
                            <span>Faça login para continuar</span>
                        </div>
                        <TextValidator
                            className="card-signin__form__input"
                            floatingLabelText="Email"
                            onChange={this.handleChangeEmail}
                            name="email"
                            value={this.state.email}
                            fullWidth={true}
                            validators={['required', 'isEmail']}
                            errorMessages={['Preencha este campo', 'Digite um email válido']}/>
                        <TextValidator
                            className="card-signin__form__input"
                            floatingLabelText="Senha"
                            onChange={this.handleChangePassword}
                            name="password"
                            type="password"
                            value={this.state.password}
                            fullWidth={true}
                            validators={['required']}
                            errorMessages={['Preencha este campo']}/>
                        <div className="card-signin__form__error">
                            {this.props.session.errorMessage}
                        </div>
                        <RaisedButton
                            type="submit"
                            label={
                                this.state.isLoading ?
                                <CircularProgress size={20} thickness={4} style={{marginTop: 10}} /> :
                                'Entrar'}
                            primary={true}
                            labelPosition="before"
                            disabled={this.state.isLoading}
                            className="card-signin__submit" />
                  </ValidatorForm>
                </div>
              </Card>
            </div>
        );
    }
}

export default Signin;

import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import Dialog from 'material-ui/Dialog';
import Clear from 'material-ui/svg-icons/content/clear';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import {indigo500} from 'material-ui/styles/colors';
import autobind from 'autobind-decorator';

import DialogEdit from './DialogEdit';

import './style/DialogPayment.css';

@inject('session')
@observer
class DialogPayment extends Component {
    constructor() {
        super();
        this.state = {
            edit: 'close',
            editType: undefined,
            data: undefined,
            name: 'Claudemir Vieira Antunes',
            cpf: '450.192.343-09',
            email: 'carlospereira@gmail.com',
            telefone: '11 4599 6633',
        };
    }

    @autobind
    handleCloseEdit() {
        this.setState({edit: 'close'});
    }

    @autobind
    handleEditName() {
        this.setState({edit: 'open', editType: 'Nome', data: this.state.name});
    }

    @autobind
    handleEditCpf() {
        this.setState({edit: 'open', editType: 'CPF', data: this.state.cpf});
    }

    @autobind
    handleEditEmail() {
        this.setState({edit: 'open', editType: 'E-mail', data: this.state.email});
    }

    @autobind
    handleEditTelefone() {
        this.setState({edit: 'open', editType: 'Telefone', data: this.state.telefone});
    }

    @autobind
    handleSubmit(e) {
        e.preventDefault();
        this.setState({nome: e});
    }

    render() {
        return (
            <div>
                <Dialog
                  contentClassName="payment-dialog"
                  modal={false}
                  open={this.props.open == 'open' ? true : false}
                  onRequestClose={this.props.close}>

                  <DialogEdit
                    open={this.state.edit}
                    close={this.handleCloseEdit}
                    type={this.state.editType}
                    data={this.state.data}/>

                  <Clear
                      className="payment-dialog__head__close"
                      onClick={this.props.close}/>

                      <div className="payment-dialog__head">
                        <span className="payment-dialog__head__title">Reenvio de pagamento</span>
                        <span className="payment-dialog__head__dateTime">Bateria - 13482374887</span>
                      </div>

                      <div className="payment-dialog__info-confirmation">
                        <div className="payment-dialog__info-confirmation__head">
                            <div className="payment-dialog__info-confirmation__head__title">Confirme os dados antes de prosseguir</div>
                            <div className="payment-dialog__info-confirmation__head__subtitle">As instruções de pagamento serão enviadas por e-mail e SMS</div>
                        </div>

                        <div className="payment-dialog__info-confirmation__left">

                            <div className="payment-dialog__info-confirmation__left__block" onClick={this.handleEditName}>

                                <div className="payment-dialog__info-confirmation__left__block__label">
                                    Nome do cliente <Edit color={indigo500} className="payment-dialog__info-confirmation__left__block__label__icon" />
                                </div>
                                <div className="payment-dialog__info-confirmation__left__block__data">{this.state.name}</div>
                            </div>

                            <div className="payment-dialog__info-confirmation__left__block" onClick={this.handleEditCpf}>
                                <div className="payment-dialog__info-confirmation__left__block__label">
                                    CPF <Edit color={indigo500} className="payment-dialog__info-confirmation__left__block__label__icon" />
                                </div>
                                <div className="payment-dialog__info-confirmation__left__block__data">{this.state.cpf}</div>
                            </div>
                        </div>

                        <div className="payment-dialog__info-confirmation__left">
                            <div className="payment-dialog__info-confirmation__left__block" onClick={this.handleEditEmail}>
                                <div className="payment-dialog__info-confirmation__left__block__label">
                                    Email <Edit color={indigo500} className="payment-dialog__info-confirmation__left__block__label__icon" />
                                </div>
                                <div className="payment-dialog__info-confirmation__left__block__data">{this.state.email}</div>
                            </div>

                            <div className="payment-dialog__info-confirmation__left__block" onClick={this.handleEditTelefone}>
                                <div className="payment-dialog__info-confirmation__left__block__label">
                                    Telefone <Edit color={indigo500} className="payment-dialog__info-confirmation__left__block__label__icon" />
                                </div>
                                <div className="payment-dialog__info-confirmation__left__block__data">{this.state.telefone}</div>
                            </div>
                        </div>

                      </div>

                      <div className="payment-dialog__action-confirmation">
                        <div className="payment-dialog__action-confirmation__value">
                            <div className="payment-dialog__action-confirmation__value__label">Valor</div>
                            <div className="payment-dialog__action-confirmation__value__data">R$322,00</div>
                        </div>

                        <div className="payment-dialog__action-confirmation__button-go">
                            <RaisedButton
                                label="CONFIRMAR REENVIO"
                                primary={true}
                                className="payment-dialog__action-confirmation__button-go__component"/>
                        </div>

                        <div className="payment-dialog__action-confirmation__button-back">
                            <FlatButton
                                onClick={this.props.back}
                                label="VOLTAR"
                                primary={true}
                                className="payment-dialog__action-confirmation__button-back__component"/>
                        </div>
                      </div>

                </Dialog>
            </div>
        );
    }
}

export default DialogPayment;

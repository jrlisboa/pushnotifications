import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import RaisedButton from 'material-ui/RaisedButton';
import OpenInNew from 'material-ui/svg-icons/action/open-in-new';
import Dialog from 'material-ui/Dialog';
import Clear from 'material-ui/svg-icons/content/clear';

import './style/DialogDetails.css';

@inject('session')
@observer
class DialogDetails extends Component {
    render() {
        return (
            <div>
                <Dialog
                  contentClassName="details-dialog"
                  modal={false}
                  open={this.props.open == 'open' ? true : false}
                  onRequestClose={this.props.close}>

                  <Clear
                      className="details-dialog__head__close"
                      onClick={this.props.close}/>

                      <div className="details-dialog__head">
                        <span className="details-dialog__head__title">Bateria - 13482374887</span>
                        <span className="details-dialog__head__dateTime">10/08/2018 às 20h43</span>
                      </div>

                      <div className="details-dialog__value">
                        <div className="details-dialog__value__price">
                            <div className="details-dialog__value__price__label">Valor</div>
                            <div className="details-dialog__value__price__data">R$322,00</div>
                        </div>

                        <div className="details-dialog__value__status">
                            <div className="details-dialog__value__status__label">Status</div>
                            <div className="details-dialog__value__status__data" style={{color: 'red'}}>Pendente</div>
                        </div>

                        <div className="details-dialog__value__button">
                            <RaisedButton
                                label="REENVIAR PAGAMENTO"
                                primary={true}
                                onClick={this.props.payment}
                                className="details-dialog__value__button__component"/>
                        </div>
                      </div>

                      <div className="details-dialog__infos">
                        <div className="details-dialog__infos__left">
                            <div className="details-dialog__infos__left__block">
                                <div className="details-dialog__infos__left__block__label">Prestador</div>
                                <a href="/prestadores">
                                    <div className="details-dialog__infos__left__block__data">
                                      <div className="name">Carlos Pereira da Silva teste nome longo</div>
                                      <div className="link"><OpenInNew /></div>
                                    </div>
                                </a>
                            </div>
                            <div className="details-dialog__infos__left__block">
                                <div className="details-dialog__infos__left__block__label">QRA</div>
                                <div className="details-dialog__infos__left__block__data">8383747128</div>
                            </div>
                            <div className="details-dialog__infos__left__block">
                                <div className="details-dialog__infos__left__block__label">CPF</div>
                                <div className="details-dialog__infos__left__block__data">309.876.998-09</div>
                            </div>
                            <div className="details-dialog__infos__left__block">
                                <div className="details-dialog__infos__left__block__label">E-mail</div>
                                <div className="details-dialog__infos__left__block__data">carlospereira@gmail.com</div>
                            </div>
                            <div className="details-dialog__infos__left__block">
                                <div className="details-dialog__infos__left__block__label">Telefone</div>
                                <div className="details-dialog__infos__left__block__data">11 98888 8787</div>
                            </div>
                        </div>

                        <div className="details-dialog__infos__left">
                            <div className="details-dialog__infos__left__block">
                                <div className="details-dialog__infos__left__block__label">Cliente</div>
                                <a href="/clientes">
                                    <div className="details-dialog__infos__left__block__data">
                                      <div className="name">Claudemir Vieira Antunes</div>
                                      <div className="link"><OpenInNew /></div>
                                    </div>
                                </a>
                            </div>
                            <div className="details-dialog__infos__left__block">
                                <div className="details-dialog__infos__left__block__label">CPF</div>
                                <div className="details-dialog__infos__left__block__data">309.876.998-09</div>
                            </div>
                            <div className="details-dialog__infos__left__block">
                                <div className="details-dialog__infos__left__block__label">E-mail</div>
                                <div className="details-dialog__infos__left__block__data">carlospereira@gmail.com</div>
                            </div>
                            <div className="details-dialog__infos__left__block">
                                <div className="details-dialog__infos__left__block__label">Telefone</div>
                                <div className="details-dialog__infos__left__block__data">11 98888 8787</div>
                            </div>
                        </div>
                      </div>

                </Dialog>
            </div>
        );
    }
}

export default DialogDetails;

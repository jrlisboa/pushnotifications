import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import './style/DialogPayment.css';

@inject('session')
@observer
class DialogEdit extends Component {
    render() {
        return (
            <div>
                <Dialog
                  contentClassName="payment-dialog__edit"
                  modal={false}
                  open={this.props.open == 'open' ? true : false}
                  onRequestClose={this.props.close}>

                  <div className="payment-dialog__edit__content">
                  </div>

                    <form onSubmit={this.props.handleSubmit}>
                      <TextField
                          className="payment-dialog__edit__content__input"
                          hintText={`Editar ${this.props.type}`}
                          defaultValue={this.props.data}
                          fullWidth={true}
                          floatingLabelText={`Editar ${this.props.type}`}/>

                      <FlatButton
                          label="SALVAR"
                          type="submit"
                          primary={true}/>
                    </form>

                </Dialog>
            </div>
        );
    }
}

export default DialogEdit;

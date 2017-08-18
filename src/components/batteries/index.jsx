import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import autobind from 'autobind-decorator';
import {
  Table,
  TableBody,
  TableRowColumn,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';
import {Card} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import './style/index.css';
import PeriodBar from './PeriodBar';
import Chart from './Chart';

import DialogDetails from './DialogDetails';
import DialogPayment from './DialogPayment';

@inject('session')
@observer
class Batteries extends Component {
    constructor() {
        super();
        this.state = {
            openDetails: 'close',
            openPayment: 'close',
        };
    }

    @autobind
    handleDetails() {
        this.state.openDetails == 'open'
        ? this.setState({openDetails: 'close'})
        : this.setState({openDetails: 'open'});
    }

    @autobind
    handlePayment() {
        this.state.openPayment == 'open'
        ? this.setState({openPayment: 'close'})
        : this.setState({openPayment: 'open', openDetails: 'close'});
    }

    @autobind
    handleBackDialog() {
        this.setState({openPayment: 'close', openDetails: 'open'});
    }

    render() {
        return (
            <div>
                <PeriodBar/>

                <DialogDetails
                    open={this.state.openDetails}
                    close={this.handleDetails}
                    payment={this.handlePayment} />

                <DialogPayment
                    open={this.state.openPayment}
                    close={this.handlePayment}
                    back={this.handleBackDialog} />

                <Card className="batteries-card">
                    <div className="batteries-card__chart">
                        <div className="batteries-card__title">
                            <span className="batteries-card__title__number">782</span>
                            Transações no período
                        </div>
                        <Chart />
                    </div>

                    <div className="batteries-card__table">
                        <Table
                            selectable={false}>

                            <TableBody
                                className="batteries-card__table__content"
                                displayRowCheckbox={false}>

                                <TableRow
                                    className="batteries-card__table__headTable"
                                    striped={false}>
                                    <TableHeaderColumn># Identificação</TableHeaderColumn>
                                    <TableHeaderColumn>Prestador</TableHeaderColumn>
                                    <TableHeaderColumn>Cliente</TableHeaderColumn>
                                    <TableHeaderColumn>Data da transação</TableHeaderColumn>
                                    <TableHeaderColumn>Valor / Status do pagamento</TableHeaderColumn>
                                    <TableHeaderColumn></TableHeaderColumn>
                                </TableRow>

                                <TableRow
                                    className="batteries-card__table__body"
                                    style={{borderBottom: '0px'}}>
                                    <TableRowColumn><strong>93498130019</strong></TableRowColumn>
                                    <TableRowColumn>Carlos Pereira da Silva Pinto</TableRowColumn>
                                    <TableRowColumn>Claudemir Vieira Antonio</TableRowColumn>
                                    <TableRowColumn>10/08/2018 às 18h30</TableRowColumn>
                                    <TableRowColumn><strong>R$322,00</strong>
                                        <span style={{color: 'red'}}>Pendente</span>
                                    </TableRowColumn>
                                    <TableRowColumn>

                                        <FlatButton
                                        onClick={this.handleDetails}
                                        label="VER DETALHES"
                                        primary={true} />

                                    </TableRowColumn>
                                </TableRow>

                                <TableRow
                                    className="batteries-card__table__body"
                                    style={{borderBottom: '0px'}}>
                                    <TableRowColumn><strong>93498130019</strong></TableRowColumn>
                                    <TableRowColumn>Carlos Pereira da Silva Pinto</TableRowColumn>
                                    <TableRowColumn>Claudemir Vieira Antonio</TableRowColumn>
                                    <TableRowColumn>10/08/2018 às 18h30</TableRowColumn>
                                    <TableRowColumn><strong>R$322,00</strong>
                                        <span style={{color: 'green'}}>Pago</span>
                                    </TableRowColumn>
                                    <TableRowColumn>

                                        <FlatButton
                                        onClick={this.handleDetails}
                                        label="VER DETALHES"
                                        primary={true} />

                                    </TableRowColumn>
                                </TableRow>

                            </TableBody>

                        </Table>
                    </div>
                </Card>
            </div>
        );
    }
}

export default Batteries;

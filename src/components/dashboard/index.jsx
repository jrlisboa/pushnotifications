import autobind from 'autobind-decorator';
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Card, CardTitle} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

import './index.css';

@inject('dashboard')
@observer
class Dashboard extends Component {

    componentDidMount() {
        const {dashboard} = this.props;
        dashboard.initializeStore();
    }

    @autobind
    handleChangeYearSelect(event, index, year) {
        const {dashboard} = this.props;
        const {month} = dashboard.dateRange;

        dashboard.setDateRange(month, year);
        dashboard.fetch();
    }

    @autobind
    handleChangeMonthSelect(event, index, month) {
        const {dashboard} = this.props;
        const {year} = dashboard.dateRange;

        dashboard.setDateRange(month, year);
        dashboard.fetch();
    }

    renderYearSelect() {
        const {
            dateRange,
            getYearValidRange,
        } = this.props.dashboard;

        const menuItems = getYearValidRange.map((year) => {
            return (
                <MenuItem key={`dashboard-yearselect-${year}`} value={year} primaryText={year} />
            );
        });

        return (
            <SelectField
              value={dateRange.year}
              onChange={this.handleChangeYearSelect}
              className="period-bar__select"
              underlineStyle={{border: 'transparent'}}
              labelStyle={{color: '#009688', fontWeight: '500'}}
            >
               {menuItems}
            </SelectField>
        );
    }

    render() {
        const {
            upsells,
            batteries,
            products,
            providers,
            customers,
            stores,
            amountOfUpsells,
            amountOfProducts,
            amountOfBatteries,
            dateRange,
        } = this.props.dashboard;

        const upsellTotal = (!upsells || upsells.loading) ? '-' : upsells.data.length;
        const batteryTotal = (!batteries || batteries.loading) ? '-' : batteries.data.length;
        const productTotal = (!products || products.loading) ? '-' : products.data.length;
        const providerTotal = (!providers || providers.loading) ? '-' : providers.data;
        const customerTotal = (!customers || customers.loading) ? '-' : customers.data;
        const storeTotal = (!stores || stores.loading) ? '-' : stores.data;

        return (
            <div key="dashboard-component">
                <div className="period-bar">
                    <span className="period-bar__title">Período:</span>
                    <SelectField
                      className="period-bar__select"
                      underlineStyle={{border: 'transparent'}}
                      labelStyle={{color: '#009688', fontWeight: '500'}}
                      value={dateRange.month}
                      onChange={this.handleChangeMonthSelect}
                    >
                      <MenuItem value={1} primaryText="Janeiro" />
                      <MenuItem value={2} primaryText="Fevereiro" />
                      <MenuItem value={3} primaryText="Março" />
                      <MenuItem value={4} primaryText="Abril" />
                      <MenuItem value={5} primaryText="Maio" />
                      <MenuItem value={6} primaryText="Junho" />
                      <MenuItem value={7} primaryText="Julho" />
                      <MenuItem value={8} primaryText="Agosto" />
                      <MenuItem value={9} primaryText="Setembro" />
                      <MenuItem value={10} primaryText="Outubro" />
                      <MenuItem value={11} primaryText="Novembro" />
                      <MenuItem value={12} primaryText="Dezembro" />
                    </SelectField>
                    {this.renderYearSelect()}
                </div>
                <Card className="card-visao">
                    <CardTitle title="Serviços adicionais" />
                    <div className="card-visao__body">
                        <div className="card-visao__body__value">{upsellTotal}</div>
                        <div className="card-visao__body__label">Total realizado</div>
                    </div>
                    <div className="card-visao__body">
                        <div className="card-visao__body__value">
                            <span className="card-visao__body__value__prefix">R$</span>
                            <span className="card-visao__body__value__money">{amountOfUpsells || '-'}</span>
                        </div>
                        <div className="card-visao__body__label">Pagamentos recebidos</div>
                    </div>
                    <div className="card-visao__action">
                        <FlatButton
                            className="card-visao__action__button"
                            label="IR PARA PAINEL DE SERVIÇOS ADICIONAIS"
                            primary={true}
                            fullWidth={true} />
                    </div>
                </Card>

                <Card className="card-visao__right">
                    <CardTitle title="Produtos e itens gerais" />
                    <div className="card-visao__body">
                        <div className="card-visao__body__value">{productTotal}</div>
                        <div className="card-visao__body__label">Total realizado</div>
                    </div>
                    <div className="card-visao__body">
                        <div className="card-visao__body__value">
                            <span className="card-visao__body__value__prefix">R$</span>
                            <span className="card-visao__body__value__money">{amountOfProducts || '-'}</span>
                        </div>
                        <div className="card-visao__body__label">Pagamentos recebidos</div>
                    </div>
                    <div className="card-visao__action">
                        <FlatButton
                            className="card-visao__action__button"
                            label="IR PARA PAINEL DE PRODUTOS E ITENS GERAIS"
                            primary={true}
                            fullWidth={true} />
                    </div>
                </Card>

                <Card className="card-visao">
                    <CardTitle title="Baterias" />
                    <div className="card-visao__body">
                        <div className="card-visao__body__value">{batteryTotal}</div>
                        <div className="card-visao__body__label">Total realizado</div>
                    </div>
                    <div className="card-visao__body">
                        <div className="card-visao__body__value">
                            <span className="card-visao__body__value__prefix">R$</span>
                            <span className="card-visao__body__value__money">{amountOfBatteries || '-'}</span>
                        </div>
                        <div className="card-visao__body__label">Pagamentos recebidos</div>
                    </div>
                    <div className="card-visao__action">
                        <FlatButton
                            className="card-visao__action__button"
                            label="IR PARA PAINEL DE BATERIAS"
                            primary={true}
                            fullWidth={true} />
                    </div>
                </Card>

                <Card className="card-visao__right">
                    <div className="card-visao__item">
                        <div className="card-visao__item__title"><strong>Prestadores</strong> ativos</div>
                        <div className="card-visao__item__value">{providerTotal}</div>
                        <div className="card-visao__item__action">
                            <FlatButton
                                className="card-visao__item__action__button"
                                label="VER DETALHES"
                                primary={true}
                                fullWidth={true} />
                        </div>
                    </div>

                    <div className="card-visao__item">
                        <div className="card-visao__item__title"><strong>Clientes</strong> cadastrados</div>
                        <div className="card-visao__item__value">{customerTotal}</div>
                        <div className="card-visao__item__action">
                            <FlatButton
                                className="card-visao__item__action__button"
                                label="VER DETALHES"
                                primary={true}
                                fullWidth={true} />
                        </div>
                    </div>

                    <div className="card-visao__item">
                        <div className="card-visao__item__title"><strong>Lojas</strong> ativas</div>
                        <div className="card-visao__item__value">{storeTotal}</div>
                        <div className="card-visao__item__action">
                            <FlatButton
                                className="card-visao__item__action__button"
                                label="VER DETALHES"
                                primary={true}
                                fullWidth={true} />
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}

export default Dashboard;

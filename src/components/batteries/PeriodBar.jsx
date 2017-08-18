import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import autobind from 'autobind-decorator';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import './style/index.css';

const meses = [
  <MenuItem key={1} value={1} primaryText="Junho" />,
  <MenuItem key={2} value={2} primaryText="Maio" />,
  <MenuItem key={3} value={3} primaryText="Abriu" />,
  <MenuItem key={4} value={4} primaryText="Março" />,
  <MenuItem key={5} value={5} primaryText="Fevereiro" />,
];

const anos = [
  <MenuItem key={1} value={1} primaryText="2018" />,
  <MenuItem key={2} value={2} primaryText="2017" />,
  <MenuItem key={3} value={3} primaryText="2016" />,
  <MenuItem key={4} value={4} primaryText="2015" />,
  <MenuItem key={5} value={5} primaryText="2014" />,
];

@inject('session')
@observer
class PeriodBar extends Component {
    constructor() {
        super();

        this.state = {
            selectedMonth: 1,
            selectedYear: 1,
        };
    }

    @autobind
    handleChangeMonth(event, index, value) {
        this.setState({selectedMonth: value});
    }

    @autobind
    handleChangeYear(event, index, value) {
        this.setState({selectedYear: value});
    }

    render() {
        return (
            <div>
                <div className="period-bar">
                    <span className="period-bar__title">Período:</span>

                    <SelectField
                      value={this.state.selectedMonth}
                      className="period-bar__select"
                      underlineStyle={{border: 'transparent'}}
                      labelStyle={{color: '#009688', fontWeight: '500'}}
                      onChange={this.handleChangeMonth}>

                      {meses}

                    </SelectField>

                    <SelectField
                      value={this.state.selectedYear}
                      className="period-bar__select"
                      underlineStyle={{border: 'transparent'}}
                      labelStyle={{color: '#009688', fontWeight: '500'}}
                      onChange={this.handleChangeYear}>

                      {anos}

                    </SelectField>

                </div>
            </div>
        );
    }
}

export default PeriodBar;

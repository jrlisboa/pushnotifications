import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import './style/index.css';
import Chart from 'chart.js';

// const Chart = require('chart.js');

@inject('session')
@observer
class ChartBatteries extends Component {
  componentDidMount() {
    this._updateChart();
  }
  componentDidUpdate() {
    this._updateChart();
  }
  _updateChart() {
      let ctx = document.getElementById('myChart');
      new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'],
                datasets: [{
                    data: [0, 20, 40, 30, 30, 10, 45, 45, 60, 60, 45, 45, 30, 30, 92, 60, 45, 45, 10],
                    backgroundColor: 'rgba(0, 150, 136, 0.2)',
                    borderColor: 'rgba(0, 150, 136, 1)',
                    borderWidth: 2,
                    tension: 0,
                }],
            },
            options: {
                legend: {
                    display: false,
                },
                tooltips: {
                    backgroundColor: 'rgba(0, 77, 63, 0.8)',
                    xPadding: 12,
                    yPadding: 12,
                    bodySpacing: 6,
                    intersect: false,
                    displayColors: false,
                },
            },
        });
  }
  render() {
    return <canvas id="myChart" height="232"></canvas>;
  }
}

export default ChartBatteries;

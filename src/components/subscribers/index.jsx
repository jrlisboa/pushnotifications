import React from 'react';
import { observer, inject } from 'mobx-react';
import '../../styles/App.css';

export default () => (
  <div className="row">
    <div className="row">
      <div className="col s12">
        <ul className="tabs">
          <li className="tab col s3"><a href="#test1">subscribers</a></li>
          <li className="tab col s3"><a class="active" href="#test2">Test 2</a></li>
          <li className="tab col s3 disabled"><a href="#test3">Disabled Tab</a></li>
          <li className="tab col s3"><a href="#test4">Test 4</a></li>
        </ul>
      </div>
      <div id="test1" className="col s12">Test 1</div>
      <div id="test2" className="col s12">Test 2</div>
      <div id="test3" className="col s12">Test 3</div>
      <div id="test4" className="col s12">Test 4</div>
    </div>
  </div>
);

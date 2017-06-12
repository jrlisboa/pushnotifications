import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import '../styles/App.css';
// import '../stores/service-worker';
// import '../stores/WebPushManager';
// import '../stores/configs';

import Notifications from '../components/notifications';
import Subscribers from '../components/subscribers';
import Devs from '../components/devs';
//import Store from '../stores/store.js';
//
// const store = new Store();
// useStrict(true);

class App extends Component {
  render() {
    return (
      <div className="App">

        <div className="navbar-fixed">
          <nav>
            <ul id="slide-out" className="side-nav fixed">
              <li className="logo"><span className="spnPush">Push</span> <span className="spnVerios">Vérios</span></li>
              <li><a href="notifications">NOTIFICAÇÕES <i className="material-icons">add</i></a></li>
              <li><a href="subscribers">INSCRITOS <i className="material-icons">perm_identity</i></a></li>
              <li><a href="devs">FOR DEVS <i className="material-icons">code</i></a></li>
            </ul>
            <a href="#!" data-activates="slide-out" className="button-collapse"><i className="mdi-navigation-menu"></i></a>
            <ul className="right">
              <li className="btnSair"><a href="#!"><i className="material-icons iconeSair">power_settings_new</i></a></li>
            </ul>
          </nav>
        </div>

        <div className="row">
          <div className="componentes">
            <Provider>
              <Router>
                <div>
                  <Route exact path="/" component={Notifications}/>
                  <Route exact path="/notifications" component={Notifications}/>
                  <Route exact path="/subscribers" component={Subscribers}/>
                  <Route exact path="/devs" component={Devs}/>
                </div>
              </Router>
            </Provider>
          </div>
        </div>

      </div>
    );
  }
}

export default App;

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {teal500, teal700, indigo500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {useStrict} from 'mobx';
import {Provider} from 'mobx-react';

import SessionStore from '../../stores/session';
import DashboardStore from '../../stores/dashboard';
import Signin from '../signin';
import Dashboard from '../dashboard';
import PrivateRoute from '../private-router';
import Batteries from '../batteries';

import './index.css';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

useStrict(true);

const stores = {
    session: SessionStore,
    dashboard: new DashboardStore(SessionStore),
};

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: teal500,
        primary2Color: teal700,
        accent1Color: indigo500,
        pickerHeaderColor: teal500,
    },
});

const App = (
    <MuiThemeProvider muiTheme={muiTheme}>
      <Router>
          <Provider {... stores}>
              <div>
                  <Route exact path="/" component={Signin}/>
                  <PrivateRoute path="/visao-geral" component={Dashboard} />
                  <PrivateRoute path="/servicos-adicionais" component={Dashboard} />
                  <PrivateRoute path="/produtos-itens" component={Dashboard} />
                  <PrivateRoute path="/baterias" component={Batteries} />
                  <PrivateRoute path="/prestadores" component={Dashboard} />
                  <PrivateRoute path="/clientes" component={Dashboard} />
                  <PrivateRoute path="/lojas" component={Dashboard} />
              </div>
          </Provider>
      </Router>
    </MuiThemeProvider>
);

export default App;

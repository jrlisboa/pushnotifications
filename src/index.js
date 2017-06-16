import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';

import Container from './containers/App'

class Rotas extends React.Component<> {
  render(){
    return(
      <Container/>
    );
  }
}

ReactDOM.render(<Rotas/>, document.getElementById('root'));

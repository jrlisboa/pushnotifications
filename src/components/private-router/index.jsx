import autobind from 'autobind-decorator';
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import {teal500} from 'material-ui/styles/colors';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import PowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new';
import AddBox from 'material-ui/svg-icons/content/add-box';
import ShoppingBasket from 'material-ui/svg-icons/action/shopping-basket';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import Store from 'material-ui/svg-icons/action/store';
import BusinessCenter from 'material-ui/svg-icons/places/business-center';
import People from 'material-ui/svg-icons/social/people';
import DirectionsCar from 'material-ui/svg-icons/maps/directions-car';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import Logo from '../../media/images/logos/portofaz@3x.png';

import './index.css';

@inject('session')
@observer
export class Base extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: undefined,
        };
    }

    @autobind
    onMenuChange(e, path) {
        this.setState({redirect: path || e.target.value});
    }

    renderMenu() {
        const selectedStyle = {
            color: teal500,
        };

        const menu = [
            {label: 'Visão geral', icon: <Dashboard />, path: '/visao-geral'},
            {label: 'Serviços adicionais', icon: <AddBox />, path: '/servicos-adicionais'},
            {label: 'Produtos e itens', icon: <ShoppingBasket />, path: '/produtos-itens'},
            {label: 'Baterias', icon: <DirectionsCar />, path: '/baterias'},
            {label: 'Prestadores', icon: <BusinessCenter />, path: '/prestadores'},
            {label: 'Clientes', icon: <People />, path: '/clientes'},
            {label: 'Lojas', icon: <Store />, path: '/lojas'},
        ];

        const menuItems = menu.map((item, index) => {
            return (
               <MenuItem
                    key={`menuitem-${index}`}
                    primaryText={item.label}
                    leftIcon={item.icon}
                    value={item.path} />
            );
        });


        return (
            <Menu
                selectedMenuItemStyle={selectedStyle}
                value={this.props.path}
                onChange={this.onMenuChange}>
                {menuItems}
            </Menu>
        );
    }

    render() {
        const {isLogged} = this.props.session;
        const {redirect} = this.state;

        if (!isLogged) {
            return (<Redirect to={{pathname: '/'}} />);
        }

        if (redirect) {
            return (<Redirect to={{pathname: redirect}} />);
        }

        return (
            <div className="private-router">
                <Drawer className="menu" open={true} docked={true}>
                    <List>
                        <ListItem disabled={true}>
                            <img alt="Porto Seguro Faz Mais" width="176" src={Logo} />
                        </ListItem>
                        <ListItem
                          disabled={true}
                          leftAvatar={ <AccountCircle /> }
                          primaryText="Eddie Murphy"
                          secondaryText="eddie@portosegurofaz.com.br" />
                    </List>
                    <Divider />
                    {this.renderMenu()}
                    <Divider />
                    <MenuItem primaryText="Sair" leftIcon={<PowerSettingsNew />} />
                </Drawer>
                <div className="container">
                    <AppBar
                        className="appbar"
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                        title="Title"
                        showMenuIconButton={false} />

                    <div className="content">
                        {this.props.component}
                    </div>
                </div>
            </div>
        );
    }
}

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={() => {
        return (<Base component={<Component />} path={rest.path} />);
    }} />
);

export default PrivateRoute;

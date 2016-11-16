/*
 * @Author: pengzhen
 * @Date:   2016-10-17 19:40:58
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-14 14:39:59
 */

'use strict';
import React from 'react';
import {
    Provider,
    connect
} from 'react-redux';
import {
    Router,
    Route,
    IndexRoute,
    IndexRedirect,
    Redirect
}
from 'react-router'
import store from 'stores';

import asyncLoader from 'common/asyncLoader';
import NotFound from 'components/common/404';

import DemoForm from 'components/Demo/Form';
import DemoTabs from 'components/Demo/TabBar';

import PublicMain from 'components/Public/Main';
import Login from 'components/Sign/Login';
import Regist from 'components/Sign/Regist';

import Home from 'components/Home';

// 交易管理 TradeManager
import SaleProduct from 'components/Product/Sale';
import NewProduct from 'components/Product/New';

// 交易管理 TradeManager
import OrderList from 'components/TradeManager/OrderList';

import Cookie from "js-cookie";
import History from 'common/History';
import {
    message
} from 'antd';

function mapStateToProps(state) {
    return {

    };
}

export class index extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Provider store={this.props.store}>
                <Router history={this.props.history} >
                    <Route>
                        <Route path='/demo'>
                            <Route path='tabs' component={DemoTabs} />
                            <Route path='form' component={DemoForm} />
                        </Route>
                        <Route path='/login' component={Login} />
                        <Route path='/regist' component={Regist} />
                        <Route path='/' component={PublicMain}>
                            <IndexRoute component={Home}/>
                            <Route path='product'>
                                <IndexRedirect to='sale' />
                                <Route path='sale' component={SaleProduct}/>
                                <Route path='new' component={NewProduct}/>
                            </Route>
                            <Route path='trade'>
                                <IndexRedirect to='order' />
                                <Route path='order' component={OrderList}/>
                            </Route>
                        </Route>
                        <Route path='/404' component={NotFound} ></Route>
                        <Redirect path='*' to='/404' />
                    </Route>
                </Router>
            </Provider>
        );
    }
}

export default connect(
    mapStateToProps
)(index)

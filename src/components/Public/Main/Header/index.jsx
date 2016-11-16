/*
 * @Author: pengzhen
 * @Date:   2016-11-05 17:06:56
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-14 11:11:08
 */

'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import { Link } from 'react-router';
import History from 'common/History';
import * as DomUtils from 'common/utils/dom';
import { Icon } from 'antd';
import { togglePasswordDialog,removeHistoryMenu,clearHistoryMenu } from 'actions/commonAction';

function mapStateToProps({common}) {
    return {
        historyIndex: common.historyIndex
    };
}

export class Header extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }
    logout=()=>{
        console.log('退出');
        History.push('/login');
    }
    showPassword=()=>{
        this.props.dispatch(togglePasswordDialog(true));
    }
    refreshPage=()=>{
        console.log(History)
        window.History = History;
    }
    closePage=()=>{
        this.props.dispatch(removeHistoryMenu({
            path: this.props.location.pathname
        }))
    }
    closeAllPage=()=>{
        this.props.dispatch(clearHistoryMenu())
    }
    render() {
        return (
            <header className="main-header">
                <div className="header-logo"></div>
                <div className="header-content">
                    <MenuIndex
                        data={this.props.historyIndex}
                        location={this.props.location}
                        dispatch={this.props.dispatch}
                    />
                    <ul className="toolbar">
                        <li className="item"><a href="#">非下拉菜单</a></li>
                        <DropDown title="下拉菜单">
                            <DropDown.Item onClick={()=>{alert("菜单1")}}>菜单1</DropDown.Item>
                            <DropDown.Item onClick={()=>{alert("菜单2")}}>菜单2</DropDown.Item>
                            <DropDown.Item onClick={()=>{alert("菜单3")}}>菜单3</DropDown.Item>
                        </DropDown>
                        <DropDown title={<Icon type="reload" />}>
                            <DropDown.Item onClick={this.refreshPage}>刷新当前页面</DropDown.Item>
                            <DropDown.Item onClick={this.closePage}>关闭当前页面</DropDown.Item>
                            <DropDown.Item onClick={this.closeAllPage}>关闭全部页面</DropDown.Item>
                        </DropDown>
                        <DropDown title="我的订单">
                            <DropDown.Item onClick={()=>{alert("菜单1")}}>待付款订单</DropDown.Item>
                            <DropDown.Item onClick={()=>{alert("菜单2")}}>等发货订单</DropDown.Item>
                            <DropDown.Item onClick={()=>{alert("菜单3")}}>待评价交易</DropDown.Item>
                        </DropDown>
                        <DropDown title="CodePen">
                            <DropDown.Item onClick={this.showPassword}>修改密码</DropDown.Item>
                            <DropDown.Item onClick={this.logout}>退出</DropDown.Item>
                        </DropDown>
                    </ul>
                </div>
            </header>
        );
    }
}

export default connect(
    mapStateToProps,
    // Implement map dispatch to props
)(Header)


class MenuIndex extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }
    goto(path){
        History.push(path);
    }
    deleteMenu(menu,e){
        e.stopPropagation();
        this.props.dispatch(removeHistoryMenu(menu));
    }
    render() {
        const data = this.props.data || [];
        const curPath = this.props.location.pathname;
        return (
            <ul className="menu-index">
                <li className='home'>
                    <a className={curPath=='/'?'active':''}
                        onClick={this.goto.bind(this,'/')}>
                        <Icon type='home' />
                    </a>
                </li>
                {data.map(index=>{
                    if(index.path){
                        return (
                            <li key={index.path} className={curPath==index.path?'active':''}>
                                <a onClick={this.goto.bind(this,index.path)}>
                                    {index.title}
                                    <span className="close"
                                        onClick={this.deleteMenu.bind(this,index)}>×</span>
                                </a>
                            </li>
                        );
                    }
                })}
            </ul>
        );
    }
}


class DropDown extends React.Component {
    static propTypes = {
        title: React.PropTypes.node,
        arrow: React.PropTypes.bool.isRequired
    };
    static defaultProps = {
        arrow: false
    };

    constructor(props) {
        super(props);
        // this.state = {
        //     open: false
        // }
    }
    // toggle = (flag) => {
    //     this.setState({
    //         open: flag
    //     }, () => {
    //         if (this.state.open) {
    //             let event = DomUtils.addEventListener(document.body, 'click', (e) => {
    //                 if (this.isUnmount) return event.remove;
    //                 if (this.dropdown && !DomUtils.contains(this.dropdown, e.target)) {
    //                     this.toggle.call(this, false);
    //                     event.remove();
    //                 }
    //             });
    //         }
    //     });
    // }
    // componentWillUnmount() {
    //     this.isUnmount = true;
    // }
    render() {
        let className = "item dropdown";
        // className+= (this.state.open ? ' open':'');
        return (
            <li ref={(e)=>{ this.dropdown = e; }}
                className={className}>
                <a>
                    {this.props.title}
                    {this.props.arrow && <i className="fa fa-caret-down"></i>}
                </a>
                <div className="dropdown-menu">
                    {this.props.children}
                </div>
            </li>
        );
    }
}
DropDown.Item = class extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="item"><a onClick={this.props.onClick}>{this.props.children}</a></div>
        );
    }
}

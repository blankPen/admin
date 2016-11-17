/*
 * @Author: pengzhen
 * @Date:   2016-11-05 17:09:00
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-17 17:35:27
 */

'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import { Link } from 'react-router';
import { getMenuData } from 'actions/commonAction';

function mapStateToProps({common}) {
    return {
        list: common.menu.list,
        map: common.menu.map,
    };
}

export class Menu extends React.Component {
    static propTypes = {

    };
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.dispatch(getMenuData());
    }
    renderMenuList(){
        let data = this.props.list;
        return (
            <ul className="menu-list">
                {data.map((menu,i)=>{
                    return (
                        <li key={i} className="menu-item">
                            <Link to={menu.path}>
                                <div className="title">
                                    <i className="fa fa-fw fa-bars"></i>{menu.title}
                                </div>
                            </Link>
                            {this.renderSubMenuList(menu.children)}
                        </li>
                    )
                })}
            </ul>
        )
    }
    renderSubMenuChilds(data){
        return (
            <ul className='child-menu'>
                {data.map((menu)=>{
                    return <li className='child-menu-item'>
                        <Link title={menu.title} to={menu.path}>{menu.title}</Link>
                    </li>
                })}
            </ul>
        )
    }
    renderSubMenuList(data = []){
        let onClick = this.props.onSubClick || function(){};
        return (
            <ul className={"sub-menu-list"}>
                {data.map((menu,i)=>{
                    console.log(menu.children)
                    if(menu.children && menu.children.length){
                        return (
                            <li key={i} className="sub-menu-item has-child-menu">
                                <a>{menu.title}</a>
                                {this.renderSubMenuChilds(menu.children)}
                            </li>
                        )
                    }else{
                        return (
                            <li key={i} className="sub-menu-item">
                                <Link onClick={onClick.bind(this,menu)} to={menu.path}>{menu.title}</Link>
                            </li>
                        )
                    }
                })}
            </ul>
        )
    }
    render() {
        return (
            <div className="menu-wrap">
                {this.renderMenuList()}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    // Implement map dispatch to props
)(Menu)

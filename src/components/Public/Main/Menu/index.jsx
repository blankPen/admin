/*
 * @Author: pengzhen
 * @Date:   2016-11-05 17:09:00
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-14 15:04:59
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
const menuMap = [{
    icon: "fa-bars",
    title: "商品",
    path: "/product",
    children: [
        { title: "导入商品", path: "" },
        { title: "库存报警", path: "" },
        { title: "商品发布", path: "" },
        { title: "出售商品", path: "/product/sale" },
        { title: "仓库商品", path: "" },
        { title: "违规下架", path: "" },
        { title: "下架商品", path: "" },
        { title: "待审核商品", path: "" },
        { title: "已拒绝商品", path: "" },
        { title: "品牌列表", path: "" },
        { title: "店铺分类", path: "" },
        { title: "商品库", path: "" },
    ],
},{
    icon: "fa-bars",
    title: "交易",
    path: "/trade",
    children: [
        { title: "虚拟订单", path: "" },
        { title: "订单管理", path: "/trade/order" },
        { title: "发货管理", path: "" },
        { title: "发货设置", path: "" },
        { title: "商品交易", path: "" },
        { title: "物流工具", path: "" },
        { title: "评价管理", path: "" },
    ],
},{
    icon: "fa-bars",
    title: "促销",
    path: "",
    children: [
        { title: "满送活动", path: "" },
        { title: "优惠券", path: "" },
        { title: "满减活动", path: "" },
        { title: "限时抢购", path: "" },
        { title: "满包邮", path: "" },
        { title: "商品团购", path: "" },
        { title: "优惠资源", path: "" },
    ],
},{
    icon: "fa-bars",
    title: "店铺",
    path: "",
    children: [
        { title: "结算设置", path: "" },
        { title: "我的店铺", path: "" },
        { title: "店铺设置", path: "" },
        { title: "主题设置", path: "" },
    ],
},{
    icon: "fa-bars",
    title: "客服",
    path: "",
    children: [
        { title: "退款记录", path: "" },
        { title: "换货记录", path: "" },
        { title: "咨询管理", path: "" },
        { title: "退货记录", path: "" },
    ],
},{
    icon: "fa-bars",
    title: "统计",
    path: "",
    children: [
        { title: "订单结算", path: "" },
        { title: "流量统计", path: "" },
        { title: "订单统计", path: "" },
        { title: "购买率统计", path: "" },
        { title: "结算统计", path: "" },
        { title: "结算账单", path: "" },
    ],
},{
    icon: "fa-bars",
    title: "权限",
    path: "",
    children: [
        { title: "用户管理", path: "" },
        { title: "用户角色", path: "" },
    ],
},{
    icon: "fa-bars",
    title: "内容",
    path: "",
    children: [
        { title: "文章列表", path: "" },
        { title: "文章发布", path: "" },
        { title: "文章栏目", path: "" },
    ],
}];
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
    renderSubMenuList(data = []){
        let onClick = this.props.onSubClick || function(){};
        return (
            <ul className={"sub-menu-list"}>
                {data.map((menu,i)=>{
                    return (
                        <li key={i} className="sub-menu-item">
                            <Link onClick={onClick.bind(this,menu)} to={menu.path}>{menu.title}</Link>
                        </li>
                    )
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

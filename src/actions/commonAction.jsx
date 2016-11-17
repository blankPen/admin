/*
* @Author: pengzhen
* @Date:   2016-11-09 15:06:27
* @Desc: this_is_desc
* @Last Modified by:   pengzhen
* @Last Modified time: 2016-11-17 17:45:17
*/

'use strict';
import ajax from 'common/Ajax';
import store from 'stores';
import {
    message
} from 'antd';
import History from 'common/History';

export function togglePasswordDialog(flag){
    return {
        type: 'toggle/password/dialog',
        status: flag
    }
}

export function login(params,call){
    return function(){
        ajax({
            url: '/seller/sellerApi/Api/loginCheck',
            data: {
                ...params,
                // ref_url: 'index',
            },
            success: function(res){
                call && call(res);
            }
        })
    }
}
// export function findCode(params,call){
//     return function(){
//         ajax({
//             url: '/seller/sellerApi/Api/findCode',
//             data: params,
//             success: function(res){
//                 if(res.result == 1){
//                     call && call(res);
//                 }else{
//                     message.error(res.msg);
//                 }
//             }
//         })
//     }
// }

export function regist(params,call){
    return function(){
        ajax({
            url: '/seller/sellerApi/Api/register',
            data: params,
            success: function(res){
                call && call(res);
            }
        })
    }
}
const menuList = [{
    icon: "fa-bars",
    title: "一级",
    path: "/product",
    children: [{
        title: "二级菜单",
        path: "",
        children: [{
            title: '三级菜单'
        },{
            title: '三级菜单'
        },{
            title: '三级菜单'
        },{
            title: '三级菜单'
        }]
    },{
        title: "二级菜单",
        path: "",
        children: [{
            title: '三级菜单'
        },{
            title: '三级菜单'
        },{
            title: '三级菜单'
        },{
            title: '三级菜单'
        }]
    },{
        title: "二级菜单",
        path: "",
        children: [{
            title: '三级菜单'
        },{
            title: '三级菜单'
        },{
            title: '三级菜单'
        },{
            title: '三级菜单'
        }]
    }]
},{
    icon: "fa-bars",
    title: "商品",
    path: "/product",
    children: [{
        title: "导入商品",
        path: ""
    }, {
        title: "库存报警",
        path: ""
    }, {
        title: "商品发布",
        path: ""
    }, {
        title: "出售商品",
        path: "/product/sale"
    }, {
        title: "仓库商品",
        path: ""
    }, {
        title: "违规下架",
        path: ""
    }, {
        title: "下架商品",
        path: "/product/closeShow"
    }, {
        title: "待审核商品",
        path: ""
    }, {
        title: "已拒绝商品",
        path: ""
    }, {
        title: "品牌列表",
        path: ""
    }, {
        title: "店铺分类",
        path: ""
    }, {
        title: "商品库",
        path: ""
    }, ],
}, {
    icon: "fa-bars",
    title: "交易",
    path: "/trade",
    children: [{
        title: "虚拟订单",
        path: ""
    }, {
        title: "订单管理",
        path: "/trade/order"
    }, {
        title: "发货管理",
        path: ""
    }, {
        title: "发货设置",
        path: ""
    }, {
        title: "商品交易",
        path: ""
    }, {
        title: "物流工具",
        path: ""
    }, {
        title: "评价管理",
        path: ""
    }, ],
}, {
    icon: "fa-bars",
    title: "促销",
    path: "",
    children: [{
        title: "满送活动",
        path: ""
    }, {
        title: "优惠券",
        path: ""
    }, {
        title: "满减活动",
        path: ""
    }, {
        title: "限时抢购",
        path: ""
    }, {
        title: "满包邮",
        path: ""
    }, {
        title: "商品团购",
        path: ""
    }, {
        title: "优惠资源",
        path: ""
    }, ],
}, {
    icon: "fa-bars",
    title: "店铺",
    path: "",
    children: [{
        title: "结算设置",
        path: ""
    }, {
        title: "我的店铺",
        path: ""
    }, {
        title: "店铺设置",
        path: ""
    }, {
        title: "主题设置",
        path: ""
    }, ],
}, {
    icon: "fa-bars",
    title: "客服",
    path: "",
    children: [{
        title: "退款记录",
        path: ""
    }, {
        title: "换货记录",
        path: ""
    }, {
        title: "咨询管理",
        path: ""
    }, {
        title: "退货记录",
        path: ""
    }, ],
}, {
    icon: "fa-bars",
    title: "统计",
    path: "",
    children: [{
        title: "订单结算",
        path: ""
    }, {
        title: "流量统计",
        path: ""
    }, {
        title: "订单统计",
        path: ""
    }, {
        title: "购买率统计",
        path: ""
    }, {
        title: "结算统计",
        path: ""
    }, {
        title: "结算账单",
        path: ""
    }, ],
}, {
    icon: "fa-bars",
    title: "权限",
    path: "",
    children: [{
        title: "用户管理",
        path: ""
    }, {
        title: "用户角色",
        path: ""
    }, ],
}, {
    icon: "fa-bars",
    title: "内容",
    path: "",
    children: [{
        title: "文章列表",
        path: ""
    }, {
        title: "文章发布",
        path: ""
    }, {
        title: "文章栏目",
        path: ""
    }, ],
}];

export function getMenuData(){
    return function(dispatch){
        setTimeout(()=>{
            let map = {};
            menuList.forEach((menu)=>{
                if(Array.isArray(menu.children)){
                    menu.children.forEach((sub)=>{
                        if(sub.path){
                            map[sub.path] = sub;
                        }
                    });
                }
            });
            dispatch({
                type: 'get/menu/data',
                data: menuList,
                map: map
            })
        },1000);
    }
}

// 添加菜单历史记录
// export function addHistoryMenu(menu){
//     if(menu.path){
//         let arr = [...store.getState().common.historyIndex];
//         let flag = true;
//         arr.forEach(item=>{
//             if(item.path == menu.path){
//                 flag = false;
//                 return false;
//             }
//         });
//         if(flag){
//             arr.push({ title: menu.title,path: menu.path });
//         }
//         return {
//             type: 'save/history/index',
//             data: arr,
//         }
//     }else{
//         return function(){};
//     }
// }
// 移除菜单历史记录
export function removeHistoryMenu(menu){
    let arr = [...store.getState().common.historyIndex];
    arr = arr.filter(item=>{
        return item.path != menu.path;
    });
    if(arr.length>0){
        History.push(arr[arr.length-1].path);
    }else{
        History.push('/');
    }
    return {
        type: 'save/history/index',
        data: arr,
    }
}
// 清空菜单历史记录
export function clearHistoryMenu(menu){
    History.push('/');
    return {
        type: 'save/history/index',
        data: [],
    }
}

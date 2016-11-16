'use strict';
import {
    handleActions
}  from 'redux-actions';
import Cookie from 'js-cookie';

export const stateName = 'common';

export default handleActions({
    '@@router/LOCATION_CHANGE': (state, action) => {
        let path = action.payload.pathname;
        let menu = state.menu.map[path];
        if(menu && menu.path){
            console.log(state.historyIndex)
            let arr = [...state.historyIndex];
            let flag = true;
            arr.forEach(item=>{
                if(item.path == menu.path){
                    flag = false;
                    return false;
                }
            });
            if(flag){
                arr.push({ title: menu.title,path: menu.path });
            }
            Cookie.set('menu-history',arr);
            return {
                ...state,
                historyIndex: arr,
            }
        }else{
            return state;
        }
    },
    'save/history/index': (state, action) => {
        Cookie.set('menu-history',action.data);
        return {
            ...state,
            historyIndex: action.data,
        }
    },
    'toggle/password/dialog': (state, action) => {
        return {
            ...state,
            isOpenResetPassword: action.status,
        }
    },
    'get/menu/data': (state, action) => {
        return {
            ...state,
            menu: {
                list: action.data,
                map: action.map
            }
        }
    },

}, {
    isOpenResetPassword: false, // 是否弹出修改密码框
    historyIndex: Cookie.getJSON('menu-history') || [],
    menu: {
        list: [],
        map: {}
    }
});

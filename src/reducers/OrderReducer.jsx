'use strict';
import {
    handleActions
}  from 'redux-actions';

export const stateName = 'orderState';

export default handleActions({
    'get/order/list': (state, action) => {
        return {
            ...state,
            list: action.list,
            pageSize: action.pageSize,
            totalRows: action.totalRows,
            pageNo: action.pageNo,
        }
    },
}, {
    list: [],
    pageNo: 0,
    totalRows: 0,
    pageSize: 10,
});

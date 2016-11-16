'use strict';
import {
    handleActions
}  from 'redux-actions';

export const stateName = 'productState';

export default handleActions({
    'get/product/sale/list': (state, action) => {
        return {
            ...state,
            saleData: action.data,
        }
    },
    'get/product/closeshow/list': (state, action) => {
        return {
            ...state,
            saleData: action.data,
        }
    },
}, {
    saleData: {
        dataList: [],
        pageNo: 0,
        totalRows: 0,
        pageSize: 10,
    },
    closeShowData: {
        dataList: [],
        pageNo: 0,
        totalRows: 0,
        pageSize: 10,
    },
});

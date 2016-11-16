'use strict';
import ajax from 'common/Ajax';
import store from 'stores';
import {
    message
} from 'antd'

//获取订单list
export function getOrderList(params, call) {
    return function(dispatch) {
        ajax({
            url: '/rest/api/store/list',
            data: {
                longitude: 116.322104,
                atitude: 39.984134,
                ...params,
            },
            success: function(res) {
                dispatch({
                    type: 'get/order/list',
                    list: res.data,
                    pageNo: res.pageNo,
                    pageSize: res.pageSize,
                    totalRows: res.totalRows,
                })
                call && call(res);
            }
        })
    }
}

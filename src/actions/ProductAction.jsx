/*
 * @Author: pengzhen
 * @Date:   2016-11-11 14:59:24
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-16 10:25:00
 */

'use strict';
import ajax from 'common/Ajax';
import store from 'stores';
import {
    message
} from 'antd';

// 获取出售商品列表
export function getSaleProductList(params, call) {
    return function(dispatch) {
        ajax({
            url: '/seller/sellerApi/productApi/sale',
            data: params,
            success: function(res) {
                if (res.result == 1) {
                    dispatch({
                        type: 'get/product/sale/list',
                        data: res.data[0]
                    })
                    call && call(res.data[0]);
                } else {
                    message.error(res.msg);
                }
            }
        })
    }
}

// 获取下架商品列表
export function getCloseShowList(params, call) {
    return function(dispatch) {
        ajax({
            url: '/seller/sellerApi/productApi/closeShow',
            data: params,
            success: function(res) {
                if (res.result == 1) {
                    dispatch({
                        type: 'get/product/closeshow/list',
                        data: res.data[0]
                    })
                    call && call(res.data[0]);
                } else {
                    message.error(res.msg);
                }
            }
        })
    }
}



// 批量下架商品
export function downProducts(ids, call) {
    return function(dispatch) {
        ajax({
            url: '/seller/sellerApi/productApi/downProducts',
            data: {
                ids: ids.join(',')
            },
            success: function(res) {
                if (res.result == 1) {
                    call && call(res);
                    message.success(res.msg);
                } else {
                    message.error(res.msg);
                }
            }
        })
    }
}
// 批量删除商品
export function deleteProducts(ids, call) {
    return function(dispatch) {
        ajax({
            url: '/seller/sellerApi/productApi/deleteList',
            data: {
                ids: ids.join(',')
            },
            success: function(res) {
                if (res.result == 1) {
                    call && call(res);
                    message.success(res.msg);
                } else {
                    message.error(res.msg);
                }
            }
        })
    }
}


// 单个删除商品
export function deleteProduct(goodsId, call) {
    return function(dispatch) {
        ajax({
            url: '/seller/sellerApi/productApi/deleteProduct',
            data: {
                goodsId
            },
            success: function(res) {
                if (res.result == 1) {
                    call && call(res);
                    message.success(res.msg);
                } else {
                    message.error(res.msg);
                }
            }
        })
    }
}

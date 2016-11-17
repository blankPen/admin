/*
* @Author: pengzhen
* @Date:   2016-11-17 10:02:24
* @Desc: this_is_desc
* @Last Modified by:   pengzhen
* @Last Modified time: 2016-11-17 10:12:26
*/

'use strict';
import ajax from 'common/Ajax';

// 获取开店申请协议
export function getApplyAgreement(callback){
    ajax({
        url: 'seller/sellerApi/ShopFlowApi/agreementApi',
        dataType: 'html',
        success: callback
    })
}

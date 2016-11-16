/*
 * @Author: pengzhen
 * @Date:   2016-11-11 17:26:53
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-14 14:47:59
 */

'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import Page from 'components/common/Page';
import Tabs from 'components/common/Tabs';
import {
    Button,
} from 'antd';
const TabPane = Tabs.TabPane;

function mapStateToProps(state) {
    return {

    };
}

export class New extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Page className='page-product-new'>
                <Page.Content key='1' tab='商品管理 > 新增商品'>

                    <Tabs defaultActiveKey='2'>
                        <TabPane key='1' tab='基础'>
                            tab1...
                        </TabPane>
                        <TabPane key='2' tab='图片与商品详情'>
                            tab2...
                        </TabPane>
                    </Tabs>
                    <div className="submit-box">
                        <Button type='primary' >确认</Button>
                        <Button type='ghost' >取消</Button>
                    </div>
                </Page.Content>
            </Page>
        );
    }
}

export default connect(
    mapStateToProps,
    // Implement map dispatch to props
)(New)

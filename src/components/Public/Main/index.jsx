/*
 * @Author: pengzhen
 * @Date:   2016-11-05 14:57:10
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-15 17:30:14
 */

'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import { addHistoryMenu } from 'actions/commonAction';

import Header from 'components/Public/Main/Header';
import Menu from 'components/Public/Main/Menu';
import ResetDialog from 'components/Public/Main/ResetDialog';

function mapStateToProps(state) {
    return {

    };
}

export class Main extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }
    // 添加菜单到菜单历史记录
    addMenuToIndex(menu){
        // this.props.dispatch(addHistoryMenu(menu));
    }

    render() {
        return (
            <div className="main-container">
                {/* 修改密码弹窗 */}
                <ResetDialog/>

                <Header location={this.props.location}/>
                <Menu
                    location={this.props.location}
                    route={this.props.route}
                    onSubClick={this.addMenuToIndex}
                />
                <div className="page-wrap">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    // Implement map dispatch to props
)(Main)

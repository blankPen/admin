/*
 * @Author: pengzhen
 * @Date:   2016-11-05 14:57:10
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-16 10:40:17
 */

'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
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

    render() {
        return (
            <div className="main-container">
                {/* 修改密码弹窗 */}
                <ResetDialog/>

                <Header location={this.props.location}/>
                <Menu
                    location={this.props.location}
                    route={this.props.route}
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

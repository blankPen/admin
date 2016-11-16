/*
 * @Author: pengzhen
 * @Date:   2016-11-07 16:56:17
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-09 15:56:19
 */

'use strict';
import './index.less';
import React from 'react';

export default class extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={'sign-wrap '+(this.props.className||'')}>
                <div className="banner"></div>
                <div className="content">
                    {this.props.children}
                </div>
                <div className="footer">
                    <p>
                        Copyright © 2016 <a href="#" target="_blank">Dhb168.com</a>
                    </p>
                </div>
            </div>
        );
    }
}

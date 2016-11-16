/*
 * @Author: pengzhen
 * @Date:   2016-11-11 09:51:57
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-11 14:44:42
 */

'use strict';
import './index.less';
import React from 'react';

export default class SearchForm extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="search-bar">

                <div className="right-opts">
                    {this.props.rightContent}
                </div>
                <div className="left-opts">
                    {this.props.leftContent || this.props.children}
                </div>
            </div>
        );
    }
}

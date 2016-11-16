/*
 * @Author: pengzhen
 * @Date:   2016-11-06 14:31:02
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-10 11:40:31
 */

'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import { Icon } from 'antd';
import Tabs from 'components/common/Tabs';
const TabPane = Tabs.TabPane;

export default class Page extends Tabs {

    render() {
        const {
            className
        } = this.props;
        const { tabs,contentMap } = this.getTabsAndContent();
        const active = this.state.active;
        return (
            <div className={"page"+(className?` ${className}`:'')}>
                <div className="page-header">
                    {tabs.map(({key,title},i)=>{
                        return <span key={key}
                            onClick={this.changeTab.bind(this,key)}
                            className={"tab "+(key == active?'active':'')}>
                            {title}&nbsp;
                            <span className="icon">
                                {key == active && <Icon type="question-circle-o" />}
                            </span>
                        </span>
                    })}
                </div>
                <div className="page-body">
                    {contentMap[active]}
                </div>
            </div>
        );
    }
}

Page.Content = TabPane;

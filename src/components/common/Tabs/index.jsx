/*
 * @Author: pengzhen
 * @Date:   2016-11-10 09:59:44
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-17 11:05:13
 */

'use strict';
import './index.less';
import React from 'react';

export default class Tabs extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);

        if(this.props.activeKey !== undefined){
            this.props.onChange || console.error("设置了activeKey必须设置onChange方法，让Tabs可控");
        }else{
            let active = undefined;
            if(props.defaultActiveKey !== undefined){
                active = props.defaultActiveKey;
            }else{
                active = this.getTabsAndContent().tabs[0].key;
            }
            this.state = {
                active: active
            }
        }
    }
    changeTab(active){
        if(this.props.activeKey !== undefined){
            return this.props.onChange(active);
        }else{
            this.setState({
                active,
            });
        }
    }
    getActiveKey(){
        if(this.props.activeKey !== undefined){
            return this.props.activeKey;
        }else{
            return this.state.active
        }
    }
    getTabsAndContent(){
        let contentMap = {};
        let tabs = [];
        let children = this.props.children;
        if (!Array.isArray(children)) {
            children = [children];
        }
        children.forEach((child, i) => {
            if (child.type && child.type.name == 'TabPane') {
                let key = child.key;
                let title = child.props.tab || key;
                tabs.push({ key,title });
                contentMap[key] = child;
            }
        });
        return {
            tabs,
            contentMap,
        };
    }
    render() {
        const {
            className
        } = this.props;
        const { tabs,contentMap } = this.getTabsAndContent();
        let active = null;
        if(this.props.activeKey !== undefined){
            active = this.props.activeKey;
        }else{
            active = this.state.active;
        }
        let content;
        if(this.props.displayHidden){
            content = Object.keys(contentMap).map(key=>{
                let style = {
                    display: key == active ? 'block':'none'
                };
                return <div key={key} className="tab-content" style={style}>
                    {contentMap[key]}
                </div>
            })
        }else{
            content = <div className="tab-content">
                {contentMap[active]}
            </div>;
        }
        return (
            <div className="tabs-wrap">
                <div className="tabs">
                    {tabs.map(({key,title},i)=>{
                        return <span key={key}
                            onClick={this.changeTab.bind(this,key)}
                            className={"tab "+(key == active?'active':'')}>
                            {title}
                        </span>
                    })}
                </div>
                {content}
            </div>
        );
    }
}

Tabs.TabPane = class TabPane extends React.Component {
    static propTypes = {
    };
    constructor(props) {
        super(props);
    }
    render() {
        return <div>{this.props.children}</div>;
    }
}


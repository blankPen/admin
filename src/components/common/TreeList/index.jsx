/*
 * @Author: pengzhen
 * @Date:   2016-11-20 01:31:00
 * @Desc: 树形结构列表，支持异步加载
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-20 05:13:57
 */

'use strict';
import './index.less';
import React from 'react';
import {
    Icon
} from 'antd';

export default class TreeList extends React.Component {
    static propTypes = {
        rowKey: React.PropTypes.string.isRequired,
        dataSource: React.PropTypes.array,
        renderContent: React.PropTypes.func,
        onLoadData: React.PropTypes.func,
    };
    static defaultProps = {
        renderContent: function(){},
    };
    constructor(props) {
        super(props);
        this.state = {
            openKeys: []
        }
    }
    getKey(data){
        return data[this.props.rowKey];
    }
    reloadRow(key){
        let item = this.refs[key];
        console.log(item.toggleExpand)
        if(item){
            item.toggleExpand(true);
        }
    }
    getNewTreeData(pid,children){
        return this._getNewTreeData(this.props.dataSource,pid,children);
    }
    _getNewTreeData(data,pid,children){
        children = children || [];
        let newData = data.map(item=>{
            let newChildren = item.children;
            if(this.getKey(item) == pid){
                newChildren = newChildren || [];
                let keys = newChildren.map(child=>this.getKey(child));
                newChildren = children.map(child=>{
                    let index = keys.indexOf(this.getKey(child));
                    if(index !== -1){
                        child.children = newChildren[index].children
                        return child;
                    }else{
                        return child;
                    }
                });
            }else if(newChildren && newChildren.length > 0){
                newChildren = this._getNewTreeData(item.children,pid,children);
            }
            item.children = newChildren;
            return item;
        })
        return newData;
    }
    handleItemExpand(data,isOpen,call){
        let openKeys = [...this.state.openKeys];
        let curKey = this.getKey(data);
        if(isOpen){
            openKeys.push(curKey);
        }else{
            openKeys = openKeys.filter(key=> curKey != key);
        }
        this.setState({
            openKeys
        });
        if(this.props.onLoadData){
            this.props.onLoadData(data,(children)=>{
                call();
                return this.getNewTreeData(curKey,children)
            })
        }else{
            call();
        }
    }
    loopData(list=[]){
        let openKeys = this.state.openKeys;
        return list.map( data => {
            let content = this.props.renderContent(data);
            let curKey = this.getKey(data);
            if(data.hasChild !== false){
                return (
                    <TreeItem
                        key={curKey}
                        ref={curKey}
                        open={openKeys.indexOf(curKey) !== -1}
                        onExpand={this.handleItemExpand.bind(this,data)}
                        content={content}>
                        {data.children && this.loopData(data.children)}
                    </TreeItem>
                )
            }else{
                return (
                    <TreeItem
                        key={curKey}
                        hasChild={false}
                        onExpand={this.handleItemExpand.bind(this,data)}
                        content={content}>
                    </TreeItem>
                )
            }
        });
    }
    render() {
        const {
            dataSource
        } = this.props;
        return (
            <div className='tree-list'>
            {/*dataSource.map((item,i)=>{
                return this.renderItem(item,i);
            })*/}
            {this.loopData(dataSource)}
            </div>
        );
    }
}

export class TreeItem extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
        onExpand: React.PropTypes.func,
    };
    static defaultProps = {
        onExpand: function(call) {
            call();
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            open: props.children && props.children.length,
        }
    }

    toggleExpand(isOpen) {
        if(this.state.loading) return;
        if(isOpen){
            this.setState({
                loading: true
            });
        }
        this.props.onExpand(isOpen,() => {
            // 展开
            this.setState({
                loading: false,
                open: true,
            });
        })
    }
    renderListChild(data) {
        if (data && data.length > 0) {
            return (
                <div className="tree-list-child">
                    {data.map((item,i)=> this.renderItem(item,i))}
                </div>
            );
        }
    }
    render() {
        let { loading } = this.state;
        const open = this.props.open;
        let hasChild = this.props.hasChild !== false;
        let className = hasChild ? 'tree-list-item has-child' : 'tree-list-item';
        let icon = loading && <Icon type='loading' spin /> ||
                    open && <Icon type='minus' /> || <Icon type='plus' />;
        return (
            <div className="tree-list-item-wrapper">
                <div className={className}>
                    {hasChild &&
                        <a className="expand-btn"
                            onClick={this.toggleExpand.bind(this,!open)}>
                            {icon}
                        </a>}
                    <div className="tree-list-item-content">
                        {this.props.content}
                    </div>
                </div>
                {open && <div className="tree-list-child">{this.props.children}</div>}
            </div>
        );
    }
}

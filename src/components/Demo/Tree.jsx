/*
 * @Author: pengzhen
 * @Date:   2016-11-20 01:12:28
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-21 14:57:09
 */

'use strict';
import React from 'react';
import {
    connect
} from 'react-redux';
import TreeList from 'components/common/TreeList'

function mapStateToProps(state) {
    return {

    };
}
// 数据生成，模拟根据pid从后台请求到子节点数据
function createData(pid){
    let newData = [];
    for (var i = 0; i < 10; i++) {
        newData.push({ id: `${pid}-${i}`,pid: pid, name: `Child Node ${pid}-${i}`,hasChild: i%3==0 });
    }
    return newData;
}
export class TreeDemo extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            // 简单示例数据源
            data: [
                { id: '1',name: 'Node 1',children: [
                    { id: '1-1', pid: '1', name: 'Node 1-1', children: [
                        { id: '1-1-1', pid: '1-1', name: 'Node 1-1-1', hasChild: false }
                    ]},
                    { id: '1-2', pid: '1', name: 'Node 1-2', hasChild:false },
                    { id: '1-3', pid: '1', name: 'Node 1-3', hasChild:false },
                ]},
                { id: '2',name: 'Node 2',children: [
                    { id: '2-1', pid: '2', name: 'Node 2-1', hasChild:false },
                    { id: '2-2', pid: '2', name: 'Node 2-2', hasChild:false },
                    { id: '2-3', pid: '2', name: 'Node 2-3', hasChild:false },
                ]},
                { id: '3',name: 'Node 3',hasChild: false },
            ],
            // 异步加载示例数据源
            asyncData: [
                { id: '1',name: 'Node 1' },
                { id: '2',name: 'Node 2' },
                { id: '3',name: 'Node 3',hasChild: false },
            ]
        }
    }
    // 模拟添加节点方法
    handleAdd=(data)=>{
        alert(`添加子节点到${data.id}`);
    }
    // 模拟删除节点方法
    handleRemove=(data)=>{
        setTimeout(()=>{
            console.log('模拟删除操作,删除结束后刷新父节点数据')
            this.tree.reloadRow(data.pid);
        },300)
    }
    // 模拟加载数据
    handleLoadData=(row,getNewTreeData)=>{
        // 实际开发改为ajax请求数据
        // ajax({
        //  url: 'xxxx',
        //  data: {
        //      pid: row.id,
        //  },
        //  success: function(res){
        //      将请求回的数据返回
        //      callback(res.data)
        //  }
        // })
        let res = createData(row.id);
        setTimeout(()=>{
            this.setState({
                // 调用getNewTreeData方法传入加载到的子节点数据获取新的TreeData
                asyncData: getNewTreeData(res)
            });
        },3000);
    }
    // 自定义渲染节点内容
    renderNodeContent=(data)=>{
        return (
            <div>
                <b>{data.name}</b>（排序：{data.id}）
                <a style={{float: 'right'}} onClick={this.handleRemove.bind(this,data)}>删除</a>
                <a style={{float: 'right',marginRight: 10}} onClick={this.handleAdd.bind(this,data)}>新增</a>
            </div>
        )
    }
    render() {
        return (
            <div style={{margin: '40px auto'}}>
                <div style={{width: '50%',padding: 10,float: 'left'}} >
                    <h1>基本使用</h1>
                    <TreeList
                        rowKey='id'
                        dataSource={this.state.data}
                        renderContent={this.renderNodeContent} />
                </div>
                <div style={{width: '50%',padding: 10,float: 'left'}} >
                    <h1>异步加载</h1>
                    <TreeList
                        rowKey='id'
                        ref={ref=> {this.tree = ref;} }
                        dataSource={this.state.asyncData}
                        onLoadData={this.handleLoadData}
                        renderContent={this.renderNodeContent} />
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    // Implement map dispatch to props
)(TreeDemo)


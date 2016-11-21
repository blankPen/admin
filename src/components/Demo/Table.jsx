
/*
 * @Author: pengzhen
 * @Date:   2016-11-20 01:12:28
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-21 15:00:11
 */

'use strict';
import React from 'react';
import {
    connect
} from 'react-redux';
import Table from 'components/common/Table'

function mapStateToProps(state) {
    return {

    };
}

function createData(pageNo,pageSize){
    let newData = [];
    for (var i = (pageNo-1)*pageSize; i < pageNo * pageSize; i++) {
        newData.push({ id: i, name: `Table Item ${i}` });
    }
    return newData;
}
export class TableDemo extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.columns = [{
            title: 'ID',
            dataIndex: 'id',
            width: 100,
        },{
            title: '名称',
            dataIndex: 'name',
            render(text,row){
                return <a onClick={()=>{ alert('自定义渲染内容') }} >【{text}】</a>
            }
        }];
        this.state = {
            loading: false,
            pageSize: 10,
            data: [],
        }
    }
    componentWillMount() {
        this.refresh();
    }
    // 模拟查看操作
    handleCheck=(data)=>{
        alert(`查看Table Item ${data.id}`);
    }
    // 模拟删除操作，删除后刷新列表
    handleRemove=(data)=>{
        setTimeout(()=>{
            alert('模拟删除操作,删除结束后刷新Table数据')
            this.refresh();
        },300)
    }
    refresh(){
        this.loadData({
            pageNo: 1
        })
    }
    // 模拟加载数据
    loadData=(params)=>{
        // 实际开发改为ajax请求数据
        this.setState({
            loading: true
        });
        setTimeout(()=>{
            this.setState({
                loading: false,
                data: createData(params.pageNo,this.state.pageSize)
            });
        },1000);
    }
    getPagination() {
        return {
            total: 1000, // 这里的总数应该由后台返回
            onChange: (pageNo) => { // 当修改分页时触发事件
                this.loadData({
                    pageNo
                });
            },
        }
    }
    render() {
        return (
            <div style={{margin: '40px auto'}}>
                <div style={{width: '80%',padding: 10}} >
                    <h1>基本使用</h1>
                    <Table
                        rowKey='id'
                        ref={ref=>{ this.table = ref; }}
                        columns={this.columns}
                        options={[
                            { title:'查看',onClick:this.handleCheck },
                            { title:'删除',onClick:this.handleRemove },
                        ]}
                        dataSource={this.state.data}
                        pagination={this.getPagination()}
                        loading={this.state.loading}
                    />
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    // Implement map dispatch to props
)(TableDemo)

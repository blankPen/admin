/*
* @Author: pengzhen
* @Date:   2016-11-16 10:19:35
* @Desc: this_is_desc
* @Last Modified by:   pengzhen
* @Last Modified time: 2016-11-16 10:29:04
*/

'use strict';
import './index.less';
import React from 'react';
import Img from 'common/Img';
import Table from 'components/common/Table';
import {
    Button,
    Icon,
} from 'antd';

export default class ProductTable extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.columns = [{
            title: '商品名称',
            width: 600,
            render({
                goodsImage,
                goodsName,
                gcName
            }) {
                return (
                    <div className='td-productName'>
                        <Img src={goodsImage} />
                        <div className="name">{goodsName}</div>
                        <div className="gc-name">{gcName}</div>
                    </div>
                );
            },
        }, {
            title: '价格',
            dataIndex: 'goodsMarketPrice',
        }, {
            title: '库存',
            dataIndex: 'goodsTotalStorage',
        }];
        this.state = {
            loading: false
        }
    }
    componentWillMount() {
        this.refresh();
    }
    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(nextProps.searchData, this.props.searchData)) {
            this.loadData({
                ...nextProps.searchData,
                pageNo: 1
            });
        }
    }
    getSelectionRowKeys(){
        return this.state.selectedRowKeys;
    }
    refresh(){
        this.loadData({
            pageNo: 1
        });
    }
    loadData(params) {
        this.setState({
            loading: true
        });
        this.props.onLoad({
            pageNo: this.props.pageNo + 1,
            pageSize: this.props.pageSize,
            ...this.props.searchData,
            ...params
        }, (res) => {
            this.setState({
                loading: false
            });
        });
    }
    getPagination() {
        return {
            total: this.props.totalRows,
            showSizeChanger: true,
            onShowSizeChange: (pageNo, pageSize) => {
                this.loadData({
                    pageNo,
                    pageSize
                });
            },
            onChange: (pageNo) => {
                this.loadData({
                    pageNo
                });
            },
        }
    }
    onSelectChange = (selectedRowKeys) => {
        this.setState({
            selectedRowKeys
        });
    }
    render() {
        const {
            loading,
            selectedRowKeys
        } = this.state;
        return (
            <Table
                rowKey = "goodsId"
                className = 'product-table'
                rowSelection = {{
                    selectedRowKeys,
                    onChange: this.onSelectChange,
                }}
                options={this.props.options}
                columns = {this.columns }
                dataSource = {this.props.dataSource || [] }
                pagination = {this.getPagination() }
                loading = {loading }
            />
        );
    }
}

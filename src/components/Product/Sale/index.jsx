/*
 * @Author: pengzhen
 * @Date:   2016-11-11 09:43:06
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-14 15:34:59
 */

'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';

import {
    getSaleProductList,
    deleteProduct,
    deleteProducts,
    downProducts,
} from 'actions/ProductAction';
import History from 'common/History';

import Img from 'common/Img';
import Page from 'components/common/Page';
import Table from 'components/common/Table';
import {
    Dropdown,
    Menu,
    Select,
    Input,
    Button,
    Icon,
} from 'antd';
import SearchBar from 'components/common/SearchBar';
const Option = Select.Option;
const InputGroup = Input.Group;

function mapStateToProps({
    productState
}) {
    return {
        saleData: productState.saleData
    };
}

export class SaleProduct extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            searchName: '',
            searchData: {
                storeId: "f167d8b8d6b042ff8b6bb85d25fb27a9", // 用户的店铺id
                storeClassId: undefined,
                goodsName: undefined,
            },
            selectedRowKeys: []
        }
    }
    setSearchValue(key, value) {
        this.setState({
            searchData: {
                ...this.state.searchData,
                [key]: value == 'null' ? undefined : value
            }
        });
    }
    doSearch=()=>{
        this.setSearchValue('goodsName', this.state.searchName);
    }
    handleMenuClick=(menu)=>{
        let goodsIds = this.table.getSelectionRowKeys();
        switch(menu.key){
            case 'delete':
                this.props.dispatch(deleteProducts(goodsIds,(res)=>{
                    console.log(res)
                    this.table.refresh();
                }));
                return;
            case 'down':
                this.props.dispatch(downProducts(goodsIds,this.table.refresh));
                return;
            case 'export':
                return;
        }
    }
    renderGoodsClassSelect() {
        const { storeId,storeClassId } = this.state.searchData;
        let saleData = this.props.saleData;
        let opts = [];
        if (saleData.storeGoodsClassVoMap) {
            let map = saleData.storeGoodsClassVoMap[0] || {};
            Object.keys(map).forEach(key => {
                let item = map[key][0];
                opts.push(<Option key={item.parentId}>{item.parentName}</Option>);
            })
        }
        return (
            <Select className='control-item w120'
                value={storeClassId}
                placeholder='选择分类'
                onChange={this.setSearchValue.bind(this,'storeClassId')}
            >
                {opts}
            </Select>
        );
    }
    render() {

        return (
            <Page className='page-product-sale'>
                <Page.Content key='1' tab='出售中商品'>
                    <div className="panel">
                        <SearchBar
                            rightContent={[
                                <Dropdown key='batch'
                                    overlay={
                                        <Menu onClick={this.handleMenuClick}>
                                            <Menu.Item key="delete">删除选中商品</Menu.Item>
                                            <Menu.Item key="down">下架选中商品</Menu.Item>
                                            <Menu.Item key="export">全部导出</Menu.Item>
                                        </Menu>
                                    }
                                >
                                    <Button type="ghost">
                                      批量操作 <Icon type="down" />
                                    </Button>
                                </Dropdown>,
                                <Button key='new'
                                    type='primary'
                                    onClick={()=>{History.push('/product/new')}}>
                                    发布新商品
                                </Button>,
                            ]}
                        >
                            <InputGroup className='control-item w250'>
                                <Input placeholder='商品名称'
                                    value={this.state.searchName}
                                    onChange={(e)=>{
                                        this.setState({
                                            searchName: e.target.value
                                        });
                                    }}
                                />
                                <div className="ant-input-group-wrap">
                                    <Button icon="search" onClick={this.doSearch}/>
                                </div>
                            </InputGroup>
                            {this.renderGoodsClassSelect()}
                        </SearchBar>

                        <SaleProductTable
                            ref={ref=>{
                                this.table = ref;
                            }}
                            {...this.props.saleData}
                            dispatch={this.props.dispatch}
                            searchData={this.state.searchData}
                        />
                    </div>
                </Page.Content>
            </Page>
        );
    }
}

export default connect(
    mapStateToProps,
    // Implement map dispatch to props
)(SaleProduct)


export class SaleProductTable extends React.Component {
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
        this.props.dispatch(getSaleProductList({
            pageNo: this.props.pageNo + 1,
            pageSize: this.props.pageSize,
            ...this.props.searchData,
            ...params
        }, (res) => {
            this.setState({
                loading: false
            });
        }));
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
    handleDelete=(row)=>{
        this.props.dispatch(deleteProduct(row.goodsId,()=>{
            this.refresh();
        }));
    }
    render() {
        const {
            loading,
            selectedRowKeys
        } = this.state;
        return (
            <Table
                rowKey = "goodsId"
                className = 'product-sale-table'
                rowSelection = {{
                    selectedRowKeys,
                    onChange: this.onSelectChange,
                }}
                options={[
                    { title:'查看',onClick:this.handleDelete },
                    { title:'编辑',onClick:this.handleDelete },
                    { title:'删除',onClick:this.handleDelete },
                    { title:'修改组合',onClick:this.handleDelete },
                ]}
                columns = {this.columns }
                dataSource = {this.props.dataList || [] }
                pagination = {this.getPagination() }
                loading = {loading }
            />
        );
    }
}

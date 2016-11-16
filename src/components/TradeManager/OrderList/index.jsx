/*
 * @Author: pengzhen
 * @Date:   2016-11-06 13:17:17
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-11 14:41:43
 */

'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import Img from 'common/Img';
import Page from 'components/common/Page';
import Table from 'components/common/Table';
import SearchBar from 'components/common/SearchBar';
import {
    Menu,
    Dropdown,
    Select,
    Input,
    Button,
    Icon,
    DatePicker
} from 'antd';
import {
    getOrderList
} from 'actions/OrderAction';

const Option = Select.Option;
const InputGroup = Input.Group;
const RangePicker = DatePicker.RangePicker;
function mapStateToProps({
    orderState
}) {
    return {
        ...orderState
    };
}

export class OrderList extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            searchData : {

            }
        }
        this.orderType = [
            {type: 'all',title:'所有订单'},
            {type: 'pay',title:'等待付款'},
            {type: 'payed',title:'已经提交'},
            {type: 'send',title:'等待发货'},
            {type: 'sended',title:'已经发货'},
        ];
    }
    renderContent(type,title){
        return (
            <Page.Content key={type} tab={title}>
                <div className="panel panel-table">
                    <SearchBar
                        rightContent={[
                            <Dropdown.Button key='new'
                                onClick={this.handleButtonClick}
                                overlay={
                                    <Menu onClick={this.handleMenuClick}>
                                        <Menu.Item key="1">批量导入</Menu.Item>
                                        <Menu.Item key="2">2nd menu item</Menu.Item>
                                        <Menu.Item key="3">3d menu item</Menu.Item>
                                    </Menu>
                                }
                            >
                                新增订单
                            </Dropdown.Button>
                        ]}
                    >
                        <InputGroup className='control-item w120'>
                            <Input placeholder='订单编号' />
                            <div className="ant-input-group-wrap">
                                <Button icon="search"/>
                            </div>
                        </InputGroup>

                        <InputGroup className='control-item w120'>
                            <div className="ant-input-group-wrap">
                                <Button icon="user"/>
                            </div>
                            <Input placeholder='买家' />
                        </InputGroup>
                        <div className="control-item">
                            <DatePicker />
                        </div>
                        <div className="control-item">
                            <RangePicker />
                        </div>
                        <Select className='control-item w120' defaultValue='1'>
                            <Option key='1'>全部订单</Option>
                            <Option key='2'>已付款</Option>
                            <Option key='3'>未付款</Option>
                        </Select>
                    </SearchBar>
                    <OrderTable
                        {...this.props}
                        dispatch={this.props.dispatch}
                        data={this.props.list}
                        searchData={{
                            ...this.state.searchData,
                            type: type
                        }}
                    />
                </div>
            </Page.Content>
        )
    }
    render() {
        return (
            <Page className="page-order" >
                {this.orderType.map(({title,type})=>this.renderContent(type,title))}
            </Page>
        );
    }
}

export default connect(
    mapStateToProps,
    // Implement map dispatch to props
)(OrderList)


export class OrderTable extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.columns = [{
            title: '商品',
            width: 200,
            dataIndex: 'storeName',
            render(text, row) {
                return (
                    <div className='td-storeName'>
                        <Img width={200} src={row.storeLogo} />
                        <div className="name">{text}</div>
                    </div>
                );
            },
        }, {
            title: '电话',
            dataIndex: 'storeTels',
        }, {
            title: '地址',
            dataIndex: 'storeAddress',
        }, {
            title: '操作',
            width: 60,
            render(row) {
                return <a href="#">删除</a>
            }
        }];
        this.state = {
            loading: false
        }
    }
    componentWillMount() {
        this.loadData({
            pageNo: 1
        });
    }
    componentWillReceiveProps(nextProps) {
        if(!_.isEqual(nextProps.searchData, this.props.searchData)){
            this.loadData({
                ...nextProps.searchData,
                pageNo: 1
            });
        }
    }
    loadData(params) {
        this.setState({
            loading: true
        });
        this.props.dispatch(getOrderList({
            pageNo: this.props.pageNo + 1,
            pageSize: this.props.pageSize,
            ...this.props.searchData,
            ...params
        }, (res) => {
            console.log(res)
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
    render() {
        return (
            <Table
                className='order-table'
                columns={this.columns}
                dataSource={this.props.data}
                pagination={this.getPagination()}
                loading={this.state.loading}
            />
        );
    }
}

/*
 * @Author: pengzhen
 * @Date:   2016-11-11 09:43:06
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-21 15:07:52
 */

'use strict';
import React from 'react';
import {
    connect
} from 'react-redux';

import {
    getCloseShowList,
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
import ProductTable from '../ProductTable/';

const Option = Select.Option;
const InputGroup = Input.Group;

function mapStateToProps({
    productState
}) {
    return {
        data: productState.closeShowData
    };
}

export class CloseShow extends React.Component {
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
    loadData=(params,call)=>{
        this.props.dispatch(getCloseShowList(params, call));
    }
    renderGoodsClassSelect() {
        const { storeId,storeClassId } = this.state.searchData;
        let data = this.props.data;
        let opts = [];
        if (data.storeGoodsClassVoMap) {
            let map = data.storeGoodsClassVoMap[0] || {};
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
        const { dataList,pageNo,pageSize,totalRows }= this.props.data;
        return (
            <Page className='page-product-sale'>
                <Page.Content key='1' tab='下架商品'>
                    <div className="panel">
                        <SearchBar>
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

                        <ProductTable
                            ref={ref=>{this.table = ref; }}
                            pageNo={pageNo}
                            pageSize={pageSize}
                            totalRows={totalRows}
                            dataSource={dataList}
                            searchData={this.state.searchData}
                            onLoad={this.loadData}
                            options={[
                                { title:'查看',onClick:this.checkProduct },
                                { title:'上架',onClick:this.upProduct },
                            ]}
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
)(CloseShow)

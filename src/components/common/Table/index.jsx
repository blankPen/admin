/*
 * @Author: pengzhen
 * @Date:   2016-11-07 13:09:29
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-11 17:57:00
 */

'use strict';
import './index.less';
import React from 'react';
import {
    Table,
    Pagination,
    Button
} from 'antd';
function noop(){};
export default class extends React.Component {
    static propTypes = {
        columns: React.PropTypes.array.isRequired,
        dataSource: React.PropTypes.array.isRequired,
        pagination: React.PropTypes.object,
        emptyText: React.PropTypes.node,
        options: React.PropTypes.array,
    };
    constructor(props) {
        super(props);
    }
    render() {
        const { rowKey,className,columns,dataSource,loading,pagination,emptyText,rowSelection,options } = this.props;
        return (
            <div className={'m-table '+(className||"")}>
                <Table
                    rowKey={rowKey}
                    columns={[
                        ...columns,
                        {
                            className: 'td-options',
                            render(row) {
                                return <div className="option-box">
                                    {options.map((item,i)=>{
                                        let { onClick = noop,title } = item;
                                        return <Button key={i}
                                            type='primary'
                                            onClick={onClick.bind(this,row)}
                                        >
                                            {title}
                                        </Button>
                                    })}
                                </div>
                            }
                        }
                    ]}
                    dataSource={dataSource}
                    loading={loading}
                    pagination={false}
                    rowSelection={rowSelection}
                    locale={{
                        emptyText: emptyText || <div className="table-empty">未找到数据</div>
                    }}
                />
                <div className="pagination-wrap"><Pagination {...pagination} /></div>
            </div>
        );
    }
}

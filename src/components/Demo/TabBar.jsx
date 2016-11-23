/*
 * @Author: pengzhen
 * @Date:   2016-11-10 10:39:31
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-23 09:52:32
 */

'use strict';
import React from 'react';
import Tabs from 'components/common/Tabs';
const TabPane = Tabs.TabPane;
export default class extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            activeKey: 2
        }
    }
    handleChange=(key)=>{
        this.setState({
            activeKey : key
        });
    }
    render() {
        return (
            <div>
                <div style={{width: '45%',float: 'left',margin: 10}} >
                    <h1>不可控tabs</h1>
                    <Tabs defaultActiveKey='2'>
                        <TabPane key='1' tab='TAB 1'>
                            tab1...
                        </TabPane>
                        <TabPane key='2' tab='TAB 2'>
                            tab2...
                        </TabPane>
                        <TabPane key='3' tab='TAB 3'>
                            tab3...
                        </TabPane>
                    </Tabs>
                </div>
                <div style={{width: '45%',float: 'left',margin: 10}} >
                    <h1>可控tabs</h1>
                    <Tabs activeKey={this.state.activeKey} onChange={this.handleChange}>
                        <TabPane key='1' tab='TAB 1'>
                            tab1...
                        </TabPane>
                        <TabPane key='2' tab='TAB 2'>
                            tab2...
                        </TabPane>
                        <TabPane key='3' tab='TAB 3'>
                            tab3...
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}


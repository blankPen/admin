/*
 * @Author: pengzhen
 * @Date:   2016-11-17 09:32:52
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-17 15:58:11
 */

'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import {
    getApplyAgreement
} from 'actions/SignAction';
import SignWrap from '../Wrap';
import {
    Steps,
    Checkbox,
    Button,
    message,
} from 'antd';
const Step = Steps.Step;
import QualificationInfo from './Qualification/';


function mapStateToProps(state) {
    return {

    };
}
export class ApplyStore extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            index: 1
        }
    }
    next = () => {
        const index = this.state.index + 1;
        this.setState({
            index
        });
    }
    prev = () => {
        const index = this.state.index - 1;
        this.setState({
            index
        });
    }
    getSteps() {
        return [{
            title: '签订入驻协议',
            content: <Agreement onNext={this.next}/>
        }, {
            title: '公司资质信息',
            content: <QualificationInfo onPrev={this.prev} onNext={this.next}/>
        }, {
            title: '财务资质信息',
            content: <div>第三步</div>
        }, {
            title: '店铺经营信息',
            content: <div>第四步</div>
        }, {
            title: '店铺开通',
            content: <div>第五步</div>
        }, ]
    }
    render() {
        const steps = this.getSteps();
        return (
            <SignWrap className='page-apply'>
                <div className="step-wrapper">
                    <Steps current={this.state.index}>
                        {steps.map(item => <Step key={item.title} title={item.title} />)}
                    </Steps>
                </div>
                <div className="step-content">
                    {steps[this.state.index].content}
                </div>
            </SignWrap>
        );
    }
}

export default connect(
    mapStateToProps,
    // Implement map dispatch to props
)(ApplyStore)



export class Agreement extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            agreement: '',
            check: true
        }
    }
    componentWillMount() {
        getApplyAgreement((res) => {
            this.setState({
                agreement: res
            });
        });
    }
    toNext = () => {
        if (this.state.check) {
            this.props.onNext && this.props.onNext();
        } else {
            message.warn('请阅读统一协议');
        }
    }
    changeCheck = (e) => {
        this.setState({
            check: e.target.checked
        });
    }
    render() {
        return (
            <div className="apply-agreement">
                <div className="apply-agreement-title">入住协议</div>
                <div className="apply-agreement-content"
                    dangerouslySetInnerHTML={{__html: this.state.agreement}}>
                </div>
                <div className="check-wrapper">
                    <Checkbox
                        checked={this.state.check}
                        onChange={this.changeCheck}>我已阅读并同意以上协议</Checkbox>
                </div>
                <div className="button-wrapper">
                    <Button type='primary' onClick={this.toNext}>企业入住</Button>
                </div>
            </div>
        );
    }
}


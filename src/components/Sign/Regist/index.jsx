/*
 * @Author: pengzhen
 * @Date:   2016-11-07 16:56:17
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-14 09:53:50
 */

'use strict';
import './index.less';
import React from 'react';
import {
    // Form,
    Icon,
    Input,
    Button,
    Checkbox
} from 'antd';
import {
    connect
} from 'react-redux';
import { Link } from 'react-router';
import Form from 'common/VForm/';
import History from 'common/History';
import SignWrap from '../Wrap';

const FormItem = Form.Item;
const createForm = Form.create;

function mapStateToProps(state) {
    return {

    };
}

export class Regist extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }
    handleSubmit = (values) => {
        console.log(values);
        History.push('/');
    }
    render() {
        return (
            <SignWrap className='page-regist'>
                <RegistForm onSubmit={this.handleSubmit} />
            </SignWrap>
        );
    }
}
export default connect(
    mapStateToProps,
    // Implement map dispatch to props
)(Regist)


@createForm()
class RegistForm extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            errorMsg: undefined,
            registType: 'phone',
            count_down_phone: -1,
            count_down_emial: -1,
        }
    }
    componentWillUnmount() {
        clearInterval(this['invId_phone']);
        clearInterval(this['invId_email']);
    }
    // 设置错误信息
    setError(err) {
        if (!err) {
            this.setState({
                errorMsg: undefined
            });
        } else {
            for (var name in err) {
                if (err[name] && err[name].errors) {
                    this.setState({
                        errorMsg: err[name].errors[0].message
                    });
                    return;
                }
            }
        }
    }
    // 改变注册类型，清空表单数据
    changeRegistType=(registType)=>{
        this.setState({
            registType,
            errorMsg: undefined
        });
        this.props.form.resetFields()
    }
    // 提交表单
    submit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmit(values);
                this.setError(null);
            } else {
                this.setError(err);
            }
        })
    }
    // 获取验证码
    getInviteCode=(type)=>{
        const form = this.props.form;

        let sendRequest = ()=>{
            // 发送请求获取验证码
            // type

            this.setState({
                ['count_down_'+type]: 60
            });
            this['invId_'+type] = setInterval(()=>{
                this.setState({
                    ['count_down_'+type]: this.state[['count_down_'+type]]-1
                },()=>{
                    this.state['count_down_'+type] < 0 && clearInterval(this['invId_'+type]);
                });
            },1000)
        }
        form.validateFields([type == 'phone'?'memberPhone':'memberEmail'],(err)=>{
            if(!err){
                sendRequest();
                this.setError(null);
            }else{
                this.setError(err);
            }
        });
    }
    // 校验验证码是否正确
    checkCaptcha=(rule,value,call)=>{
        if(value == '1234'){
            call();
        }else{
            call(new Error('验证码错误'));
        }
    }
    render() {
        const curType = this.state.registType;
        return (
            <Form key={curType} onSubmit={this.submit} className="regist-form" >
                <div className="top">
                    <span className={"title"+(curType == 'phone'?' active':'')}
                        onClick={this.changeRegistType.bind(this,'phone')}>手机注册</span>
                    <span className="space-line"></span>
                    <span className={"title"+(curType == 'email'?' active':'')}
                        onClick={this.changeRegistType.bind(this,'email')}>邮箱注册</span>
                </div>
                <FormItem
                    className='form-item item-invite'
                    help={false}
                >
                    <label>邀请码</label>
                    <Input name='invite_code' />
                </FormItem>
                {curType=='phone'?
                    <FormItem
                        className='form-item'
                        help={false}
                        rules={{
                            required: '手机号不能为空',
                            phone: true
                        }}
                    >
                        <label>手机号</label>
                        <Input name='memberPhone' />
                    </FormItem> :
                    <FormItem
                        className='form-item'
                        help={false}
                        rules={{
                            required: '邮箱不能为空',
                            email: true
                        }}
                    >
                        <label>邮箱</label>
                        <Input name='memberEmail' />
                    </FormItem>
                }
                <FormItem
                    className='form-item'
                    help={false}
                    ruleType='password'
                >
                    <label>密码</label>
                    <Input name='password' type='password' />
                </FormItem>
                <FormItem
                    className='form-item'
                    help={false}
                    ruleType='password'
                >
                    <label>确认密码</label>
                    <Input name='rest' type='password' />
                </FormItem>
                <FormItem
                    className='form-item item-captcha'
                    help={false}
                    rules={{
                        validator: this.checkCaptcha
                    }}
                >
                    <label>验证码</label>
                    {this.state[`count_down_${curType}`] >= 0 ?
                        <span className="get-code in-time">
                            {this.state[`count_down_${curType}`]}
                        </span> :
                        <span className="get-code"
                            onClick={this.getInviteCode.bind(this,curType)}>获取验证码</span>}
                    <Input name='code'/>
                </FormItem>
                <div className="error-msg">{this.state.errorMsg}</div>
                <button className="submit-btn">注册</button>
                <div className="control-box">
                    <span className="">
                        已有账号，<Link to='/login'>去登录</Link>
                    </span>
                    <span className="fl-r">
                        <a href="#">找回密码</a>
                    </span>
                </div>
            </Form>
        );
    }
}

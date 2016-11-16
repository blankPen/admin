/*
 * @Author: pengzhen
 * @Date:   2016-11-07 16:56:17
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-16 11:35:52
 */

'use strict';
import './index.less';
import React from 'react';
import {
    message,
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
import { regist,findCode } from 'actions/commonAction';

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
    handleSubmit = (values,call) => {
        console.log(values);
        this.props.dispatch(regist(values,(res)=>{
            if(res.result == 1){
                message.success(res.msg);
                History.push('/');
            }else{
                call(res);
            }
        }));
    }
    render() {
        return (
            <SignWrap className='page-regist'>
                <RegistForm onSubmit={this.handleSubmit} dispatch={this.props.dispatch} />
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
            captcha: undefined,
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
    // // 改变注册类型，清空表单数据
    // changeRegistType=(registType)=>{
    //     this.setState({
    //         registType,
    //         errorMsg: undefined
    //     });
    //     this.props.form.resetFields();
    // }
    // 提交表单
    submit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setError(null);
                this.props.onSubmit({
                    mobile: values.mobile,
                    password: values.password
                },(res)=>{
                    this.setState({
                        errorMsg: res.msg
                    });
                });
            } else {
                this.setError(err);
            }
        })
    }
    checkRepassword=(rule,value,call)=>{
        const form = this.props.form;
        if(value == form.getFieldValue('password')){
            call();
        }else{
            call(new Error('确认密码与密码不一致'));
        }
    }
    // 获取验证码
    // getInviteCode=(type)=>{
    //     const form = this.props.form;

    //     let sendRequest = ()=>{
    //         // 发送请求获取验证码
    //         // type
    //         this.props.dispatch(findCode({
    //             mobile: form.getFieldValue('mobile'),
    //             curStr: Date.now(),
    //         },(res)=>{
    //             this.setState({
    //                 captcha: res.data
    //             });
    //         }))
    //         this.setState({
    //             count_down_phone: 60
    //         });
    //         this.invId_phone = setInterval(()=>{
    //             this.setState({
    //                 count_down_phone: this.state.count_down_phone-1
    //             },()=>{
    //                 this.statecount_down_phone < 0 && clearInterval(this.invId_phone);
    //             });
    //         },1000)
    //     }
    //     form.validateFields(['mobile'],(err)=>{
    //         if(!err){
    //             sendRequest();
    //             this.setError(null);
    //         }else{
    //             this.setError(err);
    //         }
    //     });
    // }
    // 校验验证码是否正确
    // checkCaptcha=(rule,value,call)=>{
    //     let captcha = this.state.captcha;
    //     if(captcha){
    //         if(value == captcha){
    //             call();
    //         }else{
    //             call(new Error('验证码错误'));
    //         }
    //     }else{
    //         call(new Error('请先获取验证码'));
    //     }
    // }
    render() {
        const curType = this.state.registType;
        return (
            <Form key={curType} onSubmit={this.submit} className="regist-form" >
                {/*<div className="top">
                    <span className={"title"+(curType == 'phone'?' active':'')}
                        onClick={this.changeRegistType.bind(this,'phone')}>手机注册</span>
                    <span className="space-line"></span>
                    <span className={"title"+(curType == 'email'?' active':'')}
                        onClick={this.changeRegistType.bind(this,'email')}>邮箱注册</span>
                </div>*/}
                {/*<FormItem
                    className='form-item item-invite'
                    help={false}
                >
                    <label>邀请码</label>
                    <Input name='invite_code' />
                </FormItem>*/}
                <FormItem
                    className='form-item'
                    help={false}
                    rules={{
                        required: '手机号不能为空',
                        phone: true
                    }}
                >
                    <label>手机号</label>
                    <Input name='mobile' />
                </FormItem>
                {/*curType=='phone'?
                    <FormItem
                        className='form-item'
                        help={false}
                        rules={{
                            required: '手机号不能为空',
                            phone: true
                        }}
                    >
                        <label>手机号</label>
                        <Input name='mobile' />
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
                */}
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
                    rules={{
                        required: '确认密码不能为空',
                        validator: this.checkRepassword
                    }}
                >
                    <label>确认密码</label>
                    <Input name='repassword' type='password' />
                </FormItem>
                {/*<FormItem
                    className='form-item item-captcha'
                    help={false}
                    validateTrigger='onSubmit'
                    rules={{
                        validator: this.checkCaptcha
                    }}
                >
                    <label>验证码</label>
                    {this.state[`count_down_phone`] >= 0 ?
                        <span className="get-code in-time">
                            {this.state[`count_down_phone`]}
                        </span> :
                        <span className="get-code"
                            onClick={this.getInviteCode}>获取验证码</span>}
                    <Input name='code'/>
                </FormItem>*/}
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

/*
 * @Author: pengzhen
 * @Date:   2016-11-07 16:56:17
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-17 17:06:01
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
import { Link } from 'react-router';
import {
    connect
} from 'react-redux';
import Form from 'common/VForm/';
import History from 'common/History';
import SignWrap from '../Wrap';
import { login } from 'actions/commonAction';

const FormItem = Form.Item;
const createForm = Form.create;

function mapStateToProps(state) {
    return {

    };
}

export class Login extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }
    handleSubmit = (values,callback) => {
        this.props.dispatch(login(values,callback))
    }
    render() {
        return (
            <SignWrap className='page-login'>
                <LoginForm onSubmit={this.handleSubmit} />
            </SignWrap>
        );
    }
}
export default connect(
    mapStateToProps,
    // Implement map dispatch to props
)(Login)


@createForm()
class LoginForm extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            errorMsg: undefined,
            captchaImg: undefined,
        }
    }
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
    submit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmit(values,(res)=>{
                    if(res.result == 1){
                        this.setError(null);
                        History.push('/');
                    }else if(res.result == 3){
                        History.push({
                            pathname: '/apply',
                            state: {
                                ...res.data
                            }
                        });
                    }else{
                        this.setState({
                            errorMsg: res.msg
                        });
                    }
                });
            } else {
                this.setError(err);
            }
        })
    }
    render() {

        return (
            <Form onSubmit={this.submit} className="login-form" >
                <FormItem
                    className='form-item'
                    help={false}
                    ruleType='username'
                >
                    <Icon type="user" />
                    <Input name='sellerName' placeholder="手机/用户名/邮箱" />
                </FormItem>
                <FormItem
                    className='form-item'
                    help={false}
                    ruleType='password'
                >
                    <Icon type="lock" />
                    <Input name='password' type='password' placeholder="请输入密码" />
                </FormItem>
                <div className="error-msg">{this.state.errorMsg}</div>
                <div className="control-box">
                    <span className="remember-box">
                        <Checkbox >下次自动登录</Checkbox>
                    </span>
                    <span className="forget-box">
                        <a href="#">找回密码</a>
                    </span>
                </div>
                <button className="submit-btn">登录</button>
                <Link to='/regist' className="regist-btn">没有账号？10秒完成注册</Link>
            </Form>
        );
    }
}

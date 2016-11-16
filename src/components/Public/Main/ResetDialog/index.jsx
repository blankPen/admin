/*
 * @Author: pengzhen
 * @Date:   2016-11-09 14:18:49
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-09 15:14:42
 */

'use strict';
import './index.less';
import React from 'react';
import {
    connect
} from 'react-redux';
import {
    Modal
} from 'antd';
import Form from 'common/VForm/';
import { Input } from 'antd';
import { togglePasswordDialog } from 'actions/commonAction';
const FormItem = Form.Item;

function mapStateToProps({common}) {
    return {
        isOpenResetPassword: common.isOpenResetPassword
    };
}

export class ResetDialog extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }
    resetPassword(values){

    }
    handleOk=()=>{
        this.refs.form.validateFields((err,values)=>{
            console.log(values)
            if(err){
                this.handleCancel();
            }
        })
    }
    handleCancel=()=>{
        this.props.dispatch(togglePasswordDialog(false));
        this.refs.form.resetFields();
    }
    render() {
        return (
            <Modal
                title="修改密码"
                className='reset-password-modal'
                visible={this.props.isOpenResetPassword}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width={450}
            >
                <ResetForm ref='form' onSubmit={this.resetPassword} />
            </Modal>
        );
    }
}

export default connect(
    mapStateToProps,
    // Implement map dispatch to props
)(ResetDialog)

const ResetForm = Form.create()(class extends React.Component {
    checkNewPass=(rule,value,call)=>{
        setTimeout(()=>{
            if(value == '123456'){
                call(new Error('新密码不能于旧密码相同'));
            }else{
                call();
            }
        },1000)
    }
    checkRePass=(rule,value,call)=>{
        let form = this.props.form;
        if(form.getFieldValue('password') !== value){
            call(new Error('两次输入密码不一致'));
        }else{
            call();
        }
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        };
        return (
            <Form className='reset-password-form'>
                <FormItem
                    {...formItemLayout}
                    label="旧密码"
                    ruleType='password'
                    hasFeedback
                >
                    <Input type='password' name='old_password' />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="新密码"
                    hasFeedback
                    rules={{
                        ruleType: 'password',
                        validator: this.checkNewPass
                    }}
                >
                    <Input type='password' name='password' />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="确认密码"
                    hasFeedback
                    rules={{
                        ruleType: 'password',
                        validator: this.checkRePass
                    }}
                >
                    <Input type='password' name='reset' />
                </FormItem>
            </Form>
        )
    }
});

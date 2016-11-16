/*
 * @Author: pengzhen
 * @Date:   2016-11-08 14:26:46
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-09 14:44:17
 */

'use strict';
import React from 'react';
import Form from 'common/VForm/';
import {
    Input,
    Button,
    Checkbox
} from 'antd';
const FormItem = Form.Item;
const createForm = Form.create;

@createForm()
class DemoForm extends React.Component {
    ajaxCheck(rule,value,callback){
        setTimeout(()=>{
            if(value == 'username'){
                callback();
            }else{
                callback(new Error('自定义异步验证'))
            }
        },1000)
    }
    submit=(e)=>{
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err,values)=>{
            console.log(err)
            console.log(values)
        });
    }
    render(){
        return (
            <Form style={{ width: 400,margin: '40px auto' }} onSubmit={this.submit}>
                <FormItem hasFeedback
                    name='name1'
                    rules={{
                        required: true
                    }}
                >
                    <Input placeholder="简单用法" />
                </FormItem>
                <FormItem hasFeedback
                    name='name2'
                    rules={{
                        required: '自定义Message'
                    }}
                >
                    <Input placeholder="简单用法2" />
                </FormItem>
                <FormItem hasFeedback
                    name='name3'
                    rules={{
                        required: '自定义Message',
                        email: true
                    }}
                >
                    <Input placeholder="复合用法" />
                </FormItem>
                <FormItem hasFeedback
                    name='name4'
                    rules={{
                        required: true,
                        number: true,
                        min: { value: 4 },
                        max: { value: 100,errorMsg:'数字不能大于100~boom~shakalaka~' },
                    }}
                >
                    <Input placeholder="带参数自定义错误信息用法" />
                </FormItem>
                <FormItem hasFeedback
                    name='name5'
                    rules={{
                        required: true,
                        realName: '请输入真实姓名',
                        rangelength: {
                            min: 2,
                            max: 4,
                            errorMsg: "请输入长度在 {min} 到 {max} 之间的字符串"
                        },
                    }}
                >
                    <Input placeholder="带参数自定义错误信息用法(带正则)" />
                </FormItem>
                <FormItem hasFeedback
                    name='name6'
                    validateTrigger='onChange'
                    initialValue ="默认参数"
                    rules={{
                        required: true,
                        validator: this.ajaxCheck
                    }}
                >
                    <Input placeholder="带参数自定义错误信息用法(带正则)" />
                </FormItem>
                <FormItem>
                    <Button htmlType='submit' className="submit-btn">
                        登录
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

export default DemoForm;

/*
 * @Author: pengzhen
 * @Date:   2016-11-08 14:26:46
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-21 11:38:16
 */

'use strict';
import React from 'react';
import Form from 'common/VForm/';
import {
    Steps,
    Input,
    Button,
    Radio,
    Checkbox,
    message,
    Row,
    Col,
    Cascader,
    DatePicker,
    Select,
    Upload,
    Icon,
} from 'antd';
import UploadModal from 'components/common/UploadModal';
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
@createForm()
class DemoForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showUpload: false
        };
    }
    ajaxCheck(rule,value,callback){
        setTimeout(()=>{
            if(value == 'username'){
                callback();
            }else{
                callback(new Error('自定义异步验证'))
            }
        },1000)
    }
    handleUpload=()=>{
        this.toggleUpload();
    }
    toggleUpload=(flag)=>{
        this.setState({
            showUpload: !this.state.showUpload
        });
    }
    submit=(e)=>{
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err,values)=>{
            console.log(err)
            console.log(values)
        });
    }
    render(){
        const uploadProps = {
            action: '/upload.do',
            listType: 'picture',
            defaultFileList: [],
            onChange: ({file,fileList,event})=>{
                if (file.status !== 'uploading') {
                    if(file.status == 'done'){
                        message.success('上传成功');
                    }else if(file.status == 'error'){
                        message.error('上传失败');
                    }
                }
            }
        };
        return (
            <Form style={{ width: 980,margin: '40px auto',textAlign: 'center'}} onSubmit={this.submit}>
                <UploadModal
                    title='上传文件'
                    visible={this.state.showUpload}
                    onCancel={this.toggleUpload}
                    uploadProps={uploadProps}
                />
                <div style={{overflow: 'hidden',textAlign: 'left'}}>
                    <div style={{width: '50%',float: 'left',padding: 10 }} >
                        <h1>简单组件</h1>
                        <FormItem hasFeedback
                            label='简单用法'
                            rules={{
                                required: true
                            }}
                        >
                            <Input name='name1' placeholder="简单用法" />
                        </FormItem>
                        <FormItem hasFeedback
                            label='自定义Message'
                            rules={{
                                required: '自定义Message'
                            }}
                        >
                            <Input name='name2' placeholder="简单用法2" />
                        </FormItem>
                        <FormItem hasFeedback
                            label='复合用法'
                            rules={{
                                required: '自定义Message',
                                email: true
                            }}
                        >
                            <Input name='name3' placeholder="复合用法" />
                        </FormItem>
                        <FormItem hasFeedback
                            label='带参数用法'
                            rules={{
                                required: true,
                                number: true,
                                min: { value: 4 },
                                max: { value: 100,errorMsg:'数字不能大于100~boom~shakalaka~' },
                            }}
                        >
                            <Input name='name4' placeholder="带参数自定义错误信息用法" />
                        </FormItem>
                        <FormItem hasFeedback
                            label='带参数正则用法'
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
                            <Input name='name5' placeholder="带参数自定义错误信息用法(带正则)" />
                        </FormItem>
                        <FormItem hasFeedback
                            label='默认值'
                            validateTrigger='onBlur'
                            initialValue ="username"
                            rules={{
                                required: true,
                                validator: this.ajaxCheck
                            }}
                        >
                            <Input name='name6' placeholder="带参数自定义错误信息用法(带正则)" />
                        </FormItem>
                    </div>
                    <div style={{width: '50%',float: 'left',padding: 10 }} >
                        <h1>复杂组件</h1>

                        <FormItem
                            label='日期组件'
                            rules={{
                                required: '不能为空',
                            }}
                        >
                            <DatePicker style={{width: '100%'}} name='date' />
                        </FormItem>
                        <FormItem
                            label='日期范围'
                            rules={{
                                required: '不能为空',
                            }}
                        >
                            <RangePicker style={{width: '100%'}} name='dateRange' />
                        </FormItem>
                        <FormItem
                            label='下拉组件'
                            rules={{
                                required: '不能为空',
                            }}
                            initialValue='1'
                        >
                            <Select style={{width: '100%'}} name='select'>
                                <Option value="1">option 1</Option>
                                <Option value="2">option 2</Option>
                            </Select>
                        </FormItem>
                        <FormItem
                            label='单选'
                            valuePropName='checked'
                            initialValue={true}
                        >
                            <Checkbox name='sigle-check'>Remember me</Checkbox>
                        </FormItem>
                        <FormItem
                            label='单选组'
                            initialValue={1}
                        >
                            <RadioGroup name='single-group' onChange={this.onChange}>
                              <Radio value={1}>A</Radio>
                              <Radio value={2}>B</Radio>
                              <Radio value={3}>C</Radio>
                              <Radio value={4}>D</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem
                            label='多选组'
                            initialValue={['Apple']}
                        >
                            <CheckboxGroup name='multiple-group' options={[
                              { label: 'Apple', value: 'Apple' },
                              { label: 'Pear', value: 'Pear' },
                              { label: 'Orange', value: 'Orange' },
                            ]}/>
                        </FormItem>
                        <FormItem hasFeedback
                            label='上传组件'
                            rules={{
                                required: '上传文件不能为空',
                            }}
                        >
                            <Input name='upload' type='hidden' />
                            <Button type="ghost" onClick={this.handleUpload}>
                                <Icon type="upload" /> 点击上传文件
                            </Button>
                        </FormItem>

                    </div>
                </div>
                <Button htmlType='submit' className="submit-btn">
                    点击提交，验证表单获取参数
                </Button>
            </Form>
        );
    }
}

export default DemoForm;

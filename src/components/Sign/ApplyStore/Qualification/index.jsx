/*
* @Author: pengzhen
* @Date:   2016-11-17 10:58:36
* @Desc: this_is_desc
* @Last Modified by:   pengzhen
* @Last Modified time: 2016-11-17 16:21:03
*/

'use strict';
import React from 'react';
import {
    Steps,
    Input,
    Button,
    Checkbox,
    message,
    Row,
    Col,
    Cascader,
    DatePicker,
    Upload,
    Icon,
} from 'antd';
import Form from 'common/VForm';
import Tabs from 'components/common/Tabs';
import UploadModal from 'components/common/UploadModal';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const createForm = Form.create;
const RangePicker = DatePicker.RangePicker;

export default class QualificationInfo extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            activeKey: 1
        }
    }
    changeTabs=(key)=>{
        this.setState({
            activeKey: key
        });
    }
    next=()=>{
        this.form.validateFieldsAndScroll((err,values)=>{
            console.log(err)
            console.log(values)
        });
    }
    render() {
        return (
            <div className='qualification-info'>
                <InfoForm ref={ref=>{this.form = ref;}} />
                <div className="button-wrapper">
                    <Button onClick={this.props.onPrev}>上一步</Button>
                    <Button type='primary' onClick={this.next}>确认信息</Button>
                </div>
            </div>
        );
    }
}


const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

@createForm()
class InfoForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showUpload: false
        };
    }
    submit=(e)=>{
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err,values)=>{
            console.log(err)
            console.log(values)
        });
    }
    toggleUpload=(flag)=>{
        this.setState({
            showUpload: !this.state.showUpload
        });
    }
    handleUpload=()=>{
        this.toggleUpload();
    }
    render(){
        const formItemLayout = {labelCol: {span: 8 }, wrapperCol: {span: 16 }, };
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
            <Form onSubmit={this.submit}>
                <UploadModal
                    title='上传图片'
                    visible={this.state.showUpload}
                    onCancel={this.toggleUpload}
                    uploadProps={uploadProps}
                />
                <div className='form-block'>
                    <h4 className="block-title">店铺经营信息</h4>
                    <Row className="block-content">
                        <Col className='item-wrapper' span='12'>
                            <FormItem hasFeedback
                                {...formItemLayout}
                                label='公司名称'
                                rules={{
                                    required: '公司名称不能为空',
                                }}
                            >
                                <Input name='companyName' placeholder="公司名称" />
                            </FormItem>
                        </Col>
                        <Col className='item-wrapper' span='12'>
                            <FormItem
                                {...formItemLayout}
                                label='公司所在地'
                                valueType='array'
                                rules={{
                                    required: '公司所在地不能为空',
                                }}
                            >
                                <Cascader
                                    name='companyAddress'
                                    options={options}
                                    onChange={this.changeAddress}
                                    placeholder="选择公司所在地" />
                            </FormItem>
                        </Col>
                        <Col className='item-wrapper' span='12'>
                            <FormItem hasFeedback
                                {...formItemLayout}
                                label='详细地址'
                                rules={{
                                    required: '公司详细地址不能为空',
                                }}
                            >
                                <Input name='companyAddressDetail' />
                            </FormItem>
                        </Col>
                        <Col className='item-wrapper' span='12'>
                            <FormItem hasFeedback
                                {...formItemLayout}
                                label='电子邮箱'
                                rules={{
                                    required: '电子邮箱不能为空',
                                    email: true
                                }}
                            >
                                <Input name='contactsEmail' />
                            </FormItem>
                        </Col>
                        <Col className='item-wrapper' span='12'>
                            <FormItem hasFeedback
                                {...formItemLayout}
                                label='公司电话'
                                rules={{
                                    required: '公司电话不能为空',
                                    phone: true
                                }}
                            >
                                <Input name='companyPhone' />
                            </FormItem>
                        </Col>
                        <Col className='item-wrapper' span='12'>
                            <FormItem hasFeedback
                                {...formItemLayout}
                                label='联系人姓名'
                                rules={{
                                    required: '联系人姓名不能为空',
                                }}
                            >
                                <Input name='contactsName' />
                            </FormItem>
                        </Col>
                        <Col className='item-wrapper' span='12'>
                            <FormItem hasFeedback
                                {...formItemLayout}
                                label='联系人电话'
                                rules={{
                                    required: '联系人电话不能为空',
                                    phone: true
                                }}
                            >
                                <Input name='contactsPhone' />
                            </FormItem>
                        </Col>
                        <Col className='item-wrapper' span='12'>
                            <FormItem hasFeedback
                                {...formItemLayout}
                                label='员工总数'
                                rules={{
                                    required: '员工总数不能为空'
                                }}
                            >
                                <Input name='companyEmployeeCount' />
                            </FormItem>
                        </Col>
                        <Col className='item-wrapper' span='12'>
                            <FormItem hasFeedback
                                {...formItemLayout}
                                label='注册资金'
                                rules={{
                                    required: '注册资金不能为空',
                                    number: true
                                }}
                            >
                                <Input name='companyRegisteredCapital' />
                            </FormItem>
                        </Col>
                    </Row>
                </div>

                <div className='form-block'>
                    <h4 className="block-title">营业执照信息（副本）</h4>
                    <Row className="block-content">
                        <Col className='item-wrapper' span='12'>
                            <FormItem hasFeedback
                                {...formItemLayout}
                                label='营业执照号'
                                rules={{
                                    required: '不能为空',
                                }}
                            >
                                <Input name='businessLicenceNumber' />
                            </FormItem>
                        </Col>
                        <Col className='item-wrapper' span='12'>
                            <FormItem
                                {...formItemLayout}
                                label='营业执照有效期'
                                valueType='array'
                                rules={{
                                    required: '不能为空',
                                }}
                            >
                                <RangePicker name='businessLicenceTime' />
                            </FormItem>
                        </Col>
                        <Col className='item-wrapper' span='12'>
                            <FormItem
                                {...formItemLayout}
                                label='法定经营范围'
                                rules={{
                                    required: '不能为空',
                                }}
                            >
                                <Input name='businessSphere' type="textarea" />
                            </FormItem>
                        </Col>
                        <Col className='item-wrapper' span='12'>
                            <FormItem hasFeedback
                                {...formItemLayout}
                                label='营业执照电子版'
                                rules={{
                                    required: '不能为空',
                                }}
                            >
                                <Input name='businessLicenceNumberElectronic' type='hidden'/>
                                <Button size='small' type="ghost" onClick={this.handleUpload}>
                                    <Icon type="upload" /> 点击上传文件
                                </Button>
                            </FormItem>
                        </Col>

                    </Row>
                </div>
                <div className='form-block'>
                    <h4 className="block-title">组织机构代码证</h4>
                    <Row className="block-content">
                        <Col className='item-wrapper' span='12'>
                            <FormItem hasFeedback
                                {...formItemLayout}
                                label='组织机构代码'
                                rules={{
                                    required: '不能为空',
                                }}
                            >
                                <Input name='organizationCode' />
                            </FormItem>
                        </Col>
                        <Col className='item-wrapper' span='12'>
                            <FormItem hasFeedback
                                {...formItemLayout}
                                label='组织机构代码证电子版'
                                rules={{
                                    required: '不能为空',
                                }}
                            >
                                <Input name='organizationCodeElectronic' type='hidden' />
                                <Button size='small' type="ghost" onClick={this.handleUpload}>
                                    <Icon type="upload" /> 点击上传文件
                                </Button>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <div className='form-block'>
                    <h4 className="block-title">一般纳税人证明</h4>
                    <Row className="block-content">
                        <Col className='item-wrapper' span='12'>
                            <FormItem hasFeedback
                                {...formItemLayout}
                                label='一般纳税人证明'
                                rules={{
                                    required: '不能为空',
                                }}
                            >
                                <Input name='generalTaxpayer' type='hidden' />
                                <Button size='small' type="ghost" onClick={this.handleUpload}>
                                    <Icon type="upload" /> 点击上传文件
                                </Button>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
            </Form>
        );
    }
}

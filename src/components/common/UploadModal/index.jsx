/*
 * @Author: pengzhen
 * @Date:   2016-11-17 15:13:23
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-11-17 15:50:48
 */

'use strict';
import React from 'react';
import {
    Modal,
    Upload,
    Button,
    Icon,
} from 'antd';
export default class UploadModal extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        let props = {...this.props};
        let uploadProps = props.uploadProps;
        delete props.uploadProps;
        return (
            <Modal
                {...props}
                className='upload-modal'
                footer={false}
                width={640}
            >
                <Upload {...uploadProps}>
                    <Button type="ghost">
                        <Icon type="upload" /> 选择文件
                    </Button>
                </Upload>
            </Modal>
        );
    }
}

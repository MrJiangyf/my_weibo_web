import { Form, Icon, Input, Button, message, Upload } from 'antd';
import React, { useState, useEffect }  from 'react'
import {uploadInter} from "../../api/until";
import config from "../../config";
import {changeInfoInter} from "../../api/login.js";
class NormalLoginForm extends React.Component {
    state = {
        picture: "",
        uploading: false,
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                changeInfoInter( {
                    nickName: values.nickName, //别名
                    city: values.city,
                    picture: this.state.picture ? this.state.picture : "",
                }).then(res => {
                    if(res.code == 200) {
                        message.success(`编辑成功`);
                        this.props.closeCgInfoDialog();
                    }else{
                        message.error(`编辑失败，${res && res.msg}`);
                    }
                })
                console.log('Received values of form: ', values);

            }
        });
    };

    closeHandle = () => {
        this.props.closeCgInfoDialog();
    }

    uploadPicture = async (file) => {
        let query = new FormData();
        query.append("file", file);
        let picUrl = await uploadInter(query).then(res => {
            if(res.code == 200) {
                return `${config.baseApi}${res.data.url}`;
            }
        });
        this.setState({
            picture: picUrl
        })
    }

    render() {
        // 表单相关
        const { getFieldDecorator } = this.props.form;
        const _this = this;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 30 },
                sm: { span: 12 },
            },
        };
        // 上传头像相关
        const { uploading, picture } = this.state;
        const props = {
            showUploadList: false,
            beforeUpload: file => {
                this.uploadPicture(file);
                return false;
            },
        };

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="login-form">
                <Form.Item label='别名'>
                    {getFieldDecorator('nickName', {
                        rules: [{ required: true, message: '请先输入别名!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请先输入别名"
                        />,
                    )}
                </Form.Item>
                <Form.Item label='城市'>
                    {getFieldDecorator('city', {
                        rules: [{ required: true, message: '请先输入所在城市!' }],
                    })(
                        <Input placeholder="请先输入所在城市"/>,
                    )}
                </Form.Item>
                <Form.Item label='头像'>
                    {getFieldDecorator('picture')(
                        <div>
                            <Upload {...props}>
                                <Button>
                                    <Icon type="upload" /> 上传头像
                                </Button>
                            </Upload>
                        </div>
                    )}
                    {picture && <img style={{width: '100px', height: '100px'}} src={picture}/>}
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                     xs: { span: 24, offset: 0 },
                     sm: { span: 16, offset: 8 },
                    }}>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{marginRight: '6px'}}>
                        保存
                    </Button>
                    <Button onClick={this.closeHandle}>
                        取消
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const EditInfoForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default EditInfoForm;

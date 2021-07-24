import { Form, Icon, Input, Button, message, Upload } from 'antd';
import React, { useState, useEffect }  from 'react'
import {changePasswordInter} from "../../api/login.js";

class NormalLoginForm extends React.Component {
    state = {
        picture: "",
        uploading: false,
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
               changePasswordInter(values).then(res => {
                  if(res && res.code == 200) {
                      message.success(`修改成功`);
                      this.props.closeCgInfoDialog();
                  }else {
                      message.error(`${res && res.msg}`);
                  }
               })
            }
        });
    };

    closeHandle = () => {
        this.props.closeCgInfoDialog();
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

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="login-form">
                <Form.Item label='旧密码'>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请先输入旧密码!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请先输入旧密码"
                        />,
                    )}
                </Form.Item>
                <Form.Item label='新密码'>
                    {getFieldDecorator('newPassword', {
                        rules: [{ required: true, message: '请先输入新密码!' }],
                    })(
                        <Input placeholder="请先输入新密码"/>,
                    )}
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

const EditPassword = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default EditPassword;

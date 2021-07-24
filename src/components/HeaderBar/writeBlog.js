import React from 'react'
import {uploadInter} from "../../api/until";
import config from "../../config";
import {changeInfoInter} from "../../api/login.js";
import {getEnumsInter, createInter} from "../../api/blog.js";

import { Form, Icon, Input, Button, message, Upload, Select} from 'antd';
const { Option } = Select;
const { TextArea } = Input;

class NormalLoginForm extends React.Component {
    state = {
        picture: "",
        uploading: false,
        enumsList: []
    };

    componentDidMount() {
        //获取博客类型枚举值
        getEnumsInter().then(res => {
            if(res && res.code == 200) {
                this.setState({
                    enumsList: res.data
                })
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                debugger
                createInter({
                    image: this.state.picture ? this.state.picture : "",
                    content: values.content,
                    title: values.title,
                    type: values.type,
                }).then(res => {
                    if(res && res.code == 200) {
                        message.success(`保存成功`);
                        this.props.closeCgInfoDialog();
                    }else{
                        message.error(`保存成功，${res && res.msg}`);
                    }
                })

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
        let {enumsList} = this.state;
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

        // 类型下拉菜单
        const handleChange = (value) => {
            console.log(`selected ${value}`);
        }
        const optionList = enumsList.map((item,index) => {
            return (<Option value={item.code} key={index}>{item.label}</Option>);
        })


        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="login-form">
                <Form.Item label='标题'>
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: '请先输入标题!' }],
                    })(
                        <Input placeholder="请先输入标题"/>,
                    )}
                </Form.Item>
                <Form.Item label='内容'>
                    {getFieldDecorator('content', {
                        rules: [{ required: true, message: '请先输入所在城市!' }],
                    })(
                        <TextArea rows={4} placeholder="请先输入所在城市"/>
                    )}
                </Form.Item>
                <Form.Item label='类型'>
                    {getFieldDecorator('type', {
                        rules: [{ required: true, message: '请先选择博客类型' }],
                    })(
                        <Select onChange={handleChange} placeholder="请先选择博客类型">
                            {optionList}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label='图片'>
                    {getFieldDecorator('image')(
                        <div>
                            <Upload {...props}>
                                <Button>
                                    <Icon type="upload" /> 上传图片
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

const WriteBLog = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WriteBLog;

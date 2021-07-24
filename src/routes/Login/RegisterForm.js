import React from 'react'
import { Form, Input, message } from 'antd'
import { inject, observer } from 'mobx-react/index'
import { calculateWidth } from '../../utils/utils'
import PromptBox from '../../components/PromptBox'

import {isExistInter, registerInter, loginInter} from "../../api/login.js";

@inject('appStore') @observer @Form.create()
class RegisterForm extends React.Component {
  state = {
    focusItem: -1
  }
  registerSubmit = (e) => {
    e.preventDefault()
    this.setState({
      focusItem: -1
    })
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const users = this.props.appStore.users
        // 检测用户名是否存在
        debugger
        const result = await isExistInter({
          userName: values.registerUsername
        }).then(res => {
          return res
        });
        if (result && result.msg === '用户名不可以使用') {
          this.props.form.setFields({
            registerUsername: {
              value: values.registerUsername,
              errors: [new Error('用户名已存在')]
            }
          })
          return
        }

        await registerInter({
          userName: values.registerUsername,
          password: values.registerPassword,
          gender: 2, //1男生， 2女生
        }).then(res => {
            if(res.code == 200) {
              const obj = [...this.props.appStore.users, {
                username: values.registerUsername,
                password: values.registerPassword
              }]
              localStorage.setItem('users', JSON.stringify(obj))
              this.props.appStore.initUsers()
              message.success('注册成功')
            }else{
              message.error(`注册失败，${res.msg}`);
            }
        });
      }
    })
  }
  gobackLogin = () => {
    this.props.switchShowBox('login')
    setTimeout(() => this.props.form.resetFields(), 500)
  }

  render () {
    const {getFieldDecorator, getFieldError, getFieldValue} = this.props.form
    const {focusItem} = this.state
    return (
      <div className={this.props.className}>
        <h3 className='title'>管理员注册</h3>
        <Form onSubmit={this.registerSubmit}>
          <Form.Item help={getFieldError('registerUsername') && <PromptBox info={getFieldError('registerUsername')}
                                                                           width={calculateWidth(getFieldError('registerUsername'))}/>}>
            {getFieldDecorator('registerUsername', {
              validateFirst: true,
              rules: [
                {required: true, message: '用户名不能为空'},
                {pattern: '^[^ ]+$', message: '不能输入空格'},
              ]
            })(
              <Input
                onFocus={() => this.setState({focusItem: 0})}
                onBlur={() => this.setState({focusItem: -1})}
                maxLength={16}
                placeholder='用户名'
                addonBefore={<span className='iconfont icon-User' style={focusItem === 0 ? styles.focus : {}}/>}/>
            )}
          </Form.Item>
          <Form.Item help={getFieldError('registerPassword') && <PromptBox info={getFieldError('registerPassword')}
                                                                           width={calculateWidth(getFieldError('registerPassword'))}/>}>
            {getFieldDecorator('registerPassword', {
              validateFirst: true,
              rules: [
                {required: true, message: '密码不能为空'},
                {pattern: '^[^ ]+$', message: '密码不能有空格'}
              ]
            })(
              <Input
                onFocus={() => this.setState({focusItem: 1})}
                onBlur={() => this.setState({focusItem: -1})}
                type='password'
                maxLength={16}
                placeholder='密码'
                addonBefore={<span className='iconfont icon-suo1' style={focusItem === 1 ? styles.focus : {}}/>}/>
            )}
          </Form.Item>
          <Form.Item help={getFieldError('confirmPassword') && <PromptBox info={getFieldError('confirmPassword')}
                                                                          width={calculateWidth(getFieldError('confirmPassword'))}/>}>
            {getFieldDecorator('confirmPassword', {
              validateFirst: true,
              rules: [
                {required: true, message: '请确认密码'},
                {
                  validator: (rule, value, callback) => {
                    if (value && value !== getFieldValue('registerPassword')) {
                      callback('两次输入不一致！')
                    }
                    callback()
                  }
                },
              ]
            })(
              <Input
                onFocus={() => this.setState({focusItem: 2})}
                onBlur={() => this.setState({focusItem: -1})}
                type='password'
                maxLength={16}
                placeholder='确认密码'
                addonBefore={<span className='iconfont icon-suo1' style={focusItem === 2 ? styles.focus : {}}/>}/>
            )}
          </Form.Item>
          <div className='bottom'>
            <input className='loginBtn' type="submit" value='注册'/>
            <span className='registerBtn' onClick={this.gobackLogin}>返回登录</span>
          </div>
        </Form>
        <div className='footer'>
          <div>欢迎登陆后台管理系统</div>
        </div>
      </div>
    )
  }
}

const styles = {
  focus: {
    width: '20px',
    opacity: 1
  },
}

export default RegisterForm

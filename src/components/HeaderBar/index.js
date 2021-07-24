import React, {useState, useEffect} from 'react'
import {Icon, Badge, Dropdown, Menu, Modal, Button, Select, Checkbox, Form, Input} from 'antd'


import screenfull from 'screenfull'
import {inject, observer} from 'mobx-react'
import {Link, withRouter} from 'react-router-dom'

import {getUserInfoInter, logoutInter} from "../../api/login.js";
import EditInfoForm from "./editInfoForm.js";
import EditPassword from "./editPassword.js";
import WriteBLog from "./writeBlog.js"

//withRouter一定要写在前面，不然路由变化不会反映到props中去
@withRouter @inject('appStore') @observer
class HeaderBar extends React.Component {
    state = {
        icon: 'arrows-alt',
        count: 100,
        visible: false,
        avatar: require('./img/04.jpg'),
        cgInfoDialogVisble: false,
        cgPasswordVisible: false,
        writeBLogVisible: false,
        userImg: "",
    }

    componentDidMount() {
        screenfull.onchange(() => {
            this.setState({
                icon: screenfull.isFullscreen ? 'shrink' : 'arrows-alt'
            })
        })

        // 获取用户头像
        getUserInfoInter().then(res => {
            if(res && res.code == 200) {
                this.setState({
                    userImg: res.data.picture
                })
            }
        })
    }

    componentWillUnmount() {
        screenfull.off('change')
    }

    toggle = () => {
        this.props.onToggle()
    }
    screenfullToggle = () => {
        if (screenfull.enabled) {
            screenfull.toggle()
        }
    }
    logout = () => {
        logoutInter().then(res => {
            if (res && res.code == 200) {
                this.props.appStore.toggleLogin(false)
                this.props.history.push(this.props.location.pathname)
            }
        });
    }

    closeCgInfoDialog = () => {
        this.setState({
            cgInfoDialogVisble: false,
            cgPasswordVisible: false,
            writeBLogVisible: false,
        })
    }


    render() {
        const {icon, count, visible, avatar, cgInfoDialogVisble, cgPasswordVisible, writeBLogVisible, userImg} = this.state
        const {appStore, collapsed, location} = this.props

        // ---------------------- 编辑个人信息弹窗
        const showInfosModal = () => {
            this.setState({
                cgInfoDialogVisble: true
            })
        };
        const showPasswordModal = () => {
            this.setState({
                cgPasswordVisible: true
            })
        };
        const showWriteBlogModal = () => {
            this.setState({
                writeBLogVisible: true
            })
        };
        const notLogin = (
            <div>
                <Link to={{pathname: '/login', state: {from: location}}}
                      style={{color: 'rgba(0, 0, 0, 0.65)'}}>登录</Link>&nbsp;
                <img src={require('../../assets/img/defaultUser.jpg')} alt=""/>
            </div>
        )
        const menu = (
            <Menu className='menu'>
                <Menu.ItemGroup title='用户中心' className='menu-group'>
                    <Menu.Item onClick={showInfosModal}>修改信息</Menu.Item>
                    <Menu.Item><span onClick={this.logout}>退出登录</span></Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title='设置中心' className='menu-group'>
                    <Menu.Item onClick={showPasswordModal}>修改密码</Menu.Item>
                </Menu.ItemGroup>
            </Menu>
        )
        const login = (
            <Dropdown overlay={menu}>
                <img onClick={() => this.setState({visible: true})} src={userImg ? userImg : avatar} alt=""/>
            </Dropdown>
        )
        return (
            <div id='headerbar'>
                <Icon
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    className='trigger'
                    onClick={this.toggle}/>
                <div style={{lineHeight: '64px', float: 'right'}}>
                    <ul className='header-ul'>
                        <li>
                            <Button onClick={showWriteBlogModal}><Icon type="plus"/>写博客</Button>
                        </li>
                        <li><Icon type={icon} onClick={this.screenfullToggle}/></li>
                        <li onClick={() => this.setState({count: 0})}>
                            <Badge count={appStore.isLogin ? count : 0} overflowCount={99} style={{marginRight: -17}}>
                                <Icon type="notification"/>
                            </Badge>
                        </li>
                        <li>
                            {appStore.isLogin ? login : notLogin}
                        </li>
                    </ul>
                </div>
                <Modal
                    footer={null} closable={false}
                    visible={visible}
                    wrapClassName="vertical-center-modal"
                    onCancel={() => this.setState({visible: false})}>
                    <img src={userImg ? userImg : avatar} alt="" width='100%'/>
                </Modal>

                {/*编辑个人信息弹窗*/}
                <Modal title="编辑个人信息" visible={cgInfoDialogVisble} footer={null} onCancel={this.closeCgInfoDialog}>
                    <EditInfoForm closeCgInfoDialog={this.closeCgInfoDialog}></EditInfoForm>
                </Modal>

                {/*修改密码弹窗*/}
                <Modal title="编辑个人信息" visible={cgPasswordVisible} footer={null} onCancel={this.closeCgInfoDialog}>
                    <EditPassword closeCgInfoDialog={this.closeCgInfoDialog}></EditPassword>
                </Modal>

                {/*写博客*/}
                <Modal title="写博客" visible={writeBLogVisible} footer={null} onCancel={this.closeCgInfoDialog}>
                    <WriteBLog closeCgInfoDialog={this.closeCgInfoDialog}></WriteBLog>
                </Modal>
            </div>
        )
    }
}

export default HeaderBar

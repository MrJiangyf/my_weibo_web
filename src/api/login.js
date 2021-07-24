/**
 * 博客登陆相关接口
 */
import axios from '../axios/interceptor.js'


//注册：用户名是否存在
export function isExistInter(params) {
    return axios({
        method: 'post',
        url: 'blog/api/user/isExist',
        data: params
    });
}

//注册：注册用户
export function registerInter(params) {
    return axios({
        method: 'post',
        url: 'blog/api/user/register',
        data: params
    });
}

//登陆接口
export function loginInter(params) {
    return axios({
        method: 'post',
        url: 'blog/api/user/login',
        data: params
    });
}

//编辑用户信息
export function changeInfoInter(params) {
    return axios({
        method: 'patch',
        url: 'blog/api/user/changeInfo',
        data: params
    });
}

//修改用户密码
export function changePasswordInter(params) {
    return axios({
        method: 'post',
        url: 'blog/api/user/changePassword',
        data: params
    });
}

//退出登陆
export function logoutInter(params) {
    return axios({
        method: 'post',
        url: 'blog/api/user/logout',
        data: params
    });
}


//获取用户基本信息
export function getUserInfoInter(params) {
    return axios({
        method: 'get',
        url: 'blog/api/user/getUserInfo',
        params: params
    });
}


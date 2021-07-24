/**
 * 博客
 */
import axios from '../axios/interceptor.js'


//获取博客类型枚举值
export function getEnumsInter(params) {
    return axios({
        method: 'get',
        url: 'blog/api/utils/getEnums',
        params: params
    });
}


//获取博客类型枚举值
export function createInter(params) {
    return axios({
        method: 'post',
        url: 'blog/api/blog/create',
        data: params
    });
}

//获取博客类型枚举值
export function getBlogListInter(params) {
    return axios({
        method: 'post',
        url: 'blog/api/profile/getBlogList',
        data: params
    });
}

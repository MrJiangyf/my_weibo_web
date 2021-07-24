/**
 * @description 工具类：上传图片
 **/

import axios from '../axios/interceptor.js'


//上传图片接口
export function uploadInter(params) {
    return axios({
        method: 'post',
        url: 'blog/api/utils/upload',
        data: params
    });
}

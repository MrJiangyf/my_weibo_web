/**
 * axios请求拦截
 * axios封装
 * 请求拦截、响应拦截
 */
import axios from 'axios';


const errorHandle = (status,message) => {
    switch (status){
        case 401 :
            console.log('401未登录- '+message)
            break;
        case 403 :
            console.log('403token过期 '+message)
            sessionStorage.removeItem('token')
            break;
        case 404 :
            console.log('请求资源部不存在 '+message)
            break;
        default :
            console.log(message)
            break;
    }
}


// 创建axios实例
var instance = axios.create({ timeout: 1000 * 12});
// 设置post请求头
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
    config => {
        // 登录流程控制中，根据本地是否存在token判断用户的登录情况
        // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
        // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
        // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
       /* let TOKEN=sessionStorage.getItem('tokenId');
        (TOKEN && TOKEN.length > 0) && (config.headers['tokenId'] = TOKEN);*/
        return config;
    },
    error => Promise.error(error)
)

// 响应拦截器
instance.interceptors.response.use(
    // 请求成功
    res => {
        //成功失败统一处理
        return Promise.resolve(res.data)
    },
    // 请求失败
    error => {
        const { response } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围
            errorHandle(response.status, response.data.message);
            return Promise.reject(response);
        } else {
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
            // store.commit('changeNetwork', false);
            console.log('断网情况--'+error)
        }
    });

export default instance;

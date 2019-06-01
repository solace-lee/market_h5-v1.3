/**
 * June
 * 原fetch请求拦截处理不好，重新封装axios
 *  */
import axios from 'axios'
import {Message} from 'element-ui'
import { baseUrl } from './env'

// axios 配置
axios.defaults.baseURL = baseUrl
axios.defaults.timeout = 5000
axios.defaults.withCredentials = true

//请求拦截
axios.interceptors.request.use(config=> {
    //请求前处理
    return config;
}, err=> {
    //error
    Message.error({message: '请求超时!'});
    return Promise.resolve(err);
})

//响应异常拦截
axios.interceptors.response.use(data=> {
// 请求完成得处理（此处暂未处理,遇到再处理）
if (data.status && data.status == 200 && data.data.status == 'error') {
    Message.error({message: data.data.msg});
    return;
    }
    return data;
}, err=> {
    console.log(err)
    //错误处理,可根据状态码处理逻辑
    if (err && err.response) {
        switch (err.response.status) {
            case 400: 
                err.message = '请求错误(400)'; 
                break;
            case 401: 
                err.message = '账号密码不正确，请重新登录(401)'; 
                break;
            case 403: 
                err.message = '拒绝访问(403)'; 
                break;
            case 404: 
                err.message = '请求出错(404)'; 
                break;
            case 408: 
                err.message = '请求超时(408)'; 
                break;
            case 500: 
                err.message = '服务器错误(500)'; 
                break;
            case 501: 
                err.message = '服务未实现(501)'; 
                break;
            case 502: 
                err.message = '网络错误(502)'; 
                break;
            case 503: 
                err.message = '服务不可用(503)'; 
                break;
            case 504: 
                err.message = '网络超时(504)'; 
                break;
            case 505: 
                err.message = 'HTTP版本不受支持(505)'; 
                break;
            default: 
                err.message = `连接出错(${err.response.status})!`;
        }
    } else {
        err.message = '连接服务器失败!'
    }
    Message.error( {message: err.message } )
    return Promise.resolve(err);
})

export const axiosReq = (url,method,params) =>{
    return axios({
        url: url,
        method: method,
        data: params || '',
        headers:{
            'Content-Type': 'application/json',
            'ZLXCTOKEN': window.localStorage.getItem('token')
        }
    })
}


// POST 方法封装  (文件上传)
export const uploadFileRequest = (url, params) => {
    return axios({
        method: 'post',
        url: url,
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

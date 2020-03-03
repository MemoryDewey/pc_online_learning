import axios from 'axios'
import {Message} from 'element-ui'

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
});

// 请求拦截器
service.interceptors.request.use(config => {
    config.headers.common['Authorization'] = localStorage.getItem('token');
    return config;
});
service.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        if (error.response.data.code) Message.error({
            message: error.response.data.msg || '错误',
            duration: 5 * 1000
        });
    }
);

export function get(url, params) {
    return service({url, method: 'get', params})
}

export function post(url, data) {
    return service({url, method: 'post', data})
}

export function put(url, data) {
    return service({url, method: 'put', data})
}

export function del(url,params) {
    return service({url,method:'delete', params})
}

export default service

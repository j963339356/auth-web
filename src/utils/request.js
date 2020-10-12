/* 网络请求*/
import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
// import store from '@/store';

//创建实例
const service = axios.create({
    // baseURL: 'http://47.100.93.138:8082/',
    baseURL: 'http://localhost:8082/',
    timeout: 50000
})

// request 拦截器
service.interceptors.request.use(
    config => {
        // 请求发送前做的事

        //添加token
        // config.headers['Access-Contro-Allow-Origin'] = '*'
        //config.headers['token'] = ;
        return config
    },
    error => {
        //  这里处理一些请求出错的情况
        console.log(error);
        Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    response => {
        // 这里处理一些response 正常放回时的逻辑
        const data = response.data;
        if (data.code !== 200 && data.code !== 2) {
            MessageBox.alert(data.message, '错误', { confirmButtonText: '确定' });
            return Promise.reject(new Error(data.message || 'error'));
        }
        // 如果未登录或者token过期
        if (data.code === 2) {
            if (data.code !== 200 && data.code !== 2) {
                MessageBox.alert('请重新登录', '错误', {
                    confirmButtonText: '确定'
                }).then(() => {
                    // store.commit();
                });
                return Promise.reject(new Error(data.message || 'error'));
            }
        }        
        return data
    },
    error => {
        // 这里处理一些response 出错时的逻辑
        //显示服务器请求出错
        Message({
            type: 'error',
            message: '请求失败，请检查网络！',
            showClose: true
        });
        return Promise.reject(error)
    }
)

export default service

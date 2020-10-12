import request from '@/utils/request';

//登录
export function login(data){
    return request({
        url: '/api/',
        method: 'POST',
        data
    })
}

//注销
export function logout(){

}

//获取用户信息
export function getInfo(token){

}




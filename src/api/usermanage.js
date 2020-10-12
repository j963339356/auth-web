import request from '@/utils/request';

//获取用户列表
export function getUserList(queryData){
    return request({
        url: 'api/userinfo/list',
        method: 'get',
        params: queryData
    })
}

//获取单个用户
export function getUser(id){
    return request({
        url: 'api/userinfo/'+id,
        method: 'get'
    })
}

//添加用户
export function addUser(user){
    return request({
        url: 'api/userinfo/insert',
        method: 'post',
        data: user
    })
}

//编辑用户
export function editUser(user){
    return request({
        url: 'api/userinfo/update/'+user.id,
        method: 'post',
        data: user
    })
}

//删除用户
export function delUser(id){
    return request({
        url: 'api/userinfo/delete/'+id,
        method: 'get'
    })
}

//校验用户是否存在
export function validUser(username){
    return request({
        url: 'api/userinfo/validUser/'+username,
        method: 'get'
    })
}
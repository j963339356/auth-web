import Cookie from 'js-cookie';

const key = 'Token';

//获取token
export function getToken(){
    return Cookie.get(key);
}

//设置token
export function setToken(token){
    let expires = new Date(new Date().getTime() + 60*60*30*1000);
    return Cookie.setToken(token,expires);
}
export function setToken(token,expires){
    return Cookie.setToken(token,expires,'/')
}
export function setToken(token,expires,path){
    return Cookie.set(key,token,{expires: expires, path: path})
}

//清除token
export function removeToken(){
    return Cookie.remove(key);
}
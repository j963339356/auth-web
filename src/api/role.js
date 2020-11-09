import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/api/role/list',
    method: 'get',
    params: params
  })
}

export function deleteRole(id) {
  return request({
    url: '/api/role/delete/' + id,
    method: 'post'
  })
}

export function createRole(data) {
  return request({
    url: '/api/role/insert',
    method: 'post',
    data: data
  })
}

export function updateRole(id, data) {
  return request({
    url: '/api/role/update/' + id,
    method: 'post',
    data: data
  })
}

export function getRole(id) {
  return request({
    url: '/api/role/' + id,
    method: 'get',
  })
}

export function fetchPrivilegeAllocate(){
  return request({
    url: '/api/role/getPrivilegeAllocate',
    method: 'get'
  })
}

export function grantPrivileges(roleId,privileges){
  return request({
    url: '/api/role/grantPrivileges/' + roleId,
    method: 'post',
    data: privileges
  })
}

export function hasGrantPrivileges(roleId){
  return request({
    url: '/api/role/hasGrantPrivileges/' + roleId,
    method: 'get'
  })
}


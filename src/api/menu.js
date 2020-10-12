import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/api/menu/list',
    method: 'get',
    params: params
  })
}

export function deleteMenu(id) {
  return request({
    url: '/api/menu/delete/' + id,
    method: 'post'
  })
}

export function createMenu(data) {
  return request({
    url: '/api/menu/insert',
    method: 'post',
    data: data
  })
}

export function updateMenu(id, data) {
  return request({
    url: '/api/menu/update/' + id,
    method: 'post',
    data: data
  })
}

export function getMenu(id) {
  return request({
    url: '/api/menu/' + id,
    method: 'get',
  })
}

export function updateHidden(id, params) {
  return request({
    url: '/api/menu/updateHidden/' + id,
    method: 'post',
    params: params
  })
}

export function fetchTreeList() {
  return request({
    url: '/api/menu/treeList',
    method: 'get'
  })
}


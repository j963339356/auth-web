import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/api/module/list',
    method: 'get',
    params: params
  })
}

export function deleteModule(id) {
  return request({
    url: '/api/module/delete/' + id,
    method: 'post'
  })
}

export function createModule(data) {
  return request({
    url: '/api/module/insert',
    method: 'post',
    data: data
  })
}

export function updateModule(id, data) {
  return request({
    url: '/api/module/update/' + id,
    method: 'post',
    data: data
  })
}

export function getModule(id) {
  return request({
    url: '/api/module/' + id,
    method: 'get',
  })
}


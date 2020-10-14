import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/api/resource/list',
    method: 'get',
    params: params
  })
}

export function deleteResource(id) {
  return request({
    url: '/api/resource/delete/' + id,
    method: 'post'
  })
}

export function createResource(data) {
  return request({
    url: '/api/resource/insert',
    method: 'post',
    data: data
  })
}

export function updateResource(id, data) {
  return request({
    url: '/api/resource/update/' + id,
    method: 'post',
    data: data
  })
}

export function getResource(id) {
  return request({
    url: '/api/resource/' + id,
    method: 'get',
  })
}


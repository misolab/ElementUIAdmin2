import request from '../utils/request.js'


export function login(params) {
  return request({
    url: '/auth/login',
    method: 'post',
    data: params
  })
}


export function reqClient(params) {
  return request({
    url: '/client',
    method: 'get',
    data: params
  })
}


export function sendSMS(params) {
  return request({
    url: '/pc/sendsms',
    method: 'get',
    params: params
  })
}

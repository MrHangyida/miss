import request from '@/utils/request'


export function login(data) {
  return request({
    url: '/oauth/token',
    method: 'post',
    data
  })
}

export function reg(data) {
  return request({
    url: '/api/business/saveBusinessUser',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/business/findUserByNow',
    method: 'post',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getCheckCode(data) {
  return request({
    url: '/api/business/sendUserRegisterCode',
    method: 'post',
    data
  })
}

export function retrievePassword(data) {
  return request({
    url: '/api/business/retrievePassword',
    method: 'post',
    data
  })
}

export function sendUserUpdateCode(data) {
  return request({
    url: '/api/business/sendUserUpdateCode',
    method: 'post',
    data
  })
}

export function updatePassByNameAndPass(data) {
  return request({
    url: '/api/business/updatePassByNameAndPass',
    method: 'post',
    data
  })
}

// 发送验证码



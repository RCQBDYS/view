import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/Analysis/user/userList',
    method: 'post',
    data
  })
}

export function addUser(data) {
  return request({
    url: '/Analysis/user/addUser',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/Analysis/user/updateUser',
    method: 'post',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: '/Analysis/user/deleteUser',
    method: 'post',
    data
  })
}

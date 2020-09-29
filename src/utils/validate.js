/**
 * Created by PanJiaChen on 16/11/18.
 */
import axios from 'axios'

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  // 这里设置了整个模板的符合的用户名单,并不是最终用户成功登录的用户
  // eslint-disable-next-line no-unused-vars
  return axios({
    method: 'get',
    url: '/Analysis/user/userAccountListAll',
    params: {
      userAccount: str
    }
  })
    .then(function(response) {
      console.log('用户账号存在性的检验 = ' + response.data.data)
      return response.data.data !== 0
    })
}
/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validNumber(str) {
  const reg = /^[0-9]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}


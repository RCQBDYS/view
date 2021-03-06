import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { mdCrypto } from '@/utils/crypto'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_UNIT: (state, unit) => {
    state.unit = unit
  }
}

const actions = {
  // user login 用户登录
  login({ commit }, userInfo) {
    const { userAccount, passWord } = userInfo
    // console.log('提交的用户账号' + userAccount)
    // console.log('提交的用户密码' + passWord)
    const newPassword = mdCrypto(passWord)
    // console.log('加密后的密码' + newPassword)
    return new Promise((resolve, reject) => {
      login({ userAccount: userAccount.trim(), passWord: newPassword }).then(response => {
        // 注意这里获取map中的值，使用的方法const { token } = reponse 键值名对应括号里的名称
        // console.log(response)
        const { data } = response
        // console.log(data)
        // console.log(data.token)
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        // console.log('获取用户信息getInfo')
        const data = response.data
        // console.log('getInfor data = ' + data.user.userName)
        if (!data) {
          // return reject('Verification failed, please Login again.')
          return reject('验证失败，请重新登录')
        }
        const { userName, userType, userUnit } = data.user
        commit('SET_NAME', userName)
        commit('SET_ROLES', userType.toString())
        commit('SET_UNIT', userUnit)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout 用户登出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token 消除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


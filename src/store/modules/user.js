import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
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
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login 用户登录
  login({ commit }, userInfo) {
    const { userAccount, passWord } = userInfo
    console.log('提交的用户账号' + userAccount)
    console.log('提交的用户密码' + passWord)
    return new Promise((resolve, reject) => {
      login({ userAccount: userAccount.trim(), passWord: passWord }).then(response => {
        // 注意这里获取map中的值，使用的方法const { token } = reponse 键值名对应括号里的名称
        console.log(response)
        const { data } = response
        console.log(data)
        console.log(data.token)
        // const { token } = data
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        // commit('SET_TOKEN', 'admin-token')
        // setToken('admin-token')
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
        console.log('获取用户信息getInfo')
        const { data } = response
        console.log(data)

        if (!data) {
          // return reject('Verification failed, please Login again.')
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
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


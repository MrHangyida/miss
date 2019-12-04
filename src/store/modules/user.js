import { login, reg, logout, getInfo, getCheckCode, retrievePassword, sendUserUpdateCode,updatePassByNameAndPass} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  orgid: 0
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ORGID: (state, orgid) => {
    state.orgid = orgid
  },
  SET_ORGLOGO: (state, orglogo) => {
    state.orglogo = orglogo
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, grant_type} = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password, grant_type: grant_type}).then(response => {
        commit('SET_TOKEN', response.access_token)
        setToken(response.access_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user login
  reg({ commit }, userInfo) {
    const { phone, organName, personName, password, code} = userInfo
    return new Promise((resolve, reject) => {
      reg({ phone: phone.trim(), organName: organName.trim(), personName: personName.trim(), password: password, code: code}).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { userName, photo, createOrgId, orgLogo } = data

        commit('SET_NAME', userName)
        commit('SET_AVATAR', photo)
        commit('SET_ORGID', createOrgId)
        commit('SET_ORGLOGO', orgLogo)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  // logout({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     logout(state.token).then(() => {
  //       commit('SET_TOKEN', '')
  //       removeToken()
  //       resetRouter()
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },
  logout({ commit, state }) {
    commit('SET_TOKEN', '')
    removeToken()
    resetRouter()
   // resolve()
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },
  // get CheckCode
  getCheckCode({ commit }, phoneInfo) {
    const { phone } = phoneInfo
    return new Promise((resolve, reject) => {
      getCheckCode({ phone: phone.trim()}).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 找回密码
  retrievePassword({ commit }, phoneInfo) {
    const { phone, code, password } = phoneInfo
    return new Promise((resolve, reject) => {
      retrievePassword({ phone: phone.trim(), code: code, password: password}).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 找回密码获取验证码
  sendUserUpdateCode({ commit }, phoneInfo) {
    const { phone } = phoneInfo
    return new Promise((resolve, reject) => {
      sendUserUpdateCode({ phone: phone.trim()}).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
 
  // 找回密码
  updatePassByNameAndPass({ commit }, phoneInfo) {
    const { userName, org_pwd, password } = phoneInfo
    return new Promise((resolve, reject) => {
      updatePassByNameAndPass({ userName: userName, oldPassword: org_pwd, newPassword: password}).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

import { findProvince, findCity, findCounty, findDictByDictCode} from '@/api/shared'
import { getToken } from '@/utils/auth'

const state = {
  token: getToken(),
  name: '',
  avatar: ''
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
  }
}

const actions = {
    // 省
    findProvince({ commit }) {
        return new Promise((resolve, reject) => {
        findProvince().then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
        })
    },
    // 市
    findCity({ commit}, provinceInfo) {
        const {provinceCode} = provinceInfo
        return new Promise((resolve, reject) => {
            findCity({code: provinceCode}).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
        })
    },
     // 区
    findCounty({ commit}, cityInfo) {
        const {cityCode} = cityInfo
        return new Promise((resolve, reject) => {
            findCounty({code: cityCode}).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
        })
    },
      // 查询基础信息，例如 男女类型（dictCode），活动类型(activity)，素养类型(attainment)
      findDictByDictCode({ commit}, dictInfo) {
        const {dictCode} = dictInfo
        return new Promise((resolve, reject) => {
          findDictByDictCode({dictCode: dictCode}).then(response => {
            resolve(response)
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

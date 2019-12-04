import {totalStudent, totalClasses, findTodayClassHourByInstitutionalId,findBehaviorLog } from '@/api/dashboard'
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
    // 查询机构学生总数
    totalStudent({ commit }, indexInfo) {
    const { institutionalId} = indexInfo
    return new Promise((resolve, reject) => {
       const data = {institutionalId: institutionalId}
       totalStudent(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
    // 查询机构开班总数
    totalClasses({ commit }, indexInfo) {
        const { institutionalId} = indexInfo
        return new Promise((resolve, reject) => {
            const data = {institutionalId: institutionalId}
            totalClasses(data).then(response => {
            resolve(response)
            }).catch(error => {
            reject(error)
            })
        })
    },

    // 查询机构课时情况
    findTodayClassHourByInstitutionalId({ commit }, indexInfo) {
        const { institutionalId,start} = indexInfo
        return new Promise((resolve, reject) => {
           const data = {institutionalId: institutionalId,start:start}
           findTodayClassHourByInstitutionalId(data).then(response => {
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        })
      },
      //获取行为日志
      findBehaviorLog({ commit }, indexInfo) {
        const { institutionalId,rowCount,pageNumber} = indexInfo
        return new Promise((resolve, reject) => {
           const data = {orgId: institutionalId,rowCount: rowCount,pageNumber: pageNumber}
           findBehaviorLog(data).then(response => {
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

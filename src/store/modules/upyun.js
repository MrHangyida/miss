import { upload } from '@/api/upyun'
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
    upload({ commit }, fileInfo) {
    const {imagefile, orgId} = fileInfo
    let path = "/data/mp-b/avatar/org/"+orgId+"/"
    return new Promise((resolve, reject) => {
        upload(imagefile, path).then(response => {
        resolve(path)
        }).catch(error => {
        reject(error)
        })
    })
    },
    uploadStudentAvatar({ commit }, fileInfo) {
      const {imagefile, orgId} = fileInfo
      let path = "/data/mp-b/avatar/student/"+orgId+"/"
      return new Promise((resolve, reject) => {
          upload(imagefile, path).then(response => {
          resolve(path)
          }).catch(error => {
          reject(error)
          })
      })
      },
      uploadTeacherAvatar({ commit }, fileInfo) {
        const {imagefile, orgId} = fileInfo
        let path = "/data/mp-b/avatar/teacher/"+orgId+"/"
        return new Promise((resolve, reject) => {
            upload(imagefile, path).then(response => {
            resolve(path)
            }).catch(error => {
            reject(error)
            })
        })
        },

      uploadActivityImage({ commit }, fileInfo) {
        const {imagefile, orgId} = fileInfo
        let path = "/data/mp-b/activity/"+orgId+"/"+(new Date()).getFullYear()+"/"+(new Date()).getMonth()+"/"+(new Date()).getDate()+"/"
        return new Promise((resolve, reject) => {
            upload(imagefile, path).then(response => {
            resolve(path)
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
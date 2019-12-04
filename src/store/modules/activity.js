import { findActivityByPage, saveActivity, findSignUpByActivityId, updateIsStartByActivityId, extension, removeActivityByActivityId, updateActivityByActivityId, findDetailsByActivityId, findActivityCount, exportSignIn, approvalSignMess} from '@/api/activity'
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
    // 活动列表
    findActivityByPage({ commit }, activityInfo) {
    const {currentOrgId, rowCount, pageNumber, activityName} = activityInfo
    return new Promise((resolve, reject) => {
       const data = {currentOrgId: currentOrgId, rowCount: rowCount, pageNumber: pageNumber, activityName: activityName}
        findActivityByPage(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 添加活动
  saveActivity({ commit }, activityInfo) {
    const {activityName,coverPicture, pictures, isPublic, review,actType, qualityType, startTime, endTime, numberOfPeople, isStart, provinceId, cityId, countyId, address, schoolYear, period, contacts, contactNumber, content, remarks, classIds, titles} = activityInfo
    return new Promise((resolve, reject) => {
        const data = {activityName: activityName, coverPicture: coverPicture, pictures: pictures, isPublic: isPublic,review:review, actType: actType, qualityType: qualityType, startTime: startTime, endTime: endTime, numberOfPeople: numberOfPeople, isStart: isStart, provinceId: provinceId, cityId: cityId, countyId: countyId, address: address, schoolYear: schoolYear, period: period, contacts: contacts, contactNumber: contactNumber, content: content, remarks: remarks, classIds: classIds, titles: titles}
        saveActivity(data).then(response => {
        resolve(response)
        }).catch(error => {
        reject(error)
        })
    })
    },

  // 查看报名列表
  findSignUpByActivityId({ commit }, activityInfo) {
    const {activityId, pageNumber, rowCount} = activityInfo
    return new Promise((resolve, reject) => {
        const data = {activityId: activityId, pageNumber: pageNumber, rowCount: rowCount}
        findSignUpByActivityId(data).then(response => {
        resolve(response)
        }).catch(error => {
        reject(error)
        })
    })
    },

  // 是否开启活动
  updateIsStartByActivityId({ commit }, activityInfo) {
    const {activityId, isStart} = activityInfo
    return new Promise((resolve, reject) => {
        const data = {activityId: activityId, isStart: isStart}
        updateIsStartByActivityId(data).then(response => {
        resolve(response)
        }).catch(error => {
        reject(error)
        })
    })
    },

  // 活动延期
  extension({ commit }, activityInfo) {
    const {activityId, time} = activityInfo
    return new Promise((resolve, reject) => {
        const data = {activityId: activityId, time: time}
        extension(data).then(response => {
        resolve(response)
        }).catch(error => {
        reject(error)
        })
    })
    },

  // 删除活动信息
  removeActivityByActivityId({ commit }, activityInfo) {
    const {activityId} = activityInfo
    return new Promise((resolve, reject) => {
        const data = {activityId: activityId}
        removeActivityByActivityId(data).then(response => {
        resolve(response)
        }).catch(error => {
        reject(error)
        })
    })
    },

  // 根据ID修改活动信息
  updateActivityByActivityId({ commit }, activityInfo) {
    const {activityName,coverPicture, pictures,  isPublic, review,actType, qualityType, startTime, endTime, numberOfPeople, isStart, provinceId, cityId, countyId, address, schoolYear, period, contacts, contactNumber, content, remarks, classIds, currentOrgId, activityId, titles} = activityInfo
    return new Promise((resolve, reject) => {
        const data = {activityName: activityName, coverPicture: coverPicture, pictures: pictures,  isPublic: isPublic,review:review, actType: actType, qualityType: qualityType, startTime: startTime, endTime: endTime, numberOfPeople: numberOfPeople, isStart: isStart, provinceId: provinceId, cityId: cityId, countyId: countyId, address: address, schoolYear: schoolYear, period: period, contacts: contacts, contactNumber: contactNumber, content: content, remarks: remarks, classIds: classIds, currentOrgId: currentOrgId, activityId: activityId, titles: titles}
        updateActivityByActivityId(data).then(response => {
        resolve(response)
        }).catch(error => {
        reject(error)
        })
    })
    },
// 根据ID查看活动详情
findDetailsByActivityId({ commit }, activityInfo) {
    const {activityId} = activityInfo
    return new Promise((resolve, reject) => {
        const data = {activityId: activityId}
        findDetailsByActivityId(data).then(response => {
        resolve(response)
        }).catch(error => {
        reject(error)
        })
    })
    },

// 根据报名信息Id，修改审核状态
approvalSignMess({ commit }, activityInfo) {
  const {signMessId, approvalStatus} = activityInfo
  return new Promise((resolve, reject) => {
      const data = {signMessId: signMessId, approvalStatus: approvalStatus}
      approvalSignMess(data).then(response => {
      resolve(response)
      }).catch(error => {
      reject(error)
      })
  })
},
// 查看活动总数
findActivityCount({ commit }, activityInfo) {
    const {currentOrgId} = activityInfo
    return new Promise((resolve, reject) => {
        const data = {currentOrgId: currentOrgId}
        findActivityCount(data).then(response => {
        resolve(response)
        }).catch(error => {
        reject(error)
        })
    })
  },
  // 报名数据导出
  exportSignIn({ commit }, activityInfo) {
      const {activityId} = activityInfo
      return new Promise((resolve, reject) => {
          const data = {access_token: getToken(), activityId: activityId}
          exportSignIn(data).then(response => {
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

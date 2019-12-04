import { addTask,deleteTaskByIdAndCourseId,updateTask,findTaskByIdAndCourseId,findTaskPage,addItemTask,deleteItemTaskByIdAndCourseId,addItemClassTask, findItemClassTaskById, findItemClassTaskByItemId, getStudentHomework} from '@/api/work'
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
    // 新建作业
    addTask({ commit }, workInfo) {
    const {institutionalId, ansQuestion, ansName, courseId, teacherId, ansStatus} = workInfo
    return new Promise((resolve, reject) => {
       const data = {institutionalId: institutionalId,  ansQuestion: ansQuestion, ansName: ansName, courseId: courseId, teacherId: teacherId, ansStatus: ansStatus}
        addTask(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除作业
  deleteTaskByIdAndCourseId({ commit }, workInfo) {
    const { courseId, id, useYn} = workInfo
    return new Promise((resolve, reject) => {
       const data = {courseId: courseId, id: id, useYn: useYn}
        deleteTaskByIdAndCourseId(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 修改作业
  updateTask({ commit }, workInfo) {
    const { id, ansQuestion, ansName, courseId, teacherId, ansStatus} = workInfo
    return new Promise((resolve, reject) => {
      const data = {id: id,  ansQuestion: ansQuestion, ansName: ansName, courseId: courseId, teacherId: teacherId, ansStatus: ansStatus}
        updateTask(data).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 作业详情
  findTaskByIdAndCourseId({ commit }, workInfo) {
    const { courseId, id } = workInfo
    return new Promise((resolve, reject) => {
       const data = {courseId: courseId, id: id}
        findTaskByIdAndCourseId(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 作业列表
  findTaskPage({ commit }, workInfo) {
    const { institutionalId, courseId, ansName,start } = workInfo
    return new Promise((resolve, reject) => {
       const data = {institutionalId: institutionalId,start:start}
        if(courseId != 0 )
          data.courseId = courseId
        if(ansName != '')
          data.ansName = ansName
        findTaskPage(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 发布作业
  addItemTask({ commit }, workInfo) {
    const { courseId, ansId} = workInfo
    return new Promise((resolve, reject) => {
       const data = {courseId: courseId, ansId: ansId}
        addItemTask(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 撤回作业
  deleteItemTaskByIdAndCourseId({ commit }, workInfo) {
    const { courseId, ansId, useYn} = workInfo
    return new Promise((resolve, reject) => {
       const data = {courseId: courseId, ansId: ansId, useYn: useYn}
        deleteItemTaskByIdAndCourseId(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 布置作业
  addItemClassTask({ commit }, workInfo) {
    const { title, question, institutionalId, classesId, itemClassTaskList} = workInfo
    return new Promise((resolve, reject) => {
       const data = {institutionalId: institutionalId, title: title, question: question, classesId: classesId}
       for(var item in itemClassTaskList){
        var data_item = {
          ['itemClassTaskList['+item+'].studentId'] : itemClassTaskList[item].studentId
        }

          Object.assign(data, data_item)
        }
        addItemClassTask(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 布置作业-作业列表
  findItemClassTaskById({ commit }, workInfo) {
    const { institutionalId, classesId} = workInfo
    return new Promise((resolve, reject) => {
       const data = {institutionalId: institutionalId, classesId: classesId}
        findItemClassTaskById(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 作业详情
  findItemClassTaskByItemId({ commit }, workInfo) {
    const { institutionalId, id} = workInfo
    return new Promise((resolve, reject) => {
       const data = {institutionalId: institutionalId, id: id}
       findItemClassTaskByItemId(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 学生作业
  getStudentHomework({ commit }, workInfo) {
    const {id} = workInfo
    return new Promise((resolve, reject) => {
       const data = {arg: '{"UserID":"","TaskID":'+id+',"ClientID":"","PageIndex":0,"WithExtData":""}'}
       getStudentHomework(data).then(response => {
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

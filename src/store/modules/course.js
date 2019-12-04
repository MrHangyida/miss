import { addCourseCategoryMaster,updateCourseCategoryMaster,deleteCourseCategoryMasterByCouCatId,findAllCourseCategory,addCourse,updateCourse,deleteCourseByCId,updateCourseIdStatus,findCoursePage,updateCourseStatus,findClassesCourseDetails,addSubject,addSchoolYear,addSchoolSeason,deleteStudentBySId,findSubjectByInstitutionalId,findSubjectBySubjectId,findSchoolYearMasterByInstitutionalId ,findSchoolSeasonMasterByInstitutionalId,findConditionList} from '@/api/course'
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
    // 新增课程大类
    addCourseCategoryMaster({ commit }, typeInfo) {
    const { institutionalId, couName, useYn} = typeInfo
    return new Promise((resolve, reject) => {
       const data = {institutionalId: institutionalId, couName: couName, useYn: useYn}
       addCourseCategoryMaster(data).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 修改课程大类
  updateCourseCategoryMaster({ commit }, studentInfo) {
    const { institutionalId, } = studentInfo
    return new Promise((resolve, reject) => {
      const data = {institutionalId: institutionalId,rWeight: rWeight}
      updateCourseCategoryMaster(data).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除课程大类
  deleteCourseCategoryMasterByCouCatId({ commit }, studentInfo) {
    const { institutionalId, } = studentInfo
    return new Promise((resolve, reject) => {
      const data = {institutionalId: institutionalId,rWeight: rWeight}
      deleteCourseCategoryMasterByCouCatId(data).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 查询课程大类
  findAllCourseCategory({ commit }, typeInfo) {
    const { institutionalId, couName} = typeInfo
    return new Promise((resolve, reject) => {
      const data = {institutionalId: institutionalId, couName: couName}
      findAllCourseCategory(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增课程
  addCourse({ commit }, courseInfo) {
    const { campusId, subjectId, institutionalId, courseLargeId, schoolSeason, useYn, name, schoolYear, accomplishment} = courseInfo
    return new Promise((resolve, reject) => {
      const data = {campusId: campusId, subjectId: subjectId, institutionalId: institutionalId, courseLargeId: courseLargeId, schoolSeason: schoolSeason, useYn: useYn, name: name, schoolYear: schoolYear, accomplishment: accomplishment}
      addCourse(data).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 修改课程
  updateCourse({ commit }, courseInfo) {
    const { campusId, subjectId, institutionalId, courseLargeId, schoolSeason, useYn, name, schoolYear, accomplishment, courseId} = courseInfo
    return new Promise((resolve, reject) => {
      const data = {campusId: campusId, subjectId: subjectId, institutionalId: institutionalId, courseLargeId: courseLargeId, schoolSeason: schoolSeason, useYn: useYn, name: name, schoolYear: schoolYear, accomplishment: accomplishment, courseId: courseId}
      updateCourse(data).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除课程
  deleteCourseByCId({ commit }, studentInfo) {
    const { courseId, institutionalId} = studentInfo
    return new Promise((resolve, reject) => {
      const data = {courseId: courseId, institutionalId: institutionalId}
      deleteCourseByCId(data).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 修改课程状态
  updateCourseIdStatus({ commit }, studentInfo) {
    const { institutionalId, } = studentInfo
    return new Promise((resolve, reject) => {
      const data = {institutionalId: institutionalId,rWeight: rWeight}
      updateCourseIdStatus(data).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 查询课程
  findCoursePage({ commit }, courseInfo) {
    const {institutionalId, courseLargeId, campusId, subjectId,schoolYear,schoolSeason,accomplishment,cStatus,name,start} = courseInfo
    return new Promise((resolve, reject) => {
      const data = {institutionalId: institutionalId, campusId: campusId,start:start}

      if(courseLargeId&&courseLargeId.length > 0)
        data.courseLargeId = courseLargeId.join();
      if(subjectId&&subjectId.length > 0)
        data.subjectId = subjectId.join();
      if(schoolYear&&schoolYear.length > 0)
        data.schoolYear = schoolYear.join();
      if(schoolSeason&&schoolSeason.length > 0)
        data.schoolSeason = schoolSeason.join();
      if(accomplishment != '' && accomplishment != undefined)
        data.accomplishment = accomplishment
      if(name !=''  && name != undefined )
        data.name = name
      if(cStatus==0||cStatus==1){
        data.cStatus = cStatus;
      }
      findCoursePage(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 课程状态修改
  updateCourseStatus({ commit }, courseInfo) {
    const { institutionalId, courseId, cStatus} = courseInfo
    return new Promise((resolve, reject) => {
      const data = {institutionalId: institutionalId, courseId: courseId, cStatus: cStatus}
      updateCourseStatus(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 课程详情
  findClassesCourseDetails({ commit }, courseInfo) {
    const { institutionalId,courseId,cStartTime, cEndTime,campusId,name } = courseInfo
    return new Promise((resolve, reject) => {
      const data = {institutionalId: institutionalId,courseId: courseId,campusId: campusId}

      if(courseInfo.cStartTime){
        data.cStartTimeStr = courseInfo.cStartTime
      }
      if(courseInfo.cEndTime){
        data.cEndTimeStr = courseInfo.cEndTime
      }

      if(courseInfo.name != ''){
        data.name = courseInfo.name
      }
      //const data = {institutionalId: institutionalId,courseId: courseId,cStartTime: cStartTime, cEndTime: cEndTime,campusId: campusId,name: name}
      findClassesCourseDetails(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增科目
  addSubject({ commit }, subjectInfo) {
    const { institutionalId,name,useYn } = subjectInfo
    return new Promise((resolve, reject) => {
      const data = {institutionalId: institutionalId, name: name, useYn: useYn}
      addSubject(data).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增科目
  deleteStudentBySId({ commit }, studentInfo) {
    const { institutionalId, } = studentInfo
    return new Promise((resolve, reject) => {
      const data = {institutionalId: institutionalId,rWeight: rWeight}
      deleteStudentBySId(data).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增学季
  addSchoolSeason({ commit }, subjectInfo) {
    const { institutionalId,seasName,useYn } = subjectInfo
    return new Promise((resolve, reject) => {
      const data = {institutionalId: institutionalId, seasName: seasName, useYn: useYn}
      addSchoolSeason(data).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增学年
  addSchoolYear({ commit }, subjectInfo) {
    const { institutionalId,acadName,useYn } = subjectInfo
    return new Promise((resolve, reject) => {
      const data = {institutionalId: institutionalId, acadName: acadName, useYn: useYn}
      addSchoolYear(data).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 查询科目
  findSubjectByInstitutionalId({ commit }, subjectInfo) {
    const { institutionalId} = subjectInfo
    return new Promise((resolve, reject) => {
      const data = {institutionalId: institutionalId}
      findSubjectByInstitutionalId(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 查询科目
  findSubjectBySubjectId({ commit }, studentInfo) {
    const { institutionalId, } = studentInfo
    return new Promise((resolve, reject) => {
      const data = {institutionalId: institutionalId,rWeight: rWeight}
      findSubjectBySubjectId(data).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 查询学年
  findSchoolYearMasterByInstitutionalId({ commit }, subjectInfo) {
    const { institutionalId} = subjectInfo
    return new Promise((resolve, reject) => {
      const data = {institutionalId: institutionalId}
      findSchoolYearMasterByInstitutionalId(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 查询学季
  findSchoolSeasonMasterByInstitutionalId({ commit }, subjectInfo) {
    const { institutionalId} = subjectInfo
    return new Promise((resolve, reject) => {
      const data = {institutionalId: institutionalId}
      findSchoolSeasonMasterByInstitutionalId(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 根据机构id查询课程检索条件
  findConditionList({ commit }, subjectInfo) {
    const { institutionalId} = subjectInfo
    return new Promise((resolve, reject) => {
      const data = {institutionalId: institutionalId}
      findConditionList(data).then(response => {
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

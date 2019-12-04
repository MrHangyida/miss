import { addClasses,updateClasses,deleteClasses,updateCIdStatus,findClassesStudent,findClassesHoursDetails,findClassesStudentDetails,updateDuty,findClassesStudentByClassesId,updateDutyByStudentId,addClassHour,updateClassHour,deleteClassHour,findClassHourByClassesId,updateClassHourByClassesId,findClassesStudentPageByInId,studentSignUpByCId,findClassesInstitutionalPage,findClassesInstitutional,findClassesStudentByClassesIdAndClassHourId,findClassExamById, findStudentByClassesIdAndClassHourId,addClassExam, findClassesDynamicByCId,findClassesByClassesIdAndInId, sendMessageByClassesIdAndHourId,addCommonLanguage,findCommonLanguage } from '@/api/classes'
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
    // 添加班级
    addClasses({ commit }, classInfo) {
    const { cClassSize, cName, cStatus, cStartTime, cEndTime, headteacherId, courseId, campusId, institutionalId, classHourList} = classInfo
    return new Promise((resolve, reject) => {
       const data = {cClassSize: cClassSize, cName: cName, cStatus: cStatus, cStartTime: cStartTime, cEndTime: cEndTime, headteacherId: headteacherId, courseId: courseId, campusId: campusId, institutionalId: institutionalId}
       for(var item in classHourList){
        var data_item = {
          ['classHourList['+item+'].repeatMode'] : classHourList[item].repeatStatus,
          ['classHourList['+item+'].subjectId'] : classHourList[item].subjectId,
          ['classHourList['+item+'].teacherId'] : classHourList[item].teacherId,
          ['classHourList['+item+'].classroom'] : classHourList[item].classroom,
          ['classHourList['+item+'].institutionalId'] : classHourList[item].institutionalId,
        }
        var data_item_add = {}
        switch (classHourList[item].repeatStatus) {
          case 10:
            data_item_add = {
                ['classHourList['+item+'].attendClassDtm'] : classHourList[item].attendClassDtm,
                ['classHourList['+item+'].startTime'] : classHourList[item].attendClassDtm + ' ' + classHourList[item].startTime + ':00',
                ['classHourList['+item+'].endTime'] :  classHourList[item].attendClassDtm + ' ' + classHourList[item].endTime+ ':00'
            }
            break;
          case 20:
            data_item_add = {
              ['classHourList['+item+'].repeatWeek'] : classHourList[item].repeatMode,
            ['classHourList['+item+'].attendClassDtm'] : '',
            ['classHourList['+item+'].startTime'] : '2019-08-01 ' + classHourList[item].startTime + ':00',
            ['classHourList['+item+'].endTime'] :  '2019-08-01 ' + classHourList[item].endTime+ ':00'
            }
          break;
          case 30:
            data_item_add = {
              ['classHourList['+item+'].repeatMonth'] : classHourList[item].repeatMode,
              ['classHourList['+item+'].attendClassDtm'] : '',
              ['classHourList['+item+'].startTime'] : '2019-08-01 ' + classHourList[item].startTime + ':00',
              ['classHourList['+item+'].endTime'] :  '2019-08-01 ' + classHourList[item].endTime+ ':00'
          }
          break;
          default:
          break;
        }
        Object.assign(data, data_item)
        Object.assign(data, data_item_add)
      }
        addClasses(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 修改班级
  updateClasses({ commit }, classInfo) {
    const {classesId, cClassSize, cName, cStatus, cStartTime, cEndTime, headteacherId, courseId, campusId, institutionalId, classHourList} = classInfo
    return new Promise((resolve, reject) => {
       const data = {cId: classesId, cClassSize: cClassSize, cName: cName, cStatus: cStatus, cStartTime: cStartTime, cEndTime: cEndTime, headteacherId: headteacherId, courseId: courseId, campusId: campusId, institutionalId: institutionalId}
       for(var item in classHourList){
        var data_item = {
          ['classHourList['+item+'].repeatMode'] : classHourList[item].repeatStatus,
          ['classHourList['+item+'].subjectId'] : classHourList[item].subjectId,
          ['classHourList['+item+'].teacherId'] : classHourList[item].teacherId,
          ['classHourList['+item+'].classroom'] : classHourList[item].classroom,
          ['classHourList['+item+'].institutionalId'] : classHourList[item].institutionalId,
        }
        var data_item_add = {}
        switch (classHourList[item].repeatStatus) {
          case 10:
            data_item_add = {
                ['classHourList['+item+'].attendClassDtm'] : classHourList[item].attendClassDtm,
                ['classHourList['+item+'].startTime'] : classHourList[item].attendClassDtm + ' ' + classHourList[item].startTime + ':00',
                ['classHourList['+item+'].endTime'] :  classHourList[item].attendClassDtm + ' ' + classHourList[item].endTime+ ':00'
            }
            break;
          case 20:
            data_item_add = {
              ['classHourList['+item+'].repeatWeek'] : classHourList[item].repeatMode,
              ['classHourList['+item+'].startTime'] : '2019-08-01 ' + classHourList[item].startTime + ':00',
              ['classHourList['+item+'].endTime'] :  '2019-08-01 ' + classHourList[item].endTime+ ':00'
            }
          break;
          case 30:
            data_item_add = {
              ['classHourList['+item+'].repeatMonth'] : classHourList[item].repeatMode,
              ['classHourList['+item+'].startTime'] : '2019-08-01 ' + classHourList[item].startTime + ':00',
              ['classHourList['+item+'].endTime'] :  '2019-08-01 ' + classHourList[item].endTime+ ':00'
          }
          break;
          default:
          break;
        }
        Object.assign(data, data_item)
        Object.assign(data, data_item_add)
      }
        updateClasses(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除班级
  deleteClasses({ commit }, studentInfo) {
    const { institutionalId, classesId} = studentInfo
    return new Promise((resolve, reject) => {
       const data = {institutionalId: institutionalId, classesId: classesId}
        deleteClasses(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 结班
  updateCIdStatus({ commit }, classInfo) {
    const { institutionalId, classesId} = classInfo
    return new Promise((resolve, reject) => {
       const data = {institutionalId: institutionalId, classesId: classesId}
        updateCIdStatus(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 学生详情页-班级培训信息
  findClassesStudent({ commit }, studentInfo) {
    const { institutionalId, studentId } = studentInfo
    return new Promise((resolve, reject) => {
       const data = {institutionalId: institutionalId,studentId: studentId}
        findClassesStudent(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 班级管理-班级详情-课程表分页
  findClassesHoursDetails({ commit }, classInfo) {
    const { institutionalId, classesId,start} = classInfo
    return new Promise((resolve, reject) => {
       const data = {institutionalId: institutionalId,classesId: classesId,start:start}
        findClassesHoursDetails(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 班级管理-班级详情-学生列表分页
  findClassesStudentDetails({ commit }, classInfo) {
    const { institutionalId, classesId } = classInfo
    return new Promise((resolve, reject) => {
       const data = {institutionalId: institutionalId,classesId: classesId}
        findClassesStudentDetails(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 一键签到
  updateDuty({ commit }, classInfo) {
    const { institutionalId,classesId,classHourId,classHourStudentSignList } = classInfo
    return new Promise((resolve, reject) => {
       const data = {institutionalId: institutionalId,classesId: classesId,classHourId: classHourId}
       for(var item in classHourStudentSignList){
          var data_item = {
            ['classHourStudentSignList['+item+'].dutyYn'] : classHourStudentSignList[item].dutyYn,
            ['classHourStudentSignList['+item+'].reasonsAbsence'] : classHourStudentSignList[item].reasonsAbsence,
            ['classHourStudentSignList['+item+'].studentId'] : classHourStudentSignList[item].studentId
          }
          Object.assign(data, data_item)
        }
        updateDuty(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 课堂记录-录入签到-展示所有学生
  findClassesStudentByClassesId({ commit }, classInfo) {
    const { institutionalId,classesId,studentName,classHourId } = classInfo
    return new Promise((resolve, reject) => {
       const data = {institutionalId: institutionalId,classesId: classesId,classHourId:classHourId}
       if(classInfo.studentName != '')
          data.studentName = classInfo.studentName
        findClassesStudentByClassesId(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 选择签到
  updateDutyByStudentId({ commit }, classInfo) {
    const { institutionalId,classesId,classHourId,classHourStudentSignList } = classInfo
    return new Promise((resolve, reject) => {
      const data = {institutionalId: institutionalId,classesId: classesId,classHourId: classHourId}
      for(var item in classHourStudentSignList){
         var data_item = {
           ['classHourStudentSignList['+item+'].dutyYn'] : classHourStudentSignList[item].dutyYn,
           ['classHourStudentSignList['+item+'].reasonsAbsence'] : classHourStudentSignList[item].reasonsAbsence,
           ['classHourStudentSignList['+item+'].studentId'] : classHourStudentSignList[item].studentId
         }
         Object.assign(data, data_item)
       }
        updateDutyByStudentId(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 课堂记录-录入签到-课时签到之后返回到上一页本课时学生签到详情
  findClassesStudentByClassesIdAndClassHourId({ commit }, studentInfo) {
    const { institutionalId,classesId,classHourId } = studentInfo
    return new Promise((resolve, reject) => {
       const data = {institutionalId: institutionalId,classesId: classesId,classHourId: classHourId}
        findClassesStudentByClassesIdAndClassHourId(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 添加课时
  addClassHour({ commit }, studentInfo) {
    const { institutionalId,rWeight } = studentInfo
    return new Promise((resolve, reject) => {
       const data = {institutionalId: institutionalId,rWeight: rWeight}
        addClassHour(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 修改课时
  updateClassHour({ commit }, studentInfo) {
    const { institutionalId,rWeight } = studentInfo
    return new Promise((resolve, reject) => {
       const data = {institutionalId: institutionalId,rWeight: rWeight}
        updateClassHour(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除课时
  deleteClassHour({ commit }, studentInfo) {
    const { institutionalId,rWeight } = studentInfo
    return new Promise((resolve, reject) => {
       const data = {institutionalId: institutionalId,rWeight: rWeight}
        deleteClassHour(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 根据班级分页查询课时
  findClassHourByClassesId({ commit }, studentInfo) {
    const { institutionalId,rWeight } = studentInfo
    return new Promise((resolve, reject) => {
       const data = {institutionalId: institutionalId,rWeight: rWeight}
        findClassHourByClassesId(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 班级管理-班级详情-课程调整
  updateClassHourByClassesId({ commit }, classInfo) {
    const { institutionalId,classHourId, classesId, teacherId, classroom, attendClassDtm, startTime, endTime } = classInfo
    return new Promise((resolve, reject) => {
       const data = {institutionalId: institutionalId, classHourId: classHourId, classesId: classesId, teacherId: teacherId, classroom: classroom, attendClassDtm: attendClassDtm}

       data.attendClassDtm = new Date(attendClassDtm+ ' 00:00:00')
       data.startTime = new Date(attendClassDtm+" "+ startTime + ':00')
       data.endTime = new Date(attendClassDtm+" "+ endTime+ ':00')
        updateClassHourByClassesId(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 学生报名
  studentSignUpByCId({ commit }, studentInfo) {
    const { institutionalId, studentId, classesIds} = studentInfo
    return new Promise((resolve, reject) => {
       const data = {institutionalId: institutionalId,studentId: studentId, classesIds: classesIds}
        studentSignUpByCId(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 学生报名-班级列表
  findClassesStudentPageByInId({ commit }, classInfo) {
    const { institutionalId, start, count, total,name,studentId} = classInfo
    return new Promise((resolve, reject) => {
       const data = {institutionalId: institutionalId, start: start,studentId:studentId,name:name}
        findClassesStudentPageByInId(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 班级列表
  findClassesInstitutionalPage({ commit }, classInfo) {
    const { institutionalId,studentId,start,name} = classInfo
    return new Promise((resolve, reject) => {
       const data = {institutionalId: institutionalId,studentId:studentId,start:start,name:name}
        findClassesInstitutionalPage(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 根据机构id查询所有班级
  findClassesInstitutional({ commit }, classInfo) {
    const { institutionalId,start=1,count=100} = classInfo
    return new Promise((resolve, reject) => {
       const data = {institutionalId: institutionalId,start:start,count:count}
        findClassesInstitutionalPage(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 课堂记录-添加测试-课时测试完毕展示测试列表
  findClassExamById({ commit }, classInfo) {
    const { institutionalId, classesId, classHourId} = classInfo
    return new Promise((resolve, reject) => {
       const data = {institutionalId: institutionalId, classesId: classesId, classHourId: classHourId}
        findClassExamById(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 课堂记录-添加测试-课时测试展示学生添加空白成绩
  findStudentByClassesIdAndClassHourId({ commit }, classInfo) {
    const { institutionalId, classesId, classHourId} = classInfo
    return new Promise((resolve, reject) => {
       const data = {institutionalId: institutionalId, classesId: classesId, classHourId: classHourId}
        findStudentByClassesIdAndClassHourId(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 测试成绩提交-新增
  addClassExam({ commit }, classInfo) {
    const { institutionalId, classesId, classHourId, examName, classExamList} = classInfo
    return new Promise((resolve, reject) => {
       const data = {institutionalId: institutionalId, classesId: classesId, classHourId: classHourId, examName: examName}
       for(var item in classExamList){
          var data_item = {
            ['classExamList['+item+'].score'] : classExamList[item].score,
            ['classExamList['+item+'].examName'] : examName,
            ['classExamList['+item+'].studentId'] : classExamList[item].studentId
          }
          Object.assign(data, data_item)
        }
        addClassExam(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 班级相册
  findClassesDynamicByCId({ commit }, classInfo) {
    const { institutionalId, classesId, start} = classInfo
    return new Promise((resolve, reject) => {
       const data = {institutionalId: institutionalId, classesId: classesId, start: start}
        findClassesDynamicByCId(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 根据班级id查询班级信息
  findClassesByClassesIdAndInId({ commit }, classInfo) {
    const { institutionalId, classesId} = classInfo
    return new Promise((resolve, reject) => {
       const data = {institutionalId: institutionalId, classesId: classesId}
        findClassesByClassesIdAndInId(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 发送课程提醒
  sendMessageByClassesIdAndHourId({ commit }, classInfo) {
    const { institutionalId, classesId, classHourId,title, classTime,teacherName,classPlace, options, classSendMasterList} = classInfo
    return new Promise((resolve, reject) => {
       const data = {institutionalId: institutionalId, classesId: classesId, classHourId: classHourId, title: title, classTime: classTime,teacherName: teacherName,classPlace: classPlace, options: options}
       for(var item in classSendMasterList){
        var data_item = {
          ['classSendMasterList['+item+'].studentId'] : classSendMasterList[item].studentId
        }
        Object.assign(data, data_item)
      }
        sendMessageByClassesIdAndHourId(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 保存常用语
  addCommonLanguage({ commit }, classInfo) {
    const { institutionalId, comLanguage, useYn} = classInfo
    return new Promise((resolve, reject) => {
       const data = {institutionalId: institutionalId, comLanguage: comLanguage, useYn: useYn}
        addCommonLanguage(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取常用语
  findCommonLanguage({ commit }, classInfo) {
    const { institutionalId, start, count} = classInfo
    return new Promise((resolve, reject) => {
       const data = {institutionalId: institutionalId, start: start, count: count}
        findCommonLanguage(data).then(response => {
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

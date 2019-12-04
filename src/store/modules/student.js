import { addStudentRemarks,updateStudentRemarksByRId,findStudentRemarksByCondition,findStudentRAndParentsByRId,deleteClassesByStudentMySelfId,shiftClassesByStudentMySelfId,deleteStudentRemarksByRId,getStudentQRCode,sendQRcodeCode } from '@/api/student'
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
    // 机构添加学生
    addStudentRemarks({ commit }, studentInfo) {
    const { institutionalId, rPhone,rSex, rAge,cdn, rName,rBirthday,rCardId,rPeriod,rGrade,rAddressDetails,rAddressProvince,rAddressCity,rAddressArea,rHeight,rWeight,parentList } = studentInfo
    return new Promise((resolve, reject) => {
       const data = {institutionalId: institutionalId,cdn:cdn, rPhone: rPhone,rSex: rSex, rAge: rAge, rName: rName,rBirthday: rBirthday,rCardId: rCardId,rPeriod: rPeriod,rGrade: rGrade,rAddressDetails: rAddressDetails,rAddressProvince: rAddressProvince,rAddressCity: rAddressCity,rAddressArea: rAddressArea,rHeight: rHeight,rWeight: rWeight}
       for(var item in parentList){
          var key = 'parentList['+item+'].pName'
          var data_item = {
            ['parentList['+item+'].pName'] : parentList[item].pName,
            ['parentList['+item+'].pAppellation'] : parentList[item].pAppellation,
            ['parentList['+item+'].pPhone'] : parentList[item].pPhone,
            ['parentList['+item+'].firstContactYn'] : parentList[item].firstContactYn
          }
          Object.assign(data, data_item)
        }
        addStudentRemarks(data).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 机构修改学生
  updateStudentRemarksByRId({ commit }, studentInfo) {
    const { institutionalId,rId,rPhone,rSex, rAge, rName,rBirthday,rCardId,rPeriod,rGrade,rAddressDetails,rAddressProvince,rAddressCity,rAddressArea,rHeight,rWeight,parentList,cdn } = studentInfo
    return new Promise((resolve, reject) => {
      const data = {institutionalId: institutionalId,rId: rId,cdn:cdn, rPhone: rPhone,rSex: rSex, rAge: rAge, rName: rName,rBirthday: new Date(rBirthday),rCardId: rCardId,rPeriod: rPeriod,rGrade: rGrade,rAddressDetails: rAddressDetails,rAddressProvince: rAddressProvince,rAddressCity: rAddressCity,rAddressArea: rAddressArea,rHeight: rHeight,rWeight: rWeight}
       for(var item in parentList){
          var key = 'parentList['+item+'].pName'
          var data_item = {
            ['parentList['+item+'].pName'] : parentList[item].pName,
            ['parentList['+item+'].pAppellation'] : parentList[item].pAppellation,
            ['parentList['+item+'].pPhone'] : parentList[item].pPhone,
            ['parentList['+item+'].firstContactYn'] : parentList[item].firstContactYn
          }
          Object.assign(data, data_item)
        }
        updateStudentRemarksByRId(data).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 查询学生
  findStudentRemarksByCondition({ commit }, studentInfo) {
    const { institutionalId,start,param } = studentInfo
    return new Promise((resolve, reject) => {
        findStudentRemarksByCondition({institutionalId: institutionalId,start:start,param:param }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 学生详情
  findStudentRAndParentsByRId({ commit }, studentInfo) {
    const { InstitutionalId, studentId } = studentInfo
    return new Promise((resolve, reject) => {
        findStudentRAndParentsByRId({ InstitutionalId: InstitutionalId, studentId: studentId}).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 学生详情停课
  deleteClassesByStudentMySelfId({ commit }, studentInfo) {
    const { imageUrl, orgName, nickName,remarks,address,personName,personPhone,orgId } = studentInfo
    return new Promise((resolve, reject) => {
      deleteClassesByStudentMySelfId({ updatePerId: 1, imageUrl: imageUrl, orgName: orgName, nickName: nickName,remarks: remarks,address: address,personName: personName,personPhone: personPhone,orgId:orgId}).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
 // 学生详情转班
 shiftClassesByStudentMySelfId({ commit }, data) {
  const { institutionalId, orgClassesId,classesId,studentId} = data
  return new Promise((resolve, reject) => {
    shiftClassesByStudentMySelfId({ institutionalId, orgClassesId,classesId,studentId}).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
  },
// 删除学生
deleteStudentRemarksByRId({ commit }, studentInfo) {
  const { institutionalId, rid} = studentInfo
  return new Promise((resolve, reject) => {
    deleteStudentRemarksByRId({InstitutionalId: institutionalId, studentId: rid}).then(response => {
      resolve()
    }).catch(error => {
      reject(error)
    })
  })
  },
  //

// 获取孩子二维码
getStudentQRCode({ commit }, studentInfo) {
  const {institutionalId, rid,phone,code} = studentInfo
  return new Promise((resolve, reject) => {
    getStudentQRCode({orgId: institutionalId, stuId: rid,phone:phone,code:code}).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
  },
 //学生详情里的验证码
  sendQRcodeCode({ commit }, phoneInfo) {
    const { phone } = phoneInfo
    return new Promise((resolve, reject) => {
      sendQRcodeCode({ phone: phone.trim()}).then(response => {
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

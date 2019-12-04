import { findOrganByIdForExtension,sendUserRegisterCodeByOrg,findClassesListByInstitutionalId,addExtensionStudentRemarks, } from '@/api/manage'
// import { getToken } from '@/utils/auth'

const state = {
  // token: getToken(),
  name: '',
  avatar: ''
}

const mutations = {
  // SET_TOKEN: (state, token) => {
  //   state.token = token
  // },
  // SET_NAME: (state, name) => {
  //   state.name = name
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // },
  // SET_ORGLOGO: (state, orglogo) => {
  //   state.orglogo = orglogo
  // }
}

const actions = {
  // org update
  findOrganById({ commit }, orgInfo) {
    const { currentOrgId } = orgInfo
    return new Promise((resolve, reject) => {
      findOrganByIdForExtension({ orgId: currentOrgId}).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

 getcodefun({ commit }, phoneinfor) {
    const { phones } = phoneinfor
    return new Promise((resolve, reject) => {
      sendUserRegisterCodeByOrg({ phone: phones}).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

 getfindclasslist({ commit }, orgInfo) {
    const { institutionalId } = orgInfo
    return new Promise((resolve, reject) => {
      findClassesListByInstitutionalId({ institutionalId: institutionalId}).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  addstudent({ commit }, studentInfo) {
      const { studentList,institutionalId,pName, pAppellation,pPhone,phoneCode} = studentInfo
      return new Promise((resolve, reject) => {
         const data = {institutionalId:institutionalId,pName:pName,pAppellation:pAppellation,pPhone:pPhone,phoneCode:phoneCode}
         for(var item in studentList){
            var key = 'studentList['+item+'].pName'
            var data_item = {
              ['studentList['+item+'].rName'] : studentList[item].rName,
              ['studentList['+item+'].rBirthday'] : new Date(studentList[item].rBirthday),
              ['studentList['+item+'].rSex'] : studentList[item].rSex,
              ['studentList['+item+'].rPeriod'] : studentList[item].rPeriod,
               ['studentList['+item+'].rGrade'] : studentList[item].rGrade,
              ['studentList['+item+'].cdn'] : studentList[item].cdn,
              ['studentList['+item+'].classesId'] : studentList[item].classesId,
            }
            Object.assign(data, data_item)
          }
          addExtensionStudentRemarks(data).then(response => {
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

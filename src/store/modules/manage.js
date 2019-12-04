import { findOrganById, updateOrg,saveDept,findDeptByPage,removeDept,updateDept,savePlainUser,updatePlainUser,findUserByPage,findAuthorityGroup,saveRole,findRoleByPage,updateRole,removeRole,removeUserByUserId,findUserByUserId,resetPassByUserId } from '@/api/manage'
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
  },
  SET_ORGLOGO: (state, orglogo) => {
    state.orglogo = orglogo
  }
}

const actions = {
  // org update
  findOrganById({ commit }, orgInfo) {
    const { orgId } = orgInfo
    return new Promise((resolve, reject) => {
      findOrganById({ orgId: orgId}).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
    // org update
  updateOrg({ commit }, orgInfo) {
    const { logo, orgName, nickName,remarks,address,personName,personPhone,orgId } = orgInfo
    return new Promise((resolve, reject) => {
      updateOrg({ logo: logo, orgName: orgName, nickName: nickName,remarks: remarks,address: address,personName: personName,personPhone: personPhone,orgId: orgId}).then(response => {

        commit('SET_ORGLOGO', logo)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  saveDept({ commit }, deptInfo) {
    const { deptName, remarks,orgId} = deptInfo
    return new Promise((resolve, reject) => {
      saveDept({ deptName: deptName, remarks: remarks,orgId:orgId}).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  findDeptByPage({ commit }, pageInfo) {
    const {pageNumber,rowCount,orgId } = pageInfo
    return new Promise((resolve, reject) => {
      findDeptByPage({ pageNumber: pageNumber, rowCount: rowCount, orgId:orgId}).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //删除部门
  removeDept({ commit }, deptInfo) {
    const { deptId} = deptInfo
    return new Promise((resolve, reject) => {
      removeDept({ deptId: deptId}).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },


  updateDept({ commit },deptInfo) {
    const { deptId, deptName, remarks} = deptInfo
    return new Promise((resolve, reject) => {
      updateDept({ deptId: deptId,deptName: deptName, remarks: remarks}).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  //新建员工
  savePlainUser({ commit },planUserInfo) {
    const { userName, sex,teacherFlag, birthday, age, phone, photo, orgId, deptId, loginName, password, roleIdSet, operatorId} = planUserInfo
    return new Promise((resolve, reject) => {
      savePlainUser({ userName: userName, sex: sex=='男' ? 1 : 2, teacherFlag:teacherFlag,birthday: new Date(birthday), age: age, phone: phone, photo: photo, orgId: orgId, deptId: deptId, loginName: loginName, password: password, roleIdSet: 1, operatorId: operatorId}).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  //修改员工
  updatePlainUser({ commit },planUserInfo) {
    const { userName, sex,teacherFlag, birthday, age, phone, photo, orgId, deptId, loginName, password, roleIdSet, operatorId, userId} = planUserInfo
    return new Promise((resolve, reject) => {
      updatePlainUser({ userName: userName, sex: sex=='男' ? 1 : 2,teacherFlag:teacherFlag, birthday: new Date(birthday), age: age, phone: phone, photo: photo, orgId: orgId, deptId: deptId, loginName: loginName, password: password, roleIdSet: 1, operatorId: operatorId, userId: userId}).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  //删除员工
  removeUserByUserId({ commit },planUserInfo) {
    const { userId} = planUserInfo
    return new Promise((resolve, reject) => {
      removeUserByUserId({ userId: userId}).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  //重置员工密码
  resetPassByUserId({ commit },planUserInfo) {
    const { userId} = planUserInfo
    return new Promise((resolve, reject) => {
      resetPassByUserId({ userId: userId}).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //根据用户Id获取用户详情
  findUserByUserId({ commit },planUserInfo) {
    const { userId} = planUserInfo
    return new Promise((resolve, reject) => {
      findUserByUserId({ userId: userId}).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //用户列表
  findUserByPage({ commit }, pageInfo) {
    const {userName,pageNumber,rowCount, orgId } = pageInfo
    return new Promise((resolve, reject) => {
      findUserByPage({ userName:userName ,pageNumber: pageNumber, rowCount: rowCount, orgId: orgId}).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //用户列表
  findAuthorityGroup({ commit }) {
    return new Promise((resolve, reject) => {
      findAuthorityGroup().then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  //保存角色
  saveRole({ commit }, roleInfo) {
    const {roleName, remarks, orgId, userId, authorityIds} = roleInfo
    return new Promise((resolve, reject) => {
      saveRole({roleName: roleName, remarks: remarks, orgId: orgId, userId: userId, authorityIds: authorityIds}).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  //获取角色列表
  findRoleByPage({ commit }, roleInfo) {
    const {orgId, pageNumber, rowCount} = roleInfo
    return new Promise((resolve, reject) => {
      findRoleByPage({orgId: orgId, pageNumber:pageNumber, rowCount:rowCount}).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
   //修改角色
   updateRole({ commit }, roleInfo) {
    const {roleName, remarks, roleId, userId, authorityIds} = roleInfo
    return new Promise((resolve, reject) => {
      updateRole({roleName: roleName, remarks: remarks, roleId: roleId, userId: userId, authorityIds: authorityIds}).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  //删除角色
  removeRole({ commit }, roleInfo) {
    const {roleId} = roleInfo
    return new Promise((resolve, reject) => {
      removeRole({roleId: roleId}).then(response => {
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

import request from '@/utils/request'


export function findOrganById(data) {
  return request({
    url: '/api/business/findOrganById',
    method: 'post',
    data
  })
}

export function sendUserRegisterCodeByOrg(data) {
  return request({
    url: '/api/business/sendUserRegisterCodeByOrg',
    method: 'post',
    data
  })
}


export function updateOrg(data) {
  return request({
    url: '/api/business/updateOrgan',
    method: 'post',
    data
  })
}

export function saveDept(data) {
  return request({
    url: '/api/business/saveDept',
    method: 'post',
    data
  })
}

export function findDeptByPage(data) {
  return request({
    url: '/api/business/findDeptByPage',
    method: 'post',
    data
  })
}
export function removeDept(data) {
  return request({
    url: '/api/business/removeDept',
    method: 'post',
    data
  })
}

export function updateDept(data) {
  return request({
    url: '/api/business/updateDept',
    method: 'post',
    data
  })
}

export function savePlainUser(data) {
  return request({
    url: '/api/business/savePlainUser',
    method: 'post',
    data
  })
}

export function updatePlainUser(data) {
  if(data.password=="******"){
    delete data.password
  }
  return request({
    url: '/api/business/updatePlainUser',
    method: 'post',
    data
  })
}

export function removeUserByUserId(data) {
  return request({
    url: '/api/business/removeUserByUserId',
    method: 'post',
    data
  })
}
export function resetPassByUserId(data) {
  return request({
    url: '/api/business/resetPassByUserId',
    method: 'post',
    data
  })
}
export function findUserByUserId(data) {
  return request({
    url: '/api/business/findUserByUserId',
    method: 'post',
    data
  })
}

export function findUserByPage(data) {
  if(!data.userName){
    delete data.userName;
  }
  return request({
    url: '/api/business/findUserByPage',
    method: 'post',
    data
  })
}

export function findAuthorityGroup() {
  return request({
    url: '/api/business/findAuthorityGroup',
    method: 'post'
  })
}

export function saveRole(data) {
  return request({
    url: '/api/business/saveRole',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/api/business/updateRole',
    method: 'post',
    data
  })
}

export function findRoleByPage(data) {
  return request({
    url: '/api/business/findRoleByPage',
    method: 'post',
    data
  })
}

export function removeRole(data) {
  return request({
    url: '/api/business/removeRole',
    method: 'post',
    data
  })
}
export function findOrganByIdForExtension(data) {
  return request({
    url: '/api/business/findOrganByIdForExtension',
    method: 'post',
    data
  })
}


export function findClassesListByInstitutionalId(data) {
  return request({
    url: '/api/education/findClassesListByInstitutionalId',
    method: 'post',
    data
  })
}

export function addExtensionStudentRemarks(data) {
  return request({
    url: '/api/student/addExtensionStudentRemarks',
    method: 'post',
    data
  })
}


// export function sendUserRegisterCodeByOrg(data) {
//   return request({
//    url: '/api/business/sendUserRegisterCodeByOrg',
//    method: 'post',
//    data
//   })
// }

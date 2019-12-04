import request from '@/utils/request'

/**
 * 机构添加学生
 */
export function addStudentRemarks(data) {
  return request({
    url: '/api/student/addStudentRemarks',
    method: 'post',
    data
  })
}
/**
 * 机构修改学生
 */
export function updateStudentRemarksByRId(data) {
    return request({
        url: '/api/student/updateStudentRemarksByRId',
        method: 'post',
        data
    })
}

/**
 * 学生查询
 */
export function findStudentRemarksByCondition(data) {
    return request({
      url: '/api/student/findStudentRemarksByCondition',
      method: 'post',
      data
    })
  }
/**
 * 学生详情
 */
  export function findStudentRAndParentsByRId(data) {
    return request({
      url: '/api/student/findStudentRAndParentsByRId',
      method: 'post',
      data
    })
  }
/**
 * 学生详情-停课
 */
export function deleteClassesByStudentMySelfId(data) {
  return request({
    url: '/api/student/deleteClassesByStudentMySelfId',
    method: 'post',
    data
  })
}
/**
 * 学生详情-转班
 */
export function shiftClassesByStudentMySelfId(data) {
  return request({
    url: '/api/education/shiftClassesByStudentMySelfId',
    method: 'post',
    data
  })
}
/**
 * 删除学生
 */
export function deleteStudentRemarksByRId(data) {
  return request({
    url: '/api/student/deleteStudentRemarksByRId',
    method: 'post',
    data
  })
}
/**
 * 获取孩子二维码信息
 */
export function getStudentQRCode(data) {
  return request({
    url: '/api/shared/businessBase64EncodeValid',
    method: 'post',
    data
  })
}
export function sendQRcodeCode(data) {
  return request({
    url: '/api/business/sendQRcodeCode',
    method: 'post',
    data
  })
}

import request from '@/utils/request'

/**
 * 添加作业
 */
export function addTask(data) {
  return request({
    url: '/api/education/addTask',
    method: 'post',
    data
  })
}
/**
 * 删除作业
 */
export function deleteTaskByIdAndCourseId(data) {
    return request({
      url: '/api/education/deleteTaskByIdAndCourseId',
      method: 'post',
      data
    })
  }
/**
 * 修改作业
 */
export function updateTask(data) {
    return request({
      url: '/api/education/updateTask',
      method: 'post',
      data
    })
  }
/**
 * 作业详情
 */
export function findTaskByIdAndCourseId(data) {
    return request({
      url: '/api/education/findTaskByIdAndCourseId',
      method: 'post',
      data
    })
  }
/**
 * 作业列表
 */
export function findTaskPage(data) {
    return request({
      url: '/api/education/findTaskPage',
      method: 'post',
      data
    })
  }
/**
 * 发布作业
 */
export function addItemTask(data) {
    return request({
      url: '/api/education/addItemTask',
      method: 'post',
      data
    })
  }
/**
 * 撤回作业
 */
export function deleteItemTaskByIdAndCourseId(data) {
    return request({
      url: '/api/education/deleteItemTaskByIdAndCourseId',
      method: 'post',
      data
    })
  }

/**
 * 布置作业
 */
export function addItemClassTask(data) {
  return request({
    url: '/api/education/addItemClassTask',
    method: 'post',
    data
  })
}
/**
 * 布置作业-作业列表
 */
export function findItemClassTaskById(data) {
  return request({
    url: '/api/education/findItemClassTaskById',
    method: 'post',
    data
  })
}
/**
 * 作业详情
 */
export function findItemClassTaskByItemId(data) {
  return request({
    url: '/api/education/findItemClassTaskByItemId',
    method: 'post',
    data
  })
}
/**
 * 作业回复
 */
export function getStudentHomework(data) {
  return request({
    url: '/xas/msgexhg/gethomework',
    method: 'post',
    data
  })
}

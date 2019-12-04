import request from '@/utils/request'

/**
 * 查询机构学生总数
 */
export function totalStudent(data) {
  return request({
    url: '/api/student/totalStudent',
    method: 'post',
    data
  })
}
/**
 * 查询机构开班总数
 */
export function totalClasses(data) {
    return request({
      url: '/api/education/totalClasses',
      method: 'post',
      data
    })
  }
  /**
 * 查询机构课时情况
 */
export function findTodayClassHourByInstitutionalId(data) {
    return request({
      url: '/api/education/findTodayClassHourByInstitutionalId',
      method: 'post',
      data
    })
  }
   /**
 * 获取行为日志
 */
export function findBehaviorLog(data) {
  return request({
    url: '/api/log/findBehaviorLog',
    method: 'post',
    data
  })
}
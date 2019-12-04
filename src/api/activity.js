import request from '@/utils/request'

/**
 * 查询活动列表
 */
export function findActivityByPage(data) {
  return request({
    url: '/api/activity/findActivityByPage',
    method: 'post',
    data
  })
}

/**
 * 添加活动
 */
export function saveActivity(data) {
    return request({
      url: '/api/activity/saveActivity',
      method: 'post',
      data
    })
}

/**
 * 查看报名列表
 */
export function findSignUpByActivityId(data) {
    return request({
      url: '/api/activity/findSignUpByActivityId',
      method: 'post',
      data
    })
  }

/**
 * 是否开启活动
 */
export function updateIsStartByActivityId(data) {
    return request({
      url: '/api/activity/updateIsStartByActivityId',
      method: 'post',
      data
    })
  }

/**
 * 活动延期
 */
export function extension(data) {
    return request({
      url: '/api/activity/extension',
      method: 'post',
      data
    })
  }

/**
 * 删除活动信息
 */
export function removeActivityByActivityId(data) {
    return request({
      url: '/api/activity/removeActivityByActivityId',
      method: 'post',
      data
    })
  }

/**
 * 根据ID修改活动信息
 */
export function updateActivityByActivityId(data) {
    return request({
      url: '/api/activity/updateActivityByActivityId',
      method: 'post',
      data
    })
  }

/**
 * 根据ID查看活动详情
 */
export function findDetailsByActivityId(data) {
    return request({
      url: '/api/activity/findDetailsByActivityId',
      method: 'post',
      data
    })
  }
 
/**
 * 根据机构ID查询活动总数
 */
export function findActivityCount(data) {
    return request({
      url: '/api/activity/findActivityCount',
      method: 'post',
      data
    })
  }

/**
 * 根据报名信息Id修改审核状态
 */
export function approvalSignMess(data) {
  return request({
    url: '/api/activity/approvalSignMess',
    method: 'post',
    data
  })
}
   
/**
 * 报名结果导出
 */
export function exportSignIn(data) {
  let url = process.env.VUE_APP_BASE_API +'/api/activity/exportSignIn/' + data.activityId + '?access_token=' + data.access_token
  window.open(url, '_blank')
}
   
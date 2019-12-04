import request from '@/utils/request'

/**
 * 查询省级行政区划
 */
export function findProvince(data) {
  return request({
    url: '/api/shared/findProvince',
    method: 'post',
    data
  })
}
/**
 * 查询市级行政区划
 */
export function findCity(data) {
    return request({
      url: '/api/shared/findCity',
      method: 'post',
      data
    })
  }
  /**
 * 查询县/区级行政区划
 */
export function findCounty(data) {
    return request({
      url: '/api/shared/findCity',
      method: 'post',
      data
    })
  }
/**
 * 查询基础信息，例如 男女类型（dictCode），活动类型(activity)，素养类型(attainment)
 */
export function findDictByDictCode(data) {
  return request({
    url: '/api/shared/findDictByDictCode',
    method: 'post',
    data
  })
}

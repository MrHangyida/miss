import request from '@/utils/request'

/**
 * 新增课程大类
 */
export function addCourseCategoryMaster(data) {
  return request({
    url: '/api/education/addCourseCategoryMaster',
    method: 'post',
    data
  })
}
/**
 * 修改课程大分类
 */
export function updateCourseCategoryMaster(data) {
    return request({
      url: '/api/education/updateCourseCategoryMaster',
      method: 'post',
      data
    })
  }
  /**
   * 课程大类删除
   */
export function deleteCourseCategoryMasterByCouCatId(data) {
    return request({
      url: '/api/education/deleteCourseCategoryMasterByCouCatId',
      method: 'post',
      data
    })
  }
  /**
   * 查询课程大类
   */
  export function findAllCourseCategory(data) {
    return request({
      url: '/api/education/findAllCourseCategory',
      method: 'post',
      data
    })
  }
  /**
   * 新增课程
   */
  export function addCourse(data) {
    return request({
      url: '/api/education/addCourse',
      method: 'post',
      data
    })
  }
  /**
   * 修改课程
   */
  export function updateCourse(data) {
    return request({
      url: '/api/education/updateCourse',
      method: 'post',
      data
    })
  }
  /**
   * 删除课程
   */
  export function deleteCourseByCId(data) {
    return request({
      url: '/api/education/deleteCourseByCId',
      method: 'post',
      data
    })
  }
  /**
   * 修改课程状态
   */
  export function updateCourseIdStatus(data) {
    return request({
      url: '/api/education/updateCourseIdStatus',
      method: 'post',
      data
    })
  }
  /**
   * 查询课程
   */
  export function findCoursePage(data) {
    return request({
      url: '/api/education/findCoursePage',
      method: 'post',
      data
    })
  }
  /**
   * 课程状态修改
   */
  export function updateCourseStatus(data) {
    return request({
      url: '/api/education/updateCourseStatus',
      method: 'post',
      data
    })
  }
  /**
   * 课程详情
   */
  export function findClassesCourseDetails(data) {
    return request({
      url: '/api/education/findClassesCourseDetails',
      method: 'post',
      data
    })
  }
  /**
   * 添加科目
   */
  export function addSubject(data) {
    return request({
      url: '/api/education/addSubject',
      method: 'post',
      data
    })
  }
  /**
   * 添加学年
   */
  export function addSchoolYear(data) {
    return request({
      url: '/api/education/addSchoolYearMaster',
      method: 'post',
      data
    })
  }
  /**
   * 添加学季
   */
  export function addSchoolSeason(data) {
    return request({
      url: '/api/education/addSchoolSeasonMaster',
      method: 'post',
      data
    })
  }
  /**
   * 删除科目
   */
  export function deleteStudentBySId(data) {
    return request({
      url: '/api/education/deleteStudentBySId',
      method: 'post',
      data
    })
  }
  /**
   * 根据机构id查询科目
   */
  export function findSubjectByInstitutionalId(data) {
    return request({
      url: '/api/education/findSubjectByInstitutionalId',
      method: 'post',
      data
    })
  }
  /**
   * 根据科目id查询科目
   */
  export function findSubjectBySubjectId(data) {
    return request({
      url: '/api/education/findSubjectBySubjectId',
      method: 'post',
      data
    })
  }
/**
 * 根据机构id查询学年
 */
export function findSchoolYearMasterByInstitutionalId(data) {
  return request({
    url: '/api/education/findSchoolYearMasterByInstitutionalId',
    method: 'post',
    data
  })
}
/**
 * 根据机构id查询学季
 */
export function findSchoolSeasonMasterByInstitutionalId(data) {
  return request({
    url: '/api/education/findSchoolSeasonMasterByInstitutionalId',
    method: 'post',
    data
  })
}
/**
 * 根据机构id查询课程检索条件
 */
export function findConditionList(data) {
  return request({
    url: '/api/education/findConditionList',
    method: 'post',
    data
  })
}

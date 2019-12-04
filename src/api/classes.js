import request from '@/utils/request'

/**
 * 添加班级
 */
export function addClasses(data) {
  return request({
    url: '/api/education/addClasses',
    method: 'post',
    data
  })
}
/**
 * 修改班级
 */
export function updateClasses(data) {
    return request({
      url: '/api/education/updateClasses',
      method: 'post',
      data
    })
  }
  /**
 * 删除班级
 */
export function deleteClasses(data) {
    return request({
      url: '/api/education/deleteClasses',
      method: 'post',
      data
    })
  }
/**
 * 结班
 */
export function updateCIdStatus(data) {
    return request({
      url: '/api/education/updateCIdStatus',
      method: 'post',
      data
    })
  }
  /**
 * 学生详情页-班级培训信息
 */
export function findClassesStudent(data) {
    return request({
      url: '/api/education/findClassesStudent',
      method: 'post',
      data
    })
  }
  /**
 * 班级管理-班级详情-课程表分页
 */
export function findClassesHoursDetails(data) {
    return request({
      url: '/api/education/findClassesHoursDetails',
      method: 'post',
      data
    })
  }
  /**
 * 班级管理-班级详情-学生列表分页
 */
export function findClassesStudentDetails(data) {
    return request({
      url: '/api/education/findClassesStudentDetails',
      method: 'post',
      data
    })
  }
/**
 * 一键签到
 */
export function updateDuty(data) {
    return request({
      url: '/api/education/updateDuty',
      method: 'post',
      data
    })
  }
/**
 * 课堂记录-录入签到-展示所有学生
 */
export function findClassesStudentByClassesId(data) {
    return request({
      url: '/api/education/findClassesStudentByClassesId',
      method: 'post',
      data
    })
  }
/**
 * 选择签到
 */
export function updateDutyByStudentId(data) {
    return request({
      url: '/api/education/updateDutyByStudentId',
      method: 'post',
      data
    })
  }
  /**
 * 课堂记录-录入签到-课时签到之后返回到上一页本课时学生签到详情
 */
export function findClassesStudentByClassesIdAndClassHourId(data) {
  return request({
    url: '/api/education/findClassesStudentByClassesIdAndClassHourId',
    method: 'post',
    data
  })
}
/**
 * 添加课时
 */
export function addClassHour(data) {
    return request({
      url: '/api/education/addClassHour',
      method: 'post',
      data
    })
  }
/**
 * 修改课时
 */
export function updateClassHour(data) {
    return request({
      url: '/api/education/updateClassHour',
      method: 'post',
      data
    })
  }
/**
 * 删除课时
 */
export function deleteClassHour(data) {
    return request({
      url: '/api/education/deleteClassHour',
      method: 'post',
      data
    })
  }
/**
 * 根据班级分页查询课时
 */
export function findClassHourByClassesId(data) {
    return request({
      url: '/api/education/findClassHourByClassesId',
      method: 'post',
      data
    })
  }
  /**
 * 班级管理-班级详情-课程调整
 */
export function updateClassHourByClassesId(data) {
    return request({
      url: '/api/education/updateClassHourByClassesId',
      method: 'post',
      data
    })
  }
/**
 * 学生报名
 */
export function studentSignUpByCId(data) {
  return request({
    url: '/api/education/studentSignUpByCId',
    method: 'post',
    data
  })
}
/**
 * 学生报名-班级列表
 */
export function findClassesStudentPageByInId(data) {
  return request({
    url: '/api/education/findClassesStudentPageByInId',
    method: 'post',
    data
  })
}

/**
 * 班级列表
 */
export function findClassesInstitutionalPage(data) {
  if(data.start==undefined){
    data.start=1;
  }
  return request({
    url: '/api/education/findClassesInstitutionalPage',
    method: 'post',
    data
  })
}
/**
 * 课堂记录-添加测试-课时测试完毕展示测试列表
 */
export function findClassExamById(data) {
  return request({
    url: '/api/education/findClassExamById',
    method: 'post',
    data
  })
}
/**
 * 课堂记录-添加测试-课时测试展示学生添加空白成绩
 */
export function findStudentByClassesIdAndClassHourId(data) {
  return request({
    url: '/api/education/findStudentByClassesIdAndClassHourId',
    method: 'post',
    data
  })
}
/**
 * 测试成绩提交-新增
 */
export function addClassExam(data) {
  return request({
    url: '/api/education/addClassExam',
    method: 'post',
    data
  })
}
/**
 * 班级相册
 */
export function findClassesDynamicByCId(data) {
  return request({
    url: '/api/education/findClassesDynamicByCId',
    method: 'post',
    data
  })
}
/**
 * 根据班级id查询班级信息
 */
export function findClassesByClassesIdAndInId(data) {
  return request({
    url: '/api/education/findClassesByClassesIdAndInId',
    method: 'post',
    data
  })
}
/**
 * 发送课程通知
 */
export function sendMessageByClassesIdAndHourId(data) {
  return request({
    url: '/api/education/sendMessageByClassesIdAndHourId',
    method: 'post',
    data
  })
}
/**
 * 保存常用语
 */
export function addCommonLanguage(data) {
  return request({
    url: '/api/education/addCommonLanguage',
    method: 'post',
    data
  })
}
/**
 * 查询常用语
 */
export function findCommonLanguage(data) {
  return request({
    url: '/api/education/findCommonLanguage',
    method: 'post',
    data
  })
}

/**
 * 学生详情发送二维码
 */
export function sendQRcodeCode(data) {
  return request({
    url: '/api/education/sendQRcodeCode',
    method: 'post',
    data
  })
}

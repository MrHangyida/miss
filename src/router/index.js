import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/reg',
    component: () => import('@/views/login/reg'),
    hidden: true
  },
  {
    path: '/pwd',
    component: () => import('@/views/login/pwd'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/spread',
    component: () => import('@/views/spread/spread'),
    hidden: true
  },
  {
    path: '/speardForm',
    component: () => import('@/views/spread/speardForm'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '仪表盘',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '仪表盘', icon: 'dashboard' }
    }]
  },
  {
    path: '/settings',
    component: Layout,
    redirect: '/settings/manage/index',
    name: '机构管理',
    meta: { title: '机构管理', icon: 'quanxian' },
    children: [
      {
        path: 'manage',
        name: '机构设置',
        component: () => import('@/views/settings/manage/index'),
        meta: { title: '机构设置', icon: 'lingxing' }
      },
      {
        path: 'modifypwd',
        name: '修改密码',
        component: () => import('@/views/settings/manage/modifypwd')
      },
      {
        path: 'groups',
        name: '组织架构',
        component: () => import('@/views/settings/groups/index'),
        meta: { title: '组织架构', icon: 'lingxing' }
      },
      // {
      //   path: 'roles',
      //   name: '角色管理',
      //   component: () => import('@/views/settings/roles/index'),
      //   meta: { title: '角色管理', icon: 'lingxing' }
      // },
      {
        path: 'staff',
        name: '员工管理',
        component: () => import('@/views/settings/staff/index'),
        meta: { title: '员工管理', icon: 'lingxing' }
      },
      {
        path: 'staff/add',
        name: '新建员工',
        component: () => import('@/views/settings/staff/add')
      }
    ]
  },
  {
    path: '/course',
    component: Layout,
    redirect: '/course/type',
    name: '课程管理',
    meta: { title: '课程管理', icon: 'kecheng' },
    children: [
      {
        path: 'type',
        name: '课程大类',
        component: () => import('@/views/course/type/index'),
      },
      {
        path: 'manage',
        name: '课程管理',
        component: () => import('@/views/course/manage/index'),
        meta: { title: '课程管理', icon: 'lingxing' }
      },
      {
        path: 'add',
        name: '新建课程',
        component: () => import('@/views/course/manage/add')
      },
      {
        path: 'detail',
        name: '课程详情',
        component: () => import('@/views/course/manage/detail')
      },
      {
        path: 'class',
        name: '班级管理',
        component: () => import('@/views/course/class/index'),
        meta: { title: '班级管理', icon: 'lingxing' }
      },
      {
        path: 'class/add',
        name: '新增班级',
        component: () => import('@/views/course/class/add')
      },
      {
        path: 'class/album',
        name: '班级相册',
        component: () => import('@/views/course/class/album')
      },
      {
        path: 'class/detail',
        name: '班级详情',
        component: () => import('@/views/course/class/detail')
      },
      {
        path: 'class/notice',
        name: '班级详情',
        component: () => import('@/views/course/class/notice')
      },
      {
        path: 'work',
        name: '作业管理',
        component: () => import('@/views/course/work/index'),
        meta: { title: '作业管理', icon: 'lingxing' }
      },
      {
        path: 'work/add',
        name: '新建作业',
        component: () => import('@/views/course/work/add')
      },
      {
        path: 'work/detail',
        name: '作业详情',
        component: () => import('@/views/course/work/detail')
      },
      {
        path: 'work/reply',
        name: '作业详情',
        component: () => import('@/views/course/work/reply')
      },
      {
        path: 'work/sendtostudent',
        name: '布置作业',
        component: () => import('@/views/course/work/sendtostudent')
      },
      {
        path: 'class/record',
        name: '课堂记录',
        component: () => import('@/views/course/class/record/index')
      },
      {
        path: 'class/sign',
        name: '签到',
        component: () => import('@/views/course/class/record/sign')
      },
      {
        path: 'class/test',
        name: '测试',
        component: () => import('@/views/course/class/record/test')
      },
      {
        path: 'class/work',
        name: '作业',
        component: () => import('@/views/course/class/work')
      },
      {
        path: 'class/dynamic',
        name: '动态',
        component: () => import('@/views/course/class/record/dynamic')
      }
    ]
  },

  {
    path: '/student',
    component: Layout,
    redirect: '/student/list',
    name: '学生管理',
    meta: { title: '学生管理', icon: 'xuesheng' },
    children: [
      {
        path: 'list',
        name: '报名',
        component: () => import('@/views/student/index'),
        meta: { title: '学生管理', icon: 'lingxing' }
      },
      {
        path: 'add',
        name: '报名',
        component: () => import('@/views/student/add/index')
      },
      {
        path: 'assign',
        name: '分班',
        component: () => import('@/views/student/assign/index')
      },
      {
        path: 'detail',
        name: '学生详情',
        component: () => import('@/views/student/detail/index')
      },
      {
        path: 'training',
        name: '课程详情',
        component: () => import('@/views/student/detail/training')
      }
    ]
  },


  {
    path: '/activity',
    component: Layout,
    redirect: '/activity/index',
    name: '活动管理',
    meta: { title: '活动管理', icon: 'huodong' },
    children: [
      {
        path: 'activity',
        name: '活动管理',
        component: () => import('@/views/activity/index'),
        meta: { title: '活动管理', icon: 'lingxing' }
      },
      {
        path: 'add',
        name: '新建活动',
        component: () => import('@/views/activity/add')
      },
      {
        path: 'detail',
        name: '活动详情',
        component: () => import('@/views/activity/detail')
      }
    ]
  },




  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

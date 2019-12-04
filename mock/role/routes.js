// Just a mock data

export const constantRoutes = [
    {
      path: '/login',
      component: 'views/login/index',
      hidden: true
    },
    {
      path: '/404',
      component: 'views/error-page/404',
      hidden: true
    },
    {
      path: '/401',
      component: 'views/error-page/401',
      hidden: true
    },
    {
      path: '',
      component: 'layout/Layout',
      redirect: 'dashboard',
      children: [
        {
          path: 'dashboard',
          component: 'views/dashboard/index',
          name: 'Dashboard',
          meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
        }
      ]
    }
  ]
  
  export const asyncRoutes = [
    {
      path: '/student',
      component: 'layout/Layout',
      redirect: '/student/add',
      alwaysShow: true,
      meta: {
        title: '学生管理',
        icon: 'lock',
        roles: ['admin', 'editor']
      },
      children: [
        {
          path: 'add',
          component: 'views/student/add/index',
          name: '报名',
          meta: {
            title: '报名',
            roles: ['admin']
          }
        },
        {
          path: 'assign',
          component: 'views/student/assign/index',
          name: '分班',
          meta: {
            title: '分班'
          }
        },
        {
          path: 'detail',
          component: 'views/student/detail/index',
          name: '学生详情',
          meta: {
            title: '学生详情',
            roles: ['admin']
          }
        },
        {
          path: 'training',
          component: 'views/student/detail/training',
          name: '课程详情',
          meta: {
            title: '课程详情',
            roles: ['admin']
          }
        }
      ]
    },
    {
      path: '/course',
      component: 'layout/Layout',
      redirect: '/course/type',
      alwaysShow: true,
      meta: {
        title: '课程管理',
        icon: 'lock',
        roles: ['admin', 'editor']
      },
      children: [
        {
          path: 'type',
          component: 'views/course/type/index',
          name: '课程大类',
          meta: {
            title: '课程大类',
            roles: ['admin']
          }
        },
        {
          path: 'manage',
          component: 'views/course/manage/index',
          name: '课程管理',
          meta: {
            title: '课程管理'
          }
        },
        {
          path: 'add',
          component: 'views/course/manage/add',
          name: '新建课程',
          meta: {
            title: '新建课程',
            roles: ['admin']
          }
        },
        {
          path: 'detail',
          component: 'views/course/manage/detail',
          name: '课程详情',
          meta: {
            title: '课程详情',
            roles: ['admin']
          }
        },
        {
            path: 'work',
            component: 'views/course/work/index',
            name: '作业管理',
            meta: {
              title: '作业管理',
              roles: ['admin']
            }
          },
          {
            path: 'work/add',
            component: 'views/course/work/add',
            name: '新建作业',
            meta: {
              title: '新建作业',
              roles: ['admin']
            }
          },
          {
              path: 'work/detail',
              component: 'views/course/work/detail',
              name: '作业详情',
              meta: {
                title: '作业详情',
                roles: ['admin']
              }
            },
            {
              path: 'class',
              component: 'views/course/class/index',
              name: '班级管理',
              meta: {
                title: '班级管理',
                roles: ['admin']
              }
            },
              {
                path: 'class/add',
                component: 'views/course/class/add',
                name: '新建班级',
                meta: {
                  title: '新建班级',
                  roles: ['admin']
                }
              },
              {
                path: 'class/album',
                component: 'views/course/class/album',
                name: '班级相册',
                meta: {
                  title: '班级相册',
                  roles: ['admin']
                }
            }
      ]
    },
  
    {
      path: '/activity',
      component: 'layout/Layout',
      children: [
        {
          path: 'index',
          component: 'views/icons/index',
          name: '活动管理',
          meta: { title: '活动管理', icon: 'icon', noCache: true }
        }
      ]
    },
    {
      path: '/settings',
      component: 'layout/Layout',
      redirect: '/settings/manage/index',
      alwaysShow: true,
      meta: {
        title: '机构管理',
        icon: 'lock',
        roles: ['admin', 'editor']
      },
      children: [
        {
          path: 'manage',
          component: 'views/settings/manage/index',
          name: '机构设置',
          meta: {
            title: '机构设置',
            roles: ['admin']
          }
        },
        {
          path: 'groups',
          component: 'views/settings/groups/index',
          name: '组织架构',
          meta: {
            title: '组织架构'
          }
        },
        // {
        //   path: 'roles',
        //   component: 'views/settings/roles/index',
        //   name: '角色管理',
        //   meta: {
        //     title: '角色管理',
        //     roles: ['admin']
        //   }
        // },
        {
          path: 'staff',
          component: 'views/settings/staff/index',
          name: '员工管理',
          meta: {
            title: '员工管理',
            roles: ['admin']
          }
        }
      ]
    },
    { path: '*', redirect: '/404', hidden: true }
  ]
  
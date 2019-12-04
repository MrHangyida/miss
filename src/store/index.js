import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import manage from './modules/manage'
import student from './modules/student'
import user from './modules/user'
import course from './modules/course'
import classes from './modules/classes'
import work from './modules/work'
import upyun from './modules/upyun'
import shared from './modules/shared'
import dashboards from './modules/dashboard'
import activity from './modules/activity'
import H5api from './modules/H5api'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    manage,
    H5api,
    student,
    course,
    classes,
    work,
    upyun,
    shared,
    dashboards,
    activity
  },
  getters
})

export default store

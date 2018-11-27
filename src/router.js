import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/Home'
// import Login from './components/Login'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import TaskDetail from './components/TaskDetail'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [{
        path: '/newTask',
        name: 'newTask',
        component: TaskForm
      }, {
        path: '/taskList',
        name: 'taskList',
        component: TaskList
      }]
    }, {
      path: '/tasks',
      name: 'task',
      component: TaskDetail
    }
  ]
})

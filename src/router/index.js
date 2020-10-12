import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '../components/layout/Layout'
import Section from '../components/layout/Section'

Vue.use(VueRouter)
/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
//所有权限通用路由表 
//如首页和登录页和一些不用权限的公用页面
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/error/404'), hidden: true },
  {
    path: '',
    component: Section,
    redirect: '/home',
    hidden: true,
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'el-icon-s-home' }
    }]
  },
  {
    path: '/manage',
    component: Layout,
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'el-icon-s-home' }
    },
    {
      path: 'setting',
      name: 'Setting',
      component: () => import('@/views/setting/index'),
      meta: { title: '设置', icon: 'setting' },
      hidden: true,
    },
    {
      path: 'userinfo',
      name: 'Userinfo',
      component: () => import('@/views/userinfo/index'),
      meta: { title: '用户信息', icon: 'userinfo' },
      hidden: true,
    }]
  },  
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/about/index.vue'),
    meta: { title: '关于', icon: 'el-icon-menu' }
  }
]

//异步挂载的路由
//动态需要根据权限加载的路由表 
export const asyncRouterMap = [
  {
    path: '/manage/organization',
    name: 'Organization',
    component: Layout,
    meta: { title: '组织机构管理', icon: 'el-icon-menu', isDirect: true },
    children: [{
      path: 'usermanage',
      name: 'UserManage',
      component: () => import('@/views/organization/usermanage/index'),
      meta: { title: '用户管理', icon: 'el-icon-user' }
    },
    {
      path: 'roles',
      name: 'Roles',
      component: () => import('@/views/organization/roles'),
      meta: { title: '角色管理', icon: 'el-icon-s-custom' }
    }]
  },
  {
    path: '/manage/authmanage',
    name: 'AuthManage',
    component: Layout,
    meta: { title: '权限管理', icon: 'el-icon-wind-power', isDirect: true },
    children: [{
      path: 'menu',
      name: 'Menu',
      component: () => import('@/views/authmanage/menu/index'),
      meta: { title: '菜单管理', icon: 'el-icon-s-check' }
    },
    {
      path: 'resource',
      name: 'Resource',
      component: () => import('@/views/authmanage/resource/index'),
      meta: { title: '资源管理', icon: 'el-icon-notebook-2' }
    }]
  },
  {
    path: '/manage/logsmanage',
    name: 'LogsManage',
    component: Layout,
    meta: { title: '日志管理', icon: 'el-icon-document', isDirect: true },
    children: [{
      path: 'operationlogs',
      name: 'OperationLogs',
      component: () => import('@/views/logsmanage/operationlogs'),
      meta: { title: '操作日志', icon:'el-icon-reading' }
    },
    {
      path: 'visitlogs',
      name: 'VisitLogs',
      component: () => import('@/views/logsmanage/visitlogs'),
      meta: { title: '访问日志', icon: 'el-icon-notebook-1' }
    }]
  },
  {
    path: '/manage/systemmanage',
    name: 'SystemManage',
    component: Layout,
    meta: { title: '系统管理', icon: 'el-icon-setting', isDirect: true },
    children: [{
      path: 'onlineuser',
      name: 'OnlineUser',
      component: () => import('@/views/systemmanage/onlineuser'),
      meta: { title: '在线用户', icon: 'el-icon-time' }
    },
    {
      path: 'cache',
      name: 'Cache',
      component: () => import('@/views/systemmanage/cache'),
      meta: { title: '缓存管理', icon: 'el-icon-postcard' }
    },
    {
      path: 'safe',
      name: 'Safe',
      component: () => import('@/views/systemmanage/safe'),
      meta: { title: '安全设置', icon: 'el-icon-first-aid-kit' }
    }]
  },

  //最后跳转404
  { path: '*', redirect: '/404', hidden: true }
]

export default new VueRouter({
  routes: constantRouterMap
})

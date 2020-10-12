import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 网页加载中进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单
var istrue = true
router.beforeEach((to, from, next) => {
  NProgress.start() 
  if(istrue){ 
    /** 临时用，现在还没有做权限,用的时候把getToken前的！去掉*/
    store.dispatch('GenerateRoutes', 1).then(() => { // 生成可访问的路由表
      istrue=false
      router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
      next({ ...to, replace: true })
    })
  }else{next()}
    /** end */
  /*  
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          let menus=res.data.menus;
          let username=res.data.username;
          store.dispatch('GenerateRoutes', { menus,username }).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
            next({ ...to, replace: true })
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {      
      // next('/login')
      NProgress.done()
    }
  }*/
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

// 配置routes
import { MfbMain, MfbErrorPage } from '@mfb/pc-components'
import cookies from './cookie'
let routes = [
  {
    path: '/',
    name: 'main',
    component: MfbMain,
    children: []
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ 'views/Login.vue')
  },
  //   {
  //     path: '*',
  //     component: MfbErrorPage
  // }
]

function setPagesRoutes(list) {
  return routes = [...routes, ...list]
}

function setViewsRoutes(list) {
  return routes[0].children = [...routes[0].children, ...list]
}

function routerHook(router) {
  router.beforeEach((to, from, next) => {
    if (!to.matched.length) {
      //如果未匹配到路由 登录页 默认登录页、其它 错误页
      next({
        path: from.name === 'login' ? '/login' : '/error',
        replace: true
      })
      // from.name ? next({ name: from.name }) : next('/');   //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
    } else {
      if (to.name === 'login') {
        next();
      } else {
        //如果匹配 1、token鉴权
        let token = cookies && (cookies.getCookie("accessToken"))
        console.log(token);
        // next({
        //     path: '/login',
        //     query: {
        //         redirect: to.path  // 将跳转的路由path作为参数，登录成功后再跳转到该路由
        //     }
        // })

        // 路由进入下一个路由对象前，判断是否需要登陆
        if (token) {
          // 有token 正常跳转
          next()
        } else {
          // 无token 登录 去登录
          next({
            path: '/login',
            query: {
              redirect: to.path  // 将跳转的路由path作为参数，登录成功后再跳转到该路由
            }
          })
        }
      }
    }
  })
}

/**
 * 
 * @param {*} routesType: 0：当前层、1子层  routesName：层级name集合 routeList：路由列表
 */
export function getRouter({
  pageRoutes = [],
  viewRoutes = [],
  router: Router
}) {
  setPagesRoutes(pageRoutes)
  setViewsRoutes(viewRoutes)
  const router = new Router({ routes })
  routerHook(router)
  return router
}

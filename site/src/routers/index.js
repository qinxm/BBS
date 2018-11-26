import Vue from "vue"
import Router from "vue-router"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import HelloWorld from './components/HelloWorld.vue'
import Login from '../views/login.vue'
import Index from '../views/index.vue'
import Home from '../views/home.vue'
import PostDetail from '../views/post/detail.vue'
import NewDrafts from '../views/editor/drafts/create.component.vue'
import CategoryCreate from '../views/category/create.component.vue'
import CategoryList from '../views/category/list.component.vue'

NProgress.configure({
  showSpinner: false
});
Vue.use(Router)
const routes = [{
  path: '/',
  redirect: '/home',
  component: Index,
  children: [{
    path: '/home',
    name: 'home',
    component: Home,
  }, {
    path: '/post/:id',
    name: 'postDetail',
    component: PostDetail
  },{
    path: '/category/list',
    name: 'categoryList',
    component: CategoryList,
  },{
    path: '/category/create',
    name: 'categoryCreate',
    component: CategoryCreate,
  },
  ]
},{
  path: '/login',
  name: 'login',
  component: Login
}, {
  path: '/editor/drafts/new',
  name: 'newDrafts',
  component: NewDrafts
}, ]
const router = new Router({
  routes
})
router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
})

router.afterEach((to, from, next) => {
  NProgress.done(); // 结束Progress
})
export default router

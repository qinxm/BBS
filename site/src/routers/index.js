import Vue from "vue"
import Router from "vue-router"
// import HelloWorld from './components/HelloWorld.vue'
import Login from '../views/login.vue'
import Index from '../views/index.vue'
import Home from '../views/home.vue'
import NewDrafts from '../views/editor/drafts/create.component.vue'
import CategoryCreate from '../views/category/create.component.vue'
import CategoryList from '../views/category/list.component.vue'

Vue.use(Router)
const routes = [{
  path: '/',
  redirect: '/home',
  component: Index,
  children: [{
    path: '/home',
    component: Home,
  }, {
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
  name: 'Login',
  component: Login
}, {
  path: '/editor/drafts/new',
  name: 'newDrafts',
  component: NewDrafts
}, ]
const router = new Router({
  routes
})
export default router

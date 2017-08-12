// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource';
import index from '@/components/page/index'
import reg from '@/components/page/reg'
import suc from '@/components/page/suc'
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueResource)
const router = new VueRouter({
  hashbang: false,
  mode: 'history',
  base: __dirname,
  routes:[
    { path: '*',name:'index',component: index},
    { path: '/redShare',name:'index',component: index},
    { path: '/redShare/reg',name:'reg',component: reg},
    { path: '/redShare/suc',name:'suc',component: suc}
  ]
})
const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

export default router; //将路由器导出

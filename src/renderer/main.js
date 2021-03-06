

import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from '@/router'
import store from '@/store'
import Reusables from '@/components/reusables/index.js'
import 'jquery'
import 'bootstrap'
import '@/assets/js/main.js'
import '@/assets/js/plugins/bootstrap-notify.min.js'
import '@/assets/js/plugins/jquery.dataTables.min.js' 
import '@/assets/js/plugins/dataTables.bootstrap.min.js' 
import '@/assets/js/plugins/sweetalert.min.js' 
import {ipcRenderer} from 'electron'
import auth from './auth.js' 
if (process.env.BUILD_TARGET!=='web') Vue.use(require('vue-electron'))
//ipcRenderer.on('pushLogin',()=>router.push({name:'login'}));
Vue.config.productionTip = false

Vue.http = Vue.prototype.$http = axios
ipcRenderer.on('closed-all',()=>store.dispatch('LogOut').then(data=>{}).catch(AxiosCatch))
ipcRenderer.on('login',(event,params)=>store.dispatch('user').then(data=>{}).catch(AxiosCatch))
ipcRenderer.on('logout',(event,params)=>store.dispatch('LogOut').then(data=>{}).catch(AxiosCatch))
store.dispatch('fethcLocalSettings')
router.beforeEach(auth);
const AppVue=new Vue({
   components: { App },
   router,
   store,
   template: '<App/>'
}).$mount('#app')



/* eslint-disable no-new */


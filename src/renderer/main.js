import Vue from 'vue'
import axios from 'axios'
import 'jquery'
import 'bootstrap'
import App from './App'
import router from './router'
import store from './store'
import Reusables from './components/reusables/index.js'

//window.jquery=window.$=


import './assets/js/main.js'

import './assets/js/plugins/pace.min.js'
import './assets/js/plugins/bootstrap-notify.min.js'
console.log(axios.defaults);

//if (process.env.NODE_ENV === 'production')
axios.defaults.baseURL = 'http://127.0.0.1';
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
import { getIdToken, login, logout, isLoggedIn}  from './auth.js'
router.beforeEach((to, from, next) => 
{
  //return next();
   if(!to.matched.some(record => record.meta.isPublic))
   {
       store.dispatch('user').then(data=>
        {
          if(data.data.permisos!='root' && to.matched.some(record => record.meta.root))
          {
             return next({name: '401',params:{location:to.fullPath}});
          }
          if(data.data.login)
          {
             next(); 
          }else
          {
            return next({name: 'login', query: { redirect: to.fullPath }});
          }
        }).catch(e=>
        {
           AxiosCatch(e);
           return next({name: 'login', query: { redirect: to.fullPath }});
        });

      ///return next();
   }else
   {
      return next();
   }

});
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

import Vue from 'vue' 
import Router from 'vue-router'
import admin from './admin.js'
import login from './login.js'
import Admin404 from '@/components/view/Admin404.vue'
Vue.use(Router);


export default new Router({
    routes: [
        login,
        admin,
        {
            path: '*',
            name: '404', 
            component:Admin404  
        }
    ], 
   // mode:'history',
    scrollBehavior(to,from)
    {
        
         return {x:0,y:0}
          
    }
})

import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import Reusables from './components/reusables/index.js'
import 'jquery'
import 'bootstrap'
import './assets/js/main.js'
import './assets/js/plugins/bootstrap-notify.min.js'
import './assets/js/plugins/jquery.dataTables.min.js' 
import './assets/js/plugins/dataTables.bootstrap.min.js' 
import './assets/js/plugins/sweetalert.min.js' 
import {remote,ipcRenderer} from 'electron'


//shell.openItem('cmd')
//if (process.env.NODE_ENV === 'production')
//axios.defaults.baseURL = 'http://127.0.0.1';

store.dispatch('fethcLocalSettings');
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
router.beforeEach((to, from, next) => 
{
  //return next();
 //console.log(to);
   if(!to.matched.some(record => record.meta.isPublic))
       {
      //  console.log(store.getters.User)
        if(store.getters.User.id_user!='')
        {
          return next(); 
        }else
           store.dispatch('user').then(data=>
            {
              if(data.data.permisos!='root' && to.matched.some(record => record.meta.root))
              {
                 return next({name: '401',params:{location:to.fullPath}});
              }
              if(data.data.login)
              {
                
                 return next(); 
              }else
              {
                ipcRenderer.send('logout');
                return next();
              }
            }).catch(e=>
            {
             
                if(e.response===undefined)
                {
                   swal(
                        {
                            title: "Error en coneccion !",
                            text: "Es posible que no se encuentre conectado a la red si no es el caso revise que el archivo \n"+API+"'\n  contenga el url correcto del servidor",
                            type: "error",
                            showCancelButton: true,
                            confirmButtonText: "Entendido!",
                            cancelButtonText: "Salir!",
                            closeOnConfirm: true,
                            closeOnCancel: true
                        },
                        (is)=>{
                          if(is)
                          {
                           
                          }else{
                             remote.app.quit()
                          }
                        });
                }else
                {
                  AxiosCatch(e)
                }
                return next();
               // console.log(to,'logout','cathc');
               //ipcRenderer.send('logout');
               // return next();
            });

          ///return next();
       }else
       {
          return next();
       }
  
  

});
ipcRenderer.on('closed-all',()=>
{
  //if(!store.gettres.User.recordar)
  store.dispatch('LogOut').then(data=>{}).catch(AxiosCatch);;
});
ipcRenderer.on('login',(event,params)=>
{
  //console.log(params)
  store.dispatch('user').then(data=>{}).catch(AxiosCatch);
});
ipcRenderer.on('logout',(event,params)=>
{ 
 // console.log(params)
  //router.push({name:'login'});
  store.dispatch('LogOut').then(data=>{}).catch(AxiosCatch);
});
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
const AppVue=new Vue({
    components: { App },
    router,
    store,
    template: '<App/>'
}).$mount('#app')
console.log(AppVue)

/* eslint-disable no-new */


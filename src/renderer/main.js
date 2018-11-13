import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import Reusables from './components/reusables/index.js'
import fs from 'fs';
import 'jquery'
import 'bootstrap'
import './assets/js/main.js'
//import './assets/js/plugins/pace.min.js'
import './assets/js/plugins/bootstrap-notify.min.js'
import './assets/js/plugins/jquery.dataTables.min.js' 
import './assets/js/plugins/dataTables.bootstrap.min.js' 
import './assets/js/plugins/sweetalert.min.js' 
import {remote,ipcRenderer,shell} from 'electron'
import DefaulLocalConfig from './assets/js/defaultLocalConfig.js'

//shell.openItem('cmd')
//if (process.env.NODE_ENV === 'production')
//axios.defaults.baseURL = 'http://127.0.0.1';
const API=__dirname+'/polleras-desktop-app.json';
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

import { getIdToken, login, logout, isLoggedIn}  from './auth.js'
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
                 //ipcRenderer.send('login');
                 //console.log(to, from, next,'logout','user');
                 return next(); 
              }else
              {
                
                ipcRenderer.send('logout');
                 return next();
               // return next({name: 'login', query: { redirect: to.fullPath }});
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
const mainApp=()=>
{
  Vue.http = Vue.prototype.$http = axios
  Vue.config.productionTip = false
  new Vue({
    components: { App },
    router,
    store,
    template: '<App/>'
  }).$mount('#app')
}
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
if(!fs.existsSync(API)){
  fs.writeFile(API,JSON.stringify(DefaulLocalConfig),{},(er,d)=>console.log(er,d))
}
//console.log(JSON);
fs.readFile(API, {encoding:'utf-8'},(err,data)=> {
    if(err) {
      //console.log(err);
      AxiosCatch(e);
    } else {
      store.commit('set',{
        basePath:JSON.parse(data).basePath,
        fileName:API
      })
    //  console.log(err,data,this,fs);
     // axios.defaults.baseURL =store.getters.localSettings.basePath;
      mainApp();
    }
  });

/* eslint-disable no-new */


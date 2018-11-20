<template>
     <div :class="'main  sidebar-mini rtl '+sidebar_toggle" @click="time_online=0" >
        <header-menu @sidebar="sidebar" :timeOnline="time_online"></header-menu>
        <!--<div class="app-sidebar__overlay" @click.prevent="sidebar"></div>-->
        <aside-menu @click="sidebar_toggle='sidenav-toggled'"></aside-menu>

        <transition name="ease-in-out" mode="out-in" duration="2s">
            <router-view ></router-view>
        </transition>
        
    </div>
</template>

<script>
 import {remote,ipcRenderer} from 'electron'
   import notify from '@/assets/js/notify.js'
   const { Menu } = remote
    export default {
        name:'main-layaut',
        
        data () {
            return {
                transitionName:'ease-in-out',
                sidebar_toggle:'sidenav-toggled',
                time_online:0,
            }
        },
        created()
        {
          this.iniMenu();
          setInterval(()=>this.sidebar_toggle='sidenav-toggled',500);
        },
        methods:
        {
          sidebar()
          {
            this.sidebar_toggle=this.sidebar_toggle==''?'sidenav-toggled':'';
          },
          iniMenu()
          {
            const menu=Menu.buildFromTemplate([
              {
                label:"File",
                submenu:[
                  
                  {type:"separator"},
                  {
                    label:"Salir",
                    acelerator:"CmdOrCtrl+Q",
                    click()
                    {
                      remote.app.quit()
                    }
                  }
                ],
              },
              {
                    label:"Perfil",
                   // acelerator:"CmdOrCtrl+U",
                    click:()=>
                    {
                      this.$router.push({name:'perfil'});
                    }
                  },
                  {
                    label:"Usuarios",
                   // acelerator:"CmdOrCtrl+Q",
                    click:()=>
                    {
                       this.$router.push({name:'usuarios'});
                    }
                  },
                  {
                    label:"Sesiones",
                   // acelerator:"CmdOrCtrl+Q",
                    click:()=>
                    {
                       this.$router.push({name:'sessiones'});
                    }
                  },
              {
                label:"Configuracion",
                click:()=>
                {
                  this.$router.push({name:'settings'});
                }
              },
              {
                label:"Retroceder",
                click:()=>this.$router.go(-1)
              },
              {
                label:"Cerrar sesion",
                click()
                {
                  swal(
                  {
                    title: "cerrar sesion?",
                    text: "Deseas finalizar la sesion actual !",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonText: "si, Cerar!",
                    cancelButtonText: "No",
                    closeOnConfirm: true,
                    closeOnCancel: true
                  }, isConfirm=> 
                  {
                    if (isConfirm) 
                    {
                      ipcRenderer.send('logout');
                     
                    } 
                  });
                }
              }
            ]);
            Menu.setApplicationMenu(menu);
          }
        },
       
       
       
        watch: 
        {
          time_online()
          {
            if(this.time_online==240)
            {
             // setTimeout(()=>new Audio('/static/audio/beep.mp3').play(), 0);
              notify({title: "Alerta de inactividad: ",message: "<br>En 1 min sera bloqueada la sesion por inactividad",icon: 'fa fa-warning'},{type: "warning"});
            }
            if(this.time_online==270)
            {
              //setTimeout(()=>new Audio('/static/audio/beep.mp3').play(), 0);
              notify({title: "Alerta de inactividad: ",message: "<br>En 30 segundos sera bloqueada la sesion por inactividad",icon: 'fa fa-warning'},{type: "danger"});
            }
            if(this.time_online==300)
            {
              let user=this.$store.getters.User;
              this.$store.dispatch('LogOut').then(data=>
              {
                 ipcRenderer.send('logout',{name:'LockScreen',params:{
                    redirect:this.$route.fullPath,
                    usuario:user
                  }});
                  /*this.$router.push({name:'LockScreen',params:{
                    redirect:this.$route.fullPath,
                    usuario:user
                  }});*/
              });
            }
          },
          '$route' (to, from) 
          {
            this.time_online=0;
              if(window.outerWidth<=768)
              {
                this.sidebar_toggle='';
              }
             // return;
               const toDepth = to.path.split('/').length
               const fromDepth = from.path.split('/').length
               this.transitionName = toDepth < fromDepth ? 'slide-left' : 'slide-right'
              
            
          }
        },
        
    }
</script>

<style>
    .leaveClass
    {
transition: margin-left 3s cubic-bezier(0.4, 0, 1, 1);

    }
    .enterClass
    {
transition: ease-in-out;
    }
</style>
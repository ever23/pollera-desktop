<template>
     <!-- Navbar-->
    <header class="app-header"><a class="app-header__logo" href="#">{{ User.nombres }}</a>
      <!-- Sidebar toggle button-->
        <!--<a class="app-sidebar__toggle" href="#" @click.prevent="sidebar" aria-label="Hide Sidebar"></a>-->
      <!-- Navbar Right Menu-->

      <ul class="app-nav">
        <!--<li class="app-search">
          <input class="app-search__input" type="search" placeholder="Search">
          <button class="app-search__button"><i class="fa fa-search"></i></button>
        </li>-->
      
        <!-- User Menu-->
       
        <li class="app-nav__item"> 
           <i :class="['fa', RelogArena]"></i>
          <i class=" datetime"  >{{ datetime }}</i>
        </li>
       
         <!--<li > <a class="app-nav__item" href="#" @click.prevent="recargar" title="Recargar">
          <i class="fa fa-refresh fa-lg"></i></a>
        </li>
         <li > <a class="app-nav__item" href="#" @click.prevent="retroceder" title="Retroceder" >
          <i class="fa fa-rotate-left fa-lg"></i></a>
        </li>-->
           <li >
          <dropdown-notificaciones></dropdown-notificaciones>
        </li>
        <li class="dropdown">
        <a class="app-nav__item" href="#" data-toggle="dropdown" aria-label="Open Profile Menu">
        <i class="fa fa-user fa-lg"></i>
        </a>

          <ul class="dropdown-menu settings-menu dropdown-menu-right">
            
            <li>
              <router-link class="dropdown-item" :to="{name:'perfil'}">
                <i class="fa fa-user fa-lg"></i> Profile
              </router-link>
            </li>

            <li v-if="User.permisos=='root'">
            <router-link class="dropdown-item" :to="{name:'settings'}" >
                <i class="fa fa-cog fa-lg"></i> Configuracion
              
                </router-link>   
             
            </li>
            <li v-if="User.permisos=='root'">
            <router-link class="dropdown-item" :to="{name:'usuarios'}" >
                <i class="fa fa-users fa-lg"></i> Usuarios
              
                </router-link>   
             
            </li>
              <li v-if="User.permisos=='root'">
            <router-link class="dropdown-item" :to="{name:'sessiones'}" >
                <i class="fa fa-gears fa-lg"></i> Sesiones
              
                </router-link>   
             
            </li>
            <li>
              <a class="dropdown-item" href="#" @click.prevent="LogOut">
              <i class="fa fa-sign-out fa-lg"></i> Logout
                </a>
            </li>
          </ul>
        </li>
       
      </ul>
    </header>
   
</template>

<script>
    import axios from 'axios'
   import {remote,ipcRenderer} from 'electron'
   import {fechaHora} from '@/assets/js/Date.js'
    export default {
        name:'header-menu',
        props:['timeOnline'],
        data()
        {
          return { nombre:null,datetime:null}
        },
        created()
        {
           //this.$store.commit('loading',true);
           axios.get('/settings/settings').then(req=>
            {
               //this.$store.commit('loading',false);
                this.nombre=req.data.settings.nombre;
                //console.log(this.config);
            }).catch(AxiosCatch);
           setInterval(e=>this.datetime= fechaHora(),1000)
        },
        components: {
        },
        computed:
        {
          
            User()
            {
                return this.$store.getters.User;
            },
            RelogArena()
            {
             
              if(this.timeOnline>240)
                return 'fa-hourglass-end';
              if(this.timeOnline>200)
                return 'fa-hourglass-3';
              if(this.timeOnline>150)
                return 'fa-hourglass-2';
              if(this.timeOnline>100)
                return 'fa-hourglass-1';
              if(this.timeOnline>50)
                return 'fa-hourglass-1';
                return 'fa-hourglass-start';
            }
        },
        methods:{
          sidebar()
          {
            this.$emit('sidebar');
          },
          
          recargar()
          {
            window.location.reload();
          },
          retroceder()
          {
            this.$router.go(-1);
            
          },
          LogOut()
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
    }
</script>

<style>
   @media (max-width: 510px) {
  .datetime {
    display: none;
  }
}
</style>
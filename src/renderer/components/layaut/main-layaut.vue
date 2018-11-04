<template>
     <div :class="'main app sidebar-mini rtl '+sidebar_toggle" @click="time_online=0" >
        <header-menu @sidebar="sidebar" :timeOnline="time_online"></header-menu>
        <div class="app-sidebar__overlay" @click.prevent="sidebar"></div>
        <aside-menu></aside-menu>

        <transition name="ease-in-out" mode="out-in" duration="2s">
            <router-view ></router-view>
        </transition>
        
    </div>
</template>

<script>
   
    export default {
        name:'main-layaut',
        
        data () {
            return {
                transitionName:'ease-in-out',
                sidebar_toggle:'',
                time_online:0,
            }
        },
       
        methods:
        {
          sidebar()
          {
            this.sidebar_toggle=this.sidebar_toggle==''?'sidenav-toggled':'';
          }
        },
        created()
        { 
          setInterval(()=>this.time_online++,1000);
        },
        mounted()
        {
        //console.log('mounted '+(new Date()));
          //this.$store.commit('loaing',false);
         /*$(document).ready(function () 
          {
          //  $(document).
              //Activate bootstrip tooltips
             // $("[data-toggle='tooltip']").tooltip();

          })*/
          
        },
        updated()
        {
          //console.log('updated '+(new Date()));
          //this.$store.commit('loaing',false);
        },
       
        watch: 
        {
          time_online()
          {
            if(this.time_online==240)
            {
              setTimeout(()=>new Audio('/polleras/static/audio/beep.mp3').play(), 0);
              $.notify({title: "Alerta de inactividad: ",message: "<br>En 1 min sera bloqueada la sesion por inactividad",icon: 'fa fa-warning'},{type: "warning"});
            }
            if(this.time_online==270)
            {
              setTimeout(()=>new Audio('/polleras/static/audio/beep.mp3').play(), 0);
              $.notify({title: "Alerta de inactividad: ",message: "<br>En 30 segundos sera bloqueada la sesion por inactividad",icon: 'fa fa-warning'},{type: "danger"});
            }
            if(this.time_online==300)
            {
              let user=this.$store.getters.User;
              this.$store.dispatch('LogOut').then(data=>
              {
                  this.$router.push({name:'LockScreen',params:{
                    redirect:this.$route.fullPath,
                    usuario:user
                  }});
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
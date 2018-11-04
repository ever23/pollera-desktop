<template>
	<div class="dropdown">
		<a class="app-nav__item" href="#" data-toggle="dropdown" aria-label="Show notifications">
    <i :class="['fa', numero_notificaciones>0?'fa-bell':'fa-bell-o', 'fa-lg']">
    <b class="text-warning notificacion-n fa-lg" v-if="numero_notificaciones>0">{{ numero_notificaciones }}</b>
    </i></a>
          <ul class="app-notification dropdown-menu dropdown-menu-right">
          <li class="app-notification__title" v-if="numero_notificaciones>0">Tienes {{ numero_notificaciones }} notificaciones nuevas </li>
          <div class="app-notification__content">
            <li v-for="item in notificaciones">
              
              <a :class="['app-notification__item',item.visto==1?'visto':'']" :href="item.href_notificacion" @click.prevent="notificacion(item)">
                <span class="app-notification__icon">
                  <span class="fa fa-stack fa-lg">
                    <i :class="'fa fa-circle fa-stack-2x text-'+item.tipo_notificacion"></i>
                    <i :class="'fa '+item.icon_notification+' fa-stack-1x fa-inverse'"></i>
                  </span>
                </span>
                    <div>
                      <p class="app-notification__message"> {{ item.desc_notificacion }}</p>
                      <p class="app-notification__meta">{{ item.tiempo }}</p>
                    </div>
              </a>
            </li>
            </div>
            <!--<li class="app-notification__footer">
            <router-link :to="{name:'notificaciones'}">Ver todas las notificaciones.</router-link>
            </li>-->
          </ul>
	</div>
</template>
<script >
import axios from 'axios'

const TIME_NOTIFICACION=20000;
	export default
	{
		name:'dropdown-notificaciones',
		 data () {
            return {
              notificaciones:[],

            }
        },
		   created()
        {
          //console.log('created')
          axios.get('/polleras/api/notificaciones/')
            .then(request=>
            {
              if(request.data.data)
              {
                this.notificaciones= this.tiempo(request.data.data);
               
              }
            }).catch(AxiosCatch);
          setTimeout(()=>this.loadnotifications(),TIME_NOTIFICACION);
          setInterval(()=>this.notificaciones= this.tiempo( this.notificaciones),10000);
        },
        computed:
        {
          numero_notificaciones()
          {
            let n=this.notificaciones.filter(not=>{
              return not.visto==0;
            })
            ///console.log(n);
            return n.length;
          }
        },

        methods:
        {
          tiempo(notificaciones)
          {

              for(var i in notificaciones)
              {
                notificaciones[i].tiempo=this.date(notificaciones[i].fech_notificacion);

              }
              return notificaciones;
               //console.log( this.notificaciones[i].tiempo)
          },
          date(d)
          {
            
            let not= new Date(d);
            let now= new Date();
           
            let timeNow=now.getTime()/1000;
            let timeNot=not.getTime()/1000;
            let time=timeNow-timeNot;
          
            if(timeNow-60<timeNot)
            {
              return 'Hace '+parseInt(time)+' segundos';
            }
            if(timeNow-3600<timeNot)
            {
              return 'Hace '+parseInt((time)/60)+' Minuto'+(parseInt((time)/60)>1?'s':'');
            }
            if(timeNow-(3600*24)<timeNot)
            {
              return 'Hace '+parseInt((time)/3600)+' Hora'+(parseInt((time)/3600)>1?'s':'');
            }
             if(timeNow-((3600*24)*7)<timeNot)
            {
              return 'Hace '+parseInt((time)/(3600*24))+' Dia'+(parseInt((time)/(3600*24))>1?'s':'');
            }
          
          },
        	notificacion(not)
          {
            let id_notificacion=not.id_notificacion;
            axios.get('/polleras/api/notificaciones?id_notificacion='+id_notificacion).
            then(req=>
            {
              not.visto=true;
              this.$router.replace(not.href_notificacion);
            }).catch(AxiosCatch);
          },
          loadnotifications()
          {
            let data='';
            if(this.notificaciones.length>0)
            {
              data='?fech_notificacion='+this.notificaciones[0].fech_notificacion;
            }
           
            axios.get('/polleras/api/notificaciones/now'+data)
            .then(request=>
            {
              this.notificaciones= this.tiempo(request.data.data);
             
              if(request.data.new)
              {
                if(request.data.new.length>0)
                setTimeout(()=>new Audio('/polleras/static/audio/beep.mp3').play(), 0);
                for(let i in request.data.new)
                {
                
                  $.notify({title: "Notificacion: ",message:request.data.new[i].desc_notificacion ,icon: 'fa '+request.data.new[i].icon_notification},{type: request.data.new[i].tipo_notificacion});
                  
                 // this.notificaciones.unshift(request.data.data[i])
                }
              }
              if(this.$store.getters.User.permisos!==null)
              setTimeout(()=>this.loadnotifications(),TIME_NOTIFICACION);
            }).catch(d=>
            {
              AxiosCatch(d);
              if(this.$store.getters.User.permisos!==null)
              setTimeout(()=>this.loadnotifications(),TIME_NOTIFICACION);
            });
          },
        }
	}
</script>
<style >
 .app-notification__icon
 {
   z-index: 5;
 }
  .notificacion-n
  {
    position: absolute;
    top: 20px;
    left: 26px;
  }
  .app-notification__item.visto {
    color: inherit;
    text-decoration: none;
    background-color: rgb(224, 224, 224);
}
</style>
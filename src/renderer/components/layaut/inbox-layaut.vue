<template>
	<main class="app-content">
		<app-title title="Inbox" icon="inbox"></app-title>
		 
      <div class="row user">
       
        <div class="col-md-3">
          <div class="tile p-0">

            <ul class="nav flex-column nav-tabs user-tabs">
              <li class="nav-item">
              	<router-link :class="['nav-link',active.inbox]" :to="{name:'inbox'}" >
              		Contactos
              	</router-link>              	
              </li>
              <li class="nav-item">
              	<router-link :class="['nav-link',active.suscrib]" :to="{name:'suscrib'}" >
              		Suscripciones
              	</router-link>     
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-9">
          <div class="tab-content">
          	<div class="tile">
          		 <router-view ></router-view>
          	</div>
          </div>
        </div>
      </div>
    
	</main>
</template>
<script>
	export default
	{
		name:'inboxLayaut',
		data()
		{
			return {
        active:
        {
          suscrib:null,inbox:null
        }
      }
		},
    created()
    {
      this.active[this.$route.name]='active';
    },
		watch: 
		{
	      	'$route' (to, from) 
	      	{
            for(let i in this.active)
            {
              this.active[i]=null;
            }
            this.active[to.name]='active';
	          //console.log(to);
	        
	      	}
    	},
	}
</script>
<template>
  <main class="app-content">
  <app-title title="Galpones " :icon="'file-text-o'"></app-title>
 
<div class="tile">
    <consulta-resumen @change="load" @change_meta='change_meta'></consulta-resumen>
  </div>
<div class="row user">
       
        <div class="col-md-3">
          <div class="tile p-0">
            <ul class="nav flex-column nav-tabs user-tabs">
            <li class="nav-item">
                <a href="#" :class="['nav-link',active.estadisticas]" @click.prevent="list('estadisticas')"><i class="fa fa-area-chart"></i> Estadisticas</a>              
              </li>
              <li class="nav-item">
                <a href="#" :class="['nav-link',active.listado]" @click.prevent="list('listado')"> <i class="fa fa-users"></i> Listado</a>              
              </li>
             
               
            </ul>
          </div>
        </div>
        <div class="col-md-9">
          <div class="tab-content">
            <div v-if="resumen('estadisticas')" class="compras tile">
                <h4 class="tile-header">Estadisticas</h4>
                <estadisticas-galpones :estadisticas="estadisticas" :meta_query="meta_query" />
              </div>
              <div v-if="resumen('listado')" class="compras tile">
                <h4 class="tile-header">Listado</h4>
                <list-galpones :galpones="galpones" @change="load"/>
              </div>
              
             
            
          </div>
        </div>
      </div>
  </main>
</template>

<script>
    import axios from 'axios'
     import estadisticas from './estadisticas-galpones.vue'
   import list_galpones from './list-galpones.vue'/*
   import Asistencia from './list-asistencia.vue'
   import Pagos from './list-pagos.vue'*/
    export default 
    {
        name:'resumen-galpones',
        components:{
          'estadisticas-galpones':estadisticas,
          'list-galpones':list_galpones,/*
          'list-asistencia':Asistencia,
          'list-pagos':Pagos*/
        },
      
        data () {
            return {
              
              active:
                {
                  estadisticas:'active',listado:null,pagos:null,reporte:null
                },
                galpones:{},
                meta_query:{},
                estadisticas:{},
                query:null,
               
                
               
               
            }
        },
        updated()
        {
          $(document).ready(e=>
          {
            $('#compras_alimentos').DataTable();
            $('#consumos_alimentos').DataTable();
            
          });
          
          
        },
        created()
        {
            this.load();
            
        },
        computed:
        {
         
        },
        methods:
        {
          change_meta(meta)
          {
            this.meta_query=meta;
            //console.log()
          },
          load(query=null)
          {
            this.query=query;
             this.$store.commit('loading',true);
            axios.get('/polleras/api/galpones/resumen?'+query)
            .then(request=>
            {
               this.$store.commit('loading',false);
                if(!request.data.error)
                {
                  this.galpones=request.data.galpones;
                  this.estadisticas={
                    produccion_huevos:request.data.produccion,
                    galpones:request.data.galpones,
                    muertes_aves:request.data.muertes_aves
                  };
                  
                }else
                {
                    AxiosCatch(request.data.error);
                }
            }).catch(AxiosCatch);
          },
           resumen(name)
           {

            return  this.active[name]=='active';
           },
            list(name)
            {
              
              for(let i in this.active)
              {
                this.active[i]=null;
              }

              this.active[name]='active';
            }
        },   
    }
</script>

<style>
    .portfolio-btn
    {
      margin: -1.25rem -1.25rem;
    }
    .proyect-item
    {
      padding-bottom: 15px;
    }
</style>
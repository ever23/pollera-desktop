<template>
  <main class="app-content">
  <app-title :title="'Huevos ' " :icon="'file-text-o'"></app-title>
 
 <div class="tile">
    <consulta-resumen @change="load" @change_meta='change_meta'/>
     <div class="mailbox-controls " v-if="galpon.nombre">
    <div><h3>Galpon {{ galpon.nombre  }}</h3></div>
    <div class="btn-group">

      <router-link class="btn btn-success btn-sm" v-if="galpon.aves>0"  :to="{name:'agregar-huevos',params:{idgalpon:id_galpon}}" title="Produccion de huevos"><i class="fa fa-building"></i></router-link>
      
    </div> 
  </div>
  </div>
<div class="row user">
       
        <div class="col-md-3">
          <div class="tile p-0">
            <ul class="nav flex-column nav-tabs user-tabs">
               <li class="nav-item">
                <a href="#" :class="['nav-link',active.estadisticas]" @click.prevent="list('estadisticas')"><i class="fa fa-area-chart"></i> Estadisticas</a>              
              </li>
              <li class="nav-item">
                <a href="#" :class="['nav-link',active.produccion]" @click.prevent="list('produccion')">
                <i class="fa fa-building"></i> Produccion</a>              
              </li>
              <li class="nav-item" >
               <a href="#" :class="['nav-link',active.ventas]" @click.prevent="list('ventas')"><i class="fa fa-dollar"></i> Ventas</a>     
              </li>
                <li class="nav-item" >
               <a href="#" :class="['nav-link',active.reporte]" @click.prevent="pdf=!pdf "><i class="fa fa-file-pdf-o"></i> Reporte</a>     
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-9">
          <div class="tab-content">
            <div v-if="resumen('estadisticas')" class="compras tile">
                <h4 class="tile-header">Estadisticas</h4>
                <estadisticas-huevos :estadisticas="estadisticas" :id_galpon="id_galpon" :meta_query="meta_query" />
              </div>
              <div v-if="resumen('produccion')" class="tile produccion">
                <h4 class="tile-header">Produccion de Huevos</h4>
                 <list-produccion-huevos :produccion="produccion" @change="load"></list-produccion-huevos>
              </div>
              <div v-if="resumen('ventas')" class="tile ventas">
                <h4 class="tile-header">Ventas de Huevos</h4>
           <list-ventas-huevos :ventas="ventas" @change="load"></list-ventas-huevos>
              </div>
              <iframe id="iframe" v-if="pdf" :src="basepath+'/huevos/reporte?'+query+(id_galpon?'&id_galpon='+id_galpon:'')" class="iframe-hide"></iframe>
            
          </div>
        </div>
      </div>
  </main>
</template>

<script>
    import axios from 'axios'
   import listPorduccion from './list-produccion-huevos.vue'
   import listVentas from './list-ventas-huevos.vue'
     import estadisticas from './estadisticas-huevos.vue'
    export default 
    {
        name:'resumen-huevos',
        components:{
          'list-produccion-huevos':listPorduccion,
          'list-ventas-huevos':listVentas,
          'estadisticas-huevos':estadisticas
        },
        props:['id_galpon'],
        data () {
            return {
               pdf:false,
              active:
                {
                  estadisticas:'active',produccion:null,ventas:null,reporte:null
                },
                produccion:[
                  
                ],
                ventas:[],
              
               query:null,
               // id_galpon:null,
                meta_query:{},
                estadisticas:{},
                galpon:{}
            }
        },
       
         watch:
        {
          id_galpon()
          {
            this.load();
          }
        },
        created()
        {
            
            this.load();
        },
        computed:
        {
            
            basepath()
            {
              return this.$store.getters.localSettings.basePath;
            }
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
            if(this.id_galpon)
            {
              axios.get('/galpones/?id_galpon='+this.id_galpon).then(req=>
              {
                  this.galpon=req.data.galpones[0];
              }).catch(AxiosCatch);
            }
            this.query=query;
             this.$store.commit('loading',true);
            axios.get('/huevos/resumen?'+query+(this.id_galpon?'&id_galpon='+this.id_galpon:''))
            .then(request=>
            {
               this.$store.commit('loading',false);
                if(!request.data.error)
                {
                    this.ventas=request.data.ventas;
                    this.produccion=request.data.produccion;
                    
                    this.estadisticas={
                      ventas:request.data.ventas,
                      produccion:request.data.produccion,
                      huevos_grandes:request.data.huevos_grandes,
                      huevos_pequenos:request.data.huevos_pequenos,
                      media_produccion_grande:request.data.media_produccion_grande,
                      media_produccion_pequeno:request.data.media_produccion_pequeno
                    };

                   this.pdf=request.data.pdf;
                }else
                {
                    AxiosCatch(request.data.error);
                }
            }).catch(AxiosCatch);
          },
           resumen(name)
           {

            return  this.active[name]=='active';
           },a(a)
           {
            console.log(a)
           },
            list(name)
            {
             // console.log(m)
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
.iframe-hide
{
  display: none;
}
    .portfolio-btn
    {
      margin: -1.25rem -1.25rem;
    }
    .proyect-item
    {
      padding-bottom: 15px;
    }
</style>
<template>
  <main class="app-content">
  <app-title :title="'Alimentos '" :icon="'file-text-o'"/>
  
  
  <div class="tile">
    <consulta-resumen @change="load" @change_meta='change_meta'/>
    <div class="mailbox-controls " v-if="galpon.nombre">
    <div><h3>Galpon {{ galpon.nombre  }}</h3></div>
    <div class="btn-group">

      <router-link class="btn btn-success btn-sm" :to="{name:'consumo-alimentos',params:{idgalpon:id_galpon}}" title="Agregar Consumo"><i class="fa fa-shopping-basket"></i></router-link>
      
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
                <a href="#" :class="['nav-link',active.compras]" @click.prevent="list('compras')"><i class="fa fa-shopping-cart"></i> Compras</a>              
              </li>
              <li class="nav-item" >
               <a href="#" :class="['nav-link',active.consumos]" @click.prevent="list('consumos')"> <i class="fa fa-shopping-basket"></i> Consumos</a>     
              </li> 
              <li class="nav-item" >
               <a href="#" :class="['nav-link',active.reporte]" @click.prevent="list('reporte')"><i class="fa fa-file-pdf-o"></i> Reporte </a>     
              </li> 
            </ul>
          </div>
        </div>
        <div class="col-md-9">
          <div class="tab-content">
          <div v-if="resumen('estadisticas')" class="compras tile">
                <h4 class="tile-header">Estadisticas</h4>
                <estadisticas-alimentos :estadisticas="estadisticas" :id_galpon="id_galpon" :meta_query="meta_query" />
              </div>
              <div v-if="resumen('compras')" class="compras tile">
                <h4 class="tile-header">Compras de Alimentos</h4>
                 <list-compras-alimentos :compras="compras" @change="load"/>
              </div>
              <div v-if="resumen('consumos')" class="consumos tile">
                <h4 class="tile-header">Consumos de Alimentos</h4>
           <list-consumos-alimentos :consumos="consumos" @change="load"/>
              </div>
             <show-pdf v-if="resumen('reporte')" :src="'/polleras/api/alimentos/reporte?'+query+(id_galpon?'&id_galpon='+id_galpon:'')" />  
          </div>
        </div>
      </div>
  </main>
</template>

<script>
   import axios from 'axios'
 
   import listCompras from './list-compras-alimentos.vue'
   import listConsumos from './list-consumos-alimentos.vue'
  import estadisticas from './estadisticas-alimentos.vue'
    export default 
    {
        name:'resumen-alimentos',
        components:{
          'list-compras-alimentos':listCompras,
          'list-consumos-alimentos':listConsumos,
           'estadisticas-alimentos':estadisticas
        },
        props:['id_galpon'],
        data () {
            return {
              
              active:
                {
                  estadisticas:'active',compras:null,consumos:null,reporte:null
                },
                compras:[
                  
                ],
                consumos:[],
                alimentos:0,
                media_consumo:0,
                galpon:{},
               estadisticas:{},
                meta_query:{},
                query:{}
                
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
         watch:
        {
          id_galpon()
          {
            this.load();
          }
        },
        created()
        {
          if(this.id_galpon)
          {
            this.list('consumos');
          }
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
            if(this.id_galpon)
            {
              axios.get('/polleras/api/galpones/?id_galpon='+this.id_galpon).then(req=>
              {
                  this.galpon=req.data.galpones[0];
              }).catch(AxiosCatch);
            }
           
            this.query=query;
             this.$store.commit('loading',true);
            axios.get('/polleras/api/alimentos/resumen?'+query+(this.id_galpon?'&id_galpon='+this.id_galpon:''))
            .then(request=>
            {
                if(!request.data.error)
                {
                    this.consumos=request.data.consumos;
                     this.compras=request.data.compras;
                  
                   this.estadisticas={
                    media_consumo:request.data.media_consumo,
                    alimentos:request.data.alimentos,
                    consumos: this.consumos,
                    compras:this.compras
                   };
                  // this.pdf=request.data.pdf;
                   
                }else
                {
                    AxiosCatch(request.data.error);
                }
                 this.$store.commit('loading',false);
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

<template>
  <main class="app-content">
  <app-title :title="'Alimentos '" :icon="'file-text-o'"/>
  
  
  <div class="tile">
    <consulta-resumen @change="load" @change_meta='change_meta'/>
    <div class="mailbox-controls " v-if="galpon.nombre">
    <div><h3>Galpon {{ galpon.nombre  }}</h3></div>
    <div class="btn-group">

      <router-link class="btn btn-success btn-sm" v-if="galpon.aves>0" :to="{name:'consumo-alimentos',params:{idgalpon:id_galpon}}" title="Agregar Consumo"><i class="fa fa-shopping-basket"></i></router-link>
      
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
               <a href="#" :class="['nav-link']" @click.prevent="pdf=!pdf"><i class="fa fa-file-pdf-o"></i> Reporte </a>     
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
             <!--<show-pdf :src="'/alimentos/reporte?'+query+(id_galpon?'&id_galpon='+id_galpon:'')" />  -->
             <iframe id="iframe" v-if="pdf" :src="basepath+'/alimentos/reporte?'+query+(id_galpon?'&id_galpon='+id_galpon:'')" @loaded="pdf=false" class="iframe-hide"></iframe>
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
              pdf:false,
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
       
         watch:
        {
          pdf()
          {
            console.log(this.pdf)
            setTimeout(()=>
            {
              //this.pdf=false;
            },1000);
          },
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
            axios.get('/alimentos/resumen?'+query+(this.id_galpon?'&id_galpon='+this.id_galpon:''))
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
                    compras:this.compras,
                      consumo_mes:request.data.consumo_mes
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
<style scope>
.iframe-hide
{
  display: none;
}
</style>
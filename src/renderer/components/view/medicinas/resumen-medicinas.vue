<template>
  <main class="app-content">
  <app-title :title="'Medicinas ' " :icon="'file-text-o'"></app-title>
  <div class="tile">
    <consulta-resumen @change="load"></consulta-resumen>
     <div class="mailbox-controls " v-if="galpon.nombre">
    <div><h3>Galpon {{ galpon.nombre  }}</h3></div>
    <div class="btn-group">

      
     
    </div> 
  </div>
  </div>
<div class="row user">
       
        <div class="col-md-3">
          <div class="tile p-0">
            <ul class="nav flex-column nav-tabs user-tabs">
            <li class="nav-item">
                <a href="#" :class="['nav-link',active.inventario]" @click.prevent="list('inventario')"><i class="fa fa-stack-overflow"></i> Inventario</a>              
              </li>
              <li class="nav-item">
                <a href="#" :class="['nav-link',active.compras]" @click.prevent="list('compras')"><i class="fa fa-shopping-cart"></i> Compras</a>              
              </li>
              <li class="nav-item" >
               <a href="#" :class="['nav-link',active.consumos]" @click.prevent="list('consumos')"><i class="fa fa-shopping-basket"></i> Consumos</a>     
              </li>
              <li class="nav-item" >
               <a href="#" :class="['nav-link',active.reporte]" @click.prevent="pdf=!pdf "><i class="fa fa-file-pdf-o"></i> Reporte</a>     
              </li>
               
            </ul>
          </div>
        </div>
        <div class="col-md-9">
          <div class="tab-content">
            
            <div v-if="resumen('inventario')" class="compras tile">
                <h4 class="tile-header">Inventario de Medicinas</h4>
                 <list-medicinas :medicinas="medicinas" :galpon="galpon" @change="load(null)"></list-medicinas>
              </div>
              <div v-if="resumen('compras')" class="compras tile">
                <h4 class="tile-header">Compras de Medicinas</h4>
                 <list-compras-medicinas :compras="compras"  @change="load(null)"></list-compras-medicinas>
              </div>
              <div v-if="resumen('consumos')" class="consumos tile">
                <h4 class="tile-header">Consumos de Medicinas</h4>
           <list-consumos-medicinas :consumos="consumos"  @change="load(null)"></list-consumos-medicinas>
              </div>
              <iframe id="iframe" v-if="pdf" :src="basepath+'/medicinas/reporte?'+query+(id_galpon?'&id_galpon='+id_galpon:'')" class="iframe-hide"></iframe>
            
          </div>
        </div>
      </div>
  </main>
</template>

<script>
    import axios from 'axios'
   import listCompras from './list-compras-medicinas.vue'
   import listConsumos from './list-consumos-medicinas.vue'
   import stock from './list-medicinas.vue'
  
    export default 
    {
        name:'resumen-medicina',
        components:{
          'list-compras-medicinas':listCompras,
          'list-consumos-medicinas':listConsumos,
          'list-medicinas':stock
        },
        props:['id_galpon'],
        data () {
            return {
               pdf:false,
              active:
                {
                  compras:null,consumos:null,inventario:'active',reporte:null
                },
                compras:[
                  
                ],
                consumos:[],
                medicinas:[],
                query:null,
                galpon:{}
                
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
         watch:
        {
          id_galpon()
          {
            this.load();
          }
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
          load(data=null)
          {
            if(this.id_galpon)
            {
              axios.get('/galpones/?id_galpon='+this.id_galpon).then(req=>
              {
                  this.galpon=req.data.galpones[0];
              }).catch(AxiosCatch);
            }
             this.query=data;
             this.$store.commit('loading',true);
            axios.get('/medicinas/resumen?'+data+(this.id_galpon?'&id_galpon='+this.id_galpon:''))
            .then(request=>
            {
               this.$store.commit('loading',false);
                if(!request.data.error)
                {
                    this.consumos=request.data.consumos;
                     this.compras=request.data.compras;
                     this.medicinas=request.data.inventario;
                     //this.pdf=request.data.pdf;
                   
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
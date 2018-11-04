<template>
  <main class="app-content">
  <app-title :title="'Aves ' " :icon="'file-text-o'"></app-title>
  <!--<div class="tile text-center" v-if="granja.localizacion">
    <h2>{{ granja.localizacion }}</h2>
  </div>--> 
  
   <div class="tile">
  <consulta-resumen @change="load" @change_meta='change_meta'/>
  <div class="mailbox-controls " v-if="galpon.nombre">
    <div><h3>Galpon {{ galpon.nombre  }}</h3></div>
    <div class="btn-group">

      <router-link class="btn btn-success btn-sm" :to="{name:'agregar-aves',params:{idgalpon:id_galpon}}" title="Agregar aves"><i class="fa fa-plus-square"></i></router-link>
      <router-link class="btn btn-info btn-sm" :to="{name:'venta-aves',params:{idgalpon:id_galpon}}" title="Venta de aves"><i class="fa fa-dollar"></i></router-link>
       <router-link class="btn btn-danger btn-sm" :to="{name:'mortalidad-aves',params:{idgalpon:id_galpon}}" title="Muerte de aves"><i class="fa fa-remove"></i></router-link>
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
               <a href="#" :class="['nav-link',active.ventas]" @click.prevent="list('ventas')"><i class="fa fa-dollar"></i> Ventas</a>     
              </li>
               <li class="nav-item">
                <a href="#" :class="['nav-link',active.muertes]" @click.prevent="list('muertes')"><i class="fa fa-remove"></i> Muertes</a>    
              </li>
               <li class="nav-item" >
               <a href="#" :class="['nav-link',active.reporte]" @click.prevent="list('reporte')"><i class="fa fa-file-pdf-o"></i> Reporte</a>     
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-9">
          <div class="tab-content">
           <div v-if="resumen('estadisticas')" class="compras tile">
                <h4 class="tile-header">Estadisticas</h4>
                <estadisticas-aves :estadisticas="estadisticas" :id_galpon="id_galpon" :meta_query="meta_query" />
              </div>
              <div v-if="resumen('compras')" class="compras tile">
                <h4 class="tile-header">Compras de Aves</h4>
                <list-compras-aves :compras="compras" :id_galpon="id_galpon" @change="load"/>
              </div>
              <div v-if="resumen('ventas')" class="ventas tile">
                <h4 class="tile-header">Venta de Aves</h4>
        <list-ventas-aves  :ventas="ventas" :id_galpon="id_galpon" @change="load"></list-ventas-aves>
              </div>
              <div v-if="resumen('muertes')" class="compras tile">
                <h4 class="tile-header">Muerte de Aves</h4>
        <list-mortalidad-aves :muertes="muertes" :id_galpon="id_galpon" @change="load"></list-mortalidad-aves>
              </div>
            <show-pdf v-if="resumen('reporte')" :src="'/polleras/api/aves/reporte?'+query+(id_galpon?'&id_galpon='+id_galpon:'')" ></show-pdf>
          </div>
        </div>
      </div>
  </main>
</template>

<script>
    import axios from 'axios'
    import compras from './list-compras-aves.vue'
    import ventas from './list-ventas-aves.vue'
    import mortalidad from './list-mortalidad-aves.vue'
    import estadisticas from './estadisticas-aves.vue'

    export default 
    {
        name:'resumen-granja',
        props:['id_galpon'],
        watch:
        {
          id_galpon()
          {
            this.load();
          }
        },
        components:{
          'list-mortalidad-aves':mortalidad,
          'list-ventas-aves':ventas,
          'list-compras-aves':compras,
          'estadisticas-aves':estadisticas
        },
        data () {
            return {
              
              active:
                {
                  estadisticas:'active',compras:null,muertes:null,ventas:null,reporte:null
                },
                compras:[
                  
                ],
                estadisticas:[],
                ventas:[],
                muertes:[],
                granja:{},
                aves:null,
                media_muertes:0,
                query:null,
                meta_query:{},
                galpon:{}
            }
        },
        updated()
        {
          $(document).ready(e=>{
            $('#compras').DataTable();
            $('#ventas').DataTable();
            $('#muertes').DataTable();
            
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
           
           if(this.id_galpon)
            {
              axios.get('/polleras/api/galpones/?id_galpon='+this.id_galpon).then(req=>
              {
                  this.galpon=req.data.galpones[0];
              }).catch(AxiosCatch);
            }
           this.query=query;
             this.$store.commit('loading',true);
            axios.get('/polleras/api/aves/resumen?'+query+(this.id_galpon?'&id_galpon='+this.id_galpon:''))
            .then(request=>
            {
               this.$store.commit('loading',false);
                if(!request.data.error)
                {
                    this.compras=request.data.compras;
                    this.ventas=request.data.ventas;
                    this.muertes=request.data.muertes;
                   
                    this.estadisticas={
                      muertes:this.muertes,
                      ventas:this.ventas,
                      aves:request.data.aves,
                      media_muertes:request.data.media_muertes,
                      capacidad:request.data.capacidad
                    };
                  //  this.pdf=request.data.pdf;

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
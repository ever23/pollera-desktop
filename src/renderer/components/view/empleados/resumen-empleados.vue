<template>
  <main class="app-content">
  <app-title title="Empleados " :icon="'file-text-o'"></app-title>
  <div class="row">
    <div class="col-md-6">
          <div class="widget-small primary coloured-icon"><i class="icon fa fa-users fa-3x"></i>
            <div class="info">
              <h4>Personal Obrero</h4>
              <p><b>{{ obreros }}</b></p>
            </div>
          </div>
        </div>
         <div class="col-md-6">
          <div class="widget-small primary coloured-icon"><i class="icon fa fa-users fa-3x"></i>
            <div class="info">
              <h4>Personal Supervisores</h4>
              <p><b>{{ supervisores }}</b></p>
            </div>
          </div>
        </div>

  </div>
<div class="tile">
    <consulta-resumen @change="load"></consulta-resumen>
  </div>
<div class="row user">
       
        <div class="col-md-3">
          <div class="tile p-0">
            <ul class="nav flex-column nav-tabs user-tabs">
              <li class="nav-item">
                <a href="#" :class="['nav-link',active.nomina]" @click.prevent="list('nomina')"> <i class="fa fa-users"></i> Nomina</a>              
              </li>
              <li class="nav-item" >
               <a href="#" :class="['nav-link',active.pagos]" @click.prevent="list('pagos')"> <i class="fa fa-dollar"></i> Pago de nomina</a>     
              </li>
              <li class="nav-item" >
               <a href="#" :class="['nav-link',active.asistencia]" @click.prevent="list('asistencia')"> <i class="fa fa-check"></i> Asistencia</a>     
              </li>
              <li class="nav-item" >
               <a href="#" :class="['nav-link',active.reporte]" @click.prevent="list('reporte')"> <i class="fa fa-file-pdf-o"></i> Reporte</a>     
              </li>
               
            </ul>
          </div>
        </div>
        <div class="col-md-9">
          <div class="tab-content">
            
              <div v-if="resumen('nomina')" class="nomina tile">
                <h4 class="tile-header">Nomina</h4>
                 <list-nomina :nomina="nomina" @change="load(null)"></list-nomina>
              </div>
               <div v-if="resumen('pagos')" class="consumos tile">
                <h4 class="tile-header">Pagos de nomina</h4>
           <list-pagos :pagos="pagos" @change="load(null)"></list-pagos>
              </div>
              <div v-if="resumen('asistencia')" class="consumos tile">
                <h4 class="tile-header">Asistencia</h4>
           <list-asistencia :asistencia="asistencia" @change="load(null)"></list-asistencia>
              </div>
              <div class="tile" v-if="resumen('reporte')" >
              <select class="form-control" v-model="selectpdf" name="selectpdf">
                <option value="">Seleccione reporte</option>
                <option :value="basepath+'/empleados/nominapdf?'+query"><i class="fa fa-users"></i> Nomina</option>
                <option :value="basepath+'/empleados/pagospdf?'+query"><i class="fa fa-dollar"></i> Pagos</option>
                <option :value="basepath+'/empleados/asistenciapdf?'+query"><i class="fa fa-check"></i>  Asistencia</option>
              </select>
                <iframe id="iframe"  :src="selectpdf" class="iframe-hide"></iframe>
              </div>
            
          </div>
        </div>
      </div>
  </main>
</template>

<script>
    import axios from 'axios'
   import Nomina from './list-nomina.vue'
   import Asistencia from './list-asistencia.vue'
   import Pagos from './list-pagos.vue'
    export default 
    {
        name:'resumen-empleados',
        components:{
          'list-nomina':Nomina,
          'list-asistencia':Asistencia,
          'list-pagos':Pagos
        },
        props:['id_granjas'],
        data () {
            return {
              
              active:
                {
                  nomina:'active',asistencia:null,pagos:null,reporte:null
                },
                nomina:[
                  
                ],
               
                asistencia:[],
              
                pagos:[],
                
                obreros:0,
                supervisores:0,
                selectpdf:'',
                query:''
               
               
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
          load(query=null)
          {
            this.query=query;
             this.$store.commit('loading',true);
            axios.get('/empleados/resumen?'+query)
            .then(request=>
            {
               this.$store.commit('loading',false);
                if(!request.data.error)
                {
                  this.nomina=request.data.empleados;
                  
                  this.asistencia=request.data.asistencia;
                 
                  this.obreros=request.data.obrero;
                  this.supervisores=request.data.supervisor;
                  this.pagos=request.data.pagos;
                 

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
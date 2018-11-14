<template>
<main class="app-content">
 <div class="app-title">
    <div>
      <h1><i :class="['fa','fa-line-chart']"></i>  Sistema de Control Estadístico de Producción Avicola </h1>
    </div>
    <ul class="app-breadcrumb breadcrumb">
      <li class="breadcrumb-item">
        <router-link :to="{name:'inicio'}"><i class="fa fa-home fa-lg"></i></router-link>
      </li>
    </ul>
  </div> 
   <div class="row" v-if="isRoot"> 
        <div class="col-md-6">
          <div class="widget-small primary coloured-icon"><i class="icon fa fa-user fa-3x"></i>
            <div class="info">
              <h4>Usuarios</h4>
              <p><b>{{ usuarios }}</b></p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="widget-small primary coloured-icon"><i class="icon fa  fa-laptop fa-3x"></i>
            <div class="info">
              <h4>Sesiones activas</h4>
              <p><b>{{ sessiones }}</b></p>
            </div>
          </div>
        </div>
       
        </div>
        </div> 
      
       <div class="row">
        <div class="col-md-4">
          <div class="widget-small info coloured-icon"><i class="icon fa fa-list-ul fa-3x"></i>
            <div class="info">
              <h4>Alimentos</h4>
              <p><b>{{ alimentos | AlimFormat }}</b></p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="widget-small info coloured-icon"><i class="icon fa  fa-twitter fa-3x"></i>
            <div class="info">
              <h4>Aves</h4>
              <p><b>{{ aves }}</b></p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="widget-small info coloured-icon"><i class="icon fa  fa-circle fa-3x"></i>
            <div class="info">
              <h4 class="">Huevos</h4>
              <p><b>{{ huevos }}</b></p>
            </div>
          </div>
        </div>
        
      </div> 
      <div class="row">
        <div class="col-lg-8 col-md-8  offset-md-2">
          <div class="tile">
            <h3 class="tile-title">Ganancias</h3>
            <div class="embed-responsive embed-responsive-16by9">
              <canvas class="embed-responsive-item" ref="ganancias"></canvas>
            </div>
          </div>
        </div>
        
       
        <div class="col-md-6">
          <div class="tile">
            <h3 class="tile-title">Gastos</h3>
            <div class="embed-responsive embed-responsive-16by9">
              <canvas class="embed-responsive-item" ref="gastos"></canvas>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="tile">
            <h3 class="tile-title">Ventas</h3>
            <div class="embed-responsive embed-responsive-16by9">
              <canvas class="embed-responsive-item" ref="ventas"></canvas>
            </div>
          </div>
        </div>
        </div>
      

</main>
</template>

<script>
  import axios from 'axios'
   import  '../../../assets/js/plugins/chart.js'
   import {meses} from '../../../assets/js/Date.js'
    import filter from '../../../assets/js/UserVueFilter.js'
    export default 
    {
       filters:filter,
        name:'inicio',
        data () {
            return {
                usuarios:0,
                sessiones:0,
                alimentos:0,
                huevos:0,
                aves:0,
                ventas:[],
                gastos:[],
                ganancias:[],
                ejectado:false,
                Cganancias:null,
                Cgastos:null,
                Cventas:null
            }
        },
      
        updated()
        {
         // console.log(this.ventas)
            this.ejecutar();
        },
        created()
        {
          let t=new Date();
           this.$store.commit('loading',true);
          axios.get('/?year='+t.getFullYear()).then(req=>
          {
             this.$store.commit('loading',false);
            this.usuarios=req.data.usuarios;
            this.sessiones=req.data.sessiones;
            this.alimentos=req.data.alimentos;
            this.huevos=req.data.huevos;
            this.aves=req.data.aves;
            this.ventas=req.data.ventas;
            this.gastos=req.data.gastos;
           for(let i=0;i<=11;i++)
           {
            this.ganancias[i]=this.ventas[i]-this.gastos[i];
           }
           //console.log(this.ganancias)
          }).catch(AxiosCatch)
        },
        computed:
        {
            isRoot()
            {
                return this.$store.getters.User.permisos=='root';
            },
            settings()
            {
              return this.$store.getters.settings;
            }
        },
        methods: {
            ejecutar()
            { 
              if(this.Cgastos)
              {
                this.Cgastos.destroy();
                this.Cventas.destroy();
                this.Cganancias.destroy();
              }
                 this.Cganancias = new Chart(this.$refs.ganancias.getContext("2d")).Line({
                      labels: meses,
                      datasets: [
                        {
                          label: "Ganancias",
                          fillColor: "rgb(40, 167, 69)",
                          strokeColor: "rgba(220,220,220,1)",
                          pointColor: "rgba(220,220,220,1)",
                          pointStrokeColor: "#fff",
                          pointHighlightFill: "#fff",
                          pointHighlightStroke: "rgba(220,220,220,1)",
                          data: this.ganancias
                        }
                      ]
                    });
                
                this.Cgastos = new Chart(this.$refs.gastos.getContext("2d")).Bar({
                      labels: meses,
                      datasets: [
                        {
                          label: "Gastos",
                          fillColor: "rgb(220, 53, 69)",
                          strokeColor: "rgba(220,220,220,1)",
                          pointColor: "rgba(220,220,220,1)",
                          pointStrokeColor: "#fff",
                          pointHighlightFill: "#fff",
                          pointHighlightStroke: "rgba(220,220,220,1)",
                          data: this.gastos
                        }
                      ]
                    });
                 this.Cventas= new Chart(this.$refs.ventas.getContext("2d")).Bar({
                      labels: meses,
                      datasets: [
                        {
                          label: "Ventas",
                          fillColor: "rgb(23, 162, 184)",
                          strokeColor: "rgba(220,220,220,1)",
                          pointColor: "rgba(220,220,220,1)",
                          pointStrokeColor: "#fff",
                          pointHighlightFill: "#fff",
                          pointHighlightStroke: "rgba(220,220,220,1)",
                          data: this.ventas
                        }
                      ]
                    });
             
            }
        }
    }
</script>

<style>
    
</style>
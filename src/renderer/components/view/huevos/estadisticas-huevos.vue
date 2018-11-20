<template>
  <div>
  <div class="row">
    <div class="col-md-6">
          <div class="widget-small primary coloured-icon"><i class="icon fa fa-stack-overflow fa-3x"></i>
            <div class="info">
              <h4>Huevos Grandes</h4>
              <p><b>{{ estadisticas.huevos_grandes }}</b></p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="widget-small primary coloured-icon"><i class="icon fa fa-stack-overflow fa-3x"></i>
            <div class="info">
              <h4>Huevos Pequeños</h4>
              <p><b>{{ estadisticas.huevos_pequenos }}</b></p>
            </div>
          </div>
        </div>

  </div>
   <div class="row">
    <div class="col-md-6">
          <div class="widget-small primary coloured-icon"><i class="icon fa fa-building fa-3x"></i>
            <div class="info">
              <h4>Produccion por dia</h4>
              <p><b>{{ estadisticas.media_produccion_grande | NumberFormat }}</b></p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="widget-small primary coloured-icon"><i class="icon fa fa-building fa-3x"></i>
            <div class="info">
              <h4>Produccion por dia</h4>
              <p><b>{{ estadisticas.media_produccion_pequeno | NumberFormat }}</b></p>
            </div>
          </div>
        </div>

  </div>
 <div class="row">
<div :class="'col-md-6'">
          <div class="tile">
            <h3 class="tile-title">Produccion de Huevos Grandes</h3>
             <div class="embed-responsive embed-responsive-16by9">
              <canvas class="embed-responsive-item" ref="produccion_grande"></canvas>
            </div>
          </div>
        </div>
        <div :class="'col-md-6'">
          <div class="tile">
            <h3 class="tile-title">Produccion de Huevos Pequeños</h3>
            <div class="embed-responsive embed-responsive-16by9">
              <canvas class="embed-responsive-item" ref="produccion_pequeno"></canvas>
            </div>
          </div>
        </div>
        <div :class="'col-md-6'">
          <div class="tile">
            <h3 class="tile-title">Produccion de Huevos</h3>
            <div class="embed-responsive embed-responsive-16by9">
              <canvas class="embed-responsive-item" ref="produccion"></canvas>
            </div>
          </div>
        </div>
         <div :class="'col-md-6'">
          <div class="tile">
            <h3 class="tile-title">Venta de Huevos</h3>
            <div class="embed-responsive embed-responsive-16by9">
              <canvas class="embed-responsive-item" ref="ventas"></canvas>
            </div>
          </div>
        </div>

        
  </div>
  </div>
</template>

<script>
   import  '@/assets/js/plugins/chart.js'
   import {Format} from '@/assets/js/DataChartFormat.js'
   import filter from '@/assets/js/UserVueFilter.js'
    export default 
    {
        filters:filter,
        name:'estadisticas-huevos',
        props:['estadisticas','id_galpon','meta_query'],
        data () {
            return {
              Hgrande:null,
              Hpequeno:null,
              produccion:null,
              ventas:null
            }
        },
        created()
        {
          
        },
        watch:
        {
          estadisticas(estadisticas)
          {
            this.ejecutar();
          }
        },
        updated()
        {
           
           this.ejecutar();
        },
        mounted()
        {
          this.ejecutar();
        },
        computed:
        {
          isRoot()
            {
                return this.$store.getters.User.permisos=='root';
            }
        },
        methods:
        {
          calculo(estadistica)
          {
            return Format(estadistica,this.meta_query.consulta,this.meta_query.consulta=='month'?this.meta_query.query.match(/\d{2}$/)[0]:this.meta_query.query);
           
          },
          ejecutar()
            { 
              
             //console.log(this.estadisticas.produccion.filter(p=>p.tipo=="pequeño"),this.estadisticas.produccion)
              let Cproduccion_grande=this.calculo(this.estadisticas.produccion && this.estadisticas.produccion.filter(p=>p.tipo=="grande"));
              let Cproduccion_pequeno=this.calculo(this.estadisticas.produccion && this.estadisticas.produccion.filter(p=>p.tipo=="pequeño"));
            
              if(this.Hgrande)
              {

                this.Hgrande.destroy();
                this.Hpequeno.destroy();
                this.produccion.destroy();
                this.ventas.destroy();
              }
              this.Hgrande= new Chart(this.$refs.produccion_grande.getContext("2d")).Line({
                      labels: Cproduccion_grande.labels,
                      datasets: [
                        {
                          label: "Huevos grandes",
                          fillColor: "rgb(23, 162, 184)", 
                          strokeColor: "rgba(220,220,220,1)",
                          pointColor: "rgba(220,220,220,1)",
                          pointStrokeColor: "#fff",
                          pointHighlightFill: "#fff",
                          pointHighlightStroke: "rgba(220,220,220,1)",
                          data: Cproduccion_grande.data
                        }
                      ]
                    });
           
             /* console.log(Hgrande)
              Hgrande.destroy();*/
                this.Hpequeno = new Chart(this.$refs.produccion_pequeno.getContext("2d")).Line({
                      labels: Cproduccion_pequeno.labels,
                      datasets: [
                        {
                          label: "Produccion",
                          fillColor: "rgb(253, 126, 20)", 
                          strokeColor: "rgba(220,220,220,1)",
                          pointColor: "rgba(220,220,220,1)",
                          pointStrokeColor: "#fff",
                          pointHighlightFill: "#fff",
                          pointHighlightStroke: "rgba(220,220,220,1)",
                          data: Cproduccion_pequeno.data
                        }
                      ]
                    });

              let Cproduccion=this.calculo(this.estadisticas.produccion);
              //console.log(this.meta_query.query)
                this.produccion = new Chart(this.$refs.produccion.getContext("2d")).Line({
                      labels: Cproduccion.labels,
                      datasets: [
                        {
                          label: "Produccion",
                          fillColor: "rgb(220, 53, 69)", 
                          strokeColor: "rgba(220,220,220,1)",
                          pointColor: "rgba(220,220,220,1)",
                          pointStrokeColor: "#fff",
                          pointHighlightFill: "#fff",
                          pointHighlightStroke: "rgba(220,220,220,1)",
                          data: Cproduccion.data
                        }
                      ]
                    });
              let Cventas=this.calculo(this.estadisticas.ventas);
              //console.log(this.meta_query.query)
                this.ventas = new Chart(this.$refs.ventas.getContext("2d")).Line({
                      labels: Cventas.labels,
                      datasets: [
                        {
                          label: "Ventas",
                          fillColor: "rgb(220, 53, 69)", 
                          strokeColor: "rgba(220,220,220,1)",
                          pointColor: "rgba(220,220,220,1)",
                          pointStrokeColor: "#fff",
                          pointHighlightFill: "#fff",
                          pointHighlightStroke: "rgba(220,220,220,1)",
                          data: Cventas.data
                        }
                      ]
                    });/**/

                
              
             
            }
        },   
    }
</script>

<style scope>
    .widget-small
    {
      box-shadow: 0 2px 2px 0 rgba(37, 30, 30, 0.48), 0 1px 5px 0 rgba(36, 27, 27, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
    }
</style>
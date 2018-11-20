<template>
  <div>
  <div class="row">
    <div class="col-md-6 ">
          <div class="widget-small primary coloured-icon"><i class="icon fa fa-stack-overflow fa-3x"></i>
            <div class="info">
              <h4>Stock</h4>
              <p><b>{{ estadisticas.aves }} / {{ estadisticas.capacidad }}</b></p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="widget-small primary coloured-icon"><i class="icon fa fa-close fa-3x"></i>
            <div class="info">
              <h4>Muertes por mes</h4>
              <p><b>{{ estadisticas.media_muertes | NumberFormat }}</b></p>
            </div>
          </div>
        </div>

  </div>
 <div class="row">
        <div :class="meta_query.consulta!='month'&&meta_query.consulta!='week'?'col-md-6':'col-md-12'">
          <div class="tile">
            <h3 class="tile-title">Muertes</h3>
            <div class="embed-responsive embed-responsive-16by9">
              <canvas class="embed-responsive-item" ref="muertes"></canvas>
            </div>
          </div>
        </div>

        <div :class="meta_query.consulta!='month'&&meta_query.consulta!='week'?'col-md-6':'col-md-12'">
          <div class="tile">
            <h3 class="tile-title">Ventas</h3>
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
        name:'estadisticas-aves',
        props:['estadisticas','id_galpon','meta_query'],
        data () {
            return {
               muertes:[],
               ventas:[],
               Cventas:null,
               Cmuertes:null
            }
        },
        created()
        {
          this.muertes=this.estadisticas.muertes;
            this.ventas=this.estadisticas.ventas;
        },
        watch:
        {
          estadisticas(estadisticas)
          {
            this.muertes=estadisticas.muertes;
            this.ventas=estadisticas.ventas;
            this.ejecutar();
          }
        },
        updated()
        {
           this.muertes=this.estadisticas.muertes;
            this.ventas=this.estadisticas.ventas;
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
              
              let Cmuertes=this.calculo(this.muertes);
              //console.log(this.meta_query.query)
              if(this.Cmuertes)
              {
                this.Cmuertes.destroy();
                this.Cventas.destroy();
              }
               this.Cmuertes = new Chart(this.$refs.muertes.getContext("2d")).Line({
                      labels: Cmuertes.labels,
                      datasets: [
                        {
                          label: "Muertes",
                          fillColor: "rgb(220, 53, 69)",
                          strokeColor: "rgba(220,220,220,1)",
                          pointColor: "rgba(220,220,220,1)",
                          pointStrokeColor: "#fff",
                          pointHighlightFill: "#fff",
                          pointHighlightStroke: "rgba(220,220,220,1)",
                          data: Cmuertes.data
                        }
                      ]
                    });
                
               let Cventas=this.calculo(this.ventas);
                this.Cventas= new Chart(this.$refs.ventas.getContext("2d")).Line({
                      labels: Cventas.labels,
                      datasets: [
                        {
                          label: "Ventas",
                          fillColor: "rgb(40, 167, 69)",
                          strokeColor: "rgba(220,220,220,1)",
                          pointColor: "rgba(220,220,220,1)",
                          pointStrokeColor: "#fff",
                          pointHighlightFill: "#fff",
                          pointHighlightStroke: "rgba(220,220,220,1)",
                          data:Cventas.data
                        }
                      ]
                    });
             
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
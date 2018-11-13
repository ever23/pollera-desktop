<template>
  <div>
 <div class="row">
    <div class="col-md-6">
          <div class="widget-small primary coloured-icon"><i class="icon fa fa-stack-overflow fa-3x"></i>
            <div class="info">
              <h4>Stock</h4>
              <p><b>{{ estadisticas.alimentos | AlimFormat }}</b></p>
            </div>
          </div>
        </div> 
         <div class="col-md-6">
          <div class="widget-small primary coloured-icon"><i class="icon fa fa-shopping-basket fa-3x"></i>
            <div class="info">
              <h4>Consumos por mes</h4>
              <p><b>{{ estadisticas.consumo_mes | AlimFormat }}</b></p>
            </div>
          </div>
        </div>

  </div>
 <div class="row">
        <div :class="meta_query.consulta!='month'&&meta_query.consulta!='week'?'col-md-6':'col-md-12'">
          <div class="tile">
            <h3 class="tile-title">Consumo de Alimentos</h3>
            <div class="embed-responsive embed-responsive-16by9">
              <canvas class="embed-responsive-item" ref="consumo"></canvas>
            </div>
          </div>
        </div>

        <div :class="meta_query.consulta!='month'&&meta_query.consulta!='week'?'col-md-6':'col-md-12'">
          <div class="tile">
            <h3 class="tile-title">Compra de Alimentos</h3>
            <div class="embed-responsive embed-responsive-16by9">
              <canvas class="embed-responsive-item" ref="compra"></canvas>
            </div>
          </div>
        </div>
        </div>
  </div>
</template>

<script>
   import  '../../../assets/js/plugins/chart.js'
   import {Format} from '../../../assets/js/DataChartFormat.js' 
    import filter from '../../../assets/js/UserVueFilter.js'
    export default 
    {
       filters:filter,
        name:'estadisticas-alimentos',
        props:['estadisticas','id_galpon','meta_query'],
        data () {
            return {
               consumos:[],
               compras:[],
            }
        },
        created()
        {
          this.compras=this.estadisticas.compras;
            this.consumos=this.estadisticas.consumos;
        },
        watch:
        {
          estadisticas(estadisticas)
          {
            this.compras=this.estadisticas.compras;
            this.consumos=this.estadisticas.consumos;
            this.ejecutar();
          }
        },
        updated()
        {
           this.compras=this.estadisticas.compras;
            this.consumos=this.estadisticas.consumos;
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
              
              let Cconsumos=this.calculo(this.consumos);
              //console.log(this.meta_query.query)
                var muertes = new Chart(this.$refs.consumo.getContext("2d")).Line({
                      labels: Cconsumos.labels,
                      datasets: [
                        {
                          label: "Muertes",
                          fillColor: "rgb(220, 53, 69)",
                          strokeColor: "rgba(220,220,220,1)",
                          pointColor: "rgba(220,220,220,1)",
                          pointStrokeColor: "#fff",
                          pointHighlightFill: "#fff",
                          pointHighlightStroke: "rgba(220,220,220,1)",
                          data: Cconsumos.data
                        }
                      ]
                    });
                
               let Cventas=this.calculo(this.compras);
                var ventas= new Chart(this.$refs.compra.getContext("2d")).Line({
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
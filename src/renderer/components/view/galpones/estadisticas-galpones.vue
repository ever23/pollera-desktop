<template>
  <div>
  
 <div class="row">
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
            <h3 class="tile-title">Muerte de Aves</h3>
            <div class="embed-responsive embed-responsive-16by9">
              <canvas class="embed-responsive-item" ref="muertes"></canvas>
            </div>
          </div>
        </div>
        
  </div>
  </div>
</template>

<script>
   import  '@/assets/js/plugins/chart.js'
   import {Format} from '@/assets/js/DataChartFormat.js'
    export default 
    {
        name:'estadisticas-huevos',
        props:['estadisticas','id_galpon','meta_query'],
        data () {
            return {
              Cmuertes:null,
              Cproduccion:null
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
          calculo(produccion)
          {
            let Result=[];
           // let produccion=this.estadisticas.produccion_huevos;
            let labels=this.labels();
           
            for(let l in labels)
            {
              Result[labels[l]]=Number(l)+1;
            }
            let R=[];
            for(let p in Result)
            {
              //console.log(Result[p]);
              let prod=produccion.filter((i)=>{return Number(i.id_galpon)==Result[p]});
              //console.log(produccion);
              let suma=0;
              for(let f of prod)
                suma+=Number(f.cantidad);

              R[Result[p]-1]=suma;
            }
             let labls=[];
              for(let i of labels)
              {
                if(i)
                  labls.push(i)
              }
               let data=[];
              for(let i of R)
              {
                if(i)
                  data.push(i)
              }
            return {labels:labls,data:data};
            ///return Format(estadistica,this.meta_query.consulta,this.meta_query.consulta=='month'?this.meta_query.query.match(/\d{2}$/)[0]:this.meta_query.query);
           
          },
          labels()
          {
            let galpones = this.estadisticas.galpones;
            let Result=[];
            if(galpones)
            for(let g of galpones)
            {
              Result[g.id_galpon-1]=g.nombre;
            }
            return Result;
          },
          ejecutar()
            { 
              let Cmuertes=this.calculo(this.estadisticas.muertes_aves);
              //let Cproduccion=this.calculo(this.estadisticas.produccion);
              //console.log(this.meta_query.query)
              if(this.Cmuertes)
              {
                this.Cmuertes.destroy();
                this.Cproduccion.destroy();
              }
              this.Cmuertes = new Chart(this.$refs.muertes.getContext("2d")).Bar({
                      labels: Cmuertes.labels,
                      datasets: [
                        {
                          label: "Muertes de Aves",
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
               let Cproduccion=this.calculo(this.estadisticas.produccion_huevos);
                this.Cproduccion = new Chart(this.$refs.produccion.getContext("2d")).Bar({
                      labels: Cproduccion.labels,
                      datasets: [
                        {
                          label: "Produccion",
                          fillColor: "rgb(40, 167, 69)",
                          strokeColor: "rgba(220,220,220,1)",
                          pointColor: "rgba(220,220,220,1)",
                          pointStrokeColor: "#fff",
                          pointHighlightFill: "#fff",
                          pointHighlightStroke: "rgba(220,220,220,1)",
                          data: Cproduccion.data
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
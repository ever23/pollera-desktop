<template>
<main class="app-content">
<app-title :title="'Consumo medicinas'"  :icon="'laptop'"></app-title>
<div class=" tile text-center">
  <h3 class="">Consumos de medicamentos</h3>
<div class="row" >
        <div class="form-group col-md-4 offset-md-4">
                    <select-granjas @change="select"></select-granjas>
            </div>
            </div>   
</div>
<div class="row">
<div class="col-md-12 ">
 <list-consumos-medicinas :medicinas="medicinas" :id_granjas="select_id_granjas" @change="select"></list-consumos-medicinas>
</div>
</div>
</main>
</template>

<script>
    import axios from 'axios'
   
    import lista from './list-consumos-medicinas.vue'
    export default 
    {
        name:'medicinas',
        components:{'list-consumos-medicinas':lista},
        
        data () {
            return {
                select_id_granjas:null,
                
                medicinas:[]
            }
        },
        created()
        {
          
            
            this.select(null);
            
          
            
        },
        computed:
        {
           
        },
        methods:
        {
            select(id_granjas)
            {
              this.select_id_granjas=id_granjas;
                axios.get('/polleras/api/medicinas/consumos'+(id_granjas?'?id_granjas='+id_granjas:''))
              .then(request=>
              {
                  if(!request.data.error)
                  {
                      this.medicinas=request.data.data;
                  }else
                  {
                      AxiosCatch(request.data.error);
                  }
              }).catch(AxiosCatch);
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
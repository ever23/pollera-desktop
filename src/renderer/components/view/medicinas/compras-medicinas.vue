<template>
<main class="app-content">
<app-title title="Compras medicinas"  :icon="'laptop'"></app-title>

<div class="row">
<div class="col-md-12 ">
 <list-compras-medicinas :medicinas="medicinas" @change="select"></list-compras-medicinas>
</div>
</div>
</main>
</template>

<script>
    import axios from 'axios'
    
   
    import lista from './list-compras-medicinas.vue'
    export default 
    {
        name:'medicinas',
        components:{'list-compras-medicinas':lista},
  
        data () {
            return {
                
                medicinas:[]
            }
        },
        created()
        {
            this.select();
        },
        computed:
        {
           
        },
        methods:
        {
            select()
            {
                axios.get('/medicinas/compras')
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
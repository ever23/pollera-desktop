<template>
<main class="app-content">
<app-title :title="'Medicinas'" :to="'medicinas'" :icon="'laptop'"></app-title>

<div class="row">
<div class="col-md-12 ">
 <list-medicinas :medicinas="medicinas" @change="listado"></list-medicinas>
</div>
</div>
</main>
</template>

<script>
    import axios from 'axios'
   
    import lista from './list-medicinas.vue'
    export default 
    {
        name:'medicinas',
        components:{'list-medicinas':lista},
       
        data () {
            return {
                
               
                medicinas:[]
            }
        },
        created()
        {
         this.listado();
        },
        computed:
        {
           
        },
        methods:
        {
            listado()
            {
               this.$store.commit('loading',true);
                axios.get('/medicinas/listado')
              .then(request=>
              {
                 this.$store.commit('loading',false);
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
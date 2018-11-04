<template>
  <div>
    <label class="control-label">Galpon </label>
    <select v-model="galpon" class="form-control" @change="select">
      <option value="">Seleccione Galpon</option>
      <option v-for="item in galpones" :value="item.id_galpon" :selected="item.id_galpon==galpon">{{ item.nombre }}</option>
    </select>
  </div>
</template>

<script>
    import axios from 'axios'
    export default 
    {
        name:'select-galpon',
        props:['id_galpon'],
        data () {
            return {
               galpones:[],
               galpon:null
            }
        },
        created()
        {
           this.galpon=this.id_galpon;
          axios.get('/polleras/api/galpones').then((res)=>
          {
            this.galpones=res.data.galpones.result;
           // console.log(this.galpones);
          }).catch(AxiosCatch);
        },
        watch:
        {
          id_galpon()
          {
            this.galpon=this.id_galpon;
          }
        },
        computed:
        {
           
        },
        methods:
        {
          
          select()
          {
            this.$emit('change',this.galpon);
          },
         
        },   
    }
</script>


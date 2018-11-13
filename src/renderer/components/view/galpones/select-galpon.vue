<template>
  <div>
    <label class="control-label">Galpon </label>
    <select v-model="galpon" name="id_galpon" class="form-control" @change="select">
      <option value="">Seleccione Galpon</option>
      <option v-for="item in galpones" :value="item.id_galpon" :selected="item.id_galpon==galpon">{{ item.nombre }} </option>
    </select>
  </div>
</template>

<script>
    import axios from 'axios'
    export default 
    {
        name:'select-galpon',
        props:{id_galpon:{required:false},filter:{required:false,type:Function }},
        data () {
            return {
               galpones:[],
               galpon:null
            }
        },
        created()
        {

           this.galpon=this.id_galpon;
          axios.get('/galpones').then((res)=>
          {
            this.galpones=res.data.galpones.filter(typeof this.filter=='function'?this.filter:h=>true);
            if(res.data.galpones.length==0)
            {
              swal({
                title: "No hay Galpones!",
                text: "Porfavor registre los galpones de su granja para continuar",
                type: "error",
                closeOnConfirm: true,
              },()=>
              {
                 this.$router.push({name:'agregar-galpon'})
              });
            }
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
         
            this.$emit('change',this.galpon,this.galpones.find(g=>{return g.id_galpon===this.galpon}));
          },
         
        },   
    }
</script>


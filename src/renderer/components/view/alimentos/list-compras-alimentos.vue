<template>
  <div>
     <table class="table table-hover table-bordered" id="compras_alimentos">
             <thead >
                 <tr >
                    <td>
                      detalles
                    </td>
                    <td>
                      Cantidad
                    </td>
                   <td>
                      Costo unitario
                    </td>
                    <td>
                      Fecha
                    </td>
                    <td>
                      Costo
                    </td>
                    <td v-if="isRoot">
                      
                    </td>
                </tr> 
             </thead>
                <tbody>
               <tr v-for="item in compras" > 
                   <td>
                            {{ item.detalles }}
                    </td>
                     <td>
                            {{ item.cantidad | AlimFormat }}
                    </td>
                    <td>
                            {{ item.costo | BsSFormat }}
                    </td>
                    <td>
                            {{ item.fecha }}
                    </td>
                     <td>
                            {{ item.costo*item.cantidad | BsSFormat }}
                    </td>
                     <td class="btn-group" v-if="isRoot">
                    <button class="btn btn-primary btn-sm" type="button" @click="eliminar(item)"><i class="fa fa-trash-o"></i></button>
                    </td>
                </tr> 
                </tbody>
            </table>
  </div>
</template>

<script>
    import Del from  '../../../assets/js/delete.js'
    import filter from '../../../assets/js/UserVueFilter.js'
    export default 
    {
        name:'list-consumos-alimentos',
        props:['compras'],
        filters:filter,
        data () {
            return {
               
            }
        },
        updated()
        { 
           
        },
        created()
        {
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
          eliminar(item)
            {
               Del('compra_alimentos','id_comp',item.id_comp).then(d=>this.$emit('change'));
                
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
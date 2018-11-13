<template>
  <div>
    <table class="table  table-hover table-bordered" ref="tabla">
             <thead >
                 <tr >
                    
                    <td>
                      Detalles
                    </td>
                     <td>
                      Tipos
                    </td>
                    <td>
                      Cantidad
                    </td>
                   <td>
                      Precio Unitario 
                    </td>
                    <td>
                      Fecha
                    </td>
                     <td>
                      Precio  
                    </td>
                      <td v-if="isRoot">
                      
                    </td>
                </tr> 
             </thead>
                <tbody>
                <tr v-for="item in ventas" ref="items"> 
                   <td>
                            {{ item.detalles }}
                    </td>
                    <td>
                            {{ item.tipo }}
                    </td>
                     <td>
                            {{ item.cantidad }}
                    </td>
                    <td>
                            {{ item.costo | BsSFormat }}
                    </td>
                    <td>
                            {{ item.fecha }}
                    </td>
                    <td>
                            {{ item.cantidad*item.costo | BsSFormat }}
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
    import DataTable from '../../../assets/js/list-DataTable.js'
    export default 
    {
        mixins: [DataTable],
        filters:filter,
        name:'list-consumos-alimentos',
        props:['ventas'],

        data () {
            return {
                
               
            }
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
            Del('venta_huevos','id_ventas',item.id_ventas).then(d=>this.$emit('change'));
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
<template>
<div>
 
            <table class="table  table-hover table-bordered" ref="tabla">
             <thead >
                 <tr >
                    <td>
                      Detalles
                    </td>
                   <td v-if="!id_galpon">
                      Galpon
                    </td>
                    <td>
                      Costo por unidad
                    </td>
                    <td>
                      Cantidad
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
                <tr v-for="item in compras" ref="items"> 
                    <td>
                            {{ item.detalles}}
                    </td>
                     <td v-if="!id_galpon">
                            {{ item.nombre}}
                    </td>
                     <td>
                            {{ item.costo | BsSFormat}}
                    </td>
                    <td>
                            {{ item.cantidad }}
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
    import Del from  '@/assets/js/delete.js'
    import filter from '@/assets/js/UserVueFilter.js'
   import DataTable from '@/assets/js/list-DataTable.js'
    export default 
    {
        mixins: [DataTable],
        filters:filter,
        name:'list-compras-aves',
        props:['compras','id_galpon'],
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
               Del('compra_aves','id_compra',item.id_compra).then(d=>this.$emit('change'));
                
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
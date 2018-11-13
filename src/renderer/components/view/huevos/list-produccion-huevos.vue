<template>
  <div>
     <table class="table  table-hover table-bordered" ref="tabla">
             <thead >
                 <tr>
                  <td>
                      Detalles
                    </td>
                    <td>
                      Galpon
                    </td>
                     <td>
                      Tipo
                    </td>
                    <td>
                      Cantidad
                    </td>
                   
                    <td>
                      Fecha
                    </td>
                    <td v-if="isRoot">
                      
                    </td>
                </tr> 
             </thead>
                <tbody>
                <tr v-for="item in produccion" ref="items"> 
                    <td>
                            {{ item.detalles }}
                    </td>
                     <td>
                            {{ item.nombre }}
                    </td>
                   <td>
                            {{ item.tipo }}
                    </td>
                   
                     <td>
                            {{ item.cantidad }}
                    </td>
                   
                    <td>
                            {{ item.fecha }}
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
   import DataTable from '../../../assets/js/list-DataTable.js'
    export default 
    {
        mixins: [DataTable],
        name:'list-produccion-huevos',
        props:['produccion'],
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
                 Del('produccion_huevos','id_produccion',item.id_produccion).then(d=>this.$emit('change'));
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
<template>
  <div>
    <table  class="table  table-hover table-bordered" ref="tabla"  id="consumos_alimentos">
             <thead >
                 <tr >
                     
                   <td>
                      Galpon
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
               <tr v-for="item in consumos" ref="items"> 
                    <td>
                            {{ item.nombre }}
                    </td>
                     <td>
                            {{ item.cantidad | AlimFormat }}
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
    import axios from 'axios'
    import Del from  '@/assets/js/delete.js'
    import filter from '@/assets/js/UserVueFilter.js'
    import DataTable from '@/assets/js/list-DataTable.js'
    export default 
    {
        mixins: [DataTable],
       filters:filter,
        name:'list-consumos-alimentos',
        props:['consumos'],
       
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
              Del('consumo_alimentos','id_consumo',item.id_consumo).then(d=>this.$emit('change'));
               
            }, 
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
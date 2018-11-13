<template>
  <div>
    <table  class="table  table-hover table-bordered" ref="tabla">
             <thead >
                 <tr >
                     
                    <td>
                      C.I
                    </td>
                    <td>
                      Nombres
                    y
                      Apellidos
                    </td>
                    <td>
                      Cargo
                    </td>
                    <td>
                      fecha
                    </td>
                     <td v-if="isRoot">
                    
                    </td>
                </tr> 
             </thead>
                <tbody>
               <tr v-for="item in asistencia" ref="items"> 
                    <td>
                            {{ item.ci_empleado }}
                    </td>
                     <td>
                            {{ item.nombres }}
                    
                            {{ item.apellidos }}
                    </td>
                    <td>
                            {{ item.cargo }}
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
        name:'list-asistencia',
        props:['asistencia'],

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
              
                Del('asistencia','id_asistencia',item.id_asistencia).then(d=>this.$emit('change'));
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
<template>

 <div  >
            <table class="table table-hover table-bordered" id="list_compras_medicinas">
             <thead >
                 <tr >
                    <td>
                      Descripcion
                    </td>
                   <td>
                      Tipo
                    </td>
                    <td>
                      Costo unitario
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
               <tr v-for="item in compras" > 
                    <td>
                            {{ item.descripcion}}
                    </td>
                     <td>
                            {{ item.tipo }}
                    </td>
                     <td>
                            {{ item.costo | BsSFormat }}
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
    import filter from '../../../assets/js/UserVueFilter.js'
    import Del from  '../../../assets/js/delete.js'
    export default 
    {
        name:'list-compras-medicinas',
        props:['compras','id_granjas'],
        filters:filter,
        data () {
            return {
               
            }
        },
        updated()
        {
          $(document).ready(e=>
          {
            $('#list_compras_medicinas').DataTable();
            
          });
            
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
                 Del('compra_medicinas','id_compra',item.id_compra).then(d=>this.$emit('change'));
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
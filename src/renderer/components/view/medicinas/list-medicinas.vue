<template>

 <div  >
            <table class="table  table-hover table-bordered" ref="tabla">
             <thead >
                 <tr >
                    <td>
                      Descripcion
                    </td>
                   <td>
                      Tipo
                    </td>
                    <td>
                      Stock
                    </td>
                     <td>
                    
                    </td>
                    
                </tr> 
             </thead>
                <tbody>
                <tr v-for="item in medicinas" ref="items"> 
                    <td>
                            {{ item.descripcion}}
                    </td>
                     <td>
                            {{ item.tipo }}
                    </td>
                     <td>
                            {{ item.stock }}
                    </td>
                    <td class="btn-group">
                    <button v-if="isRoot" class="btn btn-primary btn-sm" type="button" @click="eliminar(item)"><i class="fa fa-trash-o"></i></button>
                    
                   
                    <router-link v-if="isRoot" :to="{name:'editar-medicinas',params:{item:item}}" class="btn btn-primary btn-sm" title="Editar">
                      <i class="fa fa-edit"></i>
                    </router-link>

                    <router-link :to="{name:'compra-medicinas',params:{id_medicina:item.id_medicina}}" class="btn btn-primary btn-sm" title="Registrar compra">
                      <i class="fa fa-cart-plus"></i>
                    </router-link>
                    <router-link v-if="!galpon.id_galpon || galpon.aves>0"  :to="{name:'consumo-medicinas',params:{id_medicina:item.id_medicina}}" class="btn btn-primary btn-sm" title="Registrar Consumo">
                      <i class="fa fa-shopping-basket"></i>
                    </router-link>
                    
                    
                    </td> 
                </tr> 
                </tbody>
            </table>
        </div>

</template>

<script>
    import axios from 'axios'
    import DataTable from '@/assets/js/list-DataTable.js'
    export default 
    {
        mixins: [DataTable],
        name:'list-medicinas',
        props:['medicinas','galpon'],
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
              
                swal(
                {
                  title: "Eliminar Medicina",
                  text: "Deseas eliminar la medicna "+item.descripcion+"?",
                  type: "warning",
                  showCancelButton: true,
                  confirmButtonText: "si, Eliminar!",
                  cancelButtonText: "No",
                  closeOnConfirm: true,
                  closeOnCancel: true
                }, isConfirm=> 
                {
                  if (isConfirm) 
                  { 
                   // delete(this.proyectos[index]);
                    axios.delete('/medicinas/eliminar?id_medicina='+item.id_medicina)
                    .then(request=>
                    {
                      if(request.data.eliminado)
                      {
                        this.$emit('change');
                      }else
                      {
                        AxiosCatch(request.data.error);
                      }  
                      
                    })
                    .catch(AxiosCatch);
                  } 
                });
            },
            editar()
            {

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
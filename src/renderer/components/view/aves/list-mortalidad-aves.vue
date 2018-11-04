<template>

<div>
            <table class="table table-hover table-bordered" id="muertes">
             <thead >
                 <tr >
                    <td>
                      Detalles
                    </td>
                     <td v-if="!id_galpon">
                      Galpon
                    </td>
                   <td>
                      cantidad
                    </td>
                    <td>
                      fecha
                    </td>
                    <td v-if="isRoot">
                      
                    </td>
                    
                </tr> 
             </thead>
                <tbody>
               <tr v-for="item in muertes" > 
                    <td>
                            {{ item.rason}}
                    </td>
                    <td v-if="!id_galpon">
                            {{ item.nombre}}
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
    export default 
    {
        name:'list-mortalidad-aves',
        props:['muertes','id_galpon'],
        data () {
            return {
               
            }
        },
        created()
        {
          
            
        },
        updated()
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
                 Del('mortalidad','id_mortalidad',item.id_mortalidad).then(d=>this.$emit('change'));
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
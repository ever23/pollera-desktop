<template>
  <div>
    <table class="table  table-hover table-bordered" ref="tabla">
             <thead >
                 <tr >
                    
                <td>
                      Detalles
                    </td>
                     <td>
                      Capacidad
                    </td>
                     <td>
                      Consumo por aves
                    </td>
                    <td>
                      Aves
                    </td>
                     <td>
                      Consumo por dia
                    </td>
                    <td>
                      
                    </td>
                     
                </tr> 
             </thead>
                <tbody>
                <tr v-for="item in galpones" ref="items"> 
                   <td>
                            {{ item.nombre }}
                    </td>
                    <td>
                            {{ item.capacidad }}
                    </td>
                     <td>
                            {{ item.consumo  | AlimFormat }}
                    </td>
                     <td>
                            {{ item.aves }}
                    </td>
                    <td>
                            {{ item.aves*item.consumo | AlimFormat }}
                    </td>
                    <td >
                    <div class="btn-group fa-pull-right">
                      <router-link :to="{name:'resumen-alimentos-galpon',params:{id_galpon:item.id_galpon}}" class="btn btn-primary btn-sm" type="button" title="Alimentos">
                        <i class="fa fa-list-ul"></i>
                      </router-link>
                      <router-link :to="{name:'resumen-medicinas-galpon',params:{id_galpon:item.id_galpon}}" class="btn btn-primary btn-sm" type="button"  title="Medicinas">
                        <i class="fa fa-medkit"></i>
                      </router-link>
                      <router-link :to="{name:'resumen-aves-galpon',params:{id_galpon:item.id_galpon}}" class="btn btn-primary btn-sm" type="button" title="Aves">
                        <i class="fa fa-twitter"></i>
                      </router-link>
                       <router-link :to="{name:'resumen-huevos-galpon',params:{id_galpon:item.id_galpon}}" class="btn btn-primary btn-sm" type="button" title="Huevos">
                        <i class="fa fa-circle"></i>
                      </router-link>
                        
                      
                      <router-link v-if="isRoot" :to="{name:'editar-galpon',params:{id_galpon:item.id_galpon}}" class="btn btn-primary btn-sm" title="Editar">
                      <i class="fa fa-edit"></i>
                    </router-link>
                    <button v-if="isRoot" class="btn btn-primary btn-sm" type="button" @click="eliminar(item)"><i class="fa fa-trash-o"></i></button>
                    </div>
                    </td>
                </tr> 
                </tbody>
            </table>
  </div>
</template>

<script>
   import filter from '@/assets/js/UserVueFilter.js'
    import Del from  '@/assets/js/delete.js'
    import DataTable from '@/assets/js/list-DataTable.js'
    export default 
    {
        filters:filter,
        mixins: [DataTable],
        name:'list-galpones',
        props:['galpones'],

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
                 Del('galpones','id_galpon',item.id_galpon).then(d=>this.$emit('change'));
            } 
        },   
    }
</script>

<style>

</style>
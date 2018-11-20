<template>
	<div >
		<div class="mailbox-controls">
            <div class="animated-checkbox">
            </div>
            <div class="btn-group">
                <router-link class="btn btn-primary btn-sm" :to="{name:'registro-usuario'}"><i class="fa fa-plus"></i>Agregar usuario</router-link>
            </div> 
        </div>
         <div class="table -responsive mailbox-messages"  >
            <table class="table  table-hover table-bordered" ref="tabla">
             <thead >
                 <tr class="info">
                    <td>
                      Nombre y apellido
                    </td>
                    <td>
                    nombre de usuario
                    </td>
                    <td>
                    Permisos
                    </td>
                    
                     <td>
                    
                    </td>
                    
                </tr> 
             </thead>
                <tbody>
                <tr v-for="user in usuarios" ref="items"> 
                   
                  
                    <td>
                        <a :href="user.url_user">
                            {{ user.nombres }} {{ user.apellidos }}
                            </a>
                        
                    </td>
                    <td >{{ user.user }} </td>
                   
                    <td>{{ user.permisos }}</td>

                    <td class="btn-group">
                    	<router-link class="btn btn-primary btn-sm" :to="{name:'editar-usuario',params:{id_usuarios:user.id_usuarios}}"><i class="fa fa-edit"></i></router-link>
		                <button class="btn btn-primary btn-sm" type="button" @click="eliminar(user)"><i class="fa fa-trash-o"></i></button>
		                
		                <!--<button class="btn btn-primary btn-sm" type="button" @click="permisos(user)"><i class="fa fa-refresh"></i></button>-->
               			
                    </td> 
                </tr> 
                </tbody>
            </table>
        </div>
       
    </div>

</template>
<script>
import axios from 'axios'
	import DataTable from '@/assets/js/list-DataTable.js'
    export default 
    {
        mixins: [DataTable],
		name:'usuarios',
		data()
		{
			return {
				usuarios:[]
			}
		},
		created()
		{
           
	       this.refresh();	
		},
        
        methods:
        {
            refresh()
            {
                this.$store.commit('loading',true);
               axios.get('/user/lista')
                .then(request=>
                {
                   this.$store.commit('loading',false);
                    this.usuarios=request.data.data;
                }).catch(c=>
                {
                    AxiosCatch(c);
                   
                }); 
            },
            eliminar(user)
            {
               swal(
                {
                  title: "Eliminar Usuario",
                  text: "Deseas eliminar el usuario "+user.nombres+"?",
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
                    this.$store.commit('loading',true);
                    axios.delete('/user/eliminar?id_usuarios='+user.id_usuarios)
                    .then(request=>
                    {
                       this.$store.commit('loading',false);
                      if(request.data.eliminado)
                      {
                        this.usuarios=this.usuarios.filter(p=>p.id_usuarios!=user.id_usuarios);
                      }else
                      {
                        AxiosCatch(request.data.error);
                      }  
                      
                    })
                    .catch(AxiosCatch);
                  } 
                });
            },
            permisos(user)
            {

            }
        }
        

	}
</script>
<style>
    .blob
    {
        font-weight: bold
    }
    td.btn-group
    {
    	padding: 0px;
    }
</style>
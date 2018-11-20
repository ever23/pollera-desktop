<template>
	<div >
		<div class="mailbox-controls">
            <h3>Ultimas sesiones</h3> 
        </div>
         <div class="table -responsive mailbox-messages"  >
            <table class="table  table-hover table-bordered" ref="tabla">
             <thead >
                 <tr >
                  <td>Status</td>
                    <td>
                      Nombre y apellido
                    </td>
                    <td>
                    nombre de usuario
                    </td>
                    <td>
                    Fecha y Hora
                    </td>
                   
                    
                </tr> 
             </thead>
                <tbody>
                <tr v-for="user in sessiones" ref="items"> 
                   
                   <td > 
                   <button :class="['btn','btn-'+(user.status=='activo'?'success':'danger'),'btn-sm']" type="button" @click="cerrar(user)"><i :class="'fa fa-'+(user.status=='activo'?'unlock':'lock')"></i><i class="invisible">{{ user.status=='activo'?1:2 }}</i>
                   </button>
                   </td>
                    <td>
                       
                            {{ user.nombres }} {{ user.apellidos }}
                            
                        
                    </td>
                    <td >{{ user.user }} </td>
                   
                    <td>{{ user.fecha }}</td>
                  
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
		name:'sessiones',
		data()
		{
			return {
				sessiones:[]
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
               axios.get('/user/sessiones')
                .then(request=>
                {
                     this.$store.commit('loading',false);
                    this.sessiones=request.data.sessiones;
                }).catch(c=>
                {
                    AxiosCatch(c);
                   
                }); 
            },
            
            cerrar(user)
            {
                if(user.status!='cerrado')
                {
                    this.$store.commit('loading',true);
                    axios.get('/user/closesessione?id_session='+user.id_session).then(req=>
                        {
                            this.$store.commit('loading',false);
                            if(req.data.cerrado)
                            {
                                 user.status='cerrado';
                            }else
                            {
                                AxiosCatch(req.data.error)
                            }
                        }).catch(AxiosCatch);
                }
                
               
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
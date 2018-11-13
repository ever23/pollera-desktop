<template>
	<div>
		<h3> Editar usuario</h3>
		<formulario :error="errores"   @submit.prevent="editar">
            <div class="form-group">
                <label class="control-label">Nombres</label>
                <input class="form-control" v-model="user.nombres" name="nombres" type="text" placeholder="Nombres">
            </div>
            <div class="form-group">
                <label class="control-label">Apellidos</label>
                <input class="form-control" v-model="user.apellidos" name="apellidos" type="text" placeholder="Apellidos">
            </div>
            <div class="form-group">
                <label class="control-label">Nombre de usuario</label>
                <input class="form-control" v-model="user.user" name="user" type="text" placeholder="Nombre de usuario">
            </div>
             <div class="form-group" v-if="isRoot">
	                  <label class="control-label">Permisos</label>
	                  <select class="form-control"  v-model="user.permisos" name="permisos">
	                	<option value="root">Root</option>
	                	<option value="admin">Administrador</option>
	                  </select>
	                </div>
           <div class="form-group">
	              <button class="btn btn-primary" type="submit">
	              	<i class="fa fa-fw fa-lg fa-check-circle"></i>Guardar
	              </button>
	                          
	         </div>
        </formulario>
  	</div>
</template>
<script>
import axios from 'axios'
	export default
	{
		name:'editar-usuario',
		props:['id_usuarios'],
		data()
		{
			return {
				user:
				{
					id_usuarios:null,
			       	nombres:null,
					apellidos:null,
					user:null,
					permisos:null,
					
					
					Submited:1
				},
				errores:{}
			}
		},
		created()
		{
			this.user.id_usuarios=this.id_usuarios;
			 this.$store.commit('loading',true);
			axios.get('/user/user?id_usuarios='+this.id_usuarios).
			then((req)=>
			{
				 this.$store.commit('loading',false);
				this.user.nombres=req.data.user.nombres;
				this.user.apellidos=req.data.user.apellidos;
				this.user.user=req.data.user.user;
				this.user.permisos=req.data.user.permisos;
			}).catch(AxiosCatch);
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
			editar()
			{
				 this.$store.commit('loading',true);
				axios.post('/user/editar',this.user).
				then((request)=>
				{
					 this.$store.commit('loading',false);
					if(request.data.editado)
					{
						
						swal(
                        {
                            title: "Listo!",
                            text: "Usted a actualizado la informacion ",
                            type: "success",

                        },
                        ()=>{
                        	this.$store.commit('Login',request.data.data);
                        	if(this.id_usuario==this.$store.getters.User.id_usuario)
                        	{
                        		this.$router.push({name:'perfil'});
                        	}else
                        	{

                        		this.$router.push({name:'usuarios'});
                        	}                      	 
                        });
					}else
					{
						this.errores=request.data.error;
					}
				}).catch(AxiosCatch);
			}
		}
		
	}
</script>
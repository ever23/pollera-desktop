<template>

		
		<div class="row">
		<div class="col-md-2 col-sm-1"></div>
			<div class="col-md-8 col-sm-10">
	          <div >
	            <h3 class="tile-title">Registrar Usuario</h3>
	            <div class="tile-body">
	              <form @submit.prevent="Enviar">
	              <div class="form-group">
	                  <label class="control-label">Nombres </label>
	                  <input class="form-control" v-model="user.nombres" required type="text" placeholder="Nombre">
	                </div>
	                 <div class="form-group">
	                  <label class="control-label">Apellidos </label>
	                  <input class="form-control" v-model="user.apellidos" required type="text" placeholder="Apellidos">
	                </div>
	                <div class="form-group">
	                  <label class="control-label">Nombre de usuario </label>
	                  <input class="form-control" v-model="user.user" required type="text" placeholder="Nombre de usuarios">
	                </div>
	                
	                <div class="form-group">
	                  <label class="control-label">Permisos</label>
	                  <select class="form-control"  name="perm_user" v-model="user.permisos">
	                	<option value="root">Root</option>
	                	<option value="admin">Administrador</option>
	                  </select>
	                </div>
	               
	                 <div class="form-group">
	                  <label class="control-label">Contraseña</label>
	                  <input class="form-control" v-model="user.pass1" required type="password" placeholder="Contraseña">
	                </div>
	                <div class="form-group">
	                  <label class="control-label">Repita la contraseña </label>
	              
	                   <input class="form-control" v-model="user.pass2"  type="password" placeholder="Repita contraseña">
	                </div>
	          
	               
	                <div class="form-group">
	              <button class="btn btn-primary" type="submit"><i class="fa fa-fw fa-lg fa-check-circle"></i>Guardar</button>&nbsp;&nbsp;&nbsp;<button class="btn btn-secondary" type="button" @click.prevent="Cancelar"><i class="fa fa-fw fa-lg fa-times-circle"></i>Cancelar</button>
	            
	                </div>
	              </form>
	            </div>
	            
	          </div>
        	</div>
        	<div class="col-md-2 col-sm-1"></div>
		</div>

</template>
<script>
import axios from 'axios';

	export default
	{
		name:'registro-usuario',
		data()
		{
			return {
				user:
				{
					nombres:null,
					apellidos:null,
					user:null,
					permisos:null,
					pass1:null,
					pass2:null,
					
					Submited:1
					
				},
			}
		},
		created()
		{
			
		},
		mounted()
		{
		},
		methods:
		{
			Cancelar()
			{
				
			},
			select(id_granjas)
			{
				this.user.id_granjas=id_granjas;
			},
			ValidForm()
			{
				
				if(this.user.pass2!=this.user.pass1)
				{
					
					swal({
                            title: "Error!",
                            text: "Las contraseñas no coinciden ",
                            type: "warning",

                        });
					this.user.pass1='';
					this.user.pass2='';
					return false;
				}
				return true;
			},
			Enviar()
			{
				if(!this.ValidForm())
				return;
			 this.$store.commit('loading',true);
				axios.post('/polleras/api/user/registro',this.user)
                .then(request => 
                {
                	 this.$store.commit('loading',false);
                    if(request.data.insert)
                    {
                        //swal("Listo!", "El proyecto se ha almacenado ", "success");
                        swal(
                        {
                            title: "Listo!",
                            text: "El portfolio se ha almacenado ",
                            type: "success",

                        },
                        ()=>this.$router.push({name:'usuarios'}));
                             
                    }else
                    {
                        AxiosCatch(request.data.error);
                    }  
                }).catch(AxiosCatch);
			}
		}
	}

</script>
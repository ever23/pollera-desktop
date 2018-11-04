<template>
	<div>
		<h3> Editar contraseña</h3>
		<form @submit.prevent="editar">
            <div class="form-group">
                <label class="control-label">Contraseña anterior</label>
                <input class="form-control" v-model="user.pass" type="password" placeholder="contraseña">
            </div>
           
            <div class="form-group">
                <label class="control-label">Nueva contraseña</label>
                <input class="form-control" v-model="user.pass1" type="password" placeholder="nueva contraseña">
            </div>
             <div class="form-group">
                <label class="control-label">Repite contraseña</label>
                <input class="form-control" v-model="user.pass2" type="password" placeholder="repetir contraseña">
            </div>
           <div class="form-group">
	              <button class="btn btn-primary" type="submit">
	              	<i class="fa fa-fw fa-lg fa-check-circle"></i>Guardar
	              </button>
	                          
	         </div>
        </form>
  	</div>
</template>
<script>
import axios from 'axios'
	export default
	{
		name:'editar-contrasena',
		data()
		{
			return {
				user:
				{

			        pass:null,
			        pass1:null,
			        pass2:null,
			        Submited:1
				}
			}
		},
		created()
		{
			
		},
		methods:
		{
			editar()
			{
				 this.$store.commit('loading',true);
				axios.post('/polleras/api/user/CambiarContrasena',this.user).
				then((request)=>
				{
					 this.$store.commit('loading',false);
					if(request.data.editado)
					{

						swal(
                        {
                            title: "Listo!",
                            text: "Usted a cambiado la contraseña ",
                            type: "success",

                        },
                        ()=>{
                        	this.$router.push({name:'login'})                  	 
                        });
						
					}else
					{
						AxiosCatch(request.data.error);
					}
				}).catch(AxiosCatch);
			}
		}
		
	}
</script>
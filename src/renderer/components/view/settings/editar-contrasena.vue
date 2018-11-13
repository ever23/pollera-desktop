<template>
	<div>
		<h3> Editar contraseña</h3>
		<formulario :error="errores"   @submit.prevent="editar">
            <div class="form-group">
                <label class="control-label">Contraseña anterior</label>
                <input class="form-control" v-model="user.pass" name="pass" type="password" placeholder="contraseña">
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
        </formulario>
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
				},
				errroes:{}
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
				axios.post('/user/CambiarContrasena',this.user).
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
						this.errores=request.data.error;
					}
				}).catch(AxiosCatch);
			}
		}
		
	}
</script>
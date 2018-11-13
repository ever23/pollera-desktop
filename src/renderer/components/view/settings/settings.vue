<template>
	<div>
		<h3> Configuracion</h3>
		<formulario :error="errores"   @submit.prevent="editar">
            <div class="form-group">
                <label class="control-label">Nombre de granja</label>
                <input class="form-control" v-model="config.nombre" name="nombre" type="text" placeholder="Ingresa nombre">
            </div>
            <div class="form-group">
                <label class="control-label">Porcentaje de uso minimo de los galpones</label>
                <input class="form-control" v-model="config.usoGalpon" name="usoGalpon" type="text" placeholder="Ingresa porcentaje">
            </div>
            <div class="form-group">
                <label class="control-label">Porcentaje de muertes de aves aceptables </label>
                <input class="form-control" v-model="config.muertes" name="muertes" type="text" placeholder="Ingresa porcentaje">
            </div>
              <div class="form-group ">
                <label class="control-label">Porcentaje de produccion de huevos minima </label>
               
                <input class="form-control" v-model="config.produccion" name="produccion" type="text" placeholder="Ingresa porcentaje">
                 
                 
            </div>
              <div class="form-group">
                <label class="control-label">Moneda </label>
                <input class="form-control" v-model="config.moneda" name="moneda" type="text" placeholder="Ingresa moneda">
            </div>
              <div class="form-group">
                <label class="control-label">Unidad de medida para alimentos </label>
                <input class="form-control" v-model="config.umalimentos" name="umalimentos" type="text" placeholder="Ingresa ">
            </div>
            <div class="form-group">
		        <label class="control-label">Logo</label>
		        <i class="fa fa-image"></i>
		        <br>
		        <input-image :src="imagen" @load="img"></input-image>
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
		name:'settings',
		data()
		{
			return {
				config:
				{
			        nombre:'',
			        imagen:null,
			        usoGalpon:0,
			        moneda:'',
			        muertes:0,
			        umalimentos:'',
			        produccion:0,
			        Submited:1
				},
				errores:{},
				imagen:axios.defaults.baseURL+'/settings/imagen'
			}
		},
		created()
		{
			this.config.nombre=this.$store.getters.settings.nombre;
			this.config.usoGalpon=this.$store.getters.settings.usoGalpon;
			this.config.muertes=this.$store.getters.settings.muertes;
			this.config.produccion=this.$store.getters.settings.produccion;
			this.config.moneda=this.$store.getters.settings.moneda;
			this.config.umalimentos=this.$store.getters.settings.umalimentos;
			
		},
		methods:
		{
			img({result,dataUrl})
			{
				this.config.imagen=result;
			},
			editar()
			{
				const data = new FormData();
				for(let key in this.config)
				{
					data.append(key,this.config[key]);
				}
				const config = 
				{
				   headers: {
				      'content-type': 'multipart/form-data'
				   }
				};
				axios.post('/settings',data,config).
				then((request)=>
				{
					if(request.data.editado)
					{
						//this.$store.store.dispatch('LoggedIn');
						swal(
                        {
                            title: "Listo!",
                            text: "Usted a actualizado su informacion ",
                            type: "success",

                        },
                        ()=>{});
                        this.$store.dispatch('fetch');
					}else
					{
						this.errores=request.data.error;
					}
				}).catch(AxiosCatch);
			}
		}
		
	}
</script>
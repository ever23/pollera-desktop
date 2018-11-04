<template>
	<main class="app-content">
	<app-title 
	 :title="[{title:'Galpones',to:'resumen-galpones'}
	,{title:type+' galpon'}]" :icon="type=='Agregar'?'plus-square':'edit'"></app-title>

		
		<div class="row">
		<div class="col-md-2 col-sm-1"></div>
			<div class="col-md-8 col-sm-10">
	          <div class="tile">
	            <h3 class="tile-title">{{ type }} galpon</h3>
	            <div class="tile-body">
	              <form @submit.prevent="Enviar">
	                 <div class="form-group">
	                  <label class="control-label">Descripcion</label>
	                  <input class="form-control" v-model="galpon.nombre" required type="text" placeholder="Descripcion"  >
	                </div>
	                <div class="form-group">
	                  <label class="control-label">Capacidad</label>
	                  <input class="form-control" v-model="galpon.capacidad" required type="text" placeholder="capacidad"  >
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
	</main>
</template>
<script>
import axios from 'axios';

	export default
	{
		name:'agregar-galpon',
		props:['id_galpon'],
		data()
		{
			return {
				galpon:
				{
					capacidad:null,
					nombre:null,
					//id_granjas:null,
					Submited:1
				},
				type:'Agregar',
				
				
			

			}
		},
		created()
		{
			
			if(this.id_galpon)
			{
				 this.$store.commit('loading',true);
				axios.get('/polleras/api/galpones/?id_galpon='+this.id_galpon).then(req=>
				{
					 this.$store.commit('loading',false);
					if(req.data.galpones.length==0)
					{
						AxiosCatch("El galpon no existe");
					}else
					{
						this.type='Editar';
						this.galpon.nombre=req.data.galpones[0].nombre;
						this.galpon.capacidad=req.data.galpones[0].capacidad;
						
					}
				}).catch(AxiosCatch);
			}
		},
		mounted()
		{
		},
		methods:
		{

			Cancelar()
			{
				
			},
			
			Enviar()
			{
				let url='',p='';
				if(this.type=='Agregar')
				{
					url='/polleras/api/galpones/insertar';
					p='agregado'

				}else
				{
					url='/polleras/api/galpones/editar?id_galpon='+this.id_galpon;
					p='editado'
				}
				 this.$store.commit('loading',true);
				axios.post(url,this.galpon)
                .then(request => 
                {
                	 this.$store.commit('loading',false);
                    if(request.data.insert)
                    {
                        //swal("Listo!", "El proyecto se ha almacenado ", "success");
                        swal(
                        {
                            title: "Listo!",
                            text: "se ha "+p+" el galpon",
                            type: "success",

                        },
                        ()=>this.$router.push({name:'resumen-galpones'}));
                             
                    }else
                    {
                        AxiosCatch(request.data.error);
                    }  
                }).catch(AxiosCatch);
			}
		}
	}

</script>
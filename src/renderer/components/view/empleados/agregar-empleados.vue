<template>
	<main class="app-content">
	<app-title 
	 :title="[{title:'Empleados',to:'resumen-empleados'}
	,{title:type+' empleados'}]" :icon="type=='Agregar'?'plus-square':'edit'"></app-title>

		
		<div class="row">
		<div class="col-md-2 col-sm-1"></div>
			<div class="col-md-8 col-sm-10">
	          <div class="tile">
	            <h3 class="tile-title">{{ type }} empleados</h3>
	            <div class="tile-body">
	              <form @submit.prevent="Enviar">
	                <div class="form-group">
	                  <label class="control-label">C.I </label>
	                  <input class="form-control" v-model="empleados.ci_empleado" required type="text" placeholder="C.I" :disabled="type=='Editar'" maxlength="8">
	                </div>
	                 <div class="form-group">
	                  <label class="control-label">Nombres </label>
	                  <input class="form-control" v-model="empleados.nombres" required type="text" placeholder="Nombres">
	                </div>
	                <div class="form-group">
	                  <label class="control-label">Apellidos</label>
	                  <input class="form-control" v-model="empleados.apellidos" required type="text" placeholder="Apellidos">
	                </div>
	                <div class="form-group">
	                  <label class="control-label">Sueldo</label>
	                  <input class="form-control" v-model="empleados.sueldo" required type="text" :placeholder="'Sueldo '+settings.moneda"> 
	                </div>
	                 <div class="form-group">
	                  <label class="control-label ">Cargo</label>
	                  <select class="form-control" v-model="empleados.cargo" required>
	                  <option value='obrero'>Obrero</option>
	                  <option value="supervisor">Supervisor</option>
	                  </select>
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
		name:'agregar-empleados',
		props:['ci_empleado'],
		data()
		{
			return {
				empleados:
				{
					ci_empleado:null,
					nombres:null,
					apellidos:null,
					sueldo:null,
					cargo:null,
					//id_granjas:null,
					Submited:1
				},
				type:'Agregar',
				
				
			

			}
		},
		created()
		{
			this.empleados.ci_empleado=this.ci_empleado;
			if(this.empleados.ci_empleado)
			{
				 this.$store.commit('loading',true);
				axios.get('/polleras/api/empleados/?ci_empleado='+this.ci_empleado).then(req=>
				{
					 this.$store.commit('loading',false);
					if(req.data.empleados.length==0)
					{
						AxiosCatch("El empleado no existe");
					}else
					{
							this.type='Editar';
						this.empleados.nombres=req.data.empleados[0].nombres;
						this.empleados.apellidos=req.data.empleados[0].apellidos;
						this.empleados.sueldo=req.data.empleados[0].sueldo;
						this.empleados.cargo=req.data.empleados[0].cargo;
						this.empleados.id_granjas=req.data.empleados[0].id_granjas;
					}
				}).catch(AxiosCatch);
			}
		},
		computed:
		{
			settings()
            {
                return this.$store.getters.settings;
            }
		},
		methods:
		{

			Cancelar()
			{
				
			},
			granjas(id_granjas)
			{
				this.empleados.id_granjas=id_granjas;
			},
			Enviar()
			{
				let url='',p='';
				if(this.type=='Agregar')
				{
					url='/polleras/api/empleados/insertar';
					p='agregado'

				}else
				{
					url='/polleras/api/empleados/editar';
					p='editado'
				}
				 this.$store.commit('loading',true);
				axios.post(url,this.empleados)
                .then(request => 
                {
                	 this.$store.commit('loading',false);
                    if(request.data.insert)
                    {
                        //swal("Listo!", "El proyecto se ha almacenado ", "success");
                        swal(
                        {
                            title: "Listo!",
                            text: "se ha "+p+" el empleado",
                            type: "success",

                        },
                        ()=>this.$router.push({name:'resumen-empleados'}));
                             
                    }else
                    {
                        AxiosCatch(request.data.error);
                    }  
                }).catch(AxiosCatch);
			}
		}
	}

</script>
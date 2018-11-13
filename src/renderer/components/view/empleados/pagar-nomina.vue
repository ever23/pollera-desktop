<template>
	<main class="app-content">
	<app-title 
	 :title="[{title:'Empleados',to:'resumen-empleados'}
	,{title:'Pago de nomina'}]" :icon="'dollar'"></app-title>
		<div class="row">
			<div class="col-md-10 offset-md-1">
	          <div class="tile">
	            <h3 class="tile-title">Registrar pago de nomina</h3>
	            <div class="tile-body">
	              <formulario :error="errores"   @submit.prevent="Enviar">
	              <table class="table  table-reponsive table-hover ">
	              	<thead>
	              		<tr>
	              			<th>CI</th>
	              			<th>Nombres</th>
	              			<th>Apellidos</th>
	              			<th>Cargo</th>
	              			<th>Pago {{ settings.moneda }}</th>
	              		</tr>
	              	</thead>
	              	<tbody>
	              		<tr v-for="empleado in empleados" v-if="empleado.pago=='no'">
	              			<td>{{ empleado.ci_empleado}}</td>
	              			<td>{{ empleado.nombres}}</td>
	              			<td>{{ empleado.apellidos}}</td>
	              			<td>{{ empleado.cargo}}</td>
	              			<td class="form-group btn-group">
	              			 
	              			<input class="form-control " v-model="nomina.empleados[empleado.ci_empleado]" required type="text" placeholder="Pago">  
	              			 <button class="btn btn-primary btn-sm" @click.prevent="" disabled>{{ settings.moneda }}</button>
	              			</td>
	              			
	              		</tr>
	              	</tbody>
	              </table>
	                
	                
	                <div class="form-group">
	              <button class="btn btn-primary" type="submit"><i class="fa fa-fw fa-lg fa-check-circle"></i>Guardar</button>&nbsp;&nbsp;&nbsp;<button class="btn btn-secondary" type="button" @click.prevent="Cancelar"><i class="fa fa-fw fa-lg fa-times-circle"></i>Cancelar</button>
	            
	                </div>
	              </formulario>
	            </div>
	            
	          </div>
        	</div>
        	
		</div>
	</main>
</template>
<script>
import axios from 'axios';

	export default
	{
		name:'pagar-nomina',
		data()
		{
			return {
				nomina:
				{
					empleados:{},
					Submited:1
				},
				empleados:[],
				errores:{}
				
			

			}
		},
		created()
		{
			 this.$store.commit('loading',true);
			axios.get('/empleados/nomina').
			then(req=>
				{
					 this.$store.commit('loading',false);
					this.empleados=req.data.empleados;
					//return;
					for(let i of req.data.empleados)
					{
						//console.log(i);
						if(i.pago=='no')
						this.nomina.empleados[i.ci_empleado.toString()]=i.sueldo;
					}
					
				}).catch(AxiosCatch);
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
			
			Enviar()
			{
				
                swal(
                {
                  title: "Registrar pago de nomina",
                  text: "Desea registrar el pago de nomina?",
                  type: "warning",
                  showCancelButton: true,
                  confirmButtonText: "si, Registrar!",
                  cancelButtonText: "No",
                  closeOnConfirm: true,
                  closeOnCancel: true
                }, isConfirm=> 
                {
                  if (isConfirm) 
                  { 
                  	 this.$store.commit('loading',true);
					axios.post('/empleados/pago_nomina',this.nomina)
	                .then(request => 
	                {
	                	 this.$store.commit('loading',false);
	                    if(request.data.insert)
	                    {
	                        //swal("Listo!", "El proyecto se ha almacenado ", "success");
	                        swal(
	                        {
	                            title: "Listo!",
	                            text: "se ha registrado el pago de nomina  ",
	                            type: "success",

	                        },
	                        ()=>this.$router.push({name:'resumen-empleados'}));
	                             
	                    }else
	                    {
	                        this.errores=request.data.error;
	                    }  
	                }).catch(AxiosCatch);
                  } 
                });
			}
		}
	}

</script>
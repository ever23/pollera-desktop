<template>
	<main class="app-content">
	<app-title :title="[{title:'Alimentos',to:'resumen-alimentos'},{title:'Agregar alimentos'}]" :icon="'cart-plus'"/>
		<div class="row">
			<div class="col-md-8 col-sm-10 offset-md-2 offset-sm-1">
	          <div class="tile">
	            <h3 class="tile-title">Compra de alimentos 
	            balanceados</h3>
	            <div class="tile-body">
	              <formulario :error="errores"   @submit.prevent="Enviar">
	                <div class="form-group">
	                  <label class="control-label">Cantidad </label>
	                  <input :class="'form-control'"   v-model="alimentos.cantidad" name="cantidad" required type="text" :placeholder="'Cantidad '+settings.umalimentos">
	                 
	                </div>
	                 <div class="form-group">
	                  <label class="control-label">Costo por unidad</label>
	                  <input class="form-control" v-model="alimentos.costo" name="costo" required type="text" :placeholder="'Costo '+settings.moneda">
	                </div>
	                <div class="form-group">
	                  <label class="control-label">Fecha</label>
	                  <input class="form-control" ref="fecha" v-model="alimentos.fecha" name="fecha" required type="date" placeholder="fecha">
	                </div>
	                <div class="form-group">
	                  <label class="control-label">Detalles</label>
	                  <textarea class="form-control" v-model="alimentos.detalles" name="detalles" required  placeholder="Detalles"/>
	                </div>
	                
	               
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
 import {fecha} from '@/assets/js/Date.js'
	export default
	{
		name:'agregar-alimentos',
		
		data()
		{
			
			return {
				alimentos:
				{
					cantidad:null,
					costo:null,
					fecha:fecha(),
					detalles:null,
					
					Submited:1
				},
				errores:{},
			

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
			valid(name)
			{
				if(typeof this.error[name]=='string')
				{
					return 'is-invalid';
				}
				return '';
			},
			Cancelar()
			{
				this.alimentos.cantidad=null;
				this.alimentos.costo=null;
				this.alimentos.fecha=null;
				this.alimentos.detalles=null;
			},
			
			
			Enviar()
			{
				 this.$store.commit('loading',true);
				axios.post('/alimentos/insertar',this.alimentos)
                .then(request => 
                {
                	 this.$store.commit('loading',false);
                    if(request.data.insert)
                    {
                        //swal("Listo!", "El proyecto se ha almacenado ", "success");
                        swal(
                        {
                            title: "Listo!",
                            text: "se ha agregrado la compra de alimentos ",
                            type: "success",

                        },
                        ()=>this.$router.push({name:'resumen-alimentos',params:{id_granjas:this.alimentos.id_granjas}}));
                             
                    }else
                    {
                    	//this.error=request.data.error;
                       this.errores=request.data.error;
                    }  
                }).catch(AxiosCatch);
			}
		}
	}

</script>

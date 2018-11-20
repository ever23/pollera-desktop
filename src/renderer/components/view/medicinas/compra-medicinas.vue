<template>
	<main class="app-content">
		<app-title :title="[{title:'Medicinas',to:'medicinas'},{title:'Compra medicina'}]" :icon="'cart-plus'"></app-title>
		<div class="row">
		
			<div class=" offset-md-2 offset-sm-1 col-md-8 col-sm-10">
	          <div class="tile">
	            <h3 class="tile-title">Registrar compra de {{ medicina.descripcion }} {{ medicina.tipo}}</h3>
	            <div class="tile-body">
	              <formulario :error="errores"  @submit.prevent="Enviar">
	                <div class="form-group">
	                  <label class="control-label">Fecha </label>
	                  <input class="form-control" v-model="compra.fecha" name="fecha" required type="date" placeholder="fecha">
	                </div>
	                 <div class="form-group">
	                  <label class="control-label">Cantidad </label>
	                  <input class="form-control" v-model="compra.cantidad" name="cantidad" required type="text" placeholder="Cantidad">
	                </div>
	                <div class="form-group">
	                  <label class="control-label">Costo por unidad</label>
	                  <input class="form-control" v-model="compra.costo" name="costo" required type="text" :placeholder="'Costo '+settings.moneda">
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
		name:'compra-medicinas',
		props:['id_medicina'],
		data()
		{
			
			return {
				medicina:{},
				
				compra:{
					id_medicina:null,
					
					fecha:fecha(),
					cantidad:null,
					costo:null,
					Submited:true
				},errores:{}
				
			}
		},
		computed:
		{
			settings()
            {
                return this.$store.getters.settings;
            }
		},
		created()
		{
			
			this.compra.id_medicina=this.id_medicina;
			 this.$store.commit('loading',true);
            axios.get('/medicinas/?id_medicina='+this.id_medicina)
            .then(request=>
            {
            	 this.$store.commit('loading',false);
                if(!request.data.error)
                {
                    this.medicina=request.data.medicina;
                }else
                {
                    AxiosCatch(request.data.error);
                }
            }).catch(AxiosCatch);


		},
		methods:
		{
			Cancelar()
			{
				this.compra.fecha=null;
				this.compra.cantidad=null;
				this.compra.costo=null;
			},
			Enviar()
			{
				 this.$store.commit('loading',true);
				axios.post('/medicinas/compra',this.compra)
                .then(request => 
                {
                	 this.$store.commit('loading',false);
                    if(request.data.insert)
                    {
                        //swal("Listo!", "El proyecto se ha almacenado ", "success");
                        swal(
                        {
                            title: "Listo!",
                            text: "El medicamento se ha almacenado",
                            type: "success",

                        },
                        ()=>this.$router.push({name:'resumen-medicinas'}));
                             
                    }else
                    {
                       this.errores=request.data.error;
                    }  
                }).catch(AxiosCatch);
			}
		}
	}

</script>
<template>
	<main class="app-content">
	<app-title 
	 :title="[{title:'Huevos',to:'resumen-huevos'}
	,{title:'Venta de huevos'}]" :icon="'dollar'"></app-title>
		<div class="row">
    <div class="col-md-6">
          <div class="widget-small primary coloured-icon"><i class="icon fa fa-stack-overflow fa-3x"></i>
            <div class="info">
              <h4>Huevos Grandes</h4>
              <p><b>{{ huevos_grandes }}</b></p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="widget-small primary coloured-icon"><i class="icon fa fa-stack-overflow fa-3x"></i>
            <div class="info">
              <h4>Huevos Pequeños</h4>
              <p><b>{{ huevos_pequenos }}</b></p>
            </div>
          </div>
        </div>

  </div>
		<div class="row">
		<div class="col-md-2 col-sm-1"></div>
			<div class="col-md-8 col-sm-10">
	          <div class="tile">
	            <h3 class="tile-title">Venta de Huevos</h3>
	            <div class="tile-body">
	              <form @submit.prevent="Enviar">
	              <div class="form-group" >
	                  <label class="control-label">Detalles</label>
	                  <textarea class="form-control" v-model="huevos.detalles" required placeholder="Detalles"></textarea>
	                  
	                </div>
	              <div class="form-group">
	                  <label class="control-label">Tipo </label>
	                 <select v-model="huevos.tipo" class="form-control">
	                 	<option value="grande">Grande</option>
	                 	<option value="pequeño">Pequeño</option>
	                 </select>
	                </div>
	                <div class="form-group">
	                  <label class="control-label">Cantidad </label>
	                  <input class="form-control" v-model="huevos.cantidad" required type="text" placeholder="Cantidad">
	                </div>
	                 <div class="form-group">
	                  <label class="control-label">Precio Unitario</label>
	                  <input class="form-control" v-model="huevos.costo" required type="text" :placeholder="'Precio '+settings.moneda">
	                </div>
	                <div class="form-group">
	                  <label class="control-label">fecha</label>
	                  <input class="form-control" v-model="huevos.fecha" required type="date" placeholder="fecha">
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
import {fecha} from '../../../assets/js/Date.js'
	export default
	{
		name:'venta-huevos',
		//props:['id_granjas'],
		data()
		{
			
			
			return {
				huevos:
				{
					tipo:null,
					cantidad:null,
					costo:null,
					fecha:fecha(),
					//id_granjas:null,
					detalles:null,
					Submited:1
				},
				huevos_grandes:null,
				huevos_pequenos:null
			
			

			}
		},
		created()
		{
			 this.$store.commit('loading',true);
            axios.get('/polleras/api/huevos/index')
            .then(request=>
            {
               this.$store.commit('loading',false);
                if(!request.data.error)
                {
                    this.huevos_grandes=request.data.huevos_grandes;
                    this.huevos_pequenos=request.data.huevos_pequenos;
                  
                }else
                {
                    AxiosCatch(request.data.error);
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
				this.huevos.detalles=null;
				this.huevos.tipo=null;
				this.huevos.cantidad=null;
				this.huevos.costo=null;
				this.huevos.fecha=null;
			},
			
			Enviar()
			{
				 this.$store.commit('loading',true);
				axios.post('/polleras/api/huevos/venta',this.huevos)
                .then(request => 
                {
                	 this.$store.commit('loading',false);
                    if(request.data.insert)
                    {
                        //swal("Listo!", "El proyecto se ha almacenado ", "success");
                        swal(
                        {
                            title: "Listo!",
                            text: "se ha agregrado la venta de huevos ",
                            type: "success",

                        },
                        ()=>this.$router.push({name:'resumen-huevos',params:{id_granjas:this.huevos.id_granjas}}));
                             
                    }else
                    {
                        AxiosCatch(request.data.error);
                    }  
                }).catch(AxiosCatch);
			}
		}
	}

</script>
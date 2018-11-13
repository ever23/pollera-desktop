<template>
	<main class="app-content">
	<app-title 
	 :title="[{title:'Huevos',to:'resumen-huevos'}
	,{title:'Produccion de huevos'}]" :icon="'building'"></app-title>
		
		<div class="row">
		<div class="col-md-2 col-sm-1"></div>
			<div class="col-md-8 col-sm-10">
	          <div class="tile">
	            <h3 class="tile-title">Produccion de huevos</h3>
	            <div class="tile-body">
	              <formulario :error="errores"   @submit.prevent="Enviar">
	               <div class="form-group">
	                  <label class="control-label">Detalles </label>
	                  <textarea class="form-control" v-model="huevos.detalles" name="detalles" required  placeholder="Detalles"></textarea>
	                  
	                </div>
	                <div class="form-group">
	               	<select-galpon @change="galpon" :id_galpon="idgalpon" :filter="g=>g.aves>0"/>
	               </div>
	                <div class="form-group">
	                  <label class="control-label">Tipo </label>
	                 <select v-model="huevos.tipo" name="tipo" class="form-control">
	                 	<option value="grande">Grande</option>
	                 	<option value="pequeño">Pequeño</option>
	                 </select>
	                </div>
	                <div class="form-group">
	                  <label class="control-label">Cantidad </label>
	                  <input class="form-control" v-model="huevos.cantidad" name="cantidad" required type="text" placeholder="Cantidad">
	                </div>

	                <div class="form-group">
	                  <label class="control-label">fecha</label>
	                  <input class="form-control" v-model="huevos.fecha" name="fecha" required type="date" placeholder="fecha">
	                </div>
	               
	                 
	               
	                <div class="form-group">
	              <button class="btn btn-primary" type="submit"><i class="fa fa-fw fa-lg fa-check-circle"></i>Guardar</button>&nbsp;&nbsp;&nbsp;<button class="btn btn-secondary" type="button" @click.prevent="Cancelar"><i class="fa fa-fw fa-lg fa-times-circle"></i>Cancelar</button>
	            
	                </div>
	              </formulario>
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
import select_galpon from '../galpones/select-galpon.vue'
	export default
	{
		name:'agregar-huevos',
		components:{
          'select-galpon':select_galpon,
          
        },
        props:['idgalpon'],
		data()
		{
			
			return {
				huevos:
				{
					id_galpon:null,
					cantidad:null,
					tipo:null,
					detalles:null,
					fecha:fecha(),
					//id_granjas:null,
					Submited:1
				},errores:{}
				
			

			}
		},
		created()
		{
			this.huevos.id_galpon=this.idgalpon;
		},
		
		methods:
		{
			galpon(id_galpon)
			{
				this.huevos.id_galpon=id_galpon;
			},
			Cancelar()
			{
				this.huevos.id_galpon=null;
				this.huevos.cantidad=null;
				this.huevos.tipo=null;
				this.huevos.detalles=null;
				this.huevos.fecha=null;
			},
			Enviar()
			{
				 this.$store.commit('loading',true);
				axios.post('/huevos/insertar',this.huevos)
                .then(request => 
                {
                	 this.$store.commit('loading',false);
                    if(request.data.insert)
                    {
                        //swal("Listo!", "El proyecto se ha almacenado ", "success");
                        swal(
                        {
                            title: "Listo!",
                            text: "se ha agregrado la Produccion de huevos ",
                            type: "success",

                        },
                        ()=>this.$router.push({name:'resumen-huevos',params:{id_granjas:this.huevos.id_granjas}}));
                             
                    }else
                    {
                        this.errores=request.data.error;
                    }  
                }).catch(AxiosCatch);
			}
		}
	}

</script>
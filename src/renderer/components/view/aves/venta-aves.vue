<template> 
	<main class="app-content">
		<app-title :title="[{title:'Aves',to:'resumen-aves'},{title:'Venta de aves'}]" :icon="'dollar'"></app-title>
		<div class="row">
		<div class="col-md-2 col-sm-1"></div>
			<div class="col-md-8 col-sm-10">
	          <div class="tile">
	            <h3 class="tile-title">Venta de aves</h3>
	            <div class="tile-body">
	              <formulario :error="errores"   @submit.prevent="Enviar">
	                <div class="form-group">
	               	<select-galpon @change="galpon" :id_galpon="idgalpon" :filter="g=>g.aves>0"/>
	               </div>
	                <div class="form-group">
	                  <label class="control-label">Cantidad </label>
	                  <input class="form-control" v-model="aves.cantidad" name="cantidad" required type="text" placeholder="Cantidad">
	                </div>
	                 <div class="form-group">
	                  <label class="control-label">Precio por unidad</label>
	                  <input class="form-control" v-model="aves.costo" name="costo" required type="text" :placeholder="'Precio '+settings.moneda">
	                </div>
	                <div class="form-group">
	                  <label class="control-label">fecha</label>
	                  <input class="form-control" v-model="aves.fecha" name="fecha" required type="date" placeholder="fecha">
	                </div>
	               
	                <div class="form-group" >
	                  <label class="control-label">Detalles</label>
	                  <textarea class="form-control" v-model="aves.detalles" name="detalles" required placeholder="Detalles"></textarea>
	                  
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
import {fecha} from '@/assets/js/Date.js'
import select_galpon from '../galpones/select-galpon.vue'
	export default
	{
		name:'venta-aves',
		components:{
          'select-galpon':select_galpon,
          
        },
        props:['idgalpon'],
		data()
		{
			
			return {
				aves:
				{
					id_galpon:null,
					cantidad:null,
					costo:null,
					fecha:fecha(),
					//id_granjas:null,
					detalles:null,
					Submited:1
				},
				errores:{}
			
			

			}
		},
		created()
		{
			this.aves.id_galpon=this.idgalpon;
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
			galpon(id_galpon)
			{
				this.aves.id_galpon=id_galpon;
			},
			Cancelar()
			{
				
			},
			
			Enviar()
			{
				 this.$store.commit('loading',true);
				axios.post('/aves/venta',this.aves)
                .then(request => 
                {
                	 this.$store.commit('loading',false);
                    if(request.data.insert)
                    {
                        //swal("Listo!", "El proyecto se ha almacenado ", "success");
                        swal(
                        {
                            title: "Listo!",
                            text: "se ha agregrado la venta de aves ",
                            type: "success",

                        },
                        ()=>this.$router.push({name:'resumen-aves',params:{id_granjas:this.aves.id_granjas}}));
                             
                    }else
                    {
                        this.errores=request.data.error;
                    }  
                }).catch(AxiosCatch);
			}
		}
	}

</script>
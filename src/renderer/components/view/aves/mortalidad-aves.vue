<template>
	<main class="app-content">
		<app-title :title="[{title:'Aves',to:'resumen-aves'},{title:'Muerte de aves'}]" :icon="'remove'"></app-title>
		<div class="row">
		<div class="col-md-2 col-sm-1"></div>
			<div class="col-md-8 col-sm-10">
	          <div class="tile">
	            <h3 class="tile-title">Registrar muerte de aves</h3>
	            <div class="tile-body">
	              <form @submit.prevent="Enviar">
	              <div class="form-group">
	               	<select-galpon @change="galpon" :id_galpon="idgalpon"></select-galpon>
	               </div>
	                <div class="form-group">
	                  <label class="control-label">Cantidad </label>
	                  <input class="form-control" v-model="aves.cantidad" required type="text" placeholder="Cantidad">
	                </div>
	                
	                <div class="form-group">
	                  <label class="control-label">fecha</label>
	                  <input class="form-control" v-model="aves.fecha" required type="date" placeholder="fecha">
	                </div>
	                
	                <div class="form-group" >
	                  <label class="control-label">Detalles</label>
	                  <textarea class="form-control" v-model="aves.rason" required placeholder="Detalles"></textarea>
	                  
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
import select_galpon from '../galpones/select-galpon.vue'
	export default
	{
		name:'mortalidad-aves',
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
					rason:null,
					fecha:fecha(),
					//id_granjas:null,
					Submited:1
				},
			
			

			}
		},
		created()
		{
			this.aves.id_galpon=this.idgalpon;
		},
		mounted()
		{
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
				axios.post('/polleras/api/aves/mortalidad',this.aves)
                .then(request => 
                {
                	 this.$store.commit('loading',false);
                    if(request.data.insert)
                    {
                        //swal("Listo!", "El proyecto se ha almacenado ", "success");
                        swal(
                        {
                            title: "Listo!",
                            text: "se ha agregrado la muerte de aves ",
                            type: "success",

                        },
                        ()=>this.$router.push({name:'resumen-aves'}));
                             
                    }else
                    {
                        AxiosCatch(request.data.error);
                    }  
                }).catch(AxiosCatch);
			}
		}
	}

</script>
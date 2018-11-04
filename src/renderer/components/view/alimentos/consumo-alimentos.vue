<template>
	<main class="app-content">
		<app-title :title="[{title:'Alimentos',to:'resumen-alimentos'},{title:'Consumo de alimentos'}]" :icon="'shopping-basket'"/>
		<div class="row">
			<div class="col-md-8 col-sm-10 offset-md-2 offset-sm-1">
	          <div class="tile">
	            <h3 class="tile-title">Consumo de alimentos 
	            balanceados</h3>
	            <div class="tile-body">
	              <form @submit.prevent="Enviar">
	               <div class="form-group">
	               <select-galpon @change="galpon" :id_galpon="idgalpon"></select-galpon>
	               </div>
	                <div class="form-group">
	                  <label class="control-label">Cantidad </label>
	                  <input class="form-control" v-model="alimentos.cantidad" required type="text" placeholder="Cantidad">
	                </div>
	                 
	                <div class="form-group">
	                  <label class="control-label">fecha</label>
	                  <input class="form-control" v-model="alimentos.fecha" required type="date" placeholder="fecha">
	                </div>
	                <div class="form-group">
	              <button class="btn btn-primary" type="submit"><i class="fa fa-fw fa-lg fa-check-circle"></i>Guardar</button>&nbsp;&nbsp;&nbsp;<button class="btn btn-secondary" type="button" @click.prevent="Cancelar"><i class="fa fa-fw fa-lg fa-times-circle"></i>Cancelar</button>
	                </div>
	              </form>
	            </div> 
	          </div>
        	</div>
		</div>
	</main>
</template>
<script>
import axios from 'axios';
import select_galpon from '../galpones/select-galpon.vue'
import {fecha} from '../../../assets/js/Date.js'
	export default
	{
		name:'consumo-alimentos',
		components:{
          'select-galpon':select_galpon,
          
        },
        props:['idgalpon'],
		data()
		{
			
			return {
				alimentos:
				{
					id_galpon:null,
					cantidad:null,
					fecha:fecha(),
					
					Submited:1
				},
				
			

			}
		},
		created()
		{
			this.alimentos.id_galpon=this.idgalpon;
		},
		mounted()
		{
		},
		methods:
		{
			galpon(id_galpon)
			{
				this.alimentos.id_galpon=id_galpon;
			},
			Cancelar()
			{
				this.alimentos.fecha=null;
				this.alimentos.cantidad=null;
			},
			
			Enviar()
			{
				 this.$store.commit('loading',true);
				axios.post('/polleras/api/alimentos/consumo',this.alimentos)
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
                        ()=>this.$router.push({name:'resumen-alimentos'}));
                             
                    }else
                    {
                        AxiosCatch(request.data.error);
                    }  
                }).catch(AxiosCatch);
			}
		}
	}

</script>
<template>
	<main class="app-content">
		<app-title :title="[{title:'Medicinas',to:'medicinas'},{title:'Consumo medicina'}]" :icon="'shopping-basket'"></app-title>
		<div class="row">
		
			<div class=" offset-md-2 offset-sm-1 col-md-8 col-sm-10">
	          <div class="tile">
	            <h3 class="tile-title">Registrar consumo de {{ medicina.descripcion }} {{ medicina.tipo}}</h3>
	            <div class="tile-body">
	              <form @submit.prevent="Enviar">
	               <div class="form-group">
	               	<select-galpon @change="galpon"></select-galpon>
	               </div>
	                <div class="form-group">
	                  <label class="control-label">Fecha </label>
	                  <input class="form-control" v-model="compra.fecha" required type="date" placeholder="fecha">
	                </div>
	                 <div class="form-group">
	                  <label class="control-label">Cantidad </label>
	                  <input class="form-control" v-model="compra.cantidad" required type="text" placeholder="cantidad">
	                </div>
	             
	                <div class="form-group">
	                	<label class="control-label">Detalles </label>
	                	<textarea placeholder="Detalles" class="form-control" v-model="compra.detalles" required></textarea>
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
import {fecha} from '../../../assets/js/Date.js'
import select_galpon from '../galpones/select-galpon.vue'
	export default
	{
		name:'consumo-medicinas',
		components:{
          'select-galpon':select_galpon,
          
        },
		props:{
			id_medicina:{ required:true}
		},
		data()
		{
			
			return {
				medicina:{},
				
				compra:{
					id_galpon:null,
					id_medicina:null,
					//id_granjas:null,
					fecha:fecha(),
					cantidad:null,
					detalles:null,
					
					Submited:true
				}
				
			}
		},
		created()
		{
			
			this.compra.id_medicina=this.id_medicina;
			 this.$store.commit('loading',true);
            axios.get('/polleras/api/medicinas/?id_medicina='+this.id_medicina)
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
			galpon(id_galpon)
			{
				this.compra.id_galpon=id_galpon;
			},
			Cancelar()
			{
				this.compra.fecha=null;
				this.compra.cantidad=null;
				this.compra.detalles=null;
			},
			Enviar()
			{
				
				axios.post('/polleras/api/medicinas/consumo',this.compra)
                .then(request => 
                {
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
                       AxiosCatch(request.data.error);
                    }  
                }).catch(AxiosCatch);
			}
		}
	}

</script>
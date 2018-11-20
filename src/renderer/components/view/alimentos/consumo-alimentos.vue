<template>
	<main class="app-content">
		<app-title :title="[{title:'Alimentos',to:'resumen-alimentos'},{title:'Consumo de alimentos'}]" :icon="'shopping-basket'"/>
		<div class="row">
			<div class="col-md-8 col-sm-10 offset-md-2 offset-sm-1">
	          <div class="tile">
	            <h3 class="tile-title">Consumo de alimentos 
	            balanceados</h3>
	            <div class="tile-body">
	              <formulario :error="errores"   @submit.prevent="Enviar">
	               <div class="form-group">
	               <select-galpon @change="galpon" :id_galpon="idgalpon" :filter="g=>g.aves>0"/>
	               </div>
	                <div class="form-group">
	                  <label class="control-label">Cantidad </label>
	                  <div class="btn-group form-control form-group cantidad-max">
	                  <input class="form-control" v-model="alimentos.cantidad" name="cantidad" required type="text" placeholder="Cantidad">
	                   <button class="btn btn-primary btn-sm" @click.prevent="alimentos.cantidad=alimentos.max_cantidad">Max</button>
	                   </div>
	                </div>
	                 
	                <div class="form-group">
	                  <label class="control-label">fecha</label>
	                  <input class="form-control" v-model="alimentos.fecha" name="fecha" required type="datetime-local" placeholder="fecha" @change="fecha">
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
import select_galpon from '../galpones/select-galpon.vue'
import {fecha,hora} from '@/assets/js/Date.js'
 import filter from '@/assets/js/UserVueFilter.js'

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
					fecha:fecha()+'T'+hora(),
					max_cantidad:null,
					Submited:1
				},
				errores:{}
			

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
			
			fecha(fecha)
			{
				this.fetch(this.alimentos.id_galpon,this.alimentos.fecha.replace('T',' ')+':00');
			},
			galpon(id_galpon)
			{
				this.alimentos.id_galpon=id_galpon;
				this.fetch(id_galpon);
			},
			fetch(id_galpon,fecha)
			{
				this.$store.commit('loading',true);
				axios.get('/galpones/?id_galpon='+id_galpon+(fecha?'&fecha='+fecha:'')).then(req=>
				{
					 this.$store.commit('loading',false);
					if(req.data.galpones.length!=1)
					{
						AxiosCatch("El galpon no existe");
					}else
					{
						
						let max_consumo=Number(req.data.galpones[0].consumo)*Number(req.data.galpones[0].aves);
						this.alimentos.max_cantidad=filter.NumberFormat(max_consumo-req.data.galpones[0].consumo_dia);
						if(req.data.galpones[0].consumo_dia==0)
						{
							max_consumo=max_consumo/2;
						}
						this.alimentos.cantidad=filter.NumberFormat(max_consumo-req.data.galpones[0].consumo_dia)
						//this.alimentos.max_cantidad
						
						
					}
				}).catch(AxiosCatch);
			},
			Cancelar()
			{
				this.alimentos.fecha=null;
				this.alimentos.cantidad=null;
			},
			
			Enviar()
			{
				 this.$store.commit('loading',true);
				 let fecha=this.alimentos.fecha;
				 this.alimentos.fecha=this.alimentos.fecha.replace('T',' ')+':00'
				axios.post('/alimentos/consumo',this.alimentos)
                .then(request => 
                {
                	 this.$store.commit('loading',false);
                	 this.alimentos.fecha=fecha;
                    if(request.data.insert)
                    {
                        //swal("Listo!", "El proyecto se ha almacenado ", "success");
                        swal(
                        {
                            title: "Listo!",
                            text: "se ha agregrado la compra de alimentos ",
                            type: "success",

                        },
                        ()=>this.$router.push({name:'resumen-alimentos-galpon',params:{id_galpon:this.alimentos.id_galpon}}));
                             
                    }else
                    {
                        this.errores=request.data.error;
                    }  
                }).catch(AxiosCatch);
			}
		}
	}

</script>
<style scope>
	.cantidad-max
	{
		padding: 0px!important;
    	border: none!important;
	}
</style>
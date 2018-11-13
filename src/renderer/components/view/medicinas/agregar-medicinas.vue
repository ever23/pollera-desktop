<template>
	<main class="app-content">
		<app-title :title="[{title:'Medicinas',to:'resumen-medicinas'},{title:type+' medicina'}]" :icon="type=='Insertar'?'plus':'edit'"></app-title>
		<div class="row">
		
			<div class=" offset-md-2 offset-sm-1 col-md-8 col-sm-10">
	          <div class="tile">
	            <h3 class="tile-title">{{ type }} medicina</h3>
	            <div class="tile-body">
	              <formulario :error="errores"   @submit.prevent="Enviar">
	                <div class="form-group">
	                  <label class="control-label">Descripcion </label>
	                  <input class="form-control" v-model="medicina.descripcion" name="descripcion" required type="text" placeholder="Descripcion">
	                </div>
	                 <div class="form-group">
	                  <label class="control-label">Tipo </label>
	                  <input class="form-control" v-model="medicina.tipo" name="tipo" required type="text" placeholder="Tipo">
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
	export default
	{
		name:'agregar-medicinas',
		props:['item'],
		data()
		{
			
			return {
				medicina:
				{
					descripcion:null,
					tipo:null,
					Submited:true
				},
				type:'Insertar',
				errores:{}
				
			}
		},
		created()
		{
			if(this.item!=null ||this.item!=undefined)
			{
				this.medicina.descripcion=this.item.descripcion;
				this.medicina.tipo=this.item.tipo;
				this.medicina.id_medicina=this.item.id_medicina;
				this.type="Editar";
			}
		},
		methods:
		{
			Cancelar()
			{
				if(this.item!=null ||this.item!=undefined)
				{
					this.medicina.descripcion=this.item.descripcion;
					this.medicina.tipo=this.item.tipo;
					this.medicina.id_medicina=this.item.id_medicina;
					
				}else
				{
					this.medicina.descripcion=null;
					this.medicina.tipo=null;
					//this.medicina.id_medicina=null;
					
				}
			},
			Enviar()
			{
				 this.$store.commit('loading',true);
				axios.post('/medicinas/'+this.type.toLowerCase(),this.medicina)
                .then(request => 
                {
                	 this.$store.commit('loading',false);
                    if(request.data.insert)
                    {
                    	let text='';
                    	if(this.type=='Editar')
                    	{
                			 text="se ha editado el medicamento "
                		}else
                		{
                			 text="se ha insertado el medicamento "
                		}
                        //swal("Listo!", "El proyecto se ha almacenado ", "success");
                        swal(
                        {
                            title: "Listo!",
                            text: text,
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
<template>
     <div class="form-group">
        <label class="control-label">{{ label }}</label>
        <i class="fa fa-image"></i>

      <!--  <input class="form-control " @change="Imagen" type="file" v-if="required" required/>-->
        <input class="form-control " @change="Imagen" type="file"  />
        <img class="img-fluid" v-if="data_url_icon!==null" :src="data_url_icon">
    </div>
</template>

<script>
    export default {
        name :'input-image',
        data()
        {
            return {
                data_url_icon:this.src
            }
        },
        props:{
            label:{type:String,required:true},
            src:{},
            required:{value:true}
            
        },
        mounted()
        {
           
        },
        
        methods: {
            Imagen(event)
            {
              //console.log(axios.get('a'));
              this.$emit('change',event);
              var lector = new FileReader();
                    lector.onload=e=> 
                    {
                      
                      this.data_url_icon=e.target.result;
                      this.$emit('load',{result:event.target.files[0],dataUrl:this.data_url_icon});
                      
                    };
                    lector.readAsDataURL(event.target.files[0]);
            }
        },

        
    }
</script>

<style>
    
</style>
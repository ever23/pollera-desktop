<template>
        <img class="img-thumbnail img img-fluid " width="250" hetgth="250"  :src="data_url_icon" @click="select_image">
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
            
            src:{},
            required:{value:true}
            
        },
        watch:
        {
            src()
            {
                this.data_url_icon=this.src;
            }
        },
        methods: {
            select_image()
            {
                let input= document.createElement('input');
                input.type='file';
                input.onchange=(e)=>this.Imagen(e)
                input.click();
            },
            Imagen(event)
            {
              //console.log(axios.get('a'));
              this.$emit('change',event);
              var lector = new FileReader();
                lector.onload=e=> 
                {
                      
                    this.data_url_icon=e.target.result;
                    this.$emit('load',{result:event.path[0].files[0],dataUrl:this.data_url_icon});  
                };
                lector.readAsDataURL(event.target.files[0]);
            }
        },

        
    }
</script>

<style scoped>
img
{
    cursor: pointer;
}
    
</style>
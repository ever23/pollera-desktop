<template>
     <div id="loader-wrapper" v-if="active">
       <div id="loaderCenter">
         <div id="loader"></div>
       </div>
      </div>  
</template>

<script>
    export default {
        name :'loader',
        
        props:{
            active:{type:Boolean,required:true}
        },
       data () {
            return {
              
            }
        },
        mounted()
        {
        },
        
        computed: {
            
        },
    }
</script>

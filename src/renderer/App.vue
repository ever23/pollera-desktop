<template>
<div>
     <router-view @mounted="mounted"></router-view>
     <loader :active="loader"></loader> 
</div>
</template>

<script>
    export default 
    {
        name: 'App',
       
        data()
        {
            return {
             transitionName:''
            }
        },
        watch: {
          '$route' (to, from) 
          {
//this.$store.commit('loaing',true);
          }
        }, computed:
        {
          loader()
          {
            return this.$store.state.loader;
          }
        },
        methods:{
            mounted()
            {

            }
        }

    }
</script>
<style src="./assets/css/main.css"></style>
<style src="./assets/font-awesome/css/font-awesome.min.css"></style>





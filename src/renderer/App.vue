<template>
<div>
<section class="material-half-bg">
                <div class="cover"></div>
            </section>
     <router-view @mounted="mounted">
          
     </router-view>
     <loader :active="loader"></loader> 
</div>
</template>

<script>
//import {remote,ipcRenderer} from 'electron'
    export default 
    {
        name: 'App',
       
        data()
        {
            return {
             transitionName:''
            }
        },
        mounted()
        {
            //remote.getCurrentWindow().show();
        },
        created()
        {
            try
            {

                this.$store.dispatch('fetch').then(()=>{}).catch(AxiosCatch);
            }catch(e)
            {
                //console.log(e)
                AxiosCatch(e)
            }
        

         // console.log('a')
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





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
    export default 
    {
        name: 'App',
       
        data()
        {
            return {
             transitionName:''
            }
        },
        created()
        {
          this.$store.dispatch('fetch').then(()=>{}).catch(AxiosCatch);
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

<style scope>
            #loader-wrapper {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9999;
            }

            #loaderCenter{
                display: block;
                position: absolute;
                left: 45%;
                right:50%;
                top: 50%;
                margin:0 auto;

            }

            #loader {
                display: block;
                position: absolute;
                left: 46%;
                right:50%;
                top: 45%;
                width: 100px;
                height: 100px;
                margin:0 auto;
                border-radius: 50%;
                border: 3px solid transparent;
                border-top-color: #00B31D;
                -webkit-animation: spin 1,5s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
                animation: spin 1.5s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */
            }



            #loader:before {
                content: "";
                position: absolute;
                top: 5px;
                left: 5px;
                right: 5px;
                bottom: 5px;
                border-radius: 50%;
                border: 3px solid transparent;
                border-top-color: #32875C;
                -webkit-animation: spin 2s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
                animation: spin 2s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */
            }

            #loader:after {
                content: "";
                position: absolute;
                top: 15px;
                left: 15px;
                right: 15px;
                bottom: 15px;
                border-radius: 50%;
                border: 3px solid transparent;
                border-top-color: #f9c922;
                -webkit-animation: spin 1.5s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
                animation: spin 1s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */
            }

            @-webkit-keyframes spin {
                0%   { 
                    -webkit-transform: rotate(0deg);  /* Chrome, Opera 15+, Safari 3.1+ */
                    -ms-transform: rotate(0deg);  /* IE 9 */
                    transform: rotate(0deg);  /* Firefox 16+, IE 10+, Opera */
                }
                100% {
                    -webkit-transform: rotate(360deg);  /* Chrome, Opera 15+, Safari 3.1+ */
                    -ms-transform: rotate(360deg);  /* IE 9 */
                    transform: rotate(360deg);  /* Firefox 16+, IE 10+, Opera */
                }
            }
            @keyframes spin {
                0%   { 
                    -webkit-transform: rotate(0deg);  /* Chrome, Opera 15+, Safari 3.1+ */
                    -ms-transform: rotate(0deg);  /* IE 9 */
                    transform: rotate(0deg);  /* Firefox 16+, IE 10+, Opera */
                }
                100% {
                    -webkit-transform: rotate(360deg);  /* Chrome, Opera 15+, Safari 3.1+ */
                    -ms-transform: rotate(360deg);  /* IE 9 */
                    transform: rotate(360deg);  /* Firefox 16+, IE 10+, Opera */
                }
            }

            @media handheld, only screen  and (max-width:1280px) and (max-height:600px) {
                #loaderCenter{
                    left: 43.2%;
                    top:52%;

                }
                #loader {
                    left: 44%;
                }

                #loaderCenter .logo-panel{
                    width:70px;
                }
            }




            @media handheld, only screen  and (max-width:1024px) {

                #loader {
                    left: 45%;
                    top: 41.5%;
                }

                #loaderCenter{
                    left:45%;top:42%
                }

                #loaderCenter .logo-panel{
                    width:70px;
                }


            }

            @media handheld, only screen  and (max-width:880px) {

                #loader {
                    left:45%;top:35%;
                }

                #loaderCenter{
                    left:45%;top:42%
                }

                #loaderCenter .logo-panel{
                    width:70px;
                }


            }



            @media handheld, only screen  and (max-width:480px) {

                #loader {
                    left:30%;top:35%;
                }

                #loaderCenter{
                    left:28%;top:42%
                }

                #loaderCenter .logo-panel{
                    width:70px;
                }


            }
</style>
<style src="./assets/css/main.css"></style>
<style src="./assets/font-awesome/css/font-awesome.min.css"></style>





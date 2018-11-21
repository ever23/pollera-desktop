<template>
 <div class="login-box flipped">
    <formulario :error="errores"   class="forget-form" @submit.prevent="recuperar">
          <h3 class="login-head"><i class="fa fa-lg fa-fw fa-database"></i>Editar url del Api</h3>
          <div class="form-group">
           
            <input v-model="basePath" name="basePath" class="form-control" type="url" placeholder="http://un-sitio">
          </div>
          <div class="form-group btn-container">
            <button class="btn btn-primary btn-block" ><i class="fa fa-unlock fa-lg fa-fw"></i>Guardar</button>
          </div>
          <div class="form-group mt-3">
            <p class="semibold-text mb-0">
                <router-link :to="{name:'login'}"> <i class="fa fa-angle-left fa-fw"></i>Regresar</router-link>
            </p>
          </div>
        </formulario>
    </div>
</template>

<script>
    export default {
        name:'recupera-pass',
        data () {
            return {
                basePath:null,
                errores:{}
            }
        },
        created()
        {
            this.basePath=this.$store.getters.localSettings.basePath;
        },
        components: {
        },
        methods:
        {
            recuperar()
            {
                this.$store.commit('set',{basePath:this.basePath})
                this.$store.commit('loading',true);
                this.$store.dispatch('fetch').then(()=>
                {
                     this.$store.commit('loading',false);
                    swal(
                    {
                        title: "Listo!",
                        text: "Se ha detectado el API en esta url correctamente",
                        type: "success",

                    },
                    ()=> this.$router.push({name:'login'}));
                }).catch(e=>
                {
                     this.$store.commit('loading',false);
                    swal(
                    {
                        title: "Error!",
                        text: "Es posible que la url proporcionada no sea correcta verifique e intente de nuevo",
                        type: "warning",

                    },()=>AxiosCatch(e));         
                });
               
               

            }
        }
    }
    
</script>

<style scoped>
    .login-content .login-box.flipped .forget-form {
    opacity: 1;
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
}
</style>
<template>
 <div class="login-box flipped">
    <form class="forget-form" @submit.prevent="recuperar">
          <h3 class="login-head"><i class="fa fa-lg fa-fw fa-lock"></i>Forgot Password ?</h3>
          <div class="form-group">
            <label class="control-label">EMAIL</label>
            <input v-model="email" class="form-control" type="text" placeholder="Email">
          </div>
          <div class="form-group btn-container">
            <button class="btn btn-primary btn-block" ><i class="fa fa-unlock fa-lg fa-fw"></i>RESET</button>
          </div>
          <div class="form-group mt-3">
            <p class="semibold-text mb-0">
                <router-link :to="{name:'login'}"> <i class="fa fa-angle-left fa-fw"></i>Regresar</router-link>
            </p>
          </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        name:'recupera-pass',
        data () {
            return {
                email:null
            }
        },
        components: {
        },
        methods:
        {
            recuperar()
            {
                return axios.put('/api/ResetPass',{email:this.email})
                .then(request => 
                {
                    if(request.data.reset)
                    {
                        //swal("Listo!", "Su nueva contraseña se ha enviado a "+this.email, "success");
                        swal(
                        {
                            title: "Listo!",
                            text: "Su nueva contraseña se ha enviado a "+this.email ,
                            type: "success",

                        },
                        ()=>this.$router.push({name:'login'}));
                             
                    }else
                    {
                        AxiosCatch(data.error);
                       
                    }  
                }).catch(AxiosCatch);
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
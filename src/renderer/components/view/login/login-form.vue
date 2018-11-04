<template>  
<div class="login-box ">
    <form class="login-form" @submit.prevent="login">
          <h3 class="login-head"><i class="fa fa-lg fa-fw fa-user"></i>INICIAR SESION</h3>
          <div class="form-group">
            <label class="control-label">USUARIO</label>
            <input v-model="user" class="form-control" type="text" placeholder="Nombre de usuario" autofocus>
          </div>
          <div class="form-group">
            <label class="control-label">CLAVE</label>
            <input v-model="pass" class="form-control" type="password" placeholder="Clave">
          </div>
         
          <div class="form-group btn-container">
            <button class="btn btn-primary btn-block"><i class="fa fa-sign-in fa-lg fa-fw"></i>INGRESAR</button>
          </div>
    </form>
</div>
</template>

<script>

    import axios from 'axios'
    export default {
        name:'login-form',
        props:['redirect'],
        data () {
            return {
                user:null,
                pass:null,
                recordar:false,
                
            }
        },
        components: {
        },
        created()
        {
          
        },
        methods:
        {
            login()
            {
              let redirect=this.redirect!==undefined?this.redirect:{name:'admin'}
              this.$store.commit('loading',true);
               this.$store.dispatch('LogIn',{user:this.user,pass:this.pass,recordar:this.recordar,Submited:1})
               .then(data=>
                {

                  this.$store.commit('loading',false);
                  if(data.login)
                  {
//console.log('inicio');
                    this.$router.push(!this.redirect?{name:'inicio'}:this.redirect)
                  }else
                  {
                    AxiosCatch(data.error);
                    
                  }

                  
                })
               .catch(d=>{AxiosCatch(d);this.$store.commit('loading',false);});
            }
        }
    }
</script>

<style>
    
</style>
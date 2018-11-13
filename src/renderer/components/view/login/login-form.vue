<template>  
<div class="login-box ">
    <formulario :error="errores"   class="login-form" @submit.prevent="login">
          <h3 class="login-head"><i class="fa fa-lg fa-fw fa-user"></i>INICIAR SESION</h3>
          <div class="form-group">
            <label class="control-label">USUARIO</label>
            <input v-model="user" name="user" class="form-control" type="text" placeholder="Nombre de usuario" autofocus >
          </div>
          <div class="form-group">
            <label class="control-label">CLAVE</label>
            <input v-model="pass" name="pass" class="form-control" type="password" placeholder="Clave" >
          </div>
         <!-- <div class="form-group">
            <div class="utility">
              <div class="animated-checkbox">
                <label>
                  <input v-model="recordar" type="checkbox"><span class="label-text">Recuerdame</span>
                </label>
              </div>
            </div>
          </div>-->
          <div class="form-group btn-container">
            <button class="btn btn-primary btn-block"><i class="fa fa-sign-in fa-lg fa-fw"></i>INGRESAR</button>
          </div>
    </formulario>
</div>
</template>

<script>

    import axios from 'axios'
    import {remote,ipcRenderer} from 'electron'
    export default {
        name:'login-form',
        props:['redirect'],
        data () {
            return {
                user:null,
                pass:null,
                recordar:false,
                errores:{}
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
                    this.user=null;
                    this.pass=null;
                    ipcRenderer.send('login');
                    //this.$router.push(!this.redirect?{name:'inicio'}:this.redirect)
                  }else
                  {
                     //AxiosCatch(request.data.error)
                    this.errores=data.error;
                   
                   
                  }

                  
                })
               .catch(d=>{AxiosCatch(d);this.$store.commit('loading',false);});
            }
        }
    }
</script>

<style>
    
</style>
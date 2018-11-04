<template> 
  <div class="login-box ">
    
    <form class="login-form"  @submit.prevent="login">
    <div class="login-head">
      <h4 class="text-center user-name">
      {{ usuario.nombres }} 
    </h4>
    <p class="text-center text-muted">SESSION BLOQUEADA</p>
    </div>
      <div class="form-group">
        <label class="control-label">CONTRASEÑA</label>
        <input class="form-control" v-model="pass" type="password" placeholder="Contraseña" >
      </div>
       <div class="form-group">
            <div class="utility">
              <p class="semibold-text mb-2">
<router-link :to="{name:'login'}">no eres {{ usuario.user }}? Usar otra cuenta.</router-link>
              </p>
            </div>
          </div>
      <div class="form-group btn-container">
        <button class="btn btn-primary btn-block" type="submit">
          <i class="fa fa-unlock fa-lg"></i>DESBLOQUEAR 
        </button>
      </div>


    </form>
    
  </div> 
</template>
<script>
    import axios from 'axios'
    export default {
        name:'lock',
        props:['redirect','usuario'],
        data () {
            return {
                user:null,
                pass:null,
                recordar:false,
                
            }
        },
       
        created()
        {
          if(typeof this.usuario==='undefined')
          {
            this.$router.replace({name:'login'});
            return ;
          }
          this.user=this.usuario.user;
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
                    this.$router.replace(!this.redirect?{name:'inicio'}:this.redirect)
                  }else
                  {
                    AxiosCatch(data.error);
                    
                  }

                  
                })
               .catch(AxiosCatch);
            }
        }
    }
</script>

<style>
    
</style>
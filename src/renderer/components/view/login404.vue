<template>
    <div class="login-box flipped">
      <div class="page-error tile">
        <h1><i class="fa fa-exclamation-circle"></i>404, ¡No localizado!</h1>
        <h4 class="text-danger"> El URL solicitado no ha sido localizado</h4>
       <p>
  Si usted tecle&oacute; el URL manualmente, por favor revise su
  ortograf&iacute;a y vu&eacute;lvalo a intentar. </p><p>
Si usted cree que esto es un error del servidor, por favor comuníqueselo al administrador.</p>
        <p><a class="btn btn-primary" href="#" @click.prevent="retroceder">ir al inicio</a></p>
      </div>
    </div>
</template>
//href="javascript:window.history.back();"
<script>
    export default {
        name:'404',
        data () {
            return {
            }
        },
        components: {
        },
        methods:
        {
            retroceder()
            {
                this.$router.push({name:'inicio'});
            }
        }
    }
</script>

<style>
    
</style>
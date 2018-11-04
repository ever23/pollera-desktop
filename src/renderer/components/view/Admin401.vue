<template>
      <div class="page-error tile">
        <h1><i class="fa fa-exclamation-circle"></i> 401, ¡Autentificación requerida! </h1>
        <h3 class="text-danger"> Usted no esta autorizado para acceder a esta vista</h3>
        <p>El servidor no puede certificar que usted esté autorizado para acceder a la URL <b>"{{ location }}"</b>. Ha podido suministrar información incorrecta (ej. contraseña no válida). </p>
        <p>En caso de que usted tenga permiso para acceder al documento, por favor verifique su nombre de usuario y contraseña y vuélvalo a intentar. Si usted cree que esto es un error del servidor, por favor comuníqueselo al administrador del portal.</p>
        <p><a class="btn btn-primary" href="#" @click.prevent="retroceder">ir al inicio</a></p>
      </div>
</template>
//href="javascript:window.history.back();"
<script>
    export default {
        name:'Admin401',
        props:['location'],
        data () {
            return {
            }
        },

        created()
        {
            console.log(this.$route)
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
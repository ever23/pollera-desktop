<template>
     <main class="app-content">
      <div class="page-error tile">
        <h1><i class="fa fa-exclamation-circle"></i> Error 404: Pagina no encontrada</h1>
       
        <p><a class="btn btn-primary" href="#" @click.prevent="retroceder">ir al inicio</a></p>
      </div>
    </main>
</template>
//href="javascript:window.history.back();"
<script>
    export default {
        name:'Admin404',
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
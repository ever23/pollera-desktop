<template>
     <aside class="app-sidebar" @click="$emit('click')">
      <div class="app-sidebar__user">
        
        <div>
         <img class="app-sidebar__user-avatar img-fluid " :src="imagen" style="max-width: 90%;" alt="Logo granga">
          <p class="app-sidebar__user-name"></p><b><i> </i></b>
        </div>
      </div>
      <treeview-menu :menu="menu">
      </treeview-menu>
    </aside>
</template>
<script>
    import MenuRoot from '@/assets/menu.js'
    import axios from 'axios'
   // import MenuAdmin from '@/assets/menu-admin.js'
    export default {
        name:'aside-menu',
        data () {
            return {
              menu:null
            }
        },
        components: {
        },
        created()
        {
          switch(this.User.permisos)
          {
            case 'root':
              this.menu=MenuRoot;
              break;
            case 'admin': 
              this.menu=MenuRoot;//MenuAdmin(this.User);
              break;

          }
          
        },
        computed:
        {
            User()
            {
                return this.$store.getters.User;
            },
            imagen()
            {
              //console.log(this.$store.getters.settings)
              return this.$store.getters.settings.imagen;
            }
        }
    }
</script>

<style>
     
</style>
<template>
     <aside class="app-sidebar">
      <div class="app-sidebar__user">
        
        <div>
         <img class="app-sidebar__user-avatar img-fluid " src="/polleras/api/settings/imagen" style="max-width: 90%;" alt="Logo granga">
          <p class="app-sidebar__user-name">{{ User.nombres }}</p><b><i> ({{ User.permisos }})</i></b>
        </div>
      </div>
      <treeview-menu :menu="menu">
      </treeview-menu>
    </aside>
</template>
<script>
    import vuex from 'vuex';
    import MenuRoot from '../../assets/menu.js'
   // import MenuAdmin from '../../assets/menu-admin.js'
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
            }
        }
    }
</script>

<style>
     
</style>
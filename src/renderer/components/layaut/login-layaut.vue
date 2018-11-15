<template>
<main>
    <section class="material-half-bg">
      <div class="cover"></div>
    </section>
    <section class="login-content">
        <div class="logo">
            <!--<h1 class="text-center">{{ settings.nombre | uppercase }}</h1>-->
        </div>

        <router-view ></router-view>
    </section>
    </main>
</template>

<script>
  import axios from 'axios'
  import {remote,ipcRenderer} from 'electron'

   const { Menu } = remote
    export default {
        name:'login-layaut',
        components: {
          
        },
        data () {
            return {
               
            }
        },
        created()
        { 
           this.iniMenu();
           ipcRenderer.on('logout',(event,params)=>this.iniMenu());
        },
        methods:
        {
          iniMenu() 
          {
            const menu=Menu.buildFromTemplate([
              {
                label:"File",
                submenu:[
                  
                  {type:"separator"},
                  {
                    label:"Salir",
                    acelerator:"CmdOrCtrl+Q",
                    click()
                    {
                      remote.app.quit()
                    }
                  }
                ],
              },
               {
                  label:"Editar",
                   // acelerator:"CmdOrCtrl+U",
                   submenu:[
                     {
                        label:"Api",
                        click:()=>
                        {
                          this.$router.push({name:'edit-api'});
                        }
                     }
                   ]
                    
              },
            ]);
            Menu.setApplicationMenu(menu);
          }
        },
        computed:
        {
            settings()
            {
                return this.$store.getters.settings;
            }
        },
        filters: 
        {
            uppercase(data) 
            {
                return data && data.toUpperCase();
            }
        }
        
    }
</script>

<style>
    
</style>
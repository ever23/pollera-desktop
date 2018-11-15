
<template>
  <ul class="app-menu">
    <treeview 
        v-for="item in AppMenu"
        :key="item.key"
        :title="item.title" 
        :to="item.to"
        :icon="item.icon" 
        :menu="item.menu"
        :expanded="item.expanded"
        @treeview="treeview(item)"
        >
      </treeview>
  </ul>
</template>

<script>
    export default {
        name :'treeview-menu',
    
        props:{
           menu:{type:Array,required:true}
        },
       data () {
           return { AppMenu:[]}
        },
        created()
        {
          this.AppMenu=this.menu;
          
        },
        methods:
        {
          treeview(item)
          {
            if(item.expanded=='')
              for(let i of this.AppMenu)
              i.expanded='';
            item.expanded=item.expanded==''?'is-expanded':'';

           //console.log(this.AppMenu)
         
          }
        },
        
        

        
    }
</script>

<style>
    
</style>
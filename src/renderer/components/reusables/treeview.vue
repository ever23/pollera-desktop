<template>
  <li :class="[treeview_class,expanded]" >
    <a class="app-menu__item" href="#" @click.prevent="treeview" data-toggle='treeview'>
      <i :class="'app-menu__icon fa '+icon"></i>
      <span class="app-menu__label">{{ title }} 
      </span>
      <i class="treeview-indicator fa fa-angle-right" v-if="to==undefined"></i>
    </a>
    <ul :class="['treeview-menu']" >
      <li v-for="item in menu">
        <router-link class="treeview-item" v-if="typeof item.to=='object'" :to="item.to">&nbsp;&nbsp;
          <i :class="['icon', 'fa', item.icon]"></i> {{ item.name }}
        </router-link>
        <router-link class="treeview-item" v-if="typeof item.to!='object'" :to="{name:item.to}">&nbsp;&nbsp;
          <i :class="['icon', 'fa', item.icon]"></i> {{ item.name }}
        </router-link>
      </li>
      
    </ul>
  </li>
</template>

<script>
    export default {
        name :'treeview',
        
        props:{
            icon:{type:String},
            to:{},
            title:{type:String,required:true},
            menu:{},
            expanded:{}
        },
       data () {
            return {
               treeview_class:'treeview',
               link:{name:null}
            };
        },
        created()
        {
          ///console.log()
          if(this.to==undefined)
          {
            this.treeview_class='treeview';
            let m=this.menu.find(m=>m.to==this.$route.name);
            if(m!==undefined)
              this.treeview();
          }else
          {
            if(typeof this.to=='object')
            {
              this.link=this.to;
            }else
            {
              this.link={name:this.to};
            }
            if(this.$route.name==this.to)
              this.treeview();
          }

        },
        
        methods:
        {
          treeview()
          {
            //console.log('treeview')
            //this.active=this.active?false:true;
            this.$emit('treeview');
            if(this.to!==undefined)
            this.$router.push({name:this.to});
          }
        },
        mounted()
        {
           
        },
        
        computed: {
           

        },
        

        
    }
</script>

<style>
    
</style>
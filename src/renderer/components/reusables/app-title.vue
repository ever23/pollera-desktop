<template>
     <div class="app-title">
        <div>
          <h1><i :class="['fa','fa-'+icon]"></i> {{ title2 }} </h1>
        </div>
        <ul class="app-breadcrumb breadcrumb">
          <li class="breadcrumb-item">
          <router-link :to="{name:'inicio'}"><i class="fa fa-home fa-lg"></i></router-link>
          </li>
            
          <li class="breadcrumb-item" v-for="item in breadcrumb":key="item.id">
        
            <router-link v-if="item.to!==undefined" :to="{name:item.to}">{{ item.title }}</router-link>
           
            <a href="#" v-if="item.to===undefined" >{{ item.title }}</a>
          </li>
        </ul>
      </div>  
</template>

<script>
    export default {
        name :'app-title',
        
        props:{
            title:{required:true},
            icon:{type:String,required:true},
            to:{}
        },
       data () {
            return {
                breadcrumb:[],
                title2:null
            }
        },
        watch:
        {
          title()
          {
            this.update()
          }
        },
        mounted()
        {
           this.update()
           
        },
        
        methods: {
          update()
           {
            this.title2=this.title;
            if(typeof this.title==='object')
            {
               this.breadcrumb=this.title;
               this.title2=this.breadcrumb[this.breadcrumb.length-1].title;
               
            }
            if(typeof this.title==='string')
            {
                this.breadcrumb=[{title:this.title,to:this.to}];
                
            }
            }
          },
        

        
    }
</script>

<style>
    
</style>
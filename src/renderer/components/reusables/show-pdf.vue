<!--class="card" :src="src" width="100%" height="500" style="overflow: auto; background-color: #222d32;" -->
<template>
<div class="tile" >
    <div class="mailbox-controls">
    <div >
    
    </div>
    
    <div class="btn-group">  
        <button @click.prevent="$refs.iframe.print()" class="btn btn-sm btn-primary"> <i class="fa fa-print"></i>print</button>
    </div> 
    </div>
    <div   >
        <div >
        <iframe class="pdf" id="iframe" :src="src" ref="iframe"></iframe>
        </div>
    </div>
</div>
<!---->
</template>

<script>

import axios from 'axios'
const __LimitPagination_=6;
export default {
     
    name :'show-pdf',
    props:['src'],
    data () {
        return {
           
        };
    },
    created()
    {
           // this.loadingpdf();
          // this.$store.commit('loading',true);
           
    },
    watch:
    {
        src()
        {
                this.loadingpdf();
        },
           
        },
    methods: {
        loaded()
        {
           // this.$store.commit('loading',false);
            //this.logContent()
        },
       

    },
    mounted()
    {
         this.$refs.iframe.style.height=(this.$refs.iframe.innerWidth*2)+'px'
    },
    updated()
    {
            
    },
    computed: {
    },
        

        
    }
</script>

<style scope>
iframe
{
    width: 100%;
    height: 600px;
    border-style: none;
    border-width: 0px;
}
.pdf
{
    box-shadow: 1px -2px 15px 2px #023a34;
    margin-bottom: 20px;
}    
.pagination-.innerWidthbutton
{

    margin: 0;
    white-space: nowrap;
    text-align: right;
}
.pagination-button ul.pagination {
    margin: 2px 0;
    white-space: nowrap;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
}
</style>
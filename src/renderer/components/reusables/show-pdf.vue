<!--class="card" :src="src" width="100%" height="500" style="overflow: auto; background-color: #222d32;" -->
<template>
<div class="tile" >
    <div class="mailbox-controls">
    <div >
    <ul v-if="!lisPages" class="pagination pagination-sm">
        <li :class="['page-item' ,page<=1?'disabled':null]">
            <a class="page-link" href="#" @click.prevent="paginatioPrev">«</a>
        </li>
        <li :class="['page-item',page==pagina?'active':'']"  v-for="pagina in pagination" >
            <a class="page-link" href="#" @click.prevent="page=pagina">{{ pagina<10?0:null }}{{ pagina }}</a>
        </li>
        <li  :class="['page-item' ,page>=numPages?'disabled':null]">
            <a class="page-link" href="#" @click.prevent="paginatioNext">»</a>
        </li>
        
    </ul> 
    </div>
    
    <div class="btn-group">  
     
     <button @click="lisPages=!lisPages;loadingpdf() " class="btn btn-sm btn-primary">
            <i :class="['fa',lisPages? 'fa-object-group':'fa-object-ungroup']"></i>
        </button>
        <button @click="rotate += 90" class="btn btn-sm btn-primary">
            <i class="fa fa-rotate-right"></i>
        </button>
         <button class="btn btn-sm btn-primary disabled "><i>{{page}}/{{numPages}}</i></button>
        <button @click="rotate -= 90" class="btn btn-sm btn-primary">
            <i class="fa fa-rotate-left"></i>
        </button>
        <button @click="print" class="btn btn-sm btn-primary"> <i class="fa fa-print"></i>print</button>
    </div> 
    </div>
    <!--<div  class="pdf" v-if="lisPages" v-for="i in numPages" :key="i">
        <div >
        <pdf
            ref="pdf" 
            :src="pdf"
            :page="i"
            @loaded="loaded"
            :rotate="rotate"
        ></pdf>
           
        </div>
    </div>
    <div  class="pdf" v-if="!lisPages">
        <div >
        <pdf 
            ref="pdf" 
            :src="pdf" 
            :page="page" 
            :rotate="rotate" 
            @password="password" 
            @progress="progress" 
            @error="error" 
            @num-pages="num_pages" 
            @link-clicked="page = $event" 
            @loaded="loaded"
            ></pdf>
           
        </div>
    </div>-->
     
    <div class="row" v-if="!lisPages">
    <div class="col-sm-12 col-md-4">
    Pagina {{page}} de {{numPages}}
    </div>
    <div class="col-sm-12 col-md-8 pagination-button">
    <ul class="  pagination pagination-md">
        <li :class="['page-item' ,page<=1?'disabled':null]">
            <a class="page-link" href="#" @click.prevent="paginatioPrev">«</a>
        </li>
        <li :class="['page-item',page==pagina?'active':'']"  v-for="pagina in pagination" >
            <a class="page-link" href="#" @click.prevent="page=pagina">{{ pagina<10?0:null }}{{ pagina }}</a>
        </li>
        <li  :class="['page-item' ,page>=numPages?'disabled':null]">
            <a class="page-link" href="#" @click.prevent="paginatioNext">»</a>
        </li>
    </ul> 
    </div>
    </div>
</div>
<!---->
</template>

<script>
//import pdf from 'vue-pdf'
import axios from 'axios'
const __LimitPagination_=6;
    export default {
        components: {
        pdf: {}
    },
        name :'show-pdf',
        props:['src'],
       
       data () {
            return {
            lisPages:false,
            pdf:{},
            page: 1,
            pagination:[],
            numPages: 0,
            rotate: 0,
            };
        },
        created()
        {
            this.loadingpdf();
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
        print()
        {

            if(this.$refs.pdf[0])
            {
                this.$refs.pdf[0].print();
            }else
            {
                this.$refs.pdf.print();
            }
            
        },
        loadingpdf()
        {
            //this.pdf.destroyed=true;
            this.numPages=null;
            this.page=1;
            this.pagination=[];
            this.pdf=null;
            this.$store.commit('loading',true);
            this.pdf = pdf.createLoadingTask(this.src);
            this.pdf.then(pdf => {
                this.$store.commit('loading',false);
                this.num_pages(pdf.numPages);
               
            }).catch(AxiosCatch);
            this.pdf.onPassword=this.password;
            this.pdf.onProgress=this.progress;
        },
        paginatioPrev()
        {

            this.page--;
             if(this.page<this.pagination[0])
             {
                this.paginationRange(this.page-__LimitPagination_<1?1:this.page-__LimitPagination_,this.page);
             }

        },
        paginatioNext()
        {
            //this.logContent()

             this.page++;
            if(this.page>this.pagination[this.pagination.length-1])
            {
                this.paginationRange(this.page,this.page+__LimitPagination_>this.numPages?this.numPages:this.page+__LimitPagination_);
            }
          
        },
        paginationRange(ini,end)
        {
            //console.log(ini,end)
            this.pagination=[];
            for(let i=ini;i<=end;i++)
            this.pagination.push(i);
        },
        num_pages(pages)
        {
            this.numPages=pages;
            if(this.page>this.numPages)
            {
                this.page=1;
            }
            this.paginationRange(1,pages>__LimitPagination_?__LimitPagination_:pages);
        },
        password: function(updatePassword, reason) {

            updatePassword(prompt('Ingrese su contraseña'));
        },
        error: function(err) {

            //console.log(err);
           
            this.$store.commit('loading',false);
        },
        progress(n,e)
        {
            //console.log(n);
        },
        loaded()
        {
           // this.$store.commit('loading',false);
            //this.logContent()
        },
        logContent() {
            //console.log(this.$refs.pdf);
            this.$refs.pdf.pdf.forEachPage(function(page) {
                page.getOperatorList().then(e=>
                {
                    console.log(e);
                })
                console.log(page);
                return page.getTextContent()
                .then(function(content) {

                    var text = content.items.map(item => item.str);
                    //console.log(text);
                })
            });
        },
        changelist(l)
        {
            this.lisPages=l;
        }

    },
       
        mounted()
        {
            
        },
        updated()
        {
            
        },
        
        computed: {
           

        },
        

        
    }
</script>

<style scope>
.pdf
{
    box-shadow: 1px -2px 15px 2px #023a34;
    margin-bottom: 20px;
}    
.pagination-button
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
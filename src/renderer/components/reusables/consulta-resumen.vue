<template>
            <div class="mailbox-controls ">
              <div class="form-group">
                <select class="form-control" v-model="consulta" @change="query=null">
                  <option selected :value="null"> Seleccione consulta</option>
                  <!--<option value="datetime-local">Hora</option>-->
                  <option value="date">Dia</option>
                  <option value="week">Semana</option>
                  <option value="month">Mes</option>
                  <option value="year">Año</option>
                  
                </select>
              </div>
              <div class="form-group btn-group">
               <input  class="form-control" v-model="query" :type="consulta" @change="change" :placeholder="placeholder">

                <button class="btn btn-primary btn-sm" @click.prevent="change"><i class="fa fa-fw fa-lg fa-send"></i></button>
              </div> 
            </div>
</template>

<script>
import axios from 'axios'
import {queryDate} from '@/assets/js/Date.js'
    export default {
        name :'consulta-resumen',
        
       
       data () {
            return {
               consulta:null,
               query:null,
              
            };
        },
        created()
        {
         
         
          
        },
        
        methods:
        {
          change()
          {
            this.$emit("change_meta",{consulta:this.consulta,query:this.query})
            this.$emit("change",queryDate({consulta:this.consulta,query:this.query}))

            ;
          }
        },
        mounted()
        {
           
        },
        
        computed: {
          placeholder()
          {
            switch(this.consulta)
            {
              case 'year':
              return 'YYYY';
              default:
              return '';
            }
          }
        }
        

        
    }
</script>

<style>
    
</style>
<template>
  <div>

     <table class="table  table-hover table-bordered" ref="tabla">
             <thead >
                 <tr >
                 <td>
                      
                    </td>
                    <td>
                      C.I
                    </td>
                    <td>
                      Nombres y Apellidos
                    </td>
                  
                    <td>
                      Cargo
                    </td>
                    <td>
                      Sueldo
                    </td>
                     <td>
                      
                    </td>
                   <!-- <td v-if="isRoot">
                      
                    </td>-->
                </tr> 
             </thead>
                <tbody>
                <tr v-for="item in nomina" ref="items"> 
                  <td >
                           
                            <div class="animated-radio-button" v-if="item.asistencia=='si'">
                          <label>
                            <input type="radio" checked><span class="label-text">{{ item.hora }}</span>
                          </label>
                          </div>

                            <div class="animated-radio-button" v-if="item.asistencia=='no'">
                          <label>
                          <a href="#" @click="asistir(item)">
                          <i class="fa fa-circle-o"></i>
                           </a>
                          </label>
                         </div>

                    </td>
                   <td>
                            {{ item.ci_empleado }}
                    </td>
                     <td>
                            {{ item.nombres }} {{ item.apellidos }}
                    </td>
                    <td>
                            {{ item.cargo }}
                    </td>
                    <td>
                            {{ item.sueldo | BsSFormat }}
                    </td>
                     <td class="btn-group" >
                    <button v-if="isRoot" class="btn btn-primary btn-sm" type="button" @click="eliminar(item)"><i class="fa fa-trash-o"></i></button>
                    <router-link v-if="isRoot" class="btn btn-primary btn-sm" :to="{name:'editar-empleados',params:{ci_empleado:item.ci_empleado}}"><i class="fa fa-edit"></i></router-link> 
                    
                    </td>
                </tr> 
                </tbody>
            </table>
  </div>
</template>

<script>
    import axios from 'axios'
    import filter from '../../../assets/js/UserVueFilter.js'
   import DataTable from '../../../assets/js/list-DataTable.js'
    export default 
    {
        mixins: [DataTable],
        filters:filter,
        name:'list-nomina',
        props:['nomina'],

        data () {
            return {
               
            }
        },
       
        computed:
        {
           isRoot()
            {
                return this.$store.getters.User.permisos=='root';
            }
        },
      
        methods:
        {
         
          asistir(item,e)
          {
            
            swal(
                {
                  title: "Confirmar asistencia",
                  text: "Confirma asistencia de  "+item.ci_empleado+" "+item.nombres+" "+item.apellidos+"?",
                  type: "warning",
                  showCancelButton: true,
                  confirmButtonText: "si, Confirmar!",
                  cancelButtonText: "No",
                  closeOnConfirm: true,
                  closeOnCancel: true
                }, isConfirm=> 
                {
                  if (isConfirm) 
                  {
                   

                    axios.post('/empleados/asistir',{ci_empleado:item.ci_empleado}).
                    then(req=>
                    {
                      if(req.data.asistio)
                      {
                         this.$emit('change',item);
                       }else
                       {
                        AxiosCatch(req.data.error)
                       }
                    }).catch(AxiosCatch);
                   
                  } 
                });
          },
          editar(item)
          {
            
          },
          eliminar(item)
            {
              
                swal(
                {
                  title: "Eliminar empleado",
                  text: "Desea eliminar el empleado  "+item.ci_empleado+" "+item.nombres+" "+item.apellidos+"?",
                  type: "warning",
                  showCancelButton: true,
                  confirmButtonText: "si, Eliminar!",
                  cancelButtonText: "No",
                  closeOnConfirm: true,
                  closeOnCancel: true
                }, isConfirm=> 
                {
                  if (isConfirm) 
                  { 
                   
                   // delete(this.proyectos[index]);
                    axios.get('/empleados/eliminar?ci_empleado='+item.ci_empleado)
                    .then(request=>
                    {
                      if(request.data.eliminado)
                      {
                        this.$emit('change');
                      }else
                      {
                        AxiosCatch(request.data.error);
                      }  
                      
                    })
                    .catch(AxiosCatch);
                  } 
                });
            }
        },   
    }
</script>

<style >
    .check-nomina
    {
          margin: 3px 3px 0px 5px solid 1px;
          content: " ";
    }
</style>
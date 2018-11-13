import axios from 'axios'
import store from '../../store'
export default  function(tabla,name,value)
{
	return new Promise((resolve,rej)=>
		{
			swal(
                {
                  title: "Eliminar ",
                  text: "Deseas el item ?",
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
                    let data={tabla:tabla,name:name,value:value};
                    store.commit('loading',true);
                    axios.post('/index/Delete',data)
                    .then(request=>
                    {
                    	store.commit('loading',false);
                      if(request.data.eliminado)
                      {
                        resolve(request.data);
                      }else
                      {
                      	rej(request.data);
                        AxiosCatch(request.data.error);
                      }  
                      
                    })
                    .catch(e=>{AxiosCatch(e);rej(e)});
                  } 
                });
		});
	  
}

import store from '@/store'
import notify from './notify.js'
import {remote,ipcRenderer} from 'electron'
window.AxiosCatch=function(data)
	{
		store.commit('loading',false);
		
		if(typeof data =='object')
		{
			//console.log(data);
			if(typeof data.config == 'object')
			{
				//console.log(data['XMLHttpRequest']);
				if(data.response)
				{
					//console.log(data.response)
					notify({title: "Http Status "+data.response.status+":",message: data.response.data?data.response.data.error:statusText,icon: 'fa fa-warning'},{type: "danger"});
					if(data.response.status==401)
					{
						 swal(
                        {
                            title: "Error !",
                            text: "Es posible que su sesion aiga sido cerrada o no tenga permisos para acceder a este modulo",
                            type: "error",
                            showCancelButton: true,
                            confirmButtonText: "segir!",
                            cancelButtonText: "iniciar session!",
                            closeOnConfirm: true,
                            closeOnCancel: true
                        },
                        (is)=>{
                          if(is)
                          {
                           
                          }else{
                            ipcRenderer.send('logout');
                          }
                        });
						
					}
				}else
				{
					notify({title: "",message: data,icon: 'fa fa-warning'},{type: "danger"});
				}
			}else
			{
				for(let i in data)
				{
					//console.log(i,data[i]);
					notify({title: "Error: ",message: data[i],icon: 'fa fa-warning'},{type: "danger"});
				}
			}
			
		}else
		{
			notify({title: "Error: ",message: data,icon: 'fa fa-warning'},{type: "danger"});
		}
		
	}
 


import store from '@/store'
import {remote,ipcRenderer} from 'electron'
function ConnectError()
{
	swal({
        title: "Error en coneccion !",
        text: "Es posible que no se encuentre conectado a la red profavor revise su conexion",
        type: "error",
        showCancelButton: true,
        confirmButtonText: "Entendido!",
        cancelButtonText: "Salir!",
        closeOnConfirm: true,
        closeOnCancel: true
    },(is)=>
    {
        if(!is)
           remote.app.quit()                
    })
}
export default (to, from, next)=>
{
  //console.log(to, from, next);
	if(!to.matched.some(record => record.meta.isPublic))
    {
      //  console.log(store.getters.User)
        if(store.getters.User.id_user!='')
        {
          return next() 
        }else
        {
           store.dispatch('user').then(data=>
            {
              if(data.data.permisos!='root' && to.matched.some(record => record.meta.root))
              {
                 return next({name: '401',params:{location:to.fullPath}})
              }
              if(data.data.login)
              {
                
                 return next()
              }else
              {
                ipcRenderer.send('logout');
                return next();
              }
            }).catch(e=>
            {
             	AxiosCatch(e)
             	ConnectError()
                return next()
            });
        }    	
    }else
    {
        return next()
    }
   
}
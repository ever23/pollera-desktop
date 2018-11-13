import $router from '../../router'
import axios from 'axios'
import { getIdToken, login, logout, isLoggedIn}  from '../../auth.js'
export default
{
	state:{
        basePath:'',
        fileName:''
        
    },
    getters:
    {
        localSettings(state)
        {
            return {
                basePath:state.basePath,
                fileName:state.fileName,

            }
        },
       
    },
    mutations:
    {
        set(state,settings)
        {
            state.basePath=settings.basePath;
             state.fileName=settings.fileName;
              axios.defaults.baseURL =settings.basePath;
           
        },
       
    },
    actions:
    {
        
        fetch(context,data)
        { 
             //context.commit('loading',true);
           
        },
        
       
    }
}
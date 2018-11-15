
import axios from 'axios'

const BASE_PATH='BASE_PATH_AXIOS';
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
            axios.defaults.baseURL =settings.basePath;
            localStorage.setItem(BASE_PATH, settings.basePath);
        },
       
    },
    actions:
    {
        
        fethcLocalSettings(context)
        { 
            if(!localStorage.getItem(BASE_PATH))
            {
                context.commit('set',{basePath:'http://localhost:8080/polleras/api'})
            }else
            {
                context.commit('set',{basePath:localStorage.getItem(BASE_PATH)})
            }
        },
        
       
    }
}
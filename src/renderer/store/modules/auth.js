import $router from '../../router'
import axios from 'axios'
import { getIdToken, login, logout, isLoggedIn}  from '../../auth.js'

export default
{ 
    
    state:{
        token:null,
        id_user:'',
        user:'',
        nombres:'',
        apellidos:'',
        permisos:'',
       
        recordar:false
        
    },
    getters:
    {
        User(state)
        {
            return {
                id_user:state.id_user,
                user:state.user,
                nombres:state.nombres,
                apellidos:state.apellidos,
                permisos:state.permisos,
                recordar:state.recordar
            }
        },
        SessionId(state)
        {
            return state.token;
        },
        IsUser(state)
        {
            return state.id_user!==null;
        }
    },
    mutations:
    {
        Login(state,Session,recordar)
        {
            state.token=Session.token;
            state.id_user=Session.id_user;
            state.user=Session.user;
            state.nombres=Session.nombres;
            state.apellidos=Session.apellidos;
            state.permisos=Session.permisos;
            state.recordar=recordar;
        },
        Logout(state)
        {
            state.token=null;
            state.id_user=null;
            state.user=null;
            state.nombres=null;
            state.apellidos=null;
            state.permisos=null;
            state.recordar=false;
        }
    },
    actions:
    {
        
        LogIn(context,data)
        { 
             context.commit('loading',true);
             return axios.post('/user/',data)
                        .then(request => 
                        {
                             context.commit('loading',false);
                            if(request.data.login)
                            {
                                context.commit("Login", request.data.data,data.recordar); 
                                login(request.data.data.token);
                                //$router.push('admin');
                            }else
                            {
                                context.commit("Logout"); 
                            }
                            return request.data;
                           // console.log( request.data,typeof request.data);
                        });
        },
        LogOut(context)
        {
            // context.commit('loading',true);
             return axios.get('/user/logout')
                        .then(request => 
                        {
                            // context.commit('loading',false);
                            context.commit("Logout");
                            return request.data;
                           // console.log( request.data,typeof request.data);
                        });
        },
        user(context)
        {
            // context.commit('loading',true);
            return axios.get('/user/islogin')
                        .then(request => 
                        {
                            // context.commit('loading',false);
                            if(request.data.login)
                            {
                               // console.log(request.data.data)
                                context.commit("Login", request.data.data); 
                                //$router.push('login-form');
                            }else
                            {
                                context.commit("Logout");
                                //swal("Failed", request.data.error, "error")
                            }
                            return request.data;
                           // console.log( request.data,typeof request.data);
                        });
        }
        
       
    }
}
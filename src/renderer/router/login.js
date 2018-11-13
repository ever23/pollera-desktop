import login from '../components/layaut/login-layaut.vue'
import login_form from '../components/view/login/login-form.vue'
import editApi from '../components/view/login/edit-api.vue'
import Admin404 from '../components/view/login404.vue'
import LockScreen from '../components/view/login/LockScreen.vue'
export default
{
    path: '/login',
    component:login,
    children:
    [
        { path: '/',name:'login', component: login_form,props: route =>{return { redirect: route.query.redirect }} },
        { path: 'api',name:'edit-api', component: editApi },
        { path: 'lockscreen',name:'LockScreen',component:LockScreen,props:true},
        { path:'*',name:'Login404',component:Admin404},
    ],
    meta: {
        isPublic: true
    },
    
}
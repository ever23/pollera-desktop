//inicio
import admin from '../components/layaut/main-layaut.vue'
import inicio from '../components/view/inicio/inicio.vue'
//import inicio_admin from '../components/view/inicio/inicio-admin.vue'
//granjas 

//import agregar_granjas from '../components/view/granjas/agregar-granjas.vue'
//import granjas from '../components/view/granjas/granjas.vue'
//import resumen_granja from '../components/view/granjas/resumen-granja.vue'
//alimentos
import agregar_alimentos from '../components/view/alimentos/agregar-alimentos.vue'
import cosumo_alimentos from '../components/view/alimentos/consumo-alimentos.vue'
import resumen_alimentos from '../components/view/alimentos/resumen-alimentos.vue'
//medicinas 
import medicinas from '../components/view/medicinas/medicinas.vue'
import agrregar_medicinas from '../components/view/medicinas/agregar-medicinas.vue'
import compra_medicinas from '../components/view/medicinas/compra-medicinas.vue'
import consumo_medicinas from '../components/view/medicinas/consumo-medicinas.vue'
import consumos_medicinas from '../components/view/medicinas/consumos-medicinas.vue'
import compras_medicinas from '../components/view/medicinas/compras-medicinas.vue'
import resumen_medicinas from '../components/view/medicinas/resumen-medicinas.vue'
//Aves
import agregar_aves from '../components/view/aves/agregar-aves.vue'
import venta_aves from '../components/view/aves/venta-aves.vue'
import mortalidad_aves from '../components/view/aves/mortalidad-aves.vue'
import resumen_aves from '../components/view/aves/resumen-aves.vue' 
//huevos
import agregar_huevos from '../components/view/huevos/agregar-huevos.vue'
import venta_huevos from '../components/view/huevos/venta-huevos.vue'
import resumen_huevos from '../components/view/huevos/resumen-huevos.vue'
//404
import Admin404 from '../components/view/Admin404.vue'
import error401 from '../components/view/Admin401.vue'
import login404 from '../components/view/login404.vue'
//setiings
import perfilLayaut from '../components/layaut/profile.vue'
import perfil from '../components/view/settings/profile.vue'
import settings from '../components/view/settings/settings.vue'
import usuarios from '../components/view/settings/usuarios.vue'
import registroUsuario from '../components/view/settings/registro-usuario.vue' 
import sessiones from '../components/view/settings/sessiones.vue'
import editar_usuario from '../components/view/settings/editar-usuario.vue'
import editar_contrasena from '../components/view/settings/editar-contrasena.vue'
// empleados
import agregar_empleados from '../components/view/empleados/agregar-empleados.vue'
import pagar_nomina from '../components/view/empleados/pagar-nomina.vue'
import resumen_empleados from '../components/view/empleados/resumen-empleados.vue'
//galpones 
import agregar_galpon from '../components/view/galpones/agregar-galpon.vue'
import resumen_galpones from '../components/view/galpones/resumen-galpones.vue'
export default
{
    path: '/',
    component:admin,

    children:
    [
        { path: '/',name:'inicio', component: inicio },
       
        //alimentos 
        { path: 'alimentos/agregar',name:'agregar-alimentos', component: agregar_alimentos },
        { path: 'alimentos/consumo',name:'consumo-alimentos', component: cosumo_alimentos ,props: true},
        { path: 'alimentos/',name:'resumen-alimentos', component: resumen_alimentos,props:true },
        { path: 'alimentos/:id_galpon',name:'resumen-alimentos-galpon', component: resumen_alimentos,props:true },

        //medicinas 
        { path: 'medicinas/agregar',name:'agregar-medicinas', component: agrregar_medicinas, props:true},
        { path: 'medicinas/editar',name:'editar-medicinas', component: agrregar_medicinas, props:true},
        { path: 'medicinas/',name:'medicinas', component: medicinas ,props:true},
        { path: 'medicinas/compra',name:'compra-medicinas', component: compra_medicinas, props:true},
        { path: 'medicinas/consumo/:id_medicina',name:'consumo-medicinas', component: consumo_medicinas, props:true},
        { path: 'medicinas/consumos', name:'consumos-medicinas', component:consumos_medicinas, props:true},
        { path: 'medicinas/compras', name:'compras-medicinas', component:compras_medicinas, props:true},
        { path: 'medicinas/resumen/', name:'resumen-medicinas', component:resumen_medicinas, props:true},
        { path: 'medicinas/resumen/:id_galpon', name:'resumen-medicinas-galpon', component:resumen_medicinas, props:true},
        //aves
        { path: 'aves/compra', name:'agregar-aves',component:agregar_aves,props:true},
        { path: 'aves/venta', name:'venta-aves',component:venta_aves,props:true},
        { path: 'aves/mortalidad', name:'mortalidad-aves',component:mortalidad_aves,props:true},
        { path: 'aves/:id_galpon', name:'resumen-aves-galpon',component:resumen_aves,props:true},
         { path: 'aves/', name:'resumen-aves',component:resumen_aves,props:true},
        
        //huevos
        { path: 'huevos/produccion', name:'agregar-huevos', component:agregar_huevos, props:true},
        { path: 'huevos/venta', name:'venta-huevos', component:venta_huevos, props:true},
        { path: 'huevos/', name:'resumen-huevos', component:resumen_huevos, props:true},
        { path: 'huevos/:id_galpon', name:'resumen-huevos-galpon', component:resumen_huevos, props:true},
       //empleados 
        { path: 'empleados/insertar', name:'agregar-empleados', component:agregar_empleados},
        { path: 'empleados/editar', name:'editar-empleados', component:agregar_empleados,props:true},
        { path: 'empleados/nomina', name:'pagar-nomina', component:pagar_nomina},
        { path: 'empleados/resumen', name:'resumen-empleados', component:resumen_empleados},
       // galpones 
        { path: 'galpones/insertar', name:'agregar-galpon', component:agregar_galpon},
        { path: 'galpones/editar', name:'editar-galpon', component:agregar_galpon,props:true},
        { path: 'galpones/resumen', name:'resumen-galpones', component:resumen_galpones},
        //perfill
        { 
            path: 'settings', 
            component:perfilLayaut,
            children:
            [
                { path: '/', name: 'perfil',component:perfil},
                { path: 'settings', name: 'settings',component:settings, meta: {root: true}},
                { path: 'usuarios', name:'usuarios', component:usuarios, meta: {root: true}},
                { path: 'usuarios/registro', name:'registro-usuario',component:registroUsuario, meta: {root: true}},
                { path: 'usuarios/sessiones', name:'sessiones',component:sessiones, meta: {root: true}},
                { path: 'usuarios/editar', name:'editar-usuario', component:editar_usuario,props:true},
                { path: 'usuarios/contraseña', name:'editar-contrasena', component:editar_contrasena},
                { path: '401', name:'401', component:error401,props:true},
               { path:'*',name:'404',component:login404},
               // { path:'*',name:'Admin404',component:Admin404},

            ]
        },
       
        
       
        //404
        { path:'*',name:'Admin404',component:Admin404},
    ]
}
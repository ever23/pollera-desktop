import Vue from 'vue'
import AppTitle from './app-title.vue'  
import InputImage from './input-image.vue' 
import treeview from './treeview-menu.vue' 
import loader from './loader.vue'
import notificaciones from './notificaciones.vue'
import HeaderMenu from './header-menu'
import AsideMenu from './aside-menu'
import consultaResumen from './consulta-resumen.vue'
import showpdf from './show-pdf.vue'
import formulario from './formulario.vue'
Vue.component('app-title',AppTitle);
Vue.component('input-image',InputImage);
Vue.component('treeview-menu',treeview);
Vue.component('loader',loader);
Vue.component('dropdown-notificaciones',notificaciones);
Vue.component('aside-menu',AsideMenu);
Vue.component('header-menu',HeaderMenu);
Vue.component('consulta-resumen',consultaResumen);
Vue.component('show-pdf',showpdf);
Vue.component('formulario',formulario);
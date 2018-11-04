export default [
      {
        "expanded":"",
        "title":"Inicio",
        "to":"inicio",
        "icon":"fa-line-chart"
      },
      {
        "expanded":"",
        "title":"Galpones",
        "icon":"fa-industry",
        "menu":[
        
          {"to":"agregar-galpon","name":"Agregar",icon:"fa-plus-square"},
           {"to":"resumen-galpones","name":"Resumen",icon:"fa-list-alt"},
        ]
      },
      {
        "expanded":"",
        "title":"Alimentos",
        "icon":"fa-list-ul",
        "menu":[
          {"to":"agregar-alimentos","name":"Agregar",icon:'fa-cart-plus'},
          {"to":"consumo-alimentos","name":"Consumo",icon:'fa-shopping-basket'},
           {"to":"resumen-alimentos","name":"Resumen",icon:'fa-file-text-o'},
         
        ]
      },
      {
        "expanded":"",
        "title":"Medicinas",
        "icon":"fa-medkit",
        "menu":[
          //{"to":"medicinas","name":"Stock"},
          {"to":"agregar-medicinas","name":"Agregar",icon:"fa-plus-square"},
          {"to":"resumen-medicinas","name":"Resumen",icon:'fa-file-text-o'},
          
           
        ]
      },
      {
        "expanded":"",
        "title":"Aves",
        "icon":"fa-twitter",
        "menu":[
          {"to":"agregar-aves","name":"Agregar",icon:"fa-plus-square"},
          {"to":"venta-aves","name":"Venta",icon:"fa-dollar"},
          {"to":"mortalidad-aves","name":"Mortalidad",icon:"fa-remove"},
          {"to":"resumen-aves","name":"Resumen",icon:"fa-file-text-o"},
          
        ]
      },
      {
        "expanded":"",
        "title":"Huevos",
        "icon":"fa-circle",
        "menu":[
          {"to":"agregar-huevos","name":"Produccion",icon:'fa-building'},
          {"to":"venta-huevos","name":"Venta",icon:"fa-dollar"},
           {"to":"resumen-huevos","name":"Resumen",icon:"fa-file-text-o"},
          

        ]
      },
      {
        "expanded":"",
        "title":"Empleados",
        "icon":"fa-group",
        "menu":[
          {"to":"agregar-empleados","name":"Agregar",icon:'fa-plus-square'},
          {"to":"pagar-nomina","name":"Pagar Nomina",icon:'fa-dollar'},
        
          {"to":"resumen-empleados","name":"Resumen",icon:'fa-file-text-o'}
        ]
      }/*,

      {
        "expanded":"",
        "title":"Clientes",
        "icon":"fa-star", 
        "menu":[
          {"to":"clientes","name":"Lista"},
          {"to":"insertar-cliente","name":"Agregar"}
        ]
      }*/
];
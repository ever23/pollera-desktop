<template>

  <div>
  <div class="mailbox-controls">
  <div><h3>Perfil</h3></div>
  <div class="btn-group">
                <router-link class="btn btn-primary btn-sm" :to="{name:'editar-usuario',params:{id_usuarios:user.id_user}}"><i class="fa fa-edit"></i>Datos</router-link>
                <router-link class="btn btn-success btn-sm" :to="{name:'editar-contrasena',params:{id_usuarios:user.id_user}}"><i class="fa fa-edit"></i> Contraseña</router-link>
            </div> 
            </div>
    <table class="table">
      <tbody>
        <tr>
          <th>Nombres y apellidos</th>
          <td>{{ user.nombres }} {{ user.apellidos }}</td>
        </tr>
        <tr>
          <th>Nombre de usuarios</th>
          <td> {{ user.user }}</td>
        </tr>
         <tr>
          <th>Permisos</th>
          <td>{{ user.permisos }}</td>
        </tr>
         
      </tbody>
    </table>
  </div>
</template>
<script>
	export default
	{
		name:'profile',
		data()
		{
			return {}
		},
    created()
    {

    },
    computed:
    {
      user()
      {
        return this.$store.getters.User
      }
    }
		
	}
</script>
<template>
	<form @submit.prevent="submit" ref="form"  class="form-control">
	<slot></slot>
	</form>
</template>
<script>
	export default
	{
		name:'formulario',
		data()
		{
			return {
			}
		},
		created()
		{
			
		},
		mounted()
		{
			let inputs=this.$refs.form.getElementsByTagName('input');
			console.log()
		},
		methods:
		{
			submit(e)
			{
				this.$emit('submit',e)
			}
		}
	}

</script>

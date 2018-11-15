<template>
	<form @submit.prevent="submit" ref="form"  class="form-control">
	<slot></slot>
	</form>
</template>
<script>
	export default
	{
		name:'formulario',
		props:['error'],
		data()
		{
			return {
				list:{},
				divs:{},

			}
		}, 
		created()
		{
			//console.log(this);
		},
		watch:
		{
			error(error)
			{
				AxiosCatch(error);
				
				for(let i in this.list)
				{

					if(this.error[i])
					{
						this.divs[i]=document.createElement('div');
						this.divs[i].className="form-control-feedback form-error text-danger";
						let b=document.createElement('b');
						b.appendChild(document.createTextNode(this.error[i]));;
						
						
						this.divs[i].appendChild(b);
						this.list[i].parentNode.appendChild(this.divs[i]);
						
						this.list[i].className+=" is-invalid";
						if(this.list[i].tagName=='select')
						{
							this.list[i].change=()=>
							{
								this.list[i].parentNode.removeChild(this.divs[i]);
								this.list[i].className=this.list[i].className.replace(/is-invalid/,'');
								this.list[i].change=()=>{}
							};
						}else
						{
							this.list[i].focusout=()=>
							{
								this.list[i].parentNode.removeChild(this.divs[i]);
								this.list[i].className=this.list[i].className.replace(/is-invalid/,'');
								this.list[i].focusout=()=>{}
							};
						}
						this.list[i].focus();
						//console.log(i)
						
					}
				}
			}
		},
		mounted()
		{
			
			let inputs=this.$refs.form.querySelectorAll('input,select,textarea')
			for(let i=inputs.length-1;i>=0;i--)
			{
				//console.log(i,inputs.keys(i),inputs.item(i))
				let name=inputs.item(i).attributes.getNamedItem('name');
				if(name)
				{
					this.list[name.value]=inputs.item(i);
				}
				
			}

			//console.log(this.list)
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

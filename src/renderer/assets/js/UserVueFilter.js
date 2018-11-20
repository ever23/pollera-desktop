import $store from '@/store'
var NumberFormat=function(data)
	{
		let text=String(data);
		let matchDecimal=null;
		let match=null;
		let Decimal=text.split(/\./)[0];
		let PuntoFlotante=text.split(/\./).length==2?text.split(/\./)[1]:'00';
		if(Number(PuntoFlotante)>99)
		{
			let PFarray=PuntoFlotante.split('');
			if(Number(PFarray[2])>=5)
			{
				PFarray[1]=Number(PFarray[1])+1;
			}else if(Number(PFarray[1])!=0)
			{
				PFarray[1]=Number(PFarray[1])-1;
			}
			PuntoFlotante=String(PFarray[0])+String(PFarray[1]);
		}else
		{
			PuntoFlotante=PuntoFlotante.substring(0,2);
		}

		
		//console.log(Decimal); 
		


		return (Decimal=='undefined'?0:Decimal)+'.'+PuntoFlotante;
	}
/*var DateFormat=(data)
{

} 

var DateTimeFormat=(data)
{

}*/
export default {
	NumberFormat:(NumberFormat),
	BsSFormat:(data)=> NumberFormat(data)+' '+$store.getters.settings.moneda,
	AlimFormat:(data)=>NumberFormat(data)+' '+$store.getters.settings.umalimentos
}
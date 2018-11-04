//import {fecha} from '../../../assets/js/Date.js'

export const meses= ["Ene", "Feb", "Mar", "Abr", "May","Jun","Jul","Ago","Set","Oct","Nob","Dic"];


export function queryDate(data)
{
	if(!data)
		return '';
	let query='';
	let consulta='';
	let restult=''
	for(let i in data)
	{
		if(data[i]!==null)
		restult+=i+'='+data[i]+'&';
	}
	
    //query=this.id_granjas?'id_granjas='+this.id_granjas+'&':'';
   // restult=data?'consulta='+data.consulta+'&query='+data.query:'';
    return restult;
}

export function fecha()
{
	let date = new Date();
	let month=date.getMonth()+1;
	let fecha =date.getFullYear()+'-'+(month>9?month:'0'+month)+'-'+(date.getDate()>9?date.getDate():'0'+date.getDate());
	return fecha;
}
export function fechaHora()
{
	let time=new Date();
    return (time.getDate()>9?time.getDate():'0'+time.getDate())+' '+meses[time.getMonth()]+' '+time.getFullYear()+' '+(time.getHours()>9?time.getHours():'0'+time.getHours())+':'+(time.getMinutes()>9?time.getMinutes():'0'+time.getMinutes())+':'+(time.getSeconds()>9?time.getSeconds():'0'+time.getSeconds());
}
export function DaysOfMonth(Month)
{
	let Result=[];
	let D= new Date();
	D.setDate(1);
	D.setMonth(Number(Month)-1);
	for(let i=1;i<=32;i++)
	{
		D.setDate(i);
		if(D.getMonth()!=Number(Month)-1)
			return Result;
		Result.push(i>9?i:'0'+i);
	}
}
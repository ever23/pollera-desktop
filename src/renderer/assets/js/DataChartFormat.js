import {meses,fecha,DaysOfMonth} from './Date.js'
import filter from './UserVueFilter.js'
export function Format(estadistica,type,query)
{
  switch(type)
  {
    case 'week':
    let time= new Date();
    time.setFullYear(query.match(/\d{4}/)[0]);
    time.setDate(1);
    time.setMonth(0);
    time.setDate(Number(query.match(/W\d{2}/)[0].substring(1))*7)
    return {data:CalculoDay(estadistica,time.getMonth()+1),labels:DaysOfMonth(time.getMonth()+1)};
    case 'month':
    return {data:CalculoDay(estadistica,query),labels:DaysOfMonth(query)};
    default:
    return {data:CalculoMonth(estadistica),labels:meses};
  }
}

export function CalculoDay(estadistica,Month)
{
    if(!estadistica)
    return;    
  let Result=[];
  for(let day of DaysOfMonth(Month))
  {
    let item_day
   
     item_day=estadistica.filter((item)=>
    {  
                //console.log((new Date()).getFullYear()+'-'+Month+item.fecha.match(/\d{2}$/)[0])
      return item.fecha.match(/^\d{4}-\d{2}-\d{2}/)[0]===(new Date()).getFullYear()+'-'+Month+'-'+day
    });
    let cantidad=0;
    for(let sumar of item_day)
    {
      cantidad+=Number(sumar.cantidad);
    }
    Result.push(filter.NumberFormat(cantidad));
              
  }
  return Result;
}
export function CalculoMonth(estadistica)
{
  if(!estadistica)
    return;  
  let Result=[];
  for(let mes of ['01','02','03','04','05','06','07','08','09','10','11','12'])
  {
    let item_mes;
   // if(estadistica)
    item_mes=estadistica.filter((item)=>
    {  
      return item.fecha.match(/\d{4}-\d{2}/)[0]==(new Date()).getFullYear()+'-'+mes
    });
    let cantidad=0;
    for(let sumar of item_mes)
    {
      cantidad+=Number(sumar.cantidad);
    }
    Result.push(filter.NumberFormat(cantidad));
              
  }
  return Result;
}
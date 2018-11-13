import store from '../../store'
export default function (src)
{
	console.log(src)
	let iframe=document.createElement('iframe');
	iframe.src=store.getters.localSettings.basePath+src;
	console.log(Object(iframe))
}
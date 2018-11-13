import $ from 'jquery'
//import beep from '../audio/beep.mp3'
//var audio=new Audio('/static/audio/beep.mp3');
export default function(info,type)
{
 	//setTimeout(()=>audio.play(), 0);
	return $.notify(info,type);
}
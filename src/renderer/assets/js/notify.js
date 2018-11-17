import $ from 'jquery'
import beep from '../audio/beep.mp3'
var audio=new Audio(beep);
export default function(info,type)
{
 	setTimeout(()=>audio.play(), 0);
	return $.notify(info,type);
}
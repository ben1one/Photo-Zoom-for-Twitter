(function(){
//----------------------- Start package





var posX;
var maxW;


function getLargeImage(raw){
	
	//Twitter Profile pic
    raw = raw.replace("_normal", "");
    raw = raw.replace("_mini", "");
	raw = raw.replace("_reasonably_small", "");
	raw = raw.replace("_bigger", "");

	//Recent Photos
	raw = raw.replace(":thumb", ""); //twimg
	raw = raw.replace("?size=t", ""); //Instagram
	raw = raw.replace("mini", "large");
	raw = raw.replace("size=medium", "");
	
    return raw;
}


function isZoomAble(src){

    
    if( src.indexOf("profile_images") != -1 || 
		src.indexOf("instagr") != -1|| 
		src.indexOf("instagr") != -1 ||
		src.indexOf("twimg") != -1 ||
		src.indexOf("twitpic") != -1 ||
		src.indexOf("plixi") != -1 ||
		src.indexOf("twitgoo") != -1 
	){
        return true;
    }

    return false;

}





function showPhoto(attr, alt){

    if(!isZoomAble(attr)){
        return;
    }


    pos = posX;  //posX is Global

    //Show


    $("#tpz-"+pos).show();

    $("#tpz-"+pos).html('<img border="0" style="position:fixed;top:75px;'+pos+':10px;z-index:998;border:solid 2px #000000;"  src="'+chrome.extension.getURL('loading.gif')+'">');
	
    $("#tpz-"+pos).append('<img id="tpz" style="max-height:'+(window.innerHeight-65)+'px;max-width:'+maxW+'px;position:fixed;top:75px;'+pos+':10px;z-index:999;border:solid 2px #000000;background-color:#FFFFFF;box-shadow:0 0 10px #000000"  src="'+getLargeImage(attr)+'">').append('<div id="tpz-alt" style="max-width:'+maxW+'px;position:fixed;top:50px;'+pos+':10px;z-index:998;color:white;background-color:black;padding:5px 8px;box-shadow:0 0 10px #000000;-webkit-border-top-left-radius: 5px;-webkit-border-top-right-radius: 5px;">'+alt+'</div>');	
  
	  if(alt==""){
	  $('#tpz-alt').css("padding", "0");
	  $('#tpz').css('top', '50px');
	  }   
	  
}

function hidePhoto(){
    $("#tpz-left, #tpz-right").hide();
    $("#tpz-left, #tpz-right").html("");
}


$('body').append('<div id="tpz-left" style="background-color:white;z-index:9000;border:1px;position:fixed;left:10px;top:75px;"></div>');
$('body').append('<div id="tpz-right" style="background-color:white;z-index:9000;border:1px;position:fixed;right:10px;top:75px;"></div>');



$('img').live("mouseenter", function(){
    if($(this).attr('class').indexOf('scaled-image')!=-1){return;} //Dont zoom on slideshow page
	if($(this).attr('alt').indexOf('Embedded image permalink')!=-1){return;} //Dont zoom on slideshow page
	if($(this).attr('class').indexOf('summary-thumbnail')!=-1){return;}
	

	showPhoto($(this).attr('src'), $(this).attr('alt'));
	//console.log($(this).attr('alt'));
});
$('img').live("mouseleave", function(){
	hidePhoto();
});




$(document).mousemove(function(e){
		
        if(e.pageX >=  window.innerWidth/2){
            posX='left';
			maxW = e.pageX-70;
			//console.log(maxW);
            return'right';
        }else{
            posX='right'; 
			maxW = window.innerWidth-e.pageX-70;
			//console.log(maxW);
            return'left';
        }
		
	
});
	
	

//-----------------------End Package
})();

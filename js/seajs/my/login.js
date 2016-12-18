/**
 * Created by ×ÞÊ¿½Ü on 2015/12/22.
 */
define(function(require, exports, module){
    require("jQuery");
    var myLogin = {
        init: function(){

        },
        navigation: function(){}
    };
    myLogin.init();
    myLogin.navigation();
})







$('.weekDig span').mousewheel(function(event,delta){
    function getToWidth(index,delta){
        var maxWidthCapter,widthStep1,toWidth1,
        liWidth1 = $('.classCon li.capter').eq(index).css('width');
        liWidth1 = parseInt(liWidth1.substring(0,liWidth1.length-2));
        if (index == 0) {
            maxWidthCapter = 600;
        }else if(index == 1){
            maxWidthCapter = 550;
        }else if(index == 2){
            maxWidthCapter = 458;
        }else if(index == 3){
            maxWidthCapter = 777;
        }else if(index == 4){
            maxWidthCapter = 503;
        }else if(index == 5){
            maxWidthCapter = 596;
        }
        widthStep1 = (maxWidthCapter-50)/23.6;
        toWidth1 = liWidth1 + widthStep1*delta;
        toWidth1 = toWidth1>maxWidthCapter ? maxWidthCapter : toWidth1;
        toWidth1 = toWidth1<50 ? 50 : toWidth1;
        return toWidth1;
    }
    event.stopPropagation();
    var index = $(this).index(),
        index1 = index + 1,
        len = $(".weekNum span").length;
    var capterIndex;
    if (index >= 0 && index <= 3) {
        capterIndex = 0;
    }else if (index >=4 && index <= 7) {
        capterIndex = 1;
    }else if (index >=8 && index <= 11) {
        capterIndex = 2;
    }else if (index >=12 && index <= 15) {
        capterIndex = 3;
    }else if (index >=16 && index <= 19) {
        capterIndex = 4;
    }else if (index >=20 && index <= 25) {
        capterIndex = 5;
    }
    $('li.capter').css('height','600px');
    var widthStep = 50;
    var liWidth = $('.weekDig span').eq(index).css('width');
    liWidth = parseInt(liWidth.substring(0,liWidth.length-2));
    var maxWidth = 1229;
    var toWidth;
    if (delta>0) {
        toWidth = liWidth + widthStep;
    }else{
        toWidth = liWidth - widthStep;
    }
    toWidth = toWidth>maxWidth ? maxWidth : toWidth;
    toWidth = toWidth<47 ? 47 : toWidth;
    var scrollWidth,animateTime = 10;



if (toWidth<50 && delta<0) {
	$(".mainContent").scrollLeft(100);
	$('.weekNum').scrollLeft(0);
	console.log(toWidth+'==='+delta);
	for (var i = 0; i < len; i++) {
        $(".weekNum span").eq(i).html(i+1);
    }
    $(this).css('background','#ffe777').removeClass("selected");
    $('.capterTitle').animate({width:'50',height:'300'},animateTime);
    $('.capterTitle .capterName').animate({width:'30',margin:'0 10px',height:'400',fontSize:'1.7vw'},animateTime);
    $('.capterDetail').animate({width:"0",opacity:1},animateTime,function(){
        $(this).css({display:"none"});
    });
    $('.toLeft').animate({width:"0",opacity:1},animateTime,function(){
        $(this).css({display:"none"});
    });
    $('.toRight').animate({width:"0",opacity:1},animateTime,function(){
        $(this).css({display:"none"});
    });
    $('li.capter').css('visibility','visible');
    $('li.capter').css('height','300px');
}else if (toWidth<50 && delta>0) {
	scrollWidth = (toWidth-47)*index;
        $('.weekNum').scrollLeft(scrollWidth);
        // $(".mainContent").scrollLeft(0);
        for (var i = 0; i < len; i++) {
            $(".weekNum span").eq(i).html(i+1);
        }
        $(this).addClass('selected').css('background','#70ad47').html('第'+index1+'周').siblings().removeClass('selected');
        for (var i = 0; i < $('.classCon li.capter').length; i++) {
            $('classCon li.capter').eq(i).animate({'width':getToWidth(i,delta)+'px'},animateTime);
        }
        $('.capterTitle').animate({width:'100%',height:'60'},animateTime);
        $('.capterTitle .capterName').animate({width:'30%',height:'50',margin:'0'},animateTime);
        $('.capterDetail').animate({width:"100%",opacity:1},animateTime,function(){
            $(this).css({display:"block"});
        });
        $('.toLeft').animate({width:"35%",opacity:1},animateTime,function(){
            $(this).css({display:"block"});
        });
        $('.toRight').animate({width:"35%",opacity:1},animateTime,function(){
            $(this).css({display:"block"});
        });  
}else if (toWidth<270) {
	$('.capterTitle .capterName').animate({width:'30',margin:'0 10px',height:'300',fontSize:'1.7vw'},animateTime);
    $('.classSummary').css('display','inline-flex');
    $('.capterDetail').css('display','none');
}else if (toWidth<1299) {
	$('.capterTitle').animate({width:'100%',height:'60'},animateTime);
    $('.capterTitle .capterName').animate({width:'30%',height:'50',margin:'0'},animateTime);
    $('.toLeft').animate({width:"35%",opacity:1},animateTime,function(){
    $(this).css({display:"block"});
    });
    $('.toRight').animate({width:"35%",opacity:1},animateTime,function(){
        $(this).css({display:"block"});
    });  
    $('.classSummary').css('display','none');
    $('.capterDetail').css('display','block'); 
    scrollWidth = (toWidth-47)*index;
    $('.weekNum').scrollLeft(scrollWidth);
    // $(".mainContent").scrollLeft(0);

}else if (toWidth==1299){
	// $('.mainContent').scrollLeft(200);
    $('.mainContent .classCon').css('margin-left','200px');
    scrollWidth = toWidth*index;
    $('.weekNum').scrollLeft(scrollWidth);
    switch(capterIndex){
        case 0 : $(".mainContent").animate({scrollLeft: '100px'},10);
                 $('li.capter').eq(0).css({'width':'100%','visibility':'visible'}).siblings().css('visibility','hidden');
        break;
        case 1 : $(".mainContent").animate({scrollLeft: '760px'},10);
                 $('li.capter').eq(1).css('visibility','visible').siblings().css('visibility','hidden');
        break;
        case 2 : $(".mainContent").animate({scrollLeft: '1310px'},10);
                 $('li.capter').eq(2).css('visibility','visible').siblings().css('visibility','hidden');    
        break;
        case 3 : $(".mainContent").animate({scrollLeft: $(".mainContent").scrollLeft()+100},10);
                 $('li.capter').eq(3).css('visibility','visible').siblings().css('visibility','hidden');    
                 console.log($(".mainContent").scrollLeft());
        break;
        case 4 : $(".mainContent").animate({scrollLeft: '2545px'},10);
                 $('li.capter').eq(4).css('visibility','visible').siblings().css('visibility','hidden');    
        break;
        case 5 : $(".mainContent").animate({scrollLeft: '3048px'},10);
                 $('li.capter').eq(5).css('visibility','visible').siblings().css('visibility','hidden');    
        break;
        default:
        break;
        }
}
$('.weekDig span').animate({'width':toWidth+'px'},animateTime);
for (var i = 0; i < $('.classCon li.capter').length; i++) {
$('.classCon li.capter').eq(i).animate({'width':getToWidth(i,delta)+'px'},animateTime);
$('.mainContent .classCon').css('margin','0');
});
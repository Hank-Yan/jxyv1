define(function(require,exports,module){
    require("jQuery");
    $(function(){
        var inow=0;
        isTouchDevice();
        var startX = 0, startY = 0;
        //touchstart事件
        function touchSatrtFunc(evt) {
            try{
                evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
                var touch = evt.touches[0]; //获取第一个触点
                var x = Number(touch.pageX); //页面触点X坐标
                var y = Number(touch.pageY); //页面触点Y坐标
                //记录触点初始位置
                startX = x;
                startY = y;
            }
            catch (e) {
               alert('touchSatrtFunc：' + e.message);
            }
        }
        //touchmove事件，这个事件无法获取坐标
        // var timer=null;
        function touchMoveFunc(evt) {
            try{
                evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
                alert(evt.touches[0]);
                // var touch = evt.touches[0]; //获取第一个触点
                // var x = Number(touch.pageX); //页面触点X坐标
                // var y = Number(touch.pageY); //页面触点Y坐标
                // //判断滑动方向
                // /*if (x-startX <0) {
                //     //alert($('#test').css('left'));
                //     // next();
                // }
                // if (x-startX >0) {
                // }*/
                // var topLeft = $(this).scrollLeft()
                // var newTopLeft = topLeft + startX - x;
                // // alert(topLeft +" === "+newTopLeft);
                // $(".weekNum").animate({scrollLeft: newTopLeft+'px'}, 500);
                // var bottomLeft = newTopLeft*4065/1824;
                // $(".mainContent").animate({scrollLeft: bottomLeft+'px'}, 500);
            }
            catch (e) {
                alert('touchMoveFunc：' + e.message);
            }
        }
        //touchend事件
        function touchEndFunc(evt) {
            try {
                evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
                // alert(evt.touches[0]);
                var touch = evt.touches[0]; //获取第一个触点
                var x = Number(touch.pageX); //页面触点X坐标
                var y = Number(touch.pageY); //页面触点Y坐标
                var topLeft = $(this).scrollLeft();
                var newTopLeft = topLeft + startX - x;
                alert(topLeft +" === "+newTopLeft);
                $(".weekNum").animate({scrollLeft: newTopLeft+'px'}, 500);
                var bottomLeft = newTopLeft*4065/1824;
                $(".mainContent").animate({scrollLeft: bottomLeft+'px'}, 500);
               // return;
            }
            catch (e) {
                // alert('touchEndFunc：' + e.message);
            }
        }
        //绑定事件
        function bindEvent() {
            var test=document.getElementById('weekNum');
            // var oul=test.getElementsByTagName("ul")[0];
            test.addEventListener('touchstart', touchSatrtFunc, false);
            test.addEventListener('touchmove', touchMoveFunc, false);
            test.addEventListener('touchend', touchEndFunc, false);
        }
        //判断是否支持触摸事件
        function isTouchDevice() {
            //document.getElementById("version").innerHTML = navigator.appVersion;
            try {
                //document.createEvent("TouchEvent");
                bindEvent(); //绑定事件
                // alert("支持TouchEvent事件！");
            }
            catch (e) {
               alert("不支持TouchEvent事件！" + e.message);
            }
        }
        // var left=0;
        // function next(){
        //     var width=parseInt($('#fenlei-list li').eq(0).width());
        //     left=left-width;
        //    /*  $('#fe()nlei-list ul').css('left',left+'px');*/
        //     if(left<=-width*($('#fenlei-list li').length-1)){
        //         left=-width*($('#fenlei-list li').length-1);
        //     }
        //     $('#fenlei-list ul').css({'width':'800%','transform':'translate('+left+"px"+',0)','-webkit-transform':'translate('+left+"px"+',0)','transition-duration':'0.5s','-webkit-transition-duration':'0.5s','transition-timing-function': 'linear','-webkit-transition-timing-function': 'linear'});
        //     $('#fenlei-list li').removeClass('active').addClass('moren');
        //     $('#fenlei-list li').eq(inow+1).removeClass('moren').addClass('active');
        //         //$('.concent section').css('display','none').eq(inow+1).css('display','block');
        //         inow++;
        //         if(inow>=$('#fenlei-list li').length-2){
        //                 inow=$('#fenlei-list li').length-2;
        //                 return;
        //     }
        // }
        });
})
/**
 * Created by xilang on 2015/12/22.
 */
define(function(require, exports, module){
    require("../../seajs/jquery/2.1.4/jquery-2.1.4.min.js");
    require("../../seajs/jquery-ui-1.11.4/jquery-ui.min.js");
    require("../../seajs/jquery-mousewheel-3.1.12/jquery.mousewheel.js");
    require("../../seajs/jquery-mousewheel-3.1.12/jquery.mousewheel.min.js");
    Array.prototype.insert = function (index, item) {  //修改原生数组方法，在数组指定位置插入元素
        this.splice(index, 0, item);  
    }; 
    Array.prototype.del = function (index) {  //修改原生数组方法，删除数组中指定位置的元素
        this.splice(index, 1);  
    }; 
    var arrIndex = 0;//缩放后宽度数组的游标
    var screenWidth = $(window).width();//当前屏幕宽度
    var demo = {
        init: function(){
            $('.addHomework').click(function(){
                var index = $(this).attr('classIndex');
                console.log(index);
                if(index < 120){
                    location.href = '../../../../../homework/firsthalf/'+index+'_A_1.pdf';
                }else{
                    location.href = '../../../../../homework/lasthalf/'+(index-120)+'_A_1.pdf';
                }     
            })

            $(".addHomework span a").click(function(e){
                e.stopPropagation();
                location.href = 'http://localhost/index.php/Iframes/Question/index/subjectId/2.shtml';
            })
    	},

        initweekDayNum: function(){
            var da = ["星期日","星期一", "星期二", "星期三", "星期四", "星期五","星期六"];
            var weekDayNumHtml = '';
            for (var i=0; i<7; i++) {
                if (i==0 || i==6) {
                    weekDayNumHtml += '<span flag="0" class="weekend">'+da[i] + '</span>';
                }else {
                    weekDayNumHtml += '<span flag="0">'+da[i] + '</span>';
                }
            }
            $(".weekDayNum").html(weekDayNumHtml);

            $(".weekDayNum span").hover(function(){
                $(this).css("background","#124934").siblings().css('background','#92D050');
                $(this).attr('flag',1).siblings().attr('flag',0);
                var selectedWeekIndex = $('.weekNum span.selected').index();
                var selectedWeekDayIndex = $('.weekDayNum span[flag=1]').index();
                if(selectedWeekDayIndex < 2){
                    selectedWeekDayIndex = 0;
                }else if(selectedWeekDayIndex > 4){
                    selectedWeekDayIndex = 4;
                }else{
                    selectedWeekDayIndex = selectedWeekDayIndex-1;
                }
                var startIndex = selectedWeekIndex*5; //反显的星期开始下标
                var toRenderIndex = selectedWeekIndex*5 + selectedWeekDayIndex;//hover到星期上时，反显的课程条目下标
                for (var i = startIndex; i<startIndex+5; i++) {//hover之前，将状态恢复
                    $(".capterDetail .classContent").eq(i).css("background","#BCE292");
                    $(".capterDetail .addOrDel.del").eq(i).css("background","#BCE292");
                    $(".capterDetail .classCategory").eq(i).css({"background":"#BCE292","color":"#124934"});
                    $(".capterDetail .addHomework").eq(i).css({"background":"#BCE292","color":"#124934"});
                    $(".capterDetail .addCorrect").eq(i).css({"background":"#BCE292","color":"#124934"});
                    $(".capterDetail .addDefect").eq(i).css({"background":"#BCE292","color":"#124934"});
                    $(".capterDetail .addTeamEvaluate").eq(i).css({"background":"#BCE292","color":"#124934"});
                    $(".capterDetail .addSuggest").eq(i).css("background","#BCE292");
                }
                //将条目反显
                $('.capterDetail .classContent').eq(toRenderIndex).css({"background":"#124934","color":"#fff"});
                $(".capterDetail .addOrDel.del").eq(toRenderIndex).css({"background":"#124934","color":"#fff"});
                $(".capterDetail .classCategory").eq(toRenderIndex).css({"background":"#124934","color":"#fff"});
                $(".capterDetail .addHomework").eq(toRenderIndex).css({"background":"#124934","color":"#fff"});
                $(".capterDetail .addCorrect").eq(toRenderIndex).css({"background":"#124934","color":"#fff"});
                $(".capterDetail .addDefect").eq(toRenderIndex).css({"background":"#124934","color":"#fff"});
                $(".capterDetail .addTeamEvaluate").eq(toRenderIndex).css({"background":"#124934","color":"#fff"});
                $(".capterDetail .addSuggest").eq(toRenderIndex).css({"background":"#124934","color":"#fff"});
            });  
        },

        initMainContent: function(){
            $(".mainContent").animate({scrollLeft: 52.462*screenWidth/100*24+'px'},10);
            $('.classCon li.capter').attr('flag',0);
            var moveArr = [7.5,5,20,27.5,10.83,29.17];
	        var midMoveArr = [8.3,10,26.7,16.7,8.3,30];
			var leftWidth1,leftWidth2;//相邻章节模块前后移动的距离
            $('.toRight').click(function(){
                var box = $(this).parent().parent();  //获取按钮的父元素
                var index = box.index();
                var box_next=box.next();   //父元素的下一个同胞元素
                if(arrIndex < 6){
                    leftWidth1 = moveArr[index];
                    leftWidth2 = -moveArr[index+1];
                }else if(arrIndex < 9){
                    leftWidth1 = midMoveArr[index];
                    leftWidth2 = -midMoveArr[index+1];
                }else if(arrIndex == 9){
                    leftWidth1 = 16.66;
                    leftWidth2 = -16.66;
                }
                if(index != 5){
                    box.animate({'left':leftWidth2+'%'},function(){  
                        box.animate({'left': 0},5);  
                    }); 
                    box_next.animate({'left':leftWidth1+'%'},function(){  
                        box_next.animate({'left': 0},5);  
                    }); 
                    box.insertAfter(box_next);
                }
                var index1 = index+21;
                var index2 = index+22;
                // if(index != 5){
                //     location.href = 'chgCapterClass/index1/'+index1+'/index2/'+index2;
                // }
            })

            $('.toLeft').click(function(){
                var box=$(this).parent().parent();  //获取按钮的父元素
                var index = box.index();
                var box_prev=box.prev();   
                if (arrIndex < 6) {
                    leftWidth1 = moveArr[index-1];
                    leftWidth2 = -moveArr[index];
                }else if(arrIndex < 8){
                    leftWidth1 = midMoveArr[index-1];
                    leftWidth2 = -midMoveArr[index];
                }else if(arrIndex == 8){
                    leftWidth1 = 16.66;
                    leftWidth2 = -16.66;
                }
                if(index != 0){
                    box.animate({'left':leftWidth1+'%'},function(){
                        box.animate({'left': 0},5); 
                    });
                    box_prev.animate({'left':leftWidth2+'%'},function(){
                        box_prev.animate({'left': 0},5);
                    });
                    box.insertBefore(box_prev);
                }
                var index1 = index+21;
                var index2 = index+20;
                // if(index != 0){
                //     location.href = 'chgCapterClass/index1/'+index1+'/index2/'+index2;
                // }
            }) 

            $(".addCorrect").click(function(){
                var index = $(this).attr("classId");
                $(".mask").css('display','block');
                $(".addCorrectTable"+index).css('display','block');
            })
        },

        initWeekNum: function(){
            var weekNumHtml = '<div class="weekNum" >';
            for (var i = 0; i < 24; i++) {
                if (i == 12) {
                    weekNumHtml += '<span flag="0" flag1="0" class="selected" style="width:6.16%;font-size:1.6vw;">第'+(i+1)+'周</span>';                        
                }else{
                    weekNumHtml += '<span flag="0" flag1="0" style="width:4.08%;">' +(i+1)+ '</span>';       
                }
            } 
            weekNumHtml += '</div>';
            $(".weekNum").html(weekNumHtml);

            //定义setTimeout执行方法 ,将单击事件和双击事件分开
            var TimeFn = null; 
            //顶部绿色蒙层的双击事件
            $(".weekNum span,.topMask").dblclick(function(){
                // 取消上次延时未执行的方法
                clearTimeout(TimeFn); 
                //这里是双击事件的执行代码 
                var selectedWeekIndex = $('.weekNum span.selected').index();//有效周的index
                var initConWidth = 21.8;
                var bottomLeft;//计算课程主区域应该左移的距离
                if(selectedWeekIndex == 0){
                    bottomLeft = 0;
                    // alert($(".capterDetail li").length);//251
                }else if(selectedWeekIndex == 1){
                    bottomLeft = selectedWeekIndex*initConWidth/24-0.05;
                }else if(selectedWeekIndex == 2){
                    bottomLeft = selectedWeekIndex*initConWidth/24-0.08;
                }else if(selectedWeekIndex == 3){
                    bottomLeft = selectedWeekIndex*initConWidth/24-0.1;
                }else if(selectedWeekIndex == 4){
                    bottomLeft = selectedWeekIndex*initConWidth/24-0.02;
                }else if(selectedWeekIndex == 5){
                    bottomLeft = selectedWeekIndex*initConWidth/24-0.05;
                }else if(selectedWeekIndex == 6){
                    bottomLeft = selectedWeekIndex*initConWidth/24-0.08;
                }else if(selectedWeekIndex == 7){
                    bottomLeft = selectedWeekIndex*initConWidth/24-0.12;
                }else if(selectedWeekIndex == 8){
                    bottomLeft = selectedWeekIndex*initConWidth/24-0.05;
                }else if(selectedWeekIndex == 9){
                    bottomLeft = selectedWeekIndex*initConWidth/24-0.08;
                }else if(selectedWeekIndex == 10){
                    bottomLeft = selectedWeekIndex*initConWidth/24-0.11;
                }else if(selectedWeekIndex == 11){
                    bottomLeft = selectedWeekIndex*initConWidth/24-0.14;
                }else if(selectedWeekIndex == 12){
                    bottomLeft = selectedWeekIndex*initConWidth/24-0.06;
                }else if(selectedWeekIndex == 13){
                    bottomLeft = selectedWeekIndex*initConWidth/24-0.1;
                }else if(selectedWeekIndex == 14){
                    bottomLeft = selectedWeekIndex*initConWidth/24-0.12;
                }else if(selectedWeekIndex == 15){
                    bottomLeft = selectedWeekIndex*initConWidth/24-0.16;
                }else if(selectedWeekIndex == 16){
                    bottomLeft = selectedWeekIndex*initConWidth/24-0.08;
                }else if(selectedWeekIndex == 17){
                    bottomLeft = selectedWeekIndex*initConWidth/24-0.12;
                }else if(selectedWeekIndex == 18){
                    bottomLeft = selectedWeekIndex*initConWidth/24-0.14;
                }else if(selectedWeekIndex == 19){
                    bottomLeft = selectedWeekIndex*initConWidth/24-0.18;
                }else if(selectedWeekIndex == 20){
                    bottomLeft = selectedWeekIndex*initConWidth/24-0.1;
                }else if(selectedWeekIndex == 21){
                    bottomLeft = selectedWeekIndex*initConWidth/24-0.14;
                }else if(selectedWeekIndex == 22){
                    bottomLeft = selectedWeekIndex*initConWidth/24-0.18;
                }else if(selectedWeekIndex == 23){
                    bottomLeft = selectedWeekIndex*initConWidth/24-0.2;
                }else{
                   bottomLeft = selectedWeekIndex*initConWidth/24; 
                }
                bottomLeft = bottomLeft*screenWidth;
                $(".classCon").css('width',initConWidth*screenWidth+'px');
                $(".mainContent").animate({scrollLeft: bottomLeft+'px'},10);
                $(".topMask").css({'left':(6 + selectedWeekIndex*3.59)*screenWidth/100+'px','width':'5.544%'});
                arrIndex = 0;
                var flag1 = $('.weekNum span.selected').attr('flag1');
                var toRenderStartIndex = selectedWeekIndex * 5;//反选的天的起始下标
				//调整maskCapterTitle的显示
                $(".capterName").css('width','30%');
                if(flag1 == 0){

                    $(".toLeft").css({'position':'relative',
                                  'top':'3px',
                                  'height':'5vh',
                                  'width':'3%'});
                    $(".toRight").css({'position':'relative',
                                       'top':'3px',
                                       'height':'5vh',
                                       'width':'3%'});

                    $('.weekNum span.selected').attr('flag1',1);
                    $('.weekNum span.selected').css({'background':'#92D050','height':'8.5vh','margin':'0','line-height':'8.5vh'});
                    for (var i = toRenderStartIndex; i < toRenderStartIndex+5; i++) {
                        $(".capterDetail .classContent").eq(i).css("background","#BCE292");
                        $(".capterDetail .addOrDel.del").eq(i).css("background","#BCE292");
                        $(".capterDetail .classCategory").eq(i).css("background","#BCE292");
                        $(".capterDetail .addHomework").eq(i).css("background","#BCE292");
                        $(".capterDetail .addCorrect").eq(i).css("background","#BCE292");
                        $(".capterDetail .addDefect").eq(i).css("background","#BCE292");
                        $(".capterDetail .addTeamEvaluate").eq(i).css("background","#BCE292");
                        $(".capterDetail .addSuggest").eq(i).css("background","#BCE292");
                    }
                }else{

                    $(".toLeft").css({'position':'relative',
                                  'top':'0',
                                  'height':'5vh',
                                  'width':'3%'});
                    $(".toRight").css({'position':'relative',
                                       'top':'0',
                                       'height':'5vh',
                                       'width':'3%'});

                    $('.weekNum span.selected').attr('flag1',0);
                    $('.weekNum span.selected').css({'background':'#B97A57','height':'5.44vh','margin':'1.555vh 0','line-height':'5.44vh'});
                    for (var i = toRenderStartIndex; i < toRenderStartIndex+5; i++) {
                        $(".capterDetail .classContent").eq(i).css("background","#B97A57");
                        $(".capterDetail .addOrDel.del").eq(i).css("background","#B97A57");
                        $(".capterDetail .classCategory").eq(i).css("background","#B97A57");
                        $(".capterDetail .addHomework").eq(i).css("background","#B97A57");
                        $(".capterDetail .addCorrect").eq(i).css("background","#B97A57");
                        $(".capterDetail .addDefect").eq(i).css("background","#B97A57");
                        $(".capterDetail .addTeamEvaluate").eq(i).css("background","#B97A57");
                        $(".capterDetail .addSuggest").eq(i).css("background","#B97A57");
                    }
                }
                if ($('.weekDayNum').attr('flag') == 0) {
                    $('.maskCapterTitle').css('top','13.5vh');
                    $('.headInfo').css('height','13.5vh');
                    $('.weekDayNum').attr('flag',1).css('display','block');
                }else if($('.weekDayNum').attr('flag') == 1){
                    $('.maskCapterTitle').css('top','8.5vh');
                    $('.headInfo').css('height','8.5vh');
                    $('.weekDayNum').attr('flag',0).css('display','none');
                }
                //双击时置topMaskTitle的值
                if(selectedWeekIndex < 3){
                    $(".maskCapterTitle .capterName").html('29章<br>投影和视图').css('line-height','3.6vh');
                }else if(selectedWeekIndex < 4){
                    $(".maskCapterTitle .capterName").html('阶段性复习和结业考试').css('line-height','7.77vh');
                }else if(selectedWeekIndex < 9){
                    $(".maskCapterTitle .capterName").html('第一轮复习').css('line-height','7.77vh');
                }else if(selectedWeekIndex < 15){
                    $(".maskCapterTitle .capterName").html('第二轮复习').css('line-height','7.77vh');
                }else if(selectedWeekIndex < 18){
                    $(".maskCapterTitle .capterName").html('第三轮复习').css('line-height','7.77vh');
                }else{
		    $(".maskCapterTitle .capterName").html('保留章节').css('line-height','7.77vh');	
		}

                $('.weekNum span.selected').css('color','#000').siblings().css('color','#fff');
                $('.mainContent').css('background-position','0 4%');//下调横穿章节名称的底边线
                $(".classCategory").css({'width':'20%','margin':'-8% -7% 0'});
                $(".classContent").css({'width':'20%','margin':'0 -7%','padding-top':'14%'});
                $('.addHomework').css({'width':'33%','margin-left':'-13%'});
                $('.addCorrect').css({'width':'33%','margin-left':'-13%'});
                $('.addTeamEvaluate').css({'width':'33%','margin-left':'-13%'});
                $('.addSuggest').css({'width':'33%','margin-left':'-13%'});
                $('.addPaper').css({'width':'33%','margin-left':'-13%'});
                $('.addDefect').css({'width':'33%','margin-left':'-13%'});
                $('.addOrDel.add').css({'width':'20%','margin':'0 -7%'});
                $('.addOrDel.del').css({'width':'20%'});
                $(".capterTitle").css('visibility','hidden');
                $(".maskCapterTitle").css('display','block');
                //双击最大化只显示capterDetail的内容
                $(".capterDetail").css('display','block');
                $(".capterDetailKnowledge").css('display','none');
                $(".classSummary").css('display','none');
                $(".capterSummary").css('display','none');
                $(".capterDetail").css({'background-position':'29% 1.3%','background-size':'97% 2%'});
            })

            $(function(){  
                $( ".topMask" ).draggable({ axis: "x" });
                $( ".topMask" ).draggable({ containment: ".weekInfo", 
                                            scroll: false ,
                                            cursor: "pointer" });
                var _move=false;//是否移动标记  
                var _x,preLeft,afterLeft;//_x鼠标离控件左上角的相对位置,preLeft,afterLeft鼠标拖拽前和拖拽后顶部套筒的左边距
                var selectedWeekIndex = $('.weekNum span.selected').index();//有效周的index
                var selectedWeekDayIndex = $('.weekDayNum span[flag=1]').index();//有效的星期的index
                
                $(".topMask").click(function(){ //顶部蒙层的单击事件
                        clearTimeout(TimeFn); //执行延时 
                        TimeFn = setTimeout(function(){ 
                        //单击顶部蒙层执行的事件
                        var flag = $('.weekNum span.selected').attr('flag');
                        var toRenderStartIndex = selectedWeekIndex * 5;//反选的天的起始下标
                        if(flag == 0){
                            $('.weekNum span.selected').attr('flag',1);
                            $('.weekNum span').eq(selectedWeekIndex).css({'background':'#92D050','height':'8.5vh','margin':'0','line-height':'8.5vh'});
                            for (var i = toRenderStartIndex; i < toRenderStartIndex+5; i++) {
                                $(".capterDetail .classContent").eq(i).css("background","#BCE292");
                                $(".capterDetail .addOrDel.del").eq(i).css("background","#BCE292");
                                $(".capterDetail .classCategory").eq(i).css("background","#BCE292");
                                $(".capterDetail .addHomework").eq(i).css("background","#BCE292");
                                $(".capterDetail .addCorrect").eq(i).css("background","#BCE292");
                                $(".capterDetail .addDefect").eq(i).css("background","#BCE292");
                                $(".capterDetail .addTeamEvaluate").eq(i).css("background","#BCE292");
                                $(".capterDetail .addSuggest").eq(i).css("background","#BCE292");
                            }
                        }else{
                            $('.weekNum span.selected').attr('flag',0);
                            $('.weekNum span.selected').css({'background':'#B97A57','height':'5.44vh','margin':'1.555vh 0','line-height':'5.44vh'});
                            for (var i = toRenderStartIndex; i < toRenderStartIndex+5; i++) {
                                $(".capterDetail .classContent").eq(i).css("background","#B97A57");
                                $(".capterDetail .addOrDel.del").eq(i).css("background","#B97A57");
                                $(".capterDetail .classCategory").eq(i).css("background","#B97A57");
                                $(".capterDetail .addHomework").eq(i).css("background","#B97A57");
                                $(".capterDetail .addCorrect").eq(i).css("background","#B97A57");
                                $(".capterDetail .addDefect").eq(i).css("background","#B97A57");
                                $(".capterDetail .addTeamEvaluate").eq(i).css("background","#B97A57");
                                $(".capterDetail .addSuggest").eq(i).css("background","#B97A57");
                            }
                        }
                        //可添加重新定位的代码
                        },500); 
                    }).mousedown(function(e){  
                        // $(".topMask").attr('style','cursor:move');
                        _move=true;  
                        preLeft = parseInt($(".topMask").css("left"));
                        _x=e.pageX-preLeft; 
                    }).mousemove(function(e){  
                        var flag = $('.weekNum span.selected').attr('flag');
                        var toRenderStartIndex = selectedWeekIndex * 5;//反选的天的起始下标
                        if(_move){ 
                            //拖拽之前颜色背景先恢复至初始状态
                            $(".weekDayNum span").css("background","#92D050");
                            $('.weekNum span.selected').attr('flag',0);
                            $('.weekNum span.selected').css({'background':'#B97A57','height':'5.44vh','margin':'1.555vh 0','line-height':'5.44vh'});
                            for (var i = toRenderStartIndex; i < toRenderStartIndex+5; i++) {
                                $(".capterDetail .classContent").eq(i).css("background","#B97A57");
                                $(".capterDetail .addOrDel.del").eq(i).css("background","#B97A57");
                                $(".capterDetail .classCategory").eq(i).css({"background":"#B97A57","color":"#124934"});
                                $(".capterDetail .addHomework").eq(i).css({"background":"#B97A57","color":"#124934"});
                                $(".capterDetail .addCorrect").eq(i).css({"background":"#B97A57","color":"#124934"});
                                $(".capterDetail .addDefect").eq(i).css({"background":"#B97A57","color":"#124934"});
                                $(".capterDetail .addTeamEvaluate").eq(i).css({"background":"#B97A57","color":"#124934"});
                                $(".capterDetail .addSuggest").eq(i).css("background","#B97A57");
                            }
                            
                            if($('.weekDayNum').attr('flag') == 1){
                                $('.maskCapterTitle').css('top','8.5vh');
                                $('.headInfo').css('height','8.5vh');
                                $('.weekDayNum').attr('flag',0).css('display','none');
                            }
                            //确定字体被染黑的周次
                            var d;//黑色边缘距中心点的步数
                            if(arrIndex < 8){
                                d = Math.floor((arrIndex+1)/2);
                            }else if(arrIndex == 8){
                                d = 6;
                            }else{
                                d = 24;
                            }
                            var fromIndex = selectedWeekIndex - d;//黑色字体周次的起始索引
                            fromIndex = fromIndex<0 ? 0 : fromIndex;
                            var toIndex = selectedWeekIndex + d;//黑色字体周次的终止索引
                            toIndex = toIndex>23 ? 23 : toIndex;
                            $(".weekNum span").css("color","#fff");
                            for (var i = fromIndex; i < toIndex+1; i++) {
                                $(".weekNum span").eq(i).css("color","#000");//将被滑块覆盖的周次变黑
                            }

                            afterLeft=e.pageX-_x;//移动过后滑块的左边距  
                            var topMaskWh = parseInt($(".topMask").css('width')); //顶部套筒宽度
                            selectedWeekIndex = Math.floor(((afterLeft + topMaskWh/2)/screenWidth*100-6)/3.59);
                            var index1 = selectedWeekIndex + 1;
                            $(".weekNum span").eq(selectedWeekIndex).addClass("selected").siblings().removeClass("selected");
                            $(".weekNum span").eq(selectedWeekIndex).css({"width":"6.16%"}).siblings().css({"width":"4.08%"});
                            for (var i = 0; i < 24; i++) {
                                $(".weekNum span").eq(i).html(i+1);
                            }
                            $(".weekNum span").eq(selectedWeekIndex).html('第'+index1+'周');
                            //拖拽时置maskCapterTitle的值
                            if (arrIndex==0 || arrIndex==1) {
                                if(selectedWeekIndex < 3){
                                    $(".maskCapterTitle .capterName").html('29章<br>投影和视图').css('line-height','3.6vh');
                                }else if(selectedWeekIndex < 4){
                                    $(".maskCapterTitle .capterName").html('阶段性复习和结业考试').css('line-height','7.77vh');
                                }else if(selectedWeekIndex < 9){
                                    $(".maskCapterTitle .capterName").html('第一轮复习').css('line-height','7.77vh');
                                }else if(selectedWeekIndex < 15){
                                    $(".maskCapterTitle .capterName").html('第二轮复习').css('line-height','7.77vh');
                                }else if(selectedWeekIndex < 18){
                                    $(".maskCapterTitle .capterName").html('第三轮复习').css('line-height','7.77vh');
                                }else{
                				    $(".maskCapterTitle .capterName").html('保留章节').css('line-height','7.77vh');	
                				}
                            }
                            var classConWidth = parseInt($(".classCon").css("width"));
                            //计算课程主区域应该左移的距离
                            var bottomLeft = ((afterLeft+selectedWeekIndex*0.8976)*100/screenWidth - 6)*classConWidth/88;
                            $(".mainContent").animate({scrollLeft: bottomLeft+'px'},10);
                        }  
                    }).mouseup(function(){  
                        // $(".topMask").attr('style','cursor:pointer'); 
                        _move=false;  
                    });  
            });


        
            $('.mainContent').mousewheel(function(event,delta){
                event.stopPropagation();
                var index = $(".weekNum .selected").index(),
                index1 = index + 1,
                len = $(".weekNum span").length;
                if (delta > 0) {
                    arrIndex--;
                }else if(delta < 0){
                    arrIndex++;
                }
                arrIndex = arrIndex<0?0:arrIndex;
                arrIndex = arrIndex>9?9:arrIndex;
                var animateTime = 100;
                var selectedWeekIndex = $('.weekNum span.selected').index();//有效周的index
                //确定字体被染黑的周次
                var d;//黑色边缘距中心点的步数
                if(arrIndex < 8){
                    d = Math.floor((arrIndex+1)/2);
                }else if(arrIndex == 8){
                    d = 6;
                }else{
                    d = 24;
                }
                var fromIndex = selectedWeekIndex - d;//黑色字体周次的起始索引
                fromIndex = fromIndex<0 ? 0 : fromIndex;
                var toIndex = selectedWeekIndex + d;//黑色字体周次的终止索引
                toIndex = toIndex>23 ? 23 : toIndex;
                $(".weekNum span").css("color","#fff");
                for (var i = fromIndex; i < toIndex+1; i++) {
                    $(".weekNum span").eq(i).css("color","#000");
                }
                var bottomWidthArr = [24*screenWidth,12*screenWidth,8*screenWidth,6*screenWidth,4.8*screenWidth,
                                      4*screenWidth,4*screenWidth,3*screenWidth,2*screenWidth,screenWidth];
                var toWidth = bottomWidthArr[arrIndex]; //鼠标滚动后，底部所有课程的宽度
                toWidth = toWidth>bottomWidthArr[0] ? bottomWidthArr[0] : toWidth;
                toWidth = toWidth<bottomWidthArr[9] ? bottomWidthArr[9] : toWidth;
                function getGapCount(ind){
                    if(ind <4){
                        return 0;
                    }else if(ind <5){
                        return 1;
                    }else if(ind <9){
                        return 2;
                    }else if(ind <15){
                        return 3;
                    }else if(ind <18){
                        return 4;
                    }else{
		    	return 5;
		    }
                }
                bottomLeftWd = (selectedWeekIndex-0.5*arrIndex-Math.floor(getGapCount(selectedWeekIndex)/4)*0.025)*bottomWidthArr[arrIndex]/17;//底部所有课程的左滑距离
                //Math.floor(index/4)*0.025是清除章节之间的margin；0.5*arrIndex是测试得出，确定左移的准确距离
                $('.classCon').animate({'width':toWidth+'px'},animateTime);
                $(".mainContent").animate({scrollLeft: bottomLeftWd+'px'},10);

                var topWidthArr = [5.42*screenWidth,9.01*screenWidth,12.6*screenWidth,16.2*screenWidth,19.788*screenWidth,
                                   23.372*screenWidth,23.372*screenWidth,30.553*screenWidth,45.2*screenWidth,88*screenWidth];
                var toWidth1 = topWidthArr[arrIndex]/100;//鼠标滚动后，顶部套筒的宽度
                toWidth1 = toWidth1>topWidthArr[9]/100 ? topWidthArr[9]/100 : toWidth1;//==========
                toWidth1 = toWidth1<=topWidthArr[0]/100 ? topWidthArr[0]/100 : toWidth1;
                $('.topMask').animate({'width':toWidth1+'px'},animateTime);
                var fadeTime = 100; //合并同类项前后的切换时间
                if(arrIndex == 9){
                    $('.capterTitle .shengzi').css({'display':'inline-block','margin-top':'-5%'});
                }else if(arrIndex == 8){
                    $('.capterTitle .shengzi').css({'display':'inline-block','margin-top':'-3%'});
                }else{
                    $('.capterTitle .shengzi').css({'display':'inline-block','margin-top':'-2%'});
                }

                if(arrIndex == 0 || arrIndex == 1){
                    $(".capterTitle").css('visibility','hidden');
                    $(".maskCapterTitle").css('display','block');
                }else{
                    $(".capterTitle").css('visibility','visible');
                    $(".maskCapterTitle").css('display','none');
                }

                if(arrIndex < 6){
                    $(".capterDetail").fadeIn(fadeTime);
                    $(".capterDetailKnowledge").fadeOut(fadeTime);
                    $(".classSummary").fadeOut(fadeTime);
                    $(".capterSummary").fadeOut(fadeTime);
                }else if(arrIndex < 9){
                    $(".capterDetail").fadeOut(fadeTime);
                    $(".capterDetailKnowledge").fadeIn(fadeTime);
                    $(".classSummary").fadeOut(fadeTime);
                    $(".capterSummary").fadeOut(fadeTime);
                }else if(arrIndex == 9){
                    $(".capterTitle").fadeIn(fadeTime);
                    $(".capterDetail").fadeOut(fadeTime);
                    $(".capterDetailKnowledge").fadeOut(fadeTime);
                    $(".classSummary").fadeIn(fadeTime);
                    $(".capterSummary").fadeOut(fadeTime);
                }else{
                    $(".capterTitle").fadeOut(fadeTime);
                    $(".capterDetail").fadeOut(fadeTime);
                    $(".capterDetailKnowledge").fadeOut(fadeTime);
                    $(".classSummary").fadeOut(fadeTime);
                    $(".capterSummary").fadeIn(fadeTime);
                }

                if(arrIndex < 6){
                    $('.capter.t32h').css('width','7.5%');
                    $('.capter.t33h').css('width','5%');
                    $('.capter.t34h').css('width','20%');
                    $('.capter.t35h').css('width','27.5%');
                    $('.capter.t36h').css('width','10.83%');
		            $('.capter.t37h').css('width','29.17%');
                }else if(arrIndex < 8){
                    $('.capter.t32h').css('width','8.3%');
                    $('.capter.t33h').css('width','10%');
                    $('.capter.t34h').css('width','26.7%');
                    $('.capter.t35h').css('width','16.7%');
                    $('.capter.t36h').css('width','8.3%');
		            $('.capter.t37h').css('width','30%');
                }else if(arrIndex == 8){
                    $('.capter.t32h').css('width','16.66%');
                    $('.capter.t33h').css('width','16.66%');
                    $('.capter.t34h').css('width','16.66%');
                    $('.capter.t35h').css('width','16.66%');
                    $('.capter.t36h').css('width','16.66%');
                    $('.capter.t37h').css('width','16.66%');
                }

                //调整箭头宽度
                $('.capterTitle .toLeft,.capterTitle .toRight').css({'position':'relative','top':0});
                if(arrIndex == 9){
                    $(".capterName").css('width','55%');
                    $(".toLeft").css({'position':'relative',
                                      'margin-left':'4%',
                                      'margin-right':'6%',
                                      'top':'0.6vh',
                                      'height':'3.4vh',
                                      'width':'11%'});
                    $(".toRight").css({'position':'relative',
                                       'margin-left':'6%',
                                       'margin-right':'0',
                                       'top':'0.6vh',
                                       'height':'3.4vh',
                                       'width':'11%'});
                }else if(arrIndex == 8){
                    $(".capterName").css('width','35%');
                    $(".capter.t32h .capterTitle .toLeft").css({'margin-left':'22%',
                                                                'margin-right':'3%',
                                                                'top':'3%',
                                                                'height':'4vh',
                                                                'width':'7%'});
                    $(".capter.t32h .capterTitle .toRight").css({'margin-left':'3%',
                                                                 'margin-right':'0',
                                                                 'top':'3%',
                                                                 'height':'4vh',
                                                                 'width':'7%'});
                    $(".capter.t33h .capterTitle .capterName").css('width','27%');
                    $(".capter.t33h .capterTitle .toLeft").css({'margin-left':'26%',
                                                                'margin-right':'3%',
                                                                'top':'3%',
                                                                'height':'4vh',
                                                                'width':'7%'});
                    $(".capter.t33h .capterTitle .toRight").css({'margin-left':'3%',
                                                                'margin-right':'0',
                                                                'top':'3%',
                                                                'height':'4vh',
                                                                'width':'7%'});
                    $(".capter.t34h .capterTitle .toLeft").css({'margin-left':'21.5%',
                                                                'margin-right':'3%',
                                                                'top':'3%',
                                                                'height':'4vh',
                                                                'width':'7%'});
                    $(".capter.t34h .capterTitle .toRight").css({'margin-left':'3%',
                                                                'margin-right':'0',
                                                                'top':'3%',
                                                                'height':'4vh',
                                                                'width':'7%'});
                    $(".capter.t35h .capterTitle .toLeft").css({'margin-left':'22.8%',
                                                                'margin-right':'3%',
                                                                'top':'3%',
                                                                'height':'4vh',
                                                                'width':'6%'});
                    $(".capter.t35h .capterTitle .toRight").css({'margin-left':'3%',
                                                                'margin-right':'0',
                                                                'top':'3%',
                                                                'height':'4vh',
                                                                'width':'6%'});
                    $(".capter.t36h .capterTitle .toLeft").css({'margin-left':'23%',
                                                                'margin-right':'3%',
                                                                'top':'3%',
                                                                'height':'4vh',
                                                                'width':'6%'});
                    $(".capter.t36h .capterTitle .toRight").css({'margin-left':'3%',
                                                                'margin-right':'0',
                                                                'top':'3%',
                                                                'height':'4vh',
                                                                'width':'6%'});
                    $(".capter.t37h .capterTitle .toLeft").css({'margin-left':'22.5%',
                                                                'margin-right':'3%',
                                                                'top':'3%',
                                                                'height':'4vh',
                                                                'width':'6%'});
                    $(".capter.t37h .capterTitle .toRight").css({'margin-left':'3%',
                                                                 'margin-right':'0',
                                                                 'top':'3%',
                                                                 'height':'4vh',
                                                                 'width':'6%'});
                }else if(arrIndex == 7){
                    $(".capterName").css('width','35%');
                    $(".capter.t32h .capterTitle .toLeft").css({'margin-left':'20%',
                                                                'margin-right':'3%',
                                                                'top':'3%',
                                                                'height':'4vh',
                                                                'width':'9%'});
                    $(".capter.t32h .capterTitle .toRight").css({'margin-left':'3%',
                                                                 'margin-right':'0',
                                                                 'top':'3%',
                                                                 'height':'4vh',
                                                                 'width':'9%'});
                    $(".capter.t33h .capterTitle .capterName").css('width','45%');
                    $(".capter.t33h .capterTitle .toLeft").css({'margin-left':'16%',
                                                                'margin-right':'3%',
                                                                'top':'3%',
                                                                'height':'4vh',
                                                                'width':'8%'});
                    $(".capter.t33h .capterTitle .toRight").css({'margin-left':'3%',
                                                                'margin-right':'0',
                                                                'top':'3%',
                                                                'height':'4vh',
                                                                'width':'8%'});
                    $(".capter.t34h .capterTitle .toLeft").css({'margin-left':'25.5%',
                                                                'margin-right':'3%',
                                                                'top':'6%',
                                                                'height':'4vh',
                                                                'width':'3%'});
                    $(".capter.t34h .capterTitle .toRight").css({'margin-left':'3%',
                                                                'margin-right':'0',
                                                                'top':'6%',
                                                                'height':'4vh',
                                                                'width':'3%'});
                    $(".capter.t35h .capterTitle .toLeft").css({'margin-left':'23.8%',
                                                                'margin-right':'3%',
                                                                'top':'4%',
                                                                'height':'4vh',
                                                                'width':'5%'});
                    $(".capter.t35h .capterTitle .toRight").css({'margin-left':'3%',
                                                                'margin-right':'0',
                                                                'top':'4%',
                                                                'height':'4vh',
                                                                'width':'5%'});
                    $(".capter.t36h .capterTitle .toLeft").css({'margin-left':'20%',
                                                                'margin-right':'3%',
                                                                'top':'3%',
                                                                'height':'4vh',
                                                                'width':'9%'});
                    $(".capter.t36h .capterTitle .toRight").css({'margin-left':'3%',
                                                                'margin-right':'0',
                                                                'top':'3%',
                                                                'height':'4vh',
                                                                'width':'9%'});
                    $(".capter.t37h .capterTitle .toLeft").css({'margin-left':'25%',
                                                                'margin-right':'3%',
                                                                'top':'5%',
                                                                'height':'4vh',
                                                                'width':'3%'});
                    $(".capter.t37h .capterTitle .toRight").css({'margin-left':'3%',
                                                                 'margin-right':'0',
                                                                 'top':'5%',
                                                                 'height':'4vh',
                                                                 'width':'3%'});  
                }else if(arrIndex == 6){
                    $(".capterName").css('width','35%');
                    $(".capter.t32h .capterTitle .toLeft").css({'margin-left':'22%',
                                                                'margin-right':'3%',
                                                                'top':'3%',
                                                                'height':'4vh',
                                                                'width':'7%'});
                    $(".capter.t32h .capterTitle .toRight").css({'margin-left':'3%',
                                                                 'margin-right':'0',
                                                                 'top':'3%',
                                                                 'height':'4vh',
                                                                 'width':'7%'});
                    $(".capter.t33h .capterTitle .capterName").css('width','45%');
                    $(".capter.t33h .capterTitle .toLeft").css({'margin-left':'18%',
                                                                'margin-right':'3%',
                                                                'top':'5%',
                                                                'height':'4vh',
                                                                'width':'6%'});
                    $(".capter.t33h .capterTitle .toRight").css({'margin-left':'3%',
                                                                'margin-right':'0',
                                                                'top':'5%',
                                                                'height':'4vh',
                                                                'width':'6%'});
                    $(".capter.t34h .capterTitle .toLeft").css({'margin-left':'25.5%',
                                                                'margin-right':'3%',
                                                                'top':'7%',
                                                                'height':'4vh',
                                                                'width':'2.5%'});
                    $(".capter.t34h .capterTitle .toRight").css({'margin-left':'3%',
                                                                'margin-right':'0',
                                                                'top':'7%',
                                                                'height':'4vh',
                                                                'width':'2.5%'});
                    $(".capter.t35h .capterTitle .toLeft").css({'margin-left':'24.8%',
                                                                'margin-right':'3%',
                                                                'top':'5%',
                                                                'height':'4vh',
                                                                'width':'4%'});
                    $(".capter.t35h .capterTitle .toRight").css({'margin-left':'3%',
                                                                'margin-right':'0',
                                                                'top':'5%',
                                                                'height':'4vh',
                                                                'width':'4%'});
                    $(".capter.t36h .capterTitle .toLeft").css({'margin-left':'22%',
                                                                'margin-right':'3%',
                                                                'top':'5%',
                                                                'height':'4vh',
                                                                'width':'7%'});
                    $(".capter.t36h .capterTitle .toRight").css({'margin-left':'3%',
                                                                'margin-right':'0',
                                                                'top':'5%',
                                                                'height':'4vh',
                                                                'width':'7%'});
                    $(".capter.t37h .capterTitle .toLeft").css({'margin-left':'26%',
                                                                'margin-right':'3%',
                                                                'top':'6%',
                                                                'height':'4vh',
                                                                'width':'2%'});
                    $(".capter.t37h .capterTitle .toRight").css({'margin-left':'3%',
                                                                 'margin-right':'0',
                                                                 'top':'6%',
                                                                 'height':'4vh',
                                                                 'width':'2%'});        
                }else if(arrIndex == 5){
                    $(".capterName").css('width','35%');
                    $(".capter.t32h .capterTitle .toLeft").css({'margin-left':'22%',
                                                                'margin-right':'3%',
                                                                'top':'3%',
                                                                'height':'4vh',
                                                                'width':'7%'});
                    $(".capter.t32h .capterTitle .toRight").css({'margin-left':'3%',
                                                                 'margin-right':'0',
                                                                 'top':'3%',
                                                                 'height':'4vh',
                                                                 'width':'7%'});
                    $(".capter.t33h .capterTitle .capterName").css('width','45%');
                    $(".capter.t33h .capterTitle .toLeft").css({'margin-left':'13%',
                                                                'margin-right':'3%',
                                                                'top':'3%',
                                                                'height':'4vh',
                                                                'width':'11%'});
                    $(".capter.t33h .capterTitle .toRight").css({'margin-left':'3%',
                                                                'margin-right':'0',
                                                                'top':'3%',
                                                                'height':'4vh',
                                                                'width':'11%'});
                    $(".capter.t34h .capterTitle .toLeft").css({'margin-left':'25.5%',
                                                                'margin-right':'3%',
                                                                'top':'3%',
                                                                'height':'4vh',
                                                                'width':'2.5%'});
                    $(".capter.t34h .capterTitle .toRight").css({'margin-left':'3%',
                                                                'margin-right':'0',
                                                                'top':'3%',
                                                                'height':'4vh',
                                                                'width':'2.5%'});
                    $(".capter.t35h .capterTitle .toLeft").css({'margin-left':'26.8%',
                                                                'margin-right':'3%',
                                                                'top':'6%',
                                                                'height':'4vh',
                                                                'width':'2%'});
                    $(".capter.t35h .capterTitle .toRight").css({'margin-left':'3%',
                                                                'margin-right':'0',
                                                                'top':'6%',
                                                                'height':'4vh',
                                                                'width':'2%'});
                    $(".capter.t36h .capterTitle .toLeft").css({'margin-left':'23%',
                                                                'margin-right':'3%',
                                                                'top':'4%',
                                                                'height':'4vh',
                                                                'width':'5%'});
                    $(".capter.t36h .capterTitle .toRight").css({'margin-left':'3%',
                                                                'margin-right':'0',
                                                                'top':'4%',
                                                                'height':'4vh',
                                                                'width':'5%'});
                    $(".capter.t37h .capterTitle .toLeft").css({'margin-left':'26%',
                                                                'margin-right':'3%',
                                                                'top':'6%',
                                                                'height':'4vh',
                                                                'width':'2%'});
                    $(".capter.t37h .capterTitle .toRight").css({'margin-left':'3%',
                                                                 'margin-right':'0',
                                                                 'top':'6%',
                                                                 'height':'4vh',
                                                                 'width':'2%'});
                }else if(arrIndex == 4){
                    $(".capterName").css('width','35%');
                    $(".capter.t32h .capterTitle .toLeft").css({'margin-left':'25%',
                                                                'margin-right':'3%',
                                                                'top':'0',
                                                                'height':'5vh',
                                                                'width':'6%'});
                    $(".capter.t32h .capterTitle .toRight").css({'margin-left':'3%',
                                                                 'margin-right':'0',
                                                                 'top':'0',
                                                                 'height':'5vh',
                                                                 'width':'6%'});
                    $(".capter.t33h .capterTitle .capterName").css('width','40%');
                    $(".capter.t33h .capterTitle .toLeft").css({'margin-left':'17%',
                                                                'margin-right':'3%',
                                                                'top':'0',
                                                                'height':'5vh',
                                                                'width':'9%'});
                    $(".capter.t33h .capterTitle .toRight").css({'margin-left':'3%',
                                                                'margin-right':'0',
                                                                'top':'0',
                                                                'height':'5vh',
                                                                'width':'9%'});
                    $(".capter.t34h .capterTitle .toLeft").css({'margin-left':'26.5%',
                                                                'margin-right':'3%',
                                                                'top':'0',
                                                                'height':'5vh',
                                                                'width':'2.5%'});
                    $(".capter.t34h .capterTitle .toRight").css({'margin-left':'3%',
                                                                'margin-right':'0',
                                                                'top':'0',
                                                                'height':'5vh',
                                                                'width':'2.5%'});
                    $(".capter.t35h .capterTitle .toLeft").css({'margin-left':'26.8%',
                                                                'margin-right':'3%',
                                                                'top':'2%',
                                                                'height':'5vh',
                                                                'width':'1.8%'});
                    $(".capter.t35h .capterTitle .toRight").css({'margin-left':'3%',
                                                                'margin-right':'0',
                                                                'top':'2%',
                                                                'height':'5vh',
                                                                'width':'1.8%'});
                    $(".capter.t36h .capterTitle .toLeft").css({'margin-left':'23%',
                                                                'margin-right':'3%',
                                                                'top':'0',
                                                                'height':'5vh',
                                                                'width':'5%'});
                    $(".capter.t36h .capterTitle .toRight").css({'margin-left':'3%',
                                                                'margin-right':'0',
                                                                'top':'0',
                                                                'height':'5vh',
                                                                'width':'5%'});
                    $(".capter.t37h .capterTitle .toLeft").css({'margin-left':'27%',
                                                                'margin-right':'3%',
                                                                'top':'0',
                                                                'height':'5vh',
                                                                'width':'2%'});
                    $(".capter.t37h .capterTitle .toRight").css({'margin-left':'3%',
                                                                'margin-right':'0',
                                                                'top':'0',
                                                                'height':'5vh',
                                                                'width':'2%'});
                }else if(arrIndex == 3){
                    $(".capterName").css('width','35%');
                    $(".capter.t32h .capterTitle .toLeft").css({'margin-left':'25%',
                                                                'margin-right':'3%',
                                                                'top':'0',
                                                                'height':'5vh',
                                                                'width':'6%'});
                    $(".capter.t32h .capterTitle .toRight").css({'margin-left':'3%',
                                                                 'margin-right':'0',
                                                                 'top':'0',
                                                                 'height':'5vh',
                                                                 'width':'6%'});
                    $(".capter.t33h .capterTitle .capterName").css('width','32%');
                    $(".capter.t33h .capterTitle .toLeft").css({'margin-left':'22%',
                                                                'margin-right':'3%',
                                                                'top':'0',
                                                                'height':'5vh',
                                                                'width':'9%'});
                    $(".capter.t33h .capterTitle .toRight").css({'margin-left':'3%',
                                                                'margin-right':'0',
                                                                'top':'0',
                                                                'height':'5vh',
                                                                'width':'9%'});
                    $(".capter.t34h .capterTitle .toLeft").css({'margin-left':'28.5%',
                                                                'margin-right':'3%',
                                                                'top':'0',
                                                                'height':'5vh',
                                                                'width':'2.5%'});
                    $(".capter.t34h .capterTitle .toRight").css({'margin-left':'3%',
                                                                'margin-right':'0',
                                                                'top':'0',
                                                                'height':'5vh',
                                                                'width':'2.5%'});
                    $(".capter.t35h .capterTitle .toLeft").css({'margin-left':'28.8%',
                                                                'margin-right':'3%',
                                                                'top':'2%',
                                                                'height':'5vh',
                                                                'width':'1.8%'});
                    $(".capter.t35h .capterTitle .toRight").css({'margin-left':'3%',
                                                                'margin-right':'0',
                                                                'top':'2%',
                                                                'height':'5vh',
                                                                'width':'1.8%'});
                    $(".capter.t36h .capterTitle .toLeft").css({'margin-left':'26%',
                                                                'margin-right':'3%',
                                                                'top':'0',
                                                                'height':'5vh',
                                                                'width':'5%'});
                    $(".capter.t36h .capterTitle .toRight").css({'margin-left':'3%',
                                                                'margin-right':'0',
                                                                'top':'0',
                                                                'height':'5vh',
                                                                'width':'5%'});
                    $(".capter.t37h .capterTitle .toLeft").css({'margin-left':'30%',
                                                                'margin-right':'3%',
                                                                'top':'2%',
                                                                'height':'5vh',
                                                                'width':'1.5%'});
                    $(".capter.t37h .capterTitle .toRight").css({'margin-left':'3%',
                                                                'margin-right':'0',
                                                                'top':'2%',
                                                                'height':'5vh',
                                                                'width':'1.5%'});
                }else if(arrIndex == 2){
                    $(".capterName").css('width','30%');
                    $(".capter.t36h .capterTitle .toLeft").css({'margin-left':'26%',
                                                                'margin-right':'3%',
                                                                'top':'0',
                                                                'height':'5vh',
                                                                'width':'5%'
                                                            });
                    $(".capter.t36h .capterTitle .toRight").css({'margin-left':'3%',
                                                                 'margin-right':'0',
                                                                 'top':'0',
                                                                 'height':'5vh',
                                                                 'width':'5%'
                                                            });
                    $(".capter.t33h .capterTitle .toLeft").css({'margin-left':'24%',
                                                                'margin-right':'3%',
                                                                'top':'0',
                                                                'height':'5vh',
                                                                'width':'7%'});
                    $(".capter.t33h .capterTitle .toRight").css({'margin-left':'3%',
                                                                 'margin-right':'0',
                                                                 'top':'0',
                                                                 'height':'5vh',
                                                                 'width':'7%'});
                    $(".capter.t34h .capterTitle .toLeft").css({'margin-left':'29%',
                                                                'margin-right':'3%',
                                                                'top':'2%',
                                                                'height':'5vh',
                                                                'width':'2%'});
                    $(".capter.t34h .capterTitle .toRight").css({'margin-left':'3%',
                                                                 'margin-right':'0',
                                                                 'top':'2%',
                                                                 'height':'5vh',
                                                                 'width':'2%'});
                    $(".capter.t35h .capterTitle .toLeft").css({'margin-left':'30%',
                                                                'margin-right':'3%',
                                                                'top':'4%',
                                                                'height':'5vh',
                                                                'width':'1.6%'});
                    $(".capter.t35h .capterTitle .toRight").css({'margin-left':'3%',
                                                                'margin-right':'0',
                                                                'top':'4%',
                                                                'height':'5vh',
                                                                'width':'1.6%'});
                    $(".capter.t36h .capterTitle .toLeft").css({'margin-left':'28%',
                                                                'margin-right':'3%',
                                                                'top':'0',
                                                                'height':'5vh',
                                                                'width':'3%'});
                    $(".capter.t36h .capterTitle .toRight").css({'margin-left':'3%',
                                                                'margin-right':'0',
                                                                'top':'0',
                                                                'height':'5vh',
                                                                'width':'3%'});
                    $(".capter.t37h .capterTitle .toLeft").css({'margin-left':'30%',
                                                                'margin-right':'3%',
                                                                'top':'4%',
                                                                'height':'5vh',
                                                                'width':'1.5%'});
                    $(".capter.t37h .capterTitle .toRight").css({'margin-left':'3%',
                                                                'margin-right':'0',
                                                                'top':'4%',
                                                                'height':'5vh',
                                                                'width':'1.5%'});
                }else if(arrIndex == 0 || arrIndex == 1){
                    $(".toLeft").css({  'margin-left':'28%',
                                        'margin-right':'3%',
                                        // 'top':'1.1%',
                                        'height':'5vh',
                                        'width':'3%'});
                    $(".toRight").css({'margin-left':'3%',
                                        'margin-right':'0',
                                        // 'top':'1.1%',
                                        'height':'5vh',
                                        'width':'3%'});
                }
                //调整悬挂课程的横线的长度和位置
                if(arrIndex == 0){
                    $(".capter.t32h .capterDetail").css({'background-position':'29% 1.3%','background-size':'93% 2%'});
                    $(".capter.t33h .capterDetail").css({'background-position':'29% 1.3%','background-size':'90% 2%'});
                    $(".capter.t34h .capterDetail").css({'background-position':'27% 1.3%','background-size':'97% 2%'});
                    $(".capter.t35h .capterDetail").css({'background-position':'29% 1.3%','background-size':'98% 2%'});
                    $(".capter.t36h .capterDetail").css({'background-position':'29% 1.3%','background-size':'95% 2%'});
		            $(".capter.t37h .capterDetail").css({'background-position':'24% 1.3%','background-size':'98% 2%'});
                }else if(arrIndex == 1){
                    $(".capter.t32h .capterDetail").css({'background-position':'40% 1.3%','background-size':'92% 2%'});
                    $(".capter.t33h .capterDetail").css({'background-position':'40% 1.3%','background-size':'88% 2%'});
                    $(".capter.t34h .capterDetail").css({'background-position':'40% 1.3%','background-size':'97% 2%'});
                    $(".capter.t35h .capterDetail").css({'background-position':'43% 1.3%','background-size':'95% 2%'});
                    $(".capter.t37h .capterDetail").css({'background-position':'40% 1.3%','background-size':'98% 2%'});
                    $(".capter.t36h .capterDetail").css({'background-position':'43% 1.3%','background-size':'95% 2%'});
                    $(".capter.t37h .capterDetail").css({'background-position':'40% 1.3%','background-size':'98% 2%'});
                }else if(arrIndex == 2){
                    $(".capter.t32h .capterDetail").css({'background-position':'52% 1.3%','background-size':'91% 2%'});
                    $(".capter.t33h .capterDetail").css({'background-position':'52% 1.3%','background-size':'86% 2%'});
                    $(".capter.t34h .capterDetail").css({'background-position':'50% 1.3%','background-size':'96% 2%'});
                    $(".capter.t35h .capterDetail").css({'background-position':'50% 1.3%','background-size':'97% 2%'});
                    $(".capter.t36h .capterDetail").css({'background-position':'50% 1.3%','background-size':'93% 2%'});
                    $(".capter.t37h .capterDetail").css({'background-position':'50% 1.3%','background-size':'97% 2%'});
                }else if (arrIndex == 3){
                    $(".capter.t32h .capterDetail").css({'background-position':'58% 1.3%','background-size':'89% 2%'});
                    $(".capter.t33h .capterDetail").css({'background-position':'59% 1.3%','background-size':'83% 2%'});
                    $(".capter.t34h .capterDetail").css({'background-position':'58% 1.3%','background-size':'95% 2%'});
                    $(".capter.t35h .capterDetail").css({'background-position':'60% 1.3%','background-size':'96% 2%'});
                    $(".capter.t36h .capterDetail").css({'background-position':'58% 1.3%','background-size':'92% 2%'});
                    $(".capter.t37h .capterDetail").css({'background-position':'57% 1.3%','background-size':'97% 2%'});
                }
                else if(arrIndex == 4 ){
                    $(".capter.t32h .capterDetail").css({'background-position':'60% 1.3%','background-size':'86% 2%'});
                    $(".capter.t33h .capterDetail").css({'background-position':'59% 1.3%','background-size':'79% 2%'});
                    $(".capter.t34h .capterDetail").css({'background-position':'58% 1.3%','background-size':'95% 2%'});
                    $(".capter.t35h .capterDetail").css({'background-position':'60% 1.3%','background-size':'96% 2%'});
                    $(".capter.t36h .capterDetail").css({'background-position':'58% 1.3%','background-size':'90% 2%'});
                    $(".capter.t37h .capterDetail").css({'background-position':'57% 1.3%','background-size':'96% 2%'});
                }else if (arrIndex == 5){
                    $(".capter.t32h .capterDetail").css({'background-position':'60% 1.3%','background-size':'83% 2%'});
                    $(".capter.t33h .capterDetail").css({'background-position':'59% 1.3%','background-size':'75% 2%'});
                    $(".capter.t34h .capterDetail").css({'background-position':'58% 1.3%','background-size':'92% 2%'});
                    $(".capter.t35h .capterDetail").css({'background-position':'64% 1.3%','background-size':'96% 2%'});
                    $(".capter.t36h .capterDetail").css({'background-position':'58% 1.3%','background-size':'88% 2%'});
                    $(".capter.t37h .capterDetail").css({'background-position':'60% 1.3%','background-size':'96% 2%'});
                }
                else if(arrIndex < 9){
                   if (arrIndex ==6){
                        $(".capter.t32h .capterDetailKnowledge").css({'background-position':'56% 1.3%','background-size':'81% 2%'});
                        $(".capter.t33h .capterDetailKnowledge").css({'background-position':'56% 1.3%','background-size':'83% 2%'});
                        $(".capter.t34h .capterDetailKnowledge").css({'background-position':'56% 1.3%','background-size':'94% 2%'});
                        $(".capter.t35h .capterDetailKnowledge").css({'background-position':'56% 1.3%','background-size':'90% 2%'});
                        $(".capter.t36h .capterDetailKnowledge").css({'background-position':'56% 1.3%','background-size':'81% 2%'});
                        $(".capter.t37h .capterDetailKnowledge").css({'background-position':'56% 1.3%','background-size':'95% 2%'});
                    }else if (arrIndex == 7){
                        $(".capter.t32h .capterDetailKnowledge").css({'background-position':'65% 1.3%','background-size':'82% 2%'});
                        $(".capter.t33h .capterDetailKnowledge").css({'background-position':'59% 1.3%','background-size':'75% 2%'});
                        $(".capter.t34h .capterDetailKnowledge").css({'background-position':'58% 1.3%','background-size':'93% 2%'});
                        $(".capter.t35h .capterDetailKnowledge").css({'background-position':'64% 1.3%','background-size':'91% 2%'});
                        $(".capter.t36h .capterDetailKnowledge").css({'background-position':'67% 1.3%','background-size':'83% 2%'});
                        $(".capter.t37h .capterDetailKnowledge").css({'background-position':'63% 1.3%','background-size':'95% 2%'});
                    }else{
                        $(".capter.t32h .capterDetailKnowledge").css({'background-position':'60% 1.3%','background-size':'83% 2%'});
                        $(".capter.t33h .capterDetailKnowledge").css({'background-position':'59% 1.3%','background-size':'83% 2%'});
                        $(".capter.t34h .capterDetailKnowledge").css({'background-position':'58% 1.3%','background-size':'85% 2%'});
                        $(".capter.t35h .capterDetailKnowledge").css({'background-position':'64% 1.3%','background-size':'85% 2%'});
                        $(".capter.t36h .capterDetailKnowledge").css({'background-position':'58% 1.3%','background-size':'85% 2%'});
                        $(".capter.t37h .capterDetailKnowledge").css({'background-position':'60% 1.3%','background-size':'85% 2%'});
                    }
                }else{
                     $(".capterDetailKnowledge").css({'background-position':'45% 1.3%','background-size':'68.5% 2%'});
                }
                var toTopLeft;//收缩后顶部套筒左边距
                if (arrIndex < 6) {
                    toTopLeft = (index - arrIndex/2)*3.59+6;
                }else if(arrIndex == 6){
                    toTopLeft = (index - 2.5)*3.59+6;//收缩后顶部套筒左边距不改变，即同arrIndex = 5；
                }else if(arrIndex == 7){
                    toTopLeft = (index - arrIndex/2 - 0.5)*3.59+6;
                }else if(arrIndex == 8){
                    toTopLeft = (index - arrIndex/2 - 1.5)*3.59+6;
                }else{
                    toTopLeft = 6;
                }
                if(arrIndex == 9){
                    // $(".capterUl").css('margin-left','-6.05%');
                }else{
                    $(".capterUl").css('margin-left','-0.05%');
                }
                if (toWidth1*100/screenWidth + toTopLeft > 96 || index == 23) {
                    toTopLeft = 96 - toWidth1*100/screenWidth - 0.25;
                }else if(toTopLeft < 6){
                    toTopLeft = 6;
                }else{
                    toTopLeft = toTopLeft;
                }
                toTopLeft = toTopLeft*screenWidth/100; //鼠标滚动后，顶部套筒的左边距
                $('.topMask').animate({'left':toTopLeft+'px'},animateTime);

                //调整章节的字体大小
                if(arrIndex < 7){
                    $('.capterUl li').css({'margin': '0 auto'});   
                    $(".capterName").css('font-size','1.7vw');
                }else if(arrIndex < 9){
                    $('.capterUl li').css({'margin': '0 auto'});   
                    $(".capterName").css('font-size','1.3vw');
                }else{
                    $('.capterUl li').css({'margin': '0 9%'});   
                    $(".capterName").css('font-size','1.5vw');
                }

                if(arrIndex == 0){
                    $('.mainContent').css('background-position','0 3.9%');//下调横穿章节名称的底边线
                    $(".classCategory").css({'width':'2vw','margin':'-7% -7% 0'});
                    $(".classContent").css({'width':'2vw','margin':'0 -7%','padding-top':'14%'});
                    $('.addHomework').css({'width':'3.3vw','margin-left':'-15%'});
                    $('.addCorrect').css({'width':'3.3vw','margin-left':'-15%'});
                    $('.addTeamEvaluate').css({'width':'3.3vw','margin-left':'-15%'});
                    $('.addSuggest').css({'width':'3.3vw','margin-left':'-15%'});
                    // $('.addPaper').css({'width':'3.3vw','margin': '0 -1vw'});
                    $('.addDefect').css({'width':'3.3vw','margin-left':'-15%'});
                    $('.addOrDel.add').css({'width':'2vw','margin':'0 -7%'});
                    $('.addOrDel.del').css({'width':'2vw'});
                }else if(arrIndex == 1){
                    $('.mainContent').css('background-position','0 3.9%');//上调横穿章节名称的底边线
                    $(".classCategory").css({'width':'2vw','margin':'-20% -7% 0'});
                    $(".classContent").css({'width':'2vw','margin':'0 -7%','padding-top':'70%'});
                    $('.addHomework').css({'width':'3.3vw','margin': '0 -1vw'});
                    $('.addCorrect').css({'width':'3.3vw','margin': '0 -1vw'});
                    $('.addTeamEvaluate').css({'width':'3.3vw','margin': '0 -1vw'});
                    $('.addSuggest').css({'width':'3.3vw','margin': '0 -1vw'});
                    // $('.addPaper').css({'width':'3.3vw','margin': '0 -1vw'});
                    $('.addDefect').css({'width':'3.3vw','margin': '0 -1vw'}); 
                    $('.addOrDel.add').css('width','2vw');
                    $('.addOrDel.del').css('width','2vw');
                }else if(arrIndex == 2){
                    $('.mainContent').css('background-position','0 6.1%');//上调横穿章节名称的底边线
                    $(".classCategory").css({'width':'2vw','margin':'-20% -7% 0'});
                    $(".classContent").css({'width':'2vw','margin':'0 -7%','padding-top':'55%'});
                    $('.addOrDel.add').css('width','2vw');
                    $('.addOrDel.del').css('width','2vw');
                    $('.addHomework').css({'width':'3.3vw','margin': '0 -1vw'});
                    $('.addCorrect').css({'width':'3.3vw','margin': '0 -1vw'});
                    $('.addTeamEvaluate').css({'width':'3.3vw','margin': '0 -1vw'});
                    $('.addSuggest').css({'width':'3.3vw','margin': '0 -1vw'});
                    // $('.addPaper').css({'width':'3.3vw','margin': '0 -1vw'});
                    $('.addDefect').css({'width':'3.3vw','margin': '0 -1vw'}); 
                    $('.addOrDel.add').css('width','2vw');
                    $('.addOrDel.del').css('width','2vw');
                }else if(arrIndex == 3){
                    $('.mainContent').css('background-position','0 6.1%');//上调横穿章节名称的底边线
                    $(".classCategory").css({'width':'2vw','margin':'-20% -7% 0'});
                    $(".classContent").css({'width':'2vw','margin':'0 -7%','padding-top':'55%'});
                    $('.addOrDel.add').css('width','2vw');
                    $('.addOrDel.del').css('width','2vw');
                    $('.addHomework').css({'width':'3.3vw','margin': '0 -1vw'});
                    $('.addCorrect').css({'width':'3.3vw','margin': '0 -1vw'});
                    $('.addTeamEvaluate').css({'width':'3.3vw','margin': '0 -1vw'});
                    $('.addSuggest').css({'width':'3.3vw','margin': '0 -1vw'});
                    // $('.addPaper').css({'width':'3.3vw','margin': '0 -1vw'});
                    $('.addDefect').css({'width':'3.3vw','margin': '0 -1vw'}); 
                    $('.addOrDel.add').css('width','2vw');
                    $('.addOrDel.del').css('width','2vw');
                }else if(arrIndex == 4){
                    $('.mainContent').css('background-position','0 6.1%');//上调横穿章节名称的底边线
                    $(".classCategory").css({'width':'2vw','margin':'-30% -7% 0'});
                    $(".classContent").css({'width':'2vw','margin':'0 -7%','padding-top':'90%'});
                    $('.addOrDel.add').css('width','2vw');
                    $('.addOrDel.del').css('width','2vw');
                    $('.addHomework').css({'width':'3.3vw','margin': '0 -1vw'});
                    $('.addCorrect').css({'width':'3.3vw','margin': '0 -1vw'});
                    $('.addTeamEvaluate').css({'width':'3.3vw','margin': '0 -1vw'});
                    $('.addSuggest').css({'width':'3.3vw','margin': '0 -1vw'});
                    // $('.addPaper').css({'width':'3.3vw','margin': '0 -1vw'});
                    $('.addDefect').css({'width':'3.3vw','margin': '0 -1vw'}); 
                    $('.addOrDel.add').css('width','2vw');
                    $('.addOrDel.del').css('width','2vw');
                }else if(arrIndex == 5){
                    $('.mainContent').css('background-position','0 6.1%');//上调横穿章节名称的底边线
                    $(".classCategory").css({'width':'2vw','margin':'-30% -7% 0'});
                    $(".classContent").css({'width':'2vw','margin':'0 -7%','padding-top':'80%'});
                    $('.addHomework').css({'width':'3vw','margin': '0 -0.7vw','border-left':'2px solid #fff'});
                    $('.addCorrect').css({'width':'3vw','margin': '0 -0.7vw','border-left':'2px solid #fff'});
                    $('.addTeamEvaluate').css({'width':'3vw','margin': '0 -0.7vw','border-left':'2px solid #fff'});
                    $('.addSuggest').css({'width':'3vw','margin': '0 -0.7vw','border-left':'2px solid #fff'});
                    // $('.addPaper').css({'width':'2.8vw','margin': '0 -1vw'});
                    $('.addDefect').css({'width':'3vw','margin': '0 -0.7vw','border-left':'2px solid #fff'});
                    $('.addOrDel.add').css('width','2vw');
                    $('.addOrDel.del').css('width','2vw');
                }else if(arrIndex == 6){
                    $('.mainContent').css('background-position','0 6.1%');//上调横穿章节名称的底边线
                    $(".classCategory").css({'width':'2vw','margin':'-40% -7% 0'});
                    $(".classContent").css({'width':'2vw','margin':'0 -7%','padding-top':'80%'});
                    $('.addHomework').css({'width':'3vw','margin': '0 -0.7vw','border-left':'2px solid #fff'});
                    $('.addCorrect').css({'width':'3vw','margin': '0 -0.7vw','border-left':'2px solid #fff'});
                    $('.addTeamEvaluate').css({'width':'3vw','margin': '0 -0.7vw','border-left':'2px solid #fff'});
                    $('.addSuggest').css({'width':'3vw','margin': '0 -0.7vw','border-left':'2px solid #fff'});
                    // $('.addPaper').css({'width':'2.8vw','margin': '0 -1vw'});
                    $('.addDefect').css({'width':'3vw','margin': '0 -0.7vw','border-left':'2px solid #fff'});
                    $('.addOrDel.add').css('width','2vw');
                    $('.addOrDel.del').css('width','2vw');
                }else if(arrIndex == 7){
                    $('.mainContent').css('background-position','0 6.1%');//上调横穿章节名称的底边线
                    $(".classCategory").css({'width':'2vw','margin':'-40% -7% 0'});
                    $(".classContent").css({'width':'2vw','margin':'0 -7%','padding-top':'80%'});
                    $('.addHomework').css({'width':'3vw','margin': '0 -0.7vw','border-left':'2px solid #fff'});
                    $('.addCorrect').css({'width':'3vw','margin': '0 -0.7vw','border-left':'2px solid #fff'});
                    $('.addTeamEvaluate').css({'width':'3vw','margin': '0 -0.7vw','border-left':'2px solid #fff'});
                    $('.addSuggest').css({'width':'3vw','margin': '0 -0.7vw','border-left':'2px solid #fff'});
                    // $('.addPaper').css({'width':'2.8vw','margin': '0 -1vw'});
                    $('.addDefect').css({'width':'3vw','margin': '0 -0.7vw','border-left':'2px solid #fff'});
                    $('.addOrDel.add').css('width','2vw');
                    $('.addOrDel.del').css('width','2vw');
                }else if(arrIndex == 8){
                    $('.mainContent').css('background-position','0 6.1%');//上调横穿章节名称的底边线
                    $(".classCategory").css({'width':'2vw','margin':'-40% -7% 0'});
                    $(".classContent").css({'width':'2vw','margin':'0 -7%','padding-top':'80%'});
                    $('.addHomework').css({'width':'3vw','margin': '0 -0.7vw','border-left':'2px solid #fff'});
                    $('.addCorrect').css({'width':'3vw','margin': '0 -0.7vw','border-left':'2px solid #fff'});
                    $('.addTeamEvaluate').css({'width':'3vw','margin': '0 -0.7vw','border-left':'2px solid #fff'});
                    $('.addSuggest').css({'width':'3vw','margin': '0 -0.7vw','border-left':'2px solid #fff'});
                    // $('.addPaper').css({'width':'2.8vw','margin': '0 -1vw'});
                    $('.addDefect').css({'width':'3vw','margin': '0 -0.7vw','border-left':'2px solid #fff'});
                    $('.addOrDel.add').css('width','2vw');
                    $('.addOrDel.del').css('width','2vw');
                }else if(arrIndex == 9){
                    $('.classSummary .capterUl li').css({'padding-top':0,'margin-top':'3%'});
                    $('.addHomework').css({'width':'3vw','margin': '0 -2.8vw','border-left':'1px solid #D1CDC2','border-right':'1px solid #D1CDC2'});
                    $('.addCorrect').css({'width':'3vw','margin': '0 -2.8vw','border-left':'1px solid #D1CDC2','border-right':'1px solid #D1CDC2'});
                    $('.addTeamEvaluate').css({'width':'3vw','margin': '0 -2.8vw','border-left':'1px solid #D1CDC2','border-right':'1px solid #D1CDC2'});
                    $('.addSuggest').css({'width':'3vw','margin': '0 -2.8vw','border-left':'1px solid #D1CDC2','border-right':'1px solid #D1CDC2'});
                    // $('.addPaper').css({'width':'2.8vw','margin': '0 -2.8vw','border-left':'1px solid #D1CDC2','border-right':'1px solid #D1CDC2'});
                    $('.addDefect').css({'width':'3vw','margin': '0 -2.8vw','border-left':'1px solid #D1CDC2','border-right':'1px solid #D1CDC2'});
                }

                if($('.weekDayNum').attr('flag') == 1){
                    if(arrIndex > 5){
                        $('.maskCapterTitle').css('top','8.5vh');
                        $('.headInfo').css('height','8.5vh');
                        $('.weekDayNum').attr('flag',0).css('display','none');
                    }else if(arrIndex <= 5){
                        $('.maskCapterTitle').css('top','13.5vh');
                        $('.headInfo').css('height','13.5vh');
                        $('.weekDayNum').attr('flag',1).css('display','block');
                    }
                }
               
            })
        },

        navigation: function(){
            var id;
            // $('.addOrDel.add').click(function(){
                //ajax来实现取数据
            // })
            $('.addOrDel.add').click(function(){
                var flag = $(".topMask").attr('flag');
                var index = $(this).parent().parent().parent().parent().index();
                if(flag == 0){
                    index = index;
                }else if(flag == 1){
                    index = index + 10;
                }
                
                //增加一条，增加宽度
                // var lastWidth = $('.classCon li.capter').eq(index).css('width');
                // var curWidth = lastWidth + 32;
                // $('.classCon li.capter').eq(index).css('width',curWidth+'px');
                // var capterId = $(this).parent().attr('capterId');
                // var classNum = $(this).attr('classId');

                $(".mask").css('display','block');
                $(".selectCon"+index).css('display','block');
                // location.href = 'main?capterId=' +capterId+ '&classNum=' + classNum+ '&addShow=yes';
            })

            $(document).on("click",'.addOrDel.del',function(){
                id = $(this).attr('classId');
                $('.mask').css('display','block');
                $('.confirm').css('display','block');
            })

            $(".confirm span").click(function(){
                var index = $(this).index();
                if (index == 1) {
                    // location.href = 'removeClass/id/'+id;//为防止页面刷新，先注销掉
                }else{
                }
                $('.mask').css('display','none');
                $('.confirm').css('display','none');
            })

            //临时增加，引入ajax后删除
            function huifu(){
                $('.mask').css('display','none');
                for (var i = 0; i < 16; i++) {
                    $('.selectCon'+i).css('display','none');
                } 
            }
            // $('.selectCon0 .back').click(function(){
            //     $('.mask').css('display','none');
            //     for (var i = 0; i < 6; i++) {
            //         $('.selectCon'+i).css('display','none');
            //     }
            //     $('.selectCon').css('display','none');
            //     location.href = 'main';
            // })
            $('.selectCon0 .back').click(huifu);
            $('.selectCon1 .back').click(huifu);
            $('.selectCon2 .back').click(huifu);
            $('.selectCon3 .back').click(huifu);
            $('.selectCon4 .back').click(huifu);
            $('.selectCon5 .back').click(huifu);
            $('.selectCon6 .back').click(huifu);
            $('.selectCon7 .back').click(huifu);
            $('.selectCon8 .back').click(huifu);
            $('.selectCon9 .back').click(huifu);
            $('.selectCon10 .back').click(huifu);
            $('.selectCon11 .back').click(huifu);
            $('.selectCon12 .back').click(huifu);
            $('.selectCon13 .back').click(huifu);
            $('.selectCon14 .back').click(huifu);
            $('.selectCon15 .back').click(huifu);
            $('.selectCon16 .back').click(huifu);

            function huifu1(){
                $('.mask').css('display','none');
                for (var i = 0; i < 240; i++) {
                    $('.addCorrectTable'+i).css('display','none');
                } 
            }
             for (var i = 0; i < 120; i++) {
                 $('.addCorrectTable'+i+' .back').click(huifu1);
             }
            // $('.addCorrectTable .back').click(function(){
            //     $('.mask').css('display','none');
            //     $('.addCorrectTable').css('display','none');
            //     // location.href = 'main';
            // })
        }
    };
    demo.init();
    demo.initweekDayNum();
    demo.initMainContent();
    demo.initWeekNum();
    demo.navigation();

    $(function(){
        $('.btn-right').click(function(){
            var box=$(this).parent();  //获取按钮的父元素
            var box_next=box.next();   //父元素的下一个同胞元素
            var box_next_left=parseInt(box_next.css('left'));      //父元素下一个同胞元素的left值
            var box_left=parseInt(box.css('left'));        //父元素的left值
            if(box_next_left){
                box.animate({left:box_next_left.toString()});
                box_next.animate({left:box_left.toString()});
                box.insertAfter(box_next);
            }
        });
             
        $('.btn-left').click(function(){
            var box=$(this).parent();  //获取按钮的父元素
            var box_left=parseInt(box.css('left'));        //父元素的left值
            var box_prev=box.prev();   //父元素的上一个同胞元素
            var box_prev_left=parseInt(box_prev.css('left'));      //父元素下一个同胞元素的left值
            if(box_left){
                box.animate({left:box_prev_left.toString()});
                box_prev.animate({left:box_left.toString()});
                box.insertBefore(box_prev);
            }
        });
    });
    
})


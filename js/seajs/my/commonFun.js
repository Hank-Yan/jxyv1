/**
 * Created by ×ÞÊ¿½Ü on 2015/12/22.
 */
define(function(require, exports, module){
    require("jQuery");
var teacher = {
    init: function(){
    	$("#yearUp").click(function(){
                var curYear = $('.curryear').html();
                var a = parseInt(curYear, 10)+1;
                // var b = Number(curYear)+2;
                $(".curryear").html(a);
            })

            $("#yearDown").click(function(){
                var curYear = $('.curryear').html();
                var a = parseInt(curYear, 10)-1;
                $(".curryear").html(a);
            })

            $("#monthUp").click(function(){
                 var curMonth = $('.currmonth').html();
                 var a = parseInt(curMonth, 10);
                 var b = (a==12) ? 0 : a+1;
                 $(".currmonth").html(b);
            })

            $("#monthDown").click(function(){
                 var curMonth = $('.currmonth').html();
                 var a = parseInt(curMonth, 10)-1;
                 var b = a<1 ? (a+12) : a;
                 $(".currmonth").html(b);
            })

            $(".mbar-nav").click(function(){
	    		if ($(this).attr('flag') == 0) {
		    		$(this).css('background','url("../images/backUpBottom.png") 0 center no-repeat');
		    		$(this).attr('flag',1);
		    		$('.mbar-area').css('display','block');
	    		}else{
	    			$(this).css('background','url("../images/expandBottom.png") 0 center no-repeat');
		    		$(this).attr('flag',0);
		    		$('.mbar-area').css('display','none');
	    		}
	    	})

	    	$(".weeks div,.menubar-v a").click(function(){
        		$(this).css({color:'#ed6000',textDecoration:'none'}).siblings().css('color','#000');
        	});

        	$(".menubar-h a").click(function(){
        		var index = $(this).index()+1;
        		for (var i = 1; i < 5; i++) {
        			$(".mitemimg.menuitem"+i).css('background-image','url("../images/menuitem'+i+'.jpg")');
        		}
        		$(".mitemimg.menuitem"+index).css('background-image','url("../images/menuitem'+index+'_1.jpg")')
        		$(this).css({color:'#ed6000',
        			textDecoration:'none',

        		}).siblings().css('color','#000');
        	})

        	var dateScroller = {
                constObj: {
                    day: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
                },
                Getday: function (flag) {
                    var now = new Date(new Date().setDate(new Date().getDate()+flag));
                    //var now = new Date();
                    var month = now.getMonth() + 1;    //月
                    var day = now.getDate();           //日
                    var xingqi = now.getDay();         //星期   
                    var today = "";
                    if (month < 10)
                        today += "0";
                    today += month + ".";
                    if (day < 10)
                        today += "0";
                    today += day;
                    today += "(" + dateScroller.constObj.day[xingqi] + ")";
                    return today;
                }
            };
            var dd = [
                {index:0, val:dateScroller.Getday(-3)},
                {index:1, val:dateScroller.Getday(-2)},
                {index:2, val:dateScroller.Getday(-1)},
                {index:3, val:dateScroller.Getday(0)},
                {index:4, val:dateScroller.Getday(1)},
                {index:5, val:dateScroller.Getday(2)},
                {index:6, val:dateScroller.Getday(3)},
            ];
            // console.log(dd[3].val);
            for (var i = 1; i < 8; i++) {
                $(".datebar .weekday.wday"+i).html(dd[i-1].val);
                $(".datebar .weekday.gap"+i).html(dd[i-1].val);
            }
    },
    navigation: function(){
    }
    };
    teacher.init();
    teacher.navigation();
})
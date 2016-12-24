/**
 * Created by hank-yan on 2016/12/22.
 * desc 将原来页面的主逻辑拆分出来了。看起来更加清晰，更加容易掌控，嗯，看起来是这样的，虽然。。。
 */
define(function (require, exports, module) {
    // 修改原生数组方法，在数组指定位置插入元素
    Array.prototype.insert = function (index, item) {
        this.splice(index, 0, item);
    };

    // 修改原生数组方法，删除数组中指定位置的元素
    Array.prototype.del = function (index) {
        this.splice(index, 1);
    };

    // 基本参数设置
    var arrIndex = 0;//缩放后宽度数组的游标
    var screenWidth = $(window).width();//当前屏幕有效宽度
    var selectedWeekNum;// 被选中的周次，
    console.log(screenWidth);
    // 重要常量配置（需要调试）！！！
    // 确定屏幕的有效宽度
    // 与鼠标缩放的层数有关，比如缩放0的时候，下面应该有24个屏幕宽度，一个屏幕宽度有5条数据对应一个周
    var bottomWidthArr = [24 * screenWidth, 12 * screenWidth, 8 * screenWidth, 6 * screenWidth, 4.8 * screenWidth,
        4 * screenWidth, 4 * screenWidth, 3 * screenWidth, 2 * screenWidth, screenWidth];

    // 占多少个顶部宽度， 比如第一个 5.42 代表 5.42%， 最后一个宽度 88 代表 88%
    // 这个宽度可以通过测量得到
    var topWidthArr = [5.42 * screenWidth, 9.01 * screenWidth, 12.6 * screenWidth, 16.2 * screenWidth, 19.788 * screenWidth,
        23.372 * screenWidth, 23.372 * screenWidth, 30.553 * screenWidth, 45.2 * screenWidth, 88 * screenWidth];


    //定义setTimeout执行方法 ,将单击事件和双击事件分开
    var TimeFn = null;// 用于控制单击双击

    // 引入其他依赖库
    var wheelUtils = require('./wheelUtils.js');

    // 执行总逻辑
    var pikachu = {
        run: function () {
            // 杰少后面写的添加作业的界面
            this.addHomeWork();

            // 界面信息控制
            this.navigation();
            // 添加周次样式信息（周次信息是通过js 代码添加的）
            this.addWeekInfo();
            // 添加周一到周五样式，在后面双击或者单击时候显示出来
            this.weekStyleAfterDbClick();
            // 内容部分左右移动样式的控制
            this.initMainContent();

            // 顶部蒙层控制
            this.topMaskMove();
            this.topMaskDbClick();
            this.topMaskClick();

            // 缩放控制
            this.mouseWheel();
        },
        // 不知道有什么用，但是看着很屌的样子(但可以确定，是界面控制，可以单独抽离出去)
        navigation: function () {
            var id;
            $('.addOrDel .add').click(function () {
                var flag = $(".topMask").attr('flag');
                var index = $(this).parent().parent().parent().parent().index();
                if (flag == 0) {
                    index = index;
                } else if (flag == 1) {
                    index = index + 10;
                }

                //增加一条，增加宽度
                // var lastWidth = $('.classCon li.capter').eq(index).css('width');
                // var curWidth = lastWidth + 32;
                // $('.classCon li.capter').eq(index).css('width',curWidth+'px');
                // var capterId = $(this).parent().attr('capterId');
                // var classNum = $(this).attr('classId');

                $(".mask").css('display', 'block');
                $(".selectCon" + index).css('display', 'block');
                // location.href = 'main?capterId=' +capterId+ '&classNum=' + classNum+ '&addShow=yes';
            })

            $(document).on("click", '.addOrDel.del', function () {
                id = $(this).attr('classId');
                $('.mask').css('display', 'block');
                $('.confirm').css('display', 'block');
            })

            $(".confirm span").click(function () {
                var index = $(this).index();
                if (index == 1) {
                    // location.href = 'removeClass/id/'+id;//为防止页面刷新，先注销掉
                } else {
                }
                $('.mask').css('display', 'none');
                $('.confirm').css('display', 'none');
            });

            //临时增加，引入ajax后删除
            function huifu() {
                $('.mask').css('display', 'none');
                for (var i = 0; i < 17; i++) {
                    $('.selectCon' + i).css('display', 'none');
                }
            }

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

            function huifu1() {
                $('.mask').css('display', 'none');
                for (var i = 0; i < 240; i++) {
                    $('.addCorrectTable' + i).css('display', 'none');
                }
            }

            for (var i = 0; i < 120; i++) {
                $('.addCorrectTable' + i + ' .back').click(huifu1);
            }
        },
        // 杂项的初始化
        addHomeWork: function () {
            $('.addHomework').click(function () {
                var index = $(this).attr('classIndex');
                console.log(index);
                if (index < 120) {
                    location.href = '../../../../../homework/firsthalf/' + index + '_A_1.pdf';
                } else {
                    location.href = '../../../../../homework/lasthalf/' + (index - 120) + '_A_1.pdf';
                }
            })

            $(".addHomework span a").click(function (e) {
                e.stopPropagation();
                location.href = 'http://localhost/index.php/Iframes/Question/index/subjectId/2.shtml';
            })
        },
        // 双击后的周次样式控制
        weekStyleAfterDbClick: function () {
            var weekStyleAfterDbClick = require('./weekStyleAfterDbClick.js');
            weekStyleAfterDbClick.run();
        },
        // 顶部蒙层周次信息(1-24周，数据是通过js控制的)
        addWeekInfo: function () {
            var addWeekInfo = require('./addWeekInfo.js');
            addWeekInfo.run();
        },
        // 顶部蒙层双击事件响应
        topMaskDbClick: function () {
            //顶部绿色蒙层的双击事件，无论单击，双击，arrIndex 都只允许在 arrIndex为0 时进行
            $(".weekNum span,.topMask").dblclick(function () {
                // 取消上次延时未执行的方法
                clearTimeout(TimeFn);
                //这里是双击事件的执行代码，
                var selectedWeekIndex = $('.weekNum span.selected').index();//有效周的index
                var initConWidth = 21.8;
                var bottomLeft;//计算课程主区域应该左移的距离
                if (selectedWeekIndex == 0) {
                    bottomLeft = 0;
                    // alert($(".capterDetail li").length);//251
                } else if (selectedWeekIndex == 1) {
                    bottomLeft = selectedWeekIndex * initConWidth / 24 - 0.05;
                } else if (selectedWeekIndex == 2) {
                    bottomLeft = selectedWeekIndex * initConWidth / 24 - 0.08;
                } else if (selectedWeekIndex == 3) {
                    bottomLeft = selectedWeekIndex * initConWidth / 24 - 0.1;
                } else if (selectedWeekIndex == 4) {
                    bottomLeft = selectedWeekIndex * initConWidth / 24 - 0.02;
                } else if (selectedWeekIndex == 5) {
                    bottomLeft = selectedWeekIndex * initConWidth / 24 - 0.05;
                } else if (selectedWeekIndex == 6) {
                    bottomLeft = selectedWeekIndex * initConWidth / 24 - 0.08;
                } else if (selectedWeekIndex == 7) {
                    bottomLeft = selectedWeekIndex * initConWidth / 24 - 0.12;
                } else if (selectedWeekIndex == 8) {
                    bottomLeft = selectedWeekIndex * initConWidth / 24 - 0.05;
                } else if (selectedWeekIndex == 9) {
                    bottomLeft = selectedWeekIndex * initConWidth / 24 - 0.08;
                } else if (selectedWeekIndex == 10) {
                    bottomLeft = selectedWeekIndex * initConWidth / 24 - 0.11;
                } else if (selectedWeekIndex == 11) {
                    bottomLeft = selectedWeekIndex * initConWidth / 24 - 0.14;
                } else if (selectedWeekIndex == 12) {
                    bottomLeft = selectedWeekIndex * initConWidth / 24 - 0.06;
                } else if (selectedWeekIndex == 13) {
                    bottomLeft = selectedWeekIndex * initConWidth / 24 - 0.1;
                } else if (selectedWeekIndex == 14) {
                    bottomLeft = selectedWeekIndex * initConWidth / 24 - 0.12;
                } else if (selectedWeekIndex == 15) {
                    bottomLeft = selectedWeekIndex * initConWidth / 24 - 0.16;
                } else if (selectedWeekIndex == 16) {
                    bottomLeft = selectedWeekIndex * initConWidth / 24 - 0.08;
                } else if (selectedWeekIndex == 17) {
                    bottomLeft = selectedWeekIndex * initConWidth / 24 - 0.12;
                } else if (selectedWeekIndex == 18) {
                    bottomLeft = selectedWeekIndex * initConWidth / 24 - 0.14;
                } else if (selectedWeekIndex == 19) {
                    bottomLeft = selectedWeekIndex * initConWidth / 24 - 0.18;
                } else if (selectedWeekIndex == 20) {
                    bottomLeft = selectedWeekIndex * initConWidth / 24 - 0.1;
                } else if (selectedWeekIndex == 21) {
                    bottomLeft = selectedWeekIndex * initConWidth / 24 - 0.14;
                } else if (selectedWeekIndex == 22) {
                    bottomLeft = selectedWeekIndex * initConWidth / 24 - 0.18;
                } else if (selectedWeekIndex == 23) {
                    bottomLeft = selectedWeekIndex * initConWidth / 24 - 0.2;
                } else {
                    bottomLeft = selectedWeekIndex * initConWidth / 24;
                }
                bottomLeft = bottomLeft * screenWidth;
                $(".classCon").css('width', initConWidth * screenWidth + 'px');
                $(".mainContent").animate({scrollLeft: bottomLeft + 'px'}, 10);
                $(".topMask").css({
                    'left': (6 + selectedWeekIndex * 3.59) * screenWidth / 100 + 'px',
                    'width': '5.544%'
                });
                arrIndex = 0;
                var flag1 = $('.weekNum span.selected').attr('flag1');
                var toRenderStartIndex = selectedWeekIndex * 5;//反选的天的起始下标
                $(".capterName").css('width', '30%');//调整maskCapterTitle的显示
                if (flag1 == 0) {

                    $(".toLeft").css({
                        'position': 'relative',
                        'top': '3px',
                        'height': '5vh',
                        'width': '3%'
                    });
                    $(".toRight").css({
                        'position': 'relative',
                        'top': '3px',
                        'height': '5vh',
                        'width': '3%'
                    });

                    $('.weekNum span.selected').attr('flag1', 1);
                    $('.weekNum span.selected').css({
                        'background': '#92D050',
                        'height': '8.5vh',
                        'margin': '0',
                        'line-height': '8.5vh'
                    });
                    for (var i = toRenderStartIndex; i < toRenderStartIndex + 5; i++) {
                        $(".capterDetail .classContent").eq(i).css("background", "#BCE292");
                        $(".capterDetail .addOrDel.del").eq(i).css("background", "#BCE292");
                        $(".capterDetail .classCategory").eq(i).css("background", "#BCE292");
                        $(".capterDetail .addHomework").eq(i).css("background", "#BCE292");
                        $(".capterDetail .addCorrect").eq(i).css("background", "#BCE292");
                        $(".capterDetail .addDefect").eq(i).css("background", "#BCE292");
                        $(".capterDetail .addTeamEvaluate").eq(i).css("background", "#BCE292");
                        $(".capterDetail .addSuggest").eq(i).css("background", "#BCE292");
                    }
                } else {

                    $(".toLeft").css({
                        'position': 'relative',
                        'top': '0',
                        'height': '5vh',
                        'width': '3%'
                    });
                    $(".toRight").css({
                        'position': 'relative',
                        'top': '0',
                        'height': '5vh',
                        'width': '3%'
                    });

                    $('.weekNum span.selected').attr('flag1', 0);
                    $('.weekNum span.selected').css({
                        'background': '#B97A57',
                        'height': '5.44vh',
                        'margin': '1.555vh 0',
                        'line-height': '5.44vh'
                    });
                    for (var i = toRenderStartIndex; i < toRenderStartIndex + 5; i++) {
                        $(".capterDetail .classContent").eq(i).css("background", "#B97A57");
                        $(".capterDetail .addOrDel.del").eq(i).css("background", "#B97A57");
                        $(".capterDetail .classCategory").eq(i).css("background", "#B97A57");
                        $(".capterDetail .addHomework").eq(i).css("background", "#B97A57");
                        $(".capterDetail .addCorrect").eq(i).css("background", "#B97A57");
                        $(".capterDetail .addDefect").eq(i).css("background", "#B97A57");
                        $(".capterDetail .addTeamEvaluate").eq(i).css("background", "#B97A57");
                        $(".capterDetail .addSuggest").eq(i).css("background", "#B97A57");
                    }
                }
                if ($('.weekDayNum').attr('flag') == 0) {
                    $('.maskCapterTitle').css('top', '13.5vh');
                    $('.headInfo').css('height', '13.5vh');
                    $('.weekDayNum').attr('flag', 1).css('display', 'block');
                } else if ($('.weekDayNum').attr('flag') == 1) {
                    $('.maskCapterTitle').css('top', '8.5vh');
                    $('.headInfo').css('height', '8.5vh');
                    $('.weekDayNum').attr('flag', 0).css('display', 'none');
                }
                if (selectedWeekIndex < 4) {
                    $(".maskCapterTitle .capterName").html('21章<br>一元二次方程').css('line-height', '3.6vh');
                } else if (selectedWeekIndex < 6) {
                    $(".maskCapterTitle .capterName").html('22章<br>二次函数').css('line-height', '3.6vh');
                } else if (selectedWeekIndex < 7) {
                    $(".maskCapterTitle .capterName").html('期中复习和考试').css('line-height', '7.77vh');
                } else if (selectedWeekIndex < 9) {
                    $(".maskCapterTitle .capterName").html('23章<br>旋转').css('line-height', '3.6vh');
                } else if (selectedWeekIndex < 13) {
                    $(".maskCapterTitle .capterName").html('24章<br>圆').css('line-height', '3.6vh');
                } else if (selectedWeekIndex < 15) {
                    $(".maskCapterTitle .capterName").html('25章<br>概率初步').css('line-height', '3.6vh');
                } else if (selectedWeekIndex < 16) {
                    $(".maskCapterTitle .capterName").html('阶段性复习和考试').css('line-height', '7.77vh');
                } else if (selectedWeekIndex < 18) {
                    $(".maskCapterTitle .capterName").html('26章<br>反比例函数').css('line-height', '3.6vh');
                } else if (selectedWeekIndex < 21) {
                    $(".maskCapterTitle .capterName").html('27章<br>相似').css('line-height', '3.6vh');
                } else if (selectedWeekIndex < 24) {
                    $(".maskCapterTitle .capterName").html('28章<br>锐角三角函数').css('line-height', '3.6vh');
                } else if (selectedWeekIndex == 24) {
                    $(".maskCapterTitle .capterName").html('期末复习和考试').css('line-height', '7.77vh');
                }

                $('.weekNum span.selected').css('color', '#000').siblings().css('color', '#fff');
                $('.mainContent').css('background-position', '0 4%');//下调横穿章节名称的底边线
                $(".classCategory").css({'width': '20%', 'margin': '-8% -7% 0'});
                $(".classContent").css({'width': '20%', 'margin': '0 -7%', 'padding-top': '14%'});
                $('.addHomework').css({'width': '33%', 'margin-left': '-13%'});
                $('.addCorrect').css({'width': '33%', 'margin-left': '-13%'});
                $('.addTeamEvaluate').css({'width': '33%', 'margin-left': '-13%'});
                $('.addSuggest').css({'width': '33%', 'margin-left': '-13%'});
                $('.addPaper').css({'width': '33%', 'margin-left': '-13%'});
                $('.addDefect').css({'width': '33%', 'margin-left': '-13%'});
                $('.addOrDel.add').css({'width': '20%', 'margin': '0 -7%'});
                $('.addOrDel.del').css({'width': '20%'});
                $(".capterTitle").css('visibility', 'hidden');
                $(".maskCapterTitle").css('display', 'block');
                //双击最大化只显示capterDetail的内容
                $(".capterDetail").css('display', 'block');
                $(".capterDetailKnowledge").css('display', 'none');
                $(".classSummary").css('display', 'none');
                $(".capterDetail").css({'background-position': '29% 1.3%', 'background-size': '97% 2%'});
            });
        },
        // 顶部蒙层单击事件响应
        topMaskClick: function () {
            var selectedWeekIndex = $('.weekNum span.selected').index();//有效周的index
            $(".topMask")
                .click(function () { //顶部蒙层的单击事件
                    clearTimeout(TimeFn); //执行延时
                    TimeFn = setTimeout(function () {
                        //此处是单击事件要执行的代码
                        var flag = $('.weekNum span.selected').attr('flag');
                        var toRenderStartIndex = selectedWeekIndex * 5;//反选的天的起始下标
                        if (flag == 0) {
                            $('.weekNum span.selected').attr('flag', 1);
                            $('.weekNum span').eq(selectedWeekIndex).css({
                                'background': '#92D050',
                                'height': '8.5vh',
                                'margin': '0',
                                'line-height': '8.5vh'
                            });
                            for (var i = toRenderStartIndex; i < toRenderStartIndex + 5; i++) {
                                $(".capterDetail .classContent").eq(i).css("background", "#BCE292");
                                $(".capterDetail .addOrDel.del").eq(i).css("background", "#BCE292");
                                $(".capterDetail .classCategory").eq(i).css("background", "#BCE292");
                                $(".capterDetail .addHomework").eq(i).css("background", "#BCE292");
                                $(".capterDetail .addCorrect").eq(i).css("background", "#BCE292");
                                $(".capterDetail .addDefect").eq(i).css("background", "#BCE292");
                                $(".capterDetail .addTeamEvaluate").eq(i).css("background", "#BCE292");
                                $(".capterDetail .addSuggest").eq(i).css("background", "#BCE292");
                            }
                        } else {
                            $('.weekNum span.selected').attr('flag', 0);
                            $('.weekNum span.selected').css({
                                'background': '#B97A57',
                                'height': '5.44vh',
                                'margin': '1.555vh 0',
                                'line-height': '5.44vh'
                            });
                            for (var i = toRenderStartIndex; i < toRenderStartIndex + 5; i++) {
                                $(".capterDetail .classContent").eq(i).css("background", "#B97A57");
                                $(".capterDetail .addOrDel.del").eq(i).css("background", "#B97A57");
                                $(".capterDetail .classCategory").eq(i).css("background", "#B97A57");
                                $(".capterDetail .addHomework").eq(i).css("background", "#B97A57");
                                $(".capterDetail .addCorrect").eq(i).css("background", "#B97A57");
                                $(".capterDetail .addDefect").eq(i).css("background", "#B97A57");
                                $(".capterDetail .addTeamEvaluate").eq(i).css("background", "#B97A57");
                                $(".capterDetail .addSuggest").eq(i).css("background", "#B97A57");
                            }
                        }
                        //可添加重新定位的代码
                    }, 500);
                });
        },
        // 顶部蒙层拖动事件响应
        topMaskMove: function () {
            var _move = false;//是否移动标记
            var _x, preLeft, afterLeft;//_x鼠标离控件左上角的相对位置,preLeft,afterLeft鼠标拖拽前和拖拽后顶部遮罩的左边距
            var selectedWeekIndex = $('.weekNum span.selected').index();//有效周的index
            var selectedWeekDayIndex = $('.weekDayNum span[flag=1]').index();//有效的星期的index

            //顶部蒙层的拖拽事件
            $(".topMask").draggable({axis: "x"});
            $(".topMask").draggable({
                containment: ".weekInfo",
                scroll: false,
                cursor: "pointer"
            });
            $(".topMask")
                .mousedown(function (e) {
                    // $(".topMask").attr('style','cursor:move');
                    _move = true;
                    preLeft = parseInt($(".topMask").css("left"));
                    _x = e.pageX - preLeft;
                })
                .mousemove(function (e) {
                    //拖拽之前颜色背景先恢复至初始状态
                    var flag = $('.weekNum span.selected').attr('flag');
                    var toRenderStartIndex = selectedWeekIndex * 5;//反选的天的起始下标
                    if (_move) {
                        $(".capterDetail .capterUl li").css({'background': '', 'opacity': ''});//清除hover事件引起的变化
                        $(".weekDayNum span").css("background", "#92D050");
                        $('.weekNum span.selected').attr('flag', 0);
                        $('.weekNum span.selected').css({
                            'background': '#B97A57',
                            'height': '5.44vh',
                            'margin': '1.555vh 0',
                            'line-height': '5.44vh'
                        });
                        for (var i = toRenderStartIndex; i < toRenderStartIndex + 5; i++) {
                            $(".capterDetail .classContent").eq(i).css("background", "#B97A57");
                            $(".capterDetail .addOrDel.del").eq(i).css("background", "#B97A57");
                            $(".capterDetail .classCategory").eq(i).css({
                                "background": "#B97A57",
                                "color": "#124934"
                            });
                            $(".capterDetail .addHomework").eq(i).css({
                                "background": "#B97A57",
                                "color": "#124934"
                            });
                            $(".capterDetail .addCorrect").eq(i).css({"background": "#B97A57", "color": "#124934"});
                            $(".capterDetail .addDefect").eq(i).css({"background": "#B97A57", "color": "#124934"});
                            $(".capterDetail .addTeamEvaluate").eq(i).css({
                                "background": "#B97A57",
                                "color": "#124934"
                            });
                            $(".capterDetail .addSuggest").eq(i).css("background", "#B97A57");
                        }

                        if ($('.weekDayNum').attr('flag') == 1) {
                            $('.maskCapterTitle').css('top', '8.5vh');
                            $('.headInfo').css('height', '8.5vh');
                            $('.weekDayNum').attr('flag', 0).css('display', 'none');
                        }
                        //确定字体被染黑的周次
                        var d;//黑色边缘距中心点的步数
                        if (arrIndex < 8) {
                            d = Math.floor((arrIndex + 1) / 2);
                        } else if (arrIndex == 8) {
                            d = 6;
                        } else {
                            d = 24;
                        }

                        var fromIndex = selectedWeekIndex - d;//黑色字体周次的起始索引
                        fromIndex = fromIndex < 0 ? 0 : fromIndex;
                        var toIndex = selectedWeekIndex + d;//黑色字体周次的终止索引
                        toIndex = toIndex > 23 ? 23 : toIndex;
                        $(".weekNum span").css("color", "#fff");
                        for (var i = fromIndex; i < toIndex + 1; i++) {
                            $(".weekNum span").eq(i).css("color", "#000");//将被滑块覆盖的周次变黑
                        }

                        afterLeft = e.pageX - _x;//移动过后滑块的左边距
                        var topMaskWh = parseInt($(".topMask").css('width')); //顶部遮罩宽度
                        selectedWeekIndex = Math.floor(((afterLeft + topMaskWh / 2) / screenWidth * 100 - 6) / 3.59);
                        selectedWeekNum = selectedWeekIndex + 1;
                        $(".weekNum span").eq(selectedWeekIndex).addClass("selected").siblings().removeClass("selected");
                        $(".weekNum span").eq(selectedWeekIndex).css({"width": "6.16%"}).siblings().css({"width": "4.08%"});
                        for (var i = 0; i < 24; i++) {
                            $(".weekNum span").eq(i).html(i + 1);
                        }
                        $(".weekNum span").eq(selectedWeekIndex).html('第' + selectedWeekNum + '周');
                        //拖拽时置maskCapterTitle的值
                        if (arrIndex == 0 || arrIndex == 1) {
                            if (selectedWeekIndex < 4) {
                                $(".maskCapterTitle .capterName").html('21章<br>一元二次方程').css('line-height', '3.6vh');
                            } else if (selectedWeekIndex < 6) {
                                $(".maskCapterTitle .capterName").html('22章<br>二次函数').css('line-height', '3.6vh');
                            } else if (selectedWeekIndex < 7) {
                                $(".maskCapterTitle .capterName").html('期中复习和考试').css('line-height', '7.77vh');
                            } else if (selectedWeekIndex < 9) {
                                $(".maskCapterTitle .capterName").html('23章<br>旋转').css('line-height', '3.6vh');
                            } else if (selectedWeekIndex < 13) {
                                $(".maskCapterTitle .capterName").html('24章<br>圆').css('line-height', '3.6vh');
                            } else if (selectedWeekIndex < 15) {
                                $(".maskCapterTitle .capterName").html('25章<br>概率初步').css('line-height', '3.6vh');
                            } else if (selectedWeekIndex < 16) {
                                $(".maskCapterTitle .capterName").html('阶段性复习和考试').css('line-height', '7.77vh');
                            } else if (selectedWeekIndex < 18) {
                                $(".maskCapterTitle .capterName").html('26章<br>反比例函数').css('line-height', '3.6vh');
                            } else if (selectedWeekIndex < 21) {
                                $(".maskCapterTitle .capterName").html('27章<br>相似').css('line-height', '3.6vh');
                            } else if (selectedWeekIndex < 24) {
                                $(".maskCapterTitle .capterName").html('28章<br>锐角三角函数').css('line-height', '3.6vh');
                            } else if (selectedWeekIndex == 24) {
                                $(".maskCapterTitle .capterName").html('期末复习和考试').css('line-height', '7.77vh');
                            }
                        }

                        var classConWidth = parseInt($(".classCon").css("width"));
                        //计算课程主区域应该左移的距离
                        var bottomLeft = ((afterLeft + selectedWeekIndex * 0.8976) * 100 / screenWidth - 6) * classConWidth / 88;
                        $(".mainContent").animate({scrollLeft: bottomLeft + 'px'}, 10);
                    }
                })
                .mouseup(function () {
                    // $(".topMask").attr('style','cursor:pointer');
                    _move = false;
                });
        },
        // 主内容部分控制（互换章节等等）
        initMainContent: function () {
            $(".mainContent").animate({scrollLeft: 52.462 * screenWidth / 100 * 24 + 'px'}, 10);
            $('.classCon li.capter').attr('flag', 0);
            var moveArr = [10.83, 10, 5, 8.3, 14.17, 9.17, 5, 7.5, 12.5, 18.83, 6.7];
            var midMoveArr = [10, 10, 6.7, 10, 11.7, 10, 6.7, 8.3, 10, 8.3, 8.3];
            var leftWidth1, leftWidth2;//相邻章节模块前后移动的距离

            // 内容部分，左右箭头控制
            $('.toRight').click(function () {
                var box = $(this).parent().parent();  //获取按钮的父元素
                var index = box.index();
                var box_next = box.next();   //父元素的下一个同胞元素
                if (arrIndex < 6) {
                    leftWidth1 = moveArr[index];
                    leftWidth2 = -moveArr[index + 1];
                } else if (arrIndex < 9) {
                    leftWidth1 = midMoveArr[index];
                    leftWidth2 = -midMoveArr[index + 1];
                } else if (arrIndex == 9) {
                    leftWidth1 = 9.09;
                    leftWidth2 = -9.09;
                }
                if (index != 10) {
                    box.animate({'left': leftWidth2 + '%'}, function () {
                        box.animate({'left': 0}, 5);
                    });
                    box_next.animate({'left': leftWidth1 + '%'}, function () {
                        box_next.animate({'left': 0}, 5);
                    });
                    box.insertAfter(box_next);
                }
                var selectedWeekNum = index + 21;
                var index2 = index + 22;
                // if(index != 5){
                //     location.href = 'chgCapterClass/selectedWeekNum/'+selectedWeekNum+'/index2/'+index2;
                // }
            });
            $('.toLeft').click(function () {
                var box = $(this).parent().parent();  //获取按钮的父元素
                var index = box.index();
                var box_prev = box.prev();
                if (arrIndex < 6) {
                    leftWidth1 = moveArr[index - 1];
                    leftWidth2 = -moveArr[index];
                } else if (arrIndex < 8) {
                    leftWidth1 = midMoveArr[index - 1];
                    leftWidth2 = -midMoveArr[index];
                } else if (arrIndex == 8) {
                    leftWidth1 = 9.09;
                    leftWidth2 = -9.09;
                }
                if (index != 0) {
                    box.animate({'left': leftWidth1 + '%'}, function () {
                        box.animate({'left': 0}, 5);
                    });
                    box_prev.animate({'left': leftWidth2 + '%'}, function () {
                        box_prev.animate({'left': 0}, 5);
                    });
                    box.insertBefore(box_prev);
                }
                var selectedWeekNum = index + 21;
                var index2 = index + 20;
                // if(index != 0){
                //     location.href = 'chgCapterClass/selectedWeekNum/'+selectedWeekNum+'/index2/'+index2;
                // }
            });

            // 内容部分批语信息控制
            $(".addCorrect").click(function () {
                var index = $(this).attr("classId");
                $(".mask").css('display', 'block');
                $(".addCorrectTable" + index).css('display', 'block');
            });
        },
        // 滚轮滚动的逻辑
        mouseWheel: function () {
            $('.mainContent').mousewheel(function (event, delta) {
                // 阻止事件冒泡
                event.stopPropagation();
                // 被选中的周次的索引
                // 总共有多少个周
                var len = $(".weekNum span").length,
                    //有效周的索引
                    selectedWeekIndex = $('.weekNum span.selected').index(),
                    // 被选中的周次，等于索引加1
                    selectedWeekNum = selectedWeekIndex + 1,
                    // 不同层级缩放时候动画事件间隔
                    animateTime = 100,
                    //合并同类项前后的切换时间
                    fadeTime = 100;

                // delta 代表鼠标滚轮滚动的方向，取两个值 1 或者 -1
                if (delta > 0) {
                    arrIndex--;
                } else if (delta < 0) {
                    arrIndex++;
                }

                // arrIndex 的取值范围是 [0, 9]
                arrIndex = arrIndex < 0 ? 0 : arrIndex;
                // arrIndex = arrIndex > 9 ? 9 : arrIndex;
                // 更改取值范围，从0 到 10
                arrIndex = arrIndex > 10 ? 10 : arrIndex;

                // console.log(arrIndex);
                // ===================================鼠标滚动后，黑色字体控制 begin=============================================================
                // 确定字体被染黑的周次
                // arrIndex:0 => distance:0
                // arrIndex:1 => distance:1
                // arrIndex:2 => distance:1
                // arrIndex:3 => distance:2
                // arrIndex:4 => distance:2
                var distance;//黑色边缘距中心点的步数
                if (arrIndex < 8) {
                    distance = Math.floor((arrIndex + 1) / 2);
                } else if (arrIndex == 8) {
                    distance = 6;
                } else if (arrIndex == 9) {
                    distance = 24;
                }
                var fromIndex = selectedWeekIndex - distance;//黑色字体周次的起始索引
                fromIndex = fromIndex < 0 ? 0 : fromIndex;
                var toIndex = selectedWeekIndex + distance;//黑色字体周次的终止索引
                toIndex = toIndex > 23 ? 23 : toIndex;
                // 将字体颜色设置成黑色
                $(".weekNum span").css("color", "#fff");
                for (var i = fromIndex; i < toIndex + 1; i++) {
                    $(".weekNum span").eq(i).css("color", "#000");
                }
                // ===================================鼠标滚动后，黑色字体控制 end=============================================================

                // ===================================遮罩位置，以及对应内容位置控制 begin======================================================
                //鼠标滚动后，底部所有课程的宽度
                var bottomWidth = bottomWidthArr[arrIndex];
                bottomWidth = bottomWidth > bottomWidthArr[0] ? bottomWidthArr[0] : bottomWidth;
                bottomWidth = bottomWidth < bottomWidthArr[9] ? bottomWidthArr[9] : bottomWidth;

                //底部所有课程的左滑距离
                bottomScrollLeftWidth = (selectedWeekIndex - 0.5 * arrIndex - Math.floor(wheelUtils.getGapCount(selectedWeekIndex) / 4) * 0.025) * bottomWidthArr[arrIndex] / 24;
                //Math.floor(index/4)*0.025是清除章节之间的margin；0.5*arrIndex是测试得出，确定左移的准确距离
                // classCon 就是 ul by hank-yan
                // 调整某一周下内容的总宽度
                $('.classCon').animate({'width': bottomWidth + 'px'}, animateTime);
                // 调整完总宽度，设置中心位置，实际上设置 scrollLeft 就OK 啦
                $(".mainContent").animate({scrollLeft: bottomScrollLeftWidth + 'px'}, 10);
                // ===================================遮罩位置，以及对应内容位置控制 end=================================================

                // ===================================鼠标滚动后，遮罩控制 begin=============================================================
                // 鼠标滚动后，顶部遮罩的宽度
                var topWidth = topWidthArr[arrIndex] / 100;
                topWidth = topWidth > topWidthArr[9] / 100 ? topWidthArr[9] / 100 : topWidth;
                topWidth = topWidth <= topWidthArr[0] / 100 ? topWidthArr[0] / 100 : topWidth;
                $('.topMask').animate({'width': topWidth + 'px'}, animateTime);
                console.log(arrIndex);
                // 鼠标滚动后，顶部遮罩的左边距
                var toTopLeft;//收缩后顶部遮罩左边距
                // 向左移动多少呢？ 6 之前，每次移动半个章节宽度大小
                if (arrIndex < 6) {
                    // 3.59 怎么来的？？？ 原来是一个周的宽度所占的百分比， 6代表秋季学期的宽度
                    toTopLeft = (selectedWeekIndex - arrIndex / 2) * 3.59 + 6;
                } else if (arrIndex == 6) {
                    // js 里面， 5/2 = 2.5  ？？？？？？？？
                    toTopLeft = (selectedWeekIndex - 2.5) * 3.59 + 6;//收缩后顶部遮罩左边距不改变，即同arrIndex = 5；
                } else if (arrIndex == 7) {
                    // 比如，中心在13周， 12-7/2-0.5 = 12-4 = 8共8 个小块
                    toTopLeft = (selectedWeekIndex - arrIndex / 2 - 0.5) * 3.59 + 6;
                } else if (arrIndex == 8) {
                    // 还不如直接写死！！！
                    toTopLeft = (selectedWeekIndex - arrIndex / 2 - 1.5) * 3.59 + 6;
                } else if (arrIndex == 9) {
                    // 9 的时候，直接举例左侧，就一个秋季学期方块的宽度
                    toTopLeft = 6;
                }

                if (topWidth * 100 / screenWidth + toTopLeft > 94 || selectedWeekIndex == 23) {
                    // 最右侧
                    toTopLeft = 94 - topWidth * 100 / screenWidth - 0.25;
                } else if (toTopLeft < 6) {
                    // 最左侧
                    toTopLeft = 6;
                }
                toTopLeft = toTopLeft * screenWidth / 100;
                $('.topMask').animate({'left': toTopLeft + 'px'}, animateTime);
                // ===================================鼠标滚动后，遮罩控制 end=============================================================


                // capterTitle 表示第几章，第几章（第24章 圆）
                // capterTitle .shengzi 表示章节下面的小方块
                if (arrIndex < 8) {
                    $('.capterTitle .shengzi').css({'display': 'inline-block', 'margin-top': '-2%'});
                } else if (arrIndex == 8) {
                    $('.capterTitle .shengzi').css({'display': 'inline-block', 'margin-top': '-3%'});
                } else if (arrIndex == 9) {
                    $('.capterTitle .shengzi').css({'display': 'inline-block', 'margin-top': '-5%'});
                }

                // maskCapterTitle 刚进来时候顶部显示的章节信息
                if (arrIndex == 0 || arrIndex == 1) {
                    $(".capterTitle").css('visibility', 'hidden');
                    $(".maskCapterTitle").css('display', 'block');
                } else {
                    $(".capterTitle").css('visibility', 'visible');
                    $(".maskCapterTitle").css('display', 'none');
                }

                // 三个层级之间进行切换
                // 几个层级， <6  <9  ==9  其他
                if (arrIndex < 6) {
                    $(".capterDetail").fadeIn(fadeTime);
                    $(".capterDetailKnowledge").fadeOut(fadeTime);
                    $(".classSummary").fadeOut(fadeTime);
                    $('.maskExamTitle').css('display', 'none');

                    // 更换蓝色背景bar
                    $('.mainContent').css({
                        'backgroundImage': 'url(../../../../../images/capterBar.jpg)'
                    });
                } else if (arrIndex < 9) {
                    $(".capterDetail").fadeOut(fadeTime);
                    $(".capterDetailKnowledge").fadeIn(fadeTime);
                    $(".classSummary").fadeOut(fadeTime);
                    $('.maskExamTitle').css('display', 'none');

                    // 更换蓝色背景bar
                    $('.mainContent').css({
                        'backgroundImage': 'url(../../../../../images/capterBar.jpg)'
                    });
                } else if (arrIndex == 9) {
                    $(".capterTitle").fadeIn(fadeTime);
                    $(".capterDetail").fadeOut(fadeTime);
                    $(".capterDetailKnowledge").fadeOut(fadeTime);
                    $(".classSummary").fadeIn(fadeTime);
                    $('.maskExamTitle').css('display', 'none');
                    // 更换蓝色背景bar
                    $('.mainContent').css({
                        'backgroundImage': 'url(../../../../../images/capterBar.jpg)'
                    });
                } else if (arrIndex == 10) {
                    // by hank-yan
                    $(".capterTitle").fadeOut(fadeTime);
                    $(".capterDetail").fadeOut(fadeTime);
                    $(".capterDetailKnowledge").fadeOut(fadeTime);
                    $(".classSummary").fadeOut(fadeTime);

                    $('.maskExamTitle').css('display', 'block');
                    // 更换蓝色背景bar
                    $('.mainContent').css({
                        'backgroundImage': 'url(../../../../../images/examBar.jpg)'
                    });
                }


                // capterUl 的控制
                if (arrIndex == 9) {
                    $(".capterUl").css('margin-left', '-6.05%');
                } else {
                    $(".capterUl").css('margin-left', '-0.05%');
                }

                // 控制所有章节在不同缩放层级下的宽度
                // 这个宽度是怎么取出来的，大致方向
                if (arrIndex < 6) {
                    $('.capter.t21h').css('width', '10.83%');
                    $('.capter.t22h').css('width', '10%');
                    $('.capter.t23h').css('width', '5%');
                    $('.capter.t24h').css('width', '8.3%');
                    $('.capter.t25h').css('width', '14.17%');
                    $('.capter.t26h').css('width', '9.17%');
                    $('.capter.t27h').css('width', '5%');
                    $('.capter.t28h').css('width', '7.5%');
                    $('.capter.t29h').css('width', '12.5%');
                    $('.capter.t30h').css('width', '10.83%');
                    $('.capter.t31h').css('width', '6.7%');
                } else if (arrIndex < 9) {
                    $('.capter.t21h').css('width', '10%');
                    $('.capter.t22h').css('width', '10%');
                    $('.capter.t23h').css('width', '6.7%');
                    $('.capter.t24h').css('width', '10%');
                    $('.capter.t25h').css('width', '11.7%');
                    $('.capter.t26h').css('width', '10%');
                    $('.capter.t27h').css('width', '6.7%');
                    $('.capter.t28h').css('width', '8.3%');
                    $('.capter.t29h').css('width', '10%');
                    $('.capter.t30h').css('width', '8.3%');
                    $('.capter.t31h').css('width', '8.3%');
                } else if (arrIndex == 9) {
                    $('.capter.t21h').css('width', '9.09%');
                    $('.capter.t22h').css('width', '9.09%');
                    $('.capter.t23h').css('width', '9.09%');
                    $('.capter.t24h').css('width', '9.09%');
                    $('.capter.t25h').css('width', '9.09%');
                    $('.capter.t26h').css('width', '9.09%');
                    $('.capter.t27h').css('width', '9.09%');
                    $('.capter.t28h').css('width', '9.09%');
                    $('.capter.t29h').css('width', '9.09%');
                    $('.capter.t30h').css('width', '9.09%');
                    $('.capter.t31h').css('width', '9.09%');
                }

                //调整箭头宽度
                $('.capterTitle .toLeft,.capterTitle .toRight').css({'position': 'relative', 'top': 0});
                $('.maskCapterTitle .toLeft,.maskCapterTitle .toRight').css({'position': 'relative', 'top': 0});

                if (arrIndex == 9) {
                    $(".capterName").css('width', '70%');
                    $(".toLeft").css({
                        'position': 'relative',
                        'margin-left': '0',
                        'margin-right': '-3%',
                        'top': '5%',
                        'height': '3vh',
                        'width': '15%'
                    });
                    $(".toRight").css({
                        'position': 'relative',
                        'margin-left': '-3%',
                        'margin-right': '0',
                        'top': '5%',
                        'height': '3vh',
                        'width': '15%'
                    });
                } else if (arrIndex == 8) {
                    $(".capter.t21h .capterTitle .capterName").css('width', '41%');
                    $(".capter.t21h .capterTitle .toLeft").css({
                        'margin-left': '15%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '10%'
                    });
                    $(".capter.t21h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '10%'
                    });
                    $(".capter.t22h .capterTitle .capterName").css('width', '40%');
                    $(".capter.t22h .capterTitle .toLeft").css({
                        'margin-left': '16%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '11%'
                    });
                    $(".capter.t22h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '11%'
                    });
                    $(".capter.t23h .capterTitle .capterName").css('width', '62%');
                    $(".capter.t23h .capterTitle .toLeft").css({
                        'margin-left': '0',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '15%'
                    });
                    $(".capter.t23h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '15%'
                    });
                    $(".capter.t24h .capterTitle .capterName").css('width', '40%');
                    $(".capter.t24h .capterTitle .toLeft").css({
                        'margin-left': '16%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '10%'
                    });
                    $(".capter.t24h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '10%'
                    });
                    $(".capter.t25h .capterTitle .capterName").css('width', '35%');
                    $(".capter.t25h .capterTitle .toLeft").css({
                        'margin-left': '19%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '9%'
                    });
                    $(".capter.t25h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '9%'
                    });
                    $(".capter.t26h .capterTitle .capterName").css('width', '40%');
                    $(".capter.t26h .capterTitle .toLeft").css({
                        'margin-left': '16%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '10%'
                    });
                    $(".capter.t26h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '10%'
                    });
                    $(".capter.t27h .capterTitle .capterName").css('width', '62%');
                    $(".capter.t27h .capterTitle .toLeft").css({
                        'margin-left': '1%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '15%'
                    });
                    $(".capter.t27h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '15%'
                    });
                    $(".capter.t28h .capterTitle .capterName").css('width', '45%');
                    $(".capter.t28h .capterTitle .toLeft").css({
                        'margin-left': '11%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '12%'
                    });
                    $(".capter.t28h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '12%'
                    });
                    $(".capter.t29h .capterTitle .capterName").css('width', '36%');
                    $(".capter.t29h .capterTitle .toLeft").css({
                        'margin-left': '18%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '10%'
                    });
                    $(".capter.t29h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '10%'
                    });
                    $(".capter.t30h .capterTitle .capterName").css('width', '50%');
                    $(".capter.t30h .capterTitle .toLeft").css({
                        'margin-left': '7%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '12%'
                    });
                    $(".capter.t30h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '12%'
                    });
                    $(".capter.t31h .capterTitle .capterName").css('width', '50%');
                    $(".capter.t31h .capterTitle .toLeft").css({
                        'margin-left': '17%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '10%'
                    });
                    $(".capter.t31h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '10%'
                    });
                } else if (arrIndex == 7) {
                    $(".capter.t21h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t21h .capterTitle .toLeft").css({
                        'margin-left': '24%',
                        'margin-right': '3%',
                        'top': '1%',
                        'height': '4vh',
                        'width': '7%'
                    });
                    $(".capter.t21h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '1%',
                        'height': '4vh',
                        'width': '7%'
                    });
                    $(".capter.t22h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t22h .capterTitle .toLeft").css({
                        'margin-left': '24%',
                        'margin-right': '3%',
                        'top': '1%',
                        'height': '4vh',
                        'width': '7%'
                    });
                    $(".capter.t22h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '1%',
                        'height': '4vh',
                        'width': '7%'
                    });
                    $(".capter.t23h .capterTitle .capterName").css('width', '45%');
                    $(".capter.t23h .capterTitle .toLeft").css({
                        'margin-left': '14%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '9%'
                    });
                    $(".capter.t23h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '9%'
                    });
                    $(".capter.t24h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t24h .capterTitle .toLeft").css({
                        'margin-left': '24%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '7%'
                    });
                    $(".capter.t24h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '7%'
                    });
                    $(".capter.t25h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t25h .capterTitle .toLeft").css({
                        'margin-left': '25%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '6%'
                    });
                    $(".capter.t25h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '6%'
                    });
                    $(".capter.t26h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t26h .capterTitle .toLeft").css({
                        'margin-left': '24%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '7%'
                    });
                    $(".capter.t26h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '7%'
                    });
                    $(".capter.t27h .capterTitle .capterName").css('width', '45%');
                    $(".capter.t27h .capterTitle .toLeft").css({
                        'margin-left': '14%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '10%'
                    });
                    $(".capter.t27h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '10%'
                    });
                    $(".capter.t28h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t28h .capterTitle .toLeft").css({
                        'margin-left': '23%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '8%'
                    });
                    $(".capter.t28h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '8%'
                    });
                    $(".capter.t29h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t29h .capterTitle .toLeft").css({
                        'margin-left': '24%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '7.5%'
                    });
                    $(".capter.t29h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '7.5%'
                    });
                    $(".capter.t30h .capterTitle .capterName").css('width', '34%');
                    $(".capter.t30h .capterTitle .toLeft").css({
                        'margin-left': '20%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '8.3%'
                    });
                    $(".capter.t30h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '8.3%'
                    });
                    $(".capter.t31h .capterTitle .capterName").css('width', '35%');
                    $(".capter.t31h .capterTitle .toLeft").css({
                        'margin-left': '21%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '7.7%'
                    });
                    $(".capter.t31h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '7.7%'
                    });
                } else if (arrIndex == 6) {
                    $(".capter.t21h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t21h .capterTitle .toLeft").css({
                        'margin-left': '28%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '5%'
                    });
                    $(".capter.t21h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '5%'
                    });
                    $(".capter.t22h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t22h .capterTitle .toLeft").css({
                        'margin-left': '26%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '5%'
                    });
                    $(".capter.t22h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '5%'
                    });
                    $(".capter.t23h .capterTitle .capterName").css('width', '45%');
                    $(".capter.t23h .capterTitle .toLeft").css({
                        'margin-left': '14%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '9%'
                    });
                    $(".capter.t23h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '9%'
                    });
                    $(".capter.t24h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t24h .capterTitle .toLeft").css({
                        'margin-left': '26%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '5%'
                    });
                    $(".capter.t24h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '5%'
                    });
                    $(".capter.t25h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t25h .capterTitle .toLeft").css({
                        'margin-left': '26%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '5%'
                    });
                    $(".capter.t25h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '5%'
                    });
                    $(".capter.t26h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t26h .capterTitle .toLeft").css({
                        'margin-left': '27%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '6%'
                    });
                    $(".capter.t26h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '6%'
                    });
                    $(".capter.t27h .capterTitle .capterName").css('width', '45%');
                    $(".capter.t27h .capterTitle .toLeft").css({
                        'margin-left': '15%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '8%'
                    });
                    $(".capter.t27h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '8%'
                    });
                    $(".capter.t28h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t28h .capterTitle .toLeft").css({
                        'margin-left': '25%',
                        'margin-right': '3%',
                        'height': '4vh',
                        'width': '6%'
                    });
                    $(".capter.t28h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '6%'
                    });
                    $(".capter.t29h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t29h .capterTitle .toLeft").css({
                        'margin-left': '26%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '5.5%'
                    });
                    $(".capter.t29h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '5.5%'
                    });
                    $(".capter.t30h .capterTitle .capterName").css('width', '34%');
                    $(".capter.t30h .capterTitle .toLeft").css({
                        'margin-left': '22%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '6.3%'
                    });
                    $(".capter.t30h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '6.3%'
                    });

                    $(".capter.t31h .capterTitle .capterName").css('width', '35%');
                    $(".capter.t31h .capterTitle .toLeft").css({
                        'margin-left': '22%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '6.7%'
                    });
                    $(".capter.t31h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '6.7%'
                    });
                } else if (arrIndex == 4 || arrIndex == 5) {
                    $(".capter.t21h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t21h .capterTitle .toLeft").css({
                        'margin-left': '28%',
                        'margin-right': '3%',
                        'top': '3%',
                        'height': '4vh',
                        'width': '4%'
                    });
                    $(".capter.t21h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '2%',
                        'height': '4vh',
                        'width': '4%'
                    });
                    $(".capter.t22h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t22h .capterTitle .toLeft").css({
                        'margin-left': '28%',
                        'margin-right': '3%',
                        'top': '3%',
                        'height': '4vh',
                        'width': '4%'
                    });
                    $(".capter.t22h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '3%',
                        'height': '4vh',
                        'width': '4%'
                    });
                    $(".capter.t23h .capterTitle .capterName").css('width', '45%');
                    $(".capter.t23h .capterTitle .toLeft").css({
                        'margin-left': '14%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '9%'
                    });
                    $(".capter.t23h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '9%'
                    });
                    $(".capter.t24h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t24h .capterTitle .toLeft").css({
                        'margin-left': '26%',
                        'margin-right': '3%',
                        'top': '1%',
                        'height': '4vh',
                        'width': '5%'
                    });
                    $(".capter.t24h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '1%',
                        'height': '4vh',
                        'width': '5%'
                    });
                    $(".capter.t25h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t25h .capterTitle .toLeft").css({
                        'margin-left': '28%',
                        'margin-right': '3%',
                        'top': '2%',
                        'height': '4vh',
                        'width': '3%'
                    });
                    $(".capter.t25h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '2%',
                        'height': '4vh',
                        'width': '3%'
                    });
                    $(".capter.t26h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t26h .capterTitle .toLeft").css({
                        'margin-left': '28%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '5%'
                    });
                    $(".capter.t26h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '5%'
                    });
                    $(".capter.t27h .capterTitle .capterName").css('width', '45%');
                    $(".capter.t27h .capterTitle .toLeft").css({
                        'margin-left': '14%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '9%'
                    });
                    $(".capter.t27h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '9%'
                    });
                    $(".capter.t28h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t28h .capterTitle .toLeft").css({
                        'margin-left': '25%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '6%'
                    });
                    $(".capter.t28h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '6%'
                    });
                    $(".capter.t29h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t29h .capterTitle .toLeft").css({
                        'margin-left': '28%',
                        'margin-right': '3%',
                        'top': '2%',
                        'height': '4vh',
                        'width': '3.5%'
                    });
                    $(".capter.t29h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '2%',
                        'height': '4vh',
                        'width': '3.5%'
                    });
                    $(".capter.t30h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t30h .capterTitle .toLeft").css({
                        'margin-left': '28%',
                        'margin-right': '3%',
                        'top': '2%',
                        'height': '4vh',
                        'width': '4.3%'
                    });
                    $(".capter.t30h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '2%',
                        'height': '4vh',
                        'width': '4.3%'
                    });

                    $(".capter.t31h .capterTitle .capterName").css('width', '35%');
                    $(".capter.t31h .capterTitle .toLeft").css({
                        'margin-left': '22%',
                        'margin-right': '3%',
                        'top': '1%',
                        'height': '4vh',
                        'width': '6.7%'
                    });
                    $(".capter.t31h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '1%',
                        'height': '4vh',
                        'width': '6.7%'
                    });
                } else if (arrIndex == 3) {
                    $(".capter.t21h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t21h .capterTitle .toLeft").css({
                        'margin-left': '28%',
                        'margin-right': '3%',
                        'top': '3%',
                        'height': '4vh',
                        'width': '3%'
                    });
                    $(".capter.t21h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '3%',
                        'height': '4vh',
                        'width': '3%'
                    });
                    $(".capter.t22h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t22h .capterTitle .toLeft").css({
                        'margin-left': '28%',
                        'margin-right': '3%',
                        'top': '3%',
                        'height': '4vh',
                        'width': '4%'
                    });
                    $(".capter.t22h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '3%',
                        'height': '4vh',
                        'width': '4%'
                    });
                    $(".capter.t23h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t23h .capterTitle .toLeft").css({
                        'margin-left': '24%',
                        'margin-right': '3%',
                        'top': '1%',
                        'height': '4vh',
                        'width': '7%'
                    });
                    $(".capter.t23h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '1%',
                        'height': '4vh',
                        'width': '7%'
                    });
                    $(".capter.t24h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t24h .capterTitle .toLeft").css({
                        'margin-left': '28%',
                        'margin-right': '3%',
                        'top': '2%',
                        'height': '4vh',
                        'width': '4%'
                    });
                    $(".capter.t24h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '2%',
                        'height': '4vh',
                        'width': '4%'
                    });
                    $(".capter.t25h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t25h .capterTitle .toLeft").css({
                        'margin-left': '27%',
                        'margin-right': '3%',
                        'top': '3%',
                        'height': '4vh',
                        'width': '2.5%'
                    });
                    $(".capter.t25h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '3%',
                        'height': '4vh',
                        'width': '2.5%'
                    });
                    $(".capter.t26h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t26h .capterTitle .toLeft").css({
                        'margin-left': '28%',
                        'margin-right': '3%',
                        'top': '2%',
                        'height': '4vh',
                        'width': '4%'
                    });
                    $(".capter.t26h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '2%',
                        'height': '4vh',
                        'width': '4%'
                    });
                    $(".capter.t27h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t27h .capterTitle .toLeft").css({
                        'margin-left': '28%',
                        'margin-right': '3%',
                        'top': '1%',
                        'height': '4vh',
                        'width': '7%'
                    });
                    $(".capter.t27h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '1%',
                        'height': '4vh',
                        'width': '7%'
                    });
                    $(".capter.t28h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t28h .capterTitle .toLeft").css({
                        'margin-left': '28%',
                        'margin-right': '3%',
                        'top': '1%',
                        'height': '4vh',
                        'width': '4%'
                    });
                    $(".capter.t28h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '1%',
                        'height': '4vh',
                        'width': '4%'
                    });
                    $(".capter.t29h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t29h .capterTitle .toLeft").css({
                        'margin-left': '28%',
                        'margin-right': '3%',
                        'top': '2%',
                        'height': '4vh',
                        'width': '3%'
                    });
                    $(".capter.t29h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '2%',
                        'height': '4vh',
                        'width': '3%'
                    });
                    $(".capter.t30h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t30h .capterTitle .toLeft").css({
                        'margin-left': '28%',
                        'margin-right': '3%',
                        'top': '2%',
                        'height': '4vh',
                        'width': '3.3%'
                    });
                    $(".capter.t30h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '2%',
                        'height': '4vh',
                        'width': '3.3%'
                    });

                    $(".capter.t31h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t31h .capterTitle .toLeft").css({
                        'margin-left': '28%',
                        'margin-right': '3%',
                        'top': '2%',
                        'height': '4vh',
                        'width': '4.7%'
                    });
                    $(".capter.t31h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '2%',
                        'height': '4vh',
                        'width': '4.7%'
                    });
                } else if (arrIndex == 2) {
                    $(".capter.t21h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t21h .capterTitle .toLeft").css({
                        'margin-left': '28%',
                        'margin-right': '3%',
                        'top': '3%',
                        'height': '4vh',
                        'width': '3%'
                    });
                    $(".capter.t21h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '3%',
                        'height': '4vh',
                        'width': '3%'
                    });
                    $(".capter.t22h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t22h .capterTitle .toLeft").css({
                        'margin-left': '28%',
                        'margin-right': '3%',
                        'top': '3%',
                        'height': '4vh',
                        'width': '3%'
                    });
                    $(".capter.t22h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '3%',
                        'height': '4vh',
                        'width': '3%'
                    });
                    $(".capter.t23h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t23h .capterTitle .toLeft").css({
                        'margin-left': '26%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '5%'
                    });
                    $(".capter.t23h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '5%'
                    });
                    $(".capter.t24h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t24h .capterTitle .toLeft").css({
                        'margin-left': '28%',
                        'margin-right': '3%',
                        'top': '3%',
                        'height': '4vh',
                        'width': '3%'
                    });
                    $(".capter.t24h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '3%',
                        'height': '4vh',
                        'width': '3%'
                    });
                    $(".capter.t25h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t25h .capterTitle .toLeft").css({
                        'margin-left': '28%',
                        'margin-right': '3%',
                        'top': '3%',
                        'height': '4vh',
                        'width': '2%'
                    });
                    $(".capter.t25h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '3%',
                        'height': '4vh',
                        'width': '2%'
                    });
                    $(".capter.t26h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t26h .capterTitle .toLeft").css({
                        'margin-left': '28%',
                        'margin-right': '3%',
                        'top': '3%',
                        'height': '4vh',
                        'width': '3%'
                    });
                    $(".capter.t26h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '3%',
                        'height': '4vh',
                        'width': '3%'
                    });
                    $(".capter.t27h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t27h .capterTitle .toLeft").css({
                        'margin-left': '28%',
                        'margin-right': '3%',
                        'top': '0',
                        'height': '4vh',
                        'width': '5%'
                    });
                    $(".capter.t27h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '0',
                        'height': '4vh',
                        'width': '5%'
                    });
                    $(".capter.t28h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t28h .capterTitle .toLeft").css({
                        'margin-left': '28%',
                        'margin-right': '3%',
                        'top': '3%',
                        'height': '4vh',
                        'width': '3%'
                    });
                    $(".capter.t28h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '3%',
                        'height': '4vh',
                        'width': '3%'
                    });
                    $(".capter.t29h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t29h .capterTitle .toLeft").css({
                        'margin-left': '28%',
                        'margin-right': '3%',
                        'top': '3%',
                        'height': '4vh',
                        'width': '2%'
                    });
                    $(".capter.t29h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '3%',
                        'height': '4vh',
                        'width': '2%'
                    });
                    $(".capter.t30h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t30h .capterTitle .toLeft").css({
                        'margin-left': '28%',
                        'margin-right': '3%',
                        'top': '3%',
                        'height': '4vh',
                        'width': '2.3%'
                    });
                    $(".capter.t30h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '3%',
                        'height': '4vh',
                        'width': '2.3%'
                    });
                    $(".capter.t31h .capterTitle .capterName").css('width', '30%');
                    $(".capter.t31h .capterTitle .toLeft").css({
                        'margin-left': '28%',
                        'margin-right': '3%',
                        'top': '2%',
                        'height': '4vh',
                        'width': '3.7%'
                    });
                    $(".capter.t31h .capterTitle .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '2%',
                        'height': '4vh',
                        'width': '3.7%'
                    });
                } else if (arrIndex == 0) {
                    $(".capterName").css('width', '30%');
                    $(".toLeft").css({
                        'margin-left': '28%',
                        'margin-right': '3%',
                        // 'top':'1.1%',
                        'height': '5vh',
                        'width': '3%'
                    });
                    $(".toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        // 'top':'1.1%',
                        'height': '5vh',
                        'width': '3%'
                    });
                } else if (arrIndex == 1) {
                    $(".capterName").css('width', '30%');
                    $(".toLeft").css({
                        'margin-left': '28%',
                        'margin-right': '3%',
                        'top': '14.1%',
                        'height': '5vh',
                        'width': '3%'
                    });
                    $(".toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '14.1%',
                        'height': '5vh',
                        'width': '3%'
                    });
                }

                //调整章节与课程之间的连接块，不出现空白
                if (arrIndex == 0) {
                    $(".capter.t21h .capterDetail").css({
                        'background-position': '19% 1.3%',
                        'background-size': '95.5% 2%'
                    });
                    $(".capter.t22h .capterDetail").css({
                        'background-position': '20% 1.3%',
                        'background-size': '95.5% 2%'
                    });
                    $(".capter.t23h .capterDetail").css({
                        'background-position': '20% 1.3%',
                        'background-size': '90.5% 2%'
                    });
                    $(".capter.t24h .capterDetail").css({
                        'background-position': '20% 1.3%',
                        'background-size': '94% 2%'
                    });
                    $(".capter.t25h .capterDetail").css({
                        'background-position': '20% 1.3%',
                        'background-size': '96.5% 2%'
                    });
                    $(".capter.t26h .capterDetail").css({
                        'background-position': '22% 1.3%',
                        'background-size': '95% 2%'
                    });
                    $(".capter.t27h .capterDetail").css({
                        'background-position': '20% 1.3%',
                        'background-size': '90% 2%'
                    });
                    $(".capter.t28h .capterDetail").css({
                        'background-position': '22% 1.3%',
                        'background-size': '93% 2%'
                    });
                    $(".capter.t29h .capterDetail").css({
                        'background-position': '20% 1.3%',
                        'background-size': '96% 2%'
                    });
                    $(".capter.t30h .capterDetail").css({
                        'background-position': '22% 1.3%',
                        'background-size': '95% 2%'
                    });
                    $(".capter.t31h .capterDetail").css({
                        'background-position': '20% 1.3%',
                        'background-size': '93% 2%'
                    });
                } else if (arrIndex == 1) {
                    $(".capter.t21h .capterDetail").css({
                        'background-position': '40% 1.3%',
                        'background-size': '95% 2%'
                    });
                    $(".capter.t22h .capterDetail").css({
                        'background-position': '40% 1.3%',
                        'background-size': '94% 2%'
                    });
                    $(".capter.t23h .capterDetail").css({
                        'background-position': '40% 1.3%',
                        'background-size': '88% 2%'
                    });
                    $(".capter.t24h .capterDetail").css({
                        'background-position': '40% 1.3%',
                        'background-size': '92% 2%'
                    });
                    $(".capter.t25h .capterDetail").css({
                        'background-position': '40% 1.3%',
                        'background-size': '95% 2%'
                    });
                    $(".capter.t26h .capterDetail").css({
                        'background-position': '40% 1.3%',
                        'background-size': '93% 2%'
                    });
                    $(".capter.t27h .capterDetail").css({
                        'background-position': '40% 1.3%',
                        'background-size': '88% 2%'
                    });
                    $(".capter.t28h .capterDetail").css({
                        'background-position': '40% 1.3%',
                        'background-size': '92% 2%'
                    });
                    $(".capter.t29h .capterDetail").css({
                        'background-position': '48% 1.3%',
                        'background-size': '94% 2%'
                    });
                    $(".capter.t30h .capterDetail").css({
                        'background-position': '40% 1.3%',
                        'background-size': '95% 2%'
                    });
                    $(".capter.t31h .capterDetail").css({
                        'background-position': '40% 1.3%',
                        'background-size': '92% 2%'
                    });
                } else if (arrIndex == 2) {
                    $(".capter.t21h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '95% 2%'
                    });
                    $(".capter.t22h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '94% 2%'
                    });
                    $(".capter.t23h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '89% 2%'
                    });
                    $(".capter.t24h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '92% 2%'
                    });
                    $(".capter.t25h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '95% 2%'
                    });
                    $(".capter.t26h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '94% 2%'
                    });
                    $(".capter.t27h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '88% 2%'
                    });
                    $(".capter.t28h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '92% 2%'
                    });
                    $(".capter.t29h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '95% 2%'
                    });
                    $(".capter.t30h .capterDetail").css({
                        'background-position': '65% 1.3%',
                        'background-size': '95% 2%'
                    });
                    $(".capter.t31h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '91% 2%'
                    });
                } else if (arrIndex == 3) {
                    $(".capter.t21h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '93% 2%'
                    });
                    $(".capter.t22h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '92% 2%'
                    });
                    $(".capter.t23h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '84% 2%'
                    });
                    $(".capter.t24h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '90% 2%'
                    });
                    $(".capter.t25h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '94% 2%'
                    });
                    $(".capter.t26h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '91% 2%'
                    });
                    $(".capter.t27h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '84% 2%'
                    });
                    $(".capter.t28h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '89% 2%'
                    });
                    $(".capter.t29h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '93% 2%'
                    });
                    $(".capter.t30h .capterDetail").css({
                        'background-position': '65% 1.3%',
                        'background-size': '92% 2%'
                    });
                    $(".capter.t31h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '88% 2%'
                    });
                } else if (arrIndex == 4) {
                    $(".capter.t21h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '90% 2%'
                    });
                    $(".capter.t22h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '90% 2%'
                    });
                    $(".capter.t23h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '80% 2%'
                    });
                    $(".capter.t24h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '88% 2%'
                    });
                    $(".capter.t25h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '93% 2%'
                    });
                    $(".capter.t26h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '90% 2%'
                    });
                    $(".capter.t27h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '80% 2%'
                    });
                    $(".capter.t28h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '87% 2%'
                    });
                    $(".capter.t29h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '93% 2%'
                    });
                    $(".capter.t30h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '90% 2%'
                    });
                    $(".capter.t31h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '86% 2%'
                    });
                } else if (arrIndex == 5) {
                    $(".capter.t21h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '88% 2%'
                    });
                    $(".capter.t22h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '87% 2%'
                    });
                    $(".capter.t23h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '77% 2%'
                    });
                    $(".capter.t24h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '85% 2%'
                    });
                    $(".capter.t25h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '91% 2%'
                    });
                    $(".capter.t26h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '86% 2%'
                    });
                    $(".capter.t27h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '77% 2%'
                    });
                    $(".capter.t28h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '84% 2%'
                    });
                    $(".capter.t29h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '90% 2%'
                    });
                    $(".capter.t30h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '88% 2%'
                    });
                    $(".capter.t31h .capterDetail").css({
                        'background-position': '63% 1.3%',
                        'background-size': '82% 2%'
                    });

                } else if (arrIndex < 9) {
                    if (arrIndex == 6) {
                        $(".capter.t21h .capterDetailKnowledge").css({
                            'background-position': '70% 1.3%',
                            'background-size': '90% 2%'
                        });
                        $(".capter.t22h .capterDetailKnowledge").css({
                            'background-position': '70% 1.3%',
                            'background-size': '90% 2%'
                        });
                        $(".capter.t23h .capterDetailKnowledge").css({
                            'background-position': '70% 1.3%',
                            'background-size': '84% 2%'
                        });
                        $(".capter.t24h .capterDetailKnowledge").css({
                            'background-position': '70% 1.3%',
                            'background-size': '90% 2%'
                        });
                        $(".capter.t25h .capterDetailKnowledge").css({
                            'background-position': '70% 1.3%',
                            'background-size': '90% 2%'
                        });
                        $(".capter.t26h .capterDetailKnowledge").css({
                            'background-position': '70% 1.3%',
                            'background-size': '90% 2%'
                        });
                        $(".capter.t27h .capterDetailKnowledge").css({
                            'background-position': '70% 1.3%',
                            'background-size': '84% 2%'
                        });
                        $(".capter.t28h .capterDetailKnowledge").css({
                            'background-position': '70% 1.3%',
                            'background-size': '87% 2%'
                        });
                        $(".capter.t29h .capterDetailKnowledge").css({
                            'background-position': '70% 1.3%',
                            'background-size': '90% 2%'
                        });
                        $(".capter.t30h .capterDetailKnowledge").css({
                            'background-position': '70% 1.3%',
                            'background-size': '88% 2%'
                        });
                        $(".capter.t31h .capterDetailKnowledge").css({
                            'background-position': '70% 1.3%',
                            'background-size': '87% 2%'
                        });
                    }
                    else if (arrIndex == 7) {
                        $(".capter.t21h .capterDetailKnowledge").css({
                            'background-position': '70% 1.3%',
                            'background-size': '85% 2%'
                        });
                        $(".capter.t22h .capterDetailKnowledge").css({
                            'background-position': '70% 1.3%',
                            'background-size': '85% 2%'
                        });
                        $(".capter.t23h .capterDetailKnowledge").css({
                            'background-position': '70% 1.3%',
                            'background-size': '78% 2%'
                        });
                        $(".capter.t24h .capterDetailKnowledge").css({
                            'background-position': '70% 1.3%',
                            'background-size': '85% 2%'
                        });
                        $(".capter.t25h .capterDetailKnowledge").css({
                            'background-position': '70% 1.3%',
                            'background-size': '87% 2%'
                        });
                        $(".capter.t26h .capterDetailKnowledge").css({
                            'background-position': '70% 1.3%',
                            'background-size': '85% 2%'
                        });
                        $(".capter.t27h .capterDetailKnowledge").css({
                            'background-position': '70% 1.3%',
                            'background-size': '80% 2%'
                        });
                        $(".capter.t28h .capterDetailKnowledge").css({
                            'background-position': '70% 1.3%',
                            'background-size': '83% 2%'
                        });
                        $(".capter.t29h .capterDetailKnowledge").css({
                            'background-position': '70% 1.3%',
                            'background-size': '85% 2%'
                        });
                        $(".capter.t30h .capterDetailKnowledge").css({
                            'background-position': '70% 1.3%',
                            'background-size': '83% 2%'
                        });
                        $(".capter.t31h .capterDetailKnowledge").css({
                            'background-position': '70% 1.3%',
                            'background-size': '83% 2%'
                        });
                    } else {
                        $(".capter.t21h .capterDetailKnowledge").css({
                            'background-position': '70% 1.3%',
                            'background-size': '78% 2%'
                        });
                        $(".capter.t22h .capterDetailKnowledge").css({
                            'background-position': '70% 1.3%',
                            'background-size': '78% 2%'
                        });
                        $(".capter.t23h .capterDetailKnowledge").css({
                            'background-position': '70% 1.3%',
                            'background-size': '70% 2%'
                        });
                        $(".capter.t24h .capterDetailKnowledge").css({
                            'background-position': '70% 1.3%',
                            'background-size': '79% 2%'
                        });
                        $(".capter.t25h .capterDetailKnowledge").css({
                            'background-position': '70% 1.3%',
                            'background-size': '81% 2%'
                        });
                        $(".capter.t26h .capterDetailKnowledge").css({
                            'background-position': '70% 1.3%',
                            'background-size': '78% 2%'
                        });
                        $(".capter.t27h .capterDetailKnowledge").css({
                            'background-position': '70% 1.3%',
                            'background-size': '68% 2%'
                        });
                        $(".capter.t28h .capterDetailKnowledge").css({
                            'background-position': '70% 1.3%',
                            'background-size': '75% 2%'
                        });
                        $(".capter.t29h .capterDetailKnowledge").css({
                            'background-position': '70% 1.3%',
                            'background-size': '78% 2%'
                        });
                        $(".capter.t30h .capterDetailKnowledge").css({
                            'background-position': '70% 1.3%',
                            'background-size': '74% 2%'
                        });
                        $(".capter.t31h .capterDetailKnowledge").css({
                            'background-position': '70% 1.3%',
                            'background-size': '75% 2%'
                        });
                    }
                } else if(arrIndex == 9) {
                    $(".capterDetailKnowledge").css({'background-position': '45% 1.3%', 'background-size': '68.5% 2%'});
                } else if (arrIndex == 10) {

                }

                //调整章节的字体大小
                if (arrIndex < 7) {
                    $('.capterUl li').css({'margin': '0 auto'});
                    $(".capterName").css('font-size', '1.7vw');
                } else if (arrIndex < 9) {
                    $('.capterUl li').css({'margin': '0 auto'});
                    $(".capterName").css('font-size', '1.3vw');
                } else if (arrIndex == 9) {
                    $('.capterUl li').css({'margin': '0 19%'});
                    $(".capterName").css('font-size', '1vw');
                }

                //上调横穿章节名称的底边线
                if (arrIndex != 0) {
                    if (arrIndex == 10) {
                        $('.mainContent').css('background-position', '0 3.8%');
                    } else {
                        $('.mainContent').css('background-position', '0 5.8%');
                    }

                    $(".classContent").css({'width': '2vw', 'margin': '0 -7%', 'padding-top': '55%'});
                    $('.addOrDel.add').css('width', '2vw');
                    $('.addOrDel.del').css('width', '2vw');
                    if (arrIndex < 6) {
                        $(".classCategory").css({'width': '2vw', 'margin': '-20% -7% 0'});
                    } else {
                        $(".classCategory").css({'width': '2vw', 'margin': '-40% -7% 0'});
                    }
                    if (arrIndex < 9) {
                        $('.addHomework,.addCorrect,.addTeamEvaluate,.addSuggest,.addDefect').css({'font-size': ''});
                        if (arrIndex == 5) {
                            $('.addHomework').css({'width': '2.8vw', 'margin': '0 -0.55vw'});
                            $('.addCorrect').css({'width': '2.8vw', 'margin': '0 -0.55vw'});
                            $('.addTeamEvaluate').css({'width': '2.8vw', 'margin': '0 -0.55vw'});
                            $('.addSuggest').css({'width': '2.8vw', 'margin': '0 -0.55vw'});
                            // $('.addPaper').css({'width':'2.8vw','margin': '0 -0.55vw'});
                            $('.addDefect').css({'width': '2.8vw', 'margin': '0 -0.55vw'});
                        } else if (arrIndex == 8) {
                            $('.addHomework').css({
                                'width': '2.8vw',
                                'margin': '0 -0.55vw',
                                'border-left': '1px solid #D1CDC2',
                                'border-right': '1px solid #D1CDC2'
                            });
                            $('.addCorrect').css({
                                'width': '2.8vw',
                                'margin': '0 -0.55vw',
                                'border-left': '1px solid #D1CDC2',
                                'border-right': '1px solid #D1CDC2'
                            });
                            $('.addTeamEvaluate').css({
                                'width': '2.8vw',
                                'margin': '0 -0.55vw',
                                'border-left': '1px solid #D1CDC2',
                                'border-right': '1px solid #D1CDC2'
                            });
                            $('.addSuggest').css({
                                'width': '2.8vw',
                                'margin': '0 -0.55vw',
                                'border-left': '1px solid #D1CDC2',
                                'border-right': '1px solid #D1CDC2'
                            });
                            // $('.addPaper').css({'width':'2.8vw','margin': '0 -0.55vw','border-left':'1px solid #D1CDC2','border-right':'1px solid #D1CDC2'});
                            $('.addDefect').css({
                                'width': '2.8vw',
                                'margin': '0 -0.55vw',
                                'border-left': '1px solid #D1CDC2',
                                'border-right': '1px solid #D1CDC2'
                            });
                        } else {
                            $('.addHomework').css({'width': '3.3vw', 'margin': '0 -1vw'});
                            $('.addCorrect').css({'width': '3.3vw', 'margin': '0 -1vw'});
                            $('.addTeamEvaluate').css({'width': '3.3vw', 'margin': '0 -1vw'});
                            $('.addSuggest').css({'width': '3.3vw', 'margin': '0 -1vw'});
                            // $('.addPaper').css({'width':'3.3vw','margin': '0 -1vw'});
                            $('.addDefect').css({'width': '3.3vw', 'margin': '0 -1vw'});
                        }
                    } else {
                        $('.sumClassCategory1').css({
                            'font-size': '1.2vw',
                            'width': '1.35vw',
                            'margin': '4.3vh 0 0 -5.3vw'
                        });
                        $('.addHomework').css({'width': '2.4vw', 'margin': '0 -3.8vw', 'font-size': '1vw'});
                        $('.addCorrect').css({'width': '2.4vw', 'margin': '0 -3.8vw', 'font-size': '1vw'});
                        $('.addTeamEvaluate').css({'width': '2.4vw', 'margin': '0 -3.8vw', 'font-size': '1vw'});
                        $('.addSuggest').css({'width': '2.4vw', 'margin': '0 -3.8vw', 'font-size': '1vw'});
                        // $('.addPaper').css({'width':'3.3vw','margin': '0 -3.15vw'});
                        $('.addDefect').css({'width': '2.4vw', 'margin': '0 -3.8vw', 'font-size': '1vw'});
                    }
                } else {
                    // 下调横穿章节名称的底边线
                    $('.mainContent').css('background-position', '0 4%');
                    $(".classCategory").css({'width': '20%', 'margin': '-8% -7% 0'});
                    $(".classContent").css({'width': '20%', 'margin': '0 -7%', 'padding-top': '14%'});
                    $('.addHomework').css({'width': '33%', 'margin-left': '-13%'});
                    $('.addCorrect').css({'width': '33%', 'margin-left': '-13%'});
                    $('.addTeamEvaluate').css({'width': '33%', 'margin-left': '-13%'});
                    $('.addSuggest').css({'width': '33%', 'margin-left': '-13%'});
                    $('.addPaper').css({'width': '33%', 'margin-left': '-13%'});
                    $('.addDefect').css({'width': '33%', 'margin-left': '-13%'});
                    $('.addOrDel.add').css({'width': '20%', 'margin': '0 -7%'});
                    $('.addOrDel.del').css({'width': '20%'});
                }

                //============================by hank-yan===============================


                // flag ==1 时候是 双击之后的状态，显示了周次信息（添加评测级以及课标级时，不需要考虑这些问题）
                // 双击之后更改宽高
                if ($('.weekDayNum').attr('flag') == 1) {
                    if (arrIndex > 5) {
                        $('.maskCapterTitle').css('top', '8.5vh');
                        $('.headInfo').css('height', '8.5vh');
                        $('.weekDayNum').attr('flag', 0).css('display', 'none');
                    } else if (arrIndex <= 5) {
                        $('.maskCapterTitle').css('top', '13.5vh');
                        $('.headInfo').css('height', '13.5vh');
                        $('.weekDayNum').attr('flag', 1).css('display', 'block');
                    }
                }
            }, {passive: true});
        },
    };

    module.exports = pikachu;
});
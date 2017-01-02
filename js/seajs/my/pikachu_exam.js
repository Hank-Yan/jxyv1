/**
 * Created by hank-yan on 2016/12/22.
 * desc 将原来页面的主逻辑拆分出来了。看起来更加清晰，更加容易掌控.
 * 在这个等级缩放的时候，都是整数个滑块
 *
 * 常量参考：3.59 是一个周所占的比例
 * 常量参考：6 是秋季学期与班级名称所占的百分比
 * 常量参考：88 weekinfo 占比
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
    // 常量列表
    var
        // 一个周的宽度倍率
        WEEK_WIDTH_RATE = 3.59,
        // 顶部左右两侧，控制知识态或者群组态的方块宽度
        HEAD_STATE_CONTROL_WIDTH = 6,
        // webinfo 的占比
        WEB_INFO_WIDTH = 88
        ;

    // 基本参数设置
    var
        // 评测级索引
        arrExamIndex = 0,
        // 模拟一个中心点，因为评测级不像周次，以一个周为中心放缩，所以需要模拟一个中心点放缩
        curCenter,
        // 当前选中的周次要做成全局的变量
        selectedSize,
        // 当前设备的屏幕宽度
        screenWidth,
        // 顶部weekInfo一个周次的基本宽度，用百分比表示
        baseWeekWidth,
        // 顶部蒙层宽度数组：顶部遮罩每一个层级下的宽度（共9 层， 0-8）
        topMaskWidthArr,
        // 底部内容部分宽度数组
        bottomWidthArr
        ;
    screenWidth = $(window).width();//当前屏幕有效宽度
    console.log(screenWidth);
    baseWeekWidth = (WEEK_WIDTH_RATE + 0.1) * screenWidth;
    topMaskWidthArr = [4 * baseWeekWidth, 6 * baseWeekWidth, 8 * baseWeekWidth, 10 * baseWeekWidth, 12 * baseWeekWidth, 14 * baseWeekWidth, 16 * baseWeekWidth, 20 * baseWeekWidth, 24 * baseWeekWidth];

    bottomWidthArr = [6.527 * screenWidth, 4 * screenWidth, 3.05 * screenWidth, 2.5 * screenWidth, 2 * screenWidth,
        1.8 * screenWidth, 1.7 * screenWidth, 1.5 * screenWidth, screenWidth];

    // 引入其他依赖库
    var wheelUtils = require('./wheelUtils.js');

    // 执行总逻辑
    var pikachu_exam = {
        run: function () {
            // 周次的信息，开始时候隐藏起来
            this.addExamWeekInfo();
            // 缩放控制
            this.mouseWheel();
            // 顶部蒙层控制
            this.topMaskMove();
        },
        // 顶部蒙层周次信息(1-24周，数据是通过js控制的)
        addExamWeekInfo: function () {
            var addExamWeekInfo = require('./addExamWeekInfo.js');
            addExamWeekInfo.run();
        },
        // 顶部蒙层拖动事件响应
        topMaskMove: function () {
            var
                // 移动后距离左侧的边距
                leftAfterMove,
                selectedWeekIndex;

            // 拖动逻辑
            $('.examTopMask')
                .draggable({
                    axis: "x",
                    containment: ".weekInfo",// containment 是被约束在哪个元素里面
                    scroll: false,
                    cursor: "pointer",
                    drag: function (event, ui) {
                        // ui 是jquery 里面封装的对象，包含position 里面有拖动后的 left 和 top
                        //移动过后滑块的左边距的像素
                        leftAfterMove = ui.position.left;
                        // 使用四舍五入比之前杰少的向下取整更加精确一点
                        selectedWeekIndex = Math.round((leftAfterMove / screenWidth * 100 - 6) / 3.59);
                        // 获取当前被选中的周次信息
                        selectedSize = $('.weekExamNum span.selected').size();

                        // 边界判断
                        if (selectedWeekIndex < 0) {
                            selectedWeekIndex = 0;
                        } else if ((selectedWeekIndex + selectedSize) > 23) {
                            selectedWeekIndex = 24 - selectedSize;
                        }

                        // 为选中区域添加 class = 'selected'
                        if (selectedWeekIndex >= 0 && selectedWeekIndex <= 23) {
                            $(".weekExamNum span").siblings().removeClass("selected").removeAttr("style");
                            for (var i = 0; i < selectedSize; i++) {
                                $(".weekExamNum span").eq(selectedWeekIndex + i).addClass("selected");
                            }
                        }

                        // 移动完毕设置中心
                        curCenter = selectedWeekIndex + selectedSize / 2 - 1;
                        $(".weekExamNum span").siblings().removeClass("curCenter");
                        $(".weekExamNum span").eq(curCenter).addClass('curCenter');

                        //拖拽时置maskExamTitle的值
                        pikachu_exam.setMaskExamTitle(selectedWeekIndex);

                        var examConWidth = parseInt($(".examCon").css('width'));
                        // 计算课程主区域应该左移的距离
                        var bottomLeft = (leftAfterMove / screenWidth * 100 - 6) / 88 * examConWidth;
                        $(".examMainContent").animate({scrollLeft: bottomLeft + 'px'}, 10);
                    },

                });
        },
        // 滚轮滚动的逻辑
        mouseWheel: function () {
            $('.examMainContent').mousewheel(function (event, delta) {
                var
                    // 中心点距离左侧的边距（几个周次）
                    distanceLeft,
                    // 中心点距离右侧的边距（几个周次）
                    distanceRight,
                    // 临时变量，用于记录越界情况下的越界数量
                    step = 0,
                    // 遮罩宽度
                    topMaskWidth,
                    // 遮罩动画事件
                    maskAnimateTime = 100,
                    // 遮罩距离左侧距离
                    maskToTopLeft,
                    // 被选中第一个周的索引
                    selectedWeekIndex,
                    // 顶部遮罩左边距的噪声
                    topMaskLeftNoise,
                    // 底部内容宽度
                    bottomWidth,
                    animateTime = 100
                    ;
                // 阻止事件冒泡
                event.stopPropagation();
                // delta 代表鼠标滚轮滚动的方向，取两个值 1 或者 -1
                delta > 0 ? arrExamIndex-- : arrExamIndex++;

                // ==================================换层边界判断 begin============================================
                // 如果 arrExamIndex<0 说明需要恢复课时级状态
                if (arrExamIndex < 0) {
                    // 课时级显示，评测级隐藏
                    pikachu_exam.examHideAndClassShow();
                    // 恢复课时级下 index=9 的状态
                    var recovery = require('./recoveryNineStateOfClassLevel.js');
                    recovery.run();
                    // 防止事件后续事件执行
                    return;
                }

                // 跳到下一层
                if (arrExamIndex > 8) {
                    pikachu_exam.examHideAndStandardShow();
                }
                // ==================================换层边界判断 end===========================================

                // =================================顶部控制 begin======================================

                // ====================判断缩放后应该哪些周处于选中状态 begin=====================
                curCenter = $('.weekExamNum span.curCenter').index();
                if (arrExamIndex < 7) {
                    distanceLeft = arrExamIndex + 1;
                    distanceRight = arrExamIndex + 2;
                } else if (arrExamIndex == 7) {
                    distanceLeft = arrExamIndex + 2;
                    distanceRight = arrExamIndex + 3;
                } else if (arrExamIndex == 8) {
                    distanceLeft = arrExamIndex + 3;
                    distanceRight = arrExamIndex + 4;
                }
                var fromSelectedWeekIndex = curCenter - distanceLeft;//黑色字体周次的起始索引
                // 左边界越界处理
                if (fromSelectedWeekIndex < 0) {
                    step = Math.abs(fromSelectedWeekIndex);
                    fromSelectedWeekIndex = 0;
                }
                var toSelectedWeekIndex = curCenter + step + distanceRight;//黑色字体周次的终止索引
                // 右边界越界处理
                if (toSelectedWeekIndex > 23) {
                    step = Math.abs(toSelectedWeekIndex - 23);
                    toSelectedWeekIndex = 23;
                    fromSelectedWeekIndex = curCenter - distanceLeft - step;
                }

                // console.log('arrExamIndex: ' + arrExamIndex);
                // console.log('curCenter' + curCenter);
                // console.log('distanceLeft' + distanceLeft);
                // console.log('distanceRight' + distanceRight);
                // console.log('fromSelectedWeekIndex: ' + fromSelectedWeekIndex);
                // console.log('toSelectedWeekIndex: ' + toSelectedWeekIndex);

                $(".weekExamNum span").siblings().removeClass("selected").removeAttr("style");
                for (var i = fromSelectedWeekIndex; i <= toSelectedWeekIndex; i++) {
                    $(".weekExamNum span").eq(i).addClass("selected");
                }
                // ====================判断缩放后应该哪些周处于选中状态 end=====================

                // ==================== 遮罩控制 begin==================
                // ① 设置遮罩宽度，除100 换算百分制，提前计算好
                topMaskWidth = topMaskWidthArr[arrExamIndex] / 100;
                topMaskWidth = topMaskWidth > topMaskWidthArr[8] / 100 ? topMaskWidthArr[8] / 100 : topMaskWidth;
                topMaskWidth = topMaskWidth <= topMaskWidthArr[0] / 100 ? topMaskWidthArr[0] / 100 : topMaskWidth;
                // console.log('topMaskWidth: ' + topMaskWidth);
                $('.examTopMask').animate({'width': topMaskWidth + 'px'}, maskAnimateTime);

                // ② 移动顶层遮罩，依据左边距来计算
                // 获取当前被选中的周次，其前面周次加上时间标题（秋季学期等等）就是 left 距离，百分制
                // 索引是几，前面就有几个
                selectedWeekIndex = $('.weekExamNum span.selected').index();
                // 百分制表示距离左侧的宽度
                // 噪声控制
                if (arrExamIndex < 5) {
                    topMaskLeftNoise = 0.6;
                } else if (arrExamIndex < 7) {
                    topMaskLeftNoise = 0.2;
                } else {
                    topMaskLeftNoise = 0;
                }
                maskToTopLeft = (HEAD_STATE_CONTROL_WIDTH + selectedWeekIndex * WEEK_WIDTH_RATE + topMaskLeftNoise) * screenWidth / 100;
                // console.log('maskToTopLeft: ' + maskToTopLeft / screenWidth);
                $('.examTopMask').animate({'left': maskToTopLeft + 'px'}, maskAnimateTime);
                // ==================== 遮罩控制 end==================
                // ================================= 顶部控制 end========================================

                // ==================== 底部宽度控制 begin===========================================
                // ① 调整底部课程宽度，使其看上去更加紧凑
                // 底部宽度存储在一个数组中，每一个层级下，底部内容部分总宽度是一个值
                bottomWidth = bottomWidthArr[arrExamIndex];
                bottomWidth = bottomWidth > bottomWidthArr[0] ? bottomWidthArr[0] : bottomWidth;
                bottomWidth = bottomWidth < bottomWidthArr[8] ? bottomWidthArr[8] : bottomWidth;
                // ② 调整底部课程的左边距(left)， 使其与顶部遮罩对应
                // 判断顶部的百分比，然后来设置底部的百分比
                // 调整某一周下内容的总宽度
                $('.examCon').animate({'width': bottomWidth + 'px'}, animateTime);
                // 调整完总宽度，设置中心位置，实际上设置 scrollLeft 就OK 啦
                // 应该是相对于当前宽度的百分比位置
                $(".examMainContent").animate({scrollLeft: (maskToTopLeft + 10) / screenWidth * bottomWidth + 'px'}, 10);
                // ==================== 底部宽度控制 end=============================================




                // ==================== 其他需要微调的项begin =============================================
                // capterTitle 表示第几章，第几章（第24章 圆）
                // capterTitle .shengzi 表示章节下面的小方块
                if (arrExamIndex < 7) {
                    // $('.examTitle .shengzi').css({'display': 'inline-block', 'margin-top': '-2%'});
                } else if (arrExamIndex == 8) {
                    // $('.examTitle .shengzi').css({'display': 'inline-block', 'margin-top': '-3%'});
                }

                // maskCapterTitle 刚进来时候顶部显示的章节信息
                if (arrExamIndex == 0 || arrExamIndex == 1) {
                    $(".examTitle").css('visibility', 'hidden');
                    $(".maskExamTitle").css('display', 'block');
                } else {
                    $(".examTitle").css('visibility', 'visible');
                    $(".maskExamTitle").css('display', 'none');
                }


                // 调整箭头宽度
                $('.examTitle .toLeft,.examTitle .toRight').css({'position': 'relative', 'top': 0});
                $('.maskExamTitle .toLeft,.maskExamTitle .toRight').css({'position': 'relative', 'top': 0});


                // 调整章节的字体大小
                if (arrExamIndex < 7) {
                    $('.examUl li').css({'margin': '0 auto'});
                    $(".examName").css('font-size', '1.7vw');
                } else if (arrExamIndex == 9) {
                    $('.examUl li').css({'margin': '0 auto'});
                    $(".examName").css('font-size', '1.3vw');
                }

                console.log(arrExamIndex);
                //上调横穿章节名称的底边线 以及 每一个条目的具体样式
                if (arrExamIndex == 0) {
                    // 到0级的时候，恢复原来样式
                    // 恢复到 arrExamIndex 为0 时候的初始状态
                    $('.examMainContent').css('background-position', '0 4%');
                    $('.examDetail').css('background-position', '23% 1.3%');
                    $(".examCategory").css({'width': '20%', 'margin': '-6% -7% 0'});
                    $(".examContent").css({'width': '20%', 'margin': '0 -7%', 'padding-top': '14%'});
                    $('.addExamsSub1').css({'width': '29%', 'margin-left': '-12%'});
                    $('.addExamsSub2').css({'width': '29%', 'margin-left': '-12%'});
                    $('.addExamsSub3').css({'width': '29%', 'margin-left': '-12%'});
                    $('.addExamsSub4').css({'width': '29%', 'margin-left': '-12%', 'margin-bottom': '-11%'});
                    $('.addExamsSub5').css({'width': '29%', 'margin-left': '-12%'});
                    $('.examUl .addOrDel.add').css({'width': '2vw'});
                    $('.examUl .addOrDel.del').css({'width': '2vw'});
                } else if(arrExamIndex == 1){
                    // 调贯穿章节名称的线， 越小越靠上，越大越靠下
                    $('.examMainContent').css('background-position', '0 3.8%');

                    // 添加删除样式控制
                    $('.examUl .addOrDel.add').css('width', '2vw');
                    $('.examUl .addOrDel.del').css('width', '2vw');

                    // 新课，复习等类别的调控
                    $(".examCategory").css({'width': '30%', 'margin': '-9% -7% 0'});

                    // 竖条内容控制（比如：随机事件与概率）
                    $(".examContent").css({'width': '30%', 'margin': '0 -7%', 'padding-top': '25%'});
                    // 细节样式控制
                    $('.addExamsSub1').css({'width': '40%', 'margin-left': '-12%'});
                    $('.addExamsSub2').css({'width': '40%', 'margin-left': '-12%'});
                    $('.addExamsSub3').css({'width': '40%', 'margin-left': '-12%'});
                    $('.addExamsSub4').css({'width': '40%', 'margin-left': '-12%',  'margin-bottom': '-17%'});
                    $('.addExamsSub5').css({'width': '40%', 'margin-left': '-12%'});

                } else if (arrExamIndex == 2){
                    // 调贯穿章节名称的线， 越小越靠上，越大越靠下
                    $('.examMainContent').css('background-position', '0 5.8%');

                    $(".exam > .examTitle > .examName").css('width', '30%');
                    $(".exam > .examTitle > .toLeft").css({
                        'margin-left': '27%',
                        'margin-right': '3%',
                        'top': '2%',
                        'height': '4vh',
                        'width': '4%'
                    });
                    $(".exam > .examTitle > .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '2%',
                        'height': '4vh',
                        'width': '4%'
                    });

                    // 添加删除样式控制
                    $('.examUl .addOrDel.add').css('width', '2vw');
                    $('.examUl .addOrDel.del').css('width', '2vw');

                    // 新课，复习等类别的调控
                    $(".examCategory").css({'width': '38%', 'margin': '-9% -6% 0px -6%'});

                    // 竖条内容控制（比如：随机事件与概率）
                    $(".examContent").css({'width': '38%', 'margin': '0 -6%', 'padding-top': '20%'});
                    // 细节样式控制
                    $('.addExamsSub1').css({'width': '53%', 'margin-left': '-12%'});
                    $('.addExamsSub2').css({'width': '53%', 'margin-left': '-12%'});
                    $('.addExamsSub3').css({'width': '53%', 'margin-left': '-12%'});
                    $('.addExamsSub4').css({'width': '53%', 'margin-left': '-12%', 'margin-bottom': '-22%'});
                    $('.addExamsSub5').css({'width': '53%', 'margin-left': '-12%'});
                } else if (arrExamIndex == 3){
                    // 调贯穿章节名称的线， 越小越靠上，越大越靠下
                    $('.examMainContent').css('background-position', '0 5.8%');

                    $(".exam > .examTitle > .examName").css('width', '30%');
                    $(".exam > .examTitle > .toLeft").css({
                        'margin-left': '27%',
                        'margin-right': '3%',
                        'top': '2%',
                        'height': '4vh',
                        'width': '5%'
                    });
                    $(".exam > .examTitle > .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '2%',
                        'height': '4vh',
                        'width': '5%'
                    });

                    // 添加删除样式控制
                    $('.examUl .addOrDel.add').css('width', '2vw');
                    $('.examUl .addOrDel.del').css('width', '2vw');

                    // 新课，复习等类别的调控
                    $(".examCategory").css({'width': '46%', 'margin': '-12% -5% 0px -5%'});

                    // 竖条内容控制（比如：随机事件与概率）
                    $(".examContent").css({'width': '46%', 'margin': '0 -5%', 'padding-top': '20%'});
                    // 细节样式控制
                    $('.addExamsSub1').css({'width': '68%', 'margin-left': '-17%'});
                    $('.addExamsSub2').css({'width': '68%', 'margin-left': '-17%'});
                    $('.addExamsSub3').css({'width': '68%', 'margin-left': '-17%'});
                    $('.addExamsSub4').css({'width': '68%', 'margin-left': '-17%', 'margin-bottom': '-30%'});
                    $('.addExamsSub5').css({'width': '68%', 'margin-left': '-17%'});
                } else if (arrExamIndex == 4){
                    // 调贯穿章节名称的线， 越小越靠上，越大越靠下
                    $('.examMainContent').css('background-position', '0 5.8%');

                    // 箭头调控
                    $(".exam > .examTitle > .examName").css('width', '30%');
                    $(".exam > .examTitle > .toLeft").css({
                        'margin-left': '27%',
                        'margin-right': '3%',
                        'top': '2%',
                        'height': '4vh',
                        'width': '5%'
                    });
                    $(".exam > .examTitle > .toRight").css({
                        'margin-left': '3%',
                        'margin-right': '0',
                        'top': '2%',
                        'height': '4vh',
                        'width': '5%'
                    });

                    // 添加删除样式控制
                    $('.examUl .addOrDel.add').css('width', '2vw');
                    $('.examUl .addOrDel.del').css('width', '2vw');

                    // 新课，复习等类别的调控
                    $(".examCategory").css({'width': '38%', 'margin': '-9% -6% 0px -6%'});

                    // 竖条内容控制（比如：随机事件与概率）
                    $(".examContent").css({'width': '38%', 'margin': '0 -6%', 'padding-top': '20%'});
                    // 细节样式控制
                    $('.addExamsSub1').css({'width': '53%', 'margin-left': '-12%'});
                    $('.addExamsSub2').css({'width': '53%', 'margin-left': '-12%'});
                    $('.addExamsSub3').css({'width': '53%', 'margin-left': '-12%'});
                    $('.addExamsSub4').css({'width': '53%', 'margin-left': '-12%', 'margin-bottom': '-22%'});
                    $('.addExamsSub5').css({'width': '53%', 'margin-left': '-12%'});
                } else if (arrExamIndex == 5){
                    // 调贯穿章节名称的线， 越小越靠上，越大越靠下
                    $('.examMainContent').css('background-position', '0 3.8%');

                    // 添加删除样式控制
                    $('.examUl .addOrDel.add').css('width', '2vw');
                    $('.examUl .addOrDel.del').css('width', '2vw');

                    // 新课，复习等类别的调控
                    $(".examCategory").css({'width': '30%', 'margin': '-9% -7% 0'});

                    // 竖条内容控制（比如：随机事件与概率）
                    $(".examContent").css({'width': '30%', 'margin': '0 -7%', 'padding-top': '25%'});
                    // 细节样式控制
                    $('.addExamsSub1').css({'width': '40%', 'margin-left': '-12%'});
                    $('.addExamsSub2').css({'width': '40%', 'margin-left': '-12%'});
                    $('.addExamsSub3').css({'width': '40%', 'margin-left': '-12%'});
                    $('.addExamsSub4').css({'width': '40%', 'margin-left': '-12%'});
                    $('.addExamsSub5').css({'width': '40%', 'margin-left': '-12%'});
                }

                // ==================== 其他需要微调的项end =============================================

            }, {passive: true});
        },
        // 评测级隐藏, 课时级显示
        examHideAndClassShow: function () {
            $('.maskExamTitle').css('display', 'none');
            // 更换蓝色背景bar
            $('.topMask').css('display', 'block');
            $('.examTopMask').css('display', 'none');
            $('#weekNum').css('display', 'block');
            $('#weekExamNum').css('display', 'none');

            $('.mainContent').css('display', 'block');
            $('.examMainContent').css('display', 'none');

            // 状态变化之后，保存鼠标滚轮数值
            arrExamIndex = 0;

            // 保存一些公共资源

        },
        // 评测级隐藏, 课标级显示
        examHideAndStandardShow: function () {
            // 调整 mask 的可见性
            $('.examTopMask').css('display', 'none');// 顶部蒙层
            $('.maskExamTitle').css('display', 'none');
            $('.standardTopMask').css('display', 'block');
            $('.maskStandardTitle').css('display', 'block');// 章节名称

            $('#weekExamNum').css('display', 'none');
            $('#weekStandardNum').css('display', 'block');

            // 课时级显示，同时，各个元素进行初始化操作
            $('.examMainContent').css('display', 'none');
            $('.standardMainContent').css('display', 'block');

            // 状态变化之后，保存鼠标滚轮数值, 往上变化，存储向上的最大值
            arrExamIndex = 8;
        },
        // 移动遮罩的时候，设置标题
        setMaskExamTitle: function (selectedWeekIndex) {
            //拖拽时置maskExamTitle的值
            if (arrExamIndex == 0 || arrExamIndex == 1) {
                if (selectedWeekIndex < 4) {
                    $('.maskExamTitle .examCapterName').html('函数与方程').css('line-height', '7.77vh');
                } else if (selectedWeekIndex < 8) {
                    $('.maskExamTitle .examCapterName').html('方程与图像').css('line-height', '7.77vh');
                } else if (selectedWeekIndex < 12) {
                    $('.maskExamTitle .examCapterName').html('图形与圆').css('line-height', '7.77vh');
                } else if (selectedWeekIndex < 16) {
                    $('.maskExamTitle .examCapterName').html('统计与概率').css('line-height', '7.77vh');
                } else if (selectedWeekIndex < 20) {
                    $('.maskExamTitle .examCapterName').html('反比例函数').css('line-height', '7.77vh');
                } else {
                    $('.maskExamTitle .examCapterName').html('三角形基础').css('line-height', '7.77vh');
                }
            }
        }
    };

    module.exports = pikachu_exam;
});
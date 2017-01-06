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
        arrStandardIndex = 0,
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
    topMaskWidthArr = [4 * baseWeekWidth, 6 * baseWeekWidth, 8 * baseWeekWidth, 10 * baseWeekWidth, 16 * baseWeekWidth, 24 * baseWeekWidth];

    bottomWidthArr = [6.527 * screenWidth, 4 * screenWidth, 3.05 * screenWidth, 2.5 * screenWidth, 1.73 * screenWidth, screenWidth];


    // 执行总逻辑
    var pikachu_standard = {
        run: function () {
            // 周次的信息，开始时候隐藏起来
            this.addStandardWeekInfo();
            // 缩放控制
            this.mouseWheel();
            // 顶部蒙层控制
            this.topMaskMove();
        },
        // 顶部蒙层周次信息(1-24周，数据是通过js控制的)
        addStandardWeekInfo: function () {
            var addStandardWeekInfo = require('./addStandardWeekInfo.js');
            addStandardWeekInfo.run();
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
            $('.standardMainContent').mousewheel(function (event, delta) {
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
                    animateTime = 100,
                    fadeTime = 100
                    ;

                // 阻止事件冒泡
                event.stopPropagation();
                // delta 代表鼠标滚轮滚动的方向，取两个值 1 或者 -1
                delta > 0 ? arrStandardIndex-- : arrStandardIndex++;


                // 如果 arrExamIndex<0 说明需要恢复课时级状态
                if (arrStandardIndex < 0) {
                    // 向下换层
                    pikachu_standard.standardHideAndExamShow();
                }
                arrStandardIndex = arrStandardIndex > 1 ? 1 : arrStandardIndex;
            }, {passive: true});
        },
        // 评测级隐藏, 课标级显示
        standardHideAndExamShow: function () {
            // 调整 mask 的可见性
            $('.examTopMask').css('display', 'block');// 顶部蒙层
            $('.standardTopMask').css('display', 'none');
            $('.maskStandardTitle').css('display', 'none');// 章节名称

            $('#weekExamNum').css('display', 'block');
            $('#weekStandardNum').css('display', 'none');

            // 课时级显示，同时，各个元素进行初始化操作
            $('.examMainContent').css('display', 'block');
            $('.standardMainContent').css('display', 'none');

            // 向下换层，存储上一层最小值
            // 向上换层，存储下一层最大值
            // 状态变化之后，保存鼠标滚轮数值
            arrStandardIndex = 0;
        }
    };

    module.exports = pikachu_standard;
});
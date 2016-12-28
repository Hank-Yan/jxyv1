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
    var arrExamIndex = 0;

    // 引入其他依赖库
    var wheelUtils = require('./wheelUtils.js');

    // 执行总逻辑
    var pikachu_exam = {
        run: function () {
            this.addExamWeekInfo();
            // 周次的信息，开始时候隐藏起来
            // 缩放控制
            this.mouseWheel();
        },
        // 顶部蒙层周次信息(1-24周，数据是通过js控制的)
        addExamWeekInfo: function () {
            var addExamWeekInfo = require('./addExamWeekInfo.js');
            addExamWeekInfo.run();
        },
        // 滚轮滚动的逻辑
        mouseWheel: function () {
            $('.examMainContent').mousewheel(function (event, delta) {
                // 阻止事件冒泡
                event.stopPropagation();
                // delta 代表鼠标滚轮滚动的方向，取两个值 1 或者 -1
                delta > 0 ? arrExamIndex-- : arrExamIndex++;

                console.log(arrExamIndex);
                //==================================换层边界判断 begin============================================
                // 如果 arrExamIndex<0 说明需要恢复课时级状态
                if (arrExamIndex < 0) {
                    // 课时级显示，评测级隐藏
                    pikachu_exam.examHideAndClassShow();
                    // 恢复课时级下 index=9 的状态
                    var recovery = require('./recoveryNineStateOfClassLevel.js');
                    recovery.run();
                }

                // 跳到下一层
                if (arrExamIndex > 0) {
                    pikachu_exam.examHideAndStandardShow();
                }
                //==================================换层边界判断 end============================================


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
            arrExamIndex = 0;
        }
    };

    module.exports = pikachu_exam;
});
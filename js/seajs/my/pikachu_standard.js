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
    var arrStandardIndex = 0;

    // 引入其他依赖库
    var wheelUtils = require('./wheelUtils.js');

    // 执行总逻辑
    var pikachu_standard = {
        run: function () {
            this.addStandardWeekInfo();
            // 缩放控制
            this.mouseWheel();
        },
        // 顶部蒙层周次信息(1-24周，数据是通过js控制的)
        addStandardWeekInfo: function () {
            var addStandardWeekInfo = require('./addStandardWeekInfo.js');
            addStandardWeekInfo.run();
        },
        // 滚轮滚动的逻辑
        mouseWheel: function () {
            $('.standardMainContent').mousewheel(function (event, delta) {

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
            $('.maskExamTitle').css('display', 'block');
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
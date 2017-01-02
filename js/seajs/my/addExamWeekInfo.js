/**
 * Created by hank-yan on 2016/12/22.
 * desc 本页面位杰少原来代码重构，不知道有什么作用，但是这样放不会影响原来功能
 */
define(function (require, exports, module) {
    var addWeekInfo = {
        // 函数入口
        run: function () {
            this.add();
        },
        add: function () {
            // 代码动态添加周次信息
            var weekNumHtml = '<div class="weekExamNum">';
            for (var i = 0; i < 24; i++) {
                // i=12 代表中间第13周
                if (i==10 || i==12||i==13) {
                    weekNumHtml += '<span flag="0" flag1="0" class="selected">' + (i + 1) + '</span>';
                }else if(i==11){
                    weekNumHtml += '<span flag="0" flag1="0" class="selected curCenter">' + (i + 1) + '</span>';
                } else {
                    weekNumHtml += '<span flag="0" flag1="0">' + (i + 1) + '</span>';
                }
            }
            weekNumHtml += '</div>';
            $(".weekExamNum").html(weekNumHtml);
        },
    };

    module.exports = addWeekInfo;
});
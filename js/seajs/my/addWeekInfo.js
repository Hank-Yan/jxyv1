/**
 * Created by hank-yan on 2016/12/22.
 * desc 添加周次信息
 */
define(function (require, exports, module) {
    var addWeekInfo = {
        // 函数入口
        run: function () {
            this.add();
        },
        add: function () {
            // 代码动态添加周次信息
            var weekNumHtml = '<div class="weekNum" >';
            for (var i = 0; i < 24; i++) {
                // i=12 代表中间第13周
                if (i == 12) {
                    weekNumHtml += '<span flag="0" flag1="0" class="selected" style="width:6.16%;font-size:1.6vw;">第' + (i + 1) + '周</span>';
                } else {
                    weekNumHtml += '<span flag="0" flag1="0" style="width:4.08%;">' + (i + 1) + '</span>';
                }
            }
            weekNumHtml += '</div>';
            $(".weekNum").html(weekNumHtml);
        },
    };

    module.exports = addWeekInfo;
});
/**
 * Created by hank-yan on 2016/12/22.
 * desc 周次点击逻辑
 */
define(function (require, exports, module) {
    var weekStyleAfterDbClick = {
        // 函数入口
        run: function () {
            this.initWeekDayNum();
        },
        initWeekDayNum: function () {
            var da = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
            var weekDayNumHtml = '';
            for (var i = 0; i < 7; i++) {
                if (i == 0 || i == 6) {
                    weekDayNumHtml += '<span flag="0" class="weekend">' + da[i] + '</span>';
                } else {
                    weekDayNumHtml += '<span flag="0">' + da[i] + '</span>';
                }
            }
            $(".weekDayNum").html(weekDayNumHtml);

            $(".weekDayNum span").hover(function () {
                $(this).css("background", "#124934").siblings().css('background', '#92D050');
                $(this).attr('flag', 1).siblings().attr('flag', 0);
                var selectedWeekIndex = $('.weekNum span.selected').index();
                var selectedWeekDayIndex = $('.weekDayNum span[flag=1]').index();
                if (selectedWeekDayIndex < 2) {
                    selectedWeekDayIndex = 0;
                } else if (selectedWeekDayIndex > 4) {
                    selectedWeekDayIndex = 4;
                } else {
                    selectedWeekDayIndex = selectedWeekDayIndex - 1;
                }
                var startIndex = selectedWeekIndex * 5; //反显的星期开始下标
                var toRenderIndex = selectedWeekIndex * 5 + selectedWeekDayIndex;//hover到星期上时，反显的课程条目下标
                for (var i = startIndex; i < startIndex + 5; i++) {//hover之前，将状态恢复
                    $(".capterDetail .classContent").eq(i).css("background", "#BCE292");
                    $(".capterDetail .addOrDel.del").eq(i).css("background", "#BCE292");
                    $(".capterDetail .classCategory").eq(i).css({"background": "#BCE292", "color": "#124934"});
                    $(".capterDetail .addHomework").eq(i).css({"background": "#BCE292", "color": "#124934"});
                    $(".capterDetail .addCorrect").eq(i).css({"background": "#BCE292", "color": "#124934"});
                    $(".capterDetail .addDefect").eq(i).css({"background": "#BCE292", "color": "#124934"});
                    $(".capterDetail .addTeamEvaluate").eq(i).css({"background": "#BCE292", "color": "#124934"});
                    $(".capterDetail .addSuggest").eq(i).css("background", "#BCE292");
                }
                //将条目反显
                $('.capterDetail .classContent').eq(toRenderIndex).css({"background": "#124934", "color": "#fff"});
                $(".capterDetail .addOrDel.del").eq(toRenderIndex).css({"background": "#124934", "color": "#fff"});
                $(".capterDetail .classCategory").eq(toRenderIndex).css({"background": "#124934", "color": "#fff"});
                $(".capterDetail .addHomework").eq(toRenderIndex).css({"background": "#124934", "color": "#fff"});
                $(".capterDetail .addCorrect").eq(toRenderIndex).css({"background": "#124934", "color": "#fff"});
                $(".capterDetail .addDefect").eq(toRenderIndex).css({"background": "#124934", "color": "#fff"});
                $(".capterDetail .addTeamEvaluate").eq(toRenderIndex).css({"background": "#124934", "color": "#fff"});
                $(".capterDetail .addSuggest").eq(toRenderIndex).css({"background": "#124934", "color": "#fff"});
            });
        },
    };

    module.exports = weekStyleAfterDbClick;
});
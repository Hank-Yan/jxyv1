/**
 * Created by hank-yan on 2016/12/26.
 * desc  恢复课时arrIndex=9 时候的状态
 */
define(function (require, exports, module) {
    var recovery = {
        // 函数入口
        run: function () {
            // 针对顶部遮罩的调整
            $('.topMask').css('display', 'block');
            $('.examTopMask').css('display', 'none');
            $('.maskExamTitle').css('display','none');

            // 针对顶部周次的调整
            $('#weekNum').css('display', 'block');
            $('#weekExamNum').css('display', 'none');

            // 针对mainContent 的调整
            $('.capterTitle .shengzi').css({'display': 'inline-block', 'margin-top': '-5%'});
            $(".capterTitle").fadeIn(100);
            $(".capterDetail").fadeOut(100);
            $(".capterDetailKnowledge").fadeOut(100);
            $(".classSummary").fadeIn(100);

            // 针对每一个条目的调整
            $(".capterUl").css('margin-left', '-6.05%');
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
            $(".capterDetailKnowledge").css({'background-position': '45% 1.3%', 'background-size': '68.5% 2%'});
            $('.capterUl li').css({'margin': '0 19%'});
            $(".capterName").css('font-size', '1vw');
            $('.mainContent').css('background-position', '0 5.8%');

            $(".classContent").css({'width': '2vw', 'margin': '0 -7%', 'padding-top': '55%'});
            $('.addOrDel.add').css('width', '2vw');
            $('.addOrDel.del').css('width', '2vw');
            $(".classCategory").css({'width': '2vw', 'margin': '-40% -7% 0'});

            $('.sumClassCategory1').css({
                'font-size': '1.2vw',
                'width': '1.35vw',
                'margin': '4.3vh 0 0 -5.3vw'
            });
            $('.addHomework').css({'width': '2.4vw', 'margin': '0 -3.8vw', 'font-size': '1vw'});
            $('.addCorrect').css({'width': '2.4vw', 'margin': '0 -3.8vw', 'font-size': '1vw'});
            $('.addTeamEvaluate').css({'width': '2.4vw', 'margin': '0 -3.8vw', 'font-size': '1vw'});
            $('.addSuggest').css({'width': '2.4vw', 'margin': '0 -3.8vw', 'font-size': '1vw'});
            $('.addDefect').css({'width': '2.4vw', 'margin': '0 -3.8vw', 'font-size': '1vw'});
        },
    };

    module.exports = recovery;
});
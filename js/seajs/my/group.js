/**
 * Created by zuanny on 2016/12/9.
 * desc 本页面是群组状态下却换效果的示例
 */
define(function (require, exports, module) {
    var group = {
        // 函数入口
        run: function () {
            this.seesaw();
            this.showName();
        },
        showName: function () {
            $('.stuItem').hover(function () {
                $(this).parent().children().each(function () {
                    $(this).removeClass('cur');
                });
                $(this).addClass('cur');
                $(this).parent().children().each(function () {
                    $(this).children().removeClass('showName');
                });
                $(this).children().addClass('showName');
            });
        },

        // 翻转函数
        seesaw: function () {
            //  知识态与群组态切换逻辑
            // 点击左侧按钮
            $('.festival').click(function () {
                // 左深右浅, 483224深色，97A57浅色
                $('.festival').css('background', '#483224');
                $('.classNum').css('background', '#B97A57');
                // 群组太切换
                $('.classesDetails').css('display', 'block');
                $('.classItem').css('display', 'none');
            });
            // 点击右侧按钮
            $('.classNum').click(function () {
                // 右深， 左浅
                $('.classNum').css('background', '#483224');
                $('.festival').css('background', '#B97A57');
                // 群组太切换
                $('.classesDetails').css('display', 'none');
                console.log($('#whichClass').val());
                $('.classItem').css('display', 'block');
                group.whichClass();
            });
            // 班级切换逻辑
            $('#oneClass').click(function () {
                // 点击1班
                // console.log('class 1');
                $('.classNum > span').html("9年1班");
                $('#whichClassHiddenInput').val(1);
                group.whichClass();
            });
            $('#twoClass').click(function () {
                // 点击2班
                // console.log('class 2');
                $('.classNum > span').html("9年2班");
                $('#whichClassHiddenInput').val(2);
                group.whichClass();
            });
        },
        whichClass: function () {
            if ($('#whichClassHiddenInput').val() == 1) {
                $('.classOneParent').css('display', 'block');
                $('.classTwoParent').css('display', 'none');
            } else if ($('#whichClassHiddenInput').val() == 2) {
                $('.classOneParent').css('display', 'none');
                $('.classTwoParent').css('display', 'block');
            }
        },
    };

    module.exports = group;
});
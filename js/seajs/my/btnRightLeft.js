/**
 * Created by hank-yan on 2016/12/22.
 * desc 本页面位杰少原来代码重构，不知道有什么作用，但是这样放不会影响原来功能
 */
define(function (require, exports, module) {
    var btnRightLeft = {
        // 函数入口
        run: function () {
            this.change();
        },
        change: function () {
            $('.btn-right').click(function () {
                var box = $(this).parent();  //获取按钮的父元素
                var box_next = box.next();   //父元素的下一个同胞元素
                var box_next_left = parseInt(box_next.css('left'));      //父元素下一个同胞元素的left值
                var box_left = parseInt(box.css('left'));        //父元素的left值
                if (box_next_left) {
                    box.animate({left: box_next_left.toString()});
                    box_next.animate({left: box_left.toString()});
                    box.insertAfter(box_next);
                }
            });

            $('.btn-left').click(function () {
                var box = $(this).parent();  //获取按钮的父元素
                var box_left = parseInt(box.css('left'));        //父元素的left值
                var box_prev = box.prev();   //父元素的上一个同胞元素
                var box_prev_left = parseInt(box_prev.css('left'));      //父元素下一个同胞元素的left值
                if (box_left) {
                    box.animate({left: box_prev_left.toString()});
                    box_prev.animate({left: box_left.toString()});
                    box.insertBefore(box_prev);
                }
            });
        },
    };

    module.exports = btnRightLeft;
});
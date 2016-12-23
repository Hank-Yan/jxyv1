/**
 * Created by hank-yan on 2016/12/22.
 * desc 本页面位杰少原来代码重构，不知道有什么作用，但是这样放不会影响原来功能
 */
define(function (require, exports, module) {
    var wheelUtils = {
        // 函数入口
        getGapCount: function (ind) {
            if (ind < 4) {
                return 0;
            } else if (ind < 6) {
                return 1;
            } else if (ind < 7) {
                return 2;
            } else if (ind < 9) {
                return 3;
            } else if (ind < 13) {
                return 4;
            } else if (ind < 13) {
                return 4;
            } else if (ind < 15) {
                return 5;
            } else if (ind < 13) {
                return 4;
            } else if (ind < 16) {
                return 6;
            } else if (ind < 18) {
                return 7;
            } else if (ind < 21) {
                return 8;
            } else if (ind < 24) {
                return 9;
            } else if (ind == 24) {
                return 10;
            }
        },

    };

    module.exports = wheelUtils;
});
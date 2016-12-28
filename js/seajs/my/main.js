/**
 * Created by xilang on 2015/12/22.
 * Enhanced by hank-yan
 * this file is the entry file of the sea.js, so when the page is loaded
 * this file will run.
 */
define(function (require, exports, module) {
    // 调用知识态、群组态下的一些设定
    var group = require('./group.js');
    group.run();

    // 原来杰少写的，不知道有什么用，先放在这里
    var btnRightLeft = require('./btnRightLeft.js');
    btnRightLeft.run();

    // 执行课时级总逻辑
    var pikachu = require('./pikachu.js');
    // pikachu, run!!!
    pikachu.run();

    // 执行评测级总逻辑
    var pikachu_exam = require('./pikachu_exam.js');
    // pikachu_exam, run!!!
    pikachu_exam.run();

    // 执行课标级总逻辑
    var pikachu_standard = require('./pikachu_standard.js');
    // pikachu_standard, run!!!
    pikachu_standard.run();
});


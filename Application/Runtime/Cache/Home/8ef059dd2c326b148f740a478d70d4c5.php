<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport"/>
    <meta content="yes" name="apple-mobile-web-app-capable"/>
    <meta content="black" name="apple-mobile-web-app-status-bar-style"/>
    <meta content="telephone=no" name="format-detection"/>
    <link rel="stylesheet" href="/jxyv1/Public/Css/ccui.css" type="text/css"/>
    <link rel="stylesheet" href="/jxyv1/Public/Css/hank_animate.css" type="text/css"/>
    <title>教学元demo</title>
    <script type="text/javascript" src="/jxyv1/js/seajs/jquery/2.1.4/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="/jxyv1/js/animate-fix.js"></script>
    <!--<script type="text/javascript" src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>-->
    <style>
        .box {
            width: 355px;
            height: 500px;
            padding-top: 30px;
            padding-bottom: 30px;
            margin-left: auto;
            margin-right: auto;
            position: relative;
        }

        .list {
            position: absolute;
        }
    </style>

</head>
<body>
<!--viewport-flip 更有立体翻转的效果，在需要翻转的父级（或者祖父级）元素上添加即可-->
<div id="box" class="box viewport-flip" title="点击翻面">

    <!--<div class="classesDetails">-->
    <!--<a href="/" class="list flip out">-->
    <!--<img src="http://image.zhangxinxu.com/image/blog/201210/puke-k.png" alt="纸牌正面"/>-->
    <!--</a>-->
    <!--</div>-->
    <!--<div class="groupDetails">-->
    <!--<a href="/" class="list flip">-->
    <!--<img src="http://image.zhangxinxu.com/image/blog/201210/puke-back.png" alt="纸牌背面"/>-->
    <!--</a>-->
    <!--</div>-->

    <!--必须两个图层覆盖在一起才能实现翻转的效果-->
    <a href="/" class="list classesDetails flip out">
        <img src="http://image.zhangxinxu.com/image/blog/201210/puke-k.png" alt="纸牌正面"/>
    </a>

    <a href="/" class="list groupDetails flip">
        <img src="http://image.zhangxinxu.com/image/blog/201210/puke-back.png" alt="纸牌背面"/>
    </a>


</div>

<button id="twoClass">老K正面</button>
<button id="oneClass">小张背面</button>

<script>
    $(function () {

        // 老K背面
        $('#oneClass').bind('click', function () {
            $('.classesDetails').addClass("out").removeClass("in");
            setTimeout(function () {
                $('.groupDetails').addClass("in").removeClass("out");
            }, 225);
            return false;
        });
        // 小张正面
        $('#twoClass').bind('click', function () {
            $('.groupDetails').addClass("out").removeClass("in");
            setTimeout(function () {
                $('.classesDetails').addClass("in").removeClass("out");
            }, 225);
            return false;
        });

        /*********************************点牌翻转代码*********************************************/
                // 在前面显示的元素，隐藏在后面的元素
        var eleBack = null, eleFront = null,
                // 纸牌元素们
                eleList = $(".list");

        // 确定前面与后面元素
        var funBackOrFront = function () {
            eleList.each(function () {
                if ($(this).hasClass("out")) {
                    console.log('has.....')
                    eleBack = $(this);
                } else {
                    console.log('not have')
                    eleFront = $(this);
                }
            });
        };
        funBackOrFront();
        $("#box").bind("click", function () {
            console.log('aaaa');
            // 切换的顺序如下
            // 1. 当前在前显示的元素翻转90度隐藏, 动画时间225毫秒
            // 2. 结束后，之前显示在后面的元素逆向90度翻转显示在前
            // 3. 完成翻面效果
            eleFront.addClass("out").removeClass("in");
            setTimeout(function () {
                eleBack.addClass("in").removeClass("out");
                // 重新确定正反元素
                funBackOrFront();
            }, 225);
            return false;
        });
    });
</script>
</body>
</html>
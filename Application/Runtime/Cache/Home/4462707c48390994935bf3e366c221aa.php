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
    <script language="JavaScript">
        $(function () {
            $(".addCorrect").click(function () {

                var classNum1 = $(this).attr("classId");
                var grandCapterIndex = $(this).parent().attr('class');
                $.post('/jxyv1/index.php/Home/Index/getCorrect', {'classNum1': classNum1}, function (data) {
                    var correctTableHtml = '';
                    correctTableHtml += '<div class="back">X</div>';
                    correctTableHtml += '<table style="margin:3px;">';
                    for (var i = 0; i < data.info.length; i++) {
                        correctTableHtml += '<tr style="margin-top:4px;"><td style="width:10%;">';
                        correctTableHtml += '<label><input name="commtsDetail" type="radio" value="' + data.info[i]["item"] + '"></label></td>';
                        correctTableHtml += '<td style="width:10%;">' + data.info[i]["category"] + '</td>';
                        correctTableHtml += '<td style="width:80%;">' + data.info[i]["item"] + '</td></tr>';
                    }
                    correctTableHtml += '</table>';
                    correctTableHtml += '<label><input name="commtsDetail" type="radio" value="#"></label>';
                    correctTableHtml += '<INPUT type="text" name="className" id="addForClass" placeholder="输入评语">';
                    correctTableHtml += '<INPUT type="hidden" name="classNum" value="' + classNum1 + '">';
                    correctTableHtml += '<INPUT type="hidden" name="capterId" value="' + grandCapterIndex + '">';
                    correctTableHtml += '<INPUT type="submit" class="submit" value="添加">';
                    // correctTableHtml += '<INPUT class="submit" value="添加">';
                    $(".addCorrectTable").html(correctTableHtml).css("display", "block");
                    $(".mask").css("display", "block");
                }, 'json');

                // $.ajax({
                //     // url: '/jxyv1/index.php/Home/Index/getCorrect/classNum/1',
                //     url: '/jxyv1/index.php/Home/Index/getCorrect',
                //     type: 'POST',
                //     data: {'classNum':classNum},
                //     // data: 'classNum = 1',
                //     dataType: 'json',
                //     timeout: 1000,
                //     success: function(result){
                //         console.log(result);
                //         alert('ssssssss');
                //     },error: function(){alert('Error loading PHP document') };
                // });

            });

            $('.addCorrectTable .back').click(function () {
                $('.mask').css('display', 'none');
                $('.addCorrectTable').css('display', 'none');
            })
        });
    </script>
    <style type="text/css">
        .list {
            position: absolute;
        }

        .addCorrectTable {
            width: 600px;
        }

        .headInfo {
            margin-top: 2px;
        }

        .headInfo .festival, .headInfo .classNum {
            margin-top: 7px;
            font-size: 14px;
            line-height: 14px;
            padding-top: 12px;
            height: 6.5vh;
        }

        .smallBlockLeft {
            /*position: relative;*/
            float: left;
            margin-right: 5px;
            margin-left: -2px;
            margin-top: 1px;
            font-size: 12px;
            font-weight: bolder;
            background: #FFFFFF;
            border: 1px solid #663300;
            /*border-left: 1px;*/
        }

        .smallBlockRight {
            float: right;
            margin-right: 1px;
            margin-left: 5px;
            margin-top: 1px;
            font-size: 12px;
            font-weight: bolder;
            background: #FFFFFF;
            border: 1px solid #663300;
            width: 36px;
            text-align: center;
        }

        .smallBlockLeft a, .smallBlockRight a {
            color: black;
        }

        .smallBlockParent {
            width: 100%;
            position: absolute;
        }
    </style>

    <!--下面是班级群组态样式控制-->
    <style type="text/css">
        /*ul {*/
        /*margin: 0px;*/
        /*padding: 0px;*/
        /*}*/

        .stuItem {
            /*学生竖条*/
            width: 6px;
            float: left;
            height: 230px;
            line-height: normal;
            list-style-type: none;
            margin: 0px;
            padding: 0px;
            border-right-width: 1px;
            border-bottom-width: 1px;
            border-right-style: solid;
            border-bottom-style: solid;
            border-color: #734A2D;
            top: 100px;
        }

        .classItem {
            /*班级模块*/
            display: block;
            /*text-align: center;*/
            height: 230px;
            width: 37px;
            border-top-width: 1px;
            border-left-width: 1px;
            border-top-style: solid;
            border-left-style: solid;
            border-color: #734A2D;
            background-color: #B97A57;
            margin: 0 auto;
            padding: 0;
            position: relative;
            left: 206px;
            z-index: 3;
        }

        .stuName {
            /*学生名字*/
            background: #A9D18E;
            color: black;
            font-size: 10px;
            text-align: center;
            width: 40px;
            height: 15px;
            left: 50%;
            margin-left: -20px;
            position: absolute;
            top: 235px;
            display: none;
            z-index: 2;
        }

        .verticalLine {
            /*连接线*/
            color: #A9D18E;
            left: 50%;
            margin-left: -5px;
            position: absolute;
            font-size: 14px;
            font-weight: bolder;
            /*z-index: -1;*/
            top: 226px;
        }

        .cur {
            /*选中态颜色，绿色*/
            background-color: #A9D18E;
        }

        .showName {
            /*选中显示名字（默认隐藏）*/
            display: block;
            text-decoration: none;
        }

        .stuName > a {
            /*设置名字格式*/
            cursor: pointer;
            color: #000000;
            font-weight: bolder;
        }

        .stuItemParent {
            display: none;
        }
    </style>
</head>
<?php  $capterId = $_GET['capterId']; $classNum = $_GET['classNum']; $addShow = $_GET['addShow']; $addShow1 = $_GET['addShow1']; $classConWidth = $_GET['classConWidth']; ?>
<body>
<div class="smallBlockParent">
    <!--左侧三个小滑块-->
    <div class="smallBlockLeft">
        <a href="http://localhost/jxyv1/index.php/Home/Index/main/cap/0">学期</a>
    </div>
    <div class="smallBlockLeft">
        <a href="http://223.202.58.54:8083/index.php/Iframes/Index/main/cap/5?grade=7">学年</a>
    </div>
    <div class="smallBlockLeft">
        <a href="http://223.202.58.54:8083/index.php/Iframes/Index/main/cap/5?grade=10">学段</a>
    </div>

    <!--右侧两个小滑块-->
    <div class="smallBlockRight">
        <a id="twoClass" href="#">2 班</a>
    </div>
    <div class="smallBlockRight">
        <a id="oneClass" href="#">1 班</a>
    </div>
    <input type="hidden" id="whichClassHiddenInput" value="1">
</div>

<div id="commentshowtable" bordercolor="white"
     style="margin-top: 5%;margin-left: 20%; display: none;height: 500px;color: white;width:700px;background: rgb(18, 73, 52);z-index: 10000;position: fixed; ">
    <label align="middle" style="font:bold;margin-left: 40%"> 批语添加优化</label>
    <div class="backout" align="right" style="margin-right: 15px;cursor:pointer">X</div>
    <table id="tb"
           style="table-layout: fixed; margin:auto;width: 680px;color: white;font-size: 3px;border-color: white"
           border="1px">
        <tr style="margin-top:20px;line-height: 20px">
            <th style="width:10%;" colspan="2" rowspan="2" align="left">&emsp;&emsp;&emsp;情感<br>能力</th>
            <th style="width:2%;cursor:pointer">+</th>
            <th style="width:15%;cursor:pointer" class="clemotion" value="1">引导启发</th>
            <th style="width:15%;cursor:pointer" class="clemotion" value="2">赞赏激励</th>
            <th style="width:15%;cursor:pointer" class="clemotion" value="3">提示期待</th>
            <th style="width:15%;cursor:pointer" class="clemotion" value="4">缺陷发掘</th>
            <th style="width:15%;cursor:pointer" class="clemotion" value="5">方法建议</th>
            <th style="width:2%;cursor:pointer">+</th>
            <th style="width: 10%;" colspan="2" rowspan="2" align="left">情感<br>&emsp;&emsp;&emsp;心理</th>
        </tr>

        <tr style="line-height: 20px">
            <th style="cursor:pointer" class="emaddevent">+</th>
            <td id="em1"></td>
            <td id="em2"></td>
            <td id="em3"></td>
            <td id="em4"></td>
            <td id="em5"></td>
            <th style="cursor:pointer" class="emaddevent">+</th>
        </tr>

        <tr style="height:20px">
            <th style="width:7%;vertical-align: middle;cursor:pointer" class="clability" value="1"><label
                    style="width: 1px">审<br>题<br>能<br>力</label></th>
            <td colspan="2" id="ab1"></td>
            <td style="width:15%;" id="t11"></td>
            <td style="width:15%;" id="t12"></td>
            <td style="width:15%;" id="t13"></td>
            <td style="width:15%;" id="t14"></td>
            <td style="width:15%;" id="t15"></td>
            <td style="width:2%;" colspan="2" id="ps1"></td>
            <th style="width:7%;vertical-align: middle;cursor:pointer" class="clpyschology" value="1">
                态<br>度<br>问<br>题
            </th>
        </tr>

        <tr style="height:20px">
            <th style="width:7%;vertical-align: middle;cursor:pointer" class="clability" value="2"><label
                    style="width: 1px">计<br>算<br>能<br>力</label></th>
            <td colspan="2" id="ab2"></td>
            <td style="width:15%;" id="t21"></td>
            <td style="width:15%;" id="t22"></td>
            <td style="width:15%;" id="t23"></td>
            <td style="width:15%;" id="t24"></td>
            <td style="width:15%;" id="t25"></td>
            <td style="width:2%;" colspan="2" id="ps2"></td>
            <th style="width:7%;vertical-align: middle;cursor:pointer" class="clpyschology" value="2">
                马<br>虎<br>问<br>题
            </th>
        </tr>
        <tr style="height:20px">
            <th style="width:7%;vertical-align: middle;cursor:pointer" class="clability" value="3"><label
                    style="width: 1px">读<br>图<br>能<br>力</label></th>
            <td colspan="2" id="ab3"></td>
            <td style="width:15%;" id="t31"></td>
            <td style="width:15%;" id="t32"></td>
            <td style="width:15%;" id="t33"></td>
            <td style="width:15%;" id="t34"></td>
            <td style="width:15%;" id="t35"></td>
            <td style="width:2%;" colspan="2" id="ps3"></td>
            <th style="width:7%;vertical-align: middle;cursor:pointer" class="clpyschology" value="3">
                勤<br>奋<br>问<br>题
            </th>
        </tr>

        <tr style="height:20px">
            <th style="width:7%;vertical-align: middle;cursor:pointer" class="clability" value="4"><label
                    style="width: 1px">知<br>识<br>理<br>解</label></th>
            <td colspan="2" id="ab4"></td>
            <td style="width:15%;" id="t41"></td>
            <td style="width:15%;" id="t42"></td>
            <td style="width:15%;" id="t43"></td>
            <td style="width:15%;" id="t44"></td>
            <td style="width:15%;" id="t45"></td>
            <td colspan="2" style="width:2%;" id="ps4"></td>
            <th style="width:7%;vertical-align: middle;cursor:pointer" class="clpyschology" value="4">
                注<br>意<br>力<br>问<br>题
            </th>
        </tr>

        <tr style="height:20px">
            <th style="width:7%;vertical-align: middle;cursor:pointer" class="clability" value="5"><label
                    style="width: 1px">拓<br>展<br>能<br>力</label></th>
            <td colspan="2" id="ab5"></td>
            <td style="width:15%;" id="t51"></td>
            <td style="width:15%;" id="t52"></td>
            <td style="width:15%;" id="t53"></td>
            <td style="width:15%;" id="t54"></td>
            <td style="width:15%;" id="t55"></td>
            <td style="width:2%;" colspan="2" id="ps5"></td>
            <th style="width:7%;vertical-align: middle;cursor:pointer" class="clpyschology" value="5">
                字<br>迹<br>问<br>题
            </th>
        </tr>

        <tr style="line-height: 20px">
            <th style="cursor:pointer">+</th>
            <th colspan="2" style="cursor:pointer" class="abaddevent">+</th>
            <th colspan="5"></th>

            <th colspan="2" style="cursor:pointer" class="psaddevent">+</th>
            <th style="cursor:pointer">+</th>
        </tr>
    </table>
    <br>
    <input id="memory1" value="" style="display: none">
    <input id="memory2" value="" style="display: none">
    <input id="memory3" value="" style="display: none">
    <input id="memory4" value="" style="display: none">
    <input id="rowbase" value=0 style="display: none">
    <input id="colbase" value=0 style="display: none">
</div>

<div class="topMask" style="cursor:pointer;"></div>
<div class="examTopMask" style="cursor:pointer;display: none;"></div>
<div class="standardTopMask" style="cursor:pointer;display: none;"></div>
<div id="divForm" style="display:none;">
    <input type="file" id="myfile">
    <input type="button" id="btnOpen" value="选择文件">
</div>

<div class="headInfo">
    <?php if($cap == 0){?>
    <div class="festival">2015年<br>秋季学期</div>
    <?php }else if($cap == 1){?>
    <div class="festival">2016年<br>春季学期</div>
    <?php }?>
    <div class="weekInfo">
        <!--weekInfo 是通过 js 动态添加的-->
        <div class="weekNum" id="weekNum"></div>
        <div class="weekExamNum" id="weekExamNum" style="display: none;margin-left: 0.5px;"></div>
        <div class="weekStandardNum" id="weekStandardNum" style="display: none;"></div>
        <div class="weekDayNum" flag="0" style="display:none;"></div>
    </div>
    <div class="classNum">数学<br><span>9年1班</span></div>
</div>
<div class="maskCapterTitle" style="">
    <span class="toLeft" style="cursor:pointer;"></span>
    <?php if($cap == 0){?>
    <span class="capterName">25章<br>概率初步</span>
    <?php }else if($cap == 1){?>
    <span class="capterName" style="line-height: 7.77vh;">第二轮复习</span>
    <?php }?>
    <span class="toRight" style="cursor:pointer;"></span>
    <div class="shengzi"></div>
</div>

<!--评测级的 maskTitle-->
<div class="maskExamTitle" style="display: none;">
    <span class="examToLeft" style="cursor:pointer;"></span>
    <span class="examCapterName" style="line-height: 7.77vh;">图形与圆</span>
    <span class="examToRight" style="cursor:pointer;"></span>
    <div class="examShengzi" style="height: 71%;"></div>
</div>

<!--课标级的 maskTitle-->
<div class="maskStandardTitle" style="display: none;">
    <span class="standardToLeft" style="cursor:pointer;"></span>
    <span class="standardCapterName" style="line-height: 7.77vh;">空间观念、几何直观</span>
    <span class="standardToRight" style="cursor:pointer;"></span>
    <div class="standardShengzi" style="height: 71%;"></div>
</div>

<!--课时级-->
<div class="mainContent">
    <ul class="classCon">
        <?php foreach($capter as $i=>$capter_item): ?>
        <li class="capter t<?= $capter_item['capter_num']?>h" flag="0">
            <div class="capterTitle" style="visibility:hidden;">
                <span class="toLeft" style="cursor:pointer;"></span>
                <?php if ($cap == 0): ?>
                    <?php if ($i < 2): ?>
                        <span class="capterName">
                                    <?= $capter_item['capter_num']?>章<br>
                            <?= $capter_item['capter_name']?>
                                </span>
                    <?php elseif ($i == 2 || $i == 6 || $i == 10):?>
                        <span class="capterName">
                                    <?= $capter_item['capter_num']?>章<br>
                                </span>
                    <?php elseif ($i > 2 && $i < 6):?>
                        <span class="capterName">
                                    <?= $capter_item['capter_num']-1?>章
                            <?= $capter_item['capter_name']?>
                                </span>
                    <?php elseif($i>6 && $i < 10):?>
                        <span class="capterName">
                                    <?= $capter_item['capter_num']-2?>章
                            <?= $capter_item['capter_name']?>
                                </span>
                    <?php endif;?>
                <?php elseif ($cap == 1): ?>
                    <?php if ($i == 0): ?>
                        <span class="capterName">第29章<br>投影和视图</span>
                    <?php elseif($i == 1):?>
                        <span class="capterName">阶段性复习和结业考试</span>
                    <?php elseif($i == 2):?>
                        <span class="capterName" style="line-height: 7.77vh;">第一轮复习</span>
                    <?php elseif($i == 3):?>
                        <span class="capterName" style="line-height: 7.77vh;">第二轮复习</span>
                    <?php elseif($i == 4):?>
                        <span class="capterName" style="line-height: 7.77vh;">第三轮复习</span>
                    <?php elseif($i == 5):?>
                        <span class="capterName" style="line-height: 7.77vh;">保留章节</span>
                    <?php endif;?>
                <?php endif;?>

                <span class="toRight" style="cursor:pointer;"></span>
                <div class="shengzi"></div>
            </div>

            <div class="capterDetail">
                <ul class="capterUl">
                    <li capterId="<?= $capter_item['capter_num']?>"
                        class="<?= $capter_item['capter_num'];?>">
                        <div class="addOrDel add" classId="<?= $capter_item['capter_num'];?>">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>

                    <?php foreach($class as $class_item): ?>
                    <?php if ($class_item['capter_id'] == $capter_item['capter_num']): ?>
                    <li class="<?= $class_item['capter_id']?>">
                        <div class="addOrDel del" classId="<?= $class_item['id']?>">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <?php if ($class_item['class_flag'] == 0): ?>
                        <div class="classCategory">新课</div>
                        <?php elseif ($class_item['class_flag'] == 1): ?>
                        <div class="classCategory">活动课</div>
                        <?php elseif ($class_item['class_flag'] == 2): ?>
                        <div class="classCategory">复习课</div>
                        <?php elseif ($class_item['class_flag'] == 3): ?>
                        <div class="classCategory">单元测</div>
                        <?php else: ?>
                        <div class="classCategory">考试</div>
                        <?php endif; ?>

                        <?php if ($class_item['add_flag'] == 1): ?>
                        <div class="classContent" flag="0" style="background:#ffe777;"
                             classIndex="<?= $class_item['id'];?>"
                             title="<?= $class_item['class_name']?>">
                            <?= $class_item['class_name']?>
                        </div>
                        <?php else: ?>
                        <div class="classContent" flag="0" classIndex="<?= $class_item['id'];?>"
                             title="$class_item['class_name']?>">
                            <?= $class_item['class_name']?>
                        </div>
                        <?php endif; ?>
                        <div class="classesDetails">
                            <?php if ($class_item['class_flag'] != 4): ?>
                            <div class="addHomework" classIndex="<?= $class_item['id'];?>">作业<br/>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                <?= $class_item['task_count']?>
                                            </label>组</t>
                                        </n>
                                        <br/>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>
                            <?php else: ?>
                            <div class="addHomework" classIndex="<?= $class_item['id'];?>">卷数<br/>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                <?= $class_item['task_count']?>
                                            </label>份</t>
                                        </n>
                                        <br/>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>
                            <?php endif; ?>

                            <?php if ($class_item['capter_id'] == 21): ?>
                            <div class="addCorrect" classId="<?= $class_item['id'];?>">批语<br/>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br/>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>
                            <?php else: ?>
                            <div class="addCorrect" classId="<?= $class_item['id'];?>">批语<br/>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br/>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>
                            <?php endif; ?>

                            <div class="addDefect">缺陷<br/>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br/>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addTeamEvaluate">班组评价</div>
                            <div class="addSuggest">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>

                        <div class="classItem" style="display: none;">
                            <div class="stuItemParent classOneParent">
                                <?php foreach($classOneStudents as $key=> $item):?>
                                <?php if($key == 2):?>
                                <div class="stuItem cur">
                                    <div class="stuName showName">
                                        <a href="/jxyv1/index.php/Home/Index/hwdetails/sid/<?= $item['studentid']?>/capterid/<?= $class_item['capter_id']?>"
                                           target="_blank"><?= $item['name']?></a>
                                    </div>
                                </div>
                                <?php else:?>
                                <div class="stuItem">
                                    <div class="stuName">
                                        <a href="/jxyv1/index.php/Home/Index/hwdetails/sid/<?= $item['studentid']?>/capterid/<?= $class_item['capter_id']?>"
                                           target="_blank"><?= $item['name']?></a>
                                    </div>
                                </div>
                                <?php endif;?>

                                <?php endforeach;?>
                            </div>
                            <div class="stuItemParent classTwoParent">
                                <?php foreach($classTwoStudents as $key=> $item):?>
                                <?php if($key == 2):?>
                                <div class="stuItem cur">
                                    <div class="stuName showName">
                                        <a href="/jxyv1/index.php/Home/Index/hwdetails/sid/<?= $item['studentid']?>/capterid/<?= $class_item['capter_id']?>"
                                           target="_blank"><?= $item['name']?></a>
                                    </div>
                                </div>
                                <?php else:?>
                                <div class="stuItem">
                                    <div class="stuName">
                                        <a href="/jxyv1/index.php/Home/Index/hwdetails/sid/<?= $item['studentid']?>/capterid/<?= $class_item['capter_id']?>"
                                           target="_blank"><?= $item['name']?></a>
                                    </div>
                                </div>
                                <?php endif;?>

                                <?php endforeach;?>
                            </div>
                            <div class="verticalLine">|</div>
                        </div>

                        <!--<div class="groupDetails" style="margin-left: -92%;display: none;">-->
                        <!--&lt;!&ndash;群组态详情&ndash;&gt;-->
                        <!--&lt;!&ndash;一班&ndash;&gt;-->
                        <!---->
                        <!--<a href="/jxyv1/index.php/Home/Index/homework/sid/1/classid/<?= $class_item['id'];?>" class="classOneData">-->
                        <!--<img style="width: 52px;height: 270px;" src="/jxyv1/images/students.png">-->
                        <!--</a>-->
                        <!--&lt;!&ndash;二班默认不可见&ndash;&gt;-->
                        <!--<a href="/jxyv1/index.php/Home/Index/homework/sid/2/classid/<?= $class_item['id'];?>" style="display: none;" class="classTwoData">-->
                        <!--<img style="width: 52px;height: 270px;" src="/jxyv1/images/students2.png">-->
                        <!--</a>-->
                        <!--</div>-->
                    </li>
                    <li capterId="<?= $class_item['capter_id']?>"
                        class="<?= $class_item['capter_id'];?>">
                        <div class="addOrDel add" classId="<?= $class_item['id'];?>">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <?php endif; ?>
                    <?php endforeach; ?>
                </ul>
            </div>
            <div class="capterDetailKnowledge" style="display:none;">
                <ul class="capterUl">

                    <li capterId="<?= $capter_item['capter_num']?>"
                        class="<?= $capter_item['capter_num'];?>">
                        <div class="addOrDel add" classId="<?= $capter_item['id'];?>">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>

                    <?php foreach($knowledge as $knowledge_item): ?>
                    <?php if ($knowledge_item['capter_id'] == $capter_item['capter_num']): ?>
                    <li class="<?= $knowledge_item['capter_id'];?>">
                        <div class="addOrDel del" classId="<?= $knowledge_item['id']?>">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <?php if ($knowledge_item['class_flag'] == 0): ?>
                        <div class="classCategory">新课</div>
                        <?php elseif ($knowledge_item['class_flag'] == 1): ?>
                        <div class="classCategory">活动课</div>
                        <?php elseif ($knowledge_item['class_flag'] == 2): ?>
                        <div class="classCategory">复习课</div>
                        <?php elseif ($knowledge_item['class_flag'] == 3): ?>
                        <div class="classCategory">单元测</div>
                        <?php else: ?>
                        <div class="classCategory">考试</div>
                        <?php endif; ?>

                        <?php if ($knowledge_item['add_flag'] == 1): ?>
                        <div class="classContent" flag="0" style="background:#ffe777;"
                             classIndex="<?= $knowledge_item['id']?>"
                             title="<?= $knowledge_item['class_name']?>">
                            <?= $knowledge_item['class_name']?>
                        </div>
                        <?php else: ?>
                        <div class="classContent" flag="0" classIndex="<?= $knowledge_item['id']?>"
                             title="<?= $knowledge_item['class_name']?>">
                            <?= $knowledge_item['class_name']?>
                        </div>
                        <?php endif; ?>

                        <div class="classesDetails">
                            <?php if ($knowledge_item['class_flag'] != 2): ?>
                            <div class="addHomework" classIndex="<?= $knowledge_item['id']?>">作业<br/>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                <?= $knowledge_item['task_count']?>
                                            </label>组</t>
                                        </n>
                                        <br/>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>
                            <?php else: ?>
                            <div class="addHomework" classIndex="<?= $knowledge_item['id']?>">卷数<br/>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                <?= $knowledge_item['task_count']?>
                                            </label>份</t>
                                        </n>
                                        <br/>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>
                            <?php endif; ?>

                            <?php if ($knowledge_item['capter_id'] == 21): ?>
                            <div class="addCorrect" classId="<?= $knowledge_item['id']?>">批语<br/>
                                <span>
                                        <n class="btw"><t>
                                            <label>20</label>条</t>
                                        </n>
                                        <br/>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>
                            <?php else: ?>
                            <div class="addCorrect" classId="<?= $knowledge_item['id']?>">批语<br/>
                                <span>
                                        <n class="btw"><t><label>0</label>条</t>
                                        </n>
                                        <br/>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>
                            <?php endif; ?>
                            <div class="addDefect">缺陷<br/>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br/>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addTeamEvaluate">班组评价</div>
                            <div class="addSuggest">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                        <div class="groupDetails" style="margin-left: -92%;display: none;">
                            <!--群组态详情-->
                            <img style="width: 52px;height: 270px;" src="/jxyv1/images/students.png">
                        </div>
                    </li>
                    <li capterId="<?= $knowledge_item['capter_id']?>"
                        class="<?= $knowledge_item['capter_id']?>">
                        <div class="addOrDel add" classId="<?= $knowledge_item['id']?>">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <?php endif; ?>
                    <?php endforeach; ?>
                </ul>
            </div>
            <div class="classSummary" style="display:none;">
                <ul class="capterUl">
                    <?php foreach($category as $category_item): ?>
                    <?php if ($category_item['capter_id'] == $capter_item['capter_num']): ?>
                    <li>
                        <div class="sumClassCategory1">新课
                            <label>
                                <p></p>
                                <p></p>
                                <?= $category_item['newclass_num']?>节
                            </label>
                        </div>
                        <div class="classesDetails">
                            <div class="addHomework">作业<br/>
                                <span>
                                    <n class="btw">
                                        <t>
                                            <label><?= $category_item['newclass_num']?></label>组
                                        </t>
                                    </n>
                                    <br/>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addCorrect">批语<br/>
                                <span>
                                    <n class="btw">
                                        <t><label>0</label>条</t>
                                    </n>
                                    <br/>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addDefect">缺陷
                                <span>
                                    <n class="btw">
                                        <t><label>0</label>种</t>
                                    </n>
                                    <br/>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addTeamEvaluate">班组评价</div>
                            <div class="addSuggest">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                        <div class="groupDetails" style="margin-left: -92%;display: none;">
                            <!--群组态详情-->
                            <img style="width: 52px;height: 270px;" src="/jxyv1/images/students.png">
                        </div>
                    </li>

                    <li>
                        <div class="sumClassCategory1">活动课
                            <label>
                                <p></p>
                                <p></p>
                                <?= $category_item['activityclass_num']?>节
                            </label>
                        </div>
                        <div class="classesDetails">
                            <div class="addHomework">作业<br/>
                                <span>
                                    <n class="btw">
                                        <t><label>0</label>组</t>
                                    </n>
                                    <br/>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addCorrect">批语<br/>
                                <span>
                                    <n class="btw">
                                        <t><label>0</label>条</t>
                                    </n>
                                    <br/>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addDefect">缺陷<br/>
                                <span>
                                    <n class="btw">
                                        <t><label>0</label>种</t>
                                    </n>
                                    <br/>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addTeamEvaluate">班组评价</div>
                            <div class="addSuggest">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                        <div class="groupDetails" style="margin-left: -92%;display: none;">
                            <!--群组态详情-->
                            <img style="width: 52px;height: 270px;" src="/jxyv1/images/students.png">
                        </div>
                    </li>

                    <li>
                        <div class="sumClassCategory1">复习课
                            <label>
                                <p></p>
                                <p></p>
                                <?= $category_item['reviewclass_num'] ?>节
                            </label>
                        </div>
                        <div class="classesDetails">
                            <div class="addHomework">作业<br/>
                                <span>
                                    <n class="btw">
                                        <t><label><?= $category_item['reviewclass_num']?></label>组</t>
                                    </n>
                                    <br/>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addCorrect">批语<br/>
                                <span>
                                    <n class="btw">
                                        <t><label>0</label>条</t>
                                    </n>
                                    <br/>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addDefect">缺陷<br/>
                                <span>
                                    <n class="btw">
                                        <t><label>0</label>种</t>
                                    </n>
                                    <br/>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addTeamEvaluate">班组评价</div>
                            <div class="addSuggest">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                        <div class="groupDetails" style="margin-left: -92%;display: none;">
                            <!--群组态详情-->
                            <img style="width: 52px;height: 270px;" src="/jxyv1/images/students.png">
                        </div>
                    </li>
                    <li>
                        <div class="sumClassCategory1">单元测
                            <label>
                                <p></p>
                                <p></p>
                                <?= $category_item['examclass_num']?>节
                            </label>
                        </div>
                        <div class="classesDetails">
                            <div class="addHomework">作业<br/>
                                <span>
                                    <n class="btw">
                                        <t><label><?= $category_item['examclass_num']?></label>组</t>
                                    </n>
                                    <br/>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addCorrect">批语<br/>
                                <span>
                                    <n class="btw">
                                        <t><label>0</label>条</t>
                                    </n>
                                    <br/>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addDefect">缺陷<br/>
                                <span>
                                    <n class="btw">
                                        <t><label>0</label>种</t>
                                    </n>
                                    <br/>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addTeamEvaluate">班组评价</div>
                            <div class="addSuggest">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                        <div class="groupDetails" style="margin-left: -92%;display: none;">
                            <!--群组态详情-->
                            <img style="width: 52px;height: 270px;" src="/jxyv1/images/students.png">
                        </div>
                    </li>
                    <?php endif; ?>
                    <?php endforeach; ?>
                </ul>
            </div>
        </li>
        <?php endforeach;?>
    </ul>
</div>

<!--评测级-->
<div class="examMainContent" style="display: none;">
    <ul class="examCon">
        <li class="exam month1">
            <!--标题-->
            <div class="examTitle" style="visibility:hidden;">
                <span class="toLeft" style="cursor:pointer;"></span>
                <span class="examName">函数与方程</span>
                <span class="toRight" style="cursor:pointer;"></span>
                <div class="shengzi"></div>
            </div>
            <!--内容-->
            <div class="examDetail">
                <ul class="examUl">
                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="examCategory">周测1</div>

                        <div class="examContent" flag="0" classindex="59" title="">
                            点直线和圆周测
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>
                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="examCategory">周测1</div>

                        <div class="examContent" flag="0" classindex="59" title="">
                            正多边形和圆周测
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>
                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="examCategory">周测1</div>

                        <div class="examContent" flag="0" classindex="59" title="">
                            圆的面积周测
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>
                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="examCategory">周测1</div>

                        <div class="examContent" flag="0" classindex="59" title="">
                            圆的应用周测
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>

                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="examSummary" style="display:none;">
                <ul class="examUl">
                    <li class="26">
                        <div class="sumExamCategory">周测1
                            <label>
                                <p></p>
                                <p></p>
                                 点直线和圆周测
                            </label>
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>

                    <li class="26">
                        <div class="sumExamCategory">周测1
                            <label>
                                <p></p>
                                <p></p>
                                点直线和圆周测
                            </label>
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>

                    <li class="26">
                        <div class="sumExamCategory">周测1
                            <label>
                                <p></p>
                                <p></p>
                                点直线和圆周测
                            </label>
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>

                    <li class="26">
                        <div class="sumExamCategory">周测1
                            <label>
                                <p></p>
                                <p></p>
                                点直线和圆周测
                            </label>
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </li>

        <li class="exam month2">
            <!--标题-->
            <div class="examTitle" style="visibility:hidden;">
                <span class="toLeft" style="cursor:pointer;"></span>
                <span class="examName">方程与图像</span>
                <span class="toRight" style="cursor:pointer;"></span>
                <div class="shengzi"></div>
            </div>
            <!--内容-->
            <div class="examDetail">
                <ul class="examUl">
                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="examCategory">周测2</div>

                        <div class="examContent" flag="0" classindex="59" title="">
                            点直线和圆周测
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>
                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="examCategory">周测2</div>

                        <div class="examContent" flag="0" classindex="59" title="">
                            正多边形和圆周测
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>
                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="examCategory">周测2</div>

                        <div class="examContent" flag="0" classindex="59" title="">
                            圆的面积周测
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>
                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="examCategory">周测2</div>

                        <div class="examContent" flag="0" classindex="59" title="">
                            圆的应用周测
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>
                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="examSummary" style="display:none;">
                <ul class="examUl">
                    <li class="26">
                        <div class="sumExamCategory">周测1
                            <label>
                                <p></p>
                                <p></p>
                                点直线和圆周测
                            </label>
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>

                    <li class="26">
                        <div class="sumExamCategory">周测1
                            <label>
                                <p></p>
                                <p></p>
                                点直线和圆周测
                            </label>
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>

                    <li class="26">
                        <div class="sumExamCategory">周测1
                            <label>
                                <p></p>
                                <p></p>
                                点直线和圆周测
                            </label>
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>

                    <li class="26">
                        <div class="sumExamCategory">周测1
                            <label>
                                <p></p>
                                <p></p>
                                点直线和圆周测
                            </label>
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </li>

        <li class="exam month3">
            <!--标题-->
            <div class="examTitle" style="visibility:hidden;">
                <span class="toLeft" style="cursor:pointer;"></span>
                <span class="examName">图形与圆</span>
                <span class="toRight" style="cursor:pointer;"></span>
                <div class="shengzi"></div>
            </div>
            <!--内容-->
            <div class="examDetail">
                <ul class="examUl">
                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="examCategory">周测3</div>

                        <div class="examContent" flag="0" classindex="59" title="">
                            点直线和圆周测
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>
                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="examCategory">周测3</div>

                        <div class="examContent" flag="0" classindex="59" title="">
                            正多边形和圆周测
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>
                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="examCategory">周测3</div>

                        <div class="examContent" flag="0" classindex="59" title="">
                            圆的面积周测
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>
                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="examCategory">周测3</div>

                        <div class="examContent" flag="0" classindex="59" title="">
                            圆的应用周测
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>
                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="examSummary" style="display:none;">
                <ul class="examUl">
                    <li class="26">
                        <div class="sumExamCategory">周测1
                            <label>
                                <p></p>
                                <p></p>
                                点直线和圆周测
                            </label>
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>

                    <li class="26">
                        <div class="sumExamCategory">周测1
                            <label>
                                <p></p>
                                <p></p>
                                点直线和圆周测
                            </label>
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>

                    <li class="26">
                        <div class="sumExamCategory">周测1
                            <label>
                                <p></p>
                                <p></p>
                                点直线和圆周测
                            </label>
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>

                    <li class="26">
                        <div class="sumExamCategory">周测1
                            <label>
                                <p></p>
                                <p></p>
                                点直线和圆周测
                            </label>
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </li>

        <li class="exam month4">
            <!--标题-->
            <div class="examTitle" style="visibility:hidden;">
                <span class="toLeft" style="cursor:pointer;"></span>
                <span class="examName">统计与概率</span>
                <span class="toRight" style="cursor:pointer;"></span>
                <div class="shengzi"></div>
            </div>
            <!--内容-->
            <div class="examDetail">
                <ul class="examUl">
                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="examCategory">周测4</div>

                        <div class="examContent" flag="0" classindex="59" title="">
                            点直线和圆周测
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>
                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="examCategory">周测4</div>

                        <div class="examContent" flag="0" classindex="59" title="">
                            正多边形和圆周测
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>
                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="examCategory">周测4</div>

                        <div class="examContent" flag="0" classindex="59" title="">
                            圆的面积周测
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>
                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="examCategory">周测4</div>

                        <div class="examContent" flag="0" classindex="59" title="">
                            圆的应用周测
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>
                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="examSummary" style="display:none;">
                <ul class="examUl">
                    <li class="26">
                        <div class="sumExamCategory">周测1
                            <label>
                                <p></p>
                                <p></p>
                                点直线和圆周测
                            </label>
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>

                    <li class="26">
                        <div class="sumExamCategory">周测1
                            <label>
                                <p></p>
                                <p></p>
                                点直线和圆周测
                            </label>
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>

                    <li class="26">
                        <div class="sumExamCategory">周测1
                            <label>
                                <p></p>
                                <p></p>
                                点直线和圆周测
                            </label>
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>

                    <li class="26">
                        <div class="sumExamCategory">周测1
                            <label>
                                <p></p>
                                <p></p>
                                点直线和圆周测
                            </label>
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </li>

        <li class="exam month5">
            <!--标题-->
            <div class="examTitle" style="visibility:hidden;">
                <span class="toLeft" style="cursor:pointer;"></span>
                <span class="examName">反比例函数</span>
                <span class="toRight" style="cursor:pointer;"></span>
                <div class="shengzi"></div>
            </div>
            <!--内容-->
            <div class="examDetail">
                <ul class="examUl">
                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="examCategory">周测5</div>

                        <div class="examContent" flag="0" classindex="59" title="">
                            点直线和圆周测
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>
                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="examCategory">周测5</div>

                        <div class="examContent" flag="0" classindex="59" title="">
                            正多边形和圆周测
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>
                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="examCategory">周测5</div>

                        <div class="examContent" flag="0" classindex="59" title="">
                            圆的面积周测
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>
                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="examCategory">周测5</div>

                        <div class="examContent" flag="0" classindex="59" title="">
                            圆的应用周测
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>
                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="examSummary" style="display:none;">
                <ul class="examUl">
                    <li class="26">
                        <div class="sumExamCategory">周测1
                            <label>
                                <p></p>
                                <p></p>
                                点直线和圆周测
                            </label>
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>

                    <li class="26">
                        <div class="sumExamCategory">周测1
                            <label>
                                <p></p>
                                <p></p>
                                点直线和圆周测
                            </label>
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>

                    <li class="26">
                        <div class="sumExamCategory">周测1
                            <label>
                                <p></p>
                                <p></p>
                                点直线和圆周测
                            </label>
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>

                    <li class="26">
                        <div class="sumExamCategory">周测1
                            <label>
                                <p></p>
                                <p></p>
                                点直线和圆周测
                            </label>
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </li>

        <li class="exam month6">
            <!--标题-->
            <div class="examTitle" style="visibility:hidden;">
                <span class="toLeft" style="cursor:pointer;"></span>
                <span class="examName">三角形基础</span>
                <span class="toRight" style="cursor:pointer;"></span>
                <div class="shengzi"></div>
            </div>
            <!--内容-->
            <div class="examDetail">
                <ul class="examUl">
                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="examCategory">周测6</div>

                        <div class="examContent" flag="0" classindex="59" title="">
                            点直线和圆周测
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>
                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="examCategory">周测6</div>

                        <div class="examContent" flag="0" classindex="59" title="">
                            正多边形和圆周测
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>
                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="examCategory">周测6</div>

                        <div class="examContent" flag="0" classindex="59" title="">
                            圆的面积周测
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>
                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="examCategory">周测6</div>

                        <div class="examContent" flag="0" classindex="59" title="">
                            圆的应用周测
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>
                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="examSummary" style="display:none;">
                <ul class="examUl">
                    <li class="26">
                        <div class="sumExamCategory">周测1
                            <label>
                                <p></p>
                                <p></p>
                                点直线和圆周测
                            </label>
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>

                    <li class="26">
                        <div class="sumExamCategory">周测1
                            <label>
                                <p></p>
                                <p></p>
                                点直线和圆周测
                            </label>
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>

                    <li class="26">
                        <div class="sumExamCategory">周测1
                            <label>
                                <p></p>
                                <p></p>
                                点直线和圆周测
                            </label>
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>

                    <li class="26">
                        <div class="sumExamCategory">周测1
                            <label>
                                <p></p>
                                <p></p>
                                点直线和圆周测
                            </label>
                        </div>
                        <div class="examDetails">
                            <div class="addExamsSub1" classindex="59">试卷<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>份</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addExamsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addExamsSub4">班组评价</div>
                            <div class="addExamsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </li>
    </ul>
</div>

<!--课标级-->
<div class="standardMainContent" style="display: none;">
    <ul class="standardCon">
        <li class="standard">
            <div class="standardTitle" style="visibility:hidden;">
                <span class="toLeft" style="cursor:pointer;"></span>
                <span class="standardName">图形与圆</span>
                <span class="toRight" style="cursor:pointer;"></span>
                <div class="shengzi"></div>
            </div>
            <!--标题-->
            <div class="standardDetail">
                <ul class="standardUl">
                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="standardCategory">掌握</div>

                        <div class="standardContent" flag="0" classindex="59" title="">
                            旋转与中心对称
                        </div>
                        <div class="standardDetails">
                            <div class="addStandardsSub1" classindex="59">作业<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>组</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addStandardsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addStandardsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addStandardsSub4">班组评价</div>
                            <div class="addStandardsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>

                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="standardCategory">理解</div>

                        <div class="standardContent" flag="0" classindex="59" title="">
                            圆的性质
                        </div>
                        <div class="standardDetails">
                            <div class="addStandardsSub1" classindex="59">作业<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>组</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addStandardsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addStandardsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addStandardsSub4">班组评价</div>
                            <div class="addStandardsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>

                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="standardCategory">熟悉</div>

                        <div class="standardContent" flag="0" classindex="59" title="">
                            点、线、圆
                        </div>
                        <div class="standardDetails">
                            <div class="addStandardsSub1" classindex="59">作业<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>组</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addStandardsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addStandardsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addStandardsSub4">班组评价</div>
                            <div class="addStandardsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>

                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="standardCategory">掌握</div>

                        <div class="standardContent" flag="0" classindex="59" title="">
                            正多边形和圆
                        </div>
                        <div class="standardDetails">
                            <div class="addStandardsSub1" classindex="59">作业<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>组</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addStandardsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addStandardsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addStandardsSub4">班组评价</div>
                            <div class="addStandardsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>

                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="standardCategory">理解</div>

                        <div class="standardContent" flag="0" classindex="59" title="">
                            扇形与圆的面积
                        </div>
                        <div class="standardDetails">
                            <div class="addStandardsSub1" classindex="59">作业<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>组</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addStandardsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addStandardsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addStandardsSub4">班组评价</div>
                            <div class="addStandardsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>

                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="standardCategory">熟悉</div>

                        <div class="standardContent" flag="0" classindex="59" title="">
                            利用列举法求概率
                        </div>
                        <div class="standardDetails">
                            <div class="addStandardsSub1" classindex="59">作业<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>组</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addStandardsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addStandardsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addStandardsSub4">班组评价</div>
                            <div class="addStandardsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>

                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="standardCategory">掌握</div>

                        <div class="standardContent" flag="0" classindex="59" title="">
                            概率的应用
                        </div>
                        <div class="standardDetails">
                            <div class="addStandardsSub1" classindex="59">作业<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>组</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addStandardsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addStandardsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addStandardsSub4">班组评价</div>
                            <div class="addStandardsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>

                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="standardCategory">理解</div>

                        <div class="standardContent" flag="0" classindex="59" title="">
                            反比例函数
                        </div>
                        <div class="standardDetails">
                            <div class="addStandardsSub1" classindex="59">作业<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>组</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addStandardsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addStandardsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addStandardsSub4">班组评价</div>
                            <div class="addStandardsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>

                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="standardCategory">熟悉</div>

                        <div class="standardContent" flag="0" classindex="59" title="">
                            反比例函数应用
                        </div>
                        <div class="standardDetails">
                            <div class="addStandardsSub1" classindex="59">作业<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>组</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addStandardsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addStandardsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addStandardsSub4">班组评价</div>
                            <div class="addStandardsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>

                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="standardCategory">掌握</div>

                        <div class="standardContent" flag="0" classindex="59" title="">
                            图形的相似
                        </div>
                        <div class="standardDetails">
                            <div class="addStandardsSub1" classindex="59">作业<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>组</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addStandardsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addStandardsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addStandardsSub4">班组评价</div>
                            <div class="addStandardsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>

                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="standardCategory">理解</div>

                        <div class="standardContent" flag="0" classindex="59" title="">
                            相似三角形
                        </div>
                        <div class="standardDetails">
                            <div class="addStandardsSub1" classindex="59">作业<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>组</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addStandardsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addStandardsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addStandardsSub4">班组评价</div>
                            <div class="addStandardsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>

                    <li capterid="26" class="26">
                        <div class="addOrDel add" classid="26">
                            <w class="btc">
                                <c>+</c>
                            </w>
                        </div>
                    </li>
                    <li class="26">
                        <div class="addOrDel del" classid="59">
                            <w class="btj">
                                <d>-</d>
                            </w>
                        </div>

                        <div class="standardCategory">熟悉</div>

                        <div class="standardContent" flag="0" classindex="59" title="">
                            位似
                        </div>
                        <div class="standardDetails">
                            <div class="addStandardsSub1" classindex="59">作业<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>
                                                2                                            </label>组</t>
                                        </n>
                                        <br>
                                        <p class="btn"><i>+</i></p>
                                    </span>
                            </div>

                            <div class="addStandardsSub2" classid="59">批语<br>
                                <span>
                                        <n class="btw"><t>
                                            <label>10</label>条</t>
                                        </n><br>
                                        <p class="btn"><i class="modifyCorrect">+</i></p>
                                    </span>
                            </div>

                            <div class="addStandardsSub3">缺陷<br>
                                <span>
                                    <n class="btw"><t>
                                        <label>0</label>种</t>
                                    </n><br>
                                    <p class="btn"><i>+</i></p>
                                </span>
                            </div>
                            <div class="addStandardsSub4">班组评价</div>
                            <div class="addStandardsSub5">
                                <n class="btm">
                                    <m>建议</m>
                                </n>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </li>
    </ul>
</div>
<div class="confirm">
    <p>确定要删除吗?</p>
    <span>确定</span>
    <span>取消</span>
</div>

<?php for($i=1; $i<121; $i++){?>
<form class="addCorrectTable<?php echo $i?>" method="post" action="#" enctype='multipart/form-data'>
    <h2>课时名：<?php echo $class[$i]['class_name']?><br/>作业批语使用统计</h2>
    <div class="back">X</div>
    <table style="margin: 3px;">
        <tr style="margin-top: 5px;">
            <td style="width:10%;">序号</td>
            <td style="width:50%;text-align: center;">批语全句</td>
            <td style="width:10%;">本次使用</td>
            <td style="width:10%;">累计使用</td>
            <td style="width:10%;">本班实例</td>
            <td style="width:10%;">其他实例</td>
        </tr>
        <?php for($j=0; $j<count($commts); $j++){ if($commts[$j]['knowledege'] == $i){?>
        <tr style="margin-top: 4px;text-align: center;">
            <td style="width: 10%;">
                <span><?php echo $j+1?></span>
            </td>
            <td style="width: 50%; text-align: left;"><?php echo $commts[$j]['item'];?> </td>
            <td style="width: 10%;"><?php echo $commts[$j]['thisfrequency'];?> </td>
            <td style="width: 10%;"><?php echo $commts[$j]['allfrequency'];?> </td>
            <td style="width: 10%;"><?php echo $commts[$j]['thisexample'];?> </td>
            <td style="width: 10%;"><?php echo $commts[$j]['otherexample'];?> </td>
        </tr>
        <?php }}?>
    </table>
    <INPUT type="hidden" name="classNum" value="<?php echo $classNum; ?>">
    <INPUT type="hidden" name="capterId" value="<?php echo $capterId; ?>">
    <!-- <INPUT type="submit" class="submit" value="添加"> -->
</form>
<?php }?>

<div class="mask"></div>
<?php for($i=0; $i<16; $i++ ){ ?>
<FORM class="selectCon<?php echo $i;?>" method="post" action="#" enctype='multipart/form-data'>
    <div class="back">X</div>
    <select name="classFlag">
        <option value="0">新课</option>
        <option value="1">活动课</option>
        <option value="2">复习课</option>
        <option value="3">单元测</option>
        <option value="4">考试</option>
    </select>
    <?php for($j = 0; $j < count($addClass); $j++){ if($addClass[$j]['capter_id'] == $i+21){?>
    <label><input name="className" type="radio"
                  value="<?php echo $addClass[$j]['class_name'];?>"/><?php echo $addClass[$j]['class_name'];?>
    </label>
    <?php }}?>
    <label> <input name="className" type="radio" value="#"/></label>
    <INPUT type="text" name="className" id="addForClass" placeholder="输入课时名称"><br/>
    <INPUT type="hidden" name="classNum" value="<?php echo $classNum; ?>">
    <INPUT type="hidden" name="capterId" value="<?php echo $capterId; ?>">
    <!-- <INPUT type="submit" class="submit" style= "display:none;" value="添加"> -->
</FORM>
<?php }?>

<div class="viewPlan" style="cursor:pointer;display:none;">预览教学计划</div>
<script type="text/javascript" src="../../../../../js/seajs/jquery/2.1.4/jquery-2.1.4.min.js"></script>
<script type="text/javascript" src="../../../../../js/seajs/jquery-ui-1.11.4/jquery-ui.min.js"></script>
<script type="text/javascript" src="../../../../../js/seajs/jquery-mousewheel-3.1.12/jquery.mousewheel.js"></script>
<script type="text/javascript" src="../../../../../js/seajs/seajs/2.2.0/sea-debug.js"></script>
<script type="text/javascript" src="../../../../../js/seajs.config.js"></script>
<?php if($cap == 0){?>
<script type="text/javascript">
    seajs.use("../../../../../js/seajs/my/main.js");
</script>
<?php }else if($cap == 1){?>
<script type="text/javascript">
    seajs.use("../../../../../js/seajs/my/demo1.js");
</script>
<?php }?>

<!--wangshuai test-->
<script>

    //        if (document.addEventListener) {
    //            document.addEventListener('DOMMouseScroll', scrollFunc, false);
    //        }//W3C
    //        window.onmousewheel = document.onmousewheel = scrollFunc;//IE/Opera/Chrome

    $(function () {
        //单击可编辑

//            var scrollFunc=function(e){ 
//    e=e || window.event; 
//   
//    if(e.wheelDelta)else if(e.detail) 
//} 
        //当鼠标在情感批语时滚动批语功能
        $("#em1,#em2,#em3,#em4,#em5").mousewheel(function (event, delta) {
            var type = $('#memory2').val();//读取情感批语点选类型
            var psab = $('#memory3').val();//读取能力批语或心理批语点选类型
            var classNum1 = $('#memory1').attr('value');//读取知识点索引
            if (type) {
                //如果已经点选了情感批语
                //alert("已经在滚动了."+delta);
                $.post('/jxyv1/index.php/Home/Index/getemotion', {'classNum1': classNum1, 'type': type}, function (data) {
                    //var rowbase=$('#rowbase').val();
                    var col_base = parseInt(document.getElementById('colbase').value);//读取情感批语显示偏移量
                    if (delta < 0)//如果向后滚轮
                    {
                        // alert("buhao");
                        // alert(data.length);
                        // alert(col_base+5);
                        if (col_base + 5 < data.length)//如果后面还有批语可以显示
                            document.getElementById('colbase').value = parseInt(document.getElementById('colbase').value) + 1;
                    }
                    else//如果向前滚轮
                    {
                        // alert("haode");
                        if (col_base > 0)//如果前面还有批语可以显示
                            document.getElementById('colbase').value = parseInt(document.getElementById('colbase').value) - 1;
                    }
                    var colbase = parseInt(parseInt($('#colbase').val()));//重新获得情感批语偏移量
                    //   alert(colbase);
                    embrush(data, colbase);//更新情感批语
                    if (psab) {
                        if ($('#memory4').val() == 1)//如果当前点选的是心理批语
                        {
                            var classNum1 = document.getElementById('memory1').value;//获得知识点信息
                            var type = document.getElementById('memory3').value;//读取心理批语的点选类型
                            var emotion = document.getElementById('memory2').value;//读取情感批语的点选类型
                            $.post('/jxyv1/index.php/Home/Index/getpyschology', {
                                'classNum1': classNum1,
                                'type': type,
                                'emotion': emotion
                            }, function (data) {
                                var rowbase = parseInt($('#rowbase').val());
                                var colbase = parseInt($('#colbase').val());
                                // alert(rowbase+"sssss");
                                //alert(colbase+"fffff");
                                // psbrush(data[0], rowbase);
                                epbrush(data[1], rowbase, colbase);//更新完整批语
                            }, 'json');
                        }
                        else if ($('#memory4').val() == 2)//如果是能力批语
                        {
                            var classNum1 = document.getElementById('memory1').value;//获得知识点索引
                            var type = document.getElementById('memory3').value;//获得能力批语点选的类型
                            var emotion = document.getElementById('memory2').value;//获得情感批语的类型
                            $.post('/jxyv1/index.php/Home/Index/getability', {
                                'classNum1': classNum1,
                                'type': type,
                                'emotion': emotion
                            }, function (data) {

                                var rowbase = parseInt($('#rowbase').val());//获得能力批语或心理批语偏移量
                                var colbase = parseInt($('#colbase').val());//获得情感批语偏移量
                                // abbrush(data[0], rowbase)
                                eabrush(data[1], rowbase, colbase)//更新完整批语
                            }, 'json');
                        }
                    }
                });
            }
        });
        //鼠标在心理批语时滚动滚轮
        $("#ps1,#ps2,#ps3,#ps4,#ps5").mousewheel(function (event, delta) {
            var psab = $('#memory3').val();//获得心理批语的点选类型
            var abps = $('#memory4').val();
            if (psab && abps == 1) {
                //alert("已经在滚动了."+delta);
                //如果心理批语中已经点选了批语类型
                var row_base = parseInt(document.getElementById('rowbase').value);//获得心理批语偏移量
                var classNum1 = document.getElementById('memory1').value;//获得知识点索引
                var type = document.getElementById('memory3').value;//获得心理批语点选类型
                var emotion = document.getElementById('memory2').value;//获得情感批语点选类型
                $.post('/jxyv1/index.php/Home/Index/getpyschology', {
                    'classNum1': classNum1,
                    'type': type,
                    'emotion': emotion
                }, function (data) {
                    if (delta < 0)//如果滚轮往后滚
                    {
                        if (row_base + 5 < data[0].length) {
                            document.getElementById('rowbase').value = parseInt(document.getElementById('rowbase').value) + 1;

                        }
                    }
                    else//如果滚轮往前滚
                    {
                        if (row_base > 0)
                            document.getElementById('rowbase').value = parseInt(document.getElementById('rowbase').value) - 1;

                    }
                    var rowbase = parseInt($('#rowbase').val());//获得心理批语点选类型
                    var colbase = parseInt($('#colbase').val());//获得情感批语点选类型
//                        alert(rowbase+"sssss");
//                        alert(colbase+"fffff");
                    psbrush(data[0], rowbase);//更新心理批语
                    epbrush(data[1], rowbase, colbase);//更新完整批语
                }, 'json');
            }

        });
        //鼠标在能力批语时滚动鼠标
        $("#ab1,#ab2,#ab3,#ab4,#ab5").mousewheel(function (event, delta) {
            var psab = $('#memory3').val();//获得能力批语的点选类型
            var abps = $('#memory4').val();
            if (psab && abps == 2) {
                //alert("已经在滚动了."+delta);
                var row_base = parseInt(document.getElementById('rowbase').value);
                var classNum1 = document.getElementById('memory1').value;
                var type = document.getElementById('memory3').value;
                var emotion = document.getElementById('memory2').value;
                $.post('/jxyv1/index.php/Home/Index/getability', {
                    'classNum1': classNum1,
                    'type': type,
                    'emotion': emotion
                }, function (data) {
                    if (delta < 0)//如果滚轮往后滚
                    {
                        if (row_base + 5 < data[0].length) {
                            document.getElementById('rowbase').value = parseInt(document.getElementById('rowbase').value) + 1;
                        }
                    }
                    else//如果滚轮往前滚
                    {
                        if (row_base > 0)
                            document.getElementById('rowbase').value = parseInt(document.getElementById('rowbase').value) - 1;
                    }
                    var rowbase = parseInt($('#rowbase').val());
                    var colbase = parseInt($('#colbase').val());
//                        alert(rowbase+"sssss");
//                        alert(colbase+"fffff");
                    abbrush(data[0], rowbase);
                    eabrush(data[1], rowbase, colbase);
                }, 'json');
            }
        });


        $('table td').click(function () {

            // alert(".#111"+$('#memory2').val());
            // alert(".#"+$('#memory1').val());
            // alert("document:"+document.getElementById('memory2').value);

            if (document.getElementById('memory2').value || document.getElementById('memory3').value) {
                // alert($('#memory2').val());
                if (!$(this).is('.textarea')) {
                    $(this).addClass('textarea').html('<textarea  style= "background-color:transparent;border:none;height:100%;width:100%;rows=4;word-break:break-all;overflow:hidden"> ' + $(this).text() + ' </textarea>').find('textarea').focus().blur(function () {
                        var thisclass = $(this).parent().attr("id");
                        // var thisclass = $(this).attr("class");
                        $(this).parent().removeClass('textarea').html($(this).val());
                        // alert(thisclass);
                        // var sss=thisclass.search("em");
                        // alert(sss);
                        var item = $(this).val();
                        var colbase = parseInt($('#colbase').val());
                        var rowbase = parseInt($('#rowbase').val());
                        var classNum1 = $('#memory1').val();
                        var emotion = $('#memory2').val();
                        var psab_type = $('#memory4').val();
                        var type = $('#memory3').val();
                        var tdcol = -1;
                        var tdrow = -1;
                        var model = 0;
                        if (thisclass.search("em") != -1) {
                            //alert("情感批语");
                            model = 1;
                            switch (thisclass) {
                                case "em1":
                                    tdcol = 1;
                                    break;
                                case "em2":
                                    tdcol = 2;
                                    break;
                                case "em3":
                                    tdcol = 3;
                                    break;
                                case "em4":
                                    tdcol = 4;
                                    break;
                                case "em5":
                                    tdcol = 5;
                                    break;
                            }
                            // alert("行：" + tdrow);
                        }
                        else if (thisclass.search("ps") != -1) {
                            //alert("心理批语");
                            model = 2;
                            switch (thisclass) {
                                case "ps1":
                                    tdrow = 1;
                                    break;
                                case "ps2":
                                    tdrow = 2;
                                    break;
                                case "ps3":
                                    tdrow = 3;
                                    break;
                                case "ps4":
                                    tdrow = 4;
                                    break;
                                case "ps5":
                                    tdrow = 5;
                                    break;
                            }
                            // alert("行：" + tdrow);
                        }
                        else if (thisclass.search("ab") != -1) {
                            //alert("能力批语");
                            model = 3;
                            switch (thisclass) {
                                case "ab1":
                                    tdrow = 1;
                                    break;
                                case "ab2":
                                    tdrow = 2;
                                    break;
                                case "ab3":
                                    tdrow = 3;
                                    break;
                                case "ab4":
                                    tdrow = 4;
                                    break;
                                case "ab5":
                                    tdrow = 5;
                                    break;
                            }
                            // alert("行：" + tdrow);
                        }
                        else {
                            //alert("完整批语");
                            model = 4;
                            switch (thisclass) {
                                case "t11":
                                    tdrow = 1;
                                    tdcol = 1;
                                    break;
                                case "t12":
                                    tdrow = 1;
                                    tdcol = 2;
                                    break;
                                case "t13":
                                    tdrow = 1;
                                    tdcol = 3;
                                    break;
                                case "t14":
                                    tdrow = 1;
                                    tdcol = 4;
                                    break;
                                case "t15":
                                    tdrow = 1;
                                    tdcol = 5;
                                    break;
                                case "t21":
                                    tdrow = 2;
                                    tdcol = 1;
                                    break;
                                case "t22":
                                    tdrow = 2;
                                    tdcol = 2;
                                    break;
                                case "t23":
                                    tdrow = 2;
                                    tdcol = 3;
                                    break;
                                case "t24":
                                    tdrow = 2;
                                    tdcol = 4;
                                    break;
                                case "t25":
                                    tdrow = 2;
                                    tdcol = 5;
                                    break;
                                case "t31":
                                    tdrow = 3;
                                    tdcol = 1;
                                    break;
                                case "t32":
                                    tdrow = 3;
                                    tdcol = 2;
                                    break;
                                case "t33":
                                    tdrow = 3;
                                    tdcol = 3;
                                    break;
                                case "t34":
                                    tdrow = 3;
                                    tdcol = 4;
                                    break;
                                case "t35":
                                    tdrow = 3;
                                    tdcol = 5;
                                    break;
                                case "t41":
                                    tdrow = 4;
                                    tdcol = 1;
                                    break;
                                case "t42":
                                    tdrow = 4;
                                    tdcol = 2;
                                    break;
                                case "t43":
                                    tdrow = 4;
                                    tdcol = 3;
                                    break;
                                case "t44":
                                    tdrow = 4;
                                    tdcol = 4;
                                    break;
                                case "t45":
                                    tdrow = 4;
                                    tdcol = 5;
                                    break;
                                case "t51":
                                    tdrow = 5;
                                    tdcol = 1;
                                    break;
                                case "t52":
                                    tdrow = 5;
                                    tdcol = 2;
                                    break;
                                case "t53":
                                    tdrow = 5;
                                    tdcol = 3;
                                    break;
                                case "t54":
                                    tdrow = 5;
                                    tdcol = 4;
                                    break;
                                case "t55":
                                    tdrow = 5;
                                    tdcol = 5;
                                    break;
                            }
                            //  alert("行：" + tdrow + " 列：" + tdcol);
                        }
                        //  var thisid = $(this).parent().siblings("th:eq(0)").text();
                        // var thisvalue=$(this).val();

                        //alert("classNum1:" + classNum1 + " model:" + model + " item:" + item + " emotion:" + emotion + " type:" + type + " tdcol:" + tdcol + " tdrow:" + tdrow);
                        // alert(tdrow);
                        tdcol = parseInt(tdcol) + colbase;
                        tdrow = parseInt(tdrow) + rowbase;
                        // alert(rowbase);
                        // alert(tdrow);
                        $.ajax({
                            type: 'POST',
                            url: '/jxyv1/index.php/Home/Index/updateitem',
                            data: {
                                'classNum1': classNum1,
                                'model': model,
                                'item': item,
                                'emotion': emotion,
                                'type': type,
                                'tdcol': tdcol,
                                'tdrow': tdrow,
                                'psab_type': psab_type
                            }
                        });
                    });
                }
            }
            else {
                alert("请先点选批语")
            }
        }).hover(function () {
            $(this).addClass('hover');
        }, function () {
            $(this).removeClass('hover');
        });


        //情感批语
        $(".clemotion").click(function () {

            // var classNum1=document.getElementById('memory1').value;
            var classNum1 = $('#memory1').attr('value');
            //  alert(classNum1);
            var type = $(this).attr('value');
            //$("#em1")['bgcolor']='white';
            var temp = document.getElementById('memory2').value = type;
            document.getElementById('colbase').value = 0;
            //  alert(temp);

            $(".clemotion").css({'background': "rgb(18, 73, 52)", 'color': "white"});
            // $(".clemotion").css({'color':"gray"});
            //alert(type);
            if (type == 1) {
                $(".clemotion[value=1]").css({'background': "white", 'color': "#000"});
            }
            else if (type == 2) {
                $(".clemotion[value=2]").css({'background': "white", 'color': "#000"});
            }
            else if (type == 3) {
                $(".clemotion[value=3]").css({'background': "white", 'color': "#000"});
            }
            else if (type == 4) {
                $(".clemotion[value=4]").css({'background': "white", 'color': "#000"});
            }
            else if (type == 5) {
                $(".clemotion[value=5]").css({'background': "white", 'color': "#000"});
            }
            //$(".clemotion[value=type]").css({'background': "white", 'color': "#000"});
            // $(".clemotion").css('color',"000");

            //  $(".clemotion['value'=1]").css(bgcolor:"white");
            //   $(this).css(bgcolor:"white");
            $.post('/jxyv1/index.php/Home/Index/getemotion', {'classNum1': classNum1, 'type': type}, function (data) {
                //var rowbase=$('#rowbase').val();
                var colbase = parseInt($('#colbase').val());
                //   alert(colbase);
                embrush(data, colbase);
            });
        });


        $(".emaddevent").click(function () {
            //alert("tacchulaile");
            if ($('#memory2').val() == "") {
                alert('请先选择情感批语类型');
                return false;
            }
            $("#tb td").empty();
            //$(".clemotion").css({'background': "rgb(18, 73, 52)", 'color': "white"});
            $(".clability").css({'background': "rgb(18, 73, 52)", 'color': "white"});
            $(".clpyschology").css({'background': "rgb(18, 73, 52)", 'color': "white"});

            var classNum1 = $('#memory1').attr('value');
            var type = document.getElementById('memory2').value;
            $.post('/jxyv1/index.php/Home/Index/getemotion', {'classNum1': classNum1, 'type': type}, function (data) {

                var colbase = data.length - 4;
                document.getElementById('colbase').value = colbase;

                //    alert($('#colbase').val());
                embrush(data, colbase);

            });


        });


        $(".psaddevent").click(function () {
            //alert("tacchulaile");
            $("#tb td").empty();
            $(".clemotion").css({'background': "rgb(18, 73, 52)", 'color': "white"});
            $(".clability").css({'background': "rgb(18, 73, 52)", 'color': "white"});
            //$(".clpyschology").css({'background': "rgb(18, 73, 52)", 'color': "white"});

            var classNum1 = $('#memory1').attr('value');
            var type = document.getElementById('memory3').value;
            var emotion = document.getElementById('memory2').value;
            $.post('/jxyv1/index.php/Home/Index/getpyschology', {
                'classNum1': classNum1,
                'type': type,
                'emotion': emotion
            }, function (data) {
                var rowbase = data[0].length - 4;
                document.getElementById('rowbase').value = rowbase;

                //alert($('#colbase').val());

                psbrush(data[0], rowbase);
                //epbrush(data[1], rowbase, colbase);

            }, 'json');


        });

        $(".abaddevent").click(function () {
            //alert("tacchulaile");
            $("#tb td").empty();
            $(".clemotion").css({'background': "rgb(18, 73, 52)", 'color': "white"});
            // $(".clability").css({'background': "rgb(18, 73, 52)", 'color': "white"});
            $(".clpyschology").css({'background': "rgb(18, 73, 52)", 'color': "white"});

            var classNum1 = $('#memory1').attr('value');
            var type = document.getElementById('memory3').value;
            var emotion = document.getElementById('memory2').value;
            $.post('/jxyv1/index.php/Home/Index/getability', {
                'classNum1': classNum1,
                'type': type,
                'emotion': emotion
            }, function (data) {

                var rowbase = data[0].length - 4;
                document.getElementById('rowbase').value = rowbase;

                //alert($('#colbase').val());

                abbrush(data[0], rowbase);

            }, 'json');


        });

        //心理批语
        $(".clpyschology").click(function () {

            if (document.getElementById('em1').innerHTML == "") {
                alert("先选择情感批语")
            }
            else {

                var classNum1 = document.getElementById('memory1').value;
                var type = $(this).attr('value');
                document.getElementById('memory3').value = type;
                document.getElementById('memory4').value = 1;
                document.getElementById('rowbase').value = 0;
                var emotion = document.getElementById('memory2').value;
                //  alert(emotion);
                $(".clability").css({'background': "rgb(18, 73, 52)", 'color': "gray"});
                $(".clpyschology").css({'background': "rgb(18, 73, 52)", 'color': "white"});
                // $(".clemotion").css({'color':"gray"});
                //alert(type);
                if (type == 1) {
                    $(".clpyschology[value=1]").css({'background': "white", 'color': "#000"});
                }
                else if (type == 2) {
                    $(".clpyschology[value=2]").css({'background': "white", 'color': "#000"});
                }
                else if (type == 3) {
                    $(".clpyschology[value=3]").css({'background': "white", 'color': "#000"});
                }
                else if (type == 4) {
                    $(".clpyschology[value=4]").css({'background': "white", 'color': "#000"});
                }
                else if (type == 5) {
                    $(".clpyschology[value=5]").css({'background': "white", 'color': "#000"});
                }
                $(".clpyschology[value=type]").css({'background': "white", 'color': "#000"});

                $.post('/jxyv1/index.php/Home/Index/getpyschology', {
                    'classNum1': classNum1,
                    'type': type,
                    'emotion': emotion
                }, function (data) {
                    var rowbase = parseInt($('#rowbase').val());
                    var colbase = parseInt($('#colbase').val());
//                        alert(rowbase+"sssss");
//                        alert(colbase+"fffff");
                    psbrush(data[0], rowbase);
                    epbrush(data[1], rowbase, colbase);

                }, 'json');


            }
        });

        function embrush(array, colbase) {
            document.getElementById('em1').innerHTML = array[colbase + 0]['item'];
            document.getElementById('em2').innerHTML = array[colbase + 1]['item'];
            document.getElementById('em3').innerHTML = array[colbase + 2]['item'];
            document.getElementById('em4').innerHTML = array[colbase + 3]['item'];
            document.getElementById('em5').innerHTML = array[colbase + 4]['item'];

        }

        function psbrush(array, rowbase) {
            document.getElementById('ps1').innerHTML = array[rowbase + 0].item;
            document.getElementById('ps2').innerHTML = array[rowbase + 1].item;
            document.getElementById('ps3').innerHTML = array[rowbase + 2].item;
            document.getElementById('ps4').innerHTML = array[rowbase + 3].item;
            document.getElementById('ps5').innerHTML = array[rowbase + 4].item;
            document.getElementById('ab1').innerHTML = "";
            document.getElementById('ab2').innerHTML = "";
            document.getElementById('ab3').innerHTML = "";
            document.getElementById('ab4').innerHTML = "";
            document.getElementById('ab5').innerHTML = "";
        }

        function abbrush(array, rowbase) {
            document.getElementById('ab1').innerHTML = array[rowbase + 0].item;
            document.getElementById('ab2').innerHTML = array[rowbase + 1].item;
            document.getElementById('ab3').innerHTML = array[rowbase + 2].item;
            document.getElementById('ab4').innerHTML = array[rowbase + 3].item;
            document.getElementById('ab5').innerHTML = array[rowbase + 4].item;
            document.getElementById('ps1').innerHTML = "";
            document.getElementById('ps2').innerHTML = "";
            document.getElementById('ps3').innerHTML = "";
            document.getElementById('ps4').innerHTML = "";
            document.getElementById('ps5').innerHTML = "";
        }


        function epbrush(array, rowbase, colbase)  //情感+能力评语西显示
        {
            document.getElementById('t11').innerHTML = epfindelement(array, colbase + 1, rowbase + 1) || document.getElementById('ps1').innerHTML + "," + document.getElementById('em1').innerHTML;
            document.getElementById('t12').innerHTML = epfindelement(array, colbase + 2, rowbase + 1) || document.getElementById('ps1').innerHTML + "," + document.getElementById('em2').innerHTML;
            document.getElementById('t13').innerHTML = epfindelement(array, colbase + 3, rowbase + 1) || document.getElementById('ps1').innerHTML + "," + document.getElementById('em3').innerHTML;
            document.getElementById('t14').innerHTML = epfindelement(array, colbase + 4, rowbase + 1) || document.getElementById('ps1').innerHTML + "," + document.getElementById('em4').innerHTML;
            document.getElementById('t15').innerHTML = epfindelement(array, colbase + 5, rowbase + 1) || document.getElementById('ps1').innerHTML + "," + document.getElementById('em5').innerHTML;
            document.getElementById('t21').innerHTML = epfindelement(array, colbase + 1, rowbase + 2) || document.getElementById('ps2').innerHTML + "," + document.getElementById('em1').innerHTML;
            document.getElementById('t22').innerHTML = epfindelement(array, colbase + 2, rowbase + 2) || document.getElementById('ps2').innerHTML + "," + document.getElementById('em2').innerHTML;
            document.getElementById('t23').innerHTML = epfindelement(array, colbase + 3, rowbase + 2) || document.getElementById('ps2').innerHTML + "," + document.getElementById('em3').innerHTML;
            document.getElementById('t24').innerHTML = epfindelement(array, colbase + 4, rowbase + 2) || document.getElementById('ps2').innerHTML + "," + document.getElementById('em4').innerHTML;
            document.getElementById('t25').innerHTML = epfindelement(array, colbase + 5, rowbase + 2) || document.getElementById('ps2').innerHTML + "," + document.getElementById('em5').innerHTML;
            document.getElementById('t31').innerHTML = epfindelement(array, colbase + 1, rowbase + 3) || document.getElementById('ps3').innerHTML + "," + document.getElementById('em1').innerHTML;
            document.getElementById('t32').innerHTML = epfindelement(array, colbase + 2, rowbase + 3) || document.getElementById('ps3').innerHTML + "," + document.getElementById('em2').innerHTML;
            document.getElementById('t33').innerHTML = epfindelement(array, colbase + 3, rowbase + 3) || document.getElementById('ps3').innerHTML + "," + document.getElementById('em3').innerHTML;
            document.getElementById('t34').innerHTML = epfindelement(array, colbase + 4, rowbase + 3) || document.getElementById('ps3').innerHTML + "," + document.getElementById('em4').innerHTML;
            document.getElementById('t35').innerHTML = epfindelement(array, colbase + 5, rowbase + 3) || document.getElementById('ps3').innerHTML + "," + document.getElementById('em5').innerHTML;
            document.getElementById('t41').innerHTML = epfindelement(array, colbase + 1, rowbase + 4) || document.getElementById('ps4').innerHTML + "," + document.getElementById('em1').innerHTML;
            document.getElementById('t42').innerHTML = epfindelement(array, colbase + 2, rowbase + 4) || document.getElementById('ps4').innerHTML + "," + document.getElementById('em2').innerHTML;
            document.getElementById('t43').innerHTML = epfindelement(array, colbase + 3, rowbase + 4) || document.getElementById('ps4').innerHTML + "," + document.getElementById('em3').innerHTML;
            document.getElementById('t44').innerHTML = epfindelement(array, colbase + 4, rowbase + 4) || document.getElementById('ps4').innerHTML + "," + document.getElementById('em4').innerHTML;
            document.getElementById('t45').innerHTML = epfindelement(array, colbase + 5, rowbase + 4) || document.getElementById('ps4').innerHTML + "," + document.getElementById('em5').innerHTML;
            document.getElementById('t51').innerHTML = epfindelement(array, colbase + 1, rowbase + 5) || document.getElementById('ps5').innerHTML + "," + document.getElementById('em1').innerHTML;
            document.getElementById('t52').innerHTML = epfindelement(array, colbase + 2, rowbase + 5) || document.getElementById('ps5').innerHTML + "," + document.getElementById('em2').innerHTML;
            document.getElementById('t53').innerHTML = epfindelement(array, colbase + 3, rowbase + 5) || document.getElementById('ps5').innerHTML + "," + document.getElementById('em3').innerHTML;
            document.getElementById('t54').innerHTML = epfindelement(array, colbase + 4, rowbase + 5) || document.getElementById('ps5').innerHTML + "," + document.getElementById('em4').innerHTML;
            document.getElementById('t55').innerHTML = epfindelement(array, colbase + 5, rowbase + 5) || document.getElementById('ps5').innerHTML + "," + document.getElementById('em5').innerHTML;
        }


        function eabrush(array, rowbase, colbase) //情感+能力评语显示
        {
            document.getElementById('t11').innerHTML = eafindelement(array, colbase + 1, rowbase + 1) || document.getElementById('ab1').innerHTML + "," + document.getElementById('em1').innerHTML;
            document.getElementById('t12').innerHTML = eafindelement(array, colbase + 2, rowbase + 1) || document.getElementById('ab1').innerHTML + "," + document.getElementById('em2').innerHTML;
            document.getElementById('t13').innerHTML = eafindelement(array, colbase + 3, rowbase + 1) || document.getElementById('ab1').innerHTML + "," + document.getElementById('em3').innerHTML;
            document.getElementById('t14').innerHTML = eafindelement(array, colbase + 4, rowbase + 1) || document.getElementById('ab1').innerHTML + "," + document.getElementById('em4').innerHTML;
            document.getElementById('t15').innerHTML = eafindelement(array, colbase + 5, rowbase + 1) || document.getElementById('ab1').innerHTML + "," + document.getElementById('em5').innerHTML;
            document.getElementById('t21').innerHTML = eafindelement(array, colbase + 1, rowbase + 2) || document.getElementById('ab2').innerHTML + "," + document.getElementById('em1').innerHTML;
            document.getElementById('t22').innerHTML = eafindelement(array, colbase + 2, rowbase + 2) || document.getElementById('ab2').innerHTML + "," + document.getElementById('em2').innerHTML;
            document.getElementById('t23').innerHTML = eafindelement(array, colbase + 3, rowbase + 2) || document.getElementById('ab2').innerHTML + "," + document.getElementById('em3').innerHTML;
            document.getElementById('t24').innerHTML = eafindelement(array, colbase + 4, rowbase + 2) || document.getElementById('ab2').innerHTML + "," + document.getElementById('em4').innerHTML;
            document.getElementById('t25').innerHTML = eafindelement(array, colbase + 5, rowbase + 2) || document.getElementById('ab2').innerHTML + "," + document.getElementById('em5').innerHTML;
            document.getElementById('t31').innerHTML = eafindelement(array, colbase + 1, rowbase + 3) || document.getElementById('ab3').innerHTML + "," + document.getElementById('em1').innerHTML;
            document.getElementById('t32').innerHTML = eafindelement(array, colbase + 2, rowbase + 3) || document.getElementById('ab3').innerHTML + "," + document.getElementById('em2').innerHTML;
            document.getElementById('t33').innerHTML = eafindelement(array, colbase + 3, rowbase + 3) || document.getElementById('ab3').innerHTML + "," + document.getElementById('em3').innerHTML;
            document.getElementById('t34').innerHTML = eafindelement(array, colbase + 4, rowbase + 3) || document.getElementById('ab3').innerHTML + "," + document.getElementById('em4').innerHTML;
            document.getElementById('t35').innerHTML = eafindelement(array, colbase + 5, rowbase + 3) || document.getElementById('ab3').innerHTML + "," + document.getElementById('em5').innerHTML;
            document.getElementById('t41').innerHTML = eafindelement(array, colbase + 1, rowbase + 4) || document.getElementById('ab4').innerHTML + "," + document.getElementById('em1').innerHTML;
            document.getElementById('t42').innerHTML = eafindelement(array, colbase + 2, rowbase + 4) || document.getElementById('ab4').innerHTML + "," + document.getElementById('em2').innerHTML;
            document.getElementById('t43').innerHTML = eafindelement(array, colbase + 3, rowbase + 4) || document.getElementById('ab4').innerHTML + "," + document.getElementById('em3').innerHTML;
            document.getElementById('t44').innerHTML = eafindelement(array, colbase + 4, rowbase + 4) || document.getElementById('ab4').innerHTML + "," + document.getElementById('em4').innerHTML;
            document.getElementById('t45').innerHTML = eafindelement(array, colbase + 5, rowbase + 4) || document.getElementById('ab4').innerHTML + "," + document.getElementById('em5').innerHTML;
            document.getElementById('t51').innerHTML = eafindelement(array, colbase + 1, rowbase + 5) || document.getElementById('ab5').innerHTML + "," + document.getElementById('em1').innerHTML;
            document.getElementById('t52').innerHTML = eafindelement(array, colbase + 2, rowbase + 5) || document.getElementById('ab5').innerHTML + "," + document.getElementById('em2').innerHTML;
            document.getElementById('t53').innerHTML = eafindelement(array, colbase + 3, rowbase + 5) || document.getElementById('ab5').innerHTML + "," + document.getElementById('em3').innerHTML;
            document.getElementById('t54').innerHTML = eafindelement(array, colbase + 4, rowbase + 5) || document.getElementById('ab5').innerHTML + "," + document.getElementById('em4').innerHTML;
            document.getElementById('t55').innerHTML = eafindelement(array, colbase + 1, rowbase + 5) || document.getElementById('ab5').innerHTML + "," + document.getElementById('em5').innerHTML;
        }


        function epfindelement(array, id1, id2)     //情感+心理评语单元格查找
        {
            if (!array.length)
                return "";
            for (var i = 0; i < array.length; i++) {
                if (array[i].em_id == id1 && array[i].ps_id == id2)
                    return array[i].item;

            }
            return "";
        }

        function eafindelement(array, id1, id2) {
            if (!array.length)
                return "";
            for (var i = 0; i < array.length; i++) {
                if (array[i].em_id == id1 && array[i].ab_id == id2)
                    return array[i].item;

            }
            return "";
        }

        //能力批语
        $(".clability").click(function () {
            if (document.getElementById('em1').innerHTML == "") {
                alert("先选择情感批语");
            }
            else {
                var classNum1 = document.getElementById('memory1').value;
                var type = $(this).attr('value');
                document.getElementById('memory3').value = type;
                document.getElementById('rowbase').value = 0
                document.getElementById('memory4').value = 2;
                var emotion = document.getElementById('memory2').value;
                $(".clpyschology").css({'background': "rgb(18, 73, 52)", 'color': "gray"});
                $(".clability").css({'background': "rgb(18, 73, 52)", 'color': "white"});
                // $(".clemotion").css({'color':"gray"});
                //alert(type);
                if (type == 1) {
                    $(".clability[value=1]").css({'background': "white", 'color': "#000"});
                }
                else if (type == 2) {
                    $(".clability[value=2]").css({'background': "white", 'color': "#000"});
                }
                else if (type == 3) {
                    $(".clability[value=3]").css({'background': "white", 'color': "#000"});
                }
                else if (type == 4) {
                    $(".clability[value=4]").css({'background': "white", 'color': "#000"});
                }
                else if (type == 5) {
                    $(".clability[value=5]").css({'background': "white", 'color': "#000"});
                }
                $(".clpyschology[value=type]").css({'background': "white", 'color': "#000"});

                $.post('/jxyv1/index.php/Home/Index/getability', {
                    'classNum1': classNum1,
                    'type': type,
                    'emotion': emotion
                }, function (data) {

                    var rowbase = parseInt($('#rowbase').val());
                    var colbase = parseInt($('#colbase').val());
                    abbrush(data[0], rowbase)

                    eabrush(data[1], rowbase, colbase)

                }, 'json');

            }
        });


        //点击加号
        $(".modifyCorrect").click(function () {

            var classNum1 = $(this).parent().parent().parent().attr("classId");
            // alert(classNum1);
            $("#memory1").attr('value', classNum1);
            // document.getElementById('memory1').value=classNum1;

            $("#commentshowtable").show();
            $('.mask').css('display', 'none');
            return false
        });

        //点击关闭
        $(".backout").click(function () {
            $("#commentshowtable").hide();
            $("#tb td").empty();
            document.getElementById('colbase').value = 0;
            document.getElementById('rowbase').value = 0;
            document.getElementById('memory2').value = '';
            document.getElementById('memory3').value = '';
            $(".clemotion").css({'background': "rgb(18, 73, 52)", 'color': "white"});
            $(".clability").css({'background': "rgb(18, 73, 52)", 'color': "white"});
            $(".clpyschology").css({'background': "rgb(18, 73, 52)", 'color': "white"});
        });


    });


</script>

</body>
</html>
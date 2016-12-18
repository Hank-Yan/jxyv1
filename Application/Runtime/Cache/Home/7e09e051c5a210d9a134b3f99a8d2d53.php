<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .title, .content {
            text-align: center;
        }

        .name {
            text-align: right;
            margin-right: 10vw;
        }

        .content li {
            list-style-type: none;
        }

        .hwimages {
            height: 75vh;
            width: 25vw;
        }
    </style>
</head>
<body>
    <?php if($capterInfo == null):?>
        <div class="title">
            <h1>查无此章</h1>
        </div>
    <?php else:?>
        <div class="title">
            <h1>第<?=$capterInfo['capter_num']?>章　<?=$capterInfo['capter_name']?></h1>
        </div>
    <?php endif;?>
    <?php if($studentInfo == null):?>
        <div class="name">
            <h3>姓名：查无此人</h3>
        </div>
    <?php else:?>
        <div class="name">
            <h3>姓名：<?=$studentInfo['name']?></h3>
        </div>
    <?php endif;?>

    <div class="content">
        <?php if($homework == null):?>
        <img src="/jxyv1/Public/nohomework.png">
        <?php else:?>
        <?php foreach($homework as $item):?>
        <!--取出该同学在本章节的所有作业-->
        <li><img src="<?=$item['path']?>" class="hwimages"></li>
        <?php endforeach;?>
        <?php endif?>
    </div>
</body>
</html>
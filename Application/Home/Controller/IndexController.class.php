<?php

namespace Home\Controller;

use Think\Controller;

class IndexController extends Controller {

    public function _initialize() {
        R('Public/top');
        //home_cookie(cookie('t_uid'));
        $this->hwImages = D('Hwimages');// 声明数据库连接
    }

    public function getCorrect() {
        $classNum = $_POST['classNum1'];
        // $classNum = 1;
        $Commts = M('Commts');
        // $map['knowledege'] = array('eq',$classNum);
        $where['knowledege'] = $classNum;
        $commtsInfo = $Commts->where($where)->field('knowledege,category,item,ThisFrequency,AllFrequency,ThisExample,OtherExample')->order('id asc')->select();
        // dump($commtsInfo);
        if (1) {
            $this->success($commtsInfo, '用户名正确~', true);
            // $this->ajaxReturn($commtsInfo,'用户名正确~',1);
            // Response.write($commtsInfo);
        } else {
            // $this->ajaxReturn('','用户名错误！',0);
            $this->error('数据错误');
        }
    }

    public function getemotion() {
        $classNum = $_POST['classNum1'];
        $type = $_POST['type'];
        $Commts = M('Commtemtion');
        $where['index'] = $classNum;
        $where['category'] = $type;
        $commtsInfo = $Commts->where($where)->order('type_id asc')->select();
        $this->ajaxReturn($commtsInfo);
    }

    public function updateitem() {

        $classNum = $_POST['classNum1'];
        $type = $_POST['type'];
        $model = $_POST['model'];
        $emotion = $_POST['emotion'];
        $tdrow = $_POST['tdrow'];
        $tdcol = $_POST['tdcol'];
        $item = $_POST['item'];
        $psab_type = $_POST['psab_type'];
        if ($model == 1) {
            $Commts = M('Commtemtion');

            echo "index:";
            echo $classNum;
            echo " category:";
            echo $emotion;
            echo " type_id:";
            echo $tcol;
            echo " item:";
            echo $item;
            $where['index'] = $classNum;
            $where['category'] = $emotion;
            $where['type_id'] = $tdcol;
            $commtsInfo = $Commts->where($where)->find();
            echo $commtsInfo;
            if ($commtsInfo) {
                $where['index'] = $classNum;
                $where['category'] = $emotion;
                $where['type_id'] = $tdcol;
                $data['item'] = $item;
                $result = $Commts->where($where)->save($data);
                if ($result != false) {
                    echo "chengong";
                } else {
                    echo "shibai";
                }
            } else {
                $data['index'] = $classNum;
                $data['category'] = $emotion;
                $data['type_id'] = $tdcol;
                $data['item'] = $item;
                $result = $Commts->add($data);
                if ($result != false) {
                    echo "chengong";
                } else {
                    echo "shibai";
                }
            }
        } else if ($model == 2) {



            $Commts = M('commtpsy');

            echo "index:";
            echo $classNum;
            echo " category:";
            echo $emotion;
            echo " type_id:";
            echo $tdrow;
            echo " item:";
            echo $item;
            $where['index'] = $classNum;
            $where['category'] = $type;
            $where['type_id'] = $tdrow;
            $commtsInfo = $Commts->where($where)->find();
            echo $commtsInfo;
            if ($commtsInfo) {
                $where['index'] = $classNum;
                $where['category'] = $type;
                $where['type_id'] = $tdrow;
                $data['item'] = $item;
                $result = $Commts->where($where)->save($data);
                if ($result != false) {
                    echo "chengong";
                } else {
                    echo "shibai";
                }
            } else {
                $data['index'] = $classNum;
                $data['category'] = $type;
                $data['type_id'] = $tdrow;
                $data['item'] = $item;
                $result = $Commts->add($data);
                if ($result != false) {
                    echo "chengong";
                } else {
                    echo "shibai";
                }
            }
        } else if ($model == 3) {


            $Commts = M('commtability');

            echo "index:";
            echo $classNum;
            echo " category:";
            echo $emotion;
            echo " type_id:";
            echo $tdrow;
            echo " item:";
            echo $item;
            $where['index'] = $classNum;
            $where['category'] = $type;
            $where['type_id'] = $tdrow;
            $commtsInfo = $Commts->where($where)->find();
            echo $commtsInfo;
            if ($commtsInfo) {
                $where['index'] = $classNum;
                $where['category'] = $type;
                $where['type_id'] = $tdrow;
                $data['item'] = $item;
                $result = $Commts->where($where)->save($data);
                if ($result != false) {
                    echo "chengong";
                } else {
                    echo "shibai";
                }
            } else {
                $data['index'] = $classNum;
                $data['category'] = $type;
                $data['type_id'] = $tdrow;
                $data['item'] = $item;
                $result = $Commts->add($data);
                if ($result != false) {
                    echo "chengong";
                } else {
                    echo "shibai";
                }
            }
        } else if ($model == 4) {


            if ($psab_type == 1) {
                $Commts = M('commtep');
                $where['ps_type'] = $type;
                $where['ps_id'] = $tdrow;
                $where['index'] = $classNum;
                $where['em_type'] = $emotion;
                $where['em_id'] = $tdcol;
                $commtsInfo = $Commts->where($where)->find();
                if ($commtsInfo) {

                    $where['ps_type'] = $type;
                    $where['ps_id'] = $tdrow;
                    $where['index'] = $classNum;
                    $where['em_type'] = $emotion;
                    $where['em_id'] = $tdcol;
                    $data['item'] = $item;
                    $result = $Commts->where($where)->save($data);
                    if ($result != false) {
                        echo "chengong";
                    } else {
                        echo "shibai";
                    }
                } else {
                    $data['ps_type'] = $type;
                    $data['ps_id'] = $tdrow;
                    $data['index'] = $classNum;
                    $data['em_type'] = $emotion;
                    $data['em_id'] = $tdcol;
                    $data['item'] = $item;
                    $result = $Commts->add($data);
                    if ($result != false) {
                        echo "chengong";
                    } else {
                        echo "shibai";
                    }
                }
            } else if ($psab_type == 2) {
                $Commts = M('commtea');
                $where['ab_type'] = $type;
                $where['ab_id'] = $tdrow;
                $where['index'] = $classNum;
                $where['em_type'] = $emotion;
                $where['em_id'] = $tdcol;
                $commtsInfo = $Commts->where($where)->find();





                if ($commtsInfo) {

                    $where['ab_type'] = $type;
                    $where['ab_id'] = $tdrow;
                    $where['index'] = $classNum;
                    $where['em_type'] = $emotion;
                    $where['em_id'] = $tdcol;
                    $data['item'] = $item;
                    $result = $Commts->where($where)->save($data);
                    if ($result != false) {
                        echo "chengong";
                    } else {
                        echo "shibai";
                    }
                } else {
                    $data['ab_type'] = $type;
                    $data['ab_id'] = $tdrow;
                    $data['index'] = $classNum;
                    $data['em_type'] = $emotion;
                    $data['em_id'] = $tdcol;
                    $data['item'] = $item;
                    $result = $Commts->add($data);
                    if ($result != false) {
                        echo "chengong";
                    } else {
                        echo "shibai";
                    }
                }
            }
            if ($commtsInfo) {
                if ($psab_type == 1) {
                    $where['ps_type'] = $type;
                    $where['ps_id'] = $tdrow;
                } else if ($psab_type == 2) {
                    $where['ab_type'] = $type;
                    $where['ab_id'] = $tdrow;
                }
                $where['index'] = $classNum;
                $where['em_type'] = $emotion;
                $where['em_id'] = $tdcol;
                $data['item'] = $item;
                $result = $Commts->where($where)->save($data);
                if ($result != false) {
                    echo "chengong";
                } else {
                    echo "shibai";
                }
            } else {
                $data['index'] = $classNum;
                $data['category'] = $emotion;
                $data['type_id'] = $tdrow;
                $data['item'] = $item;
                $result = $Commts->add($data);
                if ($result != false) {
                    echo "chengong";
                } else {
                    echo "shibai";
                }
            }
        }


        //  $Commts = M('Commtemtion');
        //   $where['index'] = $classNum;
        //  $where['category'] = $type;
        //  $commtsInfo = $Commts->where($where)->order('id asc')->select();
        //  $this->ajaxReturn($commtsInfo);
    }

    public function getpyschology() {
        $classNum = $_POST['classNum1'];
        $type = $_POST['type'];
        $emotion = $_POST['emotion'];
        // $classNum = 1;
        $Commts = M('commtpsy');
        // $map['knowledege'] = array('eq',$classNum);
        $where['index'] = $classNum;
        $where['category'] = $type;
        $commtsInfo[0] = $Commts->where($where)->order('type_id asc')->select();

        $Commts = M('commtep');
        $where['index'] = $classNum;
        $where['ps_type'] = $type;
        $where['em_type'] = $emotion;
        //$commtsInfo[1]= $Commts->where($where)->order('id asc')->select();
        $commtsInfo[1] = $Commts->where($where)->order('ps_id,em_id asc')->select();
        $this->ajaxReturn($commtsInfo);
    }

    public function getability() {
        $classNum = $_POST['classNum1'];
        $type = $_POST['type'];
        $emotion = $_POST['emotion'];
        // $classNum = 1;
        $Commts = M('commtability');
        // $map['knowledege'] = array('eq',$classNum);

        $where['index'] = $classNum;
        $where['category'] = $type;
        $commtsInfo[0] = $Commts->where($where)->order('type_id asc')->select();

        $Commts = M('commtea');
        $where['index'] = $classNum;
        $where['ab_type'] = $type;
        $where['em_type'] = $emotion;
        //$commtsInfo[1]= $Commts->where($where)->order('id asc')->select();
        $commtsInfo[1] = $Commts->where($where)->order('ab_id,em_id asc')->select();
        $this->ajaxReturn($commtsInfo);
    }

//测试ajax添加代码的起始位置=======================
    public function login() {
        $this->display();
    }

    public function checkName() {
        $Commts = M('Commts');
        $where['knowledege'] = 1;
        $commtsInfo = $Commts->where($where)->field('knowledege,category,item')->order('id asc')->select();
        // dump($commtsInfo);
        $hahaha = array(1, 1, 1);
        if ($_POST['username'] == 'admin') {
            // $this->success('用户名正确~');
            $this->success($commtsInfo, '用户名正确!', true);
            // $this->success($hahaha,'用户名正确~',true);
        } else {
            $this->error('用户名错误！');
        }
    }

    public function checkLogin() {
        if ($_POST['username'] == 'admin') {
            // $this->ajaxReturn($_POST['username'],'用户名正确~',1);
            // success 方法返回
            // $data = {'data':'aaa'};
            $this->success($_POST['username'], '用户名正确~', true);
            // 加载了 Js/Form/CheckForm.js 类库或提交了 ajax=1 隐藏表单元素
            //$this->success('用户名正确~');
        } else {
            $this->ajaxReturn('', '用户名错误！', 0);
            // error 方法返回
            //$this->error('用户名错误！',true);
            // 加载了 Js/Form/CheckForm.js 类库或提交了 ajax=1 隐藏表单元素
            //$this->error('用户名错误！');
        }
    }

    public function testajax() {
        $this->display();
    }

    public function testajax1() {
        $this->display();
    }

//测试ajax添加代码的终止位置===============================



    public function index1() {
        //$param['subject_id'] = 10;
        //$param['type'] = array(0,1);
        //$param['qtype'] = 3;
        //$param['level'] =1;
        //$data = Service\PaperService::getTeachersData($param);
        //$list=M('user')->cache(true)->where('id<100')->select();
        //header('Location: '.U('Teachers/Prepare/Index'));
        //dump($data);
        $this->display();
        //dump($_SESSION);
    }

    public function index() {
        $this->display();
    }

    public function test1()
    {
        $this->display();

    }
    public function hankTest()
    {
        $data = M('Week_exam')->select();
        dump($data);
//        $this->display();
    }
    public function homework()
    {
        $this->display();
    }
    public function test() {
//        $a = 5;
//        $i = getWeekNum($a);
//        dump($i);
//        $this->show();
        //echo 123;die;
        //$this->display('question');
//        $this->display();
    }

    public function teachPlan() {
        $Capter = M('Capter');
        $capterInfo = $Capter->field('capter_num,capter_name')->order('id asc')->select();
        if ($capterInfo) {
            $this->assign('capter', $capterInfo);
        } else {
            $this->error('数据错误');
        }
        $Class = M('Class');
        $classInfo = $Class->field('id,capter_id,class_flag,class_name,add_flag,task_count,week_num')->order('id asc')->select();
        if ($classInfo) {
            $this->assign('class', $classInfo);
        } else {
            $this->error('数据错误');
        }
        $this->display();
    }

    public function main($cap) {
        $cap = $cap;
        $this->assign('cap', $cap);
        $where['id'] = 0;
        $firsthalf = array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
        $lasthalf = array(12, 13, 14, 15, 16, 17);
        if ($cap == 0) {
            $where['id'] = array('in', $firsthalf);
            $map['capter_id'] = array('lt', 32);
        } else if ($cap == 1) {
            $where['id'] = array('in', $lasthalf);
            $map['capter_id'] = array('gt', 31);
        }

        $Commts = M('Commts');
        $commtsInfo = $Commts->order('id asc')->select();
        // print_r($commtsInfo);
        if ($commtsInfo) {
            $this->assign('commts', $commtsInfo);
        } else {
            $this->error('数据错误');
        }

        $Capter = M('Capter');
        $capterInfo = $Capter->where($where)->field('capter_num,capter_name')->order('id asc')->select();
        if ($capterInfo) {
            $this->assign('capter', $capterInfo);
        } else {
            $this->error('数据错误');
        }
        $Class = M('Class');
        $classInfo = $Class->where($map)->field('id,capter_id,class_flag,class_name,add_flag,task_count,week_num')->order('id asc')->select();
        if ($classInfo) {
            $this->assign('class', $classInfo);
        } else {
            $this->error('数据错误');
        }

        $Knowledge = M('Knowledge');
        $classInfo = $Knowledge->where($map)->field('id,capter_id,class_num,class_name,class_flag,add_flag,task_count,week_num')->order('id asc')->select();
        if ($classInfo) {
            $this->assign('knowledge', $classInfo);
        } else {
            $this->error('数据错误');
        }

        $Category1 = M('Category1');
        $categoryInfo = $Category1->where($where)->field('id,capter_id,newclass_num,activityclass_num,reviewclass_num,examclass_num')->order('id asc')->select();
        if ($categoryInfo) {
            $this->assign('category', $categoryInfo);
        } else {
            $this->error('数据错误');
        }

        $Addclass = M('Addclass');
        $addClassInfo = $Addclass->where($map)->field('capter_id,class_name')->order('id asc')->select();
        if ($addClassInfo) {
            $this->assign('addClass', $addClassInfo);
        } else {
            $this->error('数据错误');
        }

        /*****by hank-yan the function is to set the data of class1 aor class 2*****/
        // the front page need the student's id and his name(when you hover the div, you can see his name)
        // so we need assemble these data
        $dbStudents = M('students');
        $whereOne['classnum'] = '1';
        // get students of class one
        $classOneStudents = $dbStudents->where($whereOne)->order('studentid asc')->select();
        $whereTwo['classnum'] = '2';
        // get students of class two
        $classTwoStudents = $dbStudents->where($whereTwo)->order('studentid asc')->select();
//        dump($classOneStudents);
//        dump($classTwoStudents);

        $this->assign('classOneStudents', $classOneStudents);
        $this->assign('classTwoStudents', $classTwoStudents);

        $this->display();
    }

    public function addClass() {
        $id = $_POST['classNum'];
        $Class = M("Class"); // 实例化Class对象
        $map['id'] = array('gt', $id);
        $Class->where($map)->setInc('id', 1); //课程序号依次加1
        $Class->where($map)->setInc('class_num', 1); //课程序号依次加1
        // $Class->where($map)->setDec('id',1); //课程序号依次减1
        $capter_id = $_POST['capterId'];
        $class_num = $_POST['classNum'];
        $class_name = $_POST['className'];
        $class_flag = $_POST['classFlag'];
        if ($class_flag == 0) {
            $class_name = '新课 ' . $class_name;
        } else if ($class_flag == 1) {
            $class_name = '活动课 ' . $class_name;
        } else if ($class_flag == 2) {
            $class_name = '复习课 ' . $class_name;
        } else if ($class_flag == 3) {
            $class_name = '单元测 ' . $class_name;
        } else if ($class_flag == 4) {
            $class_name = '考试 ' . $class_name;
        } else {
            $class_name = '添加的课程异常！';
        }
        $Class1 = M('Class');
        $data['id'] = $id + 1;
        $data['capter_id'] = $capter_id;
        $data['class_num'] = $class_num + 1;
        $data['class_name'] = $class_name;
        $data['class_flag'] = $class_flag;
        $data['add_flag'] = 1;
        $data['task_count'] = 0;
        $data['week_num'] = getWeekNum($id + 1);
        $result = $Class1->data($data)->add();
        if ($result) {
            $this->success('数据添加成功！');
            // $this->redirect("index/login");
            $mainUrl = 'index.php/Home/Index/main';
            header("Location:\\.\\.\\/$mainUrl"); //跳回主界面
        } else {
            $this->error('数据添加错误！');
        }
    }

    public function removeClass($id) {
        $Class = M("Class"); // 实例化Class对象
        $where['id'] = $id;
        $Class->where($where)->delete();
        $map['id'] = array('gt', $id);
        $Class->where($map)->setDec('id', 1); //课程序号依次减1
        $Class->where($map)->setDec('class_num', 1); //课程序号依次减1
        $where['id'] = $id;
        $Class->where($where)->setDec('class_num', 1);
        $mainUrl = 'index.php/Home/Index/main';
        header("Location:\\.\\.\\/$mainUrl"); //跳回主界面
    }

    public function chgClass($index1, $index2) {
        header("Content-Type:text/html; charset=utf-8");
        $Class = M("Class");
        $index = array($index1, $index2);
        $where['id'] = array('in', $index);
        $chg = $Class->where($where)->select();
        $Class->where($where)->delete();
        // dump($chg);
        $data['id'] = $chg[0]['id']; //指定要操作哪条数据, where id=?
        $data['class_num'] = $chg[0]['class_num'];
        $data['capter_id'] = $chg[1]['capter_id'];
        $data['class_name'] = $chg[1]['class_name'];
        $data['class_flag'] = $chg[1]['class_flag'];
        $data['add_flag'] = $chg[1]['add_flag'];
        $data['task_count'] = $chg[1]['task_count'];
        $data['week_num'] = $chg[0]['week_num'];
        $Class1 = M('Class');
        $result1 = $Class1->data($data)->add();

        $Class2 = M('Class');
        $data1['id'] = $chg[1]['id']; //指定要操作哪条数据, where id=?
        $data1['class_num'] = $chg[1]['class_num'];
        $data1['capter_id'] = $chg[0]['capter_id'];
        $data1['class_name'] = $chg[0]['class_name'];
        $data1['class_flag'] = $chg[0]['class_flag'];
        $data1['add_flag'] = $chg[0]['add_flag'];
        $data1['task_count'] = $chg[0]['task_count'];
        $data1['week_num'] = $chg[1]['week_num'];
        $result2 = $Class2->data($data1)->add();
        if ($result1 && $result2) {
            $this->success('数据更新成功！');
            $mainUrl = 'index.php/Home/Index/main';
            header("Location:\\.\\.\\/$mainUrl"); //跳回主界面
        } else {
            $this->error('数据写入错误！');
        }
    }

    public function chgCapterClass($index1, $index2) {
        // dump('111');
        header("Content-Type:text/html; charset=utf-8");
        $Class = M("Class");
        // $aa = getWeekNum(1);
        $where['capter_id'] = $index1;
        $chgCapter1 = $Class->where($where)->order('id asc')->select();
        $Class->where($where)->delete();
        $where['capter_id'] = $index2;
        $chgCapter2 = $Class->where($where)->order('id asc')->select();
        $Class->where($where)->delete();

        for ($i = $chgCapter1[0]['id']; $i < $chgCapter1[0]['id'] + count($chgCapter2); $i++) {
            $newId = $i - $chgCapter1[0]['id'];
            $data['id'] = $i;
            $data['class_num'] = $i;
            $data['capter_id'] = $index1;
            $data['class_name'] = $chgCapter2[$newId]['class_name'];
            $data['class_flag'] = $chgCapter2[$newId]['class_flag'];
            $data['add_flag'] = $chgCapter2[$newId]['add_flag'];
            $data['task_count'] = $chgCapter2[$newId]['task_count'];
            $data['week_num'] = getWeekNum($i);
            // $data['week_num'] = $chgCapter2[$newId]['week_num'];
            $Class = M('Class');
            $Class->data($data)->add();
        }
        for ($i = $chgCapter1[0]['id'] + count($chgCapter2); $i < $chgCapter1[0]['id'] + count($chgCapter2) + count($chgCapter1); $i++) {
            $newId = $i - $chgCapter1[0]['id'] - count($chgCapter2);
            $data['id'] = $i;
            $data['class_num'] = $i;
            $data['capter_id'] = $index2;
            $data['class_name'] = $chgCapter1[$newId]['class_name'];
            $data['class_flag'] = $chgCapter1[$newId]['class_flag'];
            $data['add_flag'] = $chgCapter1[$newId]['add_flag'];
            $data['task_count'] = $chgCapter1[$newId]['task_count'];
            $data['week_num'] = getWeekNum($i);
            // $data['week_num'] = $chgCapter1[$newId]['week_num'];
            $Class = M('Class');
            $Class->data($data)->add();
        }
        $goonUrl = 'index.php/Home/Index/chgCapter/index1/' . $index1 . '/index2/' . $index2;
        header("Location:\\.\\.\\/$goonUrl"); //继续修改
    }

    public function chgCapter($index1, $index2) {
        header("Content-Type:text/html; charset=utf-8");
        $Capter = M('Capter');
        $index = array($index1, $index2);
        $where['capter_num'] = array('in', $index);
        $chg = $Capter->where($where)->select();
        $Capter->where($where)->delete();
        $data['id'] = $chg[0]['id']; //指定要操作哪条数据, where id=?
        $data['capter_num'] = $chg[0]['capter_num'];
        $data['capter_name'] = $chg[1]['capter_name'];
        $result1 = $Capter->data($data)->add();

        $Capter1 = M('Capter');
        $data1['id'] = $chg[1]['id']; //指定要操作哪条数据, where id=?
        $data1['capter_num'] = $chg[1]['capter_num'];
        $data1['capter_name'] = $chg[0]['capter_name'];
        $result2 = $Capter->data($data1)->add();

        // $mainUrl = 'index.php/Home/Index/main';
        // header("Location:\\.\\.\\/$mainUrl");//跳回主界面  保持原状，不让其跳回主页面
    }

    /*******************************************by hank-yan*************************************************/
//    public function getClass()
//    {
//        $dbStudents = M('students');
//        $whereOne['classnum'] = '1';
//        // get students of class one
//        $classOneStudents = $dbStudents->where($whereOne)->order('studentid asc')->select();
//        $whereTwo['classnum'] = '2';
//        // get students of class two
//        $classTwoStudents = $dbStudents->where($whereTwo)->order('studentid asc')->select();
//        $this->assign('classOneStudents', $classOneStudents);
//        $this->assign('classTwoStudents', $classTwoStudents);
//        $this->display();
//    }

/*******************************************by hank-yan******************************************************/
    /**
     * 类型： 页面
     * 功能：展示某位同学，在某章的具体作业信息
     */
    public function hwdetails()
    {
        $sid = I('sid');
        $capterId = I('capterid');
        $homework = $this->hwImages->getHwDetails($sid, $capterId);
        // 获取学生基本信息
        $studentInfo = M('students')->where("studentid = $sid")->find();
        $capterInfo = M('capter')->where("capter_num = $capterId")->find();

//        dump($studentInfo);
//        dump($capterInfo);
//        dump($homework);
        // 学生信息
        $this->assign('studentInfo', $studentInfo);
        // 章节信息
        $this->assign('capterInfo', $capterInfo);
        // 作业信息
        $this->assign('homework', $homework);

        $this->display();
    }

    /**
     * 类型： 接口
     * 功能： 将上传的作业信息保存到数据库中的操作
     */
    public function saveToDb()
    {
        $this->hwImages->dealHomeWork('save');
    }

    /**
     * 类型： 接口
     * 功能： 将上传的文件从数据库中删除
     */
    public function deleteFromDb()
    {
        $this->hwImages->dealHomeWork('delete');
    }

    public function upload()
    {
        $upload = new \Think\Upload();// 实例化上传类
        $upload->maxSize = 3145728;// 设置附件上传大小
        $upload->exts = array('jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型
        $upload->rootPath = './Public/Uploads/'; // 设置附件上传根目录
        $upload->saveName = '';
        $upload->autoSub = false;// 默认是开启的，先设置成false
        // 上传单个文件（v1 先使用单文件上传的方式来，实际上多文件上传在这里是没有意义的）
        $info = $upload->uploadOne($_FILES['uploadfile']);

        // 可以使用数据库来操作 $info 中的信息
        if (!$info) {
            // 上传错误提示错误信息
            echo $upload->getError();
            die();
        } else {
            // 上传成功 获取上传文件信息
            // echo $info['savepath'] . $info['savename'];
            echo '上传成功';
        }
    }
}

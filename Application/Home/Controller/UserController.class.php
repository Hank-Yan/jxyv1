<?php
namespace Home\Controller;
use Think\Controller;
class UserController extends Controller{
	public function insert(){
		$User = D('User');
		if($User->create()) {
			$result = $User->add();
			if($result) {
				$this->success('数据添加成功！');
			}else{
				$this->error('数据添加错误！');
			}
		}else{
			$this->error($User->getError());
		}
	}
}
<?php
namespace Home\Controller;
use Think\Controller;
class FormController extends Controller{
	public function insert(){
		$Form = D('Form');
		if($Form->create()) {
			$result = $Form->add();
			if($result) {
				$this->success('数据添加成功！');
			}else{
				$this->error('数据添加错误！');
			}
		}else{
			$this->error($Form->getError());
		}

		// $Form = D('Form');
		// $data['title'] = 'ThinkPHP';
		// $data['content'] = '表单内容';
		// $Form->add($data);

		// $Form = D('Form');
		// $Form->title = 'ThinkPHP';
		// $Form->content = '表单内容';
		// $Form->add();

		// $User = D('User');
		// $User->score = 99;
		// $User->name = '李四';
		// $User->nage = 17;
		// $User->add();
	}

	public function read($id){
		$Form = M('Form');
		//读取数据
		$data = $Form->find($id);
		if($data) {
			$this->assign('data',$data);// 模板变量赋值
		}else{
			$this->error('数据错误');
		}
		$this->display();
	}
	public function readID(){
		$User = M("User");
		//获取标题
		$name = $User->where('id=1')->getField('name');
		$this->assign('name',$name);// 模板变量赋值
		$this->display();
	}

	public function edit($id=1){
		// $Form = M('Form');
		// $this->assign('vo',$Form->find($id));
		// $this->display();
		$User = M('User');
		$this->assign('vo',$User->find($id));
		$this->display();
	}
	public function update(){
		$User = D('User');
		if($User->create()) {
			$result = $User->save();
			if($result) {
				$this->success('操作成功！');
			}else{
				$this->error('写入错误！');
			}
		}else{
			$this->error($User->getError());
		}

		// $Form = D('Form');
		// if($Form->create()) {
		// 	$result = $Form->save();
		// 	if($result) {
		// 		$this->success('操作成功！');
		// 	}else{
		// 		$this->error('写入错误！');
		// 	}
		// }else{
		// 	$this->error($Form->getError());
		// }

		// $Form = M("Form");
		// //要修改的数据对象属性赋值
		// $data['id'] = 5;
		// $data['title'] = 'ThinkPHP';
		// $data['content'] = 'ThinkPHP3.2.3版本发布';
		// $Form->save($data); // 根据条件保存修改的数据

		// $Form = M("Form");
		// //要修改的数据对象属性赋值
		// $data['title'] = 'ThinkPHP';
		// $data['content'] = 'ThinkPHP3.2.3版本发布';
		// $Form->where('id=6')->save($data); // 根据条件保存修改的数据

		// $Form = M("Form");
		// //更改title值
		// $Form->where('id=5')->setField('title','ThinkHello');
	}

	public function delete(){
		// $Form = M('Form');
		// $Form->delete(9);

		// $User = M("User"); // 实例化User对象
		// $User->where('id=8')->delete(); // 删除id为5的用户数据

		// $User = M("User"); // 实例化User对象
		// $User->delete('3,2,5'); // 删除主键为1,2和5的用户数据
		$User->where('name' == '??')->delete(); // 删除所有状态为0的用户数据
	}
}
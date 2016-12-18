<?php
namespace Home\Controller;
use Think\Controller;
class NewsController extends Controller{
	public function insert(){

		header("content-type:text/html;charset=utf-8");
		$upload = new \Think\Upload(); // 实例化上传类
	    $upload->maxSize  	= 1024*1024;// 设置附件上传大小 (-1) 是不限值大小
	    $upload->allowExts  = array(
	    	'jpg', 'gif', 'png', 'jpeg'
	    );// 设置附件上传类型
	    $upload->savePath   = 'Public/thumb/';// 设置附件上传目录
        $upload->replace = true; //存在同名文件是否是覆盖
    	// 是否使用子目录保存上传文件
        $upload->autoSub = true;
		$info = $upload->upload();
		$newsCategory = $_POST['flag'];
		$title = $_POST['title'];
		$create_time = $_POST['create_time'];
		$content = $_POST['content'];
		if ($newsCategory == '最新公告') {
			$flag = 0;
		}else if ($newsCategory == '行业新闻') {
			$flag = 1;
		}else{
			$flag = 2;
		}
		if ($info) {
			foreach ($info as $v){
				$img_name  ="./Uploads/".$v['savepath'].$v['savename'];
			}
		}
		$News = D('News');
		$News->flag = $flag;
		$News->title = $title;
		$News->content = $content;
		$News->create_time = $create_time;
		$News->img_name = $img_name;
		//$News->add();
		$result = $News->add();
		if ($result) {
			$this->success('数据添加成功!');
		}else{
			$this->error('数据添加错误！');
		}

        if(!$info) {// 上传错误提示错误信息
	    	$this->error($upload->getError());
	    }else{// 上传成功 获取上传文件信息
		    // 保存表单数据 包括附件数据
		    $up = M("Photo"); // 实例化upload对象
		    foreach ($info as $v){
	  	 	 	//缩略图 文件保存地址
	  	 	 	$timage  ="./Uploads/".$v['savepath'].$v['savename'];
	  	 	 	//上传数据库
		  		$arr['image'] = $v['savepath'].$v['savename'];//保存图片路径
		  		$arr['create_time']  = NOW_TIME;//创建时间
			    if(!$up->create($arr)){ // 创建数据对象
			   		$this->error($up->getError());
			   		exit();
			    }
			    if($up->add() === false){ // 写入用户数据到数据库
			   		$this->error('数据保存失败');
			   		exit();
			    }
		    }
	   		// $this->success("数据保存成功","../",5);
	   		$this->success("数据保存成功");
	    }

	}

	public function newsDetail($id){
		$News = M('News');
		//读取数据
		$data = $News->find($id);
		if($data) {
			$this->assign('data',$data);// 模板变量赋值
		}else{
			$this->error('数据错误');
		}
		$this->display();
	}

	public function newsList($flag){
		$News = M('News');
		//读取数据
		$where['flag'] = $flag;
		$data = $News->field('id,flag,title,create_time,content')->where($where)->select();
		//dump($data);
		if($data) {
			$this->assign('data',$data);// 模板变量赋值
		}else{
			$this->error('数据错误');
		}
		$this->display();
	}

	public function delete($id,$flag){
		$News = M("News"); // 实例化User对象
		$where['id'] = $id;
		// $new = $News->where($where)->select();
		// $flag = $new['flag'];
		$flag = $flag;
		$News->where($where)->delete();
		$newsListUrl = 'index.php/Home/News/newsList/flag/'.$flag;
		header("Location:\\.\\.\\/$newsListUrl");//跳回新闻列表
		// $Location = "Home/News/newsList/flag/".$flag;
		// echo "<script> window.location.href='$Location';</script>";
		// $this->redirect($newsListUrl.$flag);
	}

	public function editNews($id){
		$News = M('News');
		$this->assign('vo',$News->find($id));
		$this->display();
	}
	public function update($flag){
		// $News = D('News');
		// $flag = $flag;
		// if($News->create()) {
		// 	$result = $News->save();
		// 	dump($result);
		// 	if($result) {
		// 		$this->success('更新成功！');
		// 		$newsListUrl = 'index.php/Home/News/newsList/flag/'.$flag;
		// 		header("Location:\\.\\.\\/$newsListUrl");//跳回新闻列表
		// 		// $this->redirect('Home/News/newsList/flag/'.$flag);
		// 	}else{
		// 		$this->error('写入错误！');
		// 	}
		// }else{
		// 	$this->error($News->getError());
		// }
		$id = $_POST['id'];
		$title = $_POST['title'];
		$create_time = $_POST['create_time'];
		$content = $_POST['content'];
		$flag = $flag;
		header("content-type:text/html;charset=utf-8");
		$upload = new \Think\Upload(); // 实例化上传类
	    $upload->maxSize  	= 1024*1024 ;// 设置附件上传大小 (-1) 是不限值大小
	    $upload->allowExts  = array(
	    	'jpg', 'gif', 'png', 'jpeg'
	    );// 设置附件上传类型
	    $upload->savePath   = 'Public/thumb/';// 设置附件上传目录
        $upload->replace = true; //存在同名文件是否是覆盖
    	// 是否使用子目录保存上传文件
        $upload->autoSub = true;
        dump($upload);
        $info = $upload->upload();
		if ($info) {
			foreach ($info as $v){
				$img_name  ="./Uploads/".$v['savepath'].$v['savename'];
			}
		}
		dump($id.'===='.$title.'===='.$create_time.'===='.$content.'===='.$flag.'===='.$img_name);
		if(!$info) {// 上传错误提示错误信息
	    	$this->error($upload->getError());
	    }else{// 上传成功 获取上传文件信息
	  	 	
		    // 保存表单数据 包括附件数据
		    $up = M("Photo"); // 实例化upload对象
		    foreach ($info as $v){
	  	 	 	//缩略图 文件保存地址
	  	 	 	$timage  ="./Uploads/".$v['savepath'].$v['savename'];
	  	 	 	//上传数据库
		  		$arr['image'] = $v['savepath'].$v['savename'];//保存图片路径
		  		$arr['create_time']  = NOW_TIME;//创建时间
			    if(!$up->create($arr)){ // 创建数据对象
			   		$this->error($up->getError());
			   		exit();
			    }
			    if($up->add() === false){ // 写入用户数据到数据库
			   		$this->error('数据保存失败');
			   		exit();
			    }
		    }
	   		$this->success('数据保存成功');
	    }

		$where['id'] = $id;
		$News1 = M('News');
		$News1->where($where)->delete(); 
		$News = D('News');
		$News->id = $id;
		$News->flag = $flag;
		$News->title = $title;
		$News->content = $content;
		$News->create_time = $create_time;
		$News->img_name = $img_name;
		//$News->add();
		$result = $News->add();
		if ($result) {
			$this->success('更新成功！');
				$newsListUrl = 'index.php/Home/News/newsList/flag/'.$flag;
				header("Location:\\.\\.\\/$newsListUrl");//跳回新闻列表
		}else{
			$this->error('数据更新错误！');
		}

	}

	public function test(){
		$a = "sss";
		$this->assign("a",$a);
		$this->display();	
	}
}
<?php
namespace Home\Model;
use Think\Model;
	class UserModel extends Model {
	//定义自动验证
	protected $_validate = array(
		array('name','require','名字必须'),
		array('telephone','require','电话必须'),
		array('username','require','用户名必须'),
		array('password','require','密码必须'),
		// array('repassword','password','两次输入密码不一致！',0,’confirm’),
	);
	//定义自动完成
	protected $_auto = array(
		// array('create_time','time',1,'function'),
	);
}
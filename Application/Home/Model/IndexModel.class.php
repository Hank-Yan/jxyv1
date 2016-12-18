<?php
namespace Home\Model;
use Think\Model;
	class IndexModel extends Model {
	//定义自动验证
	protected $_validate = array(
		array('username','require','用户名必须'),
		array('password','require','密码必须'),
	);
}
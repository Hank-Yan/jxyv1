<?php
namespace Home\Model;
use Think\Model;
class NewsModel extends Model {
	//定义自动验证
	protected $_validate = array(
		array('title','require','标题必须'),
		array('create_time','require','时间必须'),
		array('content','require','内容必须'),
	);
}
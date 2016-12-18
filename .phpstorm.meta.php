<?php
	namespace PHPSTORM_META {
	/** @noinspection PhpUnusedLocalVariableInspection */
	/** @noinspection PhpIllegalArrayKeyTypeInspection */
	$STATIC_METHOD_TYPES = [

		\D('') => [
			'News' instanceof Home\Model\NewsModel,
			'Hwimages' instanceof Home\Model\HwimagesModel,
			'Adv' instanceof Think\Model\AdvModel,
			'Mongo' instanceof Think\Model\MongoModel,
			'View' instanceof Think\Model\ViewModel,
			'Relation' instanceof Think\Model\RelationModel,
			'Form' instanceof Home\Model\FormModel,
			'Index' instanceof Home\Model\IndexModel,
			'User' instanceof Home\Model\UserModel,
			'Merge' instanceof Think\Model\MergeModel,
		],
	];
}
<?php
/**
 * Created by PhpStorm.
 * User: Hank_Yan
 * Date: 2016/12/16
 * Time: 13:53
 */
namespace Home\Model;

use Think\Model;

class HwimagesModel extends Model
{
    // 作业存放的位置
    protected $uploadPath = './Public/Uploads/';

    /**
     * @param $operate  操作名称 可以为save 或者 delete
     */
    public function dealHomeWork($operate)
    {
        if ($od = opendir($this->uploadPath)) {
            if ('delete' === $operate) {
                // 删除数据库中的图片记录，删除图片实体在后面循环中
                $this->deleteImages();
            }

            while (false !== ($file = readdir($od))) {
                // 过滤当前目录和上一目录的句柄
                if ($file !== '.' && $file !== '..') {
                    if ('save' === $operate) {
                        $this->saveImages($file);
                    } else if ('delete' === $operate) {
                        @unlink($this->uploadPath . $file);// 删除图片实体
                    }
                }
            }
        }
    }

    /**
     * @desc 保存上传的图片信息到数据库
     * @param $file  上传的图片信息
     */
    public function saveImages($file)
    {
        // 处理文件名称信息
        $strFilePath = __ROOT__ . '/Public/Uploads/' . $file;
        $strFileName = explode('.', $file)[0];
        $arrFileName = explode('-', $strFileName);
        $strSid = $arrFileName[0];
        $strCapterId = $arrFileName[count($arrFileName) - 1];

        // 存到数据库里面
        $data['serialNum'] = $strFileName;
        $data['path'] = $strFilePath;
        $data['name'] = $strFileName;
        $data['sid'] = intval($strSid);
        $data['capterid'] = intval($strCapterId);

        // 冗余检测
        $where['serialNum'] = $strFileName;
        $result = $this->where($where)->select();

        if (count($result) === 0) {
            // 只有不存在才添加到数据库里面
            $this->add($data);
        }
    }

    /**
     * 从数据库删除上传的图片信息
     */
    public function deleteImages()
    {
        // 删除数据库所有数据（之后完善每次存放作业方式后会改善这里的代码）
        $this->where('1')->delete();
    }

    /**
     * @param $sid 学生学号
     * @param $capterId 章节号
     */
    public function getHwDetails($sid, $capterId)
    {
        $where['sid'] = $sid;
        $where['capterid'] = $capterId;
        return $this->where($where)->select();
    }
}
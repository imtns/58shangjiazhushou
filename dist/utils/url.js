'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var LOAD_RESOURCE_URL = exports.LOAD_RESOURCE_URL = '/businessResource/getlist'; // 获取素材列表
var DELETE_RESOURCE = exports.DELETE_RESOURCE = '/businessResource/delete/'; // 删除素材
var SAVE_RESOURCE_URL = exports.SAVE_RESOURCE_URL = '/businessResource/insert'; // 新增素材
var DELETE_ARTICLE_GROUP = exports.DELETE_ARTICLE_GROUP = '/businessArticle/delgroup/0'; // 删除文章分组

var LOAD_COUPON = exports.LOAD_COUPON = '/businessCoupon/get/'; // 获取单个优惠券信息
var SAVE_COUPON = exports.SAVE_COUPON = '/businessCoupon/save'; // 保存优惠券
var LOAD_COUPON_LIST = exports.LOAD_COUPON_LIST = '/businessCoupon/queryPageForBack'; // 获取优惠券列表
var DELETE_COUPON = exports.DELETE_COUPON = '/businessCoupon/delete/'; // 删除单个优惠券

var LOAD_SERVICE_GROUPS = exports.LOAD_SERVICE_GROUPS = '/businessService/groups'; // 获取预约组件分组
var LOAD_SERVICE_LIST = exports.LOAD_SERVICE_LIST = '/businessService/listByPageForUser'; // 获取服务组件
var LOAD_SERVICE = exports.LOAD_SERVICE = '/businessService/get/'; // 获取预约服务组件内容
var INSERT_SERVICE = exports.INSERT_SERVICE = '/businessService/insert'; // 新增
var SAVE_SERVICE = exports.SAVE_SERVICE = '/businessService/update'; // 更新
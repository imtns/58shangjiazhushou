export const LOAD_RESOURCE_URL = '/businessResource/getlist'; // 获取素材列表
export const DELETE_RESOURCE = '/businessResource/delete/'; // 删除素材
export const SAVE_RESOURCE_URL = '/businessResource/insert'; // 新增素材
export const DELETE_ARTICLE_GROUP = '/businessArticle/delgroup/0'; // 删除文章分组

export const LOAD_COUPON = '/businessCoupon/get/'; // 获取单个优惠券信息
export const SAVE_COUPON = '/businessCoupon/save'; // 保存优惠券
export const LOAD_COUPON_LIST = '/businessCoupon/queryPageForBack'; // 获取优惠券列表
export const DELETE_COUPON = '/businessCoupon/delete/'; // 删除单个优惠券

export const LOAD_SERVICE_GROUPS = '/businessService/groups'; // 获取预约组件分组
export const LOAD_SERVICE_LIST = '/businessService/listByPageForUser'; // 获取服务组件
export const LOAD_SERVICE = '/businessService/get/'; // 获取预约服务组件内容
export const INSERT_SERVICE = '/businessService/insert'; // 新增
export const SAVE_SERVICE = '/businessService/update'; // 更新

// 商品相关
export const LOAD_GOODS_GROUPS = '/goods/groups/specail';
export const LOAD_GOODS_LIST = '/goods/list';
export const DELETE_GOODS = '/goods/del';
export const GOODS_ON_SHOW = '/goods/onshow';
export const GOODS_UNDER = '/goods/under'; // 下架商品

// 订单
export const LOAD_ORDER_DETAIL = '/consumerAppointment/get/'; // 订单详情
export const ACCEPT_ORDER = '/consumerAppointment/accept/'; // 接单
export const DELIVER_ORDER = '/consumerAppointment/deliverOrder/'; // 配送
export const REFUSE_ORDER = '/consumerAppointment/arriveOrder/'; // 拒绝接单
export const WHETHER_ACCEPT_REFUND = '/consumerAppointment/optRefund/'; // 是否统一退款，action: agree, action: refuse
export const ARRIVE_ORDER = '/consumerAppointment/arriveOrder/'; // 订单送达

// 营业信息设置
export const SAVE_BUSINESS_SETTING = '/businessSetting/save';
export const LOAD_BUSINESS_SETTING = '/businessSetting/getByMpId/';

// 聊天对应的接口
export const CHAT_LOGIN = '/chat/login'; // 聊天登录接口
export const MSG_LIST = '/chat/msgList'; // 聊天记录
export const SEND_MSG = '/chat/msgSend'; // 发送消息
export const MY_MPLIST = '/mplogic/mymplist'; // 小程序列表
export const SESSION = '/wechat/bizAssistAuth/session'; // 获取SESSION数据
export const INSERT_SESSION = '/wechat/bizAssistAuth/insert'; // 插入SESSION数据
export const GET_EXT_JSON = '/mpBusinessRelease/getExtJson'; // 获取ExtJson
export const GET_ASSIST_AUTH = '/wechat/bizAssistAuth/get'; // 获取关注公众号信息

// 访客记录接口
export const CONSUMER_RECORDS = '/mpCardBusiness/consumerRecords';
// 底部消息tab，获取contact列表
export const CHAT_CONTACT_LIST = '/chat/contactList';

// 我的名片页面——是否有名片
export const CARD_HAS_CARD = '/mpCardBusiness/toMyCard';
export const CARD_HAS_DETAIL = '/mpCardBusiness/myCard';
export const CARD_FIRST_EDIT = '/mpCardBusiness/editCard';

// 新建名片
export const CARD_CREATE_NEW_CARD = '/mpCardBusiness/saveCard';

export const CONSUMER_INFO = '/mpCardBusiness/consumerInfo'; // 访客信息

export const GET_GROUP_MSG_LIST = '/mplogic//mplogic/getgroupmsglist'; // 订单消息列表
export const READ_GROUND_MSG = '/mplogic/readgroupmsg'; // 消息设置已读
export const CONSUMERS = '/mpCardBusiness/consumers'; // 通知消息列表
export const PUSN_SET_UP = '/mpCardBusiness/pushSetup'; // 提醒设置
export const TO_PUSN_SET_UP = '/mpCardBusiness/toPushSetup'; // 获取当前提醒设置

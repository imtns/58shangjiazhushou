"use strict";var _ajax=require("./../../../utils/ajax.js"),_index=require("./../../../utils/index.js");module.exports={sendLog:function(){},receiveCoupon:function(e){this.sendLog();var o=e.currentTarget.dataset.couponid;(0,_ajax.post)("/businessCoupon/consumerGetCoupon",{couponId:o},function(e){if(e)return void(0,_index.toast)(e);wx.showModal({showCancel:!1,title:"",content:"优惠券领取成功"})},!0)}};
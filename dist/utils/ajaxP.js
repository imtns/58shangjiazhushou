"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var _wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_index=require("./index.js"),test="test",host="https://yaofa.58.com",http=function(e){for(var t=arguments.length,o=Array(t>1?t-1:0),n=1;n<t;n++)o[n-1]=arguments[n];var a=o[0],r=o[1],i=o[2],u=void 0===i||i,s=Object.assign({},r),d=_wepy2.default.getStorageSync("ppu");return console.log("请求接口",a),console.log("请求参数",r),u&&_wepy2.default.showLoading&&_wepy2.default.showLoading({title:"加载中",mask:!0}),new Promise(function(t){_wepy2.default.request({url:host+a+(~a.indexOf("?")?"":"?")+(+new Date).toString(36).substr(3),data:s,method:e,dataType:"json",header:{"content-type":"GET"===e?"application/json":"application/x-www-form-urlencoded;charset=utf-8",PPU:d||"wanghongyue",reqfrom:"biz_assistant"}}).then(function(e){console.log("response",e),u&&_wepy2.default.hideLoading&&_wepy2.default.hideLoading();var o=e.data,n=o.state,a=o.msg,r=o.data;100===n?t([null,r]):-10001===n?((0,_index.toast)(a),setTimeout(function(){_wepy2.default.reLaunch({url:"../pages/intro"})},1e3)):t([a])}).catch(function(e){u&&_wepy2.default.hideLoading&&_wepy2.default.hideLoading(),t([e.errMsg])})})};module.exports.get=function(){for(var e=arguments.length,t=Array(e),o=0;o<e;o++)t[o]=arguments[o];return http.apply(void 0,["GET"].concat(t))},module.exports.post=function(){for(var e=arguments.length,t=Array(e),o=0;o<e;o++)t[o]=arguments[o];return http.apply(void 0,["POST"].concat(t))};
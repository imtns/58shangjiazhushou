"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,a,o){return a&&e(t.prototype,a),o&&e(t,o),t}}(),_wepy=require("./npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy);require("./npm/wepy-async-function/index.js");var _scene=require("./utils/scene.js"),_scene2=_interopRequireDefault(_scene),CALLBACKAPPS={wx2a9c6eeb1c44a284:"Login",wx67b75e86c9daef45:"OpenPay",wxee214e01d07c9db0:"ToMymp"},_class=function(e){function t(){_classCallCheck(this,t);var e=_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.config={pages:["pages/home","pages/templateList","pages/index/index","pages/edit/coupon","pages/edit/consumer","pages/edit/text","pages/edit/order","pages/edit/imageSwiper","pages/edit/video","pages/edit/title","pages/edit/article","pages/edit/images","pages/contact/contact","pages/news/news","pages/product/product","pages/article/article","pages/intro","pages/myMp","pages/AppInfo","pages/UploadInfo","pages/resourceManage","pages/send","pages/progress","pages/AppEdit","pages/buy","pages/index","pages/noticeList","pages/registed","pages/registMainAccount","pages/registManage","pages/registSuccess","pages/feedback","pages/feedbackDetail","pages/PopQuestions","pages/UploadArticle","pages/UploadInfoSuccess","pages/VideoPlay","pages/orderNoticeList","pages/accountNoticeList","pages/OrderList","pages/OrderDetail","pages/articleComponentCreate","pages/articleComponentAdd","pages/articleComponentlist","pages/articleComponentDetail","pages/articleChoseGroup","pages/orderComponentDetail","pages/paymentRecord","pages/payChoseTime","pages/orderComponentlist","pages/orderComponentGroup","pages/couponManage","pages/couponEdit","pages/couponType","pages/couponValidTime","pages/couponService","pages/couponPreview","pages/orderComponentEdit","pages/OpenPay","pages/CateSelector","pages/multiSelector","pages/followPublic","pages/purchase"],window:{backgroundTextStyle:"light",navigationBarBackgroundColor:"#fff",navigationBarTitleText:"WeChat",navigationBarTextStyle:"black"}},e.use("promisify"),e}return _inherits(t,e),_createClass(t,[{key:"onLaunch",value:function(){console.log("onlaunch")}},{key:"onShow",value:function(e){var t=e.scene,a=e.referrerInfo,o=void 0===a?{}:a,n=e.path,r=o.appId,s=r;console.log("referrerInfo",o);var p=1038===t||"1038"===t?CALLBACKAPPS[s]:"";p=1037===t||"1037"===t?CALLBACKAPPS[s]:p,1038===t&&"pages/intro"===n&&"wx2a9c6eeb1c44a284"===s&&(p="Login"),p&&_scene2.default["Do"+p].call(this,o.extraData)}}]),t}(_wepy2.default.app);App(require("./npm/wepy/lib/wepy.js").default.$createApp(_class,{noPromiseAPI:["createSelectorQuery"]}));
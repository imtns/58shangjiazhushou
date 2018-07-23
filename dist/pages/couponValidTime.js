"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_globalService=require("./../utils/globalService.js"),_globalService2=_interopRequireDefault(_globalService),_utils=require("./../utils/index.js"),_coupon=require("./../mixin/coupon.js"),_coupon2=_interopRequireDefault(_coupon),Index=function(e){function t(){var e,a,i,r;_classCallCheck(this,t);for(var n=arguments.length,o=Array(n),l=0;l<n;l++)o[l]=arguments[l];return a=i=_possibleConstructorReturn(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(o))),i.config={navigationBarTitleText:"生效时间"},i.mixins=[_coupon2.default],i.data={validType:1,validDays:null,validAfterDays:null,validStarttime:"",validEndtime:"",formatValidEndtime:"",formatValidStarttime:""},i.methods={dataAction:function(e,t){var a=t;a="validType"===e?+a:a&&a.detail&&a.detail.value;var i=this.validator(e,a);if(!i.result)return void(0,_utils.alert)(i.msg);this[e]=a,this.updateData()}},i.computed={formatValidStarttime:function(){return this.formatTime(this.validStarttime||"")},formatValidEndtime:function(){return this.formatTime(this.validEndtime||"")}},r=a,_possibleConstructorReturn(i,r)}return _inherits(t,e),_createClass(t,[{key:"onLoad",value:function(){var e=_globalService2.default.get("couponManage");Object.assign(this,e),this.updateData()}},{key:"validator",value:function(e,t){var a=t,i=Object.assign({},this);i[e]=a;var r=i.validStarttime,n=i.validEndtime;return r&&n&&r>n?{result:!1,msg:"优惠结束时间不能小于开始时间！"}:{result:!0,msg:"ok"}}},{key:"updateData",value:function(){var e=_globalService2.default.get("couponManage");_globalService2.default.set("couponManage",Object.assign(e,{validType:this.validType,validDays:this.validDays,validAfterDays:this.validAfterDays,validStarttime:this.validStarttime,validEndtime:this.validEndtime}))}}]),t}(_wepy2.default.page);Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(Index,"pages/couponValidTime"));
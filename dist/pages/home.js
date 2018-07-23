"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _asyncToGenerator(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,s){function n(a,i){try{var r=t[a](i),o=r.value}catch(e){return void s(e)}if(!r.done)return Promise.resolve(o).then(function(e){n("next",e)},function(e){n("throw",e)});e(o)}return n("next")})}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var s=0;s<t.length;s++){var n=t[s];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,s,n){return s&&e(t.prototype,s),n&&e(t,n),t}}(),_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_utils=require("./../utils/index.js"),_ajax=require("./../utils/ajax.js"),app=require("./../utils/globalData.js"),Home=function(e){function t(){var e,s,n,a;_classCallCheck(this,t);for(var i=arguments.length,r=Array(i),o=0;o<i;o++)r[o]=arguments[o];return s=n=_possibleConstructorReturn(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(r))),n.config={navigationBarTitleText:"首页",disableScroll:!0},n.data={business:{mps:[],name:"您的姓名",miniProgramName:"您还没购买小程序",unread:0,mpCount:0,progressText:"您还没有购买小程序",nexttask:0,changeMP:!1,canConfirm:!1,selected:{id:0},chosedId:0},items:[{iconPath:"https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-my-mp.png",text:"我的小程序"},{iconPath:"https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-order-manage.png",text:"订单管理"},{iconPath:"https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-payment-record.png",text:"收款记录"},{iconPath:"https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-payment.png",text:"支付开通"}],nItems:[{title:"店铺运营",items:[{iconPath:"https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-store-fit.png",text:"店铺装修"},{iconPath:"https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-order-service.png",text:"发布服务"},{iconPath:"https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-coupon.png",text:"优惠劵"},{iconPath:"https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-resorce-manage.png",text:"素材管理"}]},{title:"开店必做",items:[{iconPath:"https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-buy-mp.png",text:"购买小程序"},{iconPath:"https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-regist-mp.png",text:"注册小程序"},{iconPath:"https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-mp-progress.png",text:"进度查询"},{iconPath:"https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-feedback-mp.png",text:"意见反馈"}]}]},n.methods={link:function(e){console.log(e),"意见反馈"===e?_wepy2.default.navigateTo({url:"feedback"}):"购买小程序"===e?_wepy2.default.navigateTo({url:"purchase"}):this.checkBeforeJump(e)},checkProgress:function(){if(!this.business.mpCount)return void(0,_utils.alert)("您还未购买小程序，请登录e.58.com进行购买","提示");switch(this.business.nexttask){case 2:_wepy2.default.navigateTo({url:"AppEdit"});break;case 3:_wepy2.default.navigateTo({url:"UploadInfo"});break;case 4:2===this.business.selected.app_type?(_wepy2.default.setStorageSync("registMappid",this.business.selected.id),_wepy2.default.navigateTo({url:"registMainAccount"})):_wepy2.default.navigateTo({url:"progress"});break;case 5:1===this.business.selected.app_type?_wepy2.default.navigateTo({url:"progress"}):_wepy2.default.navigateTo({url:"myMp"});break;case 6:case 7:case 8:case 9:_wepy2.default.navigateTo({url:"progress"})}this.$apply()},changeAction:function(){function e(){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(){var t,s,n,a,i,r=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.business=Object.assign({},this.business,{changeMP:!0}),e.next=3,(0,_ajax.post)("/mplogic/mymplist");case 3:t=e.sent,s=t.data,n=s.mpinfos,this.business=Object.assign({},this.business,{mps:n}),this.business.mps.length>0&&(a=this.business.mps.filter(function(e){return e.id!==r.business.selected.id}),i=a.map(function(e){return r.formatedMp(e)}),this.business=Object.assign({},this.business,{mps:i,chosedId:0,canConfirm:!1})),this.$apply(),console.log("this.business.mps",this.business.mps);case 10:case"end":return e.stop()}},e,this)}));return e}(),bindHideMask:function(){this.business=Object.assign({},this.business,{changeMP:!1,canConfirm:!1}),this.$apply()},selectMp:function(e){this.business=Object.assign({},this.business,{chosedId:e.id,canConfirm:!0}),console.log("点击",this.business),this.$apply()},confirmAction:function(){this.business.selected.id&&(this.setGlobalMpId(this.business.chosedId),this.loadData(),this.hideMask())}},a=s,_possibleConstructorReturn(n,a)}return _inherits(t,e),_createClass(t,[{key:"hideMask",value:function(){this.business=Object.assign({},this.business,{changeMP:!1,canConfirm:!1}),this.$apply()}},{key:"onLoad",value:function(){this.loadExtJson()}},{key:"onShow",value:function(){function e(){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.loadData();case 2:this.setGlobalMpId(this.business.selected.id);case 3:case"end":return e.stop()}},e,this)}));return e}()},{key:"formatedMp",value:function(e){var t=e;return t.headImg&&-1===t.headImg.indexOf("http")&&(t.headImg="https://pic1.58cdn.com.cn"+t.headImg),t}},{key:"onShareAppMessage",value:function(e){return"button"===e.from&&console.log(e.target),{title:"高效管理商家小程序的一站式服务工具",path:"/pages/home",imageUrl:"https://static.58.com/lbg/shangjiaxcxht/zhushou/img/share.png",success:function(e){console.log(e)},fail:function(e){console.log(e)}}}},{key:"loadExtJson",value:function(){function e(){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(){var t,s,n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t="/mpBusinessRelease/getExtJson",e.next=3,(0,_ajax.get)(t,{sceneKey:wx.getStorageSync("current_mpid")});case 3:s=e.sent,n=s.data,app.globalData.extConfig=n,console.log(n);case 7:case"end":return e.stop()}},e,this)}));return e}()},{key:"loadData",value:function(){function e(){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(){var t,s,n,a,i,r,o,c,u,p,l,h,g,d;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t={mpid:_wepy2.default.getStorageSync("current_mpid")||""},e.next=4,(0,_ajax.post)("/mplogic/index",t);case 4:s=e.sent,n=s.data,console.log("loadData",n),a=n.username,i=void 0===a?"":a,r=n.mpinfo,o=void 0===r?{}:r,c=n.unread,u=void 0===c?"":c,p=n.count,l=void 0===p?0:p,h=n.nexttask,g=void 0===h?"":h,d=this.formatedMp(o),this.business=Object.assign({},this.business,{name:i,miniProgramName:o.nickName||"您还没购买小程序",unread:u,mpCount:l,selected:d}),g&&this.setNextTask(g),console.log("this.business",this.business),this.$apply(),e.next=18;break;case 15:e.prev=15,e.t0=e.catch(0),console.log("e",e.t0);case 18:case"end":return e.stop()}},e,this,[[0,15]])}));return e}()},{key:"setGlobalMpId",value:function(e){e&&_wepy2.default.setStorageSync("current_mpid",e)}},{key:"checkBeforeJump",value:function(e){if(console.log("this.business.selected.",this.business.selected),!this.business.mpCount)return void(0,_utils.alert)("您还未购买小程序，请登录e.58.com进行购买","提示");switch(e){case"我的小程序":_wepy2.default.navigateTo({url:"myMp"});break;case"订单管理":_wepy2.default.navigateTo({url:"OrderList"});break;case"收款记录":_wepy2.default.navigateTo({url:"paymentRecord"});break;case"支付开通":_wepy2.default.navigateTo({url:"OpenPay"});break;case"店铺装修":_wepy2.default.navigateTo({url:"templateList"});break;case"发布服务":_wepy2.default.navigateTo({url:"orderComponentGroup"});break;case"优惠劵":_wepy2.default.navigateTo({url:"couponManage"});break;case"素材管理":_wepy2.default.navigateTo({url:"resourceManage"});break;case"购买小程序":_wepy2.default.navigateTo({url:"purchase"});break;case"注册小程序":if(1===this.business.selected.app_type)return void(0,_utils.alert)("当前小程序为优享小程序，不用提交注册信息","提示");1===this.business.selected.sign?_wepy2.default.navigateTo({url:"registed"}):(_wepy2.default.setStorageSync("registMappid",this.business.selected.id),_wepy2.default.navigateTo({url:"registMainAccount"}));break;case"进度查询":_wepy2.default.navigateTo({url:"progress"});break;case"意见反馈":_wepy2.default.navigateTo({url:"feedback"});break;case 6:_wepy2.default.navigateTo({url:"templateList"})}}},{key:"setNextTask",value:function(e){switch(this.business=Object.assign({},this.business,{nexttask:e}),e){case 2:this.business.progressText="当前小程序未添加小程序信息";break;case 3:this.business.progressText="当前小程序还未上传素材";break;case 4:1===this.business.selected.app_type?this.business.progressText="当前小程序信息已完善":this.business.progressText="当前小程序还未填写注册信息";break;case 5:1===this.business.selected.app_type?this.business.progressText="当前小程序信息已完善":this.business.progressText="当前小程序还未授权";break;case 6:case 7:case 8:case 9:this.business.progressText="当前小程序信息已完善"}this.$apply()}}]),t}(_wepy2.default.page);Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(Home,"pages/home"));
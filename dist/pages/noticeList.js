"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _asyncToGenerator(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,r){function n(o,a){try{var i=t[o](a),s=i.value}catch(e){return void r(e)}if(!i.done)return Promise.resolve(s).then(function(e){n("next",e)},function(e){n("throw",e)});e(s)}return n("next")})}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_Cropper=require("./../components/Cropper.js"),_Cropper2=_interopRequireDefault(_Cropper),_index=require("./../utils/index.js"),_ajax=require("./../utils/ajax.js"),NoticeList=function(e){function t(){var e,r,n,o;_classCallCheck(this,t);for(var a=arguments.length,i=Array(a),s=0;s<a;s++)i[s]=arguments[s];return r=n=_possibleConstructorReturn(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(i))),n.components={cropper:_Cropper2.default},n.config={navigationBarTitleText:"通知"},n.data={noticeList:[],orderUnRead:0,recivMoneyUnRead:0,unreadcount:0,sendParams:{group:1,page:1,pageSize:10}},n.methods={noticeListMore:function(){this.sendParams.page=this.sendParams.page+1,this.sendParams=Object.assign({},this.sendParams,this.sendParams.page),this.loadNoticeList()}},o=r,_possibleConstructorReturn(n,o)}return _inherits(t,e),_createClass(t,[{key:"onShow",value:function(){function e(){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:this.loadList();case 1:case"end":return e.stop()}},e,this)}));return e}()},{key:"onHide",value:function(){function e(){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:console.log("onHide");case 1:case"end":return e.stop()}},e,this)}));return e}()},{key:"onUnload",value:function(){function e(){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("onUnLoad"),!(this.unreadcount<=0)){e.next=3;break}return e.abrupt("return");case 3:return e.prev=3,e.next=6,(0,_ajax.get)("/mplogic/readgroupmsg",{group:1});case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(3),console.log(e.t0);case 11:case"end":return e.stop()}},e,this,[[3,8]])}));return e}()},{key:"loadList",value:function(){function e(){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(){var t,r,n,o,a,i,s;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,_ajax.get)("/mplogic/msglist");case 3:t=e.sent,r=t.data,n=r.msglist,o=r.unreadcount,a=r.orderUnRead,i=r.recivMoneyUnRead,this.unreadcount=o,this.orderUnRead=a,this.recivMoneyUnRead=i,n&&n.length>0?(s=[],n.forEach(function(e){var t=e;t.mpLogo&&-1===t.mpLogo.indexOf("http")&&(t.mpLogo="https://pic1.58cdn.com.cn"+t.mpLogo),s.push(t)}),this.noticeList=s):this.noticeList=[],this.$apply(),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),console.log(e.t0);case 16:case"end":return e.stop()}},e,this,[[0,13]])}));return e}()},{key:"loadNoticeList",value:function(){function e(){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(){var t,r,n,o;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,_ajax.get)("/mplogic/getgroupmsglist",this.sendParams);case 3:if(t=e.sent,r=t.data,n=r.msglist,0!==n.length){e.next=10;break}return this.accountList=this.accountList,(0,_index.toast)("没有更多消息啦"),e.abrupt("return");case 10:o=[],n.forEach(function(e){var t=e.content,r=Object.assign({},e,{content:JSON.parse(t)});r.mpLogo&&-1===r.mpLogo.indexOf("http")&&(r.mpLogo="https://pic1.58cdn.com.cn"+r.mpLogo),o.push(r)}),this.noticeList=this.noticeList.concat(o),this.$apply(),e.next=19;break;case 16:e.prev=16,e.t0=e.catch(0),console.log(e.t0);case 19:case"end":return e.stop()}},e,this,[[0,16]])}));return e}()},{key:"touploadInfo",value:function(e){var t=e.currentTarget.dataset.item;5!==t.msgType&&1!==t.app_type||_wepy2.default.navigateTo({url:"../uploadInfo"})}},{key:"clearAll",value:function(){function e(){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!(this.noticeList.length<=0)){e.next=4;break}return(0,_index.toast)("没有消息，无需清空~"),e.abrupt("return");case 4:return e.next=6,(0,_ajax.get)("/mplogic/cleargroupmsg",{group:1});case 6:(0,_index.sleep)(),this.loadList(),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0);case 13:case"end":return e.stop()}},e,this,[[0,10]])}));return e}()}]),t}(_wepy2.default.page);Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(NoticeList,"pages/noticeList"));
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _asyncToGenerator(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,r){function n(o,i){try{var u=t[o](i),a=u.value}catch(e){return void r(e)}if(!u.done)return Promise.resolve(a).then(function(e){n("next",e)},function(e){n("throw",e)});e(a)}return n("next")})}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _slicedToArray=function(){function e(e,t){var r=[],n=!0,o=!1,i=void 0;try{for(var u,a=e[Symbol.iterator]();!(n=(u=a.next()).done)&&(r.push(u.value),!t||r.length!==t);n=!0);}catch(e){o=!0,i=e}finally{try{!n&&a.return&&a.return()}finally{if(o)throw i}}return r}return function(t,r){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),_createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),_wepy=require("./../../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_mixin=require("./mixin.js"),_mixin2=_interopRequireDefault(_mixin),_uploader=require("./../../utils/uploader.js"),_utils=require("./../../utils/index.js"),_require=require("./../../utils/ajax.js"),post=_require.post,loadVideo="/businessResource/getlist?jjqwiaud",Video=function(e){function t(){var e,r,n,o;_classCallCheck(this,t);for(var i=arguments.length,u=Array(i),a=0;a<i;a++)u[a]=arguments[a];return r=n=_possibleConstructorReturn(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),n.config={navigationBarTitleText:"门店照片"},n.data={videos:[],thumbActive:!1,name:""},n.mixins=[_mixin2.default],n.methods={bindInput:function(e){this.name=e.detail.value},del:function(e){var t=e.currentTarget.dataset.index;this.videos.splice(t,1)},addVideo:function(){function e(){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(){var t,r,n,o=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_wepy2.default.chooseVideo();case 2:t=e.sent,r=t.tempFilePath,n=t.thumbTempFilePath,console.log(r),(0,_uploader.uploader)(r,{isVideo:!0},function(e,t){if(e)return void(0,_utils.toast)("上传失败，请重试。");console.log(t),(0,_utils.toast)("上传成功。"),o.videos.push({src:t.content,cover:n}),o.saveVideo(t.content),o.$apply()});case 7:case"end":return e.stop()}},e,this)}));return e}(),thumbClick:function(e){this.thumbActive=e.currentTarget.dataset.index}},o=r,_possibleConstructorReturn(n,o)}return _inherits(t,e),_createClass(t,[{key:"onLoad",value:function(){function e(){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(){var t,r,n,o,i=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,post(loadVideo,{resourceType:2,pageNum:1,pageSize:99,appid:"yxuEvbSU3M0zGwxuw"});case 2:t=e.sent,r=t.data,this.videos=r.map(function(e){var t=e.resourceName,r=e.resourceUrl,n=e.extend;return{src:r,name:t,selected:r===i.selectedVideo,cover:n?JSON.parse(n).sourceCoverUrl:""}}),n=this.tempModules.filter(function(e){return e.id===i.pageId}),o=_slicedToArray(n,1),this.pageModule=o[0],this.$apply(),console.log(this.videos);case 10:case"end":return e.stop()}},e,this)}));return e}()},{key:"saveVideo",value:function(){function e(e){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,post("/businessResource/insert",{resourceType:2,resourceName:this.name,resourceUrl:t});case 2:case"end":return e.stop()}},e,this)}));return e}()}]),t}(_wepy2.default.page);Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(Video,"pages/edit/video"));
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _asyncToGenerator(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,r){function n(o,i){try{var a=t[o](i),u=a.value}catch(e){return void r(e)}if(!a.done)return Promise.resolve(u).then(function(e){n("next",e)},function(e){n("throw",e)});e(u)}return n("next")})}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_utils=require("./../utils/index.js"),_ajax=require("./../utils/ajax.js"),submitApi="/resource/upload/article",UploadArticle=function(e){function t(){var e,r,n,o;_classCallCheck(this,t);for(var i=arguments.length,a=Array(i),u=0;u<i;u++)a[u]=arguments[u];return r=n=_possibleConstructorReturn(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(a))),n.config={navigationBarTitleText:"上传素材"},n.data={form:{title:"",author:"",source:"",content:"",enableSubmit:!1}},n.methods={setTitle:function(e){var t=e.detail.value;return t=(0,_utils.filteremoji)(t),this.updateForm({title:t}),{value:t}},setAuthor:function(e){var t=e.detail.value;return t=(0,_utils.filteremoji)(t),this.updateForm({author:t}),{value:t}},setSource:function(e){var t=e.detail.value;return t=(0,_utils.filteremoji)(t),this.updateForm({source:t}),{value:t}},setContent:function(e){var t=e.detail.value;return t=(0,_utils.filteremoji)(t),this.updateForm({content:t}),{value:t}},submitSave:function(){function e(){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(){var t,r,n,o,i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(this.form.enableSubmit){e.next=2;break}return e.abrupt("return");case 2:return t=this.form.content,r=Object.assign({},this.form,{content:"<p>"+t+"</p>"}),e.next=6,(0,_ajax.post)(submitApi,r);case 6:n=e.sent,o=n.state,i=n.msg,100===o?_wepy2.default.navigateBack():(0,_utils.toast)(i);case 10:case"end":return e.stop()}},e,this)}));return e}()},o=r,_possibleConstructorReturn(n,o)}return _inherits(t,e),_createClass(t,[{key:"updateForm",value:function(e){this.form=Object.assign({},this.form,e);var t=!(!this.form.title||!this.form.content);this.form=Object.assign({},this.form,{enableSubmit:t}),this.$apply()}},{key:"onLoad",value:function(){function e(e){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(t){var r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,_utils.sleep)();case 2:r=t.mpid||_wepy2.default.getStorageSync("current_mpid"),this.updateForm({mpid:r});case 4:case"end":return e.stop()}},e,this)}));return e}()}]),t}(_wepy2.default.page);Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(UploadArticle,"pages/UploadArticle"));
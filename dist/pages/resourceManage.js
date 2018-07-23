"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _asyncToGenerator(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,r){function n(a,i){try{var s=t[a](i),o=s.value}catch(e){return void r(e)}if(!s.done)return Promise.resolve(o).then(function(e){n("next",e)},function(e){n("throw",e)});e(o)}return n("next")})}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_mixin=require("./../mixin/index.js"),_mixin2=_interopRequireDefault(_mixin),_url=require("./../utils/url.js"),_ajax=require("./../utils/ajax.js"),_utils=require("./../utils/index.js"),_uploaderP=require("./../utils/uploaderP.js"),_uploaderP2=_interopRequireDefault(_uploaderP),_EmptyPage=require("./../components/EmptyPage.js"),_EmptyPage2=_interopRequireDefault(_EmptyPage),_Dialog=require("./../components/Dialog.js"),_Dialog2=_interopRequireDefault(_Dialog),pageNum=1,pageSize=20,urls=[],selectedIds=[],Index=function(e){function t(){var e,r,n,a;_classCallCheck(this,t);for(var i=arguments.length,s=Array(i),o=0;o<i;o++)s[o]=arguments[o];return r=n=_possibleConstructorReturn(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),n.config={navigationBarTitleText:"素材管理"},n.$repeat={},n.$props={EmptyPage:{},Pop:{"xmlns:v-on":""}},n.$events={Pop:{"v-on:close":"close","v-on:addGroup":"addGroup"}},n.components={EmptyPage:_EmptyPage2.default,Pop:_Dialog2.default},n.mixins=[_mixin2.default],n.data={curTab:"image",tabbarItems:[{label:"图片",name:"image"},{label:"视频",name:"video"},{label:"文章",name:"article"}],optionNames:{image:"上传图片",video:"上传视频",article:"添加文章分组"},works:[],groupList:[],title:"没有文章分组~",isEditing:!1,showPop:!1,name:"",id:"",delList:[],mpId:""},n.methods={selectTab:function(e){this.initData(),this.curTab=e,this.loadData(e)},selectItem:function(e,t){if(selectedIds.length>=10)return void(0,_utils.alert)("一次只能删除10条素材！");var r=this.works,n=r[t];n&&(n.checked=!n.checked,selectedIds.push(e))},previewResource:function(e){"image"===this.curTab&&wx.previewImage({current:e,urls:urls}),"video"===this.curTab&&wx.navigateTo({url:"/pages/VideoPlay?url="+e})},edit:function(e){var t=e.currentTarget.dataset.status,r=this.groupList;t&&(r.forEach(function(e){Object.assign(e,{choseStatu:!1})}),this.groupList=r),selectedIds=[],this.delList=[],this.isEditing=!this.isEditing,this.$apply()},deleteItem:function(){function e(){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(){var t,r,n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,"article"!==this.curTab){e.next=10;break}if(this.delList.length){e.next=5;break}return(0,_utils.alert)("请选择要删除的分组！"),e.abrupt("return");case 5:return t=this.delList.join(),e.next=8,(0,_ajax.get)("/businessArticle/delgroup/0",{ids:t});case 8:e.next=22;break;case 10:return e.next=12,(0,_utils.alertP)("确认删除所选的"+selectedIds.length+"项素材？");case 12:if(r=e.sent,!(n=r.cancel)){e.next=20;break}return this.isEditing=!1,this.$apply(),this.selectedIds=[],this.works.forEach(function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];t[0].checked=!1}),e.abrupt("return");case 20:return e.next=22,Promise.all(selectedIds.map(function(e){return(0,_ajax.get)(_url.DELETE_RESOURCE+e)}));case 22:(0,_utils.toast)("删除成功！"),this.isEditing=!1,this.$apply(),this.initData(),this.loadData(this.curTab),e.next=35;break;case 29:e.prev=29,e.t0=e.catch(0),this.errorHandler(e.t0),(0,_utils.toast)("删除失败！"),this.isEditing=!1,this.$apply();case 35:case"end":return e.stop()}},e,this,[[0,29]])}));return e}(),uploadFile:function(){function e(e){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(t){var r,n,a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,_utils.getNetStatus)();case 3:if(0!==(r=e.sent)){e.next=7;break}return(0,_utils.toast)("无网络"),e.abrupt("return");case 7:if(2!==r||"video"!==t){e.next=14;break}return e.next=10,(0,_utils.alertP)("确定在移动网络下上传视频？","提示");case 10:if(n=e.sent,!(a=n.cancel)){e.next=14;break}return e.abrupt("return");case 14:e.t0=t,e.next="image"===e.t0?17:"video"===e.t0?20:"article"===e.t0?25:28;break;case 17:return e.next=19,this.uploadImage();case 19:return e.abrupt("break",29);case 20:return e.next=22,this.uploadVideo();case 22:return e.next=24,(0,_utils.sleep)(3e3);case 24:return e.abrupt("break",29);case 25:return e.next=27,this.showDialog();case 27:case 28:return e.abrupt("break",29);case 29:if("article"!==t){e.next=31;break}return e.abrupt("return");case 31:this.initData(),this.loadData(this.curTab),e.next=38;break;case 35:e.prev=35,e.t1=e.catch(0),console.log(e.t1);case 38:case"end":return e.stop()}},e,this,[[0,35]])}));return e}(),addGroup:function(){function e(e){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(t){var r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r="",r=this.name?"/businessArticle/updategroup/"+this.id:"/businessArticle/addgroup",e.next=5,(0,_ajax.get)(r,{name:t});case 5:this.showPop=!1,this.$apply(),(0,_utils.toast)("操作成功！"),this.loadData(this.curTab),e.next=16;break;case 11:e.prev=11,e.t0=e.catch(0),this.errorHandler(e.t0),this.showPop=!1,(0,_utils.toast)(e.t0);case 16:case"end":return e.stop()}},e,this,[[0,11]])}));return e}(),close:function(){this.showPop=!1,this.$apply()},editChose:function(e,t,r){if(this.isEditing){var n=this.groupList[t],a=0===this.delList.length?-2:this.delList.indexOf(e);return n&&(n.choseStatu=!n.choseStatu),a<0?this.delList.push(e):this.delList.splice(a,1),void this.$apply()}_wepy2.default.navigateTo({url:"articleComponentlist?group="+e+"&name="+r})},showDialog:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";t&&(this.name=t,this.id=e,this.$broadcast("postData",t)),this.showPop=!0,this.$apply()}},a=r,_possibleConstructorReturn(n,a)}return _inherits(t,e),_createClass(t,[{key:"onLoad",value:function(){function e(){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.loadData(this.curTab);case 2:t=_wepy2.default.getStorageSync("current_mpid"),this.mpId=t,this.$apply();case 5:case"end":return e.stop()}},e,this)}));return e}()},{key:"initData",value:function(){this.works=[],this.$apply(),pageNum=1,urls=[],selectedIds=[]}},{key:"loadData",value:function(){function e(e){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(t){var r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:r=1,e.t0=t,e.next="image"===e.t0?4:"video"===e.t0?4:"article"===e.t0?8:11;break;case 4:return r={image:1,video:2}[t],e.next=7,this.loadResource(r);case 7:return e.abrupt("break",12);case 8:return e.next=10,this.loadArticle();case 10:case 11:return e.abrupt("break",12);case 12:case"end":return e.stop()}},e,this)}));return e}()},{key:"loadResource",value:function(){function e(e){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(t){var r,n,a,i=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r={resourceType:t},Object.assign(r,{pageNum:pageNum,pageSize:pageSize}),pageNum+=1,e.prev=3,e.next=6,(0,_ajax.get)(_url.LOAD_RESOURCE_URL,r);case 6:n=e.sent,a=n.data,a&&a.length||!this.works.length||(0,_utils.toast)("已经到底了"),a.forEach(function(e){var r=Object.assign({},e);if(1===t&&(r.previewUrl=""+(0,_utils.picSrcDomain)()+r.resourceUrl+"?w=375",r.resourceUrl=""+(0,_utils.picSrcDomain)()+r.resourceUrl+"?w=100"),2===t){r.previewUrl=r.resourceUrl;var n="";try{if(r.extend){n=JSON.parse(r.extend).sourceCoverUrl+"?w=100"}}catch(e){i.errorHandler(e)}r.resourceUrl=n}i.works.push(r),urls.push(r.previewUrl)}),this.$apply(),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(3),this.errorHandler(e.t0);case 16:case"end":return e.stop()}},e,this,[[3,13]])}));return e}()},{key:"loadArticle",value:function(){function e(){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(){var t,r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,_ajax.get)("/businessArticle/groups");case 3:if(t=e.sent,(r=t.data)&&0!==r.length){e.next=7;break}return e.abrupt("return");case 7:r.forEach(function(e){Object.assign(e,{choseStatu:!1})}),this.groupList=r,this.$apply(),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),console.log(e.t0);case 15:case"end":return e.stop()}},e,this,[[0,12]])}));return e}()},{key:"uploadImage",value:function(){function e(){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(){var t,r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,_wepy2.default.chooseImage({count:1});case 3:return t=e.sent,r=t.tempFilePaths,e.next=7,this.uploadResource(r[0],"image");case 7:(0,_utils.toast)("上传成功"),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),this.errorHandler("上传失败",e.t0),(0,_utils.toast)("上传失败");case 14:case"end":return e.stop()}},e,this,[[0,10]])}));return e}()},{key:"uploadVideo",value:function(){function e(){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(){var t,r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,_wepy2.default.chooseVideo();case 3:return t=e.sent,r=t.tempFilePath,e.next=7,this.uploadResource(r,"video");case 7:(0,_utils.toast)("上传成功",3e3),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),this.errorHandler("上传失败",e.t0),(0,_utils.toast)("上传失败",3e3);case 14:case"end":return e.stop()}},e,this,[[0,10]])}));return e}()},{key:"uploadResource",value:function(){function e(e,r){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(t,r){var n,a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,_uploaderP2.default)(t,{type:r});case 2:return n=e.sent,a=n.content,e.next=6,(0,_ajax.get)(_url.SAVE_RESOURCE_URL,{resourceUrl:a,resourceType:"image"===r?1:2});case 6:case"end":return e.stop()}},e,this)}));return e}()},{key:"showDialog",value:function(){var e=this.groupList;if(e&&e.length>=10)return void(0,_utils.toast)(" 分组数量达到最大（10个），无法创建更多。");this.showPop=!0,this.$apply()}},{key:"errorHandler",value:function(e){console.log("ERROR:",e)}},{key:"onReachBottom",value:function(){this.loadData(this.curTab)}}]),t}(_wepy2.default.page);Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(Index,"pages/resourceManage"));
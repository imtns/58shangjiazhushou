"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _asyncToGenerator(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,r){function a(n,i){try{var o=t[n](i),s=o.value}catch(e){return void r(e)}if(!o.done)return Promise.resolve(s).then(function(e){a("next",e)},function(e){a("throw",e)});e(s)}return a("next")})}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _slicedToArray=function(){function e(e,t){var r=[],a=!0,n=!1,i=void 0;try{for(var o,s=e[Symbol.iterator]();!(a=(o=s.next()).done)&&(r.push(o.value),!t||r.length!==t);a=!0);}catch(e){n=!0,i=e}finally{try{!a&&s.return&&s.return()}finally{if(n)throw i}}return r}return function(t,r){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),_createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),_wepy=require("./../../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_mixin=require("./mixin.js"),_mixin2=_interopRequireDefault(_mixin),_utils=require("./../../utils/index.js"),app=require("./../../utils/globalData.js"),_require=require("./../../utils/ajax.js"),get=_require.get,Article=function(e){function t(){var e,r,a,n;_classCallCheck(this,t);for(var i=arguments.length,o=Array(i),s=0;s<i;s++)o[s]=arguments[s];return r=a=_possibleConstructorReturn(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(o))),a.config={navigationBarTitleText:"文章"},a.mixins=[_mixin2.default],a.data={list:{},showGroup:!1,group:{},articleGroupName:"",params:{articleGroupId:"0",articlePage:"1",articleSize:"4",articleIds:"0"}},a.methods={addArticle:function(){_wepy2.default.navigateTo({url:"../articleComponentAdd?id="+this.pageId})},showGroup:function(){this.showGroup=!this.showGroup},selectGroup:function(){function e(e){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(t){var r,a,n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.currentTarget.dataset,a=r.id,n=r.name,this.articleGroupName=n,this.params.articleGroupId=a,e.next=5,this.loadArticleList();case 5:this.showGroup=!1,this.$apply();case 7:case"end":return e.stop()}},e,this)}));return e}(),selectAll:function(e){console.log(e),this.list.forEach(function(t){t.checked=0!==e.detail.value.length})},checkboxChange:function(e){console.log(e.detail.value),this.list.map(function(t){return-1===e.detail.value.indexOf(t.id)?t.checked=!1:t.checked=!0,t})},save:function(){var e=this,t=this.list.filter(function(e){return!0===e.checked});this.params.articleIds=t.map(function(e){return e.id}).join(","),t.forEach(function(t,r){e.pageData[0].props.data[r]&&(e.pageData[0].props.data[r].title=t.title,e.pageData[0].props.data[r].cover=t.cover,e.pageData[0].props.data[r].intro=t.intro)}),console.log(JSON.stringify(this.params)),this.pageModule.params=this.params,app.globalData.pageData[this.pageIndex].props=this.pageData[0].props,app.globalData.modules[this.pageIndex]=this.pageModule,wx.navigateBack({delta:1})}},n=r,_possibleConstructorReturn(a,n)}return _inherits(t,e),_createClass(t,[{key:"onLoad",value:function(){function e(){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(){var t,r,a=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.loadArticleGroup();case 2:this.loadArticleList(),t=this.tempModules.filter(function(e){return e.id===a.pageId}),r=_slicedToArray(t,1),this.pageModule=r[0],console.log(this.pageModule);case 7:case"end":return e.stop()}},e,this)}));return e}()},{key:"loadArticleList",value:function(){function e(){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(){var t,r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,get("/businessArticle/list",{appid:this.extConfig.appId,group:this.params.articleGroupId,pageNum:this.params.pageNum,pageSize:this.params.pageSize});case 2:t=e.sent,r=t.data,console.log(r),r.data.forEach(function(e){e.cover=(0,_utils.picSrcDomain)()+e.cover}),this.list=r.data,this.list.forEach(function(e){e.checked=!0}),this.params.articleIds=this.list.map(function(e){return e.id}).join(","),this.$apply();case 10:case"end":return e.stop()}},e,this)}));return e}()},{key:"loadArticleGroup",value:function(){function e(){return t.apply(this,arguments)}var t=_asyncToGenerator(regeneratorRuntime.mark(function e(){var t,r,a=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,get("/businessArticle/groups",{appid:this.extConfig.appId});case 2:t=e.sent,r=t.data,this.group=r,0!==Object.keys(JSON.parse(this.pageData.params)).length&&(this.articleGroupName=this.group.find(function(e){return e.id===JSON.parse(a.pageData.params).articleGroupId}).name,this.params.articleGroupId=this.group.find(function(e){return e.id===JSON.parse(a.pageData.params).articleGroupId}).id),this.$apply();case 7:case"end":return e.stop()}},e,this)}));return e}()}]),t}(_wepy2.default.page);Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(Article,"pages/edit/article"));
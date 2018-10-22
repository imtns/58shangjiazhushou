
/*eslint-disable */
'use strict';
var Page = {
    getKey: function (key) {
      var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
      //search    从问号 (?) 开始的 URL（查询部分）
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
          return decodeURIComponent(r[2]);
      } else {
          return null;
      }
    },
    initEvent: function() {
        const from = Page.getKey('from');
        console.log(from);
        $("._share-btn").on("click",function(){
          wx.miniProgram.navigateTo({
              url: '/pages/activityRedirect',
          });
        })
    },
};
if (typeof Object.assign != 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
      value: function assign(target, varArgs) { // .length of function is 2
        'use strict';
        if (target == null) { // TypeError if undefined or null
          throw new TypeError('Cannot convert undefined or null to object');
        }
  
        var to = Object(target);
  
        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];
  
          if (nextSource != null) { // Skip over if undefined or null
            for (var nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true
    });
}
Page.initEvent();
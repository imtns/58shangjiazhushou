'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMappDetail = exports.globalData = undefined;
exports.clearSessionId = clearSessionId;
exports.getCode = getCode;
exports.getUserInfo = getUserInfo;
exports.openSetting = openSetting;
exports.regist = regist;

var _ajax = require('./ajax.js');

var globalData = exports.globalData = {
  iv: null,
  sessionId: null,
  userInfo: null,
  encryptedData: null,
  information: {},
  extConfig: {},
  pageData: {},
  pageList: {},
  modules: {},
  isIphoneX: false,
  tabMode: 0,
  tabBar: {}
}; /*eslint-disable */
function clearSessionId() {
  Object.assign(this.globalData, {
    iv: null,
    sessionId: null,
    userInfo: null
  });
}
// 获取sessionid
function getSessionId(callback) {
  var self = this;

  var sessionId = this.globalData.sessionId;

  if (sessionId) {
    callback(null, sessionId);
    return;
  }
  this.getCode(function (e, code, userInfo) {
    if (e) {
      console.log(e);
      return;
    }
    (0, _ajax.get)('/wechat/getSession/', {
      code: code
    }, function (e, res) {
      if (e) {
        callback(e);
        return;
      }
      var data = res.data,
          code = res.code;

      self.globalData.userInfo = userInfo;
      self.globalData.sessionId = data.session;
      if (code === 1) {
        // TODO 注册
        self.regist();
      }

      callback(null, data.session);
    });
  });
}
// 获取code
function getCode(callback) {
  // const self = this;
  wx.login({
    success: function success(data) {
      var _wx$getStorageSync = wx.getStorageSync('getUserInfo'),
          userInfo = _wx$getStorageSync.userInfo;

      callback(null, data.code, userInfo);
      // self.getUserInfo((e, userInfo) => {
      //   if (e) {
      //     callback(e);
      //     return;
      //   }

      //   callback(null, data.code, userInfo);
      // });
    },
    fail: function fail(err) {
      console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err);
      callback(err);
    }
  });
}
// 获取userInfo
function getUserInfo(callback) {
  var self = this;

  var userInfo = self.globalData.userInfo;

  if (userInfo) {
    callback(null, userInfo);
    return;
  }

  wx.getUserInfo({
    withCredentials: true,
    success: function success(_ref) {
      var encryptedData = _ref.encryptedData,
          iv = _ref.iv,
          userInfo = _ref.userInfo;

      self.globalData.encryptedData = encryptedData;
      self.globalData.userInfo = userInfo;
      self.globalData.iv = iv;
      callback(null, userInfo);
    },
    fail: function fail(e) {
      self.openSetting(function (e, userInfo) {
        if (e) {
          console.log(e);
          return;
        }
        callback(null, userInfo);
      });
    }
  });
}
// 重新设置
function openSetting(callback) {
  var self = this;

  wx.showModal({
    title: '注意',
    content: '由于您拒绝了授权，后续页面可能无法正常访问。您可以进入设置页面开启授权。',
    success: function success(res) {
      if (!res.confirm) {
        wx.reLaunch({
          url: '/pages/index/index'
        });
        return;
      }

      wx.openSetting({
        success: function success(res) {
          if (!res.authSetting['scope.userInfo']) {
            callback('设置失败');
          }

          self.getCode(function (e, code, userInfo) {
            callback(null, userInfo);
          });
        }
      });
    }
  });
}
// 注册
function regist() {
  var self = this;
  var _self$globalData = self.globalData,
      iv = _self$globalData.iv,
      encryptedData = _self$globalData.encryptedData,
      sessionId = _self$globalData.sessionId;


  console.log(self.globalData);
  (0, _ajax.post)('/wechat/decodeUserInfo/', {
    iv: iv,
    sessionId: sessionId,
    encryptedData: encryptedData
  }, function (e, res) {
    console.log(e, res);
    if (e) {
      alert('注册失败，请删除小程序后重新打开。');
    }
  });
}
var getMappDetail = exports.getMappDetail = function getMappDetail() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      userId = _ref2.userId,
      appId = _ref2.appId,
      releaseId = _ref2.releaseId;

  return new Promise(function (resolve, reject) {
    (0, _ajax.get)('/search/detail', { userId: userId, appId: appId, releaseId: releaseId }, function (err, res) {
      if (err || !res) {
        alert('该小程序已下线！');
        reject(err);
        return;
      }

      resolve(res);
    });
  });
};
var utils = {
  globalData: globalData,
  clearSessionId: clearSessionId,
  getSessionId: getSessionId,
  getCode: getCode,
  getUserInfo: getUserInfo,
  openSetting: openSetting,
  regist: regist
};
exports.default = utils;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsb2JhbERhdGEuanMiXSwibmFtZXMiOlsiY2xlYXJTZXNzaW9uSWQiLCJnZXRDb2RlIiwiZ2V0VXNlckluZm8iLCJvcGVuU2V0dGluZyIsInJlZ2lzdCIsImdsb2JhbERhdGEiLCJpdiIsInNlc3Npb25JZCIsInVzZXJJbmZvIiwiZW5jcnlwdGVkRGF0YSIsImluZm9ybWF0aW9uIiwiZXh0Q29uZmlnIiwicGFnZURhdGEiLCJwYWdlTGlzdCIsIm1vZHVsZXMiLCJpc0lwaG9uZVgiLCJ0YWJNb2RlIiwidGFiQmFyIiwiT2JqZWN0IiwiYXNzaWduIiwiZ2V0U2Vzc2lvbklkIiwiY2FsbGJhY2siLCJzZWxmIiwiZSIsImNvZGUiLCJjb25zb2xlIiwibG9nIiwicmVzIiwiZGF0YSIsInNlc3Npb24iLCJ3eCIsImxvZ2luIiwic3VjY2VzcyIsImdldFN0b3JhZ2VTeW5jIiwiZmFpbCIsImVyciIsIndpdGhDcmVkZW50aWFscyIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsImNvbmZpcm0iLCJyZUxhdW5jaCIsInVybCIsImF1dGhTZXR0aW5nIiwiYWxlcnQiLCJnZXRNYXBwRGV0YWlsIiwidXNlcklkIiwiYXBwSWQiLCJyZWxlYXNlSWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInV0aWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7UUFtQmdCQSxjLEdBQUFBLGM7UUE4Q0FDLE8sR0FBQUEsTztRQXdCQUMsVyxHQUFBQSxXO1FBbUNBQyxXLEdBQUFBLFc7UUE2QkFDLE0sR0FBQUEsTTs7QUF4SmhCOztBQUVPLElBQU1DLGtDQUFhO0FBQ3hCQyxNQUFJLElBRG9CO0FBRXhCQyxhQUFXLElBRmE7QUFHeEJDLFlBQVUsSUFIYztBQUl4QkMsaUJBQWUsSUFKUztBQUt4QkMsZUFBYSxFQUxXO0FBTXhCQyxhQUFXLEVBTmE7QUFReEJDLFlBQVMsRUFSZTtBQVN4QkMsWUFBUyxFQVRlO0FBVXhCQyxXQUFRLEVBVmdCO0FBV3hCQyxhQUFVLEtBWGM7QUFZ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d0JBRjhCO0FBRzlCRTtBQUg4QixHQUFoQyxFQUlHLFVBQUNjLENBQUQsRUFBSUksR0FBSixFQUFZO0FBQ2JGLFlBQVFDLEdBQVIsQ0FBWUgsQ0FBWixFQUFlSSxHQUFmO0FBQ0EsUUFBSUosQ0FBSixFQUFPO0FBQ0xxQixZQUFNLG1CQUFOO0FBQ0Q7QUFDRixHQVREO0FBVUQ7QUFDTSxJQUFNQyx3Q0FBZ0IsU0FBaEJBLGFBQWdCLEdBQXVDO0FBQUEsa0ZBQVAsRUFBTztBQUFBLE1BQXBDQyxNQUFvQyxTQUFwQ0EsTUFBb0M7QUFBQSxNQUE1QkMsS0FBNEIsU0FBNUJBLEtBQTRCO0FBQUEsTUFBckJDLFNBQXFCLFNBQXJCQSxTQUFxQjs7QUFDaEUsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3BDLG1CQUFJLGdCQUFKLEVBQXNCLEVBQUVMLGNBQUYsRUFBVUMsWUFBVixFQUFpQkMsb0JBQWpCLEVBQXRCLEVBQW9ELFVBQUNiLEdBQUQsRUFBTVIsR0FBTixFQUFjO0FBQzlELFVBQUlRLE9BQU8sQ0FBQ1IsR0FBWixFQUFpQjtBQUNiaUIsY0FBTSxVQUFOO0FBQ0FPLGVBQU9oQixHQUFQO0FBQ0E7QUFDSDs7QUFFRGUsY0FBUXZCLEdBQVI7QUFDSCxLQVJEO0FBU0gsR0FWTSxDQUFQO0FBV0gsQ0FaTTtBQWFQLElBQU15QixRQUFRO0FBQ1YvQyx3QkFEVTtBQUVWTCxnQ0FGVTtBQUdWb0IsNEJBSFU7QUFJVm5CLGtCQUpVO0FBS1ZDLDBCQUxVO0FBTVZDLDBCQU5VO0FBT1ZDO0FBUFUsQ0FBZDtrQkFTZ0JnRCxLIiwiZmlsZSI6Imdsb2JhbERhdGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKmVzbGludC1kaXNhYmxlICovXG5pbXBvcnQgeyBnZXQscG9zdCB9IGZyb20gJy4vYWpheCc7XG5cbmV4cG9ydCBjb25zdCBnbG9iYWxEYXRhID0ge1xuICBpdjogbnVsbCxcbiAgc2Vzc2lvbklkOiBudWxsLFxuICB1c2VySW5mbzogbnVsbCxcbiAgZW5jcnlwdGVkRGF0YTogbnVsbCxcbiAgaW5mb3JtYXRpb246IHt9LFxuICBleHRDb25maWc6IHtcbiAgfSxcbiAgcGFnZURhdGE6e30sXG4gIHBhZ2VMaXN0Ont9LFxuICBtb2R1bGVzOnt9LFxuICBpc0lwaG9uZVg6ZmFsc2UsXG4gIHRhYk1vZGU6MCxcbiAgdGFiQmFyOnt9LFxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJTZXNzaW9uSWQoKSB7XG4gIE9iamVjdC5hc3NpZ24odGhpcy5nbG9iYWxEYXRhLCB7XG4gICAgaXY6IG51bGwsXG4gICAgc2Vzc2lvbklkOiBudWxsLFxuICAgIHVzZXJJbmZvOiBudWxsLFxuICB9KTtcbn1cbi8vIOiOt+WPlnNlc3Npb25pZFxuZnVuY3Rpb24gZ2V0U2Vzc2lvbklkKGNhbGxiYWNrKSB7XG4gIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gIGNvbnN0IHtcbiAgICBzZXNzaW9uSWRcbiAgfSA9IHRoaXMuZ2xvYmFsRGF0YTtcbiAgaWYgKHNlc3Npb25JZCkge1xuICAgIGNhbGxiYWNrKG51bGwsIHNlc3Npb25JZCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuZ2V0Q29kZSgoZSwgY29kZSwgdXNlckluZm8pID0+IHtcbiAgICBpZiAoZSkge1xuICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGdldCgnL3dlY2hhdC9nZXRTZXNzaW9uLycsIHtcbiAgICAgIGNvZGVcbiAgICB9LCAoZSwgcmVzKSA9PiB7XG4gICAgICBpZiAoZSkge1xuICAgICAgICBjYWxsYmFjayhlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3Qge1xuICAgICAgICBkYXRhLFxuICAgICAgICBjb2RlXG4gICAgICB9ID0gcmVzO1xuICAgICAgc2VsZi5nbG9iYWxEYXRhLnVzZXJJbmZvID0gdXNlckluZm87XG4gICAgICBzZWxmLmdsb2JhbERhdGEuc2Vzc2lvbklkID0gZGF0YS5zZXNzaW9uO1xuICAgICAgaWYgKGNvZGUgPT09IDEpIHtcbiAgICAgICAgLy8gVE9ETyDms6jlhoxcbiAgICAgICAgc2VsZi5yZWdpc3QoKTtcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2sobnVsbCwgZGF0YS5zZXNzaW9uKTtcbiAgICB9KTtcbiAgfSk7XG59XG4vLyDojrflj5Zjb2RlXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29kZShjYWxsYmFjaykge1xuICAvLyBjb25zdCBzZWxmID0gdGhpcztcbiAgd3gubG9naW4oe1xuICAgIHN1Y2Nlc3MoZGF0YSkge1xuICAgICAgY29uc3Qge1xuICAgICAgICB1c2VySW5mb1xuICAgICAgfSA9IHd4LmdldFN0b3JhZ2VTeW5jKCdnZXRVc2VySW5mbycpO1xuICAgICAgY2FsbGJhY2sobnVsbCwgZGF0YS5jb2RlLCB1c2VySW5mbyk7XG4gICAgICAvLyBzZWxmLmdldFVzZXJJbmZvKChlLCB1c2VySW5mbykgPT4ge1xuICAgICAgLy8gICBpZiAoZSkge1xuICAgICAgLy8gICAgIGNhbGxiYWNrKGUpO1xuICAgICAgLy8gICAgIHJldHVybjtcbiAgICAgIC8vICAgfVxuXG4gICAgICAvLyAgIGNhbGxiYWNrKG51bGwsIGRhdGEuY29kZSwgdXNlckluZm8pO1xuICAgICAgLy8gfSk7XG4gICAgfSxcbiAgICBmYWlsKGVycikge1xuICAgICAgY29uc29sZS5sb2coJ3d4LmxvZ2luIOaOpeWPo+iwg+eUqOWksei0pe+8jOWwhuaXoOazleato+W4uOS9v+eUqOW8gOaUvuaOpeWPo+etieacjeWKoScsIGVycik7XG4gICAgICBjYWxsYmFjayhlcnIpO1xuICAgIH0sXG4gIH0pO1xufVxuLy8g6I635Y+WdXNlckluZm9cbmV4cG9ydCBmdW5jdGlvbiBnZXRVc2VySW5mbyhjYWxsYmFjaykge1xuICBjb25zdCBzZWxmID0gdGhpcztcblxuICBjb25zdCB7XG4gICAgdXNlckluZm9cbiAgfSA9IHNlbGYuZ2xvYmFsRGF0YTtcbiAgaWYgKHVzZXJJbmZvKSB7XG4gICAgY2FsbGJhY2sobnVsbCwgdXNlckluZm8pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHd4LmdldFVzZXJJbmZvKHtcbiAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgc3VjY2Vzcyh7XG4gICAgICBlbmNyeXB0ZWREYXRhLFxuICAgICAgaXYsXG4gICAgICB1c2VySW5mb1xuICAgIH0pIHtcbiAgICAgIHNlbGYuZ2xvYmFsRGF0YS5lbmNyeXB0ZWREYXRhID0gZW5jcnlwdGVkRGF0YTtcbiAgICAgIHNlbGYuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHVzZXJJbmZvO1xuICAgICAgc2VsZi5nbG9iYWxEYXRhLml2ID0gaXY7XG4gICAgICBjYWxsYmFjayhudWxsLCB1c2VySW5mbyk7XG4gICAgfSxcbiAgICBmYWlsKGUpIHtcbiAgICAgIHNlbGYub3BlblNldHRpbmcoKGUsIHVzZXJJbmZvKSA9PiB7XG4gICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHVzZXJJbmZvKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gIH0pO1xufVxuLy8g6YeN5paw6K6+572uXG5leHBvcnQgZnVuY3Rpb24gb3BlblNldHRpbmcoY2FsbGJhY2spIHtcbiAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgd3guc2hvd01vZGFsKHtcbiAgICB0aXRsZTogJ+azqOaEjycsXG4gICAgY29udGVudDogJ+eUseS6juaCqOaLkue7neS6huaOiOadg++8jOWQjue7remhtemdouWPr+iDveaXoOazleato+W4uOiuv+mXruOAguaCqOWPr+S7pei/m+WFpeiuvue9rumhtemdouW8gOWQr+aOiOadg+OAgicsXG4gICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgIGlmICghcmVzLmNvbmZpcm0pIHtcbiAgICAgICAgd3gucmVMYXVuY2goe1xuICAgICAgICAgIHVybDogJy9wYWdlcy9pbmRleC9pbmRleCdcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgd3gub3BlblNldHRpbmcoe1xuICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgIGlmICghcmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKSB7XG4gICAgICAgICAgICBjYWxsYmFjaygn6K6+572u5aSx6LSlJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2VsZi5nZXRDb2RlKChlLCBjb2RlLCB1c2VySW5mbykgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgdXNlckluZm8pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSxcbiAgfSk7XG59XG4vLyDms6jlhoxcbmV4cG9ydCBmdW5jdGlvbiByZWdpc3QoKSB7XG4gIGNvbnN0IHNlbGYgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgaXYsXG4gICAgZW5jcnlwdGVkRGF0YSxcbiAgICBzZXNzaW9uSWRcbiAgfSA9IHNlbGYuZ2xvYmFsRGF0YTtcblxuICBjb25zb2xlLmxvZyhzZWxmLmdsb2JhbERhdGEpO1xuICBwb3N0KCcvd2VjaGF0L2RlY29kZVVzZXJJbmZvLycsIHtcbiAgICBpdixcbiAgICBzZXNzaW9uSWQsXG4gICAgZW5jcnlwdGVkRGF0YVxuICB9LCAoZSwgcmVzKSA9PiB7XG4gICAgY29uc29sZS5sb2coZSwgcmVzKTtcbiAgICBpZiAoZSkge1xuICAgICAgYWxlcnQoJ+azqOWGjOWksei0pe+8jOivt+WIoOmZpOWwj+eoi+W6j+WQjumHjeaWsOaJk+W8gOOAgicpO1xuICAgIH1cbiAgfSk7XG59XG5leHBvcnQgY29uc3QgZ2V0TWFwcERldGFpbCA9ICh7IHVzZXJJZCwgYXBwSWQsIHJlbGVhc2VJZCB9ID0ge30pID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBnZXQoJy9zZWFyY2gvZGV0YWlsJywgeyB1c2VySWQsIGFwcElkLCByZWxlYXNlSWQgfSwgKGVyciwgcmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyIHx8ICFyZXMpIHtcbiAgICAgICAgICAgICAgICBhbGVydCgn6K+l5bCP56iL5bqP5bey5LiL57q/77yBJyk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvbHZlKHJlcyk7XG4gICAgICAgIH0pXG4gICAgfSk7XG59XG5jb25zdCB1dGlscyA9IHtcbiAgICBnbG9iYWxEYXRhLFxuICAgIGNsZWFyU2Vzc2lvbklkLFxuICAgIGdldFNlc3Npb25JZCxcbiAgICBnZXRDb2RlLFxuICAgIGdldFVzZXJJbmZvLFxuICAgIG9wZW5TZXR0aW5nLFxuICAgIHJlZ2lzdFxuIH07XG4gZXhwb3J0IGRlZmF1bHQgdXRpbHM7IFxuIl19
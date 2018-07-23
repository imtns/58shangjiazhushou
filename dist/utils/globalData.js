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
  tabMode: 1,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsb2JhbERhdGEuanMiXSwibmFtZXMiOlsiY2xlYXJTZXNzaW9uSWQiLCJnZXRDb2RlIiwiZ2V0VXNlckluZm8iLCJvcGVuU2V0dGluZyIsInJlZ2lzdCIsImdsb2JhbERhdGEiLCJpdiIsInNlc3Npb25JZCIsInVzZXJJbmZvIiwiZW5jcnlwdGVkRGF0YSIsImluZm9ybWF0aW9uIiwiZXh0Q29uZmlnIiwicGFnZURhdGEiLCJwYWdlTGlzdCIsIm1vZHVsZXMiLCJpc0lwaG9uZVgiLCJ0YWJNb2RlIiwidGFiQmFyIiwiT2JqZWN0IiwiYXNzaWduIiwiZ2V0U2Vzc2lvbklkIiwiY2FsbGJhY2siLCJzZWxmIiwiZSIsImNvZGUiLCJjb25zb2xlIiwibG9nIiwicmVzIiwiZGF0YSIsInNlc3Npb24iLCJ3eCIsImxvZ2luIiwic3VjY2VzcyIsImdldFN0b3JhZ2VTeW5jIiwiZmFpbCIsImVyciIsIndpdGhDcmVkZW50aWFscyIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsImNvbmZpcm0iLCJyZUxhdW5jaCIsInVybCIsImF1dGhTZXR0aW5nIiwiYWxlcnQiLCJnZXRNYXBwRGV0YWlsIiwidXNlcklkIiwiYXBwSWQiLCJyZWxlYXNlSWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInV0aWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7UUFtQmdCQSxjLEdBQUFBLGM7UUE4Q0FDLE8sR0FBQUEsTztRQXdCQUMsVyxHQUFBQSxXO1FBbUNBQyxXLEdBQUFBLFc7UUE2QkFDLE0sR0FBQUEsTTs7QUF4SmhCOztBQUVPLElBQU1DLGtDQUFhO0FBQ3hCQyxNQUFJLElBRG9CO0FBRXhCQyxhQUFXLElBRmE7QUFHeEJDLFlBQVUsSUFIYztBQUl4QkMsaUJBQWUsSUFKUztBQUt4QkMsZUFBYSxFQUxXO0FBTXhCQyxhQUFXLEVBTmE7QUFReEJDLFlBQVMsRUFSZTtBQVN4QkMsWUFBUyxFQVRlO0FBVXhCQyxXQUFRLEVBVmdCO0FBV3hCQyxhQUFVLEtBWGM7QUFZ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d0JBRjhCO0FBRzlCRTtBQUg4QixHQUFoQyxFQUlHLFVBQUNjLENBQUQsRUFBSUksR0FBSixFQUFZO0FBQ2JGLFlBQVFDLEdBQVIsQ0FBWUgsQ0FBWixFQUFlSSxHQUFmO0FBQ0EsUUFBSUosQ0FBSixFQUFPO0FBQ0xxQixZQUFNLG1CQUFOO0FBQ0Q7QUFDRixHQVREO0FBVUQ7QUFDTSxJQUFNQyx3Q0FBZ0IsU0FBaEJBLGFBQWdCLEdBQXVDO0FBQUEsa0ZBQVAsRUFBTztBQUFBLE1BQXBDQyxNQUFvQyxTQUFwQ0EsTUFBb0M7QUFBQSxNQUE1QkMsS0FBNEIsU0FBNUJBLEtBQTRCO0FBQUEsTUFBckJDLFNBQXFCLFNBQXJCQSxTQUFxQjs7QUFDaEUsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3BDLG1CQUFJLGdCQUFKLEVBQXNCLEVBQUVMLGNBQUYsRUFBVUMsWUFBVixFQUFpQkMsb0JBQWpCLEVBQXRCLEVBQW9ELFVBQUNiLEdBQUQsRUFBTVIsR0FBTixFQUFjO0FBQzlELFVBQUlRLE9BQU8sQ0FBQ1IsR0FBWixFQUFpQjtBQUNiaUIsY0FBTSxVQUFOO0FBQ0FPLGVBQU9oQixHQUFQO0FBQ0E7QUFDSDs7QUFFRGUsY0FBUXZCLEdBQVI7QUFDSCxLQVJEO0FBU0gsR0FWTSxDQUFQO0FBV0gsQ0FaTTtBQWFQLElBQU15QixRQUFRO0FBQ1YvQyx3QkFEVTtBQUVWTCxnQ0FGVTtBQUdWb0IsNEJBSFU7QUFJVm5CLGtCQUpVO0FBS1ZDLDBCQUxVO0FBTVZDLDBCQU5VO0FBT1ZDO0FBUFUsQ0FBZDtrQkFTZ0JnRCxLIiwiZmlsZSI6Imdsb2JhbERhdGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKmVzbGludC1kaXNhYmxlICovXHJcbmltcG9ydCB7IGdldCxwb3N0IH0gZnJvbSAnLi9hamF4JztcclxuXHJcbmV4cG9ydCBjb25zdCBnbG9iYWxEYXRhID0ge1xyXG4gIGl2OiBudWxsLFxyXG4gIHNlc3Npb25JZDogbnVsbCxcclxuICB1c2VySW5mbzogbnVsbCxcclxuICBlbmNyeXB0ZWREYXRhOiBudWxsLFxyXG4gIGluZm9ybWF0aW9uOiB7fSxcclxuICBleHRDb25maWc6IHtcclxuICB9LFxyXG4gIHBhZ2VEYXRhOnt9LFxyXG4gIHBhZ2VMaXN0Ont9LFxyXG4gIG1vZHVsZXM6e30sXHJcbiAgaXNJcGhvbmVYOmZhbHNlLFxyXG4gIHRhYk1vZGU6MSxcclxuICB0YWJCYXI6e30sXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjbGVhclNlc3Npb25JZCgpIHtcclxuICBPYmplY3QuYXNzaWduKHRoaXMuZ2xvYmFsRGF0YSwge1xyXG4gICAgaXY6IG51bGwsXHJcbiAgICBzZXNzaW9uSWQ6IG51bGwsXHJcbiAgICB1c2VySW5mbzogbnVsbCxcclxuICB9KTtcclxufVxyXG4vLyDojrflj5ZzZXNzaW9uaWRcclxuZnVuY3Rpb24gZ2V0U2Vzc2lvbklkKGNhbGxiYWNrKSB7XHJcbiAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gIGNvbnN0IHtcclxuICAgIHNlc3Npb25JZFxyXG4gIH0gPSB0aGlzLmdsb2JhbERhdGE7XHJcbiAgaWYgKHNlc3Npb25JZCkge1xyXG4gICAgY2FsbGJhY2sobnVsbCwgc2Vzc2lvbklkKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgdGhpcy5nZXRDb2RlKChlLCBjb2RlLCB1c2VySW5mbykgPT4ge1xyXG4gICAgaWYgKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGdldCgnL3dlY2hhdC9nZXRTZXNzaW9uLycsIHtcclxuICAgICAgY29kZVxyXG4gICAgfSwgKGUsIHJlcykgPT4ge1xyXG4gICAgICBpZiAoZSkge1xyXG4gICAgICAgIGNhbGxiYWNrKGUpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCB7XHJcbiAgICAgICAgZGF0YSxcclxuICAgICAgICBjb2RlXHJcbiAgICAgIH0gPSByZXM7XHJcbiAgICAgIHNlbGYuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHVzZXJJbmZvO1xyXG4gICAgICBzZWxmLmdsb2JhbERhdGEuc2Vzc2lvbklkID0gZGF0YS5zZXNzaW9uO1xyXG4gICAgICBpZiAoY29kZSA9PT0gMSkge1xyXG4gICAgICAgIC8vIFRPRE8g5rOo5YaMXHJcbiAgICAgICAgc2VsZi5yZWdpc3QoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY2FsbGJhY2sobnVsbCwgZGF0YS5zZXNzaW9uKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcbi8vIOiOt+WPlmNvZGVcclxuZXhwb3J0IGZ1bmN0aW9uIGdldENvZGUoY2FsbGJhY2spIHtcclxuICAvLyBjb25zdCBzZWxmID0gdGhpcztcclxuICB3eC5sb2dpbih7XHJcbiAgICBzdWNjZXNzKGRhdGEpIHtcclxuICAgICAgY29uc3Qge1xyXG4gICAgICAgIHVzZXJJbmZvXHJcbiAgICAgIH0gPSB3eC5nZXRTdG9yYWdlU3luYygnZ2V0VXNlckluZm8nKTtcclxuICAgICAgY2FsbGJhY2sobnVsbCwgZGF0YS5jb2RlLCB1c2VySW5mbyk7XHJcbiAgICAgIC8vIHNlbGYuZ2V0VXNlckluZm8oKGUsIHVzZXJJbmZvKSA9PiB7XHJcbiAgICAgIC8vICAgaWYgKGUpIHtcclxuICAgICAgLy8gICAgIGNhbGxiYWNrKGUpO1xyXG4gICAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgICAvLyAgIH1cclxuXHJcbiAgICAgIC8vICAgY2FsbGJhY2sobnVsbCwgZGF0YS5jb2RlLCB1c2VySW5mbyk7XHJcbiAgICAgIC8vIH0pO1xyXG4gICAgfSxcclxuICAgIGZhaWwoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCd3eC5sb2dpbiDmjqXlj6PosIPnlKjlpLHotKXvvIzlsIbml6Dms5XmraPluLjkvb/nlKjlvIDmlL7mjqXlj6PnrYnmnI3liqEnLCBlcnIpO1xyXG4gICAgICBjYWxsYmFjayhlcnIpO1xyXG4gICAgfSxcclxuICB9KTtcclxufVxyXG4vLyDojrflj5Z1c2VySW5mb1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlckluZm8oY2FsbGJhY2spIHtcclxuICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgY29uc3Qge1xyXG4gICAgdXNlckluZm9cclxuICB9ID0gc2VsZi5nbG9iYWxEYXRhO1xyXG4gIGlmICh1c2VySW5mbykge1xyXG4gICAgY2FsbGJhY2sobnVsbCwgdXNlckluZm8pO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgd3guZ2V0VXNlckluZm8oe1xyXG4gICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxyXG4gICAgc3VjY2Vzcyh7XHJcbiAgICAgIGVuY3J5cHRlZERhdGEsXHJcbiAgICAgIGl2LFxyXG4gICAgICB1c2VySW5mb1xyXG4gICAgfSkge1xyXG4gICAgICBzZWxmLmdsb2JhbERhdGEuZW5jcnlwdGVkRGF0YSA9IGVuY3J5cHRlZERhdGE7XHJcbiAgICAgIHNlbGYuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHVzZXJJbmZvO1xyXG4gICAgICBzZWxmLmdsb2JhbERhdGEuaXYgPSBpdjtcclxuICAgICAgY2FsbGJhY2sobnVsbCwgdXNlckluZm8pO1xyXG4gICAgfSxcclxuICAgIGZhaWwoZSkge1xyXG4gICAgICBzZWxmLm9wZW5TZXR0aW5nKChlLCB1c2VySW5mbykgPT4ge1xyXG4gICAgICAgIGlmIChlKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgdXNlckluZm8pO1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxuLy8g6YeN5paw6K6+572uXHJcbmV4cG9ydCBmdW5jdGlvbiBvcGVuU2V0dGluZyhjYWxsYmFjaykge1xyXG4gIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICB3eC5zaG93TW9kYWwoe1xyXG4gICAgdGl0bGU6ICfms6jmhI8nLFxyXG4gICAgY29udGVudDogJ+eUseS6juaCqOaLkue7neS6huaOiOadg++8jOWQjue7remhtemdouWPr+iDveaXoOazleato+W4uOiuv+mXruOAguaCqOWPr+S7pei/m+WFpeiuvue9rumhtemdouW8gOWQr+aOiOadg+OAgicsXHJcbiAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICBpZiAoIXJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgd3gucmVMYXVuY2goe1xyXG4gICAgICAgICAgdXJsOiAnL3BhZ2VzL2luZGV4L2luZGV4J1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgd3gub3BlblNldHRpbmcoe1xyXG4gICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICBpZiAoIXJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSkge1xyXG4gICAgICAgICAgICBjYWxsYmFjaygn6K6+572u5aSx6LSlJyk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc2VsZi5nZXRDb2RlKChlLCBjb2RlLCB1c2VySW5mbykgPT4ge1xyXG4gICAgICAgICAgICBjYWxsYmFjayhudWxsLCB1c2VySW5mbyk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxuLy8g5rOo5YaMXHJcbmV4cG9ydCBmdW5jdGlvbiByZWdpc3QoKSB7XHJcbiAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgY29uc3Qge1xyXG4gICAgaXYsXHJcbiAgICBlbmNyeXB0ZWREYXRhLFxyXG4gICAgc2Vzc2lvbklkXHJcbiAgfSA9IHNlbGYuZ2xvYmFsRGF0YTtcclxuXHJcbiAgY29uc29sZS5sb2coc2VsZi5nbG9iYWxEYXRhKTtcclxuICBwb3N0KCcvd2VjaGF0L2RlY29kZVVzZXJJbmZvLycsIHtcclxuICAgIGl2LFxyXG4gICAgc2Vzc2lvbklkLFxyXG4gICAgZW5jcnlwdGVkRGF0YVxyXG4gIH0sIChlLCByZXMpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKGUsIHJlcyk7XHJcbiAgICBpZiAoZSkge1xyXG4gICAgICBhbGVydCgn5rOo5YaM5aSx6LSl77yM6K+35Yig6Zmk5bCP56iL5bqP5ZCO6YeN5paw5omT5byA44CCJyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuZXhwb3J0IGNvbnN0IGdldE1hcHBEZXRhaWwgPSAoeyB1c2VySWQsIGFwcElkLCByZWxlYXNlSWQgfSA9IHt9KSA9PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGdldCgnL3NlYXJjaC9kZXRhaWwnLCB7IHVzZXJJZCwgYXBwSWQsIHJlbGVhc2VJZCB9LCAoZXJyLCByZXMpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVyciB8fCAhcmVzKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgn6K+l5bCP56iL5bqP5bey5LiL57q/77yBJyk7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxufVxyXG5jb25zdCB1dGlscyA9IHtcclxuICAgIGdsb2JhbERhdGEsXHJcbiAgICBjbGVhclNlc3Npb25JZCxcclxuICAgIGdldFNlc3Npb25JZCxcclxuICAgIGdldENvZGUsXHJcbiAgICBnZXRVc2VySW5mbyxcclxuICAgIG9wZW5TZXR0aW5nLFxyXG4gICAgcmVnaXN0XHJcbiB9O1xyXG4gZXhwb3J0IGRlZmF1bHQgdXRpbHM7IFxyXG4iXX0=
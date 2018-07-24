'use strict';

// pages/mod/consumerButton/consumerButton.js
/*eslint-disable */
var app = getApp();

var _require = require('./../../../utils/index.js'),
    toast = _require.toast,
    alert = _require.alert;

var _require2 = require('./../../../utils/http.js'),
    get = _require2.get,
    post = _require2.post;

var _require3 = require('./../../../utils/ajax.js'),
    ajax = _require3.ajax;

var _require4 = require('./../../../utils/event.js'),
    bindEvent = _require4.bindEvent,
    emitEvent = _require4.emitEvent;

Component({
    externalClasses: ['my-class'],
    properties: {
        openType: {
            type: String,
            value: ''
        },
        url: {
            type: String,
            value: ''
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        bindGetUserInfo: function bindGetUserInfo(e) {
            var _this = this;
            if (e.detail.errMsg == 'getUserInfo:ok') {
                var _e$detail = e.detail,
                    userInfo = _e$detail.userInfo,
                    rawData = _e$detail.rawData,
                    signature = _e$detail.signature,
                    encryptedData = _e$detail.encryptedData,
                    iv = _e$detail.iv;

                this.regist({ iv: iv, encryptedData: encryptedData }, function (e, res) {
                    if (e) {
                        alert(e);
                        return;
                    }
                    emitEvent('consumerRegister', userInfo);
                    Object.assign(app.globalData, {
                        userInfo: userInfo
                    });
                    _this.doCallback();
                });
            } else {
                console.log(e.detail.errMsg);
                alert('由于您拒绝了授权，后续功能不能使用。');
            }
        },
        doCallback: function doCallback() {
            var _data = this.data,
                openType = _data.openType,
                url = _data.url,
                consumerId = _data.consumerId;

            if (!url) {
                this.triggerEvent('consumersubmit', { consumerId: consumerId });
                return;
            }
            if (openType == 'switchTab') {
                wx.switchTab({
                    url: url
                });
            } else {
                wx.navigateTo({
                    url: url
                });
            }
        },
        setLoginStatus: function setLoginStatus(logining) {
            Object.assign(app.globalData, {
                logining: logining
            });
        },

        // 获取consumerId
        getConsumerId: function getConsumerId(callback) {
            var self = this;
            var _app$globalData = app.globalData,
                consumerId = _app$globalData.consumerId,
                _app$globalData$login = _app$globalData.logining,
                logining = _app$globalData$login === undefined ? false : _app$globalData$login;

            if (consumerId) {
                callback(null, consumerId);
                return;
            }
            if (logining) return;
            self.setLoginStatus(true);
            this.getCode(function (e, code) {
                if (e) {
                    self.setLoginStatus(false);
                    callback && callback(e);
                    return;
                }
                if (app.globalData.env58) {
                    ajax('/wechat/getSession/', { code: code }, function (e, res) {
                        self.setLoginStatus(false);
                        if (e) {
                            callback(e);
                            return;
                        }
                        var _res$data = res.data,
                            openid = _res$data.openid,
                            session = _res$data.session;

                        app.globalData.consumerId = session;

                        callback(null, session);
                    });
                    return;
                }
                get('/wechat/getSession/', { code: code }, function (e, res) {
                    self.setLoginStatus(false);
                    if (e) {
                        callback(e);
                        return;
                    }
                    var openid = res.openid,
                        session = res.session;

                    app.globalData.consumerId = session;

                    callback(null, session);
                });
            });
        },

        // 获取code
        getCode: function getCode(callback) {
            var self = this;
            wx.login({
                success: function success(data) {
                    callback(null, data.code);
                },
                fail: function fail(err) {
                    console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err);
                    callback(err);
                }
            });
        },

        // 注册
        regist: function regist(data, callback) {
            var self = this;
            var formData = Object.assign({}, data, {
                session: this.data.consumerId
            });
            post('/wechat/decodeUserInfo/', formData, function (e, res) {
                console.log(e, res);
                if (e) {
                    callback && callback(e);
                } else {
                    callback && callback(null, res);
                }
            });
        }
    },
    attached: function attached() {
        var _app$globalData2 = app.globalData,
            _app$globalData2$cons = _app$globalData2.consumerId,
            consumerId = _app$globalData2$cons === undefined ? 0 : _app$globalData2$cons,
            _app$globalData2$user = _app$globalData2.userInfo,
            userInfo = _app$globalData2$user === undefined ? 0 : _app$globalData2$user;

        this.setData({
            consumerId: consumerId,
            userInfo: userInfo
        });
        var _this = this;
        bindEvent('consumerLogin', function (consumerId) {
            _this.setData({
                consumerId: consumerId
            });
        });
        bindEvent('consumerRegister', function (userInfo) {
            _this.setData({
                userInfo: userInfo
            });
        });
        this.getConsumerId(function (e, consumerId) {
            if (e) {
                toast(e);
                return;
            }
            emitEvent('consumerLogin', consumerId);
        });
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnN1bWVyQnV0dG9uLmpzIl0sIm5hbWVzIjpbImFwcCIsImdldEFwcCIsInJlcXVpcmUiLCJ0b2FzdCIsImFsZXJ0IiwiZ2V0IiwicG9zdCIsImFqYXgiLCJiaW5kRXZlbnQiLCJlbWl0RXZlbnQiLCJDb21wb25lbnQiLCJleHRlcm5hbENsYXNzZXMiLCJwcm9wZXJ0aWVzIiwib3BlblR5cGUiLCJ0eXBlIiwiU3RyaW5nIiwidmFsdWUiLCJ1cmwiLCJtZXRob2RzIiwiYmluZEdldFVzZXJJbmZvIiwiZSIsIl90aGlzIiwiZGV0YWlsIiwiZXJyTXNnIiwidXNlckluZm8iLCJyYXdEYXRhIiwic2lnbmF0dXJlIiwiZW5jcnlwdGVkRGF0YSIsIml2IiwicmVnaXN0IiwicmVzIiwiT2JqZWN0IiwiYXNzaWduIiwiZ2xvYmFsRGF0YSIsImRvQ2FsbGJhY2siLCJjb25zb2xlIiwibG9nIiwiZGF0YSIsImNvbnN1bWVySWQiLCJ0cmlnZ2VyRXZlbnQiLCJ3eCIsInN3aXRjaFRhYiIsIm5hdmlnYXRlVG8iLCJzZXRMb2dpblN0YXR1cyIsImxvZ2luaW5nIiwiZ2V0Q29uc3VtZXJJZCIsImNhbGxiYWNrIiwic2VsZiIsImdldENvZGUiLCJjb2RlIiwiZW52NTgiLCJvcGVuaWQiLCJzZXNzaW9uIiwibG9naW4iLCJzdWNjZXNzIiwiZmFpbCIsImVyciIsImZvcm1EYXRhIiwiYXR0YWNoZWQiLCJzZXREYXRhIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQSxJQUFNQSxNQUFNQyxRQUFaOztlQUN5QkMsUUFBUSxzQkFBUixDO0lBQWpCQyxLLFlBQUFBLEs7SUFBT0MsSyxZQUFBQSxLOztnQkFDT0YsUUFBUSxxQkFBUixDO0lBQWRHLEcsYUFBQUEsRztJQUFLQyxJLGFBQUFBLEk7O2dCQUNJSixRQUFRLHFCQUFSLEM7SUFBVEssSSxhQUFBQSxJOztnQkFDeUJMLFFBQVEsc0JBQVIsQztJQUF6Qk0sUyxhQUFBQSxTO0lBQVdDLFMsYUFBQUEsUzs7QUFFbkJDLFVB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QUFDekIsQ0FBRCxFQUFJa0IsVUFBSixFQUFtQjtBQUNsQyxnQkFBSWxCLENBQUosRUFBTztBQUNIakIsc0JBQU1pQixDQUFOO0FBQ0E7QUFDSDtBQUNEWCxzQkFBVSxlQUFWLEVBQTJCNkIsVUFBM0I7QUFDSCxTQU5EO0FBT0g7QUFsS0ssQ0FBViIsImZpbGUiOiJjb25zdW1lckJ1dHRvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHBhZ2VzL21vZC9jb25zdW1lckJ1dHRvbi9jb25zdW1lckJ1dHRvbi5qc1xuLyplc2xpbnQtZGlzYWJsZSAqL1xuY29uc3QgYXBwID0gZ2V0QXBwKCk7XG5jb25zdCB7IHRvYXN0LCBhbGVydCB9ID0gcmVxdWlyZSgnLi4vLi4vLi4vdXRpbHMvaW5kZXgnKTtcbmNvbnN0IHsgZ2V0LCBwb3N0IH0gPSByZXF1aXJlKCcuLi8uLi8uLi91dGlscy9odHRwJyk7XG5jb25zdCB7IGFqYXggfSA9IHJlcXVpcmUoJy4uLy4uLy4uL3V0aWxzL2FqYXgnKTtcbmNvbnN0IHsgYmluZEV2ZW50LCBlbWl0RXZlbnQgfSA9IHJlcXVpcmUoJy4uLy4uLy4uL3V0aWxzL2V2ZW50Jyk7XG5cbkNvbXBvbmVudCh7XG4gICAgZXh0ZXJuYWxDbGFzc2VzOiBbJ215LWNsYXNzJ10sXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBvcGVuVHlwZToge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICB9LFxuICAgICAgICB1cmw6IHtcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOe7hOS7tueahOaWueazleWIl+ihqFxuICAgICAqL1xuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgYmluZEdldFVzZXJJbmZvKGUpIHtcbiAgICAgICAgICAgIGNvbnN0IF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIGlmIChlLmRldGFpbC5lcnJNc2cgPT0gJ2dldFVzZXJJbmZvOm9rJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlckluZm8sXG4gICAgICAgICAgICAgICAgICAgIHJhd0RhdGEsXG4gICAgICAgICAgICAgICAgICAgIHNpZ25hdHVyZSxcbiAgICAgICAgICAgICAgICAgICAgZW5jcnlwdGVkRGF0YSxcbiAgICAgICAgICAgICAgICAgICAgaXYsXG4gICAgICAgICAgICAgICAgfSA9IGUuZGV0YWlsO1xuICAgICAgICAgICAgICAgIHRoaXMucmVnaXN0KHsgaXYsIGVuY3J5cHRlZERhdGEgfSwgKGUsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZW1pdEV2ZW50KCdjb25zdW1lclJlZ2lzdGVyJywgdXNlckluZm8pO1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGFwcC5nbG9iYWxEYXRhLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySW5mbyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmRvQ2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZS5kZXRhaWwuZXJyTXNnKTtcbiAgICAgICAgICAgICAgICBhbGVydCgn55Sx5LqO5oKo5ouS57ud5LqG5o6I5p2D77yM5ZCO57ut5Yqf6IO95LiN6IO95L2/55So44CCJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRvQ2FsbGJhY2soKSB7XG4gICAgICAgICAgICBjb25zdCB7IG9wZW5UeXBlLCB1cmwsIGNvbnN1bWVySWQgfSA9IHRoaXMuZGF0YTtcbiAgICAgICAgICAgIGlmICghdXJsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoJ2NvbnN1bWVyc3VibWl0JywgeyBjb25zdW1lcklkIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcGVuVHlwZSA9PSAnc3dpdGNoVGFiJykge1xuICAgICAgICAgICAgICAgIHd4LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc2V0TG9naW5TdGF0dXMobG9naW5pbmcpIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oYXBwLmdsb2JhbERhdGEsIHtcbiAgICAgICAgICAgICAgICBsb2dpbmluZyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICAvLyDojrflj5Zjb25zdW1lcklkXG4gICAgICAgIGdldENvbnN1bWVySWQoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgY29uc3QgeyBjb25zdW1lcklkLCBsb2dpbmluZyA9IGZhbHNlIH0gPSBhcHAuZ2xvYmFsRGF0YTtcbiAgICAgICAgICAgIGlmIChjb25zdW1lcklkKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgY29uc3VtZXJJZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxvZ2luaW5nKSByZXR1cm47XG4gICAgICAgICAgICBzZWxmLnNldExvZ2luU3RhdHVzKHRydWUpO1xuICAgICAgICAgICAgdGhpcy5nZXRDb2RlKChlLCBjb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRMb2dpblN0YXR1cyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChhcHAuZ2xvYmFsRGF0YS5lbnY1OCkge1xuICAgICAgICAgICAgICAgICAgICBhamF4KCcvd2VjaGF0L2dldFNlc3Npb24vJywgeyBjb2RlIH0sIChlLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0TG9naW5TdGF0dXMoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IG9wZW5pZCwgc2Vzc2lvbiB9ID0gcmVzLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcHAuZ2xvYmFsRGF0YS5jb25zdW1lcklkID0gc2Vzc2lvbjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgc2Vzc2lvbik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGdldCgnL3dlY2hhdC9nZXRTZXNzaW9uLycsIHsgY29kZSB9LCAoZSwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0TG9naW5TdGF0dXMoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBvcGVuaWQsIHNlc3Npb24gfSA9IHJlcztcbiAgICAgICAgICAgICAgICAgICAgYXBwLmdsb2JhbERhdGEuY29uc3VtZXJJZCA9IHNlc3Npb247XG5cbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgc2Vzc2lvbik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgLy8g6I635Y+WY29kZVxuICAgICAgICBnZXRDb2RlKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHd4LmxvZ2luKHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgZGF0YS5jb2RlKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZhaWwoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3d4LmxvZ2luIOaOpeWPo+iwg+eUqOWksei0pe+8jOWwhuaXoOazleato+W4uOS9v+eUqOW8gOaUvuaOpeWPo+etieacjeWKoScsXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnIsXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICAvLyDms6jlhoxcbiAgICAgICAgcmVnaXN0KGRhdGEsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIGNvbnN0IGZvcm1EYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgZGF0YSwge1xuICAgICAgICAgICAgICAgIHNlc3Npb246IHRoaXMuZGF0YS5jb25zdW1lcklkLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBwb3N0KCcvd2VjaGF0L2RlY29kZVVzZXJJbmZvLycsIGZvcm1EYXRhLCAoZSwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSwgcmVzKTtcbiAgICAgICAgICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhudWxsLCByZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgIH0sXG4gICAgYXR0YWNoZWQoKSB7XG4gICAgICAgIGNvbnN0IHsgY29uc3VtZXJJZCA9IDAsIHVzZXJJbmZvID0gMCB9ID0gYXBwLmdsb2JhbERhdGE7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBjb25zdW1lcklkLFxuICAgICAgICAgICAgdXNlckluZm8sXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGJpbmRFdmVudCgnY29uc3VtZXJMb2dpbicsIGNvbnN1bWVySWQgPT4ge1xuICAgICAgICAgICAgX3RoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgY29uc3VtZXJJZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgYmluZEV2ZW50KCdjb25zdW1lclJlZ2lzdGVyJywgdXNlckluZm8gPT4ge1xuICAgICAgICAgICAgX3RoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgdXNlckluZm8sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZ2V0Q29uc3VtZXJJZCgoZSwgY29uc3VtZXJJZCkgPT4ge1xuICAgICAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICAgICAgICB0b2FzdChlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbWl0RXZlbnQoJ2NvbnN1bWVyTG9naW4nLCBjb25zdW1lcklkKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbn0pO1xuIl19
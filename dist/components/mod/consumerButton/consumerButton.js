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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnN1bWVyQnV0dG9uLmpzIl0sIm5hbWVzIjpbImFwcCIsImdldEFwcCIsInJlcXVpcmUiLCJ0b2FzdCIsImFsZXJ0IiwiZ2V0IiwicG9zdCIsImFqYXgiLCJiaW5kRXZlbnQiLCJlbWl0RXZlbnQiLCJDb21wb25lbnQiLCJleHRlcm5hbENsYXNzZXMiLCJwcm9wZXJ0aWVzIiwib3BlblR5cGUiLCJ0eXBlIiwiU3RyaW5nIiwidmFsdWUiLCJ1cmwiLCJtZXRob2RzIiwiYmluZEdldFVzZXJJbmZvIiwiZSIsIl90aGlzIiwiZGV0YWlsIiwiZXJyTXNnIiwidXNlckluZm8iLCJyYXdEYXRhIiwic2lnbmF0dXJlIiwiZW5jcnlwdGVkRGF0YSIsIml2IiwicmVnaXN0IiwicmVzIiwiT2JqZWN0IiwiYXNzaWduIiwiZ2xvYmFsRGF0YSIsImRvQ2FsbGJhY2siLCJjb25zb2xlIiwibG9nIiwiZGF0YSIsImNvbnN1bWVySWQiLCJ0cmlnZ2VyRXZlbnQiLCJ3eCIsInN3aXRjaFRhYiIsIm5hdmlnYXRlVG8iLCJzZXRMb2dpblN0YXR1cyIsImxvZ2luaW5nIiwiZ2V0Q29uc3VtZXJJZCIsImNhbGxiYWNrIiwic2VsZiIsImdldENvZGUiLCJjb2RlIiwiZW52NTgiLCJvcGVuaWQiLCJzZXNzaW9uIiwibG9naW4iLCJzdWNjZXNzIiwiZmFpbCIsImVyciIsImZvcm1EYXRhIiwiYXR0YWNoZWQiLCJzZXREYXRhIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQSxJQUFNQSxNQUFNQyxRQUFaOztlQUN5QkMsUUFBUSxzQkFBUixDO0lBQWpCQyxLLFlBQUFBLEs7SUFBT0MsSyxZQUFBQSxLOztnQkFDT0YsUUFBUSxxQkFBUixDO0lBQWRHLEcsYUFBQUEsRztJQUFLQyxJLGFBQUFBLEk7O2dCQUNJSixRQUFRLHFCQUFSLEM7SUFBVEssSSxhQUFBQSxJOztnQkFDeUJMLFFBQVEsc0JBQVIsQztJQUF6Qk0sUyxhQUFBQSxTO0lBQVdDLFMsYUFBQUEsUzs7QUFFbkJDLFVB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QUFDekIsQ0FBRCxFQUFJa0IsVUFBSixFQUFtQjtBQUNsQyxnQkFBSWxCLENBQUosRUFBTztBQUNIakIsc0JBQU1pQixDQUFOO0FBQ0E7QUFDSDtBQUNEWCxzQkFBVSxlQUFWLEVBQTJCNkIsVUFBM0I7QUFDSCxTQU5EO0FBT0g7QUFsS0ssQ0FBViIsImZpbGUiOiJjb25zdW1lckJ1dHRvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHBhZ2VzL21vZC9jb25zdW1lckJ1dHRvbi9jb25zdW1lckJ1dHRvbi5qc1xyXG4vKmVzbGludC1kaXNhYmxlICovXHJcbmNvbnN0IGFwcCA9IGdldEFwcCgpO1xyXG5jb25zdCB7IHRvYXN0LCBhbGVydCB9ID0gcmVxdWlyZSgnLi4vLi4vLi4vdXRpbHMvaW5kZXgnKTtcclxuY29uc3QgeyBnZXQsIHBvc3QgfSA9IHJlcXVpcmUoJy4uLy4uLy4uL3V0aWxzL2h0dHAnKTtcclxuY29uc3QgeyBhamF4IH0gPSByZXF1aXJlKCcuLi8uLi8uLi91dGlscy9hamF4Jyk7XHJcbmNvbnN0IHsgYmluZEV2ZW50LCBlbWl0RXZlbnQgfSA9IHJlcXVpcmUoJy4uLy4uLy4uL3V0aWxzL2V2ZW50Jyk7XHJcblxyXG5Db21wb25lbnQoe1xyXG4gICAgZXh0ZXJuYWxDbGFzc2VzOiBbJ215LWNsYXNzJ10sXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgb3BlblR5cGU6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICB2YWx1ZTogJycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB1cmw6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICB2YWx1ZTogJycsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIOe7hOS7tueahOaWueazleWIl+ihqFxyXG4gICAgICovXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgYmluZEdldFVzZXJJbmZvKGUpIHtcclxuICAgICAgICAgICAgY29uc3QgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoZS5kZXRhaWwuZXJyTXNnID09ICdnZXRVc2VySW5mbzpvaycpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VySW5mbyxcclxuICAgICAgICAgICAgICAgICAgICByYXdEYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHNpZ25hdHVyZSxcclxuICAgICAgICAgICAgICAgICAgICBlbmNyeXB0ZWREYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIGl2LFxyXG4gICAgICAgICAgICAgICAgfSA9IGUuZGV0YWlsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWdpc3QoeyBpdiwgZW5jcnlwdGVkRGF0YSB9LCAoZSwgcmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZW1pdEV2ZW50KCdjb25zdW1lclJlZ2lzdGVyJywgdXNlckluZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oYXBwLmdsb2JhbERhdGEsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlckluZm8sXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZG9DYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlLmRldGFpbC5lcnJNc2cpO1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ+eUseS6juaCqOaLkue7neS6huaOiOadg++8jOWQjue7reWKn+iDveS4jeiDveS9v+eUqOOAgicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkb0NhbGxiYWNrKCkge1xyXG4gICAgICAgICAgICBjb25zdCB7IG9wZW5UeXBlLCB1cmwsIGNvbnN1bWVySWQgfSA9IHRoaXMuZGF0YTtcclxuICAgICAgICAgICAgaWYgKCF1cmwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KCdjb25zdW1lcnN1Ym1pdCcsIHsgY29uc3VtZXJJZCB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAob3BlblR5cGUgPT0gJ3N3aXRjaFRhYicpIHtcclxuICAgICAgICAgICAgICAgIHd4LnN3aXRjaFRhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmwsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0TG9naW5TdGF0dXMobG9naW5pbmcpIHtcclxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihhcHAuZ2xvYmFsRGF0YSwge1xyXG4gICAgICAgICAgICAgICAgbG9naW5pbmcsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8g6I635Y+WY29uc3VtZXJJZFxyXG4gICAgICAgIGdldENvbnN1bWVySWQoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgY29uc3VtZXJJZCwgbG9naW5pbmcgPSBmYWxzZSB9ID0gYXBwLmdsb2JhbERhdGE7XHJcbiAgICAgICAgICAgIGlmIChjb25zdW1lcklkKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCBjb25zdW1lcklkKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobG9naW5pbmcpIHJldHVybjtcclxuICAgICAgICAgICAgc2VsZi5zZXRMb2dpblN0YXR1cyh0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5nZXRDb2RlKChlLCBjb2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0TG9naW5TdGF0dXMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhcHAuZ2xvYmFsRGF0YS5lbnY1OCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFqYXgoJy93ZWNoYXQvZ2V0U2Vzc2lvbi8nLCB7IGNvZGUgfSwgKGUsIHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldExvZ2luU3RhdHVzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgb3BlbmlkLCBzZXNzaW9uIH0gPSByZXMuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwLmdsb2JhbERhdGEuY29uc3VtZXJJZCA9IHNlc3Npb247XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCBzZXNzaW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBnZXQoJy93ZWNoYXQvZ2V0U2Vzc2lvbi8nLCB7IGNvZGUgfSwgKGUsIHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0TG9naW5TdGF0dXMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgb3BlbmlkLCBzZXNzaW9uIH0gPSByZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLmdsb2JhbERhdGEuY29uc3VtZXJJZCA9IHNlc3Npb247XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHNlc3Npb24pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8g6I635Y+WY29kZVxyXG4gICAgICAgIGdldENvZGUoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHd4LmxvZ2luKHtcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIGRhdGEuY29kZSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3d4LmxvZ2luIOaOpeWPo+iwg+eUqOWksei0pe+8jOWwhuaXoOazleato+W4uOS9v+eUqOW8gOaUvuaOpeWPo+etieacjeWKoScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycixcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIOazqOWGjFxyXG4gICAgICAgIHJlZ2lzdChkYXRhLCBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgY29uc3QgZm9ybURhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhLCB7XHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uOiB0aGlzLmRhdGEuY29uc3VtZXJJZCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHBvc3QoJy93ZWNoYXQvZGVjb2RlVXNlckluZm8vJywgZm9ybURhdGEsIChlLCByZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUsIHJlcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhudWxsLCByZXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIGF0dGFjaGVkKCkge1xyXG4gICAgICAgIGNvbnN0IHsgY29uc3VtZXJJZCA9IDAsIHVzZXJJbmZvID0gMCB9ID0gYXBwLmdsb2JhbERhdGE7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgY29uc3VtZXJJZCxcclxuICAgICAgICAgICAgdXNlckluZm8sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGJpbmRFdmVudCgnY29uc3VtZXJMb2dpbicsIGNvbnN1bWVySWQgPT4ge1xyXG4gICAgICAgICAgICBfdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIGNvbnN1bWVySWQsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGJpbmRFdmVudCgnY29uc3VtZXJSZWdpc3RlcicsIHVzZXJJbmZvID0+IHtcclxuICAgICAgICAgICAgX3RoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICB1c2VySW5mbyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5nZXRDb25zdW1lcklkKChlLCBjb25zdW1lcklkKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlKSB7XHJcbiAgICAgICAgICAgICAgICB0b2FzdChlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbWl0RXZlbnQoJ2NvbnN1bWVyTG9naW4nLCBjb25zdW1lcklkKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=
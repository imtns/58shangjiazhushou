'use strict';

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _utils = require('./index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var host = 'https://yaofa.58.com';

var http = function http(method) {
    for (var _len = arguments.length, props = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        props[_key - 1] = arguments[_key];
    }

    return new Promise(function (resolve, reject) {
        var url = props[0],
            data = props[1],
            callback = props[2];

        if (typeof data === 'function') {
            callback = data;
            data = {};
        }
        // test="test"字段是为切换测试和线上环境的，如果提交审核和发布，将test改为''，标识切换为线上环境
        var sendData = Object.assign({}, data);
        // ppu加入header
        var ppu = wx.getStorageSync('ppu');
        console.log('请求接口', url);
        console.log('请求参数', sendData);
        wx.showLoading && wx.showLoading({ title: '加载中', mask: true });
        return wx.request({
            url: host + url + (~url.indexOf('?') ? '' : '?') + (+new Date()).toString(36).substr(3),
            data: sendData,
            method: method,
            dataType: 'json',
            header: {
                'content-type': method === 'GET' ? 'application/json' : 'application/x-www-form-urlencoded;charset=utf-8',
                PPU: ppu || 'wanghongyue',
                'YkuYdY8rk5As4T2QaJ7v': '45797966958100',
                'reqfrom': 'biz_assistant'
            },
            success: function success(response) {
                console.log('response', response);
                var _response$data = response.data,
                    state = _response$data.state,
                    msg = _response$data.msg,
                    data = _response$data.data;

                if (state === 100) {
                    resolve(response.data);
                    // callback && callback(null, response.data);
                } else if (state == -10001) {
                    (0, _utils.toast)(msg);
                    setTimeout(function () {
                        _wepy2.default.reLaunch({
                            url: '../pages/intro'
                        });
                    }, 1000);
                    reject(msg);
                    // callback && callback(null, response.data);
                } else {
                    reject(msg);
                    // callback && callback(msg);
                }
            },
            fail: function fail(e) {
                reject(e);
                callback && callback(e);
            },
            complete: function complete() {
                wx.hideLoading && wx.hideLoading();
            }
        });
    });
};

module.exports.get = function () {
    for (var _len2 = arguments.length, props = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        props[_key2] = arguments[_key2];
    }

    return http.apply(undefined, ['GET'].concat(props));
};

module.exports.post = function () {
    for (var _len3 = arguments.length, props = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        props[_key3] = arguments[_key3];
    }

    return http.apply(undefined, ['POST'].concat(props));
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFqYXguanMiXSwibmFtZXMiOlsiaG9zdCIsImh0dHAiLCJtZXRob2QiLCJwcm9wcyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwidXJsIiwiZGF0YSIsImNhbGxiYWNrIiwic2VuZERhdGEiLCJPYmplY3QiLCJhc3NpZ24iLCJwcHUiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwiY29uc29sZSIsImxvZyIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJtYXNrIiwicmVxdWVzdCIsImluZGV4T2YiLCJEYXRlIiwidG9TdHJpbmciLCJzdWJzdHIiLCJkYXRhVHlwZSIsImhlYWRlciIsIlBQVSIsInN1Y2Nlc3MiLCJyZXNwb25zZSIsInN0YXRlIiwibXNnIiwic2V0VGltZW91dCIsIndlcHkiLCJyZUxhdW5jaCIsImZhaWwiLCJlIiwiY29tcGxldGUiLCJoaWRlTG9hZGluZyIsIm1vZHVsZSIsImV4cG9ydHMiLCJnZXQiLCJwb3N0Il0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNQSxPQUFPLHNCQUFiOztBQUVBLElBQU1DLE9BQU8sU0FBUEEsSUFBTyxDQUFDQyxNQUFEO0FBQUEsc0NBQVlDLEtBQVo7QUFBWUEsYUFBWjtBQUFBOztBQUFBLFdBQXNCLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFBQSxZQUMzREMsR0FEMkQsR0FDcENKLEtBRG9DO0FBQUEsWUFDdERLLElBRHNELEdBQ3BDTCxLQURvQztBQUFBLFlBQ2hETSxRQURnRCxHQUNwQ04sS0FEb0M7O0FBRWhFLFlBQUksT0FBT0ssSUFBUCxLQUFnQixVQUFwQixFQUFnQztBQUM1QkMsdUJBQVdELElBQVg7QUFDQUEsbUJBQU8sRUFBUDtBQUNIO0FBQ0Q7QUFDQSxZQUFNRSxXQUFXQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQkosSUFBbEIsQ0FBakI7QUFDQTtBQUNBLFlBQU1LLE1BQU1DLEdBQUdDLGNBQUgsQ0FBa0IsS0FBbEIsQ0FBWjtBQUNBQyxnQkFBUUMsR0FBUixDQUFZLE1BQVosRUFBb0JWLEdBQXBCO0FBQ0FTLGdCQUFRQyxHQUFSLENBQVksTUFBWixFQUFvQlAsUUFBcEI7QUFDQUksV0FBR0ksV0FBSCxJQUFrQkosR0FBR0ksV0FBSCxDQUFlLEVBQUVDLE9BQU8sS0FBVCxFQUFnQkMsTUFBTSxJQUF0QixFQUFmLENBQWxCO0FBQ0EsZUFBT04sR0FBR08sT0FBSCxDQUFXO0FBQ2RkLGlCQUFLUCxPQUFPTyxHQUFQLElBQWMsQ0FBQ0EsSUFBSWUsT0FBSixDQUFZLEdBQVosQ0FBRCxHQUFvQixFQUFwQixHQUF5QixHQUF2QyxJQUE4QyxDQUFDLENBQUMsSUFBSUMsSUFBSixFQUFGLEVBQWNDLFFBQWQsQ0FBdUIsRUFBdkIsRUFBMkJDLE1BQTNCLENBQWtDLENBQWxDLENBRHJDO0FBRWRqQixrQkFBTUUsUUFGUTtBQUdkUixvQkFBUUEsTUFITTtBQUlkd0Isc0JBQVUsTUFKSTtBQUtkQyxvQkFBUTtBQUNKLGdDQUFnQnpCLFdBQVcsS0FBWCxHQUFtQixrQkFBbkIsR0FBd0MsaURBRHBEO0FBRUowQixxQkFBS2YsT0FBTyxhQUZSO0FBR0osd0NBQXdCLGdCQUhwQjtBQUlKLDJCQUFXO0FBSlAsYUFMTTtBQVdkZ0IsbUJBWGMsbUJBV05DLFFBWE0sRUFXSTtBQUNkZCx3QkFBUUMsR0FBUixDQUFZLFVBQVosRUFBd0JhLFFBQXhCO0FBRGMscUNBRWVBLFNBQVN0QixJQUZ4QjtBQUFBLG9CQUVOdUIsS0FGTSxrQkFFTkEsS0FGTTtBQUFBLG9CQUVDQyxHQUZELGtCQUVDQSxHQUZEO0FBQUEsb0JBRU14QixJQUZOLGtCQUVNQSxJQUZOOztBQUdkLG9CQUFJdUIsVUFBVSxHQUFkLEVBQW1CO0FBQ2YxQiw0QkFBUXlCLFNBQVN0QixJQUFqQjtBQUNBO0FBQ0gsaUJBSEQsTUFHTyxJQUFJdUIsU0FBUyxDQUFDLEtBQWQsRUFBcUI7QUFDeEIsc0NBQU1DLEdBQU47QUFDQUMsK0JBQVcsWUFBTTtBQUNiQyx1Q0FBS0MsUUFBTCxDQUFjO0FBQ1Y1QixpQ0FBSztBQURLLHlCQUFkO0FBR0gscUJBSkQsRUFJRyxJQUpIO0FBS0FELDJCQUFPMEIsR0FBUDtBQUNBO0FBQ0gsaUJBVE0sTUFTQTtBQUNIMUIsMkJBQU8wQixHQUFQO0FBQ0E7QUFDSDtBQUNKLGFBOUJhO0FBK0JkSSxnQkEvQmMsZ0JBK0JUQyxDQS9CUyxFQStCTjtBQUNKL0IsdUJBQU8rQixDQUFQO0FBQ0E1Qiw0QkFBWUEsU0FBUzRCLENBQVQsQ0FBWjtBQUNILGFBbENhO0FBbUNkQyxvQkFuQ2Msc0JBbUNIO0FBQ1B4QixtQkFBR3lCLFdBQUgsSUFBa0J6QixHQUFHeUIsV0FBSCxFQUFsQjtBQUNIO0FBckNhLFNBQVgsQ0FBUDtBQXVDSCxLQXBEa0MsQ0FBdEI7QUFBQSxDQUFiOztBQXNEQUMsT0FBT0MsT0FBUCxDQUFlQyxHQUFmLEdBQXFCO0FBQUEsdUNBQUl2QyxLQUFKO0FBQUlBLGFBQUo7QUFBQTs7QUFBQSxXQUFjRix1QkFBSyxLQUFMLFNBQWVFLEtBQWYsRUFBZDtBQUFBLENBQXJCOztBQUVBcUMsT0FBT0MsT0FBUCxDQUFlRSxJQUFmLEdBQXNCO0FBQUEsdUNBQUl4QyxLQUFKO0FBQUlBLGFBQUo7QUFBQTs7QUFBQSxXQUFjRix1QkFBSyxNQUFMLFNBQWdCRSxLQUFoQixFQUFkO0FBQUEsQ0FBdEIiLCJmaWxlIjoiYWpheC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgeyB0b2FzdCB9IGZyb20gJy4uL3V0aWxzJztcclxuXHJcbmNvbnN0IGhvc3QgPSAnaHR0cHM6Ly95YW9mYS41OC5jb20nO1xyXG5cclxuY29uc3QgaHR0cCA9IChtZXRob2QsIC4uLnByb3BzKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICBsZXQgW3VybCwgZGF0YSwgY2FsbGJhY2tdID0gcHJvcHM7XHJcbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBjYWxsYmFjayA9IGRhdGE7XHJcbiAgICAgICAgZGF0YSA9IHt9O1xyXG4gICAgfVxyXG4gICAgLy8gdGVzdD1cInRlc3RcIuWtl+auteaYr+S4uuWIh+aNoua1i+ivleWSjOe6v+S4iueOr+Wig+eahO+8jOWmguaenOaPkOS6pOWuoeaguOWSjOWPkeW4g++8jOWwhnRlc3TmlLnkuLonJ++8jOagh+ivhuWIh+aNouS4uue6v+S4iueOr+Wig1xyXG4gICAgY29uc3Qgc2VuZERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhKTtcclxuICAgIC8vIHBwdeWKoOWFpWhlYWRlclxyXG4gICAgY29uc3QgcHB1ID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3BwdScpO1xyXG4gICAgY29uc29sZS5sb2coJ+ivt+axguaOpeWPoycsIHVybCk7XHJcbiAgICBjb25zb2xlLmxvZygn6K+35rGC5Y+C5pWwJywgc2VuZERhdGEpO1xyXG4gICAgd3guc2hvd0xvYWRpbmcgJiYgd3guc2hvd0xvYWRpbmcoeyB0aXRsZTogJ+WKoOi9veS4rScsIG1hc2s6IHRydWUgfSk7XHJcbiAgICByZXR1cm4gd3gucmVxdWVzdCh7XHJcbiAgICAgICAgdXJsOiBob3N0ICsgdXJsICsgKH51cmwuaW5kZXhPZignPycpID8gJycgOiAnPycpICsgKCtuZXcgRGF0ZSgpKS50b1N0cmluZygzNikuc3Vic3RyKDMpLFxyXG4gICAgICAgIGRhdGE6IHNlbmREYXRhLFxyXG4gICAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiBtZXRob2QgPT09ICdHRVQnID8gJ2FwcGxpY2F0aW9uL2pzb24nIDogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAgICAgUFBVOiBwcHUgfHwgJ3dhbmdob25neXVlJyxcclxuICAgICAgICAgICAgJ1lrdVlkWThyazVBczRUMlFhSjd2JzogJzQ1Nzk3OTY2OTU4MTAwJyxcclxuICAgICAgICAgICAgJ3JlcWZyb20nOiAnYml6X2Fzc2lzdGFudCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXNwb25zZScsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgY29uc3QgeyBzdGF0ZSwgbXNnLCBkYXRhIH0gPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgICBpZiAoc3RhdGUgPT09IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZS5kYXRhKTtcclxuICAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrICYmIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09IC0xMDAwMSkge1xyXG4gICAgICAgICAgICAgICAgdG9hc3QobXNnKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHdlcHkucmVMYXVuY2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcuLi9wYWdlcy9pbnRybycsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgICAgIHJlamVjdChtc2cpO1xyXG4gICAgICAgICAgICAgICAgLy8gY2FsbGJhY2sgJiYgY2FsbGJhY2sobnVsbCwgcmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QobXNnKTtcclxuICAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrICYmIGNhbGxiYWNrKG1zZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGZhaWwoZSkge1xyXG4gICAgICAgICAgICByZWplY3QoZSk7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcGxldGUoKSB7XHJcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nICYmIHd4LmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzLmdldCA9ICguLi5wcm9wcykgPT4gaHR0cCgnR0VUJywgLi4ucHJvcHMpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMucG9zdCA9ICguLi5wcm9wcykgPT4gaHR0cCgnUE9TVCcsIC4uLnByb3BzKTtcclxuIl19
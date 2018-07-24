'use strict';

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _utils = require('./index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */

var host = 'https://yaofa.58.com';

var http = function http(method) {
    for (var _len = arguments.length, props = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        props[_key - 1] = arguments[_key];
    }

    return new Promise(function (resolve, reject) {
        var url = props[0],
            data = props[1],
            callback = props[2],
            loadingControl = props[3];

        if (typeof data === 'function') {
            callback = data;
            data = {};
        }
        // loadingControl为控制loading的时间和文案的obj
        // loadingTitle标示loading的文案
        // delay标示 loading关闭时间 需要在请求成功后再次做延迟。
        var loadingTitle = '';
        var delay = 0;
        if (loadingControl) {
            loadingTitle = loadingControl.loadingTitle;
            delay = loadingControl.delay;
        }
        // test="test"字段是为切换测试和线上环境的，如果提交审核和发布，将test改为''，标识切换为线上环境
        var sendData = Object.assign({}, data, { test: 'test' });
        // ppu加入header
        var ppu = wx.getStorageSync('ppu');
        console.log('请求接口', url);
        console.log('请求参数', sendData);
        wx.showLoading && wx.showLoading({ title: loadingTitle || '加载中', mask: true });
        return wx.request({
            url: host + url + (~url.indexOf('?') ? '' : '?') + (+new Date()).toString(36).substr(3),
            data: sendData,
            method: method,
            dataType: 'json',
            header: {
                'content-type': method === 'GET' ? 'application/json' : 'application/x-www-form-urlencoded;charset=utf-8',
                PPU: ppu || 'wanghongyue',
                // 'YkuYdY8rk5As4T2QaJ7v': '45797966958100',
                reqfrom: 'biz_assistant'
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
                if (delay) {
                    setTimeout(function () {
                        wx.hideLoading && wx.hideLoading();
                    }, delay);
                } else {
                    wx.hideLoading && wx.hideLoading();
                }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFqYXguanMiXSwibmFtZXMiOlsiaG9zdCIsImh0dHAiLCJtZXRob2QiLCJwcm9wcyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwidXJsIiwiZGF0YSIsImNhbGxiYWNrIiwibG9hZGluZ0NvbnRyb2wiLCJsb2FkaW5nVGl0bGUiLCJkZWxheSIsInNlbmREYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwidGVzdCIsInBwdSIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJjb25zb2xlIiwibG9nIiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsIm1hc2siLCJyZXF1ZXN0IiwiaW5kZXhPZiIsIkRhdGUiLCJ0b1N0cmluZyIsInN1YnN0ciIsImRhdGFUeXBlIiwiaGVhZGVyIiwiUFBVIiwicmVxZnJvbSIsInN1Y2Nlc3MiLCJyZXNwb25zZSIsInN0YXRlIiwibXNnIiwic2V0VGltZW91dCIsIndlcHkiLCJyZUxhdW5jaCIsImZhaWwiLCJlIiwiY29tcGxldGUiLCJoaWRlTG9hZGluZyIsIm1vZHVsZSIsImV4cG9ydHMiLCJnZXQiLCJwb3N0Il0sIm1hcHBpbmdzIjoiOztBQUVBOzs7O0FBQ0E7Ozs7QUFIQTs7QUFLQSxJQUFNQSxPQUFPLHNCQUFiOztBQUVBLElBQU1DLE9BQU8sU0FBUEEsSUFBTyxDQUFDQyxNQUFEO0FBQUEsc0NBQVlDLEtBQVo7QUFBWUEsYUFBWjtBQUFBOztBQUFBLFdBQXNCLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFBQSxZQUMzREMsR0FEMkQsR0FDcEJKLEtBRG9CO0FBQUEsWUFDdERLLElBRHNELEdBQ3BCTCxLQURvQjtBQUFBLFlBQ2hETSxRQURnRCxHQUNwQk4sS0FEb0I7QUFBQSxZQUN0Q08sY0FEc0MsR0FDcEJQLEtBRG9COztBQUVoRSxZQUFJLE9BQU9LLElBQVAsS0FBZ0IsVUFBcEIsRUFBZ0M7QUFDNUJDLHVCQUFXRCxJQUFYO0FBQ0FBLG1CQUFPLEVBQVA7QUFDSDtBQUNEO0FBQ0E7QUFD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QUFBSUEsYUFBSjtBQUFBOztBQUFBLFdBQWNGLHVCQUFLLE1BQUwsU0FBZ0JFLEtBQWhCLEVBQWQ7QUFBQSxDQUF0QiIsImZpbGUiOiJhamF4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgKi9cblxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgeyB0b2FzdCB9IGZyb20gJy4uL3V0aWxzJztcblxuY29uc3QgaG9zdCA9ICdodHRwczovL3lhb2ZhLjU4LmNvbSc7XG5cbmNvbnN0IGh0dHAgPSAobWV0aG9kLCAuLi5wcm9wcykgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxldCBbdXJsLCBkYXRhLCBjYWxsYmFjaywgbG9hZGluZ0NvbnRyb2xdID0gcHJvcHM7XG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNhbGxiYWNrID0gZGF0YTtcbiAgICAgICAgZGF0YSA9IHt9O1xuICAgIH1cbiAgICAvLyBsb2FkaW5nQ29udHJvbOS4uuaOp+WItmxvYWRpbmfnmoTml7bpl7TlkozmlofmoYjnmoRvYmpcbiAgICAvLyBsb2FkaW5nVGl0bGXmoIfnpLpsb2FkaW5n55qE5paH5qGIXG4gICAgLy8gZGVsYXnmoIfnpLogbG9hZGluZ+WFs+mXreaXtumXtCDpnIDopoHlnKjor7fmsYLmiJDlip/lkI7lho3mrKHlgZrlu7bov5/jgIJcbiAgICBsZXQgbG9hZGluZ1RpdGxlID0gJyc7XG4gICAgbGV0IGRlbGF5ID0gMDtcbiAgICBpZiAobG9hZGluZ0NvbnRyb2wpIHtcbiAgICAgICAgbG9hZGluZ1RpdGxlID0gbG9hZGluZ0NvbnRyb2wubG9hZGluZ1RpdGxlO1xuICAgICAgICBkZWxheSA9IGxvYWRpbmdDb250cm9sLmRlbGF5O1xuICAgIH1cbiAgICAvLyB0ZXN0PVwidGVzdFwi5a2X5q615piv5Li65YiH5o2i5rWL6K+V5ZKM57q/5LiK546v5aKD55qE77yM5aaC5p6c5o+Q5Lqk5a6h5qC45ZKM5Y+R5biD77yM5bCGdGVzdOaUueS4uicn77yM5qCH6K+G5YiH5o2i5Li657q/5LiK546v5aKDXG4gICAgY29uc3Qgc2VuZERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhLCB7IHRlc3Q6ICd0ZXN0JyB9KTtcbiAgICAvLyBwcHXliqDlhaVoZWFkZXJcbiAgICBjb25zdCBwcHUgPSB3eC5nZXRTdG9yYWdlU3luYygncHB1Jyk7XG4gICAgY29uc29sZS5sb2coJ+ivt+axguaOpeWPoycsIHVybCk7XG4gICAgY29uc29sZS5sb2coJ+ivt+axguWPguaVsCcsIHNlbmREYXRhKTtcbiAgICB3eC5zaG93TG9hZGluZyAmJiB3eC5zaG93TG9hZGluZyh7IHRpdGxlOiBsb2FkaW5nVGl0bGUgfHwgJ+WKoOi9veS4rScsIG1hc2s6IHRydWUgfSk7XG4gICAgcmV0dXJuIHd4LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6IGhvc3QgKyB1cmwgKyAofnVybC5pbmRleE9mKCc/JykgPyAnJyA6ICc/JykgKyAoK25ldyBEYXRlKCkpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMyksXG4gICAgICAgIGRhdGE6IHNlbmREYXRhLFxuICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAnY29udGVudC10eXBlJzogbWV0aG9kID09PSAnR0VUJyA/ICdhcHBsaWNhdGlvbi9qc29uJyA6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXG4gICAgICAgICAgICBQUFU6IHBwdSB8fCAnd2FuZ2hvbmd5dWUnLFxuICAgICAgICAgICAgLy8gJ1lrdVlkWThyazVBczRUMlFhSjd2JzogJzQ1Nzk3OTY2OTU4MTAwJyxcbiAgICAgICAgICAgIHJlcWZyb206ICdiaXpfYXNzaXN0YW50JyxcbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2VzcyhyZXNwb25zZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3BvbnNlJywgcmVzcG9uc2UpO1xuICAgICAgICAgICAgY29uc3QgeyBzdGF0ZSwgbXNnLCBkYXRhIH0gPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgaWYgKHN0YXRlID09PSAxMDApIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrICYmIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PSAtMTAwMDEpIHtcbiAgICAgICAgICAgICAgICB0b2FzdChtc2cpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB3ZXB5LnJlTGF1bmNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy4uL3BhZ2VzL2ludHJvJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KG1zZyk7XG4gICAgICAgICAgICAgICAgLy8gY2FsbGJhY2sgJiYgY2FsbGJhY2sobnVsbCwgcmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlamVjdChtc2cpO1xuICAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrICYmIGNhbGxiYWNrKG1zZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWwoZSkge1xuICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBsZXRlKCkge1xuICAgICAgICAgICAgaWYgKGRlbGF5KSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nICYmIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nICYmIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMuZ2V0ID0gKC4uLnByb3BzKSA9PiBodHRwKCdHRVQnLCAuLi5wcm9wcyk7XG5cbm1vZHVsZS5leHBvcnRzLnBvc3QgPSAoLi4ucHJvcHMpID0+IGh0dHAoJ1BPU1QnLCAuLi5wcm9wcyk7Il19
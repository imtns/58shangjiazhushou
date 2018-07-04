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
        var sendData = Object.assign({}, data, { test: "test" });
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
                // 'YkuYdY8rk5As4T2QaJ7v': '45797966958100',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFqYXguanMiXSwibmFtZXMiOlsiaG9zdCIsImh0dHAiLCJtZXRob2QiLCJwcm9wcyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwidXJsIiwiZGF0YSIsImNhbGxiYWNrIiwic2VuZERhdGEiLCJPYmplY3QiLCJhc3NpZ24iLCJ0ZXN0IiwicHB1Iiwid3giLCJnZXRTdG9yYWdlU3luYyIsImNvbnNvbGUiLCJsb2ciLCJzaG93TG9hZGluZyIsInRpdGxlIiwibWFzayIsInJlcXVlc3QiLCJpbmRleE9mIiwiRGF0ZSIsInRvU3RyaW5nIiwic3Vic3RyIiwiZGF0YVR5cGUiLCJoZWFkZXIiLCJQUFUiLCJzdWNjZXNzIiwicmVzcG9uc2UiLCJzdGF0ZSIsIm1zZyIsInNldFRpbWVvdXQiLCJ3ZXB5IiwicmVMYXVuY2giLCJmYWlsIiwiZSIsImNvbXBsZXRlIiwiaGlkZUxvYWRpbmciLCJtb2R1bGUiLCJleHBvcnRzIiwiZ2V0IiwicG9zdCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7O0FBRUEsSUFBTUEsT0FBTyxzQkFBYjs7QUFFQSxJQUFNQyxPQUFPLFNBQVBBLElBQU8sQ0FBQ0MsTUFBRDtBQUFBLHNDQUFZQyxLQUFaO0FBQVlBLGFBQVo7QUFBQTs7QUFBQSxXQUFzQixJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQUEsWUFDM0RDLEdBRDJELEdBQ3BDSixLQURvQztBQUFBLFlBQ3RESyxJQURzRCxHQUNwQ0wsS0FEb0M7QUFBQSxZQUNoRE0sUUFEZ0QsR0FDcENOLEtBRG9DOztBQUVoRSxZQUFJLE9BQU9LLElBQVAsS0FBZ0IsVUFBcEIsRUFBZ0M7QUFDNUJDLHVCQUFXRCxJQUFYO0FBQ0FBLG1CQUFPLEVBQVA7QUFDSDtBQUNEO0FBQ0EsWUFBTUUsV0FBV0MsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JKLElBQWxCLEVBQXdCLEVBQUVLLE1BQUssTUFBUCxFQUF4QixDQUFqQjtBQUNBO0FBQ0EsWUFBTUMsTUFBTUMsR0FBR0MsY0FBSCxDQUFrQixLQUFsQixDQUFaO0FBQ0FDLGdCQUFRQyxHQUFSLENBQVksTUFBWixFQUFvQlgsR0FBcEI7QUFDQVUsZ0JBQVFDLEdBQVIsQ0FBWSxNQUFaLEVBQW9CUixRQUFwQjtBQUNBSyxXQUFHSSxXQUFILElBQWtCSixHQUFHSSxXQUFILENBQWUsRUFBRUMsT0FBTyxLQUFULEVBQWdCQyxNQUFNLElBQXRCLEVBQWYsQ0FBbEI7QUFDQSxlQUFPTixHQUFHTyxPQUFILENBQVc7QUFDZGYsaUJBQUtQLE9BQU9PLEdBQVAsSUFBYyxDQUFDQSxJQUFJZ0IsT0FBSixDQUFZLEdBQVosQ0FBRCxHQUFvQixFQUFwQixHQUF5QixHQUF2QyxJQUE4QyxDQUFDLENBQUMsSUFBSUMsSUFBSixFQUFGLEVBQWNDLFFBQWQsQ0FBdUIsRUFBdkIsRUFBMkJDLE1BQTNCLENBQWtDLENBQWxDLENBRHJDO0FBRWRsQixrQkFBTUUsUUFGUTtBQUdkUixvQkFBUUEsTUFITTtBQUlkeUIsc0JBQVUsTUFKSTtBQUtkQyxvQkFBUTtBQUNKLGdDQUFnQjFCLFdBQVcsS0FBWCxHQUFtQixrQkFBbkIsR0FBd0MsaURBRHBEO0FBRUoyQixxQkFBS2YsT0FBTyxhQUZSO0FBR0o7QUFDQSwyQkFBVztBQUpQLGFBTE07QUFXZGdCLG1CQVhjLG1CQVdOQyxRQVhNLEVBV0k7QUFDZGQsd0JBQVFDLEdBQVIsQ0FBWSxVQUFaLEVBQXdCYSxRQUF4QjtBQURjLHFDQUVlQSxTQUFTdkIsSUFGeEI7QUFBQSxvQkFFTndCLEtBRk0sa0JBRU5BLEtBRk07QUFBQSxvQkFFQ0MsR0FGRCxrQkFFQ0EsR0FGRDtBQUFBLG9CQUVNekIsSUFGTixrQkFFTUEsSUFGTjs7QUFHZCxvQkFBSXdCLFVBQVUsR0FBZCxFQUFtQjtBQUNmM0IsNEJBQVEwQixTQUFTdkIsSUFBakI7QUFDQTtBQUNILGlCQUhELE1BR08sSUFBSXdCLFNBQVMsQ0FBQyxLQUFkLEVBQXFCO0FBQ3hCLHNDQUFNQyxHQUFOO0FBQ0FDLCtCQUFXLFlBQU07QUFDYkMsdUNBQUtDLFFBQUwsQ0FBYztBQUNWN0IsaUNBQUs7QUFESyx5QkFBZDtBQUdILHFCQUpELEVBSUcsSUFKSDtBQUtBRCwyQkFBTzJCLEdBQVA7QUFDQTtBQUNILGlCQVRNLE1BU0E7QUFDSDNCLDJCQUFPMkIsR0FBUDtBQUNBO0FBQ0g7QUFDSixhQTlCYTtBQStCZEksZ0JBL0JjLGdCQStCVEMsQ0EvQlMsRUErQk47QUFDSmhDLHVCQUFPZ0MsQ0FBUDtBQUNBN0IsNEJBQVlBLFNBQVM2QixDQUFULENBQVo7QUFDSCxhQWxDYTtBQW1DZEMsb0JBbkNjLHNCQW1DSDtBQUNQeEIsbUJBQUd5QixXQUFILElBQWtCekIsR0FBR3lCLFdBQUgsRUFBbEI7QUFDSDtBQXJDYSxTQUFYLENBQVA7QUF1Q0gsS0FwRGtDLENBQXRCO0FBQUEsQ0FBYjs7QUFzREFDLE9BQU9DLE9BQVAsQ0FBZUMsR0FBZixHQUFxQjtBQUFBLHVDQUFJeEMsS0FBSjtBQUFJQSxhQUFKO0FBQUE7O0FBQUEsV0FBY0YsdUJBQUssS0FBTCxTQUFlRSxLQUFmLEVBQWQ7QUFBQSxDQUFyQjs7QUFFQXNDLE9BQU9DLE9BQVAsQ0FBZUUsSUFBZixHQUFzQjtBQUFBLHVDQUFJekMsS0FBSjtBQUFJQSxhQUFKO0FBQUE7O0FBQUEsV0FBY0YsdUJBQUssTUFBTCxTQUFnQkUsS0FBaEIsRUFBZDtBQUFBLENBQXRCIiwiZmlsZSI6ImFqYXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB7IHRvYXN0IH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5jb25zdCBob3N0ID0gJ2h0dHBzOi8veWFvZmEuNTguY29tJztcblxuY29uc3QgaHR0cCA9IChtZXRob2QsIC4uLnByb3BzKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgbGV0IFt1cmwsIGRhdGEsIGNhbGxiYWNrXSA9IHByb3BzO1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjYWxsYmFjayA9IGRhdGE7XG4gICAgICAgIGRhdGEgPSB7fTtcbiAgICB9XG4gICAgLy8gdGVzdD1cInRlc3RcIuWtl+auteaYr+S4uuWIh+aNoua1i+ivleWSjOe6v+S4iueOr+Wig+eahO+8jOWmguaenOaPkOS6pOWuoeaguOWSjOWPkeW4g++8jOWwhnRlc3TmlLnkuLonJ++8jOagh+ivhuWIh+aNouS4uue6v+S4iueOr+Wig1xuICAgIGNvbnN0IHNlbmREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgZGF0YSwgeyB0ZXN0OlwidGVzdFwiIH0pO1xuICAgIC8vIHBwdeWKoOWFpWhlYWRlclxuICAgIGNvbnN0IHBwdSA9IHd4LmdldFN0b3JhZ2VTeW5jKCdwcHUnKTtcbiAgICBjb25zb2xlLmxvZygn6K+35rGC5o6l5Y+jJywgdXJsKTtcbiAgICBjb25zb2xlLmxvZygn6K+35rGC5Y+C5pWwJywgc2VuZERhdGEpO1xuICAgIHd4LnNob3dMb2FkaW5nICYmIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfliqDovb3kuK0nLCBtYXNrOiB0cnVlIH0pO1xuICAgIHJldHVybiB3eC5yZXF1ZXN0KHtcbiAgICAgICAgdXJsOiBob3N0ICsgdXJsICsgKH51cmwuaW5kZXhPZignPycpID8gJycgOiAnPycpICsgKCtuZXcgRGF0ZSgpKS50b1N0cmluZygzNikuc3Vic3RyKDMpLFxuICAgICAgICBkYXRhOiBzZW5kRGF0YSxcbiAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6IG1ldGhvZCA9PT0gJ0dFVCcgPyAnYXBwbGljYXRpb24vanNvbicgOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxuICAgICAgICAgICAgUFBVOiBwcHUgfHwgJ3dhbmdob25neXVlJyxcbiAgICAgICAgICAgIC8vICdZa3VZZFk4cms1QXM0VDJRYUo3dic6ICc0NTc5Nzk2Njk1ODEwMCcsXG4gICAgICAgICAgICAncmVxZnJvbSc6ICdiaXpfYXNzaXN0YW50JyxcbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2VzcyhyZXNwb25zZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3BvbnNlJywgcmVzcG9uc2UpO1xuICAgICAgICAgICAgY29uc3QgeyBzdGF0ZSwgbXNnLCBkYXRhIH0gPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgaWYgKHN0YXRlID09PSAxMDApIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrICYmIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PSAtMTAwMDEpIHtcbiAgICAgICAgICAgICAgICB0b2FzdChtc2cpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB3ZXB5LnJlTGF1bmNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy4uL3BhZ2VzL2ludHJvJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KG1zZyk7XG4gICAgICAgICAgICAgICAgLy8gY2FsbGJhY2sgJiYgY2FsbGJhY2sobnVsbCwgcmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlamVjdChtc2cpO1xuICAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrICYmIGNhbGxiYWNrKG1zZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWwoZSkge1xuICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBsZXRlKCkge1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcgJiYgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgfSxcbiAgICB9KTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cy5nZXQgPSAoLi4ucHJvcHMpID0+IGh0dHAoJ0dFVCcsIC4uLnByb3BzKTtcblxubW9kdWxlLmV4cG9ydHMucG9zdCA9ICguLi5wcm9wcykgPT4gaHR0cCgnUE9TVCcsIC4uLnByb3BzKTtcbiJdfQ==
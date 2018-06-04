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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFqYXguanMiXSwibmFtZXMiOlsiaG9zdCIsImh0dHAiLCJtZXRob2QiLCJwcm9wcyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwidXJsIiwiZGF0YSIsImNhbGxiYWNrIiwic2VuZERhdGEiLCJPYmplY3QiLCJhc3NpZ24iLCJwcHUiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwiY29uc29sZSIsImxvZyIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJtYXNrIiwicmVxdWVzdCIsImluZGV4T2YiLCJEYXRlIiwidG9TdHJpbmciLCJzdWJzdHIiLCJkYXRhVHlwZSIsImhlYWRlciIsIlBQVSIsInN1Y2Nlc3MiLCJyZXNwb25zZSIsInN0YXRlIiwibXNnIiwic2V0VGltZW91dCIsIndlcHkiLCJyZUxhdW5jaCIsImZhaWwiLCJlIiwiY29tcGxldGUiLCJoaWRlTG9hZGluZyIsIm1vZHVsZSIsImV4cG9ydHMiLCJnZXQiLCJwb3N0Il0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNQSxPQUFPLHNCQUFiOztBQUVBLElBQU1DLE9BQU8sU0FBUEEsSUFBTyxDQUFDQyxNQUFEO0FBQUEsc0NBQVlDLEtBQVo7QUFBWUEsYUFBWjtBQUFBOztBQUFBLFdBQXNCLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFBQSxZQUMzREMsR0FEMkQsR0FDcENKLEtBRG9DO0FBQUEsWUFDdERLLElBRHNELEdBQ3BDTCxLQURvQztBQUFBLFlBQ2hETSxRQURnRCxHQUNwQ04sS0FEb0M7O0FBRWhFLFlBQUksT0FBT0ssSUFBUCxLQUFnQixVQUFwQixFQUFnQztBQUM1QkMsdUJBQVdELElBQVg7QUFDQUEsbUJBQU8sRUFBUDtBQUNIO0FBQ0Q7QUFDQSxZQUFNRSxXQUFXQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQkosSUFBbEIsQ0FBakI7QUFDQTtBQUNBLFlBQU1LLE1BQU1DLEdBQUdDLGNBQUgsQ0FBa0IsS0FBbEIsQ0FBWjtBQUNBQyxnQkFBUUMsR0FBUixDQUFZLE1BQVosRUFBb0JWLEdBQXBCO0FBQ0FTLGdCQUFRQyxHQUFSLENBQVksTUFBWixFQUFvQlAsUUFBcEI7QUFDQUksV0FBR0ksV0FBSCxJQUFrQkosR0FBR0ksV0FBSCxDQUFlLEVBQUVDLE9BQU8sS0FBVCxFQUFnQkMsTUFBTSxJQUF0QixFQUFmLENBQWxCO0FBQ0EsZUFBT04sR0FBR08sT0FBSCxDQUFXO0FBQ2RkLGlCQUFLUCxPQUFPTyxHQUFQLElBQWMsQ0FBQ0EsSUFBSWUsT0FBSixDQUFZLEdBQVosQ0FBRCxHQUFvQixFQUFwQixHQUF5QixHQUF2QyxJQUE4QyxDQUFDLENBQUMsSUFBSUMsSUFBSixFQUFGLEVBQWNDLFFBQWQsQ0FBdUIsRUFBdkIsRUFBMkJDLE1BQTNCLENBQWtDLENBQWxDLENBRHJDO0FBRWRqQixrQkFBTUUsUUFGUTtBQUdkUixvQkFBUUEsTUFITTtBQUlkd0Isc0JBQVUsTUFKSTtBQUtkQyxvQkFBUTtBQUNKLGdDQUFnQnpCLFdBQVcsS0FBWCxHQUFtQixrQkFBbkIsR0FBd0MsaURBRHBEO0FBRUowQixxQkFBS2YsT0FBTyxhQUZSO0FBR0osMkJBQVc7QUFIUCxhQUxNO0FBVWRnQixtQkFWYyxtQkFVTkMsUUFWTSxFQVVJO0FBQ2RkLHdCQUFRQyxHQUFSLENBQVksVUFBWixFQUF3QmEsUUFBeEI7QUFEYyxxQ0FFZUEsU0FBU3RCLElBRnhCO0FBQUEsb0JBRU51QixLQUZNLGtCQUVOQSxLQUZNO0FBQUEsb0JBRUNDLEdBRkQsa0JBRUNBLEdBRkQ7QUFBQSxvQkFFTXhCLElBRk4sa0JBRU1BLElBRk47O0FBR2Qsb0JBQUl1QixVQUFVLEdBQWQsRUFBbUI7QUFDZjFCLDRCQUFReUIsU0FBU3RCLElBQWpCO0FBQ0E7QUFDSCxpQkFIRCxNQUdPLElBQUl1QixTQUFTLENBQUMsS0FBZCxFQUFxQjtBQUN4QixzQ0FBTUMsR0FBTjtBQUNBQywrQkFBVyxZQUFNO0FBQ2JDLHVDQUFLQyxRQUFMLENBQWM7QUFDVjVCLGlDQUFLO0FBREsseUJBQWQ7QUFHSCxxQkFKRCxFQUlHLElBSkg7QUFLQUQsMkJBQU8wQixHQUFQO0FBQ0E7QUFDSCxpQkFUTSxNQVNBO0FBQ0gxQiwyQkFBTzBCLEdBQVA7QUFDQTtBQUNIO0FBQ0osYUE3QmE7QUE4QmRJLGdCQTlCYyxnQkE4QlRDLENBOUJTLEVBOEJOO0FBQ0ovQix1QkFBTytCLENBQVA7QUFDQTVCLDRCQUFZQSxTQUFTNEIsQ0FBVCxDQUFaO0FBQ0gsYUFqQ2E7QUFrQ2RDLG9CQWxDYyxzQkFrQ0g7QUFDUHhCLG1CQUFHeUIsV0FBSCxJQUFrQnpCLEdBQUd5QixXQUFILEVBQWxCO0FBQ0g7QUFwQ2EsU0FBWCxDQUFQO0FBc0NILEtBbkRrQyxDQUF0QjtBQUFBLENBQWI7O0FBcURBQyxPQUFPQyxPQUFQLENBQWVDLEdBQWYsR0FBcUI7QUFBQSx1Q0FBSXZDLEtBQUo7QUFBSUEsYUFBSjtBQUFBOztBQUFBLFdBQWNGLHVCQUFLLEtBQUwsU0FBZUUsS0FBZixFQUFkO0FBQUEsQ0FBckI7O0FBRUFxQyxPQUFPQyxPQUFQLENBQWVFLElBQWYsR0FBc0I7QUFBQSx1Q0FBSXhDLEtBQUo7QUFBSUEsYUFBSjtBQUFBOztBQUFBLFdBQWNGLHVCQUFLLE1BQUwsU0FBZ0JFLEtBQWhCLEVBQWQ7QUFBQSxDQUF0QiIsImZpbGUiOiJhamF4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgeyB0b2FzdCB9IGZyb20gJy4uL3V0aWxzJztcblxuY29uc3QgaG9zdCA9ICdodHRwczovL3lhb2ZhLjU4LmNvbSc7XG5cbmNvbnN0IGh0dHAgPSAobWV0aG9kLCAuLi5wcm9wcykgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxldCBbdXJsLCBkYXRhLCBjYWxsYmFja10gPSBwcm9wcztcbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBkYXRhO1xuICAgICAgICBkYXRhID0ge307XG4gICAgfVxuICAgIC8vIHRlc3Q9XCJ0ZXN0XCLlrZfmrrXmmK/kuLrliIfmjaLmtYvor5Xlkoznur/kuIrnjq/looPnmoTvvIzlpoLmnpzmj5DkuqTlrqHmoLjlkozlj5HluIPvvIzlsIZ0ZXN05pS55Li6JyfvvIzmoIfor4bliIfmjaLkuLrnur/kuIrnjq/looNcbiAgICBjb25zdCBzZW5kRGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGRhdGEpO1xuICAgIC8vIHBwdeWKoOWFpWhlYWRlclxuICAgIGNvbnN0IHBwdSA9IHd4LmdldFN0b3JhZ2VTeW5jKCdwcHUnKTtcbiAgICBjb25zb2xlLmxvZygn6K+35rGC5o6l5Y+jJywgdXJsKTtcbiAgICBjb25zb2xlLmxvZygn6K+35rGC5Y+C5pWwJywgc2VuZERhdGEpO1xuICAgIHd4LnNob3dMb2FkaW5nICYmIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfliqDovb3kuK0nLCBtYXNrOiB0cnVlIH0pO1xuICAgIHJldHVybiB3eC5yZXF1ZXN0KHtcbiAgICAgICAgdXJsOiBob3N0ICsgdXJsICsgKH51cmwuaW5kZXhPZignPycpID8gJycgOiAnPycpICsgKCtuZXcgRGF0ZSgpKS50b1N0cmluZygzNikuc3Vic3RyKDMpLFxuICAgICAgICBkYXRhOiBzZW5kRGF0YSxcbiAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6IG1ldGhvZCA9PT0gJ0dFVCcgPyAnYXBwbGljYXRpb24vanNvbicgOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxuICAgICAgICAgICAgUFBVOiBwcHUgfHwgJ3dhbmdob25neXVlJyxcbiAgICAgICAgICAgICdyZXFmcm9tJzogJ2Jpel9hc3Npc3RhbnQnLFxuICAgICAgICB9LFxuICAgICAgICBzdWNjZXNzKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncmVzcG9uc2UnLCByZXNwb25zZSk7XG4gICAgICAgICAgICBjb25zdCB7IHN0YXRlLCBtc2csIGRhdGEgfSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICBpZiAoc3RhdGUgPT09IDEwMCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICAgICAgLy8gY2FsbGJhY2sgJiYgY2FsbGJhY2sobnVsbCwgcmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09IC0xMDAwMSkge1xuICAgICAgICAgICAgICAgIHRvYXN0KG1zZyk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHdlcHkucmVMYXVuY2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnLi4vcGFnZXMvaW50cm8nLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICByZWplY3QobXNnKTtcbiAgICAgICAgICAgICAgICAvLyBjYWxsYmFjayAmJiBjYWxsYmFjayhudWxsLCByZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KG1zZyk7XG4gICAgICAgICAgICAgICAgLy8gY2FsbGJhY2sgJiYgY2FsbGJhY2sobXNnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZmFpbChlKSB7XG4gICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhlKTtcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGxldGUoKSB7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZyAmJiB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICB9LFxuICAgIH0pO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzLmdldCA9ICguLi5wcm9wcykgPT4gaHR0cCgnR0VUJywgLi4ucHJvcHMpO1xuXG5tb2R1bGUuZXhwb3J0cy5wb3N0ID0gKC4uLnByb3BzKSA9PiBodHRwKCdQT1NUJywgLi4ucHJvcHMpO1xuIl19
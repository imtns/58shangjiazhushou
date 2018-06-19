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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFqYXguanMiXSwibmFtZXMiOlsiaG9zdCIsImh0dHAiLCJtZXRob2QiLCJwcm9wcyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwidXJsIiwiZGF0YSIsImNhbGxiYWNrIiwic2VuZERhdGEiLCJPYmplY3QiLCJhc3NpZ24iLCJwcHUiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwiY29uc29sZSIsImxvZyIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJtYXNrIiwicmVxdWVzdCIsImluZGV4T2YiLCJEYXRlIiwidG9TdHJpbmciLCJzdWJzdHIiLCJkYXRhVHlwZSIsImhlYWRlciIsIlBQVSIsInN1Y2Nlc3MiLCJyZXNwb25zZSIsInN0YXRlIiwibXNnIiwic2V0VGltZW91dCIsIndlcHkiLCJyZUxhdW5jaCIsImZhaWwiLCJlIiwiY29tcGxldGUiLCJoaWRlTG9hZGluZyIsIm1vZHVsZSIsImV4cG9ydHMiLCJnZXQiLCJwb3N0Il0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNQSxPQUFPLHNCQUFiOztBQUVBLElBQU1DLE9BQU8sU0FBUEEsSUFBTyxDQUFDQyxNQUFEO0FBQUEsc0NBQVlDLEtBQVo7QUFBWUEsYUFBWjtBQUFBOztBQUFBLFdBQXNCLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFBQSxZQUMzREMsR0FEMkQsR0FDcENKLEtBRG9DO0FBQUEsWUFDdERLLElBRHNELEdBQ3BDTCxLQURvQztBQUFBLFlBQ2hETSxRQURnRCxHQUNwQ04sS0FEb0M7O0FBRWhFLFlBQUksT0FBT0ssSUFBUCxLQUFnQixVQUFwQixFQUFnQztBQUM1QkMsdUJBQVdELElBQVg7QUFDQUEsbUJBQU8sRUFBUDtBQUNIO0FBQ0Q7QUFDQSxZQUFNRSxXQUFXQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQkosSUFBbEIsQ0FBakI7QUFDQTtBQUNBLFlBQU1LLE1BQU1DLEdBQUdDLGNBQUgsQ0FBa0IsS0FBbEIsQ0FBWjtBQUNBQyxnQkFBUUMsR0FBUixDQUFZLE1BQVosRUFBb0JWLEdBQXBCO0FBQ0FTLGdCQUFRQyxHQUFSLENBQVksTUFBWixFQUFvQlAsUUFBcEI7QUFDQUksV0FBR0ksV0FBSCxJQUFrQkosR0FBR0ksV0FBSCxDQUFlLEVBQUVDLE9BQU8sS0FBVCxFQUFnQkMsTUFBTSxJQUF0QixFQUFmLENBQWxCO0FBQ0EsZUFBT04sR0FBR08sT0FBSCxDQUFXO0FBQ2RkLGlCQUFLUCxPQUFPTyxHQUFQLElBQWMsQ0FBQ0EsSUFBSWUsT0FBSixDQUFZLEdBQVosQ0FBRCxHQUFvQixFQUFwQixHQUF5QixHQUF2QyxJQUE4QyxDQUFDLENBQUMsSUFBSUMsSUFBSixFQUFGLEVBQWNDLFFBQWQsQ0FBdUIsRUFBdkIsRUFBMkJDLE1BQTNCLENBQWtDLENBQWxDLENBRHJDO0FBRWRqQixrQkFBTUUsUUFGUTtBQUdkUixvQkFBUUEsTUFITTtBQUlkd0Isc0JBQVUsTUFKSTtBQUtkQyxvQkFBUTtBQUNKLGdDQUFnQnpCLFdBQVcsS0FBWCxHQUFtQixrQkFBbkIsR0FBd0MsaURBRHBEO0FBRUowQixxQkFBS2YsT0FBTyxhQUZSO0FBR0o7QUFDQSwyQkFBVztBQUpQLGFBTE07QUFXZGdCLG1CQVhjLG1CQVdOQyxRQVhNLEVBV0k7QUFDZGQsd0JBQVFDLEdBQVIsQ0FBWSxVQUFaLEVBQXdCYSxRQUF4QjtBQURjLHFDQUVlQSxTQUFTdEIsSUFGeEI7QUFBQSxvQkFFTnVCLEtBRk0sa0JBRU5BLEtBRk07QUFBQSxvQkFFQ0MsR0FGRCxrQkFFQ0EsR0FGRDtBQUFBLG9CQUVNeEIsSUFGTixrQkFFTUEsSUFGTjs7QUFHZCxvQkFBSXVCLFVBQVUsR0FBZCxFQUFtQjtBQUNmMUIsNEJBQVF5QixTQUFTdEIsSUFBakI7QUFDQTtBQUNILGlCQUhELE1BR08sSUFBSXVCLFNBQVMsQ0FBQyxLQUFkLEVBQXFCO0FBQ3hCLHNDQUFNQyxHQUFOO0FBQ0FDLCtCQUFXLFlBQU07QUFDYkMsdUNBQUtDLFFBQUwsQ0FBYztBQUNWNUIsaUNBQUs7QUFESyx5QkFBZDtBQUdILHFCQUpELEVBSUcsSUFKSDtBQUtBRCwyQkFBTzBCLEdBQVA7QUFDQTtBQUNILGlCQVRNLE1BU0E7QUFDSDFCLDJCQUFPMEIsR0FBUDtBQUNBO0FBQ0g7QUFDSixhQTlCYTtBQStCZEksZ0JBL0JjLGdCQStCVEMsQ0EvQlMsRUErQk47QUFDSi9CLHVCQUFPK0IsQ0FBUDtBQUNBNUIsNEJBQVlBLFNBQVM0QixDQUFULENBQVo7QUFDSCxhQWxDYTtBQW1DZEMsb0JBbkNjLHNCQW1DSDtBQUNQeEIsbUJBQUd5QixXQUFILElBQWtCekIsR0FBR3lCLFdBQUgsRUFBbEI7QUFDSDtBQXJDYSxTQUFYLENBQVA7QUF1Q0gsS0FwRGtDLENBQXRCO0FBQUEsQ0FBYjs7QUFzREFDLE9BQU9DLE9BQVAsQ0FBZUMsR0FBZixHQUFxQjtBQUFBLHVDQUFJdkMsS0FBSjtBQUFJQSxhQUFKO0FBQUE7O0FBQUEsV0FBY0YsdUJBQUssS0FBTCxTQUFlRSxLQUFmLEVBQWQ7QUFBQSxDQUFyQjs7QUFFQXFDLE9BQU9DLE9BQVAsQ0FBZUUsSUFBZixHQUFzQjtBQUFBLHVDQUFJeEMsS0FBSjtBQUFJQSxhQUFKO0FBQUE7O0FBQUEsV0FBY0YsdUJBQUssTUFBTCxTQUFnQkUsS0FBaEIsRUFBZDtBQUFBLENBQXRCIiwiZmlsZSI6ImFqYXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IHsgdG9hc3QgfSBmcm9tICcuLi91dGlscyc7XHJcblxyXG5jb25zdCBob3N0ID0gJ2h0dHBzOi8veWFvZmEuNTguY29tJztcclxuXHJcbmNvbnN0IGh0dHAgPSAobWV0aG9kLCAuLi5wcm9wcykgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgbGV0IFt1cmwsIGRhdGEsIGNhbGxiYWNrXSA9IHByb3BzO1xyXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgY2FsbGJhY2sgPSBkYXRhO1xyXG4gICAgICAgIGRhdGEgPSB7fTtcclxuICAgIH1cclxuICAgIC8vIHRlc3Q9XCJ0ZXN0XCLlrZfmrrXmmK/kuLrliIfmjaLmtYvor5Xlkoznur/kuIrnjq/looPnmoTvvIzlpoLmnpzmj5DkuqTlrqHmoLjlkozlj5HluIPvvIzlsIZ0ZXN05pS55Li6JyfvvIzmoIfor4bliIfmjaLkuLrnur/kuIrnjq/looNcclxuICAgIGNvbnN0IHNlbmREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgZGF0YSk7XHJcbiAgICAvLyBwcHXliqDlhaVoZWFkZXJcclxuICAgIGNvbnN0IHBwdSA9IHd4LmdldFN0b3JhZ2VTeW5jKCdwcHUnKTtcclxuICAgIGNvbnNvbGUubG9nKCfor7fmsYLmjqXlj6MnLCB1cmwpO1xyXG4gICAgY29uc29sZS5sb2coJ+ivt+axguWPguaVsCcsIHNlbmREYXRhKTtcclxuICAgIHd4LnNob3dMb2FkaW5nICYmIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfliqDovb3kuK0nLCBtYXNrOiB0cnVlIH0pO1xyXG4gICAgcmV0dXJuIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgIHVybDogaG9zdCArIHVybCArICh+dXJsLmluZGV4T2YoJz8nKSA/ICcnIDogJz8nKSArICgrbmV3IERhdGUoKSkudG9TdHJpbmcoMzYpLnN1YnN0cigzKSxcclxuICAgICAgICBkYXRhOiBzZW5kRGF0YSxcclxuICAgICAgICBtZXRob2Q6IG1ldGhvZCxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAnY29udGVudC10eXBlJzogbWV0aG9kID09PSAnR0VUJyA/ICdhcHBsaWNhdGlvbi9qc29uJyA6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAgIFBQVTogcHB1IHx8ICd3YW5naG9uZ3l1ZScsXHJcbiAgICAgICAgICAgIC8vICdZa3VZZFk4cms1QXM0VDJRYUo3dic6ICc0NTc5Nzk2Njk1ODEwMCcsXHJcbiAgICAgICAgICAgICdyZXFmcm9tJzogJ2Jpel9hc3Npc3RhbnQnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzcyhyZXNwb25zZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncmVzcG9uc2UnLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgc3RhdGUsIG1zZywgZGF0YSB9ID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgaWYgKHN0YXRlID09PSAxMDApIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAvLyBjYWxsYmFjayAmJiBjYWxsYmFjayhudWxsLCByZXNwb25zZS5kYXRhKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PSAtMTAwMDEpIHtcclxuICAgICAgICAgICAgICAgIHRvYXN0KG1zZyk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB3ZXB5LnJlTGF1bmNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnLi4vcGFnZXMvaW50cm8nLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICByZWplY3QobXNnKTtcclxuICAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrICYmIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KG1zZyk7XHJcbiAgICAgICAgICAgICAgICAvLyBjYWxsYmFjayAmJiBjYWxsYmFjayhtc2cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmYWlsKGUpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGUpO1xyXG4gICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBsZXRlKCkge1xyXG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZyAmJiB3eC5oaWRlTG9hZGluZygpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5nZXQgPSAoLi4ucHJvcHMpID0+IGh0dHAoJ0dFVCcsIC4uLnByb3BzKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzLnBvc3QgPSAoLi4ucHJvcHMpID0+IGh0dHAoJ1BPU1QnLCAuLi5wcm9wcyk7XHJcbiJdfQ==
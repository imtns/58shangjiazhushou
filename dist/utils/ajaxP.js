'use strict';

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _index = require('./index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var test = 'test';
var host = 'https://yaofa.58.com';
var http = function http(method) {
    for (var _len = arguments.length, props = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        props[_key - 1] = arguments[_key];
    }

    var url = props[0],
        param = props[1],
        _props$ = props[2],
        showLoading = _props$ === undefined ? true : _props$;

    var sendData = Object.assign({}, param, { test: test });
    // ppu加入header
    var ppu = _wepy2.default.getStorageSync('ppu');
    console.log('请求接口', url);
    console.log('请求参数', param);
    showLoading && _wepy2.default.showLoading && _wepy2.default.showLoading({ title: '加载中', mask: true });
    return new Promise(function (resolve) {
        _wepy2.default.request({
            url: host + url + (~url.indexOf('?') ? '' : '?') + (+new Date()).toString(36).substr(3),
            data: sendData,
            method: method,
            dataType: 'json',
            header: {
                'content-type': method === 'GET' ? 'application/json' : 'application/x-www-form-urlencoded;charset=utf-8',
                PPU: ppu || 'wanghongyue',
                reqfrom: 'biz_assistant',
                YkuYdY8rk5As4T2QaJ7v: '15293583575559'
            }
        }).then(function (response) {
            console.log('response', response);
            showLoading && _wepy2.default.hideLoading && _wepy2.default.hideLoading();
            var _response$data = response.data,
                state = _response$data.state,
                msg = _response$data.msg,
                data = _response$data.data;

            if (state === 100) {
                resolve([null, data]);
            } else if (state === -10001) {
                (0, _index.toast)(msg);
                setTimeout(function () {
                    _wepy2.default.reLaunch({
                        url: '../pages/intro'
                    });
                }, 1000);
            } else {
                resolve([msg]);
            }
        }).catch(function (err) {
            showLoading && _wepy2.default.hideLoading && _wepy2.default.hideLoading();
            resolve([err.errMsg]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFqYXhQLmpzIl0sIm5hbWVzIjpbInRlc3QiLCJob3N0IiwiaHR0cCIsIm1ldGhvZCIsInByb3BzIiwidXJsIiwicGFyYW0iLCJzaG93TG9hZGluZyIsInNlbmREYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwicHB1Iiwid2VweSIsImdldFN0b3JhZ2VTeW5jIiwiY29uc29sZSIsImxvZyIsInRpdGxlIiwibWFzayIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVxdWVzdCIsImluZGV4T2YiLCJEYXRlIiwidG9TdHJpbmciLCJzdWJzdHIiLCJkYXRhIiwiZGF0YVR5cGUiLCJoZWFkZXIiLCJQUFUiLCJyZXFmcm9tIiwiWWt1WWRZOHJrNUFzNFQyUWFKN3YiLCJ0aGVuIiwicmVzcG9uc2UiLCJoaWRlTG9hZGluZyIsInN0YXRlIiwibXNnIiwic2V0VGltZW91dCIsInJlTGF1bmNoIiwiY2F0Y2giLCJlcnIiLCJlcnJNc2ciLCJtb2R1bGUiLCJleHBvcnRzIiwiZ2V0IiwicG9zdCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7O0FBRUEsSUFBTUEsT0FBTyxNQUFiO0FBQ0EsSUFBTUMsT0FBTyxzQkFBYjtBQUNBLElBQU1DLE9BQU8sU0FBUEEsSUFBTyxDQUFDQyxNQUFELEVBQXNCO0FBQUEsc0NBQVZDLEtBQVU7QUFBVkEsYUFBVTtBQUFBOztBQUFBLFFBQ3hCQyxHQUR3QixHQUNVRCxLQURWO0FBQUEsUUFDbkJFLEtBRG1CLEdBQ1VGLEtBRFY7QUFBQSxrQkFDVUEsS0FEVjtBQUFBLFFBQ1pHLFdBRFksMkJBQ0UsSUFERjs7QUFFL0IsUUFBTUMsV0FBV0MsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JKLEtBQWxCLEVBQXlCLEVBQUVOLFVBQUYsRUFBekIsQ0FBakI7QUFDQTtBQUNBLFFBQU1XLE1BQU1DLGVBQUtDLGNBQUwsQ0FBb0IsS0FBcEIsQ0FBWjtBQUNBQyxZQUFRQyxHQUFSLENBQVksTUFBWixFQUFvQlYsR0FBcEI7QUFDQVMsWUFBUUMsR0FBUixDQUFZLE1BQVosRUFBb0JULEtBQXBCO0FBQ0FDLG1CQUFlSyxlQUFLTCxXQUFwQixJQUFtQ0ssZUFBS0wsV0FBTCxDQUFpQixFQUFFUyxPQUFPLEtBQVQsRUFBZ0JDLE1BQU0sSUFBdEIsRUFBakIsQ0FBbkM7QUFDQSxXQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQWE7QUFDNUJQLHVCQUFLUSxPQUFMLENBQWE7QUFDVGYsaUJBQUtKLE9BQU9JLEdBQVAsSUFBYyxDQUFDQSxJQUFJZ0IsT0FBSixDQUFZLEdBQVosQ0FBRCxHQUFvQixFQUFwQixHQUF5QixHQUF2QyxJQUE4QyxDQUFDLENBQUMsSUFBSUMsSUFBSixFQUFGLEVBQWNDLFFBQWQsQ0FBdUIsRUFBdkIsRUFBMkJDLE1BQTNCLENBQWtDLENBQWxDLENBRDFDO0FBRVRDLGtCQUFNakIsUUFGRztBQUdUTCxvQkFBUUEsTUFIQztBQUlUdUIsc0JBQVUsTUFKRDtBQUtUQyxvQkFBUTtBQUNKLGdDQUFnQnhCLFdBQVcsS0FBWCxHQUFtQixrQkFBbkIsR0FBd0MsaURBRHBEO0FBRUp5QixxQkFBS2pCLE9BQU8sYUFGUjtBQUdKa0IseUJBQVMsZUFITDtBQUlKQyxzQ0FBc0I7QUFKbEI7QUFMQyxTQUFiLEVBV0dDLElBWEgsQ0FXUSxVQUFDQyxRQUFELEVBQWM7QUFDbEJsQixvQkFBUUMsR0FBUixDQUFZLFVBQVosRUFBd0JpQixRQUF4QjtBQUNBekIsMkJBQWVLLGVBQUtxQixXQUFwQixJQUFtQ3JCLGVBQUtxQixXQUFMLEVBQW5DO0FBRmtCLGlDQUdXRCxTQUFTUCxJQUhwQjtBQUFBLGdCQUdWUyxLQUhVLGtCQUdWQSxLQUhVO0FBQUEsZ0JBR0hDLEdBSEcsa0JBR0hBLEdBSEc7QUFBQSxnQkFHRVYsSUFIRixrQkFHRUEsSUFIRjs7QUFJbEIsZ0JBQUlTLFVBQVUsR0FBZCxFQUFtQjtBQUNmZix3QkFBUSxDQUFDLElBQUQsRUFBT00sSUFBUCxDQUFSO0FBQ0gsYUFGRCxNQUVPLElBQUlTLFVBQVUsQ0FBQyxLQUFmLEVBQXNCO0FBQ3pCLGtDQUFNQyxHQUFOO0FBQ0FDLDJCQUFXLFlBQU07QUFDYnhCLG1DQUFLeUIsUUFBTCxDQUFjO0FBQ1ZoQyw2QkFBSztBQURLLHFCQUFkO0FBR0gsaUJBSkQsRUFJRyxJQUpIO0FBS0gsYUFQTSxNQU9BO0FBQ0hjLHdCQUFRLENBQUNnQixHQUFELENBQVI7QUFDSDtBQUNKLFNBM0JELEVBMkJHRyxLQTNCSCxDQTJCUyxVQUFDQyxHQUFELEVBQVM7QUFDZGhDLDJCQUFlSyxlQUFLcUIsV0FBcEIsSUFBbUNyQixlQUFLcUIsV0FBTCxFQUFuQztBQUNBZCxvQkFBUSxDQUFDb0IsSUFBSUMsTUFBTCxDQUFSO0FBQ0gsU0E5QkQ7QUErQkgsS0FoQ00sQ0FBUDtBQWlDSCxDQXpDRDs7QUEyQ0FDLE9BQU9DLE9BQVAsQ0FBZUMsR0FBZixHQUFxQjtBQUFBLHVDQUFJdkMsS0FBSjtBQUFJQSxhQUFKO0FBQUE7O0FBQUEsV0FBY0YsdUJBQUssS0FBTCxTQUFlRSxLQUFmLEVBQWQ7QUFBQSxDQUFyQjs7QUFFQXFDLE9BQU9DLE9BQVAsQ0FBZUUsSUFBZixHQUFzQjtBQUFBLHVDQUFJeEMsS0FBSjtBQUFJQSxhQUFKO0FBQUE7O0FBQUEsV0FBY0YsdUJBQUssTUFBTCxTQUFnQkUsS0FBaEIsRUFBZDtBQUFBLENBQXRCIiwiZmlsZSI6ImFqYXhQLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCB7IHRvYXN0IH0gZnJvbSAnLi9pbmRleCc7XHJcblxyXG5jb25zdCB0ZXN0ID0gJ3Rlc3QnO1xyXG5jb25zdCBob3N0ID0gJ2h0dHBzOi8veWFvZmEuNTguY29tJztcclxuY29uc3QgaHR0cCA9IChtZXRob2QsIC4uLnByb3BzKSA9PiB7XHJcbiAgICBjb25zdCBbdXJsLCBwYXJhbSwgc2hvd0xvYWRpbmcgPSB0cnVlXSA9IHByb3BzO1xyXG4gICAgY29uc3Qgc2VuZERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBwYXJhbSwgeyB0ZXN0IH0pO1xyXG4gICAgLy8gcHB15Yqg5YWlaGVhZGVyXHJcbiAgICBjb25zdCBwcHUgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdwcHUnKTtcclxuICAgIGNvbnNvbGUubG9nKCfor7fmsYLmjqXlj6MnLCB1cmwpO1xyXG4gICAgY29uc29sZS5sb2coJ+ivt+axguWPguaVsCcsIHBhcmFtKTtcclxuICAgIHNob3dMb2FkaW5nICYmIHdlcHkuc2hvd0xvYWRpbmcgJiYgd2VweS5zaG93TG9hZGluZyh7IHRpdGxlOiAn5Yqg6L295LitJywgbWFzazogdHJ1ZSB9KTtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDogaG9zdCArIHVybCArICh+dXJsLmluZGV4T2YoJz8nKSA/ICcnIDogJz8nKSArICgrbmV3IERhdGUoKSkudG9TdHJpbmcoMzYpLnN1YnN0cigzKSxcclxuICAgICAgICAgICAgZGF0YTogc2VuZERhdGEsXHJcbiAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiBtZXRob2QgPT09ICdHRVQnID8gJ2FwcGxpY2F0aW9uL2pzb24nIDogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAgICAgICAgIFBQVTogcHB1IHx8ICd3YW5naG9uZ3l1ZScsXHJcbiAgICAgICAgICAgICAgICByZXFmcm9tOiAnYml6X2Fzc2lzdGFudCcsXHJcbiAgICAgICAgICAgICAgICBZa3VZZFk4cms1QXM0VDJRYUo3djogJzE1MjkzNTgzNTc1NTU5JyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncmVzcG9uc2UnLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgIHNob3dMb2FkaW5nICYmIHdlcHkuaGlkZUxvYWRpbmcgJiYgd2VweS5oaWRlTG9hZGluZygpO1xyXG4gICAgICAgICAgICBjb25zdCB7IHN0YXRlLCBtc2csIGRhdGEgfSA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKFtudWxsLCBkYXRhXSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IC0xMDAwMSkge1xyXG4gICAgICAgICAgICAgICAgdG9hc3QobXNnKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHdlcHkucmVMYXVuY2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcuLi9wYWdlcy9pbnRybycsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoW21zZ10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICBzaG93TG9hZGluZyAmJiB3ZXB5LmhpZGVMb2FkaW5nICYmIHdlcHkuaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgcmVzb2x2ZShbZXJyLmVyck1zZ10pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5nZXQgPSAoLi4ucHJvcHMpID0+IGh0dHAoJ0dFVCcsIC4uLnByb3BzKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzLnBvc3QgPSAoLi4ucHJvcHMpID0+IGh0dHAoJ1BPU1QnLCAuLi5wcm9wcyk7XHJcbiJdfQ==
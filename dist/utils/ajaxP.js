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
    console.log('请求参数', sendData);
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
                reqfrom: 'biz_assistant'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFqYXhQLmpzIl0sIm5hbWVzIjpbInRlc3QiLCJob3N0IiwiaHR0cCIsIm1ldGhvZCIsInByb3BzIiwidXJsIiwicGFyYW0iLCJzaG93TG9hZGluZyIsInNlbmREYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwicHB1Iiwid2VweSIsImdldFN0b3JhZ2VTeW5jIiwiY29uc29sZSIsImxvZyIsInRpdGxlIiwibWFzayIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVxdWVzdCIsImluZGV4T2YiLCJEYXRlIiwidG9TdHJpbmciLCJzdWJzdHIiLCJkYXRhIiwiZGF0YVR5cGUiLCJoZWFkZXIiLCJQUFUiLCJyZXFmcm9tIiwidGhlbiIsInJlc3BvbnNlIiwiaGlkZUxvYWRpbmciLCJzdGF0ZSIsIm1zZyIsInNldFRpbWVvdXQiLCJyZUxhdW5jaCIsImNhdGNoIiwiZXJyIiwiZXJyTXNnIiwibW9kdWxlIiwiZXhwb3J0cyIsImdldCIsInBvc3QiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUVBLElBQU1BLE9BQU8sTUFBYjtBQUNBLElBQU1DLE9BQU8sc0JBQWI7QUFDQSxJQUFNQyxPQUFPLFNBQVBBLElBQU8sQ0FBQ0MsTUFBRCxFQUFzQjtBQUFBLHNDQUFWQyxLQUFVO0FBQVZBLGFBQVU7QUFBQTs7QUFBQSxRQUN4QkMsR0FEd0IsR0FDVUQsS0FEVjtBQUFBLFFBQ25CRSxLQURtQixHQUNVRixLQURWO0FBQUEsa0JBQ1VBLEtBRFY7QUFBQSxRQUNaRyxXQURZLDJCQUNFLElBREY7O0FBRS9CLFFBQU1DLFdBQVdDLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCSixLQUFsQixFQUF5QixFQUFFTixVQUFGLEVBQXpCLENBQWpCO0FBQ0E7QUFDQSxRQUFNVyxNQUFNQyxlQUFLQyxjQUFMLENBQW9CLEtBQXBCLENBQVo7QUFDQUMsWUFBUUMsR0FBUixDQUFZLE1BQVosRUFBb0JWLEdBQXBCO0FBQ0FTLFlBQVFDLEdBQVIsQ0FBWSxNQUFaLEVBQW9CUCxRQUFwQjtBQUNBRCxtQkFBZUssZUFBS0wsV0FBcEIsSUFBbUNLLGVBQUtMLFdBQUwsQ0FBaUIsRUFBRVMsT0FBTyxLQUFULEVBQWdCQyxNQUFNLElBQXRCLEVBQWpCLENBQW5DO0FBQ0EsV0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFhO0FBQzVCUCx1QkFBS1EsT0FBTCxDQUFhO0FBQ1RmLGlCQUFLSixPQUFPSSxHQUFQLElBQWMsQ0FBQ0EsSUFBSWdCLE9BQUosQ0FBWSxHQUFaLENBQUQsR0FBb0IsRUFBcEIsR0FBeUIsR0FBdkMsSUFBOEMsQ0FBQyxDQUFDLElBQUlDLElBQUosRUFBRixFQUFjQyxRQUFkLENBQXVCLEVBQXZCLEVBQTJCQyxNQUEzQixDQUFrQyxDQUFsQyxDQUQxQztBQUVUQyxrQkFBTWpCLFFBRkc7QUFHVEwsb0JBQVFBLE1BSEM7QUFJVHVCLHNCQUFVLE1BSkQ7QUFLVEMsb0JBQVE7QUFDSixnQ0FBZ0J4QixXQUFXLEtBQVgsR0FBbUIsa0JBQW5CLEdBQXdDLGlEQURwRDtBQUVKeUIscUJBQUtqQixPQUFPLGFBRlI7QUFHSmtCLHlCQUFTO0FBSEw7QUFMQyxTQUFiLEVBVUdDLElBVkgsQ0FVUSxVQUFDQyxRQUFELEVBQWM7QUFDbEJqQixvQkFBUUMsR0FBUixDQUFZLFVBQVosRUFBd0JnQixRQUF4QjtBQUNBeEIsMkJBQWVLLGVBQUtvQixXQUFwQixJQUFtQ3BCLGVBQUtvQixXQUFMLEVBQW5DO0FBRmtCLGlDQUdXRCxTQUFTTixJQUhwQjtBQUFBLGdCQUdWUSxLQUhVLGtCQUdWQSxLQUhVO0FBQUEsZ0JBR0hDLEdBSEcsa0JBR0hBLEdBSEc7QUFBQSxnQkFHRVQsSUFIRixrQkFHRUEsSUFIRjs7QUFJbEIsZ0JBQUlRLFVBQVUsR0FBZCxFQUFtQjtBQUNmZCx3QkFBUSxDQUFDLElBQUQsRUFBT00sSUFBUCxDQUFSO0FBQ0gsYUFGRCxNQUVPLElBQUlRLFVBQVUsQ0FBQyxLQUFmLEVBQXNCO0FBQ3pCLGtDQUFNQyxHQUFOO0FBQ0FDLDJCQUFXLFlBQU07QUFDYnZCLG1DQUFLd0IsUUFBTCxDQUFjO0FBQ1YvQiw2QkFBSztBQURLLHFCQUFkO0FBR0gsaUJBSkQsRUFJRyxJQUpIO0FBS0gsYUFQTSxNQU9BO0FBQ0hjLHdCQUFRLENBQUNlLEdBQUQsQ0FBUjtBQUNIO0FBQ0osU0ExQkQsRUEwQkdHLEtBMUJILENBMEJTLFVBQUNDLEdBQUQsRUFBUztBQUNkL0IsMkJBQWVLLGVBQUtvQixXQUFwQixJQUFtQ3BCLGVBQUtvQixXQUFMLEVBQW5DO0FBQ0FiLG9CQUFRLENBQUNtQixJQUFJQyxNQUFMLENBQVI7QUFDSCxTQTdCRDtBQThCSCxLQS9CTSxDQUFQO0FBZ0NILENBeENEOztBQTBDQUMsT0FBT0MsT0FBUCxDQUFlQyxHQUFmLEdBQXFCO0FBQUEsdUNBQUl0QyxLQUFKO0FBQUlBLGFBQUo7QUFBQTs7QUFBQSxXQUFjRix1QkFBSyxLQUFMLFNBQWVFLEtBQWYsRUFBZDtBQUFBLENBQXJCOztBQUVBb0MsT0FBT0MsT0FBUCxDQUFlRSxJQUFmLEdBQXNCO0FBQUEsdUNBQUl2QyxLQUFKO0FBQUlBLGFBQUo7QUFBQTs7QUFBQSxXQUFjRix1QkFBSyxNQUFMLFNBQWdCRSxLQUFoQixFQUFkO0FBQUEsQ0FBdEIiLCJmaWxlIjoiYWpheFAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IHsgdG9hc3QgfSBmcm9tICcuL2luZGV4JztcclxuXHJcbmNvbnN0IHRlc3QgPSAndGVzdCc7XHJcbmNvbnN0IGhvc3QgPSAnaHR0cHM6Ly95YW9mYS41OC5jb20nO1xyXG5jb25zdCBodHRwID0gKG1ldGhvZCwgLi4ucHJvcHMpID0+IHtcclxuICAgIGNvbnN0IFt1cmwsIHBhcmFtLCBzaG93TG9hZGluZyA9IHRydWVdID0gcHJvcHM7XHJcbiAgICBjb25zdCBzZW5kRGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHBhcmFtLCB7IHRlc3QgfSk7XHJcbiAgICAvLyBwcHXliqDlhaVoZWFkZXJcclxuICAgIGNvbnN0IHBwdSA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3BwdScpO1xyXG4gICAgY29uc29sZS5sb2coJ+ivt+axguaOpeWPoycsIHVybCk7XHJcbiAgICBjb25zb2xlLmxvZygn6K+35rGC5Y+C5pWwJywgc2VuZERhdGEpO1xyXG4gICAgc2hvd0xvYWRpbmcgJiYgd2VweS5zaG93TG9hZGluZyAmJiB3ZXB5LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfliqDovb3kuK0nLCBtYXNrOiB0cnVlIH0pO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOiBob3N0ICsgdXJsICsgKH51cmwuaW5kZXhPZignPycpID8gJycgOiAnPycpICsgKCtuZXcgRGF0ZSgpKS50b1N0cmluZygzNikuc3Vic3RyKDMpLFxyXG4gICAgICAgICAgICBkYXRhOiBzZW5kRGF0YSxcclxuICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6IG1ldGhvZCA9PT0gJ0dFVCcgPyAnYXBwbGljYXRpb24vanNvbicgOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgICAgICAgUFBVOiBwcHUgfHwgJ3dhbmdob25neXVlJyxcclxuICAgICAgICAgICAgICAgIHJlcWZyb206ICdiaXpfYXNzaXN0YW50JyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncmVzcG9uc2UnLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgIHNob3dMb2FkaW5nICYmIHdlcHkuaGlkZUxvYWRpbmcgJiYgd2VweS5oaWRlTG9hZGluZygpO1xyXG4gICAgICAgICAgICBjb25zdCB7IHN0YXRlLCBtc2csIGRhdGEgfSA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKFtudWxsLCBkYXRhXSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IC0xMDAwMSkge1xyXG4gICAgICAgICAgICAgICAgdG9hc3QobXNnKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHdlcHkucmVMYXVuY2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcuLi9wYWdlcy9pbnRybycsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoW21zZ10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICBzaG93TG9hZGluZyAmJiB3ZXB5LmhpZGVMb2FkaW5nICYmIHdlcHkuaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgcmVzb2x2ZShbZXJyLmVyck1zZ10pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5nZXQgPSAoLi4ucHJvcHMpID0+IGh0dHAoJ0dFVCcsIC4uLnByb3BzKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzLnBvc3QgPSAoLi4ucHJvcHMpID0+IGh0dHAoJ1BPU1QnLCAuLi5wcm9wcyk7XHJcbiJdfQ==
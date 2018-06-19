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
            console.log('ajaxOrder.response', response);
            showLoading && _wepy2.default.hideLoading && _wepy2.default.hideLoading();
            var _response$data = response.data,
                state = _response$data.state,
                msg = _response$data.msg;

            if (state === 100) {
                resolve([null, response.data]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFqYXhPcmRlci5qcyJdLCJuYW1lcyI6WyJ0ZXN0IiwiaG9zdCIsImh0dHAiLCJtZXRob2QiLCJwcm9wcyIsInVybCIsInBhcmFtIiwic2hvd0xvYWRpbmciLCJzZW5kRGF0YSIsIk9iamVjdCIsImFzc2lnbiIsInBwdSIsIndlcHkiLCJnZXRTdG9yYWdlU3luYyIsImNvbnNvbGUiLCJsb2ciLCJ0aXRsZSIsIm1hc2siLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlcXVlc3QiLCJpbmRleE9mIiwiRGF0ZSIsInRvU3RyaW5nIiwic3Vic3RyIiwiZGF0YSIsImRhdGFUeXBlIiwiaGVhZGVyIiwiUFBVIiwicmVxZnJvbSIsIllrdVlkWThyazVBczRUMlFhSjd2IiwidGhlbiIsInJlc3BvbnNlIiwiaGlkZUxvYWRpbmciLCJzdGF0ZSIsIm1zZyIsImNhdGNoIiwiZXJyIiwiZXJyTXNnIiwibW9kdWxlIiwiZXhwb3J0cyIsImdldCIsInBvc3QiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUVBLElBQU1BLE9BQU8sTUFBYjtBQUNBLElBQU1DLE9BQU8sc0JBQWI7QUFDQSxJQUFNQyxPQUFPLFNBQVBBLElBQU8sQ0FBQ0MsTUFBRCxFQUFzQjtBQUFBLHNDQUFWQyxLQUFVO0FBQVZBLGFBQVU7QUFBQTs7QUFBQSxRQUN4QkMsR0FEd0IsR0FDVUQsS0FEVjtBQUFBLFFBQ25CRSxLQURtQixHQUNVRixLQURWO0FBQUEsa0JBQ1VBLEtBRFY7QUFBQSxRQUNaRyxXQURZLDJCQUNFLElBREY7O0FBRS9CLFFBQU1DLFdBQVdDLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCSixLQUFsQixFQUF5QixFQUFFTixVQUFGLEVBQXpCLENBQWpCO0FBQ0E7QUFDQSxRQUFNVyxNQUFNQyxlQUFLQyxjQUFMLENBQW9CLEtBQXBCLENBQVo7QUFDQUMsWUFBUUMsR0FBUixDQUFZLE1BQVosRUFBb0JWLEdBQXBCO0FBQ0FTLFlBQVFDLEdBQVIsQ0FBWSxNQUFaLEVBQW9CVCxLQUFwQjtBQUNBQyxtQkFBZUssZUFBS0wsV0FBcEIsSUFBbUNLLGVBQUtMLFdBQUwsQ0FBaUIsRUFBRVMsT0FBTyxLQUFULEVBQWdCQyxNQUFNLElBQXRCLEVBQWpCLENBQW5DO0FBQ0EsV0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFhO0FBQzVCUCx1QkFBS1EsT0FBTCxDQUFhO0FBQ1RmLGlCQUFLSixPQUFPSSxHQUFQLElBQWMsQ0FBQ0EsSUFBSWdCLE9BQUosQ0FBWSxHQUFaLENBQUQsR0FBb0IsRUFBcEIsR0FBeUIsR0FBdkMsSUFBOEMsQ0FBQyxDQUFDLElBQUlDLElBQUosRUFBRixFQUFjQyxRQUFkLENBQXVCLEVBQXZCLEVBQTJCQyxNQUEzQixDQUFrQyxDQUFsQyxDQUQxQztBQUVUQyxrQkFBTWpCLFFBRkc7QUFHVEwsb0JBQVFBLE1BSEM7QUFJVHVCLHNCQUFVLE1BSkQ7QUFLVEMsb0JBQVE7QUFDSixnQ0FBZ0J4QixXQUFXLEtBQVgsR0FBbUIsa0JBQW5CLEdBQXdDLGlEQURwRDtBQUVKeUIscUJBQUtqQixPQUFPLGFBRlI7QUFHSmtCLHlCQUFTLGVBSEw7QUFJSkMsc0NBQXNCO0FBSmxCO0FBTEMsU0FBYixFQVdHQyxJQVhILENBV1EsVUFBQ0MsUUFBRCxFQUFjO0FBQ2xCbEIsb0JBQVFDLEdBQVIsQ0FBWSxvQkFBWixFQUFrQ2lCLFFBQWxDO0FBQ0F6QiwyQkFBZUssZUFBS3FCLFdBQXBCLElBQW1DckIsZUFBS3FCLFdBQUwsRUFBbkM7QUFGa0IsaUNBR0tELFNBQVNQLElBSGQ7QUFBQSxnQkFHVlMsS0FIVSxrQkFHVkEsS0FIVTtBQUFBLGdCQUdIQyxHQUhHLGtCQUdIQSxHQUhHOztBQUlsQixnQkFBSUQsVUFBVSxHQUFkLEVBQW1CO0FBQ2ZmLHdCQUFRLENBQUMsSUFBRCxFQUFPYSxTQUFTUCxJQUFoQixDQUFSO0FBQ0gsYUFGRCxNQUVPO0FBQ0hOLHdCQUFRLENBQUNnQixHQUFELENBQVI7QUFDSDtBQUNKLFNBcEJELEVBb0JHQyxLQXBCSCxDQW9CUyxVQUFDQyxHQUFELEVBQVM7QUFDZDlCLDJCQUFlSyxlQUFLcUIsV0FBcEIsSUFBbUNyQixlQUFLcUIsV0FBTCxFQUFuQztBQUNBZCxvQkFBUSxDQUFDa0IsSUFBSUMsTUFBTCxDQUFSO0FBQ0gsU0F2QkQ7QUF3QkgsS0F6Qk0sQ0FBUDtBQTBCSCxDQWxDRDs7QUFvQ0FDLE9BQU9DLE9BQVAsQ0FBZUMsR0FBZixHQUFxQjtBQUFBLHVDQUFJckMsS0FBSjtBQUFJQSxhQUFKO0FBQUE7O0FBQUEsV0FBY0YsdUJBQUssS0FBTCxTQUFlRSxLQUFmLEVBQWQ7QUFBQSxDQUFyQjs7QUFFQW1DLE9BQU9DLE9BQVAsQ0FBZUUsSUFBZixHQUFzQjtBQUFBLHVDQUFJdEMsS0FBSjtBQUFJQSxhQUFKO0FBQUE7O0FBQUEsV0FBY0YsdUJBQUssTUFBTCxTQUFnQkUsS0FBaEIsRUFBZDtBQUFBLENBQXRCIiwiZmlsZSI6ImFqYXhPcmRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgeyB0b2FzdCB9IGZyb20gJy4vaW5kZXgnO1xyXG5cclxuY29uc3QgdGVzdCA9ICd0ZXN0JztcclxuY29uc3QgaG9zdCA9ICdodHRwczovL3lhb2ZhLjU4LmNvbSc7XHJcbmNvbnN0IGh0dHAgPSAobWV0aG9kLCAuLi5wcm9wcykgPT4ge1xyXG4gICAgY29uc3QgW3VybCwgcGFyYW0sIHNob3dMb2FkaW5nID0gdHJ1ZV0gPSBwcm9wcztcclxuICAgIGNvbnN0IHNlbmREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgcGFyYW0sIHsgdGVzdCB9KTtcclxuICAgIC8vIHBwdeWKoOWFpWhlYWRlclxyXG4gICAgY29uc3QgcHB1ID0gd2VweS5nZXRTdG9yYWdlU3luYygncHB1Jyk7XHJcbiAgICBjb25zb2xlLmxvZygn6K+35rGC5o6l5Y+jJywgdXJsKTtcclxuICAgIGNvbnNvbGUubG9nKCfor7fmsYLlj4LmlbAnLCBwYXJhbSk7XHJcbiAgICBzaG93TG9hZGluZyAmJiB3ZXB5LnNob3dMb2FkaW5nICYmIHdlcHkuc2hvd0xvYWRpbmcoeyB0aXRsZTogJ+WKoOi9veS4rScsIG1hc2s6IHRydWUgfSk7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6IGhvc3QgKyB1cmwgKyAofnVybC5pbmRleE9mKCc/JykgPyAnJyA6ICc/JykgKyAoK25ldyBEYXRlKCkpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMyksXHJcbiAgICAgICAgICAgIGRhdGE6IHNlbmREYXRhLFxyXG4gICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAnY29udGVudC10eXBlJzogbWV0aG9kID09PSAnR0VUJyA/ICdhcHBsaWNhdGlvbi9qc29uJyA6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAgICAgICBQUFU6IHBwdSB8fCAnd2FuZ2hvbmd5dWUnLFxyXG4gICAgICAgICAgICAgICAgcmVxZnJvbTogJ2Jpel9hc3Npc3RhbnQnLFxyXG4gICAgICAgICAgICAgICAgWWt1WWRZOHJrNUFzNFQyUWFKN3Y6ICcxNTI5MzU4MzU3NTU1OScsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2FqYXhPcmRlci5yZXNwb25zZScsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgc2hvd0xvYWRpbmcgJiYgd2VweS5oaWRlTG9hZGluZyAmJiB3ZXB5LmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgc3RhdGUsIG1zZyB9ID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgaWYgKHN0YXRlID09PSAxMDApIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoW251bGwsIHJlc3BvbnNlLmRhdGFdKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoW21zZ10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICBzaG93TG9hZGluZyAmJiB3ZXB5LmhpZGVMb2FkaW5nICYmIHdlcHkuaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgcmVzb2x2ZShbZXJyLmVyck1zZ10pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5nZXQgPSAoLi4ucHJvcHMpID0+IGh0dHAoJ0dFVCcsIC4uLnByb3BzKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzLnBvc3QgPSAoLi4ucHJvcHMpID0+IGh0dHAoJ1BPU1QnLCAuLi5wcm9wcyk7XHJcbiJdfQ==
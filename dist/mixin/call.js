'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// const app = getApp();

var _require = require('./../utils/ajax.js'),
    get = _require.get;

var loadTelUrl = '/other/encrypt/phone';

module.exports = {
    callTap: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var _ref2, data;

            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return get(loadTelUrl, { from: this.data.pageType });

                        case 2:
                            _ref2 = _context.sent;
                            data = _ref2.data;

                            if (data) {
                                _context.next = 7;
                                break;
                            }

                            wx.showModal({ title: '提示', content: '获取号码出错' });
                            return _context.abrupt('return');

                        case 7:

                            wx.makePhoneCall({ phoneNumber: data });

                        case 8:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function callTap() {
            return _ref.apply(this, arguments);
        }

        return callTap;
    }()
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbGwuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImdldCIsImxvYWRUZWxVcmwiLCJtb2R1bGUiLCJleHBvcnRzIiwiY2FsbFRhcCIsImZyb20iLCJkYXRhIiwicGFnZVR5cGUiLCJ3eCIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsIm1ha2VQaG9uZUNhbGwiLCJwaG9uZU51bWJlciJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOztlQUVnQkEsUUFBUSxlQUFSLEM7SUFBUkMsRyxZQUFBQSxHOztBQUVSLElBQU1DLGFBQWEsc0JBQW5COztBQUVBQyxPQUFPQyxPQUFQLEdBQWlCO0FBQ1BDLFdBRE87QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQ0FLY0osSUFBSUMsVUFBSixFQUFnQixFQUFFSSxNQUFNLEtBQUtDLElBQUwsQ0FBVUMsUUFBbEIsRUFBaEIsQ0FMZDs7QUFBQTtBQUFBO0FBS0RELGdDQUxDLFNBS0RBLElBTEM7O0FBQUEsZ0NBTUpBLElBTkk7QUFBQTtBQUFBO0FBQUE7O0FBT0xFLCtCQUFHQyxTQUFILENBQWEsRUFBRUMsT0FBTyxJQUFULEVBQWVDLFNBQVMsUUFBeEIsRUFBYjtBQVBLOztBQUFBOztBQVdUSCwrQkFBR0ksYUFBSCxDQUFpQixFQUFFQyxhQUFhUCxJQUFmLEVBQWpCOztBQVhTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsQ0FBakIiLCJmaWxlIjoiY2FsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGNvbnN0IGFwcCA9IGdldEFwcCgpO1xuXG5jb25zdCB7IGdldCB9ID0gcmVxdWlyZSgnLi4vdXRpbHMvYWpheCcpO1xuXG5jb25zdCBsb2FkVGVsVXJsID0gJy9vdGhlci9lbmNyeXB0L3Bob25lJztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYXN5bmMgY2FsbFRhcCgpIHtcbiAgICAgICAgLy8gY29uc3QgYXBwID0gZ2V0QXBwKCk7XG4gICAgICAgIC8vIGNvbnN0IHsgYXBwaWQsIHVzZXJpZCB9ID0gYXBwLmdsb2JhbERhdGEuZXh0Q29uZmlnO1xuICAgICAgICAvLyBTZW5kQ2xpY2tMb2coYXBwaWQsIHVzZXJpZCwgJ3t9JywgJ2p6X3hjeF9jYWxsX2Fza0NhbGwnKTtcbiAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBnZXQobG9hZFRlbFVybCwgeyBmcm9tOiB0aGlzLmRhdGEucGFnZVR5cGUgfSk7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgd3guc2hvd01vZGFsKHsgdGl0bGU6ICfmj5DnpLonLCBjb250ZW50OiAn6I635Y+W5Y+356CB5Ye66ZSZJyB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHd4Lm1ha2VQaG9uZUNhbGwoeyBwaG9uZU51bWJlcjogZGF0YSB9KTtcbiAgICB9LFxufTtcbiJdfQ==
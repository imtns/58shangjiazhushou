'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// import { SendClickLog } from '../../utils/maidian.js';
/*eslint-disable */
var app = getApp();

var _require = require('./../../../utils/ajax.js'),
    get = _require.get;

var _require2 = require('./../../../utils/index.js'),
    picSrcDomain = _require2.picSrcDomain;

var loadTelUrl = '/other/encrypt/phone';

module.exports = {
    // sendLogFriend () {
    //     const app = getApp();
    //     const { appid, userid } = app.globalData.extConfig;
    //     // SendClickLog(appid, userid, '{}', 'jz_xcx_call_shareFriend');
    // },
    // sendLogCode () {
    //     const app = getApp();
    //     const { appid, userid } = app.globalData.extConfig;
    //     SendClickLog(appid, userid, '{}', 'jz_xcx_call_shareCode');
    // },
    onMenuFixed: function onMenuFixed(e) {
        var index = e.currentTarget.dataset.index;
        var page_data = this.data.page_data;

        page_data[index].props.cfg.showCallMenu = !page_data[index].props.cfg.showCallMenu;
        this.setData({
            page_data: page_data
        });
    },
    tabQrcode: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
            var _ref2, data;

            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return get('/releaseMpCode/' + wx.getStorageSync('releaseId'), {
                                packing: 'packing'
                            });

                        case 2:
                            _ref2 = _context.sent;
                            data = _ref2.data;

                            wx.previewImage({
                                urls: [picSrcDomain() + data]
                            });

                        case 5:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function tabQrcode(_x) {
            return _ref.apply(this, arguments);
        }

        return tabQrcode;
    }()
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbGwuanMiXSwibmFtZXMiOlsiYXBwIiwiZ2V0QXBwIiwicmVxdWlyZSIsImdldCIsInBpY1NyY0RvbWFpbiIsImxvYWRUZWxVcmwiLCJtb2R1bGUiLCJleHBvcnRzIiwib25NZW51Rml4ZWQiLCJlIiwiaW5kZXgiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsInBhZ2VfZGF0YSIsImRhdGEiLCJwcm9wcyIsImNmZyIsInNob3dDYWxsTWVudSIsInNldERhdGEiLCJ0YWJRcmNvZGUiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwicGFja2luZyIsInByZXZpZXdJbWFnZSIsInVybHMiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0EsSUFBTUEsTUFBTUMsUUFBWjs7ZUFFZ0JDLFFBQVEscUJBQVIsQztJQUFSQyxHLFlBQUFBLEc7O2dCQUNpQkQsUUFBUSxzQkFBUixDO0lBQWpCRSxZLGFBQUFBLFk7O0FBRVIsSUFBTUMsYUFBYSxzQkFBbkI7O0FBRUFDLE9BQU9DLE9BQVAsR0FBaUI7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQyxlQVhhLHVCQVdEQyxDQVhDLEVBV0U7QUFBQSxZQUNIQyxLQURHLEdBQ09ELEVBQUVFLGFBQUYsQ0FBZ0JDLE9BRHZCLENBQ0hGLEtBREc7QUFBQSxZQUVIRyxTQUZHLEdBRVcsS0FBS0MsSUFGaEIsQ0FFSEQsU0FGRzs7QUFHWEEsa0JBQVVILEtBQVYsRUFBaUJLLEtBQWpCLENBQXVCQyxHQUF2QixDQUEyQkMsWUFBM0IsR0FBMEMsQ0FBQ0osVUFBVUgsS0FBVixFQUFpQkssS0FBakIsQ0FBdUJDLEdBQXZCLENBQTJCQyxZQUF0RTtBQUNBLGFBQUtDLE9BQUwsQ0FBYTtBQUNUTCx1QkFBV0E7QUFERixTQUFiO0FBR0gsS0FsQlk7QUFtQlBNLGFBbkJPO0FBQUEsNEZBbUJHVixDQW5CSDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQ0FzQmNOLHdCQUFzQmlCLEdBQUdDLGNBQUgsQ0FBa0IsV0FBbEIsQ0FBdEIsRUFBd0Q7QUFDM0VDLHlDQUFTO0FBRGtFLDZCQUF4RCxDQXRCZDs7QUFBQTtBQUFBO0FBc0JEUixnQ0F0QkMsU0FzQkRBLElBdEJDOztBQXlCVE0sK0JBQUdHLFlBQUgsQ0FBZ0I7QUFDWkMsc0NBQU0sQ0FBQ3BCLGlCQUFpQlUsSUFBbEI7QUFETSw2QkFBaEI7O0FBekJTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsQ0FBakIiLCJmaWxlIjoiY2FsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IFNlbmRDbGlja0xvZyB9IGZyb20gJy4uLy4uL3V0aWxzL21haWRpYW4uanMnO1xyXG4vKmVzbGludC1kaXNhYmxlICovXHJcbmNvbnN0IGFwcCA9IGdldEFwcCgpO1xyXG5cclxuY29uc3QgeyBnZXQgfSA9IHJlcXVpcmUoJy4uLy4uLy4uL3V0aWxzL2FqYXgnKTtcclxuY29uc3QgeyBwaWNTcmNEb21haW4gfSA9IHJlcXVpcmUoJy4uLy4uLy4uL3V0aWxzL2luZGV4Jyk7XHJcblxyXG5jb25zdCBsb2FkVGVsVXJsID0gJy9vdGhlci9lbmNyeXB0L3Bob25lJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgLy8gc2VuZExvZ0ZyaWVuZCAoKSB7XHJcbiAgICAvLyAgICAgY29uc3QgYXBwID0gZ2V0QXBwKCk7XHJcbiAgICAvLyAgICAgY29uc3QgeyBhcHBpZCwgdXNlcmlkIH0gPSBhcHAuZ2xvYmFsRGF0YS5leHRDb25maWc7XHJcbiAgICAvLyAgICAgLy8gU2VuZENsaWNrTG9nKGFwcGlkLCB1c2VyaWQsICd7fScsICdqel94Y3hfY2FsbF9zaGFyZUZyaWVuZCcpO1xyXG4gICAgLy8gfSxcclxuICAgIC8vIHNlbmRMb2dDb2RlICgpIHtcclxuICAgIC8vICAgICBjb25zdCBhcHAgPSBnZXRBcHAoKTtcclxuICAgIC8vICAgICBjb25zdCB7IGFwcGlkLCB1c2VyaWQgfSA9IGFwcC5nbG9iYWxEYXRhLmV4dENvbmZpZztcclxuICAgIC8vICAgICBTZW5kQ2xpY2tMb2coYXBwaWQsIHVzZXJpZCwgJ3t9JywgJ2p6X3hjeF9jYWxsX3NoYXJlQ29kZScpO1xyXG4gICAgLy8gfSxcclxuICAgIG9uTWVudUZpeGVkKGUpIHtcclxuICAgICAgICBjb25zdCB7IGluZGV4IH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcclxuICAgICAgICBjb25zdCB7IHBhZ2VfZGF0YSB9ID0gdGhpcy5kYXRhO1xyXG4gICAgICAgIHBhZ2VfZGF0YVtpbmRleF0ucHJvcHMuY2ZnLnNob3dDYWxsTWVudSA9ICFwYWdlX2RhdGFbaW5kZXhdLnByb3BzLmNmZy5zaG93Q2FsbE1lbnU7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgcGFnZV9kYXRhOiBwYWdlX2RhdGEsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgdGFiUXJjb2RlKGUpIHtcclxuICAgICAgICAvLyB0aGlzLnNlbmRMb2dDb2RlKCk7XHJcbiAgICAgICAgLy8gY29uc3QgeyByZWxlYXNlSWQgfSA9IGdldEFwcCgpLmdsb2JhbERhdGEuZXh0Q29uZmlnO1xyXG4gICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgZ2V0KGAvcmVsZWFzZU1wQ29kZS8ke3d4LmdldFN0b3JhZ2VTeW5jKCdyZWxlYXNlSWQnKX1gLCB7XHJcbiAgICAgICAgICAgIHBhY2tpbmc6ICdwYWNraW5nJyxcclxuICAgICAgICB9KVxyXG4gICAgICAgIHd4LnByZXZpZXdJbWFnZSh7XHJcbiAgICAgICAgICAgIHVybHM6IFtwaWNTcmNEb21haW4oKSArIGRhdGFdLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxufTtcclxuIl19
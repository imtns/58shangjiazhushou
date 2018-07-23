'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _utils = require('./../utils/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VideoPlay = function (_wepy$page) {
    _inherits(VideoPlay, _wepy$page);

    function VideoPlay() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, VideoPlay);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = VideoPlay.__proto__ || Object.getPrototypeOf(VideoPlay)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            enablePullDownRefresh: false,
            disableScroll: true,
            backgroundColor: '#000',
            navigationBarBackgroundColor: '#000',
            navigationBarTextStyle: '#000',
            navigationBarTitleText: '视频播放'
        }, _this.data = {
            videoPath: ''
        }, _this.methods = {
            play: function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    var netStatus, _ref3, cancel;

                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return (0, _utils.getNetStatus)();

                                case 2:
                                    netStatus = _context.sent;

                                    if (!(netStatus === 0)) {
                                        _context.next = 6;
                                        break;
                                    }

                                    this.stopPlay();
                                    return _context.abrupt('return');

                                case 6:
                                    if (!(netStatus === 2)) {
                                        _context.next = 12;
                                        break;
                                    }

                                    _context.next = 9;
                                    return (0, _utils.alertP)('确认在移动网络下播放？', '提示');

                                case 9:
                                    _ref3 = _context.sent;
                                    cancel = _ref3.cancel;

                                    if (cancel) {
                                        this.stopPlay();
                                    }

                                case 12:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));

                function play() {
                    return _ref2.apply(this, arguments);
                }

                return play;
            }()
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(VideoPlay, [{
        key: 'stopPlay',
        value: function stopPlay() {
            this.videoContext.pause();
        }
    }, {
        key: 'onLoad',
        value: function onLoad(options) {
            var url = options.url;

            this.setData({
                videoPath: url
            });
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            var videoContext = _wepy2.default.createVideoContext('myVideo');
            this.videoContext = videoContext;
            videoContext.play();
        }
    }]);

    return VideoPlay;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(VideoPlay , 'pages/VideoPlay'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlZpZGVvUGxheS5qcyJdLCJuYW1lcyI6WyJWaWRlb1BsYXkiLCJjb25maWciLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJkaXNhYmxlU2Nyb2xsIiwiYmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInZpZGVvUGF0aCIsIm1ldGhvZHMiLCJwbGF5IiwibmV0U3RhdHVzIiwic3RvcFBsYXkiLCJjYW5jZWwiLCJ2aWRlb0NvbnRleHQiLCJwYXVzZSIsIm9wdGlvbnMiLCJ1cmwiLCJzZXREYXRhIiwid2VweSIsImNyZWF0ZVZpZGVvQ29udGV4dCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxTOzs7Ozs7Ozs7Ozs7OztnTUFDakJDLE0sR0FBUztBQUNMQyxtQ0FBdUIsS0FEbEI7QUFFTEMsMkJBQWUsSUFGVjtBQUdMQyw2QkFBaUIsTUFIWjtBQUlMQywwQ0FBOEIsTUFKekI7QUFLTEMsb0NBQXdCLE1BTG5CO0FBTUxDLG9DQUF3QjtBQU5uQixTLFFBUVRDLEksR0FBTztBQUNIQyx1QkFBVztBQURSLFMsUUFHUEMsTyxHQUFVO0FBQ0FDLGdCQURBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkNBRXNCLDBCQUZ0Qjs7QUFBQTtBQUVJQyw2Q0FGSjs7QUFBQSwwQ0FJRUEsY0FBYyxDQUpoQjtBQUFBO0FBQUE7QUFBQTs7QUFLRSx5Q0FBS0MsUUFBTDtBQUxGOztBQUFBO0FBQUEsMENBU0VELGNBQWMsQ0FUaEI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSwyQ0FVMkIsbUJBQU8sYUFBUCxFQUFzQixJQUF0QixDQVYzQjs7QUFBQTtBQUFBO0FBVVVFLDBDQVZWLFNBVVVBLE1BVlY7O0FBV0Usd0NBQUlBLE1BQUosRUFBWTtBQUNSLDZDQUFLRCxRQUFMO0FBQ0g7O0FBYkg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxTOzs7OzttQ0FpQkM7QUFDUCxpQkFBS0UsWUFBTCxDQUFrQkMsS0FBbEI7QUFDSDs7OytCQUNPQyxPLEVBQVM7QUFBQSxnQkFDTEMsR0FESyxHQUNHRCxPQURILENBQ0xDLEdBREs7O0FBRWIsaUJBQUtDLE9BQUwsQ0FBYTtBQUNUViwyQkFBV1M7QUFERixhQUFiO0FBR0g7OztpQ0FDUztBQUNOLGdCQUFNSCxlQUFlSyxlQUFLQyxrQkFBTCxDQUF3QixTQUF4QixDQUFyQjtBQUNBLGlCQUFLTixZQUFMLEdBQW9CQSxZQUFwQjtBQUNBQSx5QkFBYUosSUFBYjtBQUNIOzs7O0VBMUNrQ1MsZUFBS0UsSTs7a0JBQXZCdEIsUyIsImZpbGUiOiJWaWRlb1BsYXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCB7IGdldE5ldFN0YXR1cywgYWxlcnRQIH0gZnJvbSAnLi4vdXRpbHMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlkZW9QbGF5IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IGZhbHNlLFxyXG4gICAgICAgIGRpc2FibGVTY3JvbGw6IHRydWUsXHJcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzAwMCcsXHJcbiAgICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyMwMDAnLFxyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICcjMDAwJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6KeG6aKR5pKt5pS+JyxcclxuICAgIH1cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgdmlkZW9QYXRoOiAnJyxcclxuICAgIH1cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgYXN5bmMgcGxheSgpIHtcclxuICAgICAgICAgICAgY29uc3QgbmV0U3RhdHVzID0gYXdhaXQgZ2V0TmV0U3RhdHVzKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAobmV0U3RhdHVzID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BQbGF5KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChuZXRTdGF0dXMgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHsgY2FuY2VsIH0gPSBhd2FpdCBhbGVydFAoJ+ehruiupOWcqOenu+WKqOe9kee7nOS4i+aSreaUvu+8nycsICfmj5DnpLonKTtcclxuICAgICAgICAgICAgICAgIGlmIChjYW5jZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BQbGF5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgfVxyXG4gICAgc3RvcFBsYXkoKSB7XHJcbiAgICAgICAgdGhpcy52aWRlb0NvbnRleHQucGF1c2UoKTtcclxuICAgIH1cclxuICAgIG9uTG9hZCAob3B0aW9ucykge1xyXG4gICAgICAgIGNvbnN0IHsgdXJsIH0gPSBvcHRpb25zO1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIHZpZGVvUGF0aDogdXJsLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgb25TaG93ICgpIHtcclxuICAgICAgICBjb25zdCB2aWRlb0NvbnRleHQgPSB3ZXB5LmNyZWF0ZVZpZGVvQ29udGV4dCgnbXlWaWRlbycpO1xyXG4gICAgICAgIHRoaXMudmlkZW9Db250ZXh0ID0gdmlkZW9Db250ZXh0O1xyXG4gICAgICAgIHZpZGVvQ29udGV4dC5wbGF5KCk7XHJcbiAgICB9XHJcbn1cclxuIl19
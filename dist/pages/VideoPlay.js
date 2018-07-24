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
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(VideoPlay, [{
        key: 'checkPlay',
        value: function () {
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
                                    _context.next = 5;
                                    break;
                                }

                                return _context.abrupt('return', false);

                            case 5:
                                if (!(netStatus === 2)) {
                                    _context.next = 12;
                                    break;
                                }

                                _context.next = 8;
                                return (0, _utils.alertP)('确认在移动网络下播放？', '提示');

                            case 8:
                                _ref3 = _context.sent;
                                cancel = _ref3.cancel;

                                if (!cancel) {
                                    _context.next = 12;
                                    break;
                                }

                                return _context.abrupt('return', false);

                            case 12:
                                return _context.abrupt('return', true);

                            case 13:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function checkPlay() {
                return _ref2.apply(this, arguments);
            }

            return checkPlay;
        }()
    }, {
        key: 'onLoad',
        value: function onLoad(options) {
            var url = options.url;

            this.videoPath = url;
        }
    }, {
        key: 'onShow',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var videoContext;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                videoContext = _wepy2.default.createVideoContext('myVideo');

                                this.videoContext = videoContext;

                                _context2.next = 4;
                                return this.checkPlay();

                            case 4:
                                if (!_context2.sent) {
                                    _context2.next = 6;
                                    break;
                                }

                                videoContext.play();

                            case 6:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function onShow() {
                return _ref4.apply(this, arguments);
            }

            return onShow;
        }()
    }]);

    return VideoPlay;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(VideoPlay , 'pages/VideoPlay'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlZpZGVvUGxheS5qcyJdLCJuYW1lcyI6WyJWaWRlb1BsYXkiLCJjb25maWciLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJkaXNhYmxlU2Nyb2xsIiwiYmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInZpZGVvUGF0aCIsIm5ldFN0YXR1cyIsImNhbmNlbCIsIm9wdGlvbnMiLCJ1cmwiLCJ2aWRlb0NvbnRleHQiLCJ3ZXB5IiwiY3JlYXRlVmlkZW9Db250ZXh0IiwiY2hlY2tQbGF5IiwicGxheSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxTOzs7Ozs7Ozs7Ozs7OztnTUFDakJDLE0sR0FBUztBQUNMQyxtQ0FBdUIsS0FEbEI7QUFFTEMsMkJBQWUsSUFGVjtBQUdMQyw2QkFBaUIsTUFIWjtBQUlMQywwQ0FBOEIsTUFKekI7QUFLTEMsb0NBQXdCLE1BTG5CO0FBTUxDLG9DQUF3QjtBQU5uQixTLFFBUVRDLEksR0FBTztBQUNIQyx1QkFBVztBQURSLFM7Ozs7Ozs7Ozs7Ozs7O3VDQUtxQiwwQjs7O0FBQWxCQyx5Qzs7c0NBRUZBLGNBQWMsQzs7Ozs7aUVBQ1AsSzs7O3NDQUdQQSxjQUFjLEM7Ozs7Ozt1Q0FDVyxtQkFBTyxhQUFQLEVBQXNCLElBQXRCLEM7Ozs7QUFBakJDLHNDLFNBQUFBLE07O3FDQUNKQSxNOzs7OztpRUFDTyxLOzs7aUVBSVIsSTs7Ozs7Ozs7Ozs7Ozs7Ozs7OytCQUVIQyxPLEVBQVM7QUFBQSxnQkFDTEMsR0FESyxHQUNHRCxPQURILENBQ0xDLEdBREs7O0FBRWIsaUJBQUtKLFNBQUwsR0FBaUJJLEdBQWpCO0FBQ0g7Ozs7Ozs7Ozs7QUFFU0MsNEMsR0FBZUMsZUFBS0Msa0JBQUwsQ0FBd0IsU0FBeEIsQzs7QUFDckIscUNBQUtGLFlBQUwsR0FBb0JBLFlBQXBCOzs7dUNBRVUsS0FBS0csU0FBTCxFOzs7Ozs7OztBQUNOSCw2Q0FBYUksSUFBYjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXRDMkJILGVBQUtJLEk7O2tCQUF2Qm5CLFMiLCJmaWxlIjoiVmlkZW9QbGF5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB7IGdldE5ldFN0YXR1cywgYWxlcnRQIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWRlb1BsYXkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiBmYWxzZSxcbiAgICAgICAgZGlzYWJsZVNjcm9sbDogdHJ1ZSxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzAwMCcsXG4gICAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjMDAwJyxcbiAgICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJyMwMDAnLFxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6KeG6aKR5pKt5pS+JyxcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgICAgdmlkZW9QYXRoOiAnJyxcbiAgICB9XG5cbiAgICBhc3luYyBjaGVja1BsYXkoKSB7XG4gICAgICAgIGNvbnN0IG5ldFN0YXR1cyA9IGF3YWl0IGdldE5ldFN0YXR1cygpO1xuXG4gICAgICAgIGlmIChuZXRTdGF0dXMgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXRTdGF0dXMgPT09IDIpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgY2FuY2VsIH0gPSBhd2FpdCBhbGVydFAoJ+ehruiupOWcqOenu+WKqOe9kee7nOS4i+aSreaUvu+8nycsICfmj5DnpLonKTtcbiAgICAgICAgICAgIGlmIChjYW5jZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgb25Mb2FkIChvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IHsgdXJsIH0gPSBvcHRpb25zO1xuICAgICAgICB0aGlzLnZpZGVvUGF0aCA9IHVybDtcbiAgICB9XG4gICAgYXN5bmMgb25TaG93ICgpIHtcbiAgICAgICAgY29uc3QgdmlkZW9Db250ZXh0ID0gd2VweS5jcmVhdGVWaWRlb0NvbnRleHQoJ215VmlkZW8nKTtcbiAgICAgICAgdGhpcy52aWRlb0NvbnRleHQgPSB2aWRlb0NvbnRleHQ7XG5cbiAgICAgICAgaWYgKGF3YWl0IHRoaXMuY2hlY2tQbGF5KCkpIHtcbiAgICAgICAgICAgIHZpZGVvQ29udGV4dC5wbGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=
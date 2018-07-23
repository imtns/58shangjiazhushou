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

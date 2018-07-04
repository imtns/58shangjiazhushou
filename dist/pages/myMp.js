'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _utils = require('./../utils/index.js');

var _ajax = require('./../utils/ajax.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
    _inherits(Index, _wepy$page);

    function Index() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Index);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            business: {
                mps: [],
                current: {
                    src: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/code7.png',
                    deadLine: '2018-09-98'
                }
            }
        }, _this.config = {
            navigationBarTitleText: '我的小程序'
        }, _this.methods = {
            shouquan: function shouquan() {
                (0, _utils.alert)('请您登录电脑端，打开https://yaofa.58.com，到授权管理页点击右上角授权按钮去授权', '提示');
            },
            decorate: function decorate(type) {
                if (type.target.dataset.address) {
                    var id = type.target.dataset.id;

                    _wepy2.default.navigateTo({
                        url: 'UploadInfo?mpid=' + id
                    });
                }
            },
            checkDetail: function checkDetail(type) {
                if (type.target.dataset.address) {
                    var id = type.target.dataset.id;

                    _wepy2.default.navigateTo({
                        url: 'AppInfo?mpid=' + id
                    });
                } else {
                    var _id = type.target.dataset.id;

                    _wepy2.default.navigateTo({
                        url: 'AppEdit?mpid=' + _id
                    });
                }
            },
            onReadytoShare: function onReadytoShare(e) {
                var id = e.target.dataset.id;
                var userInfo = e.detail.userInfo;
                // 分享会先授权

                if (!userInfo) {
                    (0, _utils.alert)('您未授权，将无法转发小程序二维码。');
                    return;
                }
                var nickName = userInfo.nickName;

                this.getMpShareImg(id, nickName);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'onShow',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var currentMpid, subData, _ref3, data, mps, _mps$filter, _mps$filter2, currentMp, others, othersMp;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                currentMpid = _wepy2.default.getStorageSync('current_mpid') || '';
                                subData = {
                                    mpid: currentMpid
                                };
                                _context.next = 4;
                                return (0, _ajax.post)('/mplogic/mymplist', subData);

                            case 4:
                                _ref3 = _context.sent;
                                data = _ref3.data;
                                mps = data.mpinfos;
                                _mps$filter = mps.filter(function (item) {
                                    return item.id === currentMpid;
                                }), _mps$filter2 = _slicedToArray(_mps$filter, 1), currentMp = _mps$filter2[0];

                                if (currentMp.headImg && currentMp.headImg.indexOf('http') === -1) {
                                    currentMp.headImg = 'https://pic1.58cdn.com.cn' + currentMp.headImg;
                                }
                                others = mps.filter(function (item) {
                                    return item.id !== currentMpid;
                                });
                                othersMp = [];

                                if (others.length > 0) {
                                    othersMp = others.map(function (element) {
                                        var item = element;
                                        if (item.headImg && item.headImg.indexOf('http') === -1) {
                                            item.headImg = 'https://pic1.58cdn.com.cn' + item.headImg;
                                        }
                                        return item;
                                    });
                                }
                                this.business = Object.assign({}, this.business, {
                                    current: currentMp,
                                    mps: othersMp
                                });
                                console.log('this.business', this.business);
                                this.$apply();

                            case 15:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function onShow() {
                return _ref2.apply(this, arguments);
            }

            return onShow;
        }()
    }, {
        key: 'onLoad',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return (0, _utils.sleep)();

                            case 2:
                                console.log('onload');

                            case 3:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function onLoad() {
                return _ref4.apply(this, arguments);
            }

            return onLoad;
        }()
    }, {
        key: 'getMpShareImg',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id, nickName) {
                var subData, _ref6, data;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                console.log('去获取拉', id, nickName);
                                subData = {
                                    id: id,
                                    nickName: nickName
                                };
                                _context3.next = 4;
                                return (0, _ajax.post)('/mplogic/mymplist', subData);

                            case 4:
                                _ref6 = _context3.sent;
                                data = _ref6.data;

                                console.log(data);

                            case 7:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getMpShareImg(_x, _x2) {
                return _ref5.apply(this, arguments);
            }

            return getMpShareImg;
        }()
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/myMp'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15TXAuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJkYXRhIiwiYnVzaW5lc3MiLCJtcHMiLCJjdXJyZW50Iiwic3JjIiwiZGVhZExpbmUiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibWV0aG9kcyIsInNob3VxdWFuIiwiZGVjb3JhdGUiLCJ0eXBlIiwidGFyZ2V0IiwiZGF0YXNldCIsImFkZHJlc3MiLCJpZCIsIndlcHkiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiY2hlY2tEZXRhaWwiLCJvblJlYWR5dG9TaGFyZSIsImUiLCJ1c2VySW5mbyIsImRldGFpbCIsIm5pY2tOYW1lIiwiZ2V0TXBTaGFyZUltZyIsImN1cnJlbnRNcGlkIiwiZ2V0U3RvcmFnZVN5bmMiLCJzdWJEYXRhIiwibXBpZCIsIm1waW5mb3MiLCJmaWx0ZXIiLCJpdGVtIiwiY3VycmVudE1wIiwiaGVhZEltZyIsImluZGV4T2YiLCJvdGhlcnMiLCJvdGhlcnNNcCIsImxlbmd0aCIsIm1hcCIsImVsZW1lbnQiLCJPYmplY3QiLCJhc3NpZ24iLCJjb25zb2xlIiwibG9nIiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ2pCQyxJLEdBQU87QUFDSEMsc0JBQVU7QUFDTkMscUJBQUssRUFEQztBQUVOQyx5QkFBUztBQUNMQyx5QkFBSywrREFEQTtBQUVMQyw4QkFBVTtBQUZMO0FBRkg7QUFEUCxTLFFBU1BDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdUQyxPLEdBQVU7QUFDTkMsb0JBRE0sc0JBQ0s7QUFDUCxrQ0FBTSxtREFBTixFQUEyRCxJQUEzRDtBQUNILGFBSEs7QUFJTkMsb0JBSk0sb0JBSUdDLElBSkgsRUFJUztBQUNYLG9CQUFJQSxLQUFLQyxNQUFMLENBQVlDLE9BQVosQ0FBb0JDLE9BQXhCLEVBQWlDO0FBQUEsd0JBQ3JCQyxFQURx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RSxFQUFJUyxROzs7Ozs7O0FBQ3BCbUIsd0NBQVFDLEdBQVIsQ0FBWSxNQUFaLEVBQW9CN0IsRUFBcEIsRUFBd0JTLFFBQXhCO0FBQ01JLHVDLEdBQVU7QUFDWmIsMENBRFk7QUFFWlM7QUFGWSxpQzs7dUNBSU8sZ0JBQUssbUJBQUwsRUFBMEJJLE9BQTFCLEM7Ozs7QUFBZjVCLG9DLFNBQUFBLEk7O0FBQ1IyQyx3Q0FBUUMsR0FBUixDQUFZNUMsSUFBWjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQTFGMkJnQixlQUFLOEIsSTs7a0JBQW5CL0MsSyIsImZpbGUiOiJteU1wLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5cclxuaW1wb3J0IHsgc2xlZXAsIGFsZXJ0IH0gZnJvbSAnLi4vdXRpbHMnO1xyXG5pbXBvcnQgeyBwb3N0IH0gZnJvbSAnLi4vdXRpbHMvYWpheCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGJ1c2luZXNzOiB7XHJcbiAgICAgICAgICAgIG1wczogW10sXHJcbiAgICAgICAgICAgIGN1cnJlbnQ6IHtcclxuICAgICAgICAgICAgICAgIHNyYzogJ2h0dHBzOi8vc3RhdGljLjU4LmNvbS9sYmcvc2hhbmdqaWF4Y3hodC96aHVzaG91L2ltZy9jb2RlNy5wbmcnLFxyXG4gICAgICAgICAgICAgICAgZGVhZExpbmU6ICcyMDE4LTA5LTk4JyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoTlsI/nqIvluo8nLFxyXG4gICAgfVxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBzaG91cXVhbigpIHtcclxuICAgICAgICAgICAgYWxlcnQoJ+ivt+aCqOeZu+W9leeUteiEkeerr++8jOaJk+W8gGh0dHBzOi8veWFvZmEuNTguY29t77yM5Yiw5o6I5p2D566h55CG6aG154K55Ye75Y+z5LiK6KeS5o6I5p2D5oyJ6ZKu5Y675o6I5p2DJywgJ+aPkOekuicpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVjb3JhdGUodHlwZSkge1xyXG4gICAgICAgICAgICBpZiAodHlwZS50YXJnZXQuZGF0YXNldC5hZGRyZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IGlkIH0gPSB0eXBlLnRhcmdldC5kYXRhc2V0O1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGBVcGxvYWRJbmZvP21waWQ9JHtpZH1gLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoZWNrRGV0YWlsKHR5cGUpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGUudGFyZ2V0LmRhdGFzZXQuYWRkcmVzcykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeyBpZCB9ID0gdHlwZS50YXJnZXQuZGF0YXNldDtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBgQXBwSW5mbz9tcGlkPSR7aWR9YCxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeyBpZCB9ID0gdHlwZS50YXJnZXQuZGF0YXNldDtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBgQXBwRWRpdD9tcGlkPSR7aWR9YCxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvblJlYWR5dG9TaGFyZShlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgaWQgfSA9IGUudGFyZ2V0LmRhdGFzZXQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgdXNlckluZm8gfSA9IGUuZGV0YWlsO1xyXG4gICAgICAgICAgICAvLyDliIbkuqvkvJrlhYjmjojmnYNcclxuICAgICAgICAgICAgaWYgKCF1c2VySW5mbykge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ+aCqOacquaOiOadg++8jOWwhuaXoOazlei9rOWPkeWwj+eoi+W6j+S6jOe7tOeggeOAgicpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHsgbmlja05hbWUgfSA9IHVzZXJJbmZvO1xyXG4gICAgICAgICAgICB0aGlzLmdldE1wU2hhcmVJbWcoaWQsIG5pY2tOYW1lKTtcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG4gICAgYXN5bmMgb25TaG93KCkge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRNcGlkID0gd2VweS5nZXRTdG9yYWdlU3luYygnY3VycmVudF9tcGlkJykgfHwgJyc7XHJcbiAgICAgICAgY29uc3Qgc3ViRGF0YSA9IHtcclxuICAgICAgICAgICAgbXBpZDogY3VycmVudE1waWQsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9tcGxvZ2ljL215bXBsaXN0Jywgc3ViRGF0YSk7XHJcbiAgICAgICAgY29uc3QgbXBzID0gZGF0YS5tcGluZm9zO1xyXG4gICAgICAgIGNvbnN0IFtjdXJyZW50TXBdID0gbXBzLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5pZCA9PT0gY3VycmVudE1waWQpO1xyXG4gICAgICAgIGlmIChjdXJyZW50TXAuaGVhZEltZyAmJiBjdXJyZW50TXAuaGVhZEltZy5pbmRleE9mKCdodHRwJykgPT09IC0xKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRNcC5oZWFkSW1nID0gYGh0dHBzOi8vcGljMS41OGNkbi5jb20uY24ke2N1cnJlbnRNcC5oZWFkSW1nfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG90aGVycyA9IG1wcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uaWQgIT09IGN1cnJlbnRNcGlkKTtcclxuICAgICAgICBsZXQgb3RoZXJzTXAgPSBbXTtcclxuICAgICAgICBpZiAob3RoZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgb3RoZXJzTXAgPSBvdGhlcnMubWFwKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5oZWFkSW1nICYmIGl0ZW0uaGVhZEltZy5pbmRleE9mKCdodHRwJykgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5oZWFkSW1nID0gYGh0dHBzOi8vcGljMS41OGNkbi5jb20uY24ke2l0ZW0uaGVhZEltZ31gO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmJ1c2luZXNzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5idXNpbmVzcywge1xyXG4gICAgICAgICAgICBjdXJyZW50OiBjdXJyZW50TXAsXHJcbiAgICAgICAgICAgIG1wczogb3RoZXJzTXAsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3RoaXMuYnVzaW5lc3MnLCB0aGlzLmJ1c2luZXNzKTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfVxyXG4gICAgYXN5bmMgb25Mb2FkKCkge1xyXG4gICAgICAgIGF3YWl0IHNsZWVwKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ29ubG9hZCcpO1xyXG4gICAgfVxyXG4gICAgYXN5bmMgZ2V0TXBTaGFyZUltZyhpZCwgbmlja05hbWUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygn5Y676I635Y+W5ouJJywgaWQsIG5pY2tOYW1lKTtcclxuICAgICAgICBjb25zdCBzdWJEYXRhID0ge1xyXG4gICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgbmlja05hbWUsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9tcGxvZ2ljL215bXBsaXN0Jywgc3ViRGF0YSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICB9XHJcbn1cclxuIl19
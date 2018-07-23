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
            },
            shareImage: ''
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
            upgrade: function upgrade(type) {
                var id = type.target.dataset.id;

                _wepy2.default.navigateTo({
                    url: 'purchase?mpid=' + id
                });
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
                    (0, _utils.alert)('您未授权，商家助手不能为您生成分享图片哦', '提示');
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

                                if (currentMp && currentMp.headImg && currentMp.headImg.indexOf('http') === -1) {
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
                var subData, delay, _ref6, data, url;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                subData = {
                                    mpId: id,
                                    nickName: nickName
                                };
                                // 延迟时间，让用户感知loading文案，故意为之。

                                delay = 1500;
                                _context3.next = 4;
                                return (0, _ajax.post)('/mplogic/share', subData, '', {
                                    loadingTitle: '图片生成...',
                                    delay: delay
                                });

                            case 4:
                                _ref6 = _context3.sent;
                                data = _ref6.data;
                                url = 'http://pic1.58cdn.com.cn/' + data;

                                setTimeout(function () {
                                    _wepy2.default.previewImage({
                                        current: url, // 当前显示图片的http链接
                                        urls: [url] // 需要预览的图片http链接列表
                                    });
                                }, delay);
                                console.log(data);

                            case 9:
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15TXAuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJkYXRhIiwiYnVzaW5lc3MiLCJtcHMiLCJjdXJyZW50Iiwic3JjIiwiZGVhZExpbmUiLCJzaGFyZUltYWdlIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm1ldGhvZHMiLCJzaG91cXVhbiIsImRlY29yYXRlIiwidHlwZSIsInRhcmdldCIsImRhdGFzZXQiLCJhZGRyZXNzIiwiaWQiLCJ3ZXB5IiwibmF2aWdhdGVUbyIsInVybCIsInVwZ3JhZGUiLCJjaGVja0RldGFpbCIsIm9uUmVhZHl0b1NoYXJlIiwiZSIsInVzZXJJbmZvIiwiZGV0YWlsIiwibmlja05hbWUiLCJnZXRNcFNoYXJlSW1nIiwiY3VycmVudE1waWQiLCJnZXRTdG9yYWdlU3luYyIsInN1YkRhdGEiLCJtcGlkIiwibXBpbmZvcyIsImZpbHRlciIsIml0ZW0iLCJjdXJyZW50TXAiLCJoZWFkSW1nIiwiaW5kZXhPZiIsIm90aGVycyIsIm90aGVyc01wIiwibGVuZ3RoIiwibWFwIiwiZWxlbWVudCIsIk9iamVjdCIsImFzc2lnbiIsImNvbnNvbGUiLCJsb2ciLCIkYXBwbHkiLCJtcElkIiwiZGVsYXkiLCJsb2FkaW5nVGl0bGUiLCJzZXRUaW1lb3V0IiwicHJldmlld0ltYWdlIiwidXJscyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsSSxHQUFPO0FBQ0hDLHNCQUFVO0FBQ05DLHFCQUFLLEVBREM7QUFFTkMseUJBQVM7QUFDTEMseUJBQUssK0RBREE7QUFFTEMsOEJBQVU7QUFGTDtBQUZILGFBRFA7QUFRSEMsd0JBQVk7QUFSVCxTLFFBVVBDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdUQyxPLEdBQVU7QUFDTkMsb0JBRE0sc0JBQ0s7QUFDUCxrQ0FBTSxtREFBTixFQUEyRCxJQUEzRDtBQUNI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Q0FBS2pDLFFBQUwsR0FBZ0IwQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQixLQUFLM0MsUUFBdkIsRUFBaUM7QUFDN0NFLDZDQUFTZ0MsU0FEb0M7QUFFN0NqQyx5Q0FBS3FDO0FBRndDLGlDQUFqQyxDQUFoQjtBQUlBTSx3Q0FBUUMsR0FBUixDQUFZLGVBQVosRUFBNkIsS0FBSzdDLFFBQWxDO0FBQ0EscUNBQUs4QyxNQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VDQUdNLG1COzs7QUFDTkYsd0NBQVFDLEdBQVIsQ0FBWSxRQUFaOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tHQUVnQjlCLEUsRUFBSVUsUTs7Ozs7OztBQUNkSSx1QyxHQUFVO0FBQ1prQiwwQ0FBTWhDLEVBRE07QUFFWlU7QUFGWSxpQztBQUloQjs7QUFDTXVCLHFDLEdBQVEsSTs7dUNBQ1MsZ0JBQUssZ0JBQUwsRUFBdUJuQixPQUF2QixFQUFnQyxFQUFoQyxFQUFvQztBQUN2RG9CLGtEQUFjLFNBRHlDO0FBRXZERDtBQUZ1RCxpQ0FBcEMsQzs7OztBQUFmakQsb0MsU0FBQUEsSTtBQUlGbUIsbUMsaUNBQWtDbkIsSTs7QUFDeENtRCwyQ0FBVyxZQUFNO0FBQ2JsQyxtREFBS21DLFlBQUwsQ0FBa0I7QUFDZGpELGlEQUFTZ0IsR0FESyxFQUNBO0FBQ2RrQyw4Q0FBTSxDQUFDbEMsR0FBRCxDQUZRLENBRUQ7QUFGQyxxQ0FBbEI7QUFJSCxpQ0FMRCxFQUtHOEIsS0FMSDtBQU1BSix3Q0FBUUMsR0FBUixDQUFZOUMsSUFBWjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQTVHMkJpQixlQUFLcUMsSTs7a0JBQW5CdkQsSyIsImZpbGUiOiJteU1wLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5cclxuaW1wb3J0IHsgc2xlZXAsIGFsZXJ0IH0gZnJvbSAnLi4vdXRpbHMnO1xyXG5pbXBvcnQgeyBwb3N0IH0gZnJvbSAnLi4vdXRpbHMvYWpheCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGJ1c2luZXNzOiB7XHJcbiAgICAgICAgICAgIG1wczogW10sXHJcbiAgICAgICAgICAgIGN1cnJlbnQ6IHtcclxuICAgICAgICAgICAgICAgIHNyYzogJ2h0dHBzOi8vc3RhdGljLjU4LmNvbS9sYmcvc2hhbmdqaWF4Y3hodC96aHVzaG91L2ltZy9jb2RlNy5wbmcnLFxyXG4gICAgICAgICAgICAgICAgZGVhZExpbmU6ICcyMDE4LTA5LTk4JyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNoYXJlSW1hZ2U6ICcnLFxyXG4gICAgfVxyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoTlsI/nqIvluo8nLFxyXG4gICAgfVxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBzaG91cXVhbigpIHtcclxuICAgICAgICAgICAgYWxlcnQoJ+ivt+aCqOeZu+W9leeUteiEkeerr++8jOaJk+W8gGh0dHBzOi8veWFvZmEuNTguY29t77yM5Yiw5o6I5p2D566h55CG6aG154K55Ye75Y+z5LiK6KeS5o6I5p2D5oyJ6ZKu5Y675o6I5p2DJywgJ+aPkOekuicpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVjb3JhdGUodHlwZSkge1xyXG4gICAgICAgICAgICBpZiAodHlwZS50YXJnZXQuZGF0YXNldC5hZGRyZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IGlkIH0gPSB0eXBlLnRhcmdldC5kYXRhc2V0O1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGBVcGxvYWRJbmZvP21waWQ9JHtpZH1gLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHVwZ3JhZGUodHlwZSkge1xyXG4gICAgICAgICAgICBjb25zdCB7IGlkIH0gPSB0eXBlLnRhcmdldC5kYXRhc2V0O1xyXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBgcHVyY2hhc2U/bXBpZD0ke2lkfWAsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2hlY2tEZXRhaWwodHlwZSkge1xyXG4gICAgICAgICAgICBpZiAodHlwZS50YXJnZXQuZGF0YXNldC5hZGRyZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IGlkIH0gPSB0eXBlLnRhcmdldC5kYXRhc2V0O1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGBBcHBJbmZvP21waWQ9JHtpZH1gLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IGlkIH0gPSB0eXBlLnRhcmdldC5kYXRhc2V0O1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGBBcHBFZGl0P21waWQ9JHtpZH1gLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uUmVhZHl0b1NoYXJlKGUpIHtcclxuICAgICAgICAgICAgY29uc3QgeyBpZCB9ID0gZS50YXJnZXQuZGF0YXNldDtcclxuICAgICAgICAgICAgY29uc3QgeyB1c2VySW5mbyB9ID0gZS5kZXRhaWw7XHJcbiAgICAgICAgICAgIC8vIOWIhuS6q+S8muWFiOaOiOadg1xyXG4gICAgICAgICAgICBpZiAoIXVzZXJJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgn5oKo5pyq5o6I5p2D77yM5ZWG5a625Yqp5omL5LiN6IO95Li65oKo55Sf5oiQ5YiG5Lqr5Zu+54mH5ZOmJywgJ+aPkOekuicpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHsgbmlja05hbWUgfSA9IHVzZXJJbmZvO1xyXG4gICAgICAgICAgICB0aGlzLmdldE1wU2hhcmVJbWcoaWQsIG5pY2tOYW1lKTtcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG4gICAgYXN5bmMgb25TaG93KCkge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRNcGlkID0gd2VweS5nZXRTdG9yYWdlU3luYygnY3VycmVudF9tcGlkJykgfHwgJyc7XHJcbiAgICAgICAgY29uc3Qgc3ViRGF0YSA9IHtcclxuICAgICAgICAgICAgbXBpZDogY3VycmVudE1waWQsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9tcGxvZ2ljL215bXBsaXN0Jywgc3ViRGF0YSk7XHJcbiAgICAgICAgY29uc3QgbXBzID0gZGF0YS5tcGluZm9zO1xyXG4gICAgICAgIGNvbnN0IFtjdXJyZW50TXBdID0gbXBzLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5pZCA9PT0gY3VycmVudE1waWQpO1xyXG4gICAgICAgIGlmIChjdXJyZW50TXAgJiYgY3VycmVudE1wLmhlYWRJbWcgJiYgY3VycmVudE1wLmhlYWRJbWcuaW5kZXhPZignaHR0cCcpID09PSAtMSkge1xyXG4gICAgICAgICAgICBjdXJyZW50TXAuaGVhZEltZyA9IGBodHRwczovL3BpYzEuNThjZG4uY29tLmNuJHtjdXJyZW50TXAuaGVhZEltZ31gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBvdGhlcnMgPSBtcHMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmlkICE9PSBjdXJyZW50TXBpZCk7XHJcbiAgICAgICAgbGV0IG90aGVyc01wID0gW107XHJcbiAgICAgICAgaWYgKG90aGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIG90aGVyc01wID0gb3RoZXJzLm1hcChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBlbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uaGVhZEltZyAmJiBpdGVtLmhlYWRJbWcuaW5kZXhPZignaHR0cCcpID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uaGVhZEltZyA9IGBodHRwczovL3BpYzEuNThjZG4uY29tLmNuJHtpdGVtLmhlYWRJbWd9YDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5idXNpbmVzcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYnVzaW5lc3MsIHtcclxuICAgICAgICAgICAgY3VycmVudDogY3VycmVudE1wLFxyXG4gICAgICAgICAgICBtcHM6IG90aGVyc01wLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCd0aGlzLmJ1c2luZXNzJywgdGhpcy5idXNpbmVzcyk7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgIH1cclxuICAgIGFzeW5jIG9uTG9hZCgpIHtcclxuICAgICAgICBhd2FpdCBzbGVlcCgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdvbmxvYWQnKTtcclxuICAgIH1cclxuICAgIGFzeW5jIGdldE1wU2hhcmVJbWcoaWQsIG5pY2tOYW1lKSB7XHJcbiAgICAgICAgY29uc3Qgc3ViRGF0YSA9IHtcclxuICAgICAgICAgICAgbXBJZDogaWQsXHJcbiAgICAgICAgICAgIG5pY2tOYW1lLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8g5bu26L+f5pe26Ze077yM6K6p55So5oi35oSf55+lbG9hZGluZ+aWh+ahiO+8jOaVheaEj+S4uuS5i+OAglxyXG4gICAgICAgIGNvbnN0IGRlbGF5ID0gMTUwMDtcclxuICAgICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9tcGxvZ2ljL3NoYXJlJywgc3ViRGF0YSwgJycsIHtcclxuICAgICAgICAgICAgbG9hZGluZ1RpdGxlOiAn5Zu+54mH55Sf5oiQLi4uJyxcclxuICAgICAgICAgICAgZGVsYXksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgdXJsID0gYGh0dHA6Ly9waWMxLjU4Y2RuLmNvbS5jbi8ke2RhdGF9YDtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgd2VweS5wcmV2aWV3SW1hZ2Uoe1xyXG4gICAgICAgICAgICAgICAgY3VycmVudDogdXJsLCAvLyDlvZPliY3mmL7npLrlm77niYfnmoRodHRw6ZO+5o6lXHJcbiAgICAgICAgICAgICAgICB1cmxzOiBbdXJsXSwgLy8g6ZyA6KaB6aKE6KeI55qE5Zu+54mHaHR0cOmTvuaOpeWIl+ihqFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCBkZWxheSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICB9XHJcbn1cclxuIl19
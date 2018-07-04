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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15TXAuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJkYXRhIiwiYnVzaW5lc3MiLCJtcHMiLCJjdXJyZW50Iiwic3JjIiwiZGVhZExpbmUiLCJzaGFyZUltYWdlIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm1ldGhvZHMiLCJzaG91cXVhbiIsImRlY29yYXRlIiwidHlwZSIsInRhcmdldCIsImRhdGFzZXQiLCJhZGRyZXNzIiwiaWQiLCJ3ZXB5IiwibmF2aWdhdGVUbyIsInVybCIsImNoZWNrRGV0YWlsIiwib25SZWFkeXRvU2hhcmUiLCJlIiwidXNlckluZm8iLCJkZXRhaWwiLCJuaWNrTmFtZSIsImdldE1wU2hhcmVJbWciLCJjdXJyZW50TXBpZCIsImdldFN0b3JhZ2VTeW5jIiwic3ViRGF0YSIsIm1waWQiLCJtcGluZm9zIiwiZmlsdGVyIiwiaXRlbSIsImN1cnJlbnRNcCIsImhlYWRJbWciLCJpbmRleE9mIiwib3RoZXJzIiwib3RoZXJzTXAiLCJsZW5ndGgiLCJtYXAiLCJlbGVtZW50IiwiT2JqZWN0IiwiYXNzaWduIiwiY29uc29sZSIsImxvZyIsIiRhcHBseSIsIm1wSWQiLCJkZWxheSIsImxvYWRpbmdUaXRsZSIsInNldFRpbWVvdXQiLCJwcmV2aWV3SW1hZ2UiLCJ1cmxzIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ2pCQyxJLEdBQU87QUFDSEMsc0JBQVU7QUFDTkMscUJBQUssRUFEQztBQUVOQyx5QkFBUztBQUNMQyx5QkFBSywrREFEQTtBQUVMQyw4QkFBVTtBQUZMO0FBRkgsYUFEUDtBQVFIQyx3QkFBWTtBQVJULFMsUUFVUEMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBR1RDLE8sR0FBVTtBQUNOQyxvQkFETSxzQkFDSztBQUNQLGtDQUFNLG1EQUFOLEVBQTJELElBQTNEO0FBQ0gsYUFISztBQUlO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QUNBLHFDQUFLNkMsTUFBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1Q0FHTSxtQjs7O0FBQ05GLHdDQUFRQyxHQUFSLENBQVksUUFBWjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrR0FFZ0I3QixFLEVBQUlTLFE7Ozs7Ozs7QUFDZEksdUMsR0FBVTtBQUNaa0IsMENBQU0vQixFQURNO0FBRVpTO0FBRlksaUM7QUFJaEI7O0FBQ011QixxQyxHQUFRLEk7O3VDQUNTLGdCQUFLLGdCQUFMLEVBQXVCbkIsT0FBdkIsRUFBZ0MsRUFBaEMsRUFBb0M7QUFDdkRvQixrREFBYyxTQUR5QztBQUV2REQ7QUFGdUQsaUNBQXBDLEM7Ozs7QUFBZmhELG9DLFNBQUFBLEk7QUFJRm1CLG1DLGlDQUFrQ25CLEk7O0FBQ3hDa0QsMkNBQVcsWUFBTTtBQUNiakMsbURBQUtrQyxZQUFMLENBQWtCO0FBQ2RoRCxpREFBU2dCLEdBREssRUFDQTtBQUNkaUMsOENBQU0sQ0FBQ2pDLEdBQUQsQ0FGUSxDQUVEO0FBRkMscUNBQWxCO0FBSUgsaUNBTEQsRUFLRzZCLEtBTEg7QUFNQUosd0NBQVFDLEdBQVIsQ0FBWTdDLElBQVo7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF0RzJCaUIsZUFBS29DLEk7O2tCQUFuQnRELEsiLCJmaWxlIjoibXlNcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbmltcG9ydCB7IHNsZWVwLCBhbGVydCB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IHBvc3QgfSBmcm9tICcuLi91dGlscy9hamF4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGRhdGEgPSB7XG4gICAgICAgIGJ1c2luZXNzOiB7XG4gICAgICAgICAgICBtcHM6IFtdLFxuICAgICAgICAgICAgY3VycmVudDoge1xuICAgICAgICAgICAgICAgIHNyYzogJ2h0dHBzOi8vc3RhdGljLjU4LmNvbS9sYmcvc2hhbmdqaWF4Y3hodC96aHVzaG91L2ltZy9jb2RlNy5wbmcnLFxuICAgICAgICAgICAgICAgIGRlYWRMaW5lOiAnMjAxOC0wOS05OCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBzaGFyZUltYWdlOiAnJyxcbiAgICB9XG4gICAgY29uZmlnID0ge1xuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oiR55qE5bCP56iL5bqPJyxcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgc2hvdXF1YW4oKSB7XG4gICAgICAgICAgICBhbGVydCgn6K+35oKo55m75b2V55S16ISR56uv77yM5omT5byAaHR0cHM6Ly95YW9mYS41OC5jb23vvIzliLDmjojmnYPnrqHnkIbpobXngrnlh7vlj7PkuIrop5LmjojmnYPmjInpkq7ljrvmjojmnYMnLCAn5o+Q56S6Jyk7XG4gICAgICAgIH0sXG4gICAgICAgIGRlY29yYXRlKHR5cGUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlLnRhcmdldC5kYXRhc2V0LmFkZHJlc3MpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGlkIH0gPSB0eXBlLnRhcmdldC5kYXRhc2V0O1xuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogYFVwbG9hZEluZm8/bXBpZD0ke2lkfWAsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNoZWNrRGV0YWlsKHR5cGUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlLnRhcmdldC5kYXRhc2V0LmFkZHJlc3MpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGlkIH0gPSB0eXBlLnRhcmdldC5kYXRhc2V0O1xuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogYEFwcEluZm8/bXBpZD0ke2lkfWAsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgaWQgfSA9IHR5cGUudGFyZ2V0LmRhdGFzZXQ7XG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBgQXBwRWRpdD9tcGlkPSR7aWR9YCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb25SZWFkeXRvU2hhcmUoZSkge1xuICAgICAgICAgICAgY29uc3QgeyBpZCB9ID0gZS50YXJnZXQuZGF0YXNldDtcbiAgICAgICAgICAgIGNvbnN0IHsgdXNlckluZm8gfSA9IGUuZGV0YWlsO1xuICAgICAgICAgICAgLy8g5YiG5Lqr5Lya5YWI5o6I5p2DXG4gICAgICAgICAgICBpZiAoIXVzZXJJbmZvKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ+aCqOacquaOiOadg++8jOWVhuWutuWKqeaJi+S4jeiDveS4uuaCqOeUn+aIkOWIhuS6q+WbvueJh+WTpicsICfmj5DnpLonKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB7IG5pY2tOYW1lIH0gPSB1c2VySW5mbztcbiAgICAgICAgICAgIHRoaXMuZ2V0TXBTaGFyZUltZyhpZCwgbmlja05hbWUpO1xuICAgICAgICB9LFxuICAgIH1cbiAgICBhc3luYyBvblNob3coKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRNcGlkID0gd2VweS5nZXRTdG9yYWdlU3luYygnY3VycmVudF9tcGlkJykgfHwgJyc7XG4gICAgICAgIGNvbnN0IHN1YkRhdGEgPSB7XG4gICAgICAgICAgICBtcGlkOiBjdXJyZW50TXBpZCxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvbXBsb2dpYy9teW1wbGlzdCcsIHN1YkRhdGEpO1xuICAgICAgICBjb25zdCBtcHMgPSBkYXRhLm1waW5mb3M7XG4gICAgICAgIGNvbnN0IFtjdXJyZW50TXBdID0gbXBzLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5pZCA9PT0gY3VycmVudE1waWQpO1xuICAgICAgICBpZiAoY3VycmVudE1wLmhlYWRJbWcgJiYgY3VycmVudE1wLmhlYWRJbWcuaW5kZXhPZignaHR0cCcpID09PSAtMSkge1xuICAgICAgICAgICAgY3VycmVudE1wLmhlYWRJbWcgPSBgaHR0cHM6Ly9waWMxLjU4Y2RuLmNvbS5jbiR7Y3VycmVudE1wLmhlYWRJbWd9YDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvdGhlcnMgPSBtcHMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmlkICE9PSBjdXJyZW50TXBpZCk7XG4gICAgICAgIGxldCBvdGhlcnNNcCA9IFtdO1xuICAgICAgICBpZiAob3RoZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIG90aGVyc01wID0gb3RoZXJzLm1hcChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gZWxlbWVudDtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5oZWFkSW1nICYmIGl0ZW0uaGVhZEltZy5pbmRleE9mKCdodHRwJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uaGVhZEltZyA9IGBodHRwczovL3BpYzEuNThjZG4uY29tLmNuJHtpdGVtLmhlYWRJbWd9YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJ1c2luZXNzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5idXNpbmVzcywge1xuICAgICAgICAgICAgY3VycmVudDogY3VycmVudE1wLFxuICAgICAgICAgICAgbXBzOiBvdGhlcnNNcCxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0aGlzLmJ1c2luZXNzJywgdGhpcy5idXNpbmVzcyk7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuICAgIGFzeW5jIG9uTG9hZCgpIHtcbiAgICAgICAgYXdhaXQgc2xlZXAoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ29ubG9hZCcpO1xuICAgIH1cbiAgICBhc3luYyBnZXRNcFNoYXJlSW1nKGlkLCBuaWNrTmFtZSkge1xuICAgICAgICBjb25zdCBzdWJEYXRhID0ge1xuICAgICAgICAgICAgbXBJZDogaWQsXG4gICAgICAgICAgICBuaWNrTmFtZSxcbiAgICAgICAgfTtcbiAgICAgICAgLy8g5bu26L+f5pe26Ze077yM6K6p55So5oi35oSf55+lbG9hZGluZ+aWh+ahiO+8jOaVheaEj+S4uuS5i+OAglxuICAgICAgICBjb25zdCBkZWxheSA9IDE1MDA7XG4gICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL21wbG9naWMvc2hhcmUnLCBzdWJEYXRhLCAnJywge1xuICAgICAgICAgICAgbG9hZGluZ1RpdGxlOiAn5Zu+54mH55Sf5oiQLi4uJyxcbiAgICAgICAgICAgIGRlbGF5LFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgdXJsID0gYGh0dHA6Ly9waWMxLjU4Y2RuLmNvbS5jbi8ke2RhdGF9YDtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB3ZXB5LnByZXZpZXdJbWFnZSh7XG4gICAgICAgICAgICAgICAgY3VycmVudDogdXJsLCAvLyDlvZPliY3mmL7npLrlm77niYfnmoRodHRw6ZO+5o6lXG4gICAgICAgICAgICAgICAgdXJsczogW3VybF0sIC8vIOmcgOimgemihOiniOeahOWbvueJh2h0dHDpk77mjqXliJfooahcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBkZWxheSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIH1cbn1cbiJdfQ==
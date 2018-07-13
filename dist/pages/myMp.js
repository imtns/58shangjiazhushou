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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15TXAuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJkYXRhIiwiYnVzaW5lc3MiLCJtcHMiLCJjdXJyZW50Iiwic3JjIiwiZGVhZExpbmUiLCJzaGFyZUltYWdlIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm1ldGhvZHMiLCJzaG91cXVhbiIsImRlY29yYXRlIiwidHlwZSIsInRhcmdldCIsImRhdGFzZXQiLCJhZGRyZXNzIiwiaWQiLCJ3ZXB5IiwibmF2aWdhdGVUbyIsInVybCIsImNoZWNrRGV0YWlsIiwib25SZWFkeXRvU2hhcmUiLCJlIiwidXNlckluZm8iLCJkZXRhaWwiLCJuaWNrTmFtZSIsImdldE1wU2hhcmVJbWciLCJjdXJyZW50TXBpZCIsImdldFN0b3JhZ2VTeW5jIiwic3ViRGF0YSIsIm1waWQiLCJtcGluZm9zIiwiZmlsdGVyIiwiaXRlbSIsImN1cnJlbnRNcCIsImhlYWRJbWciLCJpbmRleE9mIiwib3RoZXJzIiwib3RoZXJzTXAiLCJsZW5ndGgiLCJtYXAiLCJlbGVtZW50IiwiT2JqZWN0IiwiYXNzaWduIiwiY29uc29sZSIsImxvZyIsIiRhcHBseSIsIm1wSWQiLCJkZWxheSIsImxvYWRpbmdUaXRsZSIsInNldFRpbWVvdXQiLCJwcmV2aWV3SW1hZ2UiLCJ1cmxzIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ2pCQyxJLEdBQU87QUFDSEMsc0JBQVU7QUFDTkMscUJBQUssRUFEQztBQUVOQyx5QkFBUztBQUNMQyx5QkFBSywrREFEQTtBQUVMQyw4QkFBVTtBQUZMO0FBRkgsYUFEUDtBQVFIQyx3QkFBWTtBQVJULFMsUUFVUEMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBR1RDLE8sR0FBVTtBQUNOQyxvQkFETSxzQkFDSztBQUNQLGtDQUFNLG1EQUFOLEVBQTJELElBQTNEO0FBQ0gsYUFISztBQUlO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QUNBLHFDQUFLNkMsTUFBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1Q0FHTSxtQjs7O0FBQ05GLHdDQUFRQyxHQUFSLENBQVksUUFBWjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrR0FFZ0I3QixFLEVBQUlTLFE7Ozs7Ozs7QUFDZEksdUMsR0FBVTtBQUNaa0IsMENBQU0vQixFQURNO0FBRVpTO0FBRlksaUM7QUFJaEI7O0FBQ011QixxQyxHQUFRLEk7O3VDQUNTLGdCQUFLLGdCQUFMLEVBQXVCbkIsT0FBdkIsRUFBZ0MsRUFBaEMsRUFBb0M7QUFDdkRvQixrREFBYyxTQUR5QztBQUV2REQ7QUFGdUQsaUNBQXBDLEM7Ozs7QUFBZmhELG9DLFNBQUFBLEk7QUFJRm1CLG1DLGlDQUFrQ25CLEk7O0FBQ3hDa0QsMkNBQVcsWUFBTTtBQUNiakMsbURBQUtrQyxZQUFMLENBQWtCO0FBQ2RoRCxpREFBU2dCLEdBREssRUFDQTtBQUNkaUMsOENBQU0sQ0FBQ2pDLEdBQUQsQ0FGUSxDQUVEO0FBRkMscUNBQWxCO0FBSUgsaUNBTEQsRUFLRzZCLEtBTEg7QUFNQUosd0NBQVFDLEdBQVIsQ0FBWTdDLElBQVo7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF0RzJCaUIsZUFBS29DLEk7O2tCQUFuQnRELEsiLCJmaWxlIjoibXlNcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuXHJcbmltcG9ydCB7IHNsZWVwLCBhbGVydCB9IGZyb20gJy4uL3V0aWxzJztcclxuaW1wb3J0IHsgcG9zdCB9IGZyb20gJy4uL3V0aWxzL2FqYXgnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBidXNpbmVzczoge1xyXG4gICAgICAgICAgICBtcHM6IFtdLFxyXG4gICAgICAgICAgICBjdXJyZW50OiB7XHJcbiAgICAgICAgICAgICAgICBzcmM6ICdodHRwczovL3N0YXRpYy41OC5jb20vbGJnL3NoYW5namlheGN4aHQvemh1c2hvdS9pbWcvY29kZTcucG5nJyxcclxuICAgICAgICAgICAgICAgIGRlYWRMaW5lOiAnMjAxOC0wOS05OCcsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaGFyZUltYWdlOiAnJyxcclxuICAgIH1cclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oiR55qE5bCP56iL5bqPJyxcclxuICAgIH1cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgc2hvdXF1YW4oKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KCfor7fmgqjnmbvlvZXnlLXohJHnq6/vvIzmiZPlvIBodHRwczovL3lhb2ZhLjU4LmNvbe+8jOWIsOaOiOadg+euoeeQhumhteeCueWHu+WPs+S4iuinkuaOiOadg+aMiemSruWOu+aOiOadgycsICfmj5DnpLonKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlY29yYXRlKHR5cGUpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGUudGFyZ2V0LmRhdGFzZXQuYWRkcmVzcykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeyBpZCB9ID0gdHlwZS50YXJnZXQuZGF0YXNldDtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBgVXBsb2FkSW5mbz9tcGlkPSR7aWR9YCxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaGVja0RldGFpbCh0eXBlKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlLnRhcmdldC5kYXRhc2V0LmFkZHJlc3MpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHsgaWQgfSA9IHR5cGUudGFyZ2V0LmRhdGFzZXQ7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogYEFwcEluZm8/bXBpZD0ke2lkfWAsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHsgaWQgfSA9IHR5cGUudGFyZ2V0LmRhdGFzZXQ7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogYEFwcEVkaXQ/bXBpZD0ke2lkfWAsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25SZWFkeXRvU2hhcmUoZSkge1xyXG4gICAgICAgICAgICBjb25zdCB7IGlkIH0gPSBlLnRhcmdldC5kYXRhc2V0O1xyXG4gICAgICAgICAgICBjb25zdCB7IHVzZXJJbmZvIH0gPSBlLmRldGFpbDtcclxuICAgICAgICAgICAgLy8g5YiG5Lqr5Lya5YWI5o6I5p2DXHJcbiAgICAgICAgICAgIGlmICghdXNlckluZm8pIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCfmgqjmnKrmjojmnYPvvIzllYblrrbliqnmiYvkuI3og73kuLrmgqjnlJ/miJDliIbkuqvlm77niYflk6YnLCAn5o+Q56S6Jyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgeyBuaWNrTmFtZSB9ID0gdXNlckluZm87XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0TXBTaGFyZUltZyhpZCwgbmlja05hbWUpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbiAgICBhc3luYyBvblNob3coKSB7XHJcbiAgICAgICAgY29uc3QgY3VycmVudE1waWQgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdjdXJyZW50X21waWQnKSB8fCAnJztcclxuICAgICAgICBjb25zdCBzdWJEYXRhID0ge1xyXG4gICAgICAgICAgICBtcGlkOiBjdXJyZW50TXBpZCxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL21wbG9naWMvbXltcGxpc3QnLCBzdWJEYXRhKTtcclxuICAgICAgICBjb25zdCBtcHMgPSBkYXRhLm1waW5mb3M7XHJcbiAgICAgICAgY29uc3QgW2N1cnJlbnRNcF0gPSBtcHMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmlkID09PSBjdXJyZW50TXBpZCk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRNcC5oZWFkSW1nICYmIGN1cnJlbnRNcC5oZWFkSW1nLmluZGV4T2YoJ2h0dHAnKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgY3VycmVudE1wLmhlYWRJbWcgPSBgaHR0cHM6Ly9waWMxLjU4Y2RuLmNvbS5jbiR7Y3VycmVudE1wLmhlYWRJbWd9YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgb3RoZXJzID0gbXBzLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5pZCAhPT0gY3VycmVudE1waWQpO1xyXG4gICAgICAgIGxldCBvdGhlcnNNcCA9IFtdO1xyXG4gICAgICAgIGlmIChvdGhlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBvdGhlcnNNcCA9IG90aGVycy5tYXAoZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gZWxlbWVudDtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmhlYWRJbWcgJiYgaXRlbS5oZWFkSW1nLmluZGV4T2YoJ2h0dHAnKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmhlYWRJbWcgPSBgaHR0cHM6Ly9waWMxLjU4Y2RuLmNvbS5jbiR7aXRlbS5oZWFkSW1nfWA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYnVzaW5lc3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmJ1c2luZXNzLCB7XHJcbiAgICAgICAgICAgIGN1cnJlbnQ6IGN1cnJlbnRNcCxcclxuICAgICAgICAgICAgbXBzOiBvdGhlcnNNcCxcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zb2xlLmxvZygndGhpcy5idXNpbmVzcycsIHRoaXMuYnVzaW5lc3MpO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICB9XHJcbiAgICBhc3luYyBvbkxvYWQoKSB7XHJcbiAgICAgICAgYXdhaXQgc2xlZXAoKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnb25sb2FkJyk7XHJcbiAgICB9XHJcbiAgICBhc3luYyBnZXRNcFNoYXJlSW1nKGlkLCBuaWNrTmFtZSkge1xyXG4gICAgICAgIGNvbnN0IHN1YkRhdGEgPSB7XHJcbiAgICAgICAgICAgIG1wSWQ6IGlkLFxyXG4gICAgICAgICAgICBuaWNrTmFtZSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIOW7tui/n+aXtumXtO+8jOiuqeeUqOaIt+aEn+efpWxvYWRpbmfmlofmoYjvvIzmlYXmhI/kuLrkuYvjgIJcclxuICAgICAgICBjb25zdCBkZWxheSA9IDE1MDA7XHJcbiAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvbXBsb2dpYy9zaGFyZScsIHN1YkRhdGEsICcnLCB7XHJcbiAgICAgICAgICAgIGxvYWRpbmdUaXRsZTogJ+WbvueJh+eUn+aIkC4uLicsXHJcbiAgICAgICAgICAgIGRlbGF5LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IHVybCA9IGBodHRwOi8vcGljMS41OGNkbi5jb20uY24vJHtkYXRhfWA7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHdlcHkucHJldmlld0ltYWdlKHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQ6IHVybCwgLy8g5b2T5YmN5pi+56S65Zu+54mH55qEaHR0cOmTvuaOpVxyXG4gICAgICAgICAgICAgICAgdXJsczogW3VybF0sIC8vIOmcgOimgemihOiniOeahOWbvueJh2h0dHDpk77mjqXliJfooahcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgZGVsYXkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
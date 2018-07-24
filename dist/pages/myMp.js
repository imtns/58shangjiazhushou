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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15TXAuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJkYXRhIiwiYnVzaW5lc3MiLCJtcHMiLCJjdXJyZW50Iiwic3JjIiwiZGVhZExpbmUiLCJzaGFyZUltYWdlIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm1ldGhvZHMiLCJzaG91cXVhbiIsImRlY29yYXRlIiwidHlwZSIsInRhcmdldCIsImRhdGFzZXQiLCJhZGRyZXNzIiwiaWQiLCJ3ZXB5IiwibmF2aWdhdGVUbyIsInVybCIsInVwZ3JhZGUiLCJjaGVja0RldGFpbCIsIm9uUmVhZHl0b1NoYXJlIiwiZSIsInVzZXJJbmZvIiwiZGV0YWlsIiwibmlja05hbWUiLCJnZXRNcFNoYXJlSW1nIiwiY3VycmVudE1waWQiLCJnZXRTdG9yYWdlU3luYyIsInN1YkRhdGEiLCJtcGlkIiwibXBpbmZvcyIsImZpbHRlciIsIml0ZW0iLCJjdXJyZW50TXAiLCJoZWFkSW1nIiwiaW5kZXhPZiIsIm90aGVycyIsIm90aGVyc01wIiwibGVuZ3RoIiwibWFwIiwiZWxlbWVudCIsIk9iamVjdCIsImFzc2lnbiIsImNvbnNvbGUiLCJsb2ciLCIkYXBwbHkiLCJtcElkIiwiZGVsYXkiLCJsb2FkaW5nVGl0bGUiLCJzZXRUaW1lb3V0IiwicHJldmlld0ltYWdlIiwidXJscyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsSSxHQUFPO0FBQ0hDLHNCQUFVO0FBQ05DLHFCQUFLLEVBREM7QUFFTkMseUJBQVM7QUFDTEMseUJBQUssK0RBREE7QUFFTEMsOEJBQVU7QUFGTDtBQUZILGFBRFA7QUFRSEMsd0JBQVk7QUFSVCxTLFFBVVBDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdUQyxPLEdBQVU7QUFDTkMsb0JBRE0sc0JBQ0s7QUFDUCxrQ0FBTSxtREFBTixFQUEyRCxJQUEzRDtBQUNI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Q0FBS2pDLFFBQUwsR0FBZ0IwQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQixLQUFLM0MsUUFBdkIsRUFBaUM7QUFDN0NFLDZDQUFTZ0MsU0FEb0M7QUFFN0NqQyx5Q0FBS3FDO0FBRndDLGlDQUFqQyxDQUFoQjtBQUlBTSx3Q0FBUUMsR0FBUixDQUFZLGVBQVosRUFBNkIsS0FBSzdDLFFBQWxDO0FBQ0EscUNBQUs4QyxNQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VDQUdNLG1COzs7QUFDTkYsd0NBQVFDLEdBQVIsQ0FBWSxRQUFaOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tHQUVnQjlCLEUsRUFBSVUsUTs7Ozs7OztBQUNkSSx1QyxHQUFVO0FBQ1prQiwwQ0FBTWhDLEVBRE07QUFFWlU7QUFGWSxpQztBQUloQjs7QUFDTXVCLHFDLEdBQVEsSTs7dUNBQ1MsZ0JBQUssZ0JBQUwsRUFBdUJuQixPQUF2QixFQUFnQyxFQUFoQyxFQUFvQztBQUN2RG9CLGtEQUFjLFNBRHlDO0FBRXZERDtBQUZ1RCxpQ0FBcEMsQzs7OztBQUFmakQsb0MsU0FBQUEsSTtBQUlGbUIsbUMsaUNBQWtDbkIsSTs7QUFDeENtRCwyQ0FBVyxZQUFNO0FBQ2JsQyxtREFBS21DLFlBQUwsQ0FBa0I7QUFDZGpELGlEQUFTZ0IsR0FESyxFQUNBO0FBQ2RrQyw4Q0FBTSxDQUFDbEMsR0FBRCxDQUZRLENBRUQ7QUFGQyxxQ0FBbEI7QUFJSCxpQ0FMRCxFQUtHOEIsS0FMSDtBQU1BSix3Q0FBUUMsR0FBUixDQUFZOUMsSUFBWjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQTVHMkJpQixlQUFLcUMsSTs7a0JBQW5CdkQsSyIsImZpbGUiOiJteU1wLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuaW1wb3J0IHsgc2xlZXAsIGFsZXJ0IH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgcG9zdCB9IGZyb20gJy4uL3V0aWxzL2FqYXgnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgZGF0YSA9IHtcbiAgICAgICAgYnVzaW5lc3M6IHtcbiAgICAgICAgICAgIG1wczogW10sXG4gICAgICAgICAgICBjdXJyZW50OiB7XG4gICAgICAgICAgICAgICAgc3JjOiAnaHR0cHM6Ly9zdGF0aWMuNTguY29tL2xiZy9zaGFuZ2ppYXhjeGh0L3podXNob3UvaW1nL2NvZGU3LnBuZycsXG4gICAgICAgICAgICAgICAgZGVhZExpbmU6ICcyMDE4LTA5LTk4JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHNoYXJlSW1hZ2U6ICcnLFxuICAgIH1cbiAgICBjb25maWcgPSB7XG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoTlsI/nqIvluo8nLFxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgICBzaG91cXVhbigpIHtcbiAgICAgICAgICAgIGFsZXJ0KCfor7fmgqjnmbvlvZXnlLXohJHnq6/vvIzmiZPlvIBodHRwczovL3lhb2ZhLjU4LmNvbe+8jOWIsOaOiOadg+euoeeQhumhteeCueWHu+WPs+S4iuinkuaOiOadg+aMiemSruWOu+aOiOadgycsICfmj5DnpLonKTtcbiAgICAgICAgfSxcbiAgICAgICAgZGVjb3JhdGUodHlwZSkge1xuICAgICAgICAgICAgaWYgKHR5cGUudGFyZ2V0LmRhdGFzZXQuYWRkcmVzcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgaWQgfSA9IHR5cGUudGFyZ2V0LmRhdGFzZXQ7XG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBgVXBsb2FkSW5mbz9tcGlkPSR7aWR9YCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdXBncmFkZSh0eXBlKSB7XG4gICAgICAgICAgICBjb25zdCB7IGlkIH0gPSB0eXBlLnRhcmdldC5kYXRhc2V0O1xuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICB1cmw6IGBwdXJjaGFzZT9tcGlkPSR7aWR9YCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBjaGVja0RldGFpbCh0eXBlKSB7XG4gICAgICAgICAgICBpZiAodHlwZS50YXJnZXQuZGF0YXNldC5hZGRyZXNzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBpZCB9ID0gdHlwZS50YXJnZXQuZGF0YXNldDtcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IGBBcHBJbmZvP21waWQ9JHtpZH1gLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGlkIH0gPSB0eXBlLnRhcmdldC5kYXRhc2V0O1xuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogYEFwcEVkaXQ/bXBpZD0ke2lkfWAsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9uUmVhZHl0b1NoYXJlKGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgaWQgfSA9IGUudGFyZ2V0LmRhdGFzZXQ7XG4gICAgICAgICAgICBjb25zdCB7IHVzZXJJbmZvIH0gPSBlLmRldGFpbDtcbiAgICAgICAgICAgIC8vIOWIhuS6q+S8muWFiOaOiOadg1xuICAgICAgICAgICAgaWYgKCF1c2VySW5mbykge1xuICAgICAgICAgICAgICAgIGFsZXJ0KCfmgqjmnKrmjojmnYPvvIzllYblrrbliqnmiYvkuI3og73kuLrmgqjnlJ/miJDliIbkuqvlm77niYflk6YnLCAn5o+Q56S6Jyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgeyBuaWNrTmFtZSB9ID0gdXNlckluZm87XG4gICAgICAgICAgICB0aGlzLmdldE1wU2hhcmVJbWcoaWQsIG5pY2tOYW1lKTtcbiAgICAgICAgfSxcbiAgICB9XG4gICAgYXN5bmMgb25TaG93KCkge1xuICAgICAgICBjb25zdCBjdXJyZW50TXBpZCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ2N1cnJlbnRfbXBpZCcpIHx8ICcnO1xuICAgICAgICBjb25zdCBzdWJEYXRhID0ge1xuICAgICAgICAgICAgbXBpZDogY3VycmVudE1waWQsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL21wbG9naWMvbXltcGxpc3QnLCBzdWJEYXRhKTtcbiAgICAgICAgY29uc3QgbXBzID0gZGF0YS5tcGluZm9zO1xuICAgICAgICBjb25zdCBbY3VycmVudE1wXSA9IG1wcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IGN1cnJlbnRNcGlkKTtcbiAgICAgICAgaWYgKGN1cnJlbnRNcCAmJiBjdXJyZW50TXAuaGVhZEltZyAmJiBjdXJyZW50TXAuaGVhZEltZy5pbmRleE9mKCdodHRwJykgPT09IC0xKSB7XG4gICAgICAgICAgICBjdXJyZW50TXAuaGVhZEltZyA9IGBodHRwczovL3BpYzEuNThjZG4uY29tLmNuJHtjdXJyZW50TXAuaGVhZEltZ31gO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG90aGVycyA9IG1wcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uaWQgIT09IGN1cnJlbnRNcGlkKTtcbiAgICAgICAgbGV0IG90aGVyc01wID0gW107XG4gICAgICAgIGlmIChvdGhlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgb3RoZXJzTXAgPSBvdGhlcnMubWFwKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBlbGVtZW50O1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmhlYWRJbWcgJiYgaXRlbS5oZWFkSW1nLmluZGV4T2YoJ2h0dHAnKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5oZWFkSW1nID0gYGh0dHBzOi8vcGljMS41OGNkbi5jb20uY24ke2l0ZW0uaGVhZEltZ31gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYnVzaW5lc3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmJ1c2luZXNzLCB7XG4gICAgICAgICAgICBjdXJyZW50OiBjdXJyZW50TXAsXG4gICAgICAgICAgICBtcHM6IG90aGVyc01wLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coJ3RoaXMuYnVzaW5lc3MnLCB0aGlzLmJ1c2luZXNzKTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG4gICAgYXN5bmMgb25Mb2FkKCkge1xuICAgICAgICBhd2FpdCBzbGVlcCgpO1xuICAgICAgICBjb25zb2xlLmxvZygnb25sb2FkJyk7XG4gICAgfVxuICAgIGFzeW5jIGdldE1wU2hhcmVJbWcoaWQsIG5pY2tOYW1lKSB7XG4gICAgICAgIGNvbnN0IHN1YkRhdGEgPSB7XG4gICAgICAgICAgICBtcElkOiBpZCxcbiAgICAgICAgICAgIG5pY2tOYW1lLFxuICAgICAgICB9O1xuICAgICAgICAvLyDlu7bov5/ml7bpl7TvvIzorqnnlKjmiLfmhJ/nn6Vsb2FkaW5n5paH5qGI77yM5pWF5oSP5Li65LmL44CCXG4gICAgICAgIGNvbnN0IGRlbGF5ID0gMTUwMDtcbiAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvbXBsb2dpYy9zaGFyZScsIHN1YkRhdGEsICcnLCB7XG4gICAgICAgICAgICBsb2FkaW5nVGl0bGU6ICflm77niYfnlJ/miJAuLi4nLFxuICAgICAgICAgICAgZGVsYXksXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCB1cmwgPSBgaHR0cDovL3BpYzEuNThjZG4uY29tLmNuLyR7ZGF0YX1gO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHdlcHkucHJldmlld0ltYWdlKHtcbiAgICAgICAgICAgICAgICBjdXJyZW50OiB1cmwsIC8vIOW9k+WJjeaYvuekuuWbvueJh+eahGh0dHDpk77mjqVcbiAgICAgICAgICAgICAgICB1cmxzOiBbdXJsXSwgLy8g6ZyA6KaB6aKE6KeI55qE5Zu+54mHaHR0cOmTvuaOpeWIl+ihqFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgfVxufVxuIl19
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
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/myMp'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15TXAuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJkYXRhIiwiYnVzaW5lc3MiLCJtcHMiLCJjdXJyZW50Iiwic3JjIiwiZGVhZExpbmUiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibWV0aG9kcyIsInNob3VxdWFuIiwiZGVjb3JhdGUiLCJ0eXBlIiwidGFyZ2V0IiwiZGF0YXNldCIsImFkZHJlc3MiLCJpZCIsIndlcHkiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiY2hlY2tEZXRhaWwiLCJjdXJyZW50TXBpZCIsImdldFN0b3JhZ2VTeW5jIiwic3ViRGF0YSIsIm1waWQiLCJtcGluZm9zIiwiZmlsdGVyIiwiaXRlbSIsImN1cnJlbnRNcCIsImhlYWRJbWciLCJpbmRleE9mIiwib3RoZXJzIiwib3RoZXJzTXAiLCJsZW5ndGgiLCJtYXAiLCJlbGVtZW50IiwiT2JqZWN0IiwiYXNzaWduIiwiY29uc29sZSIsImxvZyIsIiRhcHBseSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsSSxHQUFPO0FBQ0hDLHNCQUFVO0FBQ05DLHFCQUFLLEVBREM7QUFFTkMseUJBQVM7QUFDTEMseUJBQUssK0RBREE7QUFFTEMsOEJBQVU7QUFGTDtBQUZIO0FBRFAsUyxRQVNQQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVEMsTyxHQUFVO0FBQ05DLG9CQURNLHNCQUNLO0FBQ1Asa0NBQU0sbURBQU4sRUFBMkQsSUFBM0Q7QUFDSCxhQUhLO0FBSU5DLG9CQUpNLG9CQUlHQyxJQUpILEVBSVM7QUFDWCxvQkFBSUEsS0FBS0MsTUFBTCxDQUFZQyxPQUFaLENBQW9CQyxPQUF4QixFQUFpQztBQUFBLHdCQUNyQkMsRUFEcUIsR0FDZEosS0FBS0MsTUFBTCxDQUFZQyxPQURFLENBQ3JCRSxFQURxQjs7QUFFN0JDLG1DQUFLQyxVQUFMLENBQWdCO0FBQ1pDLGtEQUF3Qkg7QUFEWixxQkFBaEI7QUFHSDtBQUNKLGFBWEs7QUFZTkksdUJBWk0sdUJBWU1SLElBWk4sRUFZWTtBQUNkLG9CQUFJQSxLQUFLQyxNQUFMLENBQVlDLE9BQVosQ0FBb0JDLE9BQXhCLEVBQWlDO0FBQUEsd0JBQ3JCQyxFQURxQixHQUNkSixLQUFLQyxNQUFMLENBQVlDLE9BREUsQ0FDckJFLEVBRHFCOztBQUU3QkMsbUNBQUtDLFVBQUwsQ0FBZ0I7QUFDWkMsK0NBQXFCSDtBQURULHFCQUFoQjtBQUdILGlCQUxELE1BS087QUFBQSx3QkFDS0EsR0FETCxHQUNZSixLQUFLQyxNQUFMLENBQVlDLE9BRHhCLENBQ0tFLEVBREw7O0FBRUhDLG1DQUFLQyxVQUFMLENBQWdCO0FBQ1pDLCtDQUFxQkg7QUFEVCxxQkFBaEI7QUFHSDtBQUNKO0FBeEJLLFM7Ozs7Ozs7Ozs7Ozs7QUEyQkFLLDJDLEdBQWNKLGVBQUtLLGNBQUwsQ0FBb0IsY0FBcEIsS0FBdUMsRTtBQUNyREMsdUMsR0FBVTtBQUNaQywwQ0FBTUg7QUFETSxpQzs7dUNBR08sZ0JBQUssbUJBQUwsRUFBMEJFLE9BQTFCLEM7Ozs7QUFBZnRCLG9DLFNBQUFBLEk7QUFDRkUsbUMsR0FBTUYsS0FBS3dCLE87OENBQ0d0QixJQUFJdUIsTUFBSixDQUFXLFVBQUNDLElBQUQ7QUFBQSwyQ0FBVUEsS0FBS1gsRUFBTCxLQUFZSyxXQUF0QjtBQUFBLGlDQUFYLEMsaURBQWJPLFM7O0FBQ1Asb0NBQUlBLFVBQVVDLE9BQVYsSUFBcUJELFVBQVVDLE9BQVYsQ0FBa0JDLE9BQWxCLENBQTBCLE1BQTFCLE1BQXNDLENBQUMsQ0FBaEUsRUFBbUU7QUFDL0RGLDhDQUFVQyxPQUFWLGlDQUFnREQsVUFBVUMsT0FBMUQ7QUFDSDtBQUNLRSxzQyxHQUFTNUIsSUFBSXVCLE1BQUosQ0FBVyxVQUFDQyxJQUFEO0FBQUEsMkNBQVVBLEtBQUtYLEVBQUwsS0FBWUssV0FBdEI7QUFBQSxpQ0FBWCxDO0FBQ1hXLHdDLEdBQVcsRTs7QUFDZixvQ0FBSUQsT0FBT0UsTUFBUCxHQUFnQixDQUFwQixFQUF1QjtBQUNuQkQsK0NBQVdELE9BQU9HLEdBQVAsQ0FBVyxtQkFBVztBQUM3Qiw0Q0FBTVAsT0FBT1EsT0FBYjtBQUNBLDRDQUFJUixLQUFLRSxPQUFMLElBQWdCRixLQUFLRSxPQUFMLENBQWFDLE9BQWIsQ0FBcUIsTUFBckIsTUFBaUMsQ0FBQyxDQUF0RCxFQUF5RDtBQUNyREgsaURBQUtFLE9BQUwsaUNBQTJDRixLQUFLRSxPQUFoRDtBQUNIO0FBQ0QsK0NBQU9GLElBQVA7QUFDSCxxQ0FOVSxDQUFYO0FBT0g7QUFDRCxxQ0FBS3pCLFFBQUwsR0FBZ0JrQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQixLQUFLbkMsUUFBdkIsRUFBaUM7QUFDN0NFLDZDQUFTd0IsU0FEb0M7QUFFN0N6Qix5Q0FBSzZCO0FBRndDLGlDQUFqQyxDQUFoQjtBQUlBTSx3Q0FBUUMsR0FBUixDQUFZLGVBQVosRUFBNkIsS0FBS3JDLFFBQWxDO0FBQ0EscUNBQUtzQyxNQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VDQUdNLG1COzs7QUFDTkYsd0NBQVFDLEdBQVIsQ0FBWSxRQUFaOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBdEUyQnRCLGVBQUt3QixJOztrQkFBbkJ6QyxLIiwiZmlsZSI6Im15TXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG5pbXBvcnQgeyBzbGVlcCwgYWxlcnQgfSBmcm9tICcuLi91dGlscyc7XHJcbmltcG9ydCB7IHBvc3QgfSBmcm9tICcuLi91dGlscy9hamF4JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgYnVzaW5lc3M6IHtcclxuICAgICAgICAgICAgbXBzOiBbXSxcclxuICAgICAgICAgICAgY3VycmVudDoge1xyXG4gICAgICAgICAgICAgICAgc3JjOiAnaHR0cHM6Ly9zdGF0aWMuNTguY29tL2xiZy9zaGFuZ2ppYXhjeGh0L3podXNob3UvaW1nL2NvZGU3LnBuZycsXHJcbiAgICAgICAgICAgICAgICBkZWFkTGluZTogJzIwMTgtMDktOTgnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkeeahOWwj+eoi+W6jycsXHJcbiAgICB9XHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIHNob3VxdWFuKCkge1xyXG4gICAgICAgICAgICBhbGVydCgn6K+35oKo55m75b2V55S16ISR56uv77yM5omT5byAaHR0cHM6Ly95YW9mYS41OC5jb23vvIzliLDmjojmnYPnrqHnkIbpobXngrnlh7vlj7PkuIrop5LmjojmnYPmjInpkq7ljrvmjojmnYMnLCAn5o+Q56S6Jyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZWNvcmF0ZSh0eXBlKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlLnRhcmdldC5kYXRhc2V0LmFkZHJlc3MpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHsgaWQgfSA9IHR5cGUudGFyZ2V0LmRhdGFzZXQ7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogYFVwbG9hZEluZm8/bXBpZD0ke2lkfWAsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2hlY2tEZXRhaWwodHlwZSkge1xyXG4gICAgICAgICAgICBpZiAodHlwZS50YXJnZXQuZGF0YXNldC5hZGRyZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IGlkIH0gPSB0eXBlLnRhcmdldC5kYXRhc2V0O1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGBBcHBJbmZvP21waWQ9JHtpZH1gLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IGlkIH0gPSB0eXBlLnRhcmdldC5kYXRhc2V0O1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGBBcHBFZGl0P21waWQ9JHtpZH1gLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgfVxyXG4gICAgYXN5bmMgb25TaG93KCkge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRNcGlkID0gd2VweS5nZXRTdG9yYWdlU3luYygnY3VycmVudF9tcGlkJykgfHwgJyc7XHJcbiAgICAgICAgY29uc3Qgc3ViRGF0YSA9IHtcclxuICAgICAgICAgICAgbXBpZDogY3VycmVudE1waWQsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9tcGxvZ2ljL215bXBsaXN0Jywgc3ViRGF0YSk7XHJcbiAgICAgICAgY29uc3QgbXBzID0gZGF0YS5tcGluZm9zO1xyXG4gICAgICAgIGNvbnN0IFtjdXJyZW50TXBdID0gbXBzLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5pZCA9PT0gY3VycmVudE1waWQpO1xyXG4gICAgICAgIGlmIChjdXJyZW50TXAuaGVhZEltZyAmJiBjdXJyZW50TXAuaGVhZEltZy5pbmRleE9mKCdodHRwJykgPT09IC0xKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRNcC5oZWFkSW1nID0gYGh0dHBzOi8vcGljMS41OGNkbi5jb20uY24ke2N1cnJlbnRNcC5oZWFkSW1nfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG90aGVycyA9IG1wcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uaWQgIT09IGN1cnJlbnRNcGlkKTtcclxuICAgICAgICBsZXQgb3RoZXJzTXAgPSBbXTtcclxuICAgICAgICBpZiAob3RoZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgb3RoZXJzTXAgPSBvdGhlcnMubWFwKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5oZWFkSW1nICYmIGl0ZW0uaGVhZEltZy5pbmRleE9mKCdodHRwJykgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5oZWFkSW1nID0gYGh0dHBzOi8vcGljMS41OGNkbi5jb20uY24ke2l0ZW0uaGVhZEltZ31gO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmJ1c2luZXNzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5idXNpbmVzcywge1xyXG4gICAgICAgICAgICBjdXJyZW50OiBjdXJyZW50TXAsXHJcbiAgICAgICAgICAgIG1wczogb3RoZXJzTXAsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3RoaXMuYnVzaW5lc3MnLCB0aGlzLmJ1c2luZXNzKTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfVxyXG4gICAgYXN5bmMgb25Mb2FkKCkge1xyXG4gICAgICAgIGF3YWl0IHNsZWVwKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ29ubG9hZCcpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
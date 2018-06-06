'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _utils = require('./../utils/index.js');

var _ajaxP = require('./../utils/ajaxP.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var appinfoApi = '/mplogic/get';

var AppInfo = function (_wepy$page) {
    _inherits(AppInfo, _wepy$page);

    function AppInfo() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, AppInfo);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AppInfo.__proto__ || Object.getPrototypeOf(AppInfo)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '小程序信息'
        }, _this.data = {
            verifyStatus: ['未审核', '审核中', '审核成功', '审核失败'],
            loading: true,
            appInfo: {
                address: '北京市58赶集集团总部(北京市朝阳区)',
                addressLatitude: '39.98732882997409',
                addressLongitude: '116.50490223791194',
                app_type: 1,
                authorizerAppid: 'yx7a865e6c58e11234',
                city: 3,
                cityName: '广州',
                createTime: '2017-12-27 10:55:03',
                expiryDate: '2019-05-16 13:44:00',
                headImg: '/bizmp/n_v2aeef04cef5cb4fe8b52efa6880af10fd_45f041c90f326d11.jpg',
                id: '123123124',
                lastpublishState: 0,
                lastpublishState_desc: '未审核',
                mpStatus: 1,
                nickName: '金小陵装修设计',
                province: 5004,
                provinceName: '广东',
                qrcodeUrl: '/bizmp/n_v22aebc4b4650e4be08627b2e6bcf8f0d0_5d1f067a59e63da1.jpg',
                sign: null,
                status: 1,
                status_desc: '已授权',
                telphone: '13911894305',
                wbQrcodeUrl: ''
            }
        }, _this.computed = {
            qrcodeUrl: function qrcodeUrl() {
                var _appInfo = this.appInfo,
                    qrcodeUrl = _appInfo.qrcodeUrl,
                    wbQrcodeUrl = _appInfo.wbQrcodeUrl;

                var appType = this.appInfo.app_type;
                var ret = appType === 1 ? wbQrcodeUrl : qrcodeUrl;
                if (ret && ret.indexOf('http') < 0) {
                    return (0, _utils.picSrcDomain)() + ret;
                }
                return ret;
            },
            logo: function logo() {
                var _appInfo$headImg = this.appInfo.headImg,
                    headImg = _appInfo$headImg === undefined ? 'https://pic8.58cdn.com.cn/bizmp/n_v285d6a16d725a446694db35df23c9db24.png' : _appInfo$headImg;

                if (headImg.indexOf('http') < 0) {
                    return (0, _utils.picSrcDomain)() + headImg + '?w=128&h=128';
                }
                return headImg;
            }
        }, _this.methods = {
            bindScanQrcode: function bindScanQrcode(qrcodeUrl) {
                _wepy2.default.previewImage({
                    urls: [qrcodeUrl]
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(AppInfo, [{
        key: 'updateAppInfo',
        value: function updateAppInfo(data) {
            var res = data;
            if (res.expiryDate) {
                var _res$expiryDate$match = res.expiryDate.match(/\d{4}-\d{2}-\d{2}/);

                var _res$expiryDate$match2 = _slicedToArray(_res$expiryDate$match, 1);

                res.date = _res$expiryDate$match2[0];
            }
            this.appInfo = Object.assign({}, this.appInfo, res);
            this.$apply();
        }
    }, {
        key: 'getAppInfo',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(mpid) {
                var _ref3, _ref4, e, data;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return (0, _ajaxP.get)(appinfoApi + '/' + mpid);

                            case 2:
                                _ref3 = _context.sent;
                                _ref4 = _slicedToArray(_ref3, 2);
                                e = _ref4[0];
                                data = _ref4[1];

                                if (!e) {
                                    _context.next = 10;
                                    break;
                                }

                                _context.next = 9;
                                return (0, _utils.toastSync)(e);

                            case 9:
                                return _context.abrupt('return');

                            case 10:
                                this.loading = false;
                                this.updateAppInfo(data);

                            case 12:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getAppInfo(_x) {
                return _ref2.apply(this, arguments);
            }

            return getAppInfo;
        }()
    }, {
        key: 'onLoad',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(options) {
                var mpid;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                mpid = options.mpid || _wepy2.default.getStorageSync('current_mpid');

                                this.updateAppInfo({ mpid: mpid });

                            case 2:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function onLoad(_x2) {
                return _ref5.apply(this, arguments);
            }

            return onLoad;
        }()
    }, {
        key: 'onShow',
        value: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (this.appInfo.mpid) {
                                    _context3.next = 4;
                                    break;
                                }

                                _wepy2.default.navigateBack();
                                _context3.next = 6;
                                break;

                            case 4:
                                _context3.next = 6;
                                return this.getAppInfo(this.appInfo.mpid);

                            case 6:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function onShow() {
                return _ref6.apply(this, arguments);
            }

            return onShow;
        }()
    }]);

    return AppInfo;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(AppInfo , 'pages/AppInfo'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFwcEluZm8uanMiXSwibmFtZXMiOlsiYXBwaW5mb0FwaSIsIkFwcEluZm8iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInZlcmlmeVN0YXR1cyIsImxvYWRpbmciLCJhcHBJbmZvIiwiYWRkcmVzcyIsImFkZHJlc3NMYXRpdHVkZSIsImFkZHJlc3NMb25naXR1ZGUiLCJhcHBfdHlwZSIsImF1dGhvcml6ZXJBcHBpZCIsImNpdHkiLCJjaXR5TmFtZSIsImNyZWF0ZVRpbWUiLCJleHBpcnlEYXRlIiwiaGVhZEltZyIsImlkIiwibGFzdHB1Ymxpc2hTdGF0ZSIsImxhc3RwdWJsaXNoU3RhdGVfZGVzYyIsIm1wU3RhdHVzIiwibmlja05hbWUiLCJwcm92aW5jZSIsInByb3ZpbmNlTmFtZSIsInFyY29kZVVybCIsInNpZ24iLCJzdGF0dXMiLCJzdGF0dXNfZGVzYyIsInRlbHBob25lIiwid2JRcmNvZGVVcmwiLCJjb21wdXRlZCIsImFwcFR5cGUiLCJyZXQiLCJpbmRleE9mIiwibG9nbyIsIm1ldGhvZHMiLCJiaW5kU2NhblFyY29kZSIsIndlcHkiLCJwcmV2aWV3SW1hZ2UiLCJ1cmxzIiwicmVzIiwibWF0Y2giLCJkYXRlIiwiT2JqZWN0IiwiYXNzaWduIiwiJGFwcGx5IiwibXBpZCIsImUiLCJ1cGRhdGVBcHBJbmZvIiwib3B0aW9ucyIsImdldFN0b3JhZ2VTeW5jIiwibmF2aWdhdGVCYWNrIiwiZ2V0QXBwSW5mbyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxhQUFhLGNBQW5COztJQUVxQkMsTzs7Ozs7Ozs7Ozs7Ozs7NExBQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVEMsSSxHQUFPO0FBQ0hDLDBCQUFjLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxNQUFmLEVBQXVCLE1BQXZCLENBRFg7QUFFSEMscUJBQVMsSUFGTjtB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Ozs7Ozs7OztFQW5GbUJULGVBQUtnQixJOztrQkFBckJyRCxPIiwiZmlsZSI6IkFwcEluZm8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHsgcGljU3JjRG9tYWluLCB0b2FzdFN5bmMgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBnZXQgfSBmcm9tICcuLi91dGlscy9hamF4UCc7XG5cbmNvbnN0IGFwcGluZm9BcGkgPSAnL21wbG9naWMvZ2V0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwSW5mbyBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5bCP56iL5bqP5L+h5oGvJyxcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgICAgdmVyaWZ5U3RhdHVzOiBbJ+acquWuoeaguCcsICflrqHmoLjkuK0nLCAn5a6h5qC45oiQ5YqfJywgJ+WuoeaguOWksei0pSddLFxuICAgICAgICBsb2FkaW5nOiB0cnVlLFxuICAgICAgICBhcHBJbmZvOiB7XG4gICAgICAgICAgICBhZGRyZXNzOiAn5YyX5Lqs5biCNTjotbbpm4bpm4blm6LmgLvpg6go5YyX5Lqs5biC5pyd6Ziz5Yy6KScsXG4gICAgICAgICAgICBhZGRyZXNzTGF0aXR1ZGU6ICczOS45ODczMjg4Mjk5NzQwOScsXG4gICAgICAgICAgICBhZGRyZXNzTG9uZ2l0dWRlOiAnMTE2LjUwNDkwMjIzNzkxMTk0JyxcbiAgICAgICAgICAgIGFwcF90eXBlOiAxLFxuICAgICAgICAgICAgYXV0aG9yaXplckFwcGlkOiAneXg3YTg2NWU2YzU4ZTExMjM0JyxcbiAgICAgICAgICAgIGNpdHk6IDMsXG4gICAgICAgICAgICBjaXR5TmFtZTogJ+W5v+W3nicsXG4gICAgICAgICAgICBjcmVhdGVUaW1lOiAnMjAxNy0xMi0yNyAxMDo1NTowMycsXG4gICAgICAgICAgICBleHBpcnlEYXRlOiAnMjAxOS0wNS0xNiAxMzo0NDowMCcsXG4gICAgICAgICAgICBoZWFkSW1nOiAnL2Jpem1wL25fdjJhZWVmMDRjZWY1Y2I0ZmU4YjUyZWZhNjg4MGFmMTBmZF80NWYwNDFjOTBmMzI2ZDExLmpwZycsXG4gICAgICAgICAgICBpZDogJzEyMzEyMzEyNCcsXG4gICAgICAgICAgICBsYXN0cHVibGlzaFN0YXRlOiAwLFxuICAgICAgICAgICAgbGFzdHB1Ymxpc2hTdGF0ZV9kZXNjOiAn5pyq5a6h5qC4JyxcbiAgICAgICAgICAgIG1wU3RhdHVzOiAxLFxuICAgICAgICAgICAgbmlja05hbWU6ICfph5HlsI/pmbXoo4Xkv67orr7orqEnLFxuICAgICAgICAgICAgcHJvdmluY2U6IDUwMDQsXG4gICAgICAgICAgICBwcm92aW5jZU5hbWU6ICflub/kuJwnLFxuICAgICAgICAgICAgcXJjb2RlVXJsOiAnL2Jpem1wL25fdjIyYWViYzRiNDY1MGU0YmUwODYyN2IyZTZiY2Y4ZjBkMF81ZDFmMDY3YTU5ZTYzZGExLmpwZycsXG4gICAgICAgICAgICBzaWduOiBudWxsLFxuICAgICAgICAgICAgc3RhdHVzOiAxLFxuICAgICAgICAgICAgc3RhdHVzX2Rlc2M6ICflt7LmjojmnYMnLFxuICAgICAgICAgICAgdGVscGhvbmU6ICcxMzkxMTg5NDMwNScsXG4gICAgICAgICAgICB3YlFyY29kZVVybDogJycsXG4gICAgICAgIH0sXG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgICBxcmNvZGVVcmwgKCkge1xuICAgICAgICAgICAgY29uc3QgeyBxcmNvZGVVcmwsIHdiUXJjb2RlVXJsIH0gPSB0aGlzLmFwcEluZm87XG4gICAgICAgICAgICBjb25zdCBhcHBUeXBlID0gdGhpcy5hcHBJbmZvLmFwcF90eXBlO1xuICAgICAgICAgICAgY29uc3QgcmV0ID0gYXBwVHlwZSA9PT0gMSA/IHdiUXJjb2RlVXJsIDogcXJjb2RlVXJsO1xuICAgICAgICAgICAgaWYgKHJldCAmJiByZXQuaW5kZXhPZignaHR0cCcpIDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwaWNTcmNEb21haW4oKSArIHJldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH0sXG4gICAgICAgIGxvZ28gKCkge1xuICAgICAgICAgICAgY29uc3QgeyBoZWFkSW1nID0gJ2h0dHBzOi8vcGljOC41OGNkbi5jb20uY24vYml6bXAvbl92Mjg1ZDZhMTZkNzI1YTQ0NjY5NGRiMzVkZjIzYzlkYjI0LnBuZycgfSA9IHRoaXMuYXBwSW5mbztcbiAgICAgICAgICAgIGlmIChoZWFkSW1nLmluZGV4T2YoJ2h0dHAnKSA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7cGljU3JjRG9tYWluKCkgKyBoZWFkSW1nfT93PTEyOCZoPTEyOGA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaGVhZEltZztcbiAgICAgICAgfSxcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgYmluZFNjYW5RcmNvZGUgKHFyY29kZVVybCkge1xuICAgICAgICAgICAgd2VweS5wcmV2aWV3SW1hZ2Uoe1xuICAgICAgICAgICAgICAgIHVybHM6IFtxcmNvZGVVcmxdLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgfVxuICAgIHVwZGF0ZUFwcEluZm8gKGRhdGEpIHtcbiAgICAgICAgY29uc3QgcmVzID0gZGF0YTtcbiAgICAgICAgaWYgKHJlcy5leHBpcnlEYXRlKSB7XG4gICAgICAgICAgICBbcmVzLmRhdGVdID0gcmVzLmV4cGlyeURhdGUubWF0Y2goL1xcZHs0fS1cXGR7Mn0tXFxkezJ9Lyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hcHBJbmZvID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5hcHBJbmZvLCByZXMpO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH1cbiAgICBhc3luYyBnZXRBcHBJbmZvIChtcGlkKSB7XG4gICAgICAgIGNvbnN0IFtlLCBkYXRhXSA9IGF3YWl0IGdldChgJHthcHBpbmZvQXBpfS8ke21waWR9YCk7XG4gICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICBhd2FpdCB0b2FzdFN5bmMoZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMudXBkYXRlQXBwSW5mbyhkYXRhKTtcbiAgICB9XG4gICAgYXN5bmMgb25Mb2FkIChvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IG1waWQgPSBvcHRpb25zLm1waWQgfHwgd2VweS5nZXRTdG9yYWdlU3luYygnY3VycmVudF9tcGlkJyk7XG4gICAgICAgIHRoaXMudXBkYXRlQXBwSW5mbyh7IG1waWQgfSk7XG4gICAgfVxuICAgIGFzeW5jIG9uU2hvdyAoKSB7XG4gICAgICAgIGlmICghdGhpcy5hcHBJbmZvLm1waWQpIHtcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmdldEFwcEluZm8odGhpcy5hcHBJbmZvLm1waWQpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19
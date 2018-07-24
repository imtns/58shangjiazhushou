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
                // qrcodeUrl: '/bizmp/n_v22aebc4b4650e4be08627b2e6bcf8f0d0_5d1f067a59e63da1.jpg',
                sign: null,
                status: 1,
                status_desc: '已授权',
                telphone: '13911894305',
                wbQrcodeUrl: ''
            }
        }, _this.computed = {
            qrcodeUrl: function qrcodeUrl() {
                var qrcodeUrl = this.appInfo.qrcodeUrl;

                if (qrcodeUrl && qrcodeUrl.indexOf('http') < 0) {
                    return '' + ((0, _utils.picSrcDomain)() + qrcodeUrl);
                }
                return qrcodeUrl;
            },
            wbQrcodeUrl: function wbQrcodeUrl() {
                var wbQrcodeUrl = this.appInfo.wbQrcodeUrl;

                if (wbQrcodeUrl && wbQrcodeUrl.indexOf('http') < 0) {
                    return '' + ((0, _utils.picSrcDomain)() + wbQrcodeUrl);
                }
                return wbQrcodeUrl;
            },
            payQrcodeUrl: function payQrcodeUrl() {
                var payQrcodeUrl = this.appInfo.payQrcodeUrl;

                if (payQrcodeUrl && payQrcodeUrl.indexOf('http') < 0) {
                    return '' + ((0, _utils.picSrcDomain)() + payQrcodeUrl);
                }
                return payQrcodeUrl;
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
            bindClickPreview: function bindClickPreview(qrcodeUrl) {
                _wepy2.default.previewImage({
                    urls: [(0, _utils.picSrcDomain)() + qrcodeUrl]
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFwcEluZm8uanMiXSwibmFtZXMiOlsiYXBwaW5mb0FwaSIsIkFwcEluZm8iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInZlcmlmeVN0YXR1cyIsImxvYWRpbmciLCJhcHBJbmZvIiwiYWRkcmVzcyIsImFkZHJlc3NMYXRpdHVkZSIsImFkZHJlc3NMb25naXR1ZGUiLCJhcHBfdHlwZSIsImF1dGhvcml6ZXJBcHBpZCIsImNpdHkiLCJjaXR5TmFtZSIsImNyZWF0ZVRpbWUiLCJleHBpcnlEYXRlIiwiaGVhZEltZyIsImlkIiwibGFzdHB1Ymxpc2hTdGF0ZSIsImxhc3RwdWJsaXNoU3RhdGVfZGVzYyIsIm1wU3RhdHVzIiwibmlja05hbWUiLCJwcm92aW5jZSIsInByb3ZpbmNlTmFtZSIsInNpZ24iLCJzdGF0dXMiLCJzdGF0dXNfZGVzYyIsInRlbHBob25lIiwid2JRcmNvZGVVcmwiLCJjb21wdXRlZCIsInFyY29kZVVybCIsImluZGV4T2YiLCJwYXlRcmNvZGVVcmwiLCJsb2dvIiwibWV0aG9kcyIsImJpbmRDbGlja1ByZXZpZXciLCJ3ZXB5IiwicHJldmlld0ltYWdlIiwidXJscyIsInJlcyIsIm1hdGNoIiwiZGF0ZSIsIk9iamVjdCIsImFzc2lnbiIsIiRhcHBseSIsIm1waWQiLCJlIiwidXBkYXRlQXBwSW5mbyIsIm9wdGlvbnMiLCJnZXRTdG9yYWdlU3luYyIsIm5hdmlnYXRlQmFjayIsImdldEFwcEluZm8iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsYUFBYSxjQUFuQjs7SUFFcUJDLE87Ozs7Ozs7Ozs7Ozs7OzRMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBR1RDLEksR0FBTztBQUNIQywwQkFBYyxDQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsTUFBZixFQUF1QixNQUF2QixDQURYO0FBRUhDLHFCQUFTLElBRk47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Q0pILG9DLEdBQU9HLFFBQVFILElBQVIsSUFBZ0JULGVBQUthLGNBQUwsQ0FBb0IsY0FBcEIsQzs7QUFDN0IscUNBQUtGLGFBQUwsQ0FBbUIsRUFBRUYsVUFBRixFQUFuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29DQUdLLEtBQUt2QyxPQUFMLENBQWF1QyxJOzs7OztBQUNkVCwrQ0FBS2MsWUFBTDs7Ozs7O3VDQUVNLEtBQUtDLFVBQUwsQ0FBZ0IsS0FBSzdDLE9BQUwsQ0FBYXVDLElBQTdCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUEvRm1CVCxlQUFLZ0IsSTs7a0JBQXJCcEQsTyIsImZpbGUiOiJBcHBJbmZvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB7IHBpY1NyY0RvbWFpbiwgdG9hc3RTeW5jIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgZ2V0IH0gZnJvbSAnLi4vdXRpbHMvYWpheFAnO1xuXG5jb25zdCBhcHBpbmZvQXBpID0gJy9tcGxvZ2ljL2dldCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcEluZm8gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+Wwj+eoi+W6j+S/oeaBrycsXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICAgIHZlcmlmeVN0YXR1czogWyfmnKrlrqHmoLgnLCAn5a6h5qC45LitJywgJ+WuoeaguOaIkOWKnycsICflrqHmoLjlpLHotKUnXSxcbiAgICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICAgICAgYXBwSW5mbzoge1xuICAgICAgICAgICAgYWRkcmVzczogJ+WMl+S6rOW4gjU46LW26ZuG6ZuG5Zui5oC76YOoKOWMl+S6rOW4guacnemYs+WMuiknLFxuICAgICAgICAgICAgYWRkcmVzc0xhdGl0dWRlOiAnMzkuOTg3MzI4ODI5OTc0MDknLFxuICAgICAgICAgICAgYWRkcmVzc0xvbmdpdHVkZTogJzExNi41MDQ5MDIyMzc5MTE5NCcsXG4gICAgICAgICAgICBhcHBfdHlwZTogMSxcbiAgICAgICAgICAgIGF1dGhvcml6ZXJBcHBpZDogJ3l4N2E4NjVlNmM1OGUxMTIzNCcsXG4gICAgICAgICAgICBjaXR5OiAzLFxuICAgICAgICAgICAgY2l0eU5hbWU6ICflub/lt54nLFxuICAgICAgICAgICAgY3JlYXRlVGltZTogJzIwMTctMTItMjcgMTA6NTU6MDMnLFxuICAgICAgICAgICAgZXhwaXJ5RGF0ZTogJzIwMTktMDUtMTYgMTM6NDQ6MDAnLFxuICAgICAgICAgICAgaGVhZEltZzogJy9iaXptcC9uX3YyYWVlZjA0Y2VmNWNiNGZlOGI1MmVmYTY4ODBhZjEwZmRfNDVmMDQxYzkwZjMyNmQxMS5qcGcnLFxuICAgICAgICAgICAgaWQ6ICcxMjMxMjMxMjQnLFxuICAgICAgICAgICAgbGFzdHB1Ymxpc2hTdGF0ZTogMCxcbiAgICAgICAgICAgIGxhc3RwdWJsaXNoU3RhdGVfZGVzYzogJ+acquWuoeaguCcsXG4gICAgICAgICAgICBtcFN0YXR1czogMSxcbiAgICAgICAgICAgIG5pY2tOYW1lOiAn6YeR5bCP6Zm16KOF5L+u6K6+6K6hJyxcbiAgICAgICAgICAgIHByb3ZpbmNlOiA1MDA0LFxuICAgICAgICAgICAgcHJvdmluY2VOYW1lOiAn5bm/5LicJyxcbiAgICAgICAgICAgIC8vIHFyY29kZVVybDogJy9iaXptcC9uX3YyMmFlYmM0YjQ2NTBlNGJlMDg2MjdiMmU2YmNmOGYwZDBfNWQxZjA2N2E1OWU2M2RhMS5qcGcnLFxuICAgICAgICAgICAgc2lnbjogbnVsbCxcbiAgICAgICAgICAgIHN0YXR1czogMSxcbiAgICAgICAgICAgIHN0YXR1c19kZXNjOiAn5bey5o6I5p2DJyxcbiAgICAgICAgICAgIHRlbHBob25lOiAnMTM5MTE4OTQzMDUnLFxuICAgICAgICAgICAgd2JRcmNvZGVVcmw6ICcnLFxuICAgICAgICB9LFxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgICAgcXJjb2RlVXJsICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgcXJjb2RlVXJsIH0gPSB0aGlzLmFwcEluZm87XG4gICAgICAgICAgICBpZiAocXJjb2RlVXJsICYmIHFyY29kZVVybC5pbmRleE9mKCdodHRwJykgPCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke3BpY1NyY0RvbWFpbigpICsgcXJjb2RlVXJsfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcXJjb2RlVXJsO1xuICAgICAgICB9LFxuICAgICAgICB3YlFyY29kZVVybCAoKSB7XG4gICAgICAgICAgICBjb25zdCB7IHdiUXJjb2RlVXJsIH0gPSB0aGlzLmFwcEluZm87XG4gICAgICAgICAgICBpZiAod2JRcmNvZGVVcmwgJiYgd2JRcmNvZGVVcmwuaW5kZXhPZignaHR0cCcpIDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBgJHtwaWNTcmNEb21haW4oKSArIHdiUXJjb2RlVXJsfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gd2JRcmNvZGVVcmw7XG4gICAgICAgIH0sXG4gICAgICAgIHBheVFyY29kZVVybCAoKSB7XG4gICAgICAgICAgICBjb25zdCB7IHBheVFyY29kZVVybCB9ID0gdGhpcy5hcHBJbmZvO1xuICAgICAgICAgICAgaWYgKHBheVFyY29kZVVybCAmJiBwYXlRcmNvZGVVcmwuaW5kZXhPZignaHR0cCcpIDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBgJHtwaWNTcmNEb21haW4oKSArIHBheVFyY29kZVVybH1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHBheVFyY29kZVVybDtcbiAgICAgICAgfSxcbiAgICAgICAgbG9nbyAoKSB7XG4gICAgICAgICAgICBjb25zdCB7IGhlYWRJbWcgPSAnaHR0cHM6Ly9waWM4LjU4Y2RuLmNvbS5jbi9iaXptcC9uX3YyODVkNmExNmQ3MjVhNDQ2Njk0ZGIzNWRmMjNjOWRiMjQucG5nJyB9ID0gdGhpcy5hcHBJbmZvO1xuICAgICAgICAgICAgaWYgKGhlYWRJbWcuaW5kZXhPZignaHR0cCcpIDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBgJHtwaWNTcmNEb21haW4oKSArIGhlYWRJbWd9P3c9MTI4Jmg9MTI4YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBoZWFkSW1nO1xuICAgICAgICB9LFxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgICBiaW5kQ2xpY2tQcmV2aWV3IChxcmNvZGVVcmwpIHtcbiAgICAgICAgICAgIHdlcHkucHJldmlld0ltYWdlKHtcbiAgICAgICAgICAgICAgICB1cmxzOiBbcGljU3JjRG9tYWluKCkgKyBxcmNvZGVVcmxdLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgfVxuICAgIHVwZGF0ZUFwcEluZm8gKGRhdGEpIHtcbiAgICAgICAgY29uc3QgcmVzID0gZGF0YTtcbiAgICAgICAgaWYgKHJlcy5leHBpcnlEYXRlKSB7XG4gICAgICAgICAgICBbcmVzLmRhdGVdID0gcmVzLmV4cGlyeURhdGUubWF0Y2goL1xcZHs0fS1cXGR7Mn0tXFxkezJ9Lyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hcHBJbmZvID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5hcHBJbmZvLCByZXMpO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH1cbiAgICBhc3luYyBnZXRBcHBJbmZvIChtcGlkKSB7XG4gICAgICAgIGNvbnN0IFtlLCBkYXRhXSA9IGF3YWl0IGdldChgJHthcHBpbmZvQXBpfS8ke21waWR9YCk7XG4gICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICBhd2FpdCB0b2FzdFN5bmMoZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMudXBkYXRlQXBwSW5mbyhkYXRhKTtcbiAgICB9XG4gICAgYXN5bmMgb25Mb2FkIChvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IG1waWQgPSBvcHRpb25zLm1waWQgfHwgd2VweS5nZXRTdG9yYWdlU3luYygnY3VycmVudF9tcGlkJyk7XG4gICAgICAgIHRoaXMudXBkYXRlQXBwSW5mbyh7IG1waWQgfSk7XG4gICAgfVxuICAgIGFzeW5jIG9uU2hvdyAoKSB7XG4gICAgICAgIGlmICghdGhpcy5hcHBJbmZvLm1waWQpIHtcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmdldEFwcEluZm8odGhpcy5hcHBJbmZvLm1waWQpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19
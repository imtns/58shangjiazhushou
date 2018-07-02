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
                    wbQrcodeUrl = _appInfo.wbQrcodeUrl,
                    appType = _appInfo.app_type;

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
            bindClickPreview: function bindClickPreview(qrcodeUrl) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFwcEluZm8uanMiXSwibmFtZXMiOlsiYXBwaW5mb0FwaSIsIkFwcEluZm8iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInZlcmlmeVN0YXR1cyIsImxvYWRpbmciLCJhcHBJbmZvIiwiYWRkcmVzcyIsImFkZHJlc3NMYXRpdHVkZSIsImFkZHJlc3NMb25naXR1ZGUiLCJhcHBfdHlwZSIsImF1dGhvcml6ZXJBcHBpZCIsImNpdHkiLCJjaXR5TmFtZSIsImNyZWF0ZVRpbWUiLCJleHBpcnlEYXRlIiwiaGVhZEltZyIsImlkIiwibGFzdHB1Ymxpc2hTdGF0ZSIsImxhc3RwdWJsaXNoU3RhdGVfZGVzYyIsIm1wU3RhdHVzIiwibmlja05hbWUiLCJwcm92aW5jZSIsInByb3ZpbmNlTmFtZSIsInFyY29kZVVybCIsInNpZ24iLCJzdGF0dXMiLCJzdGF0dXNfZGVzYyIsInRlbHBob25lIiwid2JRcmNvZGVVcmwiLCJjb21wdXRlZCIsImFwcFR5cGUiLCJyZXQiLCJpbmRleE9mIiwibG9nbyIsIm1ldGhvZHMiLCJiaW5kQ2xpY2tQcmV2aWV3Iiwid2VweSIsInByZXZpZXdJbWFnZSIsInVybHMiLCJyZXMiLCJtYXRjaCIsImRhdGUiLCJPYmplY3QiLCJhc3NpZ24iLCIkYXBwbHkiLCJtcGlkIiwiZSIsInVwZGF0ZUFwcEluZm8iLCJvcHRpb25zIiwiZ2V0U3RvcmFnZVN5bmMiLCJuYXZpZ2F0ZUJhY2siLCJnZXRBcHBJbmZvIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGFBQWEsY0FBbkI7O0lBRXFCQyxPOzs7Ozs7Ozs7Ozs7Ozs0TEFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdUQyxJLEdBQU87QUFDSEMsMEJBQWMsQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLE1BQWYsRUFBdUIsTUFBdkIsQ0FEWDtBQUVIQyxxQkFBUyxJQUZO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O0VBbEZtQlQsZUFBS2dCLEk7O2tCQUFyQnJELE8iLCJmaWxlIjoiQXBwSW5mby5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IHsgcGljU3JjRG9tYWluLCB0b2FzdFN5bmMgfSBmcm9tICcuLi91dGlscyc7XHJcbmltcG9ydCB7IGdldCB9IGZyb20gJy4uL3V0aWxzL2FqYXhQJztcclxuXHJcbmNvbnN0IGFwcGluZm9BcGkgPSAnL21wbG9naWMvZ2V0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcEluZm8gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflsI/nqIvluo/kv6Hmga8nLFxyXG4gICAgfVxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICB2ZXJpZnlTdGF0dXM6IFsn5pyq5a6h5qC4JywgJ+WuoeaguOS4rScsICflrqHmoLjmiJDlip8nLCAn5a6h5qC45aSx6LSlJ10sXHJcbiAgICAgICAgbG9hZGluZzogdHJ1ZSxcclxuICAgICAgICBhcHBJbmZvOiB7XHJcbiAgICAgICAgICAgIGFkZHJlc3M6ICfljJfkuqzluII1OOi1tumbhumbhuWbouaAu+mDqCjljJfkuqzluILmnJ3pmLPljLopJyxcclxuICAgICAgICAgICAgYWRkcmVzc0xhdGl0dWRlOiAnMzkuOTg3MzI4ODI5OTc0MDknLFxyXG4gICAgICAgICAgICBhZGRyZXNzTG9uZ2l0dWRlOiAnMTE2LjUwNDkwMjIzNzkxMTk0JyxcclxuICAgICAgICAgICAgYXBwX3R5cGU6IDEsXHJcbiAgICAgICAgICAgIGF1dGhvcml6ZXJBcHBpZDogJ3l4N2E4NjVlNmM1OGUxMTIzNCcsXHJcbiAgICAgICAgICAgIGNpdHk6IDMsXHJcbiAgICAgICAgICAgIGNpdHlOYW1lOiAn5bm/5beeJyxcclxuICAgICAgICAgICAgY3JlYXRlVGltZTogJzIwMTctMTItMjcgMTA6NTU6MDMnLFxyXG4gICAgICAgICAgICBleHBpcnlEYXRlOiAnMjAxOS0wNS0xNiAxMzo0NDowMCcsXHJcbiAgICAgICAgICAgIGhlYWRJbWc6ICcvYml6bXAvbl92MmFlZWYwNGNlZjVjYjRmZThiNTJlZmE2ODgwYWYxMGZkXzQ1ZjA0MWM5MGYzMjZkMTEuanBnJyxcclxuICAgICAgICAgICAgaWQ6ICcxMjMxMjMxMjQnLFxyXG4gICAgICAgICAgICBsYXN0cHVibGlzaFN0YXRlOiAwLFxyXG4gICAgICAgICAgICBsYXN0cHVibGlzaFN0YXRlX2Rlc2M6ICfmnKrlrqHmoLgnLFxyXG4gICAgICAgICAgICBtcFN0YXR1czogMSxcclxuICAgICAgICAgICAgbmlja05hbWU6ICfph5HlsI/pmbXoo4Xkv67orr7orqEnLFxyXG4gICAgICAgICAgICBwcm92aW5jZTogNTAwNCxcclxuICAgICAgICAgICAgcHJvdmluY2VOYW1lOiAn5bm/5LicJyxcclxuICAgICAgICAgICAgcXJjb2RlVXJsOiAnL2Jpem1wL25fdjIyYWViYzRiNDY1MGU0YmUwODYyN2IyZTZiY2Y4ZjBkMF81ZDFmMDY3YTU5ZTYzZGExLmpwZycsXHJcbiAgICAgICAgICAgIHNpZ246IG51bGwsXHJcbiAgICAgICAgICAgIHN0YXR1czogMSxcclxuICAgICAgICAgICAgc3RhdHVzX2Rlc2M6ICflt7LmjojmnYMnLFxyXG4gICAgICAgICAgICB0ZWxwaG9uZTogJzEzOTExODk0MzA1JyxcclxuICAgICAgICAgICAgd2JRcmNvZGVVcmw6ICcnLFxyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgICBxcmNvZGVVcmwgKCkge1xyXG4gICAgICAgICAgICBjb25zdCB7IHFyY29kZVVybCwgd2JRcmNvZGVVcmwsIGFwcF90eXBlOiBhcHBUeXBlIH0gPSB0aGlzLmFwcEluZm87XHJcbiAgICAgICAgICAgIGNvbnN0IHJldCA9IGFwcFR5cGUgPT09IDEgPyB3YlFyY29kZVVybCA6IHFyY29kZVVybDtcclxuICAgICAgICAgICAgaWYgKHJldCAmJiByZXQuaW5kZXhPZignaHR0cCcpIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBpY1NyY0RvbWFpbigpICsgcmV0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb2dvICgpIHtcclxuICAgICAgICAgICAgY29uc3QgeyBoZWFkSW1nID0gJ2h0dHBzOi8vcGljOC41OGNkbi5jb20uY24vYml6bXAvbl92Mjg1ZDZhMTZkNzI1YTQ0NjY5NGRiMzVkZjIzYzlkYjI0LnBuZycgfSA9IHRoaXMuYXBwSW5mbztcclxuICAgICAgICAgICAgaWYgKGhlYWRJbWcuaW5kZXhPZignaHR0cCcpIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke3BpY1NyY0RvbWFpbigpICsgaGVhZEltZ30/dz0xMjgmaD0xMjhgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBoZWFkSW1nO1xyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIGJpbmRDbGlja1ByZXZpZXcgKHFyY29kZVVybCkge1xyXG4gICAgICAgICAgICB3ZXB5LnByZXZpZXdJbWFnZSh7XHJcbiAgICAgICAgICAgICAgICB1cmxzOiBbcXJjb2RlVXJsXSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgIH1cclxuICAgIHVwZGF0ZUFwcEluZm8gKGRhdGEpIHtcclxuICAgICAgICBjb25zdCByZXMgPSBkYXRhO1xyXG4gICAgICAgIGlmIChyZXMuZXhwaXJ5RGF0ZSkge1xyXG4gICAgICAgICAgICBbcmVzLmRhdGVdID0gcmVzLmV4cGlyeURhdGUubWF0Y2goL1xcZHs0fS1cXGR7Mn0tXFxkezJ9Lyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYXBwSW5mbyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYXBwSW5mbywgcmVzKTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfVxyXG4gICAgYXN5bmMgZ2V0QXBwSW5mbyAobXBpZCkge1xyXG4gICAgICAgIGNvbnN0IFtlLCBkYXRhXSA9IGF3YWl0IGdldChgJHthcHBpbmZvQXBpfS8ke21waWR9YCk7XHJcbiAgICAgICAgaWYgKGUpIHtcclxuICAgICAgICAgICAgYXdhaXQgdG9hc3RTeW5jKGUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQXBwSW5mbyhkYXRhKTtcclxuICAgIH1cclxuICAgIGFzeW5jIG9uTG9hZCAob3B0aW9ucykge1xyXG4gICAgICAgIGNvbnN0IG1waWQgPSBvcHRpb25zLm1waWQgfHwgd2VweS5nZXRTdG9yYWdlU3luYygnY3VycmVudF9tcGlkJyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVBcHBJbmZvKHsgbXBpZCB9KTtcclxuICAgIH1cclxuICAgIGFzeW5jIG9uU2hvdyAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmFwcEluZm8ubXBpZCkge1xyXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZ2V0QXBwSW5mbyh0aGlzLmFwcEluZm8ubXBpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==
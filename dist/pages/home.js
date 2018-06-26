'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var Home = function (_wepy$page) {
    _inherits(Home, _wepy$page);

    function Home() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Home);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Home.__proto__ || Object.getPrototypeOf(Home)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '首页',
            disableScroll: true
        }, _this.data = {
            business: {
                mps: [],
                name: '您的姓名',
                miniProgramName: '您还没购买小程序',
                unread: 0,
                mpCount: 0,
                progressText: '您还没有购买小程序',
                nexttask: 0,
                changeMP: false,
                canConfirm: false,
                selected: {
                    id: 0
                },
                chosedId: 0
            },
            items: [{
                iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-my.png',
                text: '我的小程序'
            }, {
                iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-upload.png',
                text: '上传素材'
            }, {
                iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-order.png',
                text: '订单管理'
            }, {
                iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-register.png',
                text: '微信注册信息'
            }, {
                iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-progress.png',
                text: '完成度'
            }, {
                iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-advice.png',
                text: '意见反馈'
            }]
        }, _this.methods = {
            link: function link(index) {
                if (index !== 4) {
                    //   意见反馈不做判断
                    this.checkBeforeJump(index);
                } else {
                    _wepy2.default.navigateTo({
                        url: 'feedback'
                    });
                }
            },
            checkProgress: function checkProgress() {
                if (!this.business.mpCount) {
                    (0, _utils.alert)('您还未购买小程序，请登录e.58.com进行购买', '提示');
                    return;
                }
                switch (this.business.nexttask) {
                    case 2:
                        _wepy2.default.navigateTo({
                            url: 'AppEdit'
                        });
                        break;
                    case 3:
                        _wepy2.default.navigateTo({
                            url: 'UploadInfo'
                        });
                        break;
                    case 4:
                        if (this.business.selected.app_type === 2) {
                            _wepy2.default.setStorageSync('registMappid', this.business.selected.id);
                            _wepy2.default.navigateTo({
                                url: 'registMainAccount'
                            });
                        } else {
                            _wepy2.default.navigateTo({
                                url: 'progress'
                            });
                        }
                        break;
                    case 5:
                        if (this.business.selected.app_type === 1) {
                            _wepy2.default.navigateTo({
                                url: 'progress'
                            });
                        } else {
                            _wepy2.default.navigateTo({
                                url: 'myMp'
                            });
                        }
                        break;
                    case 6:
                        _wepy2.default.navigateTo({
                            url: 'progress'
                        });
                        break;
                    case 7:
                        _wepy2.default.navigateTo({
                            url: 'progress'
                        });
                        break;
                    case 8:
                        _wepy2.default.navigateTo({
                            url: 'progress'
                        });
                        break;
                    case 9:
                        _wepy2.default.navigateTo({
                            url: 'progress'
                        });
                        break;
                    default:
                        break;
                }
                this.$apply();
            },
            changeAction: function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    var _this2 = this;

                    var _ref3, data, mpinfos, others, formatedOther;

                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    this.business = Object.assign({}, this.business, {
                                        changeMP: true
                                    });
                                    _context.next = 3;
                                    return (0, _ajax.post)('/mplogic/mymplist');

                                case 3:
                                    _ref3 = _context.sent;
                                    data = _ref3.data;
                                    mpinfos = data.mpinfos;

                                    this.business = Object.assign({}, this.business, {
                                        mps: mpinfos
                                    });
                                    if (this.business.mps.length > 0) {
                                        others = this.business.mps.filter(function (appinfo) {
                                            return appinfo.id !== _this2.business.selected.id;
                                        });
                                        formatedOther = others.map(function (item) {
                                            return _this2.formatedMp(item);
                                        });

                                        this.business = Object.assign({}, this.business, {
                                            mps: formatedOther,
                                            chosedId: 0,
                                            canConfirm: false
                                        });
                                        // this.business.mps.map((appinfo, index) => {
                                        //     if (appinfo.id === this.business.selected.id) {
                                        //         this.business.mps.splice(index, 1);
                                        //     }
                                        //     return '';
                                        // });
                                    }
                                    this.$apply();
                                    console.log('this.business.mps', this.business.mps);

                                case 10:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));

                function changeAction() {
                    return _ref2.apply(this, arguments);
                }

                return changeAction;
            }(),
            bindHideMask: function bindHideMask() {
                this.business = Object.assign({}, this.business, {
                    changeMP: false,
                    canConfirm: false
                });
                this.$apply();
            },
            selectMp: function selectMp(item) {
                this.business = Object.assign({}, this.business, {
                    chosedId: item.id,
                    canConfirm: true
                });
                console.log('点击', this.business);
                this.$apply();
            },
            confirmAction: function confirmAction() {
                if (this.business.selected.id) {
                    this.setGlobalMpId(this.business.chosedId);
                    this.loadData();
                    this.hideMask();
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Home, [{
        key: 'hideMask',
        value: function hideMask() {
            this.business = Object.assign({}, this.business, {
                changeMP: false,
                canConfirm: false
            });
            this.$apply();
        }
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
                                console.log('onLoad');

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
        key: 'onShow',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.loadData();

                            case 2:
                                this.setGlobalMpId(this.business.selected.id);

                            case 3:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function onShow() {
                return _ref5.apply(this, arguments);
            }

            return onShow;
        }()
    }, {
        key: 'formatedMp',
        value: function formatedMp(item) {
            var mp = item;
            if (mp.headImg && mp.headImg.indexOf('http') === -1) {
                mp.headImg = 'https://pic1.58cdn.com.cn' + mp.headImg;
            }
            return mp;
        }
        /**
         * 用户点击右上角分享
         */

    }, {
        key: 'onShareAppMessage',
        value: function onShareAppMessage(res) {
            if (res.from === 'button') {
                // 来自页面内转发按钮
                console.log(res.target);
            }
            return {
                title: '高效管理商家小程序的一站式服务工具',
                path: '/pages/home',
                imageUrl: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/share.png',
                success: function success(data) {
                    console.log(data);
                },
                fail: function fail(err) {
                    console.log(err);
                }
            };
        }
    }, {
        key: 'loadData',
        value: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var subData, _ref7, data, _data$username, username, _data$mpinfo, mpinfo, _data$unread, unread, _data$count, count, _data$nexttask, nexttask, formatedMpinfo;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.prev = 0;
                                subData = {
                                    mpid: _wepy2.default.getStorageSync('current_mpid') || ''
                                };
                                _context4.next = 4;
                                return (0, _ajax.post)('/mplogic/index', subData);

                            case 4:
                                _ref7 = _context4.sent;
                                data = _ref7.data;

                                console.log('loadData', data);
                                _data$username = data.username, username = _data$username === undefined ? '' : _data$username, _data$mpinfo = data.mpinfo, mpinfo = _data$mpinfo === undefined ? {} : _data$mpinfo, _data$unread = data.unread, unread = _data$unread === undefined ? '' : _data$unread, _data$count = data.count, count = _data$count === undefined ? 0 : _data$count, _data$nexttask = data.nexttask, nexttask = _data$nexttask === undefined ? '' : _data$nexttask;
                                formatedMpinfo = this.formatedMp(mpinfo);

                                this.business = Object.assign({}, this.business, {
                                    name: username,
                                    miniProgramName: mpinfo.nickName || '您还没购买小程序',
                                    unread: unread,
                                    mpCount: count,
                                    selected: formatedMpinfo
                                });
                                nexttask && this.setNextTask(nexttask);
                                // data.username && (this.business.name = data.username);
                                // data.mpinfo && (this.business.miniProgramName = data.mpinfo.nickName);
                                // data.unread && (this.business.unread = data.unread);
                                // data.count && (this.business.mpCount = data.count);
                                // data.mpinfo && (this.business.selected.id = data.mpinfo.id)
                                console.log('this.business', this.business);
                                this.$apply();
                                _context4.next = 18;
                                break;

                            case 15:
                                _context4.prev = 15;
                                _context4.t0 = _context4['catch'](0);

                                console.log('e', _context4.t0);

                            case 18:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[0, 15]]);
            }));

            function loadData() {
                return _ref6.apply(this, arguments);
            }

            return loadData;
        }()
    }, {
        key: 'setGlobalMpId',
        value: function setGlobalMpId(id) {
            if (id) {
                _wepy2.default.setStorageSync('current_mpid', id);
            }
        }
    }, {
        key: 'checkBeforeJump',
        value: function checkBeforeJump(index) {
            console.log('this.business.selected.', this.business.selected);
            if (!this.business.mpCount) {
                (0, _utils.alert)('您还未购买小程序，请登录e.58.com进行购买', '提示');
                return;
            }
            switch (index) {
                case 0:
                    _wepy2.default.navigateTo({
                        url: 'myMp'
                    });
                    break;
                case 1:
                    _wepy2.default.navigateTo({
                        url: 'UploadInfo'
                    });
                    break;
                case 2:
                    _wepy2.default.navigateTo({
                        url: 'OrderList'
                    });
                    break;
                case 3:
                    if (this.business.selected.app_type === 1) {
                        (0, _utils.alert)('当前小程序为优享小程序，不用提交注册信息', '提示');
                        return;
                    }
                    if (this.business.selected.sign === 1) {
                        _wepy2.default.navigateTo({
                            url: 'registed'
                        });
                    } else {
                        _wepy2.default.setStorageSync('registMappid', this.business.selected.id);
                        _wepy2.default.navigateTo({
                            url: 'registMainAccount'
                        });
                    }
                    break;
                case 4:
                    _wepy2.default.navigateTo({
                        url: 'progress'
                    });
                    break;
                case 5:
                    _wepy2.default.navigateTo({
                        url: 'feedback'
                    });
                    break;
                default:
                    break;
            }
        }
    }, {
        key: 'setNextTask',
        value: function setNextTask(taskNum) {
            this.business = Object.assign({}, this.business, {
                nexttask: taskNum
            });
            switch (taskNum) {
                case 2:
                    this.business.progressText = '当前小程序未添加小程序信息';
                    break;
                case 3:
                    this.business.progressText = '当前小程序还未上传素材';
                    break;
                case 4:
                    if (this.business.selected.app_type === 1) {
                        this.business.progressText = '当前小程序信息已完善';
                    } else {
                        this.business.progressText = '当前小程序还未填写注册信息';
                    }
                    break;
                case 5:
                    // 跳转我的小程序
                    if (this.business.selected.app_type === 1) {
                        this.business.progressText = '当前小程序信息已完善';
                    } else {
                        this.business.progressText = '当前小程序还未授权';
                    }
                    break;
                case 6:
                    // 跳转到进度
                    this.business.progressText = '当前小程序信息已完善';
                    break;
                case 7:
                    // 消息列表
                    this.business.progressText = '当前小程序信息已完善';
                    break;
                case 8:
                    // 消息列表
                    this.business.progressText = '当前小程序信息已完善';
                    break;
                case 9:
                    // 完成度
                    this.business.progressText = '当前小程序信息已完善';
                    break;
                default:
                    break;
            }
            this.$apply();
        }
    }]);

    return Home;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Home , 'pages/home'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuanMiXSwibmFtZXMiOlsiSG9tZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkaXNhYmxlU2Nyb2xsIiwiZGF0YSIsImJ1c2luZXNzIiwibXBzIiwibmFtZSIsIm1pbmlQcm9ncmFtTmFtZSIsInVucmVhZCIsIm1wQ291bnQiLCJwcm9ncmVzc1RleHQiLCJuZXh0dGFzayIsImNoYW5nZU1QIiwiY2FuQ29uZmlybSIsInNlbGVjdGVkIiwiaWQiLCJjaG9zZWRJZCIsIml0ZW1zIiwiaWNvblBhdGgiLCJ0ZXh0IiwibWV0aG9kcyIsImxpbmsiLCJpbmRleCIsImNoZWNrQmVmb3JlSnVtcCIsIndlcHkiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiY2hlY2tQcm9ncmVzcyIsImFwcF90eXBlIiwic2V0U3RvcmFnZVN5bmMiLCIkYXBwbHkiLCJjaGFuZ2VBY3Rpb24iLCJPYmplY3QiLCJhc3NpZ24iLCJtcGluZm9zIiwibGVuZ3RoIiwib3RoZXJzIiwiZmlsdGVyIiwiYXBwaW5mbyIsImZvcm1hdGVkT3RoZXIiLCJtYXAiLCJpdGVtIiwiZm9ybWF0ZWRNcCIsImNvbnNvbGUiLCJsb2ciLCJiaW5kSGlkZU1hc2siLCJzZWxlY3RNcCIsImNvbmZpcm1BY3Rpb24iLCJzZXRHbG9iYWxNcElkIiwibG9hZERhdGEiLCJoaWRlTWFzayIsIm1wIiwiaGVhZEltZyIsImluZGV4T2YiLCJyZXMiLCJmcm9tIiwidGFyZ2V0IiwidGl0bGUiLCJwYXRoIiwiaW1hZ2VVcmwiLCJzdWNjZXNzIiwiZmFpbCIsImVyciIsInN1YkRhdGEiLCJtcGlkIiwiZ2V0U3RvcmFnZVN5bmMiLCJ1c2VybmFtZSIsIm1waW5mbyIsImNvdW50IiwiZm9ybWF0ZWRNcGluZm8iLCJuaWNrTmFtZSIsInNldE5leHRUYXNrIiwic2lnbiIsInRhc2tOdW0iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7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QUwsQ0FBY00sWUFBZCxHQUE2QixlQUE3QjtBQUNBO0FBQ0oscUJBQUssQ0FBTDtBQUNJLHlCQUFLTixRQUFMLENBQWNNLFlBQWQsR0FBNkIsYUFBN0I7QUFDQTtBQUNKLHFCQUFLLENBQUw7QUFDSSx3QkFBSSxLQUFLTixRQUFMLENBQWNVLFFBQWQsQ0FBdUJjLFFBQXZCLEtBQW9DLENBQXhDLEVBQTJDO0FBQ3ZDLDZCQUFLeEIsUUFBTCxDQUFjTSxZQUFkLEdBQTZCLFlBQTdCO0FBQ0gscUJBRkQsTUFFTztBQUNILDZCQUFLTixRQUFMLENBQWNNLFlBQWQsR0FBNkIsZUFBN0I7QUFDSDtBQUNEO0FBQ0oscUJBQUssQ0FBTDtBQUFRO0FBQ0osd0JBQUksS0FBS04sUUFBTCxDQUFjVSxRQUFkLENBQXVCYyxRQUF2QixLQUFvQyxDQUF4QyxFQUEyQztBQUN2Qyw2QkFBS3hCLFFBQUwsQ0FBY00sWUFBZCxHQUE2QixZQUE3QjtBQUNILHFCQUZELE1BRU87QUFDSCw2QkFBS04sUUFBTCxDQUFjTSxZQUFkLEdBQTZCLFdBQTdCO0FBQ0g7QUFDRDtBQUNKLHFCQUFLLENBQUw7QUFBUTtBQUNKLHlCQUFLTixRQUFMLENBQWNNLFlBQWQsR0FBNkIsWUFBN0I7QUFDQTtBQUNKLHFCQUFLLENBQUw7QUFBUTtBQUNKLHlCQUFLTixRQUFMLENBQWNNLFlBQWQsR0FBNkIsWUFBN0I7QUFDQTtBQUNKLHFCQUFLLENBQUw7QUFBUTtBQUNKLHlCQUFLTixRQUFMLENBQWNNLFlBQWQsR0FBNkIsWUFBN0I7QUFDQTtBQUNKLHFCQUFLLENBQUw7QUFBUTtBQUNKLHlCQUFLTixRQUFMLENBQWNNLFlBQWQsR0FBNkIsWUFBN0I7QUFDQTtBQUNKO0FBQ0k7QUFsQ1I7QUFvQ0EsaUJBQUtvQixNQUFMO0FBQ0g7Ozs7RUF0VjZCTixlQUFLa0QsSTs7a0JBQWxCM0UsSSIsImZpbGUiOiJob21lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgeyBzbGVlcCwgYWxlcnQgfSBmcm9tICcuLi91dGlscyc7XHJcbmltcG9ydCB7IHBvc3QgfSBmcm9tICcuLi91dGlscy9hamF4JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfpppbpobUnLFxyXG4gICAgICAgIGRpc2FibGVTY3JvbGw6IHRydWUsXHJcbiAgICB9XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGJ1c2luZXNzOiB7XHJcbiAgICAgICAgICAgIG1wczogW10sXHJcbiAgICAgICAgICAgIG5hbWU6ICfmgqjnmoTlp5PlkI0nLFxyXG4gICAgICAgICAgICBtaW5pUHJvZ3JhbU5hbWU6ICfmgqjov5jmsqHotK3kubDlsI/nqIvluo8nLFxyXG4gICAgICAgICAgICB1bnJlYWQ6IDAsXHJcbiAgICAgICAgICAgIG1wQ291bnQ6IDAsXHJcbiAgICAgICAgICAgIHByb2dyZXNzVGV4dDogJ+aCqOi/mOayoeaciei0reS5sOWwj+eoi+W6jycsXHJcbiAgICAgICAgICAgIG5leHR0YXNrOiAwLFxyXG4gICAgICAgICAgICBjaGFuZ2VNUDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNhbkNvbmZpcm06IGZhbHNlLFxyXG4gICAgICAgICAgICBzZWxlY3RlZDoge1xyXG4gICAgICAgICAgICAgICAgaWQ6IDAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNob3NlZElkOiAwLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWNvblBhdGg6ICdodHRwczovL3N0YXRpYy41OC5jb20vbGJnL3NoYW5namlheGN4aHQvemh1c2hvdS9pbWcvaWNvbi1teS5wbmcnLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogJ+aIkeeahOWwj+eoi+W6jycsXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGljb25QYXRoOiAnaHR0cHM6Ly9zdGF0aWMuNTguY29tL2xiZy9zaGFuZ2ppYXhjeGh0L3podXNob3UvaW1nL2ljb24tdXBsb2FkLnBuZycsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAn5LiK5Lyg57Sg5p2QJyxcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgaWNvblBhdGg6ICdodHRwczovL3N0YXRpYy41OC5jb20vbGJnL3NoYW5namlheGN4aHQvemh1c2hvdS9pbWcvaWNvbi1vcmRlci5wbmcnLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogJ+iuouWNleeuoeeQhicsXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGljb25QYXRoOiAnaHR0cHM6Ly9zdGF0aWMuNTguY29tL2xiZy9zaGFuZ2ppYXhjeGh0L3podXNob3UvaW1nL2ljb24tcmVnaXN0ZXIucG5nJyxcclxuICAgICAgICAgICAgICAgIHRleHQ6ICflvq7kv6Hms6jlhozkv6Hmga8nLFxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBpY29uUGF0aDogJ2h0dHBzOi8vc3RhdGljLjU4LmNvbS9sYmcvc2hhbmdqaWF4Y3hodC96aHVzaG91L2ltZy9pY29uLXByb2dyZXNzLnBuZycsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAn5a6M5oiQ5bqmJyxcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgaWNvblBhdGg6ICdodHRwczovL3N0YXRpYy41OC5jb20vbGJnL3NoYW5namlheGN4aHQvemh1c2hvdS9pbWcvaWNvbi1hZHZpY2UucG5nJyxcclxuICAgICAgICAgICAgICAgIHRleHQ6ICfmhI/op4Hlj43ppognLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICB9XHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIGxpbmsgKGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gNCkgeyAvLyAgIOaEj+ingeWPjemmiOS4jeWBmuWIpOaWrVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0JlZm9yZUp1bXAoaW5kZXgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICdmZWVkYmFjaycsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2hlY2tQcm9ncmVzcyAoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5idXNpbmVzcy5tcENvdW50KSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgn5oKo6L+Y5pyq6LSt5Lmw5bCP56iL5bqP77yM6K+355m75b2VZS41OC5jb23ov5vooYzotK3kubAnLCAn5o+Q56S6Jyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmJ1c2luZXNzLm5leHR0YXNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnQXBwRWRpdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnVXBsb2FkSW5mbycsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuYXBwX3R5cGUgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygncmVnaXN0TWFwcGlkJywgdGhpcy5idXNpbmVzcy5zZWxlY3RlZC5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdyZWdpc3RNYWluQWNjb3VudCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdwcm9ncmVzcycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5idXNpbmVzcy5zZWxlY3RlZC5hcHBfdHlwZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAncHJvZ3Jlc3MnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnbXlNcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdwcm9ncmVzcycsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAncHJvZ3Jlc3MnLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA4OlxyXG4gICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ3Byb2dyZXNzJyxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgOTpcclxuICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdwcm9ncmVzcycsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhc3luYyBjaGFuZ2VBY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmJ1c2luZXNzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5idXNpbmVzcywge1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlTVA6IHRydWUsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9tcGxvZ2ljL215bXBsaXN0Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgbXBpbmZvcyB9ID0gZGF0YTtcclxuICAgICAgICAgICAgdGhpcy5idXNpbmVzcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYnVzaW5lc3MsIHtcclxuICAgICAgICAgICAgICAgIG1wczogbXBpbmZvcyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJ1c2luZXNzLm1wcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvdGhlcnMgPSB0aGlzLmJ1c2luZXNzLm1wcy5maWx0ZXIoKGFwcGluZm8pID0+IGFwcGluZm8uaWQgIT09XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXNpbmVzcy5zZWxlY3RlZC5pZCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtYXRlZE90aGVyID0gb3RoZXJzLm1hcCgoaXRlbSkgPT4gdGhpcy5mb3JtYXRlZE1wKGl0ZW0pKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmJ1c2luZXNzLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbXBzOiBmb3JtYXRlZE90aGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGNob3NlZElkOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbkNvbmZpcm06IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmJ1c2luZXNzLm1wcy5tYXAoKGFwcGluZm8sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYgKGFwcGluZm8uaWQgPT09IHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuaWQpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5idXNpbmVzcy5tcHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoaXMuYnVzaW5lc3MubXBzJywgdGhpcy5idXNpbmVzcy5tcHMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZEhpZGVNYXNrICgpIHtcclxuICAgICAgICAgICAgdGhpcy5idXNpbmVzcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYnVzaW5lc3MsIHtcclxuICAgICAgICAgICAgICAgIGNoYW5nZU1QOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNhbkNvbmZpcm06IGZhbHNlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNlbGVjdE1wIChpdGVtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmJ1c2luZXNzLCB7XHJcbiAgICAgICAgICAgICAgICBjaG9zZWRJZDogaXRlbS5pZCxcclxuICAgICAgICAgICAgICAgIGNhbkNvbmZpcm06IHRydWUsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn54K55Ye7JywgdGhpcy5idXNpbmVzcyk7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb25maXJtQWN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuaWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0R2xvYmFsTXBJZCh0aGlzLmJ1c2luZXNzLmNob3NlZElkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZU1hc2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbiAgICBoaWRlTWFzayAoKSB7XHJcbiAgICAgICAgdGhpcy5idXNpbmVzcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYnVzaW5lc3MsIHtcclxuICAgICAgICAgICAgY2hhbmdlTVA6IGZhbHNlLFxyXG4gICAgICAgICAgICBjYW5Db25maXJtOiBmYWxzZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfVxyXG4gICAgYXN5bmMgb25Mb2FkICgpIHtcclxuICAgICAgICBhd2FpdCBzbGVlcCgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdvbkxvYWQnKTtcclxuICAgIH1cclxuICAgIGFzeW5jIG9uU2hvdyAoKSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuc2V0R2xvYmFsTXBJZCh0aGlzLmJ1c2luZXNzLnNlbGVjdGVkLmlkKTtcclxuICAgIH1cclxuICAgIGZvcm1hdGVkTXAgKGl0ZW0pIHtcclxuICAgICAgICBjb25zdCBtcCA9IGl0ZW07XHJcbiAgICAgICAgaWYgKG1wLmhlYWRJbWcgJiYgbXAuaGVhZEltZy5pbmRleE9mKCdodHRwJykgPT09IC0xKSB7XHJcbiAgICAgICAgICAgIG1wLmhlYWRJbWcgPSBgaHR0cHM6Ly9waWMxLjU4Y2RuLmNvbS5jbiR7bXAuaGVhZEltZ31gO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbXA7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOeUqOaIt+eCueWHu+WPs+S4iuinkuWIhuS6q1xyXG4gICAgICovXHJcbiAgICBvblNoYXJlQXBwTWVzc2FnZSAocmVzKSB7XHJcbiAgICAgICAgaWYgKHJlcy5mcm9tID09PSAnYnV0dG9uJykge1xyXG4gICAgICAgICAgICAvLyDmnaXoh6rpobXpnaLlhoXovazlj5HmjInpkq5cclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLnRhcmdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAn6auY5pWI566h55CG5ZWG5a625bCP56iL5bqP55qE5LiA56uZ5byP5pyN5Yqh5bel5YW3JyxcclxuICAgICAgICAgICAgcGF0aDogJy9wYWdlcy9ob21lJyxcclxuICAgICAgICAgICAgaW1hZ2VVcmw6ICdodHRwczovL3N0YXRpYy41OC5jb20vbGJnL3NoYW5namlheGN4aHQvemh1c2hvdS9pbWcvc2hhcmUucG5nJyxcclxuICAgICAgICAgICAgc3VjY2VzcyAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWwgKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgYXN5bmMgbG9hZERhdGEgKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1YkRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBtcGlkOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdjdXJyZW50X21waWQnKSB8fCAnJyxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvbXBsb2dpYy9pbmRleCcsIHN1YkRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbG9hZERhdGEnLCBkYXRhKTtcclxuICAgICAgICAgICAgY29uc3Qge1xyXG4gICAgICAgICAgICAgICAgdXNlcm5hbWUgPSAnJyxcclxuICAgICAgICAgICAgICAgIG1waW5mbyA9IHt9LFxyXG4gICAgICAgICAgICAgICAgdW5yZWFkID0gJycsXHJcbiAgICAgICAgICAgICAgICBjb3VudCA9IDAsXHJcbiAgICAgICAgICAgICAgICBuZXh0dGFzayA9ICcnLFxyXG4gICAgICAgICAgICB9ID0gZGF0YTtcclxuICAgICAgICAgICAgY29uc3QgZm9ybWF0ZWRNcGluZm8gPSB0aGlzLmZvcm1hdGVkTXAobXBpbmZvKTtcclxuICAgICAgICAgICAgdGhpcy5idXNpbmVzcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYnVzaW5lc3MsIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IHVzZXJuYW1lLFxyXG4gICAgICAgICAgICAgICAgbWluaVByb2dyYW1OYW1lOiBtcGluZm8ubmlja05hbWUgfHwgJ+aCqOi/mOayoei0reS5sOWwj+eoi+W6jycsXHJcbiAgICAgICAgICAgICAgICB1bnJlYWQsXHJcbiAgICAgICAgICAgICAgICBtcENvdW50OiBjb3VudCxcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmb3JtYXRlZE1waW5mbyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG5leHR0YXNrICYmIHRoaXMuc2V0TmV4dFRhc2sobmV4dHRhc2spO1xyXG4gICAgICAgICAgICAvLyBkYXRhLnVzZXJuYW1lICYmICh0aGlzLmJ1c2luZXNzLm5hbWUgPSBkYXRhLnVzZXJuYW1lKTtcclxuICAgICAgICAgICAgLy8gZGF0YS5tcGluZm8gJiYgKHRoaXMuYnVzaW5lc3MubWluaVByb2dyYW1OYW1lID0gZGF0YS5tcGluZm8ubmlja05hbWUpO1xyXG4gICAgICAgICAgICAvLyBkYXRhLnVucmVhZCAmJiAodGhpcy5idXNpbmVzcy51bnJlYWQgPSBkYXRhLnVucmVhZCk7XHJcbiAgICAgICAgICAgIC8vIGRhdGEuY291bnQgJiYgKHRoaXMuYnVzaW5lc3MubXBDb3VudCA9IGRhdGEuY291bnQpO1xyXG4gICAgICAgICAgICAvLyBkYXRhLm1waW5mbyAmJiAodGhpcy5idXNpbmVzcy5zZWxlY3RlZC5pZCA9IGRhdGEubXBpbmZvLmlkKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGhpcy5idXNpbmVzcycsIHRoaXMuYnVzaW5lc3MpO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2UnLCBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzZXRHbG9iYWxNcElkIChpZCkge1xyXG4gICAgICAgIGlmIChpZCkge1xyXG4gICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdjdXJyZW50X21waWQnLCBpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2hlY2tCZWZvcmVKdW1wIChpbmRleCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCd0aGlzLmJ1c2luZXNzLnNlbGVjdGVkLicsIHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQpO1xyXG4gICAgICAgIGlmICghdGhpcy5idXNpbmVzcy5tcENvdW50KSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KCfmgqjov5jmnKrotK3kubDlsI/nqIvluo/vvIzor7fnmbvlvZVlLjU4LmNvbei/m+ihjOi0reS5sCcsICfmj5DnpLonKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzd2l0Y2ggKGluZGV4KSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnbXlNcCcsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJ1VwbG9hZEluZm8nLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICdPcmRlckxpc3QnLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuYXBwX3R5cGUgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydCgn5b2T5YmN5bCP56iL5bqP5Li65LyY5Lqr5bCP56iL5bqP77yM5LiN55So5o+Q5Lqk5rOo5YaM5L+h5oGvJywgJ+aPkOekuicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJ1c2luZXNzLnNlbGVjdGVkLnNpZ24gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdyZWdpc3RlZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3JlZ2lzdE1hcHBpZCcsIHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ3JlZ2lzdE1haW5BY2NvdW50JyxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJ3Byb2dyZXNzJyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnZmVlZGJhY2snLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNldE5leHRUYXNrICh0YXNrTnVtKSB7XHJcbiAgICAgICAgdGhpcy5idXNpbmVzcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYnVzaW5lc3MsIHtcclxuICAgICAgICAgICAgbmV4dHRhc2s6IHRhc2tOdW0sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc3dpdGNoICh0YXNrTnVtKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MucHJvZ3Jlc3NUZXh0ID0gJ+W9k+WJjeWwj+eoi+W6j+acqua3u+WKoOWwj+eoi+W6j+S/oeaBryc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5idXNpbmVzcy5wcm9ncmVzc1RleHQgPSAn5b2T5YmN5bCP56iL5bqP6L+Y5pyq5LiK5Lyg57Sg5p2QJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5idXNpbmVzcy5zZWxlY3RlZC5hcHBfdHlwZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MucHJvZ3Jlc3NUZXh0ID0gJ+W9k+WJjeWwj+eoi+W6j+S/oeaBr+W3suWujOWWhCc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MucHJvZ3Jlc3NUZXh0ID0gJ+W9k+WJjeWwj+eoi+W6j+i/mOacquWhq+WGmeazqOWGjOS/oeaBryc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OiAvLyDot7PovazmiJHnmoTlsI/nqIvluo9cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJ1c2luZXNzLnNlbGVjdGVkLmFwcF90eXBlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXNpbmVzcy5wcm9ncmVzc1RleHQgPSAn5b2T5YmN5bCP56iL5bqP5L+h5oGv5bey5a6M5ZaEJztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXNpbmVzcy5wcm9ncmVzc1RleHQgPSAn5b2T5YmN5bCP56iL5bqP6L+Y5pyq5o6I5p2DJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDY6IC8vIOi3s+i9rOWIsOi/m+W6plxyXG4gICAgICAgICAgICAgICAgdGhpcy5idXNpbmVzcy5wcm9ncmVzc1RleHQgPSAn5b2T5YmN5bCP56iL5bqP5L+h5oGv5bey5a6M5ZaEJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDc6IC8vIOa2iOaBr+WIl+ihqFxyXG4gICAgICAgICAgICAgICAgdGhpcy5idXNpbmVzcy5wcm9ncmVzc1RleHQgPSAn5b2T5YmN5bCP56iL5bqP5L+h5oGv5bey5a6M5ZaEJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDg6IC8vIOa2iOaBr+WIl+ihqFxyXG4gICAgICAgICAgICAgICAgdGhpcy5idXNpbmVzcy5wcm9ncmVzc1RleHQgPSAn5b2T5YmN5bCP56iL5bqP5L+h5oGv5bey5a6M5ZaEJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDk6IC8vIOWujOaIkOW6plxyXG4gICAgICAgICAgICAgICAgdGhpcy5idXNpbmVzcy5wcm9ncmVzc1RleHQgPSAn5b2T5YmN5bCP56iL5bqP5L+h5oGv5bey5a6M5ZaEJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICB9XHJcbn1cclxuIl19
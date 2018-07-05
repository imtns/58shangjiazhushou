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
            // if (!this.business.mpCount) {
            //     alert('您还未购买小程序，请登录e.58.com进行购买', '提示');
            //     return;
            // }
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
                    // wepy.navigateTo({
                    //     url: 'feedback',
                    // });
                    _wepy2.default.navigateTo({
                        url: 'purchase'
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuanMiXSwibmFtZXMiOlsiSG9tZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkaXNhYmxlU2Nyb2xsIiwiZGF0YSIsImJ1c2luZXNzIiwibXBzIiwibmFtZSIsIm1pbmlQcm9ncmFtTmFtZSIsInVucmVhZCIsIm1wQ291bnQiLCJwcm9ncmVzc1RleHQiLCJuZXh0dGFzayIsImNoYW5nZU1QIiwiY2FuQ29uZmlybSIsInNlbGVjdGVkIiwiaWQiLCJjaG9zZWRJZCIsIml0ZW1zIiwiaWNvblBhdGgiLCJ0ZXh0IiwibWV0aG9kcyIsImxpbmsiLCJpbmRleCIsImNoZWNrQmVmb3JlSnVtcCIsIndlcHkiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiY2hlY2tQcm9ncmVzcyIsImFwcF90eXBlIiwic2V0U3RvcmFnZVN5bmMiLCIkYXBwbHkiLCJjaGFuZ2VBY3Rpb24iLCJPYmplY3QiLCJhc3NpZ24iLCJtcGluZm9zIiwibGVuZ3RoIiwib3RoZXJzIiwiZmlsdGVyIiwiYXBwaW5mbyIsImZvcm1hdGVkT3RoZXIiLCJtYXAiLCJpdGVtIiwiZm9ybWF0ZWRNcCIsImNvbnNvbGUiLCJsb2ciLCJiaW5kSGlkZU1hc2siLCJzZWxlY3RNcCIsImNvbmZpcm1BY3Rpb24iLCJzZXRHbG9iYWxNcElkIiwibG9hZERhdGEiLCJoaWRlTWFzayIsIm1wIiwiaGVhZEltZyIsImluZGV4T2YiLCJyZXMiLCJmcm9tIiwidGFyZ2V0IiwidGl0bGUiLCJwYXRoIiwiaW1hZ2VVcmwiLCJzdWNjZXNzIiwiZmFpbCIsImVyciIsInN1YkRhdGEiLCJtcGlkIiwiZ2V0U3RvcmFnZVN5bmMiLCJ1c2VybmFtZSIsIm1waW5mbyIsImNvdW50IiwiZm9ybWF0ZWRNcGluZm8iLCJuaWNrTmFtZSIsInNldE5leHRUYXNrIiwic2lnbiIsInRhc2tOdW0iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7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SSx5QkFBS04sUUFBTCxDQUFjTSxZQUFkLEdBQTZCLGFBQTdCO0FBQ0E7QUFDSixxQkFBSyxDQUFMO0FBQ0ksd0JBQUksS0FBS04sUUFBTCxDQUFjVSxRQUFkLENBQXVCYyxRQUF2QixLQUFvQyxDQUF4QyxFQUEyQztBQUN2Qyw2QkFBS3hCLFFBQUwsQ0FBY00sWUFBZCxHQUE2QixZQUE3QjtBQUNILHFCQUZELE1BRU87QUFDSCw2QkFBS04sUUFBTCxDQUFjTSxZQUFkLEdBQTZCLGVBQTdCO0FBQ0g7QUFDRDtBQUNKLHFCQUFLLENBQUw7QUFBUTtBQUNKLHdCQUFJLEtBQUtOLFFBQUwsQ0FBY1UsUUFBZCxDQUF1QmMsUUFBdkIsS0FBb0MsQ0FBeEMsRUFBMkM7QUFDdkMsNkJBQUt4QixRQUFMLENBQWNNLFlBQWQsR0FBNkIsWUFBN0I7QUFDSCxxQkFGRCxNQUVPO0FBQ0gsNkJBQUtOLFFBQUwsQ0FBY00sWUFBZCxHQUE2QixXQUE3QjtBQUNIO0FBQ0Q7QUFDSixxQkFBSyxDQUFMO0FBQVE7QUFDSix5QkFBS04sUUFBTCxDQUFjTSxZQUFkLEdBQTZCLFlBQTdCO0FBQ0E7QUFDSixxQkFBSyxDQUFMO0FBQVE7QUFDSix5QkFBS04sUUFBTCxDQUFjTSxZQUFkLEdBQTZCLFlBQTdCO0FBQ0E7QUFDSixxQkFBSyxDQUFMO0FBQVE7QUFDSix5QkFBS04sUUFBTCxDQUFjTSxZQUFkLEdBQTZCLFlBQTdCO0FBQ0E7QUFDSixxQkFBSyxDQUFMO0FBQVE7QUFDSix5QkFBS04sUUFBTCxDQUFjTSxZQUFkLEdBQTZCLFlBQTdCO0FBQ0E7QUFDSjtBQUNJO0FBbENSO0FBb0NBLGlCQUFLb0IsTUFBTDtBQUNIOzs7O0VBelY2Qk4sZUFBS2tELEk7O2tCQUFsQjNFLEkiLCJmaWxlIjoiaG9tZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IHsgc2xlZXAsIGFsZXJ0IH0gZnJvbSAnLi4vdXRpbHMnO1xyXG5pbXBvcnQgeyBwb3N0IH0gZnJvbSAnLi4vdXRpbHMvYWpheCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb21lIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6aaW6aG1JyxcclxuICAgICAgICBkaXNhYmxlU2Nyb2xsOiB0cnVlLFxyXG4gICAgfVxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBidXNpbmVzczoge1xyXG4gICAgICAgICAgICBtcHM6IFtdLFxyXG4gICAgICAgICAgICBuYW1lOiAn5oKo55qE5aeT5ZCNJyxcclxuICAgICAgICAgICAgbWluaVByb2dyYW1OYW1lOiAn5oKo6L+Y5rKh6LSt5Lmw5bCP56iL5bqPJyxcclxuICAgICAgICAgICAgdW5yZWFkOiAwLFxyXG4gICAgICAgICAgICBtcENvdW50OiAwLFxyXG4gICAgICAgICAgICBwcm9ncmVzc1RleHQ6ICfmgqjov5jmsqHmnInotK3kubDlsI/nqIvluo8nLFxyXG4gICAgICAgICAgICBuZXh0dGFzazogMCxcclxuICAgICAgICAgICAgY2hhbmdlTVA6IGZhbHNlLFxyXG4gICAgICAgICAgICBjYW5Db25maXJtOiBmYWxzZSxcclxuICAgICAgICAgICAgc2VsZWN0ZWQ6IHtcclxuICAgICAgICAgICAgICAgIGlkOiAwLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjaG9zZWRJZDogMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGljb25QYXRoOiAnaHR0cHM6Ly9zdGF0aWMuNTguY29tL2xiZy9zaGFuZ2ppYXhjeGh0L3podXNob3UvaW1nL2ljb24tbXkucG5nJyxcclxuICAgICAgICAgICAgICAgIHRleHQ6ICfmiJHnmoTlsI/nqIvluo8nLFxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBpY29uUGF0aDogJ2h0dHBzOi8vc3RhdGljLjU4LmNvbS9sYmcvc2hhbmdqaWF4Y3hodC96aHVzaG91L2ltZy9pY29uLXVwbG9hZC5wbmcnLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogJ+S4iuS8oOe0oOadkCcsXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGljb25QYXRoOiAnaHR0cHM6Ly9zdGF0aWMuNTguY29tL2xiZy9zaGFuZ2ppYXhjeGh0L3podXNob3UvaW1nL2ljb24tb3JkZXIucG5nJyxcclxuICAgICAgICAgICAgICAgIHRleHQ6ICforqLljZXnrqHnkIYnLFxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBpY29uUGF0aDogJ2h0dHBzOi8vc3RhdGljLjU4LmNvbS9sYmcvc2hhbmdqaWF4Y3hodC96aHVzaG91L2ltZy9pY29uLXJlZ2lzdGVyLnBuZycsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAn5b6u5L+h5rOo5YaM5L+h5oGvJyxcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgaWNvblBhdGg6ICdodHRwczovL3N0YXRpYy41OC5jb20vbGJnL3NoYW5namlheGN4aHQvemh1c2hvdS9pbWcvaWNvbi1wcm9ncmVzcy5wbmcnLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogJ+WujOaIkOW6picsXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGljb25QYXRoOiAnaHR0cHM6Ly9zdGF0aWMuNTguY29tL2xiZy9zaGFuZ2ppYXhjeGh0L3podXNob3UvaW1nL2ljb24tYWR2aWNlLnBuZycsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAn5oSP6KeB5Y+N6aaIJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgfVxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBsaW5rIChpbmRleCkge1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IDQpIHsgLy8gICDmhI/op4Hlj43ppojkuI3lgZrliKTmlq1cclxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tCZWZvcmVKdW1wKGluZGV4KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnZmVlZGJhY2snLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoZWNrUHJvZ3Jlc3MgKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuYnVzaW5lc3MubXBDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ+aCqOi/mOacqui0reS5sOWwj+eoi+W6j++8jOivt+eZu+W9lWUuNTguY29t6L+b6KGM6LSt5LmwJywgJ+aPkOekuicpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5idXNpbmVzcy5uZXh0dGFzaykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ0FwcEVkaXQnLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ1VwbG9hZEluZm8nLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmJ1c2luZXNzLnNlbGVjdGVkLmFwcF90eXBlID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3JlZ2lzdE1hcHBpZCcsIHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAncmVnaXN0TWFpbkFjY291bnQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAncHJvZ3Jlc3MnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuYXBwX3R5cGUgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ3Byb2dyZXNzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ215TXAnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAncHJvZ3Jlc3MnLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OlxyXG4gICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ3Byb2dyZXNzJyxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgODpcclxuICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdwcm9ncmVzcycsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDk6XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAncHJvZ3Jlc3MnLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXN5bmMgY2hhbmdlQWN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5idXNpbmVzcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYnVzaW5lc3MsIHtcclxuICAgICAgICAgICAgICAgIGNoYW5nZU1QOiB0cnVlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvbXBsb2dpYy9teW1wbGlzdCcpO1xyXG4gICAgICAgICAgICBjb25zdCB7IG1waW5mb3MgfSA9IGRhdGE7XHJcbiAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmJ1c2luZXNzLCB7XHJcbiAgICAgICAgICAgICAgICBtcHM6IG1waW5mb3MsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5idXNpbmVzcy5tcHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3RoZXJzID0gdGhpcy5idXNpbmVzcy5tcHMuZmlsdGVyKChhcHBpbmZvKSA9PiBhcHBpbmZvLmlkICE9PVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuaWQpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybWF0ZWRPdGhlciA9IG90aGVycy5tYXAoKGl0ZW0pID0+IHRoaXMuZm9ybWF0ZWRNcChpdGVtKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1c2luZXNzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5idXNpbmVzcywge1xyXG4gICAgICAgICAgICAgICAgICAgIG1wczogZm9ybWF0ZWRPdGhlcixcclxuICAgICAgICAgICAgICAgICAgICBjaG9zZWRJZDogMCxcclxuICAgICAgICAgICAgICAgICAgICBjYW5Db25maXJtOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5idXNpbmVzcy5tcHMubWFwKChhcHBpbmZvLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGlmIChhcHBpbmZvLmlkID09PSB0aGlzLmJ1c2luZXNzLnNlbGVjdGVkLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuYnVzaW5lc3MubXBzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGlzLmJ1c2luZXNzLm1wcycsIHRoaXMuYnVzaW5lc3MubXBzKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRIaWRlTWFzayAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmJ1c2luZXNzLCB7XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VNUDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjYW5Db25maXJtOiBmYWxzZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZWxlY3RNcCAoaXRlbSkge1xyXG4gICAgICAgICAgICB0aGlzLmJ1c2luZXNzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5idXNpbmVzcywge1xyXG4gICAgICAgICAgICAgICAgY2hvc2VkSWQ6IGl0ZW0uaWQsXHJcbiAgICAgICAgICAgICAgICBjYW5Db25maXJtOiB0cnVlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+eCueWHuycsIHRoaXMuYnVzaW5lc3MpO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29uZmlybUFjdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJ1c2luZXNzLnNlbGVjdGVkLmlkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEdsb2JhbE1wSWQodGhpcy5idXNpbmVzcy5jaG9zZWRJZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVNYXNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgfVxyXG4gICAgaGlkZU1hc2sgKCkge1xyXG4gICAgICAgIHRoaXMuYnVzaW5lc3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmJ1c2luZXNzLCB7XHJcbiAgICAgICAgICAgIGNoYW5nZU1QOiBmYWxzZSxcclxuICAgICAgICAgICAgY2FuQ29uZmlybTogZmFsc2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgIH1cclxuICAgIGFzeW5jIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgYXdhaXQgc2xlZXAoKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnb25Mb2FkJyk7XHJcbiAgICB9XHJcbiAgICBhc3luYyBvblNob3cgKCkge1xyXG4gICAgICAgIGF3YWl0IHRoaXMubG9hZERhdGEoKTtcclxuICAgICAgICB0aGlzLnNldEdsb2JhbE1wSWQodGhpcy5idXNpbmVzcy5zZWxlY3RlZC5pZCk7XHJcbiAgICB9XHJcbiAgICBmb3JtYXRlZE1wIChpdGVtKSB7XHJcbiAgICAgICAgY29uc3QgbXAgPSBpdGVtO1xyXG4gICAgICAgIGlmIChtcC5oZWFkSW1nICYmIG1wLmhlYWRJbWcuaW5kZXhPZignaHR0cCcpID09PSAtMSkge1xyXG4gICAgICAgICAgICBtcC5oZWFkSW1nID0gYGh0dHBzOi8vcGljMS41OGNkbi5jb20uY24ke21wLmhlYWRJbWd9YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1wO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDnlKjmiLfngrnlh7vlj7PkuIrop5LliIbkuqtcclxuICAgICAqL1xyXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UgKHJlcykge1xyXG4gICAgICAgIGlmIChyZXMuZnJvbSA9PT0gJ2J1dHRvbicpIHtcclxuICAgICAgICAgICAgLy8g5p2l6Ieq6aG16Z2i5YaF6L2s5Y+R5oyJ6ZKuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy50YXJnZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0aXRsZTogJ+mrmOaViOeuoeeQhuWVhuWutuWwj+eoi+W6j+eahOS4gOermeW8j+acjeWKoeW3peWFtycsXHJcbiAgICAgICAgICAgIHBhdGg6ICcvcGFnZXMvaG9tZScsXHJcbiAgICAgICAgICAgIGltYWdlVXJsOiAnaHR0cHM6Ly9zdGF0aWMuNTguY29tL2xiZy9zaGFuZ2ppYXhjeGh0L3podXNob3UvaW1nL3NoYXJlLnBuZycsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3MgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGFzeW5jIGxvYWREYXRhICgpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBzdWJEYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgbXBpZDogd2VweS5nZXRTdG9yYWdlU3luYygnY3VycmVudF9tcGlkJykgfHwgJycsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL21wbG9naWMvaW5kZXgnLCBzdWJEYXRhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvYWREYXRhJywgZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgICAgIHVzZXJuYW1lID0gJycsXHJcbiAgICAgICAgICAgICAgICBtcGluZm8gPSB7fSxcclxuICAgICAgICAgICAgICAgIHVucmVhZCA9ICcnLFxyXG4gICAgICAgICAgICAgICAgY291bnQgPSAwLFxyXG4gICAgICAgICAgICAgICAgbmV4dHRhc2sgPSAnJyxcclxuICAgICAgICAgICAgfSA9IGRhdGE7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdGVkTXBpbmZvID0gdGhpcy5mb3JtYXRlZE1wKG1waW5mbyk7XHJcbiAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmJ1c2luZXNzLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiB1c2VybmFtZSxcclxuICAgICAgICAgICAgICAgIG1pbmlQcm9ncmFtTmFtZTogbXBpbmZvLm5pY2tOYW1lIHx8ICfmgqjov5jmsqHotK3kubDlsI/nqIvluo8nLFxyXG4gICAgICAgICAgICAgICAgdW5yZWFkLFxyXG4gICAgICAgICAgICAgICAgbXBDb3VudDogY291bnQsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZm9ybWF0ZWRNcGluZm8sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBuZXh0dGFzayAmJiB0aGlzLnNldE5leHRUYXNrKG5leHR0YXNrKTtcclxuICAgICAgICAgICAgLy8gZGF0YS51c2VybmFtZSAmJiAodGhpcy5idXNpbmVzcy5uYW1lID0gZGF0YS51c2VybmFtZSk7XHJcbiAgICAgICAgICAgIC8vIGRhdGEubXBpbmZvICYmICh0aGlzLmJ1c2luZXNzLm1pbmlQcm9ncmFtTmFtZSA9IGRhdGEubXBpbmZvLm5pY2tOYW1lKTtcclxuICAgICAgICAgICAgLy8gZGF0YS51bnJlYWQgJiYgKHRoaXMuYnVzaW5lc3MudW5yZWFkID0gZGF0YS51bnJlYWQpO1xyXG4gICAgICAgICAgICAvLyBkYXRhLmNvdW50ICYmICh0aGlzLmJ1c2luZXNzLm1wQ291bnQgPSBkYXRhLmNvdW50KTtcclxuICAgICAgICAgICAgLy8gZGF0YS5tcGluZm8gJiYgKHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuaWQgPSBkYXRhLm1waW5mby5pZClcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoaXMuYnVzaW5lc3MnLCB0aGlzLmJ1c2luZXNzKTtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlJywgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2V0R2xvYmFsTXBJZCAoaWQpIHtcclxuICAgICAgICBpZiAoaWQpIHtcclxuICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygnY3VycmVudF9tcGlkJywgaWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNoZWNrQmVmb3JlSnVtcCAoaW5kZXgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygndGhpcy5idXNpbmVzcy5zZWxlY3RlZC4nLCB0aGlzLmJ1c2luZXNzLnNlbGVjdGVkKTtcclxuICAgICAgICAvLyBpZiAoIXRoaXMuYnVzaW5lc3MubXBDb3VudCkge1xyXG4gICAgICAgIC8vICAgICBhbGVydCgn5oKo6L+Y5pyq6LSt5Lmw5bCP56iL5bqP77yM6K+355m75b2VZS41OC5jb23ov5vooYzotK3kubAnLCAn5o+Q56S6Jyk7XHJcbiAgICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgc3dpdGNoIChpbmRleCkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJ215TXAnLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICdVcGxvYWRJbmZvJyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnT3JkZXJMaXN0JyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJ1c2luZXNzLnNlbGVjdGVkLmFwcF90eXBlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ+W9k+WJjeWwj+eoi+W6j+S4uuS8mOS6q+Wwj+eoi+W6j++8jOS4jeeUqOaPkOS6pOazqOWGjOS/oeaBrycsICfmj5DnpLonKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5idXNpbmVzcy5zZWxlY3RlZC5zaWduID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAncmVnaXN0ZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdyZWdpc3RNYXBwaWQnLCB0aGlzLmJ1c2luZXNzLnNlbGVjdGVkLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdyZWdpc3RNYWluQWNjb3VudCcsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICdwcm9ncmVzcycsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAvLyB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHVybDogJ2ZlZWRiYWNrJyxcclxuICAgICAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICdwdXJjaGFzZScsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2V0TmV4dFRhc2sgKHRhc2tOdW0pIHtcclxuICAgICAgICB0aGlzLmJ1c2luZXNzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5idXNpbmVzcywge1xyXG4gICAgICAgICAgICBuZXh0dGFzazogdGFza051bSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBzd2l0Y2ggKHRhc2tOdW0pIHtcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5idXNpbmVzcy5wcm9ncmVzc1RleHQgPSAn5b2T5YmN5bCP56iL5bqP5pyq5re75Yqg5bCP56iL5bqP5L+h5oGvJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1c2luZXNzLnByb2dyZXNzVGV4dCA9ICflvZPliY3lsI/nqIvluo/ov5jmnKrkuIrkvKDntKDmnZAnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJ1c2luZXNzLnNlbGVjdGVkLmFwcF90eXBlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXNpbmVzcy5wcm9ncmVzc1RleHQgPSAn5b2T5YmN5bCP56iL5bqP5L+h5oGv5bey5a6M5ZaEJztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXNpbmVzcy5wcm9ncmVzc1RleHQgPSAn5b2T5YmN5bCP56iL5bqP6L+Y5pyq5aGr5YaZ5rOo5YaM5L+h5oGvJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6IC8vIOi3s+i9rOaIkeeahOWwj+eoi+W6j1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuYXBwX3R5cGUgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1c2luZXNzLnByb2dyZXNzVGV4dCA9ICflvZPliY3lsI/nqIvluo/kv6Hmga/lt7LlrozlloQnO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1c2luZXNzLnByb2dyZXNzVGV4dCA9ICflvZPliY3lsI/nqIvluo/ov5jmnKrmjojmnYMnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNjogLy8g6Lez6L2s5Yiw6L+b5bqmXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1c2luZXNzLnByb2dyZXNzVGV4dCA9ICflvZPliY3lsI/nqIvluo/kv6Hmga/lt7LlrozlloQnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNzogLy8g5raI5oGv5YiX6KGoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1c2luZXNzLnByb2dyZXNzVGV4dCA9ICflvZPliY3lsI/nqIvluo/kv6Hmga/lt7LlrozlloQnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgODogLy8g5raI5oGv5YiX6KGoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1c2luZXNzLnByb2dyZXNzVGV4dCA9ICflvZPliY3lsI/nqIvluo/kv6Hmga/lt7LlrozlloQnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgOTogLy8g5a6M5oiQ5bqmXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1c2luZXNzLnByb2dyZXNzVGV4dCA9ICflvZPliY3lsI/nqIvluo/kv6Hmga/lt7LlrozlloQnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgIH1cclxufVxyXG4iXX0=
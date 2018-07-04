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
                iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-progress.png',
                text: '完成度'
            }, {
                iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-register.png',
                text: '微信注册信息'
            }, {
                iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-progress.png',
                text: '支付开通'
            }, {
                iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-advice.png',
                text: '意见反馈'
            }, {
                iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-progress.png',
                text: '暂未开放'
            }]
        }, _this.methods = {
            link: function link(index) {
                if (index !== 6) {
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
                    _wepy2.default.navigateTo({
                        url: 'progress'
                    });
                    break;
                case 4:
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
                case 5:
                    _wepy2.default.navigateTo({
                        url: 'OpenPay'
                    });
                    break;
                case 6:
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuanMiXSwibmFtZXMiOlsiSG9tZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkaXNhYmxlU2Nyb2xsIiwiZGF0YSIsImJ1c2luZXNzIiwibXBzIiwibmFtZSIsIm1pbmlQcm9ncmFtTmFtZSIsInVucmVhZCIsIm1wQ291bnQiLCJwcm9ncmVzc1RleHQiLCJuZXh0dGFzayIsImNoYW5nZU1QIiwiY2FuQ29uZmlybSIsInNlbGVjdGVkIiwiaWQiLCJjaG9zZWRJZCIsIml0ZW1zIiwiaWNvblBhdGgiLCJ0ZXh0IiwibWV0aG9kcyIsImxpbmsiLCJpbmRleCIsImNoZWNrQmVmb3JlSnVtcCIsIndlcHkiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiY2hlY2tQcm9ncmVzcyIsImFwcF90eXBlIiwic2V0U3RvcmFnZVN5bmMiLCIkYXBwbHkiLCJjaGFuZ2VBY3Rpb24iLCJPYmplY3QiLCJhc3NpZ24iLCJtcGluZm9zIiwibGVuZ3RoIiwib3RoZXJzIiwiZmlsdGVyIiwiYXBwaW5mbyIsImZvcm1hdGVkT3RoZXIiLCJtYXAiLCJpdGVtIiwiZm9ybWF0ZWRNcCIsImNvbnNvbGUiLCJsb2ciLCJiaW5kSGlkZU1hc2siLCJzZWxlY3RNcCIsImNvbmZpcm1BY3Rpb24iLCJzZXRHbG9iYWxNcElkIiwibG9hZERhdGEiLCJoaWRlTWFzayIsIm1wIiwiaGVhZEltZyIsImluZGV4T2YiLCJyZXMiLCJmcm9tIiwidGFyZ2V0IiwidGl0bGUiLCJwYXRoIiwiaW1hZ2VVcmwiLCJzdWNjZXNzIiwiZmFpbCIsImVyciIsInN1YkRhdGEiLCJtcGlkIiwiZ2V0U3RvcmFnZVN5bmMiLCJ1c2VybmFtZSIsIm1waW5mbyIsImNvdW50IiwiZm9ybWF0ZWRNcGluZm8iLCJuaWNrTmFtZSIsInNldE5leHRUYXNrIiwic2lnbiIsInRhc2tOdW0iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7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QUFDSjtBQUNJO0FBbENSO0FBb0NBLGlCQUFLb0IsTUFBTDtBQUNIOzs7O0VBalc2Qk4sZUFBS2tELEk7O2tCQUFsQjNFLEkiLCJmaWxlIjoiaG9tZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IHsgc2xlZXAsIGFsZXJ0IH0gZnJvbSAnLi4vdXRpbHMnO1xyXG5pbXBvcnQgeyBwb3N0IH0gZnJvbSAnLi4vdXRpbHMvYWpheCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb21lIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6aaW6aG1JyxcclxuICAgICAgICBkaXNhYmxlU2Nyb2xsOiB0cnVlLFxyXG4gICAgfVxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBidXNpbmVzczoge1xyXG4gICAgICAgICAgICBtcHM6IFtdLFxyXG4gICAgICAgICAgICBuYW1lOiAn5oKo55qE5aeT5ZCNJyxcclxuICAgICAgICAgICAgbWluaVByb2dyYW1OYW1lOiAn5oKo6L+Y5rKh6LSt5Lmw5bCP56iL5bqPJyxcclxuICAgICAgICAgICAgdW5yZWFkOiAwLFxyXG4gICAgICAgICAgICBtcENvdW50OiAwLFxyXG4gICAgICAgICAgICBwcm9ncmVzc1RleHQ6ICfmgqjov5jmsqHmnInotK3kubDlsI/nqIvluo8nLFxyXG4gICAgICAgICAgICBuZXh0dGFzazogMCxcclxuICAgICAgICAgICAgY2hhbmdlTVA6IGZhbHNlLFxyXG4gICAgICAgICAgICBjYW5Db25maXJtOiBmYWxzZSxcclxuICAgICAgICAgICAgc2VsZWN0ZWQ6IHtcclxuICAgICAgICAgICAgICAgIGlkOiAwLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjaG9zZWRJZDogMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGljb25QYXRoOiAnaHR0cHM6Ly9zdGF0aWMuNTguY29tL2xiZy9zaGFuZ2ppYXhjeGh0L3podXNob3UvaW1nL2ljb24tbXkucG5nJyxcclxuICAgICAgICAgICAgICAgIHRleHQ6ICfmiJHnmoTlsI/nqIvluo8nLFxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBpY29uUGF0aDogJ2h0dHBzOi8vc3RhdGljLjU4LmNvbS9sYmcvc2hhbmdqaWF4Y3hodC96aHVzaG91L2ltZy9pY29uLXVwbG9hZC5wbmcnLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogJ+S4iuS8oOe0oOadkCcsXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGljb25QYXRoOiAnaHR0cHM6Ly9zdGF0aWMuNTguY29tL2xiZy9zaGFuZ2ppYXhjeGh0L3podXNob3UvaW1nL2ljb24tb3JkZXIucG5nJyxcclxuICAgICAgICAgICAgICAgIHRleHQ6ICforqLljZXnrqHnkIYnLFxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBpY29uUGF0aDogJ2h0dHBzOi8vc3RhdGljLjU4LmNvbS9sYmcvc2hhbmdqaWF4Y3hodC96aHVzaG91L2ltZy9pY29uLXByb2dyZXNzLnBuZycsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAn5a6M5oiQ5bqmJyxcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgaWNvblBhdGg6ICdodHRwczovL3N0YXRpYy41OC5jb20vbGJnL3NoYW5namlheGN4aHQvemh1c2hvdS9pbWcvaWNvbi1yZWdpc3Rlci5wbmcnLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogJ+W+ruS/oeazqOWGjOS/oeaBrycsXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGljb25QYXRoOiAnaHR0cHM6Ly9zdGF0aWMuNTguY29tL2xiZy9zaGFuZ2ppYXhjeGh0L3podXNob3UvaW1nL2ljb24tcHJvZ3Jlc3MucG5nJyxcclxuICAgICAgICAgICAgICAgIHRleHQ6ICfmlK/ku5jlvIDpgJonLFxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBpY29uUGF0aDogJ2h0dHBzOi8vc3RhdGljLjU4LmNvbS9sYmcvc2hhbmdqaWF4Y3hodC96aHVzaG91L2ltZy9pY29uLWFkdmljZS5wbmcnLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogJ+aEj+ingeWPjemmiCcsXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGljb25QYXRoOiAnaHR0cHM6Ly9zdGF0aWMuNTguY29tL2xiZy9zaGFuZ2ppYXhjeGh0L3podXNob3UvaW1nL2ljb24tcHJvZ3Jlc3MucG5nJyxcclxuICAgICAgICAgICAgICAgIHRleHQ6ICfmmoLmnKrlvIDmlL4nLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICB9XHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIGxpbmsgKGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gNikgeyAvLyAgIOaEj+ingeWPjemmiOS4jeWBmuWIpOaWrVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0JlZm9yZUp1bXAoaW5kZXgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICdmZWVkYmFjaycsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2hlY2tQcm9ncmVzcyAoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5idXNpbmVzcy5tcENvdW50KSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgn5oKo6L+Y5pyq6LSt5Lmw5bCP56iL5bqP77yM6K+355m75b2VZS41OC5jb23ov5vooYzotK3kubAnLCAn5o+Q56S6Jyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmJ1c2luZXNzLm5leHR0YXNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnQXBwRWRpdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnVXBsb2FkSW5mbycsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuYXBwX3R5cGUgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygncmVnaXN0TWFwcGlkJywgdGhpcy5idXNpbmVzcy5zZWxlY3RlZC5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdyZWdpc3RNYWluQWNjb3VudCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdwcm9ncmVzcycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5idXNpbmVzcy5zZWxlY3RlZC5hcHBfdHlwZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAncHJvZ3Jlc3MnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnbXlNcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdwcm9ncmVzcycsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAncHJvZ3Jlc3MnLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA4OlxyXG4gICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ3Byb2dyZXNzJyxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgOTpcclxuICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdwcm9ncmVzcycsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhc3luYyBjaGFuZ2VBY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmJ1c2luZXNzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5idXNpbmVzcywge1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlTVA6IHRydWUsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9tcGxvZ2ljL215bXBsaXN0Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgbXBpbmZvcyB9ID0gZGF0YTtcclxuICAgICAgICAgICAgdGhpcy5idXNpbmVzcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYnVzaW5lc3MsIHtcclxuICAgICAgICAgICAgICAgIG1wczogbXBpbmZvcyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJ1c2luZXNzLm1wcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvdGhlcnMgPSB0aGlzLmJ1c2luZXNzLm1wcy5maWx0ZXIoKGFwcGluZm8pID0+IGFwcGluZm8uaWQgIT09XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXNpbmVzcy5zZWxlY3RlZC5pZCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtYXRlZE90aGVyID0gb3RoZXJzLm1hcCgoaXRlbSkgPT4gdGhpcy5mb3JtYXRlZE1wKGl0ZW0pKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmJ1c2luZXNzLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbXBzOiBmb3JtYXRlZE90aGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGNob3NlZElkOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbkNvbmZpcm06IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmJ1c2luZXNzLm1wcy5tYXAoKGFwcGluZm8sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYgKGFwcGluZm8uaWQgPT09IHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuaWQpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5idXNpbmVzcy5tcHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoaXMuYnVzaW5lc3MubXBzJywgdGhpcy5idXNpbmVzcy5tcHMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZEhpZGVNYXNrICgpIHtcclxuICAgICAgICAgICAgdGhpcy5idXNpbmVzcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYnVzaW5lc3MsIHtcclxuICAgICAgICAgICAgICAgIGNoYW5nZU1QOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNhbkNvbmZpcm06IGZhbHNlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNlbGVjdE1wIChpdGVtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmJ1c2luZXNzLCB7XHJcbiAgICAgICAgICAgICAgICBjaG9zZWRJZDogaXRlbS5pZCxcclxuICAgICAgICAgICAgICAgIGNhbkNvbmZpcm06IHRydWUsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn54K55Ye7JywgdGhpcy5idXNpbmVzcyk7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb25maXJtQWN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuaWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0R2xvYmFsTXBJZCh0aGlzLmJ1c2luZXNzLmNob3NlZElkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZU1hc2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbiAgICBoaWRlTWFzayAoKSB7XHJcbiAgICAgICAgdGhpcy5idXNpbmVzcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYnVzaW5lc3MsIHtcclxuICAgICAgICAgICAgY2hhbmdlTVA6IGZhbHNlLFxyXG4gICAgICAgICAgICBjYW5Db25maXJtOiBmYWxzZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfVxyXG4gICAgYXN5bmMgb25Mb2FkICgpIHtcclxuICAgICAgICBhd2FpdCBzbGVlcCgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdvbkxvYWQnKTtcclxuICAgIH1cclxuICAgIGFzeW5jIG9uU2hvdyAoKSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuc2V0R2xvYmFsTXBJZCh0aGlzLmJ1c2luZXNzLnNlbGVjdGVkLmlkKTtcclxuICAgIH1cclxuICAgIGZvcm1hdGVkTXAgKGl0ZW0pIHtcclxuICAgICAgICBjb25zdCBtcCA9IGl0ZW07XHJcbiAgICAgICAgaWYgKG1wLmhlYWRJbWcgJiYgbXAuaGVhZEltZy5pbmRleE9mKCdodHRwJykgPT09IC0xKSB7XHJcbiAgICAgICAgICAgIG1wLmhlYWRJbWcgPSBgaHR0cHM6Ly9waWMxLjU4Y2RuLmNvbS5jbiR7bXAuaGVhZEltZ31gO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbXA7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOeUqOaIt+eCueWHu+WPs+S4iuinkuWIhuS6q1xyXG4gICAgICovXHJcbiAgICBvblNoYXJlQXBwTWVzc2FnZSAocmVzKSB7XHJcbiAgICAgICAgaWYgKHJlcy5mcm9tID09PSAnYnV0dG9uJykge1xyXG4gICAgICAgICAgICAvLyDmnaXoh6rpobXpnaLlhoXovazlj5HmjInpkq5cclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLnRhcmdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAn6auY5pWI566h55CG5ZWG5a625bCP56iL5bqP55qE5LiA56uZ5byP5pyN5Yqh5bel5YW3JyxcclxuICAgICAgICAgICAgcGF0aDogJy9wYWdlcy9ob21lJyxcclxuICAgICAgICAgICAgaW1hZ2VVcmw6ICdodHRwczovL3N0YXRpYy41OC5jb20vbGJnL3NoYW5namlheGN4aHQvemh1c2hvdS9pbWcvc2hhcmUucG5nJyxcclxuICAgICAgICAgICAgc3VjY2VzcyAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWwgKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgYXN5bmMgbG9hZERhdGEgKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1YkRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBtcGlkOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdjdXJyZW50X21waWQnKSB8fCAnJyxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBwb3N0KCcvbXBsb2dpYy9pbmRleCcsIHN1YkRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbG9hZERhdGEnLCBkYXRhKTtcclxuICAgICAgICAgICAgY29uc3Qge1xyXG4gICAgICAgICAgICAgICAgdXNlcm5hbWUgPSAnJyxcclxuICAgICAgICAgICAgICAgIG1waW5mbyA9IHt9LFxyXG4gICAgICAgICAgICAgICAgdW5yZWFkID0gJycsXHJcbiAgICAgICAgICAgICAgICBjb3VudCA9IDAsXHJcbiAgICAgICAgICAgICAgICBuZXh0dGFzayA9ICcnLFxyXG4gICAgICAgICAgICB9ID0gZGF0YTtcclxuICAgICAgICAgICAgY29uc3QgZm9ybWF0ZWRNcGluZm8gPSB0aGlzLmZvcm1hdGVkTXAobXBpbmZvKTtcclxuICAgICAgICAgICAgdGhpcy5idXNpbmVzcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYnVzaW5lc3MsIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IHVzZXJuYW1lLFxyXG4gICAgICAgICAgICAgICAgbWluaVByb2dyYW1OYW1lOiBtcGluZm8ubmlja05hbWUgfHwgJ+aCqOi/mOayoei0reS5sOWwj+eoi+W6jycsXHJcbiAgICAgICAgICAgICAgICB1bnJlYWQsXHJcbiAgICAgICAgICAgICAgICBtcENvdW50OiBjb3VudCxcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmb3JtYXRlZE1waW5mbyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG5leHR0YXNrICYmIHRoaXMuc2V0TmV4dFRhc2sobmV4dHRhc2spO1xyXG4gICAgICAgICAgICAvLyBkYXRhLnVzZXJuYW1lICYmICh0aGlzLmJ1c2luZXNzLm5hbWUgPSBkYXRhLnVzZXJuYW1lKTtcclxuICAgICAgICAgICAgLy8gZGF0YS5tcGluZm8gJiYgKHRoaXMuYnVzaW5lc3MubWluaVByb2dyYW1OYW1lID0gZGF0YS5tcGluZm8ubmlja05hbWUpO1xyXG4gICAgICAgICAgICAvLyBkYXRhLnVucmVhZCAmJiAodGhpcy5idXNpbmVzcy51bnJlYWQgPSBkYXRhLnVucmVhZCk7XHJcbiAgICAgICAgICAgIC8vIGRhdGEuY291bnQgJiYgKHRoaXMuYnVzaW5lc3MubXBDb3VudCA9IGRhdGEuY291bnQpO1xyXG4gICAgICAgICAgICAvLyBkYXRhLm1waW5mbyAmJiAodGhpcy5idXNpbmVzcy5zZWxlY3RlZC5pZCA9IGRhdGEubXBpbmZvLmlkKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGhpcy5idXNpbmVzcycsIHRoaXMuYnVzaW5lc3MpO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2UnLCBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzZXRHbG9iYWxNcElkIChpZCkge1xyXG4gICAgICAgIGlmIChpZCkge1xyXG4gICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdjdXJyZW50X21waWQnLCBpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2hlY2tCZWZvcmVKdW1wIChpbmRleCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCd0aGlzLmJ1c2luZXNzLnNlbGVjdGVkLicsIHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQpO1xyXG4gICAgICAgIGlmICghdGhpcy5idXNpbmVzcy5tcENvdW50KSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KCfmgqjov5jmnKrotK3kubDlsI/nqIvluo/vvIzor7fnmbvlvZVlLjU4LmNvbei/m+ihjOi0reS5sCcsICfmj5DnpLonKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzd2l0Y2ggKGluZGV4KSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnbXlNcCcsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJ1VwbG9hZEluZm8nLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICdPcmRlckxpc3QnLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICdwcm9ncmVzcycsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5idXNpbmVzcy5zZWxlY3RlZC5hcHBfdHlwZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCflvZPliY3lsI/nqIvluo/kuLrkvJjkuqvlsI/nqIvluo/vvIzkuI3nlKjmj5DkuqTms6jlhozkv6Hmga8nLCAn5o+Q56S6Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuc2lnbiA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ3JlZ2lzdGVkJyxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygncmVnaXN0TWFwcGlkJywgdGhpcy5idXNpbmVzcy5zZWxlY3RlZC5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAncmVnaXN0TWFpbkFjY291bnQnLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnT3BlblBheScsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJ2ZlZWRiYWNrJyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzZXROZXh0VGFzayAodGFza051bSkge1xyXG4gICAgICAgIHRoaXMuYnVzaW5lc3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmJ1c2luZXNzLCB7XHJcbiAgICAgICAgICAgIG5leHR0YXNrOiB0YXNrTnVtLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHN3aXRjaCAodGFza051bSkge1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1c2luZXNzLnByb2dyZXNzVGV4dCA9ICflvZPliY3lsI/nqIvluo/mnKrmt7vliqDlsI/nqIvluo/kv6Hmga8nO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MucHJvZ3Jlc3NUZXh0ID0gJ+W9k+WJjeWwj+eoi+W6j+i/mOacquS4iuS8oOe0oOadkCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuYXBwX3R5cGUgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1c2luZXNzLnByb2dyZXNzVGV4dCA9ICflvZPliY3lsI/nqIvluo/kv6Hmga/lt7LlrozlloQnO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1c2luZXNzLnByb2dyZXNzVGV4dCA9ICflvZPliY3lsI/nqIvluo/ov5jmnKrloavlhpnms6jlhozkv6Hmga8nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTogLy8g6Lez6L2s5oiR55qE5bCP56iL5bqPXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5idXNpbmVzcy5zZWxlY3RlZC5hcHBfdHlwZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MucHJvZ3Jlc3NUZXh0ID0gJ+W9k+WJjeWwj+eoi+W6j+S/oeaBr+W3suWujOWWhCc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MucHJvZ3Jlc3NUZXh0ID0gJ+W9k+WJjeWwj+eoi+W6j+i/mOacquaOiOadgyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2OiAvLyDot7PovazliLDov5vluqZcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MucHJvZ3Jlc3NUZXh0ID0gJ+W9k+WJjeWwj+eoi+W6j+S/oeaBr+W3suWujOWWhCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA3OiAvLyDmtojmga/liJfooahcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MucHJvZ3Jlc3NUZXh0ID0gJ+W9k+WJjeWwj+eoi+W6j+S/oeaBr+W3suWujOWWhCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA4OiAvLyDmtojmga/liJfooahcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MucHJvZ3Jlc3NUZXh0ID0gJ+W9k+WJjeWwj+eoi+W6j+S/oeaBr+W3suWujOWWhCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA5OiAvLyDlrozmiJDluqZcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MucHJvZ3Jlc3NUZXh0ID0gJ+W9k+WJjeWwj+eoi+W6j+S/oeaBr+W3suWujOWWhCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
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
                case 3:
                    _wepy2.default.navigateTo({
                        url: 'progress'
                    });
                    break;
                case 4:
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuanMiXSwibmFtZXMiOlsiSG9tZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkaXNhYmxlU2Nyb2xsIiwiZGF0YSIsImJ1c2luZXNzIiwibXBzIiwibmFtZSIsIm1pbmlQcm9ncmFtTmFtZSIsInVucmVhZCIsIm1wQ291bnQiLCJwcm9ncmVzc1RleHQiLCJuZXh0dGFzayIsImNoYW5nZU1QIiwiY2FuQ29uZmlybSIsInNlbGVjdGVkIiwiaWQiLCJjaG9zZWRJZCIsIml0ZW1zIiwiaWNvblBhdGgiLCJ0ZXh0IiwibWV0aG9kcyIsImxpbmsiLCJpbmRleCIsImNoZWNrQmVmb3JlSnVtcCIsIndlcHkiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiY2hlY2tQcm9ncmVzcyIsImFwcF90eXBlIiwic2V0U3RvcmFnZVN5bmMiLCIkYXBwbHkiLCJjaGFuZ2VBY3Rpb24iLCJPYmplY3QiLCJhc3NpZ24iLCJtcGluZm9zIiwibGVuZ3RoIiwib3RoZXJzIiwiZmlsdGVyIiwiYXBwaW5mbyIsImZvcm1hdGVkT3RoZXIiLCJtYXAiLCJpdGVtIiwiZm9ybWF0ZWRNcCIsImNvbnNvbGUiLCJsb2ciLCJiaW5kSGlkZU1hc2siLCJzZWxlY3RNcCIsImNvbmZpcm1BY3Rpb24iLCJzZXRHbG9iYWxNcElkIiwibG9hZERhdGEiLCJoaWRlTWFzayIsIm1wIiwiaGVhZEltZyIsImluZGV4T2YiLCJyZXMiLCJmcm9tIiwidGFyZ2V0IiwidGl0bGUiLCJwYXRoIiwiaW1hZ2VVcmwiLCJzdWNjZXNzIiwiZmFpbCIsImVyciIsInN1YkRhdGEiLCJtcGlkIiwiZ2V0U3RvcmFnZVN5bmMiLCJ1c2VybmFtZSIsIm1waW5mbyIsImNvdW50IiwiZm9ybWF0ZWRNcGluZm8iLCJuaWNrTmFtZSIsInNldE5leHRUYXNrIiwic2lnbiIsInRhc2tOdW0iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7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QUksS0FBS04sUUFBTCxDQUFjVSxRQUFkLENBQXVCYyxRQUF2QixLQUFvQyxDQUF4QyxFQUEyQztBQUN2Qyw2QkFBS3hCLFFBQUwsQ0FBY00sWUFBZCxHQUE2QixZQUE3QjtBQUNILHFCQUZELE1BRU87QUFDSCw2QkFBS04sUUFBTCxDQUFjTSxZQUFkLEdBQTZCLGVBQTdCO0FBQ0g7QUFDRDtBQUNKLHFCQUFLLENBQUw7QUFBUTtBQUNKLHdCQUFJLEtBQUtOLFFBQUwsQ0FBY1UsUUFBZCxDQUF1QmMsUUFBdkIsS0FBb0MsQ0FBeEMsRUFBMkM7QUFDdkMsNkJBQUt4QixRQUFMLENBQWNNLFlBQWQsR0FBNkIsWUFBN0I7QUFDSCxxQkFGRCxNQUVPO0FBQ0gsNkJBQUtOLFFBQUwsQ0FBY00sWUFBZCxHQUE2QixXQUE3QjtBQUNIO0FBQ0Q7QUFDSixxQkFBSyxDQUFMO0FBQVE7QUFDSix5QkFBS04sUUFBTCxDQUFjTSxZQUFkLEdBQTZCLFlBQTdCO0FBQ0E7QUFDSixxQkFBSyxDQUFMO0FBQVE7QUFDSix5QkFBS04sUUFBTCxDQUFjTSxZQUFkLEdBQTZCLFlBQTdCO0FBQ0E7QUFDSixxQkFBSyxDQUFMO0FBQVE7QUFDSix5QkFBS04sUUFBTCxDQUFjTSxZQUFkLEdBQTZCLFlBQTdCO0FBQ0E7QUFDSixxQkFBSyxDQUFMO0FBQVE7QUFDSix5QkFBS04sUUFBTCxDQUFjTSxZQUFkLEdBQTZCLFlBQTdCO0FBQ0E7QUFDSjtBQUNJO0FBbENSO0FBb0NBLGlCQUFLb0IsTUFBTDtBQUNIOzs7O0VBOVU2Qk4sZUFBS2tELEk7O2tCQUFsQjNFLEkiLCJmaWxlIjoiaG9tZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgeyBzbGVlcCwgYWxlcnQgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBwb3N0IH0gZnJvbSAnLi4vdXRpbHMvYWpheCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+mmlumhtScsXG4gICAgICAgIGRpc2FibGVTY3JvbGw6IHRydWUsXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICAgIGJ1c2luZXNzOiB7XG4gICAgICAgICAgICBtcHM6IFtdLFxuICAgICAgICAgICAgbmFtZTogJ+aCqOeahOWnk+WQjScsXG4gICAgICAgICAgICBtaW5pUHJvZ3JhbU5hbWU6ICfmgqjov5jmsqHotK3kubDlsI/nqIvluo8nLFxuICAgICAgICAgICAgdW5yZWFkOiAwLFxuICAgICAgICAgICAgbXBDb3VudDogMCxcbiAgICAgICAgICAgIHByb2dyZXNzVGV4dDogJ+aCqOi/mOayoeaciei0reS5sOWwj+eoi+W6jycsXG4gICAgICAgICAgICBuZXh0dGFzazogMCxcbiAgICAgICAgICAgIGNoYW5nZU1QOiBmYWxzZSxcbiAgICAgICAgICAgIGNhbkNvbmZpcm06IGZhbHNlLFxuICAgICAgICAgICAgc2VsZWN0ZWQ6IHtcbiAgICAgICAgICAgICAgICBpZDogMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaG9zZWRJZDogMCxcbiAgICAgICAgfSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpY29uUGF0aDogJ2h0dHBzOi8vc3RhdGljLjU4LmNvbS9sYmcvc2hhbmdqaWF4Y3hodC96aHVzaG91L2ltZy9pY29uLW15LnBuZycsXG4gICAgICAgICAgICAgICAgdGV4dDogJ+aIkeeahOWwj+eoi+W6jycsXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWNvblBhdGg6ICdodHRwczovL3N0YXRpYy41OC5jb20vbGJnL3NoYW5namlheGN4aHQvemh1c2hvdS9pbWcvaWNvbi11cGxvYWQucG5nJyxcbiAgICAgICAgICAgICAgICB0ZXh0OiAn5LiK5Lyg57Sg5p2QJyxcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpY29uUGF0aDogJ2h0dHBzOi8vc3RhdGljLjU4LmNvbS9sYmcvc2hhbmdqaWF4Y3hodC96aHVzaG91L2ltZy9pY29uLXJlZ2lzdGVyLnBuZycsXG4gICAgICAgICAgICAgICAgdGV4dDogJ+W+ruS/oeazqOWGjOS/oeaBrycsXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWNvblBhdGg6ICdodHRwczovL3N0YXRpYy41OC5jb20vbGJnL3NoYW5namlheGN4aHQvemh1c2hvdS9pbWcvaWNvbi1wcm9ncmVzcy5wbmcnLFxuICAgICAgICAgICAgICAgIHRleHQ6ICflrozmiJDluqYnLFxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGljb25QYXRoOiAnaHR0cHM6Ly9zdGF0aWMuNTguY29tL2xiZy9zaGFuZ2ppYXhjeGh0L3podXNob3UvaW1nL2ljb24tYWR2aWNlLnBuZycsXG4gICAgICAgICAgICAgICAgdGV4dDogJ+aEj+ingeWPjemmiCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgICBsaW5rKGluZGV4KSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IDQpIHsgLy8gICDmhI/op4Hlj43ppojkuI3lgZrliKTmlq1cbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQmVmb3JlSnVtcChpbmRleCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogJ2ZlZWRiYWNrJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2hlY2tQcm9ncmVzcygpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5idXNpbmVzcy5tcENvdW50KSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ+aCqOi/mOacqui0reS5sOWwj+eoi+W6j++8jOivt+eZu+W9lWUuNTguY29t6L+b6KGM6LSt5LmwJywgJ+aPkOekuicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5idXNpbmVzcy5uZXh0dGFzaykge1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ0FwcEVkaXQnLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnVXBsb2FkSW5mbycsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmJ1c2luZXNzLnNlbGVjdGVkLmFwcF90eXBlID09PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdyZWdpc3RNYXBwaWQnLCB0aGlzLmJ1c2luZXNzLnNlbGVjdGVkLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAncmVnaXN0TWFpbkFjY291bnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ3Byb2dyZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuYXBwX3R5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAncHJvZ3Jlc3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ215TXAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAncHJvZ3Jlc3MnLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAncHJvZ3Jlc3MnLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAncHJvZ3Jlc3MnLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAncHJvZ3Jlc3MnLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB9LFxuICAgICAgICBhc3luYyBjaGFuZ2VBY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLmJ1c2luZXNzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5idXNpbmVzcywge1xuICAgICAgICAgICAgICAgIGNoYW5nZU1QOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9tcGxvZ2ljL215bXBsaXN0Jyk7XG4gICAgICAgICAgICBjb25zdCB7IG1waW5mb3MgfSA9IGRhdGE7XG4gICAgICAgICAgICB0aGlzLmJ1c2luZXNzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5idXNpbmVzcywge1xuICAgICAgICAgICAgICAgIG1wczogbXBpbmZvcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHRoaXMuYnVzaW5lc3MubXBzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvdGhlcnMgPSB0aGlzLmJ1c2luZXNzLm1wcy5maWx0ZXIoKGFwcGluZm8pID0+IGFwcGluZm8uaWQgIT09XG4gICAgICAgICAgICAgICAgdGhpcy5idXNpbmVzcy5zZWxlY3RlZC5pZCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybWF0ZWRPdGhlciA9IG90aGVycy5tYXAoKGl0ZW0pID0+IHRoaXMuZm9ybWF0ZWRNcChpdGVtKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5idXNpbmVzcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYnVzaW5lc3MsIHtcbiAgICAgICAgICAgICAgICAgICAgbXBzOiBmb3JtYXRlZE90aGVyLFxuICAgICAgICAgICAgICAgICAgICBjaG9zZWRJZDogMCxcbiAgICAgICAgICAgICAgICAgICAgY2FuQ29uZmlybTogZmFsc2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5idXNpbmVzcy5tcHMubWFwKChhcHBpbmZvLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vICAgICBpZiAoYXBwaW5mby5pZCA9PT0gdGhpcy5idXNpbmVzcy5zZWxlY3RlZC5pZCkge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5idXNpbmVzcy5tcHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoaXMuYnVzaW5lc3MubXBzJywgdGhpcy5idXNpbmVzcy5tcHMpO1xuICAgICAgICB9LFxuICAgICAgICBiaW5kSGlkZU1hc2soKSB7XG4gICAgICAgICAgICB0aGlzLmJ1c2luZXNzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5idXNpbmVzcywge1xuICAgICAgICAgICAgICAgIGNoYW5nZU1QOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjYW5Db25maXJtOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2VsZWN0TXAoaXRlbSkge1xuICAgICAgICAgICAgdGhpcy5idXNpbmVzcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYnVzaW5lc3MsIHtcbiAgICAgICAgICAgICAgICBjaG9zZWRJZDogaXRlbS5pZCxcbiAgICAgICAgICAgICAgICBjYW5Db25maXJtOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn54K55Ye7JywgdGhpcy5idXNpbmVzcyk7XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB9LFxuICAgICAgICBjb25maXJtQWN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEdsb2JhbE1wSWQodGhpcy5idXNpbmVzcy5jaG9zZWRJZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZU1hc2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9XG4gICAgaGlkZU1hc2soKSB7XG4gICAgICAgIHRoaXMuYnVzaW5lc3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmJ1c2luZXNzLCB7XG4gICAgICAgICAgICBjaGFuZ2VNUDogZmFsc2UsXG4gICAgICAgICAgICBjYW5Db25maXJtOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuICAgIGFzeW5jIG9uTG9hZCgpIHtcbiAgICAgICAgYXdhaXQgc2xlZXAoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ29uTG9hZCcpO1xuICAgIH1cbiAgICBhc3luYyBvblNob3coKSB7XG4gICAgICAgIGF3YWl0IHRoaXMubG9hZERhdGEoKTtcbiAgICAgICAgdGhpcy5zZXRHbG9iYWxNcElkKHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuaWQpO1xuICAgIH1cbiAgICBmb3JtYXRlZE1wKGl0ZW0pIHtcbiAgICAgICAgY29uc3QgbXAgPSBpdGVtO1xuICAgICAgICBpZiAobXAuaGVhZEltZyAmJiBtcC5oZWFkSW1nLmluZGV4T2YoJ2h0dHAnKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIG1wLmhlYWRJbWcgPSBgaHR0cHM6Ly9waWMxLjU4Y2RuLmNvbS5jbiR7bXAuaGVhZEltZ31gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtcDtcbiAgICB9XG4gICAgLyoqXG4gICAgICog55So5oi354K55Ye75Y+z5LiK6KeS5YiG5LqrXG4gICAgICovXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UocmVzKSB7XG4gICAgICAgIGlmIChyZXMuZnJvbSA9PT0gJ2J1dHRvbicpIHtcbiAgICAgICAgICAgIC8vIOadpeiHqumhtemdouWGhei9rOWPkeaMiemSrlxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLnRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRpdGxlOiAn6auY5pWI566h55CG5ZWG5a625bCP56iL5bqP55qE5LiA56uZ5byP5pyN5Yqh5bel5YW3JyxcbiAgICAgICAgICAgIHBhdGg6ICcvcGFnZXMvaG9tZScsXG4gICAgICAgICAgICBpbWFnZVVybDogJ2h0dHBzOi8vc3RhdGljLjU4LmNvbS9sYmcvc2hhbmdqaWF4Y3hodC96aHVzaG91L2ltZy9zaGFyZS5wbmcnLFxuICAgICAgICAgICAgc3VjY2VzcyhkYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfVxuICAgIGFzeW5jIGxvYWREYXRhKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgc3ViRGF0YSA9IHtcbiAgICAgICAgICAgICAgICBtcGlkOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdjdXJyZW50X21waWQnKSB8fCAnJyxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9tcGxvZ2ljL2luZGV4Jywgc3ViRGF0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbG9hZERhdGEnLCBkYXRhKTtcbiAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICB1c2VybmFtZSA9ICcnLFxuICAgICAgICAgICAgICAgIG1waW5mbyA9IHt9LFxuICAgICAgICAgICAgICAgIHVucmVhZCA9ICcnLFxuICAgICAgICAgICAgICAgIGNvdW50ID0gMCxcbiAgICAgICAgICAgICAgICBuZXh0dGFzayA9ICcnLFxuICAgICAgICAgICAgfSA9IGRhdGE7XG4gICAgICAgICAgICBjb25zdCBmb3JtYXRlZE1waW5mbyA9IHRoaXMuZm9ybWF0ZWRNcChtcGluZm8pO1xuICAgICAgICAgICAgdGhpcy5idXNpbmVzcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYnVzaW5lc3MsIHtcbiAgICAgICAgICAgICAgICBuYW1lOiB1c2VybmFtZSxcbiAgICAgICAgICAgICAgICBtaW5pUHJvZ3JhbU5hbWU6IG1waW5mby5uaWNrTmFtZSB8fCAn5oKo6L+Y5rKh6LSt5Lmw5bCP56iL5bqPJyxcbiAgICAgICAgICAgICAgICB1bnJlYWQsXG4gICAgICAgICAgICAgICAgbXBDb3VudDogY291bnQsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZvcm1hdGVkTXBpbmZvLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBuZXh0dGFzayAmJiB0aGlzLnNldE5leHRUYXNrKG5leHR0YXNrKTtcbiAgICAgICAgICAgIC8vIGRhdGEudXNlcm5hbWUgJiYgKHRoaXMuYnVzaW5lc3MubmFtZSA9IGRhdGEudXNlcm5hbWUpO1xuICAgICAgICAgICAgLy8gZGF0YS5tcGluZm8gJiYgKHRoaXMuYnVzaW5lc3MubWluaVByb2dyYW1OYW1lID0gZGF0YS5tcGluZm8ubmlja05hbWUpO1xuICAgICAgICAgICAgLy8gZGF0YS51bnJlYWQgJiYgKHRoaXMuYnVzaW5lc3MudW5yZWFkID0gZGF0YS51bnJlYWQpO1xuICAgICAgICAgICAgLy8gZGF0YS5jb3VudCAmJiAodGhpcy5idXNpbmVzcy5tcENvdW50ID0gZGF0YS5jb3VudCk7XG4gICAgICAgICAgICAvLyBkYXRhLm1waW5mbyAmJiAodGhpcy5idXNpbmVzcy5zZWxlY3RlZC5pZCA9IGRhdGEubXBpbmZvLmlkKVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoaXMuYnVzaW5lc3MnLCB0aGlzLmJ1c2luZXNzKTtcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlJywgZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0R2xvYmFsTXBJZChpZCkge1xuICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ2N1cnJlbnRfbXBpZCcsIGlkKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjaGVja0JlZm9yZUp1bXAoaW5kZXgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3RoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuJywgdGhpcy5idXNpbmVzcy5zZWxlY3RlZCk7XG4gICAgICAgIGlmICghdGhpcy5idXNpbmVzcy5tcENvdW50KSB7XG4gICAgICAgICAgICBhbGVydCgn5oKo6L+Y5pyq6LSt5Lmw5bCP56iL5bqP77yM6K+355m75b2VZS41OC5jb23ov5vooYzotK3kubAnLCAn5o+Q56S6Jyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChpbmRleCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogJ215TXAnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogJ1VwbG9hZEluZm8nLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJ1c2luZXNzLnNlbGVjdGVkLmFwcF90eXBlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCflvZPliY3lsI/nqIvluo/kuLrkvJjkuqvlsI/nqIvluo/vvIzkuI3nlKjmj5DkuqTms6jlhozkv6Hmga8nLCAn5o+Q56S6Jyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuc2lnbiA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAncmVnaXN0ZWQnLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdyZWdpc3RNYXBwaWQnLCB0aGlzLmJ1c2luZXNzLnNlbGVjdGVkLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ3JlZ2lzdE1haW5BY2NvdW50JyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogJ3Byb2dyZXNzJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgICB1cmw6ICdmZWVkYmFjaycsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldE5leHRUYXNrKHRhc2tOdW0pIHtcbiAgICAgICAgdGhpcy5idXNpbmVzcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYnVzaW5lc3MsIHtcbiAgICAgICAgICAgIG5leHR0YXNrOiB0YXNrTnVtLFxuICAgICAgICB9KTtcbiAgICAgICAgc3dpdGNoICh0YXNrTnVtKSB7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgdGhpcy5idXNpbmVzcy5wcm9ncmVzc1RleHQgPSAn5b2T5YmN5bCP56iL5bqP5pyq5re75Yqg5bCP56iL5bqP5L+h5oGvJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICB0aGlzLmJ1c2luZXNzLnByb2dyZXNzVGV4dCA9ICflvZPliY3lsI/nqIvluo/ov5jmnKrkuIrkvKDntKDmnZAnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJ1c2luZXNzLnNlbGVjdGVkLmFwcF90eXBlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MucHJvZ3Jlc3NUZXh0ID0gJ+W9k+WJjeWwj+eoi+W6j+S/oeaBr+W3suWujOWWhCc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXNpbmVzcy5wcm9ncmVzc1RleHQgPSAn5b2T5YmN5bCP56iL5bqP6L+Y5pyq5aGr5YaZ5rOo5YaM5L+h5oGvJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6IC8vIOi3s+i9rOaIkeeahOWwj+eoi+W6j1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJ1c2luZXNzLnNlbGVjdGVkLmFwcF90eXBlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MucHJvZ3Jlc3NUZXh0ID0gJ+W9k+WJjeWwj+eoi+W6j+S/oeaBr+W3suWujOWWhCc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXNpbmVzcy5wcm9ncmVzc1RleHQgPSAn5b2T5YmN5bCP56iL5bqP6L+Y5pyq5o6I5p2DJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDY6IC8vIOi3s+i9rOWIsOi/m+W6plxuICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MucHJvZ3Jlc3NUZXh0ID0gJ+W9k+WJjeWwj+eoi+W6j+S/oeaBr+W3suWujOWWhCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDc6IC8vIOa2iOaBr+WIl+ihqFxuICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MucHJvZ3Jlc3NUZXh0ID0gJ+W9k+WJjeWwj+eoi+W6j+S/oeaBr+W3suWujOWWhCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDg6IC8vIOa2iOaBr+WIl+ihqFxuICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MucHJvZ3Jlc3NUZXh0ID0gJ+W9k+WJjeWwj+eoi+W6j+S/oeaBr+W3suWujOWWhCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDk6IC8vIOWujOaIkOW6plxuICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MucHJvZ3Jlc3NUZXh0ID0gJ+W9k+WJjeWwj+eoi+W6j+S/oeaBr+W3suWujOWWhCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxufVxuIl19
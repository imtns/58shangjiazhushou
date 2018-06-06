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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuanMiXSwibmFtZXMiOlsiSG9tZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkaXNhYmxlU2Nyb2xsIiwiZGF0YSIsImJ1c2luZXNzIiwibXBzIiwibmFtZSIsIm1pbmlQcm9ncmFtTmFtZSIsInVucmVhZCIsIm1wQ291bnQiLCJwcm9ncmVzc1RleHQiLCJuZXh0dGFzayIsImNoYW5nZU1QIiwiY2FuQ29uZmlybSIsInNlbGVjdGVkIiwiaWQiLCJjaG9zZWRJZCIsIml0ZW1zIiwiaWNvblBhdGgiLCJ0ZXh0IiwibWV0aG9kcyIsImxpbmsiLCJpbmRleCIsImNoZWNrQmVmb3JlSnVtcCIsIndlcHkiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiY2hlY2tQcm9ncmVzcyIsImFwcF90eXBlIiwic2V0U3RvcmFnZVN5bmMiLCIkYXBwbHkiLCJjaGFuZ2VBY3Rpb24iLCJPYmplY3QiLCJhc3NpZ24iLCJtcGluZm9zIiwibGVuZ3RoIiwib3RoZXJzIiwiZmlsdGVyIiwiYXBwaW5mbyIsImZvcm1hdGVkT3RoZXIiLCJtYXAiLCJpdGVtIiwiZm9ybWF0ZWRNcCIsImNvbnNvbGUiLCJsb2ciLCJiaW5kSGlkZU1hc2siLCJzZWxlY3RNcCIsImNvbmZpcm1BY3Rpb24iLCJzZXRHbG9iYWxNcElkIiwibG9hZERhdGEiLCJoaWRlTWFzayIsIm1wIiwiaGVhZEltZyIsImluZGV4T2YiLCJzdWJEYXRhIiwibXBpZCIsImdldFN0b3JhZ2VTeW5jIiwidXNlcm5hbWUiLCJtcGluZm8iLCJjb3VudCIsImZvcm1hdGVkTXBpbmZvIiwibmlja05hbWUiLCJzZXROZXh0VGFzayIsInNpZ24iLCJ0YXNrTnVtIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O3NMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QixJQURuQjtBQUVMQywyQkFBZTtBQUZWLFMsUUFJVEMsSSxH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WUFBZCxHQUE2QixZQUE3QjtBQUNBO0FBQ0oscUJBQUssQ0FBTDtBQUFRO0FBQ0oseUJBQUtOLFFBQUwsQ0FBY00sWUFBZCxHQUE2QixZQUE3QjtBQUNBO0FBQ0oscUJBQUssQ0FBTDtBQUFRO0FBQ0oseUJBQUtOLFFBQUwsQ0FBY00sWUFBZCxHQUE2QixZQUE3QjtBQUNBO0FBQ0oscUJBQUssQ0FBTDtBQUFRO0FBQ0oseUJBQUtOLFFBQUwsQ0FBY00sWUFBZCxHQUE2QixZQUE3QjtBQUNBO0FBQ0o7QUFDSTtBQWxDUjtBQW9DQSxpQkFBS29CLE1BQUw7QUFDSDs7OztFQTFUNkJOLGVBQUt5QyxJOztrQkFBbEJsRSxJIiwiZmlsZSI6ImhvbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG5pbXBvcnQgeyBzbGVlcCwgYWxlcnQgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBwb3N0IH0gZnJvbSAnLi4vdXRpbHMvYWpheCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+mmlumhtScsXG4gICAgICAgIGRpc2FibGVTY3JvbGw6IHRydWUsXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICAgIGJ1c2luZXNzOiB7XG4gICAgICAgICAgICBtcHM6IFtdLFxuICAgICAgICAgICAgbmFtZTogJ+aCqOeahOWnk+WQjScsXG4gICAgICAgICAgICBtaW5pUHJvZ3JhbU5hbWU6ICfmgqjov5jmsqHotK3kubDlsI/nqIvluo8nLFxuICAgICAgICAgICAgdW5yZWFkOiAwLFxuICAgICAgICAgICAgbXBDb3VudDogMCxcbiAgICAgICAgICAgIHByb2dyZXNzVGV4dDogJ+aCqOi/mOayoeaciei0reS5sOWwj+eoi+W6jycsXG4gICAgICAgICAgICBuZXh0dGFzazogMCxcbiAgICAgICAgICAgIGNoYW5nZU1QOiBmYWxzZSxcbiAgICAgICAgICAgIGNhbkNvbmZpcm06IGZhbHNlLFxuICAgICAgICAgICAgc2VsZWN0ZWQ6IHtcbiAgICAgICAgICAgICAgICBpZDogMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaG9zZWRJZDogMCxcbiAgICAgICAgfSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpY29uUGF0aDogJ2h0dHBzOi8vc3RhdGljLjU4LmNvbS9sYmcvc2hhbmdqaWF4Y3hodC96aHVzaG91L2ltZy9pY29uLW15LnBuZycsXG4gICAgICAgICAgICAgICAgdGV4dDogJ+aIkeeahOWwj+eoi+W6jycsXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWNvblBhdGg6ICdodHRwczovL3N0YXRpYy41OC5jb20vbGJnL3NoYW5namlheGN4aHQvemh1c2hvdS9pbWcvaWNvbi11cGxvYWQucG5nJyxcbiAgICAgICAgICAgICAgICB0ZXh0OiAn5LiK5Lyg57Sg5p2QJyxcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpY29uUGF0aDogJ2h0dHBzOi8vc3RhdGljLjU4LmNvbS9sYmcvc2hhbmdqaWF4Y3hodC96aHVzaG91L2ltZy9pY29uLXJlZ2lzdGVyLnBuZycsXG4gICAgICAgICAgICAgICAgdGV4dDogJ+W+ruS/oeazqOWGjOS/oeaBrycsXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWNvblBhdGg6ICdodHRwczovL3N0YXRpYy41OC5jb20vbGJnL3NoYW5namlheGN4aHQvemh1c2hvdS9pbWcvaWNvbi1wcm9ncmVzcy5wbmcnLFxuICAgICAgICAgICAgICAgIHRleHQ6ICflrozmiJDluqYnLFxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGljb25QYXRoOiAnaHR0cHM6Ly9zdGF0aWMuNTguY29tL2xiZy9zaGFuZ2ppYXhjeGh0L3podXNob3UvaW1nL2ljb24tYWR2aWNlLnBuZycsXG4gICAgICAgICAgICAgICAgdGV4dDogJ+aEj+ingeWPjemmiCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgICBsaW5rKGluZGV4KSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IDQpIHsgLy8gICDmhI/op4Hlj43ppojkuI3lgZrliKTmlq1cbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQmVmb3JlSnVtcChpbmRleCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogJ2ZlZWRiYWNrJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2hlY2tQcm9ncmVzcygpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5idXNpbmVzcy5tcENvdW50KSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ+aCqOi/mOacqui0reS5sOWwj+eoi+W6j++8jOivt+eZu+W9lWUuNTguY29t6L+b6KGM6LSt5LmwJywgJ+aPkOekuicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5idXNpbmVzcy5uZXh0dGFzaykge1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ0FwcEVkaXQnLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnVXBsb2FkSW5mbycsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmJ1c2luZXNzLnNlbGVjdGVkLmFwcF90eXBlID09PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdyZWdpc3RNYXBwaWQnLCB0aGlzLmJ1c2luZXNzLnNlbGVjdGVkLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAncmVnaXN0TWFpbkFjY291bnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ3Byb2dyZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuYXBwX3R5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAncHJvZ3Jlc3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ215TXAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAncHJvZ3Jlc3MnLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAncHJvZ3Jlc3MnLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAncHJvZ3Jlc3MnLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAncHJvZ3Jlc3MnLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB9LFxuICAgICAgICBhc3luYyBjaGFuZ2VBY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLmJ1c2luZXNzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5idXNpbmVzcywge1xuICAgICAgICAgICAgICAgIGNoYW5nZU1QOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9tcGxvZ2ljL215bXBsaXN0Jyk7XG4gICAgICAgICAgICBjb25zdCB7IG1waW5mb3MgfSA9IGRhdGE7XG4gICAgICAgICAgICB0aGlzLmJ1c2luZXNzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5idXNpbmVzcywge1xuICAgICAgICAgICAgICAgIG1wczogbXBpbmZvcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHRoaXMuYnVzaW5lc3MubXBzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvdGhlcnMgPSB0aGlzLmJ1c2luZXNzLm1wcy5maWx0ZXIoKGFwcGluZm8pID0+IGFwcGluZm8uaWQgIT09XG4gICAgICAgICAgICAgICAgdGhpcy5idXNpbmVzcy5zZWxlY3RlZC5pZCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybWF0ZWRPdGhlciA9IG90aGVycy5tYXAoKGl0ZW0pID0+IHRoaXMuZm9ybWF0ZWRNcChpdGVtKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5idXNpbmVzcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYnVzaW5lc3MsIHtcbiAgICAgICAgICAgICAgICAgICAgbXBzOiBmb3JtYXRlZE90aGVyLFxuICAgICAgICAgICAgICAgICAgICBjaG9zZWRJZDogMCxcbiAgICAgICAgICAgICAgICAgICAgY2FuQ29uZmlybTogZmFsc2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5idXNpbmVzcy5tcHMubWFwKChhcHBpbmZvLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vICAgICBpZiAoYXBwaW5mby5pZCA9PT0gdGhpcy5idXNpbmVzcy5zZWxlY3RlZC5pZCkge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5idXNpbmVzcy5tcHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoaXMuYnVzaW5lc3MubXBzJywgdGhpcy5idXNpbmVzcy5tcHMpO1xuICAgICAgICB9LFxuICAgICAgICBiaW5kSGlkZU1hc2soKSB7XG4gICAgICAgICAgICB0aGlzLmJ1c2luZXNzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5idXNpbmVzcywge1xuICAgICAgICAgICAgICAgIGNoYW5nZU1QOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjYW5Db25maXJtOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2VsZWN0TXAoaXRlbSkge1xuICAgICAgICAgICAgdGhpcy5idXNpbmVzcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYnVzaW5lc3MsIHtcbiAgICAgICAgICAgICAgICBjaG9zZWRJZDogaXRlbS5pZCxcbiAgICAgICAgICAgICAgICBjYW5Db25maXJtOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn54K55Ye7JywgdGhpcy5idXNpbmVzcyk7XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB9LFxuICAgICAgICBjb25maXJtQWN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEdsb2JhbE1wSWQodGhpcy5idXNpbmVzcy5jaG9zZWRJZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZU1hc2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9XG4gICAgaGlkZU1hc2soKSB7XG4gICAgICAgIHRoaXMuYnVzaW5lc3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmJ1c2luZXNzLCB7XG4gICAgICAgICAgICBjaGFuZ2VNUDogZmFsc2UsXG4gICAgICAgICAgICBjYW5Db25maXJtOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuICAgIGFzeW5jIG9uTG9hZCgpIHtcbiAgICAgICAgYXdhaXQgc2xlZXAoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ29uTG9hZCcpO1xuICAgIH1cbiAgICBhc3luYyBvblNob3coKSB7XG4gICAgICAgIGF3YWl0IHRoaXMubG9hZERhdGEoKTtcbiAgICAgICAgdGhpcy5zZXRHbG9iYWxNcElkKHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuaWQpO1xuICAgIH1cbiAgICBmb3JtYXRlZE1wKGl0ZW0pIHtcbiAgICAgICAgY29uc3QgbXAgPSBpdGVtO1xuICAgICAgICBpZiAobXAuaGVhZEltZyAmJiBtcC5oZWFkSW1nLmluZGV4T2YoJ2h0dHAnKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIG1wLmhlYWRJbWcgPSBgaHR0cHM6Ly9waWMxLjU4Y2RuLmNvbS5jbiR7bXAuaGVhZEltZ31gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtcDtcbiAgICB9XG4gICAgYXN5bmMgbG9hZERhdGEoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBzdWJEYXRhID0ge1xuICAgICAgICAgICAgICAgIG1waWQ6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ2N1cnJlbnRfbXBpZCcpIHx8ICcnLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL21wbG9naWMvaW5kZXgnLCBzdWJEYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsb2FkRGF0YScsIGRhdGEpO1xuICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgIHVzZXJuYW1lID0gJycsXG4gICAgICAgICAgICAgICAgbXBpbmZvID0ge30sXG4gICAgICAgICAgICAgICAgdW5yZWFkID0gJycsXG4gICAgICAgICAgICAgICAgY291bnQgPSAwLFxuICAgICAgICAgICAgICAgIG5leHR0YXNrID0gJycsXG4gICAgICAgICAgICB9ID0gZGF0YTtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdGVkTXBpbmZvID0gdGhpcy5mb3JtYXRlZE1wKG1waW5mbyk7XG4gICAgICAgICAgICB0aGlzLmJ1c2luZXNzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5idXNpbmVzcywge1xuICAgICAgICAgICAgICAgIG5hbWU6IHVzZXJuYW1lLFxuICAgICAgICAgICAgICAgIG1pbmlQcm9ncmFtTmFtZTogbXBpbmZvLm5pY2tOYW1lIHx8ICfmgqjov5jmsqHotK3kubDlsI/nqIvluo8nLFxuICAgICAgICAgICAgICAgIHVucmVhZCxcbiAgICAgICAgICAgICAgICBtcENvdW50OiBjb3VudCxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZm9ybWF0ZWRNcGluZm8sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG5leHR0YXNrICYmIHRoaXMuc2V0TmV4dFRhc2sobmV4dHRhc2spO1xuICAgICAgICAgICAgLy8gZGF0YS51c2VybmFtZSAmJiAodGhpcy5idXNpbmVzcy5uYW1lID0gZGF0YS51c2VybmFtZSk7XG4gICAgICAgICAgICAvLyBkYXRhLm1waW5mbyAmJiAodGhpcy5idXNpbmVzcy5taW5pUHJvZ3JhbU5hbWUgPSBkYXRhLm1waW5mby5uaWNrTmFtZSk7XG4gICAgICAgICAgICAvLyBkYXRhLnVucmVhZCAmJiAodGhpcy5idXNpbmVzcy51bnJlYWQgPSBkYXRhLnVucmVhZCk7XG4gICAgICAgICAgICAvLyBkYXRhLmNvdW50ICYmICh0aGlzLmJ1c2luZXNzLm1wQ291bnQgPSBkYXRhLmNvdW50KTtcbiAgICAgICAgICAgIC8vIGRhdGEubXBpbmZvICYmICh0aGlzLmJ1c2luZXNzLnNlbGVjdGVkLmlkID0gZGF0YS5tcGluZm8uaWQpXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGhpcy5idXNpbmVzcycsIHRoaXMuYnVzaW5lc3MpO1xuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2UnLCBlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXRHbG9iYWxNcElkKGlkKSB7XG4gICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygnY3VycmVudF9tcGlkJywgaWQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNoZWNrQmVmb3JlSnVtcChpbmRleCkge1xuICAgICAgICBjb25zb2xlLmxvZygndGhpcy5idXNpbmVzcy5zZWxlY3RlZC4nLCB0aGlzLmJ1c2luZXNzLnNlbGVjdGVkKTtcbiAgICAgICAgaWYgKCF0aGlzLmJ1c2luZXNzLm1wQ291bnQpIHtcbiAgICAgICAgICAgIGFsZXJ0KCfmgqjov5jmnKrotK3kubDlsI/nqIvluo/vvIzor7fnmbvlvZVlLjU4LmNvbei/m+ihjOi0reS5sCcsICfmj5DnpLonKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKGluZGV4KSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnbXlNcCcsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnVXBsb2FkSW5mbycsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuYXBwX3R5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ+W9k+WJjeWwj+eoi+W6j+S4uuS8mOS6q+Wwj+eoi+W6j++8jOS4jeeUqOaPkOS6pOazqOWGjOS/oeaBrycsICfmj5DnpLonKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5idXNpbmVzcy5zZWxlY3RlZC5zaWduID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdyZWdpc3RlZCcsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3JlZ2lzdE1hcHBpZCcsIHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuaWQpO1xuICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAncmVnaXN0TWFpbkFjY291bnQnLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAncHJvZ3Jlc3MnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogJ2ZlZWRiYWNrJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0TmV4dFRhc2sodGFza051bSkge1xuICAgICAgICB0aGlzLmJ1c2luZXNzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5idXNpbmVzcywge1xuICAgICAgICAgICAgbmV4dHRhc2s6IHRhc2tOdW0sXG4gICAgICAgIH0pO1xuICAgICAgICBzd2l0Y2ggKHRhc2tOdW0pIHtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB0aGlzLmJ1c2luZXNzLnByb2dyZXNzVGV4dCA9ICflvZPliY3lsI/nqIvluo/mnKrmt7vliqDlsI/nqIvluo/kv6Hmga8nO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MucHJvZ3Jlc3NUZXh0ID0gJ+W9k+WJjeWwj+eoi+W6j+i/mOacquS4iuS8oOe0oOadkCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuYXBwX3R5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXNpbmVzcy5wcm9ncmVzc1RleHQgPSAn5b2T5YmN5bCP56iL5bqP5L+h5oGv5bey5a6M5ZaEJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1c2luZXNzLnByb2dyZXNzVGV4dCA9ICflvZPliY3lsI/nqIvluo/ov5jmnKrloavlhpnms6jlhozkv6Hmga8nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNTogLy8g6Lez6L2s5oiR55qE5bCP56iL5bqPXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuYXBwX3R5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXNpbmVzcy5wcm9ncmVzc1RleHQgPSAn5b2T5YmN5bCP56iL5bqP5L+h5oGv5bey5a6M5ZaEJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1c2luZXNzLnByb2dyZXNzVGV4dCA9ICflvZPliY3lsI/nqIvluo/ov5jmnKrmjojmnYMnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNjogLy8g6Lez6L2s5Yiw6L+b5bqmXG4gICAgICAgICAgICAgICAgdGhpcy5idXNpbmVzcy5wcm9ncmVzc1RleHQgPSAn5b2T5YmN5bCP56iL5bqP5L+h5oGv5bey5a6M5ZaEJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNzogLy8g5raI5oGv5YiX6KGoXG4gICAgICAgICAgICAgICAgdGhpcy5idXNpbmVzcy5wcm9ncmVzc1RleHQgPSAn5b2T5YmN5bCP56iL5bqP5L+h5oGv5bey5a6M5ZaEJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgODogLy8g5raI5oGv5YiX6KGoXG4gICAgICAgICAgICAgICAgdGhpcy5idXNpbmVzcy5wcm9ncmVzc1RleHQgPSAn5b2T5YmN5bCP56iL5bqP5L+h5oGv5bey5a6M5ZaEJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgOTogLy8g5a6M5oiQ5bqmXG4gICAgICAgICAgICAgICAgdGhpcy5idXNpbmVzcy5wcm9ncmVzc1RleHQgPSAn5b2T5YmN5bCP56iL5bqP5L+h5oGv5bey5a6M5ZaEJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG59XG4iXX0=
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

var app = require('./../utils/globalData.js');

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
                iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-my-mp.png',
                text: '我的小程序'
            }, {
                iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-order-manage.png',
                text: '订单管理'
            }, {
                iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-payment-record.png',
                text: '收款记录'
            }, {
                iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-payment.png',
                text: '支付开通'
            }],
            nItems: [{
                title: '店铺运营',
                items: [{
                    iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-store-fit.png',
                    text: '店铺装修'
                }, {
                    iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-order-service.png',
                    text: '发布服务'
                }, {
                    iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-coupon.png',
                    text: '优惠劵'
                }, {
                    iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-resorce-manage.png',
                    text: '素材管理'
                }]
            }, {
                title: '开店必做',
                items: [{
                    iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-buy-mp.png',
                    text: '购买小程序'
                }, {
                    iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-regist-mp.png',
                    text: '注册小程序'
                }, {
                    iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-mp-progress.png',
                    text: '进度查询'
                }, {
                    iconPath: 'https://static.58.com/lbg/shangjiaxcxht/zhushou/img/icon-feedback-mp.png',
                    text: '意见反馈'
                }]
            }]
        }, _this.methods = {
            // link (index) {
            //     if (index !== 6) { //   意见反馈不做判断
            //         this.checkBeforeJump(index);
            //     } else {
            //         wepy.navigateTo({
            //             url: 'feedback',
            //         });
            //     }
            // },
            link: function link(text) {
                console.log(text);
                if (text === '意见反馈') {
                    _wepy2.default.navigateTo({
                        url: 'feedback'
                    });
                } else if (text === '购买小程序') {
                    // 购买小程序页面
                    _wepy2.default.navigateTo({
                        url: 'purchase'
                    });
                } else {
                    this.checkBeforeJump(text);
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
                                this.loadExtJson();

                            case 4:
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
        key: 'loadExtJson',
        value: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var url, _ref7, data;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                url = '/mpBusinessRelease/getExtJson';
                                _context4.next = 3;
                                return (0, _ajax.get)(url, { sceneKey: wx.getStorageSync('mpId') });

                            case 3:
                                _ref7 = _context4.sent;
                                data = _ref7.data;

                                app.globalData.extConfig = data;
                                console.log(data);

                            case 7:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function loadExtJson() {
                return _ref6.apply(this, arguments);
            }

            return loadExtJson;
        }()
    }, {
        key: 'loadData',
        value: function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                var subData, _ref9, data, _data$username, username, _data$mpinfo, mpinfo, _data$unread, unread, _data$count, count, _data$nexttask, nexttask, formatedMpinfo;

                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.prev = 0;
                                subData = {
                                    mpid: _wepy2.default.getStorageSync('current_mpid') || ''
                                };
                                _context5.next = 4;
                                return (0, _ajax.post)('/mplogic/index', subData);

                            case 4:
                                _ref9 = _context5.sent;
                                data = _ref9.data;

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
                                _context5.next = 18;
                                break;

                            case 15:
                                _context5.prev = 15;
                                _context5.t0 = _context5['catch'](0);

                                console.log('e', _context5.t0);

                            case 18:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this, [[0, 15]]);
            }));

            function loadData() {
                return _ref8.apply(this, arguments);
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
        // checkBeforeJump (index) {
        //     console.log('this.business.selected.', this.business.selected);
        //     if (!this.business.mpCount) {
        //         alert('您还未购买小程序，请登录e.58.com进行购买', '提示');
        //         return;
        //     }
        //     switch (index) {
        //         case 0:
        //             wepy.navigateTo({
        //                 url: 'myMp',
        //             });
        //             break;
        //         case 1:
        //             wepy.navigateTo({
        //                 url: 'UploadInfo',
        //             });
        //             break;
        //         case 2:
        //             wepy.navigateTo({
        //                 url: 'OrderList',
        //             });
        //             break;
        //         case 3:
        //             wepy.navigateTo({
        //                 url: 'progress',
        //             });
        //             break;
        //         case 4:
        //             if (this.business.selected.app_type === 1) {
        //                 alert('当前小程序为优享小程序，不用提交注册信息', '提示');
        //                 return;
        //             }
        //             if (this.business.selected.sign === 1) {
        //                 wepy.navigateTo({
        //                     url: 'registed',
        //                 });
        //             } else {
        //                 wepy.setStorageSync('registMappid', this.business.selected.id);
        //                 wepy.navigateTo({
        //                     url: 'registMainAccount',
        //                 });
        //             }
        //             break;
        //         case 5:
        //             wepy.navigateTo({
        //                 url: 'OpenPay',
        //             });
        //             break;
        //         case 6:
        //             wepy.navigateTo({
        //                 url: 'feedback',
        //             });
        //             break;
        //         default:
        //             break;
        //     }
        // }

    }, {
        key: 'checkBeforeJump',
        value: function checkBeforeJump(text) {
            console.log('this.business.selected.', this.business.selected);
            if (!this.business.mpCount) {
                (0, _utils.alert)('您还未购买小程序，请登录e.58.com进行购买', '提示');
                return;
            }
            switch (text) {
                case '我的小程序':
                    _wepy2.default.navigateTo({
                        url: 'myMp'
                    });
                    break;
                case '订单管理':
                    _wepy2.default.navigateTo({
                        url: 'OrderList'
                    });
                    break;
                case '收款记录':
                    _wepy2.default.navigateTo({
                        url: 'paymentRecord'
                    });
                    break;
                case '支付开通':
                    _wepy2.default.navigateTo({
                        url: 'OpenPay'
                    });
                    break;
                case '店铺装修':
                    _wepy2.default.navigateTo({
                        url: 'templateList'
                    });
                    break;
                case '发布服务':
                    _wepy2.default.navigateTo({
                        url: 'orderComponentGroup'
                    });
                    break;
                case '优惠劵':
                    _wepy2.default.navigateTo({
                        url: 'couponManage'
                    });
                    break;
                case '素材管理':
                    _wepy2.default.navigateTo({
                        url: 'resourceManage'
                    });
                    break;
                case '购买小程序':
                    _wepy2.default.navigateTo({
                        url: 'purchase'
                    });
                    break;
                case '注册小程序':
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
                case '进度查询':
                    _wepy2.default.navigateTo({
                        url: 'progress'
                    });
                    break;
                case '意见反馈':
                    _wepy2.default.navigateTo({
                        url: 'feedback'
                    });
                    break;
                case 6:
                    _wepy2.default.navigateTo({
                        url: 'templateList'
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuanMiXSwibmFtZXMiOlsiYXBwIiwicmVxdWlyZSIsIkhvbWUiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGlzYWJsZVNjcm9sbCIsImRhdGEiLCJidXNpbmVzcyIsIm1wcyIsIm5hbWUiLCJtaW5pUHJvZ3JhbU5hbWUiLCJ1bnJlYWQiLCJtcENvdW50IiwicHJvZ3Jlc3NUZXh0IiwibmV4dHRhc2siLCJjaGFuZ2VNUCIsImNhbkNvbmZpcm0iLCJzZWxlY3RlZCIsImlkIiwiY2hvc2VkSWQiLCJpdGVtcyIsImljb25QYXRoIiwidGV4dCIsIm5JdGVtcyIsInRpdGxlIiwibWV0aG9kcyIsImxpbmsiLCJjb25zb2xlIiwibG9nIiwid2VweSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjaGVja0JlZm9yZUp1bXAiLCJjaGVja1Byb2dyZXNzIiwiYXBwX3R5cGUiLCJzZXRTdG9yYWdlU3luYyIsIiRhcHBseSIsImNoYW5nZUFjdGlvbiIsIk9iamVjdCIsImFzc2lnbiIsIm1waW5mb3MiLCJsZW5ndGgiLCJvdGhlcnMiLCJmaWx0ZXIiLCJhcHBpbmZvIiwiZm9ybWF0ZWRPdGhlciIsIm1hcCIsIml0ZW0iLCJmb3JtYXRlZE1wIiwiYmluZEhpZGVNYXNrIiwic2VsZWN0TXAiLCJjb25maXJtQWN0aW9uIiwic2V0R2xvYmFsTXBJZCIsImxvYWREYXRhIiwiaGlkZU1hc2siLCJsb2FkRXh0SnNvbiIsIm1wIiwiaGVhZEltZyIsImluZGV4T2YiLCJyZXMiLCJmcm9tIiwidGFyZ2V0IiwicGF0aCIsImltYWdlVXJsIiwic3VjY2VzcyIsImZhaWwiLCJlcnIiLCJzY2VuZUtleSIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJnbG9iYWxEYXRhIiwiZXh0Q29uZmlnIiwic3ViRGF0YSIsIm1waWQiLCJ1c2VybmFtZSIsIm1waW5mbyIsImNvdW50IiwiZm9ybWF0ZWRNcGluZm8iLCJuaWNrTmFtZSIsInNldE5leHRUYXNrIiwic2lnbiIsInRhc2tOdW0iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLE1BQU1DLFFBQVEscUJBQVIsQ0FBWjs7SUFFcUJDLEk7Ozs7Ozs7Ozs7Ozs7O3NMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QixJQURuQjtBQUVMQywyQkFBZTtBQUZWLFMsUUFJVEMsSSxHQUFPO0FBQ0hDLHNCQUFVO0FBQ05DLHFCQUFLLEVBREM7QUFFTkMsc0JBQU0sTUFGQTtBQUdOQyxpQ0FBaUIsVUFIWDtBQUlOQyx3QkFBUSxDQUpGO0FBS05DLHlCQUFTLENBTEg7QUFNTkMsOEJBQWMsV0FOUjtBQU9OQywwQkFBVSxDQVBKO0FBUU5DLDBCQUFVLEtBUko7QUFTTkMsNEJBQVksS0FUTjtBQVVOQywwQkFBVTtBQUNOQyx3QkFBSTtBQURFLGlCQVZKO0FBYU5DLDBCQUFVO0FBYkosYUFEUDtBQWdCSEMsbUJBQU8sQ0FDSDtBQUNJQywwQkFBVSxvRUFEZDtBQUVJQyxzQkFBTTtBQUZWLGFBREcsRUFJQTtBQUNDRCwwQkFBVSwyRUFEWDtBQUVDQyxzQkFBTTtBQUZQLGFBSkEsRUFPQTtBQUNDRCwwQkFBVSw2RUFEWDtBQUVDQyxzQkFBTTtBQUZQLGFBUEEsRUFVQTtBQUNDRCwwQkFBVSxzRUFEWDtBQUVDQyxzQkFBTTtBQUZQLGFBVkEsQ0FoQko7QUErQkhDLG9CQUFRLENBQ0o7QUFDSUMsdUJBQU8sTUFEWDtBQUVJSix1QkFBTyxDQUNIO0FBQ0lDLDhCQUFVLHdFQURkO0FBRUlDLDBCQUFNO0FBRlYsaUJBREcsRUFJQTtBQUNDRCw4QkFBVSw0RUFEWDtBQUVDQywwQkFBTTtBQUZQLGlCQUpBLEVBT0E7QUFDQ0QsOEJBQVUscUVBRFg7QUFFQ0MsMEJBQU07QUFGUCxpQkFQQSxFQVVBO0FBQ0NELDhCQUFVLDZFQURYO0FBRUNDLDBCQUFNO0FBRlAsaUJBVkE7QUFGWCxhQURJLEVBbUJKO0FBQ0lFLHVCQUFPLE1BRFg7QUFFSUosdUJBQU8sQ0FDSDtBQUNJQyw4QkFBVSxxRUFEZDtBQUVJQywwQkFBTTtBQUZWLGlCQURHLEVBSUE7QUFDQ0QsOEJBQVUsd0VBRFg7QUFFQ0MsMEJBQU07QUFGUCxpQkFKQSxFQU9BO0FBQ0NELDhCQUFVLDBFQURYO0FBRUNDLDBCQUFNO0FBRlAsaUJBUEEsRUFVQTtBQUNDRCw4QkFBVSwwRUFEWDtBQUVDQywwQkFBTTtBQUZQLGlCQVZBO0FBRlgsYUFuQkk7QUEvQkwsUyxRQXNFUEcsTyxHQUFVO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FDLGdCQVZNLGdCQVVESixJQVZDLEVBVUs7QUFDUEssd0JBQVFDLEdBQVIsQ0FBWU4sSUFBWjtBQUNBLG9CQUFJQSxTQUFTLE1BQWIsRUFBcUI7QUFDakJPLG1DQUFLQyxVQUFMLENBQWdCO0FBQ1pDLDZCQUFLO0FBRE8scUJBQWhCO0FBR0gsaUJBSkQsTUFJTyxJQUFJVCxTQUFTLE9BQWIsRUFBc0I7QUFDekI7QUFDQU8sbUNBQUtDLFVBQUwsQ0FBZ0I7QUFDWkMsNkJBQUs7QUFETyxxQkFBaEI7QUFHSCxpQkFMTSxNQUtBO0FBQ0gseUJBQUtDLGVBQUwsQ0FBcUJWLElBQXJCO0FBQ0g7QUFDSixhQXhCSztBQXlCTlcseUJBekJNLDJCQXlCVztBQUNiLG9CQUFJLENBQUMsS0FBSzFCLFFBQUwsQ0FBY0ssT0FBbkIsRUFBNEI7QUFDeEIsc0NBQU0sMEJBQU4sRUFBa0MsSUFBbEM7QUFDQTtBQUNIO0FBQ0Qsd0JBQVEsS0FBS0wsUUFBTCxDQUFjTyxRQUF0QjtBQUNJLHlCQUFLLENBQUw7QUFDSWUsdUNBQUtDLFVBQUwsQ0FBZ0I7QUFDWkMsaUNBQUs7QUFETyx5QkFBaEI7QUFHQTtBQUNKLHlCQUFLLENBQUw7QUFDSUYsdUNBQUtDLFVBQUwsQ0FBZ0I7QUFDWkMsaUNBQUs7QUFETyx5QkFBaEI7QUFHQTtBQUNKLHlCQUFLLENBQUw7QUFDSSw0QkFBSSxLQUFLeEIsUUFBTCxDQUFjVSxRQUFkLENBQXVCaUIsUUFBdkIsS0FBb0MsQ0FBeEMsRUFBMkM7QUFDdkNMLDJDQUFLTSxjQUFMLENBQW9CLGNBQXBCLEVBQW9DLEtBQUs1QixRQUFMLENBQWNVLFFBQWQsQ0FBdUJDLEVBQTNEO0FBQ0FXLDJDQUFLQyxVQUFMLENBQWdCO0FBQ1pDLHFDQUFLO0FBRE8sNkJBQWhCO0FBR0gseUJBTEQsTUFLTztBQUNIRiwyQ0FBS0MsVUFBTCxDQUFnQjtBQUNaQyxxQ0FBSztBQURPLDZCQUFoQjtBQUdIO0FBQ0Q7QUFDSix5QkFBSyxDQUFMO0FBQ0ksNEJBQUksS0FBS3hCLFFBQUwsQ0FBY1UsUUFBZCxDQUF1QmlCLFFBQXZCLEtBQW9DLENBQXhDLEVBQTJDO0FBQ3ZDTCwyQ0FBS0MsVUFBTCxDQUFnQjtBQUNaQyxxQ0FBSztBQURPLDZCQUFoQjtBQUdILHlCQUpELE1BSU87QUFDSEYsMkNBQUtDLFVBQUwsQ0FBZ0I7QUFDWkMscUNBQUs7QUFETyw2QkFBaEI7QUFHSDtBQUNEO0FBQ0oseUJBQUssQ0FBTDtBQUNJRix1Q0FBS0MsVUFBTCxDQUFnQjtBQUNaQyxpQ0FBSztBQURPLHlCQUFoQjtBQUdBO0FBQ0oseUJBQUssQ0FBTDtBQUNJRix1Q0FBS0MsVUFBTCxDQUFnQjtBQUNaQyxpQ0FBSztBQURPLHlCQUFoQjtBQUdBO0FBQ0oseUJBQUssQ0FBTDtBQUNJRix1Q0FBS0MsVUFBTCxDQUFnQjtBQUNaQyxpQ0FBSztBQURPLHlCQUFoQjtBQUdBO0FBQ0oseUJBQUssQ0FBTDtBQUNJRix1Q0FBS0MsVUFBTCxDQUFnQjtBQUNaQyxpQ0FBSztBQURPLHlCQUFoQjtBQUdBO0FBQ0o7QUFDSTtBQXZEUjtBQXlEQSxxQkFBS0ssTUFBTDtBQUNILGFBeEZLO0FBeUZBQyx3QkF6RkE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBMEZGLHlDQUFLOUIsUUFBTCxHQUFnQitCLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLEtBQUtoQyxRQUF2QixFQUFpQztBQUM3Q1Esa0RBQVU7QUFEbUMscUNBQWpDLENBQWhCO0FBMUZFO0FBQUEsMkNBNkZxQixnQkFBSyxtQkFBTCxDQTdGckI7O0FBQUE7QUFBQTtBQTZGTVQsd0NBN0ZOLFNBNkZNQSxJQTdGTjtBQThGTWtDLDJDQTlGTixHQThGa0JsQyxJQTlGbEIsQ0E4Rk1rQyxPQTlGTjs7QUErRkYseUNBQUtqQyxRQUFMLEdBQWdCK0IsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsS0FBS2hDLFFBQXZCLEVBQWlDO0FBQzdDQyw2Q0FBS2dDO0FBRHdDLHFDQUFqQyxDQUFoQjtBQUdBLHdDQUFJLEtBQUtqQyxRQUFMLENBQWNDLEdBQWQsQ0FBa0JpQyxNQUFsQixHQUEyQixDQUEvQixFQUFrQztBQUN4QkMsOENBRHdCLEdBQ2YsS0FBS25DLFFBQUwsQ0FBY0MsR0FBZCxDQUFrQm1DLE1BQWxCLENBQXlCLFVBQUNDLE9BQUQ7QUFBQSxtREFBYUEsUUFBUTFCLEVBQVIsS0FDakQsT0FBS1gsUUFBTCxDQUFjVSxRQUFkLENBQXVCQyxFQURhO0FBQUEseUNBQXpCLENBRGU7QUFHeEIyQixxREFId0IsR0FHUkgsT0FBT0ksR0FBUCxDQUFXLFVBQUNDLElBQUQ7QUFBQSxtREFBVSxPQUFLQyxVQUFMLENBQWdCRCxJQUFoQixDQUFWO0FBQUEseUNBQVgsQ0FIUTs7QUFJOUIsNkNBQUt4QyxRQUFMLEdBQWdCK0IsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsS0FBS2hDLFFBQXZCLEVBQWlDO0FBQzdDQyxpREFBS3FDLGFBRHdDO0FBRTdDMUIsc0RBQVUsQ0FGbUM7QUFHN0NILHdEQUFZO0FBSGlDLHlDQUFqQyxDQUFoQjtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBQ0QseUNBQUtvQixNQUFMO0FBQ0FULDRDQUFRQyxHQUFSLENBQVksbUJBQVosRUFBaUMsS0FBS3JCLFFBQUwsQ0FBY0MsR0FBL0M7O0FBbkhFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBcUhOeUMsd0JBckhNLDBCQXFIVTtBQUNaLHFCQUFLMUMsUUFBTCxHQUFnQitCLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLEtBQUtoQyxRQUF2QixFQUFpQztBQUM3Q1EsOEJBQVUsS0FEbUM7QUFFN0NDLGdDQUFZO0FBRmlDLGlCQUFqQyxDQUFoQjtBQUlBLHFCQUFLb0IsTUFBTDtBQUNILGFBM0hLO0FBNEhOYyxvQkE1SE0sb0JBNEhJSCxJQTVISixFQTRIVTtBQUNaLHFCQUFLeEMsUUFBTCxHQUFnQitCLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLEtBQUtoQyxRQUF2QixFQUFpQztBQUM3Q1ksOEJBQVU0QixLQUFLN0IsRUFEOEI7QUFFN0NGLGdDQUFZO0FBRmlDLGlCQUFqQyxDQUFoQjtBQUlBVyx3QkFBUUMsR0FBUixDQUFZLElBQVosRUFBa0IsS0FBS3JCLFFBQXZCO0FBQ0EscUJBQUs2QixNQUFMO0FBQ0gsYUFuSUs7QUFvSU5lLHlCQXBJTSwyQkFvSVc7QUFDYixvQkFBSSxLQUFLNUMsUUFBTCxDQUFjVSxRQUFkLENBQXVCQyxFQUEzQixFQUErQjtBQUMzQix5QkFBS2tDLGFBQUwsQ0FBbUIsS0FBSzdDLFFBQUwsQ0FBY1ksUUFBakM7QUFDQSx5QkFBS2tDLFFBQUw7QUFDQSx5QkFBS0MsUUFBTDtBQUNIO0FBQ0o7QUExSUssUzs7Ozs7bUNBNElFO0FBQ1IsaUJBQUsvQyxRQUFMLEdBQWdCK0IsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsS0FBS2hDLFFBQXZCLEVBQWlDO0FBQzdDUSwwQkFBVSxLQURtQztBQUU3Q0MsNEJBQVk7QUFGaUMsYUFBakMsQ0FBaEI7QUFJQSxpQkFBS29CLE1BQUw7QUFDSDs7Ozs7Ozs7Ozt1Q0FFUyxtQjs7O0FBQ05ULHdDQUFRQyxHQUFSLENBQVksUUFBWjtBQUNBLHFDQUFLMkIsV0FBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1Q0FHTSxLQUFLRixRQUFMLEU7OztBQUNOLHFDQUFLRCxhQUFMLENBQW1CLEtBQUs3QyxRQUFMLENBQWNVLFFBQWQsQ0FBdUJDLEVBQTFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7bUNBRVE2QixJLEVBQU07QUFDZCxnQkFBTVMsS0FBS1QsSUFBWDtBQUNBLGdCQUFJUyxHQUFHQyxPQUFILElBQWNELEdBQUdDLE9BQUgsQ0FBV0MsT0FBWCxDQUFtQixNQUFuQixNQUErQixDQUFDLENBQWxELEVBQXFEO0FBQ2pERixtQkFBR0MsT0FBSCxpQ0FBeUNELEdBQUdDLE9BQTVDO0FBQ0g7QUFDRCxtQkFBT0QsRUFBUDtBQUNIO0FBQ0Q7Ozs7OzswQ0FHbUJHLEcsRUFBSztBQUNwQixnQkFBSUEsSUFBSUMsSUFBSixLQUFhLFFBQWpCLEVBQTJCO0FBQ3ZCO0FBQ0FqQyx3QkFBUUMsR0FBUixDQUFZK0IsSUFBSUUsTUFBaEI7QUFDSDtBQUNELG1CQUFPO0FBQ0hyQyx1QkFBTyxtQkFESjtBQUVIc0Msc0JBQU0sYUFGSDtBQUdIQywwQkFBVSwrREFIUDtBQUlIQyx1QkFKRyxtQkFJTTFELElBSk4sRUFJWTtBQUNYcUIsNEJBQVFDLEdBQVIsQ0FBWXRCLElBQVo7QUFDSCxpQkFORTtBQU9IMkQsb0JBUEcsZ0JBT0dDLEdBUEgsRUFPUTtBQUNQdkMsNEJBQVFDLEdBQVIsQ0FBWXNDLEdBQVo7QUFDSDtBQVRFLGFBQVA7QUFXSDs7Ozs7Ozs7Ozs7QUFFU25DLG1DLEdBQU0sK0I7O3VDQUNXLGVBQUlBLEdBQUosRUFBUyxFQUFFb0MsVUFBVUMsR0FBR0MsY0FBSCxDQUFrQixNQUFsQixDQUFaLEVBQVQsQzs7OztBQUFmL0Qsb0MsU0FBQUEsSTs7QUFDUk4sb0NBQUlzRSxVQUFKLENBQWVDLFNBQWYsR0FBMkJqRSxJQUEzQjtBQUNBcUIsd0NBQVFDLEdBQVIsQ0FBWXRCLElBQVo7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlVa0UsdUMsR0FBVTtBQUNaQywwQ0FBTTVDLGVBQUt3QyxjQUFMLENBQW9CLGNBQXBCLEtBQXVDO0FBRGpDLGlDOzt1Q0FHTyxnQkFBSyxnQkFBTCxFQUF1QkcsT0FBdkIsQzs7OztBQUFmbEUsb0MsU0FBQUEsSTs7QUFDUnFCLHdDQUFRQyxHQUFSLENBQVksVUFBWixFQUF3QnRCLElBQXhCO2lEQU9JQSxJLENBTEFvRSxRLEVBQUFBLFEsa0NBQVcsRSxrQ0FLWHBFLEksQ0FKQXFFLE0sRUFBQUEsTSxnQ0FBUyxFLGdDQUlUckUsSSxDQUhBSyxNLEVBQUFBLE0sZ0NBQVMsRSwrQkFHVEwsSSxDQUZBc0UsSyxFQUFBQSxLLCtCQUFRLEMsaUNBRVJ0RSxJLENBREFRLFEsRUFBQUEsUSxrQ0FBVyxFO0FBRVQrRCw4QyxHQUFpQixLQUFLN0IsVUFBTCxDQUFnQjJCLE1BQWhCLEM7O0FBQ3ZCLHFDQUFLcEUsUUFBTCxHQUFnQitCLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLEtBQUtoQyxRQUF2QixFQUFpQztBQUM3Q0UsMENBQU1pRSxRQUR1QztBQUU3Q2hFLHFEQUFpQmlFLE9BQU9HLFFBQVAsSUFBbUIsVUFGUztBQUc3Q25FLGtEQUg2QztBQUk3Q0MsNkNBQVNnRSxLQUpvQztBQUs3QzNELDhDQUFVNEQ7QUFMbUMsaUNBQWpDLENBQWhCO0FBT0EvRCw0Q0FBWSxLQUFLaUUsV0FBTCxDQUFpQmpFLFFBQWpCLENBQVo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FhLHdDQUFRQyxHQUFSLENBQVksZUFBWixFQUE2QixLQUFLckIsUUFBbEM7QUFDQSxxQ0FBSzZCLE1BQUw7Ozs7Ozs7O0FBRUFULHdDQUFRQyxHQUFSLENBQVksR0FBWjs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NDQUdPVixFLEVBQUk7QUFDZixnQkFBSUEsRUFBSixFQUFRO0FBQ0pXLCtCQUFLTSxjQUFMLENBQW9CLGNBQXBCLEVBQW9DakIsRUFBcEM7QUFDSDtBQUNKO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O3dDQUNpQkksSSxFQUFNO0FBQ25CSyxvQkFBUUMsR0FBUixDQUFZLHlCQUFaLEVBQXVDLEtBQUtyQixRQUFMLENBQWNVLFFBQXJEO0FBQ0EsZ0JBQUksQ0FBQyxLQUFLVixRQUFMLENBQWNLLE9BQW5CLEVBQTRCO0FBQ3hCLGtDQUFNLDBCQUFOLEVBQWtDLElBQWxDO0FBQ0E7QUFDSDtBQUNELG9CQUFRVSxJQUFSO0FBQ0kscUJBQUssT0FBTDtBQUNJTyxtQ0FBS0MsVUFBTCxDQUFnQjtBQUNaQyw2QkFBSztBQURPLHFCQUFoQjtBQUdBO0FBQ0oscUJBQUssTUFBTDtBQUNJRixtQ0FBS0MsVUFBTCxDQUFnQjtBQUNaQyw2QkFBSztBQURPLHFCQUFoQjtBQUdBO0FBQ0oscUJBQUssTUFBTDtBQUNJRixtQ0FBS0MsVUFBTCxDQUFnQjtBQUNaQyw2QkFBSztBQURPLHFCQUFoQjtBQUdBO0FBQ0oscUJBQUssTUFBTDtBQUNJRixtQ0FBS0MsVUFBTCxDQUFnQjtBQUNaQyw2QkFBSztBQURPLHFCQUFoQjtBQUdBO0FBQ0oscUJBQUssTUFBTDtBQUNJRixtQ0FBS0MsVUFBTCxDQUFnQjtBQUNaQyw2QkFBSztBQURPLHFCQUFoQjtBQUdBO0FBQ0oscUJBQUssTUFBTDtBQUNJRixtQ0FBS0MsVUFBTCxDQUFnQjtBQUNaQyw2QkFBSztBQURPLHFCQUFoQjtBQUdBO0FBQ0oscUJBQUssS0FBTDtBQUNJRixtQ0FBS0MsVUFBTCxDQUFnQjtBQUNaQyw2QkFBSztBQURPLHFCQUFoQjtBQUdBO0FBQ0oscUJBQUssTUFBTDtBQUNJRixtQ0FBS0MsVUFBTCxDQUFnQjtBQUNaQyw2QkFBSztBQURPLHFCQUFoQjtBQUdBO0FBQ0oscUJBQUssT0FBTDtBQUNJRixtQ0FBS0MsVUFBTCxDQUFnQjtBQUNaQyw2QkFBSztBQURPLHFCQUFoQjtBQUdBO0FBQ0oscUJBQUssT0FBTDtBQUNJLHdCQUFJLEtBQUt4QixRQUFMLENBQWNVLFFBQWQsQ0FBdUJpQixRQUF2QixLQUFvQyxDQUF4QyxFQUEyQztBQUN2QywwQ0FBTSxzQkFBTixFQUE4QixJQUE5QjtBQUNBO0FBQ0g7QUFDRCx3QkFBSSxLQUFLM0IsUUFBTCxDQUFjVSxRQUFkLENBQXVCK0QsSUFBdkIsS0FBZ0MsQ0FBcEMsRUFBdUM7QUFDbkNuRCx1Q0FBS0MsVUFBTCxDQUFnQjtBQUNaQyxpQ0FBSztBQURPLHlCQUFoQjtBQUdILHFCQUpELE1BSU87QUFDSEYsdUNBQUtNLGNBQUwsQ0FBb0IsY0FBcEIsRUFBb0MsS0FBSzVCLFFBQUwsQ0FBY1UsUUFBZCxDQUF1QkMsRUFBM0Q7QUFDQVcsdUNBQUtDLFVBQUwsQ0FBZ0I7QUFDWkMsaUNBQUs7QUFETyx5QkFBaEI7QUFHSDtBQUNEO0FBQ0oscUJBQUssTUFBTDtBQUNJRixtQ0FBS0MsVUFBTCxDQUFnQjtBQUNaQyw2QkFBSztBQURPLHFCQUFoQjtBQUdBO0FBQ0oscUJBQUssTUFBTDtBQUNJRixtQ0FBS0MsVUFBTCxDQUFnQjtBQUNaQyw2QkFBSztBQURPLHFCQUFoQjtBQUdBO0FBQ0oscUJBQUssQ0FBTDtBQUNJRixtQ0FBS0MsVUFBTCxDQUFnQjtBQUNaQyw2QkFBSztBQURPLHFCQUFoQjtBQUdBO0FBQ0o7QUFDSTtBQTlFUjtBQWdGSDs7O29DQUNZa0QsTyxFQUFTO0FBQ2xCLGlCQUFLMUUsUUFBTCxHQUFnQitCLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLEtBQUtoQyxRQUF2QixFQUFpQztBQUM3Q08sMEJBQVVtRTtBQURtQyxhQUFqQyxDQUFoQjtBQUdBLG9CQUFRQSxPQUFSO0FBQ0kscUJBQUssQ0FBTDtBQUNJLHlCQUFLMUUsUUFBTCxDQUFjTSxZQUFkLEdBQTZCLGVBQTdCO0FBQ0E7QUFDSixxQkFBSyxDQUFMO0FBQ0kseUJBQUtOLFFBQUwsQ0FBY00sWUFBZCxHQUE2QixhQUE3QjtBQUNBO0FBQ0oscUJBQUssQ0FBTDtBQUNJLHdCQUFJLEtBQUtOLFFBQUwsQ0FBY1UsUUFBZCxDQUF1QmlCLFFBQXZCLEtBQW9DLENBQXhDLEVBQTJDO0FBQ3ZDLDZCQUFLM0IsUUFBTCxDQUFjTSxZQUFkLEdBQTZCLFlBQTdCO0FBQ0gscUJBRkQsTUFFTztBQUNILDZCQUFLTixRQUFMLENBQWNNLFlBQWQsR0FBNkIsZUFBN0I7QUFDSDtBQUNEO0FBQ0oscUJBQUssQ0FBTDtBQUFRO0FBQ0osd0JBQUksS0FBS04sUUFBTCxDQUFjVSxRQUFkLENBQXVCaUIsUUFBdkIsS0FBb0MsQ0FBeEMsRUFBMkM7QUFDdkMsNkJBQUszQixRQUFMLENBQWNNLFlBQWQsR0FBNkIsWUFBN0I7QUFDSCxxQkFGRCxNQUVPO0FBQ0gsNkJBQUtOLFFBQUwsQ0FBY00sWUFBZCxHQUE2QixXQUE3QjtBQUNIO0FBQ0Q7QUFDSixxQkFBSyxDQUFMO0FBQVE7QUFDSix5QkFBS04sUUFBTCxDQUFjTSxZQUFkLEdBQTZCLFlBQTdCO0FBQ0E7QUFDSixxQkFBSyxDQUFMO0FBQVE7QUFDSix5QkFBS04sUUFBTCxDQUFjTSxZQUFkLEdBQTZCLFlBQTdCO0FBQ0E7QUFDSixxQkFBSyxDQUFMO0FBQVE7QUFDSix5QkFBS04sUUFBTCxDQUFjTSxZQUFkLEdBQTZCLFlBQTdCO0FBQ0E7QUFDSixxQkFBSyxDQUFMO0FBQVE7QUFDSix5QkFBS04sUUFBTCxDQUFjTSxZQUFkLEdBQTZCLFlBQTdCO0FBQ0E7QUFDSjtBQUNJO0FBbENSO0FBb0NBLGlCQUFLdUIsTUFBTDtBQUNIOzs7O0VBeGU2QlAsZUFBS3FELEk7O2tCQUFsQmhGLEkiLCJmaWxlIjoiaG9tZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IHsgc2xlZXAsIGFsZXJ0IH0gZnJvbSAnLi4vdXRpbHMnO1xyXG5pbXBvcnQgeyBwb3N0LCBnZXQgfSBmcm9tICcuLi91dGlscy9hamF4JztcclxuXHJcbmNvbnN0IGFwcCA9IHJlcXVpcmUoJy4uL3V0aWxzL2dsb2JhbERhdGEnKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfpppbpobUnLFxyXG4gICAgICAgIGRpc2FibGVTY3JvbGw6IHRydWUsXHJcbiAgICB9XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGJ1c2luZXNzOiB7XHJcbiAgICAgICAgICAgIG1wczogW10sXHJcbiAgICAgICAgICAgIG5hbWU6ICfmgqjnmoTlp5PlkI0nLFxyXG4gICAgICAgICAgICBtaW5pUHJvZ3JhbU5hbWU6ICfmgqjov5jmsqHotK3kubDlsI/nqIvluo8nLFxyXG4gICAgICAgICAgICB1bnJlYWQ6IDAsXHJcbiAgICAgICAgICAgIG1wQ291bnQ6IDAsXHJcbiAgICAgICAgICAgIHByb2dyZXNzVGV4dDogJ+aCqOi/mOayoeaciei0reS5sOWwj+eoi+W6jycsXHJcbiAgICAgICAgICAgIG5leHR0YXNrOiAwLFxyXG4gICAgICAgICAgICBjaGFuZ2VNUDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNhbkNvbmZpcm06IGZhbHNlLFxyXG4gICAgICAgICAgICBzZWxlY3RlZDoge1xyXG4gICAgICAgICAgICAgICAgaWQ6IDAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNob3NlZElkOiAwLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWNvblBhdGg6ICdodHRwczovL3N0YXRpYy41OC5jb20vbGJnL3NoYW5namlheGN4aHQvemh1c2hvdS9pbWcvaWNvbi1teS1tcC5wbmcnLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogJ+aIkeeahOWwj+eoi+W6jycsXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGljb25QYXRoOiAnaHR0cHM6Ly9zdGF0aWMuNTguY29tL2xiZy9zaGFuZ2ppYXhjeGh0L3podXNob3UvaW1nL2ljb24tb3JkZXItbWFuYWdlLnBuZycsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAn6K6i5Y2V566h55CGJyxcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgaWNvblBhdGg6ICdodHRwczovL3N0YXRpYy41OC5jb20vbGJnL3NoYW5namlheGN4aHQvemh1c2hvdS9pbWcvaWNvbi1wYXltZW50LXJlY29yZC5wbmcnLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogJ+aUtuasvuiusOW9lScsXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGljb25QYXRoOiAnaHR0cHM6Ly9zdGF0aWMuNTguY29tL2xiZy9zaGFuZ2ppYXhjeGh0L3podXNob3UvaW1nL2ljb24tcGF5bWVudC5wbmcnLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogJ+aUr+S7mOW8gOmAmicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgICBuSXRlbXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICflupfpk7rov5DokKUnLFxyXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb25QYXRoOiAnaHR0cHM6Ly9zdGF0aWMuNTguY29tL2xiZy9zaGFuZ2ppYXhjeGh0L3podXNob3UvaW1nL2ljb24tc3RvcmUtZml0LnBuZycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICflupfpk7roo4Xkv64nLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvblBhdGg6ICdodHRwczovL3N0YXRpYy41OC5jb20vbGJnL3NoYW5namlheGN4aHQvemh1c2hvdS9pbWcvaWNvbi1vcmRlci1zZXJ2aWNlLnBuZycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICflj5HluIPmnI3liqEnLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvblBhdGg6ICdodHRwczovL3N0YXRpYy41OC5jb20vbGJnL3NoYW5namlheGN4aHQvemh1c2hvdS9pbWcvaWNvbi1jb3Vwb24ucG5nJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+S8mOaDoOWKtScsXHJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uUGF0aDogJ2h0dHBzOi8vc3RhdGljLjU4LmNvbS9sYmcvc2hhbmdqaWF4Y3hodC96aHVzaG91L2ltZy9pY29uLXJlc29yY2UtbWFuYWdlLnBuZycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICfntKDmnZDnrqHnkIYnLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+W8gOW6l+W/heWBmicsXHJcbiAgICAgICAgICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvblBhdGg6ICdodHRwczovL3N0YXRpYy41OC5jb20vbGJnL3NoYW5namlheGN4aHQvemh1c2hvdS9pbWcvaWNvbi1idXktbXAucG5nJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+i0reS5sOWwj+eoi+W6jycsXHJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uUGF0aDogJ2h0dHBzOi8vc3RhdGljLjU4LmNvbS9sYmcvc2hhbmdqaWF4Y3hodC96aHVzaG91L2ltZy9pY29uLXJlZ2lzdC1tcC5wbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn5rOo5YaM5bCP56iL5bqPJyxcclxuICAgICAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb25QYXRoOiAnaHR0cHM6Ly9zdGF0aWMuNTguY29tL2xiZy9zaGFuZ2ppYXhjeGh0L3podXNob3UvaW1nL2ljb24tbXAtcHJvZ3Jlc3MucG5nJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+i/m+W6puafpeivoicsXHJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uUGF0aDogJ2h0dHBzOi8vc3RhdGljLjU4LmNvbS9sYmcvc2hhbmdqaWF4Y3hodC96aHVzaG91L2ltZy9pY29uLWZlZWRiYWNrLW1wLnBuZycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICfmhI/op4Hlj43ppognLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICB9XHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIC8vIGxpbmsgKGluZGV4KSB7XHJcbiAgICAgICAgLy8gICAgIGlmIChpbmRleCAhPT0gNikgeyAvLyAgIOaEj+ingeWPjemmiOS4jeWBmuWIpOaWrVxyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5jaGVja0JlZm9yZUp1bXAoaW5kZXgpO1xyXG4gICAgICAgIC8vICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAvLyAgICAgICAgICAgICB1cmw6ICdmZWVkYmFjaycsXHJcbiAgICAgICAgLy8gICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAgbGluayh0ZXh0KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRleHQpO1xyXG4gICAgICAgICAgICBpZiAodGV4dCA9PT0gJ+aEj+ingeWPjemmiCcpIHtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnZmVlZGJhY2snLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGV4dCA9PT0gJ+i0reS5sOWwj+eoi+W6jycpIHtcclxuICAgICAgICAgICAgICAgIC8vIOi0reS5sOWwj+eoi+W6j+mhtemdolxyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICdwdXJjaGFzZScsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tCZWZvcmVKdW1wKHRleHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaGVja1Byb2dyZXNzICgpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmJ1c2luZXNzLm1wQ291bnQpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCfmgqjov5jmnKrotK3kubDlsI/nqIvluo/vvIzor7fnmbvlvZVlLjU4LmNvbei/m+ihjOi0reS5sCcsICfmj5DnpLonKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuYnVzaW5lc3MubmV4dHRhc2spIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdBcHBFZGl0JyxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdVcGxvYWRJbmZvJyxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5idXNpbmVzcy5zZWxlY3RlZC5hcHBfdHlwZSA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdyZWdpc3RNYXBwaWQnLCB0aGlzLmJ1c2luZXNzLnNlbGVjdGVkLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ3JlZ2lzdE1haW5BY2NvdW50JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ3Byb2dyZXNzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmJ1c2luZXNzLnNlbGVjdGVkLmFwcF90eXBlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdwcm9ncmVzcycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdteU1wJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ3Byb2dyZXNzJyxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNzpcclxuICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdwcm9ncmVzcycsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDg6XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAncHJvZ3Jlc3MnLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA5OlxyXG4gICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ3Byb2dyZXNzJyxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFzeW5jIGNoYW5nZUFjdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmJ1c2luZXNzLCB7XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VNUDogdHJ1ZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL21wbG9naWMvbXltcGxpc3QnKTtcclxuICAgICAgICAgICAgY29uc3QgeyBtcGluZm9zIH0gPSBkYXRhO1xyXG4gICAgICAgICAgICB0aGlzLmJ1c2luZXNzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5idXNpbmVzcywge1xyXG4gICAgICAgICAgICAgICAgbXBzOiBtcGluZm9zLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYnVzaW5lc3MubXBzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG90aGVycyA9IHRoaXMuYnVzaW5lc3MubXBzLmZpbHRlcigoYXBwaW5mbykgPT4gYXBwaW5mby5pZCAhPT1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1c2luZXNzLnNlbGVjdGVkLmlkKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1hdGVkT3RoZXIgPSBvdGhlcnMubWFwKChpdGVtKSA9PiB0aGlzLmZvcm1hdGVkTXAoaXRlbSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idXNpbmVzcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYnVzaW5lc3MsIHtcclxuICAgICAgICAgICAgICAgICAgICBtcHM6IGZvcm1hdGVkT3RoZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hvc2VkSWQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FuQ29uZmlybTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuYnVzaW5lc3MubXBzLm1hcCgoYXBwaW5mbywgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBpZiAoYXBwaW5mby5pZCA9PT0gdGhpcy5idXNpbmVzcy5zZWxlY3RlZC5pZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLmJ1c2luZXNzLm1wcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGhpcy5idXNpbmVzcy5tcHMnLCB0aGlzLmJ1c2luZXNzLm1wcyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kSGlkZU1hc2sgKCkge1xyXG4gICAgICAgICAgICB0aGlzLmJ1c2luZXNzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5idXNpbmVzcywge1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlTVA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY2FuQ29uZmlybTogZmFsc2UsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VsZWN0TXAgKGl0ZW0pIHtcclxuICAgICAgICAgICAgdGhpcy5idXNpbmVzcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYnVzaW5lc3MsIHtcclxuICAgICAgICAgICAgICAgIGNob3NlZElkOiBpdGVtLmlkLFxyXG4gICAgICAgICAgICAgICAgY2FuQ29uZmlybTogdHJ1ZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfngrnlh7snLCB0aGlzLmJ1c2luZXNzKTtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbmZpcm1BY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5idXNpbmVzcy5zZWxlY3RlZC5pZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRHbG9iYWxNcElkKHRoaXMuYnVzaW5lc3MuY2hvc2VkSWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlTWFzaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgIH1cclxuICAgIGhpZGVNYXNrICgpIHtcclxuICAgICAgICB0aGlzLmJ1c2luZXNzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5idXNpbmVzcywge1xyXG4gICAgICAgICAgICBjaGFuZ2VNUDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNhbkNvbmZpcm06IGZhbHNlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICB9XHJcbiAgICBhc3luYyBvbkxvYWQgKCkge1xyXG4gICAgICAgIGF3YWl0IHNsZWVwKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ29uTG9hZCcpO1xyXG4gICAgICAgIHRoaXMubG9hZEV4dEpzb24oKTtcclxuICAgIH1cclxuICAgIGFzeW5jIG9uU2hvdyAoKSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuc2V0R2xvYmFsTXBJZCh0aGlzLmJ1c2luZXNzLnNlbGVjdGVkLmlkKTtcclxuICAgIH1cclxuICAgIGZvcm1hdGVkTXAgKGl0ZW0pIHtcclxuICAgICAgICBjb25zdCBtcCA9IGl0ZW07XHJcbiAgICAgICAgaWYgKG1wLmhlYWRJbWcgJiYgbXAuaGVhZEltZy5pbmRleE9mKCdodHRwJykgPT09IC0xKSB7XHJcbiAgICAgICAgICAgIG1wLmhlYWRJbWcgPSBgaHR0cHM6Ly9waWMxLjU4Y2RuLmNvbS5jbiR7bXAuaGVhZEltZ31gO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbXA7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOeUqOaIt+eCueWHu+WPs+S4iuinkuWIhuS6q1xyXG4gICAgICovXHJcbiAgICBvblNoYXJlQXBwTWVzc2FnZSAocmVzKSB7XHJcbiAgICAgICAgaWYgKHJlcy5mcm9tID09PSAnYnV0dG9uJykge1xyXG4gICAgICAgICAgICAvLyDmnaXoh6rpobXpnaLlhoXovazlj5HmjInpkq5cclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLnRhcmdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAn6auY5pWI566h55CG5ZWG5a625bCP56iL5bqP55qE5LiA56uZ5byP5pyN5Yqh5bel5YW3JyxcclxuICAgICAgICAgICAgcGF0aDogJy9wYWdlcy9ob21lJyxcclxuICAgICAgICAgICAgaW1hZ2VVcmw6ICdodHRwczovL3N0YXRpYy41OC5jb20vbGJnL3NoYW5namlheGN4aHQvemh1c2hvdS9pbWcvc2hhcmUucG5nJyxcclxuICAgICAgICAgICAgc3VjY2VzcyAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWwgKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgYXN5bmMgbG9hZEV4dEpzb24oKSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gJy9tcEJ1c2luZXNzUmVsZWFzZS9nZXRFeHRKc29uJztcclxuICAgICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IGdldCh1cmwsIHsgc2NlbmVLZXk6IHd4LmdldFN0b3JhZ2VTeW5jKCdtcElkJykgfSk7XHJcbiAgICAgICAgYXBwLmdsb2JhbERhdGEuZXh0Q29uZmlnID0gZGF0YTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgIH1cclxuICAgIGFzeW5jIGxvYWREYXRhICgpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBzdWJEYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgbXBpZDogd2VweS5nZXRTdG9yYWdlU3luYygnY3VycmVudF9tcGlkJykgfHwgJycsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL21wbG9naWMvaW5kZXgnLCBzdWJEYXRhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvYWREYXRhJywgZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgICAgIHVzZXJuYW1lID0gJycsXHJcbiAgICAgICAgICAgICAgICBtcGluZm8gPSB7fSxcclxuICAgICAgICAgICAgICAgIHVucmVhZCA9ICcnLFxyXG4gICAgICAgICAgICAgICAgY291bnQgPSAwLFxyXG4gICAgICAgICAgICAgICAgbmV4dHRhc2sgPSAnJyxcclxuICAgICAgICAgICAgfSA9IGRhdGE7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdGVkTXBpbmZvID0gdGhpcy5mb3JtYXRlZE1wKG1waW5mbyk7XHJcbiAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmJ1c2luZXNzLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiB1c2VybmFtZSxcclxuICAgICAgICAgICAgICAgIG1pbmlQcm9ncmFtTmFtZTogbXBpbmZvLm5pY2tOYW1lIHx8ICfmgqjov5jmsqHotK3kubDlsI/nqIvluo8nLFxyXG4gICAgICAgICAgICAgICAgdW5yZWFkLFxyXG4gICAgICAgICAgICAgICAgbXBDb3VudDogY291bnQsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZm9ybWF0ZWRNcGluZm8sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBuZXh0dGFzayAmJiB0aGlzLnNldE5leHRUYXNrKG5leHR0YXNrKTtcclxuICAgICAgICAgICAgLy8gZGF0YS51c2VybmFtZSAmJiAodGhpcy5idXNpbmVzcy5uYW1lID0gZGF0YS51c2VybmFtZSk7XHJcbiAgICAgICAgICAgIC8vIGRhdGEubXBpbmZvICYmICh0aGlzLmJ1c2luZXNzLm1pbmlQcm9ncmFtTmFtZSA9IGRhdGEubXBpbmZvLm5pY2tOYW1lKTtcclxuICAgICAgICAgICAgLy8gZGF0YS51bnJlYWQgJiYgKHRoaXMuYnVzaW5lc3MudW5yZWFkID0gZGF0YS51bnJlYWQpO1xyXG4gICAgICAgICAgICAvLyBkYXRhLmNvdW50ICYmICh0aGlzLmJ1c2luZXNzLm1wQ291bnQgPSBkYXRhLmNvdW50KTtcclxuICAgICAgICAgICAgLy8gZGF0YS5tcGluZm8gJiYgKHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuaWQgPSBkYXRhLm1waW5mby5pZClcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoaXMuYnVzaW5lc3MnLCB0aGlzLmJ1c2luZXNzKTtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlJywgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2V0R2xvYmFsTXBJZCAoaWQpIHtcclxuICAgICAgICBpZiAoaWQpIHtcclxuICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygnY3VycmVudF9tcGlkJywgaWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIGNoZWNrQmVmb3JlSnVtcCAoaW5kZXgpIHtcclxuICAgIC8vICAgICBjb25zb2xlLmxvZygndGhpcy5idXNpbmVzcy5zZWxlY3RlZC4nLCB0aGlzLmJ1c2luZXNzLnNlbGVjdGVkKTtcclxuICAgIC8vICAgICBpZiAoIXRoaXMuYnVzaW5lc3MubXBDb3VudCkge1xyXG4gICAgLy8gICAgICAgICBhbGVydCgn5oKo6L+Y5pyq6LSt5Lmw5bCP56iL5bqP77yM6K+355m75b2VZS41OC5jb23ov5vooYzotK3kubAnLCAn5o+Q56S6Jyk7XHJcbiAgICAvLyAgICAgICAgIHJldHVybjtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgc3dpdGNoIChpbmRleCkge1xyXG4gICAgLy8gICAgICAgICBjYXNlIDA6XHJcbiAgICAvLyAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHVybDogJ215TXAnLFxyXG4gICAgLy8gICAgICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgICAgICAgICBicmVhaztcclxuICAgIC8vICAgICAgICAgY2FzZSAxOlxyXG4gICAgLy8gICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgIC8vICAgICAgICAgICAgICAgICB1cmw6ICdVcGxvYWRJbmZvJyxcclxuICAgIC8vICAgICAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgICAgIGNhc2UgMjpcclxuICAgIC8vICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdXJsOiAnT3JkZXJMaXN0JyxcclxuICAgIC8vICAgICAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgICAgIGNhc2UgMzpcclxuICAgIC8vICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdXJsOiAncHJvZ3Jlc3MnLFxyXG4gICAgLy8gICAgICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgICAgICAgICBicmVhaztcclxuICAgIC8vICAgICAgICAgY2FzZSA0OlxyXG4gICAgLy8gICAgICAgICAgICAgaWYgKHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuYXBwX3R5cGUgPT09IDEpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBhbGVydCgn5b2T5YmN5bCP56iL5bqP5Li65LyY5Lqr5bCP56iL5bqP77yM5LiN55So5o+Q5Lqk5rOo5YaM5L+h5oGvJywgJ+aPkOekuicpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgIGlmICh0aGlzLmJ1c2luZXNzLnNlbGVjdGVkLnNpZ24gPT09IDEpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB1cmw6ICdyZWdpc3RlZCcsXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3JlZ2lzdE1hcHBpZCcsIHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuaWQpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHVybDogJ3JlZ2lzdE1haW5BY2NvdW50JyxcclxuICAgIC8vICAgICAgICAgICAgICAgICB9KTtcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgLy8gICAgICAgICBjYXNlIDU6XHJcbiAgICAvLyAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHVybDogJ09wZW5QYXknLFxyXG4gICAgLy8gICAgICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgICAgICAgICBicmVhaztcclxuICAgIC8vICAgICAgICAgY2FzZSA2OlxyXG4gICAgLy8gICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgIC8vICAgICAgICAgICAgICAgICB1cmw6ICdmZWVkYmFjaycsXHJcbiAgICAvLyAgICAgICAgICAgICB9KTtcclxuICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgLy8gICAgICAgICBkZWZhdWx0OlxyXG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG4gICAgY2hlY2tCZWZvcmVKdW1wICh0ZXh0KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3RoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuJywgdGhpcy5idXNpbmVzcy5zZWxlY3RlZCk7XHJcbiAgICAgICAgaWYgKCF0aGlzLmJ1c2luZXNzLm1wQ291bnQpIHtcclxuICAgICAgICAgICAgYWxlcnQoJ+aCqOi/mOacqui0reS5sOWwj+eoi+W6j++8jOivt+eZu+W9lWUuNTguY29t6L+b6KGM6LSt5LmwJywgJ+aPkOekuicpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaCAodGV4dCkge1xyXG4gICAgICAgICAgICBjYXNlICfmiJHnmoTlsI/nqIvluo8nOlxyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICdteU1wJyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ+iuouWNleeuoeeQhic6XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJ09yZGVyTGlzdCcsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICfmlLbmrL7orrDlvZUnOlxyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICdwYXltZW50UmVjb3JkJyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ+aUr+S7mOW8gOmAmic6XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJ09wZW5QYXknLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAn5bqX6ZO66KOF5L+uJzpcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAndGVtcGxhdGVMaXN0JyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ+WPkeW4g+acjeWKoSc6XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJ29yZGVyQ29tcG9uZW50R3JvdXAnLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAn5LyY5oOg5Yq1JzpcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnY291cG9uTWFuYWdlJyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ+e0oOadkOeuoeeQhic6XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJ3Jlc291cmNlTWFuYWdlJyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ+i0reS5sOWwj+eoi+W6jyc6XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJ3B1cmNoYXNlJyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ+azqOWGjOWwj+eoi+W6jyc6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5idXNpbmVzcy5zZWxlY3RlZC5hcHBfdHlwZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCflvZPliY3lsI/nqIvluo/kuLrkvJjkuqvlsI/nqIvluo/vvIzkuI3nlKjmj5DkuqTms6jlhozkv6Hmga8nLCAn5o+Q56S6Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuc2lnbiA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ3JlZ2lzdGVkJyxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygncmVnaXN0TWFwcGlkJywgdGhpcy5idXNpbmVzcy5zZWxlY3RlZC5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAncmVnaXN0TWFpbkFjY291bnQnLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ+i/m+W6puafpeivoic6XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJ3Byb2dyZXNzJyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ+aEj+ingeWPjemmiCc6XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJ2ZlZWRiYWNrJyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAndGVtcGxhdGVMaXN0JyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzZXROZXh0VGFzayAodGFza051bSkge1xyXG4gICAgICAgIHRoaXMuYnVzaW5lc3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmJ1c2luZXNzLCB7XHJcbiAgICAgICAgICAgIG5leHR0YXNrOiB0YXNrTnVtLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHN3aXRjaCAodGFza051bSkge1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1c2luZXNzLnByb2dyZXNzVGV4dCA9ICflvZPliY3lsI/nqIvluo/mnKrmt7vliqDlsI/nqIvluo/kv6Hmga8nO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MucHJvZ3Jlc3NUZXh0ID0gJ+W9k+WJjeWwj+eoi+W6j+i/mOacquS4iuS8oOe0oOadkCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuYXBwX3R5cGUgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1c2luZXNzLnByb2dyZXNzVGV4dCA9ICflvZPliY3lsI/nqIvluo/kv6Hmga/lt7LlrozlloQnO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1c2luZXNzLnByb2dyZXNzVGV4dCA9ICflvZPliY3lsI/nqIvluo/ov5jmnKrloavlhpnms6jlhozkv6Hmga8nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTogLy8g6Lez6L2s5oiR55qE5bCP56iL5bqPXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5idXNpbmVzcy5zZWxlY3RlZC5hcHBfdHlwZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MucHJvZ3Jlc3NUZXh0ID0gJ+W9k+WJjeWwj+eoi+W6j+S/oeaBr+W3suWujOWWhCc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MucHJvZ3Jlc3NUZXh0ID0gJ+W9k+WJjeWwj+eoi+W6j+i/mOacquaOiOadgyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2OiAvLyDot7PovazliLDov5vluqZcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MucHJvZ3Jlc3NUZXh0ID0gJ+W9k+WJjeWwj+eoi+W6j+S/oeaBr+W3suWujOWWhCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA3OiAvLyDmtojmga/liJfooahcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MucHJvZ3Jlc3NUZXh0ID0gJ+W9k+WJjeWwj+eoi+W6j+S/oeaBr+W3suWujOWWhCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA4OiAvLyDmtojmga/liJfooahcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MucHJvZ3Jlc3NUZXh0ID0gJ+W9k+WJjeWwj+eoi+W6j+S/oeaBr+W3suWujOWWhCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA5OiAvLyDlrozmiJDluqZcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MucHJvZ3Jlc3NUZXh0ID0gJ+W9k+WJjeWwj+eoi+W6j+S/oeaBr+W3suWujOWWhCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
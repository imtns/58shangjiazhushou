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
        value: function onLoad() {
            this.loadExtJson();
        }
    }, {
        key: 'onShow',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.loadData();

                            case 2:
                                this.setGlobalMpId(this.business.selected.id);

                            case 3:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function onShow() {
                return _ref4.apply(this, arguments);
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
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var url, _ref6, data;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                url = '/mpBusinessRelease/getExtJson';
                                _context3.next = 3;
                                return (0, _ajax.get)(url, { sceneKey: wx.getStorageSync('current_mpid') });

                            case 3:
                                _ref6 = _context3.sent;
                                data = _ref6.data;

                                app.globalData.extConfig = data;
                                console.log(data);

                            case 7:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function loadExtJson() {
                return _ref5.apply(this, arguments);
            }

            return loadExtJson;
        }()
    }, {
        key: 'loadData',
        value: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var subData, _ref8, data, _data$username, username, _data$mpinfo, mpinfo, _data$unread, unread, _data$count, count, _data$nexttask, nexttask, formatedMpinfo;

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
                                _ref8 = _context4.sent;
                                data = _ref8.data;

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
                return _ref7.apply(this, arguments);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuanMiXSwibmFtZXMiOlsiYXBwIiwicmVxdWlyZSIsIkhvbWUiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGlzYWJsZVNjcm9sbCIsImRhdGEiLCJidXNpbmVzcyIsIm1wcyIsIm5hbWUiLCJtaW5pUHJvZ3JhbU5hbWUiLCJ1bnJlYWQiLCJtcENvdW50IiwicHJvZ3Jlc3NUZXh0IiwibmV4dHRhc2siLCJjaGFuZ2VNUCIsImNhbkNvbmZpcm0iLCJzZWxlY3RlZCIsImlkIiwiY2hvc2VkSWQiLCJpdGVtcyIsImljb25QYXRoIiwidGV4dCIsIm5JdGVtcyIsInRpdGxlIiwibWV0aG9kcyIsImxpbmsiLCJjb25zb2xlIiwibG9nIiwid2VweSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjaGVja0JlZm9yZUp1bXAiLCJjaGVja1Byb2dyZXNzIiwiYXBwX3R5cGUiLCJzZXRTdG9yYWdlU3luYyIsIiRhcHBseSIsImNoYW5nZUFjdGlvbiIsIk9iamVjdCIsImFzc2lnbiIsIm1waW5mb3MiLCJsZW5ndGgiLCJvdGhlcnMiLCJmaWx0ZXIiLCJhcHBpbmZvIiwiZm9ybWF0ZWRPdGhlciIsIm1hcCIsIml0ZW0iLCJmb3JtYXRlZE1wIiwiYmluZEhpZGVNYXNrIiwic2VsZWN0TXAiLCJjb25maXJtQWN0aW9uIiwic2V0R2xvYmFsTXBJZCIsImxvYWREYXRhIiwiaGlkZU1hc2siLCJsb2FkRXh0SnNvbiIsIm1wIiwiaGVhZEltZyIsImluZGV4T2YiLCJyZXMiLCJmcm9tIiwidGFyZ2V0IiwicGF0aCIsImltYWdlVXJsIiwic3VjY2VzcyIsImZhaWwiLCJlcnIiLCJzY2VuZUtleSIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJnbG9iYWxEYXRhIiwiZXh0Q29uZmlnIiwic3ViRGF0YSIsIm1waWQiLCJ1c2VybmFtZSIsIm1waW5mbyIsImNvdW50IiwiZm9ybWF0ZWRNcGluZm8iLCJuaWNrTmFtZSIsInNldE5leHRUYXNrIiwic2lnbiIsInRhc2tOdW0iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLE1BQU1DLFFBQVEscUJBQVIsQ0FBWjs7SUFFcUJDLEk7Ozs7Ozs7Ozs7Ozs7O3NMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QixJQURuQjtBQUVMQywyQkFBZTtBQUZWLFMsUUFJVEMsSSxHQUFPO0FBQ0hDLHNCQUFVO0FBQ05DLHFCQUFLLEVBREM7QUFFTkMsc0JBQU0sTUFGQTtBQUdOQyxpQ0FBaUIsVUFIWDtBQUlOQyx3QkFBUSxDQUpGO0FBS05DLHlCQUFTLENBTEg7QUFNTkMsOEJBQWMsV0FOUjtBQU9OQywwQkFBVSxDQVBKO0FBUU5DLDBCQUFVLEtBUko7QUFTTkMsNEJBQVksS0FUTjtBQVVOQywwQkFBVTtBQUNOQyx3QkFBSTtBQURFLGlCQVZKO0FBYU5DLDBCQUFVO0FBYkosYUFEUDtBQWdCSEMsbUJBQU8sQ0FDSDtBQUNJQywwQkFBVSxvRUFEZDtBQUVJQyxzQkFBTTtBQUZWLGFBREcsRUFJQTtBQUNDRCwwQkFBVSwyRUFEWDtBQUVDQyxzQkFBTTtBQUZQLGFBSkEsRUFPQTtBQUNDRCwwQkFBVSw2RUFEWDtBQUVDQyxzQkFBTTtBQUZQLGFBUEEsRUFVQTtBQUNDRCwwQkFBVSxzRUFEWDtBQUVDQyxzQkFBTTtBQUZQLGFBVkEsQ0FoQko7QUErQkhDLG9CQUFRLENBQ0o7QUFDSUMsdUJBQU8sTUFEWDtBQUVJSix1QkFBTyxDQUNIO0FBQ0lDLDhCQUFVLHdFQURkO0FBRUlDLDBCQUFNO0FBRlYsaUJBREcsRUFJQTtBQUNDRCw4QkFBVSw0RUFEWDtBQUVDQywwQkFBTTtBQUZQLGlCQUpBLEVBT0E7QUFDQ0QsOEJBQVUscUVBRFg7QUFFQ0MsMEJBQU07QUFGUCxpQkFQQSxFQVVBO0FBQ0NELDhCQUFVLDZFQURYO0FBRUNDLDBCQUFNO0FBRlAsaUJBVkE7QUFGWCxhQURJLEVBbUJKO0FBQ0lFLHVCQUFPLE1BRFg7QUFFSUosdUJBQU8sQ0FDSDtBQUNJQyw4QkFBVSxxRUFEZDtBQUVJQywwQkFBTTtBQUZWLGlCQURHLEVBSUE7QUFDQ0QsOEJBQVUsd0VBRFg7QUFFQ0MsMEJBQU07QUFGUCxpQkFKQSxFQU9BO0FBQ0NELDhCQUFVLDBFQURYO0FBRUNDLDBCQUFNO0FBRlAsaUJBUEEsRUFVQTtBQUNDRCw4QkFBVSwwRUFEWDtBQUVDQywwQkFBTTtBQUZQLGlCQVZBO0FBRlgsYUFuQkk7QUEvQkwsUyxRQXNFUEcsTyxHQUFVO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FDLGdCQVZNLGdCQVVESixJQVZDLEVBVUs7QUFDUEssd0JBQVFDLEdBQVIsQ0FBWU4sSUFBWjtBQUNBLG9CQUFJQSxTQUFTLE1BQWIsRUFBcUI7QUFDakJPLG1DQUFLQyxVQUFMLENBQWdCO0FBQ1pDLDZCQUFLO0FBRE8scUJBQWhCO0FBR0gsaUJBSkQsTUFJTyxJQUFJVCxTQUFTLE9BQWIsRUFBc0I7QUFDekI7QUFDQU8sbUNBQUtDLFVBQUwsQ0FBZ0I7QUFDWkMsNkJBQUs7QUFETyxxQkFBaEI7QUFHSCxpQkFMTSxNQUtBO0FBQ0gseUJBQUtDLGVBQUwsQ0FBcUJWLElBQXJCO0FBQ0g7QUFDSixhQXhCSztBQXlCTlcseUJBekJNLDJCQXlCVztBQUNiLG9CQUFJLENBQUMsS0FBSzFCLFFBQUwsQ0FBY0ssT0FBbkIsRUFBNEI7QUFDeEIsc0NBQU0sMEJBQU4sRUFBa0MsSUFBbEM7QUFDQTtBQUNIO0FBQ0Qsd0JBQVEsS0FBS0wsUUFBTCxDQUFjTyxRQUF0QjtBQUNJLHlCQUFLLENBQUw7QUFDSWUsdUNBQUtDLFVBQUwsQ0FBZ0I7QUFDWkMsaUNBQUs7QUFETyx5QkFBaEI7QUFHQTtBQUNKLHlCQUFLLENBQUw7QUFDSUYsdUNBQUtDLFVBQUwsQ0FBZ0I7QUFDWkMsaUNBQUs7QUFETyx5QkFBaEI7QUFHQTtBQUNKLHlCQUFLLENBQUw7QUFDSSw0QkFBSSxLQUFLeEIsUUFBTCxDQUFjVSxRQUFkLENBQXVCaUIsUUFBdkIsS0FBb0MsQ0FBeEMsRUFBMkM7QUFDdkNMLDJDQUFLTSxjQUFMLENBQW9CLGNBQXBCLEVBQW9DLEtBQUs1QixRQUFMLENBQWNVLFFBQWQsQ0FBdUJDLEVBQTNEO0FBQ0FXLDJDQUFLQyxVQUFMLENBQWdCO0FBQ1pDLHFDQUFLO0FBRE8sNkJBQWhCO0FBR0gseUJBTEQsTUFLTztBQUNIRiwyQ0FBS0MsVUFBTCxDQUFnQjtBQUNaQyxxQ0FBSztBQURPLDZCQUFoQjtBQUdIO0FBQ0Q7QUFDSix5QkFBSyxDQUFMO0FBQ0ksNEJBQUksS0FBS3hCLFFBQUwsQ0FBY1UsUUFBZCxDQUF1QmlCLFFBQXZCLEtBQW9DLENBQXhDLEVBQTJDO0FBQ3ZDTCwyQ0FBS0MsVUFBTCxDQUFnQjtBQUNaQyxxQ0FBSztBQURPLDZCQUFoQjtBQUdILHlCQUpELE1BSU87QUFDSEYsMkNBQUtDLFVBQUwsQ0FBZ0I7QUFDWkMscUNBQUs7QUFETyw2QkFBaEI7QUFHSDtBQUNEO0FBQ0oseUJBQUssQ0FBTDtBQUNJRix1Q0FBS0MsVUFBTCxDQUFnQjtBQUNaQyxpQ0FBSztBQURPLHlCQUFoQjtBQUdBO0FBQ0oseUJBQUssQ0FBTDtBQUNJRix1Q0FBS0MsVUFBTCxDQUFnQjtBQUNaQyxpQ0FBSztBQURPLHlCQUFoQjtBQUdBO0FBQ0oseUJBQUssQ0FBTDtBQUNJRix1Q0FBS0MsVUFBTCxDQUFnQjtBQUNaQyxpQ0FBSztBQURPLHlCQUFoQjtBQUdBO0FBQ0oseUJBQUssQ0FBTDtBQUNJRix1Q0FBS0MsVUFBTCxDQUFnQjtBQUNaQyxpQ0FBSztBQURPLHlCQUFoQjtBQUdBO0FBQ0o7QUFDSTtBQXZEUjtBQXlEQSxxQkFBS0ssTUFBTDtBQUNILGFBeEZLO0FBeUZBQyx3QkF6RkE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBMEZGLHlDQUFLOUIsUUFBTCxHQUFnQitCLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLEtBQUtoQyxRQUF2QixFQUFpQztBQUM3Q1Esa0RBQVU7QUFEbUMscUNBQWpDLENBQWhCO0FBMUZFO0FBQUEsMkNBNkZxQixnQkFBSyxtQkFBTCxDQTdGckI7O0FBQUE7QUFBQTtBQTZGTVQsd0NBN0ZOLFNBNkZNQSxJQTdGTjtBQThGTWtDLDJDQTlGTixHQThGa0JsQyxJQTlGbEIsQ0E4Rk1rQyxPQTlGTjs7QUErRkYseUNBQUtqQyxRQUFMLEdBQWdCK0IsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsS0FBS2hDLFFBQXZCLEVBQWlDO0FBQzdDQyw2Q0FBS2dDO0FBRHdDLHFDQUFqQyxDQUFoQjtBQUdBLHdDQUFJLEtBQUtqQyxRQUFMLENBQWNDLEdBQWQsQ0FBa0JpQyxNQUFsQixHQUEyQixDQUEvQixFQUFrQztBQUN4QkMsOENBRHdCLEdBQ2YsS0FBS25DLFFBQUwsQ0FBY0MsR0FBZCxDQUFrQm1DLE1BQWxCLENBQXlCLFVBQUNDLE9BQUQ7QUFBQSxtREFBYUEsUUFBUTFCLEVBQVIsS0FDakQsT0FBS1gsUUFBTCxDQUFjVSxRQUFkLENBQXVCQyxFQURhO0FBQUEseUNBQXpCLENBRGU7QUFHeEIyQixxREFId0IsR0FHUkgsT0FBT0ksR0FBUCxDQUFXLFVBQUNDLElBQUQ7QUFBQSxtREFBVSxPQUFLQyxVQUFMLENBQWdCRCxJQUFoQixDQUFWO0FBQUEseUNBQVgsQ0FIUTs7QUFJOUIsNkNBQUt4QyxRQUFMLEdBQWdCK0IsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsS0FBS2hDLFFBQXZCLEVBQWlDO0FBQzdDQyxpREFBS3FDLGFBRHdDO0FBRTdDMUIsc0RBQVUsQ0FGbUM7QUFHN0NILHdEQUFZO0FBSGlDLHlDQUFqQyxDQUFoQjtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBQ0QseUNBQUtvQixNQUFMO0FBQ0FULDRDQUFRQyxHQUFSLENBQVksbUJBQVosRUFBaUMsS0FBS3JCLFFBQUwsQ0FBY0MsR0FBL0M7O0FBbkhFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBcUhOeUMsd0JBckhNLDBCQXFIVTtBQUNaLHFCQUFLMUMsUUFBTCxHQUFnQitCLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLEtBQUtoQyxRQUF2QixFQUFpQztBQUM3Q1EsOEJBQVUsS0FEbUM7QUFFN0NDLGdDQUFZO0FBRmlDLGlCQUFqQyxDQUFoQjtBQUlBLHFCQUFLb0IsTUFBTDtBQUNILGFBM0hLO0FBNEhOYyxvQkE1SE0sb0JBNEhJSCxJQTVISixFQTRIVTtBQUNaLHFCQUFLeEMsUUFBTCxHQUFnQitCLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLEtBQUtoQyxRQUF2QixFQUFpQztBQUM3Q1ksOEJBQVU0QixLQUFLN0IsRUFEOEI7QUFFN0NGLGdDQUFZO0FBRmlDLGlCQUFqQyxDQUFoQjtBQUlBVyx3QkFBUUMsR0FBUixDQUFZLElBQVosRUFBa0IsS0FBS3JCLFFBQXZCO0FBQ0EscUJBQUs2QixNQUFMO0FBQ0gsYUFuSUs7QUFvSU5lLHlCQXBJTSwyQkFvSVc7QUFDYixvQkFBSSxLQUFLNUMsUUFBTCxDQUFjVSxRQUFkLENBQXVCQyxFQUEzQixFQUErQjtBQUMzQix5QkFBS2tDLGFBQUwsQ0FBbUIsS0FBSzdDLFFBQUwsQ0FBY1ksUUFBakM7QUFDQSx5QkFBS2tDLFFBQUw7QUFDQSx5QkFBS0MsUUFBTDtBQUNIO0FBQ0o7QUExSUssUzs7Ozs7bUNBNElFO0FBQ1IsaUJBQUsvQyxRQUFMLEdBQWdCK0IsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsS0FBS2hDLFFBQXZCLEVBQWlDO0FBQzdDUSwwQkFBVSxLQURtQztBQUU3Q0MsNEJBQVk7QUFGaUMsYUFBakMsQ0FBaEI7QUFJQSxpQkFBS29CLE1BQUw7QUFDSDs7O2lDQUNTO0FBQ04saUJBQUttQixXQUFMO0FBQ0g7Ozs7Ozs7Ozs7dUNBRVMsS0FBS0YsUUFBTCxFOzs7QUFDTixxQ0FBS0QsYUFBTCxDQUFtQixLQUFLN0MsUUFBTCxDQUFjVSxRQUFkLENBQXVCQyxFQUExQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O21DQUVRNkIsSSxFQUFNO0FBQ2QsZ0JBQU1TLEtBQUtULElBQVg7QUFDQSxnQkFBSVMsR0FBR0MsT0FBSCxJQUFjRCxHQUFHQyxPQUFILENBQVdDLE9BQVgsQ0FBbUIsTUFBbkIsTUFBK0IsQ0FBQyxDQUFsRCxFQUFxRDtBQUNqREYsbUJBQUdDLE9BQUgsaUNBQXlDRCxHQUFHQyxPQUE1QztBQUNIO0FBQ0QsbUJBQU9ELEVBQVA7QUFDSDtBQUNEOzs7Ozs7MENBR21CRyxHLEVBQUs7QUFDcEIsZ0JBQUlBLElBQUlDLElBQUosS0FBYSxRQUFqQixFQUEyQjtBQUN2QjtBQUNBakMsd0JBQVFDLEdBQVIsQ0FBWStCLElBQUlFLE1BQWhCO0FBQ0g7QUFDRCxtQkFBTztBQUNIckMsdUJBQU8sbUJBREo7QUFFSHNDLHNCQUFNLGFBRkg7QUFHSEMsMEJBQVUsK0RBSFA7QUFJSEMsdUJBSkcsbUJBSU0xRCxJQUpOLEVBSVk7QUFDWHFCLDRCQUFRQyxHQUFSLENBQVl0QixJQUFaO0FBQ0gsaUJBTkU7QUFPSDJELG9CQVBHLGdCQU9HQyxHQVBILEVBT1E7QUFDUHZDLDRCQUFRQyxHQUFSLENBQVlzQyxHQUFaO0FBQ0g7QUFURSxhQUFQO0FBV0g7Ozs7Ozs7Ozs7O0FBRVNuQyxtQyxHQUFNLCtCOzt1Q0FDVyxlQUFJQSxHQUFKLEVBQVMsRUFBRW9DLFVBQVVDLEdBQUdDLGNBQUgsQ0FBa0IsY0FBbEIsQ0FBWixFQUFULEM7Ozs7QUFBZi9ELG9DLFNBQUFBLEk7O0FBQ1JOLG9DQUFJc0UsVUFBSixDQUFlQyxTQUFmLEdBQTJCakUsSUFBM0I7QUFDQXFCLHdDQUFRQyxHQUFSLENBQVl0QixJQUFaOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJVWtFLHVDLEdBQVU7QUFDWkMsMENBQU01QyxlQUFLd0MsY0FBTCxDQUFvQixjQUFwQixLQUF1QztBQURqQyxpQzs7dUNBR08sZ0JBQUssZ0JBQUwsRUFBdUJHLE9BQXZCLEM7Ozs7QUFBZmxFLG9DLFNBQUFBLEk7O0FBQ1JxQix3Q0FBUUMsR0FBUixDQUFZLFVBQVosRUFBd0J0QixJQUF4QjtpREFPSUEsSSxDQUxBb0UsUSxFQUFBQSxRLGtDQUFXLEUsa0NBS1hwRSxJLENBSkFxRSxNLEVBQUFBLE0sZ0NBQVMsRSxnQ0FJVHJFLEksQ0FIQUssTSxFQUFBQSxNLGdDQUFTLEUsK0JBR1RMLEksQ0FGQXNFLEssRUFBQUEsSywrQkFBUSxDLGlDQUVSdEUsSSxDQURBUSxRLEVBQUFBLFEsa0NBQVcsRTtBQUVUK0QsOEMsR0FBaUIsS0FBSzdCLFVBQUwsQ0FBZ0IyQixNQUFoQixDOztBQUN2QixxQ0FBS3BFLFFBQUwsR0FBZ0IrQixPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQixLQUFLaEMsUUFBdkIsRUFBaUM7QUFDN0NFLDBDQUFNaUUsUUFEdUM7QUFFN0NoRSxxREFBaUJpRSxPQUFPRyxRQUFQLElBQW1CLFVBRlM7QUFHN0NuRSxrREFINkM7QUFJN0NDLDZDQUFTZ0UsS0FKb0M7QUFLN0MzRCw4Q0FBVTREO0FBTG1DLGlDQUFqQyxDQUFoQjtBQU9BL0QsNENBQVksS0FBS2lFLFdBQUwsQ0FBaUJqRSxRQUFqQixDQUFaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBYSx3Q0FBUUMsR0FBUixDQUFZLGVBQVosRUFBNkIsS0FBS3JCLFFBQWxDO0FBQ0EscUNBQUs2QixNQUFMOzs7Ozs7OztBQUVBVCx3Q0FBUUMsR0FBUixDQUFZLEdBQVo7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQ0FHT1YsRSxFQUFJO0FBQ2YsZ0JBQUlBLEVBQUosRUFBUTtBQUNKVywrQkFBS00sY0FBTCxDQUFvQixjQUFwQixFQUFvQ2pCLEVBQXBDO0FBQ0g7QUFDSjtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozt3Q0FDaUJJLEksRUFBTTtBQUNuQkssb0JBQVFDLEdBQVIsQ0FBWSx5QkFBWixFQUF1QyxLQUFLckIsUUFBTCxDQUFjVSxRQUFyRDtBQUNBLGdCQUFJLENBQUMsS0FBS1YsUUFBTCxDQUFjSyxPQUFuQixFQUE0QjtBQUN4QixrQ0FBTSwwQkFBTixFQUFrQyxJQUFsQztBQUNBO0FBQ0g7QUFDRCxvQkFBUVUsSUFBUjtBQUNJLHFCQUFLLE9BQUw7QUFDSU8sbUNBQUtDLFVBQUwsQ0FBZ0I7QUFDWkMsNkJBQUs7QUFETyxxQkFBaEI7QUFHQTtBQUNKLHFCQUFLLE1BQUw7QUFDSUYsbUNBQUtDLFVBQUwsQ0FBZ0I7QUFDWkMsNkJBQUs7QUFETyxxQkFBaEI7QUFHQTtBQUNKLHFCQUFLLE1BQUw7QUFDSUYsbUNBQUtDLFVBQUwsQ0FBZ0I7QUFDWkMsNkJBQUs7QUFETyxxQkFBaEI7QUFHQTtBQUNKLHFCQUFLLE1BQUw7QUFDSUYsbUNBQUtDLFVBQUwsQ0FBZ0I7QUFDWkMsNkJBQUs7QUFETyxxQkFBaEI7QUFHQTtBQUNKLHFCQUFLLE1BQUw7QUFDSUYsbUNBQUtDLFVBQUwsQ0FBZ0I7QUFDWkMsNkJBQUs7QUFETyxxQkFBaEI7QUFHQTtBQUNKLHFCQUFLLE1BQUw7QUFDSUYsbUNBQUtDLFVBQUwsQ0FBZ0I7QUFDWkMsNkJBQUs7QUFETyxxQkFBaEI7QUFHQTtBQUNKLHFCQUFLLEtBQUw7QUFDSUYsbUNBQUtDLFVBQUwsQ0FBZ0I7QUFDWkMsNkJBQUs7QUFETyxxQkFBaEI7QUFHQTtBQUNKLHFCQUFLLE1BQUw7QUFDSUYsbUNBQUtDLFVBQUwsQ0FBZ0I7QUFDWkMsNkJBQUs7QUFETyxxQkFBaEI7QUFHQTtBQUNKLHFCQUFLLE9BQUw7QUFDSUYsbUNBQUtDLFVBQUwsQ0FBZ0I7QUFDWkMsNkJBQUs7QUFETyxxQkFBaEI7QUFHQTtBQUNKLHFCQUFLLE9BQUw7QUFDSSx3QkFBSSxLQUFLeEIsUUFBTCxDQUFjVSxRQUFkLENBQXVCaUIsUUFBdkIsS0FBb0MsQ0FBeEMsRUFBMkM7QUFDdkMsMENBQU0sc0JBQU4sRUFBOEIsSUFBOUI7QUFDQTtBQUNIO0FBQ0Qsd0JBQUksS0FBSzNCLFFBQUwsQ0FBY1UsUUFBZCxDQUF1QitELElBQXZCLEtBQWdDLENBQXBDLEVBQXVDO0FBQ25DbkQsdUNBQUtDLFVBQUwsQ0FBZ0I7QUFDWkMsaUNBQUs7QUFETyx5QkFBaEI7QUFHSCxxQkFKRCxNQUlPO0FBQ0hGLHVDQUFLTSxjQUFMLENBQW9CLGNBQXBCLEVBQW9DLEtBQUs1QixRQUFMLENBQWNVLFFBQWQsQ0FBdUJDLEVBQTNEO0FBQ0FXLHVDQUFLQyxVQUFMLENBQWdCO0FBQ1pDLGlDQUFLO0FBRE8seUJBQWhCO0FBR0g7QUFDRDtBQUNKLHFCQUFLLE1BQUw7QUFDSUYsbUNBQUtDLFVBQUwsQ0FBZ0I7QUFDWkMsNkJBQUs7QUFETyxxQkFBaEI7QUFHQTtBQUNKLHFCQUFLLE1BQUw7QUFDSUYsbUNBQUtDLFVBQUwsQ0FBZ0I7QUFDWkMsNkJBQUs7QUFETyxxQkFBaEI7QUFHQTtBQUNKLHFCQUFLLENBQUw7QUFDSUYsbUNBQUtDLFVBQUwsQ0FBZ0I7QUFDWkMsNkJBQUs7QUFETyxxQkFBaEI7QUFHQTtBQUNKO0FBQ0k7QUE5RVI7QUFnRkg7OztvQ0FDWWtELE8sRUFBUztBQUNsQixpQkFBSzFFLFFBQUwsR0FBZ0IrQixPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQixLQUFLaEMsUUFBdkIsRUFBaUM7QUFDN0NPLDBCQUFVbUU7QUFEbUMsYUFBakMsQ0FBaEI7QUFHQSxvQkFBUUEsT0FBUjtBQUNJLHFCQUFLLENBQUw7QUFDSSx5QkFBSzFFLFFBQUwsQ0FBY00sWUFBZCxHQUE2QixlQUE3QjtBQUNBO0FBQ0oscUJBQUssQ0FBTDtBQUNJLHlCQUFLTixRQUFMLENBQWNNLFlBQWQsR0FBNkIsYUFBN0I7QUFDQTtBQUNKLHFCQUFLLENBQUw7QUFDSSx3QkFBSSxLQUFLTixRQUFMLENBQWNVLFFBQWQsQ0FBdUJpQixRQUF2QixLQUFvQyxDQUF4QyxFQUEyQztBQUN2Qyw2QkFBSzNCLFFBQUwsQ0FBY00sWUFBZCxHQUE2QixZQUE3QjtBQUNILHFCQUZELE1BRU87QUFDSCw2QkFBS04sUUFBTCxDQUFjTSxZQUFkLEdBQTZCLGVBQTdCO0FBQ0g7QUFDRDtBQUNKLHFCQUFLLENBQUw7QUFBUTtBQUNKLHdCQUFJLEtBQUtOLFFBQUwsQ0FBY1UsUUFBZCxDQUF1QmlCLFFBQXZCLEtBQW9DLENBQXhDLEVBQTJDO0FBQ3ZDLDZCQUFLM0IsUUFBTCxDQUFjTSxZQUFkLEdBQTZCLFlBQTdCO0FBQ0gscUJBRkQsTUFFTztBQUNILDZCQUFLTixRQUFMLENBQWNNLFlBQWQsR0FBNkIsV0FBN0I7QUFDSDtBQUNEO0FBQ0oscUJBQUssQ0FBTDtBQUFRO0FBQ0oseUJBQUtOLFFBQUwsQ0FBY00sWUFBZCxHQUE2QixZQUE3QjtBQUNBO0FBQ0oscUJBQUssQ0FBTDtBQUFRO0FBQ0oseUJBQUtOLFFBQUwsQ0FBY00sWUFBZCxHQUE2QixZQUE3QjtBQUNBO0FBQ0oscUJBQUssQ0FBTDtBQUFRO0FBQ0oseUJBQUtOLFFBQUwsQ0FBY00sWUFBZCxHQUE2QixZQUE3QjtBQUNBO0FBQ0oscUJBQUssQ0FBTDtBQUFRO0FBQ0oseUJBQUtOLFFBQUwsQ0FBY00sWUFBZCxHQUE2QixZQUE3QjtBQUNBO0FBQ0o7QUFDSTtBQWxDUjtBQW9DQSxpQkFBS3VCLE1BQUw7QUFDSDs7OztFQXRlNkJQLGVBQUtxRCxJOztrQkFBbEJoRixJIiwiZmlsZSI6ImhvbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHsgYWxlcnQgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBwb3N0LCBnZXQgfSBmcm9tICcuLi91dGlscy9hamF4JztcblxuY29uc3QgYXBwID0gcmVxdWlyZSgnLi4vdXRpbHMvZ2xvYmFsRGF0YScpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb21lIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfpppbpobUnLFxuICAgICAgICBkaXNhYmxlU2Nyb2xsOiB0cnVlLFxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgICBidXNpbmVzczoge1xuICAgICAgICAgICAgbXBzOiBbXSxcbiAgICAgICAgICAgIG5hbWU6ICfmgqjnmoTlp5PlkI0nLFxuICAgICAgICAgICAgbWluaVByb2dyYW1OYW1lOiAn5oKo6L+Y5rKh6LSt5Lmw5bCP56iL5bqPJyxcbiAgICAgICAgICAgIHVucmVhZDogMCxcbiAgICAgICAgICAgIG1wQ291bnQ6IDAsXG4gICAgICAgICAgICBwcm9ncmVzc1RleHQ6ICfmgqjov5jmsqHmnInotK3kubDlsI/nqIvluo8nLFxuICAgICAgICAgICAgbmV4dHRhc2s6IDAsXG4gICAgICAgICAgICBjaGFuZ2VNUDogZmFsc2UsXG4gICAgICAgICAgICBjYW5Db25maXJtOiBmYWxzZSxcbiAgICAgICAgICAgIHNlbGVjdGVkOiB7XG4gICAgICAgICAgICAgICAgaWQ6IDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hvc2VkSWQ6IDAsXG4gICAgICAgIH0sXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWNvblBhdGg6ICdodHRwczovL3N0YXRpYy41OC5jb20vbGJnL3NoYW5namlheGN4aHQvemh1c2hvdS9pbWcvaWNvbi1teS1tcC5wbmcnLFxuICAgICAgICAgICAgICAgIHRleHQ6ICfmiJHnmoTlsI/nqIvluo8nLFxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGljb25QYXRoOiAnaHR0cHM6Ly9zdGF0aWMuNTguY29tL2xiZy9zaGFuZ2ppYXhjeGh0L3podXNob3UvaW1nL2ljb24tb3JkZXItbWFuYWdlLnBuZycsXG4gICAgICAgICAgICAgICAgdGV4dDogJ+iuouWNleeuoeeQhicsXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWNvblBhdGg6ICdodHRwczovL3N0YXRpYy41OC5jb20vbGJnL3NoYW5namlheGN4aHQvemh1c2hvdS9pbWcvaWNvbi1wYXltZW50LXJlY29yZC5wbmcnLFxuICAgICAgICAgICAgICAgIHRleHQ6ICfmlLbmrL7orrDlvZUnLFxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGljb25QYXRoOiAnaHR0cHM6Ly9zdGF0aWMuNTguY29tL2xiZy9zaGFuZ2ppYXhjeGh0L3podXNob3UvaW1nL2ljb24tcGF5bWVudC5wbmcnLFxuICAgICAgICAgICAgICAgIHRleHQ6ICfmlK/ku5jlvIDpgJonLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgbkl0ZW1zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICflupfpk7rov5DokKUnLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb25QYXRoOiAnaHR0cHM6Ly9zdGF0aWMuNTguY29tL2xiZy9zaGFuZ2ppYXhjeGh0L3podXNob3UvaW1nL2ljb24tc3RvcmUtZml0LnBuZycsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn5bqX6ZO66KOF5L+uJyxcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWNvblBhdGg6ICdodHRwczovL3N0YXRpYy41OC5jb20vbGJnL3NoYW5namlheGN4aHQvemh1c2hvdS9pbWcvaWNvbi1vcmRlci1zZXJ2aWNlLnBuZycsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn5Y+R5biD5pyN5YqhJyxcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWNvblBhdGg6ICdodHRwczovL3N0YXRpYy41OC5jb20vbGJnL3NoYW5namlheGN4aHQvemh1c2hvdS9pbWcvaWNvbi1jb3Vwb24ucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICfkvJjmg6DlirUnLFxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uUGF0aDogJ2h0dHBzOi8vc3RhdGljLjU4LmNvbS9sYmcvc2hhbmdqaWF4Y3hodC96aHVzaG91L2ltZy9pY29uLXJlc29yY2UtbWFuYWdlLnBuZycsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn57Sg5p2Q566h55CGJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+W8gOW6l+W/heWBmicsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWNvblBhdGg6ICdodHRwczovL3N0YXRpYy41OC5jb20vbGJnL3NoYW5namlheGN4aHQvemh1c2hvdS9pbWcvaWNvbi1idXktbXAucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICfotK3kubDlsI/nqIvluo8nLFxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uUGF0aDogJ2h0dHBzOi8vc3RhdGljLjU4LmNvbS9sYmcvc2hhbmdqaWF4Y3hodC96aHVzaG91L2ltZy9pY29uLXJlZ2lzdC1tcC5wbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+azqOWGjOWwj+eoi+W6jycsXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb25QYXRoOiAnaHR0cHM6Ly9zdGF0aWMuNTguY29tL2xiZy9zaGFuZ2ppYXhjeGh0L3podXNob3UvaW1nL2ljb24tbXAtcHJvZ3Jlc3MucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICfov5vluqbmn6Xor6InLFxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uUGF0aDogJ2h0dHBzOi8vc3RhdGljLjU4LmNvbS9sYmcvc2hhbmdqaWF4Y3hodC96aHVzaG91L2ltZy9pY29uLWZlZWRiYWNrLW1wLnBuZycsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn5oSP6KeB5Y+N6aaIJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgLy8gbGluayAoaW5kZXgpIHtcbiAgICAgICAgLy8gICAgIGlmIChpbmRleCAhPT0gNikgeyAvLyAgIOaEj+ingeWPjemmiOS4jeWBmuWIpOaWrVxuICAgICAgICAvLyAgICAgICAgIHRoaXMuY2hlY2tCZWZvcmVKdW1wKGluZGV4KTtcbiAgICAgICAgLy8gICAgIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgLy8gICAgICAgICAgICAgdXJsOiAnZmVlZGJhY2snLFxuICAgICAgICAvLyAgICAgICAgIH0pO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9LFxuICAgICAgICBsaW5rKHRleHQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRleHQpO1xuICAgICAgICAgICAgaWYgKHRleHQgPT09ICfmhI/op4Hlj43ppognKSB7XG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnZmVlZGJhY2snLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0ZXh0ID09PSAn6LSt5Lmw5bCP56iL5bqPJykge1xuICAgICAgICAgICAgICAgIC8vIOi0reS5sOWwj+eoi+W6j+mhtemdolxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogJ3B1cmNoYXNlJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0JlZm9yZUp1bXAodGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNoZWNrUHJvZ3Jlc3MgKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmJ1c2luZXNzLm1wQ291bnQpIHtcbiAgICAgICAgICAgICAgICBhbGVydCgn5oKo6L+Y5pyq6LSt5Lmw5bCP56iL5bqP77yM6K+355m75b2VZS41OC5jb23ov5vooYzotK3kubAnLCAn5o+Q56S6Jyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmJ1c2luZXNzLm5leHR0YXNrKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnQXBwRWRpdCcsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdVcGxvYWRJbmZvJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuYXBwX3R5cGUgPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3JlZ2lzdE1hcHBpZCcsIHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdyZWdpc3RNYWluQWNjb3VudCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAncHJvZ3Jlc3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5idXNpbmVzcy5zZWxlY3RlZC5hcHBfdHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdwcm9ncmVzcycsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnbXlNcCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdwcm9ncmVzcycsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdwcm9ncmVzcycsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdwcm9ncmVzcycsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdwcm9ncmVzcycsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGFzeW5jIGNoYW5nZUFjdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmJ1c2luZXNzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5idXNpbmVzcywge1xuICAgICAgICAgICAgICAgIGNoYW5nZU1QOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9tcGxvZ2ljL215bXBsaXN0Jyk7XG4gICAgICAgICAgICBjb25zdCB7IG1waW5mb3MgfSA9IGRhdGE7XG4gICAgICAgICAgICB0aGlzLmJ1c2luZXNzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5idXNpbmVzcywge1xuICAgICAgICAgICAgICAgIG1wczogbXBpbmZvcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHRoaXMuYnVzaW5lc3MubXBzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvdGhlcnMgPSB0aGlzLmJ1c2luZXNzLm1wcy5maWx0ZXIoKGFwcGluZm8pID0+IGFwcGluZm8uaWQgIT09XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuaWQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1hdGVkT3RoZXIgPSBvdGhlcnMubWFwKChpdGVtKSA9PiB0aGlzLmZvcm1hdGVkTXAoaXRlbSkpO1xuICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmJ1c2luZXNzLCB7XG4gICAgICAgICAgICAgICAgICAgIG1wczogZm9ybWF0ZWRPdGhlcixcbiAgICAgICAgICAgICAgICAgICAgY2hvc2VkSWQ6IDAsXG4gICAgICAgICAgICAgICAgICAgIGNhbkNvbmZpcm06IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuYnVzaW5lc3MubXBzLm1hcCgoYXBwaW5mbywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYgKGFwcGluZm8uaWQgPT09IHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQuaWQpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuYnVzaW5lc3MubXBzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGlzLmJ1c2luZXNzLm1wcycsIHRoaXMuYnVzaW5lc3MubXBzKTtcbiAgICAgICAgfSxcbiAgICAgICAgYmluZEhpZGVNYXNrICgpIHtcbiAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmJ1c2luZXNzLCB7XG4gICAgICAgICAgICAgICAgY2hhbmdlTVA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNhbkNvbmZpcm06IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB9LFxuICAgICAgICBzZWxlY3RNcCAoaXRlbSkge1xuICAgICAgICAgICAgdGhpcy5idXNpbmVzcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYnVzaW5lc3MsIHtcbiAgICAgICAgICAgICAgICBjaG9zZWRJZDogaXRlbS5pZCxcbiAgICAgICAgICAgICAgICBjYW5Db25maXJtOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn54K55Ye7JywgdGhpcy5idXNpbmVzcyk7XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB9LFxuICAgICAgICBjb25maXJtQWN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmJ1c2luZXNzLnNlbGVjdGVkLmlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRHbG9iYWxNcElkKHRoaXMuYnVzaW5lc3MuY2hvc2VkSWQpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVNYXNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfVxuICAgIGhpZGVNYXNrICgpIHtcbiAgICAgICAgdGhpcy5idXNpbmVzcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYnVzaW5lc3MsIHtcbiAgICAgICAgICAgIGNoYW5nZU1QOiBmYWxzZSxcbiAgICAgICAgICAgIGNhbkNvbmZpcm06IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgdGhpcy5sb2FkRXh0SnNvbigpO1xuICAgIH1cbiAgICBhc3luYyBvblNob3cgKCkge1xuICAgICAgICBhd2FpdCB0aGlzLmxvYWREYXRhKCk7XG4gICAgICAgIHRoaXMuc2V0R2xvYmFsTXBJZCh0aGlzLmJ1c2luZXNzLnNlbGVjdGVkLmlkKTtcbiAgICB9XG4gICAgZm9ybWF0ZWRNcCAoaXRlbSkge1xuICAgICAgICBjb25zdCBtcCA9IGl0ZW07XG4gICAgICAgIGlmIChtcC5oZWFkSW1nICYmIG1wLmhlYWRJbWcuaW5kZXhPZignaHR0cCcpID09PSAtMSkge1xuICAgICAgICAgICAgbXAuaGVhZEltZyA9IGBodHRwczovL3BpYzEuNThjZG4uY29tLmNuJHttcC5oZWFkSW1nfWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1wO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDnlKjmiLfngrnlh7vlj7PkuIrop5LliIbkuqtcbiAgICAgKi9cbiAgICBvblNoYXJlQXBwTWVzc2FnZSAocmVzKSB7XG4gICAgICAgIGlmIChyZXMuZnJvbSA9PT0gJ2J1dHRvbicpIHtcbiAgICAgICAgICAgIC8vIOadpeiHqumhtemdouWGhei9rOWPkeaMiemSrlxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLnRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRpdGxlOiAn6auY5pWI566h55CG5ZWG5a625bCP56iL5bqP55qE5LiA56uZ5byP5pyN5Yqh5bel5YW3JyxcbiAgICAgICAgICAgIHBhdGg6ICcvcGFnZXMvaG9tZScsXG4gICAgICAgICAgICBpbWFnZVVybDogJ2h0dHBzOi8vc3RhdGljLjU4LmNvbS9sYmcvc2hhbmdqaWF4Y3hodC96aHVzaG91L2ltZy9zaGFyZS5wbmcnLFxuICAgICAgICAgICAgc3VjY2VzcyAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhaWwgKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH1cbiAgICBhc3luYyBsb2FkRXh0SnNvbigpIHtcbiAgICAgICAgY29uc3QgdXJsID0gJy9tcEJ1c2luZXNzUmVsZWFzZS9nZXRFeHRKc29uJztcbiAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBnZXQodXJsLCB7IHNjZW5lS2V5OiB3eC5nZXRTdG9yYWdlU3luYygnY3VycmVudF9tcGlkJykgfSk7XG4gICAgICAgIGFwcC5nbG9iYWxEYXRhLmV4dENvbmZpZyA9IGRhdGE7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIH1cbiAgICBhc3luYyBsb2FkRGF0YSAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBzdWJEYXRhID0ge1xuICAgICAgICAgICAgICAgIG1waWQ6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ2N1cnJlbnRfbXBpZCcpIHx8ICcnLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgcG9zdCgnL21wbG9naWMvaW5kZXgnLCBzdWJEYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsb2FkRGF0YScsIGRhdGEpO1xuICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgIHVzZXJuYW1lID0gJycsXG4gICAgICAgICAgICAgICAgbXBpbmZvID0ge30sXG4gICAgICAgICAgICAgICAgdW5yZWFkID0gJycsXG4gICAgICAgICAgICAgICAgY291bnQgPSAwLFxuICAgICAgICAgICAgICAgIG5leHR0YXNrID0gJycsXG4gICAgICAgICAgICB9ID0gZGF0YTtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdGVkTXBpbmZvID0gdGhpcy5mb3JtYXRlZE1wKG1waW5mbyk7XG4gICAgICAgICAgICB0aGlzLmJ1c2luZXNzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5idXNpbmVzcywge1xuICAgICAgICAgICAgICAgIG5hbWU6IHVzZXJuYW1lLFxuICAgICAgICAgICAgICAgIG1pbmlQcm9ncmFtTmFtZTogbXBpbmZvLm5pY2tOYW1lIHx8ICfmgqjov5jmsqHotK3kubDlsI/nqIvluo8nLFxuICAgICAgICAgICAgICAgIHVucmVhZCxcbiAgICAgICAgICAgICAgICBtcENvdW50OiBjb3VudCxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZm9ybWF0ZWRNcGluZm8sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG5leHR0YXNrICYmIHRoaXMuc2V0TmV4dFRhc2sobmV4dHRhc2spO1xuICAgICAgICAgICAgLy8gZGF0YS51c2VybmFtZSAmJiAodGhpcy5idXNpbmVzcy5uYW1lID0gZGF0YS51c2VybmFtZSk7XG4gICAgICAgICAgICAvLyBkYXRhLm1waW5mbyAmJiAodGhpcy5idXNpbmVzcy5taW5pUHJvZ3JhbU5hbWUgPSBkYXRhLm1waW5mby5uaWNrTmFtZSk7XG4gICAgICAgICAgICAvLyBkYXRhLnVucmVhZCAmJiAodGhpcy5idXNpbmVzcy51bnJlYWQgPSBkYXRhLnVucmVhZCk7XG4gICAgICAgICAgICAvLyBkYXRhLmNvdW50ICYmICh0aGlzLmJ1c2luZXNzLm1wQ291bnQgPSBkYXRhLmNvdW50KTtcbiAgICAgICAgICAgIC8vIGRhdGEubXBpbmZvICYmICh0aGlzLmJ1c2luZXNzLnNlbGVjdGVkLmlkID0gZGF0YS5tcGluZm8uaWQpXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGhpcy5idXNpbmVzcycsIHRoaXMuYnVzaW5lc3MpO1xuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2UnLCBlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXRHbG9iYWxNcElkIChpZCkge1xuICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ2N1cnJlbnRfbXBpZCcsIGlkKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBjaGVja0JlZm9yZUp1bXAgKGluZGV4KSB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCd0aGlzLmJ1c2luZXNzLnNlbGVjdGVkLicsIHRoaXMuYnVzaW5lc3Muc2VsZWN0ZWQpO1xuICAgIC8vICAgICBpZiAoIXRoaXMuYnVzaW5lc3MubXBDb3VudCkge1xuICAgIC8vICAgICAgICAgYWxlcnQoJ+aCqOi/mOacqui0reS5sOWwj+eoi+W6j++8jOivt+eZu+W9lWUuNTguY29t6L+b6KGM6LSt5LmwJywgJ+aPkOekuicpO1xuICAgIC8vICAgICAgICAgcmV0dXJuO1xuICAgIC8vICAgICB9XG4gICAgLy8gICAgIHN3aXRjaCAoaW5kZXgpIHtcbiAgICAvLyAgICAgICAgIGNhc2UgMDpcbiAgICAvLyAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgIC8vICAgICAgICAgICAgICAgICB1cmw6ICdteU1wJyxcbiAgICAvLyAgICAgICAgICAgICB9KTtcbiAgICAvLyAgICAgICAgICAgICBicmVhaztcbiAgICAvLyAgICAgICAgIGNhc2UgMTpcbiAgICAvLyAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgIC8vICAgICAgICAgICAgICAgICB1cmw6ICdVcGxvYWRJbmZvJyxcbiAgICAvLyAgICAgICAgICAgICB9KTtcbiAgICAvLyAgICAgICAgICAgICBicmVhaztcbiAgICAvLyAgICAgICAgIGNhc2UgMjpcbiAgICAvLyAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgIC8vICAgICAgICAgICAgICAgICB1cmw6ICdPcmRlckxpc3QnLFxuICAgIC8vICAgICAgICAgICAgIH0pO1xuICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xuICAgIC8vICAgICAgICAgY2FzZSAzOlxuICAgIC8vICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgLy8gICAgICAgICAgICAgICAgIHVybDogJ3Byb2dyZXNzJyxcbiAgICAvLyAgICAgICAgICAgICB9KTtcbiAgICAvLyAgICAgICAgICAgICBicmVhaztcbiAgICAvLyAgICAgICAgIGNhc2UgNDpcbiAgICAvLyAgICAgICAgICAgICBpZiAodGhpcy5idXNpbmVzcy5zZWxlY3RlZC5hcHBfdHlwZSA9PT0gMSkge1xuICAgIC8vICAgICAgICAgICAgICAgICBhbGVydCgn5b2T5YmN5bCP56iL5bqP5Li65LyY5Lqr5bCP56iL5bqP77yM5LiN55So5o+Q5Lqk5rOo5YaM5L+h5oGvJywgJ+aPkOekuicpO1xuICAgIC8vICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgLy8gICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgICAgIGlmICh0aGlzLmJ1c2luZXNzLnNlbGVjdGVkLnNpZ24gPT09IDEpIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHVybDogJ3JlZ2lzdGVkJyxcbiAgICAvLyAgICAgICAgICAgICAgICAgfSk7XG4gICAgLy8gICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygncmVnaXN0TWFwcGlkJywgdGhpcy5idXNpbmVzcy5zZWxlY3RlZC5pZCk7XG4gICAgLy8gICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB1cmw6ICdyZWdpc3RNYWluQWNjb3VudCcsXG4gICAgLy8gICAgICAgICAgICAgICAgIH0pO1xuICAgIC8vICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICAgICBicmVhaztcbiAgICAvLyAgICAgICAgIGNhc2UgNTpcbiAgICAvLyAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgIC8vICAgICAgICAgICAgICAgICB1cmw6ICdPcGVuUGF5JyxcbiAgICAvLyAgICAgICAgICAgICB9KTtcbiAgICAvLyAgICAgICAgICAgICBicmVhaztcbiAgICAvLyAgICAgICAgIGNhc2UgNjpcbiAgICAvLyAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgIC8vICAgICAgICAgICAgICAgICB1cmw6ICdmZWVkYmFjaycsXG4gICAgLy8gICAgICAgICAgICAgfSk7XG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XG4gICAgLy8gICAgICAgICBkZWZhdWx0OlxuICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuICAgIGNoZWNrQmVmb3JlSnVtcCAodGV4dCkge1xuICAgICAgICBjb25zb2xlLmxvZygndGhpcy5idXNpbmVzcy5zZWxlY3RlZC4nLCB0aGlzLmJ1c2luZXNzLnNlbGVjdGVkKTtcbiAgICAgICAgaWYgKCF0aGlzLmJ1c2luZXNzLm1wQ291bnQpIHtcbiAgICAgICAgICAgIGFsZXJ0KCfmgqjov5jmnKrotK3kubDlsI/nqIvluo/vvIzor7fnmbvlvZVlLjU4LmNvbei/m+ihjOi0reS5sCcsICfmj5DnpLonKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKHRleHQpIHtcbiAgICAgICAgICAgIGNhc2UgJ+aIkeeahOWwj+eoi+W6jyc6XG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnbXlNcCcsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICforqLljZXnrqHnkIYnOlxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogJ09yZGVyTGlzdCcsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICfmlLbmrL7orrDlvZUnOlxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogJ3BheW1lbnRSZWNvcmQnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAn5pSv5LuY5byA6YCaJzpcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgICB1cmw6ICdPcGVuUGF5JyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ+W6l+mTuuijheS/ric6XG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAndGVtcGxhdGVMaXN0JyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ+WPkeW4g+acjeWKoSc6XG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnb3JkZXJDb21wb25lbnRHcm91cCcsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICfkvJjmg6DlirUnOlxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogJ2NvdXBvbk1hbmFnZScsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICfntKDmnZDnrqHnkIYnOlxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogJ3Jlc291cmNlTWFuYWdlJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ+i0reS5sOWwj+eoi+W6jyc6XG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAncHVyY2hhc2UnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAn5rOo5YaM5bCP56iL5bqPJzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5idXNpbmVzcy5zZWxlY3RlZC5hcHBfdHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBhbGVydCgn5b2T5YmN5bCP56iL5bqP5Li65LyY5Lqr5bCP56iL5bqP77yM5LiN55So5o+Q5Lqk5rOo5YaM5L+h5oGvJywgJ+aPkOekuicpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJ1c2luZXNzLnNlbGVjdGVkLnNpZ24gPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ3JlZ2lzdGVkJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygncmVnaXN0TWFwcGlkJywgdGhpcy5idXNpbmVzcy5zZWxlY3RlZC5pZCk7XG4gICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdyZWdpc3RNYWluQWNjb3VudCcsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ+i/m+W6puafpeivoic6XG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAncHJvZ3Jlc3MnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAn5oSP6KeB5Y+N6aaIJzpcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgICB1cmw6ICdmZWVkYmFjaycsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAndGVtcGxhdGVMaXN0JyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0TmV4dFRhc2sgKHRhc2tOdW0pIHtcbiAgICAgICAgdGhpcy5idXNpbmVzcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYnVzaW5lc3MsIHtcbiAgICAgICAgICAgIG5leHR0YXNrOiB0YXNrTnVtLFxuICAgICAgICB9KTtcbiAgICAgICAgc3dpdGNoICh0YXNrTnVtKSB7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgdGhpcy5idXNpbmVzcy5wcm9ncmVzc1RleHQgPSAn5b2T5YmN5bCP56iL5bqP5pyq5re75Yqg5bCP56iL5bqP5L+h5oGvJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICB0aGlzLmJ1c2luZXNzLnByb2dyZXNzVGV4dCA9ICflvZPliY3lsI/nqIvluo/ov5jmnKrkuIrkvKDntKDmnZAnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJ1c2luZXNzLnNlbGVjdGVkLmFwcF90eXBlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MucHJvZ3Jlc3NUZXh0ID0gJ+W9k+WJjeWwj+eoi+W6j+S/oeaBr+W3suWujOWWhCc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXNpbmVzcy5wcm9ncmVzc1RleHQgPSAn5b2T5YmN5bCP56iL5bqP6L+Y5pyq5aGr5YaZ5rOo5YaM5L+h5oGvJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6IC8vIOi3s+i9rOaIkeeahOWwj+eoi+W6j1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJ1c2luZXNzLnNlbGVjdGVkLmFwcF90eXBlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MucHJvZ3Jlc3NUZXh0ID0gJ+W9k+WJjeWwj+eoi+W6j+S/oeaBr+W3suWujOWWhCc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXNpbmVzcy5wcm9ncmVzc1RleHQgPSAn5b2T5YmN5bCP56iL5bqP6L+Y5pyq5o6I5p2DJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDY6IC8vIOi3s+i9rOWIsOi/m+W6plxuICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MucHJvZ3Jlc3NUZXh0ID0gJ+W9k+WJjeWwj+eoi+W6j+S/oeaBr+W3suWujOWWhCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDc6IC8vIOa2iOaBr+WIl+ihqFxuICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MucHJvZ3Jlc3NUZXh0ID0gJ+W9k+WJjeWwj+eoi+W6j+S/oeaBr+W3suWujOWWhCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDg6IC8vIOa2iOaBr+WIl+ihqFxuICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MucHJvZ3Jlc3NUZXh0ID0gJ+W9k+WJjeWwj+eoi+W6j+S/oeaBr+W3suWujOWWhCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDk6IC8vIOWujOaIkOW6plxuICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3MucHJvZ3Jlc3NUZXh0ID0gJ+W9k+WJjeWwj+eoi+W6j+S/oeaBr+W3suWujOWWhCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxufVxuIl19
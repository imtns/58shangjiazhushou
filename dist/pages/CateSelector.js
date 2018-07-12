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

var CateSelector = function (_wepy$page) {
    _inherits(CateSelector, _wepy$page);

    function CateSelector() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, CateSelector);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CateSelector.__proto__ || Object.getPrototypeOf(CateSelector)).call.apply(_ref, [this].concat(args))), _this), _this.config = { navigationBarTitleText: '选择类目' }, _this.data = {
            columnNo: 1, // 选中的列宽度加大
            cateChooice: [{}, {}, {}], // 选中类别[cate1,cate2,cate3]
            cateRange: [[], [], []] // 三级类范围值[range1,range2,range3]
        }, _this.methods = {
            bindFirstCate: function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(item) {
                    var parentid, _ref3, _ref4, e, range2, _cateRange, range1;

                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    parentid = item.cateId;
                                    // 第一级选中，更新第二级范围值

                                    _context.next = 3;
                                    return this.getRangeById(this.mpId, parentid);

                                case 3:
                                    _ref3 = _context.sent;
                                    _ref4 = _slicedToArray(_ref3, 2);
                                    e = _ref4[0];
                                    range2 = _ref4[1];

                                    if (!e) {
                                        _context.next = 10;
                                        break;
                                    }

                                    (0, _utils.toast)(e);
                                    return _context.abrupt('return');

                                case 10:
                                    _cateRange = _slicedToArray(this.cateRange, 1), range1 = _cateRange[0];
                                    // 更新选中列

                                    this.columnNo = 1;
                                    // 第一级选中则第二级范围更新、第三级范围清空
                                    this.cateRange = [range1, range2, []];
                                    // 更新第一级选值并清空第二三级选值
                                    this.cateChooice = [item, [], []];
                                    this.$apply();

                                case 15:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));

                function bindFirstCate(_x) {
                    return _ref2.apply(this, arguments);
                }

                return bindFirstCate;
            }(),
            bindSecondCate: function () {
                var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(item) {
                    var parentid, _ref6, _ref7, e, range3, _cateChooice, chooice1;

                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    parentid = item.cateId;
                                    // 第二级选中则更新第三级范围值

                                    _context2.next = 3;
                                    return this.getRangeById(this.mpId, parentid);

                                case 3:
                                    _ref6 = _context2.sent;
                                    _ref7 = _slicedToArray(_ref6, 2);
                                    e = _ref7[0];
                                    range3 = _ref7[1];

                                    if (!e) {
                                        _context2.next = 10;
                                        break;
                                    }

                                    (0, _utils.toast)(e);
                                    return _context2.abrupt('return');

                                case 10:
                                    _cateChooice = _slicedToArray(this.cateChooice, 1), chooice1 = _cateChooice[0];
                                    // 更新选中列

                                    this.columnNo = 2;
                                    // 第二级选中则更新第三级范围
                                    this.cateRange.splice(2, 1, range3);
                                    // 更新第二级选值并清空第三级选值
                                    this.cateChooice = [chooice1, item, {}];
                                    this.$apply();
                                    this.cateRange[2] && this.cateRange[2].length === 0 && _wepy2.default.navigateBack();

                                case 16:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this);
                }));

                function bindSecondCate(_x2) {
                    return _ref5.apply(this, arguments);
                }

                return bindSecondCate;
            }(),
            bindThreeCate: function bindThreeCate(item) {
                // 更新选中列
                this.columnNo = 3;
                // 更新第三级选值
                this.cateChooice.splice(2, 1, item);
                this.$apply();
                _wepy2.default.navigateBack();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(CateSelector, [{
        key: 'onLoad',

        // 初始化选择范围
        value: function onLoad(options) {
            var mpId = _wepy2.default.getStorageSync('current_mpid');
            // 已选中的行业ID
            var _options$cate = options.cate1,
                cate1 = _options$cate === undefined ? '' : _options$cate,
                _options$cate2 = options.cate2,
                cate2 = _options$cate2 === undefined ? '' : _options$cate2,
                _options$cate3 = options.cate3,
                cate3 = _options$cate3 === undefined ? '' : _options$cate3;

            this.initData(mpId, [cate1, cate2, cate3]);
        }
        // 页面返回时把选择值存入全局

    }, {
        key: 'onUnload',
        value: function onUnload() {
            // 关闭选择类目同时存储选择值到全局
            this.$parent.globalData = Object.assign({}, this.$parent.globalData, { cateChooice: this.cateChooice });
        }
    }, {
        key: 'getRangeById',
        value: function getRangeById(mpId) {
            var parentid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

            return (0, _ajaxP.get)('/cate/dispcate/byparentid', { mpid: mpId, parentid: parentid });
        }
    }, {
        key: 'getCateById',
        value: function getCateById(item, cateId) {
            return '' + item.cateId === cateId;
        }
    }, {
        key: 'initData',
        value: function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(mpId, cateChooice) {
                var _this2 = this;

                var _ref9, _ref10, e, cate1Range, category1;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return this.getRangeById(mpId);

                            case 2:
                                _ref9 = _context4.sent;
                                _ref10 = _slicedToArray(_ref9, 2);
                                e = _ref10[0];
                                cate1Range = _ref10[1];

                                if (!e) {
                                    _context4.next = 9;
                                    break;
                                }

                                (0, _utils.toast)(e);
                                return _context4.abrupt('return');

                            case 9:
                                // 更新第一级范围数据
                                this.cateRange.splice(0, 1, cate1Range);
                                // 更新第一级选中值
                                // 如果选中值为空则取范围中第一条做默认值
                                category1 = cate1Range.find(function (item) {
                                    return '' + item.cateId === cateChooice[0];
                                }) || cate1Range[0];

                                this.cateChooice.splice(0, 1, category1);
                                cateChooice.splice(0, 1, category1.cateId);
                                // 通过父级选值子级范围数据
                                cateChooice.slice(0, 2).map(function () {
                                    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(parentId, index) {
                                        var subIndex, _ref12, _ref13, e1, range, tempCate;

                                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                            while (1) {
                                                switch (_context3.prev = _context3.next) {
                                                    case 0:
                                                        // CateChooice中子元素下标
                                                        subIndex = index + 1;
                                                        // 父级未选择中范围中则不能拉取下级范围
                                                        // parentId初始值为代表未选择，RD存的默认值

                                                        if (!(!parentId || parentId.toString() === '0')) {
                                                            _context3.next = 3;
                                                            break;
                                                        }

                                                        return _context3.abrupt('return');

                                                    case 3:
                                                        _context3.next = 5;
                                                        return _this2.getRangeById(mpId, parentId);

                                                    case 5:
                                                        _ref12 = _context3.sent;
                                                        _ref13 = _slicedToArray(_ref12, 2);
                                                        e1 = _ref13[0];
                                                        range = _ref13[1];

                                                        if (!e1) {
                                                            _context3.next = 12;
                                                            break;
                                                        }

                                                        (0, _utils.toast)(e1);
                                                        return _context3.abrupt('return');

                                                    case 12:
                                                        // 更新子级范围数据源
                                                        _this2.cateRange.splice(subIndex, 1, range);
                                                        // 子级范围是否有选中值
                                                        tempCate = range.find(function (item) {
                                                            return '' + item.cateId === cateChooice[subIndex];
                                                        }) || '';

                                                        tempCate && _this2.cateChooice.splice(subIndex, 1, tempCate);
                                                        _this2.$apply();

                                                    case 16:
                                                    case 'end':
                                                        return _context3.stop();
                                                }
                                            }
                                        }, _callee3, _this2);
                                    }));

                                    return function (_x6, _x7) {
                                        return _ref11.apply(this, arguments);
                                    };
                                }());
                                this.mpId = mpId;
                                this.$apply();

                            case 16:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function initData(_x4, _x5) {
                return _ref8.apply(this, arguments);
            }

            return initData;
        }()
    }]);

    return CateSelector;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(CateSelector , 'pages/CateSelector'));

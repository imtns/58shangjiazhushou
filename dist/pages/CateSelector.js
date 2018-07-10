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
            cateChooice: [], // 选中类别[cate1,cate2,cate3]
            cateRange: [[], [], []] // 三级类范围值
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

                                    this.cateRange = [range1, range2, []];
                                    this.cateChooice.splice(0, 1, item);
                                    this.$apply();

                                case 14:
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
                    var parentid, _ref6, _ref7, e, range3, _cateRange2, range1, range2;

                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    parentid = item.cateId;
                                    // 第二级选中，更新第三级范围值

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
                                    _cateRange2 = _slicedToArray(this.cateRange, 2), range1 = _cateRange2[0], range2 = _cateRange2[1];

                                    this.cateRange = [range1, range2, range3];
                                    this.cateChooice.splice(1, 1, item);
                                    this.$apply();

                                case 14:
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
                this.cateChooice.splice(2, 1, item);
                this.$apply();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(CateSelector, [{
        key: 'onLoad',
        value: function onLoad(options) {
            var mpId = options.mpid || _wepy2.default.getStorageSync('current_mpid');
            var _options$cate = options.cate1,
                cate1 = _options$cate === undefined ? '' : _options$cate,
                _options$cate2 = options.cate2,
                cate2 = _options$cate2 === undefined ? '' : _options$cate2,
                _options$cate3 = options.cate3,
                cate3 = _options$cate3 === undefined ? '' : _options$cate3;

            this.initData(mpId, [cate1, cate2, cate3]);
        }
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
        key: 'initData',
        value: function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(mpId, cateChooice) {
                var _this2 = this;

                var _cateChooice, _cateChooice$, cate1, _cateChooice$2, cate2, _ref9, _ref10, e, cate1Range;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _cateChooice = _slicedToArray(cateChooice, 2), _cateChooice$ = _cateChooice[0], cate1 = _cateChooice$ === undefined ? '' : _cateChooice$, _cateChooice$2 = _cateChooice[1], cate2 = _cateChooice$2 === undefined ? '' : _cateChooice$2;
                                // 每次必须拉取第一级范围值

                                _context4.next = 3;
                                return this.getRangeById(mpId || '940887130543091712');

                            case 3:
                                _ref9 = _context4.sent;
                                _ref10 = _slicedToArray(_ref9, 2);
                                e = _ref10[0];
                                cate1Range = _ref10[1];

                                if (!e) {
                                    _context4.next = 10;
                                    break;
                                }

                                (0, _utils.toast)(e);
                                return _context4.abrupt('return');

                            case 10:
                                this.cateRange = [cate1Range, [], []];
                                // 第二级和第三级范围值需要上一级范围选中
                                [cate1, cate2].map(function () {
                                    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(item, index) {
                                        var _ref12, _ref13, e1, range;

                                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                            while (1) {
                                                switch (_context3.prev = _context3.next) {
                                                    case 0:
                                                        if (item) {
                                                            _context3.next = 2;
                                                            break;
                                                        }

                                                        return _context3.abrupt('return');

                                                    case 2:
                                                        _context3.next = 4;
                                                        return _this2.getRangeById(mpId, item);

                                                    case 4:
                                                        _ref12 = _context3.sent;
                                                        _ref13 = _slicedToArray(_ref12, 2);
                                                        e1 = _ref13[0];
                                                        range = _ref13[1];

                                                        if (!e1) {
                                                            _context3.next = 11;
                                                            break;
                                                        }

                                                        (0, _utils.toast)(e1);
                                                        return _context3.abrupt('return');

                                                    case 11:
                                                        _this2.cateRange.splice(index + 1, 1, range);

                                                    case 12:
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

                            case 14:
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

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNhdGVTZWxlY3Rvci5qcyJdLCJuYW1lcyI6WyJDYXRlU2VsZWN0b3IiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImNvbHVtbk5vIiwiY2F0ZUNob29pY2UiLCJjYXRlUmFuZ2UiLCJtZXRob2RzIiwiYmluZEZpcnN0Q2F0ZSIsIml0ZW0iLCJwYXJlbnRpZCIsImNhdGVJZCIsImdldFJhbmdlQnlJZCIsIm1wSWQiLCJlIiwicmFuZ2UyIiwicmFuZ2UxIiwiJGFwcGx5IiwiYmluZFNlY29uZENhdGUiLCJyYW5nZTMiLCJjaG9vaWNlMSIsInNwbGljZSIsImxlbmd0aCIsIndlcHkiLCJuYXZpZ2F0ZUJhY2siLCJiaW5kVGhyZWVDYXRlIiwib3B0aW9ucyIsImdldFN0b3JhZ2VTeW5jIiwiY2F0ZTEiLCJjYXRlMiIsImNhdGUzIiwiaW5pdERhdGEiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsIk9iamVjdCIsImFzc2lnbiIsIm1waWQiLCJjYXRlMVJhbmdlIiwiY2F0ZWdvcnkxIiwiZmluZCIsInNsaWNlIiwibWFwIiwicGFyZW50SWQiLCJpbmRleCIsInN1YkluZGV4IiwidG9TdHJpbmciLCJlMSIsInJhbmdlIiwidGVtcENhdGUiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBR3FCQSxZOzs7Ozs7Ozs7Ozs7OztzTUFDakJDLE0sR0FBUyxFQUFFQyx3QkFBd0IsTUFBMUIsRSxRQUNUQyxJLEdBQU87QUFDSEMsc0JBQVUsQ0FEUCxFQUNVO0FBQ2JDLHlCQUFhLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxFQUFULENBRlYsRUFFd0I7QUFDM0JDLHVCQUFXLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxFQUFULENBSFIsQ0FHc0I7QUFIdEIsUyxRQUtQQyxPLEdBQVU7QUFDQUMseUJBREE7QUFBQSxxR0FDZUMsSUFEZjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFB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QWFBLFNBQVNHLFFBQVQsT0FBd0IsR0FMakI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTtBQUFBLCtEQU1FLE9BQUtqQyxZQUFMLENBQWtCQyxJQUFsQixFQUF3QjZCLFFBQXhCLENBTkY7O0FBQUE7QUFBQTtBQUFBO0FBTWpCSSwwREFOaUI7QUFNYkMsNkRBTmE7O0FBQUEsNkRBT3BCRCxFQVBvQjtBQUFBO0FBQUE7QUFBQTs7QUFRcEIsMEVBQU1BLEVBQU47QUFSb0I7O0FBQUE7QUFXeEI7QUFDQSwrREFBS3hDLFNBQUwsQ0FBZWUsTUFBZixDQUFzQnVCLFFBQXRCLEVBQWdDLENBQWhDLEVBQW1DRyxLQUFuQztBQUNBO0FBQ01DLGdFQWRrQixHQWNQRCxNQUFNUixJQUFOLENBQVc7QUFBQSxtRUFBUSxLQUFHOUIsS0FBS0UsTUFBUixLQUFxQk4sWUFBWXVDLFFBQVosQ0FBN0I7QUFBQSx5REFBWCxLQUFrRSxFQWQzRDs7QUFleEJJLG9FQUFZLE9BQUszQyxXQUFMLENBQWlCZ0IsTUFBakIsQ0FBd0J1QixRQUF4QixFQUFrQyxDQUFsQyxFQUFxQ0ksUUFBckMsQ0FBWjtBQUNBLCtEQUFLL0IsTUFBTDs7QUFoQndCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFDQUE1Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWtCQSxxQ0FBS0osSUFBTCxHQUFZQSxJQUFaO0FBQ0EscUNBQUtJLE1BQUw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFqSGtDTSxlQUFLMEIsSTs7a0JBQTFCakQsWSIsImZpbGUiOiJDYXRlU2VsZWN0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHsgdG9hc3QgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBnZXQgfSBmcm9tICcuLi91dGlscy9hamF4UCc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0ZVNlbGVjdG9yIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7IG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfpgInmi6nnsbvnm64nIH1cbiAgICBkYXRhID0ge1xuICAgICAgICBjb2x1bW5ObzogMSwgLy8g6YCJ5Lit55qE5YiX5a695bqm5Yqg5aSnXG4gICAgICAgIGNhdGVDaG9vaWNlOiBbe30sIHt9LCB7fV0sIC8vIOmAieS4reexu+WIq1tjYXRlMSxjYXRlMixjYXRlM11cbiAgICAgICAgY2F0ZVJhbmdlOiBbW10sIFtdLCBbXV0sIC8vIOS4iee6p+exu+iMg+WbtOWAvFtyYW5nZTEscmFuZ2UyLHJhbmdlM11cbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgYXN5bmMgYmluZEZpcnN0Q2F0ZSAoaXRlbSkge1xuICAgICAgICAgICAgY29uc3QgeyBjYXRlSWQ6IHBhcmVudGlkIH0gPSBpdGVtO1xuICAgICAgICAgICAgLy8g56ys5LiA57qn6YCJ5Lit77yM5pu05paw56ys5LqM57qn6IyD5Zu05YC8XG4gICAgICAgICAgICBjb25zdCBbZSwgcmFuZ2UyXSA9IGF3YWl0IHRoaXMuZ2V0UmFuZ2VCeUlkKHRoaXMubXBJZCwgcGFyZW50aWQpO1xuICAgICAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICAgICAgICB0b2FzdChlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBbcmFuZ2UxXSA9IHRoaXMuY2F0ZVJhbmdlO1xuICAgICAgICAgICAgLy8g5pu05paw6YCJ5Lit5YiXXG4gICAgICAgICAgICB0aGlzLmNvbHVtbk5vID0gMTtcbiAgICAgICAgICAgIC8vIOesrOS4gOe6p+mAieS4reWImeesrOS6jOe6p+iMg+WbtOabtOaWsOOAgeesrOS4iee6p+iMg+WbtOa4heepulxuICAgICAgICAgICAgdGhpcy5jYXRlUmFuZ2UgPSBbcmFuZ2UxLCByYW5nZTIsIFtdXTtcbiAgICAgICAgICAgIC8vIOabtOaWsOesrOS4gOe6p+mAieWAvOW5tua4heepuuesrOS6jOS4iee6p+mAieWAvFxuICAgICAgICAgICAgdGhpcy5jYXRlQ2hvb2ljZSA9IFtpdGVtLCBbXSwgW11dO1xuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfSxcbiAgICAgICAgYXN5bmMgYmluZFNlY29uZENhdGUgKGl0ZW0pIHtcbiAgICAgICAgICAgIGNvbnN0IHsgY2F0ZUlkOiBwYXJlbnRpZCB9ID0gaXRlbTtcbiAgICAgICAgICAgIC8vIOesrOS6jOe6p+mAieS4reWImeabtOaWsOesrOS4iee6p+iMg+WbtOWAvFxuICAgICAgICAgICAgY29uc3QgW2UsIHJhbmdlM10gPSBhd2FpdCB0aGlzLmdldFJhbmdlQnlJZCh0aGlzLm1wSWQsIHBhcmVudGlkKTtcbiAgICAgICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICAgICAgdG9hc3QoZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgW2Nob29pY2UxXSA9IHRoaXMuY2F0ZUNob29pY2U7XG4gICAgICAgICAgICAvLyDmm7TmlrDpgInkuK3liJdcbiAgICAgICAgICAgIHRoaXMuY29sdW1uTm8gPSAyO1xuICAgICAgICAgICAgLy8g56ys5LqM57qn6YCJ5Lit5YiZ5pu05paw56ys5LiJ57qn6IyD5Zu0XG4gICAgICAgICAgICB0aGlzLmNhdGVSYW5nZS5zcGxpY2UoMiwgMSwgcmFuZ2UzKTtcbiAgICAgICAgICAgIC8vIOabtOaWsOesrOS6jOe6p+mAieWAvOW5tua4heepuuesrOS4iee6p+mAieWAvFxuICAgICAgICAgICAgdGhpcy5jYXRlQ2hvb2ljZSA9IFtjaG9vaWNlMSwgaXRlbSwge31dO1xuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICAgIHRoaXMuY2F0ZVJhbmdlWzJdICYmIHRoaXMuY2F0ZVJhbmdlWzJdLmxlbmd0aCA9PT0gMCAmJiB3ZXB5Lm5hdmlnYXRlQmFjaygpO1xuICAgICAgICB9LFxuICAgICAgICBiaW5kVGhyZWVDYXRlIChpdGVtKSB7XG4gICAgICAgICAgICAvLyDmm7TmlrDpgInkuK3liJdcbiAgICAgICAgICAgIHRoaXMuY29sdW1uTm8gPSAzO1xuICAgICAgICAgICAgLy8g5pu05paw56ys5LiJ57qn6YCJ5YC8XG4gICAgICAgICAgICB0aGlzLmNhdGVDaG9vaWNlLnNwbGljZSgyLCAxLCBpdGVtKTtcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpO1xuICAgICAgICB9LFxuICAgIH1cbiAgICAvLyDliJ3lp4vljJbpgInmi6nojIPlm7RcbiAgICBvbkxvYWQgKG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgbXBJZCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ2N1cnJlbnRfbXBpZCcpO1xuICAgICAgICAvLyDlt7LpgInkuK3nmoTooYzkuJpJRFxuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBjYXRlMSA9ICcnLCBjYXRlMiA9ICcnLCBjYXRlMyA9ICcnLFxuICAgICAgICB9ID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy5pbml0RGF0YShtcElkLCBbXG4gICAgICAgICAgICBjYXRlMSxcbiAgICAgICAgICAgIGNhdGUyLFxuICAgICAgICAgICAgY2F0ZTMsXG4gICAgICAgIF0pO1xuICAgIH1cbiAgICAvLyDpobXpnaLov5Tlm57ml7bmiorpgInmi6nlgLzlrZjlhaXlhajlsYBcbiAgICBvblVubG9hZCAoKSB7XG4gICAgICAgIC8vIOWFs+mXremAieaLqeexu+ebruWQjOaXtuWtmOWCqOmAieaLqeWAvOWIsOWFqOWxgFxuICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YSA9IE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAgICB7fSwgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEsXG4gICAgICAgICAgICB7IGNhdGVDaG9vaWNlOiB0aGlzLmNhdGVDaG9vaWNlIH0sXG4gICAgICAgICk7XG4gICAgfVxuICAgIGdldFJhbmdlQnlJZCAobXBJZCwgcGFyZW50aWQgPSAnJykge1xuICAgICAgICByZXR1cm4gZ2V0KCcvY2F0ZS9kaXNwY2F0ZS9ieXBhcmVudGlkJywgeyBtcGlkOiBtcElkLCBwYXJlbnRpZCB9KTtcbiAgICB9XG4gICAgZ2V0Q2F0ZUJ5SWQgKGl0ZW0sIGNhdGVJZCkge1xuICAgICAgICByZXR1cm4gYCR7aXRlbS5jYXRlSWR9YCA9PT0gY2F0ZUlkO1xuICAgIH1cbiAgICBhc3luYyBpbml0RGF0YSAobXBJZCwgY2F0ZUNob29pY2UpIHtcbiAgICAgICAgLy8g5q+P5qyh5b+F6aG75ouJ5Y+W56ys5LiA57qn6IyD5Zu05pWw5o2uXG4gICAgICAgIGNvbnN0IFtlLCBjYXRlMVJhbmdlXSA9IGF3YWl0IHRoaXMuZ2V0UmFuZ2VCeUlkKG1wSWQpO1xuICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgdG9hc3QoZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8g5pu05paw56ys5LiA57qn6IyD5Zu05pWw5o2uXG4gICAgICAgIHRoaXMuY2F0ZVJhbmdlLnNwbGljZSgwLCAxLCBjYXRlMVJhbmdlKTtcbiAgICAgICAgLy8g5pu05paw56ys5LiA57qn6YCJ5Lit5YC8XG4gICAgICAgIC8vIOWmguaenOmAieS4reWAvOS4uuepuuWImeWPluiMg+WbtOS4reesrOS4gOadoeWBmum7mOiupOWAvFxuICAgICAgICBjb25zdCBjYXRlZ29yeTEgPSBjYXRlMVJhbmdlLmZpbmQoaXRlbSA9PiBgJHtpdGVtLmNhdGVJZH1gID09PSBjYXRlQ2hvb2ljZVswXSkgfHwgY2F0ZTFSYW5nZVswXTtcbiAgICAgICAgdGhpcy5jYXRlQ2hvb2ljZS5zcGxpY2UoMCwgMSwgY2F0ZWdvcnkxKTtcbiAgICAgICAgY2F0ZUNob29pY2Uuc3BsaWNlKDAsIDEsIGNhdGVnb3J5MS5jYXRlSWQpO1xuICAgICAgICAvLyDpgJrov4fniLbnuqfpgInlgLzlrZDnuqfojIPlm7TmlbDmja5cbiAgICAgICAgY2F0ZUNob29pY2Uuc2xpY2UoMCwgMikubWFwKGFzeW5jIChwYXJlbnRJZCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIC8vIENhdGVDaG9vaWNl5Lit5a2Q5YWD57Sg5LiL5qCHXG4gICAgICAgICAgICBjb25zdCBzdWJJbmRleCA9IGluZGV4ICsgMTtcbiAgICAgICAgICAgIC8vIOeItue6p+acqumAieaLqeS4reiMg+WbtOS4reWImeS4jeiDveaLieWPluS4i+e6p+iMg+WbtFxuICAgICAgICAgICAgLy8gcGFyZW50SWTliJ3lp4vlgLzkuLrku6PooajmnKrpgInmi6nvvIxSROWtmOeahOm7mOiupOWAvFxuICAgICAgICAgICAgaWYgKCFwYXJlbnRJZCB8fCBwYXJlbnRJZC50b1N0cmluZygpID09PSAnMCcpIHJldHVybjtcbiAgICAgICAgICAgIGNvbnN0IFtlMSwgcmFuZ2VdID0gYXdhaXQgdGhpcy5nZXRSYW5nZUJ5SWQobXBJZCwgcGFyZW50SWQpO1xuICAgICAgICAgICAgaWYgKGUxKSB7XG4gICAgICAgICAgICAgICAgdG9hc3QoZTEpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOabtOaWsOWtkOe6p+iMg+WbtOaVsOaNrua6kFxuICAgICAgICAgICAgdGhpcy5jYXRlUmFuZ2Uuc3BsaWNlKHN1YkluZGV4LCAxLCByYW5nZSk7XG4gICAgICAgICAgICAvLyDlrZDnuqfojIPlm7TmmK/lkKbmnInpgInkuK3lgLxcbiAgICAgICAgICAgIGNvbnN0IHRlbXBDYXRlID0gcmFuZ2UuZmluZChpdGVtID0+IGAke2l0ZW0uY2F0ZUlkfWAgPT09IGNhdGVDaG9vaWNlW3N1YkluZGV4XSkgfHwgJyc7XG4gICAgICAgICAgICB0ZW1wQ2F0ZSAmJiB0aGlzLmNhdGVDaG9vaWNlLnNwbGljZShzdWJJbmRleCwgMSwgdGVtcENhdGUpO1xuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubXBJZCA9IG1wSWQ7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxufVxuIl19
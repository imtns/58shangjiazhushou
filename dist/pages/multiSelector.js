'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _ajax = require('./../utils/ajax.js');

var _globalService = require('./../utils/globalService.js');

var _globalService2 = _interopRequireDefault(_globalService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var config = {
    region: {
        size: 3,
        apiList: ['/local/provinces', '/local/citys/', '/local/areas/'],
        // 格式化请求url的函数
        formatFunction: function formatFunction(index, priKey) {
            var curUrl = this.apiList[index];
            if (index === 0) {
                return curUrl;
            }

            return curUrl + priKey;
        },

        // 展示的名字
        showProp: 'localName',
        priKey: 'dispLocalID', // 需要传的id名,
        selectAction: function selectAction(item, colIndex) {
            var result = this.result;
            var dispLocalID = item.dispLocalID,
                localName = item.localName;

            if (!result) {
                result = {};
            }

            // 省
            if (colIndex === 0) {
                Object.assign(result, {
                    province: dispLocalID,
                    provinceStr: localName
                });
            }

            // 市
            if (colIndex === 1) {
                Object.assign(result, {
                    city: dispLocalID,
                    cityStr: localName
                });
            }

            // 区
            if (colIndex === 2) {
                Object.assign(result, {
                    area: dispLocalID,
                    areaStr: localName
                });
            }

            this.result = result;
        }
    },
    // 行业选择器
    trade: {
        size: 3,
        apiList: ['/cate/dispcate/byparentid', '/cate/dispcate/byparentid', '/cate/dispcate/byparentid'],
        formatFunction: function formatFunction(index) {
            var curUrl = this.apiList[index];

            return curUrl;
        },
        getData: function getData(index) {
            var priKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

            var mpid = _wepy2.default.getStorageSync('current_mpid');

            if (index === 0) {
                return {
                    mpid: mpid
                };
            }

            return {
                parentid: priKey
            };
        },

        priKey: 'cateId',
        showProp: 'name',
        selectAction: function selectAction(item, colIndex) {
            var result = this.result;
            var cateId = item.cateId,
                name = item.name;


            if (!result) {
                result = {};
            }

            if (colIndex === 0) {
                Object.assign(result, {
                    cate1: cateId,
                    cate1Name: name
                });
            }

            if (colIndex === 1) {
                Object.assign(result, {
                    cate2: cateId,
                    cate2Name: name
                });
            }

            if (colIndex === 2) {
                Object.assign(result, {
                    cate3: cateId,
                    cate3Name: name
                });
            }
        }
    }
};

var Index = function (_wepy$page) {
    _inherits(Index, _wepy$page);

    function Index() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Index);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '选择'
        }, _this.data = {
            size: 3,
            columnIds: [], // 标识当前列选择的id
            apiList: [], // 接口列表，与columnIds对应
            contentList: [], // 列表内容
            type: 'region',
            showProp: '',
            priKey: '',
            boldColumn: 0,
            result: {}
        }, _this.methods = {
            /**
             * colIndex 当前列
             * conIndex 当前选中的item
             */
            selectItem: function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(colIdx, conIdx) {
                    var colIndex, conIndex, column, content, priKey, _ref3, col, i;

                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    colIndex = +colIdx;
                                    conIndex = +conIdx;
                                    column = this.contentList[colIndex] || [];
                                    content = column[conIndex] || {};
                                    priKey = content[this.priKey];

                                    // 选中当前列
                                    // 将该操作赋在选中item的事件而不是column的事件，是因为存在点击的column空白部分的情况

                                    this.boldColumn = +colIdx + 1; // 突出显示下一列

                                    // 渲染背景色
                                    column.forEach(function (item) {
                                        var con = item;
                                        con.checked = false;
                                    });
                                    content.checked = true;

                                    this.selectAction && this.selectAction(content, colIndex);

                                    // 如果还不是最后一列，则展示下一列

                                    if (!(+colIndex < this.size - 1)) {
                                        _context.next = 19;
                                        break;
                                    }

                                    _context.next = 12;
                                    return _ajax.get.apply(undefined, _toConsumableArray(this.getHttpParams(colIndex + 1, priKey)));

                                case 12:
                                    _ref3 = _context.sent;
                                    col = _ref3.data;

                                    this.contentList[colIndex + 1] = col;

                                    // 如果没有子类了，就是最后一个
                                    if (!col || !col.length) {
                                        this.successAction();
                                    }

                                    // 重置之后的 i + 2列，因为i + 1列上面已经重置了
                                    for (i = colIndex + 2; i < this.size; i += 1) {
                                        this.contentList[i] = [];
                                    }
                                    _context.next = 20;
                                    break;

                                case 19:
                                    this.successAction();

                                case 20:

                                    this.$apply();

                                case 21:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));

                function selectItem(_x2, _x3) {
                    return _ref2.apply(this, arguments);
                }

                return selectItem;
            }()
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'successAction',
        value: function successAction() {
            _globalService2.default.set('multiSelector', this.result);
            console.log(this.result);
            setTimeout(function () {
                _wepy2.default.navigateBack();
            }, 300);
        }
    }, {
        key: 'getHttpParams',
        value: function getHttpParams(index, priKey) {
            return [this.getFormatUrl(index, priKey), this.getData && this.getData(index, priKey) || {}];
        }
    }, {
        key: 'onLoad',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(options) {
                var _options$type, type, i, _ref5, firstCol;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _options$type = options.type, type = _options$type === undefined ? 'region' : _options$type;

                                this.type = type;

                                // 初始化列表
                                for (i = 0; i < this.columnIds.length; i += 1) {
                                    this.contentList[i] = [];
                                }

                                this.loadConfig(config[type]);

                                // 渲染第一个列表，第一个列表总是要渲染的
                                _context2.next = 6;
                                return _ajax.get.apply(undefined, _toConsumableArray(this.getHttpParams(0)));

                            case 6:
                                _ref5 = _context2.sent;
                                firstCol = _ref5.data;

                                this.contentList[0] = firstCol;

                                this.$apply();

                            case 10:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function onLoad(_x4) {
                return _ref4.apply(this, arguments);
            }

            return onLoad;
        }()
    }, {
        key: 'loadConfig',
        value: function loadConfig(subConfig) {
            if (!subConfig) {
                return;
            }

            var apiList = subConfig.apiList,
                showProp = subConfig.showProp,
                priKey = subConfig.priKey,
                type = subConfig.type,
                size = subConfig.size,
                _subConfig$formatFunc = subConfig.formatFunction,
                formatFunction = _subConfig$formatFunc === undefined ? function () {} : _subConfig$formatFunc,
                _subConfig$selectActi = subConfig.selectAction,
                selectAction = _subConfig$selectActi === undefined ? function () {} : _subConfig$selectActi,
                _subConfig$getData = subConfig.getData,
                getData = _subConfig$getData === undefined ? function () {} : _subConfig$getData;


            Object.assign(this, {
                apiList: apiList,
                showProp: showProp,
                priKey: priKey,
                type: type,
                size: size,
                getFormatUrl: formatFunction.bind(this),
                selectAction: selectAction.bind(this),
                getData: getData.bind(this)
            });

            this.$apply();
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/multiSelector'));

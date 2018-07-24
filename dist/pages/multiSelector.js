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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm11bHRpU2VsZWN0b3IuanMiXSwibmFtZXMiOlsiY29uZmlnIiwicmVnaW9uIiwic2l6ZSIsImFwaUxpc3QiLCJmb3JtYXRGdW5jdGlvbiIsImluZGV4IiwicHJpS2V5IiwiY3VyVXJsIiwic2hvd1Byb3AiLCJzZWxlY3RBY3Rpb24iLCJpdGVtIiwiY29sSW5kZXgiLCJyZXN1bHQiLCJkaXNwTG9jYWxJRCIsImxvY2FsTmFtZSIsIk9iamVjdCIsImFzc2lnbiIsInByb3ZpbmNlIiwicHJvdmluY2VTdHIiLCJjaXR5IiwiY2l0eVN0ciIsImFyZWEiLCJhcmVhU3RyIiwidHJhZGUiLCJnZXREYXRhIiwibXBpZCIsIndlcHkiLCJnZXRTdG9yYWdlU3luYyIsInBhcmVudGlkIiwiY2F0ZUlkIiwibmFtZSIsImNhdGUxIiwiY2F0ZTFOYW1lIiwiY2F0ZTIiLCJjYXRlMk5hbWUiLCJjYXRlMyIsImNhdGUzTmFtZSIsIkluZGV4IiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJjb2x1bW5JZHMiLCJjb250ZW50TGlzdCIsInR5cGUiLCJib2xkQ29sdW1uIiwibWV0aG9kcyIsInNlbGVjdEl0ZW0iLCJjb2xJZHgiLCJjb25JZHgiLCJjb25JbmRleCIsImNvbHVtbiIsImNvbnRlbnQiLCJmb3JFYWNoIiwiY29uIiwiY2hlY2tlZCIsImdldCIsImdldEh0dHBQYXJhbXMiLCJjb2wiLCJsZW5ndGgiLCJzdWNjZXNzQWN0aW9uIiwiaSIsIiRhcHBseSIsImdsb2JhbFNlcnZpY2UiLCJzZXQiLCJjb25zb2xlIiwibG9nIiwic2V0VGltZW91dCIsIm5hdmlnYXRlQmFjayIsImdldEZvcm1hdFVybCIsIm9wdGlvbnMiLCJsb2FkQ29uZmlnIiwiZmlyc3RDb2wiLCJzdWJDb25maWciLCJiaW5kIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsU0FBUztBQUNYQyxZQUFRO0FBQ0pD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WUFaYztBQUFBLGdCQVlkQSxZQVpjLHlDQVlDLFlBQU0sQ0FBRSxDQVpUO0FBQUEscUNBY2Q4RCxTQWRjLENBYWQvQyxPQWJjO0FBQUEsZ0JBYWRBLE9BYmMsc0NBYUosWUFBTSxDQUFFLENBYko7OztBQWdCbEJULG1CQUFPQyxNQUFQLENBQWMsSUFBZCxFQUFvQjtBQUNoQmIsZ0NBRGdCO0FBRWhCSyxrQ0FGZ0I7QUFHaEJGLDhCQUhnQjtBQUloQm9DLDBCQUpnQjtBQUtoQnhDLDBCQUxnQjtBQU1oQmlFLDhCQUFjL0QsZUFBZW9FLElBQWYsQ0FBb0IsSUFBcEIsQ0FORTtBQU9oQi9ELDhCQUFjQSxhQUFhK0QsSUFBYixDQUFrQixJQUFsQixDQVBFO0FBUWhCaEQseUJBQVNBLFFBQVFnRCxJQUFSLENBQWEsSUFBYjtBQVJPLGFBQXBCOztBQVdBLGlCQUFLWixNQUFMO0FBQ0g7Ozs7RUE3SDhCbEMsZUFBSytDLEk7O2tCQUFuQnBDLEsiLCJmaWxlIjoibXVsdGlTZWxlY3Rvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgeyBnZXQgfSBmcm9tICcuLi91dGlscy9hamF4JztcbmltcG9ydCBnbG9iYWxTZXJ2aWNlIGZyb20gJy4uL3V0aWxzL2dsb2JhbFNlcnZpY2UnO1xuXG5jb25zdCBjb25maWcgPSB7XG4gICAgcmVnaW9uOiB7XG4gICAgICAgIHNpemU6IDMsXG4gICAgICAgIGFwaUxpc3Q6IFtcbiAgICAgICAgICAgICcvbG9jYWwvcHJvdmluY2VzJyxcbiAgICAgICAgICAgICcvbG9jYWwvY2l0eXMvJyxcbiAgICAgICAgICAgICcvbG9jYWwvYXJlYXMvJyxcbiAgICAgICAgXSxcbiAgICAgICAgLy8g5qC85byP5YyW6K+35rGCdXJs55qE5Ye95pWwXG4gICAgICAgIGZvcm1hdEZ1bmN0aW9uKGluZGV4LCBwcmlLZXkpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1clVybCA9IHRoaXMuYXBpTGlzdFtpbmRleF07XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VyVXJsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gY3VyVXJsICsgcHJpS2V5O1xuICAgICAgICB9LFxuICAgICAgICAvLyDlsZXnpLrnmoTlkI3lrZdcbiAgICAgICAgc2hvd1Byb3A6ICdsb2NhbE5hbWUnLFxuICAgICAgICBwcmlLZXk6ICdkaXNwTG9jYWxJRCcsIC8vIOmcgOimgeS8oOeahGlk5ZCNLFxuICAgICAgICBzZWxlY3RBY3Rpb24oaXRlbSwgY29sSW5kZXgpIHtcbiAgICAgICAgICAgIGxldCB7IHJlc3VsdCB9ID0gdGhpcztcbiAgICAgICAgICAgIGNvbnN0IHsgZGlzcExvY2FsSUQsIGxvY2FsTmFtZSB9ID0gaXRlbTtcbiAgICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0ge307XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIOecgVxuICAgICAgICAgICAgaWYgKGNvbEluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihyZXN1bHQsIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvdmluY2U6IGRpc3BMb2NhbElELFxuICAgICAgICAgICAgICAgICAgICBwcm92aW5jZVN0cjogbG9jYWxOYW1lLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyDluIJcbiAgICAgICAgICAgIGlmIChjb2xJbmRleCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ocmVzdWx0LCB7XG4gICAgICAgICAgICAgICAgICAgIGNpdHk6IGRpc3BMb2NhbElELFxuICAgICAgICAgICAgICAgICAgICBjaXR5U3RyOiBsb2NhbE5hbWUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIOWMulxuICAgICAgICAgICAgaWYgKGNvbEluZGV4ID09PSAyKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihyZXN1bHQsIHtcbiAgICAgICAgICAgICAgICAgICAgYXJlYTogZGlzcExvY2FsSUQsXG4gICAgICAgICAgICAgICAgICAgIGFyZWFTdHI6IGxvY2FsTmFtZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yZXN1bHQgPSByZXN1bHQ7XG4gICAgICAgIH0sXG4gICAgfSxcbiAgICAvLyDooYzkuJrpgInmi6nlmahcbiAgICB0cmFkZToge1xuICAgICAgICBzaXplOiAzLFxuICAgICAgICBhcGlMaXN0OiBbXG4gICAgICAgICAgICAnL2NhdGUvZGlzcGNhdGUvYnlwYXJlbnRpZCcsXG4gICAgICAgICAgICAnL2NhdGUvZGlzcGNhdGUvYnlwYXJlbnRpZCcsXG4gICAgICAgICAgICAnL2NhdGUvZGlzcGNhdGUvYnlwYXJlbnRpZCcsXG4gICAgICAgIF0sXG4gICAgICAgIGZvcm1hdEZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgICAgICBjb25zdCBjdXJVcmwgPSB0aGlzLmFwaUxpc3RbaW5kZXhdO1xuXG4gICAgICAgICAgICByZXR1cm4gY3VyVXJsO1xuICAgICAgICB9LFxuICAgICAgICBnZXREYXRhKGluZGV4LCBwcmlLZXkgPSAnJykge1xuICAgICAgICAgICAgY29uc3QgbXBpZCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ2N1cnJlbnRfbXBpZCcpO1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBtcGlkLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcGFyZW50aWQ6IHByaUtleSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIHByaUtleTogJ2NhdGVJZCcsXG4gICAgICAgIHNob3dQcm9wOiAnbmFtZScsXG4gICAgICAgIHNlbGVjdEFjdGlvbihpdGVtLCBjb2xJbmRleCkge1xuICAgICAgICAgICAgbGV0IHsgcmVzdWx0IH0gPSB0aGlzO1xuICAgICAgICAgICAgY29uc3QgeyBjYXRlSWQsIG5hbWUgfSA9IGl0ZW07XG5cbiAgICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0ge307XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjb2xJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ocmVzdWx0LCB7XG4gICAgICAgICAgICAgICAgICAgIGNhdGUxOiBjYXRlSWQsXG4gICAgICAgICAgICAgICAgICAgIGNhdGUxTmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNvbEluZGV4ID09PSAxKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihyZXN1bHQsIHtcbiAgICAgICAgICAgICAgICAgICAgY2F0ZTI6IGNhdGVJZCxcbiAgICAgICAgICAgICAgICAgICAgY2F0ZTJOYW1lOiBuYW1lLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY29sSW5kZXggPT09IDIpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHJlc3VsdCwge1xuICAgICAgICAgICAgICAgICAgICBjYXRlMzogY2F0ZUlkLFxuICAgICAgICAgICAgICAgICAgICBjYXRlM05hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfpgInmi6knLFxuICAgIH1cblxuICAgIGRhdGEgPSB7XG4gICAgICAgIHNpemU6IDMsXG4gICAgICAgIGNvbHVtbklkczogW10sIC8vIOagh+ivhuW9k+WJjeWIl+mAieaLqeeahGlkXG4gICAgICAgIGFwaUxpc3Q6IFtdLCAvLyDmjqXlj6PliJfooajvvIzkuI5jb2x1bW5JZHPlr7nlupRcbiAgICAgICAgY29udGVudExpc3Q6IFtdLCAvLyDliJfooajlhoXlrrlcbiAgICAgICAgdHlwZTogJ3JlZ2lvbicsXG4gICAgICAgIHNob3dQcm9wOiAnJyxcbiAgICAgICAgcHJpS2V5OiAnJyxcbiAgICAgICAgYm9sZENvbHVtbjogMCxcbiAgICAgICAgcmVzdWx0OiB7fSxcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgICAvKipcbiAgICAgICAgICogY29sSW5kZXgg5b2T5YmN5YiXXG4gICAgICAgICAqIGNvbkluZGV4IOW9k+WJjemAieS4reeahGl0ZW1cbiAgICAgICAgICovXG4gICAgICAgIGFzeW5jIHNlbGVjdEl0ZW0oY29sSWR4LCBjb25JZHgpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbEluZGV4ID0gK2NvbElkeDtcbiAgICAgICAgICAgIGNvbnN0IGNvbkluZGV4ID0gK2NvbklkeDtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMuY29udGVudExpc3RbY29sSW5kZXhdIHx8IFtdO1xuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IGNvbHVtbltjb25JbmRleF0gfHwge307XG4gICAgICAgICAgICBjb25zdCBwcmlLZXkgPSBjb250ZW50W3RoaXMucHJpS2V5XTtcblxuICAgICAgICAgICAgLy8g6YCJ5Lit5b2T5YmN5YiXXG4gICAgICAgICAgICAvLyDlsIbor6Xmk43kvZzotYvlnKjpgInkuK1pdGVt55qE5LqL5Lu26ICM5LiN5pivY29sdW1u55qE5LqL5Lu277yM5piv5Zug5Li65a2Y5Zyo54K55Ye755qEY29sdW1u56m655m96YOo5YiG55qE5oOF5Ya1XG4gICAgICAgICAgICB0aGlzLmJvbGRDb2x1bW4gPSAoK2NvbElkeCkgKyAxOyAvLyDnqoHlh7rmmL7npLrkuIvkuIDliJdcblxuICAgICAgICAgICAgLy8g5riy5p+T6IOM5pmv6ImyXG4gICAgICAgICAgICBjb2x1bW4uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb24gPSBpdGVtO1xuICAgICAgICAgICAgICAgIGNvbi5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnRlbnQuY2hlY2tlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0QWN0aW9uICYmIHRoaXMuc2VsZWN0QWN0aW9uKGNvbnRlbnQsIGNvbEluZGV4KTtcblxuICAgICAgICAgICAgLy8g5aaC5p6c6L+Y5LiN5piv5pyA5ZCO5LiA5YiX77yM5YiZ5bGV56S65LiL5LiA5YiXXG4gICAgICAgICAgICBpZiAoK2NvbEluZGV4IDwgdGhpcy5zaXplIC0gMSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YTogY29sIH0gPSBhd2FpdCBnZXQoLi4udGhpcy5nZXRIdHRwUGFyYW1zKGNvbEluZGV4ICsgMSwgcHJpS2V5KSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50TGlzdFtjb2xJbmRleCArIDFdID0gY29sO1xuXG4gICAgICAgICAgICAgICAgLy8g5aaC5p6c5rKh5pyJ5a2Q57G75LqG77yM5bCx5piv5pyA5ZCO5LiA5LiqXG4gICAgICAgICAgICAgICAgaWYgKCFjb2wgfHwgIWNvbC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWNjZXNzQWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8g6YeN572u5LmL5ZCO55qEIGkgKyAy5YiX77yM5Zug5Li6aSArIDHliJfkuIrpnaLlt7Lnu4/ph43nva7kuoZcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gY29sSW5kZXggKyAyOyBpIDwgdGhpcy5zaXplOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50TGlzdFtpXSA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWNjZXNzQWN0aW9uKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH0sXG4gICAgfVxuXG4gICAgc3VjY2Vzc0FjdGlvbigpIHtcbiAgICAgICAgZ2xvYmFsU2VydmljZS5zZXQoJ211bHRpU2VsZWN0b3InLCB0aGlzLnJlc3VsdCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVzdWx0KTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpO1xuICAgICAgICB9LCAzMDApO1xuICAgIH1cblxuICAgIGdldEh0dHBQYXJhbXMoaW5kZXgsIHByaUtleSkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgdGhpcy5nZXRGb3JtYXRVcmwoaW5kZXgsIHByaUtleSksXG4gICAgICAgICAgICAodGhpcy5nZXREYXRhICYmIHRoaXMuZ2V0RGF0YShpbmRleCwgcHJpS2V5KSkgfHwge30sXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgYXN5bmMgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgeyB0eXBlID0gJ3JlZ2lvbicgfSA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICAgICAgLy8g5Yid5aeL5YyW5YiX6KGoXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb2x1bW5JZHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudExpc3RbaV0gPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9hZENvbmZpZyhjb25maWdbdHlwZV0pO1xuXG4gICAgICAgIC8vIOa4suafk+esrOS4gOS4quWIl+ihqO+8jOesrOS4gOS4quWIl+ihqOaAu+aYr+imgea4suafk+eahFxuICAgICAgICBjb25zdCB7IGRhdGE6IGZpcnN0Q29sIH0gPSBhd2FpdCBnZXQoLi4udGhpcy5nZXRIdHRwUGFyYW1zKDApKTtcbiAgICAgICAgdGhpcy5jb250ZW50TGlzdFswXSA9IGZpcnN0Q29sO1xuXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuXG4gICAgbG9hZENvbmZpZyhzdWJDb25maWcpIHtcbiAgICAgICAgaWYgKCFzdWJDb25maWcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGFwaUxpc3QsXG4gICAgICAgICAgICBzaG93UHJvcCxcbiAgICAgICAgICAgIHByaUtleSxcbiAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICBzaXplLFxuICAgICAgICAgICAgZm9ybWF0RnVuY3Rpb24gPSAoKSA9PiB7fSxcbiAgICAgICAgICAgIHNlbGVjdEFjdGlvbiA9ICgpID0+IHt9LFxuICAgICAgICAgICAgZ2V0RGF0YSA9ICgpID0+IHt9LFxuICAgICAgICB9ID0gc3ViQ29uZmlnO1xuXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywge1xuICAgICAgICAgICAgYXBpTGlzdCxcbiAgICAgICAgICAgIHNob3dQcm9wLFxuICAgICAgICAgICAgcHJpS2V5LFxuICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgIHNpemUsXG4gICAgICAgICAgICBnZXRGb3JtYXRVcmw6IGZvcm1hdEZ1bmN0aW9uLmJpbmQodGhpcyksXG4gICAgICAgICAgICBzZWxlY3RBY3Rpb246IHNlbGVjdEFjdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgZ2V0RGF0YTogZ2V0RGF0YS5iaW5kKHRoaXMpLFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH1cbn1cbiJdfQ==
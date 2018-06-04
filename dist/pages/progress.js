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

var Index = function (_wepy$page) {
    _inherits(Index, _wepy$page);

    function Index() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Index);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            business: {
                current: {
                    expiryDate: '2018-29-23'
                }
            },
            progress: []
        }, _this.config = {
            navigationBarTitleText: '完成度'
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'onLoad',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return (0, _utils.sleep)();

                            case 2:
                                console.log('onLoad');

                            case 3:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function onLoad() {
                return _ref2.apply(this, arguments);
            }

            return onLoad;
        }()
    }, {
        key: 'onShow',
        value: function onShow() {
            this.loadData();
        }
    }, {
        key: 'loadData',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var subData, _ref4, data, mpInfo;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                subData = {
                                    mpid: _wepy2.default.getStorageSync('current_mpid') || ''
                                };

                                if (subData.mpid) {
                                    _context2.next = 4;
                                    break;
                                }

                                (0, _utils.alert)('无法获取当前小程序的appid', '提示');
                                return _context2.abrupt('return');

                            case 4:
                                _context2.next = 6;
                                return (0, _ajax.post)('/mplogic/pgdetail', subData);

                            case 6:
                                _ref4 = _context2.sent;
                                data = _ref4.data;
                                _context2.next = 10;
                                return (0, _ajax.post)('/mplogic/index', subData);

                            case 10:
                                mpInfo = _context2.sent;

                                this.business = Object.assign({}, this.business, {
                                    current: mpInfo.data.mpinfo
                                });
                                this.progress = data.map(function (item) {
                                    var myitem = item;
                                    if (myitem.successTime) {
                                        myitem.successTime = myitem.successTime.split(':')[0] + ':' + myitem.successTime.split(':')[1];
                                    }
                                    if (myitem.nodeType === 8 && myitem.status === 2) {
                                        myitem.content = '审核失败';
                                    } else if (myitem.nodeType === 8 && myitem.status === 1) {
                                        myitem.content = '审核成功';
                                    }
                                    return myitem;
                                });
                                this.$apply();

                            case 14:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function loadData() {
                return _ref3.apply(this, arguments);
            }

            return loadData;
        }()
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/progress'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2dyZXNzLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiZGF0YSIsImJ1c2luZXNzIiwiY3VycmVudCIsImV4cGlyeURhdGUiLCJwcm9ncmVzcyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb25zb2xlIiwibG9nIiwibG9hZERhdGEiLCJzdWJEYXRhIiwibXBpZCIsIndlcHkiLCJnZXRTdG9yYWdlU3luYyIsIm1wSW5mbyIsIk9iamVjdCIsImFzc2lnbiIsIm1waW5mbyIsIm1hcCIsIml0ZW0iLCJteWl0ZW0iLCJzdWNjZXNzVGltZSIsInNwbGl0Iiwibm9kZVR5cGUiLCJzdGF0dXMiLCJjb250ZW50IiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsSSxHQUFPO0FBQ0hDLHNCQUFVO0FBQ05DLHlCQUFTO0FBQ0xDLGdDQUFZO0FBRFA7QUFESCxhQURQO0FBTUhDLHNCQUFVO0FBTlAsUyxRQVFQQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFM7Ozs7Ozs7Ozs7Ozt1Q0FJQyxtQjs7O0FBQ05DLHdDQUFRQyxHQUFSLENBQVksUUFBWjs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lDQUVLO0FBQ0wsaUJBQUtDLFFBQUw7QUFDSDs7Ozs7Ozs7Ozs7QUFFU0MsdUMsR0FBVTtBQUNaQywwQ0FBTUMsZUFBS0MsY0FBTCxDQUFvQixjQUFwQixLQUF1QztBQURqQyxpQzs7b0NBR1hILFFBQVFDLEk7Ozs7O0FBQ1Qsa0RBQU0saUJBQU4sRUFBeUIsSUFBekI7Ozs7O3VDQUdtQixnQkFBSyxtQkFBTCxFQUEwQkQsT0FBMUIsQzs7OztBQUFmVixvQyxTQUFBQSxJOzt1Q0FDYSxnQkFBSyxnQkFBTCxFQUF1QlUsT0FBdkIsQzs7O0FBQWZJLHNDOztBQUNOLHFDQUFLYixRQUFMLEdBQWdCYyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQixLQUFLZixRQUF2QixFQUFpQztBQUM3Q0MsNkNBQVNZLE9BQU9kLElBQVAsQ0FBWWlCO0FBRHdCLGlDQUFqQyxDQUFoQjtBQUdBLHFDQUFLYixRQUFMLEdBQWdCSixLQUFLa0IsR0FBTCxDQUFTLFVBQUNDLElBQUQsRUFBVTtBQUMvQix3Q0FBTUMsU0FBU0QsSUFBZjtBQUNBLHdDQUFJQyxPQUFPQyxXQUFYLEVBQXdCO0FBQ3BCRCwrQ0FBT0MsV0FBUCxHQUF3QkQsT0FBT0MsV0FBUCxDQUFtQkMsS0FBbkIsQ0FBeUIsR0FBekIsRUFBOEIsQ0FBOUIsQ0FBeEIsU0FBNERGLE9BQU9DLFdBQVAsQ0FBbUJDLEtBQW5CLENBQXlCLEdBQXpCLEVBQThCLENBQTlCLENBQTVEO0FBQ0g7QUFDRCx3Q0FBSUYsT0FBT0csUUFBUCxLQUFvQixDQUFwQixJQUF5QkgsT0FBT0ksTUFBUCxLQUFrQixDQUEvQyxFQUFrRDtBQUM5Q0osK0NBQU9LLE9BQVAsR0FBaUIsTUFBakI7QUFDSCxxQ0FGRCxNQUVPLElBQUlMLE9BQU9HLFFBQVAsS0FBb0IsQ0FBcEIsSUFBeUJILE9BQU9JLE1BQVAsS0FBa0IsQ0FBL0MsRUFBa0Q7QUFDckRKLCtDQUFPSyxPQUFQLEdBQWlCLE1BQWpCO0FBQ0g7QUFDRCwyQ0FBT0wsTUFBUDtBQUNILGlDQVhlLENBQWhCO0FBWUEscUNBQUtNLE1BQUw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUE1QzJCZCxlQUFLZSxJOztrQkFBbkI1QixLIiwiZmlsZSI6InByb2dyZXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuaW1wb3J0IHsgc2xlZXAsIGFsZXJ0IH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgcG9zdCB9IGZyb20gJy4uL3V0aWxzL2FqYXgnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgZGF0YSA9IHtcbiAgICAgICAgYnVzaW5lc3M6IHtcbiAgICAgICAgICAgIGN1cnJlbnQ6IHtcbiAgICAgICAgICAgICAgICBleHBpcnlEYXRlOiAnMjAxOC0yOS0yMycsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBwcm9ncmVzczogW10sXG4gICAgfVxuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WujOaIkOW6picsXG4gICAgfVxuICAgIGFzeW5jIG9uTG9hZCgpIHtcbiAgICAgICAgYXdhaXQgc2xlZXAoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ29uTG9hZCcpO1xuICAgIH1cbiAgICBvblNob3coKSB7XG4gICAgICAgIHRoaXMubG9hZERhdGEoKTtcbiAgICB9XG4gICAgYXN5bmMgbG9hZERhdGEoKSB7XG4gICAgICAgIGNvbnN0IHN1YkRhdGEgPSB7XG4gICAgICAgICAgICBtcGlkOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdjdXJyZW50X21waWQnKSB8fCAnJyxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKCFzdWJEYXRhLm1waWQpIHtcbiAgICAgICAgICAgIGFsZXJ0KCfml6Dms5Xojrflj5blvZPliY3lsI/nqIvluo/nmoRhcHBpZCcsICfmj5DnpLonKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHBvc3QoJy9tcGxvZ2ljL3BnZGV0YWlsJywgc3ViRGF0YSk7XG4gICAgICAgIGNvbnN0IG1wSW5mbyA9IGF3YWl0IHBvc3QoJy9tcGxvZ2ljL2luZGV4Jywgc3ViRGF0YSk7XG4gICAgICAgIHRoaXMuYnVzaW5lc3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmJ1c2luZXNzLCB7XG4gICAgICAgICAgICBjdXJyZW50OiBtcEluZm8uZGF0YS5tcGluZm8sXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnByb2dyZXNzID0gZGF0YS5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG15aXRlbSA9IGl0ZW07XG4gICAgICAgICAgICBpZiAobXlpdGVtLnN1Y2Nlc3NUaW1lKSB7XG4gICAgICAgICAgICAgICAgbXlpdGVtLnN1Y2Nlc3NUaW1lID0gYCR7bXlpdGVtLnN1Y2Nlc3NUaW1lLnNwbGl0KCc6JylbMF19OiR7bXlpdGVtLnN1Y2Nlc3NUaW1lLnNwbGl0KCc6JylbMV19YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChteWl0ZW0ubm9kZVR5cGUgPT09IDggJiYgbXlpdGVtLnN0YXR1cyA9PT0gMikge1xuICAgICAgICAgICAgICAgIG15aXRlbS5jb250ZW50ID0gJ+WuoeaguOWksei0pSc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG15aXRlbS5ub2RlVHlwZSA9PT0gOCAmJiBteWl0ZW0uc3RhdHVzID09PSAxKSB7XG4gICAgICAgICAgICAgICAgbXlpdGVtLmNvbnRlbnQgPSAn5a6h5qC45oiQ5YqfJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBteWl0ZW07XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH1cbn1cbiJdfQ==
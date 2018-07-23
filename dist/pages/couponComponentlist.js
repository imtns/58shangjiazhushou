'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _utils = require('./../utils/index.js');

var _EmptyPage = require('./../components/EmptyPage.js');

var _EmptyPage2 = _interopRequireDefault(_EmptyPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CouponComponentlist = function (_wepy$page) {
    _inherits(CouponComponentlist, _wepy$page);

    function CouponComponentlist() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, CouponComponentlist);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CouponComponentlist.__proto__ || Object.getPrototypeOf(CouponComponentlist)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '优惠劵管理'
        }, _this.components = {
            EmptyPage: _EmptyPage2.default
        }, _this.data = {
            isEditing: false,
            listData: [],
            title: '没有优惠劵~',
            delList: []
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(CouponComponentlist, [{
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
        key: 'addcoupon',
        value: function addcoupon() {
            console.log('添加优惠劵页面');
        }
    }, {
        key: 'edit',
        value: function edit() {
            this.delList = [];
            this.isEditing = !this.isEditing;
            this.$apply();
        }
    }]);

    return CouponComponentlist;
}(_wepy2.default.page);

exports.default = CouponComponentlist;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdXBvbkNvbXBvbmVudGxpc3QuanMiXSwibmFtZXMiOlsiQ291cG9uQ29tcG9uZW50bGlzdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwiRW1wdHlQYWdlIiwiZGF0YSIsImlzRWRpdGluZyIsImxpc3REYXRhIiwidGl0bGUiLCJkZWxMaXN0IiwiY29uc29sZSIsImxvZyIsIiRhcHBseSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxtQjs7Ozs7Ozs7Ozs7Ozs7b05BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVEMsVSxHQUFhO0FBQ1RDO0FBRFMsUyxRQUdiQyxJLEdBQU87QUFDSEMsdUJBQVcsS0FEUjtBQUVIQyxzQkFBVSxFQUZQO0FBR0hDLG1CQUFPLFFBSEo7QUFJSEMscUJBQVM7QUFKTixTOzs7Ozs7Ozs7Ozs7dUNBT0csbUI7OztBQUNOQyx3Q0FBUUMsR0FBUixDQUFZLFFBQVo7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQ0FFUTtBQUNSRCxvQkFBUUMsR0FBUixDQUFZLFNBQVo7QUFDSDs7OytCQUNNO0FBQ0gsaUJBQUtGLE9BQUwsR0FBZSxFQUFmO0FBQ0EsaUJBQUtILFNBQUwsR0FBaUIsQ0FBQyxLQUFLQSxTQUF2QjtBQUNBLGlCQUFLTSxNQUFMO0FBQ0g7Ozs7RUF4QjRDQyxlQUFLQyxJOztrQkFBakNkLG1CIiwiZmlsZSI6ImNvdXBvbkNvbXBvbmVudGxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG5pbXBvcnQgeyBzbGVlcCB9IGZyb20gJy4uL3V0aWxzJztcclxuXHJcbmltcG9ydCBFbXB0eVBhZ2UgZnJvbSAnLi4vY29tcG9uZW50cy9FbXB0eVBhZ2UnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ291cG9uQ29tcG9uZW50bGlzdCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S8mOaDoOWKteeuoeeQhicsXHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRzID0ge1xyXG4gICAgICAgIEVtcHR5UGFnZSxcclxuICAgIH1cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgaXNFZGl0aW5nOiBmYWxzZSxcclxuICAgICAgICBsaXN0RGF0YTogW10sXHJcbiAgICAgICAgdGl0bGU6ICfmsqHmnInkvJjmg6DlirV+JyxcclxuICAgICAgICBkZWxMaXN0OiBbXSxcclxuICAgIH1cclxuICAgIGFzeW5jIG9uTG9hZCgpIHtcclxuICAgICAgICBhd2FpdCBzbGVlcCgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdvbkxvYWQnKTtcclxuICAgIH1cclxuICAgIGFkZGNvdXBvbigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygn5re75Yqg5LyY5oOg5Yq16aG16Z2iJyk7XHJcbiAgICB9XHJcbiAgICBlZGl0KCkge1xyXG4gICAgICAgIHRoaXMuZGVsTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuaXNFZGl0aW5nID0gIXRoaXMuaXNFZGl0aW5nO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICB9XHJcbn1cclxuIl19
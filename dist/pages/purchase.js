'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var webSrc = 'https://ordermobile.58.com/ordermobile/app/product/buyUpEnterpriseMiniApp?';

var RegistMainAccount = function (_wepy$page) {
    _inherits(RegistMainAccount, _wepy$page);

    function RegistMainAccount() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, RegistMainAccount);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RegistMainAccount.__proto__ || Object.getPrototypeOf(RegistMainAccount)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '注册'
        }, _this.data = {
            platform: '',
            src: ''
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(RegistMainAccount, [{
        key: 'onLoad',
        value: function onLoad() {
            var that = this;
            wx.getSystemInfo({
                success: function success(res) {
                    if (res.platform === 'devtools') {
                        that.platform = 'PC';
                    } else if (res.platform === 'ios') {
                        that.platform = 'ios';
                    } else if (res.platform === 'android') {
                        that.platform = 'android';
                    }
                    that.src = webSrc + 'productItemCode=861110090334300017&cityId=1&cateId=102&newSign=1&oldOrderId=1234&userId=45997341078028&source=58app&os=' + that.platform;
                }
            });
        }
    }]);

    return RegistMainAccount;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(RegistMainAccount , 'pages/purchase'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1cmNoYXNlLmpzIl0sIm5hbWVzIjpbIndlYlNyYyIsIlJlZ2lzdE1haW5BY2NvdW50IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJwbGF0Zm9ybSIsInNyYyIsInRoYXQiLCJ3eCIsImdldFN5c3RlbUluZm8iLCJzdWNjZXNzIiwicmVzIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFNBQVMsNEVBQWY7O0lBQ3FCQyxpQjs7Ozs7Ozs7Ozs7Ozs7Z05BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVEMsSSxHQUFPO0FBQ0hDLHNCQUFVLEVBRFA7QUFFSEMsaUJBQUs7QUFGRixTOzs7OztpQ0FJRTtBQUNMLGdCQUFNQyxPQUFPLElBQWI7QUFDQUMsZUFBR0MsYUFBSCxDQUFpQjtBQUNiQyx1QkFEYSxtQkFDTEMsR0FESyxFQUNBO0FBQ1Qsd0JBQUlBLElBQUlOLFFBQUosS0FBaUIsVUFBckIsRUFBaUM7QUFDN0JFLDZCQUFLRixRQUFMLEdBQWdCLElBQWhCO0FBQ0gscUJBRkQsTUFFTyxJQUFJTSxJQUFJTixRQUFKLEtBQWlCLEtBQXJCLEVBQTRCO0FBQy9CRSw2QkFBS0YsUUFBTCxHQUFnQixLQUFoQjtBQUNILHFCQUZNLE1BRUEsSUFBSU0sSUFBSU4sUUFBSixLQUFpQixTQUFyQixFQUFnQztBQUNuQ0UsNkJBQUtGLFFBQUwsR0FBZ0IsU0FBaEI7QUFDSDtBQUNERSx5QkFBS0QsR0FBTCxHQUFjTixNQUFkLCtIQUE4SU8sS0FBS0YsUUFBbko7QUFDSDtBQVZZLGFBQWpCO0FBYUg7Ozs7RUF2QjBDTyxlQUFLQyxJOztrQkFBL0JaLGlCIiwiZmlsZSI6InB1cmNoYXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5cclxuY29uc3Qgd2ViU3JjID0gJ2h0dHBzOi8vb3JkZXJtb2JpbGUuNTguY29tL29yZGVybW9iaWxlL2FwcC9wcm9kdWN0L2J1eVVwRW50ZXJwcmlzZU1pbmlBcHA/JztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVnaXN0TWFpbkFjY291bnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfms6jlhownLFxyXG4gICAgfVxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBwbGF0Zm9ybTogJycsXHJcbiAgICAgICAgc3JjOiAnJyxcclxuICAgIH1cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICB3eC5nZXRTeXN0ZW1JbmZvKHtcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMucGxhdGZvcm0gPT09ICdkZXZ0b29scycpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXRmb3JtID0gJ1BDJztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLnBsYXRmb3JtID09PSAnaW9zJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucGxhdGZvcm0gPSAnaW9zJztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLnBsYXRmb3JtID09PSAnYW5kcm9pZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXRmb3JtID0gJ2FuZHJvaWQnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhhdC5zcmMgPSBgJHt3ZWJTcmN9cHJvZHVjdEl0ZW1Db2RlPTg2MTExMDA5MDMzNDMwMDAxNyZjaXR5SWQ9MSZjYXRlSWQ9MTAyJm5ld1NpZ249MSZvbGRPcmRlcklkPTEyMzQmdXNlcklkPTQ1OTk3MzQxMDc4MDI4JnNvdXJjZT01OGFwcCZvcz0ke3RoYXQucGxhdGZvcm19YDtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19
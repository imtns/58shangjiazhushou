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

var UploadInfoSuccess = function (_wepy$page) {
    _inherits(UploadInfoSuccess, _wepy$page);

    function UploadInfoSuccess() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, UploadInfoSuccess);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = UploadInfoSuccess.__proto__ || Object.getPrototypeOf(UploadInfoSuccess)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '上传成功'
        }, _this.data = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(UploadInfoSuccess, [{
        key: 'onLoad',
        value: function onLoad() {}
    }]);

    return UploadInfoSuccess;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(UploadInfoSuccess , 'pages/UploadInfoSuccess'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlVwbG9hZEluZm9TdWNjZXNzLmpzIl0sIm5hbWVzIjpbIlVwbG9hZEluZm9TdWNjZXNzIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxpQjs7Ozs7Ozs7Ozs7Ozs7Z05BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVEMsSSxHQUFPLEU7Ozs7O2lDQUVHLENBRVQ7Ozs7RUFSMENDLGVBQUtDLEk7O2tCQUEvQkwsaUIiLCJmaWxlIjoiVXBsb2FkSW5mb1N1Y2Nlc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVcGxvYWRJbmZvU3VjY2VzcyBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S4iuS8oOaIkOWKnycsXHJcbiAgICB9XHJcbiAgICBkYXRhID0ge1xyXG4gICAgfVxyXG4gICAgb25Mb2FkICgpIHtcclxuXHJcbiAgICB9XHJcbn1cclxuIl19
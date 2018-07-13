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

var OrderComponentDetail = function (_wepy$page) {
    _inherits(OrderComponentDetail, _wepy$page);

    function OrderComponentDetail() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, OrderComponentDetail);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = OrderComponentDetail.__proto__ || Object.getPrototypeOf(OrderComponentDetail)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '预览详情'
        }, _this.data = {
            id: ''
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(OrderComponentDetail, [{
        key: 'onLoad',
        value: function onLoad(option) {
            var _option$id = option.id,
                id = _option$id === undefined ? '' : _option$id;

            this.id = id;
            this.$apply();
        }
    }]);

    return OrderComponentDetail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(OrderComponentDetail , 'pages/orderComponentDetail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyQ29tcG9uZW50RGV0YWlsLmpzIl0sIm5hbWVzIjpbIk9yZGVyQ29tcG9uZW50RGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJpZCIsIm9wdGlvbiIsIiRhcHBseSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLG9COzs7Ozs7Ozs7Ozs7OztzTkFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdUQyxJLEdBQU87QUFDSEMsZ0JBQUk7QUFERCxTOzs7OzsrQkFHQUMsTSxFQUFRO0FBQUEsNkJBQ1NBLE1BRFQsQ0FDSEQsRUFERztBQUFBLGdCQUNIQSxFQURHLDhCQUNFLEVBREY7O0FBRVgsaUJBQUtBLEVBQUwsR0FBVUEsRUFBVjtBQUNBLGlCQUFLRSxNQUFMO0FBQ0g7Ozs7RUFYNkNDLGVBQUtDLEk7O2tCQUFsQ1Isb0IiLCJmaWxlIjoib3JkZXJDb21wb25lbnREZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlckNvbXBvbmVudERldGFpbCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+mihOiniOivpuaDhScsXHJcbiAgICB9XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGlkOiAnJyxcclxuICAgIH1cclxuICAgIG9uTG9hZChvcHRpb24pIHtcclxuICAgICAgICBjb25zdCB7IGlkID0gJycgfSA9IG9wdGlvbjtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgIH1cclxufVxyXG4iXX0=
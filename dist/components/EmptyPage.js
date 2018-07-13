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

var EmptyPage = function (_wepy$component) {
    _inherits(EmptyPage, _wepy$component);

    function EmptyPage() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, EmptyPage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EmptyPage.__proto__ || Object.getPrototypeOf(EmptyPage)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            title: ''
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(EmptyPage, [{
        key: 'onLoad',
        value: function onLoad() {
            console.log('onLoad');
            this.title = this.$parent.title;
        }
    }]);

    return EmptyPage;
}(_wepy2.default.component);

exports.default = EmptyPage;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkVtcHR5UGFnZS5qcyJdLCJuYW1lcyI6WyJFbXB0eVBhZ2UiLCJkYXRhIiwidGl0bGUiLCJjb25zb2xlIiwibG9nIiwiJHBhcmVudCIsIndlcHkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsUzs7Ozs7Ozs7Ozs7Ozs7Z01BS2pCQyxJLEdBQU87QUFDSEMsbUJBQU87QUFESixTOzs7OztpQ0FKRTtBQUNMQyxvQkFBUUMsR0FBUixDQUFZLFFBQVo7QUFDQSxpQkFBS0YsS0FBTCxHQUFhLEtBQUtHLE9BQUwsQ0FBYUgsS0FBMUI7QUFDSDs7OztFQUprQ0ksZUFBS0MsUzs7a0JBQXZCUCxTIiwiZmlsZSI6IkVtcHR5UGFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVtcHR5UGFnZSBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnb25Mb2FkJyk7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRoaXMuJHBhcmVudC50aXRsZTtcclxuICAgIH1cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgdGl0bGU6ICcnLFxyXG4gICAgfVxyXG59XHJcbiJdfQ==
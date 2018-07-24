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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // mixins/test.js


var Mixin = function (_wepy$mixin) {
    _inherits(Mixin, _wepy$mixin);

    function Mixin() {
        _classCallCheck(this, Mixin);

        return _possibleConstructorReturn(this, (Mixin.__proto__ || Object.getPrototypeOf(Mixin)).apply(this, arguments));
    }

    _createClass(Mixin, [{
        key: 'errorHandler',
        value: function errorHandler(e) {
            console.log(e);
        }
    }]);

    return Mixin;
}(_wepy2.default.mixin);

exports.default = Mixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIk1peGluIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJ3ZXB5IiwibWl4aW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBREE7OztJQUdxQkEsSzs7Ozs7Ozs7Ozs7cUNBQ0pDLEMsRUFBRztBQUNaQyxvQkFBUUMsR0FBUixDQUFZRixDQUFaO0FBQ0g7Ozs7RUFIOEJHLGVBQUtDLEs7O2tCQUFuQkwsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIG1peGlucy90ZXN0LmpzXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWl4aW4gZXh0ZW5kcyB3ZXB5Lm1peGluIHtcbiAgICBlcnJvckhhbmRsZXIoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9XG59XG4iXX0=
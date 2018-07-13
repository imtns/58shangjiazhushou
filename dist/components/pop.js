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

var Pop = function (_wepy$component) {
    _inherits(Pop, _wepy$component);

    function Pop() {
        _classCallCheck(this, Pop);

        return _possibleConstructorReturn(this, (Pop.__proto__ || Object.getPrototypeOf(Pop)).apply(this, arguments));
    }

    _createClass(Pop, [{
        key: 'onLoad',
        value: function onLoad() {
            console.log('onLoad');
        }
    }]);

    return Pop;
}(_wepy2.default.component);

exports.default = Pop;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBvcC5qcyJdLCJuYW1lcyI6WyJQb3AiLCJjb25zb2xlIiwibG9nIiwid2VweSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxHOzs7Ozs7Ozs7OztpQ0FDUjtBQUNMQyxvQkFBUUMsR0FBUixDQUFZLFFBQVo7QUFDSDs7OztFQUg0QkMsZUFBS0MsUzs7a0JBQWpCSixHIiwiZmlsZSI6IlBvcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnb25Mb2FkJyk7XHJcbiAgICB9XHJcbn1cclxuIl19
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

var FeedbackDetail = function (_wepy$page) {
    _inherits(FeedbackDetail, _wepy$page);

    function FeedbackDetail() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, FeedbackDetail);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FeedbackDetail.__proto__ || Object.getPrototypeOf(FeedbackDetail)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '优享小程序介绍'
        }, _this.data = {
            type: '',
            text: ''
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(FeedbackDetail, [{
        key: 'onLoad',
        value: function onLoad(option) {
            console.log('onLoad');
            var type = option.type;

            this.text = type === '1' ? '优享' : '微信';
            this.type = type;
            _wepy2.default.setNavigationBarTitle({
                title: this.text + '\u5C0F\u7A0B\u5E8F\u4ECB\u7ECD'
            });
            this.$apply();
        }
    }]);

    return FeedbackDetail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(FeedbackDetail , 'pages/feedbackDetail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlZWRiYWNrRGV0YWlsLmpzIl0sIm5hbWVzIjpbIkZlZWRiYWNrRGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0eXBlIiwidGV4dCIsIm9wdGlvbiIsImNvbnNvbGUiLCJsb2ciLCJ3ZXB5Iiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwidGl0bGUiLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLGM7Ozs7Ozs7Ozs7Ozs7OzBNQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBR1RDLEksR0FBTztBQUNIQyxrQkFBTSxFQURIO0FBRUhDLGtCQUFNO0FBRkgsUzs7Ozs7K0JBSUFDLE0sRUFBUTtBQUNYQyxvQkFBUUMsR0FBUixDQUFZLFFBQVo7QUFEVyxnQkFFSEosSUFGRyxHQUVNRSxNQUZOLENBRUhGLElBRkc7O0FBR1gsaUJBQUtDLElBQUwsR0FBWUQsU0FBUyxHQUFULEdBQWUsSUFBZixHQUFzQixJQUFsQztBQUNBLGlCQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFDQUssMkJBQUtDLHFCQUFMLENBQTJCO0FBQ3ZCQyx1QkFBVSxLQUFLTixJQUFmO0FBRHVCLGFBQTNCO0FBR0EsaUJBQUtPLE1BQUw7QUFDSDs7OztFQWpCdUNILGVBQUtJLEk7O2tCQUE1QmIsYyIsImZpbGUiOiJmZWVkYmFja0RldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZlZWRiYWNrRGV0YWlsIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5LyY5Lqr5bCP56iL5bqP5LuL57uNJyxcclxuICAgIH1cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgdHlwZTogJycsXHJcbiAgICAgICAgdGV4dDogJycsXHJcbiAgICB9XHJcbiAgICBvbkxvYWQob3B0aW9uKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ29uTG9hZCcpO1xyXG4gICAgICAgIGNvbnN0IHsgdHlwZSB9ID0gb3B0aW9uO1xyXG4gICAgICAgIHRoaXMudGV4dCA9IHR5cGUgPT09ICcxJyA/ICfkvJjkuqsnIDogJ+W+ruS/oSc7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICB3ZXB5LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XHJcbiAgICAgICAgICAgIHRpdGxlOiBgJHt0aGlzLnRleHR95bCP56iL5bqP5LuL57uNYCxcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
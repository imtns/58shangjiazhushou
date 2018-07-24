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

var ArticleComponentAdd = function (_wepy$page) {
    _inherits(ArticleComponentAdd, _wepy$page);

    function ArticleComponentAdd() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ArticleComponentAdd);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ArticleComponentAdd.__proto__ || Object.getPrototypeOf(ArticleComponentAdd)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '文章添加'
        }, _this.data = {
            url: ''
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ArticleComponentAdd, [{
        key: 'onLoad',
        value: function onLoad() {
            var v = (+new Date() * 1).toString(36);
            this.url = 'https://yaofa.58.com/uhtml/articleComponentAdd?v=' + v;
            this.$apply();
            console.log(this.url);
        }
    }]);

    return ArticleComponentAdd;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ArticleComponentAdd , 'pages/articleComponentAdd'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFydGljbGVDb21wb25lbnRBZGQuanMiXSwibmFtZXMiOlsiQXJ0aWNsZUNvbXBvbmVudEFkZCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidXJsIiwidiIsIkRhdGUiLCJ0b1N0cmluZyIsIiRhcHBseSIsImNvbnNvbGUiLCJsb2ciLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxtQjs7Ozs7Ozs7Ozs7Ozs7b05BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVEMsSSxHQUFPO0FBQ0hDLGlCQUFLO0FBREYsUzs7Ozs7aUNBR0U7QUFDTCxnQkFBTUMsSUFBSSxDQUFDLENBQUMsSUFBSUMsSUFBSixFQUFELEdBQWMsQ0FBZixFQUFrQkMsUUFBbEIsQ0FBMkIsRUFBM0IsQ0FBVjtBQUNBLGlCQUFLSCxHQUFMLHlEQUErREMsQ0FBL0Q7QUFDQSxpQkFBS0csTUFBTDtBQUNBQyxvQkFBUUMsR0FBUixDQUFZLEtBQUtOLEdBQWpCO0FBQ0g7Ozs7RUFaNENPLGVBQUtDLEk7O2tCQUFqQ1osbUIiLCJmaWxlIjoiYXJ0aWNsZUNvbXBvbmVudEFkZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFydGljbGVDb21wb25lbnRBZGQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aWh+eroOa3u+WKoCcsXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICAgIHVybDogJycsXG4gICAgfVxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgY29uc3QgdiA9ICgrbmV3IERhdGUoKSAqIDEpLnRvU3RyaW5nKDM2KTtcbiAgICAgICAgdGhpcy51cmwgPSBgaHR0cHM6Ly95YW9mYS41OC5jb20vdWh0bWwvYXJ0aWNsZUNvbXBvbmVudEFkZD92PSR7dn1gO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnVybCk7XG4gICAgfVxufVxuIl19
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

var ArticleComponentCreate = function (_wepy$page) {
    _inherits(ArticleComponentCreate, _wepy$page);

    function ArticleComponentCreate() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ArticleComponentCreate);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ArticleComponentCreate.__proto__ || Object.getPrototypeOf(ArticleComponentCreate)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '文章添加'
        }, _this.data = {
            url: '',
            id: ''
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ArticleComponentCreate, [{
        key: 'onLoad',
        value: function onLoad(option) {
            var id = option.id;

            this.id = id;
            this.$apply();
        }
    }]);

    return ArticleComponentCreate;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ArticleComponentCreate , 'pages/articleComponentCreate'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFydGljbGVDb21wb25lbnRDcmVhdGUuanMiXSwibmFtZXMiOlsiQXJ0aWNsZUNvbXBvbmVudENyZWF0ZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidXJsIiwiaWQiLCJvcHRpb24iLCIkYXBwbHkiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxzQjs7Ozs7Ozs7Ozs7Ozs7ME5BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVEMsSSxHQUFPO0FBQ0hDLGlCQUFLLEVBREY7QUFFSEMsZ0JBQUk7QUFGRCxTOzs7OzsrQkFJQUMsTSxFQUFRO0FBQUEsZ0JBQ0hELEVBREcsR0FDSUMsTUFESixDQUNIRCxFQURHOztBQUVYLGlCQUFLQSxFQUFMLEdBQVVBLEVBQVY7QUFDQSxpQkFBS0UsTUFBTDtBQUNIOzs7O0VBWitDQyxlQUFLQyxJOztrQkFBcENULHNCIiwiZmlsZSI6ImFydGljbGVDb21wb25lbnRDcmVhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcnRpY2xlQ29tcG9uZW50Q3JlYXRlIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5paH56ug5re75YqgJyxcclxuICAgIH1cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgdXJsOiAnJyxcclxuICAgICAgICBpZDogJycsXHJcbiAgICB9XHJcbiAgICBvbkxvYWQob3B0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgeyBpZCB9ID0gb3B0aW9uO1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
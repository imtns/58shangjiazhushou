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
            url: ''
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ArticleComponentCreate, [{
        key: 'onLoad',
        value: function onLoad(option) {
            console.log('create', option);
            var ppu = encodeURIComponent(wx.getStorageSync('ppu'));
            var _option$id = option.id,
                id = _option$id === undefined ? '' : _option$id,
                _option$group = option.group,
                group = _option$group === undefined ? '' : _option$group,
                _option$name = option.name,
                name = _option$name === undefined ? '' : _option$name;

            _wepy2.default.setNavigationBarTitle({
                title: id ? '文章编辑' : '文章添加'
            });
            var v = (+new Date() * 1).toString(36);
            this.url = 'https://yaofa.58.com/uhtml/articleComponentCreate?v=' + v + '&ppu=' + ppu + '&group=' + group + '&id=' + id + '&name=' + name;
            this.$apply();
            console.log(this.url);
        }
    }]);

    return ArticleComponentCreate;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ArticleComponentCreate , 'pages/articleComponentCreate'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFydGljbGVDb21wb25lbnRDcmVhdGUuanMiXSwibmFtZXMiOlsiQXJ0aWNsZUNvbXBvbmVudENyZWF0ZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidXJsIiwib3B0aW9uIiwiY29uc29sZSIsImxvZyIsInBwdSIsImVuY29kZVVSSUNvbXBvbmVudCIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJpZCIsImdyb3VwIiwibmFtZSIsIndlcHkiLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJ0aXRsZSIsInYiLCJEYXRlIiwidG9TdHJpbmciLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLHNCOzs7Ozs7Ozs7Ozs7OzswTkFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdUQyxJLEdBQU87QUFDSEMsaUJBQUs7QUFERixTOzs7OzsrQkFHQUMsTSxFQUFRO0FBQ1hDLG9CQUFRQyxHQUFSLENBQVksUUFBWixFQUFzQkYsTUFBdEI7QUFDQSxnQkFBTUcsTUFBTUMsbUJBQW1CQyxHQUFHQyxjQUFILENBQWtCLEtBQWxCLENBQW5CLENBQVo7QUFGVyw2QkFHZ0NOLE1BSGhDLENBR0hPLEVBSEc7QUFBQSxnQkFHSEEsRUFIRyw4QkFHRSxFQUhGO0FBQUEsZ0NBR2dDUCxNQUhoQyxDQUdNUSxLQUhOO0FBQUEsZ0JBR01BLEtBSE4saUNBR2MsRUFIZDtBQUFBLCtCQUdnQ1IsTUFIaEMsQ0FHa0JTLElBSGxCO0FBQUEsZ0JBR2tCQSxJQUhsQixnQ0FHeUIsRUFIekI7O0FBSVhDLDJCQUFLQyxxQkFBTCxDQUEyQjtBQUN2QkMsdUJBQU9MLEtBQUssTUFBTCxHQUFjO0FBREUsYUFBM0I7QUFHQSxnQkFBTU0sSUFBSSxDQUFDLENBQUMsSUFBSUMsSUFBSixFQUFELEdBQWMsQ0FBZixFQUFrQkMsUUFBbEIsQ0FBMkIsRUFBM0IsQ0FBVjtBQUNBLGlCQUFLaEIsR0FBTCw0REFBa0VjLENBQWxFLGFBQTJFVixHQUEzRSxlQUF3RkssS0FBeEYsWUFBb0dELEVBQXBHLGNBQStHRSxJQUEvRztBQUNBLGlCQUFLTyxNQUFMO0FBQ0FmLG9CQUFRQyxHQUFSLENBQVksS0FBS0gsR0FBakI7QUFDSDs7OztFQWxCK0NXLGVBQUtPLEk7O2tCQUFwQ3RCLHNCIiwiZmlsZSI6ImFydGljbGVDb21wb25lbnRDcmVhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcnRpY2xlQ29tcG9uZW50Q3JlYXRlIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmlofnq6Dmt7vliqAnLFxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgICB1cmw6ICcnLFxuICAgIH1cbiAgICBvbkxvYWQob3B0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjcmVhdGUnLCBvcHRpb24pO1xuICAgICAgICBjb25zdCBwcHUgPSBlbmNvZGVVUklDb21wb25lbnQod3guZ2V0U3RvcmFnZVN5bmMoJ3BwdScpKTtcbiAgICAgICAgY29uc3QgeyBpZCA9ICcnLCBncm91cCA9ICcnLCBuYW1lID0gJycgfSA9IG9wdGlvbjtcbiAgICAgICAgd2VweS5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xuICAgICAgICAgICAgdGl0bGU6IGlkID8gJ+aWh+eroOe8lui+kScgOiAn5paH56ug5re75YqgJyxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHYgPSAoK25ldyBEYXRlKCkgKiAxKS50b1N0cmluZygzNik7XG4gICAgICAgIHRoaXMudXJsID0gYGh0dHBzOi8veWFvZmEuNTguY29tL3VodG1sL2FydGljbGVDb21wb25lbnRDcmVhdGU/dj0ke3Z9JnBwdT0ke3BwdX0mZ3JvdXA9JHtncm91cH0maWQ9JHtpZH0mbmFtZT0ke25hbWV9YDtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy51cmwpO1xuICAgIH1cbn1cbiJdfQ==
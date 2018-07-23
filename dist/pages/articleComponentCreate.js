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
            var ppu = encodeURIComponent(wx.getStorageSync('ppu'));
            var _option$id = option.id,
                id = _option$id === undefined ? '' : _option$id,
                _option$group = option.group,
                group = _option$group === undefined ? '' : _option$group;

            _wepy2.default.setNavigationBarTitle({
                title: id ? '文章编辑' : '文章添加'
            });
            var v = (+new Date() * 1).toString(36);
            this.url = 'https://yaofa.58.com/uhtml/articleComponentCreate?v=' + v + '&ppu=' + ppu + '&group=' + group + '&id=' + id;
            this.$apply();
            console.log(this.url);
        }
    }]);

    return ArticleComponentCreate;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ArticleComponentCreate , 'pages/articleComponentCreate'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFydGljbGVDb21wb25lbnRDcmVhdGUuanMiXSwibmFtZXMiOlsiQXJ0aWNsZUNvbXBvbmVudENyZWF0ZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidXJsIiwib3B0aW9uIiwicHB1IiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwid3giLCJnZXRTdG9yYWdlU3luYyIsImlkIiwiZ3JvdXAiLCJ3ZXB5Iiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwidGl0bGUiLCJ2IiwiRGF0ZSIsInRvU3RyaW5nIiwiJGFwcGx5IiwiY29uc29sZSIsImxvZyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsc0I7Ozs7Ozs7Ozs7Ozs7OzBOQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBR1RDLEksR0FBTztBQUNIQyxpQkFBSztBQURGLFM7Ozs7OytCQUdBQyxNLEVBQVE7QUFDWCxnQkFBTUMsTUFBTUMsbUJBQW1CQyxHQUFHQyxjQUFILENBQWtCLEtBQWxCLENBQW5CLENBQVo7QUFEVyw2QkFFcUJKLE1BRnJCLENBRUhLLEVBRkc7QUFBQSxnQkFFSEEsRUFGRyw4QkFFRSxFQUZGO0FBQUEsZ0NBRXFCTCxNQUZyQixDQUVNTSxLQUZOO0FBQUEsZ0JBRU1BLEtBRk4saUNBRWMsRUFGZDs7QUFHWEMsMkJBQUtDLHFCQUFMLENBQTJCO0FBQ3ZCQyx1QkFBT0osS0FBSyxNQUFMLEdBQWM7QUFERSxhQUEzQjtBQUdBLGdCQUFNSyxJQUFJLENBQUMsQ0FBQyxJQUFJQyxJQUFKLEVBQUQsR0FBYyxDQUFmLEVBQWtCQyxRQUFsQixDQUEyQixFQUEzQixDQUFWO0FBQ0EsaUJBQUtiLEdBQUwsNERBQWtFVyxDQUFsRSxhQUEyRVQsR0FBM0UsZUFBd0ZLLEtBQXhGLFlBQW9HRCxFQUFwRztBQUNBLGlCQUFLUSxNQUFMO0FBQ0FDLG9CQUFRQyxHQUFSLENBQVksS0FBS2hCLEdBQWpCO0FBQ0g7Ozs7RUFqQitDUSxlQUFLUyxJOztrQkFBcENyQixzQiIsImZpbGUiOiJhcnRpY2xlQ29tcG9uZW50Q3JlYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXJ0aWNsZUNvbXBvbmVudENyZWF0ZSBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aWh+eroOa3u+WKoCcsXHJcbiAgICB9XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIHVybDogJycsXHJcbiAgICB9XHJcbiAgICBvbkxvYWQob3B0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgcHB1ID0gZW5jb2RlVVJJQ29tcG9uZW50KHd4LmdldFN0b3JhZ2VTeW5jKCdwcHUnKSk7XHJcbiAgICAgICAgY29uc3QgeyBpZCA9ICcnLCBncm91cCA9ICcnIH0gPSBvcHRpb247XHJcbiAgICAgICAgd2VweS5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xyXG4gICAgICAgICAgICB0aXRsZTogaWQgPyAn5paH56ug57yW6L6RJyA6ICfmlofnq6Dmt7vliqAnLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IHYgPSAoK25ldyBEYXRlKCkgKiAxKS50b1N0cmluZygzNik7XHJcbiAgICAgICAgdGhpcy51cmwgPSBgaHR0cHM6Ly95YW9mYS41OC5jb20vdWh0bWwvYXJ0aWNsZUNvbXBvbmVudENyZWF0ZT92PSR7dn0mcHB1PSR7cHB1fSZncm91cD0ke2dyb3VwfSZpZD0ke2lkfWA7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnVybCk7XHJcbiAgICB9XHJcbn1cclxuIl19
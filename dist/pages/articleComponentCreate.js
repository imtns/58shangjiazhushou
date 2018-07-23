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

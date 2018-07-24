'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _mixin = require('./mixin.js');

var _mixin2 = _interopRequireDefault(_mixin);

var _utils = require('./../../utils/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var app = require('./../../utils/globalData.js');

var Title = function (_wepy$page) {
    _inherits(Title, _wepy$page);

    function Title() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Title);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Title.__proto__ || Object.getPrototypeOf(Title)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '标题'
        }, _this.mixins = [_mixin2.default], _this.data = {
            textLimit: 0,
            title: '',
            subtitle: '',
            textName: '',
            linkName: '',
            pageKey: ''
        }, _this.methods = {
            textareaInput: function textareaInput(e) {
                this.textLimit = e.detail.value.length;
                this.pageData[0].props.cfg.subtitle = e.detail.value;
            },
            bindPickerChange: function bindPickerChange(e) {
                console.log(this.pageList);
                this.selectorIndex = e.detail.value;
                this.pageData[0].props.cfg.pageKey = this.pageList[e.detail.value].key;
                this.pageData[0].props.cfg.linkName = this.pageList[e.detail.value].name;
            },
            bindTitleInput: function bindTitleInput(e) {
                this.pageData[0].props.cfg.title = e.detail.value;
            },
            bindLinkInput: function bindLinkInput(e) {
                this.pageData[0].props.cfg.textName = e.detail.value;
            },
            save: function save() {
                if (!this.pageData[0].props.cfg.title) {
                    (0, _utils.toast)('请输入文章标题');
                    return;
                }
                this.pageModule.cfg = this.pageData[0].props.cfg;

                var _pageData = _slicedToArray(this.pageData, 1);

                app.globalData.pageData[this.pageIndex] = _pageData[0];

                app.globalData.modules[this.pageIndex] = this.pageModule;
                wx.navigateBack({
                    delta: 1
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Title, [{
        key: 'onLoad',
        value: function onLoad() {
            var _this2 = this;

            var _tempModules$filter = this.tempModules.filter(function (obj) {
                return obj.id === _this2.pageId;
            });

            var _tempModules$filter2 = _slicedToArray(_tempModules$filter, 1);

            this.pageModule = _tempModules$filter2[0];

            console.log(this.pageModule);
        }
    }]);

    return Title;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Title , 'pages/edit/title'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRpdGxlLmpzIl0sIm5hbWVzIjpbImFwcCIsInJlcXVpcmUiLCJUaXRsZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJtaXhpbnMiLCJNaXhpbiIsImRhdGEiLCJ0ZXh0TGltaXQiLCJ0aXRsZSIsInN1YnRpdGxlIiwidGV4dE5hbWUiLCJsaW5rTmFtZSIsInBhZ2VLZXkiLCJtZXRob2RzIiwidGV4dGFyZWFJbnB1dCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsImxlbmd0aCIsInBhZ2VEYXRhIiwicHJvcHMiLCJjZmciLCJiaW5kUGlja2VyQ2hhbmdlIiwiY29uc29sZSIsImxvZyIsInBhZ2VMaXN0Iiwic2VsZWN0b3JJbmRleCIsImtleSIsIm5hbWUiLCJiaW5kVGl0bGVJbnB1dCIsImJpbmRMaW5rSW5wdXQiLCJzYXZlIiwicGFnZU1vZHVsZSIsImdsb2JhbERhdGEiLCJwYWdlSW5kZXgiLCJtb2R1bGVzIiwid3giLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsInRlbXBNb2R1bGVzIiwiZmlsdGVyIiwib2JqIiwiaWQiLCJwYWdlSWQiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztBQUVBLElBQU1BLE1BQU1DLFFBQVEsd0JBQVIsQ0FBWjs7SUFFcUJDLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBR1RDLE0sR0FBUyxDQUFDQyxlQUFELEMsUUFDVEMsSSxHQUFPO0FBQ0hDLHVCQUFXLENBRFI7QUFFSEMsbUJBQU8sRUFGSjtBQUdIQyxzQkFBVSxFQUhQO0FBSUhDLHNCQUFVLEVBSlA7QUFLSEMsc0JBQVUsRUFMUDtBQU1IQyxxQkFBUztBQU5OLFMsUUFZUEMsTyxHQUFVO0FBQ05DLHlCQURNLHlCQUNRQyxDQURSLEVBQ1c7QUFDYixxQkFBS1IsU0FBTCxHQUFpQlEsRUFBRUMsTUFBRixDQUFTQyxLQUFULENBQWVDLE1BQWhDO0FBQ0EscUJBQUtDLFFBQUwsQ0FBYyxDQUFkLEVBQWlCQyxLQUFqQixDQUF1QkMsR0FBdkIsQ0FBMkJaLFFBQTNCLEdBQXNDTSxFQUFFQyxNQUFGLENBQVNDLEtBQS9DO0FBQ0gsYUFKSztBQUtOSyw0QkFMTSw0QkFLV1AsQ0FMWCxFQUtjO0FBQ2hCUSx3QkFBUUMsR0FBUixDQUFZLEtBQUtDLFFBQWpCO0FBQ0EscUJBQUtDLGFBQUwsR0FBcUJYLEVBQUVDLE1BQUYsQ0FBU0MsS0FBOUI7QUFDQSxxQkFBS0UsUUFBTCxDQUFjLENBQWQsRUFBaUJDLEtBQWpCLENBQXVCQyxHQUF2QixDQUEyQlQsT0FBM0IsR0FBcUMsS0FBS2EsUUFBTCxDQUFjVixFQUFFQyxNQUFGLENBQVNDLEtBQXZCLEVBQThCVSxHQUFuRTtBQUNBLHFCQUFLUixRQUFMLENBQWMsQ0FBZCxFQUFpQkMsS0FBakIsQ0FBdUJDLEdBQXZCLENBQTJCVixRQUEzQixHQUFzQyxLQUFLYyxRQUFMLENBQWNWLEVBQUVDLE1BQUYsQ0FBU0MsS0FBdkIsRUFBOEJXLElBQXBFO0FBQ0gsYUFWSztBQVdOQywwQkFYTSwwQkFXU2QsQ0FYVCxFQVdZO0FBQ2QscUJBQUtJLFFBQUwsQ0FBYyxDQUFkLEVBQWlCQyxLQUFqQixDQUF1QkMsR0FBdkIsQ0FBMkJiLEtBQTNCLEdBQW1DTyxFQUFFQyxNQUFGLENBQVNDLEtBQTVDO0FBQ0gsYUFiSztBQWNOYSx5QkFkTSx5QkFjUWYsQ0FkUixFQWNXO0FBQ2IscUJBQUtJLFFBQUwsQ0FBYyxDQUFkLEVBQWlCQyxLQUFqQixDQUF1QkMsR0FBdkIsQ0FBMkJYLFFBQTNCLEdBQXNDSyxFQUFFQyxNQUFGLENBQVNDLEtBQS9DO0FBQ0gsYUFoQks7QUFpQk5jLGdCQWpCTSxrQkFpQkM7QUFDSCxvQkFBSSxDQUFDLEtBQUtaLFFBQUwsQ0FBYyxDQUFkLEVBQWlCQyxLQUFqQixDQUF1QkMsR0FBdkIsQ0FBMkJiLEtBQWhDLEVBQXVDO0FBQ25DLHNDQUFNLFNBQU47QUFDQTtBQUNIO0FBQ0QscUJBQUt3QixVQUFMLENBQWdCWCxHQUFoQixHQUFzQixLQUFLRixRQUFMLENBQWMsQ0FBZCxFQUFpQkMsS0FBakIsQ0FBdUJDLEdBQTdDOztBQUxHLCtDQU15QyxLQUFLRixRQU45Qzs7QUFNRnBCLG9CQUFJa0MsVUFBSixDQUFlZCxRQUFmLENBQXdCLEtBQUtlLFNBQTdCLENBTkU7O0FBT0huQyxvQkFBSWtDLFVBQUosQ0FBZUUsT0FBZixDQUF1QixLQUFLRCxTQUE1QixJQUF5QyxLQUFLRixVQUE5QztBQUNBSSxtQkFBR0MsWUFBSCxDQUFnQjtBQUNaQywyQkFBTztBQURLLGlCQUFoQjtBQUdIO0FBNUJLLFM7Ozs7O2lDQUpEO0FBQUE7O0FBQUEsc0NBQ2UsS0FBS0MsV0FBTCxDQUFpQkMsTUFBakIsQ0FBd0I7QUFBQSx1QkFBT0MsSUFBSUMsRUFBSixLQUFXLE9BQUtDLE1BQXZCO0FBQUEsYUFBeEIsQ0FEZjs7QUFBQTs7QUFDSixpQkFBS1gsVUFERDs7QUFFTFQsb0JBQVFDLEdBQVIsQ0FBWSxLQUFLUSxVQUFqQjtBQUNIOzs7O0VBaEI4QlksZUFBS0MsSTs7a0JBQW5CNUMsSyIsImZpbGUiOiJ0aXRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgTWl4aW4gZnJvbSAnLi9taXhpbic7XG5pbXBvcnQgeyB0b2FzdCB9IGZyb20gJy4uLy4uL3V0aWxzJztcblxuY29uc3QgYXBwID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvZ2xvYmFsRGF0YScpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaXRsZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5qCH6aKYJyxcbiAgICB9XG4gICAgbWl4aW5zID0gW01peGluXTtcbiAgICBkYXRhID0ge1xuICAgICAgICB0ZXh0TGltaXQ6IDAsXG4gICAgICAgIHRpdGxlOiAnJyxcbiAgICAgICAgc3VidGl0bGU6ICcnLFxuICAgICAgICB0ZXh0TmFtZTogJycsXG4gICAgICAgIGxpbmtOYW1lOiAnJyxcbiAgICAgICAgcGFnZUtleTogJycsXG4gICAgfVxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgW3RoaXMucGFnZU1vZHVsZV0gPSB0aGlzLnRlbXBNb2R1bGVzLmZpbHRlcihvYmogPT4gb2JqLmlkID09PSB0aGlzLnBhZ2VJZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucGFnZU1vZHVsZSk7XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIHRleHRhcmVhSW5wdXQoZSkge1xuICAgICAgICAgICAgdGhpcy50ZXh0TGltaXQgPSBlLmRldGFpbC52YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLnBhZ2VEYXRhWzBdLnByb3BzLmNmZy5zdWJ0aXRsZSA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBiaW5kUGlja2VyQ2hhbmdlKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucGFnZUxpc3QpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RvckluZGV4ID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICAgICAgICB0aGlzLnBhZ2VEYXRhWzBdLnByb3BzLmNmZy5wYWdlS2V5ID0gdGhpcy5wYWdlTGlzdFtlLmRldGFpbC52YWx1ZV0ua2V5O1xuICAgICAgICAgICAgdGhpcy5wYWdlRGF0YVswXS5wcm9wcy5jZmcubGlua05hbWUgPSB0aGlzLnBhZ2VMaXN0W2UuZGV0YWlsLnZhbHVlXS5uYW1lO1xuICAgICAgICB9LFxuICAgICAgICBiaW5kVGl0bGVJbnB1dChlKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2VEYXRhWzBdLnByb3BzLmNmZy50aXRsZSA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBiaW5kTGlua0lucHV0KGUpIHtcbiAgICAgICAgICAgIHRoaXMucGFnZURhdGFbMF0ucHJvcHMuY2ZnLnRleHROYW1lID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIHNhdmUoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMucGFnZURhdGFbMF0ucHJvcHMuY2ZnLnRpdGxlKSB7XG4gICAgICAgICAgICAgICAgdG9hc3QoJ+ivt+i+k+WFpeaWh+eroOagh+mimCcpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucGFnZU1vZHVsZS5jZmcgPSB0aGlzLnBhZ2VEYXRhWzBdLnByb3BzLmNmZztcbiAgICAgICAgICAgIFthcHAuZ2xvYmFsRGF0YS5wYWdlRGF0YVt0aGlzLnBhZ2VJbmRleF1dID0gdGhpcy5wYWdlRGF0YTtcbiAgICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLm1vZHVsZXNbdGhpcy5wYWdlSW5kZXhdID0gdGhpcy5wYWdlTW9kdWxlO1xuICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICBkZWx0YTogMSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgIH1cbn1cbiJdfQ==
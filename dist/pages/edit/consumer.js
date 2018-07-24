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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var app = require('./../../utils/globalData.js');

var Me = function (_wepy$page) {
    _inherits(Me, _wepy$page);

    function Me() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Me);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Me.__proto__ || Object.getPrototypeOf(Me)).call.apply(_ref, [this].concat(args))), _this), _this.mixins = [_mixin2.default], _this.data = {
            telnum: ''
        }, _this.methods = {
            checkboxChange: function checkboxChange(e) {
                var _this2 = this;

                ['order', 'address', 'coupon', 'tel'].forEach(function (item) {
                    _this2.pageData[0].props.cfg[item] = e.detail.value.indexOf(item) === -1;
                });
            },
            telInput: function telInput(e) {
                this.telnum = e.detail.value;
            },
            save: function save() {
                this.pageModule.cfg = this.pageData[0].props.cfg;
                this.pageModule.cfg.telnum = this.telnum;
                this.pageData[0].props.cfg.telnum = this.telnum;

                var _pageData = _slicedToArray(this.pageData, 1);

                app.globalData.pageData[this.pageIndex] = _pageData[0];

                app.globalData.modules[this.pageIndex] = this.pageModule;
                wx.navigateBack({
                    delta: 1
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Me, [{
        key: 'onLoad',
        value: function onLoad() {
            var _this3 = this;

            var _tempModules$filter = this.tempModules.filter(function (obj) {
                return obj.id === _this3.pageId;
            });

            var _tempModules$filter2 = _slicedToArray(_tempModules$filter, 1);

            this.pageModule = _tempModules$filter2[0];

            console.log(this.pageModule);
            wx.setNavigationBarTitle({
                title: this.pageData[0].props.cfg.title
            });
            this.telnum = this.pageData[0].props.cfg.telnum || this.pageData[0].props.data;
        }
    }]);

    return Me;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Me , 'pages/edit/consumer'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnN1bWVyLmpzIl0sIm5hbWVzIjpbImFwcCIsInJlcXVpcmUiLCJNZSIsIm1peGlucyIsIk1peGluIiwiZGF0YSIsInRlbG51bSIsIm1ldGhvZHMiLCJjaGVja2JveENoYW5nZSIsImUiLCJmb3JFYWNoIiwicGFnZURhdGEiLCJwcm9wcyIsImNmZyIsIml0ZW0iLCJkZXRhaWwiLCJ2YWx1ZSIsImluZGV4T2YiLCJ0ZWxJbnB1dCIsInNhdmUiLCJwYWdlTW9kdWxlIiwiZ2xvYmFsRGF0YSIsInBhZ2VJbmRleCIsIm1vZHVsZXMiLCJ3eCIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwidGVtcE1vZHVsZXMiLCJmaWx0ZXIiLCJvYmoiLCJpZCIsInBhZ2VJZCIsImNvbnNvbGUiLCJsb2ciLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJ0aXRsZSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsTUFBTUMsUUFBUSx3QkFBUixDQUFaOztJQUVxQkMsRTs7Ozs7Ozs7Ozs7Ozs7a0xBQ25CQyxNLEdBQVMsQ0FBQ0MsZUFBRCxDLFFBQ1RDLEksR0FBTztBQUNIQyxvQkFBUTtBQURMLFMsUUFXUEMsTyxHQUFVO0FBQ05DLDBCQURNLDBCQUNTQyxDQURULEVBQ1k7QUFBQTs7QUFDZCxpQkFBQyxPQUFELEVBQVUsU0FBVixFQUFxQixRQUFyQixFQUErQixLQUEvQixFQUFzQ0MsT0FBdEMsQ0FBOEMsZ0JBQVE7QUFDbEQsMkJBQUtDLFFBQUwsQ0FBYyxDQUFkLEVBQWlCQyxLQUFqQixDQUF1QkMsR0FBdkIsQ0FBMkJDLElBQTNCLElBQW1DTCxFQUFFTSxNQUFGLENBQVNDLEtBQVQsQ0FBZUMsT0FBZixDQUF1QkgsSUFBdkIsTUFBaUMsQ0FBQyxDQUFyRTtBQUNILGlCQUZEO0FBR0gsYUFMSztBQU1OSSxvQkFOTSxvQkFNR1QsQ0FOSCxFQU1NO0FBQ1IscUJBQUtILE1BQUwsR0FBY0csRUFBRU0sTUFBRixDQUFTQyxLQUF2QjtBQUNILGFBUks7QUFTTkcsZ0JBVE0sa0JBU0M7QUFDSCxxQkFBS0MsVUFBTCxDQUFnQlAsR0FBaEIsR0FBc0IsS0FBS0YsUUFBTCxDQUFjLENBQWQsRUFBaUJDLEtBQWpCLENBQXVCQyxHQUE3QztBQUNBLHFCQUFLTyxVQUFMLENBQWdCUCxHQUFoQixDQUFvQlAsTUFBcEIsR0FBNkIsS0FBS0EsTUFBbEM7QUFDQSxxQkFBS0ssUUFBTCxDQUFjLENBQWQsRUFBaUJDLEtBQWpCLENBQXVCQyxHQUF2QixDQUEyQlAsTUFBM0IsR0FBb0MsS0FBS0EsTUFBekM7O0FBSEcsK0NBSXlDLEtBQUtLLFFBSjlDOztBQUlGWCxvQkFBSXFCLFVBQUosQ0FBZVYsUUFBZixDQUF3QixLQUFLVyxTQUE3QixDQUpFOztBQUtIdEIsb0JBQUlxQixVQUFKLENBQWVFLE9BQWYsQ0FBdUIsS0FBS0QsU0FBNUIsSUFBeUMsS0FBS0YsVUFBOUM7QUFDQUksbUJBQUdDLFlBQUgsQ0FBZ0I7QUFDWkMsMkJBQU87QUFESyxpQkFBaEI7QUFHSDtBQWxCSyxTOzs7OztpQ0FSRDtBQUFBOztBQUFBLHNDQUNlLEtBQUtDLFdBQUwsQ0FBaUJDLE1BQWpCLENBQXdCO0FBQUEsdUJBQU9DLElBQUlDLEVBQUosS0FBVyxPQUFLQyxNQUF2QjtBQUFBLGFBQXhCLENBRGY7O0FBQUE7O0FBQ0osaUJBQUtYLFVBREQ7O0FBRUxZLG9CQUFRQyxHQUFSLENBQVksS0FBS2IsVUFBakI7QUFDQUksZUFBR1UscUJBQUgsQ0FBeUI7QUFDckJDLHVCQUFPLEtBQUt4QixRQUFMLENBQWMsQ0FBZCxFQUFpQkMsS0FBakIsQ0FBdUJDLEdBQXZCLENBQTJCc0I7QUFEYixhQUF6QjtBQUdBLGlCQUFLN0IsTUFBTCxHQUFjLEtBQUtLLFFBQUwsQ0FBYyxDQUFkLEVBQWlCQyxLQUFqQixDQUF1QkMsR0FBdkIsQ0FBMkJQLE1BQTNCLElBQXFDLEtBQUtLLFFBQUwsQ0FBYyxDQUFkLEVBQWlCQyxLQUFqQixDQUF1QlAsSUFBMUU7QUFDSDs7OztFQVo2QitCLGVBQUtDLEk7O2tCQUFoQm5DLEUiLCJmaWxlIjoiY29uc3VtZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IE1peGluIGZyb20gJy4vbWl4aW4nO1xuXG5jb25zdCBhcHAgPSByZXF1aXJlKCcuLi8uLi91dGlscy9nbG9iYWxEYXRhJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgbWl4aW5zID0gW01peGluXTtcbiAgZGF0YSA9IHtcbiAgICAgIHRlbG51bTogJycsXG4gIH1cbiAgb25Mb2FkKCkge1xuICAgICAgW3RoaXMucGFnZU1vZHVsZV0gPSB0aGlzLnRlbXBNb2R1bGVzLmZpbHRlcihvYmogPT4gb2JqLmlkID09PSB0aGlzLnBhZ2VJZCk7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnBhZ2VNb2R1bGUpO1xuICAgICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcbiAgICAgICAgICB0aXRsZTogdGhpcy5wYWdlRGF0YVswXS5wcm9wcy5jZmcudGl0bGUsXG4gICAgICB9KTtcbiAgICAgIHRoaXMudGVsbnVtID0gdGhpcy5wYWdlRGF0YVswXS5wcm9wcy5jZmcudGVsbnVtIHx8IHRoaXMucGFnZURhdGFbMF0ucHJvcHMuZGF0YTtcbiAgfVxuICBtZXRob2RzID0ge1xuICAgICAgY2hlY2tib3hDaGFuZ2UoZSkge1xuICAgICAgICAgIFsnb3JkZXInLCAnYWRkcmVzcycsICdjb3Vwb24nLCAndGVsJ10uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5wYWdlRGF0YVswXS5wcm9wcy5jZmdbaXRlbV0gPSBlLmRldGFpbC52YWx1ZS5pbmRleE9mKGl0ZW0pID09PSAtMTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICB0ZWxJbnB1dChlKSB7XG4gICAgICAgICAgdGhpcy50ZWxudW0gPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgIH0sXG4gICAgICBzYXZlKCkge1xuICAgICAgICAgIHRoaXMucGFnZU1vZHVsZS5jZmcgPSB0aGlzLnBhZ2VEYXRhWzBdLnByb3BzLmNmZztcbiAgICAgICAgICB0aGlzLnBhZ2VNb2R1bGUuY2ZnLnRlbG51bSA9IHRoaXMudGVsbnVtO1xuICAgICAgICAgIHRoaXMucGFnZURhdGFbMF0ucHJvcHMuY2ZnLnRlbG51bSA9IHRoaXMudGVsbnVtO1xuICAgICAgICAgIFthcHAuZ2xvYmFsRGF0YS5wYWdlRGF0YVt0aGlzLnBhZ2VJbmRleF1dID0gdGhpcy5wYWdlRGF0YTtcbiAgICAgICAgICBhcHAuZ2xvYmFsRGF0YS5tb2R1bGVzW3RoaXMucGFnZUluZGV4XSA9IHRoaXMucGFnZU1vZHVsZTtcbiAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICBkZWx0YTogMSxcbiAgICAgICAgICB9KTtcbiAgICAgIH0sXG4gIH1cbn1cbiJdfQ==
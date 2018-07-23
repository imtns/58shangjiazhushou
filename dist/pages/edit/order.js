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

var Order = function (_wepy$page) {
    _inherits(Order, _wepy$page);

    function Order() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Order);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Order.__proto__ || Object.getPrototypeOf(Order)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '预约服务'
        }, _this.mixins = [_mixin2.default], _this.data = {
            reserveTitle: '预约组件标题'
        }, _this.methods = {
            saveTitle: function saveTitle(e) {
                console.log(e);
                this.pageModule.cfg.title = this.reserveTitle;
                this.pageData[0].props.cfg.title = this.reserveTitle;

                var _pageData = _slicedToArray(this.pageData, 1);

                app.globalData.pageData[this.pageIndex] = _pageData[0];

                app.globalData.modules[this.pageIndex] = this.pageModule;
                wx.navigateBack({
                    delta: 1
                });
            },
            bindKeyInput: function bindKeyInput(e) {
                this.reserveTitle = e.detail.value;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Order, [{
        key: 'onLoad',
        value: function onLoad() {
            var _this2 = this;

            this.reserveTitle = this.pageData[0].props.cfg.title;

            var _tempModules$filter = this.tempModules.filter(function (obj) {
                return obj.id === _this2.pageId;
            });

            var _tempModules$filter2 = _slicedToArray(_tempModules$filter, 1);

            this.pageModule = _tempModules$filter2[0];
        }
    }]);

    return Order;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Order , 'pages/edit/order'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLmpzIl0sIm5hbWVzIjpbImFwcCIsInJlcXVpcmUiLCJPcmRlciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJtaXhpbnMiLCJNaXhpbiIsImRhdGEiLCJyZXNlcnZlVGl0bGUiLCJtZXRob2RzIiwic2F2ZVRpdGxlIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJwYWdlTW9kdWxlIiwiY2ZnIiwidGl0bGUiLCJwYWdlRGF0YSIsInByb3BzIiwiZ2xvYmFsRGF0YSIsInBhZ2VJbmRleCIsIm1vZHVsZXMiLCJ3eCIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwiYmluZEtleUlucHV0IiwiZGV0YWlsIiwidmFsdWUiLCJ0ZW1wTW9kdWxlcyIsImZpbHRlciIsIm9iaiIsImlkIiwicGFnZUlkIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxNQUFNQyxRQUFRLHdCQUFSLENBQVo7O0lBRXFCQyxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDbkJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdUQyxNLEdBQVMsQ0FBQ0MsZUFBRCxDLFFBRVRDLEksR0FBTztBQUNIQywwQkFBYztBQURYLFMsUUFPUEMsTyxHQUFVO0FBQ05DLHFCQURNLHFCQUNJQyxDQURKLEVBQ087QUFDVEMsd0JBQVFDLEdBQVIsQ0FBWUYsQ0FBWjtBQUNBLHFCQUFLRyxVQUFMLENBQWdCQyxHQUFoQixDQUFvQkMsS0FBcEIsR0FBNEIsS0FBS1IsWUFBakM7QUFDQSxxQkFBS1MsUUFBTCxDQUFjLENBQWQsRUFBaUJDLEtBQWpCLENBQXVCSCxHQUF2QixDQUEyQkMsS0FBM0IsR0FBbUMsS0FBS1IsWUFBeEM7O0FBSFMsK0NBSW1DLEtBQUtTLFFBSnhDOztBQUlSakIsb0JBQUltQixVQUFKLENBQWVGLFFBQWYsQ0FBd0IsS0FBS0csU0FBN0IsQ0FKUTs7QUFLVHBCLG9CQUFJbUIsVUFBSixDQUFlRSxPQUFmLENBQXVCLEtBQUtELFNBQTVCLElBQXlDLEtBQUtOLFVBQTlDO0FBQ0FRLG1CQUFHQyxZQUFILENBQWdCO0FBQ1pDLDJCQUFPO0FBREssaUJBQWhCO0FBR0gsYUFWSztBQVdOQyx3QkFYTSx3QkFXT2QsQ0FYUCxFQVdVO0FBQ1oscUJBQUtILFlBQUwsR0FBb0JHLEVBQUVlLE1BQUYsQ0FBU0MsS0FBN0I7QUFDSDtBQWJLLFM7Ozs7O2lDQUpEO0FBQUE7O0FBQ0wsaUJBQUtuQixZQUFMLEdBQW9CLEtBQUtTLFFBQUwsQ0FBYyxDQUFkLEVBQWlCQyxLQUFqQixDQUF1QkgsR0FBdkIsQ0FBMkJDLEtBQS9DOztBQURLLHNDQUVlLEtBQUtZLFdBQUwsQ0FBaUJDLE1BQWpCLENBQXdCO0FBQUEsdUJBQU9DLElBQUlDLEVBQUosS0FBVyxPQUFLQyxNQUF2QjtBQUFBLGFBQXhCLENBRmY7O0FBQUE7O0FBRUosaUJBQUtsQixVQUZEO0FBR1I7Ozs7RUFaZ0NtQixlQUFLQyxJOztrQkFBbkJoQyxLIiwiZmlsZSI6Im9yZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgTWl4aW4gZnJvbSAnLi9taXhpbic7XHJcblxyXG5jb25zdCBhcHAgPSByZXF1aXJlKCcuLi8uLi91dGlscy9nbG9iYWxEYXRhJyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlciBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6aKE57qm5pyN5YqhJyxcclxuICB9O1xyXG4gIG1peGlucyA9IFtNaXhpbl07XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICAgIHJlc2VydmVUaXRsZTogJ+mihOe6pue7hOS7tuagh+mimCcsXHJcbiAgfTtcclxuICBvbkxvYWQoKSB7XHJcbiAgICAgIHRoaXMucmVzZXJ2ZVRpdGxlID0gdGhpcy5wYWdlRGF0YVswXS5wcm9wcy5jZmcudGl0bGU7XHJcbiAgICAgIFt0aGlzLnBhZ2VNb2R1bGVdID0gdGhpcy50ZW1wTW9kdWxlcy5maWx0ZXIob2JqID0+IG9iai5pZCA9PT0gdGhpcy5wYWdlSWQpO1xyXG4gIH1cclxuICBtZXRob2RzID0ge1xyXG4gICAgICBzYXZlVGl0bGUoZSkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICB0aGlzLnBhZ2VNb2R1bGUuY2ZnLnRpdGxlID0gdGhpcy5yZXNlcnZlVGl0bGU7XHJcbiAgICAgICAgICB0aGlzLnBhZ2VEYXRhWzBdLnByb3BzLmNmZy50aXRsZSA9IHRoaXMucmVzZXJ2ZVRpdGxlO1xyXG4gICAgICAgICAgW2FwcC5nbG9iYWxEYXRhLnBhZ2VEYXRhW3RoaXMucGFnZUluZGV4XV0gPSB0aGlzLnBhZ2VEYXRhO1xyXG4gICAgICAgICAgYXBwLmdsb2JhbERhdGEubW9kdWxlc1t0aGlzLnBhZ2VJbmRleF0gPSB0aGlzLnBhZ2VNb2R1bGU7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xyXG4gICAgICAgICAgICAgIGRlbHRhOiAxLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGJpbmRLZXlJbnB1dChlKSB7XHJcbiAgICAgICAgICB0aGlzLnJlc2VydmVUaXRsZSA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICB9LFxyXG4gIH07XHJcbn1cclxuIl19
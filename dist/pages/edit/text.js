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

var EditText = function (_wepy$page) {
    _inherits(EditText, _wepy$page);

    function EditText() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, EditText);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EditText.__proto__ || Object.getPrototypeOf(EditText)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '文章'
        }, _this.mixins = [_mixin2.default], _this.data = {
            list: [1],
            editMultiple: false,
            textLength: 3,
            textLimit: {},
            theme: '',
            autoplay: false,
            interval: 2500,
            duration: 500
        }, _this.methods = {
            radioBoxChange: function radioBoxChange(e) {
                this.editMultiple = e.detail.value !== 'single';
                this.theme = this.editMultiple ? '2' : '1';
            },
            showGroup: function showGroup() {
                this.showGroup = !this.showGroup;
            },
            textAreaInput: function textAreaInput(e) {
                var index = e.currentTarget.dataset.index;

                this.textLimit[index] = e.detail.value.length;
                this.pageData[0].props.cfg.texts[index].text = e.detail.value;
            },
            textSingleInput: function textSingleInput(e) {
                this.textLimit.single = e.detail.value.length;
                this.pageData[0].props.cfg.texts[0].text = e.detail.value;
            },
            addText: function addText() {
                if (this.pageData[0].props.cfg.texts.length === 4) {
                    (0, _utils.toast)('最多添加5条');
                    return;
                }
                this.pageData[0].props.cfg.texts.push({
                    text: ''
                });
            },
            save: function save() {
                this.pageData[0].props.cfg.theme = this.editMultiple ? '2' : '1';
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

    _createClass(EditText, [{
        key: 'onLoad',
        value: function onLoad() {
            var _this2 = this;

            var _tempModules$filter = this.tempModules.filter(function (obj) {
                return obj.id === _this2.pageId;
            });

            var _tempModules$filter2 = _slicedToArray(_tempModules$filter, 1);

            this.pageModule = _tempModules$filter2[0];

            this.editMultiple = this.pageData[0].props.cfg.theme === '2';
            if (this.editMultiple) {
                this.pageData[0].props.cfg.texts.forEach(function (item, index) {
                    _this2.textLimit[index] = item.text.length;
                });
            } else {
                this.textLimit.single = this.pageData[0].props.cfg.texts[0].text.length;
            }
        }
    }]);

    return EditText;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(EditText , 'pages/edit/text'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRleHQuanMiXSwibmFtZXMiOlsiYXBwIiwicmVxdWlyZSIsIkVkaXRUZXh0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm1peGlucyIsIk1peGluIiwiZGF0YSIsImxpc3QiLCJlZGl0TXVsdGlwbGUiLCJ0ZXh0TGVuZ3RoIiwidGV4dExpbWl0IiwidGhlbWUiLCJhdXRvcGxheSIsImludGVydmFsIiwiZHVyYXRpb24iLCJtZXRob2RzIiwicmFkaW9Cb3hDaGFuZ2UiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJzaG93R3JvdXAiLCJ0ZXh0QXJlYUlucHV0IiwiaW5kZXgiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImxlbmd0aCIsInBhZ2VEYXRhIiwicHJvcHMiLCJjZmciLCJ0ZXh0cyIsInRleHQiLCJ0ZXh0U2luZ2xlSW5wdXQiLCJzaW5nbGUiLCJhZGRUZXh0IiwicHVzaCIsInNhdmUiLCJwYWdlTW9kdWxlIiwiZ2xvYmFsRGF0YSIsInBhZ2VJbmRleCIsIm1vZHVsZXMiLCJ3eCIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwidGVtcE1vZHVsZXMiLCJmaWx0ZXIiLCJvYmoiLCJpZCIsInBhZ2VJZCIsImZvckVhY2giLCJpdGVtIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxNQUFNQyxRQUFRLHdCQUFSLENBQVo7O0lBRXFCQyxROzs7Ozs7Ozs7Ozs7Ozs4TEFDbkJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdUQyxNLEdBQVMsQ0FBQ0MsZUFBRCxDLFFBRVRDLEksR0FBTztBQUNIQyxrQkFBTSxDQUFDLENBQUQsQ0FESDtBQUVIQywwQkFBYyxLQUZYO0FBR0hDLHdCQUFZLENBSFQ7QUFJSEMsdUJBQVcsRUFKUjtBQUtIQyxtQkFBTyxFQUxKO0FBTUhDLHNCQUFVLEtBTlA7QUFPSEMsc0JBQVUsSUFQUDtBQVFIQyxzQkFBVTtBQVJQLFMsUUFxQlBDLE8sR0FBVTtBQUNOQywwQkFETSwwQkFDU0MsQ0FEVCxFQUNZO0FBQ2QscUJBQUtULFlBQUwsR0FBb0JTLEVBQUVDLE1BQUYsQ0FBU0MsS0FBVCxLQUFtQixRQUF2QztBQUNBLHFCQUFLUixLQUFMLEdBQWEsS0FBS0gsWUFBTCxHQUFvQixHQUFwQixHQUEwQixHQUF2QztBQUNILGFBSks7QUFLTlkscUJBTE0sdUJBS007QUFDUixxQkFBS0EsU0FBTCxHQUFpQixDQUFDLEtBQUtBLFNBQXZCO0FBQ0gsYUFQSztBQVFOQyx5QkFSTSx5QkFRUUosQ0FSUixFQVFXO0FBQUEsb0JBQ0xLLEtBREssR0FDS0wsRUFBRU0sYUFBRixDQUFnQkMsT0FEckIsQ0FDTEYsS0FESzs7QUFFYixxQkFBS1osU0FBTCxDQUFlWSxLQUFmLElBQXdCTCxFQUFFQyxNQUFGLENBQVNDLEtBQVQsQ0FBZU0sTUFBdkM7QUFDQSxxQkFBS0MsUUFBTCxDQUFjLENBQWQsRUFBaUJDLEtBQWpCLENBQXVCQyxHQUF2QixDQUEyQkMsS0FBM0IsQ0FBaUNQLEtBQWpDLEVBQXdDUSxJQUF4QyxHQUErQ2IsRUFBRUMsTUFBRixDQUFTQyxLQUF4RDtBQUNILGFBWks7QUFhTlksMkJBYk0sMkJBYVVkLENBYlYsRUFhYTtBQUNmLHFCQUFLUCxTQUFMLENBQWVzQixNQUFmLEdBQXdCZixFQUFFQyxNQUFGLENBQVNDLEtBQVQsQ0FBZU0sTUFBdkM7QUFDQSxxQkFBS0MsUUFBTCxDQUFjLENBQWQsRUFBaUJDLEtBQWpCLENBQXVCQyxHQUF2QixDQUEyQkMsS0FBM0IsQ0FBaUMsQ0FBakMsRUFBb0NDLElBQXBDLEdBQTJDYixFQUFFQyxNQUFGLENBQVNDLEtBQXBEO0FBQ0gsYUFoQks7QUFpQk5jLG1CQWpCTSxxQkFpQkk7QUFDTixvQkFBSSxLQUFLUCxRQUFMLENBQWMsQ0FBZCxFQUFpQkMsS0FBakIsQ0FBdUJDLEdBQXZCLENBQTJCQyxLQUEzQixDQUFpQ0osTUFBakMsS0FBNEMsQ0FBaEQsRUFBbUQ7QUFDL0Msc0NBQU0sUUFBTjtBQUNBO0FBQ0g7QUFDRCxxQkFBS0MsUUFBTCxDQUFjLENBQWQsRUFBaUJDLEtBQWpCLENBQXVCQyxHQUF2QixDQUEyQkMsS0FBM0IsQ0FBaUNLLElBQWpDLENBQXNDO0FBQ2xDSiwwQkFBTTtBQUQ0QixpQkFBdEM7QUFHSCxhQXpCSztBQTBCTkssZ0JBMUJNLGtCQTBCQztBQUNILHFCQUFLVCxRQUFMLENBQWMsQ0FBZCxFQUFpQkMsS0FBakIsQ0FBdUJDLEdBQXZCLENBQTJCakIsS0FBM0IsR0FBbUMsS0FBS0gsWUFBTCxHQUFvQixHQUFwQixHQUEwQixHQUE3RDtBQUNBLHFCQUFLNEIsVUFBTCxDQUFnQlIsR0FBaEIsR0FBc0IsS0FBS0YsUUFBTCxDQUFjLENBQWQsRUFBaUJDLEtBQWpCLENBQXVCQyxHQUE3Qzs7QUFGRywrQ0FHeUMsS0FBS0YsUUFIOUM7O0FBR0YzQixvQkFBSXNDLFVBQUosQ0FBZVgsUUFBZixDQUF3QixLQUFLWSxTQUE3QixDQUhFOztBQUlIdkMsb0JBQUlzQyxVQUFKLENBQWVFLE9BQWYsQ0FBdUIsS0FBS0QsU0FBNUIsSUFBeUMsS0FBS0YsVUFBOUM7QUFDQUksbUJBQUdDLFlBQUgsQ0FBZ0I7QUFDWkMsMkJBQU87QUFESyxpQkFBaEI7QUFHSDtBQWxDSyxTOzs7OztpQ0FYRDtBQUFBOztBQUFBLHNDQUNlLEtBQUtDLFdBQUwsQ0FBaUJDLE1BQWpCLENBQXdCO0FBQUEsdUJBQU9DLElBQUlDLEVBQUosS0FBVyxPQUFLQyxNQUF2QjtBQUFBLGFBQXhCLENBRGY7O0FBQUE7O0FBQ0osaUJBQUtYLFVBREQ7O0FBRUwsaUJBQUs1QixZQUFMLEdBQW9CLEtBQUtrQixRQUFMLENBQWMsQ0FBZCxFQUFpQkMsS0FBakIsQ0FBdUJDLEdBQXZCLENBQTJCakIsS0FBM0IsS0FBcUMsR0FBekQ7QUFDQSxnQkFBSSxLQUFLSCxZQUFULEVBQXVCO0FBQ25CLHFCQUFLa0IsUUFBTCxDQUFjLENBQWQsRUFBaUJDLEtBQWpCLENBQXVCQyxHQUF2QixDQUEyQkMsS0FBM0IsQ0FBaUNtQixPQUFqQyxDQUF5QyxVQUFDQyxJQUFELEVBQU8zQixLQUFQLEVBQWlCO0FBQ3RELDJCQUFLWixTQUFMLENBQWVZLEtBQWYsSUFBd0IyQixLQUFLbkIsSUFBTCxDQUFVTCxNQUFsQztBQUNILGlCQUZEO0FBR0gsYUFKRCxNQUlPO0FBQ0gscUJBQUtmLFNBQUwsQ0FBZXNCLE1BQWYsR0FBd0IsS0FBS04sUUFBTCxDQUFjLENBQWQsRUFBaUJDLEtBQWpCLENBQXVCQyxHQUF2QixDQUEyQkMsS0FBM0IsQ0FBaUMsQ0FBakMsRUFBb0NDLElBQXBDLENBQXlDTCxNQUFqRTtBQUNIO0FBQ0o7Ozs7RUExQm1DeUIsZUFBS0MsSTs7a0JBQXRCbEQsUSIsImZpbGUiOiJ0ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgTWl4aW4gZnJvbSAnLi9taXhpbic7XHJcbmltcG9ydCB7IHRvYXN0IH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xyXG5cclxuY29uc3QgYXBwID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvZ2xvYmFsRGF0YScpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdFRleHQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aWh+eroCcsXHJcbiAgfTtcclxuICBtaXhpbnMgPSBbTWl4aW5dO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgICBsaXN0OiBbMV0sXHJcbiAgICAgIGVkaXRNdWx0aXBsZTogZmFsc2UsXHJcbiAgICAgIHRleHRMZW5ndGg6IDMsXHJcbiAgICAgIHRleHRMaW1pdDoge30sXHJcbiAgICAgIHRoZW1lOiAnJyxcclxuICAgICAgYXV0b3BsYXk6IGZhbHNlLFxyXG4gICAgICBpbnRlcnZhbDogMjUwMCxcclxuICAgICAgZHVyYXRpb246IDUwMCxcclxuICB9O1xyXG4gIG9uTG9hZCgpIHtcclxuICAgICAgW3RoaXMucGFnZU1vZHVsZV0gPSB0aGlzLnRlbXBNb2R1bGVzLmZpbHRlcihvYmogPT4gb2JqLmlkID09PSB0aGlzLnBhZ2VJZCk7XHJcbiAgICAgIHRoaXMuZWRpdE11bHRpcGxlID0gdGhpcy5wYWdlRGF0YVswXS5wcm9wcy5jZmcudGhlbWUgPT09ICcyJztcclxuICAgICAgaWYgKHRoaXMuZWRpdE11bHRpcGxlKSB7XHJcbiAgICAgICAgICB0aGlzLnBhZ2VEYXRhWzBdLnByb3BzLmNmZy50ZXh0cy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMudGV4dExpbWl0W2luZGV4XSA9IGl0ZW0udGV4dC5sZW5ndGg7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMudGV4dExpbWl0LnNpbmdsZSA9IHRoaXMucGFnZURhdGFbMF0ucHJvcHMuY2ZnLnRleHRzWzBdLnRleHQubGVuZ3RoO1xyXG4gICAgICB9XHJcbiAgfVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICAgIHJhZGlvQm94Q2hhbmdlKGUpIHtcclxuICAgICAgICAgIHRoaXMuZWRpdE11bHRpcGxlID0gZS5kZXRhaWwudmFsdWUgIT09ICdzaW5nbGUnO1xyXG4gICAgICAgICAgdGhpcy50aGVtZSA9IHRoaXMuZWRpdE11bHRpcGxlID8gJzInIDogJzEnO1xyXG4gICAgICB9LFxyXG4gICAgICBzaG93R3JvdXAoKSB7XHJcbiAgICAgICAgICB0aGlzLnNob3dHcm91cCA9ICF0aGlzLnNob3dHcm91cDtcclxuICAgICAgfSxcclxuICAgICAgdGV4dEFyZWFJbnB1dChlKSB7XHJcbiAgICAgICAgICBjb25zdCB7IGluZGV4IH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcclxuICAgICAgICAgIHRoaXMudGV4dExpbWl0W2luZGV4XSA9IGUuZGV0YWlsLnZhbHVlLmxlbmd0aDtcclxuICAgICAgICAgIHRoaXMucGFnZURhdGFbMF0ucHJvcHMuY2ZnLnRleHRzW2luZGV4XS50ZXh0ID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgIH0sXHJcbiAgICAgIHRleHRTaW5nbGVJbnB1dChlKSB7XHJcbiAgICAgICAgICB0aGlzLnRleHRMaW1pdC5zaW5nbGUgPSBlLmRldGFpbC52YWx1ZS5sZW5ndGg7XHJcbiAgICAgICAgICB0aGlzLnBhZ2VEYXRhWzBdLnByb3BzLmNmZy50ZXh0c1swXS50ZXh0ID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgIH0sXHJcbiAgICAgIGFkZFRleHQoKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5wYWdlRGF0YVswXS5wcm9wcy5jZmcudGV4dHMubGVuZ3RoID09PSA0KSB7XHJcbiAgICAgICAgICAgICAgdG9hc3QoJ+acgOWkmua3u+WKoDXmnaEnKTtcclxuICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLnBhZ2VEYXRhWzBdLnByb3BzLmNmZy50ZXh0cy5wdXNoKHtcclxuICAgICAgICAgICAgICB0ZXh0OiAnJyxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9LFxyXG4gICAgICBzYXZlKCkge1xyXG4gICAgICAgICAgdGhpcy5wYWdlRGF0YVswXS5wcm9wcy5jZmcudGhlbWUgPSB0aGlzLmVkaXRNdWx0aXBsZSA/ICcyJyA6ICcxJztcclxuICAgICAgICAgIHRoaXMucGFnZU1vZHVsZS5jZmcgPSB0aGlzLnBhZ2VEYXRhWzBdLnByb3BzLmNmZztcclxuICAgICAgICAgIFthcHAuZ2xvYmFsRGF0YS5wYWdlRGF0YVt0aGlzLnBhZ2VJbmRleF1dID0gdGhpcy5wYWdlRGF0YTtcclxuICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLm1vZHVsZXNbdGhpcy5wYWdlSW5kZXhdID0gdGhpcy5wYWdlTW9kdWxlO1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcclxuICAgICAgICAgICAgICBkZWx0YTogMSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9LFxyXG4gIH07XHJcbn1cclxuIl19
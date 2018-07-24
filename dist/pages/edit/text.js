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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRleHQuanMiXSwibmFtZXMiOlsiYXBwIiwicmVxdWlyZSIsIkVkaXRUZXh0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm1peGlucyIsIk1peGluIiwiZGF0YSIsImxpc3QiLCJlZGl0TXVsdGlwbGUiLCJ0ZXh0TGVuZ3RoIiwidGV4dExpbWl0IiwidGhlbWUiLCJhdXRvcGxheSIsImludGVydmFsIiwiZHVyYXRpb24iLCJtZXRob2RzIiwicmFkaW9Cb3hDaGFuZ2UiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJzaG93R3JvdXAiLCJ0ZXh0QXJlYUlucHV0IiwiaW5kZXgiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImxlbmd0aCIsInBhZ2VEYXRhIiwicHJvcHMiLCJjZmciLCJ0ZXh0cyIsInRleHQiLCJ0ZXh0U2luZ2xlSW5wdXQiLCJzaW5nbGUiLCJhZGRUZXh0IiwicHVzaCIsInNhdmUiLCJwYWdlTW9kdWxlIiwiZ2xvYmFsRGF0YSIsInBhZ2VJbmRleCIsIm1vZHVsZXMiLCJ3eCIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwidGVtcE1vZHVsZXMiLCJmaWx0ZXIiLCJvYmoiLCJpZCIsInBhZ2VJZCIsImZvckVhY2giLCJpdGVtIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxNQUFNQyxRQUFRLHdCQUFSLENBQVo7O0lBRXFCQyxROzs7Ozs7Ozs7Ozs7Ozs4TEFDbkJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdUQyxNLEdBQVMsQ0FBQ0MsZUFBRCxDLFFBRVRDLEksR0FBTztBQUNIQyxrQkFBTSxDQUFDLENBQUQsQ0FESDtBQUVIQywwQkFBYyxLQUZYO0FBR0hDLHdCQUFZLENBSFQ7QUFJSEMsdUJBQVcsRUFKUjtBQUtIQyxtQkFBTyxFQUxKO0FBTUhDLHNCQUFVLEtBTlA7QUFPSEMsc0JBQVUsSUFQUDtBQVFIQyxzQkFB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QUFqQyxDQUF5QyxVQUFDQyxJQUFELEVBQU8zQixLQUFQLEVBQWlCO0FBQ3RELDJCQUFLWixTQUFMLENBQWVZLEtBQWYsSUFBd0IyQixLQUFLbkIsSUFBTCxDQUFVTCxNQUFsQztBQUNILGlCQUZEO0FBR0gsYUFKRCxNQUlPO0FBQ0gscUJBQUtmLFNBQUwsQ0FBZXNCLE1BQWYsR0FBd0IsS0FBS04sUUFBTCxDQUFjLENBQWQsRUFBaUJDLEtBQWpCLENBQXVCQyxHQUF2QixDQUEyQkMsS0FBM0IsQ0FBaUMsQ0FBakMsRUFBb0NDLElBQXBDLENBQXlDTCxNQUFqRTtBQUNIO0FBQ0o7Ozs7RUExQm1DeUIsZUFBS0MsSTs7a0JBQXRCbEQsUSIsImZpbGUiOiJ0ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBNaXhpbiBmcm9tICcuL21peGluJztcbmltcG9ydCB7IHRvYXN0IH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuXG5jb25zdCBhcHAgPSByZXF1aXJlKCcuLi8uLi91dGlscy9nbG9iYWxEYXRhJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRUZXh0IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aWh+eroCcsXG4gIH07XG4gIG1peGlucyA9IFtNaXhpbl07XG5cbiAgZGF0YSA9IHtcbiAgICAgIGxpc3Q6IFsxXSxcbiAgICAgIGVkaXRNdWx0aXBsZTogZmFsc2UsXG4gICAgICB0ZXh0TGVuZ3RoOiAzLFxuICAgICAgdGV4dExpbWl0OiB7fSxcbiAgICAgIHRoZW1lOiAnJyxcbiAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgIGludGVydmFsOiAyNTAwLFxuICAgICAgZHVyYXRpb246IDUwMCxcbiAgfTtcbiAgb25Mb2FkKCkge1xuICAgICAgW3RoaXMucGFnZU1vZHVsZV0gPSB0aGlzLnRlbXBNb2R1bGVzLmZpbHRlcihvYmogPT4gb2JqLmlkID09PSB0aGlzLnBhZ2VJZCk7XG4gICAgICB0aGlzLmVkaXRNdWx0aXBsZSA9IHRoaXMucGFnZURhdGFbMF0ucHJvcHMuY2ZnLnRoZW1lID09PSAnMic7XG4gICAgICBpZiAodGhpcy5lZGl0TXVsdGlwbGUpIHtcbiAgICAgICAgICB0aGlzLnBhZ2VEYXRhWzBdLnByb3BzLmNmZy50ZXh0cy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnRleHRMaW1pdFtpbmRleF0gPSBpdGVtLnRleHQubGVuZ3RoO1xuICAgICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnRleHRMaW1pdC5zaW5nbGUgPSB0aGlzLnBhZ2VEYXRhWzBdLnByb3BzLmNmZy50ZXh0c1swXS50ZXh0Lmxlbmd0aDtcbiAgICAgIH1cbiAgfVxuICBtZXRob2RzID0ge1xuICAgICAgcmFkaW9Cb3hDaGFuZ2UoZSkge1xuICAgICAgICAgIHRoaXMuZWRpdE11bHRpcGxlID0gZS5kZXRhaWwudmFsdWUgIT09ICdzaW5nbGUnO1xuICAgICAgICAgIHRoaXMudGhlbWUgPSB0aGlzLmVkaXRNdWx0aXBsZSA/ICcyJyA6ICcxJztcbiAgICAgIH0sXG4gICAgICBzaG93R3JvdXAoKSB7XG4gICAgICAgICAgdGhpcy5zaG93R3JvdXAgPSAhdGhpcy5zaG93R3JvdXA7XG4gICAgICB9LFxuICAgICAgdGV4dEFyZWFJbnB1dChlKSB7XG4gICAgICAgICAgY29uc3QgeyBpbmRleCB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XG4gICAgICAgICAgdGhpcy50ZXh0TGltaXRbaW5kZXhdID0gZS5kZXRhaWwudmFsdWUubGVuZ3RoO1xuICAgICAgICAgIHRoaXMucGFnZURhdGFbMF0ucHJvcHMuY2ZnLnRleHRzW2luZGV4XS50ZXh0ID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICB9LFxuICAgICAgdGV4dFNpbmdsZUlucHV0KGUpIHtcbiAgICAgICAgICB0aGlzLnRleHRMaW1pdC5zaW5nbGUgPSBlLmRldGFpbC52YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgdGhpcy5wYWdlRGF0YVswXS5wcm9wcy5jZmcudGV4dHNbMF0udGV4dCA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgfSxcbiAgICAgIGFkZFRleHQoKSB7XG4gICAgICAgICAgaWYgKHRoaXMucGFnZURhdGFbMF0ucHJvcHMuY2ZnLnRleHRzLmxlbmd0aCA9PT0gNCkge1xuICAgICAgICAgICAgICB0b2FzdCgn5pyA5aSa5re75YqgNeadoScpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMucGFnZURhdGFbMF0ucHJvcHMuY2ZnLnRleHRzLnB1c2goe1xuICAgICAgICAgICAgICB0ZXh0OiAnJyxcbiAgICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBzYXZlKCkge1xuICAgICAgICAgIHRoaXMucGFnZURhdGFbMF0ucHJvcHMuY2ZnLnRoZW1lID0gdGhpcy5lZGl0TXVsdGlwbGUgPyAnMicgOiAnMSc7XG4gICAgICAgICAgdGhpcy5wYWdlTW9kdWxlLmNmZyA9IHRoaXMucGFnZURhdGFbMF0ucHJvcHMuY2ZnO1xuICAgICAgICAgIFthcHAuZ2xvYmFsRGF0YS5wYWdlRGF0YVt0aGlzLnBhZ2VJbmRleF1dID0gdGhpcy5wYWdlRGF0YTtcbiAgICAgICAgICBhcHAuZ2xvYmFsRGF0YS5tb2R1bGVzW3RoaXMucGFnZUluZGV4XSA9IHRoaXMucGFnZU1vZHVsZTtcbiAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICBkZWx0YTogMSxcbiAgICAgICAgICB9KTtcbiAgICAgIH0sXG4gIH07XG59XG4iXX0=
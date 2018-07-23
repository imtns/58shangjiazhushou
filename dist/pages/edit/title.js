'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _mixin = require('./mixin.js');

var _mixin2 = _interopRequireDefault(_mixin);

var _utils = require('./../../utils/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
                this.pageData.subtitle = e.detail.value;
            },
            bindPickerChange: function bindPickerChange(e) {
                console.log(this.pageList);
                this.selectorIndex = e.detail.value;
                this.pageData.pageKey = this.pageList[e.detail.value].key;
            },
            bindTitleInput: function bindTitleInput(e) {
                this.pageData.title = e.detail.value;
            },
            bindLinkInput: function bindLinkInput(e) {
                this.pageData.textName = e.detail.value;
            },
            save: function save() {
                if (!this.pageData.title) {
                    (0, _utils.toast)('请输入文章标题');
                    return;
                }
                this.saveAvaliable = true;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return Title;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Title , 'pages/edit/title'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRpdGxlLmpzIl0sIm5hbWVzIjpbIlRpdGxlIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm1peGlucyIsIk1peGluIiwiZGF0YSIsInRleHRMaW1pdCIsInRpdGxlIiwic3VidGl0bGUiLCJ0ZXh0TmFtZSIsImxpbmtOYW1lIiwicGFnZUtleSIsIm1ldGhvZHMiLCJ0ZXh0YXJlYUlucHV0IiwiZSIsImRldGFpbCIsInZhbHVlIiwibGVuZ3RoIiwicGFnZURhdGEiLCJiaW5kUGlja2VyQ2hhbmdlIiwiY29uc29sZSIsImxvZyIsInBhZ2VMaXN0Iiwic2VsZWN0b3JJbmRleCIsImtleSIsImJpbmRUaXRsZUlucHV0IiwiYmluZExpbmtJbnB1dCIsInNhdmUiLCJzYXZlQXZhbGlhYmxlIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVEMsTSxHQUFTLENBQUNDLGVBQUQsQyxRQUNUQyxJLEdBQU87QUFDSEMsdUJBQVcsQ0FEUjtBQUVIQyxtQkFBTyxFQUZKO0FBR0hDLHNCQUFVLEVBSFA7QUFJSEMsc0JBQVUsRUFKUDtBQUtIQyxzQkFBVSxFQUxQO0FBTUhDLHFCQUFTO0FBTk4sUyxRQVFQQyxPLEdBQVU7QUFDTkMseUJBRE0seUJBQ1FDLENBRFIsRUFDVztBQUNiLHFCQUFLUixTQUFMLEdBQWlCUSxFQUFFQyxNQUFGLENBQVNDLEtBQVQsQ0FBZUMsTUFBaEM7QUFDQSxxQkFBS0MsUUFBTCxDQUFjVixRQUFkLEdBQXlCTSxFQUFFQyxNQUFGLENBQVNDLEtBQWxDO0FBQ0gsYUFKSztBQUtORyw0QkFMTSw0QkFLV0wsQ0FMWCxFQUtjO0FBQ2hCTSx3QkFBUUMsR0FBUixDQUFZLEtBQUtDLFFBQWpCO0FBQ0EscUJBQUtDLGFBQUwsR0FBcUJULEVBQUVDLE1BQUYsQ0FBU0MsS0FBOUI7QUFDQSxxQkFBS0UsUUFBTCxDQUFjUCxPQUFkLEdBQXdCLEtBQUtXLFFBQUwsQ0FBY1IsRUFBRUMsTUFBRixDQUFTQyxLQUF2QixFQUE4QlEsR0FBdEQ7QUFDSCxhQVRLO0FBVU5DLDBCQVZNLDBCQVVTWCxDQVZULEVBVVk7QUFDZCxxQkFBS0ksUUFBTCxDQUFjWCxLQUFkLEdBQXNCTyxFQUFFQyxNQUFGLENBQVNDLEtBQS9CO0FBQ0gsYUFaSztBQWFOVSx5QkFiTSx5QkFhUVosQ0FiUixFQWFXO0FBQ2IscUJBQUtJLFFBQUwsQ0FBY1QsUUFBZCxHQUF5QkssRUFBRUMsTUFBRixDQUFTQyxLQUFsQztBQUNILGFBZks7QUFnQk5XLGdCQWhCTSxrQkFnQkM7QUFDSCxvQkFBSSxDQUFDLEtBQUtULFFBQUwsQ0FBY1gsS0FBbkIsRUFBMEI7QUFDdEIsc0NBQU0sU0FBTjtBQUNBO0FBQ0g7QUFDRCxxQkFBS3FCLGFBQUwsR0FBcUIsSUFBckI7QUFDSDtBQXRCSyxTOzs7O0VBYnFCQyxlQUFLQyxJOztrQkFBbkI5QixLIiwiZmlsZSI6InRpdGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgTWl4aW4gZnJvbSAnLi9taXhpbic7XHJcbmltcG9ydCB7IHRvYXN0IH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGl0bGUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmoIfpopgnLFxyXG4gICAgfVxyXG4gICAgbWl4aW5zID0gW01peGluXTtcclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgdGV4dExpbWl0OiAwLFxyXG4gICAgICAgIHRpdGxlOiAnJyxcclxuICAgICAgICBzdWJ0aXRsZTogJycsXHJcbiAgICAgICAgdGV4dE5hbWU6ICcnLFxyXG4gICAgICAgIGxpbmtOYW1lOiAnJyxcclxuICAgICAgICBwYWdlS2V5OiAnJyxcclxuICAgIH1cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgdGV4dGFyZWFJbnB1dChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dExpbWl0ID0gZS5kZXRhaWwudmFsdWUubGVuZ3RoO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VEYXRhLnN1YnRpdGxlID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kUGlja2VyQ2hhbmdlKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5wYWdlTGlzdCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0b3JJbmRleCA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VEYXRhLnBhZ2VLZXkgPSB0aGlzLnBhZ2VMaXN0W2UuZGV0YWlsLnZhbHVlXS5rZXk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kVGl0bGVJbnB1dChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZURhdGEudGl0bGUgPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRMaW5rSW5wdXQoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VEYXRhLnRleHROYW1lID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzYXZlKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMucGFnZURhdGEudGl0bGUpIHtcclxuICAgICAgICAgICAgICAgIHRvYXN0KCfor7fovpPlhaXmlofnq6DmoIfpopgnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNhdmVBdmFsaWFibGUgPSB0cnVlO1xyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbn1cclxuIl19
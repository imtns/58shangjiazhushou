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

var VideoPlay = function (_wepy$page) {
    _inherits(VideoPlay, _wepy$page);

    function VideoPlay() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, VideoPlay);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = VideoPlay.__proto__ || Object.getPrototypeOf(VideoPlay)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            enablePullDownRefresh: false,
            disableScroll: true,
            backgroundColor: '#000',
            navigationBarBackgroundColor: '#000',
            navigationBarTextStyle: '#000',
            navigationBarTitleText: '视频播放'
        }, _this.data = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(VideoPlay, [{
        key: 'onLoad',
        value: function onLoad(options) {
            var url = options.url;

            this.setData({
                videoPath: url
            });
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            var videoContext = _wepy2.default.createVideoContext('myVideo');
            videoContext.play();
        }
    }]);

    return VideoPlay;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(VideoPlay , 'pages/VideoPlay'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlZpZGVvUGxheS5qcyJdLCJuYW1lcyI6WyJWaWRlb1BsYXkiLCJjb25maWciLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJkaXNhYmxlU2Nyb2xsIiwiYmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsIm9wdGlvbnMiLCJ1cmwiLCJzZXREYXRhIiwidmlkZW9QYXRoIiwidmlkZW9Db250ZXh0Iiwid2VweSIsImNyZWF0ZVZpZGVvQ29udGV4dCIsInBsYXkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFM7Ozs7Ozs7Ozs7Ozs7O2dNQUNqQkMsTSxHQUFTO0FBQ0xDLG1DQUF1QixLQURsQjtBQUVMQywyQkFBZSxJQUZWO0FBR0xDLDZCQUFpQixNQUhaO0FBSUxDLDBDQUE4QixNQUp6QjtBQUtMQyxvQ0FBd0IsTUFMbkI7QUFNTEMsb0NBQXdCO0FBTm5CLFMsUUFRVEMsSSxHQUFPLEU7Ozs7OytCQUVDQyxPLEVBQVM7QUFBQSxnQkFDTEMsR0FESyxHQUNHRCxPQURILENBQ0xDLEdBREs7O0FBRWIsaUJBQUtDLE9BQUwsQ0FBYTtBQUNUQywyQkFBV0Y7QUFERixhQUFiO0FBR0g7OztpQ0FDUztBQUNOLGdCQUFNRyxlQUFlQyxlQUFLQyxrQkFBTCxDQUF3QixTQUF4QixDQUFyQjtBQUNBRix5QkFBYUcsSUFBYjtBQUNIOzs7O0VBcEJrQ0YsZUFBS0csSTs7a0JBQXZCakIsUyIsImZpbGUiOiJWaWRlb1BsYXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWRlb1BsYXkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiBmYWxzZSxcbiAgICAgICAgZGlzYWJsZVNjcm9sbDogdHJ1ZSxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzAwMCcsXG4gICAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjMDAwJyxcbiAgICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJyMwMDAnLFxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6KeG6aKR5pKt5pS+JyxcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICB9XG4gICAgb25Mb2FkIChvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IHsgdXJsIH0gPSBvcHRpb25zO1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgdmlkZW9QYXRoOiB1cmwsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgICBjb25zdCB2aWRlb0NvbnRleHQgPSB3ZXB5LmNyZWF0ZVZpZGVvQ29udGV4dCgnbXlWaWRlbycpO1xuICAgICAgICB2aWRlb0NvbnRleHQucGxheSgpO1xuICAgIH1cbn1cbiJdfQ==
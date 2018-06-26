'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _utils = require('./../utils/index.js');

var _RemindBar = require('./../components/RemindBar.js');

var _RemindBar2 = _interopRequireDefault(_RemindBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RegistSuccess = function (_wepy$page) {
    _inherits(RegistSuccess, _wepy$page);

    function RegistSuccess() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, RegistSuccess);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RegistSuccess.__proto__ || Object.getPrototypeOf(RegistSuccess)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '注册'
        }, _this.$repeat = {}, _this.$props = { "RemindBar": { "xmlns:v-bind": "", "v-bind:currentstep.once": "currentstep" } }, _this.$events = {}, _this.components = {
            RemindBar: _RemindBar2.default
        }, _this.data = {
            currentstep: '3'
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(RegistSuccess, [{
        key: 'onLoad',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return (0, _utils.sleep)();

                            case 2:
                                console.log('onLoad');

                            case 3:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function onLoad() {
                return _ref2.apply(this, arguments);
            }

            return onLoad;
        }()
    }, {
        key: 'backToIndex',
        value: function backToIndex() {
            _wepy2.default.reLaunch({
                url: './home'
            });
        }
    }]);

    return RegistSuccess;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(RegistSuccess , 'pages/registSuccess'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZ2lzdFN1Y2Nlc3MuanMiXSwibmFtZXMiOlsiUmVnaXN0U3VjY2VzcyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJSZW1pbmRCYXIiLCJkYXRhIiwiY3VycmVudHN0ZXAiLCJjb25zb2xlIiwibG9nIiwid2VweSIsInJlTGF1bmNoIiwidXJsIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsYTs7Ozs7Ozs7Ozs7Ozs7d01BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVkMsTyxHQUFVLEUsUUFDYkMsTSxHQUFTLEVBQUMsYUFBWSxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLDJCQUEwQixhQUE3QyxFQUFiLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ05DO0FBRE0sUyxRQUdWQyxJLEdBQU87QUFDSEMseUJBQWE7QUFEVixTOzs7Ozs7Ozs7Ozs7dUNBSUcsbUI7OztBQUNOQyx3Q0FBUUMsR0FBUixDQUFZLFFBQVo7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQ0FFVTtBQUNWQywyQkFBS0MsUUFBTCxDQUFjO0FBQ1ZDLHFCQUFLO0FBREssYUFBZDtBQUdIOzs7O0VBckJzQ0YsZUFBS0csSTs7a0JBQTNCZixhIiwiZmlsZSI6InJlZ2lzdFN1Y2Nlc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG5pbXBvcnQgeyBzbGVlcCB9IGZyb20gJy4uL3V0aWxzJztcclxuXHJcbmltcG9ydCBSZW1pbmRCYXIgZnJvbSAnLi4vY29tcG9uZW50cy9SZW1pbmRCYXInO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVnaXN0U3VjY2VzcyBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+azqOWGjCcsXHJcbiAgICB9XHJcbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiUmVtaW5kQmFyXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpjdXJyZW50c3RlcC5vbmNlXCI6XCJjdXJyZW50c3RlcFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgICAgUmVtaW5kQmFyLFxyXG4gICAgfVxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBjdXJyZW50c3RlcDogJzMnLFxyXG4gICAgfVxyXG4gICAgYXN5bmMgb25Mb2FkKCkge1xyXG4gICAgICAgIGF3YWl0IHNsZWVwKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ29uTG9hZCcpO1xyXG4gICAgfVxyXG4gICAgYmFja1RvSW5kZXgoKSB7XHJcbiAgICAgICAgd2VweS5yZUxhdW5jaCh7XHJcbiAgICAgICAgICAgIHVybDogJy4vaG9tZScsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19
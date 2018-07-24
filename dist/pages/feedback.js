'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _utils = require('./../utils/index.js');

var _ajax = require('./../utils/ajax.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Feedback = function (_wepy$page) {
    _inherits(Feedback, _wepy$page);

    function Feedback() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Feedback);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Feedback.__proto__ || Object.getPrototypeOf(Feedback)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '意见反馈'
        }, _this.data = {
            list: [{
                type: '1',
                text: '优享小程序介绍'
            }, {
                type: '2',
                text: '微信小程序介绍'
            }, {
                type: '3',
                text: '登录常见问题'
            }],
            content: ''
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Feedback, [{
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
        key: 'input',
        value: function input(e) {
            var val = e.detail.value;
            this.content = val;
            this.$apply();
        }
    }, {
        key: 'submit',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var con;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                con = (0, _utils.filteremoji)(this.content);

                                if (con.trim()) {
                                    _context2.next = 4;
                                    break;
                                }

                                (0, _utils.alert)('请编辑留言后提交！');
                                return _context2.abrupt('return');

                            case 4:
                                _context2.prev = 4;

                                this.content = '';
                                this.$apply();
                                console.log('3', this.content, '4', con);
                                _context2.next = 10;
                                return (0, _ajax.post)('/suggestion/submit', { content: con });

                            case 10:
                                (0, _utils.alert)('提交成功，谢谢您的建议！', '提示', function () {
                                    console.log('进入callback');
                                    _wepy2.default.redirectTo({
                                        url: 'home'
                                    });
                                });
                                _context2.next = 16;
                                break;

                            case 13:
                                _context2.prev = 13;
                                _context2.t0 = _context2['catch'](4);

                                console.log(_context2.t0);

                            case 16:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[4, 13]]);
            }));

            function submit() {
                return _ref3.apply(this, arguments);
            }

            return submit;
        }()
    }, {
        key: 'tofeedbackDetail',
        value: function tofeedbackDetail(e) {
            var type = e.currentTarget.dataset.type;

            if (type === '3') {
                _wepy2.default.navigateTo({
                    url: './PopQuestions'
                });
            } else {
                _wepy2.default.navigateTo({
                    url: './feedbackDetail?type=' + type
                });
            }
        }
    }]);

    return Feedback;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Feedback , 'pages/feedback'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlZWRiYWNrLmpzIl0sIm5hbWVzIjpbIkZlZWRiYWNrIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJsaXN0IiwidHlwZSIsInRleHQiLCJjb250ZW50IiwiY29uc29sZSIsImxvZyIsImUiLCJ2YWwiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRhcHBseSIsImNvbiIsInRyaW0iLCJ3ZXB5IiwicmVkaXJlY3RUbyIsInVybCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwibmF2aWdhdGVUbyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7Ozs7Ozs4TEFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdUQyxJLEdBQU87QUFDSEMsa0JBQU0sQ0FDRjtBQUNJQyxzQkFBTSxHQURWO0FBRUlDLHNCQUFNO0FBRlYsYUFERSxFQUtGO0FBQ0lELHNCQUFNLEdBRFY7QUFFSUMsc0JBQU07QUFGVixhQUxFLEVBU0Y7QUFDSUQsc0JBQU0sR0FEVjtBQUVJQyxzQkFBTTtBQUZWLGFBVEUsQ0FESDtBQWVIQyxxQkFBUztBQWZOLFM7Ozs7Ozs7Ozs7Ozt1Q0FrQkcsbUI7OztBQUNOQyx3Q0FBUUMsR0FBUixDQUFZLFFBQVo7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4QkFFRUMsQyxFQUFHO0FBQ0wsZ0JBQU1DLE1BQU1ELEVBQUVFLE1BQUYsQ0FBU0MsS0FBckI7QUFDQSxpQkFBS04sT0FBTCxHQUFlSSxHQUFmO0FBQ0EsaUJBQUtHLE1BQUw7QUFDSDs7Ozs7Ozs7OztBQUVTQyxtQyxHQUFNLHdCQUFZLEtBQUtSLE9BQWpCLEM7O29DQUNQUSxJQUFJQyxJQUFKLEU7Ozs7O0FBQ0Qsa0RBQU0sV0FBTjs7Ozs7O0FBSUEscUNBQUtULE9BQUwsR0FBZSxFQUFmO0FBQ0EscUNBQUtPLE1BQUw7QUFDQU4sd0NBQVFDLEdBQVIsQ0FBWSxHQUFaLEVBQWlCLEtBQUtGLE9BQXRCLEVBQStCLEdBQS9CLEVBQW9DUSxHQUFwQzs7dUNBQ00sZ0JBQUssb0JBQUwsRUFBMkIsRUFBRVIsU0FBU1EsR0FBWCxFQUEzQixDOzs7QUFDTixrREFBTSxjQUFOLEVBQXNCLElBQXRCLEVBQTRCLFlBQU07QUFDOUJQLDRDQUFRQyxHQUFSLENBQVksWUFBWjtBQUNBUSxtREFBS0MsVUFBTCxDQUFnQjtBQUNaQyw2Q0FBSztBQURPLHFDQUFoQjtBQUdILGlDQUxEOzs7Ozs7OztBQU9BWCx3Q0FBUUMsR0FBUjs7Ozs7Ozs7Ozs7Ozs7Ozs7O3lDQUdTQyxDLEVBQUc7QUFBQSxnQkFDUkwsSUFEUSxHQUNDSyxFQUFFVSxhQUFGLENBQWdCQyxPQURqQixDQUNSaEIsSUFEUTs7QUFFaEIsZ0JBQUlBLFNBQVMsR0FBYixFQUFrQjtBQUNkWSwrQkFBS0ssVUFBTCxDQUFnQjtBQUNaSCx5QkFBSztBQURPLGlCQUFoQjtBQUdILGFBSkQsTUFJTztBQUNIRiwrQkFBS0ssVUFBTCxDQUFnQjtBQUNaSCxvREFBOEJkO0FBRGxCLGlCQUFoQjtBQUdIO0FBQ0o7Ozs7RUE5RGlDWSxlQUFLTSxJOztrQkFBdEJ2QixRIiwiZmlsZSI6ImZlZWRiYWNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuaW1wb3J0IHsgc2xlZXAsIGFsZXJ0LCBmaWx0ZXJlbW9qaSB9IGZyb20gJy4uL3V0aWxzJztcblxuaW1wb3J0IHsgcG9zdCB9IGZyb20gJy4uL3V0aWxzL2FqYXgnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGZWVkYmFjayBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oSP6KeB5Y+N6aaIJyxcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgICAgbGlzdDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6ICcxJyxcbiAgICAgICAgICAgICAgICB0ZXh0OiAn5LyY5Lqr5bCP56iL5bqP5LuL57uNJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogJzInLFxuICAgICAgICAgICAgICAgIHRleHQ6ICflvq7kv6HlsI/nqIvluo/ku4vnu40nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnMycsXG4gICAgICAgICAgICAgICAgdGV4dDogJ+eZu+W9leW4uOingemXrumimCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBjb250ZW50OiAnJyxcbiAgICB9XG4gICAgYXN5bmMgb25Mb2FkKCkge1xuICAgICAgICBhd2FpdCBzbGVlcCgpO1xuICAgICAgICBjb25zb2xlLmxvZygnb25Mb2FkJyk7XG4gICAgfVxuICAgIGlucHV0KGUpIHtcbiAgICAgICAgY29uc3QgdmFsID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICAgIHRoaXMuY29udGVudCA9IHZhbDtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG4gICAgYXN5bmMgc3VibWl0KCkge1xuICAgICAgICBjb25zdCBjb24gPSBmaWx0ZXJlbW9qaSh0aGlzLmNvbnRlbnQpO1xuICAgICAgICBpZiAoIWNvbi50cmltKCkpIHtcbiAgICAgICAgICAgIGFsZXJ0KCfor7fnvJbovpHnlZnoqIDlkI7mj5DkuqTvvIEnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gJyc7XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJzMnLCB0aGlzLmNvbnRlbnQsICc0JywgY29uKTtcbiAgICAgICAgICAgIGF3YWl0IHBvc3QoJy9zdWdnZXN0aW9uL3N1Ym1pdCcsIHsgY29udGVudDogY29uIH0pO1xuICAgICAgICAgICAgYWxlcnQoJ+aPkOS6pOaIkOWKn++8jOiwouiwouaCqOeahOW7uuiuru+8gScsICfmj5DnpLonLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+i/m+WFpWNhbGxiYWNrJyk7XG4gICAgICAgICAgICAgICAgd2VweS5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnaG9tZScsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdG9mZWVkYmFja0RldGFpbChlKSB7XG4gICAgICAgIGNvbnN0IHsgdHlwZSB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XG4gICAgICAgIGlmICh0eXBlID09PSAnMycpIHtcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgdXJsOiAnLi9Qb3BRdWVzdGlvbnMnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgIHVybDogYC4vZmVlZGJhY2tEZXRhaWw/dHlwZT0ke3R5cGV9YCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _ajax = require('./../utils/ajax.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Registed = function (_wepy$page) {
    _inherits(Registed, _wepy$page);

    function Registed() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Registed);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Registed.__proto__ || Object.getPrototypeOf(Registed)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '注册'
        }, _this.data = {
            currentApp: [],
            otherlist: [],
            current_mpid: ''
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Registed, [{
        key: 'onLoad',
        value: function onLoad() {}
    }, {
        key: 'onShow',
        value: function onShow() {
            try {
                this.current_mpid = _wepy2.default.getStorageSync('current_mpid') || '';
            } catch (e) {
                console.log(e);
            }
            this.otherlist = [];
            this.currentApp = [];
            this.$apply();
            this.loadList();
        }
    }, {
        key: 'toregist',
        value: function toregist(e) {
            var _e$currentTarget$data = e.currentTarget.dataset.id,
                id = _e$currentTarget$data === undefined ? '' : _e$currentTarget$data;

            _wepy2.default.setStorageSync('registMappid', id);
            _wepy2.default.navigateTo({
                url: './registMainAccount'
            });
        }
    }, {
        key: 'loadList',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _this2 = this;

                var _ref3, data, mpinfos;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                _context.next = 3;
                                return (0, _ajax.get)('/mplogic/mysignmplist');

                            case 3:
                                _ref3 = _context.sent;
                                data = _ref3.data;
                                mpinfos = data.mpinfos;

                                if (!(mpinfos.length <= 0)) {
                                    _context.next = 8;
                                    break;
                                }

                                return _context.abrupt('return');

                            case 8:
                                mpinfos.forEach(function (appinfo) {
                                    var ele = appinfo;
                                    if (ele.headImg && ele.headImg.indexOf('http') === -1) {
                                        ele.headImg = 'https://pic1.58cdn.com.cn' + ele.headImg;
                                    }
                                    if (ele.id === _this2.current_mpid) {
                                        _this2.currentApp.push(ele);
                                    } else if (ele.nickName !== '') {
                                        _this2.otherlist.push(ele);
                                    }
                                });
                                this.$apply();
                                _context.next = 15;
                                break;

                            case 12:
                                _context.prev = 12;
                                _context.t0 = _context['catch'](0);

                                console.log(_context.t0);

                            case 15:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[0, 12]]);
            }));

            function loadList() {
                return _ref2.apply(this, arguments);
            }

            return loadList;
        }()
    }]);

    return Registed;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Registed , 'pages/registed'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZ2lzdGVkLmpzIl0sIm5hbWVzIjpbIlJlZ2lzdGVkIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJjdXJyZW50QXBwIiwib3RoZXJsaXN0IiwiY3VycmVudF9tcGlkIiwid2VweSIsImdldFN0b3JhZ2VTeW5jIiwiZSIsImNvbnNvbGUiLCJsb2ciLCIkYXBwbHkiLCJsb2FkTGlzdCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaWQiLCJzZXRTdG9yYWdlU3luYyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJtcGluZm9zIiwibGVuZ3RoIiwiZm9yRWFjaCIsImFwcGluZm8iLCJlbGUiLCJoZWFkSW1nIiwiaW5kZXhPZiIsInB1c2giLCJuaWNrTmFtZSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7Ozs7Ozs4TEFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdUQyxJLEdBQU87QUFDSEMsd0JBQVksRUFEVDtBQUVIQyx1QkFBVyxFQUZSO0FBR0hDLDBCQUFjO0FBSFgsUzs7Ozs7aUNBS0csQ0FDVDs7O2lDQUNTO0FBQ04sZ0JBQUk7QUFDQSxxQkFBS0EsWUFBTCxHQUFvQkMsZUFBS0MsY0FBTCxDQUFvQixjQUFwQixLQUF1QyxFQUEzRDtBQUNILGFBRkQsQ0FFRSxPQUFPQyxDQUFQLEVBQVU7QUFDUkMsd0JBQVFDLEdBQVIsQ0FBWUYsQ0FBWjtBQUNIO0FBQ0QsaUJBQUtKLFNBQUwsR0FBaUIsRUFBakI7QUFDQSxpQkFBS0QsVUFBTCxHQUFrQixFQUFsQjtBQUNBLGlCQUFLUSxNQUFMO0FBQ0EsaUJBQUtDLFFBQUw7QUFDSDs7O2lDQUNTSixDLEVBQUc7QUFBQSx3Q0FDV0EsRUFBRUssYUFBRixDQUFnQkMsT0FEM0IsQ0FDREMsRUFEQztBQUFBLGdCQUNEQSxFQURDLHlDQUNJLEVBREo7O0FBRVRULDJCQUFLVSxjQUFMLENBQW9CLGNBQXBCLEVBQW9DRCxFQUFwQztBQUNBVCwyQkFBS1csVUFBTCxDQUFnQjtBQUNaQyxxQkFBSztBQURPLGFBQWhCO0FBR0g7Ozs7Ozs7Ozs7Ozs7Ozt1Q0FHOEIsZUFBSSx1QkFBSixDOzs7O0FBQWZoQixvQyxTQUFBQSxJO0FBQ0FpQix1QyxHQUFZakIsSSxDQUFaaUIsTzs7c0NBQ0pBLFFBQVFDLE1BQVIsSUFBa0IsQzs7Ozs7Ozs7QUFDdEJELHdDQUFRRSxPQUFSLENBQWdCLFVBQUNDLE9BQUQsRUFBYTtBQUN6Qix3Q0FBTUMsTUFBTUQsT0FBWjtBQUNBLHdDQUFJQyxJQUFJQyxPQUFKLElBQWVELElBQUlDLE9BQUosQ0FBWUMsT0FBWixDQUFvQixNQUFwQixNQUFnQyxDQUFDLENBQXBELEVBQXVEO0FBQ25ERiw0Q0FBSUMsT0FBSixpQ0FBMENELElBQUlDLE9BQTlDO0FBQ0g7QUFDRCx3Q0FBSUQsSUFBSVIsRUFBSixLQUFXLE9BQUtWLFlBQXBCLEVBQWtDO0FBQzlCLCtDQUFLRixVQUFMLENBQWdCdUIsSUFBaEIsQ0FBcUJILEdBQXJCO0FBQ0gscUNBRkQsTUFFTyxJQUFJQSxJQUFJSSxRQUFKLEtBQWlCLEVBQXJCLEVBQXlCO0FBQzVCLCtDQUFLdkIsU0FBTCxDQUFlc0IsSUFBZixDQUFvQkgsR0FBcEI7QUFDSDtBQUNKLGlDQVZEO0FBV0EscUNBQUtaLE1BQUw7Ozs7Ozs7O0FBRUFGLHdDQUFRQyxHQUFSOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBL0MwQkosZUFBS3NCLEk7O2tCQUF0QjdCLFEiLCJmaWxlIjoicmVnaXN0ZWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG5pbXBvcnQgeyBnZXQgfSBmcm9tICcuLi91dGlscy9hamF4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVnaXN0ZWQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+azqOWGjCcsXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICAgIGN1cnJlbnRBcHA6IFtdLFxuICAgICAgICBvdGhlcmxpc3Q6IFtdLFxuICAgICAgICBjdXJyZW50X21waWQ6ICcnLFxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50X21waWQgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdjdXJyZW50X21waWQnKSB8fCAnJztcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vdGhlcmxpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5jdXJyZW50QXBwID0gW107XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIHRoaXMubG9hZExpc3QoKTtcbiAgICB9XG4gICAgdG9yZWdpc3QgKGUpIHtcbiAgICAgICAgY29uc3QgeyBpZCA9ICcnIH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcbiAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygncmVnaXN0TWFwcGlkJywgaWQpO1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiAnLi9yZWdpc3RNYWluQWNjb3VudCcsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhc3luYyBsb2FkTGlzdCAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IGdldCgnL21wbG9naWMvbXlzaWdubXBsaXN0Jyk7XG4gICAgICAgICAgICBjb25zdCB7IG1waW5mb3MgfSA9IGRhdGE7XG4gICAgICAgICAgICBpZiAobXBpbmZvcy5sZW5ndGggPD0gMCkgcmV0dXJuO1xuICAgICAgICAgICAgbXBpbmZvcy5mb3JFYWNoKChhcHBpbmZvKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZWxlID0gYXBwaW5mbztcbiAgICAgICAgICAgICAgICBpZiAoZWxlLmhlYWRJbWcgJiYgZWxlLmhlYWRJbWcuaW5kZXhPZignaHR0cCcpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBlbGUuaGVhZEltZyA9IGBodHRwczovL3BpYzEuNThjZG4uY29tLmNuJHtlbGUuaGVhZEltZ31gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZWxlLmlkID09PSB0aGlzLmN1cnJlbnRfbXBpZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRBcHAucHVzaChlbGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxlLm5pY2tOYW1lICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm90aGVybGlzdC5wdXNoKGVsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
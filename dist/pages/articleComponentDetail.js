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

var Index = function (_wepy$page) {
    _inherits(Index, _wepy$page);

    function Index() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Index);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '文章详情'
        }, _this.data = {
            id: '',
            group: '',
            name: '',
            title: '',
            author: '',
            source: '',
            createTime: '',
            updateTime: '',
            content: ''
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'onLoad',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(option) {
                var _option$group, group, _option$id, id, _option$name, name;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                console.log('detail', option);
                                _option$group = option.group, group = _option$group === undefined ? '' : _option$group, _option$id = option.id, id = _option$id === undefined ? '' : _option$id, _option$name = option.name, name = _option$name === undefined ? '' : _option$name;

                                this.group = group;
                                this.id = id;
                                this.name = name;
                                this.$apply();
                                this.loadData();

                            case 7:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function onLoad(_x) {
                return _ref2.apply(this, arguments);
            }

            return onLoad;
        }()
    }, {
        key: 'loadData',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var id, _ref4, data, title, author, source, createTime, content, updateTime;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                id = this.id;
                                _context2.next = 3;
                                return (0, _ajax.get)('/businessArticle/detail/' + id);

                            case 3:
                                _ref4 = _context2.sent;
                                data = _ref4.data;
                                title = data.title, author = data.author, source = data.source, createTime = data.createTime, content = data.content, updateTime = data.updateTime;

                                Object.assign(this, {
                                    title: title,
                                    author: author,
                                    source: source,
                                    createTime: createTime,
                                    content: content,
                                    updateTime: updateTime
                                });
                                this.$apply();

                            case 8:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function loadData() {
                return _ref3.apply(this, arguments);
            }

            return loadData;
        }()
    }, {
        key: 'toEdit',
        value: function toEdit() {
            var ppu = _wepy2.default.getStorageSync('ppu');
            _wepy2.default.navigateTo({
                url: 'articleComponentCreate?ppu=' + ppu + '&group=' + this.group + '&id=' + this.id + '&name=' + this.name
            });
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/articleComponentDetail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFydGljbGVDb21wb25lbnREZXRhaWwuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImlkIiwiZ3JvdXAiLCJuYW1lIiwidGl0bGUiLCJhdXRob3IiLCJzb3VyY2UiLCJjcmVhdGVUaW1lIiwidXBkYXRlVGltZSIsImNvbnRlbnQiLCJvcHRpb24iLCJjb25zb2xlIiwibG9nIiwiJGFwcGx5IiwibG9hZERhdGEiLCJPYmplY3QiLCJhc3NpZ24iLCJwcHUiLCJ3ZXB5IiwiZ2V0U3RvcmFnZVN5bmMiLCJuYXZpZ2F0ZVRvIiwidXJsIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBR1RDLEksR0FBTztBQUNIQyxnQkFBSSxFQUREO0FBRUhDLG1CQUFPLEVBRko7QUFHSEMsa0JBQU0sRUFISDtBQUlIQyxtQkFBTyxFQUpKO0FBS0hDLG9CQUFRLEVBTEw7QUFNSEMsb0JBQVEsRUFOTDtBQU9IQyx3QkFBWSxFQVBUO0FBUUhDLHdCQUFZLEVBUlQ7QUFTSEMscUJBQVM7QUFUTixTOzs7Ozs7aUdBV01DLE07Ozs7Ozs7QUFDVEMsd0NBQVFDLEdBQVIsQ0FBWSxRQUFaLEVBQXNCRixNQUF0QjtnREFDMkNBLE0sQ0FBbkNSLEssRUFBQUEsSyxpQ0FBUSxFLCtCQUEyQlEsTSxDQUF2QlQsRSxFQUFBQSxFLDhCQUFLLEUsOEJBQWtCUyxNLENBQWRQLEksRUFBQUEsSSxnQ0FBTyxFOztBQUNwQyxxQ0FBS0QsS0FBTCxHQUFhQSxLQUFiO0FBQ0EscUNBQUtELEVBQUwsR0FBVUEsRUFBVjtBQUNBLHFDQUFLRSxJQUFMLEdBQVlBLElBQVo7QUFDQSxxQ0FBS1UsTUFBTDtBQUNBLHFDQUFLQyxRQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdRYixrQyxHQUFPLEksQ0FBUEEsRTs7dUNBQ2UsNENBQStCQSxFQUEvQixDOzs7O0FBQWZELG9DLFNBQUFBLEk7QUFFSkkscUMsR0FNQUosSSxDQU5BSSxLLEVBQ0FDLE0sR0FLQUwsSSxDQUxBSyxNLEVBQ0FDLE0sR0FJQU4sSSxDQUpBTSxNLEVBQ0FDLFUsR0FHQVAsSSxDQUhBTyxVLEVBQ0FFLE8sR0FFQVQsSSxDQUZBUyxPLEVBQ0FELFUsR0FDQVIsSSxDQURBUSxVOztBQUVKTyx1Q0FBT0MsTUFBUCxDQUFjLElBQWQsRUFBb0I7QUFDaEJaLGdEQURnQjtBQUVoQkMsa0RBRmdCO0FBR2hCQyxrREFIZ0I7QUFJaEJDLDBEQUpnQjtBQUtoQkUsb0RBTGdCO0FBTWhCRDtBQU5nQixpQ0FBcEI7QUFRQSxxQ0FBS0ssTUFBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lDQUVLO0FBQ0wsZ0JBQU1JLE1BQU1DLGVBQUtDLGNBQUwsQ0FBb0IsS0FBcEIsQ0FBWjtBQUNBRCwyQkFBS0UsVUFBTCxDQUFnQjtBQUNaQyxxREFBbUNKLEdBQW5DLGVBQWdELEtBQUtmLEtBQXJELFlBQWlFLEtBQUtELEVBQXRFLGNBQWlGLEtBQUtFO0FBRDFFLGFBQWhCO0FBR0g7Ozs7RUFsRDhCZSxlQUFLSSxJOztrQkFBbkJ6QixLIiwiZmlsZSI6ImFydGljbGVDb21wb25lbnREZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG5pbXBvcnQgeyBnZXQgfSBmcm9tICcuLi91dGlscy9hamF4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aWh+eroOivpuaDhScsXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICAgIGlkOiAnJyxcbiAgICAgICAgZ3JvdXA6ICcnLFxuICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgdGl0bGU6ICcnLFxuICAgICAgICBhdXRob3I6ICcnLFxuICAgICAgICBzb3VyY2U6ICcnLFxuICAgICAgICBjcmVhdGVUaW1lOiAnJyxcbiAgICAgICAgdXBkYXRlVGltZTogJycsXG4gICAgICAgIGNvbnRlbnQ6ICcnLFxuICAgIH1cbiAgICBhc3luYyBvbkxvYWQob3B0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkZXRhaWwnLCBvcHRpb24pO1xuICAgICAgICBjb25zdCB7IGdyb3VwID0gJycsIGlkID0gJycsIG5hbWUgPSAnJyB9ID0gb3B0aW9uO1xuICAgICAgICB0aGlzLmdyb3VwID0gZ3JvdXA7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xuICAgIH1cbiAgICBhc3luYyBsb2FkRGF0YSgpIHtcbiAgICAgICAgY29uc3QgeyBpZCB9ID0gdGhpcztcbiAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBnZXQoYC9idXNpbmVzc0FydGljbGUvZGV0YWlsLyR7aWR9YCk7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgYXV0aG9yLFxuICAgICAgICAgICAgc291cmNlLFxuICAgICAgICAgICAgY3JlYXRlVGltZSxcbiAgICAgICAgICAgIGNvbnRlbnQsXG4gICAgICAgICAgICB1cGRhdGVUaW1lLFxuICAgICAgICB9ID0gZGF0YTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7XG4gICAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICAgIGF1dGhvcixcbiAgICAgICAgICAgIHNvdXJjZSxcbiAgICAgICAgICAgIGNyZWF0ZVRpbWUsXG4gICAgICAgICAgICBjb250ZW50LFxuICAgICAgICAgICAgdXBkYXRlVGltZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuICAgIHRvRWRpdCgpIHtcbiAgICAgICAgY29uc3QgcHB1ID0gd2VweS5nZXRTdG9yYWdlU3luYygncHB1Jyk7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6IGBhcnRpY2xlQ29tcG9uZW50Q3JlYXRlP3BwdT0ke3BwdX0mZ3JvdXA9JHt0aGlzLmdyb3VwfSZpZD0ke3RoaXMuaWR9Jm5hbWU9JHt0aGlzLm5hbWV9YCxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19
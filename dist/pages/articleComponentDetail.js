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
            title: '',
            author: '',
            source: '',
            createTime: '',
            content: ''
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'onLoad',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(option) {
                var _option$group, group, _option$id, id;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _option$group = option.group, group = _option$group === undefined ? '' : _option$group, _option$id = option.id, id = _option$id === undefined ? '' : _option$id;

                                console.log(option);
                                this.group = group;
                                this.id = id;
                                this.$apply();
                                this.loadData();

                            case 6:
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
                var id, _ref4, data, title, author, source, createTime, content;

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
                                title = data.title, author = data.author, source = data.source, createTime = data.createTime, content = data.content;

                                Object.assign(this, {
                                    title: title,
                                    author: author,
                                    source: source,
                                    createTime: createTime,
                                    content: content
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
                url: 'articleComponentCreate?ppu=' + ppu + '&group=' + this.group + '&id=' + this.id
            });
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/articleComponentDetail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFydGljbGVDb21wb25lbnREZXRhaWwuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImlkIiwiZ3JvdXAiLCJ0aXRsZSIsImF1dGhvciIsInNvdXJjZSIsImNyZWF0ZVRpbWUiLCJjb250ZW50Iiwib3B0aW9uIiwiY29uc29sZSIsImxvZyIsIiRhcHBseSIsImxvYWREYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwicHB1Iiwid2VweSIsImdldFN0b3JhZ2VTeW5jIiwibmF2aWdhdGVUbyIsInVybCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdUQyxJLEdBQU87QUFDSEMsZ0JBQUksRUFERDtBQUVIQyxtQkFBTyxFQUZKO0FBR0hDLG1CQUFPLEVBSEo7QUFJSEMsb0JBQVEsRUFKTDtBQUtIQyxvQkFBUSxFQUxMO0FBTUhDLHdCQUFZLEVBTlQ7QUFPSEMscUJBQVM7QUFQTixTOzs7Ozs7aUdBU01DLE07Ozs7Ozs7Z0RBQ3VCQSxNLENBQXhCTixLLEVBQUFBLEssaUNBQVEsRSwrQkFBZ0JNLE0sQ0FBWlAsRSxFQUFBQSxFLDhCQUFLLEU7O0FBQ3pCUSx3Q0FBUUMsR0FBUixDQUFZRixNQUFaO0FBQ0EscUNBQUtOLEtBQUwsR0FBYUEsS0FBYjtBQUNBLHFDQUFLRCxFQUFMLEdBQVVBLEVBQVY7QUFDQSxxQ0FBS1UsTUFBTDtBQUNBLHFDQUFLQyxRQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdRWCxrQyxHQUFPLEksQ0FBUEEsRTs7dUNBQ2UsNENBQStCQSxFQUEvQixDOzs7O0FBQWZELG9DLFNBQUFBLEk7QUFFSkcscUMsR0FLQUgsSSxDQUxBRyxLLEVBQ0FDLE0sR0FJQUosSSxDQUpBSSxNLEVBQ0FDLE0sR0FHQUwsSSxDQUhBSyxNLEVBQ0FDLFUsR0FFQU4sSSxDQUZBTSxVLEVBQ0FDLE8sR0FDQVAsSSxDQURBTyxPOztBQUVKTSx1Q0FBT0MsTUFBUCxDQUFjLElBQWQsRUFBb0I7QUFDaEJYLGdEQURnQjtBQUVoQkMsa0RBRmdCO0FBR2hCQyxrREFIZ0I7QUFJaEJDLDBEQUpnQjtBQUtoQkM7QUFMZ0IsaUNBQXBCO0FBT0EscUNBQUtJLE1BQUw7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQ0FFSztBQUNMLGdCQUFNSSxNQUFNQyxlQUFLQyxjQUFMLENBQW9CLEtBQXBCLENBQVo7QUFDQUQsMkJBQUtFLFVBQUwsQ0FBZ0I7QUFDWkMscURBQW1DSixHQUFuQyxlQUFnRCxLQUFLYixLQUFyRCxZQUFpRSxLQUFLRDtBQUQxRCxhQUFoQjtBQUdIOzs7O0VBN0M4QmUsZUFBS0ksSTs7a0JBQW5CdkIsSyIsImZpbGUiOiJhcnRpY2xlQ29tcG9uZW50RGV0YWlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5cclxuaW1wb3J0IHsgZ2V0IH0gZnJvbSAnLi4vdXRpbHMvYWpheCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aWh+eroOivpuaDhScsXHJcbiAgICB9XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGlkOiAnJyxcclxuICAgICAgICBncm91cDogJycsXHJcbiAgICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICAgIGF1dGhvcjogJycsXHJcbiAgICAgICAgc291cmNlOiAnJyxcclxuICAgICAgICBjcmVhdGVUaW1lOiAnJyxcclxuICAgICAgICBjb250ZW50OiAnJyxcclxuICAgIH1cclxuICAgIGFzeW5jIG9uTG9hZChvcHRpb24pIHtcclxuICAgICAgICBjb25zdCB7IGdyb3VwID0gJycsIGlkID0gJycgfSA9IG9wdGlvbjtcclxuICAgICAgICBjb25zb2xlLmxvZyhvcHRpb24pO1xyXG4gICAgICAgIHRoaXMuZ3JvdXAgPSBncm91cDtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICB9XHJcbiAgICBhc3luYyBsb2FkRGF0YSgpIHtcclxuICAgICAgICBjb25zdCB7IGlkIH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgZ2V0KGAvYnVzaW5lc3NBcnRpY2xlL2RldGFpbC8ke2lkfWApO1xyXG4gICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgdGl0bGUsXHJcbiAgICAgICAgICAgIGF1dGhvcixcclxuICAgICAgICAgICAgc291cmNlLFxyXG4gICAgICAgICAgICBjcmVhdGVUaW1lLFxyXG4gICAgICAgICAgICBjb250ZW50LFxyXG4gICAgICAgIH0gPSBkYXRhO1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywge1xyXG4gICAgICAgICAgICB0aXRsZSxcclxuICAgICAgICAgICAgYXV0aG9yLFxyXG4gICAgICAgICAgICBzb3VyY2UsXHJcbiAgICAgICAgICAgIGNyZWF0ZVRpbWUsXHJcbiAgICAgICAgICAgIGNvbnRlbnQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgIH1cclxuICAgIHRvRWRpdCgpIHtcclxuICAgICAgICBjb25zdCBwcHUgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdwcHUnKTtcclxuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6IGBhcnRpY2xlQ29tcG9uZW50Q3JlYXRlP3BwdT0ke3BwdX0mZ3JvdXA9JHt0aGlzLmdyb3VwfSZpZD0ke3RoaXMuaWR9YCxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=
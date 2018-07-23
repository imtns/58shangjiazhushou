'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _EmptyPage = require('./../components/EmptyPage.js');

var _EmptyPage2 = _interopRequireDefault(_EmptyPage);

var _Dialog = require('./../components/Dialog.js');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _ajax = require('./../utils/ajax.js');

var _utils = require('./../utils/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArticleChoseGroup = function (_wepy$page) {
    _inherits(ArticleChoseGroup, _wepy$page);

    function ArticleChoseGroup() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ArticleChoseGroup);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ArticleChoseGroup.__proto__ || Object.getPrototypeOf(ArticleChoseGroup)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '选择分组'
        }, _this.$repeat = {}, _this.$props = { "EmptyPage": { "xmlns:wx": "" }, "Pop": { "xmlns:wx": "", "xmlns:v-on": "" } }, _this.$events = { "Pop": { "v-on:close": "close", "v-on:addGroup": "addGroup" } }, _this.components = {
            EmptyPage: _EmptyPage2.default,
            Pop: _Dialog2.default
        }, _this.data = {
            groupList: [],
            currentGroupId: '',
            currentGroupName: '',
            showPop: false,
            title: '没有分组~'
        }, _this.methods = {
            addGroup: function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(content) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return (0, _ajax.get)('/businessArticle/addgroup', {
                                        name: content
                                    });

                                case 2:
                                    this.showPop = false;
                                    this.$apply();
                                    (0, _utils.toast)('添加成功！');
                                    this.loadArticle();

                                case 6:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));

                function addGroup(_x) {
                    return _ref2.apply(this, arguments);
                }

                return addGroup;
            }(),
            close: function close() {
                this.showPop = false;
                this.$apply();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ArticleChoseGroup, [{
        key: 'onLoad',
        value: function onLoad() {
            this.loadArticle();
        }
    }, {
        key: 'loadArticle',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _get, data;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _get = (0, _ajax.get)('/businessArticle/groups'), data = _get.data;

                                if (!(!data && data.length === 0)) {
                                    _context2.next = 3;
                                    break;
                                }

                                return _context2.abrupt('return');

                            case 3:
                                data.forEach(function (item) {
                                    Object.assign(item, {
                                        choseStatu: false
                                    });
                                });
                                this.groupList = data;
                                this.$apply();

                            case 6:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function loadArticle() {
                return _ref3.apply(this, arguments);
            }

            return loadArticle;
        }()
    }, {
        key: 'editChose',
        value: function editChose(e) {
            var _e$currentTarget$data = e.currentTarget.dataset.item,
                id = _e$currentTarget$data.id,
                name = _e$currentTarget$data.name;

            this.currentGroupId = id;
            this.currentGroupName = name;
            this.$apply();
        }
    }, {
        key: 'showDialog',
        value: function showDialog() {
            this.showPop = true;
            this.$apply();
        }
    }, {
        key: 'toEitPage',
        value: function toEitPage() {
            var currentGroupId = this.currentGroupId,
                currentGroupName = this.currentGroupName;

            _wepy2.default.reLaunch({
                url: 'articleComponentEdit?id=' + currentGroupId + '&name=' + currentGroupName
            });
        }
    }]);

    return ArticleChoseGroup;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ArticleChoseGroup , 'pages/articleChoseGroup'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFydGljbGVDaG9zZUdyb3VwLmpzIl0sIm5hbWVzIjpbIkFydGljbGVDaG9zZUdyb3VwIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIkVtcHR5UGFnZSIsIlBvcCIsImRhdGEiLCJncm91cExpc3QiLCJjdXJyZW50R3JvdXBJZCIsImN1cnJlbnRHcm91cE5hbWUiLCJzaG93UG9wIiwidGl0bGUiLCJtZXRob2RzIiwiYWRkR3JvdXAiLCJjb250ZW50IiwibmFtZSIsIiRhcHBseSIsImxvYWRBcnRpY2xlIiwiY2xvc2UiLCJsZW5ndGgiLCJmb3JFYWNoIiwiT2JqZWN0IiwiYXNzaWduIiwiaXRlbSIsImNob3NlU3RhdHUiLCJlIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJpZCIsIndlcHkiLCJyZUxhdW5jaCIsInVybCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsaUI7Ozs7Ozs7Ozs7Ozs7O2dOQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBR1ZDLE8sR0FBVSxFLFFBQ2JDLE0sR0FBUyxFQUFDLGFBQVksRUFBQyxZQUFXLEVBQVosRUFBYixFQUE2QixPQUFNLEVBQUMsWUFBVyxFQUFaLEVBQWUsY0FBYSxFQUE1QixFQUFuQyxFLFFBQ1RDLE8sR0FBVSxFQUFDLE9BQU0sRUFBQyxjQUFhLE9BQWQsRUFBc0IsaUJBQWdCLFVBQXRDLEVBQVAsRSxRQUNUQyxVLEdBQWE7QUFDTkMsMENBRE07QUFFTkM7QUFGTSxTLFFBSVZDLEksR0FBTztBQUNIQyx1QkFBVyxFQURSO0FBRUhDLDRCQUFnQixFQUZiO0FBR0hDLDhCQUFrQixFQUhmO0FBSUhDLHFCQUFTLEtBSk47QUFLSEMsbUJBQU87QUFMSixTLFFBVVBDLE8sR0FBVTtBQUNBQyxvQkFEQTtBQUFBLHFHQUNTQyxPQURUO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDJDQUVJLGVBQUksMkJBQUosRUFBaUM7QUFDbkNDLDhDQUFNRDtBQUQ2QixxQ0FBakMsQ0FGSjs7QUFBQTtBQUtGLHlDQUFLSixPQUFMLEdBQWUsS0FBZjtBQUNBLHlDQUFLTSxNQUFMO0FBQ0Esc0RBQU0sT0FBTjtBQUNBLHlDQUFLQyxXQUFMOztBQVJFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBVU5DLGlCQVZNLG1CQVVFO0FBQ0oscUJBQUtSLE9BQUwsR0FBZSxLQUFmO0FBQ0EscUJBQUtNLE1BQUw7QUFDSDtBQWJLLFM7Ozs7O2lDQUhEO0FBQ0wsaUJBQUtDLFdBQUw7QUFDSDs7Ozs7Ozs7Ozs7dUNBaUJvQixlQUFJLHlCQUFKLEMsRUFBVFgsSSxRQUFBQSxJOztzQ0FDSixDQUFDQSxJQUFELElBQVNBLEtBQUthLE1BQUwsS0FBZ0IsQzs7Ozs7Ozs7QUFDN0JiLHFDQUFLYyxPQUFMLENBQWEsZ0JBQVE7QUFDakJDLDJDQUFPQyxNQUFQLENBQWNDLElBQWQsRUFBb0I7QUFDaEJDLG9EQUFZO0FBREkscUNBQXBCO0FBR0gsaUNBSkQ7QUFLQSxxQ0FBS2pCLFNBQUwsR0FBaUJELElBQWpCO0FBQ0EscUNBQUtVLE1BQUw7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0FFTVMsQyxFQUFHO0FBQUEsd0NBQ1lBLEVBQUVDLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCSixJQURwQztBQUFBLGdCQUNESyxFQURDLHlCQUNEQSxFQURDO0FBQUEsZ0JBQ0diLElBREgseUJBQ0dBLElBREg7O0FBRVQsaUJBQUtQLGNBQUwsR0FBc0JvQixFQUF0QjtBQUNBLGlCQUFLbkIsZ0JBQUwsR0FBd0JNLElBQXhCO0FBQ0EsaUJBQUtDLE1BQUw7QUFDSDs7O3FDQUNZO0FBQ1QsaUJBQUtOLE9BQUwsR0FBZSxJQUFmO0FBQ0EsaUJBQUtNLE1BQUw7QUFDSDs7O29DQUNXO0FBQUEsZ0JBQ0FSLGNBREEsR0FDcUMsSUFEckMsQ0FDQUEsY0FEQTtBQUFBLGdCQUNnQkMsZ0JBRGhCLEdBQ3FDLElBRHJDLENBQ2dCQSxnQkFEaEI7O0FBRVJvQiwyQkFBS0MsUUFBTCxDQUFjO0FBQ1ZDLGtEQUFnQ3ZCLGNBQWhDLGNBQXVEQztBQUQ3QyxhQUFkO0FBR0g7Ozs7RUE5RDBDb0IsZUFBS0csSTs7a0JBQS9CbkMsaUIiLCJmaWxlIjoiYXJ0aWNsZUNob3NlR3JvdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG5pbXBvcnQgRW1wdHlQYWdlIGZyb20gJy4uL2NvbXBvbmVudHMvRW1wdHlQYWdlJztcclxuaW1wb3J0IFBvcCBmcm9tICcuLi9jb21wb25lbnRzL0RpYWxvZyc7XHJcblxyXG5pbXBvcnQgeyBnZXQgfSBmcm9tICcuLi91dGlscy9hamF4JztcclxuaW1wb3J0IHsgdG9hc3QgfSBmcm9tICcuLi91dGlscyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcnRpY2xlQ2hvc2VHcm91cCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+mAieaLqeWIhue7hCcsXHJcbiAgICB9XHJcbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiRW1wdHlQYWdlXCI6e1wieG1sbnM6d3hcIjpcIlwifSxcIlBvcFwiOntcInhtbG5zOnd4XCI6XCJcIixcInhtbG5zOnYtb25cIjpcIlwifX07XHJcbiRldmVudHMgPSB7XCJQb3BcIjp7XCJ2LW9uOmNsb3NlXCI6XCJjbG9zZVwiLFwidi1vbjphZGRHcm91cFwiOlwiYWRkR3JvdXBcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgICBFbXB0eVBhZ2UsXHJcbiAgICAgICAgUG9wLFxyXG4gICAgfVxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBncm91cExpc3Q6IFtdLFxyXG4gICAgICAgIGN1cnJlbnRHcm91cElkOiAnJyxcclxuICAgICAgICBjdXJyZW50R3JvdXBOYW1lOiAnJyxcclxuICAgICAgICBzaG93UG9wOiBmYWxzZSxcclxuICAgICAgICB0aXRsZTogJ+ayoeacieWIhue7hH4nLFxyXG4gICAgfVxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMubG9hZEFydGljbGUoKTtcclxuICAgIH1cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgYXN5bmMgYWRkR3JvdXAoY29udGVudCkge1xyXG4gICAgICAgICAgICBhd2FpdCBnZXQoJy9idXNpbmVzc0FydGljbGUvYWRkZ3JvdXAnLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBjb250ZW50LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5zaG93UG9wID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIHRvYXN0KCfmt7vliqDmiJDlip/vvIEnKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkQXJ0aWNsZSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xvc2UoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1BvcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbiAgICBhc3luYyBsb2FkQXJ0aWNsZSgpIHtcclxuICAgICAgICBjb25zdCB7IGRhdGEgfSA9IGdldCgnL2J1c2luZXNzQXJ0aWNsZS9ncm91cHMnKTtcclxuICAgICAgICBpZiAoIWRhdGEgJiYgZGF0YS5sZW5ndGggPT09IDApIHJldHVybjtcclxuICAgICAgICBkYXRhLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oaXRlbSwge1xyXG4gICAgICAgICAgICAgICAgY2hvc2VTdGF0dTogZmFsc2UsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZ3JvdXBMaXN0ID0gZGF0YTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfVxyXG4gICAgZWRpdENob3NlKGUpIHtcclxuICAgICAgICBjb25zdCB7IGlkLCBuYW1lIH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pdGVtO1xyXG4gICAgICAgIHRoaXMuY3VycmVudEdyb3VwSWQgPSBpZDtcclxuICAgICAgICB0aGlzLmN1cnJlbnRHcm91cE5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICB9XHJcbiAgICBzaG93RGlhbG9nKCkge1xyXG4gICAgICAgIHRoaXMuc2hvd1BvcCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgIH1cclxuICAgIHRvRWl0UGFnZSgpIHtcclxuICAgICAgICBjb25zdCB7IGN1cnJlbnRHcm91cElkLCBjdXJyZW50R3JvdXBOYW1lIH0gPSB0aGlzO1xyXG4gICAgICAgIHdlcHkucmVMYXVuY2goe1xyXG4gICAgICAgICAgICB1cmw6IGBhcnRpY2xlQ29tcG9uZW50RWRpdD9pZD0ke2N1cnJlbnRHcm91cElkfSZuYW1lPSR7Y3VycmVudEdyb3VwTmFtZX1gLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
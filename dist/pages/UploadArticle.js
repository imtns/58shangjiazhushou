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

var submitApi = '/resource/upload/article';

var UploadArticle = function (_wepy$page) {
    _inherits(UploadArticle, _wepy$page);

    function UploadArticle() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, UploadArticle);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = UploadArticle.__proto__ || Object.getPrototypeOf(UploadArticle)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '上传素材'

        }, _this.data = {
            form: {
                title: '',
                author: '',
                source: '',
                content: '',
                enableSubmit: false
            }
        }, _this.methods = {
            setTitle: function setTitle(e) {
                var title = e.detail.value;
                title = (0, _utils.filteremoji)(title);
                this.updateForm({ title: title });
                return {
                    value: title
                };
            },
            setAuthor: function setAuthor(e) {
                var author = e.detail.value;
                author = (0, _utils.filteremoji)(author);
                this.updateForm({ author: author });
                return {
                    value: author
                };
            },
            setSource: function setSource(e) {
                var source = e.detail.value;
                source = (0, _utils.filteremoji)(source);
                this.updateForm({ source: source });
                return {
                    value: source
                };
            },
            setContent: function setContent(e) {
                var content = e.detail.value;
                content = (0, _utils.filteremoji)(content);
                this.updateForm({ content: content });
                return {
                    value: content
                };
            },
            submitSave: function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    var _ref3, state, msg;

                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    if (this.form.enableSubmit) {
                                        _context.next = 2;
                                        break;
                                    }

                                    return _context.abrupt('return');

                                case 2:
                                    _context.next = 4;
                                    return (0, _ajax.post)(submitApi, this.form);

                                case 4:
                                    _ref3 = _context.sent;
                                    state = _ref3.state;
                                    msg = _ref3.msg;

                                    if (state === 100) {
                                        _wepy2.default.navigateBack();
                                    } else {
                                        (0, _utils.toast)(msg);
                                    }

                                case 8:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));

                function submitSave() {
                    return _ref2.apply(this, arguments);
                }

                return submitSave;
            }()
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(UploadArticle, [{
        key: 'updateForm',
        value: function updateForm(data) {
            this.form = Object.assign({}, this.form, data);
            var enableSubmit = !!(this.form.title && this.form.content);
            this.form = Object.assign({}, this.form, { enableSubmit: enableSubmit });
            this.$apply();
        }
    }, {
        key: 'onLoad',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(options) {
                var mpid;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return (0, _utils.sleep)();

                            case 2:
                                mpid = options.mpid || _wepy2.default.getStorageSync('current_mpid');

                                this.updateForm({ mpid: mpid });

                            case 4:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function onLoad(_x) {
                return _ref4.apply(this, arguments);
            }

            return onLoad;
        }()
    }]);

    return UploadArticle;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(UploadArticle , 'pages/UploadArticle'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlVwbG9hZEFydGljbGUuanMiXSwibmFtZXMiOlsic3VibWl0QXBpIiwiVXBsb2FkQXJ0aWNsZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiZm9ybSIsInRpdGxlIiwiYXV0aG9yIiwic291cmNlIiwiY29udGVudCIsImVuYWJsZVN1Ym1pdCIsIm1ldGhvZHMiLCJzZXRUaXRsZSIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsInVwZGF0ZUZvcm0iLCJzZXRBdXRob3IiLCJzZXRTb3VyY2UiLCJzZXRDb250ZW50Iiwic3VibWl0U2F2ZSIsInN0YXRlIiwibXNnIiwid2VweSIsIm5hdmlnYXRlQmFjayIsIk9iamVjdCIsImFzc2lnbiIsIiRhcHBseSIsIm9wdGlvbnMiLCJtcGlkIiwiZ2V0U3RvcmFnZVN5bmMiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFlBQVksMEJBQWxCOztJQUNxQkMsYTs7Ozs7Ozs7Ozs7Ozs7d01BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCOztBQURuQixTLFFBSVRDLEksR0FBTztBQUNIQyxrQkFBTTtBQUNGQyx1QkFBTyxFQURMO0FBRUZDLHdCQUFRLEVBRk47QUFHRkMsd0JBQVEsRUFITjtBQUlGQyx5QkFBUyxFQUpQO0FBS0ZDLDhCQUFjO0FBTFo7QUFESCxTLFFBU1BDLE8sR0FBVTtBQUNOQyxvQkFETSxvQkFDSUMsQ0FESixFQUNPO0FBQ1Qsb0JBQUlQLFFBQVFPLEVBQUVDLE1BQUYsQ0FBU0MsS0FBckI7QUFDQVQsd0JBQVEsd0JBQVlBLEtBQVosQ0FBUjtBQUNBLHFCQUFLVSxVQUFMLENBQWdCLEVBQUVWLFlBQUYsRUFBaEI7QUFDQSx1QkFBTztBQUNIUywyQkFBT1Q7QUFESixpQkFBUDtBQUdILGFBUks7QUFTTlcscUJBVE0scUJBU0tKLENBVEwsRUFTUTtBQUNWLG9CQUFJTixTQUFTTSxFQUFFQyxNQUFGLENBQVNDLEtBQXRCO0FBQ0FSLHlCQUFTLHdCQUFZQSxNQUFaLENBQVQ7QUFDQSxxQkFBS1MsVUFBTCxDQUFnQixFQUFFVCxjQUFGLEVBQWhCO0FBQ0EsdUJBQU87QUFDSFEsMkJBQU9SO0FBREosaUJBQVA7QUFHSCxhQWhCSztBQWlCTlcscUJBakJNLHFCQWlCS0wsQ0FqQkwsRUFpQlE7QUFDVixvQkFBSUwsU0FBU0ssRUFBRUMsTUFBRixDQUFTQyxLQUF0QjtBQUNBUCx5QkFBUyx3QkFBWUEsTUFBWixDQUFUO0FBQ0EscUJBQUtRLFVBQUwsQ0FBZ0IsRUFBRVIsY0FBRixFQUFoQjtBQUNBLHVCQUFPO0FBQ0hPLDJCQUFPUDtBQURKLGlCQUFQO0FBR0gsYUF4Qks7QUF5Qk5XLHNCQXpCTSxzQkF5Qk1OLENBekJOLEVBeUJTO0FBQ1gsb0JBQUlKLFVBQVVJLEVBQUVDLE1BQUYsQ0FBU0MsS0FBdkI7QUFDQU4sMEJBQVUsd0JBQVlBLE9BQVosQ0FBVjtBQUNBLHFCQUFLTyxVQUFMLENBQWdCLEVBQUVQLGdCQUFGLEVBQWhCO0FBQ0EsdUJBQU87QUFDSE0sMkJBQU9OO0FBREosaUJBQVA7QUFHSCxhQWhDSztBQWlDQVcsc0JBakNBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdDQWtDRyxLQUFLZixJQUFMLENBQVVLLFlBbENiO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBQUE7QUFBQSwyQ0FtQzJCLGdCQUFLVixTQUFMLEVBQWdCLEtBQUtLLElBQXJCLENBbkMzQjs7QUFBQTtBQUFBO0FBbUNNZ0IseUNBbkNOLFNBbUNNQSxLQW5DTjtBQW1DYUMsdUNBbkNiLFNBbUNhQSxHQW5DYjs7QUFvQ0Ysd0NBQUlELFVBQVUsR0FBZCxFQUFtQjtBQUNmRSx1REFBS0MsWUFBTDtBQUNILHFDQUZELE1BRU87QUFDSCwwREFBTUYsR0FBTjtBQUNIOztBQXhDQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLFM7Ozs7O21DQTJDRWxCLEksRUFBTTtBQUNkLGlCQUFLQyxJQUFMLEdBQVlvQixPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQixLQUFLckIsSUFBdkIsRUFBNkJELElBQTdCLENBQVo7QUFDQSxnQkFBTU0sZUFBZSxDQUFDLEVBQUUsS0FBS0wsSUFBTCxDQUFVQyxLQUFWLElBQW1CLEtBQUtELElBQUwsQ0FBVUksT0FBL0IsQ0FBdEI7QUFDQSxpQkFBS0osSUFBTCxHQUFZb0IsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsS0FBS3JCLElBQXZCLEVBQTZCLEVBQUVLLDBCQUFGLEVBQTdCLENBQVo7QUFDQSxpQkFBS2lCLE1BQUw7QUFDSDs7OztrR0FDYUMsTzs7Ozs7Ozt1Q0FDSixtQjs7O0FBQ0FDLG9DLEdBQU9ELFFBQVFDLElBQVIsSUFBZ0JOLGVBQUtPLGNBQUwsQ0FBb0IsY0FBcEIsQzs7QUFDN0IscUNBQUtkLFVBQUwsQ0FBZ0IsRUFBRWEsVUFBRixFQUFoQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQWxFbUNOLGVBQUtRLEk7O2tCQUEzQjlCLGEiLCJmaWxlIjoiVXBsb2FkQXJ0aWNsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbmltcG9ydCB7IHNsZWVwLCB0b2FzdCwgZmlsdGVyZW1vamkgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBwb3N0IH0gZnJvbSAnLi4vdXRpbHMvYWpheCc7XG5cbmNvbnN0IHN1Ym1pdEFwaSA9ICcvcmVzb3VyY2UvdXBsb2FkL2FydGljbGUnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXBsb2FkQXJ0aWNsZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5LiK5Lyg57Sg5p2QJyxcblxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgICBmb3JtOiB7XG4gICAgICAgICAgICB0aXRsZTogJycsXG4gICAgICAgICAgICBhdXRob3I6ICcnLFxuICAgICAgICAgICAgc291cmNlOiAnJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICcnLFxuICAgICAgICAgICAgZW5hYmxlU3VibWl0OiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgc2V0VGl0bGUgKGUpIHtcbiAgICAgICAgICAgIGxldCB0aXRsZSA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgICAgICAgdGl0bGUgPSBmaWx0ZXJlbW9qaSh0aXRsZSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZvcm0oeyB0aXRsZSB9KTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHRpdGxlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0QXV0aG9yIChlKSB7XG4gICAgICAgICAgICBsZXQgYXV0aG9yID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICAgICAgICBhdXRob3IgPSBmaWx0ZXJlbW9qaShhdXRob3IpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVGb3JtKHsgYXV0aG9yIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogYXV0aG9yLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0U291cmNlIChlKSB7XG4gICAgICAgICAgICBsZXQgc291cmNlID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICAgICAgICBzb3VyY2UgPSBmaWx0ZXJlbW9qaShzb3VyY2UpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVGb3JtKHsgc291cmNlIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogc291cmNlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0Q29udGVudCAoZSkge1xuICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgICAgICAgIGNvbnRlbnQgPSBmaWx0ZXJlbW9qaShjb250ZW50KTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRm9ybSh7IGNvbnRlbnQgfSk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBjb250ZW50LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgYXN5bmMgc3VibWl0U2F2ZSAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZm9ybS5lbmFibGVTdWJtaXQpIHJldHVybjtcbiAgICAgICAgICAgIGNvbnN0IHsgc3RhdGUsIG1zZyB9ID0gYXdhaXQgcG9zdChzdWJtaXRBcGksIHRoaXMuZm9ybSk7XG4gICAgICAgICAgICBpZiAoc3RhdGUgPT09IDEwMCkge1xuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRvYXN0KG1zZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfVxuICAgIHVwZGF0ZUZvcm0gKGRhdGEpIHtcbiAgICAgICAgdGhpcy5mb3JtID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5mb3JtLCBkYXRhKTtcbiAgICAgICAgY29uc3QgZW5hYmxlU3VibWl0ID0gISEodGhpcy5mb3JtLnRpdGxlICYmIHRoaXMuZm9ybS5jb250ZW50KTtcbiAgICAgICAgdGhpcy5mb3JtID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5mb3JtLCB7IGVuYWJsZVN1Ym1pdCB9KTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG4gICAgYXN5bmMgb25Mb2FkIChvcHRpb25zKSB7XG4gICAgICAgIGF3YWl0IHNsZWVwKCk7XG4gICAgICAgIGNvbnN0IG1waWQgPSBvcHRpb25zLm1waWQgfHwgd2VweS5nZXRTdG9yYWdlU3luYygnY3VycmVudF9tcGlkJyk7XG4gICAgICAgIHRoaXMudXBkYXRlRm9ybSh7IG1waWQgfSk7XG4gICAgfVxufVxuIl19
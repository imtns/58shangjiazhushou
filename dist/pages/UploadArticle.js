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
                    value: '<p>' + content + '</p>'
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlVwbG9hZEFydGljbGUuanMiXSwibmFtZXMiOlsic3VibWl0QXBpIiwiVXBsb2FkQXJ0aWNsZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiZm9ybSIsInRpdGxlIiwiYXV0aG9yIiwic291cmNlIiwiY29udGVudCIsImVuYWJsZVN1Ym1pdCIsIm1ldGhvZHMiLCJzZXRUaXRsZSIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsInVwZGF0ZUZvcm0iLCJzZXRBdXRob3IiLCJzZXRTb3VyY2UiLCJzZXRDb250ZW50Iiwic3VibWl0U2F2ZSIsInN0YXRlIiwibXNnIiwid2VweSIsIm5hdmlnYXRlQmFjayIsIk9iamVjdCIsImFzc2lnbiIsIiRhcHBseSIsIm9wdGlvbnMiLCJtcGlkIiwiZ2V0U3RvcmFnZVN5bmMiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFlBQVksMEJBQWxCOztJQUNxQkMsYTs7Ozs7Ozs7Ozs7Ozs7d01BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCOztBQURuQixTLFFBSVRDLEksR0FBTztBQUNIQyxrQkFBTTtBQUNGQyx1QkFBTyxFQURMO0FBRUZDLHdCQUFRLEVBRk47QUFHRkMsd0JBQVEsRUFITjtBQUlGQyx5QkFBUyxFQUpQO0FBS0ZDLDhCQUFjO0FBTFo7QUFESCxTLFFBU1BDLE8sR0FBVTtBQUNOQyxvQkFETSxvQkFDSUMsQ0FESixFQUNPO0FBQ1Qsb0JBQUlQLFFBQVFPLEVBQUVDLE1BQUYsQ0FBU0MsS0FBckI7QUFDQVQsd0JBQVEsd0JBQVlBLEtBQVosQ0FBUjtBQUNBLHFCQUFLVSxVQUFMLENBQWdCLEVBQUVWLFlBQUYsRUFBaEI7QUFDQSx1QkFBTztBQUNIUywyQkFBT1Q7QUFESixpQkFBUDtBQUdILGFBUks7QUFTTlcscUJBVE0scUJBU0tKLENBVEwsRUFTUTtBQUNWLG9CQUFJTixTQUFTTSxFQUFFQyxNQUFGLENBQVNDLEtBQXRCO0FBQ0FSLHlCQUFTLHdCQUFZQSxNQUFaLENBQVQ7QUFDQSxxQkFBS1MsVUFBTCxDQUFnQixFQUFFVCxjQUFGLEVBQWhCO0FBQ0EsdUJBQU87QUFDSFEsMkJBQU9SO0FBREosaUJBQVA7QUFHSCxhQWhCSztBQWlCTlcscUJBakJNLHFCQWlCS0wsQ0FqQkwsRUFpQlE7QUFDVixvQkFBSUwsU0FBU0ssRUFBRUMsTUFBRixDQUFTQyxLQUF0QjtBQUNBUCx5QkFBUyx3QkFBWUEsTUFBWixDQUFUO0FBQ0EscUJBQUtRLFVBQUwsQ0FBZ0IsRUFBRVIsY0FBRixFQUFoQjtBQUNBLHVCQUFPO0FBQ0hPLDJCQUFPUDtBQURKLGlCQUFQO0FBR0gsYUF4Qks7QUF5Qk5XLHNCQXpCTSxzQkF5Qk1OLENBekJOLEVBeUJTO0FBQ1gsb0JBQUlKLFVBQVVJLEVBQUVDLE1BQUYsQ0FBU0MsS0FBdkI7QUFDQU4sMEJBQVUsd0JBQVlBLE9BQVosQ0FBVjtBQUNBLHFCQUFLTyxVQUFMLENBQWdCLEVBQUVQLGdCQUFGLEVBQWhCO0FBQ0EsdUJBQU87QUFDSE0sbUNBQWFOLE9BQWI7QUFERyxpQkFBUDtBQUdILGFBaENLO0FBaUNBVyxzQkFqQ0E7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBa0NHLEtBQUtmLElBQUwsQ0FBVUssWUFsQ2I7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTtBQUFBLDJDQW1DMkIsZ0JBQUtWLFNBQUwsRUFBZ0IsS0FBS0ssSUFBckIsQ0FuQzNCOztBQUFBO0FBQUE7QUFtQ01nQix5Q0FuQ04sU0FtQ01BLEtBbkNOO0FBbUNhQyx1Q0FuQ2IsU0FtQ2FBLEdBbkNiOztBQW9DRix3Q0FBSUQsVUFBVSxHQUFkLEVBQW1CO0FBQ2ZFLHVEQUFLQyxZQUFMO0FBQ0gscUNBRkQsTUFFTztBQUNILDBEQUFNRixHQUFOO0FBQ0g7O0FBeENDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsUzs7Ozs7bUNBMkNFbEIsSSxFQUFNO0FBQ2QsaUJBQUtDLElBQUwsR0FBWW9CLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLEtBQUtyQixJQUF2QixFQUE2QkQsSUFBN0IsQ0FBWjtBQUNBLGdCQUFNTSxlQUFlLENBQUMsRUFBRSxLQUFLTCxJQUFMLENBQVVDLEtBQVYsSUFBbUIsS0FBS0QsSUFBTCxDQUFVSSxPQUEvQixDQUF0QjtBQUNBLGlCQUFLSixJQUFMLEdBQVlvQixPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQixLQUFLckIsSUFBdkIsRUFBNkIsRUFBRUssMEJBQUYsRUFBN0IsQ0FBWjtBQUNBLGlCQUFLaUIsTUFBTDtBQUNIOzs7O2tHQUNhQyxPOzs7Ozs7O3VDQUNKLG1COzs7QUFDQUMsb0MsR0FBT0QsUUFBUUMsSUFBUixJQUFnQk4sZUFBS08sY0FBTCxDQUFvQixjQUFwQixDOztBQUM3QixxQ0FBS2QsVUFBTCxDQUFnQixFQUFFYSxVQUFGLEVBQWhCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBbEVtQ04sZUFBS1EsSTs7a0JBQTNCOUIsYSIsImZpbGUiOiJVcGxvYWRBcnRpY2xlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5cclxuaW1wb3J0IHsgc2xlZXAsIHRvYXN0LCBmaWx0ZXJlbW9qaSB9IGZyb20gJy4uL3V0aWxzJztcclxuaW1wb3J0IHsgcG9zdCB9IGZyb20gJy4uL3V0aWxzL2FqYXgnO1xyXG5cclxuY29uc3Qgc3VibWl0QXBpID0gJy9yZXNvdXJjZS91cGxvYWQvYXJ0aWNsZSc7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwbG9hZEFydGljbGUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkuIrkvKDntKDmnZAnLFxyXG5cclxuICAgIH1cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgZm9ybToge1xyXG4gICAgICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgICAgIGF1dGhvcjogJycsXHJcbiAgICAgICAgICAgIHNvdXJjZTogJycsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6ICcnLFxyXG4gICAgICAgICAgICBlbmFibGVTdWJtaXQ6IGZhbHNlLFxyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIHNldFRpdGxlIChlKSB7XHJcbiAgICAgICAgICAgIGxldCB0aXRsZSA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgICAgICB0aXRsZSA9IGZpbHRlcmVtb2ppKHRpdGxlKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVGb3JtKHsgdGl0bGUgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGl0bGUsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXRBdXRob3IgKGUpIHtcclxuICAgICAgICAgICAgbGV0IGF1dGhvciA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgICAgICBhdXRob3IgPSBmaWx0ZXJlbW9qaShhdXRob3IpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZvcm0oeyBhdXRob3IgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogYXV0aG9yLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0U291cmNlIChlKSB7XHJcbiAgICAgICAgICAgIGxldCBzb3VyY2UgPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgICAgICAgc291cmNlID0gZmlsdGVyZW1vamkoc291cmNlKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVGb3JtKHsgc291cmNlIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHNvdXJjZSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldENvbnRlbnQgKGUpIHtcclxuICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgICAgICAgY29udGVudCA9IGZpbHRlcmVtb2ppKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZvcm0oeyBjb250ZW50IH0pO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGA8cD4ke2NvbnRlbnR9PC9wPmAsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhc3luYyBzdWJtaXRTYXZlICgpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmZvcm0uZW5hYmxlU3VibWl0KSByZXR1cm47XHJcbiAgICAgICAgICAgIGNvbnN0IHsgc3RhdGUsIG1zZyB9ID0gYXdhaXQgcG9zdChzdWJtaXRBcGksIHRoaXMuZm9ybSk7XHJcbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdG9hc3QobXNnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbiAgICB1cGRhdGVGb3JtIChkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5mb3JtID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5mb3JtLCBkYXRhKTtcclxuICAgICAgICBjb25zdCBlbmFibGVTdWJtaXQgPSAhISh0aGlzLmZvcm0udGl0bGUgJiYgdGhpcy5mb3JtLmNvbnRlbnQpO1xyXG4gICAgICAgIHRoaXMuZm9ybSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZm9ybSwgeyBlbmFibGVTdWJtaXQgfSk7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgIH1cclxuICAgIGFzeW5jIG9uTG9hZCAob3B0aW9ucykge1xyXG4gICAgICAgIGF3YWl0IHNsZWVwKCk7XHJcbiAgICAgICAgY29uc3QgbXBpZCA9IG9wdGlvbnMubXBpZCB8fCB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdjdXJyZW50X21waWQnKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUZvcm0oeyBtcGlkIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _mixin = require('./mixin.js');

var _mixin2 = _interopRequireDefault(_mixin);

var _uploader = require('./../../utils/uploader.js');

var _utils = require('./../../utils/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('./../../utils/ajax.js'),
    post = _require.post;

var loadVideo = '/businessResource/getlist?jjqwiaud';

var Video = function (_wepy$page) {
    _inherits(Video, _wepy$page);

    function Video() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Video);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Video.__proto__ || Object.getPrototypeOf(Video)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '门店照片'
        }, _this.data = {
            videos: [],
            thumbActive: false,
            name: ''
        }, _this.mixins = [_mixin2.default], _this.methods = {
            bindInput: function bindInput(e) {
                this.name = e.detail.value;
            },
            del: function del(e) {
                var index = e.currentTarget.dataset.index;

                this.videos.splice(index, 1);
            },
            addVideo: function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    var _this2 = this;

                    var _ref3, tempFilePath, thumbTempFilePath;

                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return _wepy2.default.chooseVideo();

                                case 2:
                                    _ref3 = _context.sent;
                                    tempFilePath = _ref3.tempFilePath;
                                    thumbTempFilePath = _ref3.thumbTempFilePath;

                                    console.log(tempFilePath);
                                    (0, _uploader.uploader)(tempFilePath, { isVideo: true }, function (e, result) {
                                        if (e) {
                                            (0, _utils.toast)('上传失败，请重试。');
                                            return;
                                        }
                                        console.log(result);
                                        (0, _utils.toast)('上传成功。');
                                        _this2.videos.push({
                                            src: result.content,
                                            cover: thumbTempFilePath
                                        });
                                        _this2.saveVideo(result.content);
                                        _this2.$apply();
                                    });

                                case 7:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));

                function addVideo() {
                    return _ref2.apply(this, arguments);
                }

                return addVideo;
            }(),
            thumbClick: function thumbClick(e) {
                this.thumbActive = e.currentTarget.dataset.index;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Video, [{
        key: 'onLoad',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _this3 = this;

                var _ref5, data, _tempModules$filter, _tempModules$filter2;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return post(loadVideo, {
                                    resourceType: 2,
                                    pageNum: 1,
                                    pageSize: 99,
                                    appid: 'yxuEvbSU3M0zGwxuw'
                                });

                            case 2:
                                _ref5 = _context2.sent;
                                data = _ref5.data;

                                this.videos = data.map(function (_ref6) {
                                    var resourceName = _ref6.resourceName,
                                        resourceUrl = _ref6.resourceUrl,
                                        extend = _ref6.extend;
                                    return {
                                        src: resourceUrl,
                                        name: resourceName,
                                        selected: resourceUrl === _this3.selectedVideo,
                                        cover: extend ? JSON.parse(extend).sourceCoverUrl : ''
                                    };
                                });
                                _tempModules$filter = this.tempModules.filter(function (obj) {
                                    return obj.id === _this3.pageId;
                                });
                                _tempModules$filter2 = _slicedToArray(_tempModules$filter, 1);
                                this.pageModule = _tempModules$filter2[0];

                                this.$apply();
                                console.log(this.videos);

                            case 10:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function onLoad() {
                return _ref4.apply(this, arguments);
            }

            return onLoad;
        }()
    }, {
        key: 'saveVideo',
        value: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(src) {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return post('/businessResource/insert', {
                                    resourceType: 2,
                                    resourceName: this.name,
                                    resourceUrl: src
                                });

                            case 2:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function saveVideo(_x) {
                return _ref7.apply(this, arguments);
            }

            return saveVideo;
        }()
    }]);

    return Video;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Video , 'pages/edit/video'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZGVvLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJwb3N0IiwibG9hZFZpZGVvIiwiVmlkZW8iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInZpZGVvcyIsInRodW1iQWN0aXZlIiwibmFtZSIsIm1peGlucyIsIk1peGluIiwibWV0aG9kcyIsImJpbmRJbnB1dCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsImRlbCIsImluZGV4IiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJzcGxpY2UiLCJhZGRWaWRlbyIsIndlcHkiLCJjaG9vc2VWaWRlbyIsInRlbXBGaWxlUGF0aCIsInRodW1iVGVtcEZpbGVQYXRoIiwiY29uc29sZSIsImxvZyIsImlzVmlkZW8iLCJyZXN1bHQiLCJwdXNoIiwic3JjIiwiY29udGVudCIsImNvdmVyIiwic2F2ZVZpZGVvIiwiJGFwcGx5IiwidGh1bWJDbGljayIsInJlc291cmNlVHlwZSIsInBhZ2VOdW0iLCJwYWdlU2l6ZSIsImFwcGlkIiwibWFwIiwicmVzb3VyY2VOYW1lIiwicmVzb3VyY2VVcmwiLCJleHRlbmQiLCJzZWxlY3RlZCIsInNlbGVjdGVkVmlkZW8iLCJKU09OIiwicGFyc2UiLCJzb3VyY2VDb3ZlclVybCIsInRlbXBNb2R1bGVzIiwiZmlsdGVyIiwib2JqIiwiaWQiLCJwYWdlSWQiLCJwYWdlTW9kdWxlIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O2VBRWlCQSxRQUFRLGtCQUFSLEM7SUFBVEMsSSxZQUFBQSxJOztBQUVSLElBQU1DLFlBQVksb0NBQWxCOztJQUNxQkMsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ25CQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVEMsSSxHQUFPO0FBQ0hDLG9CQUFRLEVBREw7QUFFSEMseUJBQWEsS0FGVjtBQUdIQyxrQkFBTTtBQUhILFMsUUFLUEMsTSxHQUFTLENBQUNDLGVBQUQsQyxRQWtCVEMsTyxHQUFVO0FBQ05DLHFCQURNLHFCQUNJQyxDQURKLEVBQ087QUFDVCxxQkFBS0wsSUFBTCxHQUFZSyxFQUFFQyxNQUFGLENBQVNDLEtBQXJCO0FBQ0gsYUFISztBQUlOQyxlQUpNLGVBSUZILENBSkUsRUFJQztBQUFBLG9CQUNLSSxLQURMLEdBQ2VKLEVBQUVLLGFBQUYsQ0FBZ0JDLE9BRC9CLENBQ0tGLEtBREw7O0FBRUgscUJBQUtYLE1BQUwsQ0FBWWMsTUFBWixDQUFtQkgsS0FBbkIsRUFBMEIsQ0FBMUI7QUFDSCxhQVBLO0FBUUFJLG9CQVJBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkNBU2dEQyxlQUFLQyxXQUFMLEVBVGhEOztBQUFBO0FBQUE7QUFTTUMsZ0RBVE4sU0FTTUEsWUFUTjtBQVNvQkMscURBVHBCLFNBU29CQSxpQkFUcEI7O0FBVUZDLDRDQUFRQyxHQUFSLENBQVlILFlBQVo7QUFDQSw0REFBU0EsWUFBVCxFQUF1QixFQUFFSSxTQUFTLElBQVgsRUFBdkIsRUFBMEMsVUFBQ2YsQ0FBRCxFQUFJZ0IsTUFBSixFQUFlO0FBQ3JELDRDQUFJaEIsQ0FBSixFQUFPO0FBQ0gsOERBQU0sV0FBTjtBQUNBO0FBQ0g7QUFDRGEsZ0RBQVFDLEdBQVIsQ0FBWUUsTUFBWjtBQUNBLDBEQUFNLE9BQU47QUFDQSwrQ0FBS3ZCLE1BQUwsQ0FBWXdCLElBQVosQ0FBaUI7QUFDYkMsaURBQUtGLE9BQU9HLE9BREM7QUFFYkMsbURBQU9SO0FBRk0seUNBQWpCO0FBSUEsK0NBQUtTLFNBQUwsQ0FBZUwsT0FBT0csT0FBdEI7QUFDQSwrQ0FBS0csTUFBTDtBQUNILHFDQWJEOztBQVhFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBMEJOQyxzQkExQk0sc0JBMEJLdkIsQ0ExQkwsRUEwQlE7QUFDVixxQkFBS04sV0FBTCxHQUFtQk0sRUFBRUssYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JGLEtBQTNDO0FBQ0g7QUE1QkssUzs7Ozs7Ozs7Ozs7Ozs7Ozt1Q0FoQmlCakIsS0FBS0MsU0FBTCxFQUFnQjtBQUNuQ29DLGtEQUFjLENBRHFCO0FBRW5DQyw2Q0FBUyxDQUYwQjtBQUduQ0MsOENBQVUsRUFIeUI7QUFJbkNDLDJDQUFPO0FBSjRCLGlDQUFoQixDOzs7O0FBQWZuQyxvQyxTQUFBQSxJOztBQU1SLHFDQUFLQyxNQUFMLEdBQWNELEtBQUtvQyxHQUFMLENBQVM7QUFBQSx3Q0FBR0MsWUFBSCxTQUFHQSxZQUFIO0FBQUEsd0NBQWlCQyxXQUFqQixTQUFpQkEsV0FBakI7QUFBQSx3Q0FBOEJDLE1BQTlCLFNBQThCQSxNQUE5QjtBQUFBLDJDQUE0QztBQUMvRGIsNkNBQUtZLFdBRDBEO0FBRS9EbkMsOENBQU1rQyxZQUZ5RDtBQUcvREcsa0RBQVVGLGdCQUFnQixPQUFLRyxhQUhnQztBQUkvRGIsK0NBQU9XLFNBQVNHLEtBQUtDLEtBQUwsQ0FBV0osTUFBWCxFQUFtQkssY0FBNUIsR0FBNkM7QUFKVyxxQ0FBNUM7QUFBQSxpQ0FBVCxDQUFkO3NEQU1vQixLQUFLQyxXQUFMLENBQWlCQyxNQUFqQixDQUF3QjtBQUFBLDJDQUFPQyxJQUFJQyxFQUFKLEtBQVcsT0FBS0MsTUFBdkI7QUFBQSxpQ0FBeEIsQzs7QUFBbkIscUNBQUtDLFU7O0FBQ04scUNBQUtwQixNQUFMO0FBQ0FULHdDQUFRQyxHQUFSLENBQVksS0FBS3JCLE1BQWpCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tHQWdDWXlCLEc7Ozs7Ozt1Q0FDTi9CLEtBQUssMEJBQUwsRUFBaUM7QUFDbkNxQyxrREFBYyxDQURxQjtBQUVuQ0ssa0RBQWMsS0FBS2xDLElBRmdCO0FBR25DbUMsaURBQWFaO0FBSHNCLGlDQUFqQyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBMUR1QlQsZUFBS2tDLEk7O2tCQUFuQnRELEsiLCJmaWxlIjoidmlkZW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IE1peGluIGZyb20gJy4vbWl4aW4nO1xuaW1wb3J0IHsgdXBsb2FkZXIgfSBmcm9tICcuLi8uLi91dGlscy91cGxvYWRlcic7XG5pbXBvcnQgeyB0b2FzdCB9IGZyb20gJy4uLy4uL3V0aWxzJztcblxuY29uc3QgeyBwb3N0IH0gPSByZXF1aXJlKCcuLi8uLi91dGlscy9hamF4Jyk7XG5cbmNvbnN0IGxvYWRWaWRlbyA9ICcvYnVzaW5lc3NSZXNvdXJjZS9nZXRsaXN0P2pqcXdpYXVkJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZGVvIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+mXqOW6l+eFp+eJhycsXG4gIH07XG4gIGRhdGEgPSB7XG4gICAgICB2aWRlb3M6IFtdLFxuICAgICAgdGh1bWJBY3RpdmU6IGZhbHNlLFxuICAgICAgbmFtZTogJycsXG4gIH07XG4gIG1peGlucyA9IFtNaXhpbl07XG4gIGFzeW5jIG9uTG9hZCgpIHtcbiAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgcG9zdChsb2FkVmlkZW8sIHtcbiAgICAgICAgICByZXNvdXJjZVR5cGU6IDIsXG4gICAgICAgICAgcGFnZU51bTogMSxcbiAgICAgICAgICBwYWdlU2l6ZTogOTksXG4gICAgICAgICAgYXBwaWQ6ICd5eHVFdmJTVTNNMHpHd3h1dycsXG4gICAgICB9KTtcbiAgICAgIHRoaXMudmlkZW9zID0gZGF0YS5tYXAoKHsgcmVzb3VyY2VOYW1lLCByZXNvdXJjZVVybCwgZXh0ZW5kIH0pID0+ICh7XG4gICAgICAgICAgc3JjOiByZXNvdXJjZVVybCxcbiAgICAgICAgICBuYW1lOiByZXNvdXJjZU5hbWUsXG4gICAgICAgICAgc2VsZWN0ZWQ6IHJlc291cmNlVXJsID09PSB0aGlzLnNlbGVjdGVkVmlkZW8sXG4gICAgICAgICAgY292ZXI6IGV4dGVuZCA/IEpTT04ucGFyc2UoZXh0ZW5kKS5zb3VyY2VDb3ZlclVybCA6ICcnLFxuICAgICAgfSkpO1xuICAgICAgW3RoaXMucGFnZU1vZHVsZV0gPSB0aGlzLnRlbXBNb2R1bGVzLmZpbHRlcihvYmogPT4gb2JqLmlkID09PSB0aGlzLnBhZ2VJZCk7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgY29uc29sZS5sb2codGhpcy52aWRlb3MpO1xuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgICBiaW5kSW5wdXQoZSkge1xuICAgICAgICAgIHRoaXMubmFtZSA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgfSxcbiAgICAgIGRlbChlKSB7XG4gICAgICAgICAgY29uc3QgeyBpbmRleCB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XG4gICAgICAgICAgdGhpcy52aWRlb3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH0sXG4gICAgICBhc3luYyBhZGRWaWRlbygpIHtcbiAgICAgICAgICBjb25zdCB7IHRlbXBGaWxlUGF0aCwgdGh1bWJUZW1wRmlsZVBhdGggfSA9IGF3YWl0IHdlcHkuY2hvb3NlVmlkZW8oKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyh0ZW1wRmlsZVBhdGgpO1xuICAgICAgICAgIHVwbG9hZGVyKHRlbXBGaWxlUGF0aCwgeyBpc1ZpZGVvOiB0cnVlIH0sIChlLCByZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICAgICAgICAgIHRvYXN0KCfkuIrkvKDlpLHotKXvvIzor7fph43or5XjgIInKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgICB0b2FzdCgn5LiK5Lyg5oiQ5Yqf44CCJyk7XG4gICAgICAgICAgICAgIHRoaXMudmlkZW9zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgc3JjOiByZXN1bHQuY29udGVudCxcbiAgICAgICAgICAgICAgICAgIGNvdmVyOiB0aHVtYlRlbXBGaWxlUGF0aCxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoaXMuc2F2ZVZpZGVvKHJlc3VsdC5jb250ZW50KTtcbiAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICB0aHVtYkNsaWNrKGUpIHtcbiAgICAgICAgICB0aGlzLnRodW1iQWN0aXZlID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXg7XG4gICAgICB9LFxuICB9O1xuICBhc3luYyBzYXZlVmlkZW8oc3JjKSB7XG4gICAgICBhd2FpdCBwb3N0KCcvYnVzaW5lc3NSZXNvdXJjZS9pbnNlcnQnLCB7XG4gICAgICAgICAgcmVzb3VyY2VUeXBlOiAyLFxuICAgICAgICAgIHJlc291cmNlTmFtZTogdGhpcy5uYW1lLFxuICAgICAgICAgIHJlc291cmNlVXJsOiBzcmMsXG4gICAgICB9KTtcbiAgfVxufVxuIl19
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

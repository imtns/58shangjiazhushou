'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import modulesParse from '../../utils/modulesParse';
// import { toast } from '../../utils';

var app = require('./../../utils/globalData.js');
// const { post } = require('./../../utils/ajax.js');

var Mixin = function (_wepy$mixin) {
    _inherits(Mixin, _wepy$mixin);

    function Mixin() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Mixin);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Mixin.__proto__ || Object.getPrototypeOf(Mixin)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            pageData: {},
            pageList: {},
            selectorIndex: -1,
            pageId: '',
            pageIndex: 0,
            saveAvaliable: false,
            extConfig: {},
            modules: {},
            tempModules: {},
            noEdit: false
        }, _this.methods = {
            // async save() {
            //     const pageId = app.globalData.pageList.filter(obj => obj.pageKey === 'index')[0].id;
            //     let modData = this.modules.map(({
            //         id, name, cfg, params,
            //     }) => {
            //         if (Array.isArray(params)) params = {};
            //         return {
            //             id, name, cfg, params, page_id: pageId,
            //         };
            //     });
            //     modData = JSON.parse(JSON.stringify(modData));
            //     const emptymodData = [];
            //     modData.forEach((item) => {
            //         if (item.name === 'coupon' && item.params && !item.params.couponIds) {
            //             toast('请补全组件中的优惠券。');
            //             emptymodData.push(item);
            //         }
            //     });
            //     if (emptymodData.length && emptymodData.length > 0) {
            //         return;
            //     }
            //     await post('/business/templete/savemodules', {
            //         businessPageId: this.pageId,
            //         modulesJson: JSON.stringify(modulesParse.save(modData)),
            //         releaseId: app.globalData.extConfig.extJson.ext.releaseId,
            //         mpId: app.globalData.extConfig.extJson.ext.mpId,
            //     });
            //     // wx.navigateBack({
            //     //     delta: 1,
            //     // });
            // },
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Mixin, [{
        key: 'onLoad',
        value: function onLoad(options) {
            var _this2 = this;

            console.log(options);
            this.saveAvaliable = false;
            this.pageId = options.id;
            var result = app.globalData.pageData.filter(function (obj) {
                return obj.id === _this2.pageId;
            });
            this.pageIndex = app.globalData.pageData.findIndex(function (obj) {
                return obj.id === _this2.pageId;
            });
            // this.pageData = Object.assign({}, this.pageData, {
            //     cfg: result[0].props.cfg, data: result[0].props.data, pageNum: result[0].props.pageNum, pageSize: result[0].props.pageNum, total: result[0].props.total,
            // });
            this.pageData = JSON.parse(JSON.stringify(result));
            if (result[0].name === 'article') {
                this.pageData = Object.assign({}, this.pageData, { params: result[0].params });
            }
            this.modules = app.globalData.modules;
            this.tempModules = JSON.parse(JSON.stringify(this.modules));
            this.extConfig = app.globalData.extConfig;
            this.pageList = app.globalData.pageList.map(function (item, index) {
                return {
                    id: index,
                    key: item.pageKey,
                    name: item.pageName
                };
            });
            console.log(result);
        }
    }]);

    return Mixin;
}(_wepy2.default.mixin);

exports.default = Mixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1peGluLmpzIl0sIm5hbWVzIjpbImFwcCIsInJlcXVpcmUiLCJNaXhpbiIsImRhdGEiLCJwYWdlRGF0YSIsInBhZ2VMaXN0Iiwic2VsZWN0b3JJbmRleCIsInBhZ2VJZCIsInBhZ2VJbmRleCIsInNhdmVBdmFsaWFibGUiLCJleHRDb25maWciLCJtb2R1bGVzIiwidGVtcE1vZHVsZXMiLCJub0VkaXQiLCJtZXRob2RzIiwib3B0aW9ucyIsImNvbnNvbGUiLCJsb2ciLCJpZCIsInJlc3VsdCIsImdsb2JhbERhdGEiLCJmaWx0ZXIiLCJvYmoiLCJmaW5kSW5kZXgiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJuYW1lIiwiT2JqZWN0IiwiYXNzaWduIiwicGFyYW1zIiwibWFwIiwiaXRlbSIsImluZGV4Iiwia2V5IiwicGFnZUtleSIsInBhZ2VOYW1lIiwid2VweSIsIm1peGluIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7QUFDQTtBQUNBOztBQUVBLElBQU1BLE1BQU1DLFFBQVEsd0JBQVIsQ0FBWjtBQUNBOztJQUVxQkMsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ2pCQyxJLEdBQU87QUFDSEMsc0JBQVUsRUFEUDtBQUVIQyxzQkFBVSxFQUZQO0FBR0hDLDJCQUFlLENBQUMsQ0FIYjtBQUlIQyxvQkFBUSxFQUpMO0FBS0hDLHVCQUFXLENBTFI7QUFNSEMsMkJBQWUsS0FOWjtBQU9IQyx1QkFBVyxFQVBSO0FBUUhDLHFCQUFTLEVBUk47QUFTSEMseUJBQWEsRUFUVjtBQVVIQyxvQkFBUTtBQVZMLFMsUUFtQ1BDLE8sR0FBVTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBL0JNLFM7Ozs7OytCQXZCSEMsTyxFQUFTO0FBQUE7O0FBQ1pDLG9CQUFRQyxHQUFSLENBQVlGLE9BQVo7QUFDQSxpQkFBS04sYUFBTCxHQUFxQixLQUFyQjtBQUNBLGlCQUFLRixNQUFMLEdBQWNRLFFBQVFHLEVBQXRCO0FBQ0EsZ0JBQU1DLFNBQVNuQixJQUFJb0IsVUFBSixDQUFlaEIsUUFBZixDQUF3QmlCLE1BQXhCLENBQStCO0FBQUEsdUJBQU9DLElBQUlKLEVBQUosS0FBVyxPQUFLWCxNQUF2QjtBQUFBLGFBQS9CLENBQWY7QUFDQSxpQkFBS0MsU0FBTCxHQUFpQlIsSUFBSW9CLFVBQUosQ0FBZWhCLFFBQWYsQ0FBd0JtQixTQUF4QixDQUFrQztBQUFBLHVCQUFPRCxJQUFJSixFQUFKLEtBQVcsT0FBS1gsTUFBdkI7QUFBQSxhQUFsQyxDQUFqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFLSCxRQUFMLEdBQWdCb0IsS0FBS0MsS0FBTCxDQUFXRCxLQUFLRSxTQUFMLENBQWVQLE1BQWYsQ0FBWCxDQUFoQjtBQUNBLGdCQUFJQSxPQUFPLENBQVAsRUFBVVEsSUFBVixLQUFtQixTQUF2QixFQUFrQztBQUM5QixxQkFBS3ZCLFFBQUwsR0FBZ0J3QixPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQixLQUFLekIsUUFBdkIsRUFBaUMsRUFBRTBCLFFBQVFYLE9BQU8sQ0FBUCxFQUFVVyxNQUFwQixFQUFqQyxDQUFoQjtBQUNIO0FBQ0QsaUJBQUtuQixPQUFMLEdBQWVYLElBQUlvQixVQUFKLENBQWVULE9BQTlCO0FBQ0EsaUJBQUtDLFdBQUwsR0FBbUJZLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS0UsU0FBTCxDQUFlLEtBQUtmLE9BQXBCLENBQVgsQ0FBbkI7QUFDQSxpQkFBS0QsU0FBTCxHQUFpQlYsSUFBSW9CLFVBQUosQ0FBZVYsU0FBaEM7QUFDQSxpQkFBS0wsUUFBTCxHQUFnQkwsSUFBSW9CLFVBQUosQ0FBZWYsUUFBZixDQUF3QjBCLEdBQXhCLENBQTRCLFVBQUNDLElBQUQsRUFBT0MsS0FBUDtBQUFBLHVCQUFrQjtBQUMxRGYsd0JBQUllLEtBRHNEO0FBRTFEQyx5QkFBS0YsS0FBS0csT0FGZ0Q7QUFHMURSLDBCQUFNSyxLQUFLSTtBQUgrQyxpQkFBbEI7QUFBQSxhQUE1QixDQUFoQjtBQUtBcEIsb0JBQVFDLEdBQVIsQ0FBWUUsTUFBWjtBQUNIOzs7O0VBbkM4QmtCLGVBQUtDLEs7O2tCQUFuQnBDLEsiLCJmaWxlIjoibWl4aW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuLy8gaW1wb3J0IG1vZHVsZXNQYXJzZSBmcm9tICcuLi8uLi91dGlscy9tb2R1bGVzUGFyc2UnO1xyXG4vLyBpbXBvcnQgeyB0b2FzdCB9IGZyb20gJy4uLy4uL3V0aWxzJztcclxuXHJcbmNvbnN0IGFwcCA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL2dsb2JhbERhdGEnKTtcclxuLy8gY29uc3QgeyBwb3N0IH0gPSByZXF1aXJlKCcuLi8uLi91dGlscy9hamF4Jyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNaXhpbiBleHRlbmRzIHdlcHkubWl4aW4ge1xyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBwYWdlRGF0YToge30sXHJcbiAgICAgICAgcGFnZUxpc3Q6IHt9LFxyXG4gICAgICAgIHNlbGVjdG9ySW5kZXg6IC0xLFxyXG4gICAgICAgIHBhZ2VJZDogJycsXHJcbiAgICAgICAgcGFnZUluZGV4OiAwLFxyXG4gICAgICAgIHNhdmVBdmFsaWFibGU6IGZhbHNlLFxyXG4gICAgICAgIGV4dENvbmZpZzoge30sXHJcbiAgICAgICAgbW9kdWxlczoge30sXHJcbiAgICAgICAgdGVtcE1vZHVsZXM6IHt9LFxyXG4gICAgICAgIG5vRWRpdDogZmFsc2UsXHJcbiAgICB9XHJcbiAgICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuc2F2ZUF2YWxpYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGFnZUlkID0gb3B0aW9ucy5pZDtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBhcHAuZ2xvYmFsRGF0YS5wYWdlRGF0YS5maWx0ZXIob2JqID0+IG9iai5pZCA9PT0gdGhpcy5wYWdlSWQpO1xyXG4gICAgICAgIHRoaXMucGFnZUluZGV4ID0gYXBwLmdsb2JhbERhdGEucGFnZURhdGEuZmluZEluZGV4KG9iaiA9PiBvYmouaWQgPT09IHRoaXMucGFnZUlkKTtcclxuICAgICAgICAvLyB0aGlzLnBhZ2VEYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wYWdlRGF0YSwge1xyXG4gICAgICAgIC8vICAgICBjZmc6IHJlc3VsdFswXS5wcm9wcy5jZmcsIGRhdGE6IHJlc3VsdFswXS5wcm9wcy5kYXRhLCBwYWdlTnVtOiByZXN1bHRbMF0ucHJvcHMucGFnZU51bSwgcGFnZVNpemU6IHJlc3VsdFswXS5wcm9wcy5wYWdlTnVtLCB0b3RhbDogcmVzdWx0WzBdLnByb3BzLnRvdGFsLFxyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIHRoaXMucGFnZURhdGEgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpO1xyXG4gICAgICAgIGlmIChyZXN1bHRbMF0ubmFtZSA9PT0gJ2FydGljbGUnKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZURhdGEgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnBhZ2VEYXRhLCB7IHBhcmFtczogcmVzdWx0WzBdLnBhcmFtcyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tb2R1bGVzID0gYXBwLmdsb2JhbERhdGEubW9kdWxlcztcclxuICAgICAgICB0aGlzLnRlbXBNb2R1bGVzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLm1vZHVsZXMpKTtcclxuICAgICAgICB0aGlzLmV4dENvbmZpZyA9IGFwcC5nbG9iYWxEYXRhLmV4dENvbmZpZztcclxuICAgICAgICB0aGlzLnBhZ2VMaXN0ID0gYXBwLmdsb2JhbERhdGEucGFnZUxpc3QubWFwKChpdGVtLCBpbmRleCkgPT4gKHtcclxuICAgICAgICAgICAgaWQ6IGluZGV4LFxyXG4gICAgICAgICAgICBrZXk6IGl0ZW0ucGFnZUtleSxcclxuICAgICAgICAgICAgbmFtZTogaXRlbS5wYWdlTmFtZSxcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcclxuICAgIH1cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgLy8gYXN5bmMgc2F2ZSgpIHtcclxuICAgICAgICAvLyAgICAgY29uc3QgcGFnZUlkID0gYXBwLmdsb2JhbERhdGEucGFnZUxpc3QuZmlsdGVyKG9iaiA9PiBvYmoucGFnZUtleSA9PT0gJ2luZGV4JylbMF0uaWQ7XHJcbiAgICAgICAgLy8gICAgIGxldCBtb2REYXRhID0gdGhpcy5tb2R1bGVzLm1hcCgoe1xyXG4gICAgICAgIC8vICAgICAgICAgaWQsIG5hbWUsIGNmZywgcGFyYW1zLFxyXG4gICAgICAgIC8vICAgICB9KSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXJhbXMpKSBwYXJhbXMgPSB7fTtcclxuICAgICAgICAvLyAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgaWQsIG5hbWUsIGNmZywgcGFyYW1zLCBwYWdlX2lkOiBwYWdlSWQsXHJcbiAgICAgICAgLy8gICAgICAgICB9O1xyXG4gICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAvLyAgICAgbW9kRGF0YSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobW9kRGF0YSkpO1xyXG4gICAgICAgIC8vICAgICBjb25zdCBlbXB0eW1vZERhdGEgPSBbXTtcclxuICAgICAgICAvLyAgICAgbW9kRGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICBpZiAoaXRlbS5uYW1lID09PSAnY291cG9uJyAmJiBpdGVtLnBhcmFtcyAmJiAhaXRlbS5wYXJhbXMuY291cG9uSWRzKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgdG9hc3QoJ+ivt+ihpeWFqOe7hOS7tuS4reeahOS8mOaDoOWIuOOAgicpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGVtcHR5bW9kRGF0YS5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAvLyAgICAgaWYgKGVtcHR5bW9kRGF0YS5sZW5ndGggJiYgZW1wdHltb2REYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAvLyAgICAgICAgIHJldHVybjtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBhd2FpdCBwb3N0KCcvYnVzaW5lc3MvdGVtcGxldGUvc2F2ZW1vZHVsZXMnLCB7XHJcbiAgICAgICAgLy8gICAgICAgICBidXNpbmVzc1BhZ2VJZDogdGhpcy5wYWdlSWQsXHJcbiAgICAgICAgLy8gICAgICAgICBtb2R1bGVzSnNvbjogSlNPTi5zdHJpbmdpZnkobW9kdWxlc1BhcnNlLnNhdmUobW9kRGF0YSkpLFxyXG4gICAgICAgIC8vICAgICAgICAgcmVsZWFzZUlkOiBhcHAuZ2xvYmFsRGF0YS5leHRDb25maWcuZXh0SnNvbi5leHQucmVsZWFzZUlkLFxyXG4gICAgICAgIC8vICAgICAgICAgbXBJZDogYXBwLmdsb2JhbERhdGEuZXh0Q29uZmlnLmV4dEpzb24uZXh0Lm1wSWQsXHJcbiAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgIC8vICAgICAvLyB3eC5uYXZpZ2F0ZUJhY2soe1xyXG4gICAgICAgIC8vICAgICAvLyAgICAgZGVsdGE6IDEsXHJcbiAgICAgICAgLy8gICAgIC8vIH0pO1xyXG4gICAgICAgIC8vIH0sXHJcbiAgICB9XHJcbn1cclxuIl19
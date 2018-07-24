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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1peGluLmpzIl0sIm5hbWVzIjpbImFwcCIsInJlcXVpcmUiLCJNaXhpbiIsImRhdGEiLCJwYWdlRGF0YSIsInBhZ2VMaXN0Iiwic2VsZWN0b3JJbmRleCIsInBhZ2VJZCIsInBhZ2VJbmRleCIsInNhdmVBdmFsaWFibGUiLCJleHRDb25maWciLCJtb2R1bGVzIiwidGVtcE1vZHVsZXMiLCJub0VkaXQiLCJtZXRob2RzIiwib3B0aW9ucyIsImNvbnNvbGUiLCJsb2ciLCJpZCIsInJlc3VsdCIsImdsb2JhbERhdGEiLCJmaWx0ZXIiLCJvYmoiLCJmaW5kSW5kZXgiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJuYW1lIiwiT2JqZWN0IiwiYXNzaWduIiwicGFyYW1zIiwibWFwIiwiaXRlbSIsImluZGV4Iiwia2V5IiwicGFnZUtleSIsInBhZ2VOYW1lIiwid2VweSIsIm1peGluIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7QUFDQTtBQUNBOztBQUVBLElBQU1BLE1BQU1DLFFBQVEsd0JBQVIsQ0FBWjtBQUNBOztJQUVxQkMsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ2pCQyxJLEdBQU87QUFDSEMsc0JBQVUsRUFEUDtBQUVIQyxzQkFBVSxFQUZQO0FBR0hDLDJCQUFlLENBQUMsQ0FIYjtBQUlIQyxvQkFBUSxFQUpMO0FBS0hDLHVCQUFXLENBTFI7QUFNSEMsMkJBQWUsS0FOWjtBQU9IQyx1QkFBVyxFQVBSO0FBUUhDLHFCQUFTLEVBUk47QUFTSEMseUJBQWEsRUFUVjtBQVVIQyxvQkFBUTtBQVZMLFMsUUFtQ1BDLE8sR0FBVTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBL0JNLFM7Ozs7OytCQXZCSEMsTyxFQUFTO0FBQUE7O0FBQ1pDLG9CQUFRQyxHQUFSLENBQVlGLE9BQVo7QUFDQSxpQkFBS04sYUFBTCxHQUFxQixLQUFyQjtBQUNBLGlCQUFLRixNQUFMLEdBQWNRLFFBQVFHLEVBQXRCO0FBQ0EsZ0JBQU1DLFNBQVNuQixJQUFJb0IsVUFBSixDQUFlaEIsUUFBZixDQUF3QmlCLE1BQXhCLENBQStCO0FBQUEsdUJBQU9DLElBQUlKLEVBQUosS0FBVyxPQUFLWCxNQUF2QjtBQUFBLGFBQS9CLENBQWY7QUFDQSxpQkFBS0MsU0FBTCxHQUFpQlIsSUFBSW9CLFVBQUosQ0FBZWhCLFFBQWYsQ0FBd0JtQixTQUF4QixDQUFrQztBQUFBLHVCQUFPRCxJQUFJSixFQUFKLEtBQVcsT0FBS1gsTUFBdkI7QUFBQSxhQUFsQyxDQUFqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFLSCxRQUFMLEdBQWdCb0IsS0FBS0MsS0FBTCxDQUFXRCxLQUFLRSxTQUFMLENBQWVQLE1BQWYsQ0FBWCxDQUFoQjtBQUNBLGdCQUFJQSxPQUFPLENBQVAsRUFBVVEsSUFBVixLQUFtQixTQUF2QixFQUFrQztBQUM5QixxQkFBS3ZCLFFBQUwsR0FBZ0J3QixPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQixLQUFLekIsUUFBdkIsRUFBaUMsRUFBRTBCLFFBQVFYLE9BQU8sQ0FBUCxFQUFVVyxNQUFwQixFQUFqQyxDQUFoQjtBQUNIO0FBQ0QsaUJBQUtuQixPQUFMLEdBQWVYLElBQUlvQixVQUFKLENBQWVULE9BQTlCO0FBQ0EsaUJBQUtDLFdBQUwsR0FBbUJZLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS0UsU0FBTCxDQUFlLEtBQUtmLE9BQXBCLENBQVgsQ0FBbkI7QUFDQSxpQkFBS0QsU0FBTCxHQUFpQlYsSUFBSW9CLFVBQUosQ0FBZVYsU0FBaEM7QUFDQSxpQkFBS0wsUUFBTCxHQUFnQkwsSUFBSW9CLFVBQUosQ0FBZWYsUUFBZixDQUF3QjBCLEdBQXhCLENBQTRCLFVBQUNDLElBQUQsRUFBT0MsS0FBUDtBQUFBLHVCQUFrQjtBQUMxRGYsd0JBQUllLEtBRHNEO0FBRTFEQyx5QkFBS0YsS0FBS0csT0FGZ0Q7QUFHMURSLDBCQUFNSyxLQUFLSTtBQUgrQyxpQkFBbEI7QUFBQSxhQUE1QixDQUFoQjtBQUtBcEIsb0JBQVFDLEdBQVIsQ0FBWUUsTUFBWjtBQUNIOzs7O0VBbkM4QmtCLGVBQUtDLEs7O2tCQUFuQnBDLEsiLCJmaWxlIjoibWl4aW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5Jztcbi8vIGltcG9ydCBtb2R1bGVzUGFyc2UgZnJvbSAnLi4vLi4vdXRpbHMvbW9kdWxlc1BhcnNlJztcbi8vIGltcG9ydCB7IHRvYXN0IH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuXG5jb25zdCBhcHAgPSByZXF1aXJlKCcuLi8uLi91dGlscy9nbG9iYWxEYXRhJyk7XG4vLyBjb25zdCB7IHBvc3QgfSA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL2FqYXgnKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWl4aW4gZXh0ZW5kcyB3ZXB5Lm1peGluIHtcbiAgICBkYXRhID0ge1xuICAgICAgICBwYWdlRGF0YToge30sXG4gICAgICAgIHBhZ2VMaXN0OiB7fSxcbiAgICAgICAgc2VsZWN0b3JJbmRleDogLTEsXG4gICAgICAgIHBhZ2VJZDogJycsXG4gICAgICAgIHBhZ2VJbmRleDogMCxcbiAgICAgICAgc2F2ZUF2YWxpYWJsZTogZmFsc2UsXG4gICAgICAgIGV4dENvbmZpZzoge30sXG4gICAgICAgIG1vZHVsZXM6IHt9LFxuICAgICAgICB0ZW1wTW9kdWxlczoge30sXG4gICAgICAgIG5vRWRpdDogZmFsc2UsXG4gICAgfVxuICAgIG9uTG9hZChvcHRpb25zKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnNhdmVBdmFsaWFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wYWdlSWQgPSBvcHRpb25zLmlkO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhcHAuZ2xvYmFsRGF0YS5wYWdlRGF0YS5maWx0ZXIob2JqID0+IG9iai5pZCA9PT0gdGhpcy5wYWdlSWQpO1xuICAgICAgICB0aGlzLnBhZ2VJbmRleCA9IGFwcC5nbG9iYWxEYXRhLnBhZ2VEYXRhLmZpbmRJbmRleChvYmogPT4gb2JqLmlkID09PSB0aGlzLnBhZ2VJZCk7XG4gICAgICAgIC8vIHRoaXMucGFnZURhdGEgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnBhZ2VEYXRhLCB7XG4gICAgICAgIC8vICAgICBjZmc6IHJlc3VsdFswXS5wcm9wcy5jZmcsIGRhdGE6IHJlc3VsdFswXS5wcm9wcy5kYXRhLCBwYWdlTnVtOiByZXN1bHRbMF0ucHJvcHMucGFnZU51bSwgcGFnZVNpemU6IHJlc3VsdFswXS5wcm9wcy5wYWdlTnVtLCB0b3RhbDogcmVzdWx0WzBdLnByb3BzLnRvdGFsLFxuICAgICAgICAvLyB9KTtcbiAgICAgICAgdGhpcy5wYWdlRGF0YSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XG4gICAgICAgIGlmIChyZXN1bHRbMF0ubmFtZSA9PT0gJ2FydGljbGUnKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2VEYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wYWdlRGF0YSwgeyBwYXJhbXM6IHJlc3VsdFswXS5wYXJhbXMgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tb2R1bGVzID0gYXBwLmdsb2JhbERhdGEubW9kdWxlcztcbiAgICAgICAgdGhpcy50ZW1wTW9kdWxlcyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5tb2R1bGVzKSk7XG4gICAgICAgIHRoaXMuZXh0Q29uZmlnID0gYXBwLmdsb2JhbERhdGEuZXh0Q29uZmlnO1xuICAgICAgICB0aGlzLnBhZ2VMaXN0ID0gYXBwLmdsb2JhbERhdGEucGFnZUxpc3QubWFwKChpdGVtLCBpbmRleCkgPT4gKHtcbiAgICAgICAgICAgIGlkOiBpbmRleCxcbiAgICAgICAgICAgIGtleTogaXRlbS5wYWdlS2V5LFxuICAgICAgICAgICAgbmFtZTogaXRlbS5wYWdlTmFtZSxcbiAgICAgICAgfSkpO1xuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgICAvLyBhc3luYyBzYXZlKCkge1xuICAgICAgICAvLyAgICAgY29uc3QgcGFnZUlkID0gYXBwLmdsb2JhbERhdGEucGFnZUxpc3QuZmlsdGVyKG9iaiA9PiBvYmoucGFnZUtleSA9PT0gJ2luZGV4JylbMF0uaWQ7XG4gICAgICAgIC8vICAgICBsZXQgbW9kRGF0YSA9IHRoaXMubW9kdWxlcy5tYXAoKHtcbiAgICAgICAgLy8gICAgICAgICBpZCwgbmFtZSwgY2ZnLCBwYXJhbXMsXG4gICAgICAgIC8vICAgICB9KSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGFyYW1zKSkgcGFyYW1zID0ge307XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgaWQsIG5hbWUsIGNmZywgcGFyYW1zLCBwYWdlX2lkOiBwYWdlSWQsXG4gICAgICAgIC8vICAgICAgICAgfTtcbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyAgICAgbW9kRGF0YSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobW9kRGF0YSkpO1xuICAgICAgICAvLyAgICAgY29uc3QgZW1wdHltb2REYXRhID0gW107XG4gICAgICAgIC8vICAgICBtb2REYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgLy8gICAgICAgICBpZiAoaXRlbS5uYW1lID09PSAnY291cG9uJyAmJiBpdGVtLnBhcmFtcyAmJiAhaXRlbS5wYXJhbXMuY291cG9uSWRzKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIHRvYXN0KCfor7fooaXlhajnu4Tku7bkuK3nmoTkvJjmg6DliLjjgIInKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgZW1wdHltb2REYXRhLnB1c2goaXRlbSk7XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgIC8vICAgICBpZiAoZW1wdHltb2REYXRhLmxlbmd0aCAmJiBlbXB0eW1vZERhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybjtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICAgIGF3YWl0IHBvc3QoJy9idXNpbmVzcy90ZW1wbGV0ZS9zYXZlbW9kdWxlcycsIHtcbiAgICAgICAgLy8gICAgICAgICBidXNpbmVzc1BhZ2VJZDogdGhpcy5wYWdlSWQsXG4gICAgICAgIC8vICAgICAgICAgbW9kdWxlc0pzb246IEpTT04uc3RyaW5naWZ5KG1vZHVsZXNQYXJzZS5zYXZlKG1vZERhdGEpKSxcbiAgICAgICAgLy8gICAgICAgICByZWxlYXNlSWQ6IGFwcC5nbG9iYWxEYXRhLmV4dENvbmZpZy5leHRKc29uLmV4dC5yZWxlYXNlSWQsXG4gICAgICAgIC8vICAgICAgICAgbXBJZDogYXBwLmdsb2JhbERhdGEuZXh0Q29uZmlnLmV4dEpzb24uZXh0Lm1wSWQsXG4gICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgLy8gICAgIC8vIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgIC8vICAgICAvLyAgICAgZGVsdGE6IDEsXG4gICAgICAgIC8vICAgICAvLyB9KTtcbiAgICAgICAgLy8gfSxcbiAgICB9XG59XG4iXX0=
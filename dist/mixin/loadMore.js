'use strict';

// import { SendClickLog } from '../utils/maidian';

var _require = require('./../utils/http.js'),
    get = _require.get;

var _require2 = require('./../utils/index.js'),
    picSrcDomain = _require2.picSrcDomain;

var modDataByPageUrl = '/business/template/loadone';
var PIC_FIELD = {
    article: 'cover', images: 'img', services: 'img', order: 'pics'
};

module.exports = {
    loadMore: function loadMore(e) {
        var _this = this;

        var index = e.target.dataset.index;
        /* eslint-disable camelcase */

        var page_data = this.data.page_data;
        var _page_data$index = page_data[index],
            id = _page_data$index.id,
            name = _page_data$index.name,
            props = _page_data$index.props;

        // 查看更多埋点
        // const app = getApp();
        // const { appid, userid } = app.globalData.extConfig;
        // SendClickLog(appid, userid, '{}', `jz_xcx_${name}_checkMore`);
        // 图片加载更多逻辑，将height置为auto

        if (name === 'images') {
            props.cfg.showMore = false;
            props.cfg.maxNum = props.cfg.images.length;
            this.setData({ page_data: page_data });
            return;
        }

        // TODO load数据concat在data后面
        var dataset = e.target.dataset;

        var postData = Object.assign({}, dataset, { bizmoduleid: id });
        if (dataset.type === 'order') {
            postData = Object.assign({}, {
                businessServicePage: dataset.servicePage,
                businessServiceSize: dataset.serviceSize
            }, { bizmoduleid: id });
        } else {
            postData = Object.assign({}, dataset, { bizmoduleid: id });
        }

        get(modDataByPageUrl, postData, function (res) {
            var data = res[dataset.type];
            data.data && data.data.forEach(function (d) {
                d[PIC_FIELD[name]] = picSrcDomain() + d[PIC_FIELD[name]];
            });

            Object.assign(props, data, {
                data: props.data.concat(data.data)
            });

            page_data[index].props = props;

            _this.setData({ page_data: page_data });
        });
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvYWRNb3JlLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJnZXQiLCJwaWNTcmNEb21haW4iLCJtb2REYXRhQnlQYWdlVXJsIiwiUElDX0ZJRUxEIiwiYXJ0aWNsZSIsImltYWdlcyIsInNlcnZpY2VzIiwib3JkZXIiLCJtb2R1bGUiLCJleHBvcnRzIiwibG9hZE1vcmUiLCJlIiwiaW5kZXgiLCJ0YXJnZXQiLCJkYXRhc2V0IiwicGFnZV9kYXRhIiwiZGF0YSIsImlkIiwibmFtZSIsInByb3BzIiwiY2ZnIiwic2hvd01vcmUiLCJtYXhOdW0iLCJsZW5ndGgiLCJzZXREYXRhIiwicG9zdERhdGEiLCJPYmplY3QiLCJhc3NpZ24iLCJiaXptb2R1bGVpZCIsInR5cGUiLCJidXNpbmVzc1NlcnZpY2VQYWdlIiwic2VydmljZVBhZ2UiLCJidXNpbmVzc1NlcnZpY2VTaXplIiwic2VydmljZVNpemUiLCJyZXMiLCJmb3JFYWNoIiwiZCIsImNvbmNhdCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7ZUFFZ0JBLFFBQVEsZUFBUixDO0lBQVJDLEcsWUFBQUEsRzs7Z0JBQ2lCRCxRQUFRLGdCQUFSLEM7SUFBakJFLFksYUFBQUEsWTs7QUFFUixJQUFNQyxtQkFBbUIsNEJBQXpCO0FBQ0EsSUFBTUMsWUFBWTtBQUNkQyxhQUFTLE9BREssRUFDSUMsUUFBUSxLQURaLEVBQ21CQyxVQUFVLEtBRDdCLEVBQ29DQyxPQUFPO0FBRDNDLENBQWxCOztBQUtBQyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2JDLFlBRGEsb0JBQ0pDLENBREksRUFDRDtBQUFBOztBQUFBLFlBQ0FDLEtBREEsR0FDVUQsRUFBRUUsTUFBRixDQUFTQyxPQURuQixDQUNBRixLQURBO0FBRVI7O0FBRlEsWUFHQUcsU0FIQSxHQUdjLEtBQUtDLElBSG5CLENBR0FELFNBSEE7QUFBQSwrQkFJb0JBLFVBQVVILEtBQVYsQ0FKcEI7QUFBQSxZQUlBSyxFQUpBLG9CQUlBQSxFQUpBO0FBQUEsWUFJSUMsSUFKSixvQkFJSUEsSUFKSjtBQUFBLFlBSVVDLEtBSlYsb0JBSVVBLEtBSlY7O0FBTVI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxZQUFJRCxTQUFTLFFBQWIsRUFBdUI7QUFDbkJDLGtCQUFNQyxHQUFOLENBQVVDLFFBQVYsR0FBcUIsS0FBckI7QUFDQUYsa0JBQU1DLEdBQU4sQ0FBVUUsTUFBVixHQUFtQkgsTUFBTUMsR0FBTixDQUFVZixNQUFWLENBQWlCa0IsTUFBcEM7QUFDQSxpQkFBS0MsT0FBTCxDQUFhLEVBQUVULG9CQUFGLEVBQWI7QUFDQTtBQUNIOztBQUVEO0FBbEJRLFlBbUJBRCxPQW5CQSxHQW1CWUgsRUFBRUUsTUFuQmQsQ0FtQkFDLE9BbkJBOztBQW9CUixZQUFJVyxXQUFXQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQmIsT0FBbEIsRUFBMkIsRUFBRWMsYUFBYVgsRUFBZixFQUEzQixDQUFmO0FBQ0EsWUFBSUgsUUFBUWUsSUFBUixLQUFpQixPQUFyQixFQUE4QjtBQUMxQkosdUJBQVdDLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCO0FBQ3pCRyxxQ0FBcUJoQixRQUFRaUIsV0FESjtBQUV6QkMscUNBQXFCbEIsUUFBUW1CO0FBRkosYUFBbEIsRUFHUixFQUFFTCxhQUFhWCxFQUFmLEVBSFEsQ0FBWDtBQUlILFNBTEQsTUFLTztBQUNIUSx1QkFBV0MsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JiLE9BQWxCLEVBQTJCLEVBQUVjLGFBQWFYLEVBQWYsRUFBM0IsQ0FBWDtBQUNIOztBQUdEakIsWUFBSUUsZ0JBQUosRUFBc0J1QixRQUF0QixFQUFnQyxVQUFDUyxHQUFELEVBQVM7QUFDckMsZ0JBQU1sQixPQUFPa0IsSUFBSXBCLFFBQVFlLElBQVosQ0FBYjtBQUNBYixpQkFBS0EsSUFBTCxJQUFhQSxLQUFLQSxJQUFMLENBQVVtQixPQUFWLENBQWtCLGFBQUs7QUFDaENDLGtCQUFFakMsVUFBVWUsSUFBVixDQUFGLElBQXFCakIsaUJBQWlCbUMsRUFBRWpDLFVBQVVlLElBQVYsQ0FBRixDQUF0QztBQUNILGFBRlksQ0FBYjs7QUFJQVEsbUJBQU9DLE1BQVAsQ0FBY1IsS0FBZCxFQUFxQkgsSUFBckIsRUFBMkI7QUFDdkJBLHNCQUFNRyxNQUFNSCxJQUFOLENBQVdxQixNQUFYLENBQWtCckIsS0FBS0EsSUFBdkI7QUFEaUIsYUFBM0I7O0FBSUFELHNCQUFVSCxLQUFWLEVBQWlCTyxLQUFqQixHQUF5QkEsS0FBekI7O0FBRUEsa0JBQUtLLE9BQUwsQ0FBYSxFQUFFVCxvQkFBRixFQUFiO0FBQ0gsU0FiRDtBQWNIO0FBOUNZLENBQWpCIiwiZmlsZSI6ImxvYWRNb3JlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IHsgU2VuZENsaWNrTG9nIH0gZnJvbSAnLi4vdXRpbHMvbWFpZGlhbic7XG5cbmNvbnN0IHsgZ2V0IH0gPSByZXF1aXJlKCcuLi91dGlscy9odHRwJyk7XG5jb25zdCB7IHBpY1NyY0RvbWFpbiB9ID0gcmVxdWlyZSgnLi4vdXRpbHMvaW5kZXgnKTtcblxuY29uc3QgbW9kRGF0YUJ5UGFnZVVybCA9ICcvYnVzaW5lc3MvdGVtcGxhdGUvbG9hZG9uZSc7XG5jb25zdCBQSUNfRklFTEQgPSB7XG4gICAgYXJ0aWNsZTogJ2NvdmVyJywgaW1hZ2VzOiAnaW1nJywgc2VydmljZXM6ICdpbWcnLCBvcmRlcjogJ3BpY3MnLFxufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBsb2FkTW9yZShlKSB7XG4gICAgICAgIGNvbnN0IHsgaW5kZXggfSA9IGUudGFyZ2V0LmRhdGFzZXQ7XG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuICAgICAgICBjb25zdCB7IHBhZ2VfZGF0YSB9ID0gdGhpcy5kYXRhO1xuICAgICAgICBjb25zdCB7IGlkLCBuYW1lLCBwcm9wcyB9ID0gcGFnZV9kYXRhW2luZGV4XTtcblxuICAgICAgICAvLyDmn6XnnIvmm7TlpJrln4vngrlcbiAgICAgICAgLy8gY29uc3QgYXBwID0gZ2V0QXBwKCk7XG4gICAgICAgIC8vIGNvbnN0IHsgYXBwaWQsIHVzZXJpZCB9ID0gYXBwLmdsb2JhbERhdGEuZXh0Q29uZmlnO1xuICAgICAgICAvLyBTZW5kQ2xpY2tMb2coYXBwaWQsIHVzZXJpZCwgJ3t9JywgYGp6X3hjeF8ke25hbWV9X2NoZWNrTW9yZWApO1xuICAgICAgICAvLyDlm77niYfliqDovb3mm7TlpJrpgLvovpHvvIzlsIZoZWlnaHTnva7kuLphdXRvXG4gICAgICAgIGlmIChuYW1lID09PSAnaW1hZ2VzJykge1xuICAgICAgICAgICAgcHJvcHMuY2ZnLnNob3dNb3JlID0gZmFsc2U7XG4gICAgICAgICAgICBwcm9wcy5jZmcubWF4TnVtID0gcHJvcHMuY2ZnLmltYWdlcy5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoeyBwYWdlX2RhdGEgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUT0RPIGxvYWTmlbDmja5jb25jYXTlnKhkYXRh5ZCO6Z2iXG4gICAgICAgIGNvbnN0IHsgZGF0YXNldCB9ID0gZS50YXJnZXQ7XG4gICAgICAgIGxldCBwb3N0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGRhdGFzZXQsIHsgYml6bW9kdWxlaWQ6IGlkIH0pO1xuICAgICAgICBpZiAoZGF0YXNldC50eXBlID09PSAnb3JkZXInKSB7XG4gICAgICAgICAgICBwb3N0RGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHtcbiAgICAgICAgICAgICAgICBidXNpbmVzc1NlcnZpY2VQYWdlOiBkYXRhc2V0LnNlcnZpY2VQYWdlLFxuICAgICAgICAgICAgICAgIGJ1c2luZXNzU2VydmljZVNpemU6IGRhdGFzZXQuc2VydmljZVNpemUsXG4gICAgICAgICAgICB9LCB7IGJpem1vZHVsZWlkOiBpZCB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBvc3REYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgZGF0YXNldCwgeyBiaXptb2R1bGVpZDogaWQgfSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldChtb2REYXRhQnlQYWdlVXJsLCBwb3N0RGF0YSwgKHJlcykgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHJlc1tkYXRhc2V0LnR5cGVdO1xuICAgICAgICAgICAgZGF0YS5kYXRhICYmIGRhdGEuZGF0YS5mb3JFYWNoKGQgPT4ge1xuICAgICAgICAgICAgICAgIGRbUElDX0ZJRUxEW25hbWVdXSA9IHBpY1NyY0RvbWFpbigpICsgZFtQSUNfRklFTERbbmFtZV1dO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ocHJvcHMsIGRhdGEsIHtcbiAgICAgICAgICAgICAgICBkYXRhOiBwcm9wcy5kYXRhLmNvbmNhdChkYXRhLmRhdGEpLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHBhZ2VfZGF0YVtpbmRleF0ucHJvcHMgPSBwcm9wcztcblxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHsgcGFnZV9kYXRhIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxufTtcbiJdfQ==
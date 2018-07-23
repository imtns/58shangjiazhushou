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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvYWRNb3JlLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJnZXQiLCJwaWNTcmNEb21haW4iLCJtb2REYXRhQnlQYWdlVXJsIiwiUElDX0ZJRUxEIiwiYXJ0aWNsZSIsImltYWdlcyIsInNlcnZpY2VzIiwib3JkZXIiLCJtb2R1bGUiLCJleHBvcnRzIiwibG9hZE1vcmUiLCJlIiwiaW5kZXgiLCJ0YXJnZXQiLCJkYXRhc2V0IiwicGFnZV9kYXRhIiwiZGF0YSIsImlkIiwibmFtZSIsInByb3BzIiwiY2ZnIiwic2hvd01vcmUiLCJtYXhOdW0iLCJsZW5ndGgiLCJzZXREYXRhIiwicG9zdERhdGEiLCJPYmplY3QiLCJhc3NpZ24iLCJiaXptb2R1bGVpZCIsInR5cGUiLCJidXNpbmVzc1NlcnZpY2VQYWdlIiwic2VydmljZVBhZ2UiLCJidXNpbmVzc1NlcnZpY2VTaXplIiwic2VydmljZVNpemUiLCJyZXMiLCJmb3JFYWNoIiwiZCIsImNvbmNhdCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7ZUFFZ0JBLFFBQVEsZUFBUixDO0lBQVJDLEcsWUFBQUEsRzs7Z0JBQ2lCRCxRQUFRLGdCQUFSLEM7SUFBakJFLFksYUFBQUEsWTs7QUFFUixJQUFNQyxtQkFBbUIsNEJBQXpCO0FBQ0EsSUFBTUMsWUFBWTtBQUNkQyxhQUFTLE9BREssRUFDSUMsUUFBUSxLQURaLEVBQ21CQyxVQUFVLEtBRDdCLEVBQ29DQyxPQUFPO0FBRDNDLENBQWxCOztBQUtBQyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2JDLFlBRGEsb0JBQ0pDLENBREksRUFDRDtBQUFBOztBQUFBLFlBQ0FDLEtBREEsR0FDVUQsRUFBRUUsTUFBRixDQUFTQyxPQURuQixDQUNBRixLQURBO0FBRVI7O0FBRlEsWUFHQUcsU0FIQSxHQUdjLEtBQUtDLElBSG5CLENBR0FELFNBSEE7QUFBQSwrQkFJb0JBLFVBQVVILEtBQVYsQ0FKcEI7QUFBQSxZQUlBSyxFQUpBLG9CQUlBQSxFQUpBO0FBQUEsWUFJSUMsSUFKSixvQkFJSUEsSUFKSjtBQUFBLFlBSVVDLEtBSlYsb0JBSVVBLEtBSlY7O0FBTVI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxZQUFJRCxTQUFTLFFBQWIsRUFBdUI7QUFDbkJDLGtCQUFNQyxHQUFOLENBQVVDLFFBQVYsR0FBcUIsS0FBckI7QUFDQUYsa0JBQU1DLEdBQU4sQ0FBVUUsTUFBVixHQUFtQkgsTUFBTUMsR0FBTixDQUFVZixNQUFWLENBQWlCa0IsTUFBcEM7QUFDQSxpQkFBS0MsT0FBTCxDQUFhLEVBQUVULG9CQUFGLEVBQWI7QUFDQTtBQUNIOztBQUVEO0FBbEJRLFlBbUJBRCxPQW5CQSxHQW1CWUgsRUFBRUUsTUFuQmQsQ0FtQkFDLE9BbkJBOztBQW9CUixZQUFJVyxXQUFXQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQmIsT0FBbEIsRUFBMkIsRUFBRWMsYUFBYVgsRUFBZixFQUEzQixDQUFmO0FBQ0EsWUFBSUgsUUFBUWUsSUFBUixLQUFpQixPQUFyQixFQUE4QjtBQUMxQkosdUJBQVdDLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCO0FBQ3pCRyxxQ0FBcUJoQixRQUFRaUIsV0FESjtBQUV6QkMscUNBQXFCbEIsUUFBUW1CO0FBRkosYUFBbEIsRUFHUixFQUFFTCxhQUFhWCxFQUFmLEVBSFEsQ0FBWDtBQUlILFNBTEQsTUFLTztBQUNIUSx1QkFBV0MsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JiLE9BQWxCLEVBQTJCLEVBQUVjLGFBQWFYLEVBQWYsRUFBM0IsQ0FBWDtBQUNIOztBQUdEakIsWUFBSUUsZ0JBQUosRUFBc0J1QixRQUF0QixFQUFnQyxVQUFDUyxHQUFELEVBQVM7QUFDckMsZ0JBQU1sQixPQUFPa0IsSUFBSXBCLFFBQVFlLElBQVosQ0FBYjtBQUNBYixpQkFBS0EsSUFBTCxJQUFhQSxLQUFLQSxJQUFMLENBQVVtQixPQUFWLENBQWtCLGFBQUs7QUFDaENDLGtCQUFFakMsVUFBVWUsSUFBVixDQUFGLElBQXFCakIsaUJBQWlCbUMsRUFBRWpDLFVBQVVlLElBQVYsQ0FBRixDQUF0QztBQUNILGFBRlksQ0FBYjs7QUFJQVEsbUJBQU9DLE1BQVAsQ0FBY1IsS0FBZCxFQUFxQkgsSUFBckIsRUFBMkI7QUFDdkJBLHNCQUFNRyxNQUFNSCxJQUFOLENBQVdxQixNQUFYLENBQWtCckIsS0FBS0EsSUFBdkI7QUFEaUIsYUFBM0I7O0FBSUFELHNCQUFVSCxLQUFWLEVBQWlCTyxLQUFqQixHQUF5QkEsS0FBekI7O0FBRUEsa0JBQUtLLE9BQUwsQ0FBYSxFQUFFVCxvQkFBRixFQUFiO0FBQ0gsU0FiRDtBQWNIO0FBOUNZLENBQWpCIiwiZmlsZSI6ImxvYWRNb3JlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IHsgU2VuZENsaWNrTG9nIH0gZnJvbSAnLi4vdXRpbHMvbWFpZGlhbic7XHJcblxyXG5jb25zdCB7IGdldCB9ID0gcmVxdWlyZSgnLi4vdXRpbHMvaHR0cCcpO1xyXG5jb25zdCB7IHBpY1NyY0RvbWFpbiB9ID0gcmVxdWlyZSgnLi4vdXRpbHMvaW5kZXgnKTtcclxuXHJcbmNvbnN0IG1vZERhdGFCeVBhZ2VVcmwgPSAnL2J1c2luZXNzL3RlbXBsYXRlL2xvYWRvbmUnO1xyXG5jb25zdCBQSUNfRklFTEQgPSB7XHJcbiAgICBhcnRpY2xlOiAnY292ZXInLCBpbWFnZXM6ICdpbWcnLCBzZXJ2aWNlczogJ2ltZycsIG9yZGVyOiAncGljcycsXHJcbn07XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBsb2FkTW9yZShlKSB7XHJcbiAgICAgICAgY29uc3QgeyBpbmRleCB9ID0gZS50YXJnZXQuZGF0YXNldDtcclxuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cclxuICAgICAgICBjb25zdCB7IHBhZ2VfZGF0YSB9ID0gdGhpcy5kYXRhO1xyXG4gICAgICAgIGNvbnN0IHsgaWQsIG5hbWUsIHByb3BzIH0gPSBwYWdlX2RhdGFbaW5kZXhdO1xyXG5cclxuICAgICAgICAvLyDmn6XnnIvmm7TlpJrln4vngrlcclxuICAgICAgICAvLyBjb25zdCBhcHAgPSBnZXRBcHAoKTtcclxuICAgICAgICAvLyBjb25zdCB7IGFwcGlkLCB1c2VyaWQgfSA9IGFwcC5nbG9iYWxEYXRhLmV4dENvbmZpZztcclxuICAgICAgICAvLyBTZW5kQ2xpY2tMb2coYXBwaWQsIHVzZXJpZCwgJ3t9JywgYGp6X3hjeF8ke25hbWV9X2NoZWNrTW9yZWApO1xyXG4gICAgICAgIC8vIOWbvueJh+WKoOi9veabtOWkmumAu+i+ke+8jOWwhmhlaWdodOe9ruS4umF1dG9cclxuICAgICAgICBpZiAobmFtZSA9PT0gJ2ltYWdlcycpIHtcclxuICAgICAgICAgICAgcHJvcHMuY2ZnLnNob3dNb3JlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHByb3BzLmNmZy5tYXhOdW0gPSBwcm9wcy5jZmcuaW1hZ2VzLmxlbmd0aDtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHsgcGFnZV9kYXRhIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUT0RPIGxvYWTmlbDmja5jb25jYXTlnKhkYXRh5ZCO6Z2iXHJcbiAgICAgICAgY29uc3QgeyBkYXRhc2V0IH0gPSBlLnRhcmdldDtcclxuICAgICAgICBsZXQgcG9zdERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhc2V0LCB7IGJpem1vZHVsZWlkOiBpZCB9KTtcclxuICAgICAgICBpZiAoZGF0YXNldC50eXBlID09PSAnb3JkZXInKSB7XHJcbiAgICAgICAgICAgIHBvc3REYXRhID0gT2JqZWN0LmFzc2lnbih7fSwge1xyXG4gICAgICAgICAgICAgICAgYnVzaW5lc3NTZXJ2aWNlUGFnZTogZGF0YXNldC5zZXJ2aWNlUGFnZSxcclxuICAgICAgICAgICAgICAgIGJ1c2luZXNzU2VydmljZVNpemU6IGRhdGFzZXQuc2VydmljZVNpemUsXHJcbiAgICAgICAgICAgIH0sIHsgYml6bW9kdWxlaWQ6IGlkIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBvc3REYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgZGF0YXNldCwgeyBiaXptb2R1bGVpZDogaWQgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgZ2V0KG1vZERhdGFCeVBhZ2VVcmwsIHBvc3REYXRhLCAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXNbZGF0YXNldC50eXBlXTtcclxuICAgICAgICAgICAgZGF0YS5kYXRhICYmIGRhdGEuZGF0YS5mb3JFYWNoKGQgPT4ge1xyXG4gICAgICAgICAgICAgICAgZFtQSUNfRklFTERbbmFtZV1dID0gcGljU3JjRG9tYWluKCkgKyBkW1BJQ19GSUVMRFtuYW1lXV07XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihwcm9wcywgZGF0YSwge1xyXG4gICAgICAgICAgICAgICAgZGF0YTogcHJvcHMuZGF0YS5jb25jYXQoZGF0YS5kYXRhKSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBwYWdlX2RhdGFbaW5kZXhdLnByb3BzID0gcHJvcHM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoeyBwYWdlX2RhdGEgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG59O1xyXG4iXX0=
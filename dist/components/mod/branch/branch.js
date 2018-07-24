'use strict';

/*eslint-disable */
var _require = require('./../../../utils/ajax.js'),
    get = _require.get;

module.exports = {
    showBranchChooice: function showBranchChooice(e) {
        var index = e.currentTarget.dataset.index;

        var page_data = this.data.page_data;
        page_data[index].props.cfg.showBranchChooice = true;
        this.setData({
            page_data: page_data
        });
    },
    closeBranchChooice: function closeBranchChooice(e) {
        var index = e.currentTarget.dataset.index;

        var page_data = this.data.page_data;
        page_data[index].props.cfg.showBranchChooice = false;
        this.setData({
            page_data: page_data
        });
    },
    bindBranchCall: function bindBranchCall(e) {
        this.closeBranchChooice(e);
        var sign = e.currentTarget.dataset.sign;

        get('/businessShopBranch/phone', { from: this.data.pageType, sign: sign }, function (e, phoneNumber) {
            if (e) {
                wx.showModal({ title: '提示', content: '获取号码出错' });
                return;
            }

            wx.makePhoneCall({ phoneNumber: phoneNumber });
        });
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJyYW5jaC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiZ2V0IiwibW9kdWxlIiwiZXhwb3J0cyIsInNob3dCcmFuY2hDaG9vaWNlIiwiZSIsImluZGV4IiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJwYWdlX2RhdGEiLCJkYXRhIiwicHJvcHMiLCJjZmciLCJzZXREYXRhIiwiY2xvc2VCcmFuY2hDaG9vaWNlIiwiYmluZEJyYW5jaENhbGwiLCJzaWduIiwiZnJvbSIsInBhZ2VUeXBlIiwicGhvbmVOdW1iZXIiLCJ3eCIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsIm1ha2VQaG9uZUNhbGwiXSwibWFwcGluZ3MiOiI7O0FBQUE7ZUFDWUEsUUFBUSxxQkFBUixDO0lBQUxDLEcsWUFBQUEsRzs7QUFDUEMsT0FBT0MsT0FBUCxHQUFlO0FBQ1hDLHFCQURXLDZCQUNPQyxDQURQLEVBQ1M7QUFBQSxZQUNWQyxLQURVLEdBQ0FELEVBQUVFLGFBQUYsQ0FBZ0JDLE9BRGhCLENBQ1ZGLEtBRFU7O0FBRWhCLFlBQUlHLFlBQVksS0FBS0MsSUFBTCxDQUFVRCxTQUExQjtBQUNBQSxrQkFBVUgsS0FBVixFQUFpQkssS0FBakIsQ0FBdUJDLEdBQXZCLENBQTJCUixpQkFBM0IsR0FBK0MsSUFBL0M7QUFDQSxhQUFLUyxPQUFMLENBQWE7QUFDVEo7QUFEUyxTQUFiO0FBR0gsS0FSVTtBQVNYSyxzQkFUVyw4QkFTUVQsQ0FUUixFQVNVO0FBQUEsWUFDWkMsS0FEWSxHQUNMRCxFQUFFRSxhQUFGLENBQWdCQyxPQURYLENBQ1pGLEtBRFk7O0FBRWpCLFlBQUlHLFlBQVUsS0FBS0MsSUFBTCxDQUFVRCxTQUF4QjtBQUNBQSxrQkFBVUgsS0FBVixFQUFpQkssS0FBakIsQ0FBdUJDLEdBQXZCLENBQTJCUixpQkFBM0IsR0FBK0MsS0FBL0M7QUFDQSxhQUFLUyxPQUFMLENBQWE7QUFDVEo7QUFEUyxTQUFiO0FBR0gsS0FoQlU7QUFpQlhNLGtCQWpCVywwQkFpQklWLENBakJKLEVBaUJNO0FBQ2IsYUFBS1Msa0JBQUwsQ0FBd0JULENBQXhCO0FBRGEsWUFFUlcsSUFGUSxHQUVGWCxFQUFFRSxhQUFGLENBQWdCQyxPQUZkLENBRVJRLElBRlE7O0FBR2JmLFlBQUksMkJBQUosRUFBaUMsRUFBRWdCLE1BQU0sS0FBS1AsSUFBTCxDQUFVUSxRQUFsQixFQUE0QkYsVUFBNUIsRUFBakMsRUFBb0UsVUFBQ1gsQ0FBRCxFQUFJYyxXQUFKLEVBQW9CO0FBQ3BGLGdCQUFJZCxDQUFKLEVBQU87QUFDSGUsbUJBQUdDLFNBQUgsQ0FBYSxFQUFFQyxPQUFPLElBQVQsRUFBZUMsU0FBUyxRQUF4QixFQUFiO0FBQ0E7QUFDSDs7QUFFREgsZUFBR0ksYUFBSCxDQUFpQixFQUFFTCx3QkFBRixFQUFqQjtBQUNILFNBUEQ7QUFRSDtBQTVCVSxDQUFmIiwiZmlsZSI6ImJyYW5jaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qZXNsaW50LWRpc2FibGUgKi9cbmNvbnN0IHtnZXR9PXJlcXVpcmUoXCIuLi8uLi8uLi91dGlscy9hamF4XCIpO1xubW9kdWxlLmV4cG9ydHM9e1xuICAgIHNob3dCcmFuY2hDaG9vaWNlKGUpe1xuICAgICAgICB2YXIgeyBpbmRleCB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XG4gICAgICAgIHZhciBwYWdlX2RhdGEgPSB0aGlzLmRhdGEucGFnZV9kYXRhO1xuICAgICAgICBwYWdlX2RhdGFbaW5kZXhdLnByb3BzLmNmZy5zaG93QnJhbmNoQ2hvb2ljZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBwYWdlX2RhdGFcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIGNsb3NlQnJhbmNoQ2hvb2ljZShlKXtcbiAgICAgICAgdmFyIHtpbmRleH09ZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XG4gICAgICAgIHZhciBwYWdlX2RhdGE9dGhpcy5kYXRhLnBhZ2VfZGF0YTtcbiAgICAgICAgcGFnZV9kYXRhW2luZGV4XS5wcm9wcy5jZmcuc2hvd0JyYW5jaENob29pY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIHBhZ2VfZGF0YVxuICAgICAgICB9KVxuICAgIH0sXG4gICAgYmluZEJyYW5jaENhbGwoZSl7XG4gICAgICAgIHRoaXMuY2xvc2VCcmFuY2hDaG9vaWNlKGUpO1xuICAgICAgICB2YXIge3NpZ259PWUuY3VycmVudFRhcmdldC5kYXRhc2V0O1xuICAgICAgICBnZXQoJy9idXNpbmVzc1Nob3BCcmFuY2gvcGhvbmUnLCB7IGZyb206IHRoaXMuZGF0YS5wYWdlVHlwZSAsc2lnbn0sIChlLCBwaG9uZU51bWJlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoeyB0aXRsZTogJ+aPkOekuicsIGNvbnRlbnQ6ICfojrflj5blj7fnoIHlh7rplJknIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd3gubWFrZVBob25lQ2FsbCh7IHBob25lTnVtYmVyIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59Il19
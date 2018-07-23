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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJyYW5jaC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiZ2V0IiwibW9kdWxlIiwiZXhwb3J0cyIsInNob3dCcmFuY2hDaG9vaWNlIiwiZSIsImluZGV4IiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJwYWdlX2RhdGEiLCJkYXRhIiwicHJvcHMiLCJjZmciLCJzZXREYXRhIiwiY2xvc2VCcmFuY2hDaG9vaWNlIiwiYmluZEJyYW5jaENhbGwiLCJzaWduIiwiZnJvbSIsInBhZ2VUeXBlIiwicGhvbmVOdW1iZXIiLCJ3eCIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsIm1ha2VQaG9uZUNhbGwiXSwibWFwcGluZ3MiOiI7O0FBQUE7ZUFDWUEsUUFBUSxxQkFBUixDO0lBQUxDLEcsWUFBQUEsRzs7QUFDUEMsT0FBT0MsT0FBUCxHQUFlO0FBQ1hDLHFCQURXLDZCQUNPQyxDQURQLEVBQ1M7QUFBQSxZQUNWQyxLQURVLEdBQ0FELEVBQUVFLGFBQUYsQ0FBZ0JDLE9BRGhCLENBQ1ZGLEtBRFU7O0FBRWhCLFlBQUlHLFlBQVksS0FBS0MsSUFBTCxDQUFVRCxTQUExQjtBQUNBQSxrQkFBVUgsS0FBVixFQUFpQkssS0FBakIsQ0FBdUJDLEdBQXZCLENBQTJCUixpQkFBM0IsR0FBK0MsSUFBL0M7QUFDQSxhQUFLUyxPQUFMLENBQWE7QUFDVEo7QUFEUyxTQUFiO0FBR0gsS0FSVTtBQVNYSyxzQkFUVyw4QkFTUVQsQ0FUUixFQVNVO0FBQUEsWUFDWkMsS0FEWSxHQUNMRCxFQUFFRSxhQUFGLENBQWdCQyxPQURYLENBQ1pGLEtBRFk7O0FBRWpCLFlBQUlHLFlBQVUsS0FBS0MsSUFBTCxDQUFVRCxTQUF4QjtBQUNBQSxrQkFBVUgsS0FBVixFQUFpQkssS0FBakIsQ0FBdUJDLEdBQXZCLENBQTJCUixpQkFBM0IsR0FBK0MsS0FBL0M7QUFDQSxhQUFLUyxPQUFMLENBQWE7QUFDVEo7QUFEUyxTQUFiO0FBR0gsS0FoQlU7QUFpQlhNLGtCQWpCVywwQkFpQklWLENBakJKLEVBaUJNO0FBQ2IsYUFBS1Msa0JBQUwsQ0FBd0JULENBQXhCO0FBRGEsWUFFUlcsSUFGUSxHQUVGWCxFQUFFRSxhQUFGLENBQWdCQyxPQUZkLENBRVJRLElBRlE7O0FBR2JmLFlBQUksMkJBQUosRUFBaUMsRUFBRWdCLE1BQU0sS0FBS1AsSUFBTCxDQUFVUSxRQUFsQixFQUE0QkYsVUFBNUIsRUFBakMsRUFBb0UsVUFBQ1gsQ0FBRCxFQUFJYyxXQUFKLEVBQW9CO0FBQ3BGLGdCQUFJZCxDQUFKLEVBQU87QUFDSGUsbUJBQUdDLFNBQUgsQ0FBYSxFQUFFQyxPQUFPLElBQVQsRUFBZUMsU0FBUyxRQUF4QixFQUFiO0FBQ0E7QUFDSDs7QUFFREgsZUFBR0ksYUFBSCxDQUFpQixFQUFFTCx3QkFBRixFQUFqQjtBQUNILFNBUEQ7QUFRSDtBQTVCVSxDQUFmIiwiZmlsZSI6ImJyYW5jaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qZXNsaW50LWRpc2FibGUgKi9cclxuY29uc3Qge2dldH09cmVxdWlyZShcIi4uLy4uLy4uL3V0aWxzL2FqYXhcIik7XHJcbm1vZHVsZS5leHBvcnRzPXtcclxuICAgIHNob3dCcmFuY2hDaG9vaWNlKGUpe1xyXG4gICAgICAgIHZhciB7IGluZGV4IH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcclxuICAgICAgICB2YXIgcGFnZV9kYXRhID0gdGhpcy5kYXRhLnBhZ2VfZGF0YTtcclxuICAgICAgICBwYWdlX2RhdGFbaW5kZXhdLnByb3BzLmNmZy5zaG93QnJhbmNoQ2hvb2ljZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgcGFnZV9kYXRhXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBjbG9zZUJyYW5jaENob29pY2UoZSl7XHJcbiAgICAgICAgdmFyIHtpbmRleH09ZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XHJcbiAgICAgICAgdmFyIHBhZ2VfZGF0YT10aGlzLmRhdGEucGFnZV9kYXRhO1xyXG4gICAgICAgIHBhZ2VfZGF0YVtpbmRleF0ucHJvcHMuY2ZnLnNob3dCcmFuY2hDaG9vaWNlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgcGFnZV9kYXRhXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBiaW5kQnJhbmNoQ2FsbChlKXtcclxuICAgICAgICB0aGlzLmNsb3NlQnJhbmNoQ2hvb2ljZShlKTtcclxuICAgICAgICB2YXIge3NpZ259PWUuY3VycmVudFRhcmdldC5kYXRhc2V0O1xyXG4gICAgICAgIGdldCgnL2J1c2luZXNzU2hvcEJyYW5jaC9waG9uZScsIHsgZnJvbTogdGhpcy5kYXRhLnBhZ2VUeXBlICxzaWdufSwgKGUsIHBob25lTnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlKSB7XHJcbiAgICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoeyB0aXRsZTogJ+aPkOekuicsIGNvbnRlbnQ6ICfojrflj5blj7fnoIHlh7rplJknIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB3eC5tYWtlUGhvbmVDYWxsKHsgcGhvbmVOdW1iZXIgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iXX0=
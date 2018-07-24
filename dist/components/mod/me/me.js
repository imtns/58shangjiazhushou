"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    makePhoneCall: function makePhoneCall(e) {
        var phoneNumber = e.currentTarget.dataset.number;
        wx.makePhoneCall({
            phoneNumber: phoneNumber
        });
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lLmpzIl0sIm5hbWVzIjpbIm1ha2VQaG9uZUNhbGwiLCJlIiwicGhvbmVOdW1iZXIiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsIm51bWJlciIsInd4Il0sIm1hcHBpbmdzIjoiOzs7OztrQkFBZTtBQUVYQSxpQkFGVyx5QkFFR0MsQ0FGSCxFQUVNO0FBQ2IsWUFBTUMsY0FBY0QsRUFBRUUsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JDLE1BQTVDO0FBQ0FDLFdBQUdOLGFBQUgsQ0FBaUI7QUFDYkU7QUFEYSxTQUFqQjtBQUdIO0FBUFUsQyIsImZpbGUiOiJtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcblxuICAgIG1ha2VQaG9uZUNhbGwoZSkge1xuICAgICAgICBjb25zdCBwaG9uZU51bWJlciA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0Lm51bWJlcjtcbiAgICAgICAgd3gubWFrZVBob25lQ2FsbCh7XG4gICAgICAgICAgICBwaG9uZU51bWJlcixcbiAgICAgICAgfSk7XG4gICAgfSxcbn07XG5cbiJdfQ==
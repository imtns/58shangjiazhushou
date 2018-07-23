'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// pages/mod/userinfoAuthorize/userinfoAuthorize.js
// const app = getApp();
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        bindCallBack: {
            type: Function
        }
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        bindGetUserInfo: function bindGetUserInfo(e) {
            if (e.detail.errMsg === 'getUserInfo:ok') {
                // const {
                //     userInfo, rawData, signature, encryptedData, iv,
                // } = e.detail;
                Object.assign(this.$parent.globalData, _extends({}, e.detail));
                this.data.bindCallBack && this.data.bindCallBack(null, e.detail);
            } else {
                this.data.bindCallBack && this.data.bindCallBack(e.detail.errMsg);
            }
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXJpbmZvQXV0aG9yaXplLmpzIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJiaW5kQ2FsbEJhY2siLCJ0eXBlIiwiRnVuY3Rpb24iLCJkYXRhIiwibWV0aG9kcyIsImJpbmRHZXRVc2VySW5mbyIsImUiLCJkZXRhaWwiLCJlcnJNc2ciLCJPYmplY3QiLCJhc3NpZ24iLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQUEsVUFBVTtBQUNOOzs7QUFHQUMsZ0JBQVk7QUFDUkMsc0JBQWM7QUFDVkMsa0JBQU1DO0FBREk7QUFETixLQUpOOztBQVVOOzs7QUFHQUMsVUFBTSxFQWJBOztBQWlCTjs7O0FBR0FDLGFBQVM7QUFDTEMsdUJBREssMkJBQ1dDLENBRFgsRUFDYztBQUNmLGdCQUFJQSxFQUFFQyxNQUFGLENBQVNDLE1BQVQsS0FBb0IsZ0JBQXhCLEVBQTBDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBQyx1QkFBT0MsTUFBUCxDQUFjLEtBQUtDLE9BQUwsQ0FBYUMsVUFBM0IsZUFDT04sRUFBRUMsTUFEVDtBQUdBLHFCQUFLSixJQUFMLENBQVVILFlBQVYsSUFBMEIsS0FBS0csSUFBTCxDQUFVSCxZQUFWLENBQXVCLElBQXZCLEVBQTZCTSxFQUFFQyxNQUEvQixDQUExQjtBQUNILGFBUkQsTUFRTztBQUNILHFCQUFLSixJQUFMLENBQVVILFlBQVYsSUFBMEIsS0FBS0csSUFBTCxDQUFVSCxZQUFWLENBQXVCTSxFQUFFQyxNQUFGLENBQVNDLE1BQWhDLENBQTFCO0FBQ0g7QUFDSjtBQWJJO0FBcEJILENBQVYiLCJmaWxlIjoidXNlcmluZm9BdXRob3JpemUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBwYWdlcy9tb2QvdXNlcmluZm9BdXRob3JpemUvdXNlcmluZm9BdXRob3JpemUuanNcclxuLy8gY29uc3QgYXBwID0gZ2V0QXBwKCk7XHJcbkNvbXBvbmVudCh7XHJcbiAgICAvKipcclxuICAgICAqIOe7hOS7tueahOWxnuaAp+WIl+ihqFxyXG4gICAgICovXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgYmluZENhbGxCYWNrOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IEZ1bmN0aW9uLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57uE5Lu255qE5Yid5aeL5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIGRhdGE6IHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57uE5Lu255qE5pa55rOV5YiX6KGoXHJcbiAgICAgKi9cclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBiaW5kR2V0VXNlckluZm8oZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5kZXRhaWwuZXJyTXNnID09PSAnZ2V0VXNlckluZm86b2snKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zdCB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdXNlckluZm8sIHJhd0RhdGEsIHNpZ25hdHVyZSwgZW5jcnlwdGVkRGF0YSwgaXYsXHJcbiAgICAgICAgICAgICAgICAvLyB9ID0gZS5kZXRhaWw7XHJcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgLi4uZS5kZXRhaWwsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5iaW5kQ2FsbEJhY2sgJiYgdGhpcy5kYXRhLmJpbmRDYWxsQmFjayhudWxsLCBlLmRldGFpbCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuYmluZENhbGxCYWNrICYmIHRoaXMuZGF0YS5iaW5kQ2FsbEJhY2soZS5kZXRhaWwuZXJyTXNnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG59KTtcclxuIl19
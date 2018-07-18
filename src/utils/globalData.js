/*eslint-disable */
import { get,post } from './ajax';

export const globalData = {
  iv: null,
  sessionId: null,
  userInfo: null,
  encryptedData: null,
  information: {},
  extConfig: {
    releaseId:1015071474408558592,
    appid:1001014495864229888
  },
  pageData:{},
}

export function clearSessionId() {
  Object.assign(this.globalData, {
    iv: null,
    sessionId: null,
    userInfo: null,
  });
}
// 获取sessionid
function getSessionId(callback) {
  const self = this;

  const {
    sessionId
  } = this.globalData;
  if (sessionId) {
    callback(null, sessionId);
    return;
  }
  this.getCode((e, code, userInfo) => {
    if (e) {
      console.log(e);
      return;
    }
    get('/wechat/getSession/', {
      code
    }, (e, res) => {
      if (e) {
        callback(e);
        return;
      }
      const {
        data,
        code
      } = res;
      self.globalData.userInfo = userInfo;
      self.globalData.sessionId = data.session;
      if (code === 1) {
        // TODO 注册
        self.regist();
      }

      callback(null, data.session);
    });
  });
}
// 获取code
export function getCode(callback) {
  // const self = this;
  wx.login({
    success(data) {
      const {
        userInfo
      } = wx.getStorageSync('getUserInfo');
      callback(null, data.code, userInfo);
      // self.getUserInfo((e, userInfo) => {
      //   if (e) {
      //     callback(e);
      //     return;
      //   }

      //   callback(null, data.code, userInfo);
      // });
    },
    fail(err) {
      console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err);
      callback(err);
    },
  });
}
// 获取userInfo
export function getUserInfo(callback) {
  const self = this;

  const {
    userInfo
  } = self.globalData;
  if (userInfo) {
    callback(null, userInfo);
    return;
  }

  wx.getUserInfo({
    withCredentials: true,
    success({
      encryptedData,
      iv,
      userInfo
    }) {
      self.globalData.encryptedData = encryptedData;
      self.globalData.userInfo = userInfo;
      self.globalData.iv = iv;
      callback(null, userInfo);
    },
    fail(e) {
      self.openSetting((e, userInfo) => {
        if (e) {
          console.log(e);
          return;
        }
        callback(null, userInfo);
      });
    },
  });
}
// 重新设置
export function openSetting(callback) {
  const self = this;

  wx.showModal({
    title: '注意',
    content: '由于您拒绝了授权，后续页面可能无法正常访问。您可以进入设置页面开启授权。',
    success(res) {
      if (!res.confirm) {
        wx.reLaunch({
          url: '/pages/index/index'
        });
        return;
      }

      wx.openSetting({
        success: res => {
          if (!res.authSetting['scope.userInfo']) {
            callback('设置失败');
          }

          self.getCode((e, code, userInfo) => {
            callback(null, userInfo);
          });
        },
      });
    },
  });
}
// 注册
export function regist() {
  const self = this;
  const {
    iv,
    encryptedData,
    sessionId
  } = self.globalData;

  console.log(self.globalData);
  post('/wechat/decodeUserInfo/', {
    iv,
    sessionId,
    encryptedData
  }, (e, res) => {
    console.log(e, res);
    if (e) {
      alert('注册失败，请删除小程序后重新打开。');
    }
  });
}
export const getMappDetail = ({ userId, appId, releaseId } = {}) => {
    return new Promise((resolve, reject) => {
        get('/search/detail', { userId, appId, releaseId }, (err, res) => {
            if (err || !res) {
                alert('该小程序已下线！');
                reject(err);
                return;
            }

            resolve(res);
        })
    });
}
const utils = {
    globalData,
    clearSessionId,
    getSessionId,
    getCode,
    getUserInfo,
    openSetting,
    regist
 };
 export default utils; 

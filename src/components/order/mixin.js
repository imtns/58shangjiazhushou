import wepy from 'wepy';
import { toast, picSrcDomain } from '../../utils';
import { get } from '../../utils/ajaxOrder';
import { getUid, SendClickLog } from '../../utils/maidian';

export default class OrderMixin extends wepy.mixin {
  data = {
      statusSet: [
          '已支付，待接单',
          '已接单，待服务',
          '已完成',
          '已取消',
          '已删除',
          '已下单，待支付',
          '退款成功',
          '退款失败',
          '已取消，系统自动取消',
          '已评价',
          '退款中',
          '',
          '退款中',
      ],
      sendParams: {
          pageNum: 1,
          pageSize: 5,
          status: '',
      },
      serviceOrderList: [],
      productOrderList: [],
  };
  methods = {
      bindClickTab(status) {
          SendClickLog(
              'wxf03e52adc4b13448',
              getUid(),
              '{}',
              `sjzh_click_orderList_status_${status}`,
          );
          const resetParams = {
              pageNum: 1,
              pageSize: 5,
              status,
          };
          const resetOrderList = {
              data: [],
              pageNum: 1,
              pageSize: 5,
          };
          this.sendParams = Object.assign({}, this.sendParams, resetParams);
          this.orderList = Object.assign({}, resetOrderList);
          this.getOrderList();
      },
      bindLoadDown(pageNum) {
          const {
              recordsTotal: total,
          } = this.orderList;
          if (this.orderList.data.length === total) return;
          this.sendParams = Object.assign({}, this.sendParams, {
              pageNum,
          });
          this.getOrderList();
      },
  };
  parseOrderList(orders) {
      const regDateTime = /(\d{4})-([0-1]?\d{1})-([0-3]?\d{1}) ([0-2]?\d{1}):([0-5]?\d{1}):([0-5]?\d{1}).*/;
      return orders.map(item => {
          const ret = item;
          ret.mpLogo = picSrcDomain() + item.mpLogo;
          if (ret.createTime) { ret.createTime = item.createTime.replace(regDateTime, '$2.$3 $4:$5'); }
          if (ret.startTime) { ret.startTime = item.startTime.replace(regDateTime, '$2.$3 $4:$5'); }
          if (ret.endTime) { ret.endTime = item.endTime.replace(regDateTime, '$2.$3 $4:$5'); }
          return ret;
      });
  }
  async getOrderList(id = '') {
      const mpId = wepy.getStorageSync('current_mpid');
      this.sendParams = Object.assign({}, this.sendParams, {
          mpId,
          status: id,
      });
      const [e, res] = await get(
          '/consumerAppointment/queryPageForUser',
          this.sendParams,
      );
      if (e) {
          toast(e);
          return;
      }
      const data = this.parseOrderList(res.data);
      this.productOrderList = data.filter((item) => item.orderType === 4);
      this.productOrderList.forEach((item) => {
          item.consumerAddressJson = JSON.parse(item.consumerAddressJson);
      });
      this.serviceOrderList = data.filter((item) => item.orderType === 1);
      this.$apply();
  }
}

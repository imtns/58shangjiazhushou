import wepy from 'wepy';
import {
    toast,
    picSrcDomain,
} from '../../utils';
import { get } from '../../utils/ajaxOrder';
import {
    getUid,
    SendClickLog,
} from '../../utils/maidian';

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
          '已取消',
          '已评价',
          '退款中',
          '',
          '退款中',
      ],
      sendParams: {
          pageNum: 1,
          pageSize: 10,
          status: '',
      },
      total: 0,
      serviceOrderList: [],
      productOrderList: [],
      noMore: false,
      listSaver: [],
  };
  events = {
      bindLoadDown() {
          if (this.noMore) return;
          if (this.orderType === 'service' && this.serviceOrderList === this.total.service) return;
          if (this.orderType === 'product' && this.productOrderList === this.total.product) return;
          this.sendParams = Object.assign({}, this.sendParams, {
              pageNum: this.sendParams.pageNum + 1,
          });
          this.getOrderList();
      },
  }
  parseOrderList(orders) {
      const regDateTime = /(\d{4})-([0-1]?\d{1})-([0-3]?\d{1}) ([0-2]?\d{1}):([0-5]?\d{1}):([0-5]?\d{1}).*/;
      return orders.map(item => {
          const ret = item;
          ret.mpLogo = picSrcDomain() + item.mpLogo;
          if (ret.createTime) {
              ret.createTime = item.createTime.replace(regDateTime, '$2.$3 $4:$5');
          }
          if (ret.startTime) {
              ret.startTime = item.startTime.replace(regDateTime, '$2.$3 $4:$5');
          }
          if (ret.endTime) {
              ret.endTime = item.endTime.replace(regDateTime, '$2.$3 $4:$5');
          }
          return ret;
      });
  }
  filterOrder(status) {
      if (this.orderType === 'service') {
          this.serviceOrderList = status === '' ? this.listSaver.filter((item) => (item.orderType === 1)) : this.listSaver.filter((item) => (item.status.toString() === status && item.orderType === 1));
      }
      if (this.orderType === 'product') {
          this.productOrderList = status === '' ? this.listSaver.filter((item) => (item.orderType === 4)) : this.listSaver.filter((item) => (item.status.toString() === status && item.orderType === 4));
      }
  }
  async getOrderList(id = '') {
      SendClickLog(
          'wxf03e52adc4b13448',
          getUid(),
          '{}',
          `sjzh_click_orderList_status_${id}`,
      );
      this.noMore = false;
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
      this.listSaver.push(...data);
      this.total = res.recordsTotal;
      if (this.listSaver.length === this.total) {
          this.noMore = true;
      }
      const filterProduct = data.filter((item) => item.orderType === 4);
      this.productOrderList.push(...filterProduct);
      this.productOrderList.forEach((item) => {
          if ((typeof item.consumerAddressJson !== 'object') && (item.consumerAddressJson !== null)) {
              item.consumerAddressJson = JSON.parse(item.consumerAddressJson);
          }
      });
      const filterService = data.filter((item) => item.orderType === 1);
      this.serviceOrderList.push(...filterService);
      this.$apply();
  }
}

import wepy from 'wepy';
import { toast, picSrcDomain } from '../../utils';
import { get } from '../../utils/ajax';
import { getUid, SendClickLog } from '../../utils/maidian';

export default class OrderMixin extends wepy.mixin {
    data = {
        statusSet: {
            0: '已支付，待接单',
            1: '已接单，待服务',
            2: '已完成',
            3: '已取消',
            4: '已删除',
            5: '已下单，待支付',
            6: '退款成功',
            7: '退款失败',
            8: '已取消',
            9: '已评价',
            10: '退款中',
            11: '买单支付',
            12: '退款处理中',
            13: '开始配送',
            14: '订单已送达',
            15: '商家拒绝接单',
        },
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
            if (this.orderType === 'service' && this.serviceOrderList === this.total.service) {
                return;
            }
            if (this.orderType === 'product' && this.productOrderList === this.total.product) {
                return;
            }
            this.sendParams = Object.assign({}, this.sendParams, {
                pageNum: this.sendParams.pageNum + 1,
            });
            this.getOrderList();
        },
    };
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
            this.serviceOrderList =
                status === ''
                    ? this.listSaver.filter(item => item.orderType === 1)
                    : this.listSaver.filter(item => item.status.toString() === status && item.orderType === 1);
        }
        if (this.orderType === 'product') {
            this.productOrderList =
                status === ''
                    ? this.listSaver.filter(item => item.orderType === 4)
                    : this.listSaver.filter(item => item.status.toString() === status && item.orderType === 4);
        }
    }
    async getOrderList(id = '') {
        try {
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
                orderType: id,
            });
            const res = await get('/consumerAppointment/queryPageForUser', this.sendParams);

            const data = this.parseOrderList(res.data);
            this.listSaver.push(...data);
            this.total = res.recordsTotal;
            if (this.listSaver.length === this.total) {
                this.noMore = true;
            }
            const filterProduct = data.filter(item => item.orderType === 4);
            this.productOrderList.push(...filterProduct);
            this.productOrderList.forEach(item => {
                if (
                    typeof item.consumerAddressJson !== 'object' &&
                    item.consumerAddressJson !== null
                ) {
                    item.consumerAddressJson = JSON.parse(item.consumerAddressJson);
                }
            });
            const filterService = data.filter(item => item.orderType === 1);
            this.serviceOrderList.push(...filterService);
            this.$apply();
        } catch (err) {
            toast(err);
        }
    }
}

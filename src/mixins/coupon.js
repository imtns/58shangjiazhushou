import wepy from 'wepy';
import { LOAD_COUPON_LIST } from '../utils/url';
import { get } from '../utils/ajax';

export default class CouponMixin extends wepy.mixin {
    formatTime(v, type = 'YYYY-DD-MM') {
        const regRes = v.match(/([\d]{4})-([\d]{2})-([\d]{2})/);
        if (!regRes) {
            return;
        }

        let result = '';
        const [time, year, month, day] = regRes;

        if (type === 'YYYY.DD.MM') {
            result = [year, month, day].join('.');
        }

        if (type === 'YYYY-DD-MM') {
            result = time;
        }

        return result;
    }

    async getCoupons({ mpId, pageNum, pageSize }) {
        let result = [];

        let { data: coupons } = await get(LOAD_COUPON_LIST, {
            pageNum,
            pageSize,
            mpId,
        });

        if (coupons && coupons.length) {
            coupons = coupons.map(item => {
                const coupon = Object.assign({}, item);
                let { couponCondition } = coupon;
                const { validStarttime, validEndtime, validType } = coupon;

                if (validEndtime && (new Date(validEndtime)).getTime() - Date.now() < 0) {
                    coupon.unable = true;
                }

                if (couponCondition) {
                    try {
                        couponCondition = JSON.parse(couponCondition);
                        Object.assign(coupon, couponCondition);
                    } catch (e) {
                        console.log(e);
                    }
                }

                if (validType === 1 && validStarttime && validEndtime) {
                    Object.assign(coupon, {
                        validStarttime: this.formatTime(validStarttime, 'YYYY.DD.MM'),
                        validEndtime: this.formatTime(validEndtime, 'YYYY.DD.MM'),
                    });
                }

                return coupon;
            });

            result = coupons;
        }

        return result;
    }
}
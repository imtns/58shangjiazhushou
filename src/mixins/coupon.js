import wepy from 'wepy';

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
}
// mixins/test.js
import wepy from 'wepy';

export default class Mixin extends wepy.mixin {
    errorHandler(e) {
        console.log(e);
    }
}
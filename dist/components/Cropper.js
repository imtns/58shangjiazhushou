'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/**
 * 使用方法：
 * 将<cropper>组件插入到父组件，在父组件中$broadcast事件’crop-loadImage’
 * 并在父组件中添加事件'after-crop'，接收裁剪后的图片临时地址
 *
 * 'crop-loadImage'参数：
 * imageSrc {String} 图片链接，必须为临时地址，或者已下载的图片
 * ratio {String} 裁剪比例，没有则自由裁剪
 * first {Boolean} 是否为第一次加载图片
 *
 * 'after-crop'参数：
 * tempFilePath {String} 裁剪后的图片临时地址
 */

// pages/wx-cropper/index.js
// 手机的宽度
var windowWRPX = 750;
// 拖动时候的 pageX
var pageX = 0;
// 拖动时候的 pageY
var pageY = 0;

var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
    pixelRatio = _wx$getSystemInfoSync.pixelRatio;

// 调整大小时候的 pageX


var sizeConfPageX = 0;
// 调整大小时候的 pageY
var sizeConfPageY = 0;

var initDragCutW = 0;
var initDragCutL = 0;
var initDragCutH = 0;
var initDragCutT = 0;
// 移动时 手势位移与 实际元素位移的比
var dragScaleP = 2;
var ctx = null;
var cutCoefficient = 0.8; // 裁剪系数
var originSrc = '';
var drawL = 0;
var drawT = 0;

var Cropper = function (_wepy$component) {
    _inherits(Cropper, _wepy$component);

    function Cropper() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Cropper);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Cropper.__proto__ || Object.getPrototypeOf(Cropper)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            imageSrc: '',
            isShowImg: false,
            ratio: '',
            cutRatio: '',
            canvasWidth: windowWRPX,
            // 初始化的宽高
            cropperInitW: windowWRPX,
            cropperInitH: windowWRPX,
            // 动态的宽高
            cropperW: windowWRPX,
            cropperH: windowWRPX,
            // 动态的left top值
            cropperL: 0,
            cropperT: 0,

            // 图片缩放值
            scaleP: 0,
            imageW: 0,
            imageH: 0,

            // 裁剪框 宽高
            cutW: 0,
            cutH: 0,
            cutL: 0,
            cutT: 0,
            qualityWidth: 720,
            innerAspectRadio: 1
        }, _this.events = {
            'crop-loadImage': function cropLoadImage(imageSrc) {
                var ratio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
                var first = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

                var that = this;
                var qualityWidth = that.qualityWidth;
                var innerAspectRadio = that.innerAspectRadio;

                var cutRatio = null;
                that.imageSrc = imageSrc;
                that.ratio = ratio; // 通过ratio控制是否可以自由拉伸

                if (first === true) {
                    // 保存原始数据
                    originSrc = imageSrc;
                }

                wx.showLoading({
                    title: '图片加载中...'
                });

                wx.getImageInfo({
                    src: imageSrc,
                    success: function success(res) {
                        innerAspectRadio = res.width / res.height;

                        // 用于canvas2
                        var canvasWidth = Math.max(qualityWidth, qualityWidth / innerAspectRadio);
                        that.canvasWidth = canvasWidth;

                        // 处理裁剪比例
                        if (typeof ratio === 'string' && ratio) {
                            var _ratio$split = ratio.split(','),
                                _ratio$split2 = _slicedToArray(_ratio$split, 2),
                                width = _ratio$split2[0],
                                height = _ratio$split2[1];

                            cutRatio = +width / +height;
                        } else {
                            cutRatio = innerAspectRadio;
                        }
                        that.cutRatio = cutRatio;

                        // 根据图片的宽高显示不同的效果   保证图片可以正常显示
                        if (innerAspectRadio >= 1) {
                            that.cropperW = windowWRPX;
                            that.cropperH = windowWRPX / innerAspectRadio;
                            that.cropperL = Math.ceil((windowWRPX - windowWRPX) / 2);
                            that.cropperT = Math.ceil((windowWRPX - windowWRPX / innerAspectRadio) / 2);
                            // 裁剪框宽高
                            // 宽>高，高度填满，宽度根据高度，按照裁剪比例来
                            // 还需要排除过长过宽的情况
                            var tempCutW = windowWRPX * cutCoefficient;
                            var tempCutH = windowWRPX * cutCoefficient / cutRatio;

                            // if (tempCutW > windowWRPX) {
                            //
                            // }

                            that.cutW = tempCutW;
                            that.cutH = tempCutH;
                            // (图片宽度 - 裁剪框宽度) / 2
                            that.cutL = Math.ceil((windowWRPX - windowWRPX * cutCoefficient) / 2);
                            that.cutT = (windowWRPX / innerAspectRadio - windowWRPX * cutCoefficient / cutRatio) / 2;
                            that.scaleP = res.width * pixelRatio / windowWRPX;
                            that.imageW = res.width * pixelRatio;
                            that.imageH = res.height * pixelRatio;
                            that.innerAspectRadio = innerAspectRadio;
                            that.cropperInitH = 1206;
                            // 用于canvas2
                            drawT = (canvasWidth - qualityWidth / innerAspectRadio) / 2;
                        } else {
                            that.cropperW = windowWRPX * innerAspectRadio;
                            that.cropperH = windowWRPX;
                            that.cropperL = Math.ceil((windowWRPX - windowWRPX * innerAspectRadio) / 2);
                            that.cropperT = Math.ceil((windowWRPX / innerAspectRadio - windowWRPX) / 2);
                            // 裁剪框宽高
                            // 宽<高，宽度填满，高度根据高度，按照裁剪比例来
                            that.cutW = windowWRPX * cutCoefficient * innerAspectRadio;
                            that.cutH = windowWRPX * cutCoefficient * innerAspectRadio / cutRatio;
                            that.cutL = (windowWRPX * innerAspectRadio - windowWRPX * cutCoefficient * innerAspectRadio) / 2;
                            // (图片高度 - 裁剪框高度) / 2
                            that.cutT = (windowWRPX - windowWRPX * cutCoefficient * innerAspectRadio / cutRatio) / 2;
                            that.scaleP = res.width * pixelRatio / windowWRPX;
                            that.imageW = res.width * pixelRatio;
                            that.imageH = res.height * pixelRatio;
                            that.innerAspectRadio = innerAspectRadio;
                            that.cropperInitH = that.cropperInitW / innerAspectRadio;
                            // 用于canvas2
                            drawL = (canvasWidth - qualityWidth) / 2;
                        }
                        that.isShowImg = true;

                        ctx.drawImage(imageSrc, 0, 0, qualityWidth, qualityWidth / innerAspectRadio);
                        ctx.draw();
                        that.innerAspectRadio = innerAspectRadio;

                        that.$apply();
                        wx.hideLoading();
                    }
                });
            }
        }, _this.methods = {
            cancel: function cancel() {
                this.closeCrop();
            },
            restore: function restore() {
                this.$emit('crop-loadImage', originSrc, this.ratio, false);
            },


            // 拖动时候触发的touchStart事件
            contentStartMove: function contentStartMove(e) {
                var _e$touches = _slicedToArray(e.touches, 1);

                var _e$touches$ = _e$touches[0];
                pageX = _e$touches$.pageX;
                pageY = _e$touches$.pageY;
            },


            // 拖动时候触发的touchMove事件
            contentMoveing: function contentMoveing(e) {
                var dragLengthX = (pageX - e.touches[0].pageX) * dragScaleP;
                var dragLengthY = (pageY - e.touches[0].pageY) * dragScaleP;
                var minX = Math.max(this.cutL - dragLengthX, 0);
                var minY = Math.max(this.cutT - dragLengthY, 0);
                var maxX = this.cropperW - this.cutW;
                var maxY = this.cropperH - this.cutH;
                this.cutL = Math.min(maxX, minX);
                this.cutT = Math.min(maxY, minY);
                this.$apply();
                // console.log(`${maxX} ----- ${minX}`);

                var _e$touches2 = _slicedToArray(e.touches, 1);

                var _e$touches2$ = _e$touches2[0];
                pageX = _e$touches2$.pageX;
                pageY = _e$touches2$.pageY;
            },


            // 设置大小的时候触发的touchStart事件
            dragStart: function dragStart(e) {
                sizeConfPageX = e.touches[0].pageX;
                sizeConfPageY = e.touches[0].pageY;
                initDragCutW = this.cutW;
                initDragCutL = this.cutL;
                initDragCutT = this.cutT;
                initDragCutH = this.cutH;
            },


            // 设置大小的时候触发的touchMove事件
            dragMove: function dragMove(e) {
                var that = this;
                var dragType = e.target.dataset.drag;
                var cutRatio = that.cutRatio,
                    ratio = that.ratio;


                if (~['right', 'left', 'top', 'bottom'].indexOf(dragType)) {
                    return;
                }

                var dragLength = void 0;
                switch (dragType) {
                    case 'right':
                        dragLength = (sizeConfPageX - e.touches[0].pageX) * dragScaleP;
                        if (initDragCutW >= dragLength) {
                            // 如果 移动小于0 说明是在往下啦  放大裁剪的高度  这样一来 图片的高度  最大 等于 图片的top值加 当前图片的高度  否则就说明超出界限
                            if (dragLength < 0 && that.cropperW > initDragCutL + that.cutW) {
                                this.cutW = initDragCutW - dragLength;
                            }
                            // 如果是移动 大于0  说明在缩小  只需要缩小的距离小于原本裁剪的高度就ok
                            if (dragLength > 0) {
                                this.cutW = initDragCutW - dragLength;
                            } else {
                                return;
                            }

                            this.$apply();
                        }
                        break;
                    case 'left':
                        dragLength = (dragLength = sizeConfPageX - e.touches[0].pageX) * dragScaleP;
                        // console.log(dragLength);
                        if (initDragCutW >= dragLength && initDragCutL > dragLength) {
                            if (dragLength < 0 && Math.abs(dragLength) >= initDragCutW) {
                                return;
                            }
                            this.cutL = initDragCutL - dragLength;
                            this.cutW = initDragCutW + dragLength;
                            this.$apply();
                        }
                        break;
                    case 'top':
                        dragLength = (sizeConfPageY - e.touches[0].pageY) * dragScaleP;
                        if (initDragCutH >= dragLength && initDragCutT > dragLength) {
                            if (dragLength < 0 && Math.abs(dragLength) >= initDragCutH) {
                                return;
                            }
                            this.cutT = initDragCutT - dragLength;
                            this.cutH = initDragCutH + dragLength;
                            this.$apply();
                        }
                        break;
                    case 'bottom':
                        dragLength = (sizeConfPageY - e.touches[0].pageY) * dragScaleP;
                        // 必须是 dragLength 向上缩小的时候必须小于原本的高度
                        if (initDragCutH >= dragLength) {
                            // 如果 移动小于0 说明是在往下啦  放大裁剪的高度  这样一来 图片的高度  最大 等于 图片的top值加 当前图片的高度  否则就说明超出界限
                            if (dragLength < 0 && that.cropperH > initDragCutT + that.cutH) {
                                this.cutH = initDragCutH - dragLength;
                            }
                            // 如果是移动 大于0  说明在缩小  只需要缩小的距离小于原本裁剪的高度就ok
                            if (dragLength > 0) {
                                this.cutH = initDragCutH - dragLength;
                            } else {
                                return;
                            }

                            this.$apply();
                        }
                        break;
                    case 'rightBottom':
                        {
                            var dragLengthX = (sizeConfPageX - e.touches[0].pageX) * dragScaleP;
                            var dragLengthY = (sizeConfPageY - e.touches[0].pageY) * dragScaleP;
                            if (initDragCutH >= dragLengthY && initDragCutW >= dragLengthX) {
                                // bottom 方向的变化
                                if (dragLengthY < 0 && that.cropperH > initDragCutT + that.cutH || dragLengthY > 0) {
                                    this.cutH = initDragCutH - dragLengthY;

                                    if (ratio) {
                                        this.cutW = (initDragCutH - dragLengthY) * cutRatio;
                                    }
                                }

                                // right 方向的变化
                                if (dragLengthX < 0 && that.cropperW > initDragCutL + that.cutW || dragLengthX > 0) {
                                    this.cutW = initDragCutW - dragLengthX;

                                    if (ratio) {
                                        this.cutH = (initDragCutW - dragLengthX) / cutRatio;
                                    }
                                } else {
                                    return;
                                }

                                this.$apply();
                            }
                            break;
                        }
                    default:
                        break;
                }
            },


            // 通过canvas2专门处理图片旋转
            rotateImage: function rotateImage() {
                var that = this;
                var qualityWidth = that.qualityWidth,
                    innerAspectRadio = that.innerAspectRadio;

                var x = qualityWidth / 2;
                var y = qualityWidth / innerAspectRadio / 2;
                var ctx2 = wx.createCanvasContext('myCanvas2');
                wx.showLoading({
                    title: '图片加载中...'
                });

                ctx2.save();
                // 旋转坐标系，仅适用于每次旋转90度
                ctx2.translate(x, y);
                // 以坐标系原点为圆心旋转
                ctx2.rotate(90 * Math.PI / 180);
                ctx2.translate(-x, -y);

                // 交换drawT drawL
                var temp = drawT;
                drawT = drawL;
                drawL = temp;

                ctx2.drawImage(that.imageSrc, drawL, -drawT, qualityWidth, qualityWidth / innerAspectRadio);
                ctx2.draw(false, function () {
                    wx.canvasToTempFilePath({
                        x: drawL,
                        y: drawT,
                        width: qualityWidth / innerAspectRadio,
                        height: qualityWidth,
                        quality: 1,
                        canvasId: 'myCanvas2',
                        success: function success(res) {
                            that.qualityWidth = qualityWidth / innerAspectRadio;
                            that.$apply();
                            that.$emit('crop-loadImage', res.tempFilePath, that.ratio, false);
                        }
                    });
                });
            },


            // 获取图片
            getImageInfo: function getImageInfo() {
                var that = this;
                var qualityWidth = that.qualityWidth,
                    innerAspectRadio = that.innerAspectRadio;


                wx.showLoading({
                    title: '图片生成中...'
                });
                ctx.draw(true, function () {
                    // 获取画布要裁剪的位置和宽度   均为百分比 * 画布中图片的宽度    保证了在微信小程序中裁剪的图片模糊
                    // 位置不对的问题 canvasT = (that.cutT / that.cropperH) * (that.imageH / pixelRatio)
                    var canvasW = that.cutW / that.cropperW * qualityWidth;
                    var canvasH = that.cutH / that.cropperH * qualityWidth / innerAspectRadio;
                    var canvasL = that.cutL / that.cropperW * qualityWidth;
                    var canvasT = that.cutT / that.cropperH * qualityWidth / innerAspectRadio;
                    // console.log(`canvasW:${canvasW} --- canvasH: ${canvasH} --- canvasL:
                    // ${canvasL} --- canvasT: ${canvasT} -------- that.imageW: ${
                    //     that.imageW
                    // }  ------- that.imageH: ${
                    //     that.imageH
                    // } ---- pixelRatio ${pixelRatio}`);
                    wx.canvasToTempFilePath({
                        x: canvasL,
                        y: canvasT,
                        width: canvasW,
                        height: canvasH,
                        destWidth: canvasW,
                        destHeight: canvasH,
                        quality: 0.5,
                        canvasId: 'myCanvas',
                        success: function success(res) {
                            wx.hideLoading();
                            // 成功获得地址的地方
                            that.$emit('after-crop', res.tempFilePath);
                            that.closeCrop();
                            wx.previewImage({
                                current: '', // 当前显示图片的http链接
                                urls: [res.tempFilePath] // 需要预览的图片http链接列表
                            });
                        }
                    });
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Cropper, [{
        key: 'onLoad',
        value: function onLoad() {
            ctx = wx.createCanvasContext('myCanvas');
        }
    }, {
        key: 'closeCrop',
        value: function closeCrop() {
            this.imageSrc = '';
            this.isShowImg = false;
            this.$apply();
        }
    }]);

    return Cropper;
}(_wepy2.default.component);

exports.default = Cropper;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNyb3BwZXIuanMiXSwibmFtZXMiOlsid2luZG93V1JQWCIsInBhZ2VYIiwicGFnZVkiLCJ3eCIsImdldFN5c3RlbUluZm9TeW5jIiwicGl4ZWxSYXRpbyIsInNpemVDb25mUGFnZVgiLCJzaXplQ29uZlBhZ2VZIiwiaW5pdERyYWdDdXRXIiwiaW5pdERyYWdDdXRMIiwiaW5pdERyYWdDdXRIIiwiaW5pdERyYWdDdXRUIiwiZHJhZ1NjYWxlUCIsImN0eCIsImN1dENvZWZmaWNpZW50Iiwib3JpZ2luU3JjIiwiZHJhd0wiLCJkcmF3VCIsIkNyb3BwZXIiLCJkYXRhIiwiaW1hZ2VTcmMiLCJpc1Nob3dJbWciLCJyYXRpbyIsImN1dFJhdGlvIiwiY2FudmFzV2lkdGgiLCJjcm9wcGVySW5pdFciLCJjcm9wcGVySW5pdEgiLCJjcm9wcGVyVyIsImNyb3BwZXJIIiwiY3JvcHBlckwiLCJjcm9wcGVyVCIsInNjYWxlUCIsImltYWdlVyIsImltYWdlSCIsImN1dFciLCJjdXRIIiwiY3V0TCIsImN1dFQiLCJxdWFsaXR5V2lkdGgiLCJpbm5lckFzcGVjdFJhZGlvIiwiZXZlbnRzIiwiZmlyc3QiLCJ0aGF0Iiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsImdldEltYWdlSW5mbyIsInNyYyIsInN1Y2Nlc3MiLCJyZXMiLCJ3aWR0aCIsImhlaWdodCIsIk1hdGgiLCJtYXgiLCJzcGxpdCIsImNlaWwiLCJ0ZW1wQ3V0VyIsInRlbXBDdXRIIiwiZHJhd0ltYWdlIiwiZHJhdyIsIiRhcHBseSIsImhpZGVMb2FkaW5nIiwibWV0aG9kcyIsImNhbmNlbCIsImNsb3NlQ3JvcCIsInJlc3RvcmUiLCIkZW1pdCIsImNvbnRlbnRTdGFydE1vdmUiLCJlIiwidG91Y2hlcyIsImNvbnRlbnRNb3ZlaW5nIiwiZHJhZ0xlbmd0aFgiLCJkcmFnTGVuZ3RoWSIsIm1pblgiLCJtaW5ZIiwibWF4WCIsIm1heFkiLCJtaW4iLCJkcmFnU3RhcnQiLCJkcmFnTW92ZSIsImRyYWdUeXBlIiwidGFyZ2V0IiwiZGF0YXNldCIsImRyYWciLCJpbmRleE9mIiwiZHJhZ0xlbmd0aCIsImFicyIsInJvdGF0ZUltYWdlIiwieCIsInkiLCJjdHgyIiwiY3JlYXRlQ2FudmFzQ29udGV4dCIsInNhdmUiLCJ0cmFuc2xhdGUiLCJyb3RhdGUiLCJQSSIsInRlbXAiLCJjYW52YXNUb1RlbXBGaWxlUGF0aCIsInF1YWxpdHkiLCJjYW52YXNJZCIsInRlbXBGaWxlUGF0aCIsImNhbnZhc1ciLCJjYW52YXNIIiwiY2FudmFzTCIsImNhbnZhc1QiLCJkZXN0V2lkdGgiLCJkZXN0SGVpZ2h0IiwicHJldmlld0ltYWdlIiwiY3VycmVudCIsInVybHMiLCJ3ZXB5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBZUE7Ozs7Ozs7Ozs7O0FBZEE7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBO0FBQ0E7QUFDQSxJQUFNQSxhQUFhLEdBQW5CO0FBQ0E7QUFDQSxJQUFJQyxRQUFRLENBQVo7QUFDQTtBQUNBLElBQUlDLFFBQVEsQ0FBWjs7NEJBRXVCQyxHQUFHQyxpQkFBSCxFO0lBQWZDLFUseUJBQUFBLFU7O0FBRVI7OztBQUNBLElBQUlDLGdCQUFnQixDQUFwQjtBQUNBO0FBQ0EsSUFBSUMsZ0JBQWdCLENBQXBCOztBQUVBLElBQUlDLGVBQWUsQ0FBbkI7QUFDQSxJQUFJQyxlQUFlLENBQW5CO0FBQ0EsSUFBSUMsZUFBZSxDQUFuQjtBQUNBLElBQUlDLGVBQWUsQ0FBbkI7QUFDQTtBQUNBLElBQU1DLGFBQWEsQ0FBbkI7QUFDQSxJQUFJQyxNQUFNLElBQVY7QUFDQSxJQUFNQyxpQkFBaUIsR0FBdkIsQyxDQUE0QjtBQUM1QixJQUFJQyxZQUFZLEVBQWhCO0FBQ0EsSUFBSUMsUUFBUSxDQUFaO0FBQ0EsSUFBSUMsUUFBUSxDQUFaOztJQUVxQkMsTzs7Ozs7Ozs7Ozs7Ozs7NExBQ2pCQyxJLEdBQU87QUFDSEMsc0JBQVUsRUFEUDtBQUVIQyx1QkFBVyxLQUZSO0FBR0hDLG1CQUFPLEVBSEo7QUFJSEMsc0JBQVUsRUFKUDtBQUtI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QUFDYkMsc0NBQU0sQ0FBQzVELElBQUltRCxZQUFMLENBRk0sQ0FFYztBQUZkLDZCQUFoQjtBQUlIO0FBbEJtQixxQkFBeEI7QUFvQkgsaUJBakNEO0FBa0NIO0FBbFFLLFM7Ozs7O2lDQW5IRDtBQUNMdEYsa0JBQU1WLEdBQUd1RixtQkFBSCxDQUF1QixVQUF2QixDQUFOO0FBQ0g7OztvQ0FzWFc7QUFDUixpQkFBS3RFLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxpQkFBS0MsU0FBTCxHQUFpQixLQUFqQjtBQUNBLGlCQUFLc0MsTUFBTDtBQUNIOzs7O0VBM1pnQ2tELGVBQUtDLFM7O2tCQUFyQjVGLE8iLCJmaWxlIjoiQ3JvcHBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4vKipcclxuICog5L2/55So5pa55rOV77yaXHJcbiAqIOWwhjxjcm9wcGVyPue7hOS7tuaPkuWFpeWIsOeItue7hOS7tu+8jOWcqOeItue7hOS7tuS4rSRicm9hZGNhc3Tkuovku7bigJljcm9wLWxvYWRJbWFnZeKAmVxyXG4gKiDlubblnKjniLbnu4Tku7bkuK3mt7vliqDkuovku7YnYWZ0ZXItY3JvcCfvvIzmjqXmlLboo4HliarlkI7nmoTlm77niYfkuLTml7blnLDlnYBcclxuICpcclxuICogJ2Nyb3AtbG9hZEltYWdlJ+WPguaVsO+8mlxyXG4gKiBpbWFnZVNyYyB7U3RyaW5nfSDlm77niYfpk77mjqXvvIzlv4XpobvkuLrkuLTml7blnLDlnYDvvIzmiJbogIXlt7LkuIvovb3nmoTlm77niYdcclxuICogcmF0aW8ge1N0cmluZ30g6KOB5Ymq5q+U5L6L77yM5rKh5pyJ5YiZ6Ieq55Sx6KOB5YmqXHJcbiAqIGZpcnN0IHtCb29sZWFufSDmmK/lkKbkuLrnrKzkuIDmrKHliqDovb3lm77niYdcclxuICpcclxuICogJ2FmdGVyLWNyb3An5Y+C5pWw77yaXHJcbiAqIHRlbXBGaWxlUGF0aCB7U3RyaW5nfSDoo4HliarlkI7nmoTlm77niYfkuLTml7blnLDlnYBcclxuICovXHJcblxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuXHJcbi8vIHBhZ2VzL3d4LWNyb3BwZXIvaW5kZXguanNcclxuLy8g5omL5py655qE5a695bqmXHJcbmNvbnN0IHdpbmRvd1dSUFggPSA3NTA7XHJcbi8vIOaLluWKqOaXtuWAmeeahCBwYWdlWFxyXG5sZXQgcGFnZVggPSAwO1xyXG4vLyDmi5bliqjml7blgJnnmoQgcGFnZVlcclxubGV0IHBhZ2VZID0gMDtcclxuXHJcbmNvbnN0IHsgcGl4ZWxSYXRpbyB9ID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKTtcclxuXHJcbi8vIOiwg+aVtOWkp+Wwj+aXtuWAmeeahCBwYWdlWFxyXG5sZXQgc2l6ZUNvbmZQYWdlWCA9IDA7XHJcbi8vIOiwg+aVtOWkp+Wwj+aXtuWAmeeahCBwYWdlWVxyXG5sZXQgc2l6ZUNvbmZQYWdlWSA9IDA7XHJcblxyXG5sZXQgaW5pdERyYWdDdXRXID0gMDtcclxubGV0IGluaXREcmFnQ3V0TCA9IDA7XHJcbmxldCBpbml0RHJhZ0N1dEggPSAwO1xyXG5sZXQgaW5pdERyYWdDdXRUID0gMDtcclxuLy8g56e75Yqo5pe2IOaJi+WKv+S9jeenu+S4jiDlrp7pmYXlhYPntKDkvY3np7vnmoTmr5RcclxuY29uc3QgZHJhZ1NjYWxlUCA9IDI7XHJcbmxldCBjdHggPSBudWxsO1xyXG5jb25zdCBjdXRDb2VmZmljaWVudCA9IDAuODsgLy8g6KOB5Ymq57O75pWwXHJcbmxldCBvcmlnaW5TcmMgPSAnJztcclxubGV0IGRyYXdMID0gMDtcclxubGV0IGRyYXdUID0gMDtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyb3BwZXIgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGltYWdlU3JjOiAnJyxcclxuICAgICAgICBpc1Nob3dJbWc6IGZhbHNlLFxyXG4gICAgICAgIHJhdGlvOiAnJyxcclxuICAgICAgICBjdXRSYXRpbzogJycsXHJcbiAgICAgICAgY2FudmFzV2lkdGg6IHdpbmRvd1dSUFgsXHJcbiAgICAgICAgLy8g5Yid5aeL5YyW55qE5a696auYXHJcbiAgICAgICAgY3JvcHBlckluaXRXOiB3aW5kb3dXUlBYLFxyXG4gICAgICAgIGNyb3BwZXJJbml0SDogd2luZG93V1JQWCxcclxuICAgICAgICAvLyDliqjmgIHnmoTlrr3pq5hcclxuICAgICAgICBjcm9wcGVyVzogd2luZG93V1JQWCxcclxuICAgICAgICBjcm9wcGVySDogd2luZG93V1JQWCxcclxuICAgICAgICAvLyDliqjmgIHnmoRsZWZ0IHRvcOWAvFxyXG4gICAgICAgIGNyb3BwZXJMOiAwLFxyXG4gICAgICAgIGNyb3BwZXJUOiAwLFxyXG5cclxuICAgICAgICAvLyDlm77niYfnvKnmlL7lgLxcclxuICAgICAgICBzY2FsZVA6IDAsXHJcbiAgICAgICAgaW1hZ2VXOiAwLFxyXG4gICAgICAgIGltYWdlSDogMCxcclxuXHJcbiAgICAgICAgLy8g6KOB5Ymq5qGGIOWuvemrmFxyXG4gICAgICAgIGN1dFc6IDAsXHJcbiAgICAgICAgY3V0SDogMCxcclxuICAgICAgICBjdXRMOiAwLFxyXG4gICAgICAgIGN1dFQ6IDAsXHJcbiAgICAgICAgcXVhbGl0eVdpZHRoOiA3MjAsXHJcbiAgICAgICAgaW5uZXJBc3BlY3RSYWRpbzogMSxcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgY3R4ID0gd3guY3JlYXRlQ2FudmFzQ29udGV4dCgnbXlDYW52YXMnKTtcclxuICAgIH1cclxuXHJcbiAgICBldmVudHMgPSB7XHJcbiAgICAgICAgJ2Nyb3AtbG9hZEltYWdlJyhpbWFnZVNyYywgcmF0aW8gPSAnJywgZmlyc3QgPSBmYWxzZSkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc3QgeyBxdWFsaXR5V2lkdGggfSA9IHRoYXQ7XHJcbiAgICAgICAgICAgIGxldCB7IGlubmVyQXNwZWN0UmFkaW8gfSA9IHRoYXQ7XHJcbiAgICAgICAgICAgIGxldCBjdXRSYXRpbyA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoYXQuaW1hZ2VTcmMgPSBpbWFnZVNyYztcclxuICAgICAgICAgICAgdGhhdC5yYXRpbyA9IHJhdGlvOyAvLyDpgJrov4dyYXRpb+aOp+WItuaYr+WQpuWPr+S7peiHqueUseaLieS8uFxyXG5cclxuICAgICAgICAgICAgaWYgKGZpcnN0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDkv53lrZjljp/lp4vmlbDmja5cclxuICAgICAgICAgICAgICAgIG9yaWdpblNyYyA9IGltYWdlU3JjO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+WbvueJh+WKoOi9veS4rS4uLicsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgd3guZ2V0SW1hZ2VJbmZvKHtcclxuICAgICAgICAgICAgICAgIHNyYzogaW1hZ2VTcmMsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlubmVyQXNwZWN0UmFkaW8gPSByZXMud2lkdGggLyByZXMuaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyDnlKjkuo5jYW52YXMyXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FudmFzV2lkdGggPSBNYXRoLm1heChxdWFsaXR5V2lkdGgsIHF1YWxpdHlXaWR0aCAvIGlubmVyQXNwZWN0UmFkaW8pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuY2FudmFzV2lkdGggPSBjYW52YXNXaWR0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5aSE55CG6KOB5Ymq5q+U5L6LXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByYXRpbyA9PT0gJ3N0cmluZycgJiYgcmF0aW8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgW3dpZHRoLCBoZWlnaHRdID0gcmF0aW8uc3BsaXQoJywnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3V0UmF0aW8gPSArd2lkdGggLyAraGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1dFJhdGlvID0gaW5uZXJBc3BlY3RSYWRpbztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5jdXRSYXRpbyA9IGN1dFJhdGlvO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5qC55o2u5Zu+54mH55qE5a696auY5pi+56S65LiN5ZCM55qE5pWI5p6cICAg5L+d6K+B5Zu+54mH5Y+v5Lul5q2j5bi45pi+56S6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlubmVyQXNwZWN0UmFkaW8gPj0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNyb3BwZXJXID0gd2luZG93V1JQWDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jcm9wcGVySCA9IHdpbmRvd1dSUFggLyBpbm5lckFzcGVjdFJhZGlvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNyb3BwZXJMID0gTWF0aC5jZWlsKCh3aW5kb3dXUlBYIC0gd2luZG93V1JQWCkgLyAyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jcm9wcGVyVCA9IE1hdGguY2VpbCgod2luZG93V1JQWCAtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICh3aW5kb3dXUlBYIC8gaW5uZXJBc3BlY3RSYWRpbykpIC8gMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOijgeWJquahhuWuvemrmFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDlrr0+6auY77yM6auY5bqm5aGr5ruh77yM5a695bqm5qC55o2u6auY5bqm77yM5oyJ54Wn6KOB5Ymq5q+U5L6L5p2lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOi/mOmcgOimgeaOkumZpOi/h+mVv+i/h+WuveeahOaDheWGtVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZW1wQ3V0VyA9IHdpbmRvd1dSUFggKiBjdXRDb2VmZmljaWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGVtcEN1dEggPSAod2luZG93V1JQWCAqIGN1dENvZWZmaWNpZW50KSAvIGN1dFJhdGlvO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHRlbXBDdXRXID4gd2luZG93V1JQWCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmN1dFcgPSB0ZW1wQ3V0VztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jdXRIID0gdGVtcEN1dEg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICjlm77niYflrr3luqYgLSDoo4HliarmoYblrr3luqYpIC8gMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmN1dEwgPSBNYXRoLmNlaWwoKCh3aW5kb3dXUlBYIC1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKHdpbmRvd1dSUFggKiBjdXRDb2VmZmljaWVudCkpIC8gMikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmN1dFQgPSAoKHdpbmRvd1dSUFggLyBpbm5lckFzcGVjdFJhZGlvKSAtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICgod2luZG93V1JQWCAqIGN1dENvZWZmaWNpZW50KSAvIGN1dFJhdGlvKSkgLyAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNjYWxlUCA9IChyZXMud2lkdGggKiBwaXhlbFJhdGlvKSAvIHdpbmRvd1dSUFg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW1hZ2VXID0gcmVzLndpZHRoICogcGl4ZWxSYXRpbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pbWFnZUggPSByZXMuaGVpZ2h0ICogcGl4ZWxSYXRpbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pbm5lckFzcGVjdFJhZGlvID0gaW5uZXJBc3BlY3RSYWRpbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jcm9wcGVySW5pdEggPSAxMjA2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDnlKjkuo5jYW52YXMyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyYXdUID0gKGNhbnZhc1dpZHRoIC0gKHF1YWxpdHlXaWR0aCAvIGlubmVyQXNwZWN0UmFkaW8pKSAvIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jcm9wcGVyVyA9IHdpbmRvd1dSUFggKiBpbm5lckFzcGVjdFJhZGlvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNyb3BwZXJIID0gd2luZG93V1JQWDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jcm9wcGVyTCA9IE1hdGguY2VpbCgod2luZG93V1JQWCAtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICh3aW5kb3dXUlBYICogaW5uZXJBc3BlY3RSYWRpbykpIC8gMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY3JvcHBlclQgPSBNYXRoLmNlaWwoKCh3aW5kb3dXUlBYIC8gaW5uZXJBc3BlY3RSYWRpbykgLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dXUlBYKSAvIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDoo4HliarmoYblrr3pq5hcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5a69POmrmO+8jOWuveW6puWhq+a7oe+8jOmrmOW6puagueaNrumrmOW6pu+8jOaMieeFp+ijgeWJquavlOS+i+adpVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmN1dFcgPSAod2luZG93V1JQWCAqIGN1dENvZWZmaWNpZW50KSAqIGlubmVyQXNwZWN0UmFkaW87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY3V0SCA9ICgod2luZG93V1JQWCAqIGN1dENvZWZmaWNpZW50KSAqIGlubmVyQXNwZWN0UmFkaW8pIC8gY3V0UmF0aW87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY3V0TCA9ICgod2luZG93V1JQWCAqIGlubmVyQXNwZWN0UmFkaW8pIC1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKCh3aW5kb3dXUlBYICogY3V0Q29lZmZpY2llbnQpICogaW5uZXJBc3BlY3RSYWRpbykpIC8gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gKOWbvueJh+mrmOW6piAtIOijgeWJquahhumrmOW6pikgLyAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY3V0VCA9ICh3aW5kb3dXUlBYIC1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKCgod2luZG93V1JQWCAqIGN1dENvZWZmaWNpZW50KSAqIGlubmVyQXNwZWN0UmFkaW8pIC8gY3V0UmF0aW8pKSAvIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2NhbGVQID0gKHJlcy53aWR0aCAqIHBpeGVsUmF0aW8pIC8gd2luZG93V1JQWDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pbWFnZVcgPSByZXMud2lkdGggKiBwaXhlbFJhdGlvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmltYWdlSCA9IHJlcy5oZWlnaHQgKiBwaXhlbFJhdGlvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlubmVyQXNwZWN0UmFkaW8gPSBpbm5lckFzcGVjdFJhZGlvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNyb3BwZXJJbml0SCA9IHRoYXQuY3JvcHBlckluaXRXIC8gaW5uZXJBc3BlY3RSYWRpbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g55So5LqOY2FudmFzMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcmF3TCA9IChjYW52YXNXaWR0aCAtIHF1YWxpdHlXaWR0aCkgLyAyO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmlzU2hvd0ltZyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlU3JjLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWFsaXR5V2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1YWxpdHlXaWR0aCAvIGlubmVyQXNwZWN0UmFkaW8sXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICBjdHguZHJhdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaW5uZXJBc3BlY3RSYWRpbyA9IGlubmVyQXNwZWN0UmFkaW87XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuXHJcbiAgICAgICAgY2FuY2VsKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlQ3JvcCgpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlc3RvcmUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2Nyb3AtbG9hZEltYWdlJywgb3JpZ2luU3JjLCB0aGlzLnJhdGlvLCBmYWxzZSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8g5ouW5Yqo5pe25YCZ6Kem5Y+R55qEdG91Y2hTdGFydOS6i+S7tlxyXG4gICAgICAgIGNvbnRlbnRTdGFydE1vdmUoZSkge1xyXG4gICAgICAgICAgICBbeyBwYWdlWCwgcGFnZVkgfV0gPSBlLnRvdWNoZXM7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8g5ouW5Yqo5pe25YCZ6Kem5Y+R55qEdG91Y2hNb3Zl5LqL5Lu2XHJcbiAgICAgICAgY29udGVudE1vdmVpbmcoZSkge1xyXG4gICAgICAgICAgICBjb25zdCBkcmFnTGVuZ3RoWCA9IChwYWdlWCAtIGUudG91Y2hlc1swXS5wYWdlWCkgKiBkcmFnU2NhbGVQO1xyXG4gICAgICAgICAgICBjb25zdCBkcmFnTGVuZ3RoWSA9IChwYWdlWSAtIGUudG91Y2hlc1swXS5wYWdlWSkgKiBkcmFnU2NhbGVQO1xyXG4gICAgICAgICAgICBjb25zdCBtaW5YID0gTWF0aC5tYXgodGhpcy5jdXRMIC0gZHJhZ0xlbmd0aFgsIDApO1xyXG4gICAgICAgICAgICBjb25zdCBtaW5ZID0gTWF0aC5tYXgodGhpcy5jdXRUIC0gZHJhZ0xlbmd0aFksIDApO1xyXG4gICAgICAgICAgICBjb25zdCBtYXhYID0gdGhpcy5jcm9wcGVyVyAtIHRoaXMuY3V0VztcclxuICAgICAgICAgICAgY29uc3QgbWF4WSA9IHRoaXMuY3JvcHBlckggLSB0aGlzLmN1dEg7XHJcbiAgICAgICAgICAgIHRoaXMuY3V0TCA9IE1hdGgubWluKG1heFgsIG1pblgpO1xyXG4gICAgICAgICAgICB0aGlzLmN1dFQgPSBNYXRoLm1pbihtYXhZLCBtaW5ZKTtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYCR7bWF4WH0gLS0tLS0gJHttaW5YfWApO1xyXG4gICAgICAgICAgICBbeyBwYWdlWCwgcGFnZVkgfV0gPSBlLnRvdWNoZXM7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8g6K6+572u5aSn5bCP55qE5pe25YCZ6Kem5Y+R55qEdG91Y2hTdGFydOS6i+S7tlxyXG4gICAgICAgIGRyYWdTdGFydChlKSB7XHJcbiAgICAgICAgICAgIHNpemVDb25mUGFnZVggPSBlLnRvdWNoZXNbMF0ucGFnZVg7XHJcbiAgICAgICAgICAgIHNpemVDb25mUGFnZVkgPSBlLnRvdWNoZXNbMF0ucGFnZVk7XHJcbiAgICAgICAgICAgIGluaXREcmFnQ3V0VyA9IHRoaXMuY3V0VztcclxuICAgICAgICAgICAgaW5pdERyYWdDdXRMID0gdGhpcy5jdXRMO1xyXG4gICAgICAgICAgICBpbml0RHJhZ0N1dFQgPSB0aGlzLmN1dFQ7XHJcbiAgICAgICAgICAgIGluaXREcmFnQ3V0SCA9IHRoaXMuY3V0SDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyDorr7nva7lpKflsI/nmoTml7blgJnop6blj5HnmoR0b3VjaE1vdmXkuovku7ZcclxuICAgICAgICBkcmFnTW92ZShlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCBkcmFnVHlwZSA9IGUudGFyZ2V0LmRhdGFzZXQuZHJhZztcclxuICAgICAgICAgICAgY29uc3QgeyBjdXRSYXRpbywgcmF0aW8gfSA9IHRoYXQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoflsncmlnaHQnLCAnbGVmdCcsICd0b3AnLCAnYm90dG9tJ10uaW5kZXhPZihkcmFnVHlwZSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGRyYWdMZW5ndGg7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZHJhZ1R5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcclxuICAgICAgICAgICAgICAgICAgICBkcmFnTGVuZ3RoID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKHNpemVDb25mUGFnZVggLSBlLnRvdWNoZXNbMF0ucGFnZVgpICogZHJhZ1NjYWxlUDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5pdERyYWdDdXRXID49IGRyYWdMZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5aaC5p6cIOenu+WKqOWwj+S6jjAg6K+05piO5piv5Zyo5b6A5LiL5ZWmICDmlL7lpKfoo4HliarnmoTpq5jluqYgIOi/meagt+S4gOadpSDlm77niYfnmoTpq5jluqYgIOacgOWkpyDnrYnkuo4g5Zu+54mH55qEdG9w5YC85YqgIOW9k+WJjeWbvueJh+eahOmrmOW6piAg5ZCm5YiZ5bCx6K+05piO6LaF5Ye655WM6ZmQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyYWdMZW5ndGggPCAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNyb3BwZXJXID4gaW5pdERyYWdDdXRMICsgdGhhdC5jdXRXXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXRXID0gaW5pdERyYWdDdXRXIC0gZHJhZ0xlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDlpoLmnpzmmK/np7vliqgg5aSn5LqOMCAg6K+05piO5Zyo57yp5bCPICDlj6rpnIDopoHnvKnlsI/nmoTot53nprvlsI/kuo7ljp/mnKzoo4HliarnmoTpq5jluqblsLFva1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHJhZ0xlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3V0VyA9IGluaXREcmFnQ3V0VyAtIGRyYWdMZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnbGVmdCc6XHJcbiAgICAgICAgICAgICAgICAgICAgZHJhZ0xlbmd0aCA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChkcmFnTGVuZ3RoID0gc2l6ZUNvbmZQYWdlWCAtIGUudG91Y2hlc1swXS5wYWdlWCkgKlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcmFnU2NhbGVQO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRyYWdMZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbml0RHJhZ0N1dFcgPj0gZHJhZ0xlbmd0aCAmJiBpbml0RHJhZ0N1dEwgPiBkcmFnTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkcmFnTGVuZ3RoIDwgMCAmJiBNYXRoLmFicyhkcmFnTGVuZ3RoKSA+PSBpbml0RHJhZ0N1dFcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1dEwgPSBpbml0RHJhZ0N1dEwgLSBkcmFnTGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1dFcgPSBpbml0RHJhZ0N1dFcgKyBkcmFnTGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3RvcCc6XHJcbiAgICAgICAgICAgICAgICAgICAgZHJhZ0xlbmd0aCA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChzaXplQ29uZlBhZ2VZIC0gZS50b3VjaGVzWzBdLnBhZ2VZKSAqIGRyYWdTY2FsZVA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluaXREcmFnQ3V0SCA+PSBkcmFnTGVuZ3RoICYmIGluaXREcmFnQ3V0VCA+IGRyYWdMZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRyYWdMZW5ndGggPCAwICYmIE1hdGguYWJzKGRyYWdMZW5ndGgpID49IGluaXREcmFnQ3V0SCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3V0VCA9IGluaXREcmFnQ3V0VCAtIGRyYWdMZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3V0SCA9IGluaXREcmFnQ3V0SCArIGRyYWdMZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnYm90dG9tJzpcclxuICAgICAgICAgICAgICAgICAgICBkcmFnTGVuZ3RoID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKHNpemVDb25mUGFnZVkgLSBlLnRvdWNoZXNbMF0ucGFnZVkpICogZHJhZ1NjYWxlUDtcclxuICAgICAgICAgICAgICAgICAgICAvLyDlv4XpobvmmK8gZHJhZ0xlbmd0aCDlkJHkuIrnvKnlsI/nmoTml7blgJnlv4XpobvlsI/kuo7ljp/mnKznmoTpq5jluqZcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5pdERyYWdDdXRIID49IGRyYWdMZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5aaC5p6cIOenu+WKqOWwj+S6jjAg6K+05piO5piv5Zyo5b6A5LiL5ZWmICDmlL7lpKfoo4HliarnmoTpq5jluqYgIOi/meagt+S4gOadpSDlm77niYfnmoTpq5jluqYgIOacgOWkpyDnrYnkuo4g5Zu+54mH55qEdG9w5YC85YqgIOW9k+WJjeWbvueJh+eahOmrmOW6piAg5ZCm5YiZ5bCx6K+05piO6LaF5Ye655WM6ZmQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyYWdMZW5ndGggPCAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNyb3BwZXJIID4gaW5pdERyYWdDdXRUICsgdGhhdC5jdXRIXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXRIID0gaW5pdERyYWdDdXRIIC0gZHJhZ0xlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDlpoLmnpzmmK/np7vliqgg5aSn5LqOMCAg6K+05piO5Zyo57yp5bCPICDlj6rpnIDopoHnvKnlsI/nmoTot53nprvlsI/kuo7ljp/mnKzoo4HliarnmoTpq5jluqblsLFva1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHJhZ0xlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3V0SCA9IGluaXREcmFnQ3V0SCAtIGRyYWdMZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAncmlnaHRCb3R0b20nOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZHJhZ0xlbmd0aFggPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoc2l6ZUNvbmZQYWdlWCAtIGUudG91Y2hlc1swXS5wYWdlWCkgKiBkcmFnU2NhbGVQO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRyYWdMZW5ndGhZID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKHNpemVDb25mUGFnZVkgLSBlLnRvdWNoZXNbMF0ucGFnZVkpICogZHJhZ1NjYWxlUDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXREcmFnQ3V0SCA+PSBkcmFnTGVuZ3RoWSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0RHJhZ0N1dFcgPj0gZHJhZ0xlbmd0aFhcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYm90dG9tIOaWueWQkeeahOWPmOWMllxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZHJhZ0xlbmd0aFkgPCAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jcm9wcGVySCA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXREcmFnQ3V0VCArIHRoYXQuY3V0SCkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyYWdMZW5ndGhZID4gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3V0SCA9IGluaXREcmFnQ3V0SCAtIGRyYWdMZW5ndGhZO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYXRpbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3V0VyA9IChpbml0RHJhZ0N1dEggLSBkcmFnTGVuZ3RoWSkgKiBjdXRSYXRpbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmlnaHQg5pa55ZCR55qE5Y+Y5YyWXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChkcmFnTGVuZ3RoWCA8IDAgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNyb3BwZXJXID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdERyYWdDdXRMICsgdGhhdC5jdXRXKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ0xlbmd0aFggPiAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXRXID0gaW5pdERyYWdDdXRXIC0gZHJhZ0xlbmd0aFg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhdGlvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXRIID0gKGluaXREcmFnQ3V0VyAtIGRyYWdMZW5ndGhYKSAvIGN1dFJhdGlvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyDpgJrov4djYW52YXMy5LiT6Zeo5aSE55CG5Zu+54mH5peL6L2sXHJcbiAgICAgICAgcm90YXRlSW1hZ2UoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCB7IHF1YWxpdHlXaWR0aCwgaW5uZXJBc3BlY3RSYWRpbyB9ID0gdGhhdDtcclxuICAgICAgICAgICAgY29uc3QgeCA9IHF1YWxpdHlXaWR0aCAvIDI7XHJcbiAgICAgICAgICAgIGNvbnN0IHkgPSAocXVhbGl0eVdpZHRoIC8gaW5uZXJBc3BlY3RSYWRpbykgLyAyO1xyXG4gICAgICAgICAgICBjb25zdCBjdHgyID0gd3guY3JlYXRlQ2FudmFzQ29udGV4dCgnbXlDYW52YXMyJyk7XHJcbiAgICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn5Zu+54mH5Yqg6L295LitLi4uJyxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjdHgyLnNhdmUoKTtcclxuICAgICAgICAgICAgLy8g5peL6L2s5Z2Q5qCH57O777yM5LuF6YCC55So5LqO5q+P5qyh5peL6L2sOTDluqZcclxuICAgICAgICAgICAgY3R4Mi50cmFuc2xhdGUoeCwgeSk7XHJcbiAgICAgICAgICAgIC8vIOS7peWdkOagh+ezu+WOn+eCueS4uuWchuW/g+aXi+i9rFxyXG4gICAgICAgICAgICBjdHgyLnJvdGF0ZSgoOTAgKiBNYXRoLlBJKSAvIDE4MCk7XHJcbiAgICAgICAgICAgIGN0eDIudHJhbnNsYXRlKC14LCAteSk7XHJcblxyXG4gICAgICAgICAgICAvLyDkuqTmjaJkcmF3VCBkcmF3TFxyXG4gICAgICAgICAgICBjb25zdCB0ZW1wID0gZHJhd1Q7XHJcbiAgICAgICAgICAgIGRyYXdUID0gZHJhd0w7XHJcbiAgICAgICAgICAgIGRyYXdMID0gdGVtcDtcclxuXHJcbiAgICAgICAgICAgIGN0eDIuZHJhd0ltYWdlKFxyXG4gICAgICAgICAgICAgICAgdGhhdC5pbWFnZVNyYyxcclxuICAgICAgICAgICAgICAgIGRyYXdMLFxyXG4gICAgICAgICAgICAgICAgLWRyYXdULFxyXG4gICAgICAgICAgICAgICAgcXVhbGl0eVdpZHRoLFxyXG4gICAgICAgICAgICAgICAgcXVhbGl0eVdpZHRoIC8gaW5uZXJBc3BlY3RSYWRpbyxcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgY3R4Mi5kcmF3KGZhbHNlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB3eC5jYW52YXNUb1RlbXBGaWxlUGF0aCh7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogZHJhd0wsXHJcbiAgICAgICAgICAgICAgICAgICAgeTogZHJhd1QsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHF1YWxpdHlXaWR0aCAvIGlubmVyQXNwZWN0UmFkaW8sXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBxdWFsaXR5V2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgcXVhbGl0eTogMSxcclxuICAgICAgICAgICAgICAgICAgICBjYW52YXNJZDogJ215Q2FudmFzMicsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5xdWFsaXR5V2lkdGggPSBxdWFsaXR5V2lkdGggLyBpbm5lckFzcGVjdFJhZGlvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRlbWl0KCdjcm9wLWxvYWRJbWFnZScsIHJlcy50ZW1wRmlsZVBhdGgsIHRoYXQucmF0aW8sIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIOiOt+WPluWbvueJh1xyXG4gICAgICAgIGdldEltYWdlSW5mbygpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgcXVhbGl0eVdpZHRoLCBpbm5lckFzcGVjdFJhZGlvIH0gPSB0aGF0O1xyXG5cclxuICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICflm77niYfnlJ/miJDkuK0uLi4nLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY3R4LmRyYXcodHJ1ZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8g6I635Y+W55S75biD6KaB6KOB5Ymq55qE5L2N572u5ZKM5a695bqmICAg5Z2H5Li655m+5YiG5q+UICog55S75biD5Lit5Zu+54mH55qE5a695bqmICAgIOS/neivgeS6huWcqOW+ruS/oeWwj+eoi+W6j+S4reijgeWJqueahOWbvueJh+aooeezilxyXG4gICAgICAgICAgICAgICAgLy8g5L2N572u5LiN5a+555qE6Zeu6aKYIGNhbnZhc1QgPSAodGhhdC5jdXRUIC8gdGhhdC5jcm9wcGVySCkgKiAodGhhdC5pbWFnZUggLyBwaXhlbFJhdGlvKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgY2FudmFzVyA9ICh0aGF0LmN1dFcgLyB0aGF0LmNyb3BwZXJXKSAqIHF1YWxpdHlXaWR0aDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNhbnZhc0ggPSAoKHRoYXQuY3V0SCAvIHRoYXQuY3JvcHBlckgpICogcXVhbGl0eVdpZHRoKSAvIGlubmVyQXNwZWN0UmFkaW87XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYW52YXNMID0gKHRoYXQuY3V0TCAvIHRoYXQuY3JvcHBlclcpICogcXVhbGl0eVdpZHRoO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2FudmFzVCA9ICgodGhhdC5jdXRUIC8gdGhhdC5jcm9wcGVySCkgKiBxdWFsaXR5V2lkdGgpIC8gaW5uZXJBc3BlY3RSYWRpbztcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBjYW52YXNXOiR7Y2FudmFzV30gLS0tIGNhbnZhc0g6ICR7Y2FudmFzSH0gLS0tIGNhbnZhc0w6XHJcbiAgICAgICAgICAgICAgICAvLyAke2NhbnZhc0x9IC0tLSBjYW52YXNUOiAke2NhbnZhc1R9IC0tLS0tLS0tIHRoYXQuaW1hZ2VXOiAke1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoYXQuaW1hZ2VXXHJcbiAgICAgICAgICAgICAgICAvLyB9ICAtLS0tLS0tIHRoYXQuaW1hZ2VIOiAke1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoYXQuaW1hZ2VIXHJcbiAgICAgICAgICAgICAgICAvLyB9IC0tLS0gcGl4ZWxSYXRpbyAke3BpeGVsUmF0aW99YCk7XHJcbiAgICAgICAgICAgICAgICB3eC5jYW52YXNUb1RlbXBGaWxlUGF0aCh7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogY2FudmFzTCxcclxuICAgICAgICAgICAgICAgICAgICB5OiBjYW52YXNULFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBjYW52YXNXLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogY2FudmFzSCxcclxuICAgICAgICAgICAgICAgICAgICBkZXN0V2lkdGg6IGNhbnZhc1csXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzdEhlaWdodDogY2FudmFzSCxcclxuICAgICAgICAgICAgICAgICAgICBxdWFsaXR5OiAwLjUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzSWQ6ICdteUNhbnZhcycsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5oiQ5Yqf6I635b6X5Zyw5Z2A55qE5Zyw5pa5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGVtaXQoJ2FmdGVyLWNyb3AnLCByZXMudGVtcEZpbGVQYXRoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZUNyb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3gucHJldmlld0ltYWdlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQ6ICcnLCAvLyDlvZPliY3mmL7npLrlm77niYfnmoRodHRw6ZO+5o6lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmxzOiBbcmVzLnRlbXBGaWxlUGF0aF0sIC8vIOmcgOimgemihOiniOeahOWbvueJh2h0dHDpk77mjqXliJfooahcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlQ3JvcCgpIHtcclxuICAgICAgICB0aGlzLmltYWdlU3JjID0gJyc7XHJcbiAgICAgICAgdGhpcy5pc1Nob3dJbWcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
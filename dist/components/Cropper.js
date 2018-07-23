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
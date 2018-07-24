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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNyb3BwZXIuanMiXSwibmFtZXMiOlsid2luZG93V1JQWCIsInBhZ2VYIiwicGFnZVkiLCJ3eCIsImdldFN5c3RlbUluZm9TeW5jIiwicGl4ZWxSYXRpbyIsInNpemVDb25mUGFnZVgiLCJzaXplQ29uZlBhZ2VZIiwiaW5pdERyYWdDdXRXIiwiaW5pdERyYWdDdXRMIiwiaW5pdERyYWdDdXRIIiwiaW5pdERyYWdDdXRUIiwiZHJhZ1NjYWxlUCIsImN0eCIsImN1dENvZWZmaWNpZW50Iiwib3JpZ2luU3JjIiwiZHJhd0wiLCJkcmF3VCIsIkNyb3BwZXIiLCJkYXRhIiwiaW1hZ2VTcmMiLCJpc1Nob3dJbWciLCJyYXRpbyIsImN1dFJhdGlvIiwiY2FudmFzV2lkdGgiLCJjcm9wcGVySW5pdFciLCJjcm9wcGVySW5pdEgiLCJjcm9wcGVyVyIsImNyb3BwZXJIIiwiY3JvcHBlckwiLCJjcm9wcGVyVCIsInNjYWxlUCIsImltYWdlVyIsImltYWdlSCIsImN1dFciLCJjdXRIIiwiY3V0TCIsImN1dFQiLCJxdWFsaXR5V2lkdGgiLCJpbm5lckFzcGVjdFJhZGlvIiwiZXZlbnRzIiwiZmlyc3QiLCJ0aGF0Iiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsImdldEltYWdlSW5mbyIsInNyYyIsInN1Y2Nlc3MiLCJyZXMiLCJ3aWR0aCIsImhlaWdodCIsIk1hdGgiLCJtYXgiLCJzcGxpdCIsImNlaWwiLCJ0ZW1wQ3V0VyIsInRlbXBDdXRIIiwiZHJhd0ltYWdlIiwiZHJhdyIsIiRhcHBseSIsImhpZGVMb2FkaW5nIiwibWV0aG9kcyIsImNhbmNlbCIsImNsb3NlQ3JvcCIsInJlc3RvcmUiLCIkZW1pdCIsImNvbnRlbnRTdGFydE1vdmUiLCJlIiwidG91Y2hlcyIsImNvbnRlbnRNb3ZlaW5nIiwiZHJhZ0xlbmd0aFgiLCJkcmFnTGVuZ3RoWSIsIm1pblgiLCJtaW5ZIiwibWF4WCIsIm1heFkiLCJtaW4iLCJkcmFnU3RhcnQiLCJkcmFnTW92ZSIsImRyYWdUeXBlIiwidGFyZ2V0IiwiZGF0YXNldCIsImRyYWciLCJpbmRleE9mIiwiZHJhZ0xlbmd0aCIsImFicyIsInJvdGF0ZUltYWdlIiwieCIsInkiLCJjdHgyIiwiY3JlYXRlQ2FudmFzQ29udGV4dCIsInNhdmUiLCJ0cmFuc2xhdGUiLCJyb3RhdGUiLCJQSSIsInRlbXAiLCJjYW52YXNUb1RlbXBGaWxlUGF0aCIsInF1YWxpdHkiLCJjYW52YXNJZCIsInRlbXBGaWxlUGF0aCIsImNhbnZhc1ciLCJjYW52YXNIIiwiY2FudmFzTCIsImNhbnZhc1QiLCJkZXN0V2lkdGgiLCJkZXN0SGVpZ2h0IiwicHJldmlld0ltYWdlIiwiY3VycmVudCIsInVybHMiLCJ3ZXB5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBZUE7Ozs7Ozs7Ozs7O0FBZEE7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBO0FBQ0E7QUFDQSxJQUFNQSxhQUFhLEdBQW5CO0FBQ0E7QUFDQSxJQUFJQyxRQUFRLENBQVo7QUFDQTtBQUNBLElBQUlDLFFBQVEsQ0FBWjs7NEJBRXVCQyxHQUFHQyxpQkFBSCxFO0lBQWZDLFUseUJBQUFBLFU7O0FBRVI7OztBQUNBLElBQUlDLGdCQUFnQixDQUFwQjtBQUNBO0FBQ0EsSUFBSUMsZ0JBQWdCLENBQXBCOztBQUVBLElBQUlDLGVBQWUsQ0FBbkI7QUFDQSxJQUFJQyxlQUFlLENBQW5CO0FBQ0EsSUFBSUMsZUFBZSxDQUFuQjtBQUNBLElBQUlDLGVBQWUsQ0FBbkI7QUFDQTtBQUNBLElBQU1DLGFBQWEsQ0FBbkI7QUFDQSxJQUFJQyxNQUFNLElBQVY7QUFDQSxJQUFNQyxpQkFBaUIsR0FBdkIsQyxDQUE0QjtBQUM1QixJQUFJQyxZQUFZLEVBQWhCO0FBQ0EsSUFBSUMsUUFBUSxDQUFaO0FBQ0EsSUFBSUMsUUFBUSxDQUFaOztJQUVxQkMsTzs7Ozs7Ozs7Ozs7Ozs7NExBQ2pCQyxJLEdBQU87QUFDSEMsc0JBQVUsRUFEUDtBQUVIQyx1QkFBVyxLQUZSO0FBR0hDLG1CQUFPLEVBSEo7QUFJSEMsc0JBQVUsRUFKUDtBQUtI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QUFDYkMsc0NBQU0sQ0FBQzVELElBQUltRCxZQUFMLENBRk0sQ0FFYztBQUZkLDZCQUFoQjtBQUlIO0FBbEJtQixxQkFBeEI7QUFvQkgsaUJBakNEO0FBa0NIO0FBbFFLLFM7Ozs7O2lDQW5IRDtBQUNMdEYsa0JBQU1WLEdBQUd1RixtQkFBSCxDQUF1QixVQUF2QixDQUFOO0FBQ0g7OztvQ0FzWFc7QUFDUixpQkFBS3RFLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxpQkFBS0MsU0FBTCxHQUFpQixLQUFqQjtBQUNBLGlCQUFLc0MsTUFBTDtBQUNIOzs7O0VBM1pnQ2tELGVBQUtDLFM7O2tCQUFyQjVGLE8iLCJmaWxlIjoiQ3JvcHBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyoqXG4gKiDkvb/nlKjmlrnms5XvvJpcbiAqIOWwhjxjcm9wcGVyPue7hOS7tuaPkuWFpeWIsOeItue7hOS7tu+8jOWcqOeItue7hOS7tuS4rSRicm9hZGNhc3Tkuovku7bigJljcm9wLWxvYWRJbWFnZeKAmVxuICog5bm25Zyo54i257uE5Lu25Lit5re75Yqg5LqL5Lu2J2FmdGVyLWNyb3An77yM5o6l5pS26KOB5Ymq5ZCO55qE5Zu+54mH5Li05pe25Zyw5Z2AXG4gKlxuICogJ2Nyb3AtbG9hZEltYWdlJ+WPguaVsO+8mlxuICogaW1hZ2VTcmMge1N0cmluZ30g5Zu+54mH6ZO+5o6l77yM5b+F6aG75Li65Li05pe25Zyw5Z2A77yM5oiW6ICF5bey5LiL6L2955qE5Zu+54mHXG4gKiByYXRpbyB7U3RyaW5nfSDoo4Hliarmr5TkvovvvIzmsqHmnInliJnoh6rnlLHoo4HliapcbiAqIGZpcnN0IHtCb29sZWFufSDmmK/lkKbkuLrnrKzkuIDmrKHliqDovb3lm77niYdcbiAqXG4gKiAnYWZ0ZXItY3JvcCflj4LmlbDvvJpcbiAqIHRlbXBGaWxlUGF0aCB7U3RyaW5nfSDoo4HliarlkI7nmoTlm77niYfkuLTml7blnLDlnYBcbiAqL1xuXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuLy8gcGFnZXMvd3gtY3JvcHBlci9pbmRleC5qc1xuLy8g5omL5py655qE5a695bqmXG5jb25zdCB3aW5kb3dXUlBYID0gNzUwO1xuLy8g5ouW5Yqo5pe25YCZ55qEIHBhZ2VYXG5sZXQgcGFnZVggPSAwO1xuLy8g5ouW5Yqo5pe25YCZ55qEIHBhZ2VZXG5sZXQgcGFnZVkgPSAwO1xuXG5jb25zdCB7IHBpeGVsUmF0aW8gfSA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCk7XG5cbi8vIOiwg+aVtOWkp+Wwj+aXtuWAmeeahCBwYWdlWFxubGV0IHNpemVDb25mUGFnZVggPSAwO1xuLy8g6LCD5pW05aSn5bCP5pe25YCZ55qEIHBhZ2VZXG5sZXQgc2l6ZUNvbmZQYWdlWSA9IDA7XG5cbmxldCBpbml0RHJhZ0N1dFcgPSAwO1xubGV0IGluaXREcmFnQ3V0TCA9IDA7XG5sZXQgaW5pdERyYWdDdXRIID0gMDtcbmxldCBpbml0RHJhZ0N1dFQgPSAwO1xuLy8g56e75Yqo5pe2IOaJi+WKv+S9jeenu+S4jiDlrp7pmYXlhYPntKDkvY3np7vnmoTmr5RcbmNvbnN0IGRyYWdTY2FsZVAgPSAyO1xubGV0IGN0eCA9IG51bGw7XG5jb25zdCBjdXRDb2VmZmljaWVudCA9IDAuODsgLy8g6KOB5Ymq57O75pWwXG5sZXQgb3JpZ2luU3JjID0gJyc7XG5sZXQgZHJhd0wgPSAwO1xubGV0IGRyYXdUID0gMDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3JvcHBlciBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBkYXRhID0ge1xuICAgICAgICBpbWFnZVNyYzogJycsXG4gICAgICAgIGlzU2hvd0ltZzogZmFsc2UsXG4gICAgICAgIHJhdGlvOiAnJyxcbiAgICAgICAgY3V0UmF0aW86ICcnLFxuICAgICAgICBjYW52YXNXaWR0aDogd2luZG93V1JQWCxcbiAgICAgICAgLy8g5Yid5aeL5YyW55qE5a696auYXG4gICAgICAgIGNyb3BwZXJJbml0Vzogd2luZG93V1JQWCxcbiAgICAgICAgY3JvcHBlckluaXRIOiB3aW5kb3dXUlBYLFxuICAgICAgICAvLyDliqjmgIHnmoTlrr3pq5hcbiAgICAgICAgY3JvcHBlclc6IHdpbmRvd1dSUFgsXG4gICAgICAgIGNyb3BwZXJIOiB3aW5kb3dXUlBYLFxuICAgICAgICAvLyDliqjmgIHnmoRsZWZ0IHRvcOWAvFxuICAgICAgICBjcm9wcGVyTDogMCxcbiAgICAgICAgY3JvcHBlclQ6IDAsXG5cbiAgICAgICAgLy8g5Zu+54mH57yp5pS+5YC8XG4gICAgICAgIHNjYWxlUDogMCxcbiAgICAgICAgaW1hZ2VXOiAwLFxuICAgICAgICBpbWFnZUg6IDAsXG5cbiAgICAgICAgLy8g6KOB5Ymq5qGGIOWuvemrmFxuICAgICAgICBjdXRXOiAwLFxuICAgICAgICBjdXRIOiAwLFxuICAgICAgICBjdXRMOiAwLFxuICAgICAgICBjdXRUOiAwLFxuICAgICAgICBxdWFsaXR5V2lkdGg6IDcyMCxcbiAgICAgICAgaW5uZXJBc3BlY3RSYWRpbzogMSxcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIGN0eCA9IHd4LmNyZWF0ZUNhbnZhc0NvbnRleHQoJ215Q2FudmFzJyk7XG4gICAgfVxuXG4gICAgZXZlbnRzID0ge1xuICAgICAgICAnY3JvcC1sb2FkSW1hZ2UnKGltYWdlU3JjLCByYXRpbyA9ICcnLCBmaXJzdCA9IGZhbHNlKSB7XG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgIGNvbnN0IHsgcXVhbGl0eVdpZHRoIH0gPSB0aGF0O1xuICAgICAgICAgICAgbGV0IHsgaW5uZXJBc3BlY3RSYWRpbyB9ID0gdGhhdDtcbiAgICAgICAgICAgIGxldCBjdXRSYXRpbyA9IG51bGw7XG4gICAgICAgICAgICB0aGF0LmltYWdlU3JjID0gaW1hZ2VTcmM7XG4gICAgICAgICAgICB0aGF0LnJhdGlvID0gcmF0aW87IC8vIOmAmui/h3JhdGlv5o6n5Yi25piv5ZCm5Y+v5Lul6Ieq55Sx5ouJ5Ly4XG5cbiAgICAgICAgICAgIGlmIChmaXJzdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIC8vIOS/neWtmOWOn+Wni+aVsOaNrlxuICAgICAgICAgICAgICAgIG9yaWdpblNyYyA9IGltYWdlU3JjO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICflm77niYfliqDovb3kuK0uLi4nLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHd4LmdldEltYWdlSW5mbyh7XG4gICAgICAgICAgICAgICAgc3JjOiBpbWFnZVNyYyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICAgICAgICAgICAgICBpbm5lckFzcGVjdFJhZGlvID0gcmVzLndpZHRoIC8gcmVzLmhlaWdodDtcblxuICAgICAgICAgICAgICAgICAgICAvLyDnlKjkuo5jYW52YXMyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhbnZhc1dpZHRoID0gTWF0aC5tYXgocXVhbGl0eVdpZHRoLCBxdWFsaXR5V2lkdGggLyBpbm5lckFzcGVjdFJhZGlvKTtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5jYW52YXNXaWR0aCA9IGNhbnZhc1dpZHRoO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIOWkhOeQhuijgeWJquavlOS+i1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJhdGlvID09PSAnc3RyaW5nJyAmJiByYXRpbykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgW3dpZHRoLCBoZWlnaHRdID0gcmF0aW8uc3BsaXQoJywnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1dFJhdGlvID0gK3dpZHRoIC8gK2hlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1dFJhdGlvID0gaW5uZXJBc3BlY3RSYWRpbztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGF0LmN1dFJhdGlvID0gY3V0UmF0aW87XG5cblxuICAgICAgICAgICAgICAgICAgICAvLyDmoLnmja7lm77niYfnmoTlrr3pq5jmmL7npLrkuI3lkIznmoTmlYjmnpwgICDkv53or4Hlm77niYflj6/ku6XmraPluLjmmL7npLpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlubmVyQXNwZWN0UmFkaW8gPj0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jcm9wcGVyVyA9IHdpbmRvd1dSUFg7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNyb3BwZXJIID0gd2luZG93V1JQWCAvIGlubmVyQXNwZWN0UmFkaW87XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNyb3BwZXJMID0gTWF0aC5jZWlsKCh3aW5kb3dXUlBYIC0gd2luZG93V1JQWCkgLyAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY3JvcHBlclQgPSBNYXRoLmNlaWwoKHdpbmRvd1dSUFggLVxuICAgICAgICAgICAgICAgICAgICAgICAgKHdpbmRvd1dSUFggLyBpbm5lckFzcGVjdFJhZGlvKSkgLyAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOijgeWJquahhuWuvemrmFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5a69PumrmO+8jOmrmOW6puWhq+a7oe+8jOWuveW6puagueaNrumrmOW6pu+8jOaMieeFp+ijgeWJquavlOS+i+adpVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6L+Y6ZyA6KaB5o6S6Zmk6L+H6ZW/6L+H5a6955qE5oOF5Ya1XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZW1wQ3V0VyA9IHdpbmRvd1dSUFggKiBjdXRDb2VmZmljaWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRlbXBDdXRIID0gKHdpbmRvd1dSUFggKiBjdXRDb2VmZmljaWVudCkgLyBjdXRSYXRpbztcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHRlbXBDdXRXID4gd2luZG93V1JQWCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jdXRXID0gdGVtcEN1dFc7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmN1dEggPSB0ZW1wQ3V0SDtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICjlm77niYflrr3luqYgLSDoo4HliarmoYblrr3luqYpIC8gMlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jdXRMID0gTWF0aC5jZWlsKCgod2luZG93V1JQWCAtXG4gICAgICAgICAgICAgICAgICAgICAgICAod2luZG93V1JQWCAqIGN1dENvZWZmaWNpZW50KSkgLyAyKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmN1dFQgPSAoKHdpbmRvd1dSUFggLyBpbm5lckFzcGVjdFJhZGlvKSAtXG4gICAgICAgICAgICAgICAgICAgICAgICAoKHdpbmRvd1dSUFggKiBjdXRDb2VmZmljaWVudCkgLyBjdXRSYXRpbykpIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2NhbGVQID0gKHJlcy53aWR0aCAqIHBpeGVsUmF0aW8pIC8gd2luZG93V1JQWDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW1hZ2VXID0gcmVzLndpZHRoICogcGl4ZWxSYXRpbztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW1hZ2VIID0gcmVzLmhlaWdodCAqIHBpeGVsUmF0aW87XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlubmVyQXNwZWN0UmFkaW8gPSBpbm5lckFzcGVjdFJhZGlvO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jcm9wcGVySW5pdEggPSAxMjA2O1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g55So5LqOY2FudmFzMlxuICAgICAgICAgICAgICAgICAgICAgICAgZHJhd1QgPSAoY2FudmFzV2lkdGggLSAocXVhbGl0eVdpZHRoIC8gaW5uZXJBc3BlY3RSYWRpbykpIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY3JvcHBlclcgPSB3aW5kb3dXUlBYICogaW5uZXJBc3BlY3RSYWRpbztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY3JvcHBlckggPSB3aW5kb3dXUlBYO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jcm9wcGVyTCA9IE1hdGguY2VpbCgod2luZG93V1JQWCAtXG4gICAgICAgICAgICAgICAgICAgICAgICAod2luZG93V1JQWCAqIGlubmVyQXNwZWN0UmFkaW8pKSAvIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jcm9wcGVyVCA9IE1hdGguY2VpbCgoKHdpbmRvd1dSUFggLyBpbm5lckFzcGVjdFJhZGlvKSAtXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dXUlBYKSAvIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6KOB5Ymq5qGG5a696auYXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDlrr086auY77yM5a695bqm5aGr5ruh77yM6auY5bqm5qC55o2u6auY5bqm77yM5oyJ54Wn6KOB5Ymq5q+U5L6L5p2lXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmN1dFcgPSAod2luZG93V1JQWCAqIGN1dENvZWZmaWNpZW50KSAqIGlubmVyQXNwZWN0UmFkaW87XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmN1dEggPSAoKHdpbmRvd1dSUFggKiBjdXRDb2VmZmljaWVudCkgKiBpbm5lckFzcGVjdFJhZGlvKSAvIGN1dFJhdGlvO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jdXRMID0gKCh3aW5kb3dXUlBYICogaW5uZXJBc3BlY3RSYWRpbykgLVxuICAgICAgICAgICAgICAgICAgICAgICAgKCh3aW5kb3dXUlBYICogY3V0Q29lZmZpY2llbnQpICogaW5uZXJBc3BlY3RSYWRpbykpIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICjlm77niYfpq5jluqYgLSDoo4HliarmoYbpq5jluqYpIC8gMlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jdXRUID0gKHdpbmRvd1dSUFggLVxuICAgICAgICAgICAgICAgICAgICAgICAgKCgod2luZG93V1JQWCAqIGN1dENvZWZmaWNpZW50KSAqIGlubmVyQXNwZWN0UmFkaW8pIC8gY3V0UmF0aW8pKSAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNjYWxlUCA9IChyZXMud2lkdGggKiBwaXhlbFJhdGlvKSAvIHdpbmRvd1dSUFg7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmltYWdlVyA9IHJlcy53aWR0aCAqIHBpeGVsUmF0aW87XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmltYWdlSCA9IHJlcy5oZWlnaHQgKiBwaXhlbFJhdGlvO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pbm5lckFzcGVjdFJhZGlvID0gaW5uZXJBc3BlY3RSYWRpbztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY3JvcHBlckluaXRIID0gdGhhdC5jcm9wcGVySW5pdFcgLyBpbm5lckFzcGVjdFJhZGlvO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g55So5LqOY2FudmFzMlxuICAgICAgICAgICAgICAgICAgICAgICAgZHJhd0wgPSAoY2FudmFzV2lkdGggLSBxdWFsaXR5V2lkdGgpIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGF0LmlzU2hvd0ltZyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlU3JjLFxuICAgICAgICAgICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWFsaXR5V2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWFsaXR5V2lkdGggLyBpbm5lckFzcGVjdFJhZGlvLFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBjdHguZHJhdygpO1xuICAgICAgICAgICAgICAgICAgICB0aGF0LmlubmVyQXNwZWN0UmFkaW8gPSBpbm5lckFzcGVjdFJhZGlvO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG5cbiAgICAgICAgY2FuY2VsKCkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZUNyb3AoKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZXN0b3JlKCkge1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgnY3JvcC1sb2FkSW1hZ2UnLCBvcmlnaW5TcmMsIHRoaXMucmF0aW8sIGZhbHNlKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyDmi5bliqjml7blgJnop6blj5HnmoR0b3VjaFN0YXJ05LqL5Lu2XG4gICAgICAgIGNvbnRlbnRTdGFydE1vdmUoZSkge1xuICAgICAgICAgICAgW3sgcGFnZVgsIHBhZ2VZIH1dID0gZS50b3VjaGVzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIOaLluWKqOaXtuWAmeinpuWPkeeahHRvdWNoTW92ZeS6i+S7tlxuICAgICAgICBjb250ZW50TW92ZWluZyhlKSB7XG4gICAgICAgICAgICBjb25zdCBkcmFnTGVuZ3RoWCA9IChwYWdlWCAtIGUudG91Y2hlc1swXS5wYWdlWCkgKiBkcmFnU2NhbGVQO1xuICAgICAgICAgICAgY29uc3QgZHJhZ0xlbmd0aFkgPSAocGFnZVkgLSBlLnRvdWNoZXNbMF0ucGFnZVkpICogZHJhZ1NjYWxlUDtcbiAgICAgICAgICAgIGNvbnN0IG1pblggPSBNYXRoLm1heCh0aGlzLmN1dEwgLSBkcmFnTGVuZ3RoWCwgMCk7XG4gICAgICAgICAgICBjb25zdCBtaW5ZID0gTWF0aC5tYXgodGhpcy5jdXRUIC0gZHJhZ0xlbmd0aFksIDApO1xuICAgICAgICAgICAgY29uc3QgbWF4WCA9IHRoaXMuY3JvcHBlclcgLSB0aGlzLmN1dFc7XG4gICAgICAgICAgICBjb25zdCBtYXhZID0gdGhpcy5jcm9wcGVySCAtIHRoaXMuY3V0SDtcbiAgICAgICAgICAgIHRoaXMuY3V0TCA9IE1hdGgubWluKG1heFgsIG1pblgpO1xuICAgICAgICAgICAgdGhpcy5jdXRUID0gTWF0aC5taW4obWF4WSwgbWluWSk7XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYCR7bWF4WH0gLS0tLS0gJHttaW5YfWApO1xuICAgICAgICAgICAgW3sgcGFnZVgsIHBhZ2VZIH1dID0gZS50b3VjaGVzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIOiuvue9ruWkp+Wwj+eahOaXtuWAmeinpuWPkeeahHRvdWNoU3RhcnTkuovku7ZcbiAgICAgICAgZHJhZ1N0YXJ0KGUpIHtcbiAgICAgICAgICAgIHNpemVDb25mUGFnZVggPSBlLnRvdWNoZXNbMF0ucGFnZVg7XG4gICAgICAgICAgICBzaXplQ29uZlBhZ2VZID0gZS50b3VjaGVzWzBdLnBhZ2VZO1xuICAgICAgICAgICAgaW5pdERyYWdDdXRXID0gdGhpcy5jdXRXO1xuICAgICAgICAgICAgaW5pdERyYWdDdXRMID0gdGhpcy5jdXRMO1xuICAgICAgICAgICAgaW5pdERyYWdDdXRUID0gdGhpcy5jdXRUO1xuICAgICAgICAgICAgaW5pdERyYWdDdXRIID0gdGhpcy5jdXRIO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIOiuvue9ruWkp+Wwj+eahOaXtuWAmeinpuWPkeeahHRvdWNoTW92ZeS6i+S7tlxuICAgICAgICBkcmFnTW92ZShlKSB7XG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgIGNvbnN0IGRyYWdUeXBlID0gZS50YXJnZXQuZGF0YXNldC5kcmFnO1xuICAgICAgICAgICAgY29uc3QgeyBjdXRSYXRpbywgcmF0aW8gfSA9IHRoYXQ7XG5cbiAgICAgICAgICAgIGlmICh+WydyaWdodCcsICdsZWZ0JywgJ3RvcCcsICdib3R0b20nXS5pbmRleE9mKGRyYWdUeXBlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGRyYWdMZW5ndGg7XG4gICAgICAgICAgICBzd2l0Y2ggKGRyYWdUeXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgICAgICBkcmFnTGVuZ3RoID1cbiAgICAgICAgICAgICAgICAgICAgICAgIChzaXplQ29uZlBhZ2VYIC0gZS50b3VjaGVzWzBdLnBhZ2VYKSAqIGRyYWdTY2FsZVA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbml0RHJhZ0N1dFcgPj0gZHJhZ0xlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5aaC5p6cIOenu+WKqOWwj+S6jjAg6K+05piO5piv5Zyo5b6A5LiL5ZWmICDmlL7lpKfoo4HliarnmoTpq5jluqYgIOi/meagt+S4gOadpSDlm77niYfnmoTpq5jluqYgIOacgOWkpyDnrYnkuo4g5Zu+54mH55qEdG9w5YC85YqgIOW9k+WJjeWbvueJh+eahOmrmOW6piAg5ZCm5YiZ5bCx6K+05piO6LaF5Ye655WM6ZmQXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ0xlbmd0aCA8IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNyb3BwZXJXID4gaW5pdERyYWdDdXRMICsgdGhhdC5jdXRXXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1dFcgPSBpbml0RHJhZ0N1dFcgLSBkcmFnTGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5aaC5p6c5piv56e75YqoIOWkp+S6jjAgIOivtOaYjuWcqOe8qeWwjyAg5Y+q6ZyA6KaB57yp5bCP55qE6Led56a75bCP5LqO5Y6f5pys6KOB5Ymq55qE6auY5bqm5bCxb2tcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkcmFnTGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3V0VyA9IGluaXREcmFnQ3V0VyAtIGRyYWdMZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICAgICAgZHJhZ0xlbmd0aCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAoZHJhZ0xlbmd0aCA9IHNpemVDb25mUGFnZVggLSBlLnRvdWNoZXNbMF0ucGFnZVgpICpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyYWdTY2FsZVA7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRyYWdMZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5pdERyYWdDdXRXID49IGRyYWdMZW5ndGggJiYgaW5pdERyYWdDdXRMID4gZHJhZ0xlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRyYWdMZW5ndGggPCAwICYmIE1hdGguYWJzKGRyYWdMZW5ndGgpID49IGluaXREcmFnQ3V0Vykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3V0TCA9IGluaXREcmFnQ3V0TCAtIGRyYWdMZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1dFcgPSBpbml0RHJhZ0N1dFcgKyBkcmFnTGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgICAgICAgICAgICBkcmFnTGVuZ3RoID1cbiAgICAgICAgICAgICAgICAgICAgICAgIChzaXplQ29uZlBhZ2VZIC0gZS50b3VjaGVzWzBdLnBhZ2VZKSAqIGRyYWdTY2FsZVA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbml0RHJhZ0N1dEggPj0gZHJhZ0xlbmd0aCAmJiBpbml0RHJhZ0N1dFQgPiBkcmFnTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHJhZ0xlbmd0aCA8IDAgJiYgTWF0aC5hYnMoZHJhZ0xlbmd0aCkgPj0gaW5pdERyYWdDdXRIKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXRUID0gaW5pdERyYWdDdXRUIC0gZHJhZ0xlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3V0SCA9IGluaXREcmFnQ3V0SCArIGRyYWdMZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgICAgICAgICAgIGRyYWdMZW5ndGggPVxuICAgICAgICAgICAgICAgICAgICAgICAgKHNpemVDb25mUGFnZVkgLSBlLnRvdWNoZXNbMF0ucGFnZVkpICogZHJhZ1NjYWxlUDtcbiAgICAgICAgICAgICAgICAgICAgLy8g5b+F6aG75pivIGRyYWdMZW5ndGgg5ZCR5LiK57yp5bCP55qE5pe25YCZ5b+F6aG75bCP5LqO5Y6f5pys55qE6auY5bqmXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbml0RHJhZ0N1dEggPj0gZHJhZ0xlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5aaC5p6cIOenu+WKqOWwj+S6jjAg6K+05piO5piv5Zyo5b6A5LiL5ZWmICDmlL7lpKfoo4HliarnmoTpq5jluqYgIOi/meagt+S4gOadpSDlm77niYfnmoTpq5jluqYgIOacgOWkpyDnrYnkuo4g5Zu+54mH55qEdG9w5YC85YqgIOW9k+WJjeWbvueJh+eahOmrmOW6piAg5ZCm5YiZ5bCx6K+05piO6LaF5Ye655WM6ZmQXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ0xlbmd0aCA8IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNyb3BwZXJIID4gaW5pdERyYWdDdXRUICsgdGhhdC5jdXRIXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1dEggPSBpbml0RHJhZ0N1dEggLSBkcmFnTGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5aaC5p6c5piv56e75YqoIOWkp+S6jjAgIOivtOaYjuWcqOe8qeWwjyAg5Y+q6ZyA6KaB57yp5bCP55qE6Led56a75bCP5LqO5Y6f5pys6KOB5Ymq55qE6auY5bqm5bCxb2tcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkcmFnTGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3V0SCA9IGluaXREcmFnQ3V0SCAtIGRyYWdMZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdyaWdodEJvdHRvbSc6IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZHJhZ0xlbmd0aFggPVxuICAgICAgICAgICAgICAgICAgICAgICAgKHNpemVDb25mUGFnZVggLSBlLnRvdWNoZXNbMF0ucGFnZVgpICogZHJhZ1NjYWxlUDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZHJhZ0xlbmd0aFkgPVxuICAgICAgICAgICAgICAgICAgICAgICAgKHNpemVDb25mUGFnZVkgLSBlLnRvdWNoZXNbMF0ucGFnZVkpICogZHJhZ1NjYWxlUDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdERyYWdDdXRIID49IGRyYWdMZW5ndGhZICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0RHJhZ0N1dFcgPj0gZHJhZ0xlbmd0aFhcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBib3R0b20g5pa55ZCR55qE5Y+Y5YyWXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGRyYWdMZW5ndGhZIDwgMCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNyb3BwZXJIID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXREcmFnQ3V0VCArIHRoYXQuY3V0SCkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcmFnTGVuZ3RoWSA+IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3V0SCA9IGluaXREcmFnQ3V0SCAtIGRyYWdMZW5ndGhZO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhdGlvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3V0VyA9IChpbml0RHJhZ0N1dEggLSBkcmFnTGVuZ3RoWSkgKiBjdXRSYXRpbztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJpZ2h0IOaWueWQkeeahOWPmOWMllxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChkcmFnTGVuZ3RoWCA8IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jcm9wcGVyVyA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0RHJhZ0N1dEwgKyB0aGF0LmN1dFcpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ0xlbmd0aFggPiAwXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1dFcgPSBpbml0RHJhZ0N1dFcgLSBkcmFnTGVuZ3RoWDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYXRpbykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1dEggPSAoaW5pdERyYWdDdXRXIC0gZHJhZ0xlbmd0aFgpIC8gY3V0UmF0aW87XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIOmAmui/h2NhbnZhczLkuJPpl6jlpITnkIblm77niYfml4vovaxcbiAgICAgICAgcm90YXRlSW1hZ2UoKSB7XG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgIGNvbnN0IHsgcXVhbGl0eVdpZHRoLCBpbm5lckFzcGVjdFJhZGlvIH0gPSB0aGF0O1xuICAgICAgICAgICAgY29uc3QgeCA9IHF1YWxpdHlXaWR0aCAvIDI7XG4gICAgICAgICAgICBjb25zdCB5ID0gKHF1YWxpdHlXaWR0aCAvIGlubmVyQXNwZWN0UmFkaW8pIC8gMjtcbiAgICAgICAgICAgIGNvbnN0IGN0eDIgPSB3eC5jcmVhdGVDYW52YXNDb250ZXh0KCdteUNhbnZhczInKTtcbiAgICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+WbvueJh+WKoOi9veS4rS4uLicsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY3R4Mi5zYXZlKCk7XG4gICAgICAgICAgICAvLyDml4vovazlnZDmoIfns7vvvIzku4XpgILnlKjkuo7mr4/mrKHml4vovaw5MOW6plxuICAgICAgICAgICAgY3R4Mi50cmFuc2xhdGUoeCwgeSk7XG4gICAgICAgICAgICAvLyDku6XlnZDmoIfns7vljp/ngrnkuLrlnIblv4Pml4vovaxcbiAgICAgICAgICAgIGN0eDIucm90YXRlKCg5MCAqIE1hdGguUEkpIC8gMTgwKTtcbiAgICAgICAgICAgIGN0eDIudHJhbnNsYXRlKC14LCAteSk7XG5cbiAgICAgICAgICAgIC8vIOS6pOaNomRyYXdUIGRyYXdMXG4gICAgICAgICAgICBjb25zdCB0ZW1wID0gZHJhd1Q7XG4gICAgICAgICAgICBkcmF3VCA9IGRyYXdMO1xuICAgICAgICAgICAgZHJhd0wgPSB0ZW1wO1xuXG4gICAgICAgICAgICBjdHgyLmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICB0aGF0LmltYWdlU3JjLFxuICAgICAgICAgICAgICAgIGRyYXdMLFxuICAgICAgICAgICAgICAgIC1kcmF3VCxcbiAgICAgICAgICAgICAgICBxdWFsaXR5V2lkdGgsXG4gICAgICAgICAgICAgICAgcXVhbGl0eVdpZHRoIC8gaW5uZXJBc3BlY3RSYWRpbyxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjdHgyLmRyYXcoZmFsc2UsICgpID0+IHtcbiAgICAgICAgICAgICAgICB3eC5jYW52YXNUb1RlbXBGaWxlUGF0aCh7XG4gICAgICAgICAgICAgICAgICAgIHg6IGRyYXdMLFxuICAgICAgICAgICAgICAgICAgICB5OiBkcmF3VCxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHF1YWxpdHlXaWR0aCAvIGlubmVyQXNwZWN0UmFkaW8sXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogcXVhbGl0eVdpZHRoLFxuICAgICAgICAgICAgICAgICAgICBxdWFsaXR5OiAxLFxuICAgICAgICAgICAgICAgICAgICBjYW52YXNJZDogJ215Q2FudmFzMicsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnF1YWxpdHlXaWR0aCA9IHF1YWxpdHlXaWR0aCAvIGlubmVyQXNwZWN0UmFkaW87XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kZW1pdCgnY3JvcC1sb2FkSW1hZ2UnLCByZXMudGVtcEZpbGVQYXRoLCB0aGF0LnJhdGlvLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyDojrflj5blm77niYdcbiAgICAgICAgZ2V0SW1hZ2VJbmZvKCkge1xuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICBjb25zdCB7IHF1YWxpdHlXaWR0aCwgaW5uZXJBc3BlY3RSYWRpbyB9ID0gdGhhdDtcblxuICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5Zu+54mH55Sf5oiQ5LitLi4uJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY3R4LmRyYXcodHJ1ZSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIOiOt+WPlueUu+W4g+imgeijgeWJqueahOS9jee9ruWSjOWuveW6piAgIOWdh+S4uueZvuWIhuavlCAqIOeUu+W4g+S4reWbvueJh+eahOWuveW6piAgICDkv53or4HkuoblnKjlvq7kv6HlsI/nqIvluo/kuK3oo4HliarnmoTlm77niYfmqKHns4pcbiAgICAgICAgICAgICAgICAvLyDkvY3nva7kuI3lr7nnmoTpl67popggY2FudmFzVCA9ICh0aGF0LmN1dFQgLyB0aGF0LmNyb3BwZXJIKSAqICh0aGF0LmltYWdlSCAvIHBpeGVsUmF0aW8pXG4gICAgICAgICAgICAgICAgY29uc3QgY2FudmFzVyA9ICh0aGF0LmN1dFcgLyB0aGF0LmNyb3BwZXJXKSAqIHF1YWxpdHlXaWR0aDtcbiAgICAgICAgICAgICAgICBjb25zdCBjYW52YXNIID0gKCh0aGF0LmN1dEggLyB0aGF0LmNyb3BwZXJIKSAqIHF1YWxpdHlXaWR0aCkgLyBpbm5lckFzcGVjdFJhZGlvO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhbnZhc0wgPSAodGhhdC5jdXRMIC8gdGhhdC5jcm9wcGVyVykgKiBxdWFsaXR5V2lkdGg7XG4gICAgICAgICAgICAgICAgY29uc3QgY2FudmFzVCA9ICgodGhhdC5jdXRUIC8gdGhhdC5jcm9wcGVySCkgKiBxdWFsaXR5V2lkdGgpIC8gaW5uZXJBc3BlY3RSYWRpbztcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgY2FudmFzVzoke2NhbnZhc1d9IC0tLSBjYW52YXNIOiAke2NhbnZhc0h9IC0tLSBjYW52YXNMOlxuICAgICAgICAgICAgICAgIC8vICR7Y2FudmFzTH0gLS0tIGNhbnZhc1Q6ICR7Y2FudmFzVH0gLS0tLS0tLS0gdGhhdC5pbWFnZVc6ICR7XG4gICAgICAgICAgICAgICAgLy8gICAgIHRoYXQuaW1hZ2VXXG4gICAgICAgICAgICAgICAgLy8gfSAgLS0tLS0tLSB0aGF0LmltYWdlSDogJHtcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhhdC5pbWFnZUhcbiAgICAgICAgICAgICAgICAvLyB9IC0tLS0gcGl4ZWxSYXRpbyAke3BpeGVsUmF0aW99YCk7XG4gICAgICAgICAgICAgICAgd3guY2FudmFzVG9UZW1wRmlsZVBhdGgoe1xuICAgICAgICAgICAgICAgICAgICB4OiBjYW52YXNMLFxuICAgICAgICAgICAgICAgICAgICB5OiBjYW52YXNULFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogY2FudmFzVyxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBjYW52YXNILFxuICAgICAgICAgICAgICAgICAgICBkZXN0V2lkdGg6IGNhbnZhc1csXG4gICAgICAgICAgICAgICAgICAgIGRlc3RIZWlnaHQ6IGNhbnZhc0gsXG4gICAgICAgICAgICAgICAgICAgIHF1YWxpdHk6IDAuNSxcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzSWQ6ICdteUNhbnZhcycsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5oiQ5Yqf6I635b6X5Zyw5Z2A55qE5Zyw5pa5XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRlbWl0KCdhZnRlci1jcm9wJywgcmVzLnRlbXBGaWxlUGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NlQ3JvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd3gucHJldmlld0ltYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50OiAnJywgLy8g5b2T5YmN5pi+56S65Zu+54mH55qEaHR0cOmTvuaOpVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybHM6IFtyZXMudGVtcEZpbGVQYXRoXSwgLy8g6ZyA6KaB6aKE6KeI55qE5Zu+54mHaHR0cOmTvuaOpeWIl+ihqFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICB9XG5cbiAgICBjbG9zZUNyb3AoKSB7XG4gICAgICAgIHRoaXMuaW1hZ2VTcmMgPSAnJztcbiAgICAgICAgdGhpcy5pc1Nob3dJbWcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG59XG4iXX0=
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ctx = null;

var px = function px(n) {
    if (typeof n === 'undefined') return void 0;
    if (n === 0) return 0;

    var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
        windowWidth = _wx$getSystemInfoSync.windowWidth;

    return n / 750 * windowWidth;
};

Component({
    properties: {
        width: {
            type: Number,
            value: 750
        },
        height: {
            type: Number,
            value: 500
        },
        layers: {
            type: Array,
            value: []
        },
        background: {
            type: Object,
            value: null
        }
    },

    data: {
        drawing: true
    },

    attached: function attached() {
        var _this = this;
        console.log(this.data);

        ctx = wx.createCanvasContext('draw-canvas', this);

        var _data = this.data,
            background = _data.background,
            layers = _data.layers,
            width = _data.width,
            height = _data.height;

        // 背景图片

        if (background) {
            var imageResource = background.imageResource,
                _background$dx = background.dx,
                dx = _background$dx === undefined ? 0 : _background$dx,
                _background$dy = background.dy,
                dy = _background$dy === undefined ? 0 : _background$dy,
                _background$dWidth = background.dWidth,
                dWidth = _background$dWidth === undefined ? width : _background$dWidth,
                _background$dHeight = background.dHeight,
                dHeight = _background$dHeight === undefined ? height : _background$dHeight,
                color = background.color;
            // 背景颜色

            if (color) {
                var _ctx, _ctx2;

                var start = color.start,
                    end = color.end,
                    colorStop = color.colorStop,
                    _color$shape = color.shape,
                    shape = _color$shape === undefined ? 'Linear' : _color$shape;

                /**
                    shape Circular/Linear
                    start Array [x, y, width, height]
                    colorStop Array [stop, color]
                    end Array [x, y, width, height]
                    */

                var grd = (_ctx = ctx)['create' + shape + 'Gradient'].apply(_ctx, start);
                colorStop.forEach(function (cs) {
                    grd.addColorStop.apply(grd, cs);
                });
                ctx.setFillStyle(grd);
                (_ctx2 = ctx).fillRect.apply(_ctx2, end);
            }
            ctx.drawImage(imageResource, px(dx), px(dy), px(dWidth), px(dHeight));
        }

        // 图层
        layers.forEach(function (layer) {
            if (layer.type === 'text') {
                var _layer$textBaseline = layer.textBaseline,
                    textBaseline = _layer$textBaseline === undefined ? 'top' : _layer$textBaseline,
                    _layer$textAlign = layer.textAlign,
                    textAlign = _layer$textAlign === undefined ? 'left' : _layer$textAlign,
                    _layer$fontSize = layer.fontSize,
                    fontSize = _layer$fontSize === undefined ? 16 : _layer$fontSize,
                    _layer$text = layer.text,
                    text = _layer$text === undefined ? '' : _layer$text,
                    _layer$x = layer.x,
                    x = _layer$x === undefined ? 0 : _layer$x,
                    _layer$y = layer.y,
                    y = _layer$y === undefined ? 0 : _layer$y,
                    _layer$color = layer.color,
                    _color = _layer$color === undefined ? '#000' : _layer$color,
                    _layer$lineHeight = layer.lineHeight,
                    lineHeight = _layer$lineHeight === undefined ? 50 : _layer$lineHeight,
                    _layer$maxWidth = layer.maxWidth,
                    maxWidth = _layer$maxWidth === undefined ? width : _layer$maxWidth;

                ctx.setTextBaseline(textBaseline);
                ctx.setTextAlign(textAlign);
                ctx.setFontSize(fontSize);
                ctx.setFillStyle(_color);
                var mw = px(maxWidth);

                var textArr = [];
                var tempArr = [];
                var tempWidth = 0;
                text.split('').forEach(function (word) {
                    var w = ctx.measureText(word).width;

                    if (tempWidth + w > mw) {
                        textArr.push(tempArr.join(''));
                        tempArr = [word];
                        tempWidth = 0;
                    } else {
                        tempArr.push(word);
                        tempWidth += w;
                    }
                });
                if (tempArr.length > 0) {
                    textArr.push(tempArr.join(''));
                }

                textArr.forEach(function (str, i) {
                    ctx.fillText(str, px(x), px(y + i * lineHeight), mw);
                });
            }

            if (layer.type === 'color') {
                var _ctx3, _ctx4;

                var _start = layer.start,
                    _end = layer.end,
                    _colorStop = layer.colorStop,
                    _layer$shape = layer.shape,
                    _shape = _layer$shape === undefined ? 'Linear' : _layer$shape;

                var _grd = (_ctx3 = ctx)['create' + _shape + 'Gradient'].apply(_ctx3, _start);
                _colorStop.forEach(function (cs) {
                    _grd.addColorStop.apply(_grd, cs);
                });
                ctx.setFillStyle(_grd);
                (_ctx4 = ctx).fillRect.apply(_ctx4, _end);
            }

            if (layer.type === 'image') {
                var _imageResource = layer.imageResource,
                    _layer$dx = layer.dx,
                    _dx = _layer$dx === undefined ? 0 : _layer$dx,
                    _layer$dy = layer.dy,
                    _dy = _layer$dy === undefined ? 0 : _layer$dy,
                    _layer$dWidth = layer.dWidth,
                    _dWidth = _layer$dWidth === undefined ? width : _layer$dWidth,
                    _layer$dHeight = layer.dHeight,
                    _dHeight = _layer$dHeight === undefined ? height : _layer$dHeight;

                ctx.drawImage(_imageResource, px(_dx), px(_dy), px(_dWidth), px(_dHeight));
            }
        });

        ctx.draw(false, function () {
            _this.setData({
                drawing: false
            });
        });
    },

    methods: {
        toTempFilePath: function toTempFilePath() {
            var _this2 = this;

            var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                destWidth = _ref.destWidth,
                destHeight = _ref.destHeight;

            return new Promise(function (resolve) {
                var _data2 = _this2.data,
                    width = _data2.width,
                    height = _data2.height;


                wx.canvasToTempFilePath({
                    destWidth: destWidth || width,
                    destHeight: destHeight || height,
                    canvasId: 'draw-canvas',
                    success: function success(res) {
                        resolve(res.tempFilePath);
                    }
                }, _this2);
            });
        }
    },
});

/***/ })
/******/ ]);
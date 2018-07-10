'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _module = require('./../types/module.js');

var _reduxActions = require('./../../npm/redux-actions/lib/index.js');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = (0, _reduxActions.handleActions)(_defineProperty({}, _module.LOADALL, function (state, action) {
    modules = modulesParse.show(action.data);
    return _extends({}, state, {
        modules: modules
    });
}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMuanMiXSwibmFtZXMiOlsiTE9BREFMTCIsInN0YXRlIiwiYWN0aW9uIiwibW9kdWxlcyIsIm1vZHVsZXNQYXJzZSIsInNob3ciLCJkYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUVBOzs7O2tCQUdlLHFEQUNWQSxlQURVLFlBQ0RDLEtBREMsRUFDTUMsTUFETixFQUNhO0FBQ3BCQyxjQUFVQyxhQUFhQyxJQUFiLENBQW1CSCxPQUFPSSxJQUExQixDQUFWO0FBQ0Esd0JBQ09MLEtBRFA7QUFFSUU7QUFGSjtBQUlILENBUFUsRSIsImZpbGUiOiJtb2R1bGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTE9BREFMTCwgTE9BRE1PUkUgfSBmcm9tICcuLi90eXBlcy9tb2R1bGUnO1xuXG5pbXBvcnQgeyBoYW5kbGVBY3Rpb25zIH0gZnJvbSAncmVkdXgtYWN0aW9ucyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlQWN0aW9ucyAoe1xuICAgIFtMT0FEQUxMXShzdGF0ZSwgYWN0aW9uKXtcbiAgICAgICAgbW9kdWxlcyA9IG1vZHVsZXNQYXJzZS5zaG93KCBhY3Rpb24uZGF0YSApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICBtb2R1bGVzLFxuICAgICAgICB9XG4gICAgfVxufSkiXX0=
"use strict";

var quen = [];

function bindEvent(name) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Function();

    quen.push({
        name: name,
        callback: callback
    });
}
function emitEvent(eventName, detail) {
    quen.map(function (_ref) {
        var name = _ref.name,
            callback = _ref.callback;

        if (name == eventName) {
            callback.call(null, detail);
        }
    });
}

module.exports = {
    bindEvent: bindEvent,
    emitEvent: emitEvent
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50LmpzIl0sIm5hbWVzIjpbInF1ZW4iLCJiaW5kRXZlbnQiLCJuYW1lIiwiY2FsbGJhY2siLCJGdW5jdGlvbiIsInB1c2giLCJlbWl0RXZlbnQiLCJldmVudE5hbWUiLCJkZXRhaWwiLCJtYXAiLCJjYWxsIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxPQUFLLEVBQVQ7O0FBRUEsU0FBU0MsU0FBVCxDQUFtQkMsSUFBbkIsRUFBaUQ7QUFBQSxRQUF6QkMsUUFBeUIsdUVBQWhCLElBQUtDLFFBQUwsRUFBZ0I7O0FBQzdDSixTQUFLSyxJQUFMLENBQVU7QUFDTkgsa0JBRE07QUFFTkM7QUFGTSxLQUFWO0FBSUg7QUFDRCxTQUFTRyxTQUFULENBQW1CQyxTQUFuQixFQUE2QkMsTUFBN0IsRUFBb0M7QUFDaENSLFNBQUtTLEdBQUwsQ0FBUyxnQkFBbUI7QUFBQSxZQUFqQlAsSUFBaUIsUUFBakJBLElBQWlCO0FBQUEsWUFBWkMsUUFBWSxRQUFaQSxRQUFZOztBQUN4QixZQUFHRCxRQUFNSyxTQUFULEVBQW1CO0FBQ2ZKLHFCQUFTTyxJQUFULENBQWMsSUFBZCxFQUFtQkYsTUFBbkI7QUFDSDtBQUNKLEtBSkQ7QUFLSDs7QUFFREcsT0FBT0MsT0FBUCxHQUFlO0FBQ1hYLHdCQURXO0FBRVhLO0FBRlcsQ0FBZiIsImZpbGUiOiJldmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBxdWVuPVtdO1xuXG5mdW5jdGlvbiBiaW5kRXZlbnQobmFtZSxjYWxsYmFjaz1uZXcgIEZ1bmN0aW9uKCkpe1xuICAgIHF1ZW4ucHVzaCh7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGNhbGxiYWNrXG4gICAgfSlcbn1cbmZ1bmN0aW9uIGVtaXRFdmVudChldmVudE5hbWUsZGV0YWlsKXtcbiAgICBxdWVuLm1hcCgoe25hbWUsY2FsbGJhY2t9KT0+e1xuICAgICAgICBpZihuYW1lPT1ldmVudE5hbWUpe1xuICAgICAgICAgICAgY2FsbGJhY2suY2FsbChudWxsLGRldGFpbClcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzPXtcbiAgICBiaW5kRXZlbnQsXG4gICAgZW1pdEV2ZW50XG59Il19
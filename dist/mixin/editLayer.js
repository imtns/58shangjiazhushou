'use strict';

var _modulesParse = require('./../utils/modulesParse.js');

var _modulesParse2 = _interopRequireDefault(_modulesParse);

var _utils = require('./../utils/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var app = require('./../utils/globalData.js');

var _require = require('./../utils/ajax.js'),
    post = _require.post;

module.exports = {
    showEdit: function showEdit(e) {
        var name = e.currentTarget.dataset.name;

        if (!this.data.isEditing || this.data.editLayer[name]) return;
        this.setData({
            editLayer: {}
        });

        this.setData(_defineProperty({}, 'editLayer.' + name, !this.data.editLayer[name]));
    },
    cancelClick: function cancelClick() {
        this.setData({
            editLayer: {},
            isEditing: false
        });
    },
    editClick: function editClick() {
        this.setData({
            isEditing: !this.data.isEditing
        });
        if (this.data.isEditing) {
            console.log('编辑');
            console.log(this.data.page_data);
            var name = this.data.page_data[0].id;
            if (this.data.page_data.length > 0) {
                this.setData(_defineProperty({}, 'editLayer.' + name, true));
            }
        } else {
            this.setData({
                editLayer: {}
            });
            this.goSave();
            console.log('保存');
        }
    },
    goSave: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var pageId, modData, emptymodData;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            pageId = app.globalData.pageList.filter(function (obj) {
                                return obj.pageKey === 'index';
                            })[0].id;
                            modData = app.globalData.modules.map(function (_ref2) {
                                var id = _ref2.id,
                                    name = _ref2.name,
                                    cfg = _ref2.cfg,
                                    params = _ref2.params;

                                if (Array.isArray(params)) params = {};
                                return {
                                    id: id, name: name, cfg: cfg, params: params, page_id: pageId
                                };
                            });

                            modData = JSON.parse(JSON.stringify(modData));
                            emptymodData = [];

                            modData.forEach(function (item) {
                                if (item.name === 'coupon' && item.params && !item.params.couponIds) {
                                    (0, _utils.toast)('请补全组件中的优惠券。');
                                    emptymodData.push(item);
                                }
                            });

                            if (!(emptymodData.length && emptymodData.length > 0)) {
                                _context.next = 7;
                                break;
                            }

                            return _context.abrupt('return');

                        case 7:
                            _context.next = 9;
                            return post('/business/templete/savemodules', {
                                businessPageId: pageId,
                                modulesJson: JSON.stringify(_modulesParse2.default.save(modData)),
                                releaseId: app.globalData.extConfig.extJson.ext.releaseId,
                                mpId: app.globalData.extConfig.extJson.ext.mpId
                            });

                        case 9:
                            (0, _utils.toast)('保存成功');
                            // wx.navigateBack({
                            //     delta: 1,
                            // });

                        case 10:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function goSave() {
            return _ref.apply(this, arguments);
        }

        return goSave;
    }(),
    goEdit: function goEdit(e) {
        var _e$currentTarget$data = e.currentTarget.dataset,
            id = _e$currentTarget$data.id,
            name = _e$currentTarget$data.name;

        wx.navigateTo({
            url: '../edit/' + name + '?id=' + id
        });
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXRMYXllci5qcyJdLCJuYW1lcyI6WyJhcHAiLCJyZXF1aXJlIiwicG9zdCIsIm1vZHVsZSIsImV4cG9ydHMiLCJzaG93RWRpdCIsImUiLCJuYW1lIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJkYXRhIiwiaXNFZGl0aW5nIiwiZWRpdExheWVyIiwic2V0RGF0YSIsImNhbmNlbENsaWNrIiwiZWRpdENsaWNrIiwiY29uc29sZSIsImxvZyIsInBhZ2VfZGF0YSIsImlkIiwibGVuZ3RoIiwiZ29TYXZlIiwicGFnZUlkIiwiZ2xvYmFsRGF0YSIsInBhZ2VMaXN0IiwiZmlsdGVyIiwib2JqIiwicGFnZUtleSIsIm1vZERhdGEiLCJtb2R1bGVzIiwibWFwIiwiY2ZnIiwicGFyYW1zIiwiQXJyYXkiLCJpc0FycmF5IiwicGFnZV9pZCIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsImVtcHR5bW9kRGF0YSIsImZvckVhY2giLCJpdGVtIiwiY291cG9uSWRzIiwicHVzaCIsImJ1c2luZXNzUGFnZUlkIiwibW9kdWxlc0pzb24iLCJtb2R1bGVzUGFyc2UiLCJzYXZlIiwicmVsZWFzZUlkIiwiZXh0Q29uZmlnIiwiZXh0SnNvbiIsImV4dCIsIm1wSWQiLCJnb0VkaXQiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiXSwibWFwcGluZ3MiOiI7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFNQSxNQUFNQyxRQUFRLHFCQUFSLENBQVo7O2VBQ2lCQSxRQUFRLGVBQVIsQztJQUFUQyxJLFlBQUFBLEk7O0FBRVJDLE9BQU9DLE9BQVAsR0FBaUI7QUFDYkMsWUFEYSxvQkFDSkMsQ0FESSxFQUNEO0FBQUEsWUFFSkMsSUFGSSxHQUdKRCxFQUFFRSxhQUFGLENBQWdCQyxPQUhaLENBRUpGLElBRkk7O0FBSVIsWUFBSSxDQUFDLEtBQUtHLElBQUwsQ0FBVUMsU0FBWCxJQUF3QixLQUFLRCxJQUFMLENBQVVFLFNBQVYsQ0FBb0JMLElBQXBCLENBQTVCLEVBQXVEO0FB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QWlDQyxHQUFqQyxDQUFxQ0gsU0FIUDtBQUl6Q0ksc0NBQU1wRCxJQUFJdUIsVUFBSixDQUFlMEIsU0FBZixDQUF5QkMsT0FBekIsQ0FBaUNDLEdBQWpDLENBQXFDQztBQUpGLDZCQUF2QyxDQTlERzs7QUFBQTtBQW9FVCw4Q0FBTSxNQUFOO0FBQ0o7QUFDQTtBQUNBOztBQXZFYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQXlFYkMsVUF6RWEsa0JBeUVOL0MsQ0F6RU0sRUF5RUg7QUFBQSxvQ0FJRkEsRUFBRUUsYUFBRixDQUFnQkMsT0FKZDtBQUFBLFlBRUZVLEVBRkUseUJBRUZBLEVBRkU7QUFBQSxZQUdGWixJQUhFLHlCQUdGQSxJQUhFOztBQUtOK0MsV0FBR0MsVUFBSCxDQUFjO0FBQ1ZDLDhCQUFnQmpELElBQWhCLFlBQTJCWTtBQURqQixTQUFkO0FBR0g7QUFqRlksQ0FBakIiLCJmaWxlIjoiZWRpdExheWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBtb2R1bGVzUGFyc2UgZnJvbSAnLi4vdXRpbHMvbW9kdWxlc1BhcnNlJztcclxuaW1wb3J0IHsgdG9hc3QgfSBmcm9tICcuLi91dGlscyc7XHJcblxyXG5jb25zdCBhcHAgPSByZXF1aXJlKCcuLi91dGlscy9nbG9iYWxEYXRhJyk7XHJcbmNvbnN0IHsgcG9zdCB9ID0gcmVxdWlyZSgnLi4vdXRpbHMvYWpheCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBzaG93RWRpdChlKSB7XHJcbiAgICAgICAgY29uc3Qge1xyXG4gICAgICAgICAgICBuYW1lLFxyXG4gICAgICAgIH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcclxuICAgICAgICBpZiAoIXRoaXMuZGF0YS5pc0VkaXRpbmcgfHwgdGhpcy5kYXRhLmVkaXRMYXllcltuYW1lXSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGVkaXRMYXllcjoge30sXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIFtgZWRpdExheWVyLiR7bmFtZX1gXTogIXRoaXMuZGF0YS5lZGl0TGF5ZXJbbmFtZV0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgY2FuY2VsQ2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgZWRpdExheWVyOiB7fSxcclxuICAgICAgICAgICAgaXNFZGl0aW5nOiBmYWxzZSxcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBlZGl0Q2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgaXNFZGl0aW5nOiAhdGhpcy5kYXRhLmlzRWRpdGluZyxcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodGhpcy5kYXRhLmlzRWRpdGluZykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn57yW6L6RJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YS5wYWdlX2RhdGEpO1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5kYXRhLnBhZ2VfZGF0YVswXS5pZDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5wYWdlX2RhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICBbYGVkaXRMYXllci4ke25hbWV9YF06IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICBlZGl0TGF5ZXI6IHt9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5nb1NhdmUoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+S/neWtmCcpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBnb1NhdmUoKSB7XHJcbiAgICAgICAgY29uc3QgcGFnZUlkID0gYXBwLmdsb2JhbERhdGEucGFnZUxpc3QuZmlsdGVyKG9iaiA9PiBvYmoucGFnZUtleSA9PT0gJ2luZGV4JylbMF0uaWQ7XHJcbiAgICAgICAgbGV0IG1vZERhdGEgPSBhcHAuZ2xvYmFsRGF0YS5tb2R1bGVzLm1hcCgoe1xyXG4gICAgICAgICAgICBpZCwgbmFtZSwgY2ZnLCBwYXJhbXMsXHJcbiAgICAgICAgfSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXJhbXMpKSBwYXJhbXMgPSB7fTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGlkLCBuYW1lLCBjZmcsIHBhcmFtcywgcGFnZV9pZDogcGFnZUlkLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG1vZERhdGEgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG1vZERhdGEpKTtcclxuICAgICAgICBjb25zdCBlbXB0eW1vZERhdGEgPSBbXTtcclxuICAgICAgICBtb2REYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgaWYgKGl0ZW0ubmFtZSA9PT0gJ2NvdXBvbicgJiYgaXRlbS5wYXJhbXMgJiYgIWl0ZW0ucGFyYW1zLmNvdXBvbklkcykge1xyXG4gICAgICAgICAgICAgICAgdG9hc3QoJ+ivt+ihpeWFqOe7hOS7tuS4reeahOS8mOaDoOWIuOOAgicpO1xyXG4gICAgICAgICAgICAgICAgZW1wdHltb2REYXRhLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoZW1wdHltb2REYXRhLmxlbmd0aCAmJiBlbXB0eW1vZERhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGF3YWl0IHBvc3QoJy9idXNpbmVzcy90ZW1wbGV0ZS9zYXZlbW9kdWxlcycsIHtcclxuICAgICAgICAgICAgYnVzaW5lc3NQYWdlSWQ6IHBhZ2VJZCxcclxuICAgICAgICAgICAgbW9kdWxlc0pzb246IEpTT04uc3RyaW5naWZ5KG1vZHVsZXNQYXJzZS5zYXZlKG1vZERhdGEpKSxcclxuICAgICAgICAgICAgcmVsZWFzZUlkOiBhcHAuZ2xvYmFsRGF0YS5leHRDb25maWcuZXh0SnNvbi5leHQucmVsZWFzZUlkLFxyXG4gICAgICAgICAgICBtcElkOiBhcHAuZ2xvYmFsRGF0YS5leHRDb25maWcuZXh0SnNvbi5leHQubXBJZCxcclxuICAgICAgICB9KTtcclxuICAgICAgICB0b2FzdCgn5L+d5a2Y5oiQ5YqfJyk7XHJcbiAgICAvLyB3eC5uYXZpZ2F0ZUJhY2soe1xyXG4gICAgLy8gICAgIGRlbHRhOiAxLFxyXG4gICAgLy8gfSk7XHJcbiAgICB9LFxyXG4gICAgZ29FZGl0KGUpIHtcclxuICAgICAgICBjb25zdCB7XHJcbiAgICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgICBuYW1lLFxyXG4gICAgICAgIH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcclxuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgLi4vZWRpdC8ke25hbWV9P2lkPSR7aWR9YCxcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbn07XHJcbiJdfQ==
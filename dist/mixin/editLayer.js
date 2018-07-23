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
        var _e$currentTarget$data = e.currentTarget.dataset,
            name = _e$currentTarget$data.name,
            title = _e$currentTarget$data.title;

        if (title === 'evaluation' || title === 'information') {
            this.setData({
                noEdit: true
            });
        } else {
            this.setData({
                noEdit: false
            });
        }
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
        if (this.noEdit) return;
        var _e$currentTarget$data2 = e.currentTarget.dataset,
            id = _e$currentTarget$data2.id,
            name = _e$currentTarget$data2.name;

        wx.navigateTo({
            url: '../edit/' + name + '?id=' + id
        });
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXRMYXllci5qcyJdLCJuYW1lcyI6WyJhcHAiLCJyZXF1aXJlIiwicG9zdCIsIm1vZHVsZSIsImV4cG9ydHMiLCJzaG93RWRpdCIsImUiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsIm5hbWUiLCJ0aXRsZSIsInNldERhdGEiLCJub0VkaXQiLCJkYXRhIiwiaXNFZGl0aW5nIiwiZWRpdExheWVyIiwiY2FuY2VsQ2xpY2siLCJlZGl0Q2xpY2siLCJjb25zb2xlIiwibG9nIiwicGFnZV9kYXRhIiwiaWQiLCJsZW5ndGgiLCJnb1NhdmUiLCJwYWdlSWQiLCJnbG9iYWxEYXRhIiwicGFnZUxpc3QiLCJmaWx0ZXIiLCJvYmoiLCJwYWdlS2V5IiwibW9kRGF0YSIsIm1vZHVsZXMiLCJtYXAiLCJjZmciLCJwYXJhbXMiLCJBcnJheSIsImlzQXJyYXkiLCJwYWdlX2lkIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwiZW1wdHltb2REYXRhIiwiZm9yRWFjaCIsIml0ZW0iLCJjb3Vwb25JZHMiLCJwdXNoIiwiYnVzaW5lc3NQYWdlSWQiLCJtb2R1bGVzSnNvbiIsIm1vZHVsZXNQYXJzZSIsInNhdmUiLCJyZWxlYXNlSWQiLCJleHRDb25maWciLCJleHRKc29uIiwiZXh0IiwibXBJZCIsImdvRWRpdCIsInd4IiwibmF2aWdhdGVUbyIsInVybCJdLCJtYXBwaW5ncyI6Ijs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU1BLE1BQU1DLFFBQVEscUJBQVIsQ0FBWjs7ZUFDaUJBLFFBQVEsZUFBUixDO0lBQVRDLEksWUFBQUEsSTs7QUFFUkMsT0FBT0MsT0FBUCxHQUFpQjtBQUNiQyxZQURhLG9CQUNKQyxDQURJLEVBQ0Q7QUFBQSxvQ0FDZ0JBLEVBQUVDLGFBQUYsQ0FBZ0JDLE9BRGhDO0FBQUEsWUFDQUMsSUFEQSx5QkFDQUEsSUFEQTtBQUFBLFlBQ01DLEtBRE4seUJBQ01BLEtBRE47O0FBRVIsWUFBSUEsVUFBVSxZQUFWLElBQTBCQSxVQUFVLGFBQXhD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QztBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUEsbUNBcUVIcEIsS0FBSyxnQ0FBTCxFQUF1QztBQUN6QzRDLGdEQUFnQnRCLE1BRHlCO0FBRXpDdUIsNkNBQWFULEtBQUtFLFNBQUwsQ0FBZVEsdUJBQWFDLElBQWIsQ0FBa0JuQixPQUFsQixDQUFmLENBRjRCO0FBR3pDb0IsMkNBQVdsRCxJQUFJeUIsVUFBSixDQUFlMEIsU0FBZixDQUF5QkMsT0FBekIsQ0FBaUNDLEdBQWpDLENBQXFDSCxTQUhQO0FBSXpDSSxzQ0FBTXRELElBQUl5QixVQUFKLENBQWUwQixTQUFmLENBQXlCQyxPQUF6QixDQUFpQ0MsR0FBakMsQ0FBcUNDO0FBSkYsNkJBQXZDLENBckVHOztBQUFBO0FBMkVULDhDQUFNLE1BQU47QUFDSjtBQUNBO0FBQ0E7O0FBOUVhO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBZ0ZiQyxVQWhGYSxrQkFnRk5qRCxDQWhGTSxFQWdGSDtBQUNOLFlBQUksS0FBS00sTUFBVCxFQUFpQjtBQURYLHFDQUtGTixFQUFFQyxhQUFGLENBQWdCQyxPQUxkO0FBQUEsWUFHRmEsRUFIRSwwQkFHRkEsRUFIRTtBQUFBLFlBSUZaLElBSkUsMEJBSUZBLElBSkU7O0FBTU4rQyxXQUFHQyxVQUFILENBQWM7QUFDVkMsOEJBQWdCakQsSUFBaEIsWUFBMkJZO0FBRGpCLFNBQWQ7QUFHSDtBQXpGWSxDQUFqQiIsImZpbGUiOiJlZGl0TGF5ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IG1vZHVsZXNQYXJzZSBmcm9tICcuLi91dGlscy9tb2R1bGVzUGFyc2UnO1xyXG5pbXBvcnQgeyB0b2FzdCB9IGZyb20gJy4uL3V0aWxzJztcclxuXHJcbmNvbnN0IGFwcCA9IHJlcXVpcmUoJy4uL3V0aWxzL2dsb2JhbERhdGEnKTtcclxuY29uc3QgeyBwb3N0IH0gPSByZXF1aXJlKCcuLi91dGlscy9hamF4Jyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIHNob3dFZGl0KGUpIHtcclxuICAgICAgICBjb25zdCB7IG5hbWUsIHRpdGxlIH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcclxuICAgICAgICBpZiAodGl0bGUgPT09ICdldmFsdWF0aW9uJyB8fCB0aXRsZSA9PT0gJ2luZm9ybWF0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgbm9FZGl0OiB0cnVlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgbm9FZGl0OiBmYWxzZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5kYXRhLmlzRWRpdGluZyB8fCB0aGlzLmRhdGEuZWRpdExheWVyW25hbWVdKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgZWRpdExheWVyOiB7fSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgW2BlZGl0TGF5ZXIuJHtuYW1lfWBdOiAhdGhpcy5kYXRhLmVkaXRMYXllcltuYW1lXSxcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBjYW5jZWxDbGljaygpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBlZGl0TGF5ZXI6IHt9LFxyXG4gICAgICAgICAgICBpc0VkaXRpbmc6IGZhbHNlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGVkaXRDbGljaygpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBpc0VkaXRpbmc6ICF0aGlzLmRhdGEuaXNFZGl0aW5nLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh0aGlzLmRhdGEuaXNFZGl0aW5nKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnvJbovpEnKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhLnBhZ2VfZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmRhdGEucGFnZV9kYXRhWzBdLmlkO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhLnBhZ2VfZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgIFtgZWRpdExheWVyLiR7bmFtZX1gXTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIGVkaXRMYXllcjoge30sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmdvU2F2ZSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5L+d5a2YJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGdvU2F2ZSgpIHtcclxuICAgICAgICBjb25zdCBwYWdlSWQgPSBhcHAuZ2xvYmFsRGF0YS5wYWdlTGlzdC5maWx0ZXIob2JqID0+IG9iai5wYWdlS2V5ID09PSAnaW5kZXgnKVswXS5pZDtcclxuICAgICAgICBsZXQgbW9kRGF0YSA9IGFwcC5nbG9iYWxEYXRhLm1vZHVsZXMubWFwKCh7XHJcbiAgICAgICAgICAgIGlkLCBuYW1lLCBjZmcsIHBhcmFtcyxcclxuICAgICAgICB9KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBhcmFtcykpIHBhcmFtcyA9IHt9O1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgaWQsIG5hbWUsIGNmZywgcGFyYW1zLCBwYWdlX2lkOiBwYWdlSWQsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbW9kRGF0YSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobW9kRGF0YSkpO1xyXG4gICAgICAgIGNvbnN0IGVtcHR5bW9kRGF0YSA9IFtdO1xyXG4gICAgICAgIG1vZERhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5uYW1lID09PSAnY291cG9uJyAmJiBpdGVtLnBhcmFtcyAmJiAhaXRlbS5wYXJhbXMuY291cG9uSWRzKSB7XHJcbiAgICAgICAgICAgICAgICB0b2FzdCgn6K+36KGl5YWo57uE5Lu25Lit55qE5LyY5oOg5Yi444CCJyk7XHJcbiAgICAgICAgICAgICAgICBlbXB0eW1vZERhdGEucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChlbXB0eW1vZERhdGEubGVuZ3RoICYmIGVtcHR5bW9kRGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXdhaXQgcG9zdCgnL2J1c2luZXNzL3RlbXBsZXRlL3NhdmVtb2R1bGVzJywge1xyXG4gICAgICAgICAgICBidXNpbmVzc1BhZ2VJZDogcGFnZUlkLFxyXG4gICAgICAgICAgICBtb2R1bGVzSnNvbjogSlNPTi5zdHJpbmdpZnkobW9kdWxlc1BhcnNlLnNhdmUobW9kRGF0YSkpLFxyXG4gICAgICAgICAgICByZWxlYXNlSWQ6IGFwcC5nbG9iYWxEYXRhLmV4dENvbmZpZy5leHRKc29uLmV4dC5yZWxlYXNlSWQsXHJcbiAgICAgICAgICAgIG1wSWQ6IGFwcC5nbG9iYWxEYXRhLmV4dENvbmZpZy5leHRKc29uLmV4dC5tcElkLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRvYXN0KCfkv53lrZjmiJDlip8nKTtcclxuICAgIC8vIHd4Lm5hdmlnYXRlQmFjayh7XHJcbiAgICAvLyAgICAgZGVsdGE6IDEsXHJcbiAgICAvLyB9KTtcclxuICAgIH0sXHJcbiAgICBnb0VkaXQoZSkge1xyXG4gICAgICAgIGlmICh0aGlzLm5vRWRpdCkgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgaWQsXHJcbiAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgfSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0O1xyXG4gICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6IGAuLi9lZGl0LyR7bmFtZX0/aWQ9JHtpZH1gLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxufTtcclxuIl19
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
                var _setData2;

                this.setData((_setData2 = {}, _defineProperty(_setData2, 'editLayer.' + name, true), _defineProperty(_setData2, 'layer', true), _setData2));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXRMYXllci5qcyJdLCJuYW1lcyI6WyJhcHAiLCJyZXF1aXJlIiwicG9zdCIsIm1vZHVsZSIsImV4cG9ydHMiLCJzaG93RWRpdCIsImUiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsIm5hbWUiLCJ0aXRsZSIsInNldERhdGEiLCJub0VkaXQiLCJkYXRhIiwiaXNFZGl0aW5nIiwiZWRpdExheWVyIiwiY2FuY2VsQ2xpY2siLCJlZGl0Q2xpY2siLCJjb25zb2xlIiwibG9nIiwicGFnZV9kYXRhIiwiaWQiLCJsZW5ndGgiLCJnb1NhdmUiLCJwYWdlSWQiLCJnbG9iYWxEYXRhIiwicGFnZUxpc3QiLCJmaWx0ZXIiLCJvYmoiLCJwYWdlS2V5IiwibW9kRGF0YSIsIm1vZHVsZXMiLCJtYXAiLCJjZmciLCJwYXJhbXMiLCJBcnJheSIsImlzQXJyYXkiLCJwYWdlX2lkIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwiZW1wdHltb2REYXRhIiwiZm9yRWFjaCIsIml0ZW0iLCJjb3Vwb25JZHMiLCJwdXNoIiwiYnVzaW5lc3NQYWdlSWQiLCJtb2R1bGVzSnNvbiIsIm1vZHVsZXNQYXJzZSIsInNhdmUiLCJyZWxlYXNlSWQiLCJleHRDb25maWciLCJleHRKc29uIiwiZXh0IiwibXBJZCIsImdvRWRpdCIsInd4IiwibmF2aWdhdGVUbyIsInVybCJdLCJtYXBwaW5ncyI6Ijs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU1BLE1BQU1DLFFBQVEscUJBQVIsQ0FBWjs7ZUFDaUJBLFFBQVEsZUFBUixDO0lBQVRDLEksWUFBQUEsSTs7QUFFUkMsT0FBT0MsT0FBUCxHQUFpQjtBQUNiQyxZQURhLG9CQUNKQyxDQURJLEVBQ0Q7QUFBQSxvQ0FDZ0JBLEVBQUVDLGFBQUYsQ0FBZ0JDLE9BRGhDO0FBQUEsWUFDQUMsSUFEQSx5QkFDQUEsSUFEQTtBQUFBLFlBQ01DLEtBRE4seUJBQ01BLEtBRE47O0FBRVIsWUFBSUEsVUFBVSxZQUFWLElBQTBCQSxVQUFVLGFBQXhD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QixNQUFiLEdBQXNCLENBcEV4QztBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUEsbUNBdUVIcEIsS0FBSyxnQ0FBTCxFQUF1QztBQUN6QzRDLGdEQUFnQnRCLE1BRHlCO0FBRXpDdUIsNkNBQWFULEtBQUtFLFNBQUwsQ0FBZVEsdUJBQWFDLElBQWIsQ0FBa0JuQixPQUFsQixDQUFmLENBRjRCO0FBR3pDb0IsMkNBQVdsRCxJQUFJeUIsVUFBSixDQUFlMEIsU0FBZixDQUF5QkMsT0FBekIsQ0FBaUNDLEdBQWpDLENBQXFDSCxTQUhQO0FBSXpDSSxzQ0FBTXRELElBQUl5QixVQUFKLENBQWUwQixTQUFmLENBQXlCQyxPQUF6QixDQUFpQ0MsR0FBakMsQ0FBcUNDO0FBSkYsNkJBQXZDLENBdkVHOztBQUFBO0FBNkVULDhDQUFNLE1BQU47QUFDSjtBQUNBO0FBQ0E7O0FBaEZhO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBa0ZiQyxVQWxGYSxrQkFrRk5qRCxDQWxGTSxFQWtGSDtBQUNOLFlBQUksS0FBS00sTUFBVCxFQUFpQjtBQURYLHFDQUtGTixFQUFFQyxhQUFGLENBQWdCQyxPQUxkO0FBQUEsWUFHRmEsRUFIRSwwQkFHRkEsRUFIRTtBQUFBLFlBSUZaLElBSkUsMEJBSUZBLElBSkU7O0FBTU4rQyxXQUFHQyxVQUFILENBQWM7QUFDVkMsOEJBQWdCakQsSUFBaEIsWUFBMkJZO0FBRGpCLFNBQWQ7QUFHSDtBQTNGWSxDQUFqQiIsImZpbGUiOiJlZGl0TGF5ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBtb2R1bGVzUGFyc2UgZnJvbSAnLi4vdXRpbHMvbW9kdWxlc1BhcnNlJztcbmltcG9ydCB7IHRvYXN0IH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5jb25zdCBhcHAgPSByZXF1aXJlKCcuLi91dGlscy9nbG9iYWxEYXRhJyk7XG5jb25zdCB7IHBvc3QgfSA9IHJlcXVpcmUoJy4uL3V0aWxzL2FqYXgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc2hvd0VkaXQoZSkge1xuICAgICAgICBjb25zdCB7IG5hbWUsIHRpdGxlIH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcbiAgICAgICAgaWYgKHRpdGxlID09PSAnZXZhbHVhdGlvbicgfHwgdGl0bGUgPT09ICdpbmZvcm1hdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgbm9FZGl0OiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgIG5vRWRpdDogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuZGF0YS5pc0VkaXRpbmcgfHwgdGhpcy5kYXRhLmVkaXRMYXllcltuYW1lXSkgcmV0dXJuO1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgZWRpdExheWVyOiB7fSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIFtgZWRpdExheWVyLiR7bmFtZX1gXTogIXRoaXMuZGF0YS5lZGl0TGF5ZXJbbmFtZV0sXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgY2FuY2VsQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBlZGl0TGF5ZXI6IHt9LFxuICAgICAgICAgICAgaXNFZGl0aW5nOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBlZGl0Q2xpY2soKSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBpc0VkaXRpbmc6ICF0aGlzLmRhdGEuaXNFZGl0aW5nLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5kYXRhLmlzRWRpdGluZykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+e8lui+kScpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhLnBhZ2VfZGF0YSk7XG4gICAgICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5kYXRhLnBhZ2VfZGF0YVswXS5pZDtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEucGFnZV9kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgICAgICBbYGVkaXRMYXllci4ke25hbWV9YF06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGxheWVyOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICBlZGl0TGF5ZXI6IHt9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmdvU2F2ZSgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+S/neWtmCcpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBhc3luYyBnb1NhdmUoKSB7XG4gICAgICAgIGNvbnN0IHBhZ2VJZCA9IGFwcC5nbG9iYWxEYXRhLnBhZ2VMaXN0LmZpbHRlcihvYmogPT4gb2JqLnBhZ2VLZXkgPT09ICdpbmRleCcpWzBdLmlkO1xuICAgICAgICBsZXQgbW9kRGF0YSA9IGFwcC5nbG9iYWxEYXRhLm1vZHVsZXMubWFwKCh7XG4gICAgICAgICAgICBpZCwgbmFtZSwgY2ZnLCBwYXJhbXMsXG4gICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBhcmFtcykpIHBhcmFtcyA9IHt9O1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpZCwgbmFtZSwgY2ZnLCBwYXJhbXMsIHBhZ2VfaWQ6IHBhZ2VJZCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgICBtb2REYXRhID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShtb2REYXRhKSk7XG4gICAgICAgIGNvbnN0IGVtcHR5bW9kRGF0YSA9IFtdO1xuICAgICAgICBtb2REYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLm5hbWUgPT09ICdjb3Vwb24nICYmIGl0ZW0ucGFyYW1zICYmICFpdGVtLnBhcmFtcy5jb3Vwb25JZHMpIHtcbiAgICAgICAgICAgICAgICB0b2FzdCgn6K+36KGl5YWo57uE5Lu25Lit55qE5LyY5oOg5Yi444CCJyk7XG4gICAgICAgICAgICAgICAgZW1wdHltb2REYXRhLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZW1wdHltb2REYXRhLmxlbmd0aCAmJiBlbXB0eW1vZERhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHBvc3QoJy9idXNpbmVzcy90ZW1wbGV0ZS9zYXZlbW9kdWxlcycsIHtcbiAgICAgICAgICAgIGJ1c2luZXNzUGFnZUlkOiBwYWdlSWQsXG4gICAgICAgICAgICBtb2R1bGVzSnNvbjogSlNPTi5zdHJpbmdpZnkobW9kdWxlc1BhcnNlLnNhdmUobW9kRGF0YSkpLFxuICAgICAgICAgICAgcmVsZWFzZUlkOiBhcHAuZ2xvYmFsRGF0YS5leHRDb25maWcuZXh0SnNvbi5leHQucmVsZWFzZUlkLFxuICAgICAgICAgICAgbXBJZDogYXBwLmdsb2JhbERhdGEuZXh0Q29uZmlnLmV4dEpzb24uZXh0Lm1wSWQsXG4gICAgICAgIH0pO1xuICAgICAgICB0b2FzdCgn5L+d5a2Y5oiQ5YqfJyk7XG4gICAgLy8gd3gubmF2aWdhdGVCYWNrKHtcbiAgICAvLyAgICAgZGVsdGE6IDEsXG4gICAgLy8gfSk7XG4gICAgfSxcbiAgICBnb0VkaXQoZSkge1xuICAgICAgICBpZiAodGhpcy5ub0VkaXQpIHJldHVybjtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XG4gICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiBgLi4vZWRpdC8ke25hbWV9P2lkPSR7aWR9YCxcbiAgICAgICAgfSk7XG4gICAgfSxcbn07XG4iXX0=
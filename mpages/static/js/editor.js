"use strict";

;
(function () {
    var utils = {
        toArray: function toArray(obj) {
            return Array.prototype.slice.call(obj);
        },
        range: function range() {
            // 之前进入添加商品页面，如果光标没有在商品详情输入框的某个地方，此处会报错，修改如下：by贺燕珍
            var sel = window.getSelection() && window.getSelection();
            if (sel && sel.rangeCount > 0) {
                return sel.getRangeAt(0);
            }
            // 之前代码
            // return window.getSelection().getRangeAt(0);
        },
        resetRange: function resetRange(startContainer, startOffset, endContainer, endOffset) {
            var selection = window.getSelection();
            selection.removeAllRanges();
            var range = document.createRange();
            range.setStart(startContainer, startOffset);
            range.setEnd(endContainer || startContainer, endOffset || startOffset);
            selection.addRange(range);
        },
        focusDom: function focusDom() {
            if (utils.range()) {
                var dom = utils.range().endContainer;
                return dom.nodeType === 3 ? dom.parentNode : dom;
            }
        },
        createNode: function createNode(name, attrs) {
            var node = document.createElement(name),
                attr;
            for (attr in attrs) {
                if (attrs.hasOwnProperty(attr)) {
                    node.setAttribute(attr, attrs[attr]);
                }
            }
            return node;
        }
    };

    var $ = function $(dom) {
        var $dom = typeof dom === "string" ? document.querySelector(dom) : dom;
        return {
            dom: $dom,
            html: function html(_html) {
                if (!_html) return $dom.innerHTML;

                $dom.innerHTML = _html;
                return this;
            },
            parseHTML: function parseHTML(str) {
                var range = document.createRange();
                var parse = range.createContextualFragment.bind(range);
                return parse(str);
            },
            parent: function parent() {
                return $($dom.parentNode);
            },
            children: function children(selector) {
                return utils.toArray($dom.childNodes).filter(function (n) {
                    return n.matches && n.matches(selector);
                });
            },
            prepend: function prepend(html) {
                if (typeof html === 'string') {
                    $dom.insertAdjacentHTML("afterbegin", html);
                } else {
                    $dom.insertBefore(html, $dom.firstChild);
                }
                return this;
            },
            append: function append(html) {
                if (typeof html === 'string') {
                    $dom.insertAdjacentHTML("beforeend", html);
                } else {
                    $dom.appendChild(html);
                }
                return this;
            },
            before: function before(html) {
                if (typeof html === 'string') {
                    $dom.insertAdjacentHTML("beforebegin", html);
                } else {
                    if ($dom.parentNode) {
                        $dom.parentNode.insertBefore(html, $dom);
                    }
                }
                return this;
            },
            after: function after(html) {
                if (typeof html === 'string') {
                    $dom.insertAdjacentHTML("afterend", html);
                } else {
                    if ($dom.parentNode) {
                        $dom.parentNode.insertBefore(html, $dom.nextSibling);
                    }
                }
                return this;
            },
            classes: function classes() {
                return $dom.classList;
            },
            hasClass: function hasClass(className) {
                if ($dom.classList) {
                    return $dom.classList.contains(className);
                }
                return false;
            },
            addClass: function addClass(className) {
                if ($dom.classList) {
                    $dom.classList.add(className);
                } else {
                    $dom.className = className;
                }
                return this;
            },
            removeClass: function removeClass(className) {
                if ($dom.classList) {
                    $dom.classList.remove(className);
                }
                return this;
            },
            css: function css(_css) {
                if (typeof _css === 'string') {
                    var win = el.ownerDocument.defaultView;
                    return win.getComputedStyle($dom, null);
                }

                var _loop = function _loop(k) {
                    var v = _css[k];
                    ['left', 'right', 'top', 'bottom', 'width', 'height'].forEach(function (str) {
                        if (~k.indexOf(str) && typeof v === 'number') v += 'px';
                    });
                    if ($dom) {
                        $dom.style[k] = v;
                    }
                };

                for (var k in _css) {
                    _loop(k);
                }
                return this;
            },
            hide: function hide() {
                return this.css({ display: 'none' });
            },
            on: function on(type, cb) {
                if ($dom) {
                    $dom.addEventListener(type, cb);
                    return this;
                }
            },
            isEmpty: function isEmpty() {
                return $dom.innerHTML === '' || $dom.innerHTML === void 0;
            },
            wrap: function wrap(html) {
                $(this.parent()).prepend(html);
                this.parent().firstChild.appendChild(this.dom);
                return this;
            },
            focus: function focus() {
                $dom.focus();
                return this;
            },
            closest: function closest(selector) {
                var el = this.dom;
                var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
                while (el) {
                    if (matchesSelector.call(el, selector)) {
                        return el;
                    } else {
                        el = el.parentElement;
                    }
                }
                return null;
            }
        };
    };

    var ZEditor = function ZEditor(dom, props) {
        var defaultContent = '<p><br></p>';
        var params = {
            content: defaultContent
        };
        for (var k in props) {
            params[k] = props[k];
        }
        var lastNode = void 0;
        var content = params.content;
        // $wrap = $(dom);
        if (!$(dom) || !$(dom).dom) {
            console.error('节点配置不正确。');
            return;
        }
        $(dom).addClass('zeditor-container').html("\n            <div class=\"zeditor-content\" contenteditable=\"true\" ></div>\n            ");
        var $editor = $('.zeditor-content');
        $editor.focus();
        var $editorBtn = $('.zeditor-btn-main');

        var editorBtnHide = function editorBtnHide() {};

        var editorBtnClick = function editorBtnClick(e) {
            // var $p = $('.zeditor-content p:last-child');
            // var $p = $(lastNode);
            if(utils.focusDom() == defaultContent){
                $editor.html();
            }
            window.$p = $(utils.focusDom());
            var type = e.target.dataset.type;
            if (type === 'left' || type === 'center' || type === 'right') {
                $p.css({ 'text-align': type });
            }
            if (type === 'image') {
                params.selectImage && params.selectImage(function (url) {
                    const $p = window.$p;
                    if ($p && $p.parent().dom) {
                        $p.after('<p><image src="' + url + '" class="rich-text-img"/></p>');
                    } else {
                        $editor.append('<p><image src="' + url + '" class="rich-text-img"/></p>');
                    }
                    //$p = $('.zeditor-content p:last-child');
                    //$p = $(lastNode);
                    // $p = $(lastNode);
                });
            }

            $editor.focus();
        };

        var pasteText = function pasteText(txt) {
            var rangeContainer = void 0,
                rangeStart = 0;

            var txtArr = txt.split(/\n/).filter(function (txt) {
                return !!txt;
            });
            if (txtArr.length === 0) return;
            var p = utils.focusDom();
            if ($(p).children('img').length > 0) {
                $(p).after('<p></p>');
                p = p.nextSibling;
            }

            var _utils$range = utils.range(),
                startOffset = _utils$range.startOffset,
                endOffset = _utils$range.endOffset;

            var pHtml = $(p).html().replace(/&nbsp;/g, ' ');
            var newHtml = pHtml.substring(0, startOffset) + txtArr[0] + pHtml.substring(endOffset);
            $(p).html(newHtml.replace(/\s/g, '&nbsp;'));

            rangeContainer = p.firstChild;
            rangeStart = Math.min(startOffset + txtArr[0].length, p.firstChild.length);

            if (txtArr.length > 1) {
                var ps = p.nextSibling;
                $(p).after("<p>" + txtArr.slice(1).join('</p><p>').replace(/\s/g, '&nbsp;') + "</p>");

                if (ps) {
                    rangeContainer = ps.previousSibling.firstChild;
                } else {
                    rangeContainer = p.parentNode.lastChild.firstChild;
                }
                rangeStart = txtArr[txtArr.length - 1].length;
            }

            utils.resetRange(rangeContainer, rangeStart);
        };

        var paste = function paste(e) {
            if (!(e.clipboardData && e.clipboardData.items)) {
                return;
            }

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = e.clipboardData.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;


                    if (item.type === "text/plain") {
                        item.getAsString(pasteText);
                    }
                    if (item.type === "text/html") {
                        item.getAsString(function (html) {
                            var result = html.match(/<p[^\<\>]*?><img\s[^\<\>]*?src=\"([^\<\>]*?)\"\s?[^\<\>]*?\/?><\/p>/);
                            if (result && result.length === 2) {
                                console.log(result[1]);
                                // TODO html img 粘贴
                            }
                        });
                    }
                    // TODO 图片粘贴待实现
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            e.preventDefault();
        };

        var mouseup = function mouseup(e) {
            var p = utils.focusDom();
            var bcr1 = $editor.dom.getBoundingClientRect();
            var bcr2 = p.getBoundingClientRect();
            // $editorBtn.css({
            //     display: 'block',
            //     left: bcr2.x - bcr1.x,
            //     top: bcr2.y - bcr1.y - 30
            // });
        };

        var keyup = function keyup(e) {
            if (e.keyCode === 8 && $editor.isEmpty()) {
                $editor.html(defaultContent);
            }
            editorBtnHide();
        };

        var blur = function blur(e) {
            e.stopPropagation();
            lastNode = utils.focusDom();
        };

        var bindEvent = function bindEvent() {
            $editor.html(content).on('paste', paste).on('mouseup', mouseup).on('keyup', keyup).on('blur', blur);
            $editorBtn.on('click', editorBtnClick);
            document.addEventListener('click', function (e) {
                if (!$(e.target).closest('.zeditor-container')) {
                    editorBtnHide();
                }
            });
        };

        bindEvent();

        return {
            getHtml: function getHtml() {
                return $editor.html();
            }
        };
    }
    window.ZEditor = ZEditor;
})();
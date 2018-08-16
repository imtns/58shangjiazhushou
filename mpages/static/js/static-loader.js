/*eslint-disable */
(function() {
    let LazyLoad = (function(doc) {
        let env,
            head,
            pending = {},
            pollCount = 0,
            queue = { css: [], js: [] },
            styleSheets = doc.styleSheets;
        function createNode(name, attrs) {
            let node = doc.createElement(name),
                attr;

            for (attr in attrs) {
                if (attrs.hasOwnProperty(attr)) {
                    node.setAttribute(attr, attrs[attr]);
                }
            }

            return node;
        }
        function finish(type) {
            let p = pending[type],
                callback,
                urls;

            if (p) {
                callback = p.callback;
                urls = p.urls;

                urls.shift();
                pollCount = 0;
                if (!urls.length) {
                    callback && callback.call(p.context, p.obj);
                    pending[type] = null;
                    queue[type].length && load(type);
                }
            }
        }
        function getEnv() {
            let ua = navigator.userAgent;

            env = {
                async: doc.createElement('script').async === true,
            };

            (env.webkit = /AppleWebKit\//.test(ua)) ||
                (env.ie = /MSIE|Trident/.test(ua)) ||
                (env.opera = /Opera/.test(ua)) ||
                (env.gecko = /Gecko\//.test(ua)) ||
                (env.unknown = true);
        }
        function load(type, urls, callback, obj, context) {
            let _finish = function() {
                    finish(type);
                },
                isCSS = type === 'css',
                nodes = [],
                i,
                len,
                node,
                p,
                pendingUrls,
                url;

            env || getEnv();

            if (urls) {
                urls = typeof urls === 'string' ? [urls] : urls.concat();
                if (isCSS || env.async || env.gecko || env.opera) {
                    queue[type].push({
                        urls: urls,
                        callback: callback,
                        obj: obj,
                        context: context,
                    });
                } else {
                    for (i = 0, len = urls.length; i < len; ++i) {
                        queue[type].push({
                            urls: [urls[i]],
                            callback: i === len - 1 ? callback : null,
                            obj: obj,
                            context: context,
                        });
                    }
                }
            }

            if (pending[type] || !(p = pending[type] = queue[type].shift())) {
                return;
            }

            head || (head = doc.head || doc.getElementsByTagName('head')[0]);
            pendingUrls = p.urls.concat();

            for (i = 0, len = pendingUrls.length; i < len; ++i) {
                url = pendingUrls[i];

                if (isCSS) {
                    node = env.gecko
                        ? createNode('style')
                        : createNode('link', {
                            href: url,
                            rel: 'stylesheet',
                        });
                } else {
                    node = createNode('script', { src: url });
                    node.async = false;
                }

                node.className = 'lazyload';
                node.setAttribute('charset', 'utf-8');

                if (
                    env.ie &&
                    !isCSS &&
                    'onreadystatechange' in node &&
                    !('draggable' in node)
                ) {
                    node.onreadystatechange = function() {
                        if (/loaded|complete/.test(node.readyState)) {
                            node.onreadystatechange = null;
                            _finish();
                        }
                    };
                } else if (isCSS && (env.gecko || env.webkit)) {
                    if (env.webkit) {
                        p.urls[i] = node.href;
                        pollWebKit();
                    } else {
                        node.innerHTML = `@import "${  url  }";`;
                        pollGecko(node);
                    }
                } else {
                    node.onload = node.onerror = _finish;
                }

                nodes.push(node);
            }

            for (i = 0, len = nodes.length; i < len; ++i) {
                head.appendChild(nodes[i]);
            }
        }

        function pollGecko(node) {
            let hasRules;

            try {
                hasRules = !!node.sheet.cssRules;
            } catch (ex) {
                pollCount += 1;

                if (pollCount < 200) {
                    setTimeout(() => {
                        pollGecko(node);
                    }, 50);
                } else {
                    hasRules && finish('css');
                }

                return;
            }

            finish('css');
        }

        function pollWebKit() {
            let css = pending.css,
                i;

            if (css) {
                i = styleSheets.length;

                while (--i >= 0) {
                    if (styleSheets[i].href === css.urls[0]) {
                        finish('css');
                        break;
                    }
                }

                pollCount += 1;

                if (css) {
                    if (pollCount < 200) {
                        setTimeout(pollWebKit, 50);
                    } else {
                        finish('css');
                    }
                }
            }
        }

        return {
            css(urls, callback, obj, context) {
                load("css", urls, callback, obj, context);
            },

            js(urls, callback, obj, context) {
                load("js", urls, callback, obj, context);
            },
        };
    }(this.document));

    LazyLoad.js(`${window.__staticConfigUrl  }?${  (+new Date()).toString(36)}`, () => {
        var sc = window.__staticConfig,
            jsCfg = sc.jsCfg,
            jsCdn = sc.jsCdn || '//j1.58cdn.com.cn',
            cssCfg = sc.cssCfg,
            cssCdn = sc.cssCdn || '//c.58cdn.com.cn';
        for (var n in jsCfg) {
            var js = jsCfg[n];
            LazyLoad.js(jsCdn + js.url + "?" + js.version);
        }
        for (var n in cssCfg) {
            var css = cssCfg[n];
            LazyLoad.css(cssCdn + css.url + "?" + css.version);
        }
    });
}());

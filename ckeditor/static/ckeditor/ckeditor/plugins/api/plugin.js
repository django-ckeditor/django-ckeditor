/**
 * API Plugin
 *
 * @author Ayhan Akilli
 */
'use strict';

(function (window, document, CKEDITOR) {
    /**
     * Defaults
     */
    var defaults = {
        browser: {
            name: 'browser',
            opts: 'alwaysRaised=yes,dependent=yes,height=' + window.screen.height + ',location=no,menubar=no,' +
                'minimizable=no,modal=yes,resizable=yes,scrollbars=yes,toolbar=no,width=' + window.screen.width
        },
        container: ['hbox', 'vbox', 'fieldset'],
        media: {
            audio: {
                element: 'audio',
                mime: [
                    'audio/aac', 'audio/flac', 'audio/mp3', 'audio/mpeg', 'audio/mpeg3', 'audio/ogg', 'audio/wav', 'audio/wave', 'audio/webm',
                    'audio/x-aac', 'audio/x-flac', 'audio/x-mp3', 'audio/x-mpeg', 'audio/x-mpeg3', 'audio/x-pn-wav', 'audio/x-wav'
                ]
            },
            iframe: {
                element: 'iframe',
                mime: ['text/html']
            },
            image: {
                element: 'img',
                mime: ['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/webp']
            },
            video: {
                element: 'video',
                mime: ['video/mp4', 'video/ogg', 'video/webm']
            }
        }
    };

    /**
     * Plugin
     */
    CKEDITOR.plugins.add('api', {});

    /**
     * Public API
     *
     * @class
     * @singleton
     */
    CKEDITOR.api = {
        /**
         * Opens a browser window with given name and executes given callback function when a message from the browser
         * window is received and closes the browser window
         *
         * @param {String} url
         * @param {Function} call
         * @param {String} [name = "browser"]
         * @param {String} [opts = null]
         */
        browser: function (url, call, name, opts) {
            if (!url || typeof call !== 'function') {
                return;
            }

            var win = window.open(url, name || defaults.browser.name, opts || defaults.browser.opts);
            var origin = CKEDITOR.api.url.origin(url);

            window.addEventListener('message', function (ev) {
                if (ev.origin === origin && ev.source === win) {
                    call(ev.data);
                    win.close();
                }
            }, false);
        },

        /**
         * Applies a callback function on all UI elements in given dialog definition
         *
         * @param {CKEDITOR.dialog.definition} def
         * @param {Function} call
         */
        dialog: function (def, call) {
            if (def.hasOwnProperty('contents') && Array.isArray(def.contents) && def.contents.length > 0 && typeof call === 'function') {
                def.contents.forEach(function (item) {
                    if (!!item && Array.isArray(item.elements) && item.elements.length > 0) {
                        dialogApply(item.elements, call);
                    }
                });
            }
        },

        /**
         * Media API
         */
        media: {
            /**
             * Returns all type names
             *
             * @return {String[]}
             */
            all: function () {
                return Object.getOwnPropertyNames(defaults.media);
            },

            /**
             * Determines type from HTML element
             *
             * @param {String} element
             *
             * @return {String|null}
             */
            fromElement: function (element) {
                var types = Object.getOwnPropertyNames(defaults.media);
                var l = types.length;

                for (var i = 0; i < l; ++i) {
                    if (defaults.media[types[i]].element === element) {
                        return types[i];
                    }
                }

                return null;
            },

            /**
             * Determines type from URL by trying to map the content
             *
             * @param {String} url
             *
             * @return {String|null}
             */
            fromUrl: function (url) {
                var header = CKEDITOR.api.xhr.head(url, {'content-type': null});

                if (!!header && !!header['content-type']) {
                    var type = header['content-type'].split(';')[0].trim();
                    var types = Object.getOwnPropertyNames(defaults.media);
                    var l = types.length;

                    for (var i = 0; i < l; ++i) {
                        if (defaults.media[types[i]].mime.indexOf(type) >= 0) {
                            return types[i];
                        }
                    }
                }

                return null;
            },

            /**
             * Returns HTML element for given type
             *
             * @param {String} type
             *
             * @return {String|null}
             */
            element: function (type) {
                return defaults.media.hasOwnProperty(type) ? defaults.media[type].element : null;
            }
        },

        /**
         * Parser API
         */
        parser: {
            /**
             * Adds element to parent at given index if it is not removable and returns true if element was added or
             * false otherwise
             *
             * @param {CKEDITOR.htmlParser.element} el
             * @param {CKEDITOR.htmlParser.element} parent
             * @param {Number} [index = null]
             *
             * @return {Boolean}
             */
            add: function (el, parent, index) {
                if (!!el && !CKEDITOR.api.parser.removable(el)) {
                    parent.add(el, index);
                    return true;
                }

                return false;
            },

            /**
             * Removes element if it's not an empty element and its inner HTML is empty and returns true if element was
             * removed or false otherwise
             *
             * @param {CKEDITOR.htmlParser.element} el
             *
             * @return {Boolean}
             */
            remove: function (el) {
                if (!!el && CKEDITOR.api.parser.removable(el)) {
                    el.remove();
                    return true;
                }

                return false;
            },

            /**
             * Indicates if element is removable because it is not en empty element and its inner HTML is empty
             *
             * @param {CKEDITOR.htmlParser.element} el
             *
             * @return {Boolean}
             */
            removable: function (el) {
                return !!el && (el.type !== CKEDITOR.NODE_ELEMENT || !CKEDITOR.dtd.$empty[el.name] && !el.getHtml().trim());
            },

            /**
             * Checks if element has one of given CSS classes set and returns first found class
             *
             * @param {CKEDITOR.htmlParser.element} el
             * @param {String[]} classes
             *
             * @return {String|null}
             */
            hasClass: function (el, classes) {
                if (!el || !el.hasOwnProperty('attributes') || !el.attributes.hasOwnProperty('class') || !Array.isArray(classes)) {
                    return null;
                }

                var match = el.attributes.class.match(new RegExp('(?:^| )(' + classes.join('|') + ')(?:$| )', 'g'));

                return !!match ? match[0] : null;
            },

            /**
             * Checks if element is a media `figure` or media element and returns the media type or null otherwise
             *
             * @param {CKEDITOR.htmlParser.element} el
             *
             * @return {String|null}
             */
            isMedia: function (el) {
                var type = CKEDITOR.api.parser.isMediaElement(el);

                if (!type || !!el.getAscendant(CKEDITOR.api.parser.isMediaFigure)) {
                    type = CKEDITOR.api.parser.isMediaFigure(el);
                }

                return type;
            },

            /**
             * Checks if element is a media `figure`, i.e. has one of the CSS classes corresponding to a media type, and
             * returns the media type or null otherwise
             *
             * @param {CKEDITOR.htmlParser.element} el
             *
             * @return {String|null}
             */
            isMediaFigure: function (el) {
                if (!!el && el.name === 'figure') {
                    return CKEDITOR.api.parser.hasClass(el, Object.getOwnPropertyNames(defaults.media));
                }

                return null;
            },

            /**
             * Checks if given element is a media element and returns the media type or null otherwise
             *
             * @param {CKEDITOR.htmlParser.element} el
             *
             * @return {String|null}
             */
            isMediaElement: function (el) {
                return !!el ? CKEDITOR.api.media.fromElement(el.name) : null;
            },

            /**
             * Checks if given element is a link with a media element as only child and returns media type or null
             * otherwise
             *
             * @param {CKEDITOR.htmlParser.element} el
             *
             * @return {String|null}
             */
            isMediaLink: function (el) {
                if (!!el && el.name === 'a' && el.children.length === 1) {
                    return CKEDITOR.api.parser.isMediaElement(el.children[0]);
                }

                return null;
            }
        },

        /**
         * URL API
         */
        url: {
            /**
             * Returns origin from given URL
             *
             * @param {String} url
             *
             * @return {String}
             */
            origin: function (url) {
                var a = document.createElement('a');
                a.href = url;

                return a.origin;
            },

            /**
             * Transforms given URL to a root-relative or absolute URL depending on its origin
             *
             * @param {String} url
             *
             * @return {String}
             */
            root: function (url) {
                var a = document.createElement('a');
                a.href = url;

                return a.origin === (window.origin || window.location.origin) ? a.pathname : a.href;
            }
        },

        /**
         * XMLHttpRequest API
         */
        xhr: {
            /**
             * Sends a XMLHttpRequest with the DELETE method
             *
             * @param {String} url
             *
             * @return {String|null}
             */
            delete: function (url) {
                return request('DELETE', url);
            },

            /**
             * Sends a XMLHttpRequest with the GET method
             *
             * @param {String} url
             *
             * @return {String|null}
             */
            get: function (url) {
                return request('GET', url);
            },

            /**
             * Sends a XMLHttpRequest with the HEAD method and returns given response headers as an object
             *
             * @param {String} url
             * @param {Object} header
             *
             * @return {Object|null}
             */
            head: function (url, header) {
                return request('HEAD', url, null, header);
            },

            /**
             * Sends a XMLHttpRequest with the POST method
             *
             * @param {String} url
             * @param {String} body
             * @param {Object} [header = null]
             *
             * @return {String|null}
             */
            post: function (url, body, header) {
                return request('POST', url, body, header);
            },

            /**
             * Sends a XMLHttpRequest with the PUT method
             *
             * @param {String} url
             * @param {String} body
             * @param {Object} [header = null]
             *
             * @return {String|null}
             */
            put: function (url, body, header) {
                return request('PUT', url, body, header);
            }
        }
    };

    /**
     * Sends a XMLHttpRequest with given method and returns the response as text
     *
     * @param {String} method
     * @param {String} url
     * @param {String|null} [body = null]
     * @param {Object|null} [header = {}]
     *
     * @return {Object|string|null}
     */
     function request(method, url, body, header) {
        if (!method || !url || method === 'HEAD' && typeof header === 'undefined') {
            return null;
        }

        body = typeof body === 'undefined' ? null : body;
        header = typeof header === 'undefined' || header !== Object(header) ? {} : header;
        var xhr = new XMLHttpRequest();

        if (method !== 'HEAD') {
            Object.getOwnPropertyNames(header).forEach(function (name) {
                xhr.setRequestHeader(name, header[name]);
            });
        }

        try {
            xhr.open(method, url, false);
            xhr.send(body);

            if (xhr.readyState === xhr.DONE && xhr.status >= 200 && xhr.status < 300) {
                if (method !== 'HEAD') {
                    return xhr.responseText;
                }

                Object.getOwnPropertyNames(header).forEach(function (name) {
                    header[name] = xhr.getResponseHeader(name);
                });
                return header;
            }
        } catch (e) {
            console.log(e);
        }

        return null;
    }

    /**
     * Recursively finds all UI elements considering container elements and applies given callback function on them
     *
     * @param {CKEDITOR.dialog.definition.uiElement[]} items
     * @param {Function} call
     */
    function dialogApply(items, call) {
        if (Array.isArray(items) && typeof call === 'function') {
            items.forEach(function (item) {
                if (item.hasOwnProperty('type') && defaults.container.indexOf(item.type) >= 0) {
                    dialogApply(item.children, call);
                } else {
                    call(item);
                }
            });
        }
    }
})(window, document, CKEDITOR);

window.Modernizr=function(e,t,n){function r(e){g.cssText=e}function o(e,t){return typeof e===t}function i(e,t){return!!~(""+e).indexOf(t)}function a(e,t){for(var r in e){var o=e[r];if(!i(o,"-")&&g[o]!==n)return"pfx"==t?o:!0}return!1}function c(e,t,r){for(var i in e){var a=t[e[i]];if(a!==n)return r===!1?e[i]:o(a,"function")?a.bind(r||t):a}return!1}function s(e,t,n){var r=e.charAt(0).toUpperCase()+e.slice(1),i=(e+" "+T.join(r+" ")+r).split(" ");return o(t,"string")||o(t,"undefined")?a(i,t):(i=(e+" "+S.join(r+" ")+r).split(" "),c(i,t,n))}var u,l,f,d="2.7.1",p={},m=!0,y=t.documentElement,h="modernizr",v=t.createElement(h),g=v.style,b=":)",w=({}.toString," -webkit- -moz- -o- -ms- ".split(" ")),x="Webkit Moz O ms",T=x.split(" "),S=x.toLowerCase().split(" "),j={svg:"http://www.w3.org/2000/svg"},E={},z=[],P=z.slice,C=function(e,n,r,o){var i,a,c,s,u=t.createElement("div"),l=t.body,f=l||t.createElement("body");if(parseInt(r,10))for(;r--;)c=t.createElement("div"),c.id=o?o[r]:h+(r+1),u.appendChild(c);return i=["&#173;",'<style id="s',h,'">',e,"</style>"].join(""),u.id=h,(l?u:f).innerHTML+=i,f.appendChild(u),l||(f.style.background="",f.style.overflow="hidden",s=y.style.overflow,y.style.overflow="hidden",y.appendChild(f)),a=n(u,e),l?u.parentNode.removeChild(u):(f.parentNode.removeChild(f),y.style.overflow=s),!!a},M=function(t){var n=e.matchMedia||e.msMatchMedia;if(n)return n(t).matches;var r;return C("@media "+t+" { #"+h+" { position: absolute; } }",function(t){r="absolute"==(e.getComputedStyle?getComputedStyle(t,null):t.currentStyle).position}),r},k=function(){function e(e,i){i=i||t.createElement(r[e]||"div"),e="on"+e;var a=e in i;return a||(i.setAttribute||(i=t.createElement("div")),i.setAttribute&&i.removeAttribute&&(i.setAttribute(e,""),a=o(i[e],"function"),o(i[e],"undefined")||(i[e]=n),i.removeAttribute(e))),i=null,a}var r={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return e}(),A={}.hasOwnProperty;f=o(A,"undefined")||o(A.call,"undefined")?function(e,t){return t in e&&o(e.constructor.prototype[t],"undefined")}:function(e,t){return A.call(e,t)},Function.prototype.bind||(Function.prototype.bind=function(e){var t=this;if("function"!=typeof t)throw new TypeError;var n=P.call(arguments,1),r=function(){if(this instanceof r){var o=function(){};o.prototype=t.prototype;var i=new o,a=t.apply(i,n.concat(P.call(arguments)));return Object(a)===a?a:i}return t.apply(e,n.concat(P.call(arguments)))};return r}),E.flexbox=function(){return s("flexWrap")},E.flexboxlegacy=function(){return s("boxDirection")},E.touch=function(){var n;return"ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch?n=!0:C(["@media (",w.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(e){n=9===e.offsetTop}),n},E.backgroundsize=function(){return s("backgroundSize")},E.cssanimations=function(){return s("animationName")},E.cssgradients=function(){var e="background-image:",t="gradient(linear,left top,right bottom,from(#9f9),to(white));",n="linear-gradient(left top,#9f9, white);";return r((e+"-webkit- ".split(" ").join(t+e)+w.join(n+e)).slice(0,-e.length)),i(g.backgroundImage,"gradient")},E.csstransforms=function(){return!!s("transform")},E.csstransforms3d=function(){var e=!!s("perspective");return e&&"webkitPerspective"in y.style&&C("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(t){e=9===t.offsetLeft&&3===t.offsetHeight}),e},E.csstransitions=function(){return s("transition")},E.fontface=function(){var e;return C('@font-face {font-family:"font";src:url("https://")}',function(n,r){var o=t.getElementById("smodernizr"),i=o.sheet||o.styleSheet,a=i?i.cssRules&&i.cssRules[0]?i.cssRules[0].cssText:i.cssText||"":"";e=/src/i.test(a)&&0===a.indexOf(r.split(" ")[0])}),e},E.generatedcontent=function(){var e;return C(["#",h,"{font:0/0 a}#",h,':after{content:"',b,'";visibility:hidden;font:3px/1 a}'].join(""),function(t){e=t.offsetHeight>=3}),e},E.video=function(){var e=t.createElement("video"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),n.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),n.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""))}catch(r){}return n},E.audio=function(){var e=t.createElement("audio"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),n.mp3=e.canPlayType("audio/mpeg;").replace(/^no$/,""),n.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),n.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(r){}return n},E.localstorage=function(){try{return localStorage.setItem(h,h),localStorage.removeItem(h),!0}catch(e){return!1}},E.svg=function(){return!!t.createElementNS&&!!t.createElementNS(j.svg,"svg").createSVGRect};for(var O in E)f(E,O)&&(l=O.toLowerCase(),p[l]=E[O](),z.push((p[l]?"":"no-")+l));return p.addTest=function(e,t){if("object"==typeof e)for(var r in e)f(e,r)&&p.addTest(r,e[r]);else{if(e=e.toLowerCase(),p[e]!==n)return p;t="function"==typeof t?t():t,"undefined"!=typeof m&&m&&(y.className+=" "+(t?"":"no-")+e),p[e]=t}return p},r(""),v=u=null,p._version=d,p._prefixes=w,p._domPrefixes=S,p._cssomPrefixes=T,p.mq=M,p.hasEvent=k,p.testProp=function(e){return a([e])},p.testAllProps=s,p.testStyles=C,p.prefixed=function(e,t,n){return t?s(e,t,n):s(e,"pfx")},y.className=y.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(m?" js "+z.join(" "):""),p}(this,this.document),function(e,t,n){function r(e){return"[object Function]"==h.call(e)}function o(e){return"string"==typeof e}function i(){}function a(e){return!e||"loaded"==e||"complete"==e||"uninitialized"==e}function c(){var e=v.shift();g=1,e?e.t?m(function(){("c"==e.t?d.injectCss:d.injectJs)(e.s,0,e.a,e.x,e.e,1)},0):(e(),c()):g=0}function s(e,n,r,o,i,s,u){function l(t){if(!p&&a(f.readyState)&&(b.r=p=1,!g&&c(),f.onload=f.onreadystatechange=null,t)){"img"!=e&&m(function(){x.removeChild(f)},50);for(var r in z[n])z[n].hasOwnProperty(r)&&z[n][r].onload()}}var u=u||d.errorTimeout,f=t.createElement(e),p=0,h=0,b={t:r,s:n,e:i,a:s,x:u};1===z[n]&&(h=1,z[n]=[]),"object"==e?f.data=n:(f.src=n,f.type=e),f.width=f.height="0",f.onerror=f.onload=f.onreadystatechange=function(){l.call(this,h)},v.splice(o,0,b),"img"!=e&&(h||2===z[n]?(x.insertBefore(f,w?null:y),m(l,u)):z[n].push(f))}function u(e,t,n,r,i){return g=0,t=t||"j",o(e)?s("c"==t?S:T,e,t,this.i++,n,r,i):(v.splice(this.i++,0,e),1==v.length&&c()),this}function l(){var e=d;return e.loader={load:u,i:0},e}var f,d,p=t.documentElement,m=e.setTimeout,y=t.getElementsByTagName("script")[0],h={}.toString,v=[],g=0,b="MozAppearance"in p.style,w=b&&!!t.createRange().compareNode,x=w?p:y.parentNode,p=e.opera&&"[object Opera]"==h.call(e.opera),p=!!t.attachEvent&&!p,T=b?"object":p?"script":"img",S=p?"script":T,j=Array.isArray||function(e){return"[object Array]"==h.call(e)},E=[],z={},P={timeout:function(e,t){return t.length&&(e.timeout=t[0]),e}};d=function(e){function t(e){var t,n,r,e=e.split("!"),o=E.length,i=e.pop(),a=e.length,i={url:i,origUrl:i,prefixes:e};for(n=0;a>n;n++)r=e[n].split("="),(t=P[r.shift()])&&(i=t(i,r));for(n=0;o>n;n++)i=E[n](i);return i}function a(e,o,i,a,c){var s=t(e),u=s.autoCallback;s.url.split(".").pop().split("?").shift(),s.bypass||(o&&(o=r(o)?o:o[e]||o[a]||o[e.split("/").pop().split("?")[0]]),s.instead?s.instead(e,o,i,a,c):(z[s.url]?s.noexec=!0:z[s.url]=1,i.load(s.url,s.forceCSS||!s.forceJS&&"css"==s.url.split(".").pop().split("?").shift()?"c":n,s.noexec,s.attrs,s.timeout),(r(o)||r(u))&&i.load(function(){l(),o&&o(s.origUrl,c,a),u&&u(s.origUrl,c,a),z[s.url]=2})))}function c(e,t){function n(e,n){if(e){if(o(e))n||(f=function(){var e=[].slice.call(arguments);d.apply(this,e),p()}),a(e,f,t,0,u);else if(Object(e)===e)for(s in c=function(){var t,n=0;for(t in e)e.hasOwnProperty(t)&&n++;return n}(),e)e.hasOwnProperty(s)&&(!n&&!--c&&(r(f)?f=function(){var e=[].slice.call(arguments);d.apply(this,e),p()}:f[s]=function(e){return function(){var t=[].slice.call(arguments);e&&e.apply(this,t),p()}}(d[s])),a(e[s],f,t,s,u))}else!n&&p()}var c,s,u=!!e.test,l=e.load||e.both,f=e.callback||i,d=f,p=e.complete||i;n(u?e.yep:e.nope,!!l),l&&n(l)}var s,u,f=this.yepnope.loader;if(o(e))a(e,0,f,0);else if(j(e))for(s=0;s<e.length;s++)u=e[s],o(u)?a(u,0,f,0):j(u)?d(u):Object(u)===u&&c(u,f);else Object(e)===e&&c(e,f)},d.addPrefix=function(e,t){P[e]=t},d.addFilter=function(e){E.push(e)},d.errorTimeout=1e4,null==t.readyState&&t.addEventListener&&(t.readyState="loading",t.addEventListener("DOMContentLoaded",f=function(){t.removeEventListener("DOMContentLoaded",f,0),t.readyState="complete"},0)),e.yepnope=l(),e.yepnope.executeStack=c,e.yepnope.injectJs=function(e,n,r,o,s,u){var l,f,p=t.createElement("script"),o=o||d.errorTimeout;p.src=e;for(f in r)p.setAttribute(f,r[f]);n=u?c:n||i,p.onreadystatechange=p.onload=function(){!l&&a(p.readyState)&&(l=1,n(),p.onload=p.onreadystatechange=null)},m(function(){l||(l=1,n(1))},o),s?p.onload():y.parentNode.insertBefore(p,y)},e.yepnope.injectCss=function(e,n,r,o,a,s){var u,o=t.createElement("link"),n=s?c:n||i;o.href=e,o.rel="stylesheet",o.type="text/css";for(u in r)o.setAttribute(u,r[u]);a||(y.parentNode.insertBefore(o,y),m(n,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))},Modernizr.addTest("boxsizing",function(){return Modernizr.testAllProps("boxSizing")&&(void 0===document.documentMode||document.documentMode>7)}),Modernizr.addTest("mediaqueries",Modernizr.mq("only all")),Modernizr.addTest("cssvhunit",function(){var e;return Modernizr.testStyles("#modernizr { height: 50vh; }",function(t){var n=parseInt(window.innerHeight/2,10),r=parseInt((window.getComputedStyle?getComputedStyle(t,null):t.currentStyle).height,10);e=r==n}),e});;
/**
*  Ajax Autocomplete for jQuery, version 1.2.14
*  (c) 2014 Tomas Kirda
*
*  Ajax Autocomplete for jQuery is freely distributable under the terms of an MIT-style license.
*  For details, see the web site: https://github.com/devbridge/jQuery-Autocomplete
*/

/*jslint  browser: true, white: true, plusplus: true */
/*global define, window, document, jQuery, exports */

// Expose plugin as an AMD module if AMD loader is present:
(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object' && typeof require === 'function') {
        // Browserify
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    'use strict';

    var
        utils = (function () {
            return {
                escapeRegExChars: function (value) {
                    return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                },
                createNode: function (containerClass) {
                    var div = document.createElement('div');
                    div.className = containerClass;
                    div.style.position = 'absolute';
                    div.style.display = 'none';
                    return div;
                }
            };
        }()),

        keys = {
            ESC: 27,
            TAB: 9,
            RETURN: 13,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40
        };

    function Autocomplete(el, options) {
        var noop = function () { },
            that = this,
            defaults = {
                ajaxSettings: {},
                autoSelectFirst: false,
                appendTo: document.body,
                serviceUrl: null,
                lookup: null,
                onSelect: null,
                width: 'auto',
                minChars: 1,
                maxHeight: 300,
                deferRequestBy: 0,
                params: {},
                formatResult: Autocomplete.formatResult,
                delimiter: null,
                zIndex: 9999,
                type: 'GET',
                noCache: false,
                onSearchStart: noop,
                onSearchComplete: noop,
                onSearchError: noop,
                containerClass: 'autocomplete-suggestions',
                tabDisabled: false,
                dataType: 'text',
                currentRequest: null,
                triggerSelectOnValidInput: true,
                preventBadQueries: true,
                lookupFilter: function (suggestion, originalQuery, queryLowerCase) {
                    return suggestion.value.toLowerCase().indexOf(queryLowerCase) !== -1;
                },
                paramName: 'query',
                transformResult: function (response) {
                    return typeof response === 'string' ? $.parseJSON(response) : response;
                },
                showNoSuggestionNotice: false,
                noSuggestionNotice: 'No results',
                orientation: 'bottom',
                forceFixPosition: false,
                replaceQueryWithSuggestion: true
            };

        // Shared variables:
        that.element = el;
        that.el = $(el);
        that.suggestions = [];
        that.badQueries = [];
        that.selectedIndex = -1;
        that.currentValue = that.element.value;
        that.intervalId = 0;
        that.cachedResponse = {};
        that.onChangeInterval = null;
        that.onChange = null;
        that.isLocal = false;
        that.suggestionsContainer = null;
        that.noSuggestionsContainer = null;
        that.options = $.extend({}, defaults, options);
        that.classes = {
            selected: 'autocomplete-selected',
            suggestion: 'autocomplete-suggestion'
        };
        that.hint = null;
        that.hintValue = '';
        that.selection = null;

        // Initialize and set options:
        that.initialize();
        that.setOptions(options);
    }

    Autocomplete.utils = utils;

    $.Autocomplete = Autocomplete;

    Autocomplete.formatResult = function (suggestion, currentValue) {
        var pattern = '(' + utils.escapeRegExChars(currentValue) + ')';

        return suggestion.value.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>');
    };

    Autocomplete.prototype = {

        killerFn: null,

        initialize: function () {
            var that = this,
                suggestionSelector = '.' + that.classes.suggestion,
                selected = that.classes.selected,
                options = that.options,
                container;

            // Remove autocomplete attribute to prevent native suggestions:
            that.element.setAttribute('autocomplete', 'off');

            that.killerFn = function (e) {
                if ($(e.target).closest('.' + that.options.containerClass).length === 0) {
                    that.killSuggestions();
                    that.disableKillerFn();
                }
            };

            // html() deals with many types: htmlString or Element or Array or jQuery
            that.noSuggestionsContainer = $('<div class="autocomplete-no-suggestion"></div>')
                                          .html(this.options.noSuggestionNotice).get(0);

            that.suggestionsContainer = Autocomplete.utils.createNode(options.containerClass);

            container = $(that.suggestionsContainer);

            container.appendTo(options.appendTo);

            // Only set width if it was provided:
            if (options.width !== 'auto') {
                container.width(options.width);
            }

            // Listen for mouse over event on suggestions list:
            container.on('mouseover.autocomplete', suggestionSelector, function () {
                that.activate($(this).data('index'));
            });

            // Deselect active element when mouse leaves suggestions container:
            container.on('mouseout.autocomplete', function () {
                that.selectedIndex = -1;
                container.children('.' + selected).removeClass(selected);
            });

            // Listen for click event on suggestions list:
            container.on('click.autocomplete', suggestionSelector, function () {
                that.select($(this).data('index'));
            });

            that.fixPositionCapture = function () {
                if (that.visible) {
                    that.fixPosition();
                }
            };

            $(window).on('resize.autocomplete', that.fixPositionCapture);

            that.el.on('keydown.autocomplete', function (e) { that.onKeyPress(e); });
            that.el.on('keyup.autocomplete', function (e) { that.onKeyUp(e); });
            that.el.on('blur.autocomplete', function () { that.onBlur(); });
            that.el.on('focus.autocomplete', function () { that.onFocus(); });
            that.el.on('change.autocomplete', function (e) { that.onKeyUp(e); });
        },

        onFocus: function () {
            var that = this;
            that.fixPosition();
            if (that.options.minChars <= that.el.val().length) {
                that.onValueChange();
            }
        },

        onBlur: function () {
            this.enableKillerFn();
        },

        setOptions: function (suppliedOptions) {
            var that = this,
                options = that.options;

            $.extend(options, suppliedOptions);

            that.isLocal = $.isArray(options.lookup);

            if (that.isLocal) {
                options.lookup = that.verifySuggestionsFormat(options.lookup);
            }

            options.orientation = that.validateOrientation(options.orientation, 'bottom');

            // Adjust height, width and z-index:
            $(that.suggestionsContainer).css({
                'max-height': options.maxHeight + 'px',
                'width': options.width + 'px',
                'z-index': options.zIndex
            });
        },


        clearCache: function () {
            this.cachedResponse = {};
            this.badQueries = [];
        },

        clear: function () {
            this.clearCache();
            this.currentValue = '';
            this.suggestions = [];
        },

        disable: function () {
            var that = this;
            that.disabled = true;
            clearInterval(that.onChangeInterval);
            if (that.currentRequest) {
                that.currentRequest.abort();
            }
        },

        enable: function () {
            this.disabled = false;
        },

        fixPosition: function () {
            // Use only when container has already its content

            var that = this,
                $container = $(that.suggestionsContainer),
                containerParent = $container.parent().get(0);
            // Fix position automatically when appended to body.
            // In other cases force parameter must be given.
            if (containerParent !== document.body && !that.options.forceFixPosition)
                return;

            // Choose orientation
            var orientation = that.options.orientation,
                containerHeight = $container.outerHeight(),
                height = that.el.outerHeight(),
                offset = that.el.offset(),
                styles = { 'top': offset.top, 'left': offset.left };

            if (orientation == 'auto') {
                var viewPortHeight = $(window).height(),
                    scrollTop = $(window).scrollTop(),
                    topOverflow = -scrollTop + offset.top - containerHeight,
                    bottomOverflow = scrollTop + viewPortHeight - (offset.top + height + containerHeight);

                orientation = (Math.max(topOverflow, bottomOverflow) === topOverflow) ? 'top' : 'bottom';
            }

            if (orientation === 'top') {
                styles.top += -containerHeight;
            } else {
                styles.top += height;
            }

            // If container is not positioned to body,
            // correct its position using offset parent offset
            if(containerParent !== document.body) {
                var opacity = $container.css('opacity'),
                    parentOffsetDiff;

                    if (!that.visible){
                        $container.css('opacity', 0).show();
                    }

                parentOffsetDiff = $container.offsetParent().offset();
                styles.top -= parentOffsetDiff.top;
                styles.left -= parentOffsetDiff.left;

                if (!that.visible){
                    $container.css('opacity', opacity).hide();
                }
            }

            // -2px to account for suggestions border.
            if (that.options.width === 'auto') {
                styles.width = (that.el.outerWidth() - 2) + 'px';
            }

            $container.css(styles);
        },

        enableKillerFn: function () {
            var that = this;
            $(document).on('click.autocomplete', that.killerFn);
        },

        disableKillerFn: function () {
            var that = this;
            $(document).off('click.autocomplete', that.killerFn);
        },

        killSuggestions: function () {
            var that = this;
            that.stopKillSuggestions();
            that.intervalId = window.setInterval(function () {
                that.hide();
                that.stopKillSuggestions();
            }, 50);
        },

        stopKillSuggestions: function () {
            window.clearInterval(this.intervalId);
        },

        isCursorAtEnd: function () {
            var that = this,
                valLength = that.el.val().length,
                selectionStart = that.element.selectionStart,
                range;

            if (typeof selectionStart === 'number') {
                return selectionStart === valLength;
            }
            if (document.selection) {
                range = document.selection.createRange();
                range.moveStart('character', -valLength);
                return valLength === range.text.length;
            }
            return true;
        },

        onKeyPress: function (e) {
            var that = this;

            // If suggestions are hidden and user presses arrow down, display suggestions:
            if (!that.disabled && !that.visible && e.which === keys.DOWN && that.currentValue) {
                that.suggest();
                return;
            }

            if (that.disabled || !that.visible) {
                return;
            }

            switch (e.which) {
                case keys.ESC:
                    that.el.val(that.currentValue);
                    that.hide();
                    break;
                case keys.RIGHT:
                    if (that.hint && that.options.onHint && that.isCursorAtEnd()) {
                        that.selectHint();
                        break;
                    }
                    return;
                case keys.TAB:
                    if (that.hint && that.options.onHint) {
                        that.selectHint();
                        return;
                    }
                    /* falls through */
                case keys.RETURN:
                    if (that.selectedIndex === -1) {
                        that.hide();
                        return;
                    }
                    that.select(that.selectedIndex);
                    if (e.which === keys.TAB && that.options.tabDisabled === false) {
                        return;
                    }
                    break;
                case keys.UP:
                    that.moveUp();
                    break;
                case keys.DOWN:
                    that.moveDown();
                    break;
                default:
                    return;
            }

            // Cancel event if function did not return:
            e.stopImmediatePropagation();
            e.preventDefault();
        },

        onKeyUp: function (e) {
            var that = this;

            if (that.disabled) {
                return;
            }

            switch (e.which) {
                case keys.UP:
                case keys.DOWN:
                    return;
            }

            clearInterval(that.onChangeInterval);

            if (that.currentValue !== that.el.val()) {
                that.findBestHint();
                if (that.options.deferRequestBy > 0) {
                    // Defer lookup in case when value changes very quickly:
                    that.onChangeInterval = setInterval(function () {
                        that.onValueChange();
                    }, that.options.deferRequestBy);
                } else {
                    that.onValueChange();
                }
            }
        },

        onValueChange: function () {
            var that = this,
                options = that.options,
                value = that.el.val(),
                query = that.getQuery(value),
                index;

            if (that.selection && that.currentValue !== query) {
                that.selection = null;
                (options.onInvalidateSelection || $.noop).call(that.element);
            }

            clearInterval(that.onChangeInterval);
            that.currentValue = value;
            that.selectedIndex = -1;

            // Check existing suggestion for the match before proceeding:
            if (options.triggerSelectOnValidInput) {
                index = that.findSuggestionIndex(query);
                if (index !== -1) {
                    that.select(index);
                    return;
                }
            }

            if (query.length < options.minChars) {
                that.hide();
            } else {
                that.getSuggestions(query);
            }
        },

        findSuggestionIndex: function (query) {
            var that = this,
                index = -1,
                queryLowerCase = query.toLowerCase();

            $.each(that.suggestions, function (i, suggestion) {
                if (suggestion.value.toLowerCase() === queryLowerCase) {
                    index = i;
                    return false;
                }
            });

            return index;
        },

        getQuery: function (value) {
            var delimiter = this.options.delimiter,
                parts;

            if (!delimiter) {
                return value;
            }
            parts = value.split(delimiter);
            return $.trim(parts[parts.length - 1]);
        },

        getSuggestionsLocal: function (query) {
            var that = this,
                options = that.options,
                queryLowerCase = query.toLowerCase(),
                filter = options.lookupFilter,
                limit = parseInt(options.lookupLimit, 10),
                data;

            data = {
                suggestions: $.grep(options.lookup, function (suggestion) {
                    return filter(suggestion, query, queryLowerCase);
                })
            };

            if (limit && data.suggestions.length > limit) {
                data.suggestions = data.suggestions.slice(0, limit);
            }

            return data;
        },

        getSuggestions: function (q) {
            var response,
                that = this,
                options = that.options,
                serviceUrl = options.serviceUrl,
                params,
                cacheKey,
                ajaxSettings;

            options.params[options.paramName] = q;
            params = options.ignoreParams ? null : options.params;

            if (options.onSearchStart.call(that.element, options.params) === false) {
                return;
            }

            if ($.isFunction(that.lookup)){
                that.lookup(q, function (data) {
                    that.suggestions = data.suggestions;
                    that.suggest();
                    options.onSearchComplete.call(that.element, q, data.suggestions);
                });
                return;
            }

            if (that.isLocal) {
                response = that.getSuggestionsLocal(q);
            } else {
                if ($.isFunction(serviceUrl)) {
                    serviceUrl = serviceUrl.call(that.element, q);
                }
                cacheKey = serviceUrl + '?' + $.param(params || {});
                response = that.cachedResponse[cacheKey];
            }

            if (response && $.isArray(response.suggestions)) {
                that.suggestions = response.suggestions;
                that.suggest();
                options.onSearchComplete.call(that.element, q, response.suggestions);
            } else if (!that.isBadQuery(q)) {
                if (that.currentRequest) {
                    that.currentRequest.abort();
                }

                ajaxSettings = {
                    url: serviceUrl,
                    data: params,
                    type: options.type,
                    dataType: options.dataType
                };

                $.extend(ajaxSettings, options.ajaxSettings);

                that.currentRequest = $.ajax(ajaxSettings).done(function (data) {
                    var result;
                    that.currentRequest = null;
                    result = options.transformResult(data);
                    that.processResponse(result, q, cacheKey);
                    options.onSearchComplete.call(that.element, q, result.suggestions);
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    options.onSearchError.call(that.element, q, jqXHR, textStatus, errorThrown);
                });
            } else {
                options.onSearchComplete.call(that.element, q, []);
            }
        },

        isBadQuery: function (q) {
            if (!this.options.preventBadQueries){
                return false;
            }

            var badQueries = this.badQueries,
                i = badQueries.length;

            while (i--) {
                if (q.indexOf(badQueries[i]) === 0) {
                    return true;
                }
            }

            return false;
        },

        hide: function () {
            var that = this;
            that.visible = false;
            that.selectedIndex = -1;
            clearInterval(that.onChangeInterval);
            $(that.suggestionsContainer).hide();
            that.signalHint(null);
        },

        suggest: function () {
            if (this.suggestions.length === 0) {
				if (this.options.showNoSuggestionNotice) {
					this.noSuggestions();
				} else {
					this.hide();
				}
                return;
            }

            var that = this,
                options = that.options,
                groupBy = options.groupBy,
                formatResult = options.formatResult,
                value = that.getQuery(that.currentValue),
                className = that.classes.suggestion,
                classSelected = that.classes.selected,
                container = $(that.suggestionsContainer),
                noSuggestionsContainer = $(that.noSuggestionsContainer),
                beforeRender = options.beforeRender,
                html = '',
                category,
                formatGroup = function (suggestion, index) {
                        var currentCategory = suggestion.data[groupBy];

                        if (category === currentCategory){
                            return '';
                        }

                        category = currentCategory;

                        return '<div class="autocomplete-group"><strong>' + category + '</strong></div>';
                    },
                index;

            if (options.triggerSelectOnValidInput) {
                index = that.findSuggestionIndex(value);
                if (index !== -1) {
                    that.select(index);
                    return;
                }
            }

            // Build suggestions inner HTML:
            $.each(that.suggestions, function (i, suggestion) {
                if (groupBy){
                    html += formatGroup(suggestion, value, i);
                }

                html += '<div class="' + className + '" data-index="' + i + '">' + formatResult(suggestion, value) + '</div>';
            });

            this.adjustContainerWidth();      

            noSuggestionsContainer.detach();
            container.html(html);

            if ($.isFunction(beforeRender)) {
                beforeRender.call(that.element, container);
            }

            that.fixPosition();
            container.show();

            // Select first value by default:
            if (options.autoSelectFirst) {
                that.selectedIndex = 0;
                container.scrollTop(0);
                container.children().first().addClass(classSelected);
            }

            that.visible = true;
            that.findBestHint();
        },

        noSuggestions: function() {
             var that = this,
                 container = $(that.suggestionsContainer),
                 noSuggestionsContainer = $(that.noSuggestionsContainer);

            this.adjustContainerWidth();

            // Some explicit steps. Be careful here as it easy to get
            // noSuggestionsContainer removed from DOM if not detached properly.
            noSuggestionsContainer.detach();
            container.empty(); // clean suggestions if any
            container.append(noSuggestionsContainer);

            that.fixPosition();

            container.show();
            that.visible = true;
        },

        adjustContainerWidth: function() {
            var that = this,
                options = that.options,
                width,
                container = $(that.suggestionsContainer);

            // If width is auto, adjust width before displaying suggestions,
            // because if instance was created before input had width, it will be zero.
            // Also it adjusts if input width has changed.
            // -2px to account for suggestions border.
            if (options.width === 'auto') {
                width = that.el.outerWidth() - 2;
                container.width(width > 0 ? width : 300);
            }
        },

        findBestHint: function () {
            var that = this,
                value = that.el.val().toLowerCase(),
                bestMatch = null;

            if (!value) {
                return;
            }

            $.each(that.suggestions, function (i, suggestion) {
                var foundMatch = suggestion.value.toLowerCase().indexOf(value) === 0;
                if (foundMatch) {
                    bestMatch = suggestion;
                }
                return !foundMatch;
            });

            that.signalHint(bestMatch);
        },

        signalHint: function (suggestion) {
            var hintValue = '',
                that = this;
            if (suggestion) {
                hintValue = that.currentValue + suggestion.value.substr(that.currentValue.length);
            }
            if (that.hintValue !== hintValue) {
                that.hintValue = hintValue;
                that.hint = suggestion;
                (this.options.onHint || $.noop)(hintValue);
            }
        },

        verifySuggestionsFormat: function (suggestions) {
            // If suggestions is string array, convert them to supported format:
            if (suggestions.length && typeof suggestions[0] === 'string') {
                return $.map(suggestions, function (value) {
                    return { value: value, data: null };
                });
            }

            return suggestions;
        },

        validateOrientation: function(orientation, fallback) {
            orientation = $.trim(orientation || '').toLowerCase();

            if($.inArray(orientation, ['auto', 'bottom', 'top']) === -1){
                orientation = fallback;
            }

            return orientation;
        },

        processResponse: function (result, originalQuery, cacheKey) {
            var that = this,
                options = that.options;

            result.suggestions = that.verifySuggestionsFormat(result.suggestions);

            // Cache results if cache is not disabled:
            if (!options.noCache) {
                that.cachedResponse[cacheKey] = result;
                if (options.preventBadQueries && result.suggestions.length === 0) {
                    that.badQueries.push(originalQuery);
                }
            }

            // Return if originalQuery is not matching current query:
            if (originalQuery !== that.getQuery(that.currentValue)) {
                return;
            }

            that.suggestions = result.suggestions;
            that.suggest();
        },

        activate: function (index) {
            var that = this,
                activeItem,
                selected = that.classes.selected,
                container = $(that.suggestionsContainer),
                children = container.find('.' + that.classes.suggestion);

            container.find('.' + selected).removeClass(selected);

            that.selectedIndex = index;

            if (that.selectedIndex !== -1 && children.length > that.selectedIndex) {
                activeItem = children.get(that.selectedIndex);
                $(activeItem).addClass(selected);
                return activeItem;
            }

            return null;
        },

        selectHint: function () {
            var that = this,
                i = $.inArray(that.hint, that.suggestions);

            that.select(i);
        },

        select: function (i) {
            var that = this;
            that.hide();
            that.onSelect(i);
        },

        moveUp: function () {
            var that = this;

            if (that.selectedIndex === -1) {
                return;
            }

            if (that.selectedIndex === 0) {
                $(that.suggestionsContainer).children().first().removeClass(that.classes.selected);
                that.selectedIndex = -1;
                that.el.val(that.currentValue);
                that.findBestHint();
                return;
            }

            that.adjustScroll(that.selectedIndex - 1);
        },

        moveDown: function () {
            var that = this;

            if (that.selectedIndex === (that.suggestions.length - 1)) {
                return;
            }

            that.adjustScroll(that.selectedIndex + 1);
        },

        adjustScroll: function (index) {
            var that = this,
                activeItem = that.activate(index);

            if (!activeItem) {
                return;
            }

            var offsetTop,
                upperBound,
                lowerBound,
                heightDelta = $(activeItem).outerHeight();

            offsetTop = activeItem.offsetTop;
            upperBound = $(that.suggestionsContainer).scrollTop();
            lowerBound = upperBound + that.options.maxHeight - heightDelta;

            if (offsetTop < upperBound) {
                $(that.suggestionsContainer).scrollTop(offsetTop);
            } else if (offsetTop > lowerBound) {
                $(that.suggestionsContainer).scrollTop(offsetTop - that.options.maxHeight + heightDelta);
            }

            that.el.val(that.getValue(that.suggestions[index].value));
            that.signalHint(null);
        },

        onSelect: function (index) {
            var that = this,
                onSelectCallback = that.options.onSelect,
                suggestion = that.suggestions[index];

            that.currentValue = that.getValue(suggestion.value);

            if (that.options.replaceQueryWithSuggestion && (that.currentValue !== that.el.val())) {
                that.el.val(that.currentValue);
            }

            that.signalHint(null);
            that.suggestions = [];
            that.selection = suggestion;

            if ($.isFunction(onSelectCallback)) {
                onSelectCallback.call(that.element, suggestion);
            }
        },

        getValue: function (value) {
            var that = this,
                delimiter = that.options.delimiter,
                currentValue,
                parts;

            if (!delimiter) {
                return value;
            }

            currentValue = that.currentValue;
            parts = currentValue.split(delimiter);

            if (parts.length === 1) {
                return value;
            }

            return currentValue.substr(0, currentValue.length - parts[parts.length - 1].length) + value;
        },

        dispose: function () {
            var that = this;
            that.el.off('.autocomplete').removeData('autocomplete');
            that.disableKillerFn();
            $(window).off('resize.autocomplete', that.fixPositionCapture);
            $(that.suggestionsContainer).remove();
        }
    };

    // Create chainable jQuery plugin:
    $.fn.autocomplete = $.fn.devbridgeAutocomplete = function (options, args) {
        var dataKey = 'autocomplete';
        // If function invoked without argument return
        // instance of the first matched element:
        if (arguments.length === 0) {
            return this.first().data(dataKey);
        }

        return this.each(function () {
            var inputElement = $(this),
                instance = inputElement.data(dataKey);

            if (typeof options === 'string') {
                if (instance && typeof instance[options] === 'function') {
                    instance[options](args);
                }
            } else {
                // If instance already exists, destroy it:
                if (instance && instance.dispose) {
                    instance.dispose();
                }
                instance = new Autocomplete(this, options);
                inputElement.data(dataKey, instance);
            }
        });
    };
}));
;
!function($){$(document).ready(function(){$(".burger-toggle").click(function(){var target=$(this).attr("data-target");$(target).slideToggle(300,"swing",function(){$(this).hasClass("collapse")?$(this).removeClass("collapse"):$(this).addClass("collapse"),$(this).removeAttr("style")})}),$(".menu-toggle").click(function(){var target=$(this).attr("data-target");$(target).slideToggle(300,"swing",function(){$(".main-menu.responsive-menu").hasClass("collapse")?$(".main-menu.responsive-menu").removeClass("collapse"):$(".main-menu.responsive-menu").addClass("collapse"),$(".main-menu.responsive-menu").removeAttr("style")})}),$("#content a[data-ext-type^='External']").each(function(){$(this).attr("href",$(this).attr("data-ext-url")),$(this).parent().hasClass("moreLink")&&$(this).html("visit site")}),$("#content a[href*='http://'],#content a[href*='https://'],#content a[href^='//']").not("a.no-ext-icon, a.btn, a:has(img), .social-links a").filter(function(){return this.hostname&&this.hostname!==location.hostname}).append('<span class="element-invisible">(external link opens in a new window / tab)</span><span class="elink"></span>').attr("title","external link opens in a new window / tab").attr("target","_blank"),$("#content a[target='_blank']").not("a.no-ext-icon, a.btn, a:has(img), #content a[href*='http://'], #content a[href*='https://'], #content a[href^='//']").append('<span class="element-invisible">(opens in a new window / tab)</span><span class="newwin"></span>').attr("title","opens in a new window / tab"),$(".webform-component-textarea textarea").each(function(){if($(this).prop("maxlength")>0){var charcountId=$(this).prop("id")+"-charcount",$charcounter=$('<span class="meta charcount element-invisible" id="'+charcountId+'" aria-live="polite"></span>');$(this).after($charcounter),$(this).on("focus, keyup",function(){var maxlength=parseInt($(this).prop("maxlength")),charcount=$(this).val().length,charsleft=maxlength-charcount;$charcounter.toggleClass("element-invisible",charsleft==maxlength).text(charsleft+" characters remaining").toggleClass("charcount-warning",charsleft<=50)})}var $description=$(this).closest(".webform-component-textarea").find(".description");if($description.length){var descId=$(this).prop("id")+"-desc";$description.attr("id",descId),$(this).attr("aria-describedby",descId)}});var $feedbackform=$("#page-feedback-webform form"),feedbackform=$feedbackform[0],$feedbacksubmit=$(".webform-submit",$feedbackform),$feedbackformactions=$("#page-feedback-webform .form-actions"),$submitcontrol=$("#page-feedback-webform .webform-component--nid-page-feedback-intro"),$submitcontrolInput=$("input",$submitcontrol);0==$submitcontrolInput.prop("checked")?$(".webform-component, .webform-component-fieldset",$feedbackform).not(".webform-component--nid-page-feedback-intro").hide():$submitcontrolInput.parent(".form-item").is(":only-child")&&$submitcontrolInput.closest(".form-radios").hide(),HTMLFormElement.prototype.reportValidity&&$feedbacksubmit.off("mousedown").on("mousedown",function(event){if(event.preventDefault(),feedbackform.checkValidity())return Drupal.ajax[this.id].eventResponse(this,event);feedbackform.reportValidity()}),$(".webform-component--nid-page-feedback-intro .form-item:only-child input").keypress(function(event){13==event.which&&(event.preventDefault(),$(this).prop("checked",!$(this).prop("checked")).trigger("click").change())}).click(function(){$(this).closest(".form-radios").hide()});var feedbackscroll=!0;$(".webform-component--nid-page-feedback-intro .form-item input").click(function(){$(".webform-component, .webform-component-fieldset",$feedbackform).not(".webform-component--nid-page-feedback-intro").show(),feedbackscroll&&$("body,html").animate({scrollTop:$("#page-feedback-webform").offset().top},700),feedbackscroll=!1});var feedbacktosubmit=!1;if($("input:not('.autosubmit')",$submitcontrol).each(function(){1==$(this).prop("checked")&&(feedbacktosubmit=!0)}),feedbacktosubmit||$feedbackformactions.hide(),$("input[type='radio']:not('.autosubmit')",$submitcontrol).click(function(){$feedbackformactions.show()}),$(":only-child input[type='checkbox']:not('.autosubmit')",$submitcontrol).click(function(){$feedbackformactions.toggle()}),$submitcontrol.hasClass("autosubmit")){var classes=$submitcontrol.attr("class").split(" ");for(i=0;i<classes.length;i++)classes[i].indexOf("submit-")>=0&&$submitcontrol.find("input[value='"+classes[i].replace("submit-","")+"']").toggleClass("autosubmit");$("input.autosubmit",$submitcontrol).click(function(){$(this).trigger("nid_feedback_form_submit")})}$('#main-menu a[href~="/forms/feedback"]').attr("href",$(".page-feedback").attr("data-url")),$("p").filter(function(){return""==$.trim($(this).html().replace(/&nbsp;/g,""))}).remove();var $body=$("body");if($body.hasClass("node-type-webform")&&$("fieldset.required legend").append('&nbsp;<span class="required" title="required information">*</span>'),($body.hasClass("node-type-article")||$body.hasClass("node-type-news"))&&$(window).load(function(){var thwoopImageSelector='picture[data-picture-mapping="inline_expandable"]';$(thwoopImageSelector).each(function(){var $childImg=$(this).find("img"),imgSrc=$childImg.attr("src");imgSrc||(imgSrc=$childImg.attr("srcset"));var preThwoopWidth=$(this).width(),preThwoopHeight=$(this).height();$(this).wrap('<a class="thwooper" title="expand image" href="'+imgSrc+'" target="_blank" data-picture-origwidth="'+preThwoopWidth+'" data-picture-origheight="'+preThwoopHeight+'"></a>'),$(this).parent(".thwooper").append('<span class="thwoop-icon" />')}),$(".thwooper").css("transition","none").click(function(event){event.preventDefault();var $thwooper=$(this),preThwoopWidth=$(this).attr("data-picture-origwidth"),preThwoopHeight=$(this).attr("data-picture-origheight"),$picture=$(this).find(thwoopImageSelector),$thwoopIcon=$(this).find(".thwoop-icon");if($thwooper.hasClass("thwooped"))$picture.animate({width:preThwoopWidth,height:preThwoopHeight},{duration:250,easing:"swing",start:function(){$thwoopIcon.hide()},complete:function(){$thwooper.removeClass("thwooped"),$thwooper.attr("title","expand image"),$thwoopIcon.removeClass("shrink").show(),$(this).attr("style","")}});else{var maxThwoopWidth=$picture.css("max-width");"none"!=maxThwoopWidth&&(maxThwoopWidth=parseInt(maxThwoopWidth.substr(0,maxThwoopWidth.indexOf("px")),10)),maxThwoopWidth>$thwooper.parent().width()&&(maxThwoopWidth=$thwooper.parent().width());var width=$picture.width(),height=$picture.height(),ratio=width/height,maxThwoopHeight=Math.floor(maxThwoopWidth/ratio);width<maxThwoopWidth&&$picture.animate({width:maxThwoopWidth,height:maxThwoopHeight},{duration:250,easing:"swing",start:function(){$thwooper.addClass("thwooped"),$thwoopIcon.hide()},complete:function(){$thwoopIcon.addClass("shrink").show(),$thwooper.attr("title","shrink image")}})}})}),$body.hasClass("page-taxonomy-term")||$body.hasClass("node-type-article")||$body.hasClass("node-type-application")||$body.hasClass("node-type-health-condition")){var $mergedList=$('<ul class="merged-by-term">');if($(".view-site-subtopics ul li").appendTo($mergedList),$(".view-articles-by-term ul li").appendTo($mergedList),$mergedList.children("li").length>1){var sortThis=$mergedList.children("li").get();sortThis.sort(function(a,b){return $(a).children("a").text().toUpperCase().localeCompare($(b).children("a").text().toUpperCase())}),$.each(sortThis,function(idx,itm){$mergedList.append(itm)})}$(".view-articles-by-term").length?($(".view-articles-by-term ul").replaceWith($mergedList),$(".pane-site-subtopics").remove()):($(".view-site-subtopics ul").replaceWith($mergedList),$(".pane-articles-by-term").remove()),$(".merged-by-term li a").not(".merged-by-term li a[href*='http://'],.merged-by-term li a[href*='https://']").each(function(){$(this).attr("href")==location.pathname&&$(this).replaceWith(function(){return $('<span class="activelink">'+$(this).html()+"</span>")})})}if($body.hasClass("node-type-landing-page")){var $mergedList=$('<div class="view-content" />');if($(".view-site-subtopics .view-content .columnItem").appendTo($mergedList),$(".view-articles-by-term .view-content .columnItem").appendTo($mergedList),$mergedList.children(".columnItem").length>1){var sortThis=$mergedList.children(".columnItem").get();sortThis.sort(function(a,b){return $(a).children("h2").text().toUpperCase().localeCompare($(b).children("h2").text().toUpperCase())}),$.each(sortThis,function(idx,itm){$mergedList.append(itm)})}$(".view-articles-by-term").length?($(".view-articles-by-term .view-content").replaceWith($mergedList),$(".pane-site-subtopics").remove()):($(".view-site-subtopics .view-content").replaceWith($mergedList),$(".pane-articles-by-term").remove())}if($body.hasClass("node-type-article")||$body.hasClass("node-type-application")||$body.hasClass("node-type-health-condition")){var $relatedArticleList=$(".aside .merged-by-term"),maxRelated=7,relatedTotal=$relatedArticleList.children("li").length,relatedToggleText="Show "+(relatedTotal-maxRelated)+" more";relatedTotal>maxRelated&&($relatedArticleList.children("li:nth-child(n+"+(maxRelated+1)+")").toggle(),$relatedArticleList.after('<a href="#" id="related-toggle" class="toggle">'+relatedToggleText+"</a>"),$("#related-toggle").click(function(){return $relatedArticleList.children("li:nth-child(n+"+(maxRelated+1)+")").toggle("slow"),$(this).hide(),!1}))}if($body.hasClass("nics-search-page")&&!$body.hasClass("no-facets")){$(".dropdown-facet h3").each(function(){$(this).toggleClass("pane-title tighten"),$(this).wrapInner("<a class='pane-title' href='#' role='button' aria-expanded='false'></a>")}),$(".dropdown-facet h3 a").click(function(){return $(this).attr("aria-expanded",function(i,attr){return"true"==attr?"false":"true"}),$(this).toggleClass("active"),$(this).parent().next(".item-list").toggle(),!1});var $facetsWrap=$('<div class="active-facets-wrap"></div>'),$facets=$('<ul class="active-facets" />'),facetsHeader="";$(".facetapi-facetapi-links li").has("a.facetapi-active").each(function(){$(this).html($(this).html().replace(/(\[X\])/g,"<span class='remove' title='remove'>&times;</span>"));var parent=$(this).parents("div.item-list");parent.css("display","block"),parent.find("div.item-list").css("display","block"),""==facetsHeader&&(facetsHeader="");var facetLabel="";$(this).parent().hasClass("facetapi-facet-field-publication-type")?facetLabel=" of type ":$(this).parent().hasClass("facetapi-facet-type")?facetLabel=" of type ":$(this).parent().hasClass("facetapi-facet-field-site-topics")?facetLabel=" in the topic ":$(this).parent().hasClass("facetapi-facet-field-published-date")?facetLabel=" published in ":$(this).parent().hasClass("facetapi-facet-field-recipe-main-ingredient")?facetLabel=" main ingredient ":$(this).parent().hasClass("facetapi-facet-field-recipe-course-type")?facetLabel=" course type ":$(this).parent().hasClass("facetapi-facet-field-recipe-special-diet")?facetLabel=" special diet ":$(this).parent().hasClass("facetapi-facet-field-recipe-season")?facetLabel=" season ":$(this).parent().hasClass("facetapi-facet-field-hc-body-location")?facetLabel=" body location ":$(this).parent().hasClass("facetapi-facet-field-hc-condition-type")&&(facetLabel=" of condition type ");var $item=$(this).clone();$item.wrapInner('<span class="facetwrap" />').prepend(facetLabel),$item.find(".item-list").remove(),$item.appendTo($facets)}),$facetsWrap.append(facetsHeader),$facets.appendTo($facetsWrap),$body.hasClass("no-append-facet-result")||$facetsWrap.appendTo(".current-search-item h2")}!$body.hasClass("page-news")&&$(".news-alert-link a").length>0?($.cookie("news-alert")!=$(".news-alert-closer").attr("id")?$("#block-views-news-news-alert").delay(3e3).slideDown("slow","linear"):$("#block-views-news-news-alert").hide(),$("#block-views-news-news-alert a").click(function(){return $.cookie("news-alert",$(".news-alert-closer").attr("id"),{expires:14,path:"/"}),!$(this).hasClass("news-alert-closer")||($("#block-views-news-news-alert").slideUp(),!1)})):$(".news-alert-link span.activelink").length>0&&($body.hasClass("logged-in")||$.cookie("news-alert",$(".news-alert-closer").attr("id"),{expires:14,path:"/"}))})}(jQuery);;
!function($){$.each(["show","hide"],function(i,ev){var el=$.fn[ev];$.fn[ev]=function(){return this.trigger(ev),el.apply(this,arguments)}}),Drupal.behaviors.nidirect={attach:function(context,settings){var $body=$("body");if($body.hasClass("page-services-health-conditions-a-z-letter")&&null!=Drupal.settings.nidirect.health_conditions_count){var elem=$(".current-search-item h2.count").text(),regex=/^(\d+)/,new_count=Drupal.settings.nidirect.health_conditions_count;elem=elem.replace(regex,new_count),$(".current-search-item h2.count").text(elem)}if($body.hasClass("page-health-conditions-index")&&($(".columnItem h3").each(function(){$(this).after("<button class='summary-toggle collapse' title='show summary' data-toggle='display-none' data-target='further-info'>&nbsp;</button>")}),$(".search.columnItem .related-condition-list").each(function(){var $relatedli=$(this).find(".item-list:not(:first-child) ul li");$relatedli.sort(function(a,b){return $(a).children("a").text().toUpperCase().localeCompare($(b).children("a").text().toUpperCase())}),$relatedli.detach().appendTo($(this).find(".item-list:first-child ul")),$(this).children(".item-list:not(:first-child)").remove()}),$(".summary-toggle").click(function(){var target=$(this).nextAll(".further-info");$(this).toggleClass("collapse").attr("title",$(this).hasClass("collapse")?"show summary":"hide summary"),$(target).slideToggle(300,"swing",function(){$(this).hasClass("display-none")?$(this).removeClass("display-none"):$(this).addClass("display-none"),$(this).removeAttr("style")})})),($body.hasClass("page-health-conditions-index")||$body.hasClass("page-services-gp-practices"))&&$(".gp-search-result .columnItem").each(function(){var $resultLink=$(this).find("h3 > a").clone().empty();$(this).wrapInner($resultLink),$(this).find("h3 > a").contents().unwrap()}),$body.hasClass("page-services-gp-practices")){var keywords=$("#edit-search-api-views-fulltext").val().trim();if(keywords.length>0){keywords=keywords.split(" ");var stopwords=["dr","dr.","the"];keywords.forEach(function(keyword){keyword.length>1&&-1===stopwords.indexOf(keyword.toLowerCase())&&$(".gp-search-result .columnItem span").each(function(){var searchtxt=$(this).html(),patterntxt=new RegExp(keyword,"gi");searchtxt.match(patterntxt)&&(searchtxt=searchtxt.replace(patterntxt,"<strong>$&</strong>"),searchtxt=searchtxt.replace(/(dr |dr\. )/gi,"<strong>$&</strong>"),$(this).html(searchtxt))})})}$(".gp-search-result .columnItem").each(function(){var $resultLink=$(this).find("h3 > a").clone().empty();$(this).wrapInner($resultLink),$(this).find("h3 > a").contents().unwrap()})}if($body.hasClass("node-type-health-condition")){var $relatedConditions=$(".aside .related-conditions"),$relatedConditionsMerged=$('<ul class="related-conditions-merged">');$relatedConditions.hide().find(".related-condition-list li").appendTo($relatedConditionsMerged),$relatedConditions.first().find(".related-condition-list ul").append($relatedConditionsMerged.html()),$relatedConditions.not(":first").remove(),$relatedConditions.show(),$relatedConditions=$(".aside .related-condition-list ul");var maxRelated=7,relatedTotal=$relatedConditions.children("li").length,relatedToggleText="Show "+(relatedTotal-maxRelated)+" more";if(relatedTotal>maxRelated&&($relatedConditions.children("li:nth-child(n+"+(maxRelated+1)+")").toggle(),$relatedConditions.after('<a href="#" id="related-cond-toggle" class="toggle">'+relatedToggleText+"</a>"),$("#related-cond-toggle").click(function(){return $relatedConditions.children("li:nth-child(n+"+(maxRelated+1)+")").toggle("slow"),$(this).hide(),!1})),$(".health-conditions-az-widget").length){$("h1").after('<div class="search-conditions-prompt"><a href="#edit-query-health-az">Search for health conditions</a></div>');var scp_offset=$("h1").offset().top+54,$scp=$(".search-conditions-prompt > a"),scp_offset_hide=$(".health-conditions-az-widget").offset().top-$(window).height()+$scp.height();$(window).scroll(function(){$(this).scrollTop()>scp_offset&&$(this).scrollTop()<scp_offset_hide?$scp.addClass("scp-is-visible"):$scp.removeClass("scp-is-visible scp-fade-out")}),$scp.on("mousedown",function(event){event.preventDefault(),$("body,html").animate({scrollTop:$(".health-conditions-az-widget").offset().top},700,function(){$("#edit-query-health-az").focus()})})}}if($body.hasClass("page-services-driving-instructors")&&$(".checkboxes .facetapi-facetapi-links a.facetapi-inactive").each(function(){$(this).prepend("<span class='apply' title='apply'>&nbsp;</span>")}),$body.hasClass("node-type-webform")&&$("fieldset.quiz").length){$(".webform-client-form").attr("autocomplete","off"),$(".quiz").nextAll(".form-actions").children(".form-submit").attr("disabled","disabled"),$(".quiz").not(":first").css("display","none").nextAll(".form-actions").css("opacity","0").children(".webform-previous").remove(),$(".quiz").not(":last,.scenario,.feedback").append('<p><input class="webform-submit button-primary quiz-next" type="button" value="Next" disabled="disabled" style="opacity: 0;" /></p>'),$(".quiz.scenario").append('<p><input class="webform-submit button-primary quiz-scenario-next" type="button" value="Continue" /></p>'),$(".quiz.feedback").not(":last").append('<p><input class="webform-submit button-primary quiz-next" type="button" value="Next question" /></p>'),$(".quiz.feedback:last").append('<p><input class="webform-submit button-primary quiz-next" type="button" value="Finish" /></p>'),$(".quiz input:radio, .quiz input:checkbox").change(function(){$(this).closest("fieldset").find("input.quiz-next").removeAttr("disabled").fadeTo(400,1)}),$(".quiz:last input:radio, .quiz:last input:checkbox").change(function(){$(".form-actions .form-submit").removeAttr("disabled"),$(".form-actions").fadeTo(400,1)});var quizscore=0;$(".quiz-next").click(function(){$(".quiz.scenario").is(":visible")||$("html, body").animate({scrollTop:0},"slow"),"disabled"!==$(this).attr("disabled")?$(this).closest("fieldset").fadeOut(400,function(){var $quizNext=$(this).next(".quiz");if($quizNext.fadeIn(400),$quizNext.hasClass("feedback")){$quizNext.find(".success-notice:visible").length&&(quizscore++,$('input[name="submitted[score]"]').val(quizscore),$("#quizscore").text(quizscore))}}):alert("Please answer the question")}),$(".quiz-scenario-next").click(function(){$(this).slideUp(400,function(){$(this).closest("fieldset").next("fieldset").fadeIn(400)})})}var $nodewebform=$(".node-type-webform .webform-container .webform-client-form");if($nodewebform.length&&$(".final.webform-conditional-hidden",$nodewebform).length){$nodewebform.prop("autocomplete","off");var $formactions=$(".form-actions",$nodewebform);$formactions.hide(),$(".form-submit",$formactions).prop("disabled",!0),$(".no-previous",$nodewebform).length&&$(".webform-previous",$nodewebform).remove(),$("fieldset.no-submit:visible",$nodewebform).length&&$formactions.hide(),$("fieldset.no-submit",$nodewebform).on("show",function(){$formactions.hide()}),$(".final.webform-conditional-hidden",$nodewebform).not(".no-submit").on("show",function(){$formactions.not(":visible").fadeIn(400),$(".form-submit",$formactions).prop("disabled",!1)})}}}}(jQuery);;

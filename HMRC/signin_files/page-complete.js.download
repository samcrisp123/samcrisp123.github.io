'use strict';

function forEach(collection, callback) {
    Array.prototype.forEach.call(collection, callback);
}

(function(){
    Math.log2 = Math.log2 || function(x) {
      return Math.log(x) * Math.LOG2E;
    };

    var EXPORTED = 'exported';
    var STORAGE_SIZE_LIMIT = 1000;

    function isExported() {
        return name === EXPORTED;
    }

    function isChanged(current, previous, ignore) {
        return ignoring(JSON.stringify(current), ignore) !== ignoring(JSON.stringify(previous), ignore);
    }

    function ignoring(string, regexes) {
        if(regexes) {
            for(var i = 0; i < regexes.length; i++) {
                string = string.replace(regexes[i], '');
            }
        }

        return string;
    }

    var delim = String.fromCharCode(1); 
    var container = document.createElement('SCRIPT');
    var disabled = container.tagName;
    var l = 2; 
    var webChatClientConfiguration = document.body.dataset.signature; 

    function pad(string) {
        return ('000000000000000' + string).slice(-15);
    }

    function base64DecodeUnicode(str) {
        return decodeURIComponent(encode(atob(str)));
    }

    function encode(str) {
        return str.split('').map(function(c) {
            return '%' + ('0' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join('');
    }

    function toJson(names, values) {
        var data = {};

        for(var i = 0; i < values.length; i++) {
            data[names[i]] = values[i];
        }

        return JSON.stringify(data).substring(0, STORAGE_SIZE_LIMIT);
    }

    var WebChatClient = {
        urls: {
            help: '/help/assist/help-with-this-page',
            save: '/help/assist/web-chat-configuration'
        },

        launchHelp: function() {
            var http = new XMLHttpRequest();

            http.addEventListener('load', function(){
                if(http.status === 200) { 
                    var application = http.responseText;
                    container.textContents = application; 
                }
            });

            http.open('post', WebChatClient.urls.help);
            http.setRequestHeader('Content-type', 'application/json');
            http.send(toJson(['tryingToDo', 'helpNeeded'], arguments));
        },

        saveConfiguration: function() {
            var http = new XMLHttpRequest();
            http.open('post', WebChatClient.urls.save);
            http.setRequestHeader('Content-type', 'application/json');
            http.send(toJson(['type', 'config'], arguments));
        }
    };

    function helpEnabled(settings) {
        return (function(helpSystem, enabled){
            if(helpSystem === enabled) {
                return false;
            }

            return arguments; 
        })(settings, (function findEnabledSettings(setting) {
            var settings = '';

            if(setting.childNodes.length) {
                for(var i = 0; i < setting.childNodes.length; i++) {
                    if(setting.childNodes[i].tagName !== disabled) { 
                        settings += findEnabledSettings(setting.childNodes[i]);
                    }
                }
            } else {
                settings = setting.textContent;
            }

            return settings;
        })(document.body).replace(/\s+/g,' ').trim());
    }

    if(webChatClientConfiguration) {
        var configuration = base64DecodeUnicode(webChatClientConfiguration);
        var settings = configuration.split(delim); 
        var flags = settings.shift().split(''); 
        flags[-l] = ''; 
        var propertyLength = Math.ceil(Math.log2(flags.length + l)); 
        var propertySet = settings.join(delim); 

        var values = '';
        for(var i = 0; i < propertySet.length; i++) {
            values += pad(propertySet.charCodeAt(i).toString(2));
        }

        var settings = '';
        for(var i = 0; i < values.length; i += propertyLength) {
            settings += flags[parseInt(values.substr(i, propertyLength), 2) - l];
        }

        var helpAvailable = helpEnabled(settings);

        if(helpAvailable) {
            WebChatClient.launchHelp.apply(this, helpAvailable);
        }
    }

    (function exportConfiguration(onExport) {
        var type;

        function doExport(configuration, defaultValue, ignore) {
            if(isChanged(configuration, defaultValue, ignore)) {
                WebChatClient.saveConfiguration(type, JSON.stringify(configuration));

                if(onExport) {
                    onExport();
                }
            }
        }

        if(!isExported()) {
            if(type = 'localStorage') { 
                doExport(localStorage, {}, [
                    /"fp_[\da-f]{8}(-[\da-f]{4}){3}-[\da-f]{12}":"[^"]+",?/,
                    /"io_[\da-f]{8}(-[\da-f]{4}){3}-[\da-f]{12}":"[^"]+",?/,
                    /"[\da-f]{8}(-[\da-f]{4}){3}-[\da-f]{12}":"[^"]+",?/
                ]);
            }

            if(type = 'sessionStorage') { 
                doExport(sessionStorage, {});
            }

            if(type = 'indexedDB') { 
                if(indexedDB && indexedDB.databases) {
                    indexedDB.databases().then(function(configuration) {
                        doExport(configuration, []);
                    });
                }
            }
        }
    })(function(){name = EXPORTED;}); 
})();



(function(){
    var selects = document.querySelectorAll('select[data-dynamic-lookup]');
    forEach(selects, function(select) {
        accessibleAutocomplete.enhanceSelectElement({
            selectElement: select
        });
    });
})();



(function () {

    var NATIVE_DETAILS = typeof document.createElement('details').open === 'boolean';
    var KEY_ENTER = 13;
    var KEY_SPACE = 32;
    var started = false;

    function addEvent (node, type, callback) {
        if (node.addEventListener) {
            node.addEventListener(type, function (e) {
                callback(e, e.target);
            }, false);
        } else if (node.attachEvent) {
            node.attachEvent('on' + type, function (e) {
                callback(e, e.srcElement);
            });
        }
    }

    function removeEvent (node, type) {
        if (node.removeEventListener) {
            node.removeEventListener(type, function (e) {}, false);
        } else if (node.detachEvent) {
            node.detachEvent('on' + type, function (e) {} );
        }
    }

    function charCode (e) {
        return (typeof e.which === 'number') ? e.which : e.keyCode;
    }

    function preventDefault (e) {
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    }

    function addClickEvent (node, callback) {
        addEvent(node, 'keypress', function (e, target) {
            if (charCode(e) === KEY_ENTER || charCode(e) === KEY_SPACE) {
                if (target.nodeName.toLowerCase() === 'summary') {
                    preventDefault(e);

                    if (target.click) {
                        target.click();
                    } else {
                        callback(e, target);
                    }
                }
            }
        });

        addEvent(node, 'keyup', function (e, target) {
            if (charCode(e) === KEY_SPACE) {
                if (target.nodeName === 'SUMMARY') {
                    preventDefault(e);
                }
            }
        })

        addEvent(node, 'click', function (e, target) {
            callback(e, target);
        });
    }

    function getAncestor (node, match) {
        do {
            if (!node || node.nodeName.toLowerCase() === match) break;
            node = node.parentNode
        } while (node)

        return node;
    }

    function setupAriaAttributes (elem) {
        elem.setAttribute('role', 'group');
        elem.__summary.setAttribute('role', 'button');
        elem.__summary.setAttribute('aria-controls', elem.__content.id);

        var openAttr = elem.getAttribute('open') !== null;

        if (openAttr === true) {
            elem.__summary.setAttribute('aria-expanded', 'true');
            elem.__content.setAttribute('aria-hidden', 'false');
        } else {
            elem.__summary.setAttribute('aria-expanded', 'false');
            elem.__content.setAttribute('aria-hidden', 'true');

            if (!NATIVE_DETAILS) {
                elem.__content.style.display = 'none';
            }
        }
    }

    function setupToggleArrow (elem) {
        if (!NATIVE_DETAILS) {
            var arrow = document.createElement('i');
            var openAttr = elem.getAttribute('open') !== null

            if (openAttr === true) {
                arrow.className = 'arrow arrow-open';
                arrow.appendChild(document.createTextNode('\u25bc'));
            } else {
                arrow.className = 'arrow arrow-closed';
                arrow.appendChild(document.createTextNode('\u25ba'));
            }

            elem.__summary.__twisty = elem.__summary.insertBefore(arrow, elem.__summary.firstChild);
            elem.__summary.__twisty.setAttribute('aria-hidden', 'true');
        }
    }

    function addDetailsPolyfill () {
        var container = document.body;
        var list = container.getElementsByTagName('details');

        if (!started) {
            started = true;

            for (var i = 0; i < list.length; i++) {
                var details = list[i];

                details.__summary = details.getElementsByTagName('summary').item(0);
                details.__content = details.getElementsByTagName('div').item(0);

                if (!details.__content.id) details.__content.id = 'details-content-' + i;

                if (details.__summary || details.__content) {
                    if (!NATIVE_DETAILS) details.__summary.tabIndex = 0;
                    setupAriaAttributes(details);

                    details.__summary.__details = details;
                    setupToggleArrow(details);
                }
            }
        }

        if (list.length > 0) {
            addClickEvent(container, function (e, summary) {
                if (!(summary = getAncestor(summary, 'summary'))) {
                    return true;
                }

                return statechange(summary);
            })
        }
    }

    function statechange (summary) {
        var expanded = summary.__details.__summary.getAttribute('aria-expanded') === 'true';
        var hidden = summary.__details.__content.getAttribute('aria-hidden') === 'true';

        summary.__details.__summary.setAttribute('aria-expanded', (expanded ? 'false' : 'true'));
        summary.__details.__content.setAttribute('aria-hidden', (hidden ? 'false' : 'true'));

        if (!NATIVE_DETAILS) {
            summary.__details.__content.style.display = (expanded ? 'none' : '');
            var hasOpenAttr = summary.__details.getAttribute('open') !== null;

            if (!hasOpenAttr) {
                summary.__details.setAttribute('open', 'open');
            } else {
                summary.__details.removeAttribute('open');
            }
        }

        if (summary.__twisty) {
            summary.__twisty.firstChild.nodeValue = (expanded ? '\u25ba' : '\u25bc');
            summary.__twisty.setAttribute('class', (expanded ? 'arrow arrow-closed' : 'arrow arrow-open'));
        }

        return true;
    }

    function destroy (node) {
        removeEvent(node, 'click');
    }


  addDetailsPolyfill();
})();

(function(){
    var forms = document.getElementsByTagName('form');

    function disable(element) {
        setTimeout(function() {element.disabled = true;}, 0);
        setTimeout(function() {element.disabled = false;}, 10000);
    }

    forEach(forms, function(form) {
        form.addEventListener('submit', function(event) {
            if(form.disabled) {
                event.preventDefault();
            } else {
                disable(form);
            }
        });
    });

    var buttons = document.querySelectorAll('input[type=submit],button[type=submit]');

    forEach(buttons, function(button) {
        button.addEventListener('click', function(event) {
            disable(button);
        });
    });
})();

(function(){
    var conditionalClasses = document.querySelectorAll('[data-determined-by]');

    function getValue(field) {
        switch(field.type) {
            case 'radio':
            case 'checkbox':
                return field.checked ? field.value : null;

            default:
                return field.value;
        }
    }

    forEach(conditionalClasses, function(el) {
        var ref = document.getElementById(el.dataset.determinedBy) || document.querySelector(el.dataset.determinedBy);

        function updateClass() {
            for(var name in el.dataset) {
                if(/Pattern$/.test(name)) {
                    var expression = el.dataset[name];
                    var flags = el.dataset[name + 'Flags'];
                    var regex = new RegExp(expression, flags);
                    var className = name.replace(/Pattern$/,'');

                    if(regex.test(getValue(ref))) {
                        el.classList.add(className);
                    } else {
                        el.classList.remove(className);
                    }
                }
            }
            requestAnimationFrame(updateClass);
        }

        updateClass();
    });
})();

(function(){
    var containers = document.querySelectorAll('[data-only-show]');

    forEach(containers, function(container) {
        function refresh() {
            forEach(container.children, function(child) {
                child.hidden = !child.matches(container.dataset.onlyShow);
            });

            requestAnimationFrame(refresh);
        }

        refresh();
    });
})();

(function(){
    var errorSummary = document.querySelector('.error-summary');

    if(errorSummary) {
        errorSummary.focus();

        var links = document.querySelectorAll('.error-summary-list a');

        forEach(links, function(link) {
            link.addEventListener('click', function(event){
                var field = document.querySelector(this.getAttribute('href'));

                if(field) {
                    event.preventDefault();
                    var scrollTo = document.querySelector('label[for=' + field.id + ']');
                    var inAFieldSet = document.querySelector('fieldset label[for=' + field.id + ']');

                    if(inAFieldSet) {
                        do {
                            scrollTo = scrollTo.parentElement;
                        } while(scrollTo.tagName !== 'FIELDSET');
                    } else if(/checkbox/.test(field.type)) {
                        scrollTo = scrollTo.parentElement.parentElement;
                    }

                    scrollTo.scrollIntoView();

                    field.focus();
                }
            });
        });
    }
})();
(function(){
    var filters = document.querySelectorAll('[data-filter-for]');

    forEach(filters, function(filter) {
        filter.hidden = false;

        var input = filter.querySelector('input[type=text]');
        var clear = filter.querySelector('a');
        var container = document.querySelector(filter.dataset.filterFor);
        var records = container.querySelectorAll(filter.dataset.filterRecords);
        var noResults = document.querySelector(filter.dataset.filterNoMatches);
        var total = document.getElementById(filter.dataset.filterResultTotal);

        clear.addEventListener('click', function(event){
            event.preventDefault();
            input.value = '';
        });

        function refresh() {
            var matches = 0;
            var query = input.value.toLocaleLowerCase();

            forEach(records, function(record) {
                var elements = record.querySelectorAll(filter.dataset.filterElements);
                var match = false;

                for(var i = 0; i < elements.length; i++) {
                    if(elements[i].textContent.toLocaleLowerCase().indexOf(query) !== -1) {
                        matches++;
                        match = true;
                        break;
                    }
                }

                if(match) {
                    record.classList.add('match');
                } else {
                    record.classList.remove('match');
                }
            });

            total.textContent = matches;
            container.hidden = !matches;
            noResults.hidden = !container.hidden;

            requestAnimationFrame(refresh);
        }

        refresh();
    });
})();

(function(){
    var uniqueEvents = [];

    var elements = document.querySelectorAll('[data-ga-category][data-ga-action]');

    forEach(elements, function(element) {
        element.addEventListener('click', function(){
            if(element.dataset.gaLabel) {
                sendEventWithLabel(element.dataset.gaAction, element.dataset.gaCategory, element.dataset.gaLabel);
            } else {
                sendEvent(element.dataset.gaAction, element.dataset.gaCategory);
            }
        });
    });
})();

(function(){
    var IGON = 'igo'; 
    var IBBN = 'ibb'; 

    if(document.getElementById(IBBN)) { 
        window.io_global_object_name = IGON
        window[IGON] = window[IGON] || {
            bbout_element_id: IBBN,
            enable_flash: false,
            enable_atrip: false,
            loader: {
                version: 'general5'
            }
        };

        (function B(){function v(e,a){var b={},c;for(c=e.length-1;-1<c;c--)0<c?b[c]=function(){var d=c;return function(){return w(e[d],b[d+1],a)}}():w(e[c],b[c+1],a)}function w(e,n,k){var c=document.createElement("script"),f,g,l;l=A(a[k]&&a[k].staticVer&&a[k].staticVer+"/"||e[1]);e[0]=e[0].replace("##version##",l);f=e[0].split("?")[0].split("/");g=f[f.length-1].split(".")[0];u.test(e[1])&&l!==e[1]&&d("loader: Overriding configured version with staticVer.");c.setAttribute("src",e[0]);c&&c.addEventListener?
        c.addEventListener("error",function(){b[k+"_"+g+"_load_failure"]="true"}):c.attachEvent&&c.attachEvent("onerror",function(){b[k+"_"+g+"_load_failure"]="true"});n&&(c.onload=n);document.getElementsByTagName("head")[0].appendChild(c)}function d(e){if("function"===typeof a.trace_handler)try{a.trace_handler(e)}catch(b){}}function f(b,a){var d=null!==b&&void 0!==b;return!d||"1"!==b.toString()&&"true"!==b.toString().toLowerCase()?!d||"0"!==b.toString()&&"false"!==b.toString().toLowerCase()?"boolean"===
        typeof a?a:!1:!1:!0}function A(a){d("********** version before replace: "+a+" **********");d('localNamespace[ "url_dots_to_dashes" ]: '+b.url_dots_to_dashes);d("numericVersionPattern.test( output ): "+u.test(a));b.url_dots_to_dashes&&u.test(a)&&(a=a.replace(/\./g,"-"));d("version after replace: "+a);return a}var g=window,x=g.io_global_object_name||"IGLOO",a=g[x]=g[x]||{},b=a.loader=a.loader||{},y=[],z=[],u=/^[0-9]{1,3}(\.[0-9]{1,3}){2}\/$/;if(b.loaderMain)return d("loader: Loader script has already run, try reducing the number of places it's being included."),
        !1;b.loaderMain=B;b.loaderVer="5.2.2";(function(){var e=f(b.tp,!0),n=f(b.fp_static,!0),k=f(b.fp_dyn,!0),c=f(b.enable_legacy_compatibility),u=f(b.tp_split),v=b.tp_host&&b.tp_host.replace(/\/+$/,"")||"https://mpsnare.iesnare.com",l=b.fp_static_override_uri,m=void 0!==b.uri_hook?b.uri_hook+"/":"/iojs/",p=(b.version||"versionOrAliasIsRequired")+"/",w=b.subkey?g.encodeURIComponent(b.subkey)+"/":"",x=b.tp_resource||"wdp.js",q=b.tp_host?"&tp_host="+g.encodeURIComponent(b.tp_host):"",C=l?"&fp_static_uri="+
        g.encodeURIComponent(l):"",r,t,h;b.tp_host=v;r=f(a.enable_flash,!0);t=a.io&&a.io.enable_flash;h=a.fp&&a.fp.enable_flash;t=void 0!==t&&null!==t?f(t,!0):r;void 0!==h&&null!==h?h=f(h,!0):t=r;r=t?"&flash=true":"&flash=false";h=h?"&flash=true":"&flash=false";q="?loaderVer="+b.loaderVer+"&compat="+c+"&tp="+e+"&tp_split="+u+q+"&fp_static="+n+"&fp_dyn="+k+C;e||n||d("loader: Not currently configured to load fp_static or tp script(s).");a.fp&&a.fp.staticVer&&a.fp.staticVer+"/"!==p&&(p=A(a.fp.staticVer+"/"),
        d("loader: Configured version replaced with that from pre-loaded static script."));n||a.fp&&a.fp.staticMain?(m=(m+"##version##"+w).replace(/\/\//g,"/"),n&&(a.fp&&a.fp.staticMain?c&&!a.fp.preCompatMain&&d("loader: enable_legacy_compatibility on, but included static does not have the compat wrapper."):l?y.push([l,""]):y.push([m+"static_wdp.js"+q+h,p])),!k||a.fp&&a.fp.dynMain?a.fp&&a.fp.dynMain&&d("loader: First party dynamic script has already been loaded, disable fp_dyn or make sure you're not manually including the dynamic file separately."):
        y.push([m+"dyn_wdp.js"+q+h,p])):f(b.fp_dyn)&&d("loader: Invalid Config, first party dynamic script set to load without static.");e&&(a.io&&a.io.staticMain?d("loader: Third party script has already been loaded."):(m=v+"/##version##"+w,u?(z.push([m+"static_wdp.js"+q+r,p]),z.push([m+"dyn_wdp.js"+q+r,p]),b.tp_resource&&d("loader: Invalid Config: both tp_resource and tp_split set. Ignoring tp_resource.")):z.push([m+x+q+r,p])))})();v(y,"fp");v(z,"io")})();
    }
})();
(function(){
    var linkButtons = document.querySelectorAll('a[role=button]');

    forEach(linkButtons, function(linkButton) {
        linkButton.addEventListener('keypress', function(event) {
            if(event.keyCode === 32) {
                event.preventDefault();
                linkButton.click();
            }
        });
    });
})();
(function(){
    var indexElements = document.querySelectorAll('[data-paginate-selector]');

    forEach(indexElements, function(index) {
        index.hidden = false;
        var currentPage = 0;
        var pageSize = parseInt(index.dataset.paginatePageSize);
        var resultStartElement = document.getElementById(index.dataset.paginateResultStart);
        var resultEndElement = document.getElementById(index.dataset.paginateResultEnd);
        var numPages;
        var total;
        var links = index.querySelectorAll('li');
        var previous = 0;
        var next = links.length - 1;

                function changePage(newPage) {
            links[currentPage + 1].classList.remove('selected');
            currentPage = newPage;
            links[currentPage + 1].classList.add('selected');

            links[previous].hidden = currentPage === 0;
            links[next].hidden = currentPage === numPages - 1;

            var first = Math.max(0, currentPage - 2); 
            var last = Math.min(first + 5, numPages); 

            if(last - first < 5) { 
                first = Math.max(0, last - 5); 
            }

            forEach(links, function(link, i) {
                if(i !== previous && i !== next) {
                    link.hidden = i <= first || i > last;
                }
            });
        }

        forEach(links, function(link, i) {
            link.querySelector('a').addEventListener('click', function(event) {
                event.preventDefault(); 

                        if(i === previous) {
                    changePage(currentPage - 1);
                } else if (i === next) {
                    changePage(currentPage + 1);
                } else {
                    changePage(i - 1);
                }
            });
        });

        function refresh() {
            var elements = document.querySelectorAll(index.dataset.paginateSelector); 
            numPages = Math.ceil(elements.length / pageSize);

            if(elements.length !== total) {
                changePage(0);
                total = elements.length;
            }

            var start = currentPage * pageSize;
            var end = Math.min(total, start + pageSize);

            forEach(elements, function(element, i) {
                if(i < start || i >= end) {
                    element.classList.remove('page');
                } else {
                    element.classList.add('page');
                }
            });

            resultStartElement.textContent = start + 1;
            resultEndElement.textContent = end;

                    requestAnimationFrame(refresh);
        }

                refresh();
    });
})();

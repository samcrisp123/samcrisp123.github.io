(function (scope) {
    'use strict';

    var Basdf = function (options) {
        var nativeForEach = Array.prototype.forEach;
        var nativeMap = Array.prototype.map;

        this.each = function (obj, iterator, context) {
            if (obj === null) {
                return
            }
            if (nativeForEach && obj.forEach === nativeForEach) {
                obj.forEach(iterator, context)
            } else if (obj.length === +obj.length) {
                for (var i = 0, l = obj.length; i < l; i++) {
                    if (iterator.call(context, obj[i], i, obj) === {}) {
                        return
                    }
                }
            } else {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (iterator.call(context, obj[key], key, obj) === {}) {
                            return
                        }
                    }
                }
            }
        };

        this.map = function (obj, iterator, context) {
            var results = [];

            // Not using strict equality so that this acts as a
            // shortcut to checking for `null` and `undefined`.
            if (obj == null) {
                return results
            }
            if (nativeMap && obj.map === nativeMap) {
                return obj.map(iterator, context)
            }

            this.each(obj, function (value, index, list) {
                results[results.length] = iterator.call(context, value, index, list)
            });

            return results
        };

        if (typeof options === 'object') {
            this.debug = options.debug;
            this.hasher = options.hasher;
            this.openDB = options.openDB;
            this.addBehavior = options.addBehavior;
            this.screen_resolution = options.screen_resolution;
            this.canvas = options.canvas;
            this.ie_activex = options.ie_activex
        } else if (typeof options === 'function') {
            this.hasher = options
        }
    };

    Basdf.prototype = {
        get: function () {
            var keys = {};

            keys.version = 1;
            keys.userAgent = navigator.userAgent;
            keys.language = navigator.language;
            keys.colorDepth = window.screen.colorDepth;

            if (this.screen_resolution) {
                var resolution = this.getScreenResolution();

                if (typeof resolution !== 'undefined') { // headless browsers, such as phantomjs
                    keys.resolution = this.getScreenResolution().join('x')
                }
            }

            keys.timezone = new Date().getTimezoneOffset();
            keys.clientSideTimestamp = new Date().getTime();
            keys.sessionStorage = this.hasSessionStorage();
            keys.localStorage = this.hasLocalStorage();
            keys.indexedDB = !!window.indexedDB;

            if (this.addBehavior) {
                keys.addBehavior = typeof document.body.addBehavior
            }

            if (this.openDB) {
                keys.openDatabase = typeof window.openDatabase
            }

            keys.cpuClass = navigator.cpuClass;
            keys.platform = navigator.platform;
            keys.doNotTrack = !!navigator.doNotTrack;
            keys.numberOfPlugins = navigator.plugins.length;
            keys.plugins = this.getPluginsString();

            if (this.canvas && this.isCanvasSupported()) {
                keys.canvas = this.getCanvasFingerprint()
            }
            if (this.debug) {
                return keys
            }
            if (this.hasher) {
                if (typeof this.hasher === 'string') {
                    return this.hasher(keys.join('###'), 31)
                } else {
                    return this.murmurhash3_32_gc(keys.join('###'), 31)
                }
            } else {
                return JSON.stringify(keys)
            }
        },

        /**
         * JS Implementation of MurmurHash3 (r136) (as of May 20, 2011)
         *
         * @@author <a href="mailto:gary.court@@gmail.com">Gary Court</a>
         * @@see http://github.com/garycourt/murmurhash-js
         * @@author <a href="mailto:aappleby@@gmail.com">Austin Appleby</a>
         * @@see http://sites.google.com/site/murmurhash/
         *
         * @@param {string} key ASCII only
         * @@param {number} seed Positive integer only
         * @@return {number} 32-bit positive integer hash
         */

        murmurhash3_32_gc: function (key, seed) {
            var h1b;
            var k1;

            var remainder = key.length & 3;
            var bytes = key.length - remainder;
            var h1 = seed;
            var c1 = 0xcc9e2d51;
            var c2 = 0x1b873593;
            var i = 0;

            while (i < bytes) {
                k1 =
                    ((key.charCodeAt(i) & 0xff)) |
                    ((key.charCodeAt(++i) & 0xff) << 8) |
                    ((key.charCodeAt(++i) & 0xff) << 16) |
                    ((key.charCodeAt(++i) & 0xff) << 24);
                ++i;

                k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
                k1 = (k1 << 15) | (k1 >>> 17);
                k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;

                h1 ^= k1;
                h1 = (h1 << 13) | (h1 >>> 19);
                h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
                h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
            }

            k1 = 0;

            switch (remainder) {
                case 3: k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
                case 2: k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
                case 1: k1 ^= (key.charCodeAt(i) & 0xff);

                    k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
                    k1 = (k1 << 15) | (k1 >>> 17);
                    k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
                    h1 ^= k1;
            }

            h1 ^= key.length;

            h1 ^= h1 >>> 16;
            h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
            h1 ^= h1 >>> 13;
            h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
            h1 ^= h1 >>> 16;

            return h1 >>> 0;
            /* eslint-enable */
        },

        // https://bugzilla.mozilla.org/show_bug.cgi?id=781447
        hasLocalStorage: function () {
            try {
                return !!scope.localStorage
            } catch (e) {
                return true // SecurityError when referencing it means it exists
            }
        },

        hasSessionStorage: function () {
            try {
                return !!scope.sessionStorage
            } catch (e) {
                return true // SecurityError when referencing it means it exists
            }
        },

        isCanvasSupported: function () {
            var elem = document.createElement('canvas');
            return !!(elem.getContext && elem.getContext('2d'))
        },

        isIE: function () {
            if (navigator.appName === 'Microsoft Internet Explorer') {
                return true
            } else if (navigator.appName === 'Netscape' && /Trident/.test(navigator.userAgent)) { // IE 11
                return true
            }

            return false
        },

        getPluginsString: function () {
            if (this.isIE()) {
                return this.getIEPluginsString()
            } else {
                return this.getRegularPluginsString()
            }
        },

        getRegularPluginsString: function () {
            return this.map(navigator.plugins, function (p) {
                this.map(p, function (mt) {
                    return [mt.type, mt.suffixes].join('~')
                }).join(',');
                return p.name
            }, this)
        },

        getIEPluginsString: function () {
            var names = ['ShockwaveFlash.ShockwaveFlash', // flash plugin
                'AcroPDF.PDF', // Adobe PDF reader 7+
                'PDF.PdfCtrl', // Adobe PDF reader 6 and earlier, brrr
                'QuickTime.QuickTime', // QuickTime
                // 5 versions of real players
                'rmocx.RealPlayer G2 Control',
                'rmocx.RealPlayer G2 Control.1',
                'RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)',
                'RealVideo.RealVideo(tm) ActiveX Control (32-bit)',
                'RealPlayer',
                'SWCtl.SWCtl', // ShockWave player
                'WMPlayer.OCX', // Windows media player
                'AgControl.AgControl', // Silverlight
                'Skype.Detection'];

            if (this.ie_activex && scope.ActiveXObject) {
                // starting to detect plugins in IE
                return this.map(names, function (name) {
                    try {
                        new ActiveXObject(name);
                        return name
                    } catch (e) {
                        return null
                    }
                }).join(';')
            } else {
                return '' // behavior prior version 0.5.0, not breaking backwards compat.
            }
        },

        getScreenResolution: function () {
            return [window.screen.height, window.screen.width]
        },

        getCanvasFingerprint: function () {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            // https://www.browserleaks.com/canvas#how-does-it-work
            var txt = 'http://valve.github.io';
            ctx.textBaseline = 'top';
            ctx.font = '14px \'Arial\'';
            ctx.textBaseline = 'alphabetic';
            ctx.fillStyle = '#f60';
            ctx.fillRect(125, 1, 62, 20);
            ctx.fillStyle = '#069';
            ctx.fillText(txt, 2, 15);
            ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
            ctx.fillText(txt, 4, 17);
            var canvasData = canvas.toDataURL();
            return canvasData.substr(canvasData.indexOf(',') + 1)
        }
    };

    if (typeof module === 'object' && typeof exports === 'object') {
        module.exports = Basdf
    }

    scope.Basdf = Basdf
})(window);

(function() {
    //from http://www.webtoolkit.info/javascript-base64.html
    var Base64 = {
        _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encode : function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = Base64._utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) +
                    Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);
            }
            return output;
        },
        _utf8_encode : function (string) {
            string = string.replace(/\r\n/g,"\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        }
    };
    function now() { return new Date(); }
    function timeSincePageLoad() { return now() - loadTime; }
    var loadTime = now();

    var deviceProfile = {
        deviceFingerprint: Base64.encode(new Basdf({ screen_resolution: true, ie_activex: true }).get())
    };
    var maxProfilingWaitTime = 2000;
    // We wait a bit to let the id stabilise
    var fingerprint2Delay = 100;
    var doLogin;

    function onDeviceProfile(loginCallback) {
        deviceProfile.submitDelay = timeSincePageLoad();
        doLogin = function() {
            loginCallback(Base64.encode(JSON.stringify(deviceProfile)));
        };
        if (allCallbacksCompleted()) {
            doLogin();
        } else {
            setTimeout(handleMissingProfilingData(), maxProfilingWaitTime);
        }
    }

    function allCallbacksCompleted() {
        return hasFingerprint2Data() && hasLocalIPAddress();
    }

    function hasFingerprint2Data() {
        return deviceProfile.fingerprintJs2Id || deviceProfile.fingerprintJs2Error;
    }

    function hasLocalIPAddress() {
        return deviceProfile.localIPAddressesError ||
            (deviceProfile.localIPAddresses && deviceProfile.localIPAddresses.ips && deviceProfile.localIPAddresses.ips.length > 0);
    }

    function doLoginIfWaiting() {
        if (doLogin && allCallbacksCompleted()) {
            doLogin();
        }
    }

    function handleMissingProfilingData() {
        return function() {
            if (!hasFingerprint2Data()) {
                deviceProfile.fingerprintJs2Error = "Timed out";
            }
            if (!hasLocalIPAddress()) {
                deviceProfile.localIPAddressesError = "Timed out";
            }
            doLogin();
        }
    }

    function attemptFingerprintJs2() {
        try {
            var fingerprintStart = new Date();
            var fingerprint = new Fingerprint2();
            fingerprint.get(function (result, components) {
                try {
                    deviceProfile.fingerprintJs2Id = result;
                    var shortenedProfile = [];
                    for (var i = 0; i < components.length; i++) {
                        if (components[i].key === "canvas" || components[i].key === "webgl") {
                            shortenedProfile.push({
                                key: components[i].key + "-hash",
                                value: fingerprint.x64hash128(components[i].value, 31)
                            });
                        }
                        else {
                            shortenedProfile.push(components[i]);
                        }
                    }
                    deviceProfile.fingerprintJs2Profile = shortenedProfile;
                    deviceProfile.fingerprintJs2TimingMs = new Date().getTime() - fingerprintStart.getTime();
                }
                catch (err) {
                    // We don't expect to hit this often but could for very old browsers
                    deviceProfile.fingerprintJs2Error = "Login-partial error: " + err;
                }
                doLoginIfWaiting();
            });
        }
        catch (err) {
            deviceProfile.fingerprintJs2Error = "Fingerprint2 error: " + err;
        }
    }

    setTimeout(attemptFingerprintJs2, fingerprint2Delay);

    setTimeout(function() {
        var webRCTStart = new Date();
        function timeSinceWebRCTStart() { return  new Date().getTime() - webRCTStart.getTime(); }
        try {
            var RTCPeerConnection = window.RTCPeerConnection
                || window.mozRTCPeerConnection
                || window.webkitRTCPeerConnection
                || (webrtciframe.contentWindow && webrtciframe.contentWindow.RTCPeerConnection)
                || (webrtciframe.contentWindow && webrtciframe.contentWindow.mozRTCPeerConnection)
                || (webrtciframe.contentWindow && webrtciframe.contentWindow.webkitRTCPeerConnection);

            if (!RTCPeerConnection) {
                deviceProfile.localIPAddressesError = "WebRTC-not-supported";
            } else {
                if (navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf('Chrome') == -1) {
                    deviceProfile.localIPAddressesError = "Safari";
                } else {
                    var ipRegex = /([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})/;
                    var peerConnection = new RTCPeerConnection({iceServers: [{urls: "stun:stun.services.mozilla.com"}]}, {});

                    peerConnection.onicecandidate = function(ice) {
                        if(ice.candidate) {
                            var regexResult = ipRegex.exec(ice.candidate.candidate);
                            if (regexResult) {
                                if (!deviceProfile.localIPAddresses) {
                                    deviceProfile.localIPAddresses = { ips: [] };
                                }
                                deviceProfile.localIPAddresses.ips.push({ ip: regexResult[0], timeMs: timeSinceWebRCTStart() });
                                doLoginIfWaiting();
                            }
                        } else {
                            if (!deviceProfile.localIPAddresses) {
                                deviceProfile.localIPAddresses = {};
                            }
                            deviceProfile.localIPAddresses.completedMs = timeSinceWebRCTStart();
                        }
                    };
                    peerConnection.createDataChannel("");
                    peerConnection.createOffer(function(result) { peerConnection.setLocalDescription(result); }, function(error) {});
                }
            }
        } catch (error) {
            deviceProfile.localIPAddressesError = (error.message || "no-error-message") + (error.lineNumber ? "@@"+error.lineNumber : "");
        }
    }, 100);
    //"Exports"
    window.onDeviceProfile = onDeviceProfile;
}());
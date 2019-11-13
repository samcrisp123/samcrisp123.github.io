'use strict';

function forEach(collection, callback) {
    Array.prototype.forEach.call(collection, callback);
}


(function() {
    var gaElement = document.querySelector('[data-ga-tokens]');

    if(gaElement) {
        var tokens = gaElement.dataset.gaTokens.split(',');

        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }

        gtag('js', new Date());

        gtag('config', tokens[0], {
            cookie_name: '_basga',
            anonymize_ip: true
        });

        if(tokens[1]) {
            gtag('config', tokens[1], {
                cookie_name: '_basga',
                anonymize_ip: true,
                linker: {
                    accept_incoming: true,
                    domains: ['www.gov.uk', 'www.nationalarchives.gov.uk']
                }
            });
        }

        var alreadySent = [];

        window.sendEvent = function(eventAction, eventCategory) {
            if(!alreadySent[eventAction]) {
                alreadySent[eventAction] = true;

                gtag('event', eventAction, {
                    'event_category': eventCategory,
                    'send_to': tokens[0]
                });
            }
        }

        window.sendEventWithLabel = function(eventAction, eventCategory, eventLabel) {
            if(!alreadySent[eventAction]) {
                alreadySent[eventAction] = true;

                gtag('event', eventAction, {
                    'event_category': eventCategory,
                    'event_label': eventLabel,
                    'send_to': tokens[0]
                });
            }
        }

        window.sendEventOnClick = function(selectorId, eventAction, eventCategory, eventLabel) {
            var element = document.getElementById(selectorId) || document.querySelector(selectorId);

            if(element) {
                element.addEventListener('click', function() {
                    if(eventLabel) {
                        sendEventWithLabel(eventAction, eventCategory, eventLabel);
                    } else {
                        sendEvent(eventAction, eventCategory);
                    }
                });
            }
        }
    }
})();


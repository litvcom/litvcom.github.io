(function() {
    'use strict';

    if (typeof Lampa?.Platform?.tv === 'function') {
        Lampa.Platform.tv();
    }

    function setupDMCABypass() {
        if (window.lampa_settings) {
            window.lampa_settings = new Proxy(window.lampa_settings, {
                get(target, prop) {
                    if (prop === 'dcma') {
                        return [];
                    }
                    return Reflect.get(target, prop);
                }
            });

            observer.disconnect();

            setTimeout(() => {
                delete window.setupDMCABypass;
                delete window.observer;
            }, 0);
        }
    }

    const observer = new MutationObserver(() => {
        setupDMCABypass();
    });

    observer.observe(document, { childList: true, subtree: true });

    setupDMCABypass();
})();

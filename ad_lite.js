(function () {
    'use strict';

    if (typeof Lampa?.Platform?.tv === 'function') {
        Lampa.Platform.tv();
    }

    let initMarker = false;

    function removeAds() {
        document.querySelectorAll('.ad-bot, .ad_bot, .ad-server').forEach(ad => ad.remove());
        document.querySelectorAll('.open--broadcast, .open--feed, .open--premium, .open--notice').forEach(el => el.remove());
    }

    function hideElements() {
        $('.selectbox-item__lock').parent().hide();
        $('.settings-param-title').last().hide();
    }

    const observer = new MutationObserver((mutationsList) => {
        const hasCardElements = document.getElementsByClassName('card').length > 0;
        if (hasCardElements && !initMarker) {
            initMarker = true;
            setTimeout(hideElements, 50);
            setTimeout(() => initMarker = false, 500);
        }
        
        removeAds();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    removeAds();
})();

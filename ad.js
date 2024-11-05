(function () {
    'use strict';

    if (typeof Lampa?.Platform?.tv === 'function') {
        Lampa.Platform.tv();
    }

    let initMarker = false;

    function cleanUpPage() {
        document.querySelectorAll('.ad-bot, .ad_bot, .ad-countdown, .ad-video-block, .ad_video_block, .ad-preroll, .ad_preroll, .ad-server').forEach(ad => ad.remove());
        document.querySelectorAll('.open--broadcast, .open--feed, .open--premium, .open--notice').forEach(el => el.remove());
        $('.selectbox-item__lock').parent().hide();
        $('.settings-param-title').last().hide();
        $("[data-action=feed]").eq(0).remove();
        $("[data-action=subscribes]").eq(0).remove();
    }

    const observer = new MutationObserver(() => {
        if (document.querySelector('.card__textbox') && !initMarker) {
            initMarker = true;
            setTimeout(() => {
                cleanUpPage();
                initMarker = false;
            }, 50);
        }

        cleanUpPage();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    cleanUpPage();
})();

(function () {
    'use strict';

    if (typeof Lampa?.Platform?.tv === 'function') {
        Lampa.Platform.tv();
    }

    let initMarker = false;

    function cleanUpPage() {
        document.querySelectorAll('.ad-bot, .ad_bot, .ad-countdown, .ad-video-block, .ad_video_block, .ad-preroll, .ad_preroll, .ad-server')
            .forEach(ad => ad.remove());

        document.querySelectorAll('.open--broadcast, .open--feed, .open--premium, .open--notice')
            .forEach(el => el.remove());

        document.querySelectorAll('.button--subscribe').forEach(button => button.remove());

        document.querySelectorAll('.selectbox-item__lock').forEach(lock => lock.parentElement.style.display = 'none');
        const lastSettingsTitle = document.querySelector('.settings-param-title:last-of-type');
        if (lastSettingsTitle) lastSettingsTitle.style.display = 'none';

        document.querySelector("[data-action='feed']")?.remove();
        document.querySelector("[data-action='subscribes']")?.remove();

        document.querySelectorAll('.card__textbox').forEach(textbox => {
            const parentCard = textbox.closest('.card');
            if (parentCard) parentCard.remove();
        });
    }

    const observer = new MutationObserver(() => {
        if (document.querySelector('.card') && !initMarker) {
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

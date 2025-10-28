(function () {
    'use strict';

    if (typeof Lampa?.Platform?.tv === 'function') {
        Lampa.Platform.tv();
    }

    let initMarker = false;

    function cleanUpPage() {
        document.querySelectorAll('.ad-bot, .ad_bot, .ad-countdown, .ad-video-block, .ad_video_block, .ad-preroll, .ad_preroll, .ad-server')
            .forEach(ad => ad.remove());

        document.querySelectorAll('.open--broadcast, .open--feed, .open--premium, .open--notice, .open--profile')
            .forEach(el => el.remove());

        document.querySelectorAll('.notice--icon, .navigation-tabs')
            .forEach(el => el.remove());

        document.querySelectorAll('.button--subscribe').forEach(button => button.remove()); // .black-friday__button, .christmas__button

        $('.selectbox-item__lock').parent().hide();
        $('.settings-param-title').last().hide();

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

(function () {
    const originalCreateElement = document.createElement;
    document.createElement = function (tagName, ...args) {
        if (tagName === "video") {
            let adVideo = originalCreateElement.call(document, tagName, ...args);
            adVideo.play = function () {
                setTimeout(() => {
                    adVideo.ended = true;
                    adVideo.dispatchEvent(new Event("ended"));
                }, 500);
            };
            return adVideo;
        }
        return originalCreateElement.call(document, tagName, ...args);
    };

    function clearAdTimers() {
        let highestTimeout = setTimeout(() => {}, 0);
        for (let i = 0; i <= highestTimeout; i++) {
            clearTimeout(i);
            clearInterval(i);
        }
    }

    document.addEventListener("DOMContentLoaded", clearAdTimers);
})();

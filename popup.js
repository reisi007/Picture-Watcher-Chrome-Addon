"use strict";
document.addEventListener('DOMContentLoaded', function () {
    chrome.runtime.getBackgroundPage(function (backgroundPage) {
        backgroundPage.model.getImage(function (imageData) {
            let image = document.getElementsByTagName("img")[0];
            image.src = imageData;
        });
    });
});

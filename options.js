"use strict";
/**
 * @callback onGetFbId
 * @param image {string}
 */
function updateImage(image) {
    let div = document.getElementById("id");
    div.src = image;
}
document.addEventListener('DOMContentLoaded', function () {
    let dropZone = document.getElementById('file');
    dropZone.addEventListener('change', dateiauswahl, false);
    function dateiauswahl(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        let image = evt.target.files[0]; // FileList Objekt
        console.log(image);
        let fileReader = new FileReader();
        fileReader.onload = function (event) {
            let base64String = event.srcElement.result;
            chrome.runtime.getBackgroundPage(function (backgroundPage) {
                let model = backgroundPage.model;
                model.setImage(base64String, function () {
                    updateImage(base64String);
                    console.log("Image set")
                });
            });
        }
        fileReader.readAsDataURL(image);
    }

    chrome.runtime.getBackgroundPage(function (backgroundPage) {
        let model = backgroundPage.model;
        model.getImage(function (image) {
            console.log(image);
            updateImage(image);
        });
    });
});
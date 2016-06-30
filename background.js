"use strict";
// Called when the user clicks on the browser action.
/**
 * Callback if an XMLHttpRequest has completed
 * @callback onRequestComplete
 * @param {XMLHttpRequest} request The request
 */
/**
 * Callback if an Image downlaod has finished
 * @callback onImageDlCompleted
 * @param {String} dataUrl The data URL (base64 encoded)
 * @param {ImageData} imageData An ImageDataobject for further usage
 */
/**
 * Callback for receiving stored data
 * @callback onDataAvailable
 * @param {*} obj The stored value
 */
/**
 * ID callback
 * @callback idCallback
 * @param {Number} id
 */
/**
 * Callback with no params
 * @callback noParamsCallback
 */

var model = {
    setIconPath: function (iconPath) {
        chrome.browserAction.setIcon(
            {path: iconPath}
        );
    }
    ,
    setIconData: function (data) {
        chrome.browserAction.setIcon(
            {imageData: data}
        )
    },
    storage: {
        local: {
            /**
             * Gets stored data
             * @param {String} id
             * @param {onDataAvailable} callback
             */
            get: function (id, callback) {
                chrome.storage.local.get(id, callback);
            }
            ,
            /**
             * Saves data
             * @param {String} id
             * @param {*} data
             * @param {noParamsCallback}[callback]
             */
            set: function (id, data, callback) {
                let o = {};
                o[id] = data;
                chrome.storage.local.set(o, callback);
            }
        }, keys: {
            image: "IMAGE_DATA",
            smallFoto: "IMAGE_SMALL_DATA"
        }
    }
    ,
    /**
     * Gets the id from storage
     * @param callback {idCallback} A callback with the ID, or -1 if no ID has been set
     */
    getImage: function (callback) {
        model.storage.local.get(model.storage.keys.image, function (obj) {
            let image = obj[model.storage.keys.image];
            if (image === undefined)
                image = "UNDEFINED.png";
            callback(image);
        });
    },
    setImage: function (base64ImageData, callback) {
        model.storage.local.set(model.storage.keys.image, base64ImageData, callback);
    }
};
var helper = {
    log: function (o) {
        chrome.extension.getBackgroundPage().console.log(o);
    }
};

//Event onInstalled
chrome.runtime.onInstalled.addListener(model.updateIcons);
chrome.runtime.onInstalled.addListener(function () {
    model.getImage(function (image) {
        if (image.length === 13) {
            chrome.runtime.openOptionsPage();
            return;
        }
    })
});